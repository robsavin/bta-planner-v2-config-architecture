import { useMemo, useRef, useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { TrailPoint } from "@/lib/gpxParser";
import type { DayPlan } from "@/lib/trailData";
import type { TrailDirection } from "@/components/DirectionSelector";
import type { UnitSystem } from "@/lib/formatUtils";
import { findPointIndexAtDistance } from "@/hooks/useTrailPoints";
import { getTrailConfig } from "@/config";

const dayColours = [
  "#2563eb", "#16a34a", "#ea580c", "#dc2626", "#7c3aed",
  "#0891b2", "#c026d3", "#65a30d", "#e11d48", "#f59e0b",
];

interface ElevationProfileProps {
  trailPoints: TrailPoint[];
  cumulativeDistances: number[];
  totalGpxDistance: number;
  itinerary: DayPlan[];
  direction: TrailDirection;
  units?: UnitSystem;
}

interface ChartPoint {
  distance: number;
  elevation: number;
  dayIndex: number;
}

const ElevationProfile = ({
  trailPoints,
  cumulativeDistances,
  totalGpxDistance,
  itinerary,
  direction,
  units = "metric",
}: ElevationProfileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const hasElevation = trailPoints.some((p) => p.elevation != null);

  const trailConfig = getTrailConfig();
  const trailTotalDistance = trailConfig.nodes[trailConfig.nodes.length - 1].distanceFromStart;
  const scaleFactor = totalGpxDistance / trailTotalDistance;
  const isImperial = units === "imperial";
  const distFactor = isImperial ? 0.621371 : 1;

  const data = useMemo(() => {
    if (!hasElevation) return [];
    const walkingDays = itinerary.filter((d) => !d.isRestDay);
    const boundaries: { startIdx: number; endIdx: number; dayIndex: number }[] = [];

    walkingDays.forEach((day, wi) => {
      let startDist = day.startNode.distanceFromStart;
      let endDist = day.endNode.distanceFromStart;
      if (direction === "north-to-south") {
        startDist = trailTotalDistance - day.startNode.distanceFromStart;
        endDist = trailTotalDistance - day.endNode.distanceFromStart;
      }
      const gpxStart = Math.min(startDist, endDist) * scaleFactor;
      const gpxEnd = Math.max(startDist, endDist) * scaleFactor;
      boundaries.push({
        startIdx: findPointIndexAtDistance(cumulativeDistances, gpxStart),
        endIdx: findPointIndexAtDistance(cumulativeDistances, gpxEnd),
        dayIndex: wi,
      });
    });

    const step = Math.max(1, Math.floor(trailPoints.length / 300));
    const points: ChartPoint[] = [];

    for (let i = 0; i < trailPoints.length; i += step) {
      const pt = trailPoints[i];
      if (pt.elevation == null) continue;
      const dist = cumulativeDistances[i] * distFactor;
      let dayIdx = -1;
      for (const b of boundaries) {
        if (i >= b.startIdx && i <= b.endIdx) {
          dayIdx = b.dayIndex;
          break;
        }
      }
      points.push({ distance: Number(dist.toFixed(2)), elevation: Math.round(pt.elevation), dayIndex: dayIdx });
    }
    return points;
  }, [trailPoints, cumulativeDistances, itinerary, direction, scaleFactor, trailTotalDistance, distFactor, hasElevation]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setChartWidth(el.offsetWidth);
    // Initial measure after a short delay for embedded contexts
    const timerId = setTimeout(measure, 200);
    // Re-measure on resize
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => { clearTimeout(timerId); ro.disconnect(); };
  }, []);

  if (!hasElevation) return null;

  const walkingDays = itinerary.filter((d) => !d.isRestDay);
  const dayKeys = walkingDays.map((_, i) => `day${i}`);

  const chartData = data.map((pt) => {
    const entry: Record<string, number | null> = { distance: pt.distance };
    dayKeys.forEach((key, i) => {
      entry[key] = pt.dayIndex === i ? pt.elevation : null;
    });
    entry.elevation = pt.elevation;
    return entry;
  });

  const distLabel = isImperial ? "mi" : "km";
  const width = chartWidth || 600;

  return (
    <div ref={containerRef} className="w-full bg-muted/30 rounded-lg border border-border" style={{ height: 140, overflow: 'hidden', maxWidth: '100%', padding: 0, width: '100%' }}>
      <AreaChart width={width} height={140} data={chartData} margin={{ top: 5, right: 5, left: 40, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis
          dataKey="distance"
          type="number"
          domain={["dataMin", "dataMax"]}
          tickFormatter={(v: number) => `${Math.round(v)}`}
          tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          label={{ value: distLabel, position: "insideBottomRight", offset: -2, fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(v: number) => `${v}m`}
          width={42}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const p = payload.find((p) => p.value != null);
            if (!p) return null;
            const point = data.find((d) => d.distance === (p.payload as any).distance);
            const dayNum = point && point.dayIndex >= 0 ? `Day ${walkingDays[point.dayIndex].day}` : "";
            return (
              <div className="bg-background border border-border rounded px-2 py-1 text-xs shadow-sm">
                <div className="font-medium">{(p.payload as any).distance?.toFixed(1)} {distLabel} · {p.value}m</div>
                {dayNum && <div className="text-muted-foreground">{dayNum}</div>}
              </div>
            );
          }}
        />
        <Area dataKey="elevation" stroke="hsl(var(--border))" fill="hsl(var(--muted))" fillOpacity={0.3} strokeWidth={0} dot={false} connectNulls />
        {dayKeys.map((key, i) => (
          <Area
            key={key}
            dataKey={key}
            stroke={dayColours[i % dayColours.length]}
            fill={dayColours[i % dayColours.length]}
            fillOpacity={0.35}
            strokeWidth={1.5}
            dot={false}
            connectNulls={false}
          />
        ))}
      </AreaChart>
    </div>
  );
};

export default ElevationProfile;

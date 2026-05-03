import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTrailPoints, findPointIndexAtDistance } from "@/hooks/useTrailPoints";
import type { TrailPoint } from "@/lib/gpxParser";
import { type DayPlan, type TrailDirection } from "@/lib/trailData";
import type { UnitSystem } from "@/lib/formatUtils";
import ElevationProfile from "@/components/ElevationProfile";
import { getTrailConfig } from "@/config";
import { Loader2 } from "lucide-react";
import { formatTime } from "@/lib/formatUtils";

// Fix Leaflet default marker icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapDisplayProps {
  itinerary?: DayPlan[];
  direction?: TrailDirection;
  className?: string;
  units?: UnitSystem;
}


import { dayColours } from "@/lib/dayColours";

function snapToTrail(nodeCoords: [number, number], trailPoints: TrailPoint[]): [number, number] {
  let minDist = Infinity;
  let nearestPoint = trailPoints[0];
  for (const pt of trailPoints) {
    const dist = Math.sqrt(
      Math.pow(pt.lat - nodeCoords[0], 2) + Math.pow(pt.lng - nodeCoords[1], 2)
    );
    if (dist < minDist) { minDist = dist; nearestPoint = pt; }
  }
  return [nearestPoint.lat, nearestPoint.lng];
}

const MapDisplay = ({ itinerary, direction = "south-to-north", className, units = "metric" }: MapDisplayProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { trailPoints, loading, error, cumulativeDistances, totalGpxDistance } = useTrailPoints();

  // Resolve trail config at render time, not module init time
  const trailConfig = getTrailConfig();
  const trailNodes = trailConfig.nodes;
  const nodeCoordinates: Record<string, [number, number]> = Object.fromEntries(
    trailConfig.nodes.map((n) => [n.id, n.coordinates])
  );

  useEffect(() => {
    if (!mapRef.current || loading || trailPoints.length === 0) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      touchZoom: true,
      tap: false,
    }).setView([56.4, -4.7], 9);

    // Touch gesture: require two fingers to pan on mobile
    if (L.Browser.mobile) {
      const gestureOverlay = document.createElement('div');
      gestureOverlay.className = 'leaflet-gesture-overlay';
      gestureOverlay.innerHTML = '<p>Use two fingers to move the map</p>';
      Object.assign(gestureOverlay.style, {
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%',
        display: 'none', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '1rem',
        fontWeight: '600', zIndex: '1000', pointerEvents: 'none',
        textAlign: 'center', padding: '2rem',
      });
      map.getContainer().style.position = 'relative';
      map.getContainer().appendChild(gestureOverlay);

      let gestureTimeout: ReturnType<typeof setTimeout>;
      const container = map.getContainer();
      let lastMid: { x: number; y: number } | null = null;

      const midpoint = (e: TouchEvent) => ({
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      });

      container.addEventListener('touchstart', (e) => {
        if (e.touches.length >= 2) {
          gestureOverlay.style.display = 'none';
          clearTimeout(gestureTimeout);
          lastMid = midpoint(e);
        } else {
          lastMid = null;
          gestureOverlay.style.display = 'flex';
          clearTimeout(gestureTimeout);
          gestureTimeout = setTimeout(() => { gestureOverlay.style.display = 'none'; }, 1500);
        }
      }, { passive: true });

      container.addEventListener('touchmove', (e) => {
        if (e.touches.length >= 2 && lastMid) {
          const mid = midpoint(e);
          const dx = mid.x - lastMid.x;
          const dy = mid.y - lastMid.y;
          if (dx || dy) map.panBy([-dx, -dy], { animate: false });
          lastMid = mid;
        }
      }, { passive: true });

      const endTouch = (e: TouchEvent) => {
        if (e.touches.length < 2) lastMid = null;
      };
      container.addEventListener('touchend', endTouch, { passive: true });
      container.addEventListener('touchcancel', endTouch, { passive: true });
    }
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
    mapInstanceRef.current = map;

    const hasItinerary = itinerary && itinerary.length > 0;

    if (trailPoints.length > 0) {
      const trailLine = L.polyline(
        trailPoints.map((p): L.LatLngExpression => [p.lat, p.lng]),
        { color: hasItinerary ? "#94a3b8" : "hsl(var(--primary))", weight: hasItinerary ? 3 : 4, opacity: hasItinerary ? 0.4 : 0.8 }
      ).addTo(map);
      map.fitBounds(trailLine.getBounds(), { padding: [20, 20] });
    }

    trailNodes.forEach((node) => {
      const coords = nodeCoordinates[node.id];
      if (coords) {
        const snappedCoords = snapToTrail(coords, trailPoints);
        const marker = L.circleMarker(snappedCoords, {
          radius: hasItinerary ? 5 : 8,
          fillColor: node.hasServices ? "#16a34a" : "#f59e0b",
          color: "#ffffff", weight: 2, fillOpacity: hasItinerary ? 0.5 : 0.9,
        }).addTo(map);
        marker.bindPopup(
          `<strong>${node.name}</strong><br/>${node.distanceFromStart.toFixed(1)} km from start<br/>${node.hasServices ? "🏪 Services available" : "⛺ Limited services"}`
        );
      }
    });

    if (hasItinerary && cumulativeDistances.length > 0) {
      const trailTotalDistance = trailNodes[trailNodes.length - 1].distanceFromStart;
      let walkingDayIndex = 0;
      let lastWalkingDayIndex = -1;
      itinerary.forEach((day, idx) => { if (!day.isRestDay) lastWalkingDayIndex = idx; });

      itinerary.forEach((day, index) => {
        if (day.isRestDay) return;
        const colour = dayColours[walkingDayIndex % dayColours.length];
        let startDist = day.startNode.distanceFromStart;
        let endDist = day.endNode.distanceFromStart;
        if (direction === "north-to-south") {
          startDist = trailTotalDistance - day.startNode.distanceFromStart;
          endDist = trailTotalDistance - day.endNode.distanceFromStart;
        }
        const scaleFactor = totalGpxDistance / trailTotalDistance;
        const gpxStartDist = Math.min(startDist, endDist) * scaleFactor;
        const gpxEndDist = Math.max(startDist, endDist) * scaleFactor;
        const startIdx = findPointIndexAtDistance(cumulativeDistances, gpxStartDist);
        const endIdx = findPointIndexAtDistance(cumulativeDistances, gpxEndDist);
        const minIdx = Math.min(startIdx, endIdx);
        const maxIdx = Math.max(startIdx, endIdx);
        const segmentPoints = trailPoints.slice(minIdx, maxIdx + 1);
        const startCoords = nodeCoordinates[day.startNode.id];
        const endCoords = nodeCoordinates[day.endNode.id];
        const snappedStart = startCoords ? snapToTrail(startCoords, trailPoints) : null;
        const snappedEnd = endCoords ? snapToTrail(endCoords, trailPoints) : null;
        if (segmentPoints.length > 1) {
          const lineCoords: L.LatLngExpression[] = [];
          if (snappedStart) lineCoords.push(snappedStart);
          lineCoords.push(...segmentPoints.map((p): L.LatLngExpression => [p.lat, p.lng]));
          if (snappedEnd) lineCoords.push(snappedEnd);
          L.polyline(lineCoords, { color: colour, weight: 6, opacity: 0.9 }).addTo(map);
        }
        if (snappedStart) {
          L.marker(snappedStart, {
            icon: L.divIcon({
              className: "day-marker",
              html: `<div style="background-color: ${colour}; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${day.day}</div>`,
              iconSize: [28, 28], iconAnchor: [14, 14],
            }),
          }).addTo(map).bindPopup(`<strong>Day ${day.day}: ${day.startNode.name} → ${day.endNode.name}</strong><br/>${day.distance} km • ${formatTime(day.walkingTime)}`);
        }
        if (index === lastWalkingDayIndex && snappedEnd) {
          L.marker(snappedEnd, {
            icon: L.divIcon({
              className: "day-marker",
              html: `<div style="background-color: #16a34a; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); font-size: 16px;">🏁</div>`,
              iconSize: [32, 32], iconAnchor: [16, 16],
            }),
          }).addTo(map).bindPopup(`<strong>Finish: ${day.endNode.name}</strong>`);
        }
        walkingDayIndex++;
      });
    }

    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
    };
  }, [trailPoints, itinerary, direction, loading, cumulativeDistances, totalGpxDistance]);

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center bg-muted/50 rounded-lg", className)} style={{ minHeight: 400 }}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading trail map...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-muted/50 rounded-lg", className)} style={{ minHeight: 400 }}>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  const walkingDays = itinerary?.filter((d) => !d.isRestDay) || [];

  return (
    <div className="flex flex-col">
      <div ref={mapRef} className={cn("rounded-lg overflow-hidden border border-border", className)} style={{ minHeight: 400 }} />
      {itinerary && itinerary.length > 0 && trailPoints.length > 0 && (
        <div className="mt-3">
          <ElevationProfile
            trailPoints={trailPoints}
            cumulativeDistances={cumulativeDistances}
            totalGpxDistance={totalGpxDistance}
            itinerary={itinerary}
            direction={direction}
            units={units}
          />
        </div>
      )}
      {walkingDays.length > 0 && (
        <div className="mt-3 mb-4 flex flex-wrap gap-x-4 gap-y-2 bg-background/80 rounded-md px-2 py-2">
          {walkingDays.map((day, index) => (
            <div key={day.day} className="flex items-center gap-1.5 text-sm">
              <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: dayColours[index % dayColours.length] }} />
              <span>Day {day.day}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default MapDisplay;

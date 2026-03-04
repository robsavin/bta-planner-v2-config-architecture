import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTrailPoints, findPointIndexAtDistance } from "@/hooks/useTrailPoints";
import type { TrailPoint } from "@/lib/gpxParser";
import { trailNodes, type DayPlan, type TrailDirection } from "@/lib/trailData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Loader2 } from "lucide-react";
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
}

// Approximate coordinates for trail nodes (for markers)
const nodeCoordinates: Record<string, [number, number]> = {
  "milngavie": [55.9419, -4.3139],
  "drymen": [56.0522, -4.4372],
  "balmaha": [56.0789, -4.5261],
  "rowardennan": [56.1378, -4.6317],
  "inversnaid": [56.2378, -4.6831],
  "ardleish": [56.2744, -4.7178],
  "inverarnan": [56.3136, -4.7172],
  "crianlarich": [56.3908, -4.6192],
  "tyndrum": [56.4344, -4.7108],
  "bridge-of-orchy": [56.5156, -4.7633],
  "inveroran": [56.5389, -4.8042],
  "kingshouse": [56.6553, -4.8556],
  "kinlochleven": [56.7086, -4.9606],
  "fort-william": [56.8169, -5.1056],
};

// Colour palette for day segments
const dayColours = [
  "#2563eb", // blue
  "#16a34a", // green
  "#ea580c", // orange
  "#dc2626", // red
  "#7c3aed", // purple
  "#0891b2", // cyan
  "#c026d3", // fuchsia
  "#65a30d", // lime
  "#e11d48", // rose
  "#f59e0b", // amber
];

// Snap coordinates to nearest GPX point
function snapToTrail(nodeCoords: [number, number], trailPoints: TrailPoint[]): [number, number] {
  let minDist = Infinity;
  let nearestPoint = trailPoints[0];
  
  for (const pt of trailPoints) {
    const dist = Math.sqrt(
      Math.pow(pt.lat - nodeCoords[0], 2) +
      Math.pow(pt.lng - nodeCoords[1], 2)
    );
    if (dist < minDist) {
      minDist = dist;
      nearestPoint = pt;
    }
  }
  
  return [nearestPoint.lat, nearestPoint.lng];
}

const MapDisplay = ({ itinerary, direction = "south-to-north", className }: MapDisplayProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { trailPoints, loading, error, cumulativeDistances, totalGpxDistance } = useTrailPoints();

  // Initialise map
  useEffect(() => {
    if (!mapRef.current || loading || trailPoints.length === 0) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create map centred on Scotland
    const map = L.map(mapRef.current).setView([56.4, -4.7], 9);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    const hasItinerary = itinerary && itinerary.length > 0;

    // Draw base trail line
    if (trailPoints.length > 0) {
      const trailLine = L.polyline(
        trailPoints.map((p): L.LatLngExpression => [p.lat, p.lng]),
        {
          color: hasItinerary ? "#94a3b8" : "hsl(var(--primary))",
          weight: hasItinerary ? 3 : 4,
          opacity: hasItinerary ? 0.4 : 0.8,
        }
      ).addTo(map);

      map.fitBounds(trailLine.getBounds(), { padding: [20, 20] });
    }

    // Add markers for all trail nodes (subtle when itinerary exists)
    trailNodes.forEach((node) => {
      const coords = nodeCoordinates[node.id];
      if (coords) {
        const snappedCoords = snapToTrail(coords, trailPoints);
        const marker = L.circleMarker(snappedCoords, {
          radius: hasItinerary ? 5 : 8,
          fillColor: node.hasServices ? "#16a34a" : "#f59e0b",
          color: "#ffffff",
          weight: 2,
          fillOpacity: hasItinerary ? 0.5 : 0.9,
        }).addTo(map);

        marker.bindPopup(
          `<strong>${node.name}</strong><br/>
           ${node.distanceFromStart.toFixed(1)} km from start<br/>
           ${node.hasServices ? "🏪 Services available" : "⛺ Limited services"}`
        );
      }
    });

    // Draw coloured day segments if itinerary exists
    if (hasItinerary && cumulativeDistances.length > 0) {
      // Get total trail distance from the trail data (not GPX)
      const trailTotalDistance = trailNodes[trailNodes.length - 1].distanceFromStart;
      
      // Track walking day index for consistent colouring
      let walkingDayIndex = 0;
      
      // Find last walking day for finish marker
      let lastWalkingDayIndex = -1;
      itinerary.forEach((day, idx) => {
        if (!day.isRestDay) lastWalkingDayIndex = idx;
      });

      itinerary.forEach((day, index) => {
        if (day.isRestDay) return;

        const colour = dayColours[walkingDayIndex % dayColours.length];
        
        // Get distances for this day's segment
        let startDist = day.startNode.distanceFromStart;
        let endDist = day.endNode.distanceFromStart;
        
        // For north-to-south, we need to convert to GPX distances (which run south-to-north)
        if (direction === "north-to-south") {
          // The node's distanceFromStart is from the north end, convert to from south
          startDist = trailTotalDistance - day.startNode.distanceFromStart;
          endDist = trailTotalDistance - day.endNode.distanceFromStart;
        }
        
        // Scale to GPX distance (GPX might have slightly different total distance)
        const scaleFactor = totalGpxDistance / trailTotalDistance;
        const gpxStartDist = Math.min(startDist, endDist) * scaleFactor;
        const gpxEndDist = Math.max(startDist, endDist) * scaleFactor;
        
        // Find GPX point indices for this segment
        const startIdx = findPointIndexAtDistance(cumulativeDistances, gpxStartDist);
        const endIdx = findPointIndexAtDistance(cumulativeDistances, gpxEndDist);
        
        // Extract segment points
        const minIdx = Math.min(startIdx, endIdx);
        const maxIdx = Math.max(startIdx, endIdx);
        const segmentPoints = trailPoints.slice(minIdx, maxIdx + 1);
        
        if (segmentPoints.length > 1) {
          L.polyline(
            segmentPoints.map((p): L.LatLngExpression => [p.lat, p.lng]),
            {
              color: colour,
              weight: 6,
              opacity: 0.9,
            }
          ).addTo(map);
        }

        // Add numbered marker at START of each day (snapped to trail)
        const startCoords = nodeCoordinates[day.startNode.id];
        if (startCoords) {
          const snappedStart = snapToTrail(startCoords, trailPoints);
          L.marker(snappedStart, {
            icon: L.divIcon({
              className: "day-marker",
              html: `<div style="background-color: ${colour}; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${day.day}</div>`,
              iconSize: [28, 28],
              iconAnchor: [14, 14],
            }),
          })
            .addTo(map)
            .bindPopup(
              `<strong>Day ${day.day}: ${day.startNode.name} → ${day.endNode.name}</strong><br/>
               ${day.distance} km • ${formatTime(day.walkingTime)}`
            );
        }

        // Add finish marker on the last walking day's end point
        if (index === lastWalkingDayIndex) {
          const endCoords = nodeCoordinates[day.endNode.id];
          if (endCoords) {
            const snappedEnd = snapToTrail(endCoords, trailPoints);
            L.marker(snappedEnd, {
              icon: L.divIcon({
                className: "day-marker",
                html: `<div style="background-color: #16a34a; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); font-size: 16px;">🏁</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              }),
            })
              .addTo(map)
              .bindPopup(`<strong>Finish: ${day.endNode.name}</strong>`);
          }
        }

        walkingDayIndex++;
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [trailPoints, itinerary, direction, loading, cumulativeDistances, totalGpxDistance]);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Trail Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading trail map...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Trail Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Build legend from walking days only
  const walkingDays = itinerary?.filter((d) => !d.isRestDay) || [];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Trail Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={mapRef}
          className="h-[400px] rounded-lg overflow-hidden border border-border"
        />
        {walkingDays.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {walkingDays.map((day, index) => (
              <div
                key={day.day}
                className="flex items-center gap-1.5 text-sm"
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: dayColours[index % dayColours.length] }}
                />
                <span>Day {day.day}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapDisplay;

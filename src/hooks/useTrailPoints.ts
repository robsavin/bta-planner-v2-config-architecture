import { useState, useEffect, useMemo } from "react";
import JSZip from "jszip";
import { getTrailConfig } from "@/config";
import { parseGPX, type TrailPoint } from "@/lib/gpxParser";

// Singleton cache so the GPX is only fetched once across all consumers
let cachedPoints: TrailPoint[] | null = null;
let fetchPromise: Promise<TrailPoint[]> | null = null;

async function loadTrailPoints(): Promise<TrailPoint[]> {
  if (cachedPoints) return cachedPoints;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    const gpxUrl = getTrailConfig().gpxAssetPath;
    const response = await fetch(gpxUrl);
    if (!response.ok) throw new Error("GPX file not found");

    const zipData = await response.arrayBuffer();
    const zip = await JSZip.loadAsync(zipData);

    let gpxContent = "";
    for (const [filename, file] of Object.entries(zip.files)) {
      if (filename.endsWith(".gpx") && !file.dir) {
        gpxContent = await file.async("string");
        break;
      }
    }

    if (!gpxContent) throw new Error("No GPX file found in archive");

    const points = await parseGPX(gpxContent);
    cachedPoints = points;
    return points;
  })();

  return fetchPromise;
}

// Haversine distance in km
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calculateCumulativeDistances(points: TrailPoint[]): number[] {
  const distances: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    distances.push(distances[i - 1] + haversineDistance(prev.lat, prev.lng, curr.lat, curr.lng));
  }
  return distances;
}

export function findPointIndexAtDistance(cumulativeDistances: number[], targetDistance: number): number {
  let closestIndex = 0;
  let minDiff = Math.abs(cumulativeDistances[0] - targetDistance);
  for (let i = 1; i < cumulativeDistances.length; i++) {
    const diff = Math.abs(cumulativeDistances[i] - targetDistance);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  return closestIndex;
}

export function useTrailPoints() {
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>(cachedPoints || []);
  const [loading, setLoading] = useState(!cachedPoints);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedPoints) {
      setTrailPoints(cachedPoints);
      setLoading(false);
      return;
    }
    loadTrailPoints()
      .then((pts) => {
        setTrailPoints(pts);
        setError(null);
      })
      .catch((err) => {
        console.error("Error loading GPX:", err);
        setError("Could not load trail data");
      })
      .finally(() => setLoading(false));
  }, []);

  const cumulativeDistances = useMemo(
    () => (trailPoints.length > 0 ? calculateCumulativeDistances(trailPoints) : []),
    [trailPoints]
  );

  const totalGpxDistance = useMemo(
    () => (cumulativeDistances.length > 0 ? cumulativeDistances[cumulativeDistances.length - 1] : 0),
    [cumulativeDistances]
  );

  return { trailPoints, loading, error, cumulativeDistances, totalGpxDistance };
}

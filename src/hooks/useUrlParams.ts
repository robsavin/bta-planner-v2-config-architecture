import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { speedProfiles } from "@/lib/trailData";
import type { SpeedProfile } from "@/lib/trailData";
import type { TrailDirection } from "@/components/DirectionSelector";

export interface TripUrlParams {
  trail?: string;
  pace?: string;
  direction?: TrailDirection;
  days?: number;
  partySize?: number;
  startDate?: Date;
  dailyHours?: number;
  quote?: string;
  admin?: boolean;
}

export function useTripUrlParams(): TripUrlParams {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const params: TripUrlParams = {};

    const trail = searchParams.get("trail");
    if (trail) params.trail = trail;

    const pace = searchParams.get("pace");
    if (pace) params.pace = pace;

    const direction = searchParams.get("direction");
    if (direction === "south-to-north" || direction === "north-to-south") {
      params.direction = direction;
    }

    const days = searchParams.get("days");
    if (days) params.days = parseInt(days, 10);

    const partySize = searchParams.get("partySize");
    if (partySize) params.partySize = parseInt(partySize, 10);

    const startDate = searchParams.get("startDate");
    if (startDate) {
      const d = new Date(startDate);
      if (!isNaN(d.getTime())) params.startDate = d;
    }

    const dailyHours = searchParams.get("dailyHours");
    if (dailyHours) params.dailyHours = parseInt(dailyHours, 10);

    const quote = searchParams.get("quote");
    if (quote) params.quote = quote;

    const admin = searchParams.get("admin");
    if (admin === "true") params.admin = true;

    return params;
  }, [searchParams]);
}

export function buildShareUrl(config: {
  trail: string;
  pace: string;
  direction: string;
  days: number;
  partySize: number;
  startDate: Date;
  dailyHours: number;
}): string {
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("trail", config.trail);
  url.searchParams.set("pace", config.pace);
  url.searchParams.set("direction", config.direction);
  url.searchParams.set("days", String(config.days));
  url.searchParams.set("partySize", String(config.partySize));
  url.searchParams.set("startDate", config.startDate.toISOString().split("T")[0]);
  url.searchParams.set("dailyHours", String(config.dailyHours));
  return url.toString();
}

export function resolveSpeedFromUrl(paceId: string | undefined): SpeedProfile | undefined {
  if (!paceId) return undefined;
  return speedProfiles.find((s) => s.id === paceId);
}

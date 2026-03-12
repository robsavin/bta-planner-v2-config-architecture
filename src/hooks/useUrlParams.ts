import { useMemo } from "react";
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

/**
 * Reads URL params from both window.location.search and hash-based search params,
 * so it works in both standalone and Shopify embedded contexts.
 */
export function useTripUrlParams(): TripUrlParams {
  return useMemo(() => {
    // Merge params from main URL search and hash search
    const mainParams = new URLSearchParams(window.location.search);
    const hashSearch = window.location.hash.includes("?")
      ? new URLSearchParams(window.location.hash.split("?")[1])
      : new URLSearchParams();

    const get = (key: string): string | null => mainParams.get(key) ?? hashSearch.get(key);

    const params: TripUrlParams = {};

    const trail = get("trail");
    if (trail) params.trail = trail;

    const pace = get("pace");
    if (pace) params.pace = pace;

    const direction = get("direction");
    if (direction === "south-to-north" || direction === "north-to-south") {
      params.direction = direction;
    }

    const days = get("days");
    if (days) params.days = parseInt(days, 10);

    const partySize = get("partySize");
    if (partySize) params.partySize = parseInt(partySize, 10);

    const startDate = get("startDate");
    if (startDate) {
      const d = new Date(startDate);
      if (!isNaN(d.getTime())) params.startDate = d;
    }

    const dailyHours = get("dailyHours");
    if (dailyHours) params.dailyHours = parseInt(dailyHours, 10);

    const quote = get("quote");
    if (quote) params.quote = quote;

    const admin = get("admin");
    if (admin === "true") params.admin = true;

    return params;
  }, []);
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

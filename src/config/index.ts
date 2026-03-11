import type { TrailConfig } from "./types";
import westHighlandWay from "./trails/west-highland-way";

const trailConfigs: Record<string, TrailConfig> = {
  "west-highland-way": westHighlandWay,
};

/**
 * Get the trail configuration for a given trail ID.
 * Reads from window.__BTA_TRAIL_ID__ (set in main.tsx from data-trail attribute)
 * or falls back to "west-highland-way".
 */
export function getTrailConfig(trailId?: string): TrailConfig {
  const id = trailId ?? (window as any).__BTA_TRAIL_ID__;
  if (id && trailConfigs[id]) {
    return trailConfigs[id];
  }
  return westHighlandWay;
}

export type { TrailConfig } from "./types";
export type { TrailNodeConfig, SpeedProfileConfig } from "./types";

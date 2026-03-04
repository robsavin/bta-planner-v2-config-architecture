import type { TrailConfig } from "./types";
import westHighlandWay from "./trails/west-highland-way";

const trailConfigs: Record<string, TrailConfig> = {
  "west-highland-way": westHighlandWay,
};

/**
 * Get the trail configuration for a given trail ID.
 * For now, defaults to "west-highland-way" for any input.
 */
export function getTrailConfig(trailId?: string): TrailConfig {
  if (trailId && trailConfigs[trailId]) {
    return trailConfigs[trailId];
  }
  return westHighlandWay;
}

export type { TrailConfig } from "./types";
export type { TrailNodeConfig, SpeedProfileConfig } from "./types";

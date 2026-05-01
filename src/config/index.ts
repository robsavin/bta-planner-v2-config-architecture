import type { TrailConfig } from "./types";
import westHighlandWay from "./trails/west-highland-way";
import dalesWay from "./trails/dales-way";
import hadriansWallPath from "./trails/hadrians-wall-path";
import robRoyWay from "./trails/rob-roy-way";
import cotswoldWay from "./trails/cotswold-way";
import stCuthbertsWay from "./trails/st-cuthberts-way"
import cumbriaWay from "./trails/cumbria-way";
import greatGlenWay from "./trails/great-glen-way";


const trailConfigs: Record<string, TrailConfig> = {
  "west-highland-way": westHighlandWay,
  "dales-way": dalesWay,
  "hadrians-wall-path": hadriansWallPath,
  "rob-roy-way": robRoyWay,
  "cotswold-way": cotswoldWay,
  "st-cuthberts-way": stCuthbertsWay,
  "cumbria-way": cumbriaWay,
  "great-glen-way": greatGlenWay
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

// Utility functions for formatting values

export type UnitSystem = "metric" | "imperial";

/**
 * Convert decimal hours to hours and minutes format
 * e.g., 5.75 -> "5h 45m"
 */
export function formatTime(decimalHours: number): string {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  
  if (hours === 0) {
    return `${minutes}m`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
}

/**
 * Convert kilometers to miles
 */
export function kmToMiles(km: number): number {
  return km * 0.621371;
}

/**
 * Convert meters to feet
 */
export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}

/**
 * Format a number as a fraction (½) for half values
 */
function formatWithFraction(value: number): string {
  const rounded = Math.round(value * 2) / 2; // Round to nearest 0.5
  const whole = Math.floor(rounded);
  const fraction = rounded - whole;
  
  if (fraction === 0.5) {
    return whole === 0 ? "½" : `${whole}½`;
  }
  return `${whole}`;
}

/**
 * Format distance based on unit system
 * Imperial uses fractions for half miles (e.g., 95½ mi)
 * Metric hides decimal for whole numbers (e.g., 153 km)
 */
export function formatDistance(km: number, units: UnitSystem): string {
  if (units === "imperial") {
    const miles = kmToMiles(km);
    return `${formatWithFraction(miles)} mi`;
  }
  // For metric, only show decimal if not a whole number
  const rounded = Math.round(km * 10) / 10;
  return rounded % 1 === 0 ? `${Math.round(rounded)} km` : `${rounded.toFixed(1)} km`;
}

/**
 * Format elevation based on unit system
 */
export function formatElevation(meters: number, units: UnitSystem): string {
  if (units === "imperial") {
    return `${Math.round(metersToFeet(meters))} ft`;
  }
  return `${Math.round(meters)} m`;
}

/**
 * Get distance unit label
 */
export function getDistanceUnit(units: UnitSystem): string {
  return units === "imperial" ? "mi" : "km";
}

/**
 * Get elevation unit label
 */
export function getElevationUnit(units: UnitSystem): string {
  return units === "imperial" ? "ft" : "m";
}

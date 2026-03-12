/** Shared colour palette for day segments — used by map, elevation profile, and itinerary */
export const dayColours = [
  "#2563eb", "#16a34a", "#ea580c", "#dc2626", "#7c3aed",
  "#0891b2", "#c026d3", "#65a30d", "#e11d48", "#f59e0b",
];

export const getDayColour = (walkingDayIndex: number) =>
  dayColours[walkingDayIndex % dayColours.length];

// West Highland Way Trail Data
// Speed profiles for different hiking paces

export type TrailDirection = "south-to-north" | "north-to-south";

export interface SpeedProfile {
  id: string;
  name: string;
  description: string;
  flatSpeed: number; // km/h
  ascentSpeed: number; // m/h
  descentSpeed: number; // m/h
}

export const speedProfiles: SpeedProfile[] = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Enjoy the journey, take time for photos, sightseeing, and frequent breaks.",
    flatSpeed: 3.5,
    ascentSpeed: 300,
    descentSpeed: 400,
  },
  {
    id: "hiker",
    name: "Hiker",
    description: "Walk steadily at a relaxed pace, take short breaks, and enjoy the scenery.",
    flatSpeed: 4.0,
    ascentSpeed: 400,
    descentSpeed: 600,
  },
  {
    id: "fastpacker",
    name: "Fastpacker",
    description: "Fit and experienced, maintain a strong pace, take minimal breaks.",
    flatSpeed: 5.0,
    ascentSpeed: 600,
    descentSpeed: 1000,
  },
  {
    id: "trailrunner",
    name: "Trail Runner",
    description: "Combine running and fast hiking, carry light gear, focus on efficient progress.",
    flatSpeed: 7.0,
    ascentSpeed: 1000,
    descentSpeed: 1500,
  },
];

export interface TrailNode {
  id: string;
  name: string;
  distanceFromStart: number; // km (cumulative)
  cumulativeAscent: number; // m (cumulative)
  cumulativeDescent: number; // m (cumulative)
  hasAccommodation: boolean;
  hasServices: boolean;
  description?: string;
}

// West Highland Way nodes from the trail data (matching spreadsheet exactly)
export const trailNodes: TrailNode[] = [
  { id: "milngavie", name: "Milngavie", distanceFromStart: 0, cumulativeAscent: 0, cumulativeDescent: 0, hasAccommodation: true, hasServices: true },
  { id: "drymen", name: "Drymen", distanceFromStart: 18.9, cumulativeAscent: 215, cumulativeDescent: 219, hasAccommodation: true, hasServices: true },
  { id: "balmaha", name: "Balmaha", distanceFromStart: 30.5, cumulativeAscent: 554, cumulativeDescent: 589, hasAccommodation: true, hasServices: true },
  { id: "rowardennan", name: "Rowardennan", distanceFromStart: 43.5, cumulativeAscent: 774, cumulativeDescent: 807, hasAccommodation: true, hasServices: true },
  { id: "inversnaid", name: "Inversnaid", distanceFromStart: 54.4, cumulativeAscent: 989, cumulativeDescent: 1016, hasAccommodation: true, hasServices: false },
  { id: "ardleish", name: "Ardleish", distanceFromStart: 61.1, cumulativeAscent: 1087, cumulativeDescent: 1124, hasAccommodation: true, hasServices: false },
  { id: "inverarnan", name: "Inverarnan", distanceFromStart: 64.9, cumulativeAscent: 1187, cumulativeDescent: 1215, hasAccommodation: true, hasServices: false },
  { id: "crianlarich", name: "Crianlarich", distanceFromStart: 74.4, cumulativeAscent: 1459, cumulativeDescent: 1255, hasAccommodation: true, hasServices: true },
  { id: "tyndrum", name: "Tyndrum", distanceFromStart: 83.7, cumulativeAscent: 1633, cumulativeDescent: 1461, hasAccommodation: true, hasServices: true },
  { id: "bridge-of-orchy", name: "Bridge of Orchy", distanceFromStart: 94.5, cumulativeAscent: 1773, cumulativeDescent: 1638, hasAccommodation: true, hasServices: true },
  { id: "inveroran", name: "Inveroran", distanceFromStart: 98.6, cumulativeAscent: 1930, cumulativeDescent: 1806, hasAccommodation: true, hasServices: false },
  { id: "kingshouse", name: "Kingshouse", distanceFromStart: 114.2, cumulativeAscent: 2241, cumulativeDescent: 2049, hasAccommodation: true, hasServices: true },
  { id: "kinlochleven", name: "Kinlochleven", distanceFromStart: 128.5, cumulativeAscent: 2596, cumulativeDescent: 2637, hasAccommodation: true, hasServices: true },
  { id: "fort-william", name: "Fort William", distanceFromStart: 153.2, cumulativeAscent: 3122, cumulativeDescent: 3168, hasAccommodation: true, hasServices: true },
];

export interface TrailSegment {
  fromNode: TrailNode;
  toNode: TrailNode;
  distance: number;
  ascent: number;
  descent: number;
  baseTime: number; // hours at steady pace
}

// Calculate segments between nodes with time estimates
export function calculateSegments(): TrailSegment[] {
  const segments: TrailSegment[] = [];
  
  for (let i = 0; i < trailNodes.length - 1; i++) {
    const from = trailNodes[i];
    const to = trailNodes[i + 1];
    
    const distance = to.distanceFromStart - from.distanceFromStart;
    const ascent = to.cumulativeAscent - from.cumulativeAscent;
    const descent = to.cumulativeDescent - from.cumulativeDescent;
    
    segments.push({
      fromNode: from,
      toNode: to,
      distance: Number(distance.toFixed(1)),
      ascent: Math.round(ascent),
      descent: Math.round(descent),
      baseTime: 0, // Will be calculated per speed profile
    });
  }
  
  return segments;
}

// Calculate segment time for a specific speed profile
export function calculateSegmentTime(
  distance: number,
  ascent: number,
  descent: number,
  speedProfile: SpeedProfile
): number {
  // Time = (distance / flat_speed) + (ascent / ascent_speed) + (descent / descent_speed)
  const flatTime = distance / speedProfile.flatSpeed;
  const ascentTime = ascent / speedProfile.ascentSpeed;
  const descentTime = descent / speedProfile.descentSpeed;
  return flatTime + ascentTime + descentTime;
}

// Calculate total time based on speed profile
export function calculateTotalTime(speedProfile: SpeedProfile): number {
  const segments = calculateSegments();
  let totalTime = 0;
  
  for (const seg of segments) {
    totalTime += calculateSegmentTime(seg.distance, seg.ascent, seg.descent, speedProfile);
  }
  
  return totalTime;
}

// Calculate days based on hours per day
export function calculateDays(totalHours: number, hoursPerDay: number): number {
  const rawDays = totalHours / hoursPerDay;
  const decimal = rawDays % 1;
  
  // Round up if decimal > 0.25, otherwise round down
  return decimal > 0.25 ? Math.ceil(rawDays) : Math.floor(rawDays);
}

export interface DayPlan {
  day: number;
  startNode: TrailNode;
  endNode: TrailNode;
  distance: number;
  ascent: number;
  descent: number;
  walkingTime: number;
  isRestDay: boolean;
  date?: Date;
}

// Generate optimal itinerary based on number of days
export function generateItinerary(
  numberOfDays: number,
  speedProfile: SpeedProfile,
  startDate: Date
): DayPlan[] {
  const segments = calculateSegments();
  const totalTime = calculateTotalTime(speedProfile);
  const targetTimePerDay = totalTime / numberOfDays;
  
  const plans: DayPlan[] = [];
  let currentNodeIndex = 0;
  let currentTime = 0;
  let dayNumber = 1;
  
  while (currentNodeIndex < trailNodes.length - 1 && dayNumber <= numberOfDays) {
    const startNode = trailNodes[currentNodeIndex];
    let dayTime = 0;
    let dayDistance = 0;
    let dayAscent = 0;
    let dayDescent = 0;
    let endNodeIndex = currentNodeIndex;
    
    // Accumulate segments until we reach target time for the day
    while (endNodeIndex < trailNodes.length - 1) {
      const segment = segments[endNodeIndex];
      const segmentTime = calculateSegmentTime(segment.distance, segment.ascent, segment.descent, speedProfile);
      
      // Check if adding this segment would exceed target (with some flexibility)
      if (dayTime + segmentTime > targetTimePerDay * 1.3 && endNodeIndex > currentNodeIndex) {
        break;
      }
      
      dayTime += segmentTime;
      dayDistance += segment.distance;
      dayAscent += segment.ascent;
      dayDescent += segment.descent;
      endNodeIndex++;
      
      // Prefer stopping at accommodation nodes
      if (trailNodes[endNodeIndex].hasAccommodation && dayTime >= targetTimePerDay * 0.8) {
        break;
      }
    }
    
    // Ensure we end at the last node on the final day
    if (dayNumber === numberOfDays) {
      while (endNodeIndex < trailNodes.length - 1) {
        const segment = segments[endNodeIndex];
        const segmentTime = calculateSegmentTime(segment.distance, segment.ascent, segment.descent, speedProfile);
        dayTime += segmentTime;
        dayDistance += segment.distance;
        dayAscent += segment.ascent;
        dayDescent += segment.descent;
        endNodeIndex++;
      }
    }
    
    const dayDate = new Date(startDate);
    dayDate.setDate(dayDate.getDate() + dayNumber - 1);
    
    plans.push({
      day: dayNumber,
      startNode,
      endNode: trailNodes[endNodeIndex],
      distance: Number(dayDistance.toFixed(1)),
      ascent: Math.round(dayAscent),
      descent: Math.round(dayDescent),
      walkingTime: Number(dayTime.toFixed(1)),
      isRestDay: false,
      date: dayDate,
    });
    
    currentNodeIndex = endNodeIndex;
    dayNumber++;
  }
  
  return plans;
}

// Get all available stop nodes (those with accommodation)
export function getAccommodationNodes(): TrailNode[] {
  return trailNodes.filter(node => node.hasAccommodation);
}

// Get nodes in the correct order based on direction
export function getDirectionalNodes(direction: TrailDirection): TrailNode[] {
  if (direction === "north-to-south") {
    // Reverse the nodes and recalculate cumulative values
    const reversed = [...trailNodes].reverse();
    const totalDistance = trailNodes[trailNodes.length - 1].distanceFromStart;
    const totalAscent = trailNodes[trailNodes.length - 1].cumulativeAscent;
    const totalDescent = trailNodes[trailNodes.length - 1].cumulativeDescent;
    
    return reversed.map((node, index) => {
      const originalNode = trailNodes[trailNodes.length - 1 - index];
      return {
        ...node,
        distanceFromStart: totalDistance - originalNode.distanceFromStart,
        // Swap ascent and descent for reverse direction
        cumulativeAscent: totalDescent - originalNode.cumulativeDescent,
        cumulativeDescent: totalAscent - originalNode.cumulativeAscent,
      };
    });
  }
  return trailNodes;
}

// Calculate total time based on speed profile and direction
export function calculateTotalTimeWithDirection(speedProfile: SpeedProfile, direction: TrailDirection): number {
  const nodes = getDirectionalNodes(direction);
  let totalTime = 0;
  
  for (let i = 0; i < nodes.length - 1; i++) {
    const from = nodes[i];
    const to = nodes[i + 1];
    const distance = to.distanceFromStart - from.distanceFromStart;
    const ascent = to.cumulativeAscent - from.cumulativeAscent;
    const descent = to.cumulativeDescent - from.cumulativeDescent;
    totalTime += calculateSegmentTime(distance, ascent, descent, speedProfile);
  }
  
  return totalTime;
}

// Generate itinerary with direction support
export function generateItineraryWithDirection(
  numberOfDays: number,
  speedProfile: SpeedProfile,
  startDate: Date,
  direction: TrailDirection
): DayPlan[] {
  const nodes = getDirectionalNodes(direction);
  const totalTime = calculateTotalTimeWithDirection(speedProfile, direction);
  const targetTimePerDay = totalTime / numberOfDays;
  
  const plans: DayPlan[] = [];
  let currentNodeIndex = 0;
  let dayNumber = 1;
  
  while (currentNodeIndex < nodes.length - 1 && dayNumber <= numberOfDays) {
    const startNode = nodes[currentNodeIndex];
    let dayTime = 0;
    let dayDistance = 0;
    let dayAscent = 0;
    let dayDescent = 0;
    let endNodeIndex = currentNodeIndex;
    
    // Accumulate segments until we reach target time for the day
    while (endNodeIndex < nodes.length - 1) {
      const from = nodes[endNodeIndex];
      const to = nodes[endNodeIndex + 1];
      const segDistance = to.distanceFromStart - from.distanceFromStart;
      const segAscent = to.cumulativeAscent - from.cumulativeAscent;
      const segDescent = to.cumulativeDescent - from.cumulativeDescent;
      const segmentTime = calculateSegmentTime(segDistance, segAscent, segDescent, speedProfile);
      
      // Check if adding this segment would exceed target (with some flexibility)
      if (dayTime + segmentTime > targetTimePerDay * 1.3 && endNodeIndex > currentNodeIndex) {
        break;
      }
      
      dayTime += segmentTime;
      dayDistance += segDistance;
      dayAscent += segAscent;
      dayDescent += segDescent;
      endNodeIndex++;
      
      // Prefer stopping at accommodation nodes
      if (nodes[endNodeIndex].hasAccommodation && dayTime >= targetTimePerDay * 0.8) {
        break;
      }
    }
    
    // Ensure we end at the last node on the final day
    if (dayNumber === numberOfDays) {
      while (endNodeIndex < nodes.length - 1) {
        const from = nodes[endNodeIndex];
        const to = nodes[endNodeIndex + 1];
        const segDistance = to.distanceFromStart - from.distanceFromStart;
        const segAscent = to.cumulativeAscent - from.cumulativeAscent;
        const segDescent = to.cumulativeDescent - from.cumulativeDescent;
        const segmentTime = calculateSegmentTime(segDistance, segAscent, segDescent, speedProfile);
        dayTime += segmentTime;
        dayDistance += segDistance;
        dayAscent += segAscent;
        dayDescent += segDescent;
        endNodeIndex++;
      }
    }
    
    const dayDate = new Date(startDate);
    dayDate.setDate(dayDate.getDate() + dayNumber - 1);
    
    plans.push({
      day: dayNumber,
      startNode,
      endNode: nodes[endNodeIndex],
      distance: Number(dayDistance.toFixed(1)),
      ascent: Math.round(dayAscent),
      descent: Math.round(dayDescent),
      walkingTime: Number(dayTime.toFixed(1)),
      isRestDay: false,
      date: dayDate,
    });
    
    currentNodeIndex = endNodeIndex;
    dayNumber++;
  }
  
  return plans;
}

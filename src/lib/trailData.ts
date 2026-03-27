// Trail calculation logic — config-driven
// All trail-specific data comes from the config; this file provides pure calculation functions.

import { getTrailConfig } from "@/config";
import type { TrailNodeConfig, SpeedProfileConfig } from "@/config";

export type TrailDirection = "south-to-north" | "north-to-south";

// Re-export config types under the names the rest of the app expects
export type SpeedProfile = SpeedProfileConfig;
export type TrailNode = TrailNodeConfig;

// Lazy convenience accessors — resolved at call-time, not import-time
export function speedProfiles(): SpeedProfile[] {
  return getTrailConfig().speedProfiles;
}
export function trailNodes(): TrailNode[] {
  return getTrailConfig().nodes;
}

export interface TrailSegment {
  fromNode: TrailNode;
  toNode: TrailNode;
  distance: number;
  ascent: number;
  descent: number;
  baseTime: number;
}

// Calculate segments between nodes with time estimates
export function calculateSegments(nodes: TrailNode[] = getTrailConfig().nodes): TrailSegment[] {
  const segments: TrailSegment[] = [];

  for (let i = 0; i < nodes.length - 1; i++) {
    const from = nodes[i];
    const to = nodes[i + 1];

    const distance = to.distanceFromStart - from.distanceFromStart;
    const ascent = to.cumulativeAscent - from.cumulativeAscent;
    const descent = to.cumulativeDescent - from.cumulativeDescent;

    segments.push({
      fromNode: from,
      toNode: to,
      distance: Number(distance.toFixed(1)),
      ascent: Math.round(ascent),
      descent: Math.round(descent),
      baseTime: 0,
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
  const flatTime = distance / speedProfile.flatSpeed;
  const ascentTime = ascent / speedProfile.ascentSpeed;
  const descentTime = descent / speedProfile.descentSpeed;
  return flatTime + ascentTime + descentTime;
}

// Calculate total time based on speed profile
export function calculateTotalTime(speedProfile: SpeedProfile, nodes: TrailNode[] = getTrailConfig().nodes): number {
  const segments = calculateSegments(nodes);
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
  startDate: Date,
  nodes: TrailNode[] = getTrailConfig().nodes
): DayPlan[] {
  const segments = calculateSegments(nodes);
  const totalTime = calculateTotalTime(speedProfile, nodes);
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

    while (endNodeIndex < nodes.length - 1) {
      const segment = segments[endNodeIndex];
      const segmentTime = calculateSegmentTime(segment.distance, segment.ascent, segment.descent, speedProfile);

      if (dayTime + segmentTime > targetTimePerDay * 1.3 && endNodeIndex > currentNodeIndex) {
        break;
      }

      dayTime += segmentTime;
      dayDistance += segment.distance;
      dayAscent += segment.ascent;
      dayDescent += segment.descent;
      endNodeIndex++;

      if (nodes[endNodeIndex].hasAccommodation && dayTime >= targetTimePerDay * 0.8) {
        break;
      }
    }

    if (dayNumber === numberOfDays) {
      while (endNodeIndex < nodes.length - 1) {
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

// Get all available stop nodes (those with accommodation)
export function getAccommodationNodes(nodes: TrailNode[] = getTrailConfig().nodes): TrailNode[] {
  return nodes.filter((node) => node.hasAccommodation);
}

// Get nodes in the correct order based on direction
export function getDirectionalNodes(direction: TrailDirection, nodes: TrailNode[] = getTrailConfig().nodes): TrailNode[] {
  if (direction === "north-to-south") {
    const reversed = [...nodes].reverse();
    const totalDistance = nodes[nodes.length - 1].distanceFromStart;
    const totalAscent = nodes[nodes.length - 1].cumulativeAscent;
    const totalDescent = nodes[nodes.length - 1].cumulativeDescent;

    return reversed.map((node, index) => {
      const originalNode = nodes[nodes.length - 1 - index];
      return {
        ...node,
        distanceFromStart: totalDistance - originalNode.distanceFromStart,
        cumulativeAscent: totalDescent - originalNode.cumulativeDescent,
        cumulativeDescent: totalAscent - originalNode.cumulativeAscent,
      };
    });
  }
  return nodes;
}

// Calculate total time based on speed profile and direction
export function calculateTotalTimeWithDirection(
  speedProfile: SpeedProfile,
  direction: TrailDirection,
  nodes: TrailNode[] = trailNodes
): number {
  const dirNodes = getDirectionalNodes(direction, nodes);
  let totalTime = 0;

  for (let i = 0; i < dirNodes.length - 1; i++) {
    const from = dirNodes[i];
    const to = dirNodes[i + 1];
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
  direction: TrailDirection,
  nodes: TrailNode[] = trailNodes
): DayPlan[] {
  const dirNodes = getDirectionalNodes(direction, nodes);
  const totalTime = calculateTotalTimeWithDirection(speedProfile, direction, nodes);
  const targetTimePerDay = totalTime / numberOfDays;

  const plans: DayPlan[] = [];
  let currentNodeIndex = 0;
  let dayNumber = 1;

  while (currentNodeIndex < dirNodes.length - 1 && dayNumber <= numberOfDays) {
    const startNode = dirNodes[currentNodeIndex];
    let dayTime = 0;
    let dayDistance = 0;
    let dayAscent = 0;
    let dayDescent = 0;
    let endNodeIndex = currentNodeIndex;

    while (endNodeIndex < dirNodes.length - 1) {
      const from = dirNodes[endNodeIndex];
      const to = dirNodes[endNodeIndex + 1];
      const segDistance = to.distanceFromStart - from.distanceFromStart;
      const segAscent = to.cumulativeAscent - from.cumulativeAscent;
      const segDescent = to.cumulativeDescent - from.cumulativeDescent;
      const segmentTime = calculateSegmentTime(segDistance, segAscent, segDescent, speedProfile);

      if (dayTime + segmentTime > targetTimePerDay * 1.3 && endNodeIndex > currentNodeIndex) {
        break;
      }

      dayTime += segmentTime;
      dayDistance += segDistance;
      dayAscent += segAscent;
      dayDescent += segDescent;
      endNodeIndex++;

      if (dirNodes[endNodeIndex].hasAccommodation && dayTime >= targetTimePerDay * 0.8) {
        break;
      }
    }

    if (dayNumber === numberOfDays) {
      while (endNodeIndex < dirNodes.length - 1) {
        const from = dirNodes[endNodeIndex];
        const to = dirNodes[endNodeIndex + 1];
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
      endNode: dirNodes[endNodeIndex],
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

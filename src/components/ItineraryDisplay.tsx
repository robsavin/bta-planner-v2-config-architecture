import { format } from "date-fns";
import { 
  MapPin, 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  Mountain, 
  Coffee,
  Bed,
  Plus,
  Trash2,
  Pencil,
  Navigation
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  type DayPlan, 
  type TrailNode, 
  type TrailDirection,
  getDirectionalNodes
} from "@/lib/trailData";
import { formatTime, formatDistance, formatElevation, type UnitSystem } from "@/lib/formatUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MapDisplay = lazy(() => import("@/components/MapDisplay"));
import QuoteRequestForm from "@/components/QuoteRequestForm";
import ShareItineraryButton from "@/components/ShareItineraryButton";
import GpxDownloadButton from "@/components/GpxDownloadButton";

interface ItineraryDisplayProps {
  itinerary: DayPlan[];
  speedProfile: { name: string; description: string; id?: string; flatSpeed?: number; ascentSpeed?: number; descentSpeed?: number };
  direction: TrailDirection;
  units: UnitSystem;
  hoursPerDay: number;
  onUpdateDay: (dayIndex: number, updates: Partial<DayPlan>) => void;
  onAddRestDay: (afterDayIndex: number) => void;
  onRemoveDay: (dayIndex: number) => void;
  onAddWalkingDay?: (afterDayIndex: number) => void;
}

const ItineraryDisplay = ({ 
  itinerary, 
  speedProfile,
  direction,
  units,
  hoursPerDay,
  onUpdateDay, 
  onAddRestDay,
  onRemoveDay,
  onAddWalkingDay
}: ItineraryDisplayProps) => {
  // Get nodes in the correct direction
  const directionalNodes = getDirectionalNodes(direction);
  
  // Get valid end nodes based on start node
  const getValidEndNodes = (startNode: TrailNode): TrailNode[] => {
    const startIndex = directionalNodes.findIndex(n => n.id === startNode.id);
    return directionalNodes.slice(startIndex + 1).filter(n => n.hasAccommodation || n === directionalNodes[directionalNodes.length - 1]);
  };
  
  // Get valid start nodes based on previous day's end
  const getValidStartNodes = (dayIndex: number): TrailNode[] => {
    if (dayIndex === 0) return [directionalNodes[0]]; // First day must start at first node
    
    // Find previous non-rest day's end node
    for (let i = dayIndex - 1; i >= 0; i--) {
      if (!itinerary[i].isRestDay) {
        return [itinerary[i].endNode];
      }
    }
    return [directionalNodes[0]];
  };

  const directionLabel = direction === "south-to-north" ? "South → North" : "North → South";
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Your Itinerary{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({directionLabel} • {speedProfile.name} pace • {hoursPerDay}h/day)
            </span>
          </h2>
        </div>
        {/* Hint text for editing */}
        <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg border border-primary/20">
          <Pencil className="h-4 w-4" />
          <span>
            <strong>Tip:</strong> Click on any destination to customise your route and overnight stops
          </span>
        </div>
      </div>
      
      {/* Interactive Map */}
      <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}>
        <MapDisplay itinerary={itinerary} direction={direction} />
      </Suspense>
      {/* Timeline */}
      <div className="relative space-y-0">
        {itinerary.map((day, index) => {
          // Find the first walking day index
          const firstWalkingDayIndex = itinerary.findIndex(d => !d.isRestDay);
          const finalNode = directionalNodes[directionalNodes.length - 1];
          
          // Detect trail completion using -end suffix or matching the final node
          const isAtTrailEnd = (node: TrailNode) => 
            node.id.includes('-end') || node.id === finalNode.id;
          
          // Check if the trail was completed on a previous day
          const trailCompletedOnPreviousDay = itinerary.slice(0, index).some(
            d => !d.isRestDay && isAtTrailEnd(d.endNode)
          );
          
          // Check if this day ends at the final destination
          const isTrailComplete = !day.isRestDay && isAtTrailEnd(day.endNode);
          
          // Can delete this day if trail was already completed before this day
          const canDelete = day.isRestDay || trailCompletedOnPreviousDay;
          
          return (
            <DayCard
              key={`${day.day}-${index}`}
              day={day}
              dayIndex={index}
              isFirst={index === 0}
              isLast={index === itinerary.length - 1}
              isFirstWalkingDay={index === firstWalkingDayIndex}
              isTrailComplete={isTrailComplete}
              validStartNodes={getValidStartNodes(index)}
              validEndNodes={day.isRestDay ? [] : getValidEndNodes(day.startNode)}
              directionalNodes={directionalNodes}
              units={units}
              onUpdate={(updates) => onUpdateDay(index, updates)}
              onAddRestDay={() => onAddRestDay(index)}
              onRemove={canDelete ? () => onRemoveDay(index) : undefined}
              onAddWalkingDay={onAddWalkingDay ? () => onAddWalkingDay(index) : undefined}
              direction={direction}
            />
          );
        })}
      </div>
      
      {/* Summary */}
      <ItinerarySummary itinerary={itinerary} units={units} />
      
      {/* Share & Quote Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <ShareItineraryButton itinerary={itinerary} speedProfile={speedProfile} units={units} />
      </div>
      
      {/* Quote Request */}
      <QuoteRequestForm itinerary={itinerary} />
    </div>
  );
};

interface DayCardProps {
  day: DayPlan;
  dayIndex: number;
  isFirst: boolean;
  isLast: boolean;
  isFirstWalkingDay: boolean;
  isTrailComplete: boolean;
  validStartNodes: TrailNode[];
  validEndNodes: TrailNode[];
  directionalNodes: TrailNode[];
  units: UnitSystem;
  onUpdate: (updates: Partial<DayPlan>) => void;
  onAddRestDay: () => void;
  onRemove?: () => void;
  onAddWalkingDay?: () => void;
  direction: TrailDirection;
}

const DayCard = ({ 
  day, 
  dayIndex,
  isFirst, 
  isLast,
  isFirstWalkingDay,
  isTrailComplete,
  validStartNodes,
  validEndNodes,
  directionalNodes,
  units,
  onUpdate,
  onAddRestDay,
  onRemove,
  onAddWalkingDay,
  direction
}: DayCardProps) => {
  if (day.isRestDay) {
    return (
      <div className="relative pl-12 pb-6">
        {/* Timeline connector */}
        {!isFirst && (
          <div className="absolute left-[1.1rem] top-0 h-8 w-0.5 bg-gradient-to-b from-border to-primary/30" />
        )}
        
        {/* Day marker */}
        <div className="absolute left-0 top-8 flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-primary/50 bg-card">
          <Coffee className="h-5 w-5 text-primary" />
        </div>
        
        {/* Rest connector line */}
        {!isLast && (
          <div className="absolute left-[1.1rem] top-[4.5rem] bottom-0 w-0.5 bg-gradient-to-b from-primary/30 to-border" />
        )}
        
        {/* Rest day card */}
        <div className="ml-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-primary">Rest Day</span>
                {day.date && (
                  <span className="text-sm text-muted-foreground">
                    • {format(day.date, "EEE, MMM d")}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Bed className="h-4 w-4" />
                Staying at {day.startNode.name}
              </p>
            </div>
            {onRemove && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative pl-12 pb-6">
      {/* Timeline connector - top */}
      {!isFirst && (
        <div className="absolute left-[1.1rem] top-0 h-8 w-0.5 bg-gradient-to-b from-border to-primary" />
      )}
      
      {/* Day marker */}
      <div className="absolute left-0 top-8 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground font-bold">
        {day.day}
      </div>
      
      {/* Timeline connector - bottom */}
      {!isLast && (
        <div className="absolute left-[1.1rem] top-[4.5rem] bottom-0 w-0.5 bg-gradient-to-b from-primary to-border" />
      )}
      
      {/* Day card */}
      <div className="ml-4 trail-card p-5">
        {/* Date header */}
        {day.date && (
          <div className="text-sm text-muted-foreground mb-3">
            {format(day.date, "EEEE, MMMM d, yyyy")}
          </div>
        )}
        
        {/* Route */}
        <div className="flex flex-col gap-3 mb-4">
          {/* Start location */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-highland-green/20 text-highland-green">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">From</span>
            <span className="text-lg font-semibold">{day.startNode.name}</span>
          </div>
          
          {/* Arrow connector */}
          <div className="flex items-center gap-2 pl-3">
            <div className="w-0.5 h-4 bg-gradient-to-b from-highland-green to-primary" />
          </div>
          
          {/* End location selector - clearer "To" destination */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary">
              <Navigation className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">To</span>
            <div className="flex-1">
              <Select
                value={day.endNode.id}
                onValueChange={(value) => {
                  const newEndNode = directionalNodes.find(n => n.id === value);
                  if (newEndNode) {
                    onUpdate({ endNode: newEndNode });
                  }
                }}
              >
                <SelectTrigger 
                  className={cn(
                    "h-auto py-2 border-2 hover:border-primary/50 transition-all bg-primary/5",
                    isFirstWalkingDay && "animate-pulse ring-2 ring-primary/40 ring-offset-2"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{day.endNode.name}</span>
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  {validEndNodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      <div className="flex items-center gap-2">
                        <span>{node.name}</span>
                        {node.hasServices && (
                          <span className="text-xs text-muted-foreground">(services)</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/50">
          <StatItem 
            icon={<Mountain className="h-4 w-4" />} 
            value={formatDistance(day.distance, units)} 
            label="Distance" 
          />
          <StatItem 
            icon={<Clock className="h-4 w-4" />} 
            value={formatTime(day.walkingTime)} 
            label="Moving" 
          />
          <StatItem 
            icon={<ArrowUp className="h-4 w-4" />} 
            value={formatElevation(day.ascent, units)} 
            label="Ascent" 
          />
          <StatItem 
            icon={<ArrowDown className="h-4 w-4" />} 
            value={formatElevation(day.descent, units)} 
            label="Descent" 
          />
        </div>
        
        {/* GPX Download */}
        <div className="mt-3">
          <GpxDownloadButton day={day} direction={direction} />
        </div>

        {/* Action buttons */}
        <div className="mt-2 flex justify-between items-center">
          {/* Delete button - only show if trail was already completed */}
          {onRemove ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove day
            </Button>
          ) : (
            <div />
          )}
          
          {/* Action button logic:
              - If trail is complete on this day: show "Add rest day after"
              - If trail incomplete and this is the last day: show "Add another day on the trail"
              - Otherwise: show "Add rest day after"
          */}
          {isTrailComplete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddRestDay}
              className="text-muted-foreground hover:text-primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add rest day after
            </Button>
          ) : isLast && onAddWalkingDay ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddWalkingDay}
              className="text-primary hover:text-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add another day on the trail
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddRestDay}
              className="text-muted-foreground hover:text-primary"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add rest day after
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ 
  icon, 
  value, 
  label 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string 
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
      {icon}
      <span className="text-xs uppercase tracking-wider">{label}</span>
    </div>
    <span className="font-bold text-foreground">{value}</span>
  </div>
);

const ItinerarySummary = ({ itinerary, units }: { itinerary: DayPlan[]; units: UnitSystem }) => {
  const walkingDays = itinerary.filter(d => !d.isRestDay);
  const restDays = itinerary.filter(d => d.isRestDay);
  
  const totalDistance = walkingDays.reduce((sum, d) => sum + d.distance, 0);
  const totalAscent = walkingDays.reduce((sum, d) => sum + d.ascent, 0);
  const totalDescent = walkingDays.reduce((sum, d) => sum + d.descent, 0);
  const totalWalkingTime = walkingDays.reduce((sum, d) => sum + d.walkingTime, 0);
  
  return (
    <div className="rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10 p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Journey Summary</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{walkingDays.length}</div>
          <div className="text-sm text-muted-foreground">Active Days</div>
        </div>
        {restDays.length > 0 && (
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">{restDays.length}</div>
            <div className="text-sm text-muted-foreground">Rest Days</div>
          </div>
        )}
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{formatDistance(totalDistance, units)}</div>
          <div className="text-sm text-muted-foreground">Total Distance</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{formatTime(totalWalkingTime)}</div>
          <div className="text-sm text-muted-foreground">Total Time</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-border/50">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-highland-green mb-1">
            <ArrowUp className="h-4 w-4" />
            <span className="text-xl font-bold">{formatElevation(totalAscent, units)}</span>
          </div>
          <div className="text-xs text-muted-foreground">Total Ascent</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-mountain-gray mb-1">
            <ArrowDown className="h-4 w-4" />
            <span className="text-xl font-bold">{formatElevation(totalDescent, units)}</span>
          </div>
          <div className="text-xs text-muted-foreground">Total Descent</div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDisplay;

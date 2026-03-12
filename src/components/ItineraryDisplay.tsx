import { useState } from "react";
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
  Navigation,
  ChevronDown,
  ChevronUp,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getDayColour } from "@/lib/dayColours";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const directionalNodes = getDirectionalNodes(direction);
  
  // Collapse state: day 1 expanded, rest collapsed
  const [expandedDays, setExpandedDays] = useState<Set<number>>(() => new Set([0]));

  const toggleDay = (index: number) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const allExpanded = itinerary.every((_, i) => expandedDays.has(i));
  const toggleAll = () => {
    if (allExpanded) {
      setExpandedDays(new Set());
    } else {
      setExpandedDays(new Set(itinerary.map((_, i) => i)));
    }
  };

  const anyExpanded = expandedDays.size > 0;

  const getValidEndNodes = (startNode: TrailNode): TrailNode[] => {
    const startIndex = directionalNodes.findIndex(n => n.id === startNode.id);
    return directionalNodes.slice(startIndex + 1).filter(n => n.hasAccommodation || n === directionalNodes[directionalNodes.length - 1]);
  };
  
  const getValidStartNodes = (dayIndex: number): TrailNode[] => {
    if (dayIndex === 0) return [directionalNodes[0]];
    for (let i = dayIndex - 1; i >= 0; i--) {
      if (!itinerary[i].isRestDay) {
        return [itinerary[i].endNode];
      }
    }
    return [directionalNodes[0]];
  };

  const directionLabel = direction === "south-to-north" ? "South → North" : "North → South";
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Your Itinerary{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({directionLabel} • {speedProfile.name} pace • {hoursPerDay}h/day)
            </span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleAll}
            className="text-muted-foreground hover:text-primary shrink-0"
          >
            {allExpanded ? (
              <><ChevronsUp className="h-4 w-4 mr-1" /> Collapse all</>
            ) : (
              <><ChevronsDown className="h-4 w-4 mr-1" /> Expand all</>
            )}
          </Button>
        </div>
        {anyExpanded && (
          <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-lg border border-primary/20">
            <Pencil className="h-4 w-4" />
            <span>
              <strong>Tip:</strong> Click on any destination to customise your route and overnight stops
            </span>
          </div>
        )}
      </div>
      
      {/* Timeline */}
      <div className="relative">
        {/* Continuous vertical line — now per-segment coloured, handled inside DayCard */}
        {itinerary.map((day, index) => {
          const firstWalkingDayIndex = itinerary.findIndex(d => !d.isRestDay);
          // Compute walking day index for colour
          let walkingDayIdx = 0;
          for (let i = 0; i < index; i++) {
            if (!itinerary[i].isRestDay) walkingDayIdx++;
          }
          const finalNode = directionalNodes[directionalNodes.length - 1];
          const isAtTrailEnd = (node: TrailNode) =>
            node.id.includes('-end') || node.id === finalNode.id;
          
          const trailCompletedOnPreviousDay = itinerary.slice(0, index).some(
            d => !d.isRestDay && isAtTrailEnd(d.endNode)
          );
          
          const isTrailComplete = !day.isRestDay && isAtTrailEnd(day.endNode);
          const canDelete = day.isRestDay || trailCompletedOnPreviousDay;
          const isExpanded = expandedDays.has(index);
          
          return (
            <DayCard
              key={`${day.day}-${index}`}
              day={day}
              dayIndex={index}
              walkingDayIndex={walkingDayIdx}
              isFirst={index === 0}
              isLast={index === itinerary.length - 1}
              isFirstWalkingDay={index === firstWalkingDayIndex}
              isTrailComplete={isTrailComplete}
              isExpanded={isExpanded}
              onToggle={() => toggleDay(index)}
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
    </div>
  );
};

interface DayCardProps {
  day: DayPlan;
  dayIndex: number;
  walkingDayIndex: number;
  isFirst: boolean;
  isLast: boolean;
  isFirstWalkingDay: boolean;
  isTrailComplete: boolean;
  isExpanded: boolean;
  onToggle: () => void;
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
  walkingDayIndex,
  isFirst, 
  isLast,
  isFirstWalkingDay,
  isTrailComplete,
  isExpanded,
  onToggle,
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
  const dayColor = day.isRestDay ? "hsl(var(--border))" : getDayColour(walkingDayIndex);

  // Timeline column — circle + connector line to next card
  const renderTimeline = (circle: React.ReactNode) => (
    <div style={{ width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
      <div style={{ position: 'relative', zIndex: 10 }}>
        {circle}
      </div>
      {/* Connector line to next day */}
      {!isLast && (
        <div style={{ flex: 1, width: 2, backgroundColor: dayColor, minHeight: 8 }} />
      )}
    </div>
  );

  if (day.isRestDay) {
    return (
      <div className={cn("flex", !isLast && "pb-4 md:pb-6")}>
        {renderTimeline(
          <div style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px dashed', borderColor: 'hsl(var(--primary) / 0.5)', backgroundColor: 'hsl(var(--card))', flexShrink: 0, boxShadow: '0 0 0 4px hsl(var(--background))' }}>
            <Coffee className="h-5 w-5 text-primary" />
          </div>
        )}
        <div className="ml-4 flex-1 min-w-0 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-3 md:p-4">
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

  const dayCircle = (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 text-white font-bold shrink-0 ring-4 ring-background"
      style={{ backgroundColor: dayColor, borderColor: dayColor }}
    >
      {day.day}
    </div>
  );

  // Collapsed view
  if (!isExpanded) {
    return (
      <div className={cn("flex", !isLast && "pb-4 md:pb-6")}>
        {renderTimeline(dayCircle)}
        <button
          onClick={onToggle}
          className="ml-4 flex-1 min-w-0 text-left trail-card p-3 md:p-4 hover:ring-2 hover:ring-primary/30 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              {day.date && (
                <div className="text-xs text-muted-foreground mb-1">
                  {format(day.date, "EEE, MMM d")}
                </div>
              )}
              <div className="font-semibold text-sm md:text-base truncate">
                {day.startNode.name} → {day.endNode.name}
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs md:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mountain className="h-3.5 w-3.5" />
                  {formatDistance(day.distance, units)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatTime(day.walkingTime)}
                </span>
              </div>
            </div>
            <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
          </div>
        </button>
      </div>
    );
  }

  // Expanded view
  return (
    <div className={cn("flex", !isLast && "pb-4 md:pb-6")}>
      {renderTimeline(dayCircle)}
      <div className="ml-4 flex-1 min-w-0 trail-card p-4 md:p-5">
        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-2 cursor-pointer"
        >
          <ChevronUp className="h-4 w-4" />
          Collapse
        </button>

        {day.date && (
          <div className="text-sm text-muted-foreground mb-3">
            {format(day.date, "EEEE, MMMM d, yyyy")}
          </div>
        )}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-highland-green/20 text-highland-green">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">From</span>
            <span className="text-base md:text-lg font-semibold">{day.startNode.name}</span>
          </div>
          <div className="flex items-center gap-2 pl-3">
            <div className="w-0.5 h-4 bg-primary" />
          </div>
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
                    <span className="text-base md:text-lg font-semibold">{day.endNode.name}</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-muted/50">
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

        {/* Description */}
        {day.endNode.description && (
          <p className="mt-3 text-sm italic text-muted-foreground">{day.endNode.description}</p>
        )}

        {/* Action buttons */}
        <div className="mt-2 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
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
          
          {isTrailComplete ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddRestDay}
              className="text-muted-foreground hover:text-primary w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add rest day after
            </Button>
          ) : isLast && onAddWalkingDay ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddWalkingDay}
              className="text-primary hover:text-primary hover:bg-primary/10 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add another day on the trail
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddRestDay}
              className="text-muted-foreground hover:text-primary w-full sm:w-auto"
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

export default ItineraryDisplay;

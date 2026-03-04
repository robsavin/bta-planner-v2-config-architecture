import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import StepBadge from "./StepBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type TrailDirection = "south-to-north" | "north-to-south";

interface DirectionSelectorProps {
  selectedDirection: TrailDirection;
  onDirectionChange: (direction: TrailDirection) => void;
  stepNumber?: number;
  compact?: boolean;
}

const directions = [
  {
    id: "south-to-north" as TrailDirection,
    name: "South to North",
    description: "Milngavie to Fort William (traditional route)",
    icon: <ArrowRight className="h-5 w-5" />,
  },
  {
    id: "north-to-south" as TrailDirection,
    name: "North to South",
    description: "Fort William to Milngavie",
    icon: <ArrowLeft className="h-5 w-5" />,
  },
];

const DirectionSelector = ({ selectedDirection, onDirectionChange, stepNumber = 1, compact = false }: DirectionSelectorProps) => {
  if (compact) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Direction</label>
        <Select value={selectedDirection} onValueChange={(v) => onDirectionChange(v as TrailDirection)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {directions.map((d) => (
              <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <StepBadge number={stepNumber} />
        <ArrowRight className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Choose your Direction</h3>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {directions.map((direction) => {
          const isSelected = selectedDirection === direction.id;
          
          return (
            <button
              key={direction.id}
              onClick={() => onDirectionChange(direction.id)}
              className={cn(
                "relative flex flex-col items-start rounded-xl border-2 p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 shadow-soft"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-soft"
              )}
            >
              <div
                className={cn(
                  "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 bg-transparent"
                )}
              >
                {isSelected && <Check className="h-3 w-3" />}
              </div>
              
              <div className="flex items-center gap-2 mb-1">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {direction.icon}
                </div>
                <span className="font-semibold text-sm text-foreground">{direction.name}</span>
              </div>
              
              <p className="text-xs text-muted-foreground pr-4">
                {direction.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DirectionSelector;

import { cn } from "@/lib/utils";
import type { UnitSystem } from "@/lib/formatUtils";

interface UnitToggleProps {
  units: UnitSystem;
  onUnitsChange: (units: UnitSystem) => void;
}

const UnitToggle = ({ units, onUnitsChange }: UnitToggleProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center rounded-full border-2 border-border bg-muted/50 p-1">
        <button
          onClick={() => onUnitsChange("metric")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            units === "metric"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          km / m
        </button>
        <button
          onClick={() => onUnitsChange("imperial")}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
            units === "imperial"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          miles / ft
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;

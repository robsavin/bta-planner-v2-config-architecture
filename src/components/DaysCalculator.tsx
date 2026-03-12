import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface DaysCalculatorProps {
  totalHours: number;
  hoursPerDay: number;
  onHoursPerDayChange: (hours: number) => void;
  calculatedDays: number;
  stepNumber?: number;
  compact?: boolean;
  isTrailRunner?: boolean;
}

const DaysCalculator = ({
  hoursPerDay,
  onHoursPerDayChange,
  calculatedDays,
}: DaysCalculatorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-1.5">
        <span className="font-display font-bold text-bta-amber text-xl">
          {calculatedDays} days
        </span>
        <span className="text-sm text-bta-forest/70">
          · {hoursPerDay}h per day
        </span>
      </div>
      <div className="space-y-1">
        <Slider
          value={[hoursPerDay]}
          onValueChange={([v]) => onHoursPerDayChange(v)}
          min={4}
          max={12}
          step={0.5}
          className="w-full [&_[data-slot=slider-range]]:bg-bta-amber [&_[data-slot=slider-thumb]]:border-bta-amber [&>span>span]:bg-bta-amber [&>span+span]:border-bta-amber"
        />
        <div className="flex justify-between">
          <span className="text-[11px] text-muted-foreground">Easier</span>
          <span className="text-[11px] text-muted-foreground">Harder</span>
        </div>
      </div>
    </div>
  );
};

export default DaysCalculator;

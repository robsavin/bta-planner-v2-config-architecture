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
    <div className="space-y-2">
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="font-display font-bold text-bta-amber text-xl">
          {calculatedDays} days
        </span>
        <span className="text-sm text-bta-forest/70">
          · {hoursPerDay}h per day
        </span>
      </div>
      <div className="grid grid-cols-[auto_auto_1fr] gap-2 items-stretch">
        {/* Slower button */}
        <button
          onClick={() => onHoursPerDayChange(Math.max(4, hoursPerDay - 0.5))}
          className="flex flex-col items-center rounded-lg border border-border text-bta-dark-teal hover:border-bta-dark-teal/50 px-3 py-3 text-center transition-all duration-200"
        >
          <span className="text-xs font-medium leading-tight">Let's go slower</span>
          <span className="text-[10px] mt-0.5 text-bta-forest/60">Add a day</span>
        </button>

        {/* This looks right button */}
        <button
          className="flex flex-col items-center rounded-lg border bg-bta-dark-teal border-bta-dark-teal text-primary-foreground px-3 py-3 text-center transition-all duration-200"
        >
          <span className="text-xs font-medium leading-tight">This looks right</span>
          <span className="text-[10px] mt-0.5 text-primary-foreground/70">Perfect pace</span>
        </button>

        {/* Hours per day slider */}
        <div className="flex flex-col items-center justify-center rounded-lg border border-border px-4 py-2 gap-1">
          <span className="text-[10px] font-medium text-bta-forest/60">Hours per day</span>
          <Slider
            value={[hoursPerDay]}
            onValueChange={([v]) => onHoursPerDayChange(v)}
            min={4}
            max={12}
            step={0.5}
            className="w-full [&_[data-slot=slider-range]]:bg-bta-amber [&_[data-slot=slider-thumb]]:border-bta-amber [&>span>span]:bg-bta-amber [&>span+span]:border-bta-amber"
          />
          <span className="text-xs font-bold text-bta-amber">{hoursPerDay}h</span>
        </div>
      </div>
    </div>
  );
};

export default DaysCalculator;

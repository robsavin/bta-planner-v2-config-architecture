import { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/formatUtils";

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
  totalHours,
  hoursPerDay,
  onHoursPerDayChange,
  calculatedDays,
  compact = false,
  isTrailRunner = false,
}: DaysCalculatorProps) => {
  const [displayDays, setDisplayDays] = useState(calculatedDays);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevDays = useRef(calculatedDays);

  const activityWord = isTrailRunner ? "running" : "walking";

  useEffect(() => {
    if (calculatedDays !== prevDays.current) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setDisplayDays(calculatedDays);
        setIsAnimating(false);
      }, 150);
      prevDays.current = calculatedDays;
      return () => clearTimeout(timeout);
    }
  }, [calculatedDays]);

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Daily Hours</label>
          <span className="text-sm font-bold text-primary">{hoursPerDay}h → {calculatedDays} days</span>
        </div>
        <Slider
          value={[hoursPerDay]}
          onValueChange={(value) => onHoursPerDayChange(value[0])}
          min={4}
          max={12}
          step={0.5}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Hero feedback — Option A: big number */}
      <div className="flex items-baseline gap-1">
        <span
          className={`font-display font-bold text-bta-amber transition-all duration-200 ${
            isAnimating ? "opacity-30 scale-95" : "opacity-100 scale-100"
          }`}
          style={{ fontSize: "64px", lineHeight: 1 }}
        >
          {displayDays}
        </span>
        <span
          className="font-display font-bold text-bta-dark-teal"
          style={{ fontSize: "64px", lineHeight: 1 }}
        >
          days
        </span>
      </div>
      <p className="text-[13px] text-bta-forest">
        {formatTime(totalHours)} {activityWord} · {hoursPerDay}h per day
      </p>

      {/* Slider */}
      <div className="space-y-1.5 pt-1">
        <Slider
          value={[hoursPerDay]}
          onValueChange={(value) => onHoursPerDayChange(value[0])}
          min={4}
          max={12}
          step={0.5}
          className="w-full [&_[role=slider]]:bg-bta-amber [&_[role=slider]]:border-bta-amber [&_[role=slider]]:shadow-md"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>4h</span>
          <span>8h</span>
          <span>12h</span>
        </div>
      </div>
    </div>
  );
};

export default DaysCalculator;

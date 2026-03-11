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
}

const getHoursDescription = (hours: number): string => {
  if (hours <= 5) return "Relaxed days with time to linger";
  if (hours <= 6.5) return "Easy going — plenty of time to explore";
  if (hours <= 8) return "A solid day's walking";
  if (hours <= 9.5) return "Full days on the trail";
  return "Long days, big miles";
};

const DaysCalculator = ({
  totalHours,
  hoursPerDay,
  onHoursPerDayChange,
  calculatedDays,
  compact = false,
}: DaysCalculatorProps) => {
  const [displayDays, setDisplayDays] = useState(calculatedDays);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevDays = useRef(calculatedDays);

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
    <div className="space-y-4">
      {/* Hero feedback */}
      <div className="flex items-baseline gap-3">
        <span
          className={`text-5xl font-display text-bta-amber transition-all duration-200 ${
            isAnimating ? "opacity-30 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {displayDays}
        </span>
        <span className="text-lg text-bta-dark-teal font-medium">
          days · {formatTime(totalHours)} walking
        </span>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-bta-dark-teal font-medium">
            <Clock className="h-3.5 w-3.5" />
            {hoursPerDay}h per day
          </span>
        </div>
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

      <p className="text-sm italic text-bta-forest min-h-[1.25rem]">
        {getHoursDescription(hoursPerDay)}
      </p>
    </div>
  );
};

export default DaysCalculator;

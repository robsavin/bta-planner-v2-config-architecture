import { Clock, Calendar } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/formatUtils";
import StepBadge from "./StepBadge";

interface DaysCalculatorProps {
  totalHours: number;
  hoursPerDay: number;
  onHoursPerDayChange: (hours: number) => void;
  calculatedDays: number;
  stepNumber?: number;
  compact?: boolean;
}

const DaysCalculator = ({
  totalHours,
  hoursPerDay,
  onHoursPerDayChange,
  calculatedDays,
  stepNumber = 4,
  compact = false,
}: DaysCalculatorProps) => {
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
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>4h</span>
          <span>8h</span>
          <span>12h</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border-2 border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <StepBadge number={stepNumber} />
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Choose your Daily Hours</h3>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-muted-foreground mb-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm uppercase tracking-wider">Total Moving Time</span>
        </div>
        <div className="text-4xl font-bold text-foreground">
          {formatTime(totalHours)}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Hours Per Day</span>
          <span className="text-lg font-bold text-primary">{hoursPerDay}h</span>
        </div>
        
        <Slider
          value={[hoursPerDay]}
          onValueChange={(value) => onHoursPerDayChange(value[0])}
          min={4}
          max={12}
          step={0.5}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Easy (4h)</span>
          <span>Standard (8h)</span>
          <span>Long (12h)</span>
        </div>
      </div>
      
      <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-6 text-center">
        <div className="inline-flex items-center gap-2 text-muted-foreground mb-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm uppercase tracking-wider">Your Journey</span>
        </div>
        <div className="text-5xl font-bold text-primary mb-2">
          {calculatedDays}
          <span className="text-2xl font-normal text-foreground ml-2">days</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on an average of {hoursPerDay} hours on the trail per day
        </p>
      </div>
    </div>
  );
};

export default DaysCalculator;

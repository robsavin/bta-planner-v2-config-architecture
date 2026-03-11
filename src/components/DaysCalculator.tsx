import { cn } from "@/lib/utils";

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
  const options = [
    {
      label: "Let's go slower",
      sublabel: "Add a day",
      action: () => {
        // Decrease hours per day to add a day (min 4)
        const newHours = Math.max(4, hoursPerDay - 0.5);
        onHoursPerDayChange(newHours);
      },
    },
    {
      label: "This looks right",
      sublabel: "Perfect pace",
      isDefault: true,
    },
    {
      label: "Let's go faster",
      sublabel: "Remove a day",
      action: () => {
        // Increase hours per day to remove a day (max 12)
        const newHours = Math.min(12, hoursPerDay + 0.5);
        onHoursPerDayChange(newHours);
      },
    },
  ];

  // The "center" button is conceptually always selected (it represents the current state)
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
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={opt.action}
            className={cn(
              "flex flex-col items-center rounded-lg border px-2 py-3 text-center transition-all duration-200",
              opt.isDefault
                ? "bg-bta-dark-teal border-bta-dark-teal text-primary-foreground"
                : "border-border text-bta-dark-teal hover:border-bta-dark-teal/50"
            )}
          >
            <span className="text-xs font-medium leading-tight">{opt.label}</span>
            <span className={cn(
              "text-[10px] mt-0.5",
              opt.isDefault ? "text-primary-foreground/70" : "text-bta-forest/60"
            )}>{opt.sublabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaysCalculator;

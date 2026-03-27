import { cn } from "@/lib/utils";
import { speedProfiles as getSpeedProfiles, calculateTotalTimeWithDirection, calculateDays, type SpeedProfile } from "@/lib/trailData";
import type { TrailDirection } from "@/components/DirectionSelector";
import { Badge } from "@/components/ui/badge";

interface SpeedSelectorProps {
  selectedSpeed: SpeedProfile;
  onSpeedChange: (speed: SpeedProfile) => void;
  stepNumber?: number;
  compact?: boolean;
  direction?: TrailDirection;
  hoursPerDay?: number;
}

const SpeedSelector = ({
  selectedSpeed,
  onSpeedChange,
  compact = false,
  direction = "south-to-north",
  hoursPerDay = 8,
}: SpeedSelectorProps) => {
  if (compact) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {speedProfiles.map((profile) => {
          const isSelected = selectedSpeed.id === profile.id;
          const isPopular = profile.id === "hiker";
          const totalHours = calculateTotalTimeWithDirection(profile, direction);
          const days = calculateDays(totalHours, hoursPerDay);

          return (
            <button
              key={profile.id}
              onClick={() => onSpeedChange(profile)}
              className={cn(
                "relative flex flex-col items-center rounded-lg border-2 px-3 py-4 text-center transition-all duration-200",
                isSelected
                  ? "border-bta-amber bg-bta-amber/5"
                  : "border-border hover:border-bta-amber/40"
              )}
            >
              {isPopular && (
                <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-bta-amber text-primary-foreground text-[10px] px-2 py-0.5 whitespace-nowrap">
                  MOST POPULAR
                </Badge>
              )}
              <span className="font-display font-bold text-sm text-bta-dark-teal">{profile.name}</span>
              <span className="font-display font-bold text-2xl text-bta-amber mt-1">{days} days</span>
              <span className="text-xs text-bta-forest/70 mt-1 leading-tight">{profile.description}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Full (non-compact) version — same card layout
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {speedProfiles.map((profile) => {
        const isSelected = selectedSpeed.id === profile.id;
        const isPopular = profile.id === "hiker";
        const totalHours = calculateTotalTimeWithDirection(profile, direction);
        const days = calculateDays(totalHours, hoursPerDay);

        return (
          <button
            key={profile.id}
            onClick={() => onSpeedChange(profile)}
            className={cn(
              "relative flex flex-col items-center rounded-lg border-2 px-3 py-4 text-center transition-all duration-200",
              isSelected
                ? "border-bta-amber bg-bta-amber/5"
                : "border-border hover:border-bta-amber/40"
            )}
          >
            {isPopular && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-bta-amber text-primary-foreground text-[10px] px-2 py-0.5 whitespace-nowrap">
                MOST POPULAR
              </Badge>
            )}
            <span className="font-display font-bold text-sm text-bta-dark-teal">{profile.name}</span>
            <span className="font-display font-bold text-2xl text-bta-amber mt-1">{days} days</span>
            <span className="text-xs text-bta-forest/70 mt-1 leading-tight">{profile.description}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SpeedSelector;

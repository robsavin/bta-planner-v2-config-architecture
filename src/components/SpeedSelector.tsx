import { Check, User, Zap, Gauge, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";
import { speedProfiles, type SpeedProfile } from "@/lib/trailData";
import StepBadge from "./StepBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SpeedSelectorProps {
  selectedSpeed: SpeedProfile;
  onSpeedChange: (speed: SpeedProfile) => void;
  stepNumber?: number;
  compact?: boolean;
}

const speedIcons = {
  explorer: <User className="h-5 w-5" />,
  hiker: <Footprints className="h-5 w-5" />,
  fastpacker: <Gauge className="h-5 w-5" />,
  trailrunner: <Zap className="h-5 w-5" />,
};

const SpeedSelector = ({ selectedSpeed, onSpeedChange, stepNumber = 2, compact = false }: SpeedSelectorProps) => {
  if (compact) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Pace</label>
        <Select value={selectedSpeed.id} onValueChange={(v) => {
          const profile = speedProfiles.find(p => p.id === v);
          if (profile) onSpeedChange(profile);
        }}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover z-50">
            {speedProfiles.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
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
        <Footprints className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Choose your Pace</h3>
      </div>
      
      <div className="grid gap-3 grid-cols-2">
        {speedProfiles.map((profile) => {
          const isSelected = selectedSpeed.id === profile.id;
          
          return (
            <button
              key={profile.id}
              onClick={() => onSpeedChange(profile)}
              className={cn(
                "relative flex flex-col items-start rounded-[40px] border border-border/55 p-4 text-left transition-all duration-200 shadow-none",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border/55 bg-card hover:border-primary/50"
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
                  {speedIcons[profile.id as keyof typeof speedIcons]}
                </div>
                <span className="font-semibold text-sm text-foreground">{profile.name}</span>
              </div>
              
              <p className="text-xs text-muted-foreground pr-4">
                {profile.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SpeedSelector;

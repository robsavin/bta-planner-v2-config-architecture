import { User, Zap, Gauge, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";
import { speedProfiles, type SpeedProfile } from "@/lib/trailData";
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

const speedIcons: Record<string, React.ReactNode> = {
  explorer: <User className="h-4 w-4" />,
  hiker: <Footprints className="h-4 w-4" />,
  fastpacker: <Gauge className="h-4 w-4" />,
  trailrunner: <Zap className="h-4 w-4" />,
};

const SpeedSelector = ({ selectedSpeed, onSpeedChange, compact = false }: SpeedSelectorProps) => {
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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {speedProfiles.map((profile) => {
          const isSelected = selectedSpeed.id === profile.id;
          return (
            <button
              key={profile.id}
              onClick={() => onSpeedChange(profile)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-[40px] border px-4 py-2 text-sm font-medium transition-all duration-200",
                isSelected
                  ? "border-bta-amber bg-bta-amber text-white"
                  : "border-border/55 text-bta-dark-teal hover:border-bta-amber/50"
              )}
            >
              {speedIcons[profile.id]}
              {profile.name}
            </button>
          );
        })}
      </div>
      <p className="text-sm italic text-bta-forest min-h-[1.25rem]">
        {selectedSpeed.description}
      </p>
    </div>
  );
};

export default SpeedSelector;

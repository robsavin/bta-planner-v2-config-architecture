import { Minus, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartySizeSelectorProps {
  partySize: number;
  onPartySizeChange: (size: number) => void;
  compact?: boolean;
}

const PartySizeSelector = ({ partySize, onPartySizeChange }: PartySizeSelectorProps) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium flex items-center gap-1.5">
        <Users className="h-4 w-4 text-muted-foreground" />
        Party Size
      </label>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => onPartySizeChange(Math.max(1, partySize - 1))}
          disabled={partySize <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center text-lg font-bold">{partySize}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => onPartySizeChange(Math.min(8, partySize + 1))}
          disabled={partySize >= 8}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PartySizeSelector;

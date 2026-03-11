import { Minus, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartySizeSelectorProps {
  partySize: number;
  onPartySizeChange: (size: number) => void;
  compact?: boolean;
}

const getPartySizeNote = (size: number): string => {
  if (size === 1) return "Solo adventure";
  if (size === 2) return "A pair";
  if (size <= 4) return "Small group";
  return "Group adventure";
};

const PartySizeSelector = ({ partySize, onPartySizeChange }: PartySizeSelectorProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          onClick={() => onPartySizeChange(Math.max(1, partySize - 1))}
          disabled={partySize <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center text-xl font-bold text-bta-dark-teal">{partySize}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          onClick={() => onPartySizeChange(Math.min(8, partySize + 1))}
          disabled={partySize >= 8}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm italic text-bta-forest">{getPartySizeNote(partySize)}</p>
    </div>
  );
};

export default PartySizeSelector;

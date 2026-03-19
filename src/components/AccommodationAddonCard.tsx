import { BedDouble } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface AccommodationAddonCardProps {
  label: string;
  costPerPerson: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const AccommodationAddonCard = ({
  label,
  costPerPerson,
  checked,
  onCheckedChange,
}: AccommodationAddonCardProps) => (
  <div className="flex items-center gap-3 rounded-xl border border-dashed border-primary/25 bg-muted/40 px-4 py-3">
    <BedDouble className="h-5 w-5 text-primary shrink-0" />
    <div className="flex-1 min-w-0">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="text-sm text-muted-foreground ml-1.5">({costPerPerson}/person)</span>
    </div>
    <Checkbox
      checked={checked}
      onCheckedChange={(v) => onCheckedChange(v === true)}
      className="h-5 w-5"
    />
  </div>
);

export default AccommodationAddonCard;

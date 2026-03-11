import { cn } from "@/lib/utils";

interface PartySizeSelectorProps {
  partySize: number;
  onPartySizeChange: (size: number) => void;
  compact?: boolean;
}

const PartySizeSelector = ({ partySize, onPartySizeChange }: PartySizeSelectorProps) => {
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onPartySizeChange(size)}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg border text-sm font-bold transition-all duration-200",
              partySize === size
                ? "bg-bta-amber border-bta-amber text-primary-foreground"
                : "border-border text-bta-dark-teal hover:border-bta-amber/50"
            )}
          >
            {size}
          </button>
        ))}
      </div>
      <p className="text-xs text-bta-forest/60">
        For groups of more than 8,{" "}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-bta-amber underline hover:text-bta-amber/80"
        >
          get in touch to discuss options
        </a>
        .
      </p>
    </div>
  );
};

export default PartySizeSelector;

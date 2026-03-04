interface StepBadgeProps {
  number: number;
}

const StepBadge = ({ number }: StepBadgeProps) => (
  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
    {number}
  </div>
);

export default StepBadge;

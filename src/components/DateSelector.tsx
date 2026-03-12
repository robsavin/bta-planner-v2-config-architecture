import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StepBadge from "./StepBadge";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  stepNumber?: number;
  compact?: boolean;
}

const DateSelector = ({ selectedDate, onDateChange, stepNumber = 3, compact = false }: DateSelectorProps) => {
  if (compact) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
            {selectedDate ? format(selectedDate, "MMM d, yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-popover" align="start" style={{ zIndex: 9999, position: 'relative' }}>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateChange(date)}
            initialFocus
            disabled={(date) => date < new Date()}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <StepBadge number={stepNumber} />
        <CalendarIcon className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Choose your Start Date</h3>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-14 text-lg border-2",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
            {selectedDate ? format(selectedDate, "EEEE, MMMM do, yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50 bg-popover" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateChange(date)}
            initialFocus
            disabled={(date) => date < new Date()}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      
      <p className="text-sm text-muted-foreground">
        Select your date to start the West Highland Way.
      </p>
    </div>
  );
};

export default DateSelector;

import { format } from "date-fns";
import { Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type DayPlan } from "@/lib/trailData";
import { type TrailDirection } from "@/components/DirectionSelector";
import { formatDistance, formatElevation, formatTime, type UnitSystem } from "@/lib/formatUtils";
import { getTrailConfig } from "@/config";
import BookTripButton from "@/components/BookTripButton";

const MULTIPLIER: Record<number, number> = {
  1: 1.65, 2: 2.0, 3: 3.6, 4: 4.0, 5: 5.55, 6: 6.0, 7: 7.49, 8: 8.0,
};

const formatGBP = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

interface PurchaseModuleProps {
  itinerary: DayPlan[];
  direction: TrailDirection;
  speedProfileName: string;
  speedProfileId: string;
  startDate: Date;
  partySize: number;
  units: UnitSystem;
  onSaveQuote: () => void;
}

const INCLUDED_ITEMS = [
  "Hotels with breakfast at each overnight stop",
  "Custom door-to-door route",
  "Big Trail Adventures App",
  "Your own personalised Trail Book",
  "On-trail support",
];

const PurchaseModule = ({
  itinerary,
  direction,
  speedProfileName,
  speedProfileId,
  startDate,
  partySize,
  units,
  onSaveQuote,
}: PurchaseModuleProps) => {
  const trailConfig = getTrailConfig();
  const walkingDays = itinerary.filter(d => !d.isRestDay);
  const activeDays = walkingDays.length;
  const nights = Math.max(0, activeDays - 1);
  const totalDays = itinerary.length;
  const multiplier = MULTIPLIER[partySize] ?? partySize;
  const totalPrice = (49 * partySize) + (140 * nights * multiplier);
  const pricePerPerson = Math.round(totalPrice / partySize);
  const depositPerPerson = trailConfig.depositPerPerson;
  const deposit = depositPerPerson * partySize;

  const totalDistance = walkingDays.reduce((sum, d) => sum + d.distance, 0);
  const totalAscent = walkingDays.reduce((sum, d) => sum + d.ascent, 0);
  const totalDescent = walkingDays.reduce((sum, d) => sum + d.descent, 0);
  const totalWalkingTime = walkingDays.reduce((sum, d) => sum + d.walkingTime, 0);
  const avgDistance = activeDays > 0 ? totalDistance / activeDays : 0;

  const directionLabel = direction === "south-to-north" ? "South → North" : "North → South";

  return (
    <div className="mt-12 space-y-0">
      {/* 1. Your Adventure summary */}
      <div className="rounded-t-xl bg-secondary text-secondary-foreground p-6 md:p-8">
        <h3 className="text-xl font-bold mb-4">Your Adventure</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3 text-sm">
          <SummaryItem label="Trail" value={trailConfig.name} />
          <SummaryItem label="Direction" value={directionLabel} />
          <SummaryItem label="Pace" value={speedProfileName} />
          <SummaryItem label="Start Date" value={format(startDate, "d MMM yyyy")} />
          <SummaryItem label="Duration" value={`${totalDays} days / ${nights} nights`} />
          <SummaryItem label="Party Size" value={`${partySize} ${partySize === 1 ? "person" : "people"}`} />
          <SummaryItem label="Total Distance" value={formatDistance(totalDistance, units)} />
          <SummaryItem label="Daily Average" value={formatDistance(avgDistance, units)} />
          <SummaryItem label="Walking Time" value={formatTime(totalWalkingTime)} />
          <SummaryItem label="Total Ascent" value={formatElevation(totalAscent, units)} />
          <SummaryItem label="Total Descent" value={formatElevation(totalDescent, units)} />
        </div>
      </div>

      {/* 2. What's Included */}
      <div className="bg-muted px-6 md:px-8 py-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">What's Included</h3>
        <ul className="space-y-2">
          {INCLUDED_ITEMS.map(item => (
            <li key={item} className="flex items-center gap-2 text-sm text-foreground">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Pricing row */}
      <div className="bg-background border-x border-border px-6 md:px-8 py-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Per Person</div>
            <div className="text-2xl font-bold text-foreground">{formatGBP(pricePerPerson)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Trip Total</div>
            <div className="text-2xl font-bold text-foreground">{formatGBP(totalPrice)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Deposit Today</div>
            <div className="text-3xl font-extrabold text-primary">{formatGBP(deposit)}</div>
          </div>
        </div>
      </div>

      {/* 4. CTAs */}
      <div className="rounded-b-xl bg-background border-x border-b border-border px-6 md:px-8 pt-2 pb-6">
        <div className="flex flex-col items-center gap-3">
          <BookTripButton
            speedProfileId={speedProfileId}
            partySize={partySize}
            depositLabel={formatGBP(deposit)}
          />
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-12 px-8 text-base border-secondary text-secondary hover:bg-secondary/5"
            onClick={onSaveQuote}
          >
            Save My Quote
          </Button>
          <a
            href="tel:01315602740"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            <Phone className="h-4 w-4" />
            📞 0131 560 2740 · 8am–6pm, every day
          </a>
        </div>

        {/* 5. Reassurance */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          We'll start planning right away. Not happy? We'll adjust or refund you — hassle-free.
        </p>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-secondary-foreground/60 text-xs uppercase tracking-wide">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

export default PurchaseModule;

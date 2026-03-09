import { format } from "date-fns";
import { Phone, Check, ArrowRight, FileText, Hotel, Route, Smartphone, BookOpen, Headphones } from "lucide-react";
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
  { name: "Hotels with breakfast", detail: "Handpicked accommodation at every stop", icon: Hotel },
  { name: "Custom route", detail: "Door-to-door, built around your pace", icon: Route },
  { name: "BTA App", detail: "Navigate your route offline", icon: Smartphone },
  { name: "Trail Book", detail: "Your personal guide to every stage", icon: BookOpen },
  { name: "On-trail support", detail: "We're here if you need us", icon: Headphones },
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
  const totalWalkingTime = walkingDays.reduce((sum, d) => sum + d.walkingTime, 0);

  const directionLabel = direction === "south-to-north" ? "South → North" : "North → South";

  return (
    <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
      {/* ─── ZONE 1 — Your Adventure ─── */}
      <div className="bg-secondary text-secondary-foreground px-5 py-4 md:px-6 md:py-4">
        <h3 className="text-[1.4rem] font-bold mb-3 tracking-tight">Your {trailConfig.name} Adventure</h3>

        {/* Row 1: Trip shape */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-2">
          <DetailItem label="Duration" value={`${totalDays} days / ${nights} nights`} />
          <DetailItem label="Direction" value={directionLabel} />
          <DetailItem label="Total Distance" value={formatDistance(totalDistance, units)} />
          <DetailItem label="Total Ascent" value={formatElevation(totalAscent, units)} />
        </div>

        <hr className="border-secondary-foreground/15 my-3" />

        {/* Row 2: Pace */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-2">
          <DetailItem label="Pace" value={speedProfileName} />
          <DetailItem label="Walking Time" value={formatTime(totalWalkingTime)} />
        </div>

        <hr className="border-secondary-foreground/15 my-3" />

        {/* Row 3: Logistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-2">
          <DetailItem label="Start Date" value={format(startDate, "d MMM yyyy")} />
          <DetailItem label="Party Size" value={`${partySize} ${partySize === 1 ? "person" : "people"}`} />
        </div>
      </div>

      {/* ─── ZONE 2 — What's Included ─── */}
      <div className="bg-background px-5 py-6 md:px-6 md:py-7">
        <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mb-4">What's Included</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {INCLUDED_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === INCLUDED_ITEMS.length - 1;
            return (
              <div
                key={item.name}
                className={`border border-border rounded-lg p-4 flex items-start gap-3 ${isLast ? "md:col-span-2" : ""}`}
              >
                <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-sm text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── ZONE 3 — Purchase Action ─── */}
      <div className="bg-muted px-5 py-6 md:px-6 md:py-7">
        {/* Pricing bar */}
        <div className="border border-border rounded-lg bg-background divide-y divide-border sm:divide-y-0 sm:flex sm:divide-x mb-6">
          <PriceCell label="Per Person" value={formatGBP(pricePerPerson)} />
          <PriceCell label="Trip Total" value={formatGBP(totalPrice)} />
          <PriceCell label="Deposit Today" value={formatGBP(deposit)} highlight />
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3">
          <BookTripButton
            speedProfileId={speedProfileId}
            partySize={partySize}
            depositLabel={formatGBP(deposit)}
          />

          <Button
            size="lg"
            variant="outline"
            className="w-4/5 h-11 text-sm gap-2 border-[hsl(200,25%,33%)] text-secondary hover:bg-secondary/5"
            onClick={onSaveQuote}
          >
            <FileText className="h-4 w-4" />
            Save My Quote — get a PDF sent to you
          </Button>

          {/* Divider with 'or' */}
          <div className="flex items-center gap-4 w-full my-0.5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Phone row */}
          <a
            href="tel:01315602740"
            className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5" />
            <div>
              <div className="font-semibold">0131 560 2740</div>
              <div className="text-xs text-muted-foreground">8am–6pm, every day — we love talking trails</div>
            </div>
          </a>

          {/* Reassurance */}
          <p className="text-center text-xs text-muted-foreground italic mt-2">
            We'll start planning your trip right away. Not happy with anything? We'll adjust it or refund you — no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Sub-components ── */

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[0.65rem] uppercase tracking-widest text-secondary-foreground/40 mb-0.5">{label}</div>
    <div className="font-bold text-[0.95rem]">{value}</div>
  </div>
);

const PriceCell = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex-1 px-5 py-4 text-center">
    <div className={`text-xs mb-1 ${highlight ? "text-primary font-semibold" : "text-muted-foreground"}`}>
      {label}
    </div>
    <div className={`${highlight ? "text-2xl font-bold text-primary" : "text-xl text-foreground"}`}>
      {value}
    </div>
  </div>
);

export default PurchaseModule;

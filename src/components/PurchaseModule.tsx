import { format } from "date-fns";
import { Phone, Check, ArrowRight, FileText } from "lucide-react";
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
  { name: "Hotels with breakfast", detail: "Handpicked accommodation at every stop" },
  { name: "Custom route", detail: "Door-to-door, built around your pace" },
  { name: "BTA App", detail: "Navigate your route offline" },
  { name: "Trail Book", detail: "Your personal guide to every stage" },
  { name: "On-trail support", detail: "We're here if you need us" },
];

const MountainSilhouette = () => (
  <svg
    viewBox="0 0 400 200"
    className="absolute top-0 right-0 w-64 h-32 md:w-80 md:h-40 opacity-[0.12]"
    preserveAspectRatio="xMaxYMin meet"
    aria-hidden="true"
  >
    <path
      d="M400 200 L400 80 L360 40 L330 70 L300 20 L270 60 L240 30 L210 70 L180 50 L150 90 L120 60 L90 100 L60 80 L30 120 L0 100 L0 200 Z"
      fill="currentColor"
      className="text-secondary-foreground"
    />
  </svg>
);

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
    <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
      {/* ─── ZONE 1 — Your Adventure ─── */}
      <div className="relative bg-secondary text-secondary-foreground px-8 py-10 md:px-12 md:py-14 overflow-hidden">
        <MountainSilhouette />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.2em] text-secondary-foreground/50 mb-2">Your Adventure</p>
          <h3 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight">{trailConfig.name}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            <DetailItem label="Direction" value={directionLabel} />
            <DetailItem label="Pace" value={speedProfileName} />
            <DetailItem label="Start Date" value={format(startDate, "d MMM yyyy")} />
            <DetailItem label="Duration" value={`${totalDays} days / ${nights} nights`} />
            <DetailItem label="Party Size" value={`${partySize} ${partySize === 1 ? "person" : "people"}`} />
            <DetailItem label="Total Distance" value={formatDistance(totalDistance, units)} />
            <DetailItem label="Total Ascent" value={formatElevation(totalAscent, units)} />
            <DetailItem label="Walking Time" value={formatTime(totalWalkingTime)} />
          </div>
        </div>
      </div>

      {/* ─── ZONE 2 — What's Included ─── */}
      <div className="bg-background px-8 py-10 md:px-12 md:py-12">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">What's Included</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
          {INCLUDED_ITEMS.map(item => (
            <div key={item.name} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-foreground">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── ZONE 3 — Purchase Action ─── */}
      <div className="bg-muted px-8 py-10 md:px-12 md:py-12">
        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <PriceCard label="Per Person" value={formatGBP(pricePerPerson)} />
          <PriceCard label="Trip Total" value={formatGBP(totalPrice)} />
          <PriceCard
            label="Deposit Today"
            value={formatGBP(deposit)}
            subtitle="— to secure your adventure"
            highlight
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
          <BookTripButton
            speedProfileId={speedProfileId}
            partySize={partySize}
            depositLabel={formatGBP(deposit)}
          />

          <Button
            size="lg"
            variant="outline"
            className="w-full h-12 text-base gap-2 border-secondary text-secondary hover:bg-secondary/5"
            onClick={onSaveQuote}
          >
            <FileText className="h-4 w-4" />
            Save My Quote — get a PDF sent to you
          </Button>

          {/* Divider with 'or' */}
          <div className="flex items-center gap-4 w-full my-1">
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
          <p className="text-center text-sm text-muted-foreground italic mt-4">
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
    <div className="text-[11px] uppercase tracking-[0.15em] text-secondary-foreground/40 mb-1">{label}</div>
    <div className="font-bold text-lg">{value}</div>
  </div>
);

const PriceCard = ({
  label,
  value,
  subtitle,
  highlight,
}: {
  label: string;
  value: string;
  subtitle?: string;
  highlight?: boolean;
}) => (
  <div className="bg-background rounded-lg p-6 text-center">
    <div className={`text-sm mb-2 ${highlight ? "text-primary font-semibold" : "text-muted-foreground"}`}>
      {label}
    </div>
    <div className={`font-extrabold ${highlight ? "text-4xl text-primary" : "text-3xl text-foreground"}`}>
      {value}
    </div>
    {subtitle && (
      <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
    )}
  </div>
);

export default PurchaseModule;

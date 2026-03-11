import { format } from "date-fns";
import { Phone, FileText, Hotel, Route, Smartphone, BookOpen, Headphones, Calendar, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type DayPlan } from "@/lib/trailData";
import { type TrailDirection } from "@/components/DirectionSelector";
import { formatDistance, formatElevation, formatTime, type UnitSystem } from "@/lib/formatUtils";
import { getTrailConfig } from "@/config";
import { useCurrency } from "@/hooks/useCurrency";
import BookTripButton from "@/components/BookTripButton";

const MULTIPLIER: Record<number, number> = {
  1: 1.65, 2: 2.0, 3: 3.6, 4: 4.0, 5: 5.55, 6: 6.0, 7: 7.49, 8: 8.0,
};

interface PurchaseModuleProps {
  itinerary: DayPlan[];
  direction: TrailDirection;
  speedProfileName: string;
  speedProfileId: string;
  startDate: Date;
  partySize: number;
  units: UnitSystem;
  onSaveQuote: () => void;
  onOpenEnquiry: () => void;
  overridePricing?: {
    totalPrice: number;
    pricePerPerson: number;
    deposit: number;
    depositPerPerson: number;
  };
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
  onOpenEnquiry,
  overridePricing,
}: PurchaseModuleProps) => {
  const trailConfig = getTrailConfig();
  const { formatPrice } = useCurrency();
  const walkingDays = itinerary.filter(d => !d.isRestDay);
  const activeDays = walkingDays.length;
  const nights = Math.max(0, activeDays - 1);
  const totalDays = itinerary.length;

  const multiplier = MULTIPLIER[partySize] ?? partySize;
  const liveTotalPrice = (49 * partySize) + (140 * nights * multiplier);
  const totalPrice = overridePricing?.totalPrice ?? liveTotalPrice;
  const pricePerPerson = overridePricing?.pricePerPerson ?? Math.round(liveTotalPrice / partySize);
  const depositPerPerson = overridePricing?.depositPerPerson ?? trailConfig.depositPerPerson;
  const deposit = overridePricing?.deposit ?? (depositPerPerson * partySize);

  const totalDistance = walkingDays.reduce((sum, d) => sum + d.distance, 0);
  const totalAscent = walkingDays.reduce((sum, d) => sum + d.ascent, 0);
  const totalWalkingTime = walkingDays.reduce((sum, d) => sum + d.walkingTime, 0);

  const directionLabel = direction === "south-to-north" ? "South → North" : "North → South";

  return (
    <div className="mt-8 rounded-xl overflow-hidden shadow-lg">
      {/* ─── ZONE 1 — Your Adventure ─── */}
      <div className="bg-secondary text-secondary-foreground px-4 py-4 md:px-6 md:py-4">
        <div className="font-bold mb-3 tracking-tight" style={{fontSize: '22px'}}>Your {trailConfig.name} Adventure</div>

        <div>
          <p className="text-[1.05rem] font-bold text-secondary-foreground leading-relaxed">
            {totalDays} days / {nights} nights · {directionLabel} · {formatDistance(totalDistance, units)} · {formatElevation(totalAscent, units)} ascent
          </p>
          <hr className="border-secondary-foreground/15 my-[10px]" />
          <p className="text-[0.9rem] text-secondary-foreground/75 leading-relaxed">
            {speedProfileName} pace · <span className="font-bold">{formatTime(totalWalkingTime)}</span> walking time
          </p>
          <p className="text-[0.9rem] text-secondary-foreground/75 leading-relaxed mt-1 inline-flex items-center flex-wrap">
            <span className="inline-flex items-center gap-1">Starting <Calendar className="inline h-3.5 w-3.5 text-secondary-foreground" /><span className="font-bold">{format(startDate, "d MMM yyyy")}</span></span>
            <span className="mx-1.5">·</span>
            <span className="inline-flex items-center gap-1"><Users className="inline h-3.5 w-3.5 text-secondary-foreground" /><span className="font-bold">{partySize}</span> {partySize === 1 ? "person" : "people"}</span>
          </p>
        </div>
      </div>

      {/* ─── ZONE 2 — What's Included ─── */}
      <div className="bg-background px-4 py-6 md:px-6 md:py-7">
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
      <div className="bg-muted px-4 py-6 md:px-6 md:py-7">
        {/* Pricing bar — stacks on mobile */}
        <div className="border border-border rounded-lg bg-background flex flex-col sm:flex-row sm:divide-x divide-y sm:divide-y-0 divide-border mb-6">
          <PriceCell label="Per Person" value={formatPrice(pricePerPerson)} />
          <PriceCell label="Trip Total" value={formatPrice(totalPrice)} />
          <PriceCell label="Deposit Today" value={formatPrice(deposit)} highlight />
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3">
          <BookTripButton
            speedProfileId={speedProfileId}
            partySize={partySize}
            depositLabel={formatPrice(deposit)}
            days={activeDays}
            nights={nights}
            totalPrice={totalPrice}
            deposit={deposit}
            startDate={startDate}
          />

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-4/5 h-11 text-sm gap-2 border-[hsl(200,25%,33%)] text-secondary hover:bg-secondary/5"
            onClick={onSaveQuote}
          >
            <FileText className="h-4 w-4" />
            Save My Quote — get a PDF sent to you
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-4/5 h-11 text-sm gap-2"
            onClick={onOpenEnquiry}
          >
            <MessageCircle className="h-4 w-4" />
            Get Expert Advice
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-0.5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Prefer to talk */}
          <p className="text-sm text-muted-foreground text-center">
            Prefer to talk? Call us on{" "}
            <a href="tel:01315602740" className="text-primary font-medium hover:underline">0131 560 2740</a>{" "}
            or email{" "}
            <a href="mailto:hello@bigtrailadventures.com" className="text-primary font-medium hover:underline">hello@bigtrailadventures.com</a>
          </p>

          {/* Reassurance */}
          <p className="text-center text-xs text-muted-foreground italic mt-2">
            We'll start planning your trip right away. Not happy with anything? We'll adjust it or refund you — no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
};

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

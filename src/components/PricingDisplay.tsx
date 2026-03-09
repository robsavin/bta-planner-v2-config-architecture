import { PoundSterling } from "lucide-react";

interface PricingDisplayProps {
  partySize: number;
  activeDays: number;
  /**
   * Deposit per person in GBP. Sourced from trail config.
   * When embedded in Shopify, this will be overridden by a
   * data-deposit attribute passed in from the liquid template.
   */
  depositPerPerson: number;
}

const MULTIPLIER: Record<number, number> = {
  1: 1.65, 2: 2.0, 3: 3.6, 4: 4.0, 5: 5.55, 6: 6.0, 7: 7.49, 8: 8.0,
};

const formatGBP = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

const PricingDisplay = ({ partySize, activeDays, depositPerPerson }: PricingDisplayProps) => {
  const nights = Math.max(0, activeDays - 1);
  const multiplier = MULTIPLIER[partySize] ?? partySize;
  const totalPrice = (49 * partySize) + (140 * nights * multiplier);
  const pricePerPerson = Math.round(totalPrice / partySize);
  const deposit = depositPerPerson * partySize;

  return (
    <div className="rounded-xl bg-muted border border-border p-6 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-2">
        <PoundSterling className="h-5 w-5 text-primary" />
        Trip Pricing
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{formatGBP(totalPrice)}</div>
          <div className="text-sm text-muted-foreground">Total Price</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {partySize} {partySize === 1 ? "person" : "people"} · {nights} {nights === 1 ? "night" : "nights"}
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">{formatGBP(pricePerPerson)}</div>
          <div className="text-sm text-muted-foreground">Per Person</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-secondary">{formatGBP(deposit)}</div>
          <div className="text-sm text-muted-foreground">Deposit</div>
          <div className="text-xs text-muted-foreground mt-0.5">{formatGBP(depositPerPerson)} per person</div>
        </div>
      </div>
    </div>
  );
};

export default PricingDisplay;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getTrailConfig } from "@/config";
import { trackEvent } from "@/lib/analytics";
import { useCurrency } from "@/hooks/useCurrency";

interface BookTripButtonProps {
  speedProfileId: string;
  partySize: number;
  depositLabel?: string;
  days: number;
  nights: number;
  totalPrice: number;
  deposit: number;
  startDate: Date;
}

const PACE_MAP: Record<string, { dataAttr: string; configKey: keyof ReturnType<typeof getTrailConfig>["shopifyVariants"] }> = {
  explorer:     { dataAttr: "data-variant-explorer",      configKey: "explorer" },
  hiker:        { dataAttr: "data-variant-hiker",          configKey: "hiker" },
  fastpacker:   { dataAttr: "data-variant-fastpacker",     configKey: "fastpacker" },
  trailrunner:  { dataAttr: "data-variant-trail-runner",   configKey: "trailRunner" },
};

function getVariantId(speedProfileId: string): string | null {
  const entry = PACE_MAP[speedProfileId];
  if (!entry) return null;
  const mountEl = document.getElementById("root");
  if (mountEl) {
    const fromAttr = mountEl.getAttribute(entry.dataAttr);
    if (fromAttr) return fromAttr;
  }
  const config = getTrailConfig();
  return config.shopifyVariants[entry.configKey] ?? null;
}

const BookTripButton = ({ speedProfileId, partySize, depositLabel, days, nights, totalPrice, deposit, startDate }: BookTripButtonProps) => {
  const [fallbackMsg, setFallbackMsg] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { currency, convertAmount } = useCurrency();

  const handleClick = async () => {
    trackEvent("book_trip_click", { pace: speedProfileId, partySize });
    const variantId = getVariantId(speedProfileId);
    if (!variantId) {
      setFallbackMsg(true);
      return;
    }
    setSubmitting(true);
    try {
      const shopifyRoot = (window as any).Shopify?.routes?.root ?? "/";
      const res = await fetch(`${shopifyRoot}cart/add.js`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: variantId,
          quantity: partySize,
          properties: {
            "Trip days": days,
            "Trip nights": nights,
            "Number of travellers": partySize,
            "Full Trip Total": Math.round(totalPrice),
            "Package": document.getElementById("root")?.dataset.packageType ?? "",
            "Start date": startDate.toLocaleDateString("en-GB"),
            "_deposit_per_person": "true",
          },
        }),
      });
      if (res.ok) {
        window.location.href = "/cart";
      } else {
        setFallbackMsg(true);
      }
    } catch {
      setFallbackMsg(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        size="lg"
        className="w-full h-auto min-h-[3.5rem] py-3 text-base sm:text-[1.1rem] font-bold gap-2 sm:gap-3 rounded-lg whitespace-normal text-center leading-tight"
        onClick={handleClick}
        disabled={submitting}
      >
        <span className="flex-1">
          {submitting ? "Adding to cart…" : depositLabel ? `Book This Trip — Pay ${depositLabel} deposit today` : "Book This Trip"}
        </span>
        {!submitting && <ArrowRight className="h-5 w-5 shrink-0" />}
      </Button>
      {fallbackMsg && (
        <p className="mt-3 text-sm text-muted-foreground text-center max-w-md">
          Ready to book? Call us on{" "}
          <a href="tel:01315602740" className="text-primary font-medium hover:underline">0131 560 2740</a>{" "}
          or email{" "}
          <a href="mailto:hello@bigtrailadventures.com" className="text-primary font-medium hover:underline">hello@bigtrailadventures.com</a>
        </p>
      )}
    </div>
  );
};

export default BookTripButton;

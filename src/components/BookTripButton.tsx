import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { getTrailConfig } from "@/config";
import { trackEvent } from "@/lib/analytics";

/**
 * In the Shopify liquid template, variant IDs are injected dynamically using:
 *
 * ```liquid
 * {% for variant in product.variants %}
 *   data-variant-{{ variant.title | downcase | replace: ' ', '-' }}="{{ variant.id }}"
 * {% endfor %}
 * ```
 *
 * so no manual ID entry is needed per trail.
 */

interface BookTripButtonProps {
  /** Current speed profile id, e.g. "explorer" */
  speedProfileId: string;
  partySize: number;
}

/** Map speed profile IDs to the data-attribute suffix and config key */
const PACE_MAP: Record<string, { dataAttr: string; configKey: keyof ReturnType<typeof getTrailConfig>["shopifyVariants"] }> = {
  explorer:     { dataAttr: "data-variant-explorer",      configKey: "explorer" },
  hiker:        { dataAttr: "data-variant-hiker",          configKey: "hiker" },
  fastpacker:   { dataAttr: "data-variant-fastpacker",     configKey: "fastpacker" },
  trailrunner:  { dataAttr: "data-variant-trail-runner",   configKey: "trailRunner" },
};

function getVariantId(speedProfileId: string): string | null {
  const entry = PACE_MAP[speedProfileId];
  if (!entry) return null;

  // 1. Check data attributes on the mount element first (Shopify runtime override)
  const mountEl = document.getElementById("root");
  if (mountEl) {
    const fromAttr = mountEl.getAttribute(entry.dataAttr);
    if (fromAttr) return fromAttr;
  }

  // 2. Fallback to config
  const config = getTrailConfig();
  return config.shopifyVariants[entry.configKey] ?? null;
}

const BookTripButton = ({ speedProfileId, partySize }: BookTripButtonProps) => {
  const [fallbackMsg, setFallbackMsg] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleClick = async () => {
    trackEvent("book_trip_click", { pace: speedProfileId, partySize });

    const variantId = getVariantId(speedProfileId);

    if (!variantId) {
      setFallbackMsg(true);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: variantId, quantity: partySize }),
      });

      if (res.ok) {
        window.location.href = "/cart";
      } else {
        // If the Shopify endpoint fails, show fallback
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
        className="h-14 px-10 text-lg gap-3"
        onClick={handleClick}
        disabled={submitting}
      >
        <CalendarCheck className="h-5 w-5" />
        {submitting ? "Adding to cart…" : "Book This Trip"}
      </Button>
      {fallbackMsg && (
        <p className="mt-3 text-sm text-muted-foreground text-center max-w-md">
          Ready to book? Call us on{" "}
          <a href="tel:01315602740" className="text-primary font-medium hover:underline">
            0131 560 2740
          </a>{" "}
          or email{" "}
          <a href="mailto:hello@bigtrailadventures.com" className="text-primary font-medium hover:underline">
            hello@bigtrailadventures.com
          </a>
        </p>
      )}
    </div>
  );
};

export default BookTripButton;

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getVariantIdForPace } from "@/lib/shopifyVariantData";
import { useCurrency } from "@/hooks/useCurrency";

interface StickyBookingBarProps {
  days: number;
  nights: number;
  speedProfileName: string;
  speedProfileId: string;
  partySize: number;
  totalPrice: number;
  deposit: number;
  startDate: Date;
  /** Ref to the main Book button container to observe visibility */
  bookButtonRef: React.RefObject<HTMLDivElement>;
  /** Whether the main book button is in "added to cart" state */
  addedToCart: boolean;
}

const StickyBookingBar = ({
  days,
  nights,
  speedProfileName,
  speedProfileId,
  partySize,
  totalPrice,
  deposit,
  startDate,
  bookButtonRef,
  addedToCart,
}: StickyBookingBarProps) => {
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const target = bookButtonRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [bookButtonRef]);

  // Hide on success state
  if (addedToCart) return null;

  const handleClick = async () => {
    trackEvent("sticky_bar_book_click", { pace: speedProfileId, partySize });
    const variantId = getVariantIdForPace(speedProfileName) ?? getVariantIdForPace(speedProfileId);
    if (!variantId) {
      // Scroll to main button as fallback
      bookButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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
            "Start date": startDate.toLocaleDateString("en-GB"),
            "_deposit_per_person": "true",
          },
        }),
      });
      if (res.ok) {
        // Scroll to main button to show success state
        bookButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch {
      bookButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ backgroundColor: "#2d4a54" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-white text-sm truncate flex-1 min-w-0">
          <span className="font-semibold">{days + nights > days ? `${days + nights} days` : `${days} days`}</span>
          <span className="mx-1.5 opacity-60">·</span>
          <span>{speedProfileName}</span>
          <span className="mx-1.5 opacity-60">·</span>
          <span>{partySize} {partySize === 1 ? "person" : "people"}</span>
          <span className="mx-1.5 opacity-60">·</span>
          <span className="font-bold">{formatPrice(totalPrice)}</span>
        </p>

        <Button
          type="button"
          onClick={handleClick}
          disabled={submitting}
          className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-5 py-2.5 rounded-lg gap-2"
        >
          {submitting ? "Adding…" : "Book This Trip"}
          {!submitting && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default StickyBookingBar;

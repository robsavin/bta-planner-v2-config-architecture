import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getVariantIdForPace } from "@/lib/shopifyVariantData";

interface BookTripButtonProps {
  speedProfileId: string;
  speedProfileName: string;
  partySize: number;
  depositLabel?: string;
  days: number;
  nights: number;
  totalPrice: number;
  deposit: number;
  startDate: Date;
}

const BookTripButton = ({ speedProfileId, speedProfileName, partySize, depositLabel, days, nights, totalPrice, deposit, startDate }: BookTripButtonProps) => {
  const [fallbackMsg, setFallbackMsg] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleClick = async () => {
    // If already added, navigate to cart
    if (addedToCart) {
      window.location.href = "/cart";
      return;
    }

    trackEvent("book_trip_click", { pace: speedProfileId, partySize });
    const variantId = getVariantIdForPace(speedProfileName) ?? getVariantIdForPace(speedProfileId);
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
            "Start date": startDate.toLocaleDateString("en-GB"),
            "_deposit_per_person": "true",
          },
        }),
      });
      if (res.ok) {
        setAddedToCart(true);
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
        type="button"
        size="lg"
        className={`w-full h-auto min-h-[3.5rem] py-3 text-base sm:text-[1.1rem] font-bold gap-2 sm:gap-3 rounded-lg whitespace-normal text-center leading-tight ${addedToCart ? "!bg-[#4a7c6f] hover:!bg-[#3d6b5f]" : ""}`}
        onClick={handleClick}
        disabled={submitting}
      >
        <span className="flex-1">
          {submitting
            ? "Adding to cart…"
            : addedToCart
              ? "Added to cart — view your cart →"
              : depositLabel
                ? `Book This Trip — Pay ${depositLabel} deposit today`
                : "Book This Trip"}
        </span>
        {!submitting && !addedToCart && <ArrowRight className="h-5 w-5 shrink-0" />}
        {addedToCart && <ShoppingCart className="h-5 w-5 shrink-0" />}
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

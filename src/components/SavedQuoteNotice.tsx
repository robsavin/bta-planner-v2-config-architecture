import { format } from "date-fns";
import type { SavedQuote } from "@/lib/quoteStorage";

interface SavedQuoteNoticeProps {
  quote: SavedQuote;
}

const SavedQuoteNotice = ({ quote }: SavedQuoteNoticeProps) => {
  const createdDate = format(new Date(quote.created_at), "d MMMM yyyy");
  const validDate = format(new Date(quote.valid_until), "d MMMM yyyy");
  const isExpired = new Date(quote.valid_until) < new Date();

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${isExpired ? "border-destructive/30 bg-destructive/5 text-destructive" : "border-primary/20 bg-primary/5 text-foreground"}`}>
      {isExpired ? (
        <p>⚠️ Prices shown are from your saved quote dated {createdDate}. This quote expired on {validDate}.</p>
      ) : (
        <p>Prices shown are from your saved quote <span className="font-mono font-semibold">{quote.reference}</span> dated {createdDate}, valid until {validDate}.</p>
      )}
    </div>
  );
};

export default SavedQuoteNotice;

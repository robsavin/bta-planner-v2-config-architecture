import { format } from "date-fns";
import type { SavedQuote } from "@/lib/quoteStorage";

interface AdminQuoteViewProps {
  quote: SavedQuote;
}

const formatGBP = (amount: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

const AdminQuoteView = ({ quote }: AdminQuoteViewProps) => (
  <div className="border border-amber-400 bg-amber-50 rounded-xl p-6 mb-6">
    <h2 className="text-lg font-bold text-amber-800 mb-4">🔒 Staff View — Quote {quote.reference}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
      <div>
        <h3 className="font-semibold text-amber-700 mb-2">Customer</h3>
        <p><strong>Name:</strong> {quote.customer.name}</p>
        <p><strong>Email:</strong> {quote.customer.email}</p>
        <p><strong>Phone:</strong> {quote.customer.phone || "—"}</p>
      </div>
      <div>
        <h3 className="font-semibold text-amber-700 mb-2">Configuration</h3>
        <p><strong>Pace:</strong> {quote.configuration.pace}</p>
        <p><strong>Direction:</strong> {quote.configuration.direction}</p>
        <p><strong>Days:</strong> {quote.configuration.days}</p>
        <p><strong>Party Size:</strong> {quote.configuration.party_size}</p>
        <p><strong>Start Date:</strong> {quote.configuration.start_date}</p>
        <p><strong>Daily Hours:</strong> {quote.configuration.daily_hours}</p>
      </div>
      <div>
        <h3 className="font-semibold text-amber-700 mb-2">Pricing</h3>
        <p><strong>Total:</strong> {formatGBP(quote.pricing.total_price)}</p>
        <p><strong>Per Person:</strong> {formatGBP(quote.pricing.per_person)}</p>
        <p><strong>Deposit:</strong> {formatGBP(quote.pricing.deposit)}</p>
        <p><strong>Deposit/Person:</strong> {formatGBP(quote.pricing.deposit_per_person)}</p>
      </div>
      <div>
        <h3 className="font-semibold text-amber-700 mb-2">Dates</h3>
        <p><strong>Created:</strong> {format(new Date(quote.created_at), "d MMM yyyy, HH:mm")}</p>
        <p><strong>Valid Until:</strong> {format(new Date(quote.valid_until), "d MMM yyyy")}</p>
        <p><strong>Status:</strong> {new Date(quote.valid_until) < new Date() ? "❌ Expired" : "✅ Active"}</p>
      </div>
    </div>
  </div>
);

export default AdminQuoteView;

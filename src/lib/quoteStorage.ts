import { supabase } from "@/integrations/supabase/client";

export interface QuoteConfiguration {
  pace: string;
  direction: string;
  days: number;
  party_size: number;
  start_date: string;
  daily_hours: number;
}

export interface QuotePricing {
  total_price: number;
  per_person: number;
  deposit: number;
  deposit_per_person: number;
}

export interface QuoteCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface SavedQuote {
  id: string;
  reference: string;
  trail_id: string;
  configuration: QuoteConfiguration;
  pricing: QuotePricing;
  customer: QuoteCustomer;
  created_at: string;
  valid_until: string;
}

function generateQuoteRef(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `BTA-${code}`;
}

export async function saveQuote(
  trailId: string,
  configuration: QuoteConfiguration,
  pricing: QuotePricing,
  customer: QuoteCustomer,
): Promise<SavedQuote> {
  const reference = generateQuoteRef();

  const { data, error } = await supabase
    .from("quotes")
    .insert({
      reference,
      trail_id: trailId,
      configuration: configuration as unknown as Record<string, unknown>,
      pricing: pricing as unknown as Record<string, unknown>,
      customer: customer as unknown as Record<string, unknown>,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to save quote: ${error.message}`);

  return {
    ...data,
    configuration: data.configuration as unknown as QuoteConfiguration,
    pricing: data.pricing as unknown as QuotePricing,
    customer: data.customer as unknown as QuoteCustomer,
  };
}

export async function loadQuote(reference: string): Promise<SavedQuote | null> {
  const { data, error } = await supabase
    .from("quotes")
    .select()
    .eq("reference", reference)
    .single();

  if (error || !data) return null;

  return {
    ...data,
    configuration: data.configuration as unknown as QuoteConfiguration,
    pricing: data.pricing as unknown as QuotePricing,
    customer: data.customer as unknown as QuoteCustomer,
  };
}

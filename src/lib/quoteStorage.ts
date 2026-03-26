import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

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

  const row = {
    reference,
    trail_id: trailId,
    configuration: configuration as unknown as Json,
    pricing: pricing as unknown as Json,
    customer: customer as unknown as Json,
  };

  const { data, error } = await supabase
    .from("quotes")
    .insert([row])
    .select()
    .single();

  if (error) throw new Error(`Failed to save quote: ${error.message}`);

  // Fire Zapier webhook (non-blocking)
  const webhookPayload = {
    reference,
    trail_id: trailId,
    timestamp: new Date().toISOString(),
    customer: {
      name: customer.name,
      email: customer.email,
      phone: (customer as any).phone ?? null,
      notes: (customer as any).notes ?? null,
    },
    configuration: {
      pace: configuration.pace,
      direction: configuration.direction,
      days: configuration.days,
      party_size: configuration.party_size,
      start_date: configuration.start_date ?? null,
      daily_hours: configuration.daily_hours,
    },
    pricing: {
      total_price: pricing.total_price,
      per_person: pricing.per_person,
      deposit: pricing.deposit,
      deposit_per_person: pricing.deposit_per_person,
    },
  };

  fetch("https://hooks.zapier.com/hooks/catch/23441129/unutpvs/", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(webhookPayload),
  }).catch(() => {
    // Webhook failure is non-blocking — do not surface to user
  });

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

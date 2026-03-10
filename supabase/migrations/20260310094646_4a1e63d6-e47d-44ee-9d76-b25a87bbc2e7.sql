-- Create quotes table for storing saved trip quotes
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  trail_id TEXT NOT NULL,
  configuration JSONB NOT NULL,
  pricing JSONB NOT NULL,
  customer JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '21 days')
);

-- Enable RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quotes (no auth required for lead capture)
CREATE POLICY "Anyone can create quotes"
  ON public.quotes FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read quotes by reference (for shareable URLs and staff lookup)
CREATE POLICY "Anyone can read quotes by reference"
  ON public.quotes FOR SELECT
  USING (true);
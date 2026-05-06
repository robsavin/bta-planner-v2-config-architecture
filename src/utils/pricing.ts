export type TripPriceInputs = {
  partySize: number;
  nights: number;
  partyMultiplier: number;   // result of the existing MULTIPLIER lookup
  yearMultiplier: number;    // 1 for current year, 1.05 for future starts
  serviceFee?: number;       // default 49
  nightlyRate?: number;      // default 140
};

export function calculateTripPrice(input: TripPriceInputs): number {
  const {
    partySize,
    nights,
    partyMultiplier,
    yearMultiplier,
    serviceFee = 49,
    nightlyRate = 140,
  } = input;
  return ((serviceFee * partySize) + (nightlyRate * nights * partyMultiplier))
         * yearMultiplier;
}

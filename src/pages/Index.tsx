import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { addDays, format } from "date-fns";

import SpeedSelector from "@/components/SpeedSelector";
import DirectionSelector, { type TrailDirection } from "@/components/DirectionSelector";
import DateSelector from "@/components/DateSelector";
import DaysCalculator from "@/components/DaysCalculator";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import UnitToggle from "@/components/UnitToggle";
import PartySizeSelector from "@/components/PartySizeSelector";
import PurchaseModule from "@/components/PurchaseModule";
import ShareTripButton from "@/components/ShareTripButton";
import AdminQuoteView from "@/components/AdminQuoteView";
import SavedQuoteNotice from "@/components/SavedQuoteNotice";
import EnquiryForm from "@/components/EnquiryForm";

import MapDisplay from "@/components/MapDisplay";
import { getTrailConfig } from "@/config";
import {
  speedProfiles,
  calculateTotalTimeWithDirection,
  calculateDays,
  generateItineraryWithDirection,
  calculateSegmentTime,
  getDirectionalNodes,
  type SpeedProfile,
  type DayPlan,
} from "@/lib/trailData";
import type { UnitSystem } from "@/lib/formatUtils";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import { useTripUrlParams, resolveSpeedFromUrl } from "@/hooks/useUrlParams";
import { loadQuote, type SavedQuote } from "@/lib/quoteStorage";
import { useCurrency } from "@/hooks/useCurrency";

const MULTIPLIER: Record<number, number> = { 1: 1.65, 2: 2.0, 3: 3.6, 4: 4.0, 5: 5.55, 6: 6.0, 7: 7.49, 8: 8.0 };

const Index = () => {
  const urlParams = useTripUrlParams();
  const trailConfig = getTrailConfig();

  const initialSpeed = resolveSpeedFromUrl(urlParams.pace) ?? speedProfiles[1];
  const initialDirection = urlParams.direction ?? "south-to-north";
  const initialDate = urlParams.startDate ?? new Date();
  const initialHours = urlParams.dailyHours ?? 8;
  const initialParty = urlParams.partySize ?? 2;

  const [selectedSpeed, setSelectedSpeed] = useState<SpeedProfile>(initialSpeed);
  const [selectedDirection, setSelectedDirection] = useState<TrailDirection>(initialDirection);
  const [startDate, setStartDate] = useState<Date>(initialDate);
  const [hoursPerDay, setHoursPerDay] = useState<number>(initialHours);
  const [units, setUnits] = useState<UnitSystem>("metric");
  const [partySize, setPartySize] = useState<number>(initialParty);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  // Price pulse state
  const [pricePulse, setPricePulse] = useState(false);
  const pulseTimeout = useRef<ReturnType<typeof setTimeout>>();
  const triggerPricePulse = useCallback(() => {
    setPricePulse(true);
    clearTimeout(pulseTimeout.current);
    pulseTimeout.current = setTimeout(() => setPricePulse(false), 300);
  }, []);

  // Wrap setters to trigger pulse
  const handleSpeedChange = useCallback((s: SpeedProfile) => { setSelectedSpeed(s); triggerPricePulse(); }, [triggerPricePulse]);
  const handleHoursChange = useCallback((h: number) => { setHoursPerDay(h); triggerPricePulse(); }, [triggerPricePulse]);
  const handlePartySizeChange = useCallback((p: number) => { setPartySize(p); triggerPricePulse(); }, [triggerPricePulse]);

  // Saved quote state
  const [savedQuote, setSavedQuote] = useState<SavedQuote | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const quoteRef = urlParams.quote;
    if (!quoteRef) return;
    loadQuote(quoteRef).then((quote) => {
      if (quote) {
        setSavedQuote(quote);
        if (urlParams.admin) setIsAdminView(true);
      }
    });
  }, [urlParams.quote, urlParams.admin]);

  // Derived
  const totalHours = useMemo(
    () => calculateTotalTimeWithDirection(selectedSpeed, selectedDirection),
    [selectedSpeed, selectedDirection],
  );
  const calculatedDays = useMemo(() => calculateDays(totalHours, hoursPerDay), [totalHours, hoursPerDay]);
  const directionalNodes = useMemo(() => getDirectionalNodes(selectedDirection), [selectedDirection]);

  const [itinerary, setItinerary] = useState<DayPlan[]>([]);

  useEffect(() => {
    const newItinerary = generateItineraryWithDirection(calculatedDays, selectedSpeed, startDate, selectedDirection);
    setItinerary(newItinerary);
  }, [calculatedDays, selectedSpeed, startDate, selectedDirection]);

  // Update a day in the itinerary
  const handleUpdateDay = useCallback(
    (dayIndex: number, updates: Partial<DayPlan>) => {
      setItinerary((prev) => {
        const newItinerary = [...prev];
        const currentDay = newItinerary[dayIndex];

        if (updates.endNode && !currentDay.isRestDay) {
          const startNode = currentDay.startNode;
          const endNode = updates.endNode;
          const distance = endNode.distanceFromStart - startNode.distanceFromStart;
          const ascent = endNode.cumulativeAscent - startNode.cumulativeAscent;
          const descent = endNode.cumulativeDescent - startNode.cumulativeDescent;
          const walkingTime = calculateSegmentTime(distance, ascent, descent, selectedSpeed);

          newItinerary[dayIndex] = {
            ...currentDay, ...updates,
            distance: Number(distance.toFixed(1)), ascent: Math.round(ascent),
            descent: Math.round(descent), walkingTime: Number(walkingTime.toFixed(1)),
          };

          for (let i = dayIndex + 1; i < newItinerary.length; i++) {
            if (!newItinerary[i].isRestDay) {
              let prevEndNode = endNode;
              for (let j = i - 1; j >= 0; j--) {
                if (!newItinerary[j].isRestDay) { prevEndNode = newItinerary[j].endNode; break; }
              }
              const nextDay = newItinerary[i];
              const newStartNode = prevEndNode;
              const newDistance = nextDay.endNode.distanceFromStart - newStartNode.distanceFromStart;
              const newAscent = nextDay.endNode.cumulativeAscent - newStartNode.cumulativeAscent;
              const newDescent = nextDay.endNode.cumulativeDescent - newStartNode.cumulativeDescent;
              const newWalkingTime = calculateSegmentTime(newDistance, newAscent, newDescent, selectedSpeed);
              newItinerary[i] = {
                ...nextDay, startNode: newStartNode,
                distance: Number(newDistance.toFixed(1)), ascent: Math.round(newAscent),
                descent: Math.round(newDescent), walkingTime: Number(newWalkingTime.toFixed(1)),
              };
            } else {
              newItinerary[i] = { ...newItinerary[i], startNode: endNode, endNode: endNode };
            }
          }
        } else {
          newItinerary[dayIndex] = { ...currentDay, ...updates };
        }
        return newItinerary;
      });
      triggerPricePulse();
    },
    [selectedSpeed, triggerPricePulse],
  );

  const handleAddRestDay = useCallback(
    (afterDayIndex: number) => {
      setItinerary((prev) => {
        const newItinerary = [...prev];
        const afterDay = newItinerary[afterDayIndex];
        const restDay: DayPlan = {
          day: afterDay.day + 1, startNode: afterDay.endNode, endNode: afterDay.endNode,
          distance: 0, ascent: 0, descent: 0, walkingTime: 0, isRestDay: true,
          date: afterDay.date ? addDays(afterDay.date, 1) : undefined,
        };
        newItinerary.splice(afterDayIndex + 1, 0, restDay);
        let dayNumber = 1;
        for (let i = 0; i < newItinerary.length; i++) {
          newItinerary[i] = { ...newItinerary[i], day: dayNumber, date: addDays(startDate, i) };
          dayNumber++;
        }
        return newItinerary;
      });
      triggerPricePulse();
    },
    [startDate, triggerPricePulse],
  );

  const handleRemoveDay = useCallback(
    (dayIndex: number) => {
      setItinerary((prev) => {
        const newItinerary = prev.filter((_, i) => i !== dayIndex);
        let dayNumber = 1;
        for (let i = 0; i < newItinerary.length; i++) {
          newItinerary[i] = { ...newItinerary[i], day: dayNumber, date: addDays(startDate, i) };
          dayNumber++;
        }
        return newItinerary;
      });
      triggerPricePulse();
    },
    [startDate, triggerPricePulse],
  );

  const handleAddWalkingDay = useCallback(
    (afterDayIndex: number) => {
      setItinerary((prev) => {
        const newItinerary = [...prev];
        const afterDay = newItinerary[afterDayIndex];
        const finalNode = directionalNodes[directionalNodes.length - 1];
        const startNode = afterDay.endNode;
        const endNode = finalNode;
        const distance = endNode.distanceFromStart - startNode.distanceFromStart;
        const ascent = endNode.cumulativeAscent - startNode.cumulativeAscent;
        const descent = endNode.cumulativeDescent - startNode.cumulativeDescent;
        const walkingTime = calculateSegmentTime(distance, ascent, descent, selectedSpeed);
        const newWalkingDay: DayPlan = {
          day: afterDay.day + 1, startNode, endNode,
          distance: Number(distance.toFixed(1)), ascent: Math.round(ascent),
          descent: Math.round(descent), walkingTime: Number(walkingTime.toFixed(1)),
          isRestDay: false, date: afterDay.date ? addDays(afterDay.date, 1) : undefined,
        };
        newItinerary.splice(afterDayIndex + 1, 0, newWalkingDay);
        let dayNumber = 1;
        for (let i = 0; i < newItinerary.length; i++) {
          newItinerary[i] = { ...newItinerary[i], day: dayNumber, date: addDays(startDate, i) };
          dayNumber++;
        }
        return newItinerary;
      });
      triggerPricePulse();
    },
    [startDate, directionalNodes, selectedSpeed, triggerPricePulse],
  );

  // Pricing — nights = totalDays - 1 (includes rest days)
  const { formatPrice, convertAmount, currency } = useCurrency();

  const livePricing = useMemo(() => {
    const totalDays = itinerary.length;
    const nights = Math.max(0, totalDays - 1);
    const multiplier = MULTIPLIER[partySize] ?? partySize;
    const totalPrice = (49 * partySize) + (140 * nights * multiplier);
    const pricePerPerson = Math.round(totalPrice / partySize);
    const depPerPerson = trailConfig.depositPerPerson;
    const deposit = depPerPerson * partySize;
    return { totalPrice, pricePerPerson, deposit, depositPerPerson: depPerPerson, nights };
  }, [itinerary, partySize, trailConfig.depositPerPerson]);

  const pricing = savedQuote
    ? { totalPrice: savedQuote.pricing.total_price, pricePerPerson: savedQuote.pricing.per_person, deposit: savedQuote.pricing.deposit, depositPerPerson: savedQuote.pricing.deposit_per_person, nights: livePricing.nights }
    : livePricing;

  const activeDays = itinerary.filter(d => !d.isRestDay).length;
  const nights = livePricing.nights;

  return (
    <div className="min-h-screen bg-background pt-6">
      {/* Admin quote view */}
      {isAdminView && savedQuote && (
        <section className="container mx-auto px-4 pt-4">
          <AdminQuoteView quote={savedQuote} />
        </section>
      )}

      {/* ─── Config Panel ─── */}
      <section className="border-b border-border bg-card" aria-label="Trip settings">
        <div className="container mx-auto px-4 py-4">
          {/* Headline */}
          <h1 className="font-display font-bold text-bta-dark-teal text-2xl md:text-[32px] leading-tight mb-4">
            Build your {trailConfig.name}
          </h1>

          {/* Top row: admin share + units */}
          <div className="flex items-center justify-between mb-3">
            {urlParams.admin && (
              <ShareTripButton
                trail={trailConfig.id} pace={selectedSpeed.id} direction={selectedDirection}
                days={itinerary.length} partySize={partySize} startDate={startDate} dailyHours={hoursPerDay}
              />
            )}
            <UnitToggle units={units} onUnitsChange={setUnits} />
          </div>

          {/* ── Your Route ── */}
          <div className="mb-3">
            <p className="font-display font-medium text-xs uppercase tracking-widest text-bta-forest mb-2">Your Route</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DirectionSelector selectedDirection={selectedDirection} onDirectionChange={setSelectedDirection} compact />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border/60 mb-3" />

          {/* ── Your Trip ── */}
          <div>
            <p className="font-display font-medium text-xs uppercase tracking-widest text-bta-dark-teal mb-2">Your Trip</p>
            <div className="space-y-4">
              {/* Pace */}
              <div className="space-y-1">
                <label className="font-display font-medium text-sm uppercase tracking-wider text-bta-dark-teal">Pace</label>
                <SpeedSelector selectedSpeed={selectedSpeed} onSpeedChange={handleSpeedChange} />
              </div>

              {/* Daily Hours */}
              <div className="space-y-1.5">
                <label className="font-display font-medium text-sm uppercase tracking-wider text-bta-dark-teal">Daily Hours</label>
                <DaysCalculator
                  totalHours={totalHours} hoursPerDay={hoursPerDay}
                  onHoursPerDayChange={handleHoursChange} calculatedDays={calculatedDays}
                  isTrailRunner={selectedSpeed.id === "trailrunner"}
                />
              </div>

              {/* Start Date + Party Size — side by side on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-display font-medium text-sm uppercase tracking-wider text-bta-dark-teal">
                    When do you want to start?
                  </label>
                  <DateSelector selectedDate={startDate} onDateChange={setStartDate} compact />
                </div>
                <div className="space-y-1">
                  <label className="font-display font-medium text-sm uppercase tracking-wider text-bta-dark-teal">Party Size</label>
                  <PartySizeSelector partySize={partySize} onPartySizeChange={handlePartySizeChange} />
                </div>
              </div>

              {/* Live price line */}
              <div className="pt-1">
                <div className={`flex items-baseline gap-1.5 flex-wrap transition-opacity duration-300 ${pricePulse ? "opacity-60" : "opacity-100"}`}>
                  <span className="font-display font-bold text-bta-dark-teal" style={{ fontSize: "22px" }}>
                    {formatPrice(pricing.totalPrice)}
                  </span>
                  <span className="text-bta-forest" style={{ fontSize: "13px" }}>
                    for {partySize} {partySize === 1 ? "person" : "people"} · {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                </div>
                <p className="text-xs italic text-bta-forest mt-0.5">
                  This is your price. No hidden costs, no surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-column layout: map + day cards */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 lg:sticky lg:top-4 lg:self-start">
            <MapDisplay itinerary={itinerary} direction={selectedDirection} className="h-[300px] lg:h-[calc(100vh-8rem)]" />
          </div>
          <div className="lg:w-1/2">
            <ItineraryDisplay
              itinerary={itinerary} speedProfile={selectedSpeed} direction={selectedDirection}
              units={units} hoursPerDay={hoursPerDay} onUpdateDay={handleUpdateDay}
              onAddRestDay={handleAddRestDay} onRemoveDay={handleRemoveDay} onAddWalkingDay={handleAddWalkingDay}
            />
          </div>
        </div>

        {savedQuote && !isAdminView && (
          <div className="mt-6"><SavedQuoteNotice quote={savedQuote} /></div>
        )}

        <PurchaseModule
          itinerary={itinerary} direction={selectedDirection} speedProfileName={selectedSpeed.name}
          speedProfileId={selectedSpeed.id} startDate={startDate} partySize={partySize} units={units}
          onSaveQuote={() => setQuoteOpen(true)} onOpenEnquiry={() => setEnquiryOpen(true)}
          overridePricing={savedQuote ? pricing : undefined} pricePulse={pricePulse}
        />

        <QuoteRequestForm
          open={quoteOpen} onOpenChange={setQuoteOpen} itinerary={itinerary}
          speedProfile={selectedSpeed} direction={selectedDirection} hoursPerDay={hoursPerDay}
          startDate={startDate} partySize={partySize} totalPrice={pricing.totalPrice}
          pricePerPerson={pricing.pricePerPerson} deposit={pricing.deposit} depositPerPerson={pricing.depositPerPerson}
        />

        <EnquiryForm
          open={enquiryOpen} onOpenChange={setEnquiryOpen} trailName={trailConfig.name}
          days={activeDays} nights={nights} partySize={partySize} travelerType={selectedSpeed.name}
          estimatedTotalGBP={pricing.totalPrice} displayCurrency={currency} displayTotal={convertAmount(pricing.totalPrice)}
        />
      </main>
    </div>
  );
};

export default Index;

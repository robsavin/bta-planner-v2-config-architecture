import { useState, useMemo, useCallback, useEffect } from "react";
import { addDays } from "date-fns";

import btaLogo from "@/assets/bta-logo.gif";
import SpeedSelector from "@/components/SpeedSelector";
import DirectionSelector, { type TrailDirection } from "@/components/DirectionSelector";
import DateSelector from "@/components/DateSelector";
import DaysCalculator from "@/components/DaysCalculator";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import UnitToggle from "@/components/UnitToggle";
import PartySizeSelector from "@/components/PartySizeSelector";
import PricingDisplay from "@/components/PricingDisplay";
import MapDisplay from "@/components/MapDisplay";
import { Button } from "@/components/ui/button";
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
import { CalendarCheck, FileText } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import BookTripButton from "@/components/BookTripButton";

const Index = () => {
  // Planning state — defaults: Hiker, 8h/day, S→N, today
  const [selectedSpeed, setSelectedSpeed] = useState<SpeedProfile>(speedProfiles[1]);
  const [selectedDirection, setSelectedDirection] = useState<TrailDirection>("south-to-north");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [units, setUnits] = useState<UnitSystem>("metric");
  const [partySize, setPartySize] = useState<number>(2);
  const [quoteOpen, setQuoteOpen] = useState(false);

  // Derived
  const totalHours = useMemo(
    () => calculateTotalTimeWithDirection(selectedSpeed, selectedDirection),
    [selectedSpeed, selectedDirection],
  );
  const calculatedDays = useMemo(() => calculateDays(totalHours, hoursPerDay), [totalHours, hoursPerDay]);
  const directionalNodes = useMemo(() => getDirectionalNodes(selectedDirection), [selectedDirection]);

  // Auto-generate itinerary whenever inputs change
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
            ...currentDay,
            ...updates,
            distance: Number(distance.toFixed(1)),
            ascent: Math.round(ascent),
            descent: Math.round(descent),
            walkingTime: Number(walkingTime.toFixed(1)),
          };

          for (let i = dayIndex + 1; i < newItinerary.length; i++) {
            if (!newItinerary[i].isRestDay) {
              let prevEndNode = endNode;
              for (let j = i - 1; j >= 0; j--) {
                if (!newItinerary[j].isRestDay) {
                  prevEndNode = newItinerary[j].endNode;
                  break;
                }
              }

              const nextDay = newItinerary[i];
              const newStartNode = prevEndNode;
              const newDistance = nextDay.endNode.distanceFromStart - newStartNode.distanceFromStart;
              const newAscent = nextDay.endNode.cumulativeAscent - newStartNode.cumulativeAscent;
              const newDescent = nextDay.endNode.cumulativeDescent - newStartNode.cumulativeDescent;
              const newWalkingTime = calculateSegmentTime(newDistance, newAscent, newDescent, selectedSpeed);

              newItinerary[i] = {
                ...nextDay,
                startNode: newStartNode,
                distance: Number(newDistance.toFixed(1)),
                ascent: Math.round(newAscent),
                descent: Math.round(newDescent),
                walkingTime: Number(newWalkingTime.toFixed(1)),
              };
            } else {
              newItinerary[i] = {
                ...newItinerary[i],
                startNode: endNode,
                endNode: endNode,
              };
            }
          }
        } else {
          newItinerary[dayIndex] = { ...currentDay, ...updates };
        }

        return newItinerary;
      });
    },
    [selectedSpeed],
  );

  // Add rest day after a given day
  const handleAddRestDay = useCallback(
    (afterDayIndex: number) => {
      setItinerary((prev) => {
        const newItinerary = [...prev];
        const afterDay = newItinerary[afterDayIndex];

        const restDay: DayPlan = {
          day: afterDay.day + 1,
          startNode: afterDay.endNode,
          endNode: afterDay.endNode,
          distance: 0,
          ascent: 0,
          descent: 0,
          walkingTime: 0,
          isRestDay: true,
          date: afterDay.date ? addDays(afterDay.date, 1) : undefined,
        };

        newItinerary.splice(afterDayIndex + 1, 0, restDay);

        let dayNumber = 1;
        for (let i = 0; i < newItinerary.length; i++) {
          newItinerary[i] = {
            ...newItinerary[i],
            day: dayNumber,
            date: addDays(startDate, i),
          };
          dayNumber++;
        }

        return newItinerary;
      });
    },
    [startDate],
  );

  // Remove a day
  const handleRemoveDay = useCallback(
    (dayIndex: number) => {
      setItinerary((prev) => {
        const newItinerary = prev.filter((_, i) => i !== dayIndex);

        let dayNumber = 1;
        for (let i = 0; i < newItinerary.length; i++) {
          newItinerary[i] = {
            ...newItinerary[i],
            day: dayNumber,
            date: addDays(startDate, i),
          };
          dayNumber++;
        }

        return newItinerary;
      });
    },
    [startDate],
  );

  // Add a walking day
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
          day: afterDay.day + 1,
          startNode: startNode,
          endNode: endNode,
          distance: Number(distance.toFixed(1)),
          ascent: Math.round(ascent),
          descent: Math.round(descent),
          walkingTime: Number(walkingTime.toFixed(1)),
          isRestDay: false,
          date: afterDay.date ? addDays(afterDay.date, 1) : undefined,
        };

        newItinerary.splice(afterDayIndex + 1, 0, newWalkingDay);

        let dayNumber = 1;
        for (let i = 0; i < newItinerary.length; i++) {
          newItinerary[i] = {
            ...newItinerary[i],
            day: dayNumber,
            date: addDays(startDate, i),
          };
          dayNumber++;
        }

        return newItinerary;
      });
    },
    [startDate, directionalNodes, selectedSpeed],
  );

  return (
    <div className="min-h-screen bg-background">
      <HeroSection units={units} />

      {/* Compact config panel */}
      <section className="border-b border-border bg-card shadow-sm" aria-label="Trip settings">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-end mb-4">
            <UnitToggle units={units} onUnitsChange={setUnits} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <DirectionSelector
              selectedDirection={selectedDirection}
              onDirectionChange={setSelectedDirection}
              compact
            />
            <SpeedSelector
              selectedSpeed={selectedSpeed}
              onSpeedChange={setSelectedSpeed}
              compact
            />
            <DaysCalculator
              totalHours={totalHours}
              hoursPerDay={hoursPerDay}
              onHoursPerDayChange={setHoursPerDay}
              calculatedDays={calculatedDays}
              compact
            />
            <DateSelector
              selectedDate={startDate}
              onDateChange={setStartDate}
              compact
            />
            <PartySizeSelector
              partySize={partySize}
              onPartySizeChange={setPartySize}
            />
          </div>
        </div>
      </section>

      {/* Two-column layout: map + day cards */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map — sticky on desktop */}
          <div className="lg:w-1/2 lg:sticky lg:top-4 lg:self-start">
            <MapDisplay itinerary={itinerary} direction={selectedDirection} className="h-[calc(100vh-8rem)]" />
          </div>

          {/* Day cards — scrolling */}
          <div className="lg:w-1/2">
            <ItineraryDisplay
              itinerary={itinerary}
              speedProfile={selectedSpeed}
              direction={selectedDirection}
              units={units}
              hoursPerDay={hoursPerDay}
              onUpdateDay={handleUpdateDay}
              onAddRestDay={handleAddRestDay}
              onRemoveDay={handleRemoveDay}
              onAddWalkingDay={handleAddWalkingDay}
            />
          </div>
        </div>

        {/* Pricing */}
        <PricingDisplay
          partySize={partySize}
          activeDays={itinerary.filter(d => !d.isRestDay).length}
          depositPerPerson={getTrailConfig().depositPerPerson}
        />

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t border-border">
          <BookTripButton speedProfileId={selectedSpeed.id} partySize={partySize} />
          <Button size="lg" variant="outline" className="h-14 px-10 text-lg gap-3" onClick={() => setQuoteOpen(true)}>
            <FileText className="h-5 w-5" />
            Save My Quote
          </Button>
        </div>

        {/* Quote modal */}
        {(() => {
          const trailConfig = getTrailConfig();
          const activeDays = itinerary.filter(d => !d.isRestDay).length;
          const nights = Math.max(0, activeDays - 1);
          const MULTIPLIER: Record<number, number> = { 1: 1.65, 2: 2.0, 3: 3.6, 4: 4.0, 5: 5.55, 6: 6.0, 7: 7.49, 8: 8.0 };
          const multiplier = MULTIPLIER[partySize] ?? partySize;
          const totalPrice = (49 * partySize) + (140 * nights * multiplier);
          const pricePerPerson = Math.round(totalPrice / partySize);
          const depPerPerson = trailConfig.depositPerPerson;
          const deposit = depPerPerson * partySize;
          return (
            <QuoteRequestForm
              open={quoteOpen}
              onOpenChange={setQuoteOpen}
              itinerary={itinerary}
              speedProfile={selectedSpeed}
              direction={selectedDirection}
              hoursPerDay={hoursPerDay}
              startDate={startDate}
              partySize={partySize}
              totalPrice={totalPrice}
              pricePerPerson={pricePerPerson}
              deposit={deposit}
              depositPerPerson={depPerPerson}
            />
          );
        })()}
      </main>

      

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <nav aria-label="External links" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://bigtrailadventures.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img src={btaLogo} alt="Big Trail Adventures - guided walking holidays" className="h-14 w-auto" loading="lazy" />
            </a>
            <p className="text-sm text-muted-foreground">
              Book this adventure at{" "}
              <a
                href="https://bigtrailadventures.com/products/west-highland-way-adventure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                bigtrailadventures.com
              </a>
            </p>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 Big Trail Adventures. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

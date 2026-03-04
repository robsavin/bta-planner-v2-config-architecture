import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { addDays } from "date-fns";
import HeroSection from "@/components/HeroSection";
import btaLogo from "@/assets/bta-logo.gif";
import SpeedSelector from "@/components/SpeedSelector";
import DirectionSelector, { type TrailDirection } from "@/components/DirectionSelector";
import DateSelector from "@/components/DateSelector";
import DaysCalculator from "@/components/DaysCalculator";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import UnitToggle from "@/components/UnitToggle";
import { Button } from "@/components/ui/button";
import {
  speedProfiles,
  calculateTotalTimeWithDirection,
  calculateDays,
  generateItineraryWithDirection,
  calculateSegmentTime,
  getDirectionalNodes,
  type SpeedProfile,
  type DayPlan,
  type TrailNode,
} from "@/lib/trailData";
import type { UnitSystem } from "@/lib/formatUtils";
import { ArrowRight, RotateCcw, MapPin, Download } from "lucide-react";
import FeedbackForm from "@/components/FeedbackForm";
import FeaturesAndFaq from "@/components/FeaturesAndFaq";
import { trackEvent } from "@/lib/analytics";

const Index = () => {
  // Planning state
  const [selectedSpeed, setSelectedSpeed] = useState<SpeedProfile>(speedProfiles[1]); // Hiker
  const [selectedDirection, setSelectedDirection] = useState<TrailDirection>("south-to-north");
  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), 30));
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [showItinerary, setShowItinerary] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [units, setUnits] = useState<UnitSystem>("metric");

  // Ref for scrolling to top of itinerary
  const itineraryRef = useRef<HTMLDivElement>(null);

  // Calculate derived values
  const totalHours = useMemo(
    () => calculateTotalTimeWithDirection(selectedSpeed, selectedDirection),
    [selectedSpeed, selectedDirection],
  );
  const calculatedDays = useMemo(() => calculateDays(totalHours, hoursPerDay), [totalHours, hoursPerDay]);
  const directionalNodes = useMemo(() => getDirectionalNodes(selectedDirection), [selectedDirection]);

  // Generate itinerary
  const handleGenerateItinerary = useCallback(() => {
    const newItinerary = generateItineraryWithDirection(calculatedDays, selectedSpeed, startDate, selectedDirection);
    setItinerary(newItinerary);
    setShowItinerary(true);
    trackEvent("custom", { event_name: "generate_itinerary" });
  }, [calculatedDays, selectedSpeed, startDate, selectedDirection]);

  // Scroll to top when itinerary is shown
  useEffect(() => {
    if (showItinerary) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  }, [showItinerary]);

  // Update a day in the itinerary
  const handleUpdateDay = useCallback(
    (dayIndex: number, updates: Partial<DayPlan>) => {
      setItinerary((prev) => {
        const newItinerary = [...prev];
        const currentDay = newItinerary[dayIndex];

        // If end node changed, recalculate stats
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

          // Update subsequent days' start nodes
          for (let i = dayIndex + 1; i < newItinerary.length; i++) {
            if (!newItinerary[i].isRestDay) {
              // Find previous non-rest day's end node
              let prevEndNode = endNode;
              for (let j = i - 1; j >= 0; j--) {
                if (!newItinerary[j].isRestDay) {
                  prevEndNode = newItinerary[j].endNode;
                  break;
                }
              }

              const nextDay = newItinerary[i];
              const newStartNode = prevEndNode;

              // Recalculate this day's stats
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
              // Rest day - just update the node reference
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

        // Create rest day at the end location of the previous day
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

        // Insert rest day
        newItinerary.splice(afterDayIndex + 1, 0, restDay);

        // Renumber days and update dates
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

  // Remove a day (only rest days can be removed)
  const handleRemoveDay = useCallback(
    (dayIndex: number) => {
      setItinerary((prev) => {
        const newItinerary = prev.filter((_, i) => i !== dayIndex);

        // Renumber days and update dates
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

  // Add a walking day to continue the trail
  const handleAddWalkingDay = useCallback(
    (afterDayIndex: number) => {
      setItinerary((prev) => {
        const newItinerary = [...prev];
        const afterDay = newItinerary[afterDayIndex];
        const finalNode = directionalNodes[directionalNodes.length - 1];

        // Calculate stats for the new walking day
        const startNode = afterDay.endNode;
        const endNode = finalNode;

        const distance = endNode.distanceFromStart - startNode.distanceFromStart;
        const ascent = endNode.cumulativeAscent - startNode.cumulativeAscent;
        const descent = endNode.cumulativeDescent - startNode.cumulativeDescent;
        const walkingTime = calculateSegmentTime(distance, ascent, descent, selectedSpeed);

        // Create new walking day
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

        // Insert new walking day
        newItinerary.splice(afterDayIndex + 1, 0, newWalkingDay);

        // Renumber days and update dates
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

  // Reset to planning
  const handleReset = useCallback(() => {
    setShowItinerary(false);
    setItinerary([]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection units={units} />

      <main className="container mx-auto px-4 py-12">
        {!showItinerary ? (
          // Planning section
          <section className="max-w-4xl mx-auto space-y-12 animate-fade-in" aria-label="Plan your itinerary">
            <div className="text-center space-y-3">
              <p className="text-primary font-semibold uppercase tracking-widest text-sm">Your Adventure Starts Here</p>
              <h2 className="text-4xl md:text-5xl font-black">Plan Your West Highland Way Itinerary</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-muted-foreground max-w-xl mx-auto pt-2">
                Choose your options below to create a personalised day-by-day plan.
                <br />
                <span className="text-sm">Stops are based on access to accommodation (does not include camping).</span>
              </p>
            </div>

            {/* Unit Toggle - centered */}
            <div className="flex justify-center">
              <UnitToggle units={units} onUnitsChange={setUnits} />
            </div>

            <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8">
              {/* Left column - Direction, Pace, Date */}
              <div className="space-y-8">
                <DirectionSelector
                  selectedDirection={selectedDirection}
                  onDirectionChange={setSelectedDirection}
                  stepNumber={1}
                />

                <SpeedSelector selectedSpeed={selectedSpeed} onSpeedChange={setSelectedSpeed} stepNumber={2} />

                <DateSelector selectedDate={startDate} onDateChange={setStartDate} stepNumber={3} />
              </div>

              {/* Right column - Daily Hours Calculator */}
              <div>
                <DaysCalculator
                  totalHours={totalHours}
                  hoursPerDay={hoursPerDay}
                  onHoursPerDayChange={setHoursPerDay}
                  calculatedDays={calculatedDays}
                  stepNumber={4}
                />
              </div>
            </div>

            {/* Generate button */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <Button
                size="lg"
                onClick={handleGenerateItinerary}
                className="h-14 px-8 text-lg gap-3 bg-primary hover:bg-primary/90 shadow-elevated hover:shadow-card transition-all"
              >
                <MapPin className="h-5 w-5" />
                Generate My Itinerary
                <ArrowRight className="h-5 w-5" />
              </Button>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                You will immediately see your itinerary, you can then adjust any days as required, add in rest days if
                needed, download as a PDF, and grab <strong>GPX files for each stage</strong> to use on your GPS device or phone.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Download className="h-3.5 w-3.5" />
                <span>Includes downloadable GPX route files for every day of your walk</span>
              </div>
            </div>
          </section>
        ) : (
          // Itinerary section
          <section ref={itineraryRef} className="max-w-3xl mx-auto space-y-8 animate-fade-in" aria-label="Your itinerary">
            {/* Back button and unit toggle */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors font-medium"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </button>

              <UnitToggle units={units} onUnitsChange={setUnits} />
            </div>

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
          </section>
        )}
      </main>

      {!showItinerary && <FeaturesAndFaq />}

      {showItinerary && <FeedbackForm />}

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          {showItinerary && (
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
          )}
          <p className="text-xs text-muted-foreground">© 2026 Big Trail Adventures. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

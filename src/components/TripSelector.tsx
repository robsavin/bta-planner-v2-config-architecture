import { useMemo } from "react";
import { getTrailConfig } from "@/config";
import {
  speedProfiles,
  calculateTotalTimeWithDirection,
  calculateDays,
  type SpeedProfile,
} from "@/lib/trailData";

interface TripSelectorProps {
  onSelectTrip: (speedProfileId: string, partySize: number, startDate: Date) => void;
}

const CARD_NAMES: Record<string, string> = {
  explorer: "The Explorer",
  hiker: "The Classic",
  fastpacker: "The Challenge",
};

const EFFORT: Record<string, string> = {
  explorer: "Gentle",
  hiker: "Moderate",
  fastpacker: "Demanding",
};

const getDefaultStartDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 42);
  const day = d.getDay();
  const daysUntilFriday = (5 - day + 7) % 7;
  d.setDate(d.getDate() + daysUntilFriday);
  return d;
};

const TripSelector = ({ onSelectTrip }: TripSelectorProps) => {
  const trailConfig = getTrailConfig();

  const cards = useMemo(() => {
    const eligible = speedProfiles.filter(
      (p) => p.id === "explorer" || p.id === "hiker" || p.id === "fastpacker"
    );
    return eligible.map((profile) => {
      const days = calculateDays(
        calculateTotalTimeWithDirection(profile, "south-to-north"),
        8
      );
      const nights = days - 1;
      const avgKmPerDay = Math.round(trailConfig.totalDistanceKm / days);
      const dailyAscent = Math.round(trailConfig.totalAscentM / days);
      const pricePerPerson = Math.round(((49 * 2) + (140 * nights * 2.0)) / 2);
      return { profile, days, nights, avgKmPerDay, dailyAscent, pricePerPerson };
    });
  }, [trailConfig]);

  const hikerCard = cards.find((c) => c.profile.id === "hiker");
  const hikerDays = hikerCard?.days ?? 7;

  const handleSelect = (profileId: string) => {
    onSelectTrip(profileId, 2, getDefaultStartDate());
    document.getElementById("planner-itinerary")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCustomise = () => {
    document.getElementById("bta-planner")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        fontFamily: "Barlow, sans-serif",
        padding: "2rem 1rem",
        maxWidth: 860,
        margin: "0 auto",
      }}
    >
      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "Barlow Condensed, sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#c4813a",
          margin: 0,
          marginBottom: 4,
        }}
      >
        {trailConfig.name} — {trailConfig.totalDistanceKm}km, Scotland
      </p>

      {/* Heading */}
      <h2
        style={{
          fontFamily: "Barlow Condensed, sans-serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#2d4a54",
          margin: 0,
          marginBottom: 8,
        }}
      >
        Find your {trailConfig.name}
      </h2>

      {/* Intro */}
      <p
        style={{
          fontSize: 15,
          color: "#666",
          margin: 0,
          marginBottom: 24,
          lineHeight: 1.5,
        }}
      >
        Most people walk the {trailConfig.name} in {hikerDays} days. Some want longer to
        take it all in. Others want a real physical challenge. Pick the trip that suits
        you — or use the planner below to build your own.
      </p>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {cards.map((card) => {
          const isHiker = card.profile.id === "hiker";
          return (
            <div
              key={card.profile.id}
              style={{
                background: "#ffffff",
                border: isHiker ? "2px solid #FF961B" : "0.5px solid #e0e0e0",
                borderRadius: 12,
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Eyebrow row */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    color: "#c4813a",
                  }}
                >
                  {EFFORT[card.profile.id]}
                </span>
                {isHiker && (
                  <span
                    style={{
                      background: "#fff3e0",
                      color: "#c4813a",
                      border: "0.5px solid #f5c07a",
                      borderRadius: 4,
                      padding: "2px 8px",
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    Most popular
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#2d4a54",
                  margin: 0,
                  marginBottom: "0.9rem",
                }}
              >
                {CARD_NAMES[card.profile.id]}
              </h3>

              {/* Social proof */}
              {card.profile.socialProof && (
                <p
                  style={{
                    fontSize: 13,
                    fontStyle: "italic",
                    color: "#888",
                    borderLeft: "2px solid #e8eff1",
                    padding: "0.6rem 0.75rem",
                    marginBottom: "1rem",
                    marginTop: 0,
                  }}
                >
                  {card.profile.socialProof}
                </p>
              )}

              {/* Stats grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  borderTop: "0.5px solid #e0e0e0",
                  paddingTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", color: "#999" }}>
                    Days on trail
                  </div>
                  <div
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#2d4a54",
                    }}
                  >
                    {card.days}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", color: "#999" }}>
                    Avg per day (km)
                  </div>
                  <div
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#2d4a54",
                    }}
                  >
                    {card.avgKmPerDay}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", color: "#999" }}>
                    Daily ascent (m)
                  </div>
                  <div
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#2d4a54",
                    }}
                  >
                    ~{card.dailyAscent}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", color: "#999" }}>
                    Effort
                  </div>
                  <div
                    style={{
                      fontFamily: "Barlow Condensed, sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#2d4a54",
                    }}
                  >
                    {EFFORT[card.profile.id]}
                  </div>
                </div>
              </div>

              {/* Price row */}
              <div
                style={{
                  borderTop: "0.5px solid #e0e0e0",
                  paddingTop: "1rem",
                  marginTop: "auto",
                }}
              >
                <div style={{ fontSize: 11, textTransform: "uppercase", color: "#999" }}>
                  From
                </div>
                <div
                  style={{
                    fontFamily: "Barlow Condensed, sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#2d4a54",
                  }}
                >
                  £{card.pricePerPerson}
                </div>
                <div style={{ fontSize: 12, color: "#999" }}>per person (2 sharing)</div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => handleSelect(card.profile.id)}
                style={{
                  display: "block",
                  width: "100%",
                  marginTop: "1rem",
                  padding: "11px 0",
                  backgroundColor: "#FF961B",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 6,
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Plan this trip
              </button>

              {/* Secondary */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCustomise();
                }}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  fontSize: 12,
                  color: "#999",
                  cursor: "pointer",
                  marginTop: "0.6rem",
                  textAlign: "center",
                }}
              >
                or customise below ↓
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TripSelector;

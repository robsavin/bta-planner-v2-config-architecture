import { Clock, ArrowUp, ArrowDown, MapPin } from "lucide-react";

import { formatDistance, formatElevation, type UnitSystem } from "@/lib/formatUtils";
import { calculateTotalTime, calculateDays } from "@/lib/trailData";
import { getTrailConfig } from "@/config";

interface HeroSectionProps {
  units?: UnitSystem;
}

const HeroSection = ({ units = "metric" }: HeroSectionProps) => {
  const config = getTrailConfig();
  const totalDistanceKm = config.totalDistanceKm;
  const totalAscentM = config.totalAscentM;
  const totalDescentM = config.totalDescentM;
  
  // Calculate dynamic duration range at 8 hours/day
  const hoursPerDay = 8;
  const trailRunner = config.speedProfiles.find(p => p.id === "trailrunner")!;
  const explorer = config.speedProfiles.find(p => p.id === "explorer")!;
  
  const minDays = calculateDays(calculateTotalTime(trailRunner), hoursPerDay);
  const maxDays = calculateDays(calculateTotalTime(explorer), hoursPerDay);
  const durationLabel = `${minDays}-${maxDays} days`;

  return (
    <div className="relative h-[60vh] min-h-[500px] overflow-hidden" role="banner">
      {/* Back to All Itinerary Planners */}
      <a
        href="https://openair.tools/itinerary-planners"
        className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
      >
        ← All Itinerary Planners
      </a>

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${config.hero.imagePath})` }}
        role="img"
        aria-label="Scenic view of the West Highland Way trail through the Scottish Highlands"
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/40 to-background/95" />
      </div>
      
      {/* Content */}
      <header className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="animate-fade-in">
          <span className="mb-4 inline-block rounded-full bg-primary/90 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground">
            Itinerary Planner
          </span>
        </div>
        
        <h1 className="font-display mb-4 text-4xl tracking-wide text-primary-foreground drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl animate-slide-up">
          {config.name}
        </h1>
        
        <p className="font-body mb-8 max-w-2xl text-lg text-primary-foreground/90 drop-shadow md:text-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
          {config.hero.description.replace("{distance}", formatDistance(totalDistanceKm, units))}
        </p>
        
        {/* Quick stats */}
        <div className="flex flex-wrap justify-center divide-x divide-primary-foreground/30 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <StatBadge icon={<MapPin className="h-5 w-5" />} value={formatDistance(totalDistanceKm, units)} label="Distance" />
          <StatBadge icon={<ArrowUp className="h-5 w-5" />} value={formatElevation(totalAscentM, units)} label="Ascent" />
          <StatBadge icon={<ArrowDown className="h-5 w-5" />} value={formatElevation(totalDescentM, units)} label="Descent" />
          <StatBadge icon={<Clock className="h-5 w-5" />} value={durationLabel} label="Duration" />
        </div>
      </header>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </div>
  );
};

interface StatBadgeProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatBadge = ({ icon, value, label }: StatBadgeProps) => (
  <div className="flex flex-col items-center px-6 py-3 text-primary-foreground bg-black/30">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="font-bold text-xl">{value}</span>
    </div>
    <span className="text-xs uppercase tracking-wider">{label}</span>
  </div>
);

export default HeroSection;

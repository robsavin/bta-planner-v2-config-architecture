// Trail configuration types — shared across all trail planners

export interface TrailNodeConfig {
  id: string;
  name: string;
  distanceFromStart: number; // km (cumulative from default start)
  cumulativeAscent: number; // m (cumulative)
  cumulativeDescent: number; // m (cumulative)
  hasAccommodation: boolean;
  hasServices: boolean;
  description?: string;
  /** Approximate lat/lng for map markers */
  coordinates: [number, number];
}

export interface SpeedProfileConfig {
  id: string;
  name: string;
  description: string;
  flatSpeed: number; // km/h on flat terrain
  ascentSpeed: number; // m/h vertical gain
  descentSpeed: number; // m/h vertical loss
}

export interface TrailConfig {
  /** Unique identifier for this trail, e.g. "west-highland-way" */
  id: string;

  /** Display name, e.g. "West Highland Way" */
  name: string;

  /** Total distance in km (used for hero stats) */
  totalDistanceKm: number;
  /** Total ascent in m */
  totalAscentM: number;
  /** Total descent in m */
  totalDescentM: number;

  /** Default direction labels */
  directions: {
    default: "south-to-north" | "north-to-south";
    labels: {
      "south-to-north": { name: string; description: string };
      "north-to-south": { name: string; description: string };
    };
  };

  /** Ordered waypoints from the default start to default finish */
  nodes: TrailNodeConfig[];

  /** Available pace profiles for this trail */
  speedProfiles: SpeedProfileConfig[];

  /** Path or URL to the GPX zip asset */
  gpxAssetPath: string;

  /**
   * Deposit amount per person in GBP.
   * When embedded in Shopify, this value will be overridden by a
   * data-deposit attribute passed in from the liquid template.
   */
  depositPerPerson: number;

  /** Hero section metadata */
  hero: {
    /** Subtitle / description shown in the hero */
    description: string;
    /** Path to hero background image */
    imagePath: string;
  };

  /** Branding */
  branding: {
    /** Organisation name for footer / PDF */
    organisationName: string;
    /** Website URL */
    websiteUrl: string;
    /** Product / booking URL */
    bookingUrl: string;
    /** Feedback email */
    feedbackEmail: string;
    /** Quote email */
    quoteEmail: string;
    /** Logo paths */
    logoGif: string;
    logoColor: string;
    logoWhite: string;
  };
}

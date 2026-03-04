import type { TrailConfig } from "../types";
import whwGpxZipUrl from "@/data/whwgpx.zip?url";
import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";

const westHighlandWay: TrailConfig = {
  id: "west-highland-way",
  name: "West Highland Way",

  totalDistanceKm: 153,
  totalAscentM: 3122,
  totalDescentM: 3168,

  directions: {
    default: "south-to-north",
    labels: {
      "south-to-north": {
        name: "South to North",
        description: "Milngavie to Fort William (traditional route)",
      },
      "north-to-south": {
        name: "North to South",
        description: "Fort William to Milngavie",
      },
    },
  },

  nodes: [
    { id: "milngavie", name: "Milngavie", distanceFromStart: 0, cumulativeAscent: 0, cumulativeDescent: 0, hasAccommodation: true, hasServices: true, coordinates: [55.9419, -4.3139] },
    { id: "drymen", name: "Drymen", distanceFromStart: 18.9, cumulativeAscent: 215, cumulativeDescent: 219, hasAccommodation: true, hasServices: true, coordinates: [56.0522, -4.4372] },
    { id: "balmaha", name: "Balmaha", distanceFromStart: 30.5, cumulativeAscent: 554, cumulativeDescent: 589, hasAccommodation: true, hasServices: true, coordinates: [56.0789, -4.5261] },
    { id: "rowardennan", name: "Rowardennan", distanceFromStart: 43.5, cumulativeAscent: 774, cumulativeDescent: 807, hasAccommodation: true, hasServices: true, coordinates: [56.1378, -4.6317] },
    { id: "inversnaid", name: "Inversnaid", distanceFromStart: 54.4, cumulativeAscent: 989, cumulativeDescent: 1016, hasAccommodation: true, hasServices: false, coordinates: [56.2378, -4.6831] },
    { id: "ardleish", name: "Ardleish", distanceFromStart: 61.1, cumulativeAscent: 1087, cumulativeDescent: 1124, hasAccommodation: true, hasServices: false, coordinates: [56.2744, -4.7178] },
    { id: "inverarnan", name: "Inverarnan", distanceFromStart: 64.9, cumulativeAscent: 1187, cumulativeDescent: 1215, hasAccommodation: true, hasServices: false, coordinates: [56.3136, -4.7172] },
    { id: "crianlarich", name: "Crianlarich", distanceFromStart: 74.4, cumulativeAscent: 1459, cumulativeDescent: 1255, hasAccommodation: true, hasServices: true, coordinates: [56.3908, -4.6192] },
    { id: "tyndrum", name: "Tyndrum", distanceFromStart: 83.7, cumulativeAscent: 1633, cumulativeDescent: 1461, hasAccommodation: true, hasServices: true, coordinates: [56.4344, -4.7108] },
    { id: "bridge-of-orchy", name: "Bridge of Orchy", distanceFromStart: 94.5, cumulativeAscent: 1773, cumulativeDescent: 1638, hasAccommodation: true, hasServices: true, coordinates: [56.5156, -4.7633] },
    { id: "inveroran", name: "Inveroran", distanceFromStart: 98.6, cumulativeAscent: 1930, cumulativeDescent: 1806, hasAccommodation: true, hasServices: false, coordinates: [56.5389, -4.8042] },
    { id: "kingshouse", name: "Kingshouse", distanceFromStart: 114.2, cumulativeAscent: 2241, cumulativeDescent: 2049, hasAccommodation: true, hasServices: true, coordinates: [56.6553, -4.8556] },
    { id: "kinlochleven", name: "Kinlochleven", distanceFromStart: 128.5, cumulativeAscent: 2596, cumulativeDescent: 2637, hasAccommodation: true, hasServices: true, coordinates: [56.7086, -4.9606] },
    { id: "fort-william", name: "Fort William", distanceFromStart: 153.2, cumulativeAscent: 3122, cumulativeDescent: 3168, hasAccommodation: true, hasServices: true, coordinates: [56.8169, -5.1056] },
  ],

  speedProfiles: [
    {
      id: "explorer",
      name: "Explorer",
      description: "Enjoy the journey, take time for photos, sightseeing, and frequent breaks.",
      flatSpeed: 3.5,
      ascentSpeed: 300,
      descentSpeed: 400,
    },
    {
      id: "hiker",
      name: "Hiker",
      description: "Walk steadily at a relaxed pace, take short breaks, and enjoy the scenery.",
      flatSpeed: 4.0,
      ascentSpeed: 400,
      descentSpeed: 600,
    },
    {
      id: "fastpacker",
      name: "Fastpacker",
      description: "Fit and experienced, maintain a strong pace, take minimal breaks.",
      flatSpeed: 5.0,
      ascentSpeed: 600,
      descentSpeed: 1000,
    },
    {
      id: "trailrunner",
      name: "Trail Runner",
      description: "Combine running and fast hiking, carry light gear, focus on efficient progress.",
      flatSpeed: 7.0,
      ascentSpeed: 1000,
      descentSpeed: 1500,
    },
  ],

  gpxAssetPath: whwGpxZipUrl,

  hero: {
    description:
      "{distance} of Scotland's most spectacular scenery. Create your perfect itinerary from Milngavie to Fort William with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/west-highland-way-adventure",
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default westHighlandWay;

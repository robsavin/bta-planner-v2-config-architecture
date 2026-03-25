import type { TrailConfig } from "../types";
import whwGpxZipUrl from "@/data/whwgpx.zip?url";
import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";

const westHighlandWay: TrailConfig = {
  id: "west-highland-way",
  name: "West Highland Way",
  startLocation: "Milngavie",
  endLocation: "Fort William",

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
    { id: "milngavie", name: "Milngavie", distanceFromStart: 0, cumulativeAscent: 0, cumulativeDescent: 0, hasAccommodation: true, hasServices: true, coordinates: [55.9419, -4.3139], description: "A pleasant Glasgow commuter town and the official southern terminus of the Way, marked by a granite obelisk in the town centre." },
    { id: "drymen", name: "Drymen", distanceFromStart: 18.9, cumulativeAscent: 215, cumulativeDescent: 219, hasAccommodation: true, hasServices: true, coordinates: [56.0522, -4.4372], description: "A charming village on the edge of the Loch Lomond & The Trossachs National Park, with cosy pubs and the last full-service stop before the loch." },
    { id: "balmaha", name: "Balmaha", distanceFromStart: 30.5, cumulativeAscent: 554, cumulativeDescent: 589, hasAccommodation: true, hasServices: true, coordinates: [56.0789, -4.5261], description: "Sitting on the bonnie banks of Loch Lomond, with stunning views from the summit of Conic Hill and the Highland Boundary Fault crossing underfoot." },
    { id: "rowardennan", name: "Rowardennan", distanceFromStart: 43.5, cumulativeAscent: 774, cumulativeDescent: 807, hasAccommodation: true, hasServices: true, coordinates: [56.1378, -4.6317], description: "A remote lochside hamlet and the starting point for the ascent of Ben Lomond, Scotland's most southerly Munro." },
    { id: "inversnaid", name: "Inversnaid", distanceFromStart: 54.4, cumulativeAscent: 989, cumulativeDescent: 1016, hasAccommodation: true, hasServices: false, coordinates: [56.2378, -4.6831], description: "Reached via a rugged and rooty lochside path, with a dramatic waterfall and the historic Inversnaid Hotel overlooking Loch Lomond." },
    { id: "ardleish", name: "Ardleish", distanceFromStart: 61.1, cumulativeAscent: 1087, cumulativeDescent: 1124, hasAccommodation: true, hasServices: false, coordinates: [56.2744, -4.7178], description: "A tiny, remote settlement at the northern tip of Loch Lomond, accessible only on foot or by boat." },
    { id: "inverarnan", name: "Inverarnan", distanceFromStart: 64.9, cumulativeAscent: 1187, cumulativeDescent: 1215, hasAccommodation: true, hasServices: false, coordinates: [56.3136, -4.7172], description: "Home to the historic Drovers Inn, one of Scotland's oldest and most atmospheric pubs, dating back to 1705." },
    { id: "crianlarich", name: "Crianlarich", distanceFromStart: 74.4, cumulativeAscent: 1459, cumulativeDescent: 1255, hasAccommodation: true, hasServices: true, coordinates: [56.3908, -4.6192], description: "A small Highland village at the junction of two glens, surrounded by Munros and well-served by shops, a railway station, and places to eat." },
    { id: "tyndrum", name: "Tyndrum", distanceFromStart: 83.7, cumulativeAscent: 1633, cumulativeDescent: 1461, hasAccommodation: true, hasServices: true, coordinates: [56.4344, -4.7108], description: "A one-street village with a gold mine history, two railway stations, and the famous Green Welly Stop — a favourite resupply point for walkers." },
    { id: "bridge-of-orchy", name: "Bridge of Orchy", distanceFromStart: 94.5, cumulativeAscent: 1773, cumulativeDescent: 1638, hasAccommodation: true, hasServices: true, coordinates: [56.5156, -4.7633], description: "A quiet Highland railway halt with a fine old bridge over the River Orchy and sweeping views of the surrounding peaks." },
    { id: "inveroran", name: "Inveroran", distanceFromStart: 98.6, cumulativeAscent: 1930, cumulativeDescent: 1806, hasAccommodation: true, hasServices: false, coordinates: [56.5389, -4.8042], description: "A peaceful stop on the old drovers' road beside Loch Tulla, with the Inveroran Hotel offering rest before the wild crossing of Rannoch Moor." },
    { id: "kingshouse", name: "Kingshouse", distanceFromStart: 114.2, cumulativeAscent: 2241, cumulativeDescent: 2049, hasAccommodation: true, hasServices: true, coordinates: [56.6553, -4.8556], description: "One of Scotland's oldest licensed inns, dramatically situated at the foot of Buachaille Etive Mòr after the exposed traverse of Rannoch Moor." },
    { id: "kinlochleven", name: "Kinlochleven", distanceFromStart: 128.5, cumulativeAscent: 2596, cumulativeDescent: 2637, hasAccommodation: true, hasServices: true, coordinates: [56.7086, -4.9606], description: "A former aluminium-smelting village nestled at the head of Loch Leven, reached via the Devil's Staircase — the highest point on the Way at 548m." },
    { id: "fort-william", name: "Fort William", distanceFromStart: 153.2, cumulativeAscent: 3122, cumulativeDescent: 3168, hasAccommodation: true, hasServices: true, coordinates: [56.8169, -5.1056], description: "The Outdoor Capital of the UK and the triumphant finish of the West Highland Way, sitting beneath Ben Nevis, Britain's highest mountain." },
  ],

  speedProfiles: [
    {
      id: "explorer",
      name: "Explorer",
      description: "Enjoy the journey, take time for photos, sightseeing, and frequent breaks.",
      flatSpeed: 3.5,
      ascentSpeed: 300,
      descentSpeed: 400,
      socialProof: "Popular with walkers who've done long trails before and want to take time to see wildlife and spend longer at stops",
    },
    {
      id: "hiker",
      name: "Hiker",
      description: "Walk steadily at a relaxed pace, take short breaks, and enjoy the scenery.",
      flatSpeed: 4.0,
      ascentSpeed: 400,
      descentSpeed: 600,
      socialProof: "Most of our customers walk it at this pace — full days in the hills, with energy left for dinner",
    },
    {
      id: "fastpacker",
      name: "Fastpacker",
      description: "Fit and experienced, maintain a strong pace, take minimal breaks.",
      flatSpeed: 5.0,
      ascentSpeed: 600,
      descentSpeed: 1000,
      socialProof: "For those who've already walked it once, or come from a running background",
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

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of Scotland's most spectacular scenery. Create your perfect itinerary from Milngavie to Fort William with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 150,

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

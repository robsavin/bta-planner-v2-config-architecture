import heroImage from "@/assets/hero-highlands.jpg";
import type { TrailConfig } from "@/config/types";

export const hadriansWallPathConfig: TrailConfig = {
  id: "hadrians-wall-path",
  name: "Hadrian's Wall Path",
  shortName: "Hadrian's Wall",
  startLocation: "Wallsend",
  endLocation: "Bowness-on-Solway",

  totalDistanceKm: 137.7,
  totalAscentM: 1489,
  totalDescentM: 1491,

  directions: {
    default: "east-to-west",
    eastToWest: {
      label: "East to West",
      startLabel: "Wallsend",
      endLabel: "Bowness-on-Solway",
    },
    westToEast: {
      label: "West to East",
      startLabel: "Bowness-on-Solway",
      endLabel: "Wallsend",
    },
  },

  nodes: [
    {
      id: "wallsend",
      name: "Wallsend",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.988018, -1.530236],
      description:
        "The path begins at Segedunum Roman Fort and Museum in Wallsend.",
    },
    {
      id: "newcastle",
      name: "Newcastle upon Tyne",
      distanceFromStart: 9,
      cumulativeAscent: 45,
      cumulativeDescent: 59,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.963342, -1.618645],
      description:
        "Detour via Redheugh Bridge to Newcastle's historic Quayside.",
    },
    {
      id: "heddon-on-the-wall",
      name: "Heddon on the Wall",
      distanceFromStart: 24,
      cumulativeAscent: 236,
      cumulativeDescent: 131,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.993440, -1.794128],
      description:
        "First significant Roman remains — a well-preserved 2m-high section of Hadrian's Wall near the Swan Inn.",
    },
    {
      id: "robin-hood-inn",
      name: "Robin Hood Inn",
      distanceFromStart: 34.4,
      cumulativeAscent: 341,
      cumulativeDescent: 218,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.009779, -1.924141],
      description: "Pub with accommodation. 6km taxi detour to Corbridge.",
    },
    {
      id: "wall",
      name: "Wall",
      distanceFromStart: 48.5,
      cumulativeAscent: 506,
      cumulativeDescent: 452,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.019410, -2.130150],
      description:
        "Village near Planetrees, featuring both broad and narrow wall construction.",
    },
    {
      id: "chollerford",
      name: "Chollerford",
      distanceFromStart: 50,
      cumulativeAscent: 506,
      cumulativeDescent: 465,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.029598, -2.129818],
      description: "Near Brunton Turret and Chesters Roman Fort.",
    },
    {
      id: "once-brewed",
      name: "Once Brewed",
      distanceFromStart: 69.2,
      cumulativeAscent: 953,
      cumulativeDescent: 712,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.001648, -2.387933],
      description:
        "Twice Brewed Inn and The Sill National Landscape Discovery Centre nearby.",
    },
    {
      id: "greenhead",
      name: "Greenhead",
      distanceFromStart: 80.4,
      cumulativeAscent: 1162,
      cumulativeDescent: 1047,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.986819, -2.536433],
      description:
        "Greenhead Hotel and Greenhead Tea Room. Near the Roman Army Museum.",
    },
    {
      id: "gilsland",
      name: "Gilsland",
      distanceFromStart: 83,
      cumulativeAscent: 1182,
      cumulativeDescent: 1055,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.988890, -2.573568],
      description:
        "House of Meg tearoom. Near Birdoswald Roman Fort.",
    },
    {
      id: "lanercost",
      name: "Lanercost",
      distanceFromStart: 92.5,
      cumulativeAscent: 1293,
      cumulativeDescent: 1215,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.973236, -2.698334],
      description:
        "Lanercost Priory and café. 4km taxi detour to Brampton.",
    },
    {
      id: "walton",
      name: "Walton",
      distanceFromStart: 95.9,
      cumulativeAscent: 1343,
      cumulativeDescent: 1286,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.971672, -2.746899],
      description: "Florries on the Wall café.",
    },
    {
      id: "carlisle",
      name: "Carlisle",
      distanceFromStart: 114,
      cumulativeAscent: 1394,
      cumulativeDescent: 1398,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.900622, -2.933603],
      description:
        "Medieval fortress, Tullie House Museum, and full city services.",
    },
    {
      id: "bowness-on-solway",
      name: "Bowness-on-Solway",
      distanceFromStart: 137.7,
      cumulativeAscent: 1489,
      cumulativeDescent: 1491,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.953992, -3.212734],
      description:
        "Western terminus of Hadrian's Wall Path. The King's Arms pub marks the finish.",
    },
  ],

  speedProfiles: [
    {
      id: "explorer",
      name: "Explorer",
      description:
        "Enjoy the journey, take time for photos, sightseeing, and frequent breaks.",
      flatSpeed: 3.5,
      ascentSpeed: 300,
      descentSpeed: 400,
    },
    {
      id: "hiker",
      name: "Hiker",
      description:
        "Walk steadily at a relaxed pace, take short breaks, and enjoy the scenery.",
      flatSpeed: 4.0,
      ascentSpeed: 400,
      descentSpeed: 600,
    },
    {
      id: "fastpacker",
      name: "Fastpacker",
      description:
        "Fit and experienced, maintain a strong pace, take minimal breaks.",
      flatSpeed: 5.0,
      ascentSpeed: 600,
      descentSpeed: 1000,
    },
    {
      id: "trailrunner",
      name: "Trail Runner",
      description:
        "Combine running and fast hiking, carry light gear, focus on efficient progress.",
      flatSpeed: 7.0,
      ascentSpeed: 1000,
      descentSpeed: 1500,
    },
  ],

  gpxAssetPath: "src/data/hadrians-wall-path.gpx.zip",

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  hero: {
    image: heroImage,
    altText: "Hadrian's Wall Path",
  },

  shopifyVariants: null, // Overridden at runtime by Shopify data-attributes

  branding: {
    primaryColor: "#2d4a54",
    accentColor: "#FF961B",
  },
};

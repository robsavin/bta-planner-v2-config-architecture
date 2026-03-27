import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import hadriansWallPathGpxZipUrl from "@/data/hadrians-wall-path.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced directly from the standalone Hadrian's Wall Path planner.
// Distances and ascent/descent figures are source-of-truth from that app.
//
// Coordinates are snapped to the actual GPX track (Hadrian_s_Wall_Path__A.gpx).
//
// Before go-live:
//   - Replace heroImage import with a Hadrian's Wall-specific hero image
//   - Update branding.bookingUrl once Shopify product is published
// ---------------------------------------------------------------------------

const hadriansWallPath: TrailConfig = {
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
    labels: {
      "east-to-west": {
        name: "Wallsend to Bowness",
        description: "Wallsend to Bowness-on-Solway (traditional direction)",
      },
      "west-to-east": {
        name: "Bowness to Wallsend",
        description: "Bowness-on-Solway to Wallsend",
      },
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
        "The path begins at Segedunum Roman Fort and Museum in Wallsend, the best-preserved Roman fort on the entire Wall. The reconstructed turret and bathhouse give an immediate sense of Roman scale before the trail heads west through the urban sprawl of Tyneside.",
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
        "The route crosses the Tyne via Redheugh Bridge and passes through Newcastle's historic Quayside, flanked by the iconic Tyne Bridge and Millennium Bridge. Full city services — cafés, restaurants, and accommodation — are plentiful in the city centre.",
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
        "The trail leaves the city behind and reaches its first significant Roman remains — a well-preserved 2m-high section of Hadrian's Wall near the Swan Inn. From here the route enters open countryside and the true character of the path begins to emerge.",
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
      description:
        "A traditional pub with accommodation sitting directly on the trail. The Roman town of Corbridge — with its excellent museum and riverside setting — is a worthwhile 6km taxi detour for those with time and appetite for more Roman history.",
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
        "The village of Wall sits near the remarkable Planetrees section, where you can see both the broad and narrow phases of the Wall's construction side by side — a rare glimpse of Roman engineering decisions made mid-project. The Hadrian Hotel offers food and accommodation.",
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
      description:
        "A short hop from Wall, Chollerford sits beside the North Tyne river crossing and gives easy access to two highlights: Brunton Turret, one of the best-preserved Wall turrets, and Chesters Roman Fort, with its celebrated bathhouse complex and exceptional museum collection.",
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
        "Once Brewed sits in the heart of the Wall's most dramatic section, where the path rides the great Whin Sill escarpment with sweeping views across Northumberland. The Twice Brewed Inn is a celebrated trail pub, and The Sill National Landscape Discovery Centre nearby offers exhibitions on the Wall, the landscape, and the people who built and guarded it.",
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
        "Greenhead marks the transition from the dramatic Whin Sill to the gentler western landscape. The Greenhead Hotel and Greenhead Tea Room provide welcome refreshments, and the Roman Army Museum at nearby Carvoran brings Roman frontier life vividly to life with a 3D film and full-scale exhibits.",
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
        "The trail passes through Gilsland where Hadrian's Wall crosses into Cumbria, marked by the Poltross Burn Milecastle — one of the largest and best-preserved on the entire route. The House of Meg tearoom is a popular stop, and Birdoswald Roman Fort lies just a kilometre further west.",
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
        "Lanercost Priory, a strikingly beautiful Augustinian ruin built partly from stolen Roman stone, sits directly beside the trail. The adjacent café makes for a civilised lunch stop. Brampton — the nearest town with full services — is a 4km taxi detour to the north.",
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
      description:
        "A quiet village on the Cumbrian plain where the Wall earthworks — the Vallum and ditch — become the dominant features as upstanding masonry gives way to the turf wall. Florries on the Wall café is a well-regarded stop for walkers.",
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
        "The route enters Carlisle via the banks of the River Eden. The city's medieval castle and Tullie House Museum — home to the finest Roman frontier collection outside the national museums — reward a longer stop. Full city services with extensive accommodation, restaurants, and transport connections.",
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
        "The western terminus of Hadrian's Wall Path sits on the Solway Firth, where the Wall once extended into the estuary on a series of mile-fortlets. The King's Arms pub marks the traditional finish, and the views across to the Scottish hills provide a fittingly wild end to 84 miles of Roman frontier.",
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
      socialProof:
        "Popular with walkers who want time to linger at the forts and museums — there's a lot to take in along this trail and shorter days mean more of it.",
    },
    {
      id: "hiker",
      name: "Hiker",
      description:
        "Walk steadily at a relaxed pace, take short breaks, and enjoy the scenery.",
      flatSpeed: 4.0,
      ascentSpeed: 400,
      descentSpeed: 600,
      socialProof:
        "The pace most of our Hadrian's Wall walkers choose — full days on the trail, comfortably done, with energy left for the evening.",
    },
    {
      id: "fastpacker",
      name: "Fastpacker",
      description:
        "Fit and experienced, maintain a strong pace, take minimal breaks.",
      flatSpeed: 5.0,
      ascentSpeed: 600,
      descentSpeed: 1000,
      socialProof:
        "For experienced long-distance walkers who want to cover ground efficiently without pushing into trail-running territory.",
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

  gpxAssetPath: hadriansWallPathGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of Roman frontier from the Tyne to the Solway Firth. Build your perfect itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/hadrians-wall-path", // ⚠ UPDATE when Shopify product is live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default hadriansWallPath;

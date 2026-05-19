import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import gr221GpxZipUrl from "@/data/gr221.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced from standalone planner trailData.ts (Route A — standard
// variant, via Coll des Coloms). Coordinates snapped to actual GPX track.
// GPX direction: Port d'Andratx -> Port de Pollença (west-to-east) — matches
// trail data default. No reversal needed.
//
// NOTE: trailData.ts defines a second variant (Route B, via Refugi Tossals
// Verds). The production TrailConfig schema supports only a single `nodes`
// array, so this config covers the standard route only — matching the
// supplied "GR221: A" GPX. Route B is not represented here.
//
// Before go-live:
//   - Replace heroImage with trail-specific hero image
//   - Update branding.bookingUrl once Shopify product is published
//   - Confirm "west-to-east" / "east-to-west" exist in the TrailDirection
//     union in src/config/types.ts (St Cuthbert's Way / Hadrian's Wall Path
//     already use these — should be present; build fails if not)
// ---------------------------------------------------------------------------

const gr221: TrailConfig = {
  id: "gr221",
  name: "GR221 Dry Stone Route",
  shortName: "GR221",
  startLocation: "Port d'Andratx",
  endLocation: "Port de Pollença",

  totalDistanceKm: 137.7,
  totalAscentM: 5231,
  totalDescentM: 5224,

  directions: {
    default: "west-to-east",
    labels: {
      "west-to-east": {
        name: "Port d'Andratx to Port de Pollença",
        description: "Port d'Andratx to Port de Pollença (traditional direction)",
      },
      "east-to-west": {
        name: "Port de Pollença to Port d'Andratx",
        description: "Port de Pollença to Port d'Andratx",
      },
    },
  },

  nodes: [
    {
      id: "port-dandratx",
      name: "Port d'Andratx",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.546140, 2.390550],
      description:
        "A working fishing harbour and yacht marina on the south-west corner of the island, where the GR221 traditionally begins. There are hotels, a supermarket, and restaurants around the waterfront, though many walkers choose to start a little further on at Sant Elm. The trail leaves the coast almost immediately and starts to climb, so it is worth doing any last shopping here.",
    },
    {
      id: "sant-elm",
      name: "Sant Elm",
      distanceFromStart: 8.5,
      cumulativeAscent: 308,
      cumulativeDescent: 298,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.580600, 2.350120],
      description:
        "A small coastal village looking out across a narrow strait to Sa Dragonera, an uninhabited islet that is now a nature reserve. There are cafés and restaurants along the front, a beach, and boats running across to Dragonera in season. This is where the route's character changes, leaving the resort coast for the mountains proper, often via the ruined Trappist monastery at La Trapa on the climb that follows.",
    },
    {
      id: "ses-fontanelles",
      name: "Finca Ses Fontanelles",
      distanceFromStart: 20.7,
      cumulativeAscent: 873,
      cumulativeDescent: 549,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [39.616520, 2.424120],
      description:
        "A restored finca in the hills providing accommodation with no other services nearby — this is back-country walking, and the quiet is part of what makes the section worthwhile. The approach from Sant Elm climbs steeply past La Trapa before contouring through pine and scrub above the coast. Carry food and water for this stage; the next reliable shop is some distance ahead at Estellencs.",
    },
    {
      id: "estellencs",
      name: "Estellencs",
      distanceFromStart: 32.2,
      cumulativeAscent: 1390,
      cumulativeDescent: 1237,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.653400, 2.482200],
      description:
        "A village of honey-coloured stone houses built into terraced hillsides below the Galatzó massif. There are a couple of bars and restaurants, a small shop, and several places to stay. The trail here runs through old dry-stone-walled terraces — the marjades that give the route its name — with the sea visible below.",
    },
    {
      id: "banyalbufar",
      name: "Banyalbufar",
      distanceFromStart: 38.6,
      cumulativeAscent: 1567,
      cumulativeDescent: 1447,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.685900, 2.512300],
      description:
        "Set above a steep amphitheatre of agricultural terraces that drop towards the sea, once worked for Malvasia vines and still farmed today. The village has cafés, restaurants, hotels, and a shop. The Torre del Verger, a 16th-century watchtower on the coast a short way along the road, is a worthwhile detour for the view back along the cliffs.",
    },
    {
      id: "esporles",
      name: "Esporles",
      distanceFromStart: 46.4,
      cumulativeAscent: 1923,
      cumulativeDescent: 1725,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.668670, 2.577510],
      description:
        "A larger inland town built along a tree-lined watercourse, the Canaletes, with a full range of services — supermarkets, banks, restaurants, and regular buses to Palma. The historic estate of La Granja, now a museum of rural Mallorcan life, lies a short distance away. This is a practical place to resupply and a good point to break the walk.",
    },
    {
      id: "valldemossa",
      name: "Valldemossa",
      distanceFromStart: 56.0,
      cumulativeAscent: 2544,
      cumulativeDescent: 2113,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.711890, 2.623520],
      description:
        "One of the most visited villages on the island, known for the Royal Charterhouse where Chopin and George Sand spent the winter of 1838–39. The cobbled streets have cafés, hotels, and shops, and the local coca de patata is worth seeking out. It can be busy with day-trippers from Palma in the middle of the day, so an early arrival or a late one tends to be quieter.",
    },
    {
      id: "deia",
      name: "Deià",
      distanceFromStart: 69.6,
      cumulativeAscent: 3151,
      cumulativeDescent: 2969,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.747940, 2.647990],
      description:
        "A tight cluster of stone houses on a steep hillside, long associated with the writer Robert Graves, who is buried in the churchyard at the top of the village. There are restaurants and hotels, some of them expensive, and a small rocky cove, Cala Deià, reached by a path down the valley. The section in from Valldemossa is high and exposed in places, with long views down to the coast.",
    },
    {
      id: "soller",
      name: "Sóller",
      distanceFromStart: 85.6,
      cumulativeAscent: 3484,
      cumulativeDescent: 3441,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.766490, 2.715000],
      description:
        "A substantial town set in a bowl of orange and lemon groves, connected to its port by a vintage wooden tram and to Palma by a narrow-gauge railway. There are full services here — shops, banks, plenty of accommodation, and a wide choice of places to eat around the main square. Roughly the midpoint of the route, it is a natural place to take a rest day before the higher ground ahead.",
    },
    {
      id: "coll-des-coloms",
      name: "Coll des Coloms",
      distanceFromStart: 102.1,
      cumulativeAscent: 4474,
      cumulativeDescent: 3691,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [39.787760, 2.827150],
      description:
        "A high pass deep in the Serra de Tramuntana, with no services at the col itself — this is the remotest part of the route and the walking is correspondingly serious. The section from Sóller crosses the highest and wildest ground on the trail, with significant ascent. Refugi Tossals Verds lies roughly 3.5 km off-route by a signed detour and is the basis of the alternative Route B; walkers staying at the refuge follow that variant rather than this standard line.",
    },
    {
      id: "lluc",
      name: "Lluc",
      distanceFromStart: 113.8,
      cumulativeAscent: 5015,
      cumulativeDescent: 4489,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.818920, 2.891740],
      description:
        "The Santuari de Lluc, the principal place of pilgrimage on the island, built around a monastery and its venerated statue of the Virgin. Accommodation is in the former monastery cells, and there is a restaurant, a café, and a shop on site. The botanical garden and the stations of the Camí dels Misteris del Rosari are worth the time if you arrive with daylight to spare.",
    },
    {
      id: "pollenca",
      name: "Pollença",
      distanceFromStart: 131.0,
      cumulativeAscent: 5224,
      cumulativeDescent: 5164,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.881910, 3.014450],
      description:
        "An inland town below the Calvari, a stairway of 365 cypress-lined steps climbing to a chapel above the rooftops. There are full services, a Sunday market on the main square, and the medieval Pont Romà on the edge of town. The trail leaves the mountains for good on the descent into Pollença, and the walking from here is easy by comparison.",
    },
    {
      id: "port-de-pollenca",
      name: "Port de Pollença",
      distanceFromStart: 137.7,
      cumulativeAscent: 5231,
      cumulativeDescent: 5224,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [39.906240, 3.082850],
      description:
        "The route finishes at this town on the bay, with a long beach, a promenade, and a full range of accommodation and services. Buses run from here to Pollença, Palma, and the airport. After the high ground of the Tramuntana it is a level, unhurried end to the walk, and a good place to spend a final night.",
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
        "Chosen by walkers treating the GR221 as a villages-and-mountains holiday rather than an endurance route, with time for long lunches in Deià and Valldemossa.",
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
        "The most popular pace on the GR221 — steady days linking the villages along the Tramuntana, comfortable for anyone with reasonable hill fitness.",
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
        "Suited to experienced hill walkers — the route packs over 5,000 m of ascent into 138 km, with sustained climbing on the central mountain sections.",
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

  gpxAssetPath: gr221GpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of mountain walking along the spine of Mallorca's Serra de Tramuntana — from the fishing harbour at Port d'Andratx to the bay at Port de Pollença, through terraced villages, dry-stone paths, and the monastery at Lluc. Build your perfect GR221 itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/gr221", // ⚠ UPDATE when live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default gr221;

import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import greatGlenWayGpxZipUrl from "@/data/great-glen-way.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced from standalone planner trailData.ts (main route via the
// direct North Laggan canal path — 120 km). The Invergarry variation (B route,
// 123.8 km) is not represented here; the new planner schema supports a single
// nodes array. If we want to offer the Invergarry variation later, it will
// need a separate trail config or a schema change to support route variants.
//
// Coordinates snapped to actual GPX track. GPX direction: Fort William →
// Inverness (southwest-to-northeast) — matches trail data default, no
// reversal needed.
//
// ⚠ TYPE NOTE: directions use "southwest-to-northeast" / "northeast-to-southwest".
// These strings are not in the existing TrailDirection union in
// src/config/types.ts. The build will fail until the union is widened to
// include both. Add them — do not substitute "south-to-north" here, the
// trail genuinely runs diagonally and the labels would be misleading.
//
// Before go-live:
//   - Replace heroImage with a Great Glen Way-specific hero
//   - Update branding.bookingUrl once the Shopify product is published
// ---------------------------------------------------------------------------

const greatGlenWay: TrailConfig = {
  id: "great-glen-way",
  name: "Great Glen Way",
  shortName: "Great Glen Way",
  startLocation: "Fort William",
  endLocation: "Inverness",

  totalDistanceKm: 120,
  totalAscentM: 1788,
  totalDescentM: 1775,

  directions: {
    default: "southwest-to-northeast",
    labels: {
      "southwest-to-northeast": {
        name: "Fort William to Inverness",
        description: "Fort William to Inverness (traditional direction)",
      },
      "northeast-to-southwest": {
        name: "Inverness to Fort William",
        description: "Inverness to Fort William",
      },
    },
  },

  nodes: [
    {
      id: "fort-william",
      name: "Fort William",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.821435, -5.107227],
      description:
        "The Great Glen Way begins at the bronze statue of a seated walker outside the Lochaber Leisure Centre, the same spot where the West Highland Way ends. Fort William has the full range of services — supermarkets, outdoor shops, hotels, B&Bs, restaurants, a station and the bus terminus — and is the natural place to spend the night before setting out. The town sits at the head of Loch Linnhe with Ben Nevis rising directly above it.",
    },
    {
      id: "gairlochy",
      name: "Gairlochy",
      distanceFromStart: 16.7,
      cumulativeAscent: 85,
      cumulativeDescent: 58,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.91295, -4.99716],
      description:
        "The first kilometres climb past Neptune's Staircase, the eight-lock flight Thomas Telford completed in 1822 to lift the Caledonian Canal seventy feet in less than a quarter of a mile. From there the path follows the canal towpath north to Gairlochy at the foot of Loch Lochy. There is little at Gairlochy itself; for accommodation and a pub meal, walkers detour 6 km along a quiet road to Spean Bridge, or stay at one of the B&Bs nearer the locks.",
    },
    {
      id: "laggan",
      name: "Laggan",
      distanceFromStart: 37.9,
      cumulativeAscent: 416,
      cumulativeDescent: 376,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [57.03714, -4.81195],
      description:
        "The trail runs the eastern shore of Loch Lochy through mixed forestry — silent, level, the loch glimpsed through the trees rather than constantly in view. At the northern end the canal resumes at Laggan Locks, where the Eagle Barge Inn, a converted Dutch klipper moored alongside the lock, serves food and drink in season. A small cluster of accommodation sits just beyond the locks.",
    },
    {
      id: "north-laggan",
      name: "North Laggan",
      distanceFromStart: 38.7,
      cumulativeAscent: 416,
      cumulativeDescent: 386,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [57.04293, -4.80457],
      description:
        "From Laggan the path picks up the Caledonian Canal towpath and follows it the short distance to the southern tip of Loch Oich. There are no services at North Laggan, but a couple of B&Bs and self-catering options sit within walking distance of the route, useful for breaking the long stretch between Gairlochy and Fort Augustus.",
    },
    {
      id: "bridge-of-oich",
      name: "Bridge of Oich",
      distanceFromStart: 45.6,
      cumulativeAscent: 470,
      cumulativeDescent: 440,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [57.09116, -4.745],
      description:
        "The trail leaves the loch shore and joins a stretch of General Wade's Military Road, built in the 1720s to move government troops through the Highlands after the first Jacobite rising. The walking is straight and easy on a good surface beneath the trees. There is one B&B about a kilometre off the route at Bridge of Oich; otherwise it is another 8 km to the next services at Fort Augustus.",
    },
    {
      id: "fort-augustus",
      name: "Fort Augustus",
      distanceFromStart: 53.6,
      cumulativeAscent: 491,
      cumulativeDescent: 476,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [57.14517, -4.6809],
      description:
        "The canal drops into Loch Ness through a staircase of five locks in the centre of Fort Augustus — the busiest moment on the canal, and one of the set-piece sights of the route. The village has hotels, B&Bs, a Spar, cafés, restaurants and the Caledonian Canal Centre, and is the obvious midway base for resupply and a longer evening off your feet. Boat trips on Loch Ness leave from the pier.",
    },
    {
      id: "invermoriston",
      name: "Invermoriston",
      distanceFromStart: 65.4,
      cumulativeAscent: 733,
      cumulativeDescent: 693,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [57.21237, -4.6179],
      description:
        "Above Fort Augustus the path climbs steadily through Inchnacardoch Forest, with the loch widening below and the high option of the upper route opening up views across to the Monadhliath. Invermoriston sits where the River Moriston joins Loch Ness and has the Glenmoriston Arms Hotel, a village shop, a tearoom, and a small range of B&Bs — enough for an unhurried overnight stop.",
    },
    {
      id: "drumnadrochit",
      name: "Drumnadrochit",
      distanceFromStart: 88.6,
      cumulativeAscent: 1297,
      cumulativeDescent: 1263,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [57.32906, -4.47753],
      description:
        "The longest stage of the trail ends in the village best known to the rest of the world as the headquarters of Loch Ness monster lore. Drumnadrochit has hotels, B&Bs, restaurants, two Loch Ness exhibition centres and a Co-op. Urquhart Castle, sitting on a promontory directly over the deepest part of the loch, lies about 2 km off the route and rewards an early arrival or a rest day.",
    },
    {
      id: "abriachan",
      name: "Abriachan",
      distanceFromStart: 100.5,
      cumulativeAscent: 1673,
      cumulativeDescent: 1400,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [57.38837, -4.4282],
      description:
        "The trail climbs sharply out of Drumnadrochit onto open moorland nearly 300 metres above the loch, with the long view back south down the Great Glen and Urquhart Castle far below. Abriachan itself is a scattered hill community rather than a village; a single eco-campsite and glamping site sits on the route, useful for breaking the final stage. There are no other services on this section.",
    },
    {
      id: "inverness",
      name: "Inverness",
      distanceFromStart: 120,
      cumulativeAscent: 1788,
      cumulativeDescent: 1775,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [57.4753, -4.22538],
      description:
        "The final descent runs through forestry above the city before dropping to the towpath of the Caledonian Canal and following the River Ness into the centre. The trail finishes at Inverness Castle on its bluff above the river — a solid Victorian sandstone block on the site of a much older fortress. Inverness has the full range of services, the main station for the sleeper to London, and onward connections back to Fort William by bus.",
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
        "Chosen by walkers who want time for the canal locks, Urquhart Castle, and a long lunch in Fort Augustus rather than racing the loch.",
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
        "The most popular pace on the Great Glen Way — comfortable on the towpath sections and capable of the longer climb out of Drumnadrochit.",
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
        "Suits experienced walkers covering the route in five days or fewer, with the longer back-half stages well within reach.",
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

  gpxAssetPath: greatGlenWayGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} along the geological fault line that splits Scotland in two — from Fort William beneath Ben Nevis to Inverness Castle above the River Ness, following Telford's canals and the long lochs of the Great Glen. Build your perfect Great Glen Way itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/great-glen-way", // ⚠ UPDATE when live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default greatGlenWay;

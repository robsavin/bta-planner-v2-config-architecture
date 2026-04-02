import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import robRoyWayGpxZipUrl from "@/data/rob-roy-way.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced directly from the standalone Rob Roy Way planner.
// Distances and ascent/descent figures are source-of-truth from that app.
//
// Coordinates are snapped to the Rob Roy Way GPX track (with Killin variant).
//
// Before go-live:
//   - Replace heroImage import with a Rob Roy Way-specific hero image
//   - Update branding.bookingUrl once Shopify product is published
// ---------------------------------------------------------------------------

const robRoyWay: TrailConfig = {
  id: "rob-roy-way",
  name: "Rob Roy Way",
  shortName: "Rob Roy Way",
  startLocation: "Drymen",
  endLocation: "Pitlochry",

  totalDistanceKm: 128.1,
  totalAscentM: 3122,
  totalDescentM: 3078,

  directions: {
    default: "south-to-north",
    labels: {
      "south-to-north": {
        name: "Drymen to Pitlochry",
        description: "Drymen to Pitlochry (traditional direction)",
      },
      "north-to-south": {
        name: "Pitlochry to Drymen",
        description: "Pitlochry to Drymen",
      },
    },
  },

  nodes: [
    {
      id: "drymen",
      name: "Drymen",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.066000, -4.452390],
      description:
        "The trail begins in Drymen, a handsome village on the edge of Loch Lomond and The Trossachs National Park. It's the closest sizeable settlement to the start of the West Highland Way, which shares terrain nearby, and has a good selection of pubs, cafés, and accommodation to fuel the first day.",
    },
    {
      id: "aberfoyle",
      name: "Aberfoyle",
      distanceFromStart: 17.3,
      cumulativeAscent: 311,
      cumulativeDescent: 346,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.177950, -4.383100],
      description:
        "The route crosses into the Queen Elizabeth Forest Park and climbs over the Menteith Hills before descending to Aberfoyle, gateway to the Trossachs. The village has a strong outdoor tourism identity — walkers are well catered for — and the wooded hills above town feel genuinely remote despite the short distance from Drymen.",
    },
    {
      id: "callander",
      name: "Callander",
      distanceFromStart: 32.8,
      cumulativeAscent: 683,
      cumulativeDescent: 662,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.243270, -4.213000],
      description:
        "Often called the Gateway to the Highlands, Callander sits where the River Teith leaves the uplands and broadens into the foothills. A busy walking town with a full range of services, it's an ideal overnight point with time to explore the Bracklinn Falls gorge or the lower slopes of Ben Ledi after the day's walk.",
    },
    {
      id: "strathyre",
      name: "Strathyre",
      distanceFromStart: 48.2,
      cumulativeAscent: 994,
      cumulativeDescent: 893,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.325200, -4.329130],
      description:
        "A small village threaded along the foot of Loch Lubnaig, Strathyre has the intimate feel of a Highland clachan despite sitting beside a main road. The Inn at Strathyre is the centrepiece, and the forested slopes of the surrounding hills give the place a sheltered, tucked-away quality that makes it a satisfying overnight stop.",
    },
    {
      id: "killin",
      name: "Killin",
      distanceFromStart: 69.4,
      cumulativeAscent: 1417,
      cumulativeDescent: 1344,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.460280, -4.322360],
      description:
        "Killin sits at the western end of Loch Tay where the River Dochart tumbles through a dramatic set of falls in the centre of the village — one of the most photographed scenes in Perthshire. The route via Killin adds a meaningful detour from the direct line but rewards with better services, spectacular glen scenery, and a proper Highland village atmosphere.",
    },
    {
      id: "ardeonaig",
      name: "Ardeonaig Hotel",
      distanceFromStart: 84.9,
      cumulativeAscent: 1987,
      cumulativeDescent: 1897,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [56.504030, -4.141920],
      description:
        "Ardeonaig Hotel occupies a remote and beautiful position on the south shore of Loch Tay, with views across the water to the Ben Lawers massif. This is a genuine back-country stop — no shops, no distractions — just a very good hotel and a lochside setting that earns its place on the itinerary in its own right.",
    },
    {
      id: "acharn",
      name: "Acharn",
      distanceFromStart: 98.3,
      cumulativeAscent: 2340,
      cumulativeDescent: 2106,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [56.563630, -4.008759],
      description:
        "A small hamlet on the south shore of Loch Tay close to Kenmore, Acharn gives access to the Acharn Gorge and its impressive series of waterfalls — a short detour well worth taking. Accommodation is limited to a handful of options, giving this stop a quiet, non-touristy feel that contrasts with the busier towns to come.",
    },
    {
      id: "aberfeldy",
      name: "Aberfeldy",
      distanceFromStart: 112.8,
      cumulativeAscent: 2725,
      cumulativeDescent: 2677,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.618300, -3.868040],
      description:
        "A handsome town on the River Tay, Aberfeldy is famous for its General Wade bridge, its whisky distillery, and its position as a hub for Perthshire outdoor pursuits. With full town services after a long stretch of remote walking, it's a natural place to pause — the watermill gallery and the birchwoods at the Birks of Aberfeldy are both worth an hour of anyone's time.",
    },
    {
      id: "strathtay",
      name: "Strathtay",
      distanceFromStart: 120.6,
      cumulativeAscent: 2810,
      cumulativeDescent: 2780,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [56.655770, -3.775200],
      description:
        "A quiet village in the Tay valley, Strathtay offers a handful of accommodation options for those wanting to break the final stretch into Pitlochry. The riverside setting and the wooded hillsides give a sense of the trail approaching its conclusion through increasingly spectacular Perthshire scenery.",
    },
    {
      id: "pitlochry",
      name: "Pitlochry",
      distanceFromStart: 128.1,
      cumulativeAscent: 3122,
      cumulativeDescent: 3078,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.702320, -3.732040],
      description:
        "Pitlochry marks the trail's end — a Victorian resort town that wears its popularity lightly, with a distillery, a theatre, and a salmon ladder on the Tummel river to explore. After 128km of Highland walking it's a genuinely satisfying finish, with transport connections north and south and enough good restaurants and pubs to make the celebration feel earned.",
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
        "Popular with walkers who want to absorb the Highland scenery without clock-watching — the Rob Roy Way has plenty to linger over.",
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
        "The pace most of our Rob Roy Way walkers choose — solid days with enough energy left to make the most of each evening stop.",
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
        "For experienced hill walkers who want to cover meaningful ground each day and aren't fazed by the Rob Roy's significant cumulative ascent.",
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

  gpxAssetPath: robRoyWayGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of Highland lochs, forest, and Perthshire glen — from the edge of Loch Lomond to the heart of Highland Perthshire. Build your perfect Rob Roy Way itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/rob-roy-way", // ⚠ UPDATE when Shopify product is live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default robRoyWay;

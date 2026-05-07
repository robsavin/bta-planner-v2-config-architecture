import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import weeWestHighlandWayGpxZipUrl from "@/data/wee-west-highland-way.gpx.zip?url";

// ---------------------------------------------------------------------------
// Wee West Highland Way: Crianlarich to Fort William.
// A 50-mile (80km) section of the full West Highland Way, picking up the route
// where the West Highland Line reaches Crianlarich and finishing at Ben Nevis.
//
// Node distances measured directly from the GPX track. Cumulative ascent and
// descent rebased from the full WHW trailData (Crianlarich's cumulative values
// subtracted from each downstream node).
//
// GPX direction: south-to-north (Crianlarich -> Fort William). No reversal needed.
//
// Before go-live:
//   - Replace heroImage with a Wee WHW-specific hero (Rannoch Moor or Glen Nevis)
//   - Update branding.bookingUrl once the Shopify product is published
// ---------------------------------------------------------------------------

const weeWestHighlandWay: TrailConfig = {
  id: "wee-west-highland-way",
  name: "Wee West Highland Way",
  shortName: "Wee WHW",
  startLocation: "Crianlarich",
  endLocation: "Fort William",

  totalDistanceKm: 79.9,
  totalAscentM: 1663,
  totalDescentM: 1913,

  directions: {
    default: "south-to-north",
    labels: {
      "south-to-north": {
        name: "Crianlarich to Fort William",
        description: "Crianlarich to Fort William (traditional direction)",
      },
      "north-to-south": {
        name: "Fort William to Crianlarich",
        description: "Fort William to Crianlarich",
      },
    },
  },

  nodes: [
    {
      id: "crianlarich",
      name: "Crianlarich",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.390920, -4.618880],
      description:
        "Crianlarich sits at the watershed of the central Highlands, where the West Highland Line splits for Oban and Fort William. It is the natural start for a shorter West Highland Way, with direct trains from Glasgow Queen Street that mean walkers can be on the trail by mid-morning. There is a small Co-op, two hotels, the Rod and Reel pub, and the often-overlooked Crianlarich Hotel beside the station. Ben More rises sharply to the south.",
    },
    {
      id: "tyndrum",
      name: "Tyndrum",
      distanceFromStart: 10.5,
      cumulativeAscent: 174,
      cumulativeDescent: 206,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.434010, -4.712630],
      description:
        "Tyndrum is a one-street village built around two railway stations and the Real Food Café — the latter being the route's best-known refuelling stop. The trail enters Tyndrum past the remains of the Battle of Dalrigh, where Robert the Bruce was ambushed in 1306 and lost the Brooch of Lorne while escaping. There is a small Spar shop and several places to stay, from the Tyndrum Inn to the more substantial Royal Hotel. Beyond Tyndrum the trail enters genuinely empty country.",
    },
    {
      id: "bridge-of-orchy",
      name: "Bridge of Orchy",
      distanceFromStart: 21.3,
      cumulativeAscent: 314,
      cumulativeDescent: 383,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.516770, -4.764720],
      description:
        "Bridge of Orchy is a hotel, a railway halt, and the handsome Telford bridge that gives the place its name. The Bridge of Orchy Hotel was the original drovers' inn on the road north and remains the only realistic stopover before the trail crosses Rannoch Moor. From here the route climbs over the Mam Carraigh, with views opening to Loch Tulla and the Black Mount beyond. Trains stop here on request — useful to know for anyone needing to bail out.",
    },
    {
      id: "inveroran",
      name: "Inveroran",
      distanceFromStart: 27.9,
      cumulativeAscent: 471,
      cumulativeDescent: 551,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [56.548020, -4.802850],
      description:
        "Inveroran is a single hotel beside a remote lochside, and the hotel is the village. The Inveroran Hotel is one of the oldest coaching inns in Scotland — Wordsworth and his sister Dorothy stopped here in 1803 — and it remains the obvious billet before the long crossing of Rannoch Moor. There are no shops, no other accommodation, no services beyond what the hotel provides. The position on the western edge of the moor gives it an end-of-the-road quality, even though the trail continues directly through the door.",
    },
    {
      id: "kingshouse",
      name: "Kingshouse",
      distanceFromStart: 43.4,
      cumulativeAscent: 782,
      cumulativeDescent: 794,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.658900, -4.871090],
      description:
        "The Kings House Hotel sits on the edge of Rannoch Moor with the Buachaille Etive Mòr filling the western horizon — one of the most photographed mountain views in Scotland. The hotel was rebuilt in 2019 and is the only accommodation between Inveroran and Kinlochleven; there is also a campsite and a separate bunkhouse on the same site. No shop, but the bar and restaurant run all day. The next section, climbing the Devil's Staircase to the pass above Kinlochleven, is the steepest sustained ascent on the entire WHW.",
    },
    {
      id: "kinlochleven",
      name: "Kinlochleven",
      distanceFromStart: 54.8,
      cumulativeAscent: 1137,
      cumulativeDescent: 1382,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.713990, -4.958040],
      description:
        "Kinlochleven sits at the head of Loch Leven, a former aluminium-smelting town that has reinvented itself around the Ice Factor climbing centre and the walking traffic. Full services — Co-op, pubs, several B&Bs and hotels including the Tailrace Inn and the MacDonald — and a long, sustained descent from the Devil's Staircase that punishes tired knees. The final stage from here to Fort William climbs back into the hills via the Lairigmor before dropping into Glen Nevis. It is a long day; an early start is repaid.",
    },
    {
      id: "fort-william",
      name: "Fort William",
      distanceFromStart: 79.9,
      cumulativeAscent: 1663,
      cumulativeDescent: 1913,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.816349, -5.114088],
      description:
        "Fort William is the largest town on the route and the official end of the West Highland Way at the Sore Feet statue on Gordon Square. All services — Morrisons and Tesco, restaurants, hotels, and the train station with the Caledonian Sleeper running direct to London Euston. Ben Nevis dominates the approach through Glen Nevis, with the Three Mile Hill stretch of trail offering the closest sustained view of Britain's highest mountain that any walker could reasonably want. The original WHW finish was at the lochside roundabout; the High Street terminus was added in 2010.",
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
        "Suits walkers wanting time at Inveroran and Kingshouse — both worth a long lunch — and a relaxed final day into Fort William.",
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
        "The most common pace booked for the Wee WHW — enough rhythm to cover the long Rannoch Moor and Lairigmor sections without pushing the day out.",
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
        "Suits experienced hill walkers comfortable with the Devil's Staircase and a long final day. Plan around accommodation — Inveroran and Kingshouse are the only options on their stretches.",
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

  gpxAssetPath: weeWestHighlandWayGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of highland walking — from the railway hub of Crianlarich, across Rannoch Moor and over the Devil's Staircase to Fort William at the foot of Ben Nevis. Build your perfect Wee West Highland Way itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/wee-west-highland-way", // ⚠ UPDATE when live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default weeWestHighlandWay;

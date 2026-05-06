import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import fifeCoastalPathGpxZipUrl from "@/data/fife-coastal-path.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced from standalone planner trailData.ts.
// Coordinates snapped to actual GPX track (137.3 km recorded vs 137.5 km nominal).
// GPX direction: South Queensferry → Newport on Tay (matches default, no reversal).
//
// Before go-live:
//   - Replace heroImage with Fife-specific hero image
//   - Update branding.bookingUrl once Shopify product is published
// ---------------------------------------------------------------------------

const fifeCoastalPath: TrailConfig = {
  id: "fife-coastal-path",
  name: "Fife Coastal Path",
  shortName: "Fife Coastal",
  startLocation: "South Queensferry",
  endLocation: "Newport on Tay",

  totalDistanceKm: 137.5,
  totalAscentM: 1114,
  totalDescentM: 1114,

  directions: {
    default: "south-to-north",
    labels: {
      "south-to-north": {
        name: "South Queensferry to Newport on Tay",
        description: "South Queensferry to Newport on Tay (traditional direction)",
      },
      "north-to-south": {
        name: "Newport on Tay to South Queensferry",
        description: "Newport on Tay to South Queensferry",
      },
    },
  },

  nodes: [
    {
      id: "south-queensferry",
      name: "South Queensferry",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.990560, -3.397590],
      description:
        "The trail starts beneath the three Forth bridges — the Victorian rail bridge, the 1960s road bridge, and the cable-stayed Queensferry Crossing — a sequence of engineering across three centuries that frames the entire opening section. South Queensferry's cobbled high street has pubs, cafés, and a Tesco for last-minute supplies. The Hawes Inn on the waterfront, name-checked in Robert Louis Stevenson's Kidnapped, is a natural place to start.",
    },
    {
      id: "north-queensferry",
      name: "North Queensferry",
      distanceFromStart: 4.2,
      cumulativeAscent: 34,
      cumulativeDescent: 34,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.010070, -3.393940],
      description:
        "Reached by walking across the lower deck of the road bridge — the trail's only crossing on infrastructure rather than coastline — North Queensferry sits on a small headland directly under the rail bridge. Deep Sea World occupies the old quarry to the east, and the village has two pubs and a café. Walkers staying overnight here get a useful short first day, leaving Aberdour as a long second.",
    },
    {
      id: "aberdour",
      name: "Aberdour",
      distanceFromStart: 17.1,
      cumulativeAscent: 170,
      cumulativeDescent: 145,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.053310, -3.302950],
      description:
        "A neat conservation village built around a 12th-century church and the ruined Aberdour Castle — the oldest standing castle in Scotland, with a beam-and-board ceiling that survives intact from the 1500s. Silver Sands beach, just before the village, is the best swimming beach on the southern half of the route. Aberdour has a railway station, two hotels, and several B&Bs.",
    },
    {
      id: "burntisland",
      name: "Burntisland",
      distanceFromStart: 23.2,
      cumulativeAscent: 222,
      cumulativeDescent: 218,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.059290, -3.230280],
      description:
        "An old shipbuilding and aluminium town with a Hanseatic harbour and a long sandy beach that hosts a permanent summer funfair. The 16th-century parish church on the hill above the town is one of the earliest post-Reformation churches built in Scotland and has an unusual square plan. There are supermarkets, pubs, and a railway station with frequent trains back to Edinburgh.",
    },
    {
      id: "kinghorn",
      name: "Kinghorn",
      distanceFromStart: 28.3,
      cumulativeAscent: 288,
      cumulativeDescent: 271,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.066900, -3.175230],
      description:
        "A small clifftop town remembered chiefly as the place where King Alexander III rode off a cliff in the dark in 1286, an accident that triggered the succession crisis leading to the Wars of Independence. A monument on the cliffs marks the spot. Pettycur Bay below has a wide beach and a holiday park, and Kinghorn itself has a pub, café, and railway station.",
    },
    {
      id: "kirkcaldy",
      name: "Kirkcaldy",
      distanceFromStart: 36.0,
      cumulativeAscent: 369,
      cumulativeDescent: 351,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.120530, -3.143260],
      description:
        "The largest town on the route, known locally as the Lang Toun for its four-mile esplanade along the Firth of Forth. Adam Smith was born here in 1723 and wrote much of The Wealth of Nations from his mother's house on the High Street. Kirkcaldy has a full range of shops, hotels, supermarkets, and a mainline railway station — the obvious resupply point on the southern half of the trail.",
    },
    {
      id: "coaltown-of-wemyss",
      name: "Coaltown of Wemyss",
      distanceFromStart: 42.7,
      cumulativeAscent: 477,
      cumulativeDescent: 426,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.150180, -3.090850],
      description:
        "A former mining village owned by the Wemyss family, who built it as a model settlement for colliery workers in the 19th century. The trail passes through the Wemyss Caves on its way in — Pictish carvings on the sandstone walls dating from the 5th century, the largest concentration of cave art in Britain. Services are limited; most walkers continue to Leven for accommodation.",
    },
    {
      id: "leven",
      name: "Leven",
      distanceFromStart: 52.6,
      cumulativeAscent: 548,
      cumulativeDescent: 551,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.193840, -2.993840],
      description:
        "The trail crosses the River Leven into a working seaside town with a long beach backed by Leven Links — the seventh-oldest golf course in the world, dating from 1820. Leven has supermarkets, takeaways, hotels, and B&Bs, and from May 2024 a reopened railway station that connects back to Edinburgh in just over an hour. A practical midway stop rather than a scenic one.",
    },
    {
      id: "lower-largo",
      name: "Lower Largo",
      distanceFromStart: 56.9,
      cumulativeAscent: 576,
      cumulativeDescent: 576,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.212270, -2.942350],
      description:
        "The birthplace of Alexander Selkirk, the marooned sailor whose four years on a Pacific island became the basis for Robinson Crusoe — his statue stands on the wall of the cottage where he was born in 1676. Lower Largo is a single street of fishermen's cottages along a tidal harbour, with the Crusoe Hotel as the obvious place for a drink or an overnight. The East Neuk villages start here.",
    },
    {
      id: "elie",
      name: "Elie",
      distanceFromStart: 67.5,
      cumulativeAscent: 655,
      cumulativeDescent: 655,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.190450, -2.820710],
      description:
        "The first of the East Neuk fishing villages proper — a curve of pale-stone houses around a sheltered harbour, with a wide tidal beach used for sand yachting. The Ship Inn on the harbour is an institution, and serves cricket on the beach when the tide is out in summer. Elie's lighthouse and ruined chapel on the headland mark a good lunch detour before pushing on to St Monans.",
    },
    {
      id: "st-monans",
      name: "St Monans",
      distanceFromStart: 72.3,
      cumulativeAscent: 684,
      cumulativeDescent: 684,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.204830, -2.766580],
      description:
        "Built almost entirely of pantiled fishermen's cottages crammed against the harbour wall, St Monans has the prettiest village core on the route. The 14th-century parish church sits on the cliff edge a few hundred metres west — closer to the high-water mark than any other church in Scotland. The Seafood Restaurant by the harbour is one of the best-regarded kitchens in Fife.",
    },
    {
      id: "anstruther",
      name: "Anstruther",
      distanceFromStart: 77.8,
      cumulativeAscent: 719,
      cumulativeDescent: 719,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.222740, -2.700170],
      description:
        "The largest of the East Neuk villages and the home of the Anstruther Fish Bar, regularly named the best fish and chip shop in the UK and worth the queue. The Scottish Fisheries Museum on the harbour is excellent, and boats run from Anstruther to the Isle of May puffin colony from April to September. Plenty of B&Bs and small hotels — a natural overnight on a six- or seven-day itinerary.",
    },
    {
      id: "crail",
      name: "Crail",
      distanceFromStart: 84.4,
      cumulativeAscent: 750,
      cumulativeDescent: 750,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.258350, -2.628990],
      description:
        "The oldest royal burgh on the East Neuk coast, Crail is the most photographed harbour in Scotland after Plockton — a tiny stone-walled basin with red-pantiled cottages and a working lobster shack on the pier serving fresh-cooked crab claws and dressed crab. The Marketgate, lined with 17th-century merchant houses, runs up from the harbour to a 13th-century parish church. Two pubs, several B&Bs, and a small grocery.",
    },
    {
      id: "kingsbarns",
      name: "Kingsbarns",
      distanceFromStart: 94.5,
      cumulativeAscent: 829,
      cumulativeDescent: 829,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.303100, -2.645530],
      description:
        "A small inland village a short detour from the trail, with the Kingsbarns Distillery on the coast nearby — a young single-malt operation in a converted 18th-century steading worth visiting if time allows. The Cambo estate, just south of the village, has wild snowdrop woods that draw visitors in February. Limited accommodation; most walkers continue to St Andrews for the night.",
    },
    {
      id: "st-andrews",
      name: "St Andrews",
      distanceFromStart: 107.9,
      cumulativeAscent: 971,
      cumulativeDescent: 965,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.342910, -2.798300],
      description:
        "The home of golf and Scotland's oldest university, founded in 1413 — and unmistakably the high point of the route. The trail enters along West Sands, the beach used for the opening sequence of Chariots of Fire, with the Old Course on the right and the cathedral ruins ahead. St Andrews has the widest range of accommodation on the trail, from luxury hotels to student-let B&Bs, and the cathedral and castle ruins are worth at least half a day.",
    },
    {
      id: "newport-on-tay",
      name: "Newport on Tay",
      distanceFromStart: 137.5,
      cumulativeAscent: 1114,
      cumulativeDescent: 1114,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [56.440160, -2.941390],
      description:
        "The trail finishes at the southern end of the Tay Road Bridge, looking across the firth to Dundee and the V&A on the far bank. Newport itself is a quiet Victorian commuter village built when the original Tay Bridge opened in the 1870s — that bridge collapsed in the 1879 storm, the worst rail disaster in British history, and the stumps of its piers are still visible alongside the present rail bridge. Buses run regularly across the road bridge into Dundee for trains south.",
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
        "The most common pace on the Fife Coastal Path — walkers who want time for the East Neuk villages, St Andrews, and seafood lunches.",
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
        "A popular choice for walkers comfortable with full days on flat coastal terrain — typically a six- or seven-day itinerary.",
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
        "Suited to fit walkers who want the trail in four or five days — the gentle ascent profile makes a fast pace genuinely sustainable here.",
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

  gpxAssetPath: fifeCoastalPathGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of Scottish coastline — from the three bridges over the Forth, around the East Neuk fishing villages, through St Andrews, and on to the Tay. Build your perfect Fife Coastal Path itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/fife-coastal-path", // ⚠ UPDATE when live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default fifeCoastalPath;

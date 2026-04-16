import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import stCuthbertsWayGpxZipUrl from "@/data/st-cuthberts-way.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced directly from the standalone St Cuthbert's Way planner.
// Distances and ascent/descent figures are source-of-truth from that app.
//
// Coordinates are snapped to the actual GPX track (BTA_St_Cuthberts_Way.gpx).
// GPX runs west-to-east (Melrose → Holy Island), matching the trail data
// default direction — no reversal required.
//
// Before go-live:
//   - Replace heroImage import with a St Cuthbert's Way-specific hero image
//   - Update branding.bookingUrl once Shopify product is published
// ---------------------------------------------------------------------------

const stCuthbertsWay: TrailConfig = {
  id: "st-cuthberts-way",
  name: "St Cuthbert's Way",
  shortName: "St Cuthbert's Way",
  startLocation: "Melrose",
  endLocation: "Holy Island",

  totalDistanceKm: 102.2,
  totalAscentM: 1955,
  totalDescentM: 2036,

  directions: {
    default: "west-to-east",
    labels: {
      "west-to-east": {
        name: "Melrose to Holy Island",
        description: "Melrose to Holy Island (traditional direction)",
      },
      "east-to-west": {
        name: "Holy Island to Melrose",
        description: "Holy Island to Melrose",
      },
    },
  },

  nodes: [
    {
      id: "melrose",
      name: "Melrose",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.598440, -2.718830],
      description:
        "The trail begins in Melrose, one of the most handsome towns in the Scottish Borders, under the shadow of the Eildon Hills where St Cuthbert is said to have received his calling. Melrose Abbey — roofless but magnificent, with some of the finest medieval stonework in Scotland — sets the spiritual tone for everything that follows.",
    },
    {
      id: "st-boswells",
      name: "St. Boswells",
      distanceFromStart: 10.2,
      cumulativeAscent: 241,
      cumulativeDescent: 248,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.570770, -2.647610],
      description:
        "The route descends from the Eildons and follows the River Tweed to St Boswells, a village with the Buccleuch Arms Hotel at its centre. The village green is one of the largest in Scotland and was historically the site of one of the biggest annual livestock fairs in the Borders. A good bookshop-café makes it a civilised first overnight stop.",
    },
    {
      id: "harestanes",
      name: "Harestanes Visitor Centre",
      distanceFromStart: 23.3,
      cumulativeAscent: 397,
      cumulativeDescent: 398,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.517430, -2.565360],
      description:
        "Harestanes Visitor Centre sits at the junction of the Borders Abbeys Way and offers refreshments and useful trail information. Jedburgh — with its abbey, castle, and full range of services — is a 15-minute taxi ride away and makes a more substantial overnight base for those wanting a proper town stop.",
    },
    {
      id: "dere-street-junction",
      name: "Dere Street Junction",
      distanceFromStart: 27.9,
      cumulativeAscent: 463,
      cumulativeDescent: 452,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [55.502770, -2.525790],
      description:
        "The trail crosses the line of Dere Street, the great Roman road that ran from York to the Antonine Wall. There are no services at the junction itself — Jedburgh is approximately 3km to the south for accommodation. The surrounding landscape of rolling farmland and distant Border hills gives a strong sense of the route's ancient lineage.",
    },
    {
      id: "morebattle",
      name: "Morebattle",
      distanceFromStart: 41.2,
      cumulativeAscent: 701,
      cumulativeDescent: 694,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.517410, -2.362090],
      description:
        "Morebattle is a charming Borders village with the Templehall Hotel and a village store. The route passes through the Kale Water valley, which has a particularly peaceful, pastoral quality that contrasts with the more open hill walking to come. It's a satisfying halfway point before the trail heads into the Cheviots.",
    },
    {
      id: "kirk-yetholm",
      name: "Kirk Yetholm",
      distanceFromStart: 51.8,
      cumulativeAscent: 975,
      cumulativeDescent: 956,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.547060, -2.275640],
      description:
        "Kirk Yetholm sits at the northern foot of the Cheviots and is better known as the northern terminus of the Pennine Way. The Border Hotel is the traditional finishing point for Pennine Way walkers and an excellent base for St Cuthbert's pilgrims facing the Cheviot crossing. The village has a genuinely end-of-the-world quality that makes it memorable.",
    },
    {
      id: "hethpool",
      name: "Hethpool",
      distanceFromStart: 60.0,
      cumulativeAscent: 1239,
      cumulativeDescent: 1205,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [55.548520, -2.167900],
      description:
        "Hethpool is a picturesque hamlet of stone cottages in the College Valley, one of the most remote and beautiful valleys in Northumberland. There are no services here — this is genuine back-country walking — but the sense of entering a different, quieter world is part of what makes this section of the route so distinctive.",
    },
    {
      id: "wooler",
      name: "Wooler",
      distanceFromStart: 73.5,
      cumulativeAscent: 1562,
      cumulativeDescent: 1579,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.546090, -2.013820],
      description:
        "Wooler is the main market town of the Northumberland hills and a natural resupply point after the Cheviot crossing. The Terrace Café is a well-regarded stop, the Black Bull Inn provides reliable food and accommodation, and there are shops for any kit or provisions needed for the final push to Holy Island.",
    },
    {
      id: "east-horton",
      name: "East Horton",
      distanceFromStart: 80.1,
      cumulativeAscent: 1705,
      cumulativeDescent: 1722,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [55.571590, -1.956490],
      description:
        "A small farming hamlet on the coastal plain of Northumberland. There are no services here — the route is now firmly in the flat, open country between the hills and the coast, and the pace can open up considerably. Holy Island begins to feel genuinely close.",
    },
    {
      id: "fenwick",
      name: "Fenwick",
      distanceFromStart: 92.2,
      cumulativeAscent: 1903,
      cumulativeDescent: 1955,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.649200, -1.900070],
      description:
        "Fenwick is the last village before Holy Island and the final opportunity for refreshments before the dramatic causeway crossing. A village shop and café serve walkers well. From here the route crosses the open fields of the coastal plain with views across to Lindisfarne and, on a clear day, the Farne Islands beyond.",
    },
    {
      id: "holy-island",
      name: "Holy Island",
      distanceFromStart: 102.2,
      cumulativeAscent: 1955,
      cumulativeDescent: 2036,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [55.669920, -1.801550],
      description:
        "Holy Island — Lindisfarne — is one of the great pilgrimage destinations of northern Europe, and arriving on foot via the Pilgrim's Way across the sands gives it a different quality from any other approach. The priory ruins, the castle on its dolerite outcrop, and the wide skies over the Firth make for a finish that earns its reputation. Check tide times before setting out — the causeway crossing is only possible at low tide.",
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
        "Popular with walkers who want to take the pilgrimage aspect seriously — there's a contemplative quality to this trail that rewards a slower pace.",
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
        "The pace most of our St Cuthbert's Way walkers choose — manageable days with enough left to enjoy the Border towns and the Cheviot scenery.",
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
        "For experienced walkers who want to cover the route efficiently — the Cheviot section demands reasonable hill fitness at any pace.",
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

  gpxAssetPath: stCuthbertsWayGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of Border hills, Cheviot moorland, and Northumberland coast — from the abbey ruins of Melrose to the tidal island of Lindisfarne. Build your perfect St Cuthbert's Way itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/st-cuthberts-way", // ⚠ UPDATE when Shopify product is live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default stCuthbertsWay;

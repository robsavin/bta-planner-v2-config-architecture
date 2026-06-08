import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import coastToCoastGpxZipUrl from "@/data/coast-to-coast.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced from standalone planner trailData.ts (26 nodes).
// Coordinates snapped to actual GPX track (293.4 km measured vs 295 km data).
// GPX direction: runs St Bees -> Robin Hood's Bay (west-to-east). Matches the
//   trail data default. No reversal needed.
//
// Before go-live:
//   - Replace heroImage with a Coast to Coast hero image
//   - Update branding.bookingUrl once the Shopify product is published
//   - Confirm "west-to-east" / "east-to-west" exist in src/config/types.ts
//     TrailDirection union (they should already from other trails)
// ---------------------------------------------------------------------------

const coastToCoast: TrailConfig = {
  id: "coast-to-coast",
  name: "Coast to Coast",
  shortName: "Coast to Coast",
  startLocation: "St Bees",
  endLocation: "Robin Hood's Bay",

  totalDistanceKm: 295,
  totalAscentM: 6763,
  totalDescentM: 6770,

  directions: {
    default: "west-to-east",
    labels: {
      "west-to-east": {
        name: "St Bees to Robin Hood's Bay",
        description: "St Bees to Robin Hood's Bay (traditional direction)",
      },
      "east-to-west": {
        name: "Robin Hood's Bay to St Bees",
        description: "Robin Hood's Bay to St Bees",
      },
    },
  },

  nodes: [
    {
      id: "st-bees",
      name: "St Bees",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.490760, -3.606470],
      description:
        "The walk begins on the beach below the red sandstone cliffs of St Bees Head. Tradition is to wet your boots in the Irish Sea and pick up a pebble to carry the width of the country and drop in the North Sea at the far end. The village has a railway station on the Cumbrian coast line, a couple of pubs, shops and a priory church. The first few kilometres climb the headland past the lighthouse before the route turns inland.",
    },
    {
      id: "cleator",
      name: "Cleator / Cleator Moor",
      distanceFromStart: 14.5,
      cumulativeAscent: 291,
      cumulativeDescent: 239,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.507160, -3.524220],
      description:
        "A former iron-mining settlement at the western edge of the Lakes, the last sizeable place with shops before the fells. There are convenience stores and a pub here. Beyond Cleator the trail leaves the farmland behind and takes on Dent Hill (352m), the first proper climb of the route, with the Irish Sea opening up behind you.",
    },
    {
      id: "ennerdale-bridge",
      name: "Ennerdale Bridge",
      distanceFromStart: 23.5,
      cumulativeAscent: 650,
      cumulativeDescent: 543,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.525140, -3.448100],
      description:
        "A quiet village at the gateway to the western Lake District, with two pubs that both do food and rooms. It sits a short way before Ennerdale Water, the most westerly of the lakes and one of the few without a road along its shore. Stock up here, as services thin out considerably for the next two days through the high central fells.",
    },
    {
      id: "yha-ennerdale",
      name: "YHA Ennerdale",
      distanceFromStart: 33.6,
      cumulativeAscent: 779,
      cumulativeDescent: 637,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [54.515220, -3.328320],
      description:
        "A forest hostel deep in the Ennerdale valley, reached by walking the length of the lake and on along the River Liza. It is off the road network, so luggage transfer does not reach here. The setting is remote and wooded, surrounded by the slopes of Pillar and the planted conifers of the upper valley.",
    },
    {
      id: "yha-black-sail",
      name: "YHA Black Sail",
      distanceFromStart: 39.3,
      cumulativeAscent: 931,
      cumulativeDescent: 647,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [54.500760, -3.246940],
      description:
        "A former shepherd's bothy at the head of Ennerdale, and one of the most isolated buildings on the whole route, ringed by Great Gable, Pillar and Haystacks. There is no road in and no luggage transfer. Refreshments are sometimes available when the hostel is staffed, but treat it as self-sufficient country. From here the trail climbs hard up Loft Beck on rough, often wet ground.",
    },
    {
      id: "rosthwaite",
      name: "Rosthwaite",
      distanceFromStart: 48,
      cumulativeAscent: 1236,
      cumulativeDescent: 1161,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.518990, -3.150640],
      description:
        "A small Borrowdale village reached after the descent from Loft Beck, with hotels, guesthouses, a village shop and tearoom. It sits in one of the greener corners of the Lakes, hemmed in by oak woodland and the River Derwent. A natural overnight stop after a demanding day over the high passes.",
    },
    {
      id: "stonethwaite",
      name: "Stonethwaite",
      distanceFromStart: 49.7,
      cumulativeAscent: 1259,
      cumulativeDescent: 1172,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.518330, -3.142590],
      description:
        "A hamlet barely two kilometres on from Rosthwaite, tucked up its own side valley beneath the crags. The Langstrath Country Inn here does food and rooms and is a fixture for C2C walkers. From the hamlet the path begins the long, steady climb alongside Greenup Gill toward the central watershed.",
    },
    {
      id: "grasmere",
      name: "Grasmere",
      distanceFromStart: 60.2,
      cumulativeAscent: 1782,
      cumulativeDescent: 1705,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.467580, -3.039730],
      description:
        "The busiest village the route passes through, and well stocked with cafés, shops, pubs and buses. Wordsworth lived here and is buried in St Oswald's churchyard; the gingerbread shop by the lychgate has been selling the same recipe since the 1850s. After the quiet of Borrowdale it can feel like a return to the world. Beyond the village the trail climbs Little Tongue Gill toward Grisedale Hause.",
    },
    {
      id: "patterdale",
      name: "Patterdale",
      distanceFromStart: 72,
      cumulativeAscent: 2301,
      cumulativeDescent: 2160,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.532050, -2.942260],
      description:
        "A village at the southern tip of Ullswater, reached after the crossing of Grisedale Hause and the long descent past Grisedale Tarn. There are hotels, a pub, a shop and a campsite. Helvellyn rises directly above, and many walkers take a day here to climb it. Ahead lies the steep pull to Angle Tarn and the highest ground of the entire walk.",
    },
    {
      id: "burnbanks",
      name: "Burnbanks",
      distanceFromStart: 89.7,
      cumulativeAscent: 3061,
      cumulativeDescent: 2853,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [54.538110, -2.766930],
      description:
        "A small settlement built for the workers who dammed Haweswater, sitting at the foot of the reservoir. It comes after Kidsty Pike (780m), the highest point on the Coast to Coast, and the long walk along the often pathless eastern shore of Haweswater. There are no real services here, just a road crossing and the end of the Lakeland high ground.",
    },
    {
      id: "shap",
      name: "Shap",
      distanceFromStart: 96.5,
      cumulativeAscent: 3196,
      cumulativeDescent: 2960,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.533030, -2.682860],
      description:
        "A long grey village strung along the old A6, marking the move from the Lakes into limestone country. The ruins of Shap Abbey sit in the valley just before you arrive. There is a Co-op, a chip shop, pubs and a good range of accommodation, which makes it a common end to the second or third day.",
    },
    {
      id: "orton-junction",
      name: "Orton",
      distanceFromStart: 107.6,
      cumulativeAscent: 3410,
      cumulativeDescent: 3133,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.485880, -2.574930],
      description:
        "A tidy village reached across the limestone pavements of Crosby Ravensworth Fell. It has a village shop, a chocolate maker that runs a café, and The George Hotel. The walking through here is gentle and open after the rigours of the Lakes, with skylarks and wide grazing country in every direction.",
    },
    {
      id: "kirkby-stephen",
      name: "Kirkby Stephen",
      distanceFromStart: 127.5,
      cumulativeAscent: 3648,
      cumulativeDescent: 3492,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.466160, -2.356500],
      description:
        "A proper market town and the best resupply point in the middle of the walk, with several pubs, cafés, a Co-op and a station on the Settle to Carlisle line. It marks roughly the halfway mark. Beyond the town the trail climbs to Nine Standards Rigg and crosses the watershed between waters that drain to the Irish Sea and those that drain to the North Sea.",
    },
    {
      id: "keld",
      name: "Keld",
      distanceFromStart: 146.4,
      cumulativeAscent: 4187,
      cumulativeDescent: 3890,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.409380, -2.172570],
      description:
        "A tiny stone hamlet at the head of Swaledale, where the Coast to Coast crosses the Pennine Way. It comes after the boggy moorland of Nine Standards Rigg, which is notorious for soft ground in wet weather. Services are limited to a small lodge and a seasonal tearoom, so it is a place to arrive at rather than provision in. Ahead the route enters the old lead-mining country of the upper dale.",
    },
    {
      id: "reeth",
      name: "Reeth",
      distanceFromStart: 163.4,
      cumulativeAscent: 4631,
      cumulativeDescent: 4444,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.392780, -1.954760],
      description:
        "A Swaledale village set around a large sloping green, with pubs, a bakery, cafés and shops ranged along its edges. It follows a compelling stretch through the ruined smelt mills and spoil heaps of the Swaledale lead industry, all the way from Crackpot Hall. Many walkers reckon the Dales the finest section of the whole route, and Reeth is its natural hub.",
    },
    {
      id: "richmond",
      name: "Richmond",
      distanceFromStart: 179.6,
      cumulativeAscent: 4926,
      cumulativeDescent: 4801,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.408910, -1.756090],
      description:
        "The largest town on the route, built around a cobbled marketplace below a Norman castle that stands on a crag above the River Swale. It has every service a walker could want, a Georgian theatre still in use, and plenty of places to eat and stay. It is a good spot for a rest day before the flat farmland of the Vale of Mowbray, the least loved part of the walk.",
    },
    {
      id: "danby-wiske",
      name: "Danby Wiske",
      distanceFromStart: 202.7,
      cumulativeAscent: 5014,
      cumulativeDescent: 4992,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.381660, -1.484210],
      description:
        "A small village in the middle of the flat agricultural crossing between the Dales and the moors, with a village pub that has long looked after Coast to Coast walkers. The walking here is on field paths and quiet lanes, an easy interlude for the legs. The Cleveland Hills sit low on the eastern horizon, growing slowly as you approach.",
    },
    {
      id: "ingleby-cross",
      name: "Ingleby Cross",
      distanceFromStart: 217.4,
      cumulativeAscent: 5091,
      cumulativeDescent: 5037,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.397460, -1.305740],
      description:
        "A village at the foot of the Cleveland Hills, where the flat farmland ends and the moors begin. The Blue Bell Inn provides food and rooms. From here the trail climbs into Arncliffe Wood and joins the Cleveland Way for the switchback ridge of Beacon Hill and the Wainstones.",
    },
    {
      id: "arncliffe-wood",
      name: "Arncliffe Wood Junction",
      distanceFromStart: 220,
      cumulativeAscent: 5251,
      cumulativeDescent: 5048,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [54.382700, -1.299710],
      description:
        "The point where the Coast to Coast enters the North York Moors National Park and joins the Cleveland Way along the escarpment. There are no services at the junction itself. Osmotherley, with pubs and shops, lies about 1.7km off the route to the south for anyone who needs to drop down.",
    },
    {
      id: "broughton-bank",
      name: "Broughton Bank Junction",
      distanceFromStart: 233.9,
      cumulativeAscent: 5740,
      cumulativeDescent: 5444,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [54.423990, -1.143660],
      description:
        "A junction on the open moorland of the Cleveland Hills, after the rocky scramble through the Wainstones and the steep pull over Beacon Hill. There is no accommodation here. Lord Stones Café, set into the saddle between Carlton Bank and Cringle Moor, is the nearest place for food and is a welcome stop on a long high day.",
    },
    {
      id: "blakey-ridge",
      name: "Blakey Ridge",
      distanceFromStart: 248.6,
      cumulativeAscent: 6107,
      cumulativeDescent: 5730,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.389780, -0.970670],
      description:
        "High and exposed on the watershed between Rosedale and Farndale, this is one of the most remote overnight stops on the route. The Lion Inn, an old drovers' pub at around 400m, is the only food and lodging for miles and books up well ahead in season. The walking up to it crosses miles of open heather moor with little shelter.",
    },
    {
      id: "glaisdale",
      name: "Glaisdale",
      distanceFromStart: 263.7,
      cumulativeAscent: 6181,
      cumulativeDescent: 6052,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.440510, -0.809110],
      description:
        "A village strung along the side of the Esk valley, reached after the long moorland miles drop down off the tops. It has a pub, a station on the Esk Valley line and a village store for supplies. The seventeenth-century Beggar's Bridge spans the river just below, where the trail crosses into the woods.",
    },
    {
      id: "grosmont",
      name: "Grosmont",
      distanceFromStart: 270.4,
      cumulativeAscent: 6238,
      cumulativeDescent: 6213,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.436850, -0.728780],
      description:
        "A village built around the North Yorkshire Moors Railway, with steam engines often shunting at the station and a café and pubs nearby. The trail reaches it along the River Esk through oak woodland from Egton. From Grosmont there is a steep road climb out of the valley before the final moor and the descent to the coast.",
    },
    {
      id: "littlebeck",
      name: "Littlebeck",
      distanceFromStart: 276.9,
      cumulativeAscent: 6490,
      cumulativeDescent: 6428,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [54.431620, -0.644890],
      description:
        "A wooded hamlet with no services, set in a steep little valley. The path through here passes The Hermitage, a shelter carved from a single block of stone, and the waterfall at Falling Foss. It is a quiet, green stretch before the trail climbs back onto Sneaton Low Moor for the run to the sea.",
    },
    {
      id: "hawsker",
      name: "Hawsker",
      distanceFromStart: 286.8,
      cumulativeAscent: 6643,
      cumulativeDescent: 6560,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.448680, -0.584100],
      description:
        "A village near the coast where the route finally meets the sea, with a pub and caravan parks nearby. From here the Coast to Coast joins the Cleveland Way along the cliff top, and the North Sea is in view for the first time. Robin Hood's Bay and the finish are an easy clifftop walk to the south.",
    },
    {
      id: "robin-hoods-bay",
      name: "Robin Hood's Bay",
      distanceFromStart: 295,
      cumulativeAscent: 6763,
      cumulativeDescent: 6770,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.430240, -0.532070],
      description:
        "The end of the walk: a former fishing and smuggling village of steep cobbled lanes that tumble down to a slipway and the North Sea. Tradition is to walk down to the water, wet your boots and throw in the pebble you carried from St Bees, then sign the book at Wainwright's Bar in the Bay Hotel. There are pubs, cafés and buses, and accommodation in the village and up the hill in the newer part of town.",
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
        "Suits walkers who want to climb Helvellyn from Patterdale, linger in the Swaledale lead-mining country and take a rest day or two over a fortnight.",
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
        "The pace most Coast to Coast walkers settle into, completing the crossing in around twelve to fourteen walking days.",
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
        "For experienced hill walkers comfortable with long days over rough, boggy ground and the big ascents in the Lakes.",
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

  gpxAssetPath: coastToCoastGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} across northern England, coast to coast — from the red sandstone cliffs of St Bees, over the Lakeland fells, the Pennine watershed and the North York Moors, to the slipway at Robin Hood's Bay. Build your perfect Coast to Coast itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/coast-to-coast", // ⚠ UPDATE when live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default coastToCoast;

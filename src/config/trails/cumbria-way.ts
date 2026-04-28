import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import cumbriaWayGpxZipUrl from "@/data/cumbria-way.gpx.zip?url";

// ---------------------------------------------------------------------------
// Cumbria Way — Ulverston to Carlisle, 123.9 km.
// Node data sourced from the standalone planner's trailData.ts (Route A —
// Explorer / Hiker / Fastpacker). The Trail Runner variant that skips
// Peter House Farm and reaches Caldbeck in 94.3 km is not represented here;
// the planner will route all pace profiles via Peter House Farm.
// Coordinates snapped to the actual GPX track.
// GPX direction: Ulverston → Carlisle (correct, no reversal needed).
//
// Before go-live:
//   - Replace heroImage with a Cumbria Way-specific hero image
//   - Update branding.bookingUrl once the Shopify product is published
// ---------------------------------------------------------------------------

const cumbriaWay: TrailConfig = {
  id: "cumbria-way",
  name: "Cumbria Way",
  shortName: "Cumbria Way",
  startLocation: "Ulverston",
  endLocation: "Carlisle",

  totalDistanceKm: 123.9,
  totalAscentM: 2344,
  totalDescentM: 2342,

  directions: {
    default: "south-to-north",
    labels: {
      "south-to-north": {
        name: "Ulverston to Carlisle",
        description: "Ulverston to Carlisle (traditional direction)",
      },
      "north-to-south": {
        name: "Carlisle to Ulverston",
        description: "Carlisle to Ulverston",
      },
    },
  },

  nodes: [
    {
      id: "ulverston",
      name: "Ulverston",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.197650, -3.098160],
      description:
        "The trail starts from a stone waymarker near the Gill, at the northern edge of this Georgian market town on the Furness peninsula. Ulverston feels closer in character to the coast than to the Lakes proper, and the Hoad Monument — a replica of the Eddystone Lighthouse on the hill above — makes a useful landmark for the first few hours of walking. The town is on the Furness Line, which is the easiest rail approach from Lancaster. Stan Laurel was born here, and the Laurel and Hardy Museum sits just off the main square.",
    },
    {
      id: "kendall-ground",
      name: "Kendall Ground",
      distanceFromStart: 10.4,
      cumulativeAscent: 237,
      cumulativeDescent: 186,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [54.266930, -3.109620],
      description:
        "A remote waypoint rather than a settlement — a farm on the high ground south of Coniston, marking the transition from the pastoral country around Gawthwaite into the fells proper. There are no services here. The walking ahead crosses Blawith Fells with Beacon Tarn as the next notable landmark, and on a clear day the Coniston range begins to resolve to the north.",
    },
    {
      id: "mere-beck",
      name: "Mere Beck",
      distanceFromStart: 21.7,
      cumulativeAscent: 462,
      cumulativeDescent: 444,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [54.342470, -3.077440],
      description:
        "An open-country waypoint down off the Blawith Fells, approaching the southern end of Coniston Water. Mere Beck gives the spot its name — a small watercourse running off the fells. There are no services; this is back-country walking between the long stage from Ulverston and the arrival at Coniston. The path drops towards the lakeshore soon after.",
    },
    {
      id: "coniston",
      name: "Coniston",
      distanceFromStart: 25.1,
      cumulativeAscent: 490,
      cumulativeDescent: 465,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.368010, -3.075610],
      description:
        "Coniston sits at the north end of its lake with the Old Man (803m) rising directly above the village — a backdrop that is hard to forget once seen. There is no shortage of places to stop: the Black Bull brews its own beer, the Sun Hotel serves food late, and the Ruskin Museum tells the layered story of the slate industry, Donald Campbell's Bluebird, and the writer who lived across the water at Brantwood. The steam yacht Gondola still crosses the lake from the jetty below the village. A good place for a rest day, or simply a proper lunch.",
    },
    {
      id: "skelwith-bridge",
      name: "Skelwith Bridge",
      distanceFromStart: 35.7,
      cumulativeAscent: 754,
      cumulativeDescent: 716,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.421620, -3.016270],
      description:
        "A small settlement on the River Brathay, best known for Skelwith Force — a short, powerful waterfall below the bridge itself, worth the five-minute detour. Chesters by the River, an arts-and-crafts café housed in a former slate yard, is the obvious place to break the morning. The path from here to Elterwater follows the river through mixed woodland.",
    },
    {
      id: "elterwater",
      name: "Elterwater",
      distanceFromStart: 37.8,
      cumulativeAscent: 779,
      cumulativeDescent: 749,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.432780, -3.035760],
      description:
        "Elterwater village sits above the small lake of the same name, in one of the more compact corners of the Langdale valley. The Britannia Inn on the green has been watering climbers for the best part of two centuries, and remains the obvious stop. The green Westmorland slate from the quarries above is still visible in the walls and roofs of buildings throughout the village.",
    },
    {
      id: "great-langdale",
      name: "Great Langdale",
      distanceFromStart: 42.4,
      cumulativeAscent: 847,
      cumulativeDescent: 790,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.446500, -3.088300],
      description:
        "The valley opens out here with the Langdale Pikes — Pike of Stickle, Harrison Stickle, Pavey Ark — rising in a compact wall to the north. Two pubs anchor the valley: the Old Dungeon Ghyll Hotel and the New Dungeon Ghyll Hotel, both long associated with climbing and walking, plus the National Trust's Sticklebarn at the head of the valley. This is where the trail commits to the fells proper — the next stage crosses Stake Pass to Borrowdale and is the wildest section of the route.",
    },
    {
      id: "rosthwaite",
      name: "Rosthwaite",
      distanceFromStart: 56.7,
      cumulativeAscent: 1281,
      cumulativeDescent: 1229,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.523560, -3.145740],
      description:
        "Rosthwaite is the principal village of Upper Borrowdale, small enough to cross in two minutes on foot, enclosed by the fells of Glaramara and High Spy. The Scafell Hotel and the Royal Oak offer beds and food; the Flock In tearoom at Yew Tree Farm is the go-to spot for a sit-down after the Stake Pass crossing. The stage from Langdale is the most serious of the route — wild, pathless in places, and one to walk in fair weather.",
    },
    {
      id: "keswick",
      name: "Keswick",
      distanceFromStart: 69.7,
      cumulativeAscent: 1433,
      cumulativeDescent: 1387,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.603210, -3.142240],
      description:
        "Keswick is the trail's first proper town after 70 kilometres of walking, and the difference feels considerable. The Moot Hall still stands at the top of the market square, Derwentwater lies a few minutes away, and Skiddaw looms behind the town — the climb out starts almost from the market place. This is the place to resupply, replace worn kit, and take an unhurried meal; there are outdoor shops on almost every street and the usual range of pubs and restaurants. A natural rest-day stop.",
    },
    {
      id: "skiddaw-house",
      name: "Skiddaw House (Bunkhouse)",
      distanceFromStart: 78.8,
      cumulativeAscent: 1848,
      cumulativeDescent: 1418,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [54.650810, -3.103110],
      description:
        "Skiddaw House sits at 470 metres behind the main Skiddaw massif, and is one of the most isolated pieces of accommodation in England — no road reaches it, no mobile signal holds it, and the nearest village is the best part of an hour's walk in any direction. The old shooting lodge is now a bunkhouse, with simple dorm beds, a drying room and a coal fire. Meals and drinks are available to guests only, so carry food if stopping here for lunch. The night is an experience — properly dark skies, silence, and the high fells on every side.",
    },
    {
      id: "peter-house-farm",
      name: "Peter House Farm",
      distanceFromStart: 84.9,
      cumulativeAscent: 1898,
      cumulativeDescent: 1747,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [54.681100, -3.167000],
      description:
        "A working farm offering B&B accommodation on the long northern stretch between Skiddaw House and Caldbeck. The farmhouse sits in open country, with High Pike behind and the line of the Caldbeck Fells stretching west. There are no services other than the breakfast provided to guests. For those not staying, the nearest refreshment is another fourteen kilometres on at Caldbeck.",
    },
    {
      id: "caldbeck",
      name: "Caldbeck",
      distanceFromStart: 99.1,
      cumulativeAscent: 2195,
      cumulativeDescent: 2066,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.744660, -3.054320],
      description:
        "Caldbeck feels different from the Lakeland villages to the south — more northern, more self-contained, the limestone giving way to the softer country of the Solway plain. The churchyard holds the grave of John Peel, the foxhunter immortalised in the song. Priest's Mill, the old watermill at the head of the village, now houses a café and a gallery, and the Oddfellows Arms is the village pub. This is the last true stop before the walk out to Carlisle.",
    },
    {
      id: "carlisle",
      name: "Carlisle",
      distanceFromStart: 123.9,
      cumulativeAscent: 2344,
      cumulativeDescent: 2342,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.894860, -2.942920],
      description:
        "The trail ends at the Market Cross in the centre of the city, in the shadow of the castle that has stood on its mound since the 11th century. Carlisle has been a border city for two millennia — Roman, Norman, Jacobite — and the Tullie House Museum behind the cathedral tells that story well. Carlisle is a major stop on the West Coast Main Line, with direct trains to London, Glasgow, Manchester and Newcastle, which makes the logistics of departure uncomplicated.",
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
        "Well suited to the Cumbria Way — the lake-and-fell scenery rewards an unhurried pace, and there is enough in Coniston, Keswick and the Langdale valley to justify the longer schedule.",
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
        "The most popular pace for the Cumbria Way — typically a five or six day walk, with time to enjoy evenings in Coniston, Rosthwaite and Keswick.",
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
        "Suits walkers comfortable with 25–30 km days and the crossing of Stake Pass from Langdale to Borrowdale — a four-day completion is realistic.",
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

  gpxAssetPath: cumbriaWayGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} from the Furness coast to the Scottish border — across the Blawith Fells, through the heart of the Lake District, over Stake Pass to Borrowdale, and out via the lonely Skiddaw back country to Carlisle. Build your perfect Cumbria Way itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/cumbria-way", // ⚠ UPDATE when live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default cumbriaWay;

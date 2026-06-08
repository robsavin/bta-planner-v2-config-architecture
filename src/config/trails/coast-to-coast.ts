import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import coastToCoastGpxZipUrl from "@/data/coast-to-coast.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced from standalone planner trailData.ts (trailData-2.ts).
// Coordinates snapped to actual GPX track (coast-to-coast.gpx, 11,716 points).
// GPX direction: runs St Bees → Robin Hood's Bay (west-to-east) — matches the
// trail data default, no reversal needed.
//
// Before go-live:
//   - Replace heroImage with a trail-specific hero image
//   - Update branding.bookingUrl once the Shopify product is published
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
        "The walk starts at the slipway in St Bees, where the tradition is to wet your boots in the Irish Sea and pick up a pebble to carry across the country and throw into the sea at the far end. The first few miles climb onto St Bees Head, the highest sea cliffs on the north-west coast, past the lighthouse and the seabird colonies at Fleswick Bay before the route turns inland. The village has a train station, pubs, shops and accommodation, and is the obvious place to spend the night before setting off.",
    },
    {
      id: "cleator",
      name: "Cleator/Cleator Moor",
      distanceFromStart: 14.5,
      cumulativeAscent: 291,
      cumulativeDescent: 239,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.507160, -3.524220],
      description:
        "Cleator and the larger Cleator Moor are former iron-ore mining settlements, the last proper services before the Lakeland fells. There is a Co-op, takeaways and a couple of pubs here, worth noting because the next stretch over Dent Hill and into Ennerdale has little. Stock up before you leave — the character of the walk changes completely from here.",
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
        "Ennerdale Bridge sits at the threshold of the Lake District, reached after the first real climb of the walk over Dent Hill. The village has two pubs, the Shepherd's Arms and the Fox & Hounds, both used to feeding Coast to Coast walkers. Beyond here the route follows the shore of Ennerdale Water into one of the quietest valleys in the National Park.",
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
        "This is a remote forest hostel deep in the upper Ennerdale valley, surrounded by the regenerating woodland of the Wild Ennerdale project. There are no shops or other services here and no road for luggage transfer to reach, so anything staying here is carried in. It is a useful staging point for breaking the long pull up the valley towards Black Sail.",
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
        "Black Sail is a former shepherd's bothy at the very head of Ennerdale, ringed by Great Gable, Pillar and Haystacks, and one of the most remote hostels in England. There is no road in — luggage cannot be transferred here — and beds are limited, so booking well ahead is essential. Seasonal refreshments are sometimes available, but this is back-country walking and you should arrive self-sufficient.",
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
        "Rosthwaite is a Borrowdale village reached after the steep, often boggy climb over Loft Beck and the descent past Honister. It has hotels, B&Bs, a village shop and the Scafell Hotel, and sits in some of the most enclosed and dramatic valley scenery in the Lakes. A natural overnight stop with everything a walker needs.",
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
        "A short way up the valley from Rosthwaite, Stonethwaite is a tiny cluster of farms and the Langstrath Country Inn, popular with walkers for its food. The route follows the beck up towards Greenup Edge from here. Quieter than Rosthwaite, and a good choice if you want an early, peaceful start on the climb to Grasmere.",
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
        "Grasmere is the largest and busiest place since the start, the Wordsworth village, with plenty of cafés, shops, accommodation and the famous gingerbread shop by the churchyard. It is reached over Greenup Edge and the descent past Helm Crag. The crowds are a contrast to the empty valleys behind you, but the services are welcome and the climb out over Grisedale is one of the highlights to come.",
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
        "Patterdale lies at the head of Ullswater, reached over Grisedale Hause and past Grisedale Tarn, with the option of taking in Helvellyn or St Sunday Crag on the way for those with the legs. The village has the White Lion pub, the Patterdale Hotel, a shop and a campsite. This is the last village before the long, high crossing to Shap, so it is a sensible place to rest.",
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
        "Burnbanks is a small hamlet of cottages built for the workers who created Haweswater reservoir, sitting at the eastern end of the lake. The route reaches it after the highest point of the entire walk at Kidsty Pike (780m) and the long descent along Haweswater. There are no services here beyond the odd B&B, but it marks the end of the high fells — limestone country begins from here.",
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
        "Shap is a long village strung out along the old A6, with the ruins of Shap Abbey just off the route before you arrive. It has a Co-op, a chippy, pubs and a good range of accommodation, and is the obvious overnight after the demanding Lakeland crossing. The walking eases here into the gentler limestone uplands of the eastern Lakes.",
    },
    {
      id: "orton-junction",
      name: "Orton Junction",
      distanceFromStart: 107.6,
      cumulativeAscent: 3410,
      cumulativeDescent: 3133,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.485880, -2.574930],
      description:
        "The route crosses the limestone pavements of Crosby Ravensworth Fell to reach Orton, a village known for Kennedy's chocolate factory and café. The George Hotel offers food and beds, and there is a shop. A pleasant, low-key stretch of walking between the Lakeland fells behind and the Pennine moors ahead.",
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
        "Kirkby Stephen is a proper market town and roughly the midpoint of the walk, with the fullest range of services since Grasmere — several pubs, cafés, a Co-op, outdoor shops and plenty of accommodation. It is the last town before the crossing of Nine Standards Rigg and the watershed of England. A good place to take a rest day or resupply.",
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
        "Keld is a small, stone-built hamlet at the head of Swaledale, reached over Nine Standards Rigg and its line of ancient cairns on the high watershed. This is where the Coast to Coast crosses the Pennine Way. Keld Lodge provides food and beds, but services are limited, so plan ahead. The waterfalls around the village are worth the short detour.",
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
        "Reeth is a large Swaledale village set around a broad sloping green, with several pubs, cafés, a bakery and shops. Either of the two routes from Keld brings you here — the high route through the abandoned lead mines past Crackpot Hall and the Old Gang smelt mills, or the gentler valley route by the river. A welcoming place with a good choice of accommodation.",
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
        "Richmond is the only sizeable town actually on the route, a handsome Georgian market town built below a great Norman castle keep that dominates the skyline. It has the full range of shops, cafés, pubs, restaurants and accommodation, and is a natural place for a rest day. Ahead lies the flat farmland of the Vale of Mowbray, the least dramatic but quietly pleasant section of the whole walk.",
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
        "Danby Wiske is a small village in the middle of the flat agricultural crossing between the Dales and the Moors, with the White Swan pub at its heart, long a fixture for Coast to Coast walkers. Accommodation is limited, so book early. The walking here is easy and low — a gentle interlude before the Cleveland Hills.",
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
        "Ingleby Cross sits at the foot of the Cleveland Hills, where the flat farmland ends and the North York Moors begin. The Blue Bell Inn provides food and accommodation. From here the route climbs into the moors and joins the Cleveland Way for the switchback ridge walking ahead.",
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
        "This is the path junction where the Coast to Coast enters the North York Moors National Park and shares its line with the Cleveland Way. There are no services at the junction itself. Osmotherley, with pubs and accommodation, lies about 1.7km off-route to the south for anyone needing to break the day here.",
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
        "A junction on the open moor along the switchback of the Cleveland Hills, on the climb-and-drop section past Carlton Bank and the Wainstones. There is no accommodation here, but Lord Stones Café nearby is a reliable place for food and water on this otherwise exposed stretch. The views north over the Tees lowlands open up on a clear day.",
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
        "Blakey Ridge is the high, heather-covered spine of the moors, and the Lion Inn that sits here at around 400m is the only supply point for miles in either direction. It offers food and accommodation in genuine isolation, which makes booking essential. After the Wainstones and the long moor crossing, arriving at the Lion Inn is one of the small landmarks of the walk.",
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
        "Glaisdale drops off the high moor into the wooded Esk valley, a working village with a railway station on the Esk Valley line, a post office store and pubs. The 17th-century Beggar's Bridge sits at the foot of the village. From here the route follows the river through old oak woodland — a gentler, greener contrast to the open moors behind.",
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
        "Grosmont is the terminus of the North Yorkshire Moors Railway, and steam trains and the engine sheds are part of the scene here. The village has cafés, a shop, pubs and accommodation. It is a popular stop, and the climb out of the village towards Sleights Moor is one of the steepest short pulls of the final day.",
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
        "Littlebeck is a tiny hamlet tucked in a wooded valley, with no services. The route passes through the woods here past The Hermitage, a hollowed-out boulder, and the 30m Falling Foss waterfall, with the Falling Foss tea garden nearby in season. A quiet, shaded stretch on the run-in to the coast.",
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
        "Hawsker is the last village before the finish, with the Hare & Hounds pub, caravan parks and accommodation. Just beyond, the route joins the Cleveland Way again and meets the coast — the first sight of the North Sea since St Bees. The final few miles of cliff-top walking to Robin Hood's Bay start here.",
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
        "Robin Hood's Bay is an old smuggling village of steep, narrow lanes tumbling down to the sea, and the end of the walk. The tradition is to walk down the slipway, throw in the pebble you carried from St Bees, and wet your boots in the North Sea, before signing the book and raising a drink in the Bay Hotel. The village has plenty of pubs, cafés and accommodation, and a bus link back to Whitby for onward travel.",
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
        "Most walkers who choose this pace want the Lakeland section in particular to breathe — time for the high-level options, the pubs and a rest day or two across a fortnight.",
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
        "This is the pace most people walk the Coast to Coast at, settling into a steady rhythm over the classic two-week itinerary.",
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
        "Chosen by fit, experienced walkers happy to put in long days and compress the route, including the big Lakeland climbs, into ten or eleven days.",
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
      "{distance} coast to coast across northern England — from the Irish Sea cliffs at St Bees, over the Lake District, the Yorkshire Dales and the North York Moors, to the North Sea at Robin Hood's Bay. Build your perfect Coast to Coast itinerary with downloadable GPX files for every stage.",
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

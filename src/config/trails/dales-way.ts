import type { TrailConfig } from "../types";
import dalesWayGpxZipUrl from "@/data/dalesgpx.zip?url";
import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";

// ---------------------------------------------------------------------------
// Node data sourced directly from the standalone Dales Way planner:
// https://dales-way-planner.openair.tools (lib/trailData.ts)
// Distances and ascent/descent figures are source-of-truth from that app.
//
// Coordinates are snapped to the actual GPX track (Dales_Way__A.gpx).
//
// Before go-live:
//   - Replace heroImage import with a Dales-specific hero image
//   - Update branding.bookingUrl once Shopify product is published
// ---------------------------------------------------------------------------

const dalesWay: TrailConfig = {
  id: "dales-way",
  name: "Dales Way",
  shortName: "Dales Way",
  startLocation: "Ilkley",
  endLocation: "Bowness-on-Windermere",

  totalDistanceKm: 126.5,
  totalAscentM: 1700,
  totalDescentM: 1717,

  directions: {
    default: "south-to-north",
    labels: {
      "south-to-north": {
        name: "Ilkley to Bowness",
        description: "Ilkley to Bowness-on-Windermere (traditional direction)",
      },
      "north-to-south": {
        name: "Bowness to Ilkley",
        description: "Bowness-on-Windermere to Ilkley",
      },
    },
  },

  nodes: [
    {
      id: "ilkley",
      name: "Ilkley",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.9288, -1.8305],
      description: "The trail begins at Ilkley's Old Bridge.",
    },
    {
      id: "addingham",
      name: "Addingham",
      distanceFromStart: 4,
      cumulativeAscent: 30,
      cumulativeDescent: 16,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.9435, -1.8747],
      description:
        "The trail begins at Ilkley's Old Bridge, following the River Wharfe through meadows to Addingham, pubs and cafe in the village center.",
    },
    {
      id: "bolton-bridge",
      name: "Bolton Bridge",
      distanceFromStart: 8.4,
      cumulativeAscent: 75,
      cumulativeDescent: 57,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.9705, -1.8936],
      description:
        "From Addingham, the path follows the River Wharfe through lush pastures before joining Bolton Road and following to Bolton Bridge. A cafe and pub provide refreshments in the village centre.",
    },
    {
      id: "appletreewick",
      name: "Appletreewick",
      distanceFromStart: 18.4,
      cumulativeAscent: 207,
      cumulativeDescent: 151,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.0466, -1.9521],
      description:
        "The route follows field paths to Bolton Abbey. Admire the 12th-century Priory ruins before crossing the Wharfe via the famous stepping stones (or adjacent footbridge). Pass the Cavendish Pavilion offering refreshments and continue through Strid Wood. The route continues to Barden Bridge, then through meadows past Howgill to Appletreewick village with its renowned Craven Arms pub.",
    },
    {
      id: "burnsall",
      name: "Burnsall",
      distanceFromStart: 21.1,
      cumulativeAscent: 230,
      cumulativeDescent: 162,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.0604, -1.9797],
      description:
        "From Appletreewick, follow riverside meadows past Loup Scar limestone cliff to Burnsall village, where the Red Lion pub and Wharfe View Café offer refreshments.",
    },
    {
      id: "grassington",
      name: "Grassington (+500m detour to Linton)",
      distanceFromStart: 26.5,
      cumulativeAscent: 307,
      cumulativeDescent: 186,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.0758, -1.9985],
      description:
        "From Burnsall follow the eastern riverbank through meadows. Continue over Hebden suspension bridge (Hebden village with Old School Tea Room 700m off-route). Continue along field paths to historic Linton Falls. Cross the footbridge to enter Grassington with its cobbled market square, cafés, shops, and pubs.",
    },
    {
      id: "kettlewell",
      name: "Kettlewell",
      distanceFromStart: 36.5,
      cumulativeAscent: 475,
      cumulativeDescent: 343,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.1374, -2.0400],
      description:
        "The path leaves Grassington via Chapel Street, climbing past the golf course. Cross rolling fields with expansive views of Wharfedale. The trail passes above Conistone with its limestone outcrops before descending to Kettlewell, a picturesque village with shops, cafés, and pubs.",
    },
    {
      id: "starbotton",
      name: "Starbotton",
      distanceFromStart: 39.5,
      cumulativeAscent: 496,
      cumulativeDescent: 360,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.1524, -2.0604],
      description:
        "From Kettlewell market square, follow the western bank of the Wharfe through wildflower meadows. Pass the distinctive Starbotton Birks limestone formations before reaching Starbotton village with its Fox and Hounds pub.",
    },
    {
      id: "buckden",
      name: "Buckden",
      distanceFromStart: 43,
      cumulativeAscent: 530,
      cumulativeDescent: 385,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.1645, -2.0743],
      description:
        "Continue to Buckden along riverside fields, crossing several stiles and footbridges. The imposing mass of Buckden Pike (702m) dominates the skyline. At Buckden the Buck Inn offers meals and accommodation.",
    },
    {
      id: "hubberholme",
      name: "Hubberholme",
      distanceFromStart: 44.9,
      cumulativeAscent: 548,
      cumulativeDescent: 386,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.1915, -2.0940],
      description:
        "The path continues alongside the young River Wharfe through meadows to reach the bridge at Hubberholme, home to the historic St. Michael and All Angels Church with its Mouseman carvings and the 16th-century George Inn.",
    },
    {
      id: "oughtershaw",
      name: "Oughtershaw",
      distanceFromStart: 55.2,
      cumulativeAscent: 719,
      cumulativeDescent: 402,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [54.2238, -2.1933],
      description:
        "Follow the Wharfe through Langstrothdale's limestone landscape to Yockenthwaite. From Yockenthwaite Bridge, follow the south bank of the increasingly narrow Wharfe through meadows bordered by drystone walls to the small hamlet of Oughtershaw.",
    },
    {
      id: "blea-moor-road",
      name: "Blea Moor Road (+2.5km detour to Ribblehead)",
      distanceFromStart: 62.7,
      cumulativeAscent: 836,
      cumulativeDescent: 593,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.2493, -2.3315],
      description:
        "From Oughtershaw, the path climbs steadily toward the watershed, passing Swarthghyll Farm before reaching Cam Houses, allegedly the most isolated farm in England. The ascent tops out at the trail's highest point (520m), rewarding walkers with panoramic views of Ingleborough and Whernside, then descends to Blea Moor Road. A 2.5km detour north leads to Ribblehead with its iconic 24-arch viaduct and the Station Inn pub.",
    },
    {
      id: "cowgill",
      name: "Cowgill",
      distanceFromStart: 70.2,
      cumulativeAscent: 953,
      cumulativeDescent: 782,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.2768, -2.3673],
      description:
        "From Blea Moor Road, the path climbs onto the moorland and contours northward with expansive views of Dentdale below. Follow a sometimes boggy moorland track before joining a lane. About 1 km from Cowgill reach the Sportsman Inn.",
    },
    {
      id: "dent",
      name: "Dent",
      distanceFromStart: 77.7,
      cumulativeAscent: 988,
      cumulativeDescent: 935,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.2807, -2.4614],
      description:
        "Follow the riverside path along the Dee through verdant pastures dotted with traditional stone field barns. Dent village features cobbled streets lined with whitewashed cottages. Refreshments at Stone Close Café, Sun Inn, and George & Dragon pub.",
    },
    {
      id: "sedbergh",
      name: "Sedbergh",
      distanceFromStart: 85.6,
      cumulativeAscent: 1115,
      cumulativeDescent: 1081,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.3168, -2.5278],
      description:
        "From Dent, follow the riverside path along the Dee through lush meadows. Cross to the northern bank at Brackensgill Bridge, continuing through farmland to Lincoln's Inn Bridge and Millthrop. Detour about 700m into Sedbergh, England's 'Book Town', with numerous cafés and pubs including the Black Bull and Dalesman.",
    },
    {
      id: "low-branthwaite",
      name: "Low Branthwaite",
      distanceFromStart: 92.5,
      cumulativeAscent: 1182,
      cumulativeDescent: 1129,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [54.3589, -2.6026],
      description:
        "The trail follows field paths with views of the dramatic Howgill Fells. Pass through Birks Mill and traverse undulating farmland to The Oaks hamlet. Cross the A684 and continue along the River Lune to the Lune Viaduct.",
    },
    {
      id: "skelsmergh",
      name: "Skelsmergh (+4km taxi detour to Kendal)",
      distanceFromStart: 108,
      cumulativeAscent: 1418,
      cumulativeDescent: 1393,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.3637, -2.7152],
      description:
        "Ascend gradually across fields and farms before descending back alongside the river. A lane takes you over a lovely stone bridge, then under the Lowgill Viaduct, to Beck Foot hamlet before trails continue westwards over the M6 motorway. From here it is a 4km detour by taxi to Kendal for accommodation and dining.",
    },
    {
      id: "burneside",
      name: "Burneside",
      distanceFromStart: 111.2,
      cumulativeAscent: 1425,
      cumulativeDescent: 1443,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.3588, -2.7420],
      description:
        "From the A6 it is just over 3 km to the outskirts of Burneside, mainly on field paths. The highlight being crossing Sprint Mill Bridge with rapids underneath. There is a pub in Burneside about 500m detour from the trail.",
    },
    {
      id: "staveley",
      name: "Staveley",
      distanceFromStart: 116.4,
      cumulativeAscent: 1480,
      cumulativeDescent: 1459,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.3730, -2.8122],
      description:
        "From Burneside the trail soon follows the riverside path through meadows. Pass through Bowston with its historic bobbin mill and weir. In Staveley there are cafes, a pub and Hawkshead Brewery for refreshments.",
    },
    {
      id: "bowness-on-windermere",
      name: "Bowness-on-Windermere",
      distanceFromStart: 126.5,
      cumulativeAscent: 1700,
      cumulativeDescent: 1717,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [54.3636, -2.9200],
      description:
        "From Staveley, the trail climbs steadily on an undulating route through mixed farmland. Enjoy panoramic views of Lake Windermere and the central Lake District fells. Descend through fields and pause at the commemorative stone bench marking the official end of the Dales Way. Continue into Bowness for numerous lakeside cafés, pubs, and restaurants.",
    },
  ],

  speedProfiles: [
    {
      id: "explorer",
      name: "Explorer",
      description: "Enjoy the journey, take time for photos, sightseeing, and frequent breaks.",
      flatSpeed: 3.5,
      ascentSpeed: 300,
      descentSpeed: 400,
      socialProof:
        "Popular with walkers who want unhurried days, time to explore villages like Dent and Grassington, and energy left for a proper pub dinner.",
    },
    {
      id: "hiker",
      name: "Hiker",
      description: "Walk steadily at a relaxed pace, take short breaks, and enjoy the scenery.",
      flatSpeed: 4.0,
      ascentSpeed: 400,
      descentSpeed: 600,
      socialProof:
        "The pace most of our Dales Way walkers choose — full days on the trail, comfortably done, with legs that still work at breakfast.",
    },
    {
      id: "fastpacker",
      name: "Fastpacker",
      description: "Fit and experienced, maintain a strong pace, take minimal breaks.",
      flatSpeed: 5.0,
      ascentSpeed: 600,
      descentSpeed: 1000,
      socialProof:
        "For those with a long-distance trail or two already under their belt who want to cover ground without pushing into trail-running territory.",
    },
    {
      id: "trailrunner",
      name: "Trail Runner",
      description: "Combine running and fast hiking, carry light gear, focus on efficient progress.",
      flatSpeed: 7.0,
      ascentSpeed: 1000,
      descentSpeed: 1500,
    },
  ],

  gpxAssetPath: dalesWayGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of Yorkshire Dales river valley and Cumbrian fell. Create your perfect itinerary from Ilkley to Bowness-on-Windermere with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 150,

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/dales-way-adventure", // ⚠ UPDATE when Shopify product is live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default dalesWay;

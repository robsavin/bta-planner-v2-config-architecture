import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import cotswoldWayGpxZipUrl from "@/data/cotswold-way.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced directly from the standalone Cotswold Way planner.
// Distances and ascent/descent figures are source-of-truth from that app.
//
// Coordinates are snapped to the actual GPX track (BTA_The_Cotswold_Way.gpx).
// Note: GPX runs south-to-north (Bath → Chipping Campden); coordinates have
// been corrected to match the north-to-south trail data direction.
//
// Before go-live:
//   - Replace heroImage import with a Cotswold Way-specific hero image
//   - Update branding.bookingUrl once Shopify product is published
// ---------------------------------------------------------------------------

const cotswoldWay: TrailConfig = {
  id: "cotswold-way",
  name: "Cotswold Way",
  shortName: "Cotswold Way",
  startLocation: "Chipping Campden",
  endLocation: "Bath",

  totalDistanceKm: 160.6,
  totalAscentM: 3417,
  totalDescentM: 3530,

  directions: {
    default: "north-to-south",
    labels: {
      "north-to-south": {
        name: "Chipping Campden to Bath",
        description: "Chipping Campden to Bath (traditional direction)",
      },
      "south-to-north": {
        name: "Bath to Chipping Campden",
        description: "Bath to Chipping Campden",
      },
    },
  },

  nodes: [
    {
      id: "chipping-campden",
      name: "Chipping Campden",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [52.050720, -1.780910],
      description:
        "The trail begins in Chipping Campden, widely regarded as the finest of the Cotswold market towns. The High Street's honey-coloured limestone buildings set the tone for everything that follows, and the Market Hall — built in 1627 — is as good an introduction to Cotswold vernacular architecture as you'll find anywhere on the route.",
    },
    {
      id: "broadway",
      name: "Broadway",
      distanceFromStart: 9.2,
      cumulativeAscent: 178,
      cumulativeDescent: 220,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [52.036190, -1.856293],
      description:
        "The route climbs over Fish Hill and descends to Broadway, one of the most photographed villages in England. The broad main street lined with chestnut trees and Cotswold stone cottages attracts visitors in numbers, but it earns its reputation. Broadway Tower on the escarpment above offers a view that takes in thirteen counties on a clear day.",
    },
    {
      id: "stanton",
      name: "Stanton",
      distanceFromStart: 16.4,
      cumulativeAscent: 397,
      cumulativeDescent: 431,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [52.006263, -1.898819],
      description:
        "Stanton is arguably the least spoiled village on the entire route — a single street of 17th-century farmhouses with no modern intrusions, sitting directly on the trail. The Mount Inn above the village offers one of the best views in the Cotswolds across the Vale of Evesham, and is a natural stopping point for lunch or an early finish.",
    },
    {
      id: "winchcombe",
      name: "Winchcombe",
      distanceFromStart: 28.4,
      cumulativeAscent: 614,
      cumulativeDescent: 672,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.956196, -1.961923],
      description:
        "Winchcombe is a proper market town with a long history — it was the capital of the Anglo-Saxon kingdom of Mercia and the location of Hailes Abbey, whose ruins lie just off the trail. The town has good services, several pubs, and enough character to reward a slower pace. Sudeley Castle, just outside the centre, is one of the finest Tudor houses in England.",
    },
    {
      id: "cleeve-hill",
      name: "Cleeve Hill",
      distanceFromStart: 37.8,
      cumulativeAscent: 940,
      cumulativeDescent: 822,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.943411, -2.015590],
      description:
        "At 330m, Cleeve Hill is the highest point on the Cotswold Way and the highest ground in the Cotswolds. The view from the trig point takes in the Malvern Hills, the Brecon Beacons, and the Welsh mountains on a clear day. Accommodation options in the immediate area are limited — Woodmancote (2.6km detour) and Bishop's Cleeve (3.5km detour) are the nearest villages.",
    },
    {
      id: "dowdeswell-reservoir",
      name: "Dowdeswell Reservoir",
      distanceFromStart: 46.6,
      cumulativeAscent: 1054,
      cumulativeDescent: 1077,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [51.877970, -2.019350],
      description:
        "The trail passes Dowdeswell Reservoir, a quiet stretch of water set in wooded slopes above the A40. There are no services on the trail here — Charlton Kings is a 2km detour, and Cheltenham is accessible by bus or taxi from the A40 (approximately 5km). This section marks the transition from the open escarpment to the more enclosed woodland walking south of Cheltenham.",
    },
    {
      id: "seven-springs",
      name: "Seven Springs",
      distanceFromStart: 51.7,
      cumulativeAscent: 1235,
      cumulativeDescent: 1164,
      hasAccommodation: false,
      hasServices: true,
      coordinates: [51.853390, -2.047590],
      description:
        "Seven Springs sits at one of the highest crossroads on the Cotswold escarpment, where the A436 and A435 meet. The Seven Springs pub is the main point of interest and provides a welcome break point. Those needing accommodation should note that Charlton Kings is a 3.5km detour, with Cheltenham accessible beyond.",
    },
    {
      id: "ullenwood",
      name: "Ullenwood",
      distanceFromStart: 56.6,
      cumulativeAscent: 1326,
      cumulativeDescent: 1248,
      hasAccommodation: false,
      hasServices: true,
      coordinates: [51.851858, -2.080687],
      description:
        "Camping only at Ullenwood, which sits on the edge of Leckhampton Hill — one of the most dramatic sections of the entire route, with the Devil's Chimney rock pinnacle providing a memorable landmark. The hill fort above offers sweeping views. Those needing full accommodation should plan to continue to Birdlip or retrace to Seven Springs.",
    },
    {
      id: "birdlip",
      name: "Birdlip",
      distanceFromStart: 63.8,
      cumulativeAscent: 1435,
      cumulativeDescent: 1326,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.830380, -2.110730],
      description:
        "Birdlip sits on the escarpment edge with sweeping views west across the Severn Vale to the Forest of Dean and the Black Mountains beyond. It marks the point where the trail begins to shift away from the high, exposed wold country towards the more intimate wooded valleys of the southern Cotswolds. The Royal George hotel has been a stopping point for travellers on this road since the 18th century.",
    },
    {
      id: "painswick",
      name: "Painswick",
      distanceFromStart: 75.2,
      cumulativeAscent: 1645,
      cumulativeDescent: 1633,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.789142, -2.194883],
      description:
        "Painswick is the self-styled Queen of the Cotswolds — a hillside town of remarkable architectural consistency, where even the pub signs are regulated to maintain character. The churchyard's 99 clipped yew trees are the defining image. The Painswick Rococo Garden, just north of the town, is a rare example of the English Rococo style and worth a detour if time allows.",
    },
    {
      id: "ryeford",
      name: "Ryeford",
      distanceFromStart: 88.9,
      cumulativeAscent: 1897,
      cumulativeDescent: 2000,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [51.740859, -2.271692],
      description:
        "The trail descends from the escarpment to the Stroud valleys at Ryeford, where the Stroudwater Canal and the River Frome converge. There are no services on the trail here — Stonehouse is a 1.5km detour and Stroud is approximately 4km away. The valley landscape marks a significant change in character from the open wold walking of the preceding sections.",
    },
    {
      id: "kings-stanley",
      name: "King's Stanley",
      distanceFromStart: 89.5,
      cumulativeAscent: 1898,
      cumulativeDescent: 2014,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.736391, -2.273278],
      description:
        "King's Stanley sits in the Stroud valleys just 600m from Ryeford, with a pub and basic services. Stanley Mill, a Grade I listed early-19th-century textile mill in the village, is one of the best-preserved industrial buildings in England and a reminder of the Cotswolds' wool and cloth heritage that shaped so much of the landscape above.",
    },
    {
      id: "dursley",
      name: "Dursley",
      distanceFromStart: 101.7,
      cumulativeAscent: 2247,
      cumulativeDescent: 2318,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.681403, -2.353794],
      description:
        "Dursley is a working town rather than a showpiece village, which gives it a refreshingly un-tourist quality. It has a good range of services and acts as a practical base for the southern section of the trail. The route climbs steeply out of town through Cam Long Down, whose whale-backed ridge offers one of the best views of the day.",
    },
    {
      id: "north-nibley",
      name: "North Nibley",
      distanceFromStart: 105.4,
      cumulativeAscent: 2420,
      cumulativeDescent: 2443,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.661199, -2.378353],
      description:
        "North Nibley is a quiet village in the shadow of Nibley Knoll, topped by the Tyndale Monument — a 34m tower commemorating William Tyndale, who translated the New Testament into English and paid for it with his life. The climb to the monument is optional but the view is excellent, and the New Inn in the village is a well-regarded stop.",
    },
    {
      id: "wotton-under-edge",
      name: "Wotton-under-Edge",
      distanceFromStart: 109.5,
      cumulativeAscent: 2514,
      cumulativeDescent: 2563,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.638675, -2.355768],
      description:
        "Wotton-under-Edge is another quietly distinguished Cotswold wool town, with a heritage centre, several pubs, and a handsome market place. The town sits at the foot of the escarpment just before the trail climbs back onto the high ground for the final push south. The Tolsey Museum in the centre gives a good account of the town's cloth-trade history.",
    },
    {
      id: "hawkesbury-upton",
      name: "Hawkesbury Upton",
      distanceFromStart: 121.5,
      cumulativeAscent: 2837,
      cumulativeDescent: 2792,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.586418, -2.328488],
      description:
        "A compact village on the plateau near the Somerset border, Hawkesbury Upton has a pub and small accommodation options. The Somerset Monument on the edge of the village commemorates General Lord Somerset, who served at Waterloo. Petty France, which has a hotel and more formal accommodation, is a 3km detour to the east.",
    },
    {
      id: "old-sodbury",
      name: "Old Sodbury",
      distanceFromStart: 129.8,
      cumulativeAscent: 2993,
      cumulativeDescent: 2959,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.533380, -2.356910],
      description:
        "Old Sodbury sits on the edge of the escarpment with Sodbury Hill Fort immediately above — one of the largest and best-preserved Iron Age hillforts in the region. The Dog Inn is a reliable stop and the village marks the point where the trail begins its descent toward Bath, with the character shifting from open plateau to enclosed lanes and parkland.",
    },
    {
      id: "tormarton",
      name: "Tormarton",
      distanceFromStart: 133.2,
      cumulativeAscent: 3014,
      cumulativeDescent: 2987,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.508750, -2.341130],
      description:
        "Tormarton is a small village straddling the old Roman Ermin Way, a reminder that this landscape has been crossed and settled for two millennia. The Compass Inn is the main facility and the village makes a workable final overnight stop before Bath for those on a slower pace.",
    },
    {
      id: "bath",
      name: "Bath",
      distanceFromStart: 160.6,
      cumulativeAscent: 3417,
      cumulativeDescent: 3530,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.381370, -2.359440],
      description:
        "The trail ends in Bath — a fitting conclusion to 160km of limestone escarpment, wool towns, and Cotswold valley. The official finish is at the abbey, where the paving stones are inlaid with the Cotswold Way waymark. The Roman Baths, the Royal Crescent, and Pulteney Bridge are all within walking distance, and the city's extraordinary Georgian townscape rewards a slower arrival than the final day's descent might suggest.",
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
        "Popular with walkers who want time to explore the wool towns along the way — there's a lot to miss if you walk straight through.",
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
        "The pace most of our Cotswold Way walkers choose — solid days on the trail with enough left in the legs to enjoy the evenings.",
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
        "For experienced walkers who want to cover the Cotswold Way efficiently — the terrain is forgiving enough to hold a strong pace throughout.",
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

  gpxAssetPath: cotswoldWayGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of limestone escarpment, wool towns, and Cotswold valley — from the market streets of Chipping Campden to the Georgian grandeur of Bath. Build your perfect Cotswold Way itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/cotswold-way", // ⚠ UPDATE when Shopify product is live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default cotswoldWay;

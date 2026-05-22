import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import ridgewayGpxZipUrl from "@/data/ridgeway.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced from standalone planner trailData.ts.
// Coordinates snapped to actual GPX track.
// GPX direction: west-to-east (Overton Hill → Beacon Hill) — correct, no reversal.
//
// Before go-live:
//   - Replace heroImage with trail-specific hero image
//   - Update branding.bookingUrl once Shopify product is published
// ---------------------------------------------------------------------------

const ridgeway: TrailConfig = {
  id: "ridgeway",
  name: "The Ridgeway",
  shortName: "Ridgeway",
  startLocation: "Overton Hill",
  endLocation: "Ivinghoe Beacon",

  totalDistanceKm: 138.9,
  totalAscentM: 1876,
  totalDescentM: 1829,

  directions: {
    default: "west-to-east",
    labels: {
      "west-to-east": {
        name: "Overton Hill to Beacon Hill",
        description: "Overton Hill to Beacon Hill (traditional direction)",
      },
      "east-to-west": {
        name: "Beacon Hill to Overton Hill",
        description: "Beacon Hill to Overton Hill",
      },
    },
  },

  nodes: [
    {
      id: "overton-hill",
      name: "Overton Hill",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [51.411579, -1.830567],
      description:
        "The Ridgeway begins at a layby on the A4, three miles west of Marlborough, where the trail meets the Avebury complex of standing stones and burial mounds. The Sanctuary, a Neolithic concentric circle of timber and stone, sits just across the road from the trailhead. Within a few minutes' walk are the West Kennet Long Barrow and Silbury Hill, the largest prehistoric mound in Europe. There are no services at the trailhead itself; the nearest village with a pub is Avebury, a mile to the north.",
    },
    {
      id: "ogbourne-st-george",
      name: "Ogbourne St George",
      distanceFromStart: 14.6,
      cumulativeAscent: 165,
      cumulativeDescent: 160,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.470680, -1.725010],
      description:
        "Ogbourne St George sits a few hundred metres off the trail, in a quiet valley where the Og runs down toward the Kennet. The village has a pub, the Inn with the Well, and several B&Bs that cater for trail walkers. The trail itself stays on the chalk downland above, passing Hackpen Hill and the Marlborough White Horse a few kilometres earlier. This is the first place since Overton Hill where it makes sense to stop overnight.",
    },
    {
      id: "woolstone-hill",
      name: "Woolstone Hill",
      distanceFromStart: 34.8,
      cumulativeAscent: 440,
      cumulativeDescent: 400,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.571660, -1.576070],
      description:
        "Woolstone Hill carries the Uffington White Horse, the oldest hill figure in Britain, cut into the chalk around three thousand years ago. The trail passes above the figure and crosses Uffington Castle, a substantial Iron Age hillfort with deep ramparts still visible underfoot. A short detour leads down to Wayland's Smithy, a Neolithic chambered long barrow set in a beech grove. Woolstone village, below the hill, has the White Horse Inn and a handful of B&Bs.",
    },
    {
      id: "round-hill",
      name: "Round Hill (Letcombe Regis)",
      distanceFromStart: 43.2,
      cumulativeAscent: 573,
      cumulativeDescent: 512,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.553990, -1.467330],
      description:
        "Round Hill sits on the high downland above Letcombe Regis, with Segsbury Camp, another Iron Age hillfort, a short distance further east. The village of Letcombe Regis lies in the valley below, reached by descending the bridleway from the Ridgeway. The Greyhound Inn is the focal point of the village. Wantage, two miles further north, is a larger town with full services and a regular bus link.",
    },
    {
      id: "east-ilsley-down",
      name: "East Ilsley Down",
      distanceFromStart: 58.6,
      cumulativeAscent: 642,
      cumulativeDescent: 664,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.534540, -1.268590],
      description:
        "East Ilsley Down is open chalk downland on the high ground south of the village. East Ilsley itself was once an important sheep-trading village, and still has two pubs, the Crown and Horns and the Swan. The trail crosses the A34 a short distance before this, on a footbridge. From the down, the view south extends over the Berkshire countryside toward the Hampshire ridge.",
    },
    {
      id: "goring",
      name: "Goring",
      distanceFromStart: 68.7,
      cumulativeAscent: 738,
      cumulativeDescent: 860,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.522910, -1.139190],
      description:
        "Goring-on-Thames marks the halfway point of the trail and the crossing of the Thames at the Goring Gap, where the river cuts between the Berkshire and Chiltern chalk. The village has shops, pubs, several places to eat, and a railway station on the Reading to Oxford line, making it the natural resupply stop. The trail crosses the river on the road bridge between Goring and Streatley. The bridge was rebuilt in 1923 and gives the best view of the river.",
    },
    {
      id: "moulsford",
      name: "Moulsford",
      distanceFromStart: 71.5,
      cumulativeAscent: 754,
      cumulativeDescent: 877,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.546400, -1.136460],
      description:
        "Moulsford is a small Thames-side village just upstream of Goring. The Beetle and Wedge, an old coaching inn on the riverbank, is the village's main landmark; Jerome K. Jerome wrote part of Three Men in a Boat here. The trail leaves the river at Moulsford and begins the climb back onto the Chilterns. There are a few B&Bs, but no shop.",
    },
    {
      id: "watlington",
      name: "Watlington",
      distanceFromStart: 92.8,
      cumulativeAscent: 1088,
      cumulativeDescent: 1122,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.639661, -0.992384],
      description:
        "Watlington is a small market town in the Chiltern Hills, reached by a kilometre's detour down from the trail. The town has narrow streets, a 17th-century town hall, two pubs (the Carriers Arms and the Fat Fox), and a few independent shops. Watlington Hill, which the trail crosses on its way past, is a National Trust site with good views across the Oxfordshire plain. The town is a useful overnight stop in a section with limited alternatives.",
    },
    {
      id: "aston-rowant",
      name: "Aston Rowant",
      distanceFromStart: 97.2,
      cumulativeAscent: 1132,
      cumulativeDescent: 1144,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.670850, -0.954970],
      description:
        "The trail crosses the Aston Rowant National Nature Reserve, an area of chalk grassland, juniper scrub, and beech hangers on the Chiltern escarpment. The M40 cuts through the chalk here, with the trail crossing on a footbridge above the motorway. The reserve is one of the best places in southern England to see chalk-loving butterflies and red kites. The village of Aston Rowant lies below the scarp and has limited services.",
    },
    {
      id: "wainhill",
      name: "Wainhill",
      distanceFromStart: 103.3,
      cumulativeAscent: 1180,
      cumulativeDescent: 1189,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.704320, -0.887170],
      description:
        "Wainhill is a hamlet on the lower slopes of the Chilterns, near Chinnor. The trail runs along the foot of the escarpment through this stretch, with the open chalk slopes rising to the east. Bledlow village, a short walk south, has a 12th-century church and the Lions of Bledlow pub. There are a few B&Bs in the surrounding villages; full services are at Princes Risborough, four kilometres away.",
    },
    {
      id: "saunderton",
      name: "Saunderton",
      distanceFromStart: 108.4,
      cumulativeAscent: 1257,
      cumulativeDescent: 1294,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.707110, -0.839630],
      description:
        "Saunderton has a railway station on the Chiltern main line to London Marylebone, which makes it a useful entry or exit point for walkers doing the trail in sections. The village itself is small, with a few houses and a church, but no pub. Princes Risborough lies a couple of kilometres to the north and has the nearest full set of services. The trail through here passes through beech woodland typical of the Chilterns.",
    },
    {
      id: "cadsden",
      name: "Cadsden",
      distanceFromStart: 113.0,
      cumulativeAscent: 1396,
      cumulativeDescent: 1411,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.733030, -0.804750],
      description:
        "Cadsden is best known for the Plough at Cadsden, a 16th-century pub that sits directly on the trail. The pub became briefly famous in 2012 when David Cameron left his daughter there after lunch. Whiteleaf Cross, a chalk-cut hill figure of disputed age, possibly medieval, is a short distance further on. The pub offers food and a small number of rooms.",
    },
    {
      id: "wendover",
      name: "Wendover",
      distanceFromStart: 120.6,
      cumulativeAscent: 1544,
      cumulativeDescent: 1586,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [51.762674, -0.741339],
      description:
        "Wendover is the largest town directly on the trail in the Chiltern section. It has a railway station on the Chiltern line, several pubs, shops, restaurants, and a wide choice of accommodation. Coombe Hill, just before the descent into town, carries a monument to the Buckinghamshire men killed in the Boer War and gives one of the longest views on the trail, across the Vale of Aylesbury to the Cotswolds. It is the natural penultimate overnight stop for most walkers.",
    },
    {
      id: "tring-outskirts",
      name: "Tring Outskirts (Grand Union Canal)",
      distanceFromStart: 132.8,
      cumulativeAscent: 1715,
      cumulativeDescent: 1753,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.798580, -0.626150],
      description:
        "The trail crosses the Grand Union Canal at the bottom of Aldbury Nowers, with Tring railway station a short walk along the towpath. Tring itself, a larger town, is a kilometre further west and has full services including the Natural History Museum's Tring branch. The canal here cuts through a deep chalk cutting carved in the 1790s. For walkers travelling by train, this is the most convenient finish point if not going on to the Beacon.",
    },
    {
      id: "aldbury",
      name: "Aldbury",
      distanceFromStart: 133.7,
      cumulativeAscent: 1736,
      cumulativeDescent: 1758,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [51.803040, -0.617140],
      description:
        "Aldbury is one of the most photographed villages in the Chilterns: a green with a duck pond, village stocks, and two old pubs (the Greyhound Inn and the Valiant Trooper) clustered around the church. The village sits at the foot of the Ashridge Estate, a National Trust landscape of beech woods and chalk downland that the trail passes through on its final approach to the Beacon. Most walkers stay in Aldbury for the last night before finishing at Ivinghoe.",
    },
    {
      id: "beacon-hill",
      name: "Beacon Hill",
      distanceFromStart: 138.9,
      cumulativeAscent: 1876,
      cumulativeDescent: 1829,
      hasAccommodation: false,
      hasServices: false,
      coordinates: [51.842130, -0.608400],
      description:
        "Beacon Hill, also known as Ivinghoe Beacon, is the eastern end of the Ridgeway. A distinctive grass-covered chalk summit with views across the Vale of Aylesbury and the Bedfordshire plain. The trail finishes at the trig point. There are no services on the hill itself; the nearest pub is the Greyhound back in Aldbury, two kilometres south, and the nearest station is at Tring, three kilometres further west. A bench near the summit makes a fitting place to sit and look back.",
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
        "Walkers who want time to take in the prehistoric sites along the way: Avebury, the Uffington White Horse, Wayland's Smithy. Typically nine to ten days.",
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
        "The most popular pace on the Ridgeway. Six to eight days, with time for a pub lunch and an early arrival at each evening's accommodation.",
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
        "Experienced walkers covering the trail in four or five days. The terrain is gentle: long rolling chalk ridges with very little steep ground.",
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

  gpxAssetPath: ridgewayGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} along Britain's oldest path, from the standing stones at Avebury to the chalk summit of Ivinghoe Beacon. Build your perfect Ridgeway itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/ridgeway", // ⚠ UPDATE when live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default ridgeway;

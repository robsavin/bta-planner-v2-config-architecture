import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import angleseyCoastalPathGpxZipUrl from "@/data/anglesey-coastal-path.gpx.zip?url";

// ---------------------------------------------------------------------------
// Anglesey Coastal Path — circular trail around Ynys Môn.
// Node data sourced from standalone planner trailData.ts.
// Coordinates snapped to actual GPX track (snap accuracy < 100 m on every node).
// GPX direction: clockwise from Holyhead, matches trail data — no reversal needed.
//
// IMPORTANT — first circular trail in the planner:
//   - Direction keys "clockwise" / "anticlockwise" must be added to the
//     TrailDirection union in src/config/types.ts before this will build.
//
// Before go-live:
//   - Replace heroImage with trail-specific Anglesey hero image
//   - Update branding.bookingUrl once Shopify product is published
// ---------------------------------------------------------------------------

const angleseyCoastalPath: TrailConfig = {
  id: "anglesey-coastal-path",
  name: "Anglesey Coastal Path",
  shortName: "Anglesey Coastal Path",
  startLocation: "Holyhead",
  endLocation: "Holyhead",

  totalDistanceKm: 208.9,
  totalAscentM: 2120,
  totalDescentM: 2120,

  directions: {
    default: "clockwise",
    labels: {
      "clockwise": {
        name: "Clockwise (via Church Bay)",
        description: "Holyhead anticlockwise around the island, heading north-east via Church Bay and the north coast (most common direction).",
      },
      "anticlockwise": {
        name: "Anticlockwise (via Trearddur Bay)",
        description: "Holyhead heading south via Trearddur Bay and South Stack, finishing along the north coast.",
      },
    },
  },

  nodes: [
    {
      id: "holyhead",
      name: "Holyhead",
      distanceFromStart: 0,
      cumulativeAscent: 0,
      cumulativeDescent: 0,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.311130, -4.632600],
      description:
        "The trail begins and ends at Eglwys Sant Cybi — St Cybi's Church — sitting inside the surviving walls of a 4th-century Roman fort, one of only three such fort-within-a-church arrangements in Europe. Holyhead is the largest town on Ynys Môn and the working ferry port for Dublin, which gives it a busier, more practical character than the rest of the route. Full services here: shops, supermarkets, pubs, plenty of accommodation, and a railway station with direct trains to London Euston. Worth a quiet half-hour at the church before setting off — the carved stones and Celtic cross slabs reward a closer look.",
    },
    {
      id: "church-bay",
      name: "Church Bay",
      distanceFromStart: 22.7,
      cumulativeAscent: 145,
      cumulativeDescent: 147,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.371470, -4.556300],
      description:
        "A scattered settlement above a quiet sand-and-shingle bay on Anglesey's western edge, looking out across the Irish Sea toward the Wicklow Mountains on a clear day. The genuine draw here is Swtan, a restored 16th-century thatched longhouse run as a small folk museum by volunteers — it is the last surviving thatched cottage on the island and shows the kind of bare, sea-facing existence that shaped this coastline. The Lobster Pot restaurant and a seasonal café cover lunch and refreshments. Accommodation is mostly self-catering cottages and B&Bs in the surrounding farms.",
    },
    {
      id: "cemaes",
      name: "Cemaes",
      distanceFromStart: 41.1,
      cumulativeAscent: 340,
      cumulativeDescent: 344,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.412720, -4.451100],
      description:
        "The northernmost village in Wales, set around a sheltered horseshoe harbour that still works for small fishing boats. The Stag Inn is the proper village pub, Ye Olde Vigour Café handles lunches and cake, and the Spar covers resupply needs. Llanbadrig Church on the headland to the east is reputedly Wales's oldest, founded by St Patrick after he was shipwrecked on Middle Mouse island offshore. The decommissioned Wylfa nuclear station looms across the bay to the west — a quietly striking presence on this stretch of otherwise undeveloped coast.",
    },
    {
      id: "amlwch-port",
      name: "Amlwch Port",
      distanceFromStart: 53.9,
      cumulativeAscent: 482,
      cumulativeDescent: 477,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.413230, -4.334440],
      description:
        "A narrow, deep-cut harbour blasted out of the rock to ship copper from Parys Mountain, which in the 1780s was briefly the largest copper mine in the world. The port still feels industrial in character — slate quays, old warehouses, the dry dock — and the small Copper Kingdom Centre at the harbour explains the boom that turned this corner of Anglesey into a global supplier of sheathing for the Royal Navy. The Sail Loft café sits right on the water. The town itself, ten minutes uphill, has shops, pubs, and a wider range of accommodation than the immediate harbour suggests.",
    },
    {
      id: "moelfre",
      name: "Moelfre",
      distanceFromStart: 73.3,
      cumulativeAscent: 774,
      cumulativeDescent: 774,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.352970, -4.236120],
      description:
        "A working fishing village with a strong RNLI tradition — the seawall carries the bronze statue of coxswain Dic Evans, who led the 1959 Hindlefell rescue and the 1959 lifeboat that went out in the Royal Charter centenary storm. The wreck of the Royal Charter itself, lost on the rocks here in October 1859 with over 450 dead and a fortune in Australian gold, is commemorated on the headland to the south. Ann's Pantry serves arguably the best lunches on the east coast, the Kinmel Arms is the village pub, and the RNLI Seawatch Centre is a worthwhile twenty-minute stop.",
    },
    {
      id: "benllech",
      name: "Benllech",
      distanceFromStart: 78.5,
      cumulativeAscent: 822,
      cumulativeDescent: 825,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.320760, -4.220260],
      description:
        "A wide, gently shelving sand beach backed by a busier seaside village than anything before it on the route — Benllech is the closest thing the east coast has to a resort, with caravan parks behind the dunes and a string of cafés, fish and chip shops, and a small Co-op on the high street above. Useful as a resupply and lunch stop rather than a destination in itself. The path drops onto the beach for a kilometre or so depending on tide, which is a welcome change of surface after the field paths north of here.",
    },
    {
      id: "penmon",
      name: "Penmon",
      distanceFromStart: 95.4,
      cumulativeAscent: 1097,
      cumulativeDescent: 1043,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [53.305510, -4.070909],
      description:
        "The far eastern point of Anglesey, where the path turns the corner of the island and the view opens across the Menai Strait to the mountains of Snowdonia. Trwyn Du lighthouse — the black-and-white striped tower offshore — guards the channel between Penmon and Puffin Island, and its bell still tolls every thirty seconds. Penmon Priory and its dovecote sit a short detour inland and are worth the few minutes. The Pilot House café at the point covers warm drinks and pasties in season; otherwise there are no services at the headland itself, and accommodation is either back toward Beaumaris or in the small B&Bs around Llangoed.",
    },
    {
      id: "beaumaris",
      name: "Beaumaris",
      distanceFromStart: 104.9,
      cumulativeAscent: 1152,
      cumulativeDescent: 1157,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.262480, -4.093440],
      description:
        "The most architecturally complete town on the island and arguably the prettiest — Georgian terraces along the front, a Victorian pier reaching out toward the strait, and Edward I's unfinished concentric castle of 1295, considered by many architectural historians to be the most technically perfect medieval fortress in Britain (UNESCO listed alongside the other Welsh castles of Edward's iron ring). The old gaol and courthouse make a worthwhile pair of small museum visits. Plenty of accommodation across all budgets, multiple pubs, restaurants spanning the range from chip-shop to proper, and a Spar for resupply.",
    },
    {
      id: "menai-bridge",
      name: "Menai Bridge",
      distanceFromStart: 111.8,
      cumulativeAscent: 1266,
      cumulativeDescent: 1265,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.224980, -4.161930],
      description:
        "A small town that takes its name and most of its identity from Telford's 1826 suspension bridge — the first major iron suspension bridge in the world and still in daily use. Walk underneath it from the Belgian Promenade for the best view. Robert Stephenson's Britannia tubular bridge sits a short walk further west. The town itself has a Waitrose (rare on this coast), a clutch of good pubs and restaurants, and a wider range of accommodation than the small size suggests. Bangor and its main-line railway station are a fifteen-minute walk across the bridge if escape is needed.",
    },
    {
      id: "dwyran",
      name: "Dwyran",
      distanceFromStart: 132.6,
      cumulativeAscent: 1444,
      cumulativeDescent: 1447,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [53.161290, -4.324830],
      description:
        "A quiet inland village in the south-west corner, where the path turns away from the strait and starts the long traverse toward the western coast. The community-run Siop Dwyran covers basic supplies and post; otherwise services are limited and accommodation is mostly farmhouse B&Bs and a small number of self-catering cottages. The Anglesey Sea Zoo is a short walk to the south for those with time and an interest in the marine life of the strait. This stretch of the path runs through farmland and woodland rather than along the shore, which some walkers find a relief and others a slight disappointment.",
    },
    {
      id: "rhosneigr",
      name: "Rhosneigr",
      distanceFromStart: 165.0,
      cumulativeAscent: 1641,
      cumulativeDescent: 1641,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.228560, -4.520220],
      description:
        "A small Edwardian resort with a proper sand beach, a string of dune-backed coves, and a low-key surf and kitesurf scene that gives the village a younger feel than the rest of the island. RAF Valley sits inland and the noise of fast jets is part of the local soundtrack. The Oystercatcher and Sandy's Bistro are reliable for dinner, the Spar handles resupply, and the village offers a wider range of accommodation than its size suggests — useful given the long previous day from Menai Bridge or Dwyran.",
    },
    {
      id: "four-mile-bridge",
      name: "Four Mile Bridge",
      distanceFromStart: 176.1,
      cumulativeAscent: 1684,
      cumulativeDescent: 1685,
      hasAccommodation: true,
      hasServices: false,
      coordinates: [53.274000, -4.581420],
      description:
        "The narrow stone causeway that crosses the tidal channel between Anglesey proper and Holy Island — named for being four miles from Holyhead by the old Telford coach road, not for its length. The bridge itself is small and unremarkable, but the channel beside it is good for wading birds at low tide. No services beyond a handful of self-catering cottages; most walkers continue another few kilometres to Trearddur Bay rather than stopping here. The crossing officially returns you to Holy Island for the final stretch back to Holyhead.",
    },
    {
      id: "trearddur-bay",
      name: "Trearddur Bay",
      distanceFromStart: 190.8,
      cumulativeAscent: 1793,
      cumulativeDescent: 1801,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.280510, -4.620030],
      description:
        "A long, sandy crescent on the west side of Holy Island, busier in summer than anywhere else on the route bar Holyhead itself. The Sea Shanty café handles breakfast and lunch on the seafront, the Inn at the Bay and the Trearddur Bay Hotel cover dinner and accommodation at different price points, and there is a Spar for last-mile resupply. The RNLI station sits at the southern end of the beach. From here the path climbs onto the high ground for the South Stack stretch — arguably the most dramatic walking on the entire route, saved for the final day.",
    },
    {
      id: "holyhead-end",
      name: "Holyhead",
      distanceFromStart: 208.9,
      cumulativeAscent: 2120,
      cumulativeDescent: 2120,
      hasAccommodation: true,
      hasServices: true,
      coordinates: [53.311140, -4.632590],
      description:
        "The final approach climbs Holyhead Mountain (Mynydd Twr) and passes South Stack lighthouse on its sea-cut island — reached by a 400-step descent for those with energy left for the detour. Ellin's Tower above the cliffs is the RSPB observation point for guillemots, razorbills, choughs, and the occasional puffin. North Stack follows, then the path drops into Holyhead and finishes back at St Cybi's Church where the trail began. Closing the loop on foot, after a week or more of walking, is the kind of finish that earns its modest scale — there is no monument or ribbon, just the same Roman wall and the same churchyard, seen with different eyes.",
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
        "Chosen by walkers who want time to step off the path for the priories, copper mine, and lifeboat museums along the way — and to spend an hour at South Stack watching the seabirds.",
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
        "Our most popular pace on Anglesey — comfortable on the easy field paths and the gentler coastal sections, with enough in reserve for the final South Stack day.",
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
        "Suits experienced walkers who want to complete the circuit in seven or eight days — the gentle gradients reward a strong pace better than the mountain trails do.",
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

  gpxAssetPath: angleseyCoastalPathGpxZipUrl,

  shopifyVariants: {
    explorer: null,
    hiker: null,
    fastpacker: null,
    trailRunner: null,
  },

  hero: {
    description:
      "{distance} of low-cliff walking, sand beaches, copper-mine harbours, Edwardian castles, and seabird headlands — a full circuit of Ynys Môn beginning and ending at St Cybi's Church in Holyhead. Build your perfect Anglesey Coastal Path itinerary with downloadable GPX files for every stage.",
    imagePath: heroImage,
  },

  depositPerPerson: 0, // Overridden at runtime by Shopify data-attributes

  branding: {
    organisationName: "Big Trail Adventures",
    websiteUrl: "https://bigtrailadventures.com",
    bookingUrl: "https://bigtrailadventures.com/products/anglesey-coastal-path", // ⚠ UPDATE when live
    feedbackEmail: "feedback@bigtrailadventures.com",
    quoteEmail: "hello@bigtrailadventures.com",
    logoGif: btaLogoGif,
    logoColor: btaLogoColor,
    logoWhite: btaLogoWhite,
  },
};

export default angleseyCoastalPath;

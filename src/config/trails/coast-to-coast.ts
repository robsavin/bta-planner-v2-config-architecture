import heroImage from "@/assets/hero-highlands.jpg";
import btaLogoGif from "@/assets/bta-logo.gif";
import btaLogoColor from "@/assets/bta-logo-color.png";
import btaLogoWhite from "@/assets/bta-logo-white.webp";
import type { TrailConfig } from "@/config/types";
import coastToCoastGpxZipUrl from "@/data/coast-to-coast.gpx.zip?url";

// ---------------------------------------------------------------------------
// Node data sourced from standalone planner trailData.ts.
// Coordinates snapped to actual GPX track (scale factor 0.995, GPX 293.4 km).
// GPX direction: ran St Bees -> Robin Hood's Bay (correct) — no reversal needed.
//
// Before go-live:
//   - Replace heroImage with a Coast to Coast hero image
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
        "The walk starts on the beach at St Bees, where tradition has you pick up a pebble and dip your boots in the Irish Sea before setting off. The village sits below the red sandstone cliffs of St Bees Head, with a railway station on the Cumbrian Coast line, a shop, pubs and a good spread of accommodation. The first few kilometres climb onto the head itself, past the lighthouse and an RSPB seabird reserve, before the trail turns inland. It is worth doing the boot-dipping properly — there is a matching ritual waiting at the far coast.",
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
        "After the cliff path and the quiet lanes through Sandwith and Moor Row, the route reaches Cleator, on the edge of old west Cumbrian iron-mining country. There is a village shop and a pub, and accommodation is available in and around Cleator Moor a short way on. This is the last easy ground before Dent Hill, the first proper climb of the walk, rises directly ahead. Stock up here if you need to.",
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
        "The climb over Dent Hill at 352m and the steep drop through the Nannycatch valley bring you to Ennerdale Bridge, the first village inside the Lake District. There are two pubs here, the Shepherd's Arms and the Fox and Hounds, both offering food and beds. This is the gateway to Ennerdale, one of the few Lakeland valleys with no through road. From here the next stretch is genuinely remote, so it is a sensible place to plan resupply and accommodation carefully.",
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
        "The trail follows the southern shore of Ennerdale Water and then the forest track up the valley floor, with Pillar and Steeple rising on the far side. YHA Ennerdale, at Gillerthwaite, is the only accommodation in this part of the valley and there are no other services. It is well off any road, so luggage transfer is not possible to this stop — you will need to carry what you need for this section. Book directly with the hostel well ahead, as it is small and popular with Coast to Coast walkers.",
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
        "Black Sail Hut is a former shepherd's bothy at the head of Ennerdale, under Haystacks and Great Gable, and is one of the most remote hostels in England. There is no road, no shop and no luggage transfer — supplies come in on foot or by Land Rover track. Meals are provided when the hostel is staffed, but booking ahead is essential and the season is short. Staying here is one of the genuine highlights of the route for many walkers, precisely because of how little there is.",
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
        "From Black Sail the path climbs Loft Beck on rough, often wet ground, then drops through Honister and down into Borrowdale. Rosthwaite is a working Borrowdale village of slate cottages, with the Scafell Hotel, guest houses and the Flock-In tearoom at nearby Yew Tree Farm. There is a village shop for resupply. After two days of remote valley walking this feels like a return to comfortable country.",
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
        "A short way up the valley from Rosthwaite, Stonethwaite is a smaller cluster of houses beside Stonethwaite Beck, with the Langstrath Country Inn for food and a bed. It sits right on the trail where the route turns to follow Greenup Gill upstream. Many walkers use it as a quieter alternative to staying in Rosthwaite itself. There is no shop here, so buy supplies before you arrive.",
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
        "The climb over Greenup Edge and the long descent through Far Easedale bring you down into Grasmere, the busiest village on the route. William Wordsworth lived at Dove Cottage and is buried in St Oswald's churchyard, and the gingerbread shop by the church gate is a fixture. There is a full range of shops, cafés, pubs and accommodation, though it books up in season. This is a good place to resupply before the high crossing to Patterdale.",
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
        "The route climbs Little Tongue Gill to Grisedale Hause, passes Grisedale Tarn and descends the length of Grisedale to Patterdale, at the head of Ullswater. The high-level Helvellyn and Striding Edge alternative rejoins the main route here for those who took it. There is a village shop, the White Lion and the Patterdale Hotel, and a spread of bed and breakfasts. This is the last full Lakeland village before the long crossing to Shap.",
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
        "From Patterdale the path climbs past Angle Tarn to Kidsty Pike at 780m, the highest point of the entire walk, then drops steeply to Haweswater and follows the reservoir shore. Burnbanks is a small settlement originally built to house the workers who raised the dam in the 1930s. There is some accommodation but no shop or other services. It is a quiet, slightly unusual place to end a day after the biggest climb on the route.",
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
        "The trail passes the ruins of Shap Abbey, set low by the River Lowther, before reaching the long village of Shap strung out along the old A6. There is a Co-op, a chip shop, pubs including the Greyhound and the Kings Arms, and plenty of accommodation. The landscape now shifts from Lakeland fell to open limestone country. Shap is a natural resupply and rest point roughly a third of the way along.",
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
        "The route crosses Crosby Ravensworth Fell, with its limestone pavements and the marker known as Robin Hood's Grave, then comes close to the village of Orton. Orton has the George Hotel, a tearoom and Kennedys chocolate factory and shop, which is worth the short detour off the trail. Accommodation is available in and around the village. This is gentle, open walking between the Lakeland fells and the Pennine watershed.",
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
        "Across Smardale and more limestone country the trail reaches Kirkby Stephen, a small market town and the best resupply point in the middle of the walk. There are pubs, cafés, a Co-op, an outdoor shop and a railway station on the Settle to Carlisle line. The town sits just before the climb to Nine Standards Rigg, which marks the watershed of England. Most walkers treat this as a place to restock properly and rest.",
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
        "The climb to Nine Standards Rigg at 662m crosses high peat moorland with seasonal route variants in place to limit erosion, and the ground here can be very wet. Keld is a tiny stone hamlet at the head of Swaledale, where the Coast to Coast crosses the Pennine Way. Keld Lodge offers food and rooms, and there is limited bed and breakfast and bunkhouse accommodation, but no shop. It is a remote, well-loved staging point between two of the wilder sections of the route.",
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
        "From Keld there is a choice: the high route through the abandoned lead mines past Crackpot Hall and the Old Gang smelt mills, or the gentler riverside path down Swaledale. Both arrive at Reeth, a large village built around a sloping green, with pubs including the Buck and the Black Bull, a bakery and shops. There is a good range of accommodation here. The lead-mining landscape above the village is some of the most distinctive walking on the whole route.",
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
        "The path follows the Swale through Marrick and Marske into Richmond, the largest town on the route. The Norman castle keep stands over a cobbled market place, and there is a Georgian theatre, a full range of shops, banks and accommodation. This is the best place to deal with anything that needs fixing or replacing before the long, flat middle section. After Richmond the country opens out into the Vale of Mowbray.",
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
        "This section crosses the flat farmland of the Vale of Mowbray, the least dramatic walking on the route but a genuine rest for tired legs after the Dales. Danby Wiske is a small village with the White Swan pub for food and a bed. The route crosses the A19 and the East Coast main railway line in this stretch, so take care at both. The Cleveland Hills are visible ahead as a low wall on the eastern skyline.",
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
        "Ingleby Cross and the neighbouring Ingleby Arncliffe sit right at the foot of the Cleveland Hills, where the flat farmland ends. The Blue Bell Inn provides food and accommodation, and there is a shop nearby. This is the last reliable resupply before the climb onto the North York Moors. From here the trail joins the line of the Cleveland Way for a long, exposed stretch.",
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
        "Here the Coast to Coast climbs into woodland and enters the North York Moors National Park, joining the Cleveland Way as it goes. There are no services at the junction itself — this is a waymark on the route rather than a place to stop. Walkers needing a bed can detour roughly 1.7 km to the village of Osmotherley, which has pubs and accommodation. From this point the route follows the high northern edge of the moors.",
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
        "This is hard, switchback moorland walking over Carlton Bank and Cringle Moor, with steep climbs and descents in quick succession. There is no accommodation at the junction, but Lord Stones Café sits on the route below Carlton Bank and is a useful refreshment stop. The views north over the Tees lowlands and Roseberry Topping open up along this edge. The Wainstones, a tumble of gritstone, lie just ahead.",
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
        "Past the Wainstones and over Urra Moor, the highest ground on the North York Moors, the route follows the bed of an old ironstone railway across open heather. The Lion Inn at Blakey is an isolated 16th-century pub and hotel at around 404m, and it is the only food, drink and accommodation for a long way in either direction. Book ahead, as it is heavily used by Coast to Coast walkers and there is nothing else nearby. In bad weather this exposed ridge is a serious place.",
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
        "The route crosses Glaisdale Rigg with wide moorland views before dropping down into the wooded valley of the Esk. Glaisdale has a post office store for supplies, the Arncliffe Arms and other accommodation, and a station on the Esk Valley railway line. This is the start of the gentler, greener final stretch through Eskdale. After the high moors it feels sheltered and settled.",
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
        "From Glaisdale the path crosses the medieval Beggar's Bridge and follows the Esk through East Arnecliff Wood to Grosmont. The village is the northern terminus of the North Yorkshire Moors Railway, so steam trains are often in the station, and there is a café, the Station Tavern and a shop. There is accommodation in and around the village. It is a popular and lively stop with the railway running through the middle of it.",
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
        "A steep climb out of Grosmont over the moor, with the railway sheds and steam below, leads down into the small wooded valley at Littlebeck. This is a tiny hamlet with no shop or pub — somewhere the trail passes through rather than a place to base a day. Just beyond it the path enters the woods past the carved rock shelter known as the Hermitage and the Falling Foss waterfall. Carry what you need; there is nothing to buy here.",
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
        "The route works through the woods around May Beck and Falling Foss and across farmland to Hawsker, close to the coast at last. The Hare and Hounds pub provides meals and accommodation, and there are caravan parks nearby. Here the trail meets the Cleveland Way cliff path for the final run south. The North Sea is in sight and the end is close.",
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
        "The walk finishes along the cliff top and down through the steep, tightly packed streets of Robin Hood's Bay, a former fishing and smuggling village of red-roofed cottages dropping to the slipway. Tradition has you walk to the water, dip your boots in the North Sea and throw in the pebble you carried from St Bees. The Bay Hotel at the bottom of the bank is the recognised end point and keeps the Coast to Coast register. There are pubs, cafés and accommodation, and buses run to Whitby and Scarborough for onward travel.",
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
        "Walkers who want to climb Helvellyn or linger in the Swaledale mining country usually take sixteen days or more at this pace.",
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
        "Most people walk the Coast to Coast in twelve to fourteen days, and this is the pace the majority choose.",
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
        "Experienced hill walkers compress the route into eight or nine days, with several long days over the high passes.",
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
      "{distance} of walking clean across northern England — from the Irish Sea cliffs at St Bees, over the Lakeland fells, the Pennine watershed and the North York Moors, to the North Sea at Robin Hood's Bay. Build your perfect Coast to Coast itinerary with downloadable GPX files for every stage.",
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

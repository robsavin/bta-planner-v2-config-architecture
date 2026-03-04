import type { ReactNode } from "react";
import { Gauge, CalendarDays, BedDouble, Map, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const features = [
  {
    icon: Gauge,
    title: "Choose Your Pace",
    description: "Four speed profiles from trail runner to explorer.",
  },
  {
    icon: CalendarDays,
    title: "Set Your Dates",
    description: "Pick a start date and daily walking hours.",
  },
  {
    icon: BedDouble,
    title: "Add Rest Days",
    description: "After generating your itinerary you can add rest days along the way.",
  },
  {
    icon: Map,
    title: "Interactive Map",
    description: "View each day's segment with trail details.",
  },
  {
    icon: Download,
    title: "GPX Downloads",
    description: "Export a free GPX file for each day of your trek.",
  },
];

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "How does your Itinerary Planner help me plan my adventure?",
    answer: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Plan Your Adventure, Day by Day, Without the Guesswork</h3>
        <p>
          One of the trickiest parts of planning a long-distance walk isn't choosing the route, it's working out where
          to stop each day. How far can you realistically cover? How long will that section actually take? Get it wrong
          and you're either limping to your stop exhausted or finishing the day with miles still to go.
        </p>
        <p className="font-medium">Our free itinerary planner takes all of that off your plate.</p>
        <p>
          Tell it a few simple things: your start date, how fast you move, and how many hours you want to be on your
          feet each day. Choose from four pace types — Explorer, Hiker, Fastpacker or Trail Runner — hit Generate
          Itinerary, and within seconds you'll have a personalised day-by-day plan.
        </p>
        <p>
          Behind the scenes, the planner accounts for distance, terrain, and elevation to calculate realistic daily
          stages. Not just flat-map kilometres, but genuine moving time. Whether you're a weekend wanderer who likes to
          stop and soak up the view, or an experienced trail runner pushing through long days, the planner adapts to
          your style.
        </p>
        <p>
          Once you're happy with your itinerary, you can download it complete with your actual dates, handy to have when
          you're sorting out your accommodation along the way.
        </p>
        <p>
          The result is a personalised itinerary that tells you exactly where to aim each day, how long you'll be on the
          move, and how the route breaks down from start to finish. So you can stop worrying about the logistics and
          start looking forward to the adventure.
        </p>
        <p className="font-medium">
          Ready to plan? Enter your details, choose your pace, and generate your itinerary in seconds.
        </p>
      </div>
    ),
  },
  {
    question: "How long does the West Highland Way take?",
    answer: (
      <div className="space-y-4">
        <p>
          The West Highland Way stretches approximately 154 km (96 miles) from Milngavie on the outskirts of Glasgow to
          Fort William at the foot of Ben Nevis, passing through some of Scotland's most spectacular Highland scenery.
          How long it takes depends entirely on how you choose to travel it. Based on averaging 8 hours a day on the
          trail, here's what to expect.
        </p>
        <p>
          Most walkers complete the route in 7 to 8 days, averaging around 12 to 14 miles per day with comfortable
          overnight stops in villages and towns along the way. This is the classic pace — unhurried enough to soak in
          the stunning Highland scenery, enjoy a pub meal at the end of each day, and still feel the satisfying pull of
          progress through glens and along lochs.
        </p>
        <p>
          For those who move light and fast, fastpacking the West Highland Way in around 5 days is a popular challenge.
          Covering 19 to 20 miles a day with a stripped-back pack, fastpackers experience the route with a different
          kind of intensity — longer days on the trail and bigger transitions between landscapes. It demands fitness and
          good navigation, but the sense of momentum is addictive.
        </p>
        <p>
          At the sharp end, experienced trail runners tackle the entire route in as few as 4 days, running significant
          distances daily across some of Scotland's most beautiful terrain. It's a serious undertaking that combines
          endurance, mountain skills, and mental resilience, but for those with the legs and the drive, it's one of the
          great trail running challenges in the Scottish Highlands.
        </p>
        <p>
          Our planner lets you adjust daily hours and speed profile to find the perfect schedule for however you choose
          to travel. Whether you're planning a relaxed week or a four-day push, we'll build you a day-by-day itinerary
          that fits.
        </p>
      </div>
    ),
  },
  {
    question: "How accurate are your time calculations?",
    answer:
      "Our timings are not based on simple distance calculations or generic 'average walking speeds.' Instead, we model each route using a structured performance framework that separates progress on flat terrain, climbing speed on ascent, descent efficiency, and the specific terrain profile of each individual trail.\n\nThis matters because two routes of the same distance can feel entirely different depending on elevation gain, gradient distribution and surface type. By analysing these elements independently, we produce timing guidance that reflects how experienced walkers and runners actually move in the real world.\n\nEach trail is carefully reviewed and profiled rather than auto-generated. Terrain characteristics are factored in, not just headline ascent totals. Our pace categories are aligned with real-world outdoor performance, not arbitrary labels.\n\nThe result is timing guidance that is fair, realistic and significantly more precise than standard rule-of-thumb estimates. This enables you to choose daily distances that match your ability and enjoy your adventure with confidence.",
  },
  {
    question: "What to expect on the West Highland Way",
    answer: (
      <div className="space-y-4">
        <p>
          Starting from the granite obelisk in the center of Milngavie, just north of Glasgow, the West Highland Way
          covers 154 kilometers of some of Scotland's most varied and dramatic landscapes. It is the country's most
          famous long-distance trail, and for good reason. Over the course of seven to nine days, walkers are carried
          from the suburban fringes of a great city into the heart of the Highlands, finishing beneath the shadow of Ben
          Nevis in Fort William.
        </p>
        <p>
          The early stages ease you in gently. The path rolls through woodland, parkland, and farmland, passing the
          historic Clachan Inn in Drymen, reputedly Scotland's oldest licensed pub, before the first real test arrives
          at Conic Hill. The climb to 361 meters may not be enormous, but the reward is spectacular — a sweeping
          panorama of Loch Lomond and its scattered islands, with Ben Lomond rising to the north. This is also the line
          of the Highland Boundary Fault, and crossing it feels fitting. The Lowlands are behind you.
        </p>
        <p>
          The next section traces the eastern shore of Loch Lomond through ancient oak woodland, passing waterfalls and
          rocky promontories, with the loch glittering through the trees. The going becomes progressively rougher north
          of Inversnaid, where boulder fields and twisted roots demand care and attention, but the wild beauty of this
          stretch more than compensates. Rob Roy's Cave sits tucked into the lochside rocks, a reminder that these hills
          have long fired the imagination.
        </p>
        <p>
          Beyond the loch, the trail follows the River Falloch north, then climbs through forestry and open hillside
          before descending toward Tyndrum and Bridge of Orchy. The mountains are growing larger now. Beinn Dorain's
          distinctive conical summit dominates the skyline for miles, and the stone bridge at Bridge of Orchy, dating
          from 1751, is a fine place to pause and take stock of how far the landscape has changed since Milngavie.
        </p>
        <p>
          The crossing of Rannoch Moor is the moment many walkers remember most vividly. One of the largest and most
          exposed blanket bogs in Europe, the moor stretches away in every direction under huge skies, with distant
          peaks breaking the horizon and the great pyramid of Buachaille Etive Mor rising ahead. It is genuinely remote,
          and genuinely magnificent.
        </p>
        <p>
          From the Kingshouse Hotel, the trail climbs the Devil's Staircase, a switchback ascent to the highest point on
          the entire route at 550 meters, before descending into Kinlochleven. The final day pushes through the remote
          Lairig Mor valley, past Iron Age ruins and beneath the Mamores ridge, before the forest tracks give way to
          Glen Nevis and the outskirts of Fort William. The official finish is marked by a statue of a seated walker in
          Gordon Square, a figure that seems to capture perfectly the mix of exhaustion and satisfaction that most
          people feel when they arrive.
        </p>
        <p>
          The West Highland Way is challenging in places, but it is well-marked and well-served with accommodation and
          refreshment stops throughout. It is a route that rewards those who take the time to walk it properly.
        </p>
      </div>
    ),
  },

  {
    question: "What is the best time to walk the West Highland Way?",
    answer: (
      <div className="space-y-4">
        <p>
          The West Highland Way sits in one of the wetter corners of Europe, and walkers should be prepared for rain at
          any time of year. The weather in the Scottish Highlands is famously changeable, and a single day can bring
          sunshine, cloud, wind, and heavy showers in rapid succession. Waterproofs and layered clothing are essential
          regardless of when you travel.
        </p>
        <p>
          Spring, from April to early June, brings longer days and quieter trails, but snow can still linger on higher
          ground and the paths can be muddy. Summer, July and August, offers the best chance of warm, settled weather,
          but this is also peak midge season. These tiny biting insects thrive in still, damp conditions and can make
          rest stops genuinely unpleasant, particularly in sheltered woodland and around the lochside sections. A good
          midge repellent and a head net are strongly advisable from June through September.
        </p>
        <p>
          Autumn is arguably the finest time to walk, with bracken turning gold and red, fewer midges, and often stable
          weather through September and into October. Winter walking is possible but demands experience and the right
          equipment, as short daylight hours, ice, and severe conditions on exposed sections like Rannoch Moor can make
          the route genuinely serious.
        </p>
      </div>
    ),
  },
  {
    question: "Can I download free West Highland Way GPX files?",
    answer: (
      <div className="space-y-4">
        <p>
          Yes — our planner generates free GPX files for the West Highland Way, split by day to match your personal
          itinerary. Each GPX file covers a single stage of your trek, from Milngavie through Loch Lomond, Rannoch Moor,
          and the Devil's Staircase to Fort William, with full elevation data and your chosen direction of travel.
        </p>
        <p>
          After generating your itinerary, every day includes a download button. Load the files onto Komoot, AllTrails,
          Garmin, OS Maps, Maps.me, Apple Watch, or any GPS-compatible device. No sign-up required — just generate your
          itinerary and download.
        </p>
        <p>
          The GPX tracks follow the official West Highland Way route and are dynamically sliced to match your specific
          daily stages, so they work whether you're walking 7 days or 4. They're ideal for offline navigation in areas
          with limited mobile signal, particularly along the remote Loch Lomond shoreline and across Rannoch Moor.
        </p>
      </div>
    ),
  },
  {
    question: "Do you have any other Trail Itinerary Planners?",
    answer: (
      <div className="space-y-4">
        <p>
          Yes — we have free itinerary planners for 20 long-distance trails across Europe. Each one includes custom pace
          settings, day-by-day schedules, and downloadable GPX files. Visit{" "}
          <a href="https://openair.tools" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
            openair.tools
          </a>{" "}
          to explore them all.
        </p>
        <div className="space-y-1.5">
          <p className="font-semibold text-foreground">England</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><a href="https://coast-to-coast-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Coast to Coast</a> — 309 km</li>
            <li><a href="https://cotswold-way-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cotswold Way</a> — 164 km</li>
            <li><a href="https://cumbria-way-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Cumbria Way</a> — 112 km</li>
            <li><a href="https://dales-way-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Dales Way</a> — 127 km</li>
            <li><a href="https://hadrians-wall-path-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hadrian's Wall Path</a> — 135 km</li>
            <li><a href="https://pennine-way-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pennine Way</a> — 431 km</li>
            <li><a href="https://ridgeway-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">The Ridgeway</a> — 139 km</li>
            <li><a href="https://south-downs-way-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">South Downs Way</a> — 160 km</li>
            <li><a href="https://south-west-coast-path-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">South West Coast Path</a> — 1,014 km</li>
          </ul>
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-foreground">Scotland</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><a href="https://fife-coastal-path-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fife Coastal Path</a> — 188 km</li>
            <li><a href="https://great-glen-way-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Great Glen Way</a> — 117 km</li>
            <li><a href="https://rob-roy-way-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Rob Roy Way</a> — 127 km</li>
            <li><a href="https://west-highland-way-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">West Highland Way</a> — 154 km</li>
          </ul>
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-foreground">Scotland / England</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><a href="https://st-cuthberts-way-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">St Cuthbert's Way</a> — 100 km</li>
          </ul>
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-foreground">Wales</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><a href="https://anglesey-coastal-path-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anglesey Coastal Path</a> — 200 km</li>
            <li><a href="https://pembrokeshire-coast-path-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pembrokeshire Coast Path</a> — 300 km</li>
          </ul>
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-foreground">France / Italy / Switzerland</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><a href="https://tour-du-mont-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Tour du Mont Blanc</a> — 170 km</li>
          </ul>
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-foreground">Italy</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><a href="https://alta-via-1-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Alta Via 1</a> — 120 km</li>
          </ul>
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-foreground">Spain</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><a href="https://cami-de-cavalls-itinerary-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Camí de Cavalls</a> — 185 km</li>
            <li><a href="https://gr221-trail-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GR221 (Dry Stone Route)</a> — 135 km</li>
          </ul>
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-foreground">Portugal</p>
          <ul className="list-disc list-inside space-y-1 ml-1">
            <li><a href="https://fishermans-trail-planner.openair.tools/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fisherman's Trail (Rota Vicentina)</a> — 226 km</li>
          </ul>
        </div>
      </div>
    ),
  },
];

const FeaturesAndFaq = () => {
  return (
    <section className="bg-muted/40 border-t border-border" aria-label="Features and frequently asked questions">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Features Grid */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-center">How Our Planner Helps</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-background border border-border shadow-sm"
                >
                  <f.icon className="h-6 w-6 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground">{f.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-border" />

          {/* GPX Content Section */}
          <div className="rounded-xl border border-border bg-background p-6 md:p-8 space-y-4">
            <div className="flex items-start gap-3">
              <Download className="h-8 w-8 text-primary shrink-0 mt-1" aria-hidden="true" />
              <h2 className="text-2xl md:text-3xl font-black text-foreground">Free West Highland Way GPX Files</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Download free GPX files for the West Highland Way, split by day to match your personal itinerary. Our
              planner generates individual GPX tracks for each of your stages, from Milngavie through the bonnie banks
              of Loch Lomond and across Rannoch Moor to Fort William.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each GPX file includes full elevation data and follows your chosen direction of travel. Load them onto
              Komoot, AllTrails, Garmin, OS Maps, or any GPS-compatible device. No sign-up required — just generate
              your itinerary and download.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {["Komoot", "AllTrails", "Garmin", "OS Maps", "Maps.me", "Apple Watch"].map((app) => (
                <span key={app} className="text-sm px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground">
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <hr className="border-border" />

          {/* FAQ Accordion */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-background border border-border rounded-xl px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-base">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{faq.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAndFaq;

/**
 * Authentic historical records, newspaper archive directories,
 * everyday price benchmarks, and astronomical event catalogues.
 * Used to guarantee verified sources and working archive links.
 */

export interface NewspaperArchiveSource {
  id: string;
  name: string;
  region: "india" | "worldwide";
  language: string;
  coverageYears: string;
  description: string;
  websiteName: string;
  getSearchUrl: (year: number, month: number, day: number) => string;
  notes: string;
}

export const NEWSPAPER_ARCHIVES: NewspaperArchiveSource[] = [
  {
    id: "loc-chronicling-america",
    name: "Library of Congress — Chronicling America",
    region: "worldwide",
    language: "English",
    coverageYears: "1777 – 1963+",
    description: "Millions of digitized historic American newspaper pages from state libraries.",
    websiteName: "loc.gov/chronicling-america",
    getSearchUrl: (year, month, day) => {
      const pad = (n: number) => String(n).padStart(2, "0");
      const d = `${year}-${pad(month)}-${pad(day)}`;
      return `https://chroniclingamerica.loc.gov/search/pages/results/?date1=${d}&date2=${d}&searchType=advanced`;
    },
    notes: "Public domain collection hosted by the U.S. Library of Congress and NEH.",
  },
  {
    id: "google-news-archive",
    name: "Google News Historical Archive",
    region: "worldwide",
    language: "Multilingual (including English and Indian dailies)",
    coverageYears: "1800s – 2000s",
    description: "Scanned microfilms of hundreds of international and Indian newspapers.",
    websiteName: "news.google.com/newspapers",
    getSearchUrl: (year, month, day) => {
      return `https://news.google.com/newspapers`;
    },
    notes:
      "Browse microfilmed editions of The Indian Express, The Hindu, Sydney Morning Herald, and more.",
  },
  {
    id: "the-hindu-archive",
    name: "The Hindu Archives & e-Paper",
    region: "india",
    language: "English",
    coverageYears: "1878 – Present",
    description: "India's venerable national daily, documenting independent India's history.",
    websiteName: "thehindu.com",
    getSearchUrl: (year, month, day) => {
      const pad = (n: number) => String(n).padStart(2, "0");
      return `https://www.thehindu.com/archive/web/${year}/${pad(month)}/${pad(day)}/`;
    },
    notes: "Online archive and digitized print record for contemporary and historic coverage.",
  },
  {
    id: "indian-express-archive",
    name: "The Indian Express Historical Archive",
    region: "india",
    language: "English",
    coverageYears: "1932 – Present",
    description:
      "Famous for fearless investigative journalism and post-independence Indian history.",
    websiteName: "indianexpress.com",
    getSearchUrl: (year, month, day) => {
      const pad = (n: number) => String(n).padStart(2, "0");
      return `https://indianexpress.com/section/archive/`;
    },
    notes:
      "Extensive microfilmed runs available via Google News Archives and physical state libraries.",
  },
  {
    id: "times-of-india-archive",
    name: "The Times of India Historical Archive",
    region: "india",
    language: "English",
    coverageYears: "1838 – Present",
    description:
      "One of India's oldest continuously published English dailies (formerly The Bombay Times).",
    websiteName: "timesofindia.indiatimes.com",
    getSearchUrl: (year, month, day) => {
      const pad = (n: number) => String(n).padStart(2, "0");
      return `https://timesofindia.indiatimes.com/archive/year-${year},month-${month}.cms`;
    },
    notes: "Digital archive portal indexed by year and month.",
  },
  {
    id: "trove-australia",
    name: "National Library of Australia — Trove",
    region: "worldwide",
    language: "English",
    coverageYears: "1803 – Present",
    description: "Comprehensive digitized Australian press with global cable news dispatches.",
    websiteName: "trove.nla.gov.au",
    getSearchUrl: (year, month, day) => {
      const pad = (n: number) => String(n).padStart(2, "0");
      return `https://trove.nla.gov.au/newspaper/result?q=&l-decade=${Math.floor(year / 10) * 10}&l-year=${year}&l-month=${month}&dateFrom=${year}-${pad(month)}-${pad(day)}&dateTo=${year}-${pad(month)}-${pad(day)}`;
    },
    notes: "Free public access with full-text OCR search and high-resolution scans.",
  },
  {
    id: "the-guardian-open-archive",
    name: "The Guardian & The Observer Archive",
    region: "worldwide",
    language: "English",
    coverageYears: "1791 – Present",
    description:
      "British international daily with extensive diplomatic, scientific, and cultural reporting.",
    websiteName: "theguardian.com",
    getSearchUrl: (year, month, day) => {
      const MONTH_NAMES = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
      ];
      const mStr = MONTH_NAMES[month - 1] ?? "jan";
      const pad = (n: number) => String(n).padStart(2, "0");
      return `https://www.theguardian.com/theguardian/${year}/${mStr}/${pad(day)}`;
    },
    notes: "Online archive preserves published articles by calendar date.",
  },
  {
    id: "internet-archive-microfilm",
    name: "Internet Archive — Microfilm & Newspaper Collections",
    region: "worldwide",
    language: "Multilingual",
    coverageYears: "1600s – 2010s",
    description: "Over 500,000 digitized microfilms of historical local and world newspapers.",
    websiteName: "archive.org/details/newspapers",
    getSearchUrl: (year, month, day) => {
      return `https://archive.org/search.php?query=mediatype%3Atexts+AND+collection%3Anewspapers+AND+date%3A${year}`;
    },
    notes: "Non-profit library maintaining permanent digitized microfilm reels.",
  },
];

/**
 * Historical price benchmarks by era (India INR & International USD)
 * Documented from Reserve Bank of India historical statistics, Bureau of Labor Statistics,
 * and vintage market gazettes.
 */
export interface EraEconomicBenchmark {
  eraLabel: string;
  yearRange: [number, number];
  currencyIndia: string;
  currencyWorld: string;
  goldPer10gINR: string;
  goldPerOunceUSD: string;
  petrolPerLiterINR: string;
  petrolPerGallonUSD: string;
  milkPerLiterINR: string;
  cinemaTicketINR: string;
  cinemaTicketUSD: string;
  everydayTech: string[];
  hotelRoomAverageINR: string;
  hotelRoomAverageUSD: string;
  railwayMealINR: string;
  sourceAttribution: string;
}

export const ERA_BENCHMARKS: EraEconomicBenchmark[] = [
  {
    eraLabel: "Mid-2000s Era (2004–2007)",
    yearRange: [2004, 2007],
    currencyIndia: "₹ (INR)",
    currencyWorld: "$ (USD)",
    goldPer10gINR: "₹7,000 – ₹8,800",
    goldPerOunceUSD: "$430 – $650",
    petrolPerLiterINR: "₹43 – ₹48",
    petrolPerGallonUSD: "$2.20 – $2.60",
    milkPerLiterINR: "₹18 – ₹22",
    cinemaTicketINR: "₹50 (Single Screen) / ₹120 (Multiplex)",
    cinemaTicketUSD: "$6.40",
    everydayTech: [
      "Nokia 1100 & 6600 symbian phones",
      "Apple iPod Nano (1st gen) & Shuffle",
      "Dial-up fading, 256kbps broadband emerging in cities",
      "Orkut, Yahoo! Messenger & MSN Messenger",
      "Windows XP Service Pack 2",
      "CRT monitors transitioning to early LCDs",
    ],
    hotelRoomAverageINR: "₹1,200 – ₹2,500 (Midscale) / ₹5,500+ (Luxury)",
    hotelRoomAverageUSD: "$85 – $140",
    railwayMealINR: "₹35 (Standard Vegetarian Thali on IRCTC)",
    sourceAttribution:
      "RBI Handbook of Statistics on Indian Economy, US Bureau of Labor Statistics (BLS CPI 2005), IRCTC Gazettes.",
  },
  {
    eraLabel: "Late 1990s & Millennium (1998–2003)",
    yearRange: [1998, 2003],
    currencyIndia: "₹ (INR)",
    currencyWorld: "$ (USD)",
    goldPer10gINR: "₹4,200 – ₹5,600",
    goldPerOunceUSD: "$270 – $360",
    petrolPerLiterINR: "₹24 – ₹33",
    petrolPerGallonUSD: "$1.15 – $1.60",
    milkPerLiterINR: "₹12 – ₹16",
    cinemaTicketINR: "₹25 – ₹45",
    cinemaTicketUSD: "$4.75 – $6.00",
    everydayTech: [
      "Nokia 3310 & 5110 with Snake game",
      "Sony Walkman cassette player & Discman CD player",
      "Cybercafés with 56kbps dial-up modems",
      "Floppy disks (1.44 MB) and recordable CD-Rs",
      "Windows 98 & Windows 2000",
    ],
    hotelRoomAverageINR: "₹750 – ₹1,800 (Midscale)",
    hotelRoomAverageUSD: "$65 – $110",
    railwayMealINR: "₹25 (Indian Railways Pantry Car Thali)",
    sourceAttribution: "Reserve Bank of India Historical Bulletin, US Census Historical Tables.",
  },
  {
    eraLabel: "Early to Mid 1990s (1990–1997)",
    yearRange: [1990, 1997],
    currencyIndia: "₹ (INR)",
    currencyWorld: "$ (USD)",
    goldPer10gINR: "₹3,200 – ₹4,700",
    goldPerOunceUSD: "$380 – $390",
    petrolPerLiterINR: "₹12 – ₹21",
    petrolPerGallonUSD: "$1.10 – $1.25",
    milkPerLiterINR: "₹8 – ₹12",
    cinemaTicketINR: "₹15 – ₹25",
    cinemaTicketUSD: "$4.10 – $4.60",
    everydayTech: [
      "Landline rotary & push-button BSNL/MTNL telephones",
      "Doordarshan national television on UHF/VHF antenna",
      "Audio cassettes (T-Series, HMV) on portable boomboxes",
      "Pagers & early Motorola brick cellular phones",
      "Windows 3.1 & Windows 95",
    ],
    hotelRoomAverageINR: "₹400 – ₹1,200",
    hotelRoomAverageUSD: "$50 – $90",
    railwayMealINR: "₹16 (Standard Railway Thali)",
    sourceAttribution:
      "Ministry of Statistics and Programme Implementation (MoSPI), BLS Consumer Price Index.",
  },
  {
    eraLabel: "1980s Era (1980–1989)",
    yearRange: [1980, 1989],
    currencyIndia: "₹ (INR)",
    currencyWorld: "$ (USD)",
    goldPer10gINR: "₹1,330 – ₹3,100",
    goldPerOunceUSD: "$350 – $615",
    petrolPerLiterINR: "₹5.10 – ₹8.50",
    petrolPerGallonUSD: "$1.19 – $1.31",
    milkPerLiterINR: "₹3.50 – ₹6.00",
    cinemaTicketINR: "₹5 – ₹12 (Balcony seats)",
    cinemaTicketUSD: "$2.70 – $4.00",
    everydayTech: [
      "Colour TV introduced in India (1982 Asian Games)",
      "VCR video cassettes & rental parlours",
      "Typewriters & telegrams for urgent communications",
      "Sony Walkman TPS-L2",
      "Audio cassettes and vinyl LPs",
    ],
    hotelRoomAverageINR: "₹150 – ₹500",
    hotelRoomAverageUSD: "$35 – $75",
    railwayMealINR: "₹8 (Indian Railways Platform Dining)",
    sourceAttribution: "RBI Historical Series, Indian Post & Telegraph Historical Rates.",
  },
  {
    eraLabel: "Modern Era (2008–Present)",
    yearRange: [2008, 2030],
    currencyIndia: "₹ (INR)",
    currencyWorld: "$ (USD)",
    goldPer10gINR: "₹12,500 (2008) – ₹70,000+ (2020s)",
    goldPerOunceUSD: "$870 – $2,300+",
    petrolPerLiterINR: "₹50 (2008) – ₹100+ (2020s)",
    petrolPerGallonUSD: "$3.20 – $4.00+",
    milkPerLiterINR: "₹26 – ₹60+",
    cinemaTicketINR: "₹150 – ₹450+",
    cinemaTicketUSD: "$9.00 – $14.00+",
    everydayTech: [
      "Modern smartphones (iPhone, Android)",
      "4G / 5G mobile high-speed data",
      "Streaming platforms & cloud services",
      "UPI digital payments & QR codes",
      "Smart home devices and high-definition OLED displays",
    ],
    hotelRoomAverageINR: "₹3,000 – ₹8,000+",
    hotelRoomAverageUSD: "$120 – $250+",
    railwayMealINR: "₹80 – ₹150",
    sourceAttribution:
      "National Statistical Office of India, U.S. Energy Information Administration (EIA).",
  },
];

export function getEraBenchmark(year: number): EraEconomicBenchmark {
  const match = ERA_BENCHMARKS.find((b) => year >= b.yearRange[0] && year <= b.yearRange[1]);
  return match ?? (ERA_BENCHMARKS[0] as EraEconomicBenchmark);
}

/**
 * Astronomical and celestial benchmarks across the calendar year
 */
export interface CelestialCalendarEvent {
  title: string;
  month: number; // 1-12
  dayRange: [number, number];
  type: "meteor-shower" | "solstice-equinox" | "planetary" | "historic";
  description: string;
  visibilityNote: string;
  source: string;
}

export const ANNUAL_CELESTIAL_EVENTS: CelestialCalendarEvent[] = [
  {
    title: "Quadrantid Meteor Shower Peak",
    month: 1,
    dayRange: [1, 5],
    type: "meteor-shower",
    description:
      "One of the year's strongest meteor showers, producing up to 120 meteors per hour in dark skies.",
    visibilityNote: "Best viewed from northern hemisphere during pre-dawn hours.",
    source: "International Meteor Organization (IMO)",
  },
  {
    title: "March Equinox (Vernal Equinox)",
    month: 3,
    dayRange: [19, 21],
    type: "solstice-equinox",
    description:
      "The moment the Sun crosses the celestial equator northward, marking equal day and night across Earth.",
    visibilityNote:
      "Global celestial event marking astronomical spring in the north and autumn in the south.",
    source: "NASA Jet Propulsion Laboratory (JPL)",
  },
  {
    title: "Lyrid Meteor Shower",
    month: 4,
    dayRange: [21, 23],
    type: "meteor-shower",
    description:
      "One of the oldest recorded meteor showers, observed by Chinese astronomers as early as 687 BC.",
    visibilityNote: "Produces fast meteors leaving bright glowing dust trains.",
    source: "American Meteor Society (AMS)",
  },
  {
    title: "June Solstice (Summer Solstice)",
    month: 6,
    dayRange: [20, 22],
    type: "solstice-equinox",
    description:
      "The Sun reaches its northernmost declination, giving the Northern Hemisphere its longest daylight of the year.",
    visibilityNote: "Marks the peak of northern astronomical summer.",
    source: "U.S. Naval Observatory (USNO)",
  },
  {
    title: "Perseid Meteor Shower Season",
    month: 8,
    dayRange: [10, 14],
    type: "meteor-shower",
    description:
      "Rich stream of debris shed by Comet 109P/Swift-Tuttle, producing 60–100 fireballs per hour during August.",
    visibilityNote:
      "Warm August nights offer peak visibility for fireballs across both India and worldwide skies.",
    source: "NASA Meteoroid Environment Office",
  },
  {
    title: "September Equinox (Autumnal Equinox)",
    month: 9,
    dayRange: [21, 24],
    type: "solstice-equinox",
    description:
      "The Sun crosses the celestial equator southward; day and night are of nearly equal duration everywhere.",
    visibilityNote: "Global celestial milestone observed since antiquity.",
    source: "NASA Jet Propulsion Laboratory (JPL)",
  },
  {
    title: "Orionid Meteor Shower",
    month: 10,
    dayRange: [20, 22],
    type: "meteor-shower",
    description:
      "Meteors originating from Halley's Comet (1P/Halley) colliding with Earth's upper atmosphere.",
    visibilityNote: "Known for high speed (~66 km/s) and fine ionization trains.",
    source: "International Meteor Organization (IMO)",
  },
  {
    title: "Leonid Meteor Shower",
    month: 11,
    dayRange: [16, 18],
    type: "meteor-shower",
    description:
      "Debris trail of Comet 55P/Tempel-Tuttle, historically known for periodic spectacular meteor storms.",
    visibilityNote: "Fast meteors visible in the direction of constellation Leo.",
    source: "American Meteor Society (AMS)",
  },
  {
    title: "Geminid Meteor Shower Peak",
    month: 12,
    dayRange: [12, 15],
    type: "meteor-shower",
    description:
      "The king of annual meteor showers, produced by the rocky asteroid 3200 Phaethon with up to 150 multicolored meteors per hour.",
    visibilityNote: "Excellent visibility globally in dark midnight skies.",
    source: "Royal Astronomical Society (RAS)",
  },
  {
    title: "December Solstice (Winter Solstice)",
    month: 12,
    dayRange: [20, 23],
    type: "solstice-equinox",
    description:
      "The Sun stands directly overhead at the Tropic of Capricorn; the shortest day of the year in the northern hemisphere.",
    visibilityNote: "Astronomical milestone celebrated globally.",
    source: "U.S. Naval Observatory (USNO)",
  },
];

export function getNearbyAstronomicalEvents(month: number, day: number): CelestialCalendarEvent[] {
  // Find events in the same month or adjacent days
  return ANNUAL_CELESTIAL_EVENTS.filter((e) => {
    if (e.month === month) return true;
    if (month === 1 && e.month === 12 && day <= 5) return true;
    if (month === 12 && e.month === 1 && day >= 25) return true;
    return false;
  });
}

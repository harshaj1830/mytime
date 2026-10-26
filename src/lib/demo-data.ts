/**
 * Sample content for the frontend demo. Every item exported here must be
 * presented in the UI with an explicit "demo / illustrative" label.
 * Replace these with real API responses once a backend is connected.
 */

export interface ArchiveEntry {
  id: string;
  publication: string;
  editionDate: string;
  city: string;
  language: string;
  headline: string;
  source: string;
  availability: string;
}

export const SAMPLE_ARCHIVE_ENTRIES: ArchiveEntry[] = [
  {
    id: "evening-ledger-sample",
    publication: "The Evening Ledger",
    editionDate: "17 November 1985",
    city: "Bengaluru, India",
    language: "English",
    headline: "Evening rains bring quiet relief to the old quarter",
    source: "Illustrative sample record",
    availability: "Illustrative preview",
  },
  {
    id: "coastal-herald-sample",
    publication: "The Coastal Herald",
    editionDate: "17 November 1985",
    city: "Vijayawada, India",
    language: "Telugu",
    headline: "నగరంలో శీతాకాల ఉదయం — చల్లని గాలులతో కొత్త రోజు",
    source: "Illustrative sample record",
    availability: "Illustrative preview",
  },
  {
    id: "continental-post-sample",
    publication: "The Continental Post",
    editionDate: "17 November 1985",
    city: "London, United Kingdom",
    language: "English",
    headline: "A calm morning across the city as the season turns",
    source: "Illustrative sample record",
    availability: "Illustrative preview",
  },
];

export const DEMO_NARRATIVE =
  "It was a season of ordinary wonders. Shops opened their shutters to a cool morning; radio sets carried the same songs into kitchens and bus stands; somewhere beyond the city lights, the moon kept its slow appointment with the sky. Into this ordinary, extraordinary world, you arrived.";

export const DEMO_HEADLINE = {
  title: "A quiet morning across the old quarter as the season turns",
  context:
    "Sample summary: regional papers of the day favored stories of civic life — new transport routes, monsoon aftermaths and festival preparations. This illustrative entry shows how a verified headline and context note will appear once live archive data is connected.",
  source: "Illustrative sample — The Evening Ledger, 17 November 1985",
};

export const DEMO_CULTURE = {
  highlight:
    "A landmark science-fiction adventure dominated cinema conversations this season, while a synth-led pop sound filled the airwaves.",
  songOfTheWeek: "Synth-pop anthem — illustrative sample entry",
  films:
    "A era-defining adventure film and a family favourite led the box office — illustrative sample entry",
  source: "Source citation placeholder — to be connected to verified cultural records",
};

export const DEMO_WEATHER = {
  temperature: "24°C",
  conditions: "Partly cloudy, mild evening",
  wind: "9 km/h, north-easterly",
  precipitation: "0 mm recorded",
  location: "Bengaluru, India — 17 November 1985",
};

export const SAMPLE_BIRTH_DATE = "1985-11-17";

export const COUNTRIES = [
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Czechia",
  "Denmark",
  "Egypt",
  "Ethiopia",
  "Finland",
  "France",
  "Germany",
  "Ghana",
  "Greece",
  "Hong Kong",
  "Hungary",
  "India",
  "Indonesia",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tanzania",
  "Thailand",
  "Türkiye",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Zimbabwe",
  "Other",
];

export const LANGUAGES = [
  "English",
  "Telugu",
  "Hindi",
  "Tamil",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Bengali",
  "Urdu",
  "Gujarati",
  "Punjabi",
  "Spanish",
  "French",
  "German",
  "Portuguese",
  "Italian",
  "Dutch",
  "Russian",
  "Arabic",
  "Chinese",
  "Japanese",
  "Korean",
  "Other",
];

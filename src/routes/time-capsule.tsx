import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Compass, Globe, Sparkles } from "lucide-react";
import {
  useBirthDetails,
  setBirthDetails,
  isValidBirthDetails,
  type BirthDetails,
  type TimeAccuracy,
} from "@/lib/birth-details";
import { formatLongDate, formatWeekday, parseISODate } from "@/lib/calculations";
import { MoonDisc, MoonPhaseCard, moonPhase } from "@/components/site/MoonPhase";
import { StarField } from "@/components/site/StarField";
import { btnGold, btnGhost } from "@/components/site/ui";
import { CapsuleNav, type RegionalScope } from "@/components/capsule/CapsuleNav";
import { LifeNumbersSection } from "@/components/capsule/LifeNumbersSection";
import { AstronomySection } from "@/components/capsule/AstronomySection";
import { WorldTimelineSection } from "@/components/capsule/WorldTimelineSection";
import { HeadlinesSection } from "@/components/capsule/HeadlinesSection";
import { NewspaperArchiveSection } from "@/components/capsule/NewspaperArchiveSection";
import { WeatherSection } from "@/components/capsule/WeatherSection";
import { EverydayLifeSection } from "@/components/capsule/EverydayLifeSection";
import { CompanionsSection } from "@/components/capsule/CompanionsSection";
import { EntertainmentSection } from "@/components/capsule/EntertainmentSection";
import { EraHighlightsSection } from "@/components/capsule/EraHighlightsSection";
import { KeepsakeCertificate } from "@/components/capsule/KeepsakeCertificate";
import { DataSourcesPanel } from "@/components/capsule/DataSourcesPanel";
import {
  getHistoricalEnrichmentServerFn,
  getCuratedHistoricalData,
  type HistoricalCapsulePayload,
  type UnifiedTimeCapsulePayload,
} from "@/lib/historical-api";

export const Route = createFileRoute("/time-capsule")({
  validateSearch: (search: Record<string, unknown>): Partial<BirthDetails> => {
    return {
      date: typeof search.date === "string" ? search.date : undefined,
      city: typeof search.city === "string" ? search.city : undefined,
      country: typeof search.country === "string" ? search.country : undefined,
      name: typeof search.name === "string" ? search.name : undefined,
      time: typeof search.time === "string" ? search.time : undefined,
      accuracy:
        search.accuracy === "exact" ||
        search.accuracy === "approximate" ||
        search.accuracy === "unknown"
          ? (search.accuracy as TimeAccuracy)
          : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Your Time Capsule — A Day in Time" },
      {
        name: "description",
        content:
          "Open your personal time capsule — the skies, headlines, weather, prices and culture of the day you were born.",
      },
      { property: "og:title", content: "Your Time Capsule — A Day in Time" },
      {
        property: "og:description",
        content:
          "Open your personal time capsule — the world that welcomed you, in one comprehensive dossier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TimeCapsulePage,
});

function TimeCapsulePage() {
  const search = Route.useSearch();
  const sessionDetails = useBirthDetails();
  const [scope, setScope] = useState<RegionalScope>("all");

  // Compute active details: prioritize valid URL search params, fall back to valid session store
  const details: BirthDetails | null = useMemo(() => {
    if (search.date && search.city && search.country) {
      const candidate: BirthDetails = {
        name: search.name ?? "",
        date: search.date,
        country: search.country,
        city: search.city,
        time: search.time ?? "",
        accuracy: search.accuracy ?? "exact",
      };
      if (isValidBirthDetails(candidate)) return candidate;
    }
    if (sessionDetails && isValidBirthDetails(sessionDetails)) {
      return sessionDetails;
    }
    return null;
  }, [search, sessionDetails]);

  // Synchronize URL search params to session storage if not already cached
  useEffect(() => {
    if (details && !sessionDetails) {
      setBirthDetails(details);
    }
  }, [details, sessionDetails]);

  // Parse birth date
  const birthDate = useMemo(() => {
    return details ? parseISODate(details.date) : new Date(Date.UTC(2005, 7, 30, 12, 0, 0));
  }, [details]);

  // Capsule historical data state
  const [capsuleData, setCapsuleData] = useState<
    HistoricalCapsulePayload & Partial<UnifiedTimeCapsulePayload>
  >(() => {
    const y = birthDate.getUTCFullYear();
    const m = birthDate.getUTCMonth() + 1;
    const d = birthDate.getUTCDate();
    const c = details?.city || "Visakhapatnam";
    const co = details?.country || "India";
    return getCuratedHistoricalData(y, m, d, c, co);
  });

  // Fetch enriched historical data (with multi-source unified collector)
  useEffect(() => {
    if (!details) return;

    let isMounted = true;
    const y = birthDate.getUTCFullYear();
    const m = birthDate.getUTCMonth() + 1;
    const d = birthDate.getUTCDate();

    // Set curated data immediately
    setCapsuleData(getCuratedHistoricalData(y, m, d, details.city, details.country));

    async function enrich() {
      try {
        const enriched = await getHistoricalEnrichmentServerFn({
          data: {
            dateISO: details!.date,
            date: details!.date,
            city: details!.city,
            country: details!.country,
            birthTime: details!.time,
          },
        });
        if (isMounted && enriched) {
          setCapsuleData(enriched as unknown as HistoricalCapsulePayload & Partial<UnifiedTimeCapsulePayload>);
        }
      } catch (err) {
        console.warn("Server enrichment unavailable, curated archive retained:", err);
      }
    }

    enrich();

    return () => {
      isMounted = false;
    };
  }, [details, birthDate]);

  if (!details || !isValidBirthDetails(details)) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <StarField density={60} className="opacity-50" />
        <div className="panel-gold relative max-w-md rounded-2xl p-8 text-center">
          <MoonDisc fraction={0.3} size={96} glow className="mx-auto" />
          <h1 className="mt-6 font-display text-2xl font-semibold text-foreground">
            Your capsule is still sealed
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Share your birth date and place to assemble your comprehensive time capsule dossier.
          </p>
          <Link
            to="/"
            hash="birth-form"
            className={`${btnGold} mt-6 w-full py-3 text-sm font-semibold`}
          >
            Enter birth details
          </Link>
        </div>
      </div>
    );
  }

  const phase = moonPhase(birthDate);

  const handlePrint = () => {
    document.body.classList.add("printing-keepsake");
    window.print();
    window.setTimeout(() => {
      document.body.classList.remove("printing-keepsake");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold/30 selection:text-foreground">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-gold/15">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(11,23,48,0.95) 0%, transparent 75%)",
          }}
        />
        <StarField density={90} className="opacity-75" />

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-28 text-center sm:px-6">
          <p className="eyebrow">Your time capsule</p>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {formatWeekday(details.date)},<br />
            <span className="gold-text italic">{formatLongDate(details.date)}</span>
          </h1>

          <p className="mt-5 text-sm text-silver">
            {details.name ? `${details.name} · ` : ""}
            {details.city}, {details.country}
            {details.time ? ` · ${details.time}` : " · birth time unknown"}
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
            The earth made another complete revolution upon its axis, and your lifelong voyage
            commenced. Here is the world as it existed at the moment of your arrival.
          </p>

          <div className="mt-8 flex justify-center">
            <MoonPhaseCard date={birthDate} />
          </div>
        </div>
      </header>

      {/* Sticky Table of Contents & Scope Navigation */}
      <CapsuleNav
        scope={scope}
        onScopeChange={setScope}
        onPrint={handlePrint}
        cityName={details.city}
        countryName={details.country}
      />

      {/* Main Dossier Content Container */}
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 space-y-20">
        {/* Feature G: Life in Numbers */}
        <LifeNumbersSection
          birthDateISO={details.date}
          birthTime={details.time}
          name={details.name}
        />

        {/* Feature H: The Sky on Your Day */}
        <AstronomySection birthDate={birthDate} birthDateISO={details.date} />

        {/* Feature A: The World on Your Birthday (Timeline) */}
        <WorldTimelineSection
          events={capsuleData.timelineEvents}
          birthDateISO={details.date}
          activeScope={scope}
          onScopeChange={setScope}
        />

        {/* Feature I: Contemporary Broadsheet Headlines */}
        <HeadlinesSection headlines={capsuleData.headlines} activeScope={scope} />

        {/* Feature B: The Newspaper That Welcomed You (Archives) */}
        <NewspaperArchiveSection
          birthDate={birthDate}
          birthDateISO={details.date}
          activeScope={scope}
          city={details.city}
          country={details.country}
          waybackSnapshots={capsuleData.waybackSnapshots}
          internetArchiveDocs={capsuleData.internetArchiveDocs}
        />

        {/* Feature C: Historical Weather at Birthplace */}
        <WeatherSection
          city={details.city}
          country={details.country}
          dateISO={details.date}
          birthTime={details.time}
        />

        {/* Feature D: Everyday Life & Prices */}
        <EverydayLifeSection items={capsuleData.everydayLife} activeScope={scope} />

        {/* Feature E: Birthday Companions */}
        <CompanionsSection
          birthDate={birthDate}
          birthDateISO={details.date}
          activeScope={scope}
          initialCompanions={capsuleData.companions}
        />

        {/* Feature F: Cinema, Music, and Pop Culture */}
        <EntertainmentSection
          items={capsuleData.popCulture}
          activeScope={scope}
          city={details.city}
        />

        {/* Feature J: Era Highlights & Demographics */}
        <EraHighlightsSection
          year={birthDate.getUTCFullYear()}
          yearFacts={capsuleData.yearFacts}
          worldBankStats={capsuleData.worldBankStats}
        />

        {/* Feature: Official Data Sources & Registry */}
        <DataSourcesPanel sources={capsuleData.sourcesHealth} />

        {/* Feature K: Official Keepsake Certificate */}
        <KeepsakeCertificate
          name={details.name}
          birthDateISO={details.date}
          birthDate={birthDate}
          city={details.city}
          country={details.country}
          birthTime={details.time}
          primaryHeadline={capsuleData.headlines[0]?.headline}
        />
      </main>
    </div>
  );
}

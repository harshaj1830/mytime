import React from "react";
import {
  Users2,
  Trophy,
  Cpu,
  Globe2,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  HeartPulse,
  Coins,
  ExternalLink,
} from "lucide-react";
import type { WorldBankIndicatorStats } from "@/lib/data-collector";

interface EraHighlightsProps {
  year: number;
  yearFacts?: {
    worldPopulation: string;
    indiaPopulation: string;
    sportsMilestones: string[];
    scienceMilestones: string[];
    techMilestones: string[];
  };
  worldBankStats?: WorldBankIndicatorStats;
}

export const EraHighlightsSection: React.FC<EraHighlightsProps> = ({
  year,
  yearFacts,
  worldBankStats,
}) => {
  const worldPop =
    worldBankStats?.worldPopulation || yearFacts?.worldPopulation || "~6.5 Billion";
  const countryPop =
    worldBankStats?.countryPopulation || yearFacts?.indiaPopulation || "~1.15 Billion";
  const countryName = worldBankStats?.countryName || "India";

  const sports = yearFacts?.sportsMilestones || [
    "Wimbledon: Roger Federer captured his 3rd consecutive Gentlemen's Singles title.",
    "Cricket: Australia and England contested the historic 2005 Ashes series, renowned as one of the closest in cricket history.",
    "Formula 1: Fernando Alonso became the youngest World Drivers' Champion with Renault.",
  ];

  const science = yearFacts?.scienceMilestones || [
    "NASA's Deep Impact probe successfully collided with Comet Tempel 1, exposing pristine solar system interior matter.",
    "ESA's Huygens probe completed historic landing on Saturn's moon Titan, transmitting surface images from under dense nitrogen clouds.",
    "Mars Reconnaissance Orbiter (MRO) launched to scout Mars topography and water ice.",
  ];

  const tech = yearFacts?.techMilestones || [
    "YouTube was founded in February 2005, revolutionizing global online video sharing.",
    "Google Maps launched in February 2005, transforming digital navigation worldwide.",
    "Nokia 1100 and mobile cellular adoption expanded across Indian towns and cities.",
  ];

  return (
    <section id="section-records" aria-labelledby="era-highlights-heading" className="scroll-mt-24 space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Globe2 className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Official World Bank Demographics &amp; Milestones
          </p>
          <h2
            id="era-highlights-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            The {year} Epoch
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          World Bank Indicators &amp; defining achievements of your birth year
        </p>
      </div>

      {/* Primary Demographic Figures */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="panel-gold rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              World Population in {year}
            </span>
            <Globe2 className="h-4 w-4 text-gold" />
          </div>
          <p className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-champagne">
            {worldPop}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-silver">
            Official World Bank indicator <span className="font-mono text-gold">SP.POP.TOTL</span>{" "}
            measuring all humans sharing the globe when you arrived.
          </p>
        </div>

        <div className="panel-gold rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold">
              {countryName} Population in {year}
            </span>
            <Users2 className="h-4 w-4 text-champagne" />
          </div>
          <p className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gold">
            {countryPop}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-silver">
            Official national demographic census registered with the World Bank Open Data platform.
          </p>
        </div>
      </div>

      {/* Macroeconomic Indicators Grid (World Bank) */}
      {worldBankStats && (
        <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/15 pb-3">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-gold" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                World Bank Economic &amp; Development Indicators ({year})
              </h3>
            </div>
            <a
              href={worldBankStats.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-gold hover:text-champagne transition"
            >
              <span>{worldBankStats.attribution}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="panel-gold rounded-xl p-4">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5 text-champagne" />
                GDP Per Capita
              </span>
              <p className="mt-2 font-display text-xl sm:text-2xl font-bold text-foreground">
                {worldBankStats.gdpPerCapitaUSD || "Historical Series"}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Current US$ output per individual (<span className="font-mono">NY.GDP.PCAP.CD</span>)
              </p>
            </div>

            <div className="panel-gold rounded-xl p-4">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                Annual Inflation Rate
              </span>
              <p className="mt-2 font-display text-xl sm:text-2xl font-bold text-foreground">
                {worldBankStats.inflationRatePct || "Historical Series"}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Consumer Price Index annual change (<span className="font-mono">FP.CPI.TOTL.ZG</span>)
              </p>
            </div>

            <div className="panel-gold rounded-xl p-4">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
                <HeartPulse className="h-3.5 w-3.5 text-rose-400" />
                Life Expectancy
              </span>
              <p className="mt-2 font-display text-xl sm:text-2xl font-bold text-foreground">
                {worldBankStats.lifeExpectancyYears || "Historical Series"}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Life expectancy at birth (<span className="font-mono">SP.DYN.LE00.IN</span>)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Milestones 3-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sports */}
        <div className="panel-gold flex flex-col justify-between rounded-2xl p-6 sm:p-7">
          <div>
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Trophy className="h-4 w-4 text-amber-400" />
              <h3 className="font-display text-lg font-semibold text-foreground">Sports Records</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {sports.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-silver"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-[10px] text-muted-foreground border-t border-border pt-3">
            Source: ICC, Olympic Records, ATP &amp; Sports Reference Archives
          </p>
        </div>

        {/* Science & Exploration */}
        <div className="panel-gold flex flex-col justify-between rounded-2xl p-6 sm:p-7">
          <div>
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Sparkles className="h-4 w-4 text-sky-400" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Science &amp; Cosmos
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {science.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-silver"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-[10px] text-muted-foreground border-t border-border pt-3">
            Source: NASA, ESA, ISRO &amp; Nature Publishing Archives
          </p>
        </div>

        {/* Tech & Computing */}
        <div className="panel-gold flex flex-col justify-between rounded-2xl p-6 sm:p-7">
          <div>
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Cpu className="h-4 w-4 text-emerald-400" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Digital Revolution
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {tech.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-silver"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-[10px] text-muted-foreground border-t border-border pt-3">
            Source: IEEE Computer Society &amp; Internet Historical Archive
          </p>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Moon, Sparkles, Compass, Eye, Info, Calendar } from "lucide-react";
import { moonPhase, MoonDisc } from "@/components/site/MoonPhase";
import { getNearbyAstronomicalEvents, type CelestialCalendarEvent } from "@/lib/historical-data";
import { formatLongDate } from "@/lib/calculations";

interface AstronomySectionProps {
  birthDate: Date;
  birthDateISO: string;
}

export const AstronomySection: React.FC<AstronomySectionProps> = ({ birthDate, birthDateISO }) => {
  const phase = moonPhase(birthDate);
  const month = birthDate.getUTCMonth() + 1;
  const day = birthDate.getUTCDate();

  // Find celestial events active or near this month/day
  const nearbyEvents = getNearbyAstronomicalEvents(month, day);

  // Calculate approximate synodic day (Conway synodic month 29.53 days)
  const synodicDay = Math.round(phase.fraction * 29.53 * 10) / 10;
  const illuminationPct = Math.round(phase.illumination * 100);

  // Direction explanation
  const isWaxing = phase.fraction > 0 && phase.fraction < 0.5;
  const isFullOrNear = phase.fraction >= 0.45 && phase.fraction <= 0.55;
  const isNewOrNear = phase.fraction < 0.05 || phase.fraction > 0.95;

  let illuminationDesc = "";
  if (isNewOrNear) {
    illuminationDesc =
      "The Moon was positioned directly between Earth and the Sun, presenting its unilluminated face to the night sky.";
  } else if (isFullOrNear) {
    illuminationDesc =
      "The lunar disk stood in direct solar opposition, illuminating the terrestrial hemisphere in brilliant silvery radiance.";
  } else if (isWaxing) {
    illuminationDesc =
      "The lunar crescent was growing day by day as the illuminated surface expanded toward full culmination.";
  } else {
    illuminationDesc =
      "The lunar disk was waning as the shadow crept eastward across the craters and maria of the Moon.";
  }

  return (
    <section id="section-sky" aria-labelledby="astronomy-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Moon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Celestial Canopy
          </p>
          <h2
            id="astronomy-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            The Sky on Your Day
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Calculated astronomical ephemeris for {formatLongDate(birthDateISO)}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Main Lunar Visual & Metrics Card */}
        <div className="panel-gold relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:col-span-2">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex flex-col items-center shrink-0">
              <div className="relative p-3 rounded-full bg-gold/5 border border-gold/20 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                <MoonDisc fraction={phase.fraction} size={130} glow />
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-xs font-semibold text-champagne">
                {phase.name}
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Lunar Phase &amp; Illumination
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                {illuminationPct}% Illuminated
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-silver">{illuminationDesc}</p>

              {/* Data Pills */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Synodic Cycle
                  </p>
                  <p className="mt-0.5 font-display text-lg font-semibold text-foreground">
                    Day {synodicDay}
                    <span className="text-xs text-muted-foreground font-normal"> / 29.5</span>
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Trajectory
                  </p>
                  <p className="mt-0.5 font-display text-lg font-semibold text-champagne">
                    {isWaxing ? "Waxing (Growing)" : "Waning (Shrinking)"}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-muted/40 p-3 col-span-2 sm:col-span-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Methodology
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-silver">Conway Algorithm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-gold/15 bg-gold/5 p-3.5 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 text-gold mt-0.5" aria-hidden="true" />
            <p>
              Note: Lunar phase illumination is calculated using astronomical mean orbit constants
              from standard astronomical ephemeris models. Exact topocentric appearance varies
              slightly with observer latitude.
            </p>
          </div>
        </div>

        {/* Annual Celestial Milestones of the Season */}
        <div className="panel-gold flex flex-col justify-between rounded-2xl p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Celestial Season
              </h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Astronomical events and meteor showers active in this time of year:
            </p>

            <div className="mt-4 space-y-3">
              {nearbyEvents.length > 0 ? (
                nearbyEvents.map((evt, idx) => (
                  <div key={idx} className="rounded-lg border border-border bg-card/60 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-champagne">{evt.title}</span>
                      <span className="text-[10px] text-muted-foreground">
                        Days {evt.dayRange[0]}–{evt.dayRange[1]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-silver leading-relaxed">{evt.description}</p>
                    <p className="mt-1.5 text-[10px] text-gold/80 italic">{evt.visibilityNote}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-border bg-card/60 p-3">
                  <p className="text-xs text-silver">
                    Clear nocturnal view of major northern/southern constellations, with planetary
                    alignments determined by solar system orbital mechanics.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 text-[10px] text-muted-foreground border-t border-border pt-3">
            Source: International Astronomical Union (IAU) &amp; NASA Solar System Exploration.
          </p>
        </div>
      </div>
    </section>
  );
};

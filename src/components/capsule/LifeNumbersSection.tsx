import React, { useState, useEffect } from "react";
import { Clock, Heart, Wind, Compass, Calendar, Moon, Sparkles, Orbit } from "lucide-react";
import { calculateLifeMetrics, formatWhole, type LifeMetrics } from "@/lib/calculations";

interface LifeNumbersSectionProps {
  birthDateISO: string;
  birthTime?: string;
  name?: string;
}

export const LifeNumbersSection: React.FC<LifeNumbersSectionProps> = ({
  birthDateISO,
  birthTime,
  name,
}) => {
  const [metrics, setMetrics] = useState<LifeMetrics>(() =>
    calculateLifeMetrics(birthDateISO, birthTime, new Date()),
  );

  useEffect(() => {
    // Tick every second for live counters
    const timer = setInterval(() => {
      setMetrics(calculateLifeMetrics(birthDateISO, birthTime, new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, [birthDateISO, birthTime]);

  const { exactAge, nextBirthday } = metrics;

  return (
    <section id="section-numbers" aria-labelledby="life-numbers-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Temporal Voyage
          </p>
          <h2
            id="life-numbers-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            Life in Numbers
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Calculated in real-time from your astronomical birth coordinate
        </p>
      </div>

      {/* Primary Highlights: Exact Age & Next Birthday */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Exact Age Card */}
        <div className="panel-gold relative overflow-hidden rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              Chronological Age
            </span>
            <Calendar className="h-4 w-4 text-gold/80" aria-hidden="true" />
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              {exactAge.years}
            </span>
            <span className="text-sm font-medium text-muted-foreground">years,</span>
            <span className="font-display text-3xl font-semibold text-champagne sm:text-4xl">
              {exactAge.months}
            </span>
            <span className="text-sm font-medium text-muted-foreground">months,</span>
            <span className="font-display text-3xl font-semibold text-silver sm:text-4xl">
              {exactAge.days}
            </span>
            <span className="text-sm font-medium text-muted-foreground">days</span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Every rotation of the globe since {new Date(birthDateISO).getUTCFullYear()} has carried{" "}
            {name ? name : "you"} across {metrics.earthOrbits.toFixed(2)} solar revolutions.
          </p>
        </div>

        {/* Next Birthday Countdown */}
        <div className="panel-gold relative overflow-hidden rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Next Birthday Countdown
            </span>
            <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
          </div>
          {nextBirthday.isToday ? (
            <div className="mt-4">
              <p className="font-display text-3xl font-bold text-champagne sm:text-4xl">
                Happy Birthday! 🎉
              </p>
              <p className="mt-2 text-sm text-silver">
                Today is your personal milestone anniversary. Another orbit complete!
              </p>
            </div>
          ) : (
            <>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-champagne sm:text-5xl">
                  {nextBirthday.daysRemaining}
                </span>
                <span className="text-sm font-medium text-muted-foreground">days,</span>
                <span className="font-display text-3xl font-semibold text-silver sm:text-4xl">
                  {nextBirthday.hoursRemaining}
                </span>
                <span className="text-sm font-medium text-muted-foreground">hours,</span>
                <span className="font-display text-3xl font-semibold text-muted-foreground sm:text-4xl">
                  {nextBirthday.minutesRemaining}
                </span>
                <span className="text-sm font-medium text-muted-foreground">mins</span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Target milestone:{" "}
                <span className="text-silver font-medium">{nextBirthday.targetDateStr}</span> (
                {metrics.birthdaysCelebrated + 1}th celebration).
              </p>
            </>
          )}
        </div>
      </div>

      {/* Grid of Micro-Metrics */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="panel-gold rounded-xl p-4 text-center">
          <p className="font-display text-2xl font-bold text-champagne sm:text-3xl">
            {formatWhole(metrics.daysLived)}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Days Lived
          </p>
        </div>

        <div className="panel-gold rounded-xl p-4 text-center">
          <p className="font-display text-2xl font-bold text-silver sm:text-3xl">
            {formatWhole(metrics.weeksLived)}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Weeks Completed
          </p>
        </div>

        <div className="panel-gold rounded-xl p-4 text-center">
          <p className="font-display text-2xl font-bold text-champagne sm:text-3xl">
            {formatWhole(metrics.hoursLived)}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Hours Elapsed
          </p>
        </div>

        <div className="panel-gold rounded-xl p-4 text-center">
          <p className="font-display text-2xl font-bold text-silver sm:text-3xl">
            {formatWhole(metrics.minutesLived)}
          </p>
          <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Minutes Lived
          </p>
        </div>

        <div className="panel-gold relative overflow-hidden rounded-xl p-4 text-center col-span-2 sm:col-span-1 lg:col-span-2">
          <p className="font-mono text-2xl font-bold text-gold sm:text-3xl tracking-tight">
            {formatWhole(metrics.secondsLived)}
          </p>
          <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Seconds Ticking
          </div>
        </div>
      </div>

      {/* Biological & Cosmic Estimations */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Heartbeats */}
        <div className="panel-gold flex items-start gap-3.5 rounded-xl p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Heart className="h-5 w-5 fill-rose-500/30" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Estimated Heartbeats
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              ~{(metrics.heartbeatsEst / 1000000).toFixed(1)}M
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {formatWhole(metrics.heartbeatsEst)} pulses (avg 72 bpm)
            </p>
          </div>
        </div>

        {/* Breaths */}
        <div className="panel-gold flex items-start gap-3.5 rounded-xl p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Wind className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Estimated Breaths
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              ~{(metrics.breathsEst / 1000000).toFixed(1)}M
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {formatWhole(metrics.breathsEst)} cycles (avg 16 bpm)
            </p>
          </div>
        </div>

        {/* Solar System Voyage */}
        <div className="panel-gold flex items-start gap-3.5 rounded-xl p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Orbit className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Cosmic Distance
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              ~{(metrics.orbitalDistanceKm / 1000000000).toFixed(2)}B km
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Earth heliocentric journey (~29.78 km/s)
            </p>
          </div>
        </div>

        {/* Full Moons */}
        <div className="panel-gold flex items-start gap-3.5 rounded-xl p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Moon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Full Moons Observed
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-foreground">
              ~{Math.floor(metrics.fullMoonsWitnessed)}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Across {metrics.fullMoonsWitnessed.toFixed(1)} synodic cycles
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground/80">
        * Biological counts are mathematical approximations based on average human resting
        physiological baselines (72 bpm and 16 bpm). Orbital mechanics use NASA JPL mean planetary
        constants (365.2422 solar days/year).
      </p>
    </section>
  );
};

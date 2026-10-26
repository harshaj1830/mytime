import { createFileRoute, Link } from "@tanstack/react-router";
import { Archive, BookOpenCheck, MoonStar, ScrollText } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { MoonPhaseCard } from "@/components/site/MoonPhase";
import { Reveal } from "@/components/site/Reveal";
import { StarField } from "@/components/site/StarField";
import {
  SectionHeading,
  DemoBadge,
  UnavailableBadge,
  btnGold,
  HashLink,
} from "@/components/site/ui";
import { SAMPLE_ARCHIVE_ENTRIES, DEMO_NARRATIVE, SAMPLE_BIRTH_DATE } from "@/lib/demo-data";
import { formatLongDate, parseISODate } from "@/lib/calculations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Day in Time — Discover the world that welcomed you" },
      {
        name: "description",
        content:
          "One date. One place. An entire world of stories. Explore a personal time capsule of the day you were born.",
      },
      { property: "og:title", content: "A Day in Time — Discover the world that welcomed you" },
      {
        property: "og:description",
        content: "A personal time capsule of your birth day — skies, headlines, music and weather.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    icon: ScrollText,
    title: "Share your birth details",
    body: "Your date and birthplace are all it takes. Birth time is optional — the capsule works without it.",
  },
  {
    icon: MoonStar,
    title: "We assemble your capsule",
    body: "The moon overhead, the day's headlines, the weather, the music — gathered and labelled with care.",
  },
  {
    icon: BookOpenCheck,
    title: "Explore, keep and share",
    body: "Read the story of your day, then print a keepsake certificate to keep or gift.",
  },
] as const;

function Index() {
  return (
    <div>
      <Hero />

      {/* How it works */}
      <section id="how-it-works" className="relative border-t border-gold/10">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps into the past"
            subtitle="No account, no clutter. Just the day you arrived, assembled with care."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <article className="panel-gold relative h-full rounded-xl p-7">
                  <span className="absolute right-6 top-6 font-display text-4xl font-semibold text-gold/15">
                    {i + 1}
                  </span>
                  <step.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Glimpse inside the capsule */}
      <section id="discover" className="relative overflow-hidden border-t border-gold/10">
        <StarField density={40} className="opacity-30" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <p className="eyebrow">A glimpse inside</p>
                  <DemoBadge />
                </div>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  What your capsule holds
                </h2>
                <p className="mt-5 font-display text-xl italic leading-relaxed text-silver">
                  {DEMO_NARRATIVE}
                </p>
                <div className="mt-8 flex items-center gap-6">
                  <MoonPhaseCard date={parseISODate(SAMPLE_BIRTH_DATE)} />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Shown for the sample date {formatLongDate(SAMPLE_BIRTH_DATE)} — your capsule uses
                  your own date.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-4">
                {SAMPLE_ARCHIVE_ENTRIES.map((entry) => (
                  <article key={entry.id} className="panel-gold rounded-xl p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-champagne">
                        {entry.publication}
                      </p>
                      <p className="text-xs text-muted-foreground">{entry.editionDate}</p>
                    </div>
                    <p className="mt-3 font-display text-lg font-medium leading-snug text-foreground">
                      {entry.headline}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {entry.city} · {entry.language}
                    </p>
                  </article>
                ))}
                <p className="text-center text-xs text-muted-foreground/80">
                  <UnavailableBadge label="Illustrative sample records" />
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-14 text-center">
              <HashLink to="/" hash="birth-form" className={btnGold}>
                <Archive className="h-4 w-4" aria-hidden="true" />
                Assemble my capsule
              </HashLink>
              <p className="mt-4 text-xs text-muted-foreground">
                Prefer to browse first?{" "}
                <Link
                  to="/archive"
                  className="text-champagne underline decoration-gold/40 underline-offset-4 hover:text-gold"
                >
                  Visit the archive
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden border-t border-gold/10">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(11,23,48,0.9) 0%, transparent 70%)",
          }}
        />
        <StarField density={70} className="opacity-60" />
        <div className="relative mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
          <Reveal>
            <p className="eyebrow">Begin today</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              The world was already a story.
              <br />
              <span className="gold-text italic">Then you arrived.</span>
            </h2>
            <div className="mt-9">
              <HashLink to="/" hash="birth-form" className={btnGold}>
                Discover My Day
              </HashLink>
            </div>
            <p className="mt-6 text-xs text-muted-foreground/80">
              Your birth details stay in this browser session. No account required.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

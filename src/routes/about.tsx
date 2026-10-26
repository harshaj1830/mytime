import { createFileRoute, Link } from "@tanstack/react-router";
import { MoonDisc } from "@/components/site/MoonPhase";
import { Reveal } from "@/components/site/Reveal";
import { StarField } from "@/components/site/StarField";
import { SectionHeading, btnGold, btnGhost } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — A Day in Time" },
      {
        name: "description",
        content:
          "Why we built a personal time capsule — the story behind A Day in Time and the care we give every record.",
      },
      { property: "og:title", content: "Our Story — A Day in Time" },
      {
        property: "og:description",
        content: "The story behind A Day in Time — a personal journey through history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    title: "Grounded in real records",
    body: "Every headline, weather reading and cultural note is meant to trace back to a named source. Where a record isn't verified yet, we say so plainly instead of inventing detail.",
  },
  {
    title: "Estimates, honestly labelled",
    body: "Moon phases, orbits and heartbeats are mathematical estimates. We show the assumption behind every number so you know exactly what it does and doesn't claim.",
  },
  {
    title: "Yours to keep",
    body: "A capsule should outlive the screen it opened on. Print your keepsake certificate, share a page, and return whenever you want to step back into that day.",
  },
] as const;

function AboutPage() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(11,23,48,0.85) 0%, transparent 70%)",
        }}
      />
      <StarField density={50} className="opacity-40" />

      <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-32 sm:px-6">
        <MoonDisc fraction={0.68} size={72} glow className="mx-auto" />
        <SectionHeading
          eyebrow="Our story"
          title="Every birth date holds a world. We help you open it."
          subtitle="A Day in Time began with a simple question: what was the world like on the morning someone we love arrived? The answer deserved more than a trivia list — it deserved a capsule."
        />

        <Reveal>
          <div className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              It started with an old family album: a faded newspaper clipping and a story about a
              cool November morning. We wanted to rebuild that morning properly — the sky, the
              streets, the songs on the radio — and to do it with the care history deserves.
            </p>
            <p>
              So we set a simple bar for ourselves:{" "}
              <span className="text-silver">nothing invented without a label</span>. Verified
              records carry their source. Everything else is an estimate or an illustrative sample,
              marked as one. Trust is the whole product.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <article className="panel-gold h-full rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="eyebrow">Begin your journey</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
              The world was already a story.{" "}
              <span className="gold-text italic">Step into yours.</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/" hash="birth-form" className={btnGold}>
                Explore my birth day
              </Link>
              <Link to="/archive" className={btnGhost}>
                Browse the archive
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

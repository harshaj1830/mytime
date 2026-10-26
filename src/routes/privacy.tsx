import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — A Day in Time" },
      {
        name: "description",
        content: "How A Day in Time handles the birth details you share — plainly and in full.",
      },
      { property: "og:title", content: "Privacy — A Day in Time" },
      {
        property: "og:description",
        content: "How A Day in Time handles the birth details you share.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "What we collect in this demo",
    body: "When you assemble a capsule, the details you enter — name, date of birth, country, city and birth time — stay in your own browser for the current session. Nothing is sent to a server, and closing the tab clears them.",
  },
  {
    title: "What we don't do",
    body: "We don't create accounts in this demo, we don't place advertising or tracking cookies, and we don't sell or share anything you enter, because nothing leaves your device.",
  },
  {
    title: "Estimates and sample data",
    body: "Moon phases, orbital counts and heartbeats are mathematical estimates. Headlines, weather and cultural notes are illustrative samples while verified archive sources are connected — they are not records about you.",
  },
  {
    title: "Your choices",
    body: "You can clear your details at any time by closing the tab or starting a new session. If a full version with accounts launches later, this page will be updated before any data is collected.",
  },
  {
    title: "Contact",
    body: "Questions about privacy? We answer every message personally — reach us from the contact page.",
  },
] as const;

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
      <p className="eyebrow">Privacy</p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-foreground sm:text-5xl">
        Plain words about your details
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: October 2026 · This policy covers the demonstration build of A Day in Time.
      </p>

      <div className="mt-12 space-y-5">
        {SECTIONS.map((s, i) => (
          <section key={s.title} className="panel-gold rounded-xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-foreground">
              <span className="mr-3 text-champagne">{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/contact"
          className="text-sm text-champagne underline decoration-gold/40 underline-offset-4 hover:text-gold"
        >
          Go to the contact page →
        </Link>
      </div>
    </div>
  );
}

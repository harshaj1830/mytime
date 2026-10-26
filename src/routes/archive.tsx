import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading, DemoBadge, UnavailableBadge } from "@/components/site/ui";
import { SAMPLE_ARCHIVE_ENTRIES, LANGUAGES } from "@/lib/demo-data";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "The Archive — A Day in Time" },
      {
        name: "description",
        content:
          "Browse newspaper editions from the day you were born — searchable sample records from the archive.",
      },
      { property: "og:title", content: "The Archive — A Day in Time" },
      {
        property: "og:description",
        content: "Browse newspaper editions from the day you were born.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArchivePage,
});

function ArchivePage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_ARCHIVE_ENTRIES.filter((e) => {
      const matchesLanguage = language === "all" || e.language === language;
      const matchesQuery =
        q === "" ||
        e.publication.toLowerCase().includes(q) ||
        e.headline.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q);
      return matchesLanguage && matchesQuery;
    });
  }, [query, language]);

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(11,23,48,0.8) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-32 sm:px-6">
        <SectionHeading
          eyebrow="The archive"
          title="Editions from the day you arrived"
          subtitle="Search a growing catalogue of newspapers by publication, headline and city. Every record below is illustrative sample data while live archives are connected."
          className="mx-auto text-center"
        />

        <Reveal>
          <div className="panel-gold mt-10 rounded-xl p-4 sm:p-5" role="search">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search publications, headlines, cities…"
                  aria-label="Search the archive"
                  className="w-full rounded-md border border-input bg-muted/50 py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/50"
                />
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                aria-label="Filter by language"
                className="rounded-md border border-input bg-muted/50 px-3 py-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/50 [&>option]:bg-popover [&>option]:text-foreground"
              >
                <option value="all">All languages</option>
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {results.length} {results.length === 1 ? "record" : "records"} found
          </p>
          <DemoBadge />
        </div>

        {results.length === 0 ? (
          <div className="panel-gold mt-4 rounded-xl p-10 text-center">
            <p className="font-display text-xl text-foreground">No records match your search</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different word, or clear the language filter.
            </p>
          </div>
        ) : (
          <ul className="mt-4 space-y-4">
            {results.map((entry) => (
              <li key={entry.id}>
                <Reveal>
                  <article className="panel-gold rounded-xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-champagne">
                        {entry.publication}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {entry.editionDate} · {entry.language}
                      </p>
                    </div>
                    <p className="mt-4 font-display text-2xl font-medium leading-snug text-foreground">
                      {entry.headline}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <p className="text-xs text-silver">{entry.city}</p>
                      <UnavailableBadge label={entry.availability} />
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground/80">Source: {entry.source}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

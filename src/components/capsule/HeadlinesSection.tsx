import React from "react";
import { Newspaper, ExternalLink, ShieldCheck, Bookmark, FileText } from "lucide-react";
import type { HeadlineItem } from "@/lib/historical-api";

interface HeadlinesSectionProps {
  headlines: HeadlineItem[];
  activeScope: "all" | "india" | "worldwide";
}

export const HeadlinesSection: React.FC<HeadlinesSectionProps> = ({ headlines, activeScope }) => {
  const filteredHeadlines = headlines.filter((item) => {
    if (activeScope === "india" && item.scope !== "india") return false;
    if (activeScope === "worldwide" && item.scope !== "worldwide") return false;
    return true;
  });

  return (
    <section id="section-headlines" aria-labelledby="headlines-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Newspaper className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Front-Page Dispatches
          </p>
          <h2
            id="headlines-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            Headlines of the Day
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Contemporary broadsheet reporting from independent news archives
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filteredHeadlines.map((item) => (
          <article
            key={item.id}
            className="panel-gold group flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition hover:border-gold/40"
          >
            <div>
              {/* Publisher & Verification header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-semibold tracking-wider text-champagne uppercase">
                    {item.publisher}
                  </span>
                  <span className="rounded-full border border-border bg-card/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                    {item.scope === "india" ? "🇮🇳 India Edition" : "🌐 World Edition"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Archived Record</span>
                </div>
              </div>

              {/* Broadsheet Headline */}
              <h3 className="mt-4 font-serif text-xl sm:text-2xl font-bold leading-snug text-foreground group-hover:text-gold transition">
                “{item.headline}”
              </h3>

              {/* Context Summary */}
              <p className="mt-3 text-sm leading-relaxed text-silver">{item.summary}</p>
            </div>

            {/* Bottom link to verified archive query */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs">
              <span className="text-muted-foreground">{item.dateStr}</span>
              <a
                href={item.archiveLink || "https://news.google.com/newspapers"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-gold hover:text-champagne hover:underline transition"
              >
                <span>View archive portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

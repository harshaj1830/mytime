import React, { useState } from "react";
import { Film, Music, Tv, ExternalLink, Sparkles, Disc3 } from "lucide-react";
import type { PopCultureItem } from "@/lib/historical-api";

interface EntertainmentSectionProps {
  items: PopCultureItem[];
  activeScope: "all" | "india" | "worldwide";
  city: string;
}

export const EntertainmentSection: React.FC<EntertainmentSectionProps> = ({
  items,
  activeScope,
  city,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredItems = items.filter((item) => {
    if (activeScope === "india" && item.category === "movie-international") {
      return false;
    }
    if (
      activeScope === "worldwide" &&
      (item.category === "movie-telugu" || item.category === "movie-hindi")
    ) {
      return false;
    }

    if (selectedFilter !== "all" && item.category !== selectedFilter) {
      return false;
    }

    return true;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "movie-telugu":
        return {
          label: "Tollywood (Telugu)",
          icon: <Film className="h-3.5 w-3.5 text-amber-400" />,
        };
      case "movie-hindi":
        return { label: "Bollywood (Hindi)", icon: <Film className="h-3.5 w-3.5 text-rose-400" /> };
      case "movie-international":
        return { label: "Hollywood / Global", icon: <Film className="h-3.5 w-3.5 text-sky-400" /> };
      case "music":
        return {
          label: "Chartbuster Music",
          icon: <Music className="h-3.5 w-3.5 text-emerald-400" />,
        };
      default:
        return { label: "Era Trend / TV", icon: <Tv className="h-3.5 w-3.5 text-indigo-400" /> };
    }
  };

  return (
    <section id="section-culture" aria-labelledby="entertainment-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Film className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Silver Screen &amp; Soundtracks
          </p>
          <h2
            id="entertainment-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            Cinema &amp; Pop Culture
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          What the world and local audiences were watching and listening to
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All Entertainment" },
          { id: "movie-telugu", label: "Telugu Cinema (Tollywood)" },
          { id: "movie-hindi", label: "Hindi Cinema (Bollywood)" },
          { id: "movie-international", label: "Hollywood & Global" },
          { id: "music", label: "Radio & Billboard Hits" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedFilter(tab.id)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              selectedFilter === tab.id
                ? "border-gold/40 bg-gold/20 text-champagne font-medium"
                : "border-border bg-card/40 text-muted-foreground hover:border-gold/20 hover:text-silver"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Culture Items */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const badge = getCategoryBadge(item.category);

          return (
            <article
              key={item.id}
              className="panel-gold group flex flex-col justify-between rounded-2xl p-6 transition hover:border-gold/35"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-1.5">
                    {badge.icon}
                    <span className="text-xs font-semibold text-champagne">{badge.label}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{item.releaseDateOrEra}</span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold text-foreground group-hover:text-gold transition">
                  {item.title}
                </h3>

                {item.highlightNote && (
                  <p className="mt-1 text-xs font-medium text-emerald-400">{item.highlightNote}</p>
                )}

                <p className="mt-3 text-xs leading-relaxed text-silver">{item.description}</p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
                <span>{item.sourceName}</span>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gold hover:text-champagne hover:underline"
                  >
                    <span>Archive ref</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

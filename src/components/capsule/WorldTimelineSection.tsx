import React, { useState, useMemo } from "react";
import {
  Globe,
  Flag,
  Atom,
  Trophy,
  Landmark,
  ExternalLink,
  Calendar,
  Sparkles,
  Filter,
} from "lucide-react";
import type { TimelineEvent } from "@/lib/historical-api";
import { formatLongDate } from "@/lib/calculations";

interface WorldTimelineSectionProps {
  events: TimelineEvent[];
  birthDateISO: string;
  activeScope: "all" | "india" | "worldwide";
  onScopeChange?: (scope: "all" | "india" | "worldwide") => void;
}

export const WorldTimelineSection: React.FC<WorldTimelineSectionProps> = ({
  events,
  birthDateISO,
  activeScope,
  onScopeChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Scope filter
      if (activeScope === "india" && evt.scope !== "india" && evt.scope !== "regional") {
        return false;
      }
      if (activeScope === "worldwide" && evt.scope !== "worldwide") {
        return false;
      }

      // Category filter
      if (selectedCategory !== "all" && evt.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [events, activeScope, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "politics":
        return <Landmark className="h-4 w-4 text-amber-400" />;
      case "science-tech":
        return <Atom className="h-4 w-4 text-sky-400" />;
      case "culture-sports":
        return <Trophy className="h-4 w-4 text-emerald-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-gold" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "politics":
        return "Politics & Governance";
      case "science-tech":
        return "Science & Technology";
      case "culture-sports":
        return "Culture & Sports";
      default:
        return "Historic Milestone";
    }
  };

  return (
    <section id="section-timeline" aria-labelledby="timeline-heading" className="scroll-mt-24">
      {/* Header with Title and Filters */}
      <div className="flex flex-col gap-4 border-b border-gold/15 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Global Chronicle
          </p>
          <h2
            id="timeline-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            The World on Your Birthday
          </h2>
        </div>

        {/* Scope and Category Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {onScopeChange && (
            <div className="flex rounded-lg border border-gold/25 bg-gold/10 p-1">
              <button
                type="button"
                onClick={() => onScopeChange("all")}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                  activeScope === "all"
                    ? "bg-gold text-background shadow-sm"
                    : "text-silver hover:text-champagne"
                }`}
              >
                All Regions
              </button>
              <button
                type="button"
                onClick={() => onScopeChange("india")}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                  activeScope === "india"
                    ? "bg-gold text-background shadow-sm"
                    : "text-silver hover:text-champagne"
                }`}
              >
                🇮🇳 India
              </button>
              <button
                type="button"
                onClick={() => onScopeChange("worldwide")}
                className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
                  activeScope === "worldwide"
                    ? "bg-gold text-background shadow-sm"
                    : "text-silver hover:text-champagne"
                }`}
              >
                🌐 Worldwide
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1 mr-1">
          <Filter className="h-3.5 w-3.5" />
          Filter:
        </span>
        {[
          { id: "all", label: "All Categories" },
          { id: "politics", label: "Politics" },
          { id: "science-tech", label: "Science & Tech" },
          { id: "culture-sports", label: "Culture & Sports" },
          { id: "milestone", label: "Milestones" },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              selectedCategory === cat.id
                ? "border-gold/40 bg-gold/20 text-champagne font-medium"
                : "border-border bg-card/40 text-muted-foreground hover:border-gold/20 hover:text-silver"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="mt-8 relative">
        {/* Vertical decorative line for timeline */}
        <div
          className="absolute left-4 top-3 bottom-3 w-px bg-gradient-to-b from-gold/30 via-gold/15 to-transparent sm:left-6"
          aria-hidden="true"
        />

        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evt, idx) => (
              <div key={evt.id || idx} className="relative pl-10 sm:pl-14">
                {/* Timeline node icon */}
                <div className="absolute left-2 top-4 -translate-x-1/2 rounded-full border border-gold/40 bg-background p-1.5 shadow-[0_0_12px_rgba(212,175,55,0.2)] sm:left-4">
                  {getCategoryIcon(evt.category)}
                </div>

                {/* Event Card */}
                <article className="panel-gold group rounded-2xl p-5 sm:p-7 transition hover:border-gold/35">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-champagne">
                        {evt.dateStr || formatLongDate(birthDateISO)}
                      </span>
                      {evt.isExactDate && (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                          Exact Day
                        </span>
                      )}
                      <span className="rounded-full border border-border bg-card/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                        {evt.scope === "india"
                          ? "🇮🇳 India"
                          : evt.scope === "regional"
                            ? "📍 Regional"
                            : "🌐 Global"}
                      </span>
                    </div>

                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      {getCategoryLabel(evt.category)}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground group-hover:text-champagne transition">
                    {evt.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-silver">{evt.summary}</p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground">
                      Source: <span className="text-silver font-medium">{evt.sourceName}</span>
                    </span>
                    {evt.sourceUrl && (
                      <a
                        href={evt.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-champagne hover:underline transition"
                      >
                        <span>Verified reference</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </article>
              </div>
            ))
          ) : (
            <div className="panel-gold rounded-xl p-8 text-center ml-10">
              <p className="font-display text-lg text-foreground">
                No events found for this filter combination.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  if (onScopeChange) onScopeChange("all");
                }}
                className="mt-3 text-xs text-gold hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

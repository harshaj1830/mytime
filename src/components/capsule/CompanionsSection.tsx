import React, { useEffect, useState } from "react";
import { Users, ExternalLink, Award, Sparkles, BookOpen, Loader2, Star } from "lucide-react";
import { fetchBirthdayCompanions, type BirthdayCompanion } from "@/lib/historical-api";
import { formatLongDate } from "@/lib/calculations";

interface CompanionsSectionProps {
  birthDate: Date;
  birthDateISO: string;
  activeScope: "all" | "india" | "worldwide";
  initialCompanions?: BirthdayCompanion[];
}

export const CompanionsSection: React.FC<CompanionsSectionProps> = ({
  birthDate,
  birthDateISO,
  activeScope,
  initialCompanions,
}) => {
  const [companions, setCompanions] = useState<BirthdayCompanion[]>(
    initialCompanions && initialCompanions.length > 0 ? initialCompanions : [],
  );
  const [loading, setLoading] = useState<boolean>(
    !initialCompanions || initialCompanions.length === 0,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const month = birthDate.getUTCMonth() + 1;
  const day = birthDate.getUTCDate();
  const year = birthDate.getUTCFullYear();

  useEffect(() => {
    if (initialCompanions && initialCompanions.length > 0) {
      setCompanions(initialCompanions);
      setLoading(false);
      return;
    }

    let isCancelled = false;

    async function loadCompanions() {
      setLoading(true);
      try {
        const data = await fetchBirthdayCompanions(month, day, year, birthDateISO);
        if (!isCancelled) {
          setCompanions(data);
        }
      } catch (err) {
        console.warn("Could not load birthday companions:", err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadCompanions();

    return () => {
      isCancelled = true;
    };
  }, [month, day, year, birthDateISO, initialCompanions]);

  const filteredCompanions = companions.filter((comp) => {
    if (activeScope === "india" && comp.nationality !== "Indian") return false;
    if (activeScope === "worldwide" && comp.nationality === "Indian") return false;
    if (selectedCategory !== "all" && comp.category !== selectedCategory) return false;
    return true;
  });

  return (
    <section id="section-companions" aria-labelledby="companions-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Shared Calendar Date &amp; Exact Birthdays
          </p>
          <h2
            id="companions-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            Birthday Companions
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Notable figures from Wikidata &amp; Wikipedia born on{" "}
          {birthDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All Companions" },
          { id: "exact", label: "Exact Day Matches" },
          { id: "science", label: "Science & Discovery" },
          { id: "arts", label: "Arts & Cinema" },
          { id: "politics", label: "Statespersons" },
          { id: "sports", label: "Athletes" },
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

      {loading ? (
        <div className="panel-gold mt-8 flex flex-col items-center justify-center rounded-2xl p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
          <p className="mt-4 font-display text-lg text-foreground">
            Searching biographical archives...
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Querying Wikidata SPARQL &amp; Wikipedia historical birth registers for{" "}
            {birthDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanions
            .filter((comp) => {
              if (selectedCategory === "exact") return comp.exactDateMatch;
              return true;
            })
            .map((comp) => (
              <article
                key={comp.id}
                className={`panel-gold group flex flex-col justify-between rounded-2xl p-6 transition hover:border-gold/40 ${
                  comp.exactDateMatch ? "border-gold/30 bg-gold/5" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                    <span className="font-display text-lg font-bold text-champagne">
                      Born {comp.birthYear}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {comp.exactDateMatch && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold">
                          <Star className="h-2.5 w-2.5 fill-gold" /> Same Day
                        </span>
                      )}
                      <span className="rounded-full border border-border bg-card/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {comp.nationality}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-semibold text-foreground group-hover:text-gold transition">
                    {comp.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-champagne/90">{comp.achievement}</p>

                  <p className="mt-3 text-xs leading-relaxed text-silver line-clamp-4">
                    {comp.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border pt-3">
                  <a
                    href={comp.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-champagne hover:underline transition"
                  >
                    <span>Read on Wikipedia / Wikidata</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </article>
            ))}
        </div>
      )}
    </section>
  );
};

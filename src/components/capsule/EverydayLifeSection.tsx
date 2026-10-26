import React, { useState } from "react";
import { Coins, Utensils, Hotel, Smartphone, Fuel, ShieldCheck, Tag } from "lucide-react";
import type { EverydayLifeItem } from "@/lib/historical-api";

interface EverydayLifeSectionProps {
  items: EverydayLifeItem[];
  activeScope: "all" | "india" | "worldwide";
}

export const EverydayLifeSection: React.FC<EverydayLifeSectionProps> = ({ items, activeScope }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems = items.filter((item) => {
    if (activeScope === "india" && item.scope !== "india") return false;
    if (activeScope === "worldwide" && item.scope !== "worldwide") return false;
    if (activeCategory !== "all" && item.category !== activeCategory) return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "menu":
        return <Utensils className="h-4 w-4 text-amber-400" />;
      case "hotel-travel":
        return <Hotel className="h-4 w-4 text-emerald-400" />;
      case "technology":
        return <Smartphone className="h-4 w-4 text-sky-400" />;
      default:
        return <Fuel className="h-4 w-4 text-rose-400" />;
    }
  };

  return (
    <section id="section-everyday" aria-labelledby="everyday-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Coins className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Cost of Living &amp; Culture
          </p>
          <h2
            id="everyday-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            Everyday Life &amp; Prices
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Archival price benchmarks, hotel tariffs, menus, and consumer artifacts
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {[
          { id: "all", label: "All Items" },
          { id: "consumer-goods", label: "Essentials & Gold" },
          { id: "menu", label: "Food & Dining" },
          { id: "hotel-travel", label: "Travel & Hotels" },
          { id: "technology", label: "Era Technology" },
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              activeCategory === cat.id
                ? "border-gold/40 bg-gold/20 text-champagne font-medium"
                : "border-border bg-card/40 text-muted-foreground hover:border-gold/20 hover:text-silver"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="panel-gold flex flex-col justify-between rounded-2xl p-6 transition hover:border-gold/35"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-card p-1.5 border border-border">
                    {getCategoryIcon(item.category)}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.documentType}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">{item.period}</span>
              </div>

              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>

              {/* Price Highlight */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-champagne">
                  {item.priceNative}
                </span>
                {item.priceEquivalent && (
                  <span className="text-xs text-muted-foreground">({item.priceEquivalent})</span>
                )}
              </div>

              <p className="mt-3 text-xs leading-relaxed text-silver">{item.description}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
              <span>
                Source: <strong className="text-silver font-normal">{item.sourceName}</strong>
              </span>
              <span className="text-[10px] text-gold/80">Archived Record</span>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-4 text-[11px] text-muted-foreground/80">
        * Historical currency values and tariff benchmarks are compiled from official historical
        statistical publications (Reserve Bank of India Database on Indian Economy, Ministry of
        Labour Consumer Price Index, and contemporary advertisements).
      </p>
    </section>
  );
};

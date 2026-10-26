import { useState, useEffect } from "react";
import {
  Compass,
  Calendar,
  Newspaper,
  CloudSun,
  Coffee,
  Users,
  Film,
  Award,
  Printer,
  Globe,
  MapPin,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type RegionalScope = "all" | "india" | "worldwide";

interface CapsuleNavProps {
  scope: RegionalScope;
  onScopeChange: (scope: RegionalScope) => void;
  onPrint: () => void;
  cityName?: string;
  countryName?: string;
}

const NAV_ITEMS = [
  { id: "section-numbers", label: "Numbers", icon: Calendar },
  { id: "section-sky", label: "Sky & Moon", icon: Compass },
  { id: "section-timeline", label: "World on Your Day", icon: Sparkles },
  { id: "section-headlines", label: "Headlines", icon: Newspaper },
  { id: "section-newspapers", label: "Archives", icon: Globe },
  { id: "section-weather", label: "Birthplace Weather", icon: CloudSun },
  { id: "section-everyday", label: "Everyday Life", icon: Coffee },
  { id: "section-companions", label: "Companions", icon: Users },
  { id: "section-culture", label: "Cinema & Music", icon: Film },
  { id: "section-records", label: "Era Records", icon: Award },
  { id: "section-keepsake", label: "Certificate", icon: Printer },
] as const;

export function CapsuleNav({
  scope,
  onScopeChange,
  onPrint,
  cityName,
  countryName,
}: CapsuleNavProps) {
  const [activeSection, setActiveSection] = useState<string>("section-numbers");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Track active section
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      className="sticky top-16 z-30 border-y border-gold/15 bg-background/90 backdrop-blur-md transition-all duration-300"
      aria-label="Time capsule navigation"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        {/* Scope selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card/60 p-1">
          <span className="hidden px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-silver sm:inline">
            Scope:
          </span>
          <button
            type="button"
            onClick={() => onScopeChange("all")}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium transition-colors",
              scope === "all"
                ? "bg-gold/20 text-champagne shadow-sm"
                : "text-muted-foreground hover:text-silver",
            )}
          >
            All History
          </button>
          <button
            type="button"
            onClick={() => onScopeChange("india")}
            className={cn(
              "flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors",
              scope === "india"
                ? "bg-gold/20 text-champagne shadow-sm"
                : "text-muted-foreground hover:text-silver",
            )}
            title="Focus on Indian history, cinema, newspapers, and regional records"
          >
            <MapPin className="h-3 w-3 text-gold" aria-hidden="true" />
            India View
          </button>
          <button
            type="button"
            onClick={() => onScopeChange("worldwide")}
            className={cn(
              "flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors",
              scope === "worldwide"
                ? "bg-gold/20 text-champagne shadow-sm"
                : "text-muted-foreground hover:text-silver",
            )}
            title="Focus on international global events"
          >
            <Globe className="h-3 w-3 text-champagne" aria-hidden="true" />
            Worldwide
          </button>
        </div>

        {/* Section Jump Links */}
        <div className="hidden items-center gap-1 overflow-x-auto lg:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors",
                  isActive
                    ? "font-semibold text-champagne bg-gold/10"
                    : "text-muted-foreground hover:text-silver hover:bg-card/40",
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", isActive ? "text-gold" : "opacity-70")} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Print keepsake action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrint}
            className="btn-shimmer inline-flex items-center gap-1.5 rounded-md border border-gold/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-champagne transition-all hover:bg-primary/20 hover:text-foreground"
            title="Print a high-resolution ceremonial certificate"
          >
            <Printer className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span>Print Keepsake</span>
          </button>

          {showScrollTop && (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-md border border-border bg-card/80 p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

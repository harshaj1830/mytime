import { Link } from "@tanstack/react-router";
import { Emblem } from "./Navbar";

const EXPLORE_LINKS = [
  { label: "Explore", to: "/", hash: "discover" },
  { label: "The Archive", to: "/archive" },
  { label: "How It Works", to: "/", hash: "how-it-works" },
  { label: "Our Story", to: "/about" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy", to: "/privacy" },
  { label: "Contact", to: "/contact" },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 text-gold">
              <Emblem className="h-6 w-6" />
              <span className="font-display text-lg font-semibold tracking-wide text-foreground">
                A Day in Time
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A personal journey through time, history and the world that welcomed you.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-silver/70">
              A modern window into the past.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="eyebrow">Site</p>
              <ul className="mt-4 space-y-2.5">
                {EXPLORE_LINKS.map((l) =>
                  l.hash ? (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        hash={l.hash}
                        className="text-sm text-muted-foreground transition-colors hover:text-champagne"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-champagne"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Company</p>
              <ul className="mt-4 space-y-2.5">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-champagne"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} A Day in Time. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

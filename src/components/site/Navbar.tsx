import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { HashLink, btnGold } from "./ui";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="13"
        ry="5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.45"
        transform="rotate(-18 16 16)"
      />
      <path
        d="M16 9.5 L17.4 14.6 L22.5 16 L17.4 17.4 L16 22.5 L14.6 17.4 L9.5 16 L14.6 14.6 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Explore", to: "/", hash: "discover" },
  { label: "The Archive", to: "/archive", hash: undefined },
  { label: "How It Works", to: "/", hash: "how-it-works" },
  { label: "Our Story", to: "/about", hash: undefined },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "text-sm text-silver transition-colors duration-200 hover:text-champagne focus-visible:text-champagne";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-gold/15 bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-gold"
          aria-label="A Day in Time — home"
        >
          <Emblem className="h-6 w-6" />
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            A Day in Time
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) =>
            l.hash ? (
              <HashLink key={l.label} to={l.to} hash={l.hash} className={linkClass}>
                {l.label}
              </HashLink>
            ) : (
              <Link key={l.label} to={l.to} className={linkClass}>
                {l.label}
              </Link>
            ),
          )}
          <HashLink to="/" hash="birth-form" className={cn(btnGold, "px-5 py-2 text-[13px]")}>
            Explore My Birth Day
          </HashLink>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          className="border-t border-gold/15 bg-background/95 px-4 pb-6 pt-3 backdrop-blur-md md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) =>
              l.hash ? (
                <HashLink
                  key={l.label}
                  to={l.to}
                  hash={l.hash}
                  className="rounded-md px-3 py-3 text-sm text-silver hover:bg-gold/5 hover:text-champagne"
                  onNavigate={() => setOpen(false)}
                >
                  {l.label}
                </HashLink>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  className="rounded-md px-3 py-3 text-sm text-silver hover:bg-gold/5 hover:text-champagne"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ),
            )}
            <HashLink
              to="/"
              hash="birth-form"
              className="mt-3 rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
              onNavigate={() => setOpen(false)}
            >
              Explore My Birth Day
            </HashLink>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

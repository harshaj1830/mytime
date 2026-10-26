import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/* ---------- Button styles ---------- */

export const btnGold =
  "btn-shimmer inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_28px_-12px_var(--gold)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_36px_-10px_var(--gold)] disabled:pointer-events-none disabled:opacity-60";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-md border border-gold/30 px-6 py-3 text-sm font-medium text-champagne transition-colors duration-300 hover:border-gold/60 hover:bg-gold/5 disabled:pointer-events-none disabled:opacity-60";

/* ---------- Badges ---------- */

export function DemoBadge({
  label = "Demo data",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-champagne",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function UnavailableBadge({
  label = "Awaiting verified data",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-silver",
        className,
      )}
    >
      {label}
    </span>
  );
}

/* ---------- Section heading ---------- */

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

/* ---------- Hash navigation ---------- */

/** Link to an in-page section that smooth-scrolls when already on the target route. */
export function HashLink({
  to,
  hash,
  className,
  children,
  onNavigate,
}: {
  to: string;
  hash: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to={to}
      hash={hash}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        if (
          typeof window !== "undefined" &&
          window.location.pathname === to &&
          !e.defaultPrevented
        ) {
          e.preventDefault();
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
    >
      {children}
    </Link>
  );
}

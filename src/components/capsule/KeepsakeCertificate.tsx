import React from "react";
import { Printer, ArrowLeft, Moon, Sparkles, Award, Shield, Compass } from "lucide-react";
import { MoonDisc, moonPhase } from "@/components/site/MoonPhase";
import { formatLongDate, formatWeekday, formatWhole, daysLived } from "@/lib/calculations";
import { Link } from "@tanstack/react-router";

interface KeepsakeCertificateProps {
  name?: string;
  birthDateISO: string;
  birthDate: Date;
  city: string;
  country: string;
  birthTime?: string;
  primaryHeadline?: string;
}

export const KeepsakeCertificate: React.FC<KeepsakeCertificateProps> = ({
  name,
  birthDateISO,
  birthDate,
  city,
  country,
  birthTime,
  primaryHeadline,
}) => {
  const phase = moonPhase(birthDate);
  const illuminationPct = Math.round(phase.illumination * 100);
  const totalDays = daysLived(birthDateISO);

  const handlePrint = () => {
    document.body.classList.add("printing-keepsake");
    window.print();
    window.setTimeout(() => {
      document.body.classList.remove("printing-keepsake");
    }, 500);
  };

  return (
    <section id="section-keepsake" aria-labelledby="keepsake-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4 print:hidden">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Commemorative Folio
          </p>
          <h2
            id="keepsake-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            Your Birthday Keepsake
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Print or save a high-resolution ceremonial certificate of your arrival
        </p>
      </div>

      {/* Certificate Frame */}
      <div className="keepsake-print mt-8 relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-gold/40 bg-[#070b14] p-8 sm:p-14 shadow-[0_0_80px_rgba(212,175,55,0.12)] print:border-black print:bg-white print:text-black print:p-8 print:shadow-none">
        {/* Double inner ornamental border */}
        <div className="pointer-events-none absolute inset-3 rounded-2xl border border-gold/20 print:border-gray-400" />
        <div className="pointer-events-none absolute inset-4 rounded-xl border border-gold/30 print:border-gray-500" />

        {/* Certificate Watermark / Header Seal */}
        <div className="text-center relative z-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 p-2 shadow-[0_0_24px_rgba(212,175,55,0.25)] print:border-gray-800 print:bg-transparent">
            <MoonDisc fraction={phase.fraction} size={50} glow />
          </div>

          <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne print:text-gray-700">
            A Day in Time · Historical Archival Record
          </p>

          <h3 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground print:text-black">
            Certificate of Arrival
          </h3>

          <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent print:bg-gray-400" />

          {/* Recipient Name */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground print:text-gray-600">
              This archival parchment commemorates the day
            </p>
            <h4 className="mt-2 font-display text-4xl sm:text-6xl font-extrabold italic text-champagne print:text-black">
              {name ? name : "A Cherished Soul"}
            </h4>
            <p className="mt-2 text-sm text-silver print:text-gray-700">
              made their first appearance upon this Earth
            </p>
          </div>

          {/* Temporal Coordinate */}
          <div className="mt-8 grid gap-4 rounded-2xl border border-gold/20 bg-gold/5 p-6 sm:grid-cols-3 print:border-gray-300 print:bg-transparent">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Birth Date &amp; Day
              </p>
              <p className="mt-1 font-display text-lg font-bold text-foreground print:text-black">
                {formatWeekday(birthDateISO)}
              </p>
              <p className="text-xs text-champagne print:text-gray-700">
                {formatLongDate(birthDateISO)}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Birthplace &amp; Meridian
              </p>
              <p className="mt-1 font-display text-lg font-bold text-foreground print:text-black">
                {city}
              </p>
              <p className="text-xs text-silver print:text-gray-700">
                {country} {birthTime ? `· ${birthTime}` : ""}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Under the Moon
              </p>
              <p className="mt-1 font-display text-lg font-bold text-foreground print:text-black">
                {phase.name}
              </p>
              <p className="text-xs text-champagne print:text-gray-700">
                {illuminationPct}% Illuminated
              </p>
            </div>
          </div>

          {/* Historic Inscription */}
          {primaryHeadline && (
            <div className="mt-8 rounded-xl border border-border/80 bg-card/40 p-4 text-center print:border-gray-300 print:bg-transparent">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground print:text-gray-600">
                Headline of that Moment in History
              </p>
              <p className="mt-1 font-serif text-sm sm:text-base font-medium italic text-silver print:text-black">
                “{primaryHeadline}”
              </p>
            </div>
          )}

          {/* Ceremonial Footnote */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gold/20 pt-6 text-[11px] text-muted-foreground print:border-gray-400 print:text-gray-600">
            <div>
              <span>Journey to date: </span>
              <strong className="text-champagne font-medium print:text-black">
                {formatWhole(totalDays)} days lived
              </strong>
            </div>
            <div>
              <span>Verified against astronomical and historical archives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print & Action Controls (Hidden when printing) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 print:hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold shadow-lg shadow-gold/20"
        >
          <Printer className="h-4 w-4" />
          <span>Print / Save Keepsake as PDF</span>
        </button>

        <Link
          to="/"
          hash="birth-form"
          className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Assemble another capsule</span>
        </Link>
      </div>
    </section>
  );
};

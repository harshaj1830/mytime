import { BirthDetailsForm } from "./BirthDetailsForm";
import { MoonDisc } from "./MoonPhase";
import { StarField } from "./StarField";
import { btnGhost } from "./ui";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section id="birth-form" className="relative overflow-hidden">
      {/* Celestial backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 75% 20%, rgba(11,23,48,0.9) 0%, rgba(20,39,71,0.45) 40%, transparent 75%), radial-gradient(ellipse 60% 50% at 15% 90%, rgba(20,39,71,0.35) 0%, transparent 70%)",
        }}
      />
      <StarField density={90} className="opacity-70" />

      {/* Moon artwork — right side on desktop, faint background on mobile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-[14%] hidden opacity-90 lg:block"
        style={{ animation: "pulse-glow 9s ease-in-out infinite" }}
      >
        <svg viewBox="0 0 300 300" width="300" height="300" className="text-gold">
          <ellipse
            cx="150"
            cy="150"
            rx="140"
            ry="52"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="0.8"
            transform="rotate(-14 150 150)"
          />
          <ellipse
            cx="150"
            cy="150"
            rx="140"
            ry="52"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="0.8"
            transform="rotate(24 150 150)"
          />
          <circle cx="278" cy="128" r="2" fill="#E7D3A0" />
          <circle cx="34" cy="184" r="1.6" fill="#C7CCD7" />
        </svg>
        <MoonDisc
          fraction={0.68}
          size={190}
          glow
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-28 sm:px-6 md:pt-32 lg:min-h-[92vh] lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-36">
        <div>
          <p className="eyebrow">Your story begins in time</p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.08] text-foreground sm:text-6xl lg:text-[4.25rem]">
            The world was already a story.
            <br />
            <span className="gold-text italic">Then you arrived.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Travel back to the day you were born. Discover the skies, the headlines, the music, the
            weather and the moments that shaped the world you entered.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#birth-form-panel" className="hidden" aria-hidden="true" />
            <Link
              to="/"
              hash="birth-form"
              className="text-sm font-medium text-champagne underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("birth-form-panel")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              Explore a sample time capsule
            </Link>
          </div>

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground/80">
            Your birth details are used to shape your experience. No account required for this demo.
          </p>
        </div>

        <div id="birth-form-panel" className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-xl"
            style={{
              background:
                "linear-gradient(160deg, rgba(198,161,91,0.35), transparent 30%, transparent 70%, rgba(198,161,91,0.2))",
              filter: "blur(0.5px)",
            }}
          />
          <BirthDetailsForm />
        </div>
      </div>
    </section>
  );
}

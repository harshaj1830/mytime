import { moonPhase, type MoonPhaseInfo } from "@/lib/calculations";

/**
 * SVG moon rendering an approximate phase for a date.
 * The phase is a mathematical estimate, not an observed record.
 */

function darkRegionPath(cx: number, cy: number, r: number, fraction: number): string {
  const rx = r * Math.abs(Math.cos(2 * Math.PI * fraction));
  const waxing = fraction < 0.5;
  const darkMoreThanHalf = fraction < 0.25 || fraction > 0.75;
  // Outer arc: top -> bottom through the dark limb (waxing: left, waning: right).
  const outerSweep = waxing ? 0 : 1;
  // Terminator arc: bottom -> top through the lit limb when dark > half, else the dark limb.
  const throughLitSide = darkMoreThanHalf;
  const terminatorSweep = waxing ? (throughLitSide ? 1 : 0) : throughLitSide ? 0 : 1;
  return [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r}`,
    `A ${rx} ${r} 0 0 ${terminatorSweep} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

export function MoonDisc({
  fraction,
  size = 160,
  className = "",
  glow = false,
}: {
  fraction: number;
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  const r = 46;
  const cx = 50;
  const cy = 50;
  const rx = r * Math.abs(Math.cos(2 * Math.PI * fraction));
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Approximate moon phase illustration"
    >
      {glow ? <circle cx={cx} cy={cy} r={r + 14} fill="#C6A15B" opacity="0.08" /> : null}
      <defs>
        <radialGradient id="moonlit" cx="38%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#F3EEE4" />
          <stop offset="70%" stopColor="#D9D2C2" />
          <stop offset="100%" stopColor="#B7AF9C" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="url(#moonlit)" />
      <path d={darkRegionPath(cx, cy, r, fraction)} fill="#0B0E15" opacity="0.94" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#C6A15B"
        strokeOpacity="0.35"
        strokeWidth="0.8"
      />
      {rx > 0.5 && rx < r * 0.98 ? (
        <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="none" />
      ) : null}
    </svg>
  );
}

export function MoonPhaseCard({ date, className = "" }: { date: Date; className?: string }) {
  const info: MoonPhaseInfo = moonPhase(date);
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <MoonDisc fraction={info.fraction} size={120} glow />
      <div>
        <p className="eyebrow">Approximate phase</p>
        <p className="mt-2 font-display text-2xl font-semibold text-foreground">{info.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          ~{Math.round(info.illumination * 100)}% illuminated ·{" "}
          <span className="text-silver">mathematical estimate</span>
        </p>
      </div>
    </div>
  );
}

export { moonPhase };

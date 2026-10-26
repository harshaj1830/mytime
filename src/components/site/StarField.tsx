import { useMemo } from "react";

interface Star {
  cx: number;
  cy: number;
  r: number;
  delay: number;
  dur: number;
  opacity: number;
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** Lightweight twinkling star field rendered as inline SVG circles. */
export function StarField({
  density = 70,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: density }, (_, i) => {
        const s1 = pseudoRandom(i * 6 + 1);
        const s2 = pseudoRandom(i * 6 + 2);
        const s3 = pseudoRandom(i * 6 + 3);
        const s4 = pseudoRandom(i * 6 + 4);
        const s5 = pseudoRandom(i * 6 + 5);
        const s6 = pseudoRandom(i * 6 + 6);
        return {
          cx: Math.round(s1 * 10000) / 100,
          cy: Math.round(s2 * 10000) / 100,
          r: Math.round((s3 * 1.1 + 0.3) * 100) / 100,
          delay: Math.round(s4 * 7 * 100) / 100,
          dur: Math.round((3 + s5 * 5) * 100) / 100,
          opacity: Math.round((0.25 + s6 * 0.6) * 100) / 100,
        };
      }),
    [density],
  );

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={`${s.cx}%`}
          cy={`${s.cy}%`}
          r={s.r}
          fill="#C7CCD7"
          opacity={s.opacity}
          style={{ animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }}
        />
      ))}
    </svg>
  );
}

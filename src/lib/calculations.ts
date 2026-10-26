/**
 * Frontend-only, mathematically derived estimates.
 * Every value produced here must be labelled as an estimate in the UI.
 */

export const MS_PER_DAY = 86_400_000;
export const DAYS_PER_YEAR = 365.2425;
export const SYNODIC_MONTH = 29.530588853;
/** Illustrative assumed resting heart rate (beats per minute). */
export const ASSUMED_HEART_RATE = 72;

/** Assumed resting breathing rate: 16 breaths per minute. */
export const ASSUMED_BREATH_RATE = 16;
/** Earth's orbital speed around the sun: ~29.78 km/second (~2,573,000 km/day). */
export const KM_PER_DAY_ORBIT = 2_573_000;

export interface LifeMetrics {
  exactAge: { years: number; months: number; days: number };
  daysLived: number;
  weeksLived: number;
  monthsLivedTotal: number;
  hoursLived: number;
  minutesLived: number;
  secondsLived: number;
  birthdaysCelebrated: number;
  nextBirthday: {
    targetDateStr: string;
    daysRemaining: number;
    hoursRemaining: number;
    minutesRemaining: number;
    isToday: boolean;
  };
  heartbeatsEst: number;
  breathsEst: number;
  orbitalDistanceKm: number;
  earthOrbits: number;
  fullMoonsWitnessed: number;
}

export function parseBirthDateTime(birthISO: string, birthTime?: string): Date {
  const parts = birthISO.split("-").map(Number);
  const y = parts[0] && !isNaN(parts[0]) ? parts[0] : 1970;
  const m = parts[1] && !isNaN(parts[1]) ? parts[1] - 1 : 0;
  const d = parts[2] && !isNaN(parts[2]) ? parts[2] : 1;

  let hour = 12;
  let minute = 0;
  if (birthTime && birthTime.includes(":")) {
    const tParts = birthTime.split(":").map(Number);
    if (!isNaN(tParts[0] ?? NaN)) hour = Math.max(0, Math.min(23, tParts[0]!));
    if (!isNaN(tParts[1] ?? NaN)) minute = Math.max(0, Math.min(59, tParts[1]!));
  }

  return new Date(Date.UTC(y, m, d, hour, minute, 0));
}

export function calculateLifeMetrics(
  birthISO: string,
  birthTime?: string,
  now: Date = new Date(),
): LifeMetrics {
  const birthDate = parseBirthDateTime(birthISO, birthTime);
  const totalMs = Math.max(0, now.getTime() - birthDate.getTime());
  const totalSeconds = Math.floor(totalMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);

  // Exact calendar age in years, months, days
  const nowYear = now.getUTCFullYear();
  const nowMonth = now.getUTCMonth();
  const nowDate = now.getUTCDate();

  const birthYear = birthDate.getUTCFullYear();
  const birthMonth = birthDate.getUTCMonth();
  const birthDay = birthDate.getUTCDate();

  let years = nowYear - birthYear;
  let months = nowMonth - birthMonth;
  let days = nowDate - birthDay;

  if (days < 0) {
    months -= 1;
    // Days in previous month
    const prevMonthDays = new Date(Date.UTC(nowYear, nowMonth, 0)).getUTCDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  years = Math.max(0, years);
  months = Math.max(0, months);
  days = Math.max(0, days);

  const monthsLivedTotal = years * 12 + months + Math.round((days / 30.4375) * 10) / 10;
  const birthdaysCelebrated = years;

  // Next birthday countdown
  let nextBdayYear = nowYear;
  let nextBday = new Date(
    Date.UTC(
      nextBdayYear,
      birthMonth,
      birthDay,
      birthDate.getUTCHours(),
      birthDate.getUTCMinutes(),
      0,
    ),
  );
  if (now.getTime() > nextBday.getTime()) {
    nextBdayYear += 1;
    nextBday = new Date(
      Date.UTC(
        nextBdayYear,
        birthMonth,
        birthDay,
        birthDate.getUTCHours(),
        birthDate.getUTCMinutes(),
        0,
      ),
    );
  }

  const msUntil = Math.max(0, nextBday.getTime() - now.getTime());
  const hoursUntil = Math.floor(msUntil / (1000 * 60 * 60));
  const daysUntil = Math.floor(hoursUntil / 24);
  const remainingHours = hoursUntil % 24;
  const remainingMinutes = Math.floor((msUntil % (1000 * 60 * 60)) / (1000 * 60));
  const isToday = nowMonth === birthMonth && nowDate === birthDay;

  const nextBdayTargetStr = formatLongDate(
    `${nextBdayYear}-${String(birthMonth + 1).padStart(2, "0")}-${String(birthDay).padStart(2, "0")}`,
  );

  return {
    exactAge: { years, months, days },
    daysLived: totalDays,
    weeksLived: totalWeeks,
    monthsLivedTotal,
    hoursLived: totalHours,
    minutesLived: totalMinutes,
    secondsLived: totalSeconds,
    birthdaysCelebrated,
    nextBirthday: {
      targetDateStr: nextBdayTargetStr,
      daysRemaining: daysUntil,
      hoursRemaining: remainingHours,
      minutesRemaining: remainingMinutes,
      isToday,
    },
    heartbeatsEst: totalMinutes * ASSUMED_HEART_RATE,
    breathsEst: totalMinutes * ASSUMED_BREATH_RATE,
    orbitalDistanceKm: totalDays * KM_PER_DAY_ORBIT,
    earthOrbits: totalDays / DAYS_PER_YEAR,
    fullMoonsWitnessed: totalDays / SYNODIC_MONTH,
  };
}

export function parseISODate(iso: string | null | undefined): Date {
  if (!iso || typeof iso !== "string") {
    return new Date(Date.UTC(1970, 0, 1, 12, 0, 0));
  }
  const parts = iso.split("-").map(Number);
  const y = parts[0] && !isNaN(parts[0]) ? parts[0] : 1970;
  const m = parts[1] && !isNaN(parts[1]) ? parts[1] : 1;
  const d = parts[2] && !isNaN(parts[2]) ? parts[2] : 1;
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
}

export function daysLived(birthISO: string | null | undefined, now: Date = new Date()): number {
  if (!birthISO) return 0;
  const birth = parseISODate(birthISO);
  const diff = now.getTime() - birth.getTime();
  if (isNaN(diff)) return 0;
  return Math.max(0, Math.floor(diff / MS_PER_DAY));
}

export function earthOrbits(days: number): number {
  if (!days || isNaN(days) || days < 0) return 0;
  return days / DAYS_PER_YEAR;
}

export function heartbeats(days: number): number {
  if (!days || isNaN(days) || days < 0) return 0;
  return days * 24 * 60 * ASSUMED_HEART_RATE;
}

export function fullMoons(days: number): number {
  if (!days || isNaN(days) || days < 0) return 0;
  return days / SYNODIC_MONTH;
}

export function formatWhole(n: number): string {
  if (isNaN(n)) return "0";
  return Math.round(n).toLocaleString("en-US");
}

export function formatCompact(n: number): string {
  if (isNaN(n)) return "0";
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(
    n,
  );
}

export interface MoonPhaseInfo {
  /** Synodic age in days (0 = new moon). */
  age: number;
  /** 0..1 fraction through the lunar cycle. */
  fraction: number;
  /** 0..1 illuminated disc fraction. */
  illumination: number;
  name: string;
  waxing: boolean;
}

/** Reference new moon: 2000-01-06 18:14 UTC. */
const NEW_MOON_EPOCH = Date.UTC(2000, 0, 6, 18, 14);

export function moonPhase(date: Date): MoonPhaseInfo {
  const time = date && !isNaN(date.getTime()) ? date.getTime() : NEW_MOON_EPOCH;
  const elapsedDays = (time - NEW_MOON_EPOCH) / MS_PER_DAY;
  const age = ((elapsedDays % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const fraction = isNaN(age) ? 0 : age / SYNODIC_MONTH;
  const illumination = isNaN(fraction) ? 0 : (1 - Math.cos(2 * Math.PI * fraction)) / 2;
  const waxing = fraction < 0.5;
  const name = moonPhaseName(fraction);
  return { age, fraction, illumination, name, waxing };
}

function moonPhaseName(fraction: number): string {
  if (isNaN(fraction) || fraction < 0.03 || fraction > 0.97) return "New Moon";
  if (fraction < 0.22) return "Waxing Crescent";
  if (fraction < 0.28) return "First Quarter";
  if (fraction < 0.47) return "Waxing Gibbous";
  if (fraction < 0.53) return "Full Moon";
  if (fraction < 0.72) return "Waning Gibbous";
  if (fraction < 0.78) return "Last Quarter";
  return "Waning Crescent";
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function formatLongDate(iso: string | null | undefined): string {
  if (!iso || typeof iso !== "string") return "Unknown date";
  const parts = iso.split("-").map(Number);
  const y = parts[0] && !isNaN(parts[0]) ? parts[0] : 1970;
  const m = parts[1] && !isNaN(parts[1]) ? parts[1] - 1 : 0;
  const d = parts[2] && !isNaN(parts[2]) ? parts[2] : 1;
  const safeMonth = m >= 0 && m < 12 ? m : 0;
  const monthName = MONTH_NAMES[safeMonth] ?? "January";
  return `${d} ${monthName} ${y}`;
}

export function formatWeekday(iso: string | null | undefined): string {
  if (!iso || typeof iso !== "string") return "Unknown day";
  const parts = iso.split("-").map(Number);
  const y = parts[0] && !isNaN(parts[0]) ? parts[0] : 1970;
  const m = parts[1] && !isNaN(parts[1]) ? parts[1] - 1 : 0;
  const d = parts[2] && !isNaN(parts[2]) ? parts[2] : 1;
  const safeMonth = m >= 0 && m < 12 ? m : 0;
  const utcDate = new Date(Date.UTC(y, safeMonth, d, 12, 0, 0));
  const dayIndex = isNaN(utcDate.getTime()) ? 0 : utcDate.getUTCDay();
  return DAY_NAMES[dayIndex] ?? "Sunday";
}

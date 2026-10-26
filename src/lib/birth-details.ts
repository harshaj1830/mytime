import { useEffect, useState, useSyncExternalStore } from "react";

export type TimeAccuracy = "exact" | "approximate" | "unknown";

export interface BirthDetails {
  name: string;
  /** ISO date, yyyy-mm-dd */
  date: string;
  country: string;
  city: string;
  /** HH:mm or "" when unknown */
  time: string;
  accuracy: TimeAccuracy;
}

const STORAGE_KEY = "adit:birth-details";

export function isValidBirthDetails(details: unknown): details is BirthDetails {
  if (!details || typeof details !== "object") return false;
  const d = details as Record<string, unknown>;
  return (
    typeof d.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(d.date.trim()) &&
    typeof d.city === "string" &&
    d.city.trim().length > 0 &&
    typeof d.country === "string" &&
    d.country.trim().length > 0
  );
}

function read(): BirthDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidBirthDetails(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

let current: BirthDetails | null = read();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function setBirthDetails(details: BirthDetails) {
  current = details;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch {
    // storage unavailable — keep in-memory state only
  }
  emit();
}

export function getBirthDetails(): BirthDetails | null {
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Reactive access to the entered birth details (frontend-only, session-scoped). */
export function useBirthDetails(): BirthDetails | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storeValue = useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );

  return mounted ? storeValue : null;
}

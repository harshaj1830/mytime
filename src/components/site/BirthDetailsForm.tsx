import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, Clock3, Globe2, MapPin, User, ChevronDown } from "lucide-react";
import { setBirthDetails, type BirthDetails, type TimeAccuracy } from "@/lib/birth-details";
import { COUNTRIES } from "@/lib/demo-data";
import { btnGold } from "./ui";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-md border border-input bg-muted/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring/50";

const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-[0.16em] text-silver";

const accuracyOptions: { value: TimeAccuracy; label: string }[] = [
  { value: "exact", label: "Exact" },
  { value: "approximate", label: "Approximate" },
  { value: "unknown", label: "Unknown" },
];

interface FormErrors {
  date?: string;
  country?: string;
  city?: string;
}

function FieldError({ id, message }: { id: string; message?: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}

export function BirthDetailsForm({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [accuracy, setAccuracy] = useState<TimeAccuracy>("exact");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const [todayISO, setTodayISO] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setTodayISO(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
  }, []);

  const showAccuracy = time !== "";

  function validate(): boolean {
    const next: FormErrors = {};
    if (!date) next.date = "Please enter your date of birth.";
    else if (todayISO && date > todayISO) next.date = "Your birth date cannot be in the future.";
    if (!country) next.country = "Please select a country.";
    if (!city.trim()) next.city = "Please enter your birthplace (city or town).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    const details: BirthDetails = {
      name: name.trim(),
      date,
      country,
      city: city.trim(),
      time: accuracy === "unknown" ? "" : time,
      accuracy,
    };
    // Simulate assembling the capsule, then move to the demo results page.
    window.setTimeout(() => {
      setBirthDetails(details);
      navigate({
        to: "/time-capsule",
        search: {
          date: details.date,
          city: details.city,
          country: details.country,
          name: details.name || undefined,
          time: details.time || undefined,
          accuracy: details.accuracy || undefined,
        },
      });
    }, 1800);
  }

  return (
    <div
      className={`panel-gold relative rounded-xl p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-8 ${className}`}
    >
      {submitting ? (
        <div
          className="flex min-h-[420px] flex-col items-center justify-center text-center"
          role="status"
          aria-live="polite"
        >
          <svg viewBox="0 0 64 64" className="h-16 w-16 text-gold" aria-hidden="true">
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1.5"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="40 124"
              strokeLinecap="round"
              style={{ animation: "spin-slow 1.6s linear infinite", transformOrigin: "center" }}
            />
            <path
              d="M32 24 L33.4 30.6 L40 32 L33.4 33.4 L32 40 L30.6 33.4 L24 32 L30.6 30.6 Z"
              fill="currentColor"
            />
          </svg>
          <p className="mt-6 font-display text-xl font-medium text-foreground">
            Assembling your time capsule…
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Gathering the archive for your arrival.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="bd-name" className={labelClass}>
              Full name{" "}
              <span className="normal-case tracking-normal text-muted-foreground">(optional)</span>
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="bd-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ananya Rao"
                className={cn(inputClass, "pl-9")}
              />
            </div>
          </div>

          <div>
            <label htmlFor="bd-date" className={labelClass}>
              Date of birth
            </label>
            <div className="relative">
              <CalendarDays
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="bd-date"
                type="date"
                required
                max={todayISO || undefined}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errors.date) setErrors((p) => ({ ...p, date: "" }));
                }}
                aria-describedby="bd-date-error"
                className={cn(inputClass, "pl-9 [&::-webkit-calendar-picker-indicator]:opacity-60")}
              />
            </div>
            <FieldError id="bd-date-error" message={errors.date} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bd-country" className={labelClass}>
                Country
              </label>
              <div className="relative">
                <Globe2
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <select
                  id="bd-country"
                  required
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    if (errors.country) setErrors((p) => ({ ...p, country: "" }));
                  }}
                  aria-describedby="bd-country-error"
                  className={cn(
                    inputClass,
                    "appearance-none pl-9 pr-9 [&>option]:bg-popover [&>option]:text-foreground",
                  )}
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <FieldError id="bd-country-error" message={errors.country} />
            </div>
            <div>
              <label htmlFor="bd-city" className={labelClass}>
                City / place
              </label>
              <div className="relative">
                <MapPin
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  id="bd-city"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors((p) => ({ ...p, city: "" }));
                  }}
                  placeholder="e.g. Hyderabad"
                  aria-describedby="bd-city-error"
                  className={cn(inputClass, "pl-9")}
                />
              </div>
              <FieldError id="bd-city-error" message={errors.city} />
            </div>
          </div>

          <div>
            <label htmlFor="bd-time" className={labelClass}>
              Birth time{" "}
              <span className="normal-case tracking-normal text-muted-foreground">(optional)</span>
            </label>
            <div className="relative">
              <Clock3
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="bd-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={cn(inputClass, "pl-9 [&::-webkit-calendar-picker-indicator]:opacity-60")}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Don't know the time? Leave it blank — you can continue without it.
            </p>
          </div>

          {showAccuracy ? (
            <div>
              <span className={labelClass} id="bd-accuracy-label">
                Time accuracy
              </span>
              <div
                role="radiogroup"
                aria-labelledby="bd-accuracy-label"
                className="grid grid-cols-3 gap-1 rounded-md border border-input bg-muted/50 p-1"
              >
                {accuracyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={accuracy === opt.value}
                    onClick={() => setAccuracy(opt.value)}
                    className={cn(
                      "rounded-sm px-2 py-2 text-xs font-medium transition-colors",
                      accuracy === opt.value
                        ? "bg-gold/15 text-champagne"
                        : "text-muted-foreground hover:text-silver",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <button type="submit" className={cn(btnGold, "w-full py-3.5")}>
            Discover My Day
          </button>
        </form>
      )}
    </div>
  );
}

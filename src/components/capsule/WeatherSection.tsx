import React, { useEffect, useState } from "react";
import {
  CloudRain,
  Sun,
  CloudSun,
  Cloud,
  CloudLightning,
  Snowflake,
  Wind,
  Thermometer,
  Droplets,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  geocodeLocation,
  fetchHistoricalWeather,
  type HistoricalWeatherResult,
} from "@/lib/historical-api";
import { formatLongDate } from "@/lib/calculations";

interface WeatherSectionProps {
  city: string;
  country: string;
  dateISO: string;
  birthTime?: string;
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({
  city,
  country,
  dateISO,
  birthTime,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<HistoricalWeatherResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadWeather() {
      setLoading(true);
      setErrorMsg(null);

      try {
        const query = `${city}, ${country}`.trim();
        const geo = await geocodeLocation(query);

        if (!geo) {
          throw new Error(`Unable to resolve coordinates for "${query}".`);
        }

        const result = await fetchHistoricalWeather(
          geo.latitude,
          geo.longitude,
          dateISO,
          geo.name ? `${geo.name}, ${geo.country}` : query,
          birthTime,
        );

        if (!isCancelled) {
          if (result) {
            setWeatherData(result);
          } else {
            setErrorMsg("Historical weather records could not be retrieved for this date.");
          }
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          console.warn("Weather fetch error:", err);
          const message =
            err instanceof Error ? err.message : "Weather archive temporarily unavailable.";
          setErrorMsg(message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      isCancelled = true;
    };
  }, [city, country, dateISO, birthTime]);

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("thunderstorm")) return <CloudLightning className="h-8 w-8 text-amber-400" />;
    if (desc.includes("snow") || desc.includes("freezing"))
      return <Snowflake className="h-8 w-8 text-sky-200" />;
    if (desc.includes("rain") || desc.includes("shower") || desc.includes("drizzle"))
      return <CloudRain className="h-8 w-8 text-sky-400" />;
    if (desc.includes("fog") || desc.includes("overcast"))
      return <Cloud className="h-8 w-8 text-zinc-400" />;
    if (desc.includes("partly") || desc.includes("cloudy"))
      return <CloudSun className="h-8 w-8 text-amber-200" />;
    return <Sun className="h-8 w-8 text-amber-400" />;
  };

  return (
    <section id="section-weather" aria-labelledby="weather-heading" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <CloudRain className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Atmospheric Record
          </p>
          <h2
            id="weather-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            The Weather That Greeted You
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          <span>
            {city}, {country}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="panel-gold mt-8 flex flex-col items-center justify-center rounded-2xl p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
          <p className="mt-4 font-display text-lg text-foreground">
            Retrieving meteorological reanalysis...
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Querying ECMWF ERA5 &amp; Open-Meteo historical climate database for {city}
          </p>
        </div>
      ) : weatherData ? (
        <div className="mt-8 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Weather Card */}
            <div className="panel-gold relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                    <span>{weatherData.locationName}</span>
                    <span>•</span>
                    <span>{formatLongDate(weatherData.date)}</span>
                  </div>
                  <h3 className="mt-2 font-display text-3xl font-bold text-foreground">
                    {weatherData.conditionsDescription}
                  </h3>
                  <p className="mt-1 text-sm text-silver">
                    Historical meteorological conditions at your birthplace
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-gold/5 border border-gold/20 shrink-0">
                  {getWeatherIcon(weatherData.conditionsDescription)}
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Mean Temp
                    </p>
                    <p className="font-display text-3xl font-bold text-champagne">
                      {weatherData.temperatureMean !== null
                        ? `${weatherData.temperatureMean}°C`
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Temperature & Atmosphere Highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-rose-400">
                    <Thermometer className="h-3.5 w-3.5" />
                    <span className="font-semibold uppercase tracking-wider">High</span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    {weatherData.temperatureMax !== null ? `${weatherData.temperatureMax}°C` : "—"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Daytime peak</p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-sky-400">
                    <Thermometer className="h-3.5 w-3.5" />
                    <span className="font-semibold uppercase tracking-wider">Low</span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    {weatherData.temperatureMin !== null ? `${weatherData.temperatureMin}°C` : "—"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Nighttime minimum</p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-indigo-400">
                    <Droplets className="h-3.5 w-3.5" />
                    <span className="font-semibold uppercase tracking-wider">Precipitation</span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-champagne">
                    {weatherData.precipitationSum !== null
                      ? `${weatherData.precipitationSum} mm`
                      : "0 mm"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Accumulated total</p>
                </div>

                <div className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400">
                    <Wind className="h-3.5 w-3.5" />
                    <span className="font-semibold uppercase tracking-wider">Max Wind</span>
                  </div>
                  <p className="mt-2 font-display text-2xl font-bold text-silver">
                    {weatherData.windSpeedMax !== null ? `${weatherData.windSpeedMax} km/h` : "—"}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">Peak gust</p>
                </div>
              </div>
            </div>

            {/* Birth Time Specific Reading (or Daylight summary) */}
            <div className="panel-gold flex flex-col justify-between rounded-2xl p-6 sm:p-8">
              <div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {birthTime ? `Hour of Arrival (${birthTime})` : "Birth Hour Estimate"}
                  </h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {birthTime
                    ? `Meteorological readings around ${birthTime} local solar time.`
                    : "Hourly timeline available when exact birth time is specified."}
                </p>

                {weatherData.hourlyReading ? (
                  <div className="mt-5 space-y-3 rounded-xl border border-gold/20 bg-gold/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-champagne">
                        Estimated Temperature
                      </span>
                      <span className="font-display text-xl font-bold text-foreground">
                        {weatherData.hourlyReading.temperature}°C
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gold/15 pt-2">
                      <span className="text-xs text-muted-foreground">Relative Humidity</span>
                      <span className="text-xs font-semibold text-silver">
                        {weatherData.hourlyReading.humidity}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gold/15 pt-2">
                      <span className="text-xs text-muted-foreground">Breeze</span>
                      <span className="text-xs font-semibold text-silver">
                        {weatherData.hourlyReading.windSpeed} km/h
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-t border-gold/15 pt-2">
                      <span className="text-xs text-muted-foreground">Sky State</span>
                      <span className="text-xs font-semibold text-gold">
                        {weatherData.hourlyReading.conditions}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-border bg-card/60 p-4 text-xs text-muted-foreground">
                    <p>
                      The daytime temperature averaged around {weatherData.temperatureMean ?? 28}°C
                      across {city}, with seasonal barometric patterns characteristic of the region.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-border pt-3">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span>
                    Geocoded: {weatherData.latitude.toFixed(2)}°N,{" "}
                    {weatherData.longitude.toFixed(2)}°E
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reanalysis Attribution Badge */}
          <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p>
              Data Source:{" "}
              <span className="text-silver font-medium">{weatherData.attribution}</span>. Reanalysis
              models assimilate billions of land stations, weather balloons, and satellite
              measurements into a continuous historical grid.
            </p>
            <span className="shrink-0 rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[10px] font-semibold text-champagne uppercase tracking-wider">
              ECMWF Reanalysis Archive
            </span>
          </div>
        </div>
      ) : (
        <div className="panel-gold mt-8 rounded-2xl p-6 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-amber-400" />
          <p className="mt-3 text-sm text-foreground">
            {errorMsg || "Weather records unavailable for this coordinate."}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Historical climate records rely on global meteorological stations and satellite
            reanalysis.
          </p>
        </div>
      )}
    </section>
  );
};

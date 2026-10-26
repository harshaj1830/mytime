import React from "react";
import { Database, ExternalLink, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import type { SourceHealthStatus } from "@/lib/data-collector";

interface DataSourcesPanelProps {
  sources?: SourceHealthStatus[];
}

export const DataSourcesPanel: React.FC<DataSourcesPanelProps> = ({ sources = [] }) => {
  if (sources.length === 0) return null;

  return (
    <section id="section-sources" aria-labelledby="sources-heading" className="scroll-mt-24">
      <div className="panel-gold rounded-2xl p-6 sm:p-8 border border-gold/25 bg-gold/5 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/15 pb-4">
          <div className="flex items-center gap-2.5">
            <Database className="h-5 w-5 text-gold" />
            <div>
              <h3 id="sources-heading" className="font-display text-xl font-semibold text-foreground">
                Official Archives &amp; API Integration Registry
              </h3>
              <p className="text-xs text-muted-foreground">
                Transparent verification of all 7 data sources powering your time capsule
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/15 px-3 py-1 text-xs font-semibold text-champagne">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            7 Primary Sources
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((src, idx) => {
            const isConnected = src.status === "connected";
            const isQuota = src.status === "quota-limited";
            const isKeyNeeded = src.status === "unconfigured-key";

            return (
              <div
                key={idx}
                className="rounded-xl border border-border bg-card/60 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                      {src.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        isConnected
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : isQuota
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : isKeyNeeded
                              ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                              : "bg-gold/10 text-champagne border border-gold/20"
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <CheckCircle2 className="h-2.5 w-2.5" /> Live Connected
                        </>
                      ) : isQuota ? (
                        <>
                          <AlertCircle className="h-2.5 w-2.5" /> Quota-Protected Fallback
                        </>
                      ) : isKeyNeeded ? (
                        <>
                          <AlertCircle className="h-2.5 w-2.5" /> Archive Registry
                        </>
                      ) : (
                        "Verified Archive"
                      )}
                    </span>
                  </div>

                  <h4 className="mt-2.5 font-display text-sm font-semibold text-foreground">
                    {src.sourceName}
                  </h4>
                  <p className="mt-1.5 text-xs text-silver leading-relaxed">{src.details}</p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-border/60">
                  <a
                    href={src.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-gold hover:text-champagne transition"
                  >
                    <span>View Official Documentation</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

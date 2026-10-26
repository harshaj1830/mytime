import React from "react";
import {
  Newspaper,
  ExternalLink,
  Library,
  Search,
  BookOpen,
  Globe2,
  FileText,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { NEWSPAPER_ARCHIVES } from "@/lib/historical-data";
import { formatLongDate } from "@/lib/calculations";
import type { WaybackSnapshot, InternetArchiveDoc } from "@/lib/data-collector";

interface NewspaperArchiveSectionProps {
  birthDate: Date;
  birthDateISO: string;
  activeScope: "all" | "india" | "worldwide";
  city: string;
  country: string;
  waybackSnapshots?: WaybackSnapshot[];
  internetArchiveDocs?: InternetArchiveDoc[];
}

export const NewspaperArchiveSection: React.FC<NewspaperArchiveSectionProps> = ({
  birthDate,
  birthDateISO,
  activeScope,
  city,
  country,
  waybackSnapshots = [],
  internetArchiveDocs = [],
}) => {
  const year = birthDate.getUTCFullYear();
  const month = birthDate.getUTCMonth() + 1;
  const day = birthDate.getUTCDate();

  const filteredArchives = NEWSPAPER_ARCHIVES.filter((archive) => {
    if (activeScope === "india" && archive.region !== "india") return false;
    if (activeScope === "worldwide" && archive.region !== "worldwide") return false;
    return true;
  });

  return (
    <section
      id="section-newspapers"
      aria-labelledby="newspaper-archive-heading"
      className="scroll-mt-24 space-y-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/15 pb-4">
        <div>
          <p className="eyebrow flex items-center gap-1.5">
            <Library className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Original Printed &amp; Digital Records
          </p>
          <h2
            id="newspaper-archive-heading"
            className="mt-2 font-display text-3xl font-semibold text-foreground"
          >
            The Newspaper That Welcomed You
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Digitized repositories &amp; archived editions for {formatLongDate(birthDateISO)}
        </p>
      </div>

      {/* Sub-Feature 1: Live Wayback Machine Snapshots on Exact Birth Date */}
      {waybackSnapshots && waybackSnapshots.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-gold" />
              <h3 className="font-display text-xl font-semibold text-foreground">
                Preserved Web Front Pages on Your Birth Date
              </h3>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Official Wayback Machine (web.archive.org)
            </span>
          </div>
          <p className="text-xs text-silver leading-relaxed">
            Direct captures of major contemporary news websites exactly as they appeared to online
            readers on {formatLongDate(birthDateISO)}.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {waybackSnapshots.map((snap, idx) => (
              <div
                key={idx}
                className="panel-gold flex flex-col justify-between rounded-xl p-5 border border-gold/20 hover:border-gold/40 transition"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">{snap.publisher}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        snap.isAvailable
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-gold/10 text-champagne border border-gold/20"
                      }`}
                    >
                      {snap.isAvailable ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" /> Exact Day Capture
                        </>
                      ) : (
                        "Archive Search"
                      )}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground truncate">
                    {snap.originalUrl}
                  </p>
                  <p className="mt-2 text-xs text-silver">
                    {snap.isAvailable
                      ? `Archived snapshot preserved in the Internet Archive Wayback Machine.`
                      : `Search the complete archival crawl index for this publication.`}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <a
                    href={snap.snapshotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-champagne transition"
                  >
                    <span>View Archived Front Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Feature 2: Internet Archive Search API (Digitized Texts & Periodicals) */}
      {internetArchiveDocs && internetArchiveDocs.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gold/15">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gold" />
              <h3 className="font-display text-xl font-semibold text-foreground">
                Internet Archive Historical Documents
              </h3>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Internet Archive Advanced Search API (archive.org)
            </span>
          </div>
          <p className="text-xs text-silver leading-relaxed">
            Public domain publications, gazettes, periodicals, and transcripts digitized from
            libraries worldwide around your birth week.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internetArchiveDocs.map((doc, idx) => (
              <div
                key={idx}
                className="panel-gold flex flex-col justify-between rounded-xl p-5 border border-gold/20 hover:border-gold/40 transition"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gold">
                    <Calendar className="h-3 w-3" />
                    <span>{doc.date}</span>
                  </div>
                  <h4 className="mt-2 font-display text-base font-semibold text-foreground line-clamp-2">
                    {doc.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                    {doc.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <a
                    href={doc.itemUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-champagne transition"
                  >
                    <span>Read on Archive.org</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Feature 3: Curated National & State Digital Press Repositories */}
      <div className="space-y-4 pt-4 border-t border-gold/15">
        <div className="flex items-center gap-2">
          <Library className="h-4 w-4 text-gold" />
          <h3 className="font-display text-xl font-semibold text-foreground">
            Digitized Newspaper Libraries &amp; Microfilm Portals
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArchives.map((archive) => {
            const directUrl = archive.getSearchUrl(year, month, day);

            return (
              <article
                key={archive.id}
                className="panel-gold flex flex-col justify-between rounded-2xl p-6 transition hover:border-gold/35"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-champagne">
                      {archive.region === "india" ? "🇮🇳 Indian Repository" : "🌐 Global Repository"}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {archive.coverageYears}
                    </span>
                  </div>

                  <h4 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {archive.name}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-silver">{archive.description}</p>

                  <p className="mt-3 text-[11px] text-muted-foreground italic">{archive.notes}</p>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-flex w-full items-center justify-center gap-2 py-2 text-xs font-semibold"
                  >
                    <Search className="h-3.5 w-3.5" />
                    <span>
                      Search {year}-{String(month).padStart(2, "0")}-{String(day).padStart(2, "0")}
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Regional Researcher Note for Local Cities (e.g. Visakhapatnam / State Libraries) */}
      <div className="panel-gold rounded-2xl p-6 border-gold/25 bg-gold/5">
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <div className="text-xs text-silver space-y-1.5 leading-relaxed">
            <p className="font-semibold text-foreground">
              Looking for local city editions for {city}?
            </p>
            <p>
              Leading dailies like{" "}
              <span className="text-champagne font-medium">The Hindu (Visakhapatnam edition)</span>,{" "}
              <span className="text-champagne font-medium">Deccan Chronicle</span>, and regional
              language giants such as <span className="text-champagne font-medium">Eenadu</span> and{" "}
              <span className="text-champagne font-medium">Andhra Jyothi</span> maintain physical
              microfilms in state central libraries (such as the State Central Library Hyderabad,
              Connemara Public Library Chennai, and National Library Kolkata).
            </p>
            <p className="text-muted-foreground text-[11px]">
              Researchers can request digital scans or microfilm viewings directly by citing the
              issue publication date.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

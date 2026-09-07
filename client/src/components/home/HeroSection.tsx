import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ANNOUNCEMENTS, getFeaturedAnnouncement } from "@/lib/announcements";

/**
 * Homepage hero excerpt (~50 words). Deliberately shorter than
 * SITE_CONTENT.mission.detailed, which is the full, unabridged wording and
 * still appears verbatim as the opening paragraph of the /mission page.
 * This excerpt covers exactly the same four facts the full text does --
 * public charitable trust, founded 1963, guidance of the Kanchi Kamakoti
 * Peetam, mission of preserving traditional Vedic education -- without
 * inventing any new claim. See PRODUCTION_READINESS.md for the change note.
 */
const HERO_EXCERPT =
  "Veda Rakshana Nidhi Trust is a public charitable trust founded in 1963 under the guidance of the Kanchi Kamakoti Peetam. For over six decades, the Trust has worked to preserve traditional Vedic education — supporting Vedic scholars, students, and Patasalas across India so this ancient oral tradition endures for future generations.";

export default function HeroSection() {
  const featured = ANNOUNCEMENTS.length > 0 ? getFeaturedAnnouncement() : null;

  return (
    <section className="border-b border-border bg-surface lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center">
      {/* lg:min-h-[calc(100vh-4rem)] (4rem = the header's own h-16) makes the
          hero fill the first screen on desktop -- the next section only
          appears once the visitor scrolls. Left as the mobile/tablet default
          (content-sized, not full-height) so phones keep reaching the CTAs
          quickly rather than leaving a large empty gap on short screens --
          flag if you'd like this applied to mobile too. */}
      <div className="mx-auto w-full max-w-wide px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:py-16">
        {/* See the ".hero-grid" rule in index.css for how these six areas are
            arranged differently on mobile/tablet vs. desktop (1024px+, same
            breakpoint the header itself switches at) -- both above the
            fold, no scrolling required, at every required viewport width. */}
        <div className="hero-grid">
          <p
            style={{ gridArea: "eyebrow" }}
            className="mb-1 font-sans text-xs font-bold uppercase tracking-wider text-accent-strong md:mb-0"
          >
            Established 1963 · Public Charitable Trust
          </p>

          <h1
            style={{ gridArea: "heading" }}
            className="font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl"
          >
            Preserving the Eternal Veda Dharma
          </h1>

          <p
            style={{ gridArea: "excerpt" }}
            className="min-w-0 max-w-xl text-base leading-relaxed text-foreground/90 sm:text-lg"
          >
            {HERO_EXCERPT}
          </p>

          <div style={{ gridArea: "ctas" }} className="flex flex-col gap-2 self-start sm:flex-row sm:gap-3">
            <Button asChild size="lg">
              <Link to="/donate">Support the Trust</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/mission">Learn about our mission</Link>
            </Button>
          </div>

          {/* Founder portrait -- a compact thumbnail beside the CTAs on
              mobile, a generously-sized portrait next to the text on
              desktop. Box aspect ratio (3:4) matches the source photo's
              actual pixel dimensions exactly, so the complete portrait is
              always shown -- no cropping. */}
          <div style={{ gridArea: "photo" }} className="w-20 shrink-0 self-start sm:w-24 lg:w-full lg:self-center">
            <img
              src="/images/periyavar.webp"
              alt="His Holiness Sri Sri Chandrashekarendra Saraswati MahaSwamigal, founder-inspiration of Veda Rakshana Nidhi Trust"
              width={900}
              height={1200}
              className="aspect-[3/4] w-full rounded-lg border border-accent/60 object-contain bg-muted shadow-lifted"
            />
          </div>

          {/* Announcement -- a horizontal banner below the CTA/photo row on
              mobile, a substantial vertical card next to the photo on
              desktop. Same element either way, just restyled by breakpoint. */}
          {featured && (
            <div
              style={{ gridArea: "announcement" }}
              className="announcement-glow min-w-0 rounded-lg border-2 border-accent bg-background shadow-soft lg:flex lg:flex-col lg:self-center"
            >
              {/* Horizontal banner (mobile and tablet, below lg) */}
              <Link
                to={`/announcements/${featured.id}`}
                className="flex min-h-11 items-center gap-2.5 px-4 py-2.5 lg:hidden"
              >
                <span className="relative shrink-0">
                  <Bell className="h-4 w-4 text-accent-strong" aria-hidden="true" />
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 truncate font-sans text-sm font-semibold text-foreground">
                  {featured.title}
                </span>
                <span className="shrink-0 font-sans text-xs font-bold text-primary">View →</span>
              </Link>

              {/* Vertical card (lg and up -- matches the header's own desktop breakpoint) */}
              <div className="hidden min-w-0 lg:flex lg:flex-col lg:gap-4 lg:p-8">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-strong">
                    <Bell className="h-5 w-5" aria-hidden="true" />
                    <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="min-w-0 break-words font-sans text-xs font-bold uppercase tracking-wider text-accent-strong">
                      Announcement
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">Published {featured.date}</p>
                  </div>
                </div>
                <h2 className="min-w-0 font-serif text-2xl font-bold leading-snug text-primary">{featured.title}</h2>
                <p className="line-clamp-[10] min-w-0 text-base leading-relaxed text-foreground/80">{featured.summary}</p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
                  <Link
                    to={`/announcements/${featured.id}`}
                    className="font-sans text-base font-bold text-primary hover:underline"
                  >
                    View details →
                  </Link>
                  <Link to="/announcements" className="font-sans text-base font-semibold text-muted-foreground hover:underline">
                    All announcements
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

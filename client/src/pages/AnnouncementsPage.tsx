import { Link, useParams } from "react-router-dom";
import { Calendar, FileText, Download } from "lucide-react";
import { Helmet } from "@/lib/seo";
import { ANNOUNCEMENTS, getAnnouncementById, type AnnouncementAction } from "@/lib/announcements";

function ActionLink({ action }: { action: AnnouncementAction }) {
  const className = "inline-flex min-h-9 items-center gap-1.5 font-sans text-sm font-bold text-primary hover:underline";
  switch (action.type) {
    case "internal-link":
      return (
        <Link to={action.targetPath} className={className}>
          {action.label} →
        </Link>
      );
    case "external-link":
      return (
        <a href={action.url} target="_blank" rel="noopener noreferrer" className={className}>
          {action.label} ↗
        </a>
      );
    case "download-link":
      return (
        <a href={action.url} download={action.filename} className={className}>
          <Download className="h-4 w-4" aria-hidden="true" /> {action.label}
        </a>
      );
  }
}

function PoorthySeptCircular() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-surface p-4 shadow-soft">
        <h2 className="mb-3 text-center font-serif text-lg font-bold text-primary">English Notification</h2>
        <a href="/assets/announcement/poorthy-september-en.webp" target="_blank" rel="noopener noreferrer">
          <img
            src="/assets/announcement/poorthy-september-en.webp"
            alt="Poorthy Pariksha circular, English notification"
            loading="lazy"
            className="w-full rounded-lg border border-border object-contain"
          />
        </a>
        <a
          href="/assets/announcement/poorthy-september-en.webp"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-9 items-center gap-1.5 font-sans text-sm font-bold text-primary hover:underline"
        >
          View full-size announcement ↗
        </a>
      </div>
      <div className="rounded-xl border border-border bg-surface p-4 shadow-soft">
        <h2 className="mb-3 text-center font-serif text-lg font-bold text-primary">Tamil Notification (சுற்றறிக்கை)</h2>
        <a href="/assets/announcement/poorthy-september-ta.webp" target="_blank" rel="noopener noreferrer">
          <img
            src="/assets/announcement/poorthy-september-ta.webp"
            alt="Poorthy Pariksha circular, Tamil notification"
            loading="lazy"
            className="w-full rounded-lg border border-border object-contain"
          />
        </a>
        <a
          href="/assets/announcement/poorthy-september-ta.webp"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-9 items-center gap-1.5 font-sans text-sm font-bold text-primary hover:underline"
        >
          View full-size announcement ↗
        </a>
      </div>
    </div>
  );
}

export default function AnnouncementsPage() {
  const { id } = useParams<{ id: string }>();
  const announcement = id ? getAnnouncementById(id) : undefined;

  if (id && !announcement) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <Helmet title="Announcement not found" description="This announcement could not be found." />
        <p className="text-muted-foreground">This announcement could not be found.</p>
        <Link to="/announcements" className="mt-4 inline-block font-sans text-sm font-bold text-primary hover:underline">
          ← Back to all announcements
        </Link>
      </div>
    );
  }

  if (announcement) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Helmet title={announcement.title} description={announcement.summary} path={`/announcements/${announcement.id}`} />
        <Link to="/announcements" className="mb-6 inline-flex min-h-9 items-center gap-2 font-sans text-sm font-bold text-primary hover:underline">
          ← Back to announcements
        </Link>

        <h1 className="font-serif text-2xl font-bold text-primary sm:text-3xl">{announcement.title}</h1>
        <p className="mt-1 font-sans text-xs uppercase tracking-wider text-muted-foreground">
          Published {announcement.date}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90">{announcement.summary}</p>

        {announcement.actions.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
            {announcement.actions.map((action, i) => (
              <ActionLink key={i} action={action} />
            ))}
          </div>
        )}

        {announcement.id === "poorthy-sept" && (
          <div className="mt-10 border-t border-border pt-8">
            <PoorthySeptCircular />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Helmet
        title="Announcements"
        description="Latest circulars, examination results, and Trust activities from Veda Rakshana Nidhi Trust."
      />
      <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">Updates &amp; Announcements</h1>
      <p className="mt-3 italic text-muted-foreground">
        Latest circulars, examination results, and Trust activities from Veda Rakshana Nidhi Trust.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {ANNOUNCEMENTS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                {item.actions.some((a) => a.type === "download-link") ? (
                  <FileText className="h-5 w-5 text-accent-strong" aria-hidden="true" />
                ) : (
                  <Calendar className="h-5 w-5 text-accent-strong" aria-hidden="true" />
                )}
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-foreground">{item.title}</h2>
                <span className="font-sans text-xs uppercase tracking-wide text-muted-foreground">
                  Published {item.date}
                </span>
              </div>
            </div>
            <Link
              to={`/announcements/${item.id}`}
              className="inline-flex min-h-9 shrink-0 items-center gap-1 self-start rounded-md border border-primary/40 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/5 sm:self-auto"
            >
              Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

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

function StaffRegistrationCircular() {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 shadow-soft sm:p-8">
      <div className="border-b border-border pb-4">
        <h2 className="font-serif text-xl font-bold text-primary sm:text-2xl">
          VRNT Staff Registration Campaign
        </h2>
        <p className="mt-1 font-sans text-sm font-semibold text-accent-strong">
          Request for Cooperation from All Paatashalas
        </p>
      </div>

      <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
        <p>
          VRNT is conducting a Staff Registration Campaign to maintain accurate and up-to-date records of Paatashala
          Administrators, Adhyapakars, and Vidyarthis, and to simplify access to VRNT’s services.
        </p>
        <p>
          We request every Paatashala to support this initiative by ensuring that its Paatashala Administrators and
          Adhyapakars complete registration through the campaign link shared with them.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-background p-5">
        <h3 className="font-serif text-base font-bold text-primary">The campaign will support the following objectives:</h3>
        <ul className="mt-3 space-y-2.5 text-sm text-foreground/90">
          <li>
            <strong className="text-foreground">Vidyarthi Enrollment:</strong> Enable authorized Adhyapakars to enroll Vidyarthis and maintain their details under the respective Paatashala.
          </li>
          <li>
            <strong className="text-foreground">Poorthy and Varshikam Examinations:</strong> Provide accurate student and Paatashala records to support applications and related processes for Poorthy and Varshikam examinations.
          </li>
          <li>
            <strong className="text-foreground">Ease of Use:</strong> Help applicants complete registration and examination-related procedures more conveniently, with less repeated entry of information already recorded in the system.
          </li>
          <li>
            <strong className="text-foreground">Data Security and Confidentiality:</strong> Registration information will be handled confidentially, with access restricted to authorized personnel for relevant VRNT activities.
          </li>
          <li>
            <strong className="text-foreground">No Sharing with Other Organizations:</strong> Information collected through this campaign will be used exclusively for VRNT’s registration, educational, examination, and administrative purposes.
          </li>
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-background p-5">
        <h3 className="font-serif text-base font-bold text-primary">How to Register</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-foreground/90">
          <li>WhatsApp messages will be sent out to Paatashalas based on available contact records with VRNT, containing a campaign registration link.</li>
          <li>Applicants should open the campaign link, verify their mobile number with the OTP received, select the applicable role (<strong>Paatashala Admin</strong>, <strong>Adhyapakar</strong>, or <strong>both</strong>), and submit the required details accurately.</li>
          <li>Applications will be scrutinized by a VRNT Trustee. Upon approval, applicants will receive their VRNT ID and instructions to set up their password and activate access to the VRNT system.</li>
        </ol>
      </div>

      <div className="space-y-3 text-sm text-foreground/90">
        <p>
          We kindly request Paatashala managements to share the registration link with the concerned staff members and assist them in completing registration promptly. Your cooperation will help make Vidyarthi enrollment and examination-related services more convenient and effective.
        </p>
        <p className="font-semibold text-primary">
          For assistance or clarification, please contact the VRNT office.
        </p>
        <p className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
          — VRNT Administration
        </p>
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

        {announcement.id === "staff-registration-campaign" && (
          <div className="mt-10 border-t border-border pt-8">
            <StaffRegistrationCircular />
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

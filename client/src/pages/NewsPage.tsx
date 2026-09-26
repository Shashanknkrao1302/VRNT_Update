import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import { Helmet } from "@/lib/seo";

/**
 * News items are mapped to their real destination on the site (most of this
 * content is also covered, in more depth, on /announcements, /mahotsav, or
 * /donate — this page exists mainly so the original list of headlines from
 * the Trust's news log stays reachable and every link actually resolves).
 */
const NEWS_ITEMS: { title: string; year: string; to: string; download?: { href: string; label: string } }[] = [
  {
    title: "Vijaya Dasami Poorthy Pariksha 2026 - Results",
    year: "2026",
    to: "/announcements/vijaya-dasami-poorthy-results-2026",
    download: { href: "/docs/vijaya-dasami-poorthy-pariksha-results-2026.pdf", label: "Download result PDF" },
  },
  {
    title: "2026 Shankara Jayanti Veda Pariksha Result",
    year: "2026",
    to: "/announcements/shankara-jayanti-result",
    download: { href: "/docs/SJ_2026_MARK_SHEET_RESULT_pdf_1777194961207.pdf", label: "Download result PDF" },
  },
  { title: "60th Year (Shashtyabda) Celebration", year: "2026", to: "/mahotsav" },
  { title: "Poorthy Pariksha Application", year: "2026", to: "/announcements/poorthy-sept" },
  { title: "VRNT Shashtyabda Poorthy Mahotsav", year: "2026", to: "/announcements/vrnt-mahotsav" },
  { title: "Sankara Jayanti 2024 Certificate Function", year: "2024", to: "/announcements/certificate-2024" },
  { title: "Request for Contribution", year: "2024", to: "/donate" },
];

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Helmet
        title="News"
        description="Headlines and updates from Veda Rakshana Nidhi Trust — examinations, celebrations, and Trust activities."
      />
      <h1 className="font-serif text-3xl font-bold text-primary sm:text-4xl">News</h1>
      <p className="mt-3 text-muted-foreground">Headlines and updates from the Trust.</p>

      <ul className="mt-8 flex flex-col gap-3">
        {NEWS_ITEMS.map((item) => (
          <li
            key={item.title}
            className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Link to={item.to} className="font-serif text-base font-bold text-foreground hover:text-primary hover:underline">
                {item.title}
              </Link>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.year}</p>
            </div>
            {item.download && (
              <a
                href={item.download.href}
                download
                className="inline-flex min-h-9 shrink-0 items-center gap-1.5 font-sans text-sm font-bold text-primary hover:underline"
              >
                <Download className="h-4 w-4" aria-hidden="true" /> {item.download.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

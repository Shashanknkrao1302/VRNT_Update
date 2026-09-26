/**
 * Typed announcement/action model shared by the homepage announcement teaser,
 * the /announcements page, and (previously) the notification sidebar.
 *
 * Actions use a discriminated union on `type` so each variant only carries the
 * fields it actually needs, and consumers can `switch` on `type` with full
 * type-narrowing instead of non-null assertions.
 */

export type AnnouncementAction =
  | { type: "internal-link"; label: string; targetPath: string }
  | { type: "external-link"; label: string; url: string }
  | { type: "download-link"; label: string; url: string; filename: string };

export interface Announcement {
  id: string;
  title: string;
  /** ISO date string; used for sorting and display. */
  date: string;
  summary: string;
  /** The most time-sensitive/important announcement is shown on the homepage. */
  priority: "featured" | "normal";
  actions: AnnouncementAction[];
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "vijaya-dasami-poorthy-results-2026",
    title: "Vijaya Dasami Poorthy Pariksha 2026 - Results",
    date: "24 September 2026",
    summary:
      "Results for the VRNT Vijaya Dasami Poorthy Pariksha conducted from 18 to 21 September 2026 are now available. View or download the official result PDF.",
    priority: "featured",
    actions: [
      {
        type: "external-link",
        label: "View result PDF",
        url: "/docs/vijaya-dasami-poorthy-pariksha-results-2026.pdf",
      },
      {
        type: "download-link",
        label: "Download result PDF",
        url: "/docs/vijaya-dasami-poorthy-pariksha-results-2026.pdf",
        filename: "vijaya-dasami-poorthy-pariksha-results-2026.pdf",
      },
    ],
  },
  {
    id: "poorthy-sept",
    title: "Vijaya Dasami Poorthy Exam (September)",
    date: "2026",
    summary:
      "Schedules, registration parameters, and venue assignments for the upcoming Vijaya Dasami Poorthy Examination scheduled for September 2026.",
    priority: "normal",
    actions: [
      { type: "internal-link", label: "View exam details", targetPath: "/announcements/poorthy-sept" },
      {
        type: "external-link",
        label: "Register online",
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfGe_y1ErOfrNsTlb-51mu0LaL6cPXxbKv38hQFFzxecA5BrQ/viewform",
      },
      { type: "download-link", label: "Download application form", url: "/assets/forms/POORTHY_APPL_2024.pdf", filename: "POORTHY_APPL_2024.pdf" },
    ],
  },
  {
    id: "vrnt-mahotsav",
    title: "Shashtyabda Poorthy Mahotsav",
    date: "2026",
    summary:
      "Celebrating 60 years of Veda Rakshana. Certified Vidwans are cordially requested to register for the Diamond Jubilee celebrations.",
    priority: "normal",
    actions: [
      { type: "internal-link", label: "View details", targetPath: "/mahotsav" },
      { type: "external-link", label: "Register now", url: "https://forms.gle/yn41ZqVzk269GppNA" },
    ],
  },
  {
    id: "shankara-jayanti-result",
    title: "2026 Shankara Jayanti Veda Pariksha Result",
    date: "2026",
    summary: "Results for the 2026 Shankara Jayanti Veda Pariksha are now available.",
    priority: "normal",
    actions: [
      { type: "internal-link", label: "View result", targetPath: "/pariksha-result" },
      {
        type: "download-link",
        label: "Download result PDF",
        url: "/docs/SJ_2026_MARK_SHEET_RESULT_pdf_1777194961207.pdf",
        filename: "SJ_2026_MARK_SHEET_RESULT.pdf",
      },
    ],
  },
  {
    id: "certificate-2024",
    title: "Sankara Jayanti 2024 Certificate Function",
    date: "2024",
    summary: "Certificate distribution function held for successful Sankara Jayanti 2024 Veda Pariksha candidates.",
    priority: "normal",
    actions: [],
  },
  {
    id: "donate-req",
    title: "Request for Contribution",
    date: "2024",
    summary: "The Trust welcomes contributions in support of Vedic education and Veda Rakshanam.",
    priority: "normal",
    actions: [{ type: "internal-link", label: "See how you can support", targetPath: "/donate" }],
  },
];

export function getFeaturedAnnouncement(): Announcement {
  return ANNOUNCEMENTS.find((a) => a.priority === "featured") ?? ANNOUNCEMENTS[0];
}

export function getAnnouncementById(id: string): Announcement | undefined {
  return ANNOUNCEMENTS.find((a) => a.id === id);
}

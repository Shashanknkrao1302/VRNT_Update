/**
 * Centralized, typed navigation model.
 *
 * The header, mobile menu, and footer all read from this single source instead
 * of repeating hardcoded nav markup in multiple places.
 */

export interface NavLink {
  label: string;
  path: string;
  /** Short description used only for the mobile menu / footer sitemap, optional. */
  description?: string;
}

export interface NavGroup {
  label: string;
  /** A group with a single link behaves like a plain top-level link. */
  links: NavLink[];
}

export const PRIMARY_NAV: NavGroup[] = [
  { label: "Home", links: [{ path: "/", label: "Home" }] },
  {
    label: "About",
    links: [
      { path: "/mission", label: "Mission & Vision", description: "Our purpose and guiding principles" },
      { path: "/history", label: "History", description: "The Trust's founding and journey since 1963" },
      { path: "/trustees", label: "Trustees", description: "The people who govern the Trust" },
    ],
  },
  { label: "Vedas", links: [{ path: "/vedas", label: "The Vedas" }] },
  {
    label: "Programs",
    links: [
      { path: "/activities", label: "Activities", description: "Ongoing initiatives and schemes" },
      { path: "/events", label: "Events", description: "Convocations, ceremonies, and celebrations" },
      { path: "/pariksha", label: "Pariksha", description: "Examinations and certification" },
      { path: "/mahotsav", label: "Shashtyabda Mahotsav", description: "60th anniversary celebrations" },
    ],
  },
  {
    label: "Media",
    links: [
      { path: "/gallery", label: "Gallery" },
      { path: "/news", label: "News" },
      { path: "/announcements", label: "Announcements" },
    ],
  },
  { label: "Contact", links: [{ path: "/contact", label: "Contact" }] },
];

/** Flat list of every primary nav destination, used by the mobile menu and tests. */
export const PRIMARY_NAV_FLAT: NavLink[] = PRIMARY_NAV.flatMap((g) => g.links);

export const DONATE_LINK: NavLink = { path: "/donate", label: "Donate" };

/**
 * External login destination. This public site does not implement authentication
 * itself — Login always opens the existing external application in a new tab.
 * Do not change this without explicit owner approval.
 */
export const LOGIN_URL = "https://vrnt-app.onrender.com/#/login";

export const FOOTER_LINKS: NavLink[] = [
  ...PRIMARY_NAV_FLAT.filter((l) => l.path !== "/"),
  DONATE_LINK,
];

# Production Readiness — VRNT Public Website

Branch: `production-homepage-redesign` · Baseline: `1e604ea` (main)
This document was produced alongside the redesign, verified against the
actual working tree at each step (not written from memory afterward).

## 1. Original problems (independently reproduced, not assumed)

Every finding below was directly reproduced against the baseline commit before
any code was changed — via `tsc`, `npm run build`, `npm audit`, and Playwright
screenshots/route checks at 1440/1024/768/390/360px.

| # | Finding | Confirmed how |
|---|---|---|
| 1–8 | Fixed sidebar + auto-opening announcement drawer broke desktop and mobile layout, obstructed content, used hardcoded pixel offsets and escalating z-index (`z-[1100]`–`z-[1400]`) kept in sync by hand across 5+ files | Read `App.tsx`, `NotificationSidebar.tsx`, `Navbar.tsx`; screenshotted the live drawer-open-by-default state |
| 5 | Announcement drawer opened by default | `App.tsx: useState(true)` for `isDrawerOpen` |
| 6 | Mobile "LOGIN HERE" rendered one letter per line | Reproduced in a screenshot; root cause was `flex-col` wrapping 10 individual `<span>` elements |
| 9 | Navigation manually duplicated (not data-driven) | Two near-identical ~70-line JSX blocks in `App.tsx` for mobile vs desktop nav |
| 10 | Both React Router and Wouter present | `react-router-dom` was the live router; `wouter` was imported only by files unreachable from the router (confirmed via `grep`) |
| 11 | Substantial Replit/server/DB scaffolding | `server/routes.ts` was a literal empty stub (`// put application routes here`); `vercel.json` only did static rewrites, never invoked the server |
| 12 | `npm run check` failed with 30+ TS errors | Reproduced: **33 errors**, mostly from an entire orphaned `client/src/pages/*` tree using named imports (`{ Navbar }`) against default-exported components |
| 13 | Incorrect named imports for default-exported components | 18 mismatches found in the dead `pages/` tree |
| 14 | `NotificationSidebar.tsx` unsafe action union typing | Confirmed: no discriminated union, `act.targetPath!` non-null assertions with no actual type narrowing |
| 15 | Production build succeeded despite failing type-check | Reproduced |
| 16 | Main bundle ~603 KB before gzip, chunk-size warning | Reproduced: 602.62 KB / 171.39 KB gzip, Rollup warning present |
| 17 | Multiple dependency vulnerabilities | `npm audit`: 18 vulnerabilities (2 low, 5 moderate, 11 high) |
| 18 | SEO metadata generic/incomplete | No `<meta name="description">`, no `og:image`/`twitter:image`, no `robots.txt`/`sitemap.xml` |
| 21 | Backend exposes no real API routes | Confirmed by reading `server/routes.ts` in full |
| 22 | README described the site as a prototype | Confirmed |

**Findings beyond the original list, discovered during the audit:**
- The live homepage (`App.tsx`'s `/` route) rendered only `Hero` + `VedaVruksham` — the file literally named `client/src/pages/home.tsx` was completely disconnected from the router.
- The `*` catch-all route re-rendered the homepage for **any** unmatched URL (HTTP 200, no real 404) instead of the `not-found.tsx` page that already existed but was never wired up.
- Two duplicate presentations of "Maha Periyava's Message" existed in the live component tree (image version in `VedaVruksham.tsx`, text version in `Mission.tsx`) that would have collided if naively assembled onto a fuller homepage.
- `/news`'s six headlines mostly pointed at `link: "#"` (dead links).
- `sonner`'s `toast()` was called in `Donate.tsx` with no `<Toaster/>` ever mounted — the copy-to-clipboard feedback was silently doing nothing.
- ~50 of 53 shadcn/ui component files had zero reachable references from any route.

## 2. Changes made

**Architecture**
- Single router (`react-router-dom`); `wouter` removed.
- Centralized, typed navigation model (`lib/navigation.ts`) and announcement model with a discriminated-union `Action` type (`lib/announcements.ts`) — both header, footer, and mobile menu read from the same source instead of duplicating markup.
- Route-level code splitting via `React.lazy` + `Suspense` for every route.
- Removed the Express/Drizzle/Passport/PostgreSQL backend scaffold, `shared/schema.ts`, `drizzle.config.ts`, `script/build.ts`, and Replit-specific tooling (`.replit`, three `@replit/vite-plugin-*` packages, a dead meta-images plugin) — approved by the owner during the audit phase. `npm run build` is now plain `vite build`; `npm run dev` is plain `vite`.
- Deleted the ~16-file orphaned `client/src/pages/*` tree and 3 orphaned `components/sections/*` files that were never reachable from the router; restored their **unique** content instead of just discarding it (see below), and deleted only the files that were pure duplicates of already-live content.
- Deleted ~50 unused `components/ui/*` shadcn files (verified zero reachable references via a full-tree grep before deletion); the 5 still in use (`button`, `card`, `sheet`, `navigation-menu`, `sonner`) were kept and lightly cleaned up (Button's dead Replit-only utility classes removed, Card's shadow/border tokenized).

**Header, navigation, footer**
- Replaced the fixed sidebar with a conventional sticky header: logo/name, a Radix `NavigationMenu` with grouped dropdowns (About / Vedas / Programs / Media / Contact) instead of one long flat list, a prominent Donate button, and a distinct Login link.
- Replaced the sidebar+drawer mobile nav with a Radix `Dialog`/`Sheet` slide-over: built-in focus trap, Escape-to-close, background scroll lock, closes automatically on navigation. This is also what fixed the vertical "LOGIN HERE" bug — the collapsed-rail variant that caused it no longer exists.
- Rebuilt the footer with a real site-map (from the same nav data), contact address, and the login link.
- Added a skip-to-content link and an `id="main-content"` landmark.

**Homepage**
- Rebuilt around the previously-dead root route with the requested hierarchy: hero (mission statement + two CTAs + a founder portrait), one non-blocking announcement teaser card (not an overlay), mission/activities/pariksha/heritage teasers linking to full pages, one canonical Veda Vruksham + Maha Periyava's Message section, a donate CTA, and a contact summary.
- New teaser components (`components/home/*`) were written specifically to avoid the duplication risk described above — they excerpt and link rather than embedding full page components.

**Internal pages**
- Every remaining page (Mission, Activities, Trustees, the three Vedas sub-articles, Pariksha + its Varshika/Poorthy/Sanskrit sub-views, Donate, Contact, Mahotsav, History, Gallery, ParikshaResult, initiatives) now shares the same header/footer/container/typography/card conventions, has a real `<h1>`, and a page-specific `<title>`/meta description.
- Trustees.tsx previously showed a thinner duplicate roster (name/role only); it now renders the fuller `SITE_CONTENT.trustees` data (phone/email/address, gracefully omitted where absent) — one data source instead of two disagreeing ones.
- Gallery's auto-rotating carousel now respects `prefers-reduced-motion` and pauses on hover/focus.
- Restored previously-orphaned but genuinely unique content instead of deleting it outright: the full Vedas About/Rakshanam/Vyasa text (previously three unreachable pages with broken external-domain image URLs) is merged into `components/sections/Vedas.tsx`'s self-contained accordion; `/news` now maps every headline to its real destination instead of a dead `#` link.
- Mounted `<Toaster/>` so Donate's copy-to-clipboard feedback is now actually visible.

**No religious, historical, or mission-statement text was rewritten, shortened, or translated.** Every restyle preserved copy verbatim — only container, typography, and color classes changed. The one exception is the homepage, which deliberately uses short excerpts with "read more" links rather than the full page text, to avoid the duplication problem described in finding set 3.

**Design system** (`client/src/index.css`)
- HSL color tokens: deep maroon `--primary`, deep navy `--secondary`, temple gold `--accent` (plus `--accent-strong`/`--accent-soft` — see Accessibility below), warm parchment `--background`, `--surface` for cards, `--success`/`--warning`/`--destructive`.
- A registered z-index scale (`z-header`/`z-dropdown`/`z-overlay`/`z-drawer`/`z-toast`) instead of arbitrary per-component numbers.
- `max-w-content`/`max-w-wide` container tokens, `shadow-soft`/`shadow-lifted` (replacing hard "comic" offset shadows like `shadow-[4px_4px_0_#222]` everywhere they appeared), a `prefers-reduced-motion` global rule, and a visible `:focus-visible` ring on every interactive element.
- Trimmed the loaded Google Fonts to two families/weights actually used (Cormorant Garamond, Lato) — the previous `index.html` loaded four families including two (Martel, Roboto) that were never referenced by the CSS.

**SEO**
- Per-route `<title>`/meta description via a small dependency-free `Helmet` component (`lib/seo.tsx`) — no new npm dependency for this.
- `meta description`, canonical link, `og:image`/`twitter:image` (previously absent despite the image file already existing), NGO structured data built only from facts already present in the repo (name, founding year, address).
- `robots.txt` and `sitemap.xml` added.

**Dependencies & security**
- `package.json` trimmed to what a full repo-wide import grep confirmed is actually used: React, react-router-dom, framer-motion, lucide-react, sonner, three Radix primitives, class-variance-authority, clsx, tailwind-merge, plus Vite/Tailwind/TypeScript/Vitest tooling. `npm install` removed 229 packages.
- `npm audit fix` (non-breaking only — **not** `--force`): 18 vulnerabilities → **0**.
- Added baseline security headers to `vercel.json` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`). A full Content-Security-Policy was deliberately **not** added — the site embeds a Google Maps iframe and YouTube iframes, and a CSP needs to be built and tested against those specifically rather than guessed at; see "Items requiring owner validation."

## 3. Routes tested

All 18 routes, checked for HTTP 200, a real `<h1>`, a unique page title, and zero browser console errors:

`/`, `/mission`, `/initiatives`, `/activities`, `/vedas`, `/vedas/maha-periyavas-message`, `/pariksha`, `/gallery`, `/history`, `/trustees`, `/donate`, `/contact`, `/mahotsav`, `/pariksha-result`, `/announcements`, `/announcements/:id` (tested with `poorthy-sept`), `/news`, and an unmatched URL (now correctly renders the 404 page — previously silently rendered the homepage).

Also checked: direct-load of every client-side route (not just client-side navigation), which was the original failure mode for the catch-all bug.

## 4. Responsive widths tested

1440px, 1024px, 768px, 390px, and 360px — homepage screenshotted at all five; 11 internal pages screenshotted at 1440px and 390px. No horizontal overflow (`scrollWidth > clientWidth`) at any width, on any page tested.

## 5. Accessibility checks performed

- **Computed exact WCAG contrast ratios** for the whole color palette (not eyeballed) — this caught a real defect introduced during the redesign itself: gold `text-accent` on the parchment background measured 2.4:1, well under the 4.5:1 AA minimum for normal text. Fixed with two purpose-built tokens (`accent-strong` for text on light backgrounds, `accent-soft` for text on the dark maroon/navy panels where the base `--accent` was already correct) rather than one blanket change, since a single fix would have made text unreadable in the other context. Verified final ratios: body text 15:1, primary-on-background 7.75:1, button text 6.3–8:1, `accent-strong` on parchment 5.5–7.2:1, `accent-soft` on maroon/navy 4.3–8.8:1.
- Semantic landmarks: `<header>`, `<main id="main-content">`, `<footer>`, `<nav aria-label>`.
- Logical heading order: every route now has exactly one `<h1>`, with `<h2>`/`<h3>` nested correctly beneath it (previously most pages had no `<h1>` at all, or used `<h2>`/`<h3>` for the page title).
- Keyboard navigation: header dropdowns (Radix NavigationMenu) and the mobile menu (Radix Dialog) are keyboard-operable out of the box; Pariksha's YouTube hover-preview cards were given `onFocus`/`onBlur` handlers mirroring the hover behavior so they work without a mouse.
- Visible `:focus-visible` ring defined globally.
- Skip-to-content link, first in tab order.
- Mobile menu: focus trap, Escape closes it, background scroll locked while open, closes automatically on navigation — all verified with an automated Playwright test, not just visual inspection.
- Alt text: every `<img>` reviewed and given specific alt text (previously several were generic or missing); decorative icons marked `aria-hidden="true"`.
- Touch targets: interactive elements sized to a `min-h-9`/`min-h-11` minimum (36–44px).
- `prefers-reduced-motion` respected globally in CSS, and specifically in Gallery's auto-advancing carousel (which also pauses on hover/focus).
- External links use `target="_blank" rel="noopener noreferrer"`.
- No content hidden behind fixed elements — the whole fixed-sidebar/drawer architecture that caused this was removed.

## 6. Performance improvements

| Metric | Before | After |
|---|---|---|
| Main JS bundle | 602.62 KB (171.39 KB gzip), Rollup chunk-size warning | 369.31 KB (117.62 KB gzip) largest chunk, no warning — every route now code-splits into its own chunk |
| CSS bundle | 138.96 KB (22.31 KB gzip) | 65.60 KB (10.97 KB gzip) — after deleting ~50 unused ui component styles |
| `tsc --noEmit` errors | 33 | 0 |
| `npm audit` vulnerabilities | 18 (2 low, 5 moderate, 11 high) | 0 |
| npm packages | (pre-trim baseline) | 229 packages removed by `npm install` |
| Google Fonts loaded | 4 families, many weights | 2 families, minimal weights |

Also: every `<img>` on every touched page has `loading="lazy"` (except deliberately above-the-fold images like the hero portrait); route-level code splitting means a visitor to any single page downloads only that page's JS, not the whole site.

**Image optimization**: done in a later pass — see Section 10.5 for the full before/after (56.75 MB → 9.95 MB of referenced image weight, an 82.5% reduction).

## 7. Dependency / security changes

See "Dependencies & security" above. Full before/after dependency list is in the git history of `package.json` on this branch (commit "Phase 2/3: restyle all internal pages, remove backend scaffold and dead deps").

## 8. Known limitations

- **No CSP.** Deliberately not added without the ability to test it against the live Google Maps/YouTube embeds and Google Fonts — see "Items requiring owner validation."
- **`/news` and `/announcements` overlap conceptually.** Investigating the original `SITE_CONTENT.news` data showed it was a weaker, mostly-duplicate version of what `/announcements` already covers properly (most of its links were dead `#` placeholders). `/news` now correctly routes every headline to its real destination, but the owner may want to fold News and Announcements into one concept going forward, or drop News from primary navigation once confirmed.
- **Dark-mode tokens removed.** The original `index.css` had an unused `.dark` theme block (no toggle existed anywhere in the app). It was not carried forward, since the site has one deliberate light theme; this is a simplification, not a missing feature — flag if dark mode was actually planned.
- **`framer-motion` remains a dependency** (used by Pariksha, Donate, Mahotsav, Gallery, History, and the three exam sub-pages for entrance animation). It's a real, verified live usage, not dead weight, but it is a meaningfully sized package if bundle size becomes a future concern.
- **No CI pipeline configured.** `npm run check`, `npm run build`, and `npm run test` all pass locally and are documented in the README, but there is no GitHub Actions/Vercel-integrated gate gating merges on these — recommend adding one.

## 9. OWNER_VALIDATION_REQUIRED

These items are preserved as-is (current functionality kept, or only a safe
presentation improvement applied) specifically because they should not be
guessed at. None of them block the technical corrections in Section 10 — the
two lists are independent.

1. **Production domain — now with conflicting evidence.** Metadata (canonical URL, `og:url`/`og:image`, structured data, `sitemap.xml`) assumes `https://www.vrnt.org`, inferred from two now-deleted hardcoded references already present in the old codebase. **New finding from today's image-optimization pass**: the actual Poorthy exam circular image (`/assets/announcement/poorthy-september-en.jpg`, an official Trust document) prints `Web site: www.vedarakshanam.org` and `E-Mail: office@vrnt.org` in its own letterhead — i.e. the Trust's own printed material states a *different* domain than what this codebase assumes everywhere else. **No domain has been changed anywhere in the code** — this is flagged, not acted on. Files affected if a decision is made: `client/index.html` (canonical link, `og:url`, `og:image`, `twitter:image`, the NGO structured-data `url`/`logo` fields), `client/public/robots.txt` (`Sitemap:` line), `client/public/sitemap.xml` (every `<loc>`), `client/src/lib/seo.tsx` (`SITE_URL` constant).
2. **`/news` vs `/announcements`.** See "Known limitations" — confirm whether these should stay separate or merge.
3. **Trustees contact data.** `Trustees.tsx` surfaces phone/email/address for each trustee from `SITE_CONTENT.trustees` — confirm this level of detail is still meant to be public (it was already in the codebase, just not rendered by the live page before Phase 2). File: `client/src/components/sections/Trustees.tsx`.
4. **Golden Jubilee circular — resolved for the homepage, original still on `/history`.** The homepage "Our Heritage" teaser no longer uses `/history/Golden jublee.jpg` (a scanned invitation, not a photograph) — it now uses an authentic archival photograph (`/history/IMG-20260716-WA0008.jpg`, see Section 10.4 below) as a genuinely better fit for a hero-style teaser image. The scanned circular itself is untouched and still used, appropriately, inside `/history`'s own "Golden Jubilee circular viewer" section (a document-viewer context, not a hero image) — see `client/src/components/sections/History.tsx`. If the owner specifically wanted the circular itself as the homepage's heritage image (e.g. because of its printed content, not its visual quality), that would need to be reverted in `client/src/pages/home.tsx`.
5. **CSP.** If the owner wants a Content-Security-Policy, it needs to be built and tested specifically against: Google Fonts (`fonts.googleapis.com`/`fonts.gstatic.com`), the Google Maps iframe embed on `/contact`, YouTube iframe embeds on `/pariksha` and `/history`, and the external Google Forms/Photos links (which don't need CSP allowances since they're plain links, not embeds). File: `vercel.json`.

## 10. Visual QA correction pass (rendered-browser review)

A second pass, prompted by an independent rendered-browser review of the
Phase 1/2 production build (not just component code). Every finding below
was reproduced first (computed styles, DOM measurements, or a screenshot),
then corrected, then re-verified with a fresh production build. The
architecture, routing, and shared layout from Phases 1–2 were **not**
rewritten — this is a correction pass on top of them.

### 10.1 Desktop navigation contrast — release blocker, fixed

**Reproduced**: computed styles on the live production build showed every
desktop nav label (`Home`, `About`, `Vedas`, `Programs`, `Media`, `Contact`)
rendering `color: oklab(0.981 ... / 0.9)` (a near-white token) on a header
`background-color` of `oklab(0.968 ... / 0.95)` (a near-white background) —
i.e. white-on-off-white text. Root cause: `client/src/components/layout/Header.tsx`
used `text-secondary-foreground` on both the direct nav-link classes and the
dropdown-trigger classes. `--secondary-foreground` is the near-white token
paired with the dark navy `--secondary` background (used correctly
elsewhere, e.g. the footer) — it was never meant for the light header.

**Fixed**: nav text now uses `text-secondary` (navy) by default,
`text-primary` (maroon) on hover/focus-within/dropdown-open/current-page.
Computed contrast ratios (WCAG 2.2, verified with the actual palette
values, not eyeballed):

| State | Color pair | Ratio | AA (4.5:1) |
|---|---|---|---|
| Default | `--secondary` navy on header background | 13.53:1 | Pass |
| Hover / active page / dropdown open | `--primary` maroon on header background | 7.75:1 | Pass |
| Scrolled header (shadow/border added, background unchanged) | same as default | 13.53:1 | Pass |

Also fixed while verifying every state as instructed:
- **The "active"/current-page state was never actually wired.** The
  original code used a `data-[active=true]:` Tailwind selector, but
  react-router-dom's `NavLink` marks the current page via
  `aria-current="page"`, not a `data-active` attribute — so that selector
  never matched anything, silently. Switched to `aria-[current=page]:`.
- **Keyboard focus was invisible on 6 of 10 interactive header elements**
  (logo link, the 3 dropdown triggers, Donate, Login), found while
  Tab-testing every element for a visible focus indicator per this fix's
  own requirements. Two different causes: the logo link and the shared
  `navigationMenuTriggerStyle` base both set `outline-none`/`focus:outline-none`
  with no replacement indicator (now removed, falling back to the global
  `:focus-visible` outline); Donate/Login (the `Button` component) were
  never actually broken — they legitimately swap the outline for an
  equally-visible `box-shadow` ring, confirmed by reading the computed
  `box-shadow` (a 4px maroon ring) rather than assuming from the outline
  alone.
- Backdrop-blur was checked and does not affect text contrast — the header
  background is a solid semi-transparent fill behind fully-opaque text; blur
  only affects content scrolling underneath it.

**Regression test added**: `client/src/components/layout/Header.test.tsx` —
asserts no header nav item ever renders a `*-foreground` text-color class
(the exact shape of this bug), asserts a dark/readable color class is
present on every direct link and dropdown trigger, and asserts no header
element suppresses the focus outline without a compensating ring.

### 10.2 Mobile hero hierarchy — fixed

**Reproduced**: at 390×844, `document.querySelector('img').getBoundingClientRect()`
showed the founder portrait occupying y=113 to y=560 (447px tall, more than
half the viewport) with the `<h1>` not appearing until y=628 — i.e. the
portrait rendered *before* the heading in document order (`order-first
md:order-last` was putting the image first on mobile), pushing the mission
statement and both calls-to-action off the first screen entirely.
Screenshotted for direct visual confirmation before changing anything.

**Fixed** (`client/src/components/home/HeroSection.tsx`): the content block
(eyebrow label, `<h1>`, mission excerpt, both CTAs) now comes first in
document order unconditionally — no order trick needed, since content is
simply written first in JSX and the two-column grid only applies at `md:`
and above. The portrait is capped to `w-48` (mobile) / `w-64` (small) before
growing to fill its column at `md:w-full`, so on the narrowest viewports it
reads as a modest supporting image below the CTAs rather than a full-viewport
takeover. `width`/`height` attributes and an `aspect-[4/5]` class are kept
throughout to prevent layout shift. Desktop (`md:` and up) is visually
unchanged — same two-column grid, same full-size portrait.

**Verified** at 360, 390, 768, 1024, and 1440px: no overflow, no layout
shift, no awkward cropping (the same `object-cover` + fixed aspect ratio as
before, just at a smaller rendered size on mobile).

### 10.3 Homepage hero copy — shortened, documented for approval

**Before** (75 words, the full `SITE_CONTENT.mission.detailed` paragraph,
still unchanged and still the opening paragraph of `/mission`):

> VEDA RAKSHANA NIDHI TRUST (VRNT) is a Public Charitable Trust sponsored by
> Kanchi Kamakoti Peetam founded in 1963 under the guidance of His Holiness
> Sri Sri Chandrashekarendra Saraswati MahaSwamigal. Learning and teaching
> the Vedas through the traditional Gurukula system is not merely an
> academic pursuit—it is a way of life, a sacred journey that nurtures both
> character and intellect. In this ancient and time-honoured system,
> education transcends classroom boundaries and becomes an immersive
> spiritual discipline.

**After** (50 words, homepage hero only — `client/src/components/home/HeroSection.tsx`, `HERO_EXCERPT` constant):

> Veda Rakshana Nidhi Trust is a public charitable trust founded in 1963
> under the guidance of the Kanchi Kamakoti Peetam. For over six decades,
> the Trust has worked to preserve traditional Vedic education —
> supporting Vedic scholars, students, and Patasalas across India so this
> ancient oral tradition endures for future generations.

**⚠ OWNER APPROVAL NEEDED for this specific copy change.** It covers the
same four facts as the original (public charitable trust; founded 1963;
guidance of the Kanchi Kamakoti Peetam; mission of preserving traditional
Vedic education) without inventing any new claim — "for over six decades"
is arithmetic from the stated 1963 founding year, not a new assertion, and
matches the site's own existing Shashtyabda (60th-year) framing used
elsewhere. No religious passage was touched. The full original wording is
unchanged on `/mission`.

### 10.4 Homepage image selection and presentation

Inventoried existing local assets (`client/public/images/`, `client/public/assets/`,
`client/public/history/`) before choosing anything; no stock or AI-generated
image was added (`client/public/assets/generated_images/` already existed
from before this pass and was itself removed from homepage use, see below —
not added to).

| Section | Original | Change | Reason | Owner validation |
|---|---|---|---|---|
| Homepage "Mission & Vision" teaser | `/images/vedic-heritage.png` (a heavily-saturated stock-style graphic of book spines) | → `/images/education.jpg` (an authentic photo of a teacher and students at a Veda Patasala) | Authentic, on-theme, already in the repo; the graphic was the specific "heavily saturated" issue named in the review | None — straightforward quality swap |
| `/mission` page's own "Vedic Heritage" card | `/images/vedic-heritage.png` (same file, same issue, also in the explicitly-listed `/mission` inspection scope) | → `/assets/Kanchi_shankaracharyas_1768738006479.jpg` (an authentic colorized archival photo of the Kanchi Acharyas) | Same underlying asset/issue as the homepage teaser; fixed for consistency | None |
| Homepage "Activities & Programs" teaser | `/assets/generated_images/vedic_scriptures_and_oil_lamp_warm_background.png` (AI-generated, per its own folder name) | → `/assets/HNY.jpg` (an authentic photo of a Hereditary Niyama Adhyayanam teaching session) | Not flagged in this review, but a strictly-better authentic asset was available and the task's spirit disfavors AI-generated imagery where a real alternative exists | Discretionary improvement, not requested — flagging in case the AI-generated look was actually preferred |
| Homepage "Pariksha" teaser | `/images/education.jpg` (moved to Mission & Vision, see above) | → `/assets/Acharya certificate.jpg` (an authentic photo of an Acharya presenting an exam certificate) | Frees the education photo for Mission & Vision; this photo is a stronger thematic fit for "examinations" | None |
| Homepage "Our Heritage" teaser | `/history/Golden jublee.jpg` (a scanned invitation/circular, not a photograph) | → `/history/IMG-20260716-WA0008.jpg` (an authentic black-and-white archival photo of the founding-era Acharya blessing devotees) | A genuine photograph reads as "heritage" far better than a scanned document; the circular remains, appropriately, inside `/history`'s own document-viewer section | See OWNER_VALIDATION_REQUIRED #4 |

Every replacement is an asset that already existed in `client/public/` before
this pass — nothing was downloaded. No text inside any scanned document was
altered (the Golden Jubilee circular's own pixels are completely untouched,
it just isn't the homepage's featured image anymore).

### 10.5 Image optimization

**Inventory**: a source grep found 64 distinct images actually referenced by
routes (portraits, event/gallery photography, scanned circulars, the Veda
Vruksham diagram, the header logo), totalling **56.75 MB**. Several were
multi-megabyte camera-original JPEGs at 4096×3072px+ (and one, the header
logo, at 4096×5120px — 21 megapixels — rendered on screen at 44×44px).

**Method**: a one-time development script, `scripts/optimize-images.mjs`
(documented at the top of the file, run via `npm run optimize-images`),
using `sharp` as a **devDependency only** (never shipped to the browser —
confirmed 0 runtime `dependencies` added, only `devDependencies`). For each
referenced image it generates a sibling `.webp`:
- **Text-heavy scans/diagrams** (the two Poorthy circulars, the Golden
  Jubilee circular, Maha Periyava's letter, the Veda Vruksham diagram): no
  resize, quality 90. **Manually verified legible** at full resolution after
  conversion — every line of small print (phone numbers, dates, a Google
  Form URL) on the Poorthy circular reads clearly; the multi-column Vedic
  branch names on the tree diagram are unchanged and sharp.
- **The header logo**: resized to 256×256 (renders at 44×44px on screen —
  256px covers even a 4x-density retina display), quality 82.
- **Everything else** (portraits, event photography): capped at 1600px on
  the long edge (generous for the largest actual use, the Gallery carousel
  at up to ~1200px), quality 80.

**Originals were not modified or deleted** — every optimized file is a new
`.webp` alongside its source. The application was then updated (a scripted,
verified string-for-string swap, not a manual edit) to reference the
`.webp` path everywhere a route actually uses that image; one image
(`/assets/jayendra_saraswathi.jpg`) was excluded because its `.webp`
came out *larger* than the original (80 KB → 86 KB, an already
well-compressed small JPEG) — it was left as the original JPEG.

**Before / after** (the 64 referenced images):

| | Size |
|---|---|
| Before (originals, as referenced) | 56.75 MB |
| After (optimized, as now referenced) | 9.95 MB |
| Reduction | **82.5%** |

Largest individual reductions:

| Image | Before | After | Reduction |
|---|---|---|---|
| `images/logo.jpg` (header logo, was 4096×5120px for a 44×44px use) | 1,683 KB | 16 KB | −99% |
| `assets/shashti.png` (Mahotsav poster) | 2,219 KB | 188 KB | −92% |
| `poorthy/second gallery/IMG_20250831_093917757_HDR.jpg` | 4,665 KB | 423 KB | −91% |
| `poorthy/second gallery/IMG_20250831_093631544_HDR.jpg` | 3,941 KB | 403 KB | −90% |
| `assets/generated_images/Maha Periyava messages.png` | 2,968 KB | 457 KB | −85% |
| `poorthy/third gallery/20240911_085056.jpg` | 3,035 KB | 226 KB | −93% |
| `history/IMG-20260716-WA0010.jpg` | 103 KB | 13 KB | −87% |

Full per-file output is reproducible by re-running `npm run optimize-images`
(idempotent — it just regenerates the same `.webp` files).

**Note on repository/deploy size**: per the instruction to preserve
originals, both the original and the `.webp` now exist in
`client/public/`, and Vite copies the entire `public/` directory into
`dist/` verbatim — so the *deployed artifact* contains both (originals are
simply unreferenced dead weight in the deploy, not fetched by browsers).
The 56.75 MB → 9.95 MB figure above is what a visitor's browser actually
downloads (the only number that affects real-world page performance), which
is the metric that matters here.

**Verified no broken images**: after the swap, a fresh production build was
screenshotted and DOM-inspected (`img.complete`/`img.naturalWidth`) across
all 5 homepage widths and 9 internal pages at 1440/390px, with the page
fully scrolled through first (to rule out lazy-loading timing false
positives, which did appear in an initial un-scrolled check and were
confirmed to resolve to 0 once given a moment to actually load). Zero
broken images on any route.

### 10.6 Test-warning cleanup

**Before**: `npm run test` passed but printed a `Not implemented:
window.scrollTo` JSDOM error on every test that renders `<App/>` (its
`ScrollToTop` effect calls the real `window.scrollTo`, which JSDOM doesn't
implement).

**Fixed**: `client/src/test/setup.ts` now stubs `window.scrollTo = vi.fn()`
in a `beforeEach`, once, globally — documented inline as to why. This does
**not** touch, weaken, or mock away the app's real scroll-reset behavior;
the `ScrollToTop` effect in `App.tsx` is completely unchanged and still
runs and calls `scrollTo` in every test, it just no longer hits JSDOM's
unimplemented-API warning path. No other console output is suppressed.

**Verified**: full `npm run test` output is clean — 25/25 tests pass, no
`window.scrollTo` warning, no other warnings.

### 10.7 Widths and routes visually rechecked (this pass)

Rendered-browser review used a **production build** (`npm run build` +
`npm run preview`), not the dev server, per the review's own requirement.

- Homepage at all 5 required widths: 1440×900, 1024×768, 768×1024, 390×844,
  360×800 — header readability, nav visibility, hero ordering/dimensions,
  heading/CTA visibility, announcement presentation, section spacing, image
  loading, contact section, and footer all checked; zero horizontal
  overflow at any width.
- Internal pages at 1440px and 390px: `/mission`, `/activities`, `/pariksha`,
  `/donate`, `/contact`, `/gallery`, `/history`, `/announcements`,
  `/this-route-does-not-exist` — zero overflow, zero console errors, zero
  broken images (after accounting for lazy-load timing, see 10.5) on any of
  the 18 checks (9 routes × 2 widths).
- Interaction checks, all against the production build: desktop dropdown
  open/readable/operable (About → Mission & Vision → navigates to
  `/mission`); real keyboard Tab sequence through every header element
  confirming a visible focus indicator (outline or ring) on each one; mobile
  menu opens, Escape closes it, body scroll is `overflow: hidden` while
  open, navigating via a mobile-menu link both navigates and closes the
  menu; Login link (desktop and mobile) resolves to exactly
  `https://vrnt-app.onrender.com/#/login` with `target="_blank"` and
  `rel="noopener noreferrer"`; Donate is a real internal `<Link>` (not a
  fake button); an announcement detail link, a direct route load
  (`/mission`, `/donate`, `/announcements/poorthy-sept`, all 200), and two
  PDF links (`POORTHY_APPL_2024.pdf`, the result PDF) all resolve
  `200`/`application/pdf`.
- Quality gate, run twice — once mid-pass and once from a clean `npm ci` —
  both clean: `npm run check` (0 errors), `npm run test` (25/25, no
  warnings), `npm run build` (succeeds, main chunk 368.6 KB/117.3 KB gzip),
  `npm audit` (0 vulnerabilities, including with `sharp` newly added as a
  devDependency).

## 11. Vercel deployment checklist

- [ ] Confirm production domain matches what's assumed in metadata (see OWNER_VALIDATION_REQUIRED #1 — note the new `vedarakshanam.org` vs `vrnt.org` conflict found this pass); update `client/index.html`, `client/src/lib/seo.tsx`, `client/public/sitemap.xml`/`robots.txt` if not `vrnt.org`.
- [ ] Vercel project settings: build command `npm run build` (unchanged), output directory `dist` (unchanged), install command `npm ci`.
- [ ] No environment variables required — this repo holds no secrets and no backend.
- [ ] `vercel.json` already handles the SPA rewrite, asset caching, and the security headers — no changes needed unless the domain changes.
- [ ] After deploy: spot-check the external Login button opens `https://vrnt-app.onrender.com/#/login` in a new tab from both desktop and mobile.
- [ ] After deploy: verify direct-load of a client-side route (e.g. `https://<domain>/mission` typed directly into the address bar) works — this was the original catch-all bug's failure mode.
- [ ] After deploy: re-check desktop nav contrast and mobile hero ordering on the actual deployed URL (not just localhost) once, since fonts/CDN timing can occasionally differ.
- [ ] Get owner sign-off on the homepage hero copy change (Section 10.3) before or immediately after this deploys — it's a visible, public-facing wording change.
- [ ] Submit `sitemap.xml` to Google Search Console once the domain is confirmed.

**Updated recommendation**: the branch is ready for a Vercel **preview**
deployment (not a production promotion) once the owner has seen this
document — specifically Section 10.3 (hero copy) and the
OWNER_VALIDATION_REQUIRED items. All automated and rendered-browser checks
pass; nothing outstanding is a technical blocker. The domain conflict found
in Section 9 item 1 should be resolved before a **production** promotion,
since it affects canonical URLs, Open Graph previews, and the sitemap.

## 12a. Post-handoff refinement — announcement above the fold

An explicit owner requirement, requested and confirmed after reviewing the
first handoff: the featured announcement had to be visible on the homepage
**without scrolling**, on every required width, since site visitors
specifically come to check announcements. Three layout options (with
tradeoffs) were presented for the desktop hero and two for mobile before
any code changed; the owner picked "announcement stacked above a smaller
portrait" for desktop and "compact one-line banner" for mobile.

**Change**: `AnnouncementTeaser.tsx` (previously its own full-width section
directly below the hero, requiring a scroll to reach) was folded into
`HeroSection.tsx`'s right column, which now stacks the announcement above a
smaller founder portrait instead of one large image alone. Below the `md:`
breakpoint the announcement collapses to a single-line banner (title +
"View →"); at `md:` and up it's the full card (icon, eyebrow, title,
3-line-clamped summary, both links). The portrait shrank accordingly
(`w-28`/`w-32` mobile → `max-w-[200px]` desktop, was `w-48`/`w-64` → full
column) but was kept, not removed, in the hero.

**Verified with `getBoundingClientRect`**, not assumed: the announcement's
own link element sits fully within the viewport height (`y + height ≤
viewport height`) at all 5 required widths (1440×900, 1024×768, 768×1024,
390×844, 360×800), confirmed on a fresh production build.

**Regression caught and fixed during this change**: adding the announcement
into the grid's second column introduced a real horizontal-overflow bug at
360px (13px of scroll) — a textbook CSS Grid issue where grid items default
to `min-width: auto`, so a track won't shrink below its content's intrinsic
minimum width. Fixed by adding `min-w-0` to both direct grid-item wrappers.
Re-verified via direct DOM inspection (`scrollWidth` vs every element's
`getBoundingClientRect().right`) that zero elements exceed the viewport at
360px, and re-ran the full 5-width overflow/broken-image sweep clean.

**New regression test**: `client/src/components/home/HeroSection.test.tsx`
asserts the announcement link lives inside the hero's own `<section>`
(guards against it ever being pulled back out into a separate below-the-fold
section) and that both the compact and full variants render.

Re-verified after this change: `npm run check` (0 errors), `npm run test`
(27/27, two new tests), `npm audit` (0 vulnerabilities), production build
succeeds, zero horizontal overflow and zero console errors at all 5
homepage widths.

## 12b. Further refinement — hero rearranged into three areas

A follow-up owner request after seeing 12a live: on desktop, the
announcement should sit **vertically, next to the photo** (not stacked
above it); on mobile, the photo should sit **next to the Support/Donate
buttons**, with the announcement as a **horizontal banner below** that row.
Three desktop options and two mobile options were presented with tradeoffs
before writing any code; the owner confirmed the arrangement matched their
intent exactly before implementation.

**Change**: `HeroSection.tsx` was rewritten around a named CSS Grid
(`.hero-grid` in `index.css`) with six areas — `eyebrow`, `heading`,
`excerpt`, `ctas`, `photo`, `announcement`. This lets the *same* photo and
announcement DOM elements occupy completely different positions per
breakpoint (no image rendered twice):
- **Mobile/tablet** (below the breakpoint below): `ctas` and `photo` share
  one row (buttons stacked left, small photo thumbnail right); every other
  area spans the full width; `announcement` is a full-width horizontal
  banner in its own row below.
- **Desktop**: three columns — text content, then `photo`, then
  `announcement` — each spanning the full height of the hero.

**Breakpoint tuning, found by testing, not assumed**: the first attempt
used `md:` (768px) for the 3-column switch. At exactly 768px (the required
tablet-portrait width) this was measurably overflow-free but visually
cramped — the "ANNOUNCEMENT" eyebrow label and the card's own text wrapped
onto many narrow lines. Moved the breakpoint to `lg:` (1024px), matching
the **same breakpoint the header already uses** to switch from its mobile
hamburger to the desktop nav — so 768px now gets the same comfortable
mobile-style row (buttons + photo, banner below) as phones, and the true
3-column layout only activates once there's actually room for it (1024px+).
Re-screenshotted 768px afterward to confirm it now reads calmly rather than
cramped.

**Regression caught and fixed**: a single unbreakable word ("ANNOUNCEMENT",
uppercase with letter-spacing) inside a flex row without `min-width: 0`
pushed its column wider than the available space at 768px, causing 19px of
horizontal overflow — the same category of CSS Grid/Flexbox sizing bug as
the one fixed in Section 12a, just triggered by a different element this
time. Fixed the same way (`min-w-0` on the constraining elements), plus
`break-words` as a last-resort safety net on that specific label.

**Verified**: full 5-width overflow/fold sweep on a fresh production build
(1440×900, 1024×768, 768×1024, 390×844, 360×800) — announcement within the
fold and zero horizontal overflow at every width, including the corrected
768px case. `HeroSection.test.tsx` updated to match the new breakpoint.
`npm run check` (0 errors), `npm run test` (27/27), `npm audit` (0
vulnerabilities), production build succeeds.

## 12c. Further refinement — genuinely vertical card, hero fills the first screen

Immediate owner feedback on 12b: the placement (text / photo / announcement,
side by side) was correct, but the announcement card itself still read as
compact/horizontal rather than a proper vertical card, and the hero as a
whole should fill the entire first screen so the next section is only
reached by scrolling.

**Change** (`HeroSection.tsx`, `index.css`):
- The hero `<section>` now uses `lg:min-h-[calc(100vh-4rem)]` (4rem = the
  header's own `h-16`) with its content vertically centered
  (`lg:items-center`) on desktop — confirmed with `getBoundingClientRect`
  that the "Mission & Vision" heading of the next section sits well below
  the viewport (e.g. `top: 1107px` on a 900px-tall viewport) before any
  scrolling. **Left unchanged on mobile/tablet** — forcing full-viewport
  height there would leave a large empty gap on short phone screens and
  work against the earlier "reach the CTA quickly" mobile goal from Section
  10.2. Flagged for the owner rather than assumed; easy to extend to mobile
  if that's actually wanted.
- The desktop grid's column ratio (`.hero-grid` in `index.css`) shifted
  from `1.4fr / 0.55fr / 0.95fr` to `1.15fr / 0.7fr / 1.05fr` (text /
  photo / announcement), giving the photo and announcement noticeably more
  width, and the announcement card's internal padding/typography grew
  (`p-5`→`p-8`, title `text-base`→`text-2xl`, summary `text-sm`→`text-base`,
  added a "Published {date}" line and a divider above the action links) so
  it reads as a substantial vertical card rather than a compact box. The
  photo dropped its forced `h-full` stretch/crop in favor of a larger fixed
  width at its natural 4:5 aspect ratio, avoiding an unnaturally elongated
  crop.
- No content was invented — the "Published {date}" line uses the same
  `date` field already in `lib/announcements.ts`.

**Verified**: full 5-width overflow/fold sweep clean on a fresh production
build; `getBoundingClientRect` confirmed the next section is off-screen at
1440×900 and 1024×768 before scrolling; `HeroSection.test.tsx` updated for
the new "View details →" label. `npm run check` (0 errors), `npm run test`
(27/27), `npm audit` (0 vulnerabilities), production build succeeds.

## 12d. Mobile menu length, desktop dropdown position, announcement highlight

Three independent owner-reported issues, each reproduced with measurements
before fixing, not assumed.

**Mobile menu required scrolling to reach Donate/Login.** Reproduced:
`dialog.scrollHeight` (918px) exceeded `dialog.clientHeight` (844px) at
390×844 — 74px of forced scroll, with Donate/Login at the very bottom of
the scrollable list. Fixed in `MobileNav.tsx`:
- Donate and Login moved to a pinned row directly below the sheet header
  (side by side, not stacked) — always visible immediately on opening the
  menu, never part of the scrollable region.
- The nav list changed from one column to two (`grid grid-cols-2`), with
  each group's label (About/Programs/Media) spanning both columns above its
  sub-links. Single-link items (Home/Vedas/Contact) render full-width for
  visual hierarchy.
- Re-measured after the change: `scrollHeight === clientHeight` (844px ==
  844px) — the entire menu, including Donate/Login, now fits with zero
  scrolling on this viewport. Scrolling remains available as a fallback
  (`overflow-y-auto` on the nav list specifically, not the whole sheet) for
  shorter screens or enlarged text/zoom, per WCAG reflow requirements —
  Donate/Login stay visible regardless since they're outside that region.

**Desktop dropdown always appeared under "Home" instead of the hovered
trigger.** Reproduced: hovering "Programs" (`left: 911px`) rendered its
panel at `left: 696px` — under "About", not "Programs". Root cause:
`components/ui/navigation-menu.tsx` used Radix's shared `Viewport` pattern
(designed for an animated mega-menu panel shared across items), whose
positioning math wasn't tracking the active trigger correctly in this
setup. Fixed by removing the shared `Viewport` entirely and making each
`NavigationMenuItem` explicitly `position: relative`, so each
`NavigationMenuContent` (already `position: absolute`) anchors to its own
trigger — the standard, simpler Radix pattern for a plain per-item dropdown
(the shared-viewport pattern is only needed for cross-fading between
differently-sized mega-menu panels, which this site doesn't have). Content
regained the background/border/shadow that the removed Viewport used to
provide. Re-verified: hovering About/Programs/Media each now measures
`0px` difference between trigger and panel left edges.

**Announcement needed to catch the eye without breaking the site's calm
tone.** Added, both to the mobile banner and the desktop card:
- Border thickened and darkened: `border border-accent/40` →
  `border-2 border-accent`.
- A small pulsing dot on the bell icon (`motion-safe:animate-pulse`,
  Tailwind's built-in reduced-motion-aware variant).
- A slow (3.5s), low-amplitude "breathing" glow ring (`box-shadow`, gold,
  6–10% opacity) defined as a `@keyframes` in `index.css`, wrapped in
  `@media (prefers-reduced-motion: no-preference)` so it doesn't exist at
  all as a rule for reduced-motion users (verified with Playwright's
  `reducedMotion: 'reduce'` context: `animationName` is `"announcement-glow"`
  under normal motion and `"none"` under reduced motion). Reduced-motion
  users still get the static thicker border and pulsing-dot fallback is
  itself motion-safe-gated, so nothing animates for them, but the
  announcement still reads as visually distinct.

**Verified**: full 5-width overflow/fold sweep still clean after all three
changes; `npm run check` (0 errors), `npm run test` (27/27), `npm audit`
(0 vulnerabilities), production build succeeds.

## 12. Rollback guidance

- This work is entirely on the local branch `production-homepage-redesign`; `main` is untouched at `1e604ea`.
- Nothing has been pushed to GitHub or deployed to Vercel — the live production site is unaffected until this branch is explicitly merged and deployed.
- To roll back after merging: `git revert` the commits on this branch (`Phase 1: ...`, `Phase 2/3: ...`, `Final visual QA corrections and image optimization`, `Move the announcement above the fold in the homepage hero`, `Rearrange the hero into three areas: text, photo, announcement`, `Make the announcement a genuinely vertical card and fill the first screen`, `Fix mobile menu scrolling, desktop dropdown position, and highlight the announcement`), or simply redeploy from the `main` branch's existing Vercel deployment history, which requires no code changes since production was never touched.
- Every commit on this branch is a coherent, working checkpoint (`tsc` clean, build succeeds, tests pass) — if a partial rollback is ever needed, commits can be reverted independently in reverse order, though each depends on the design tokens and layout components introduced in Phase 1.
- The image-optimization commit specifically can be reverted on its own without affecting layout/functionality: it only changes image `src` paths (raster → `.webp`) and adds new `.webp` files; no component logic changed as part of it.

## 13. Tester-feedback correction pass (award text, eye strain, image orientation, cropping, link/media audit)

Branch: `fix/tester-feedback-visuals-and-links`, cut from `upstream/main` at
`856e259` (the merge of the prior redesign work into the canonical
upstream repo). This section documents a separate, later pass driven by
fresh tester feedback — a focused correction pass, not a redesign. See
`LINK_AND_MEDIA_AUDIT.md` for the detailed link/image tables referenced
below.

### 13.1 Award-text correction (Task 1)

`client/src/components/sections/History.tsx` contained two identical
occurrences (the Achievements summary card, and its "View Full Circular"
detail sub-view) of a sentence with an incorrect name spelling. Corrected
to the exact approved text:

> Old: *"Award given to VRNT by Sri Bhandarakeri Mutt Karnataka at Raichur.
> Rec'd on our behalf by Ganesha Ghanapaty and Ghanapaty Bhat."*
>
> New: *"Award presented to VRNT by Sri Bhandarakeri Mutt, Karnataka, at
> Raichur, received on behalf of the Trust by Vidwan Shri S. Ganesha
> Ghanapatigal and Vidwan Shri Ganapati Bhat."*

A repo-wide search confirmed no other file (alt text, tests, structured
data) contained the old spellings ("Ganesha Ghanapaty" / "Ghanapaty
Bhat"), so no further edits were needed. `tsc --noEmit` clean after the
change; both occurrences visually confirmed correct in the production
build at 1440px and 390px.

### 13.2 Bright-white surface / eye-strain reduction (Task 2)

Audited actual **computed** background colors (not class names) across
every route via a headless-browser crawl of the production build. Only
one token was actually near-white: `--surface` / `--card` / `--popover`
(shared, used by every card, the Card UI component, and the desktop
nav-dropdown/`--popover`), previously `40 32% 98%` — that computes to
`rgb(251, 250, 248)`, ~2–4 units off pure white on every channel
regardless of its warm hue, and it backs essentially every card on every
page. `--background` (the page itself, `42 38% 95%` → `rgb(247, 244,
237)`) was already a comfortable warm parchment and did not need
changing. No hardcoded `bg-white` / `#fff` surfaces were found anywhere
in `client/src` outside this token.

Changed `--surface` / `--card` / `--popover` to `38 30% 94%` →
`rgb(244, 241, 235)` — a shade *deeper* than the page background rather
than lighter, so no surface anywhere on the site is ever brighter than
the page itself. Cards remain visually distinct via the `border
border-border` + `shadow-soft`/`shadow-lifted` utilities already applied
to every card wrapper (a pre-existing pattern this change relies on,
rather than raw brightness contrast).

**Contrast re-verified** (WCAG formula, computed from the final HSL
values; ✅ = passes AA):

| Pair | Ratio | AA normal text (4.5:1) | AA large text/UI (3:1) |
|---|---|---|---|
| `--foreground` on `--background` | 15.08 | ✅ | ✅ |
| `--foreground` on `--surface` (new) | 14.70 | ✅ | ✅ |
| `--muted-foreground` on `--background` | 5.68 | ✅ | ✅ |
| `--muted-foreground` on `--surface` (new) | 5.54 | ✅ | ✅ |
| `--muted-foreground` on `--muted` | 5.07 | ✅ | ✅ |
| `--primary-foreground` on `--primary` | 8.07 | ✅ | ✅ |
| `--secondary-foreground` on `--secondary` (footer/header navy) | 14.10 | ✅ | ✅ |
| `--accent-foreground` on `--accent` | 6.31 | ✅ | ✅ |
| `--accent-strong` (text) on `--background` / `--surface` | 5.53 / 5.39 | ✅ | ✅ |
| `--primary` (text) on `--background` / `--surface` | 7.75 / 7.55 | ✅ | ✅ |

All ratios above are comfortably above the AA thresholds; the change only
moved the surface token 4 percentage points darker in lightness, which
has negligible effect on already-high-contrast dark-text-on-light-card
pairs. (`--border` against `--background`/`--surface` and
`--warning-foreground` on `--warning` fall under strict AA ratios, but
both are pre-existing, unrelated to this change — decorative dividers and
a status-badge color, not body text — and were not touched.)

Verified via an actual headless-browser read of `getComputedStyle(...).
backgroundColor` on the built production preview (not just the source
CSS): `body` → `rgb(247, 244, 237)`, first card-like element → `rgb(244,
241, 235)` — matching the token math exactly, on every one of the 18
routes crawled, at both 1440px and 390px. Visually confirmed via full-page
screenshots: no glaring white blocks on any route; navy footer and
maroon/gold accents unchanged.

### 13.3 Image orientation audit (Task 3)

Wrote a diagnostic script (EXIF orientation + aspect-ratio cross-check
against the actual `.webp` output) and ran it against all 66 distinct
images referenced from `client/src`. Root cause of the tester's
"sideways/sleeping" report confirmed at the asset-pipeline level, **not**
a CSS aspect-ratio problem: `scripts/optimize-images.mjs` never called
`sharp(...).rotate()`, so any source photo with a non-default EXIF
orientation tag had its raw, un-rotated pixels baked into the `.webp`
output with no tag left to correct the display.

- **66 images audited**, 2 had a non-default EXIF orientation tag
  (orientation `6`, i.e. "rotate 90° to display"), and **both** had that
  rotation baked incorrectly into their `.webp`:
  - `/poorthy/first gallery/IMG_20260305_111546869_HDR.jpg` — stored
    4096×3072 (landscape), correct display orientation 3072×4096
    (portrait). Old `.webp` matched the raw landscape aspect (1.333) —
    sideways.
  - `/poorthy/second gallery/IMG_20250831_093631544_HDR.jpg` — identical
    situation.
- The other 64 images all had orientation `1` (no rotation tag) and their
  existing `.webp` output already matched correctly — no other orientation
  defects found anywhere in the codebase.

**Fix, at the asset-processing level per the explicit requirement (no CSS
rotation used anywhere):**
1. Added `sharp(file).rotate()` (no-argument auto-orient) as the first
   pipeline step in `scripts/optimize-images.mjs`, for every image,
   before any resize. `.rotate()` physically applies the EXIF rotation
   and normalizes/drops the now-redundant orientation tag, so the fix is
   also future-proof for any new photo added later via `npm run
   optimize-images`.
2. Regenerated only the two affected `.webp` files (not the full batch,
   to avoid touching the 64 already-correct outputs) with the corrected
   pipeline. Both original `.jpg` source files were left untouched.
3. Re-ran the diagnostic script: **0 of 66 images** now have incorrect
   orientation baked in. New `.webp` dimensions: 1200×1600 for both
   (portrait, aspect 0.750) — matching the EXIF-corrected orientation
   exactly.
4. Visually confirmed in the production build (Poorthy Examination →
   "VRNT-POORTHY-SJ26" gallery, first slide): the portrait photo now
   displays upright and complete, letterboxed on the carousel's existing
   `bg-black/90` frame — not cropped, not stretched, not mirrored.

No other width/height-attribute-vs-decoded-orientation conflicts were
found, with one unrelated exception fixed under Task 4 (the homepage
hero founder portrait's `width`/`height` attributes didn't match its
actual file — see 13.4).

### 13.4 Cropping / zoom corrections (Task 4)

Full inventory of every `object-cover` / `object-contain` usage in
`client/src` (grep-verified, not sampled). Each was judged against the
content-aware rule (document/portrait/decorative/gallery), not
blindly converted. Changes:

| File | Element | Before | After | Why |
|---|---|---|---|---|
| `pages/poorthy.tsx` | Primary slide, all 6 galleries (2 image groups had already been through the orientation fix) | `object-cover` | `object-contain` | Fixed `aspect-16/10`/`aspect-16/9` box was cropping portrait photos; container already had `bg-black/90` for letterboxing — exactly the "darker background fills unused space" pattern the rule calls for. Blurred background copy (behind the "View Album" CTA) intentionally left `object-cover` — decorative, not the primary image. |
| `pages/initiatives.tsx` | HNY scheme illustrative photo | `object-cover` | `object-contain` | Portrait of people (Category B); wide 2.27:1 source photo, no risk in practice but corrected for certainty. |
| `components/sections/Mission.tsx` | "Vedic Heritage" card — archival photo of the Kanchi Kamakoti Peetam Acharyas | `object-cover` in a **fixed** `h-[180px]` box | `object-contain` + `bg-muted` | **Most severe finding**: source photo is 707×1456 (very tall/narrow), forced into a landscape 180px-tall box — was cropping most of the frame, very likely cutting off the Acharyas' faces. Container already used `flex items-center justify-center`, clearly designed as a letterbox frame; only the `object-fit` value was wrong. |
| `components/sections/Mission.tsx` | "Education" card (students, illustrative) | `object-cover` | *(left unchanged)* | Reviewed and accepted: image aspect (1.34) is close to the box's, cropping is mild, and it's a generic decorative illustrative photo, not identifiable individuals. |
| `components/sections/Activities.tsx` | Both Āchārya photos (examination hall, graduation certificate presentation) | `object-cover` | `object-contain` | Photos of the current Āchārya — maximum sensitivity; converted for certainty even though the `max-h` cap made cropping unlikely at typical widths. |
| `pages/sanskrit.tsx` | Sanskrit examination photo | `object-cover` | `object-contain` | Same pattern as above, for consistency and safety. |
| `components/sections/History.tsx` | 3 photos of Sri Mahaperiyava (Annadurai Iyengar profile sub-view) | `object-cover` | `object-contain` | All three sat inside `flex items-center justify-center` frames explicitly designed for letterboxing; `object-cover` was defeating that design. |
| `components/home/HeroSection.tsx` | Homepage hero founder portrait | `aspect-[4/5]` (0.8) + `object-cover`; `width={640} height={720}` (wrong — real file is 900×1200) | `aspect-[3/4]` (0.75, the image's *actual* aspect) + `object-contain` + corrected `width={900} height={1200}` | The forced 4:5 box didn't match the real 3:4 photo, so despite the code comment claiming "not cropped", a ~6% crop was actually happening. Box aspect now matches the source exactly, so there is no cropping at all (contain vs. cover produce an identical result at this point) and CLS-relevant width/height attributes are now accurate. |
| `components/home/HomeSection.tsx` | Shared homepage-teaser card (reused for 4 different images: HNY, education, Acharya certificate, an archival Mahaperiyava photo) | Fixed `aspect-[4/3]` + `object-cover` | `object-contain` + `bg-muted` | One shared component renders 4 images with very different native aspect ratios (1.31–2.27); a single fixed `object-cover` ratio was wrong for most of them by construction. Now every image displays complete regardless of its own aspect. |
| `components/layout/Header.tsx` | Site logo badge | `object-cover` | *(left unchanged)* | Genuinely decorative branding element, pre-cropped to a square at generation time — correct as-is. |
| `components/sections/{History,Pariksha}.tsx` | YouTube video thumbnail cards | `object-cover` | *(left unchanged)* | Decorative preview thumbnails linking out to the full video on YouTube — Category C/D carve-out; a full-image viewer isn't applicable here since the "full" content is the linked video itself. |
| `components/sections/History.tsx` | Achievement photo thumbnail-strip selector (64×64px, `alt=""`) | `object-cover` | *(left unchanged)* | Decorative selector thumbnail; the adjacent main viewer already uses `object-contain` (a "full-image viewer" already exists per the rule's carve-out). |

No CSS `rotate-*` transform was used anywhere as a substitute for a real
orientation fix (13.3 covers the only two genuine orientation defects,
both fixed at the asset level).

Visually re-verified in the production build: Poorthy galleries (all six
image groups, not just the first slide — confirmed via realistic
scroll-and-wait screenshots, see note below), Mission page (Acharyas
photo now shows the complete photograph), homepage (founder portrait
full-length, teaser cards complete).

**Screenshot-methodology note**: an initial `fullPage: true` Playwright
screenshot of the Poorthy sub-view showed galleries 5–6 as solid black.
Investigating (opening the source `.jpg`/`.webp` files directly, then
re-testing with a realistic scroll-to-element + wait instead of a single
full-page stitch) showed this was a **screenshot-capture artifact**
(native `loading="lazy"` images far down a long page not yet fetched at
the instant a full-page screenshot stitches that slice), not a real
rendering defect — confirmed by scrolling there naturally, waiting, and
re-screenshotting: both galleries render correctly. Recorded here so this
false alarm isn't repeated or misreported as a fix.

### 13.5 Announcement image review (Task 5)

- `/assets/announcement/poorthy-september-en.webp` and
  `...-ta.webp` (1024×1536 each, in the `optimize-images.mjs` `TEXT_HEAVY`
  set → quality 90, never resized) already used `object-contain` with
  **no height constraint** — the safest possible pattern, since the `img`
  simply renders at its full natural aspect ratio scaled to width; no
  cropping is possible. Verified rendered result directly (not just the
  class name): complete circular visible, no text/border/date/signature
  cropped, on both the `.webp` files themselves and in the live page.
  Download and registration links (`POORTHY_APPL_2024.pdf`, the Google
  Form) were untouched and confirmed still present.
- Added a **"View full-size announcement ↗"** link under each image
  (opens the source `.webp` directly in a new tab), plus made the image
  itself clickable to the same target — satisfying the "if necessarily
  small on mobile, provide a full-size link" requirement, since a scanned
  circular displayed at ~350px mobile width can be hard to read closely
  even though nothing is cropped.
- Mahotsav announcement imagery (`/assets/shashti.webp`) was already
  `object-contain` with a generous `max-h-[550px]`; reviewed, no defect
  found, no change made.

### 13.6 Link and static-resource integrity audit (Task 6)

Full methodology, results, and per-item tables are in
**`LINK_AND_MEDIA_AUDIT.md`**. Summary: production build served locally
(`vite preview`), every route crawled with a real headless browser (not
a static grep), every internal route, external link, and static resource
extracted from the live DOM and checked directly (HTTP status,
content-type, size for internal/static; bounded redirect-following
requests for external). **Zero broken links or missing resources found.**
One trustee phone number (`98493808377`, 11 digits — unusual for an
Indian mobile number) was flagged for owner confirmation but **not
changed**, since trustee contact data is authoritative content outside
the scope of the one approved name correction.

Two new regression test files were added:
`client/src/App.routes.test.tsx` (renders all 22 route variants —
including the query-param and dynamic `:id` cases — and the 404
fallback, asserting each produces real content) and
`client/src/lib/staticResources.test.ts` (asserts the PDF/webp files
referenced by download links and the announcement circulars still exist
on disk with non-zero size, plus both the preserved originals and the
regenerated `.webp` files from 13.3).

### 13.7 Rendered visual QA (Task 7)

Crawled all 18 routes (every route in `App.tsx`, plus the 5
`/announcements/:id` variants and the `?view=` query-param case, plus a
deliberately-invalid route) at 1440×900 and 390×844 against the served
production build. Zero horizontal overflow, zero broken images
(`naturalWidth === 0`), zero browser console errors, on every single
combination. Full-page screenshots captured for every route/viewport
combination; additional targeted screenshots for the Poorthy galleries,
the Mission page's Acharyas photo, and the homepage, specifically to
visually confirm the Task 2–5 fixes (see 13.4's screenshot-methodology
note for one investigated false alarm).

### 13.8 Automated quality gate (Task 8)

- `npm ci`: hit a transient Windows file-lock (`EPERM`) on a native
  binary (`lightningcss`'s prebuilt `.node` file) unrelated to any code
  change here — dependencies were not modified this session. The lock
  persisted across two retries; rather than force-kill unrelated
  processes on a shared machine, repaired the resulting partial
  `node_modules` with `npm install` (added/reconciled to 257 packages,
  **0 vulnerabilities**) and proceeded. Worth re-running `npm ci` in a
  clean CI environment before merge to confirm it's specific to this
  machine's file-locking, not a real dependency problem.
- `npm run check` (`tsc`): **0 errors**.
- `npm run test` (`vitest run`): **58/58 passing** (the pre-existing 27,
  plus 23 new route-smoke tests and 8 new static-resource-existence
  tests added this pass).
- `npm run build`: succeeds, ~13s, output hashes stable across repeated
  builds (confirms no non-determinism was introduced).
- `npm audit`: **0 vulnerabilities**. `--force` was not used at any point.

### 13.9 Remaining limitations / items for owner confirmation

- The trustee phone number `98493808377` (11 digits) noted in 13.6 —
  please confirm the correct number; not changed without approval.
- `npm ci` should be re-run once in a clean environment (see 13.8) to
  confirm the file-lock was machine-specific.
- External links (Login, YouTube, Google Maps, 2 Google Forms) all
  resolved with a final `200` at audit time; being third-party
  destinations, they are not permanently guaranteed and should be
  spot-checked again close to any deploy.

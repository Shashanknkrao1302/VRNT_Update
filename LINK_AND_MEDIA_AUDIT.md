# Link and Media Audit — Tester Feedback Pass

Branch: `fix/tester-feedback-visuals-and-links`. Produced by crawling the
actual **production build** (`npm run build` → `npm run preview`, served
at `http://localhost:5000`) with a headless browser, not by grepping
source code — every internal route, external link, image, and static
resource below was extracted from the live rendered DOM and checked
directly. See `PRODUCTION_READINESS.md` §13 for the narrative writeup
this file supports.

## 1. Internal routes

All 18 routes registered in `client/src/App.tsx`, plus 5 dynamic
`/announcements/:id` values and one query-param case, loaded directly
(not via client-side navigation) against the preview server.

| Route | HTTP status | Notes |
|---|---|---|
| `/` | 200 | |
| `/mission` | 200 | |
| `/initiatives` | 200 | |
| `/activities` | 200 | |
| `/activities?view=final-exams` | 200 | Query-param deep link |
| `/vedas` | 200 | |
| `/vedas/maha-periyavas-message` | 200 | |
| `/pariksha` | 200 | |
| `/gallery` | 200 | |
| `/history` | 200 | |
| `/trustees` | 200 | |
| `/donate` | 200 | |
| `/contact` | 200 | |
| `/mahotsav` | 200 | |
| `/pariksha-result` | 200 | |
| `/announcements` | 200 | |
| `/announcements/poorthy-sept` | 200 | |
| `/announcements/vrnt-mahotsav` | 200 | |
| `/announcements/shankara-jayanti-result` | 200 | |
| `/announcements/certificate-2024` | 200 | |
| `/announcements/donate-req` | 200 | |
| `/news` | 200 | |
| `/this-route-does-not-exist` | 200 (SPA fallback) + renders real "404 — Page not found" UI | Confirmed the content is genuinely the 404 page, not a blank screen or the homepage — see `App.test.tsx` |

**Result: 22/22 internal routes resolve correctly. 0 broken.**

## 2. External links

Every external `http(s)://`, `mailto:`, and `tel:` link found across all
18 crawled pages. Network-checkable links were tested with a bounded,
redirect-following request (10s timeout); `tel:`/`mailto:` links can't be
network-checked and were instead reviewed for plausible format.

| Destination | Label | Source page(s) | Result |
|---|---|---|---|
| `https://vrnt-app.onrender.com/#/login` | Login | every page | `200` (final) |
| `https://youtu.be/CoOogXw-1_c?si=...` | History video embed link | `/history` | `303 → 200` (normal YouTube redirect) |
| `https://maps.app.goo.gl/xdfx7FaqMtYeCpEB8` | Directions | `/contact` | `302 → 200` (normal short-link redirect) |
| `https://forms.gle/yn41ZqVzk269GppNA` | Google Form Link | `/mahotsav` | `302 → 302 → 302 → 200` (normal Google Forms redirect chain) |
| `https://docs.google.com/forms/d/e/.../viewform` | Register online | `/announcements/poorthy-sept` | `302 → 200` |
| `mailto:office@vrnt.org` | office@vrnt.org | `/`, `/donate`, `/contact` | Valid format |
| `mailto:swami.nathan6193@gmail.com` and 8 more (see `client/src/lib/constants.ts`) | trustee emails | `/trustees` | Valid format |
| `tel:04424740549`, `tel:9360731283`, `tel:9840189849`, `tel:9840720182`, `tel:9444454732`, `tel:9444550734`, `tel:9381044325`, `tel:9715770855`, `tel:044-24985051`, `tel:9444158326`, `tel:+919840189849`, `tel:+919444454732`, `tel:+918939887897`, `tel:+919844092056` | trustee/contact phone numbers | `/`, `/contact`, `/trustees`, `/donate` | Valid format (10-digit Indian mobile or correctly-prefixed) |
| `tel:98493808377` | trustee phone (Maganty Satyanarayana Murthy) | `/trustees` | **⚠ 11 digits — one digit longer than every other number on the page.** Flagged for owner confirmation. **Not changed** — trustee contact data is authoritative and outside the scope of the one approved name correction in this pass. |

**Result: all 5 network-checkable external destinations resolved with a
final `200`. All `tel:`/`mailto:` links are well-formed except the one
flagged above, which needs owner confirmation, not a code fix.**

## 3. Static resources (downloads, embedded documents)

| Resource | Used by | HTTP status | Content-Type | Size |
|---|---|---|---|---|
| `/assets/forms/POORTHY_APPL_2024.pdf` | "Download application form" — `/announcements/poorthy-sept` | 200 | `application/pdf` | 1,220,973 bytes |
| `/docs/SJ_2026_MARK_SHEET_RESULT_pdf_1777194961207.pdf` | "Download result PDF" — `/news` | 200 | `application/pdf` | 95,501 bytes |
| `/assets/announcement/poorthy-september-en.webp` | English circular image + new "View full-size" link | 200 | `image/webp` | 245,530 bytes |
| `/assets/announcement/poorthy-september-ta.webp` | Tamil circular image + new "View full-size" link | 200 | `image/webp` | 298,548 bytes |

**Result: all 4 static resources return the real file (correct
content-type, non-zero size) — none fall back to the SPA's `index.html`.**
Regression-tested going forward in `client/src/lib/staticResources.test.ts`.

## 4. Images — broken-image sweep

Every `<img>` on all 18 routes checked for `naturalWidth === 0` (the
standard signal for a failed image load) after full page load. **0 broken
images found** on any route, at either 1440×900 or 390×844.

## 5. Images — orientation defects found and fixed

Full methodology: `PRODUCTION_READINESS.md` §13.3. 66 images audited
(every image referenced from `client/src` that has a raster source +
`.webp` output pair).

| Image | Source pixels | EXIF orientation | Before | After |
|---|---|---|---|---|
| `/poorthy/first gallery/IMG_20260305_111546869_HDR` | 4096×3072 | `6` (rotate 90°) | `.webp` baked in at 1600×1200 (landscape, sideways) | Regenerated at 1200×1600 (portrait, correct) |
| `/poorthy/second gallery/IMG_20250831_093631544_HDR` | 4096×3072 | `6` (rotate 90°) | `.webp` baked in at 1600×1200 (landscape, sideways) | Regenerated at 1200×1600 (portrait, correct) |

**Result: 2 of 66 images had a genuine orientation defect; both fixed at
the asset-processing level (`sharp().rotate()` added to
`scripts/optimize-images.mjs`), not with CSS rotation. Originals
preserved unmodified. Re-audit after the fix: 0 remaining defects.**

## 6. Images — cropping/presentation changes

Full table and rationale per image: `PRODUCTION_READINESS.md` §13.4.

| File | Change | Reason |
|---|---|---|
| `pages/poorthy.tsx` (all 6 galleries' primary slide) | `object-cover` → `object-contain` | Portrait photos were being cropped by a fixed landscape aspect box |
| `pages/initiatives.tsx` (HNY photo) | `object-cover` → `object-contain` | Portrait/people photo, converted for certainty |
| `components/sections/Mission.tsx` ("Vedic Heritage" — Kanchi Acharyas photo) | `object-cover` in fixed `h-[180px]` → `object-contain` + `bg-muted` | **Most severe**: tall 707×1456 photo forced into a short landscape box was cropping most of the frame |
| `components/sections/Activities.tsx` (2 Āchārya photos) | `object-cover` → `object-contain` | Sensitive content (the current Āchārya); converted for certainty |
| `pages/sanskrit.tsx` (exam photo) | `object-cover` → `object-contain` | Same pattern, consistency |
| `components/sections/History.tsx` (3 Mahaperiyava photos, Annadurai Iyengar profile) | `object-cover` → `object-contain` | Containers were already designed as letterbox frames (`flex items-center justify-center`); only the `object-fit` value was wrong |
| `components/home/HeroSection.tsx` (homepage founder portrait) | `aspect-[4/5]` + `object-cover` + wrong `width`/`height` attrs | `aspect-[3/4]` (real aspect) + `object-contain` + corrected `width={900} height={1200}` | Box didn't match the real photo's aspect ratio, causing a real (if modest) crop despite a code comment claiming otherwise |
| `components/home/HomeSection.tsx` (shared teaser card, 4 different images) | Fixed `aspect-[4/3]` + `object-cover` | `object-contain` + `bg-muted` | One shared component serving 4 images of very different aspect ratios (1.31–2.27) — a single fixed cover ratio was structurally wrong for most of them |

**Reviewed, left unchanged (decorative/appropriate as-is):**
`components/layout/Header.tsx` (logo badge, pre-cropped square),
`components/sections/{History,Pariksha}.tsx` (YouTube thumbnail cards),
`components/sections/History.tsx` (achievement-photo thumbnail strip —
full-image viewer already exists alongside it),
`components/sections/Mission.tsx` ("Education" card — mild aspect
mismatch, generic decorative photo, not identifiable individuals).

## 7. Announcement images (English / Tamil circulars, Mahotsav poster)

| Image | Aspect handling | Cropping check | Mobile legibility |
|---|---|---|---|
| `poorthy-september-en.webp` | `object-contain`, no height constraint (renders at full natural aspect) | No text/border/date/signature cropped | Added "View full-size announcement ↗" link (opens in new tab) + made image itself clickable |
| `poorthy-september-ta.webp` | Same | Same | Same |
| `shashti.webp` (Mahotsav poster) | `object-contain`, `max-h-[550px]` | No cropping found | Already ample size; no change needed |

## 8. Regression tests added

- `client/src/App.routes.test.tsx` — renders all 22 route variants (18
  static + `?view=` + 3 extra `/announcements/:id` values) and asserts
  each produces real content in `<main>`; asserts the 404 fallback works.
- `client/src/lib/staticResources.test.ts` — asserts the 4 static
  resources in §3 and the 2 orientation-fixed image pairs in §5 (both
  `.jpg` original and regenerated `.webp`) exist on disk with non-zero
  size.

## 9. Items requiring manual/owner confirmation

1. **Trustee phone number `98493808377`** (Maganty Satyanarayana Murthy,
   `/trustees`) — 11 digits, one longer than every other number on the
   page. Likely a data-entry error but not changed without confirmation,
   since trustee contact data is authoritative content outside this
   pass's approved scope (the one exact name correction in Task 1).
2. **External links** (Login, YouTube, Google Maps, 2 Google Forms) all
   resolved with a final `200` at the time of this audit but are
   third-party destinations outside this repo's control — worth a quick
   spot-check again close to any deploy.
3. **`npm ci`** hit a machine-specific Windows file lock during this
   pass (see `PRODUCTION_READINESS.md` §13.8) — resolved via `npm
   install`, 0 vulnerabilities confirmed either way, but worth one clean
   `npm ci` run in CI before merge to confirm it's not a real dependency
   issue.

## 10. Screenshots

Full-page screenshots for all 18 routes × 2 viewports (1440×900,
390×844), plus targeted before/after-style shots for the award section,
the Poorthy galleries (including the two orientation-corrected photos),
the Mission page's Acharyas photo, and the homepage, were captured to a
local, session-scoped scratch directory during this audit (not part of
the repository — this is a temporary QA aid, not a permanent asset).
They are not committed; regenerate by running `npm run build && npm run
preview` and re-crawling with a headless browser if a fresh visual
record is needed.

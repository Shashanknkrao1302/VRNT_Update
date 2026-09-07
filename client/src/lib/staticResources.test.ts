import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// Regression coverage for Task 6 of the tester-feedback pass: the concrete
// static files that public pages link to or embed (download links,
// announcement circulars, the two orientation-corrected Poorthy photos)
// must actually exist under client/public. A file renamed or deleted here
// would otherwise only surface as a 404 discovered by a human clicking
// through the site -- this catches it in CI instead.
const PUBLIC_DIR = path.resolve(import.meta.dirname, "..", "..", "public");

const EXPECTED_FILES = [
  // Download links (AnnouncementsPage / NewsPage)
  "assets/forms/POORTHY_APPL_2024.pdf",
  "docs/SJ_2026_MARK_SHEET_RESULT_pdf_1777194961207.pdf",
  // Poorthy September announcement circulars (English & Tamil)
  "assets/announcement/poorthy-september-en.webp",
  "assets/announcement/poorthy-september-ta.webp",
  // The two source photos found to have incorrect EXIF orientation baked
  // into their .webp output (see PRODUCTION_READINESS.md / LINK_AND_MEDIA_AUDIT.md)
  // -- both the original (preserved, unmodified) and the regenerated .webp
  // must continue to exist.
  "poorthy/first gallery/IMG_20260305_111546869_HDR.jpg",
  "poorthy/first gallery/IMG_20260305_111546869_HDR.webp",
  "poorthy/second gallery/IMG_20250831_093631544_HDR.jpg",
  "poorthy/second gallery/IMG_20250831_093631544_HDR.webp",
];

describe("static resources referenced by public pages exist on disk", () => {
  for (const relPath of EXPECTED_FILES) {
    it(`${relPath} exists and is non-empty`, () => {
      const full = path.join(PUBLIC_DIR, relPath);
      expect(fs.existsSync(full)).toBe(true);
      expect(fs.statSync(full).size).toBeGreaterThan(0);
    });
  }
});

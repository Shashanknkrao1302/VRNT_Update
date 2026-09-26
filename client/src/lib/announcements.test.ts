import { describe, it, expect } from "vitest";
import { ANNOUNCEMENTS, getFeaturedAnnouncement, getAnnouncementById } from "./announcements";

describe("announcements model", () => {
  it("has exactly one featured announcement for the homepage teaser", () => {
    const featured = ANNOUNCEMENTS.filter((a) => a.priority === "featured");
    expect(featured).toHaveLength(1);
  });

  it("getFeaturedAnnouncement returns the featured one", () => {
    const featured = getFeaturedAnnouncement();
    expect(featured.priority).toBe("featured");
    expect(featured.id).toBe("vijaya-dasami-poorthy-results-2026");
  });

  it("publishes the official Vijaya Dasami result PDF with view and download actions", () => {
    const result = getAnnouncementById("vijaya-dasami-poorthy-results-2026");
    expect(result).toBeDefined();
    expect(result?.actions).toEqual([
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
    ]);
  });

  it("every announcement has a unique id", () => {
    const ids = ANNOUNCEMENTS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("getAnnouncementById resolves a known id and returns undefined for an unknown one", () => {
    const known = ANNOUNCEMENTS[0];
    expect(getAnnouncementById(known.id)).toEqual(known);
    expect(getAnnouncementById("does-not-exist")).toBeUndefined();
  });

  it("every internal-link action targets a path, not an external URL", () => {
    for (const a of ANNOUNCEMENTS) {
      for (const action of a.actions) {
        if (action.type === "internal-link") {
          expect(action.targetPath.startsWith("/")).toBe(true);
        }
        if (action.type === "external-link" || action.type === "download-link") {
          expect(action.url.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

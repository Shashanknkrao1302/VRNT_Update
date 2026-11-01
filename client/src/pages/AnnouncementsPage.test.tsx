import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AnnouncementsPage from "./AnnouncementsPage";
import { ANNOUNCEMENTS } from "@/lib/announcements";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/announcements/:id" element={<AnnouncementsPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("AnnouncementsPage", () => {
  it("lists every announcement's title on the index view", async () => {
    renderAt("/announcements");
    for (const a of ANNOUNCEMENTS) {
      expect(await screen.findByText(a.title)).toBeInTheDocument();
    }
  });

  it("renders each action type with correct semantics on a detail view", async () => {
    // Test with an announcement having actions
    for (const item of ANNOUNCEMENTS.filter((a) => a.actions.length > 0)) {
      const { unmount } = renderAt(`/announcements/${item.id}`);
      expect(await screen.findByRole("heading", { name: item.title })).toBeInTheDocument();

      for (const action of item.actions) {
        // Look up by escaped label regex
        const escapedLabel = action.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const link = screen.getByRole("link", { name: new RegExp(escapedLabel, "i") });
        if (action.type === "external-link") {
          expect(link).toHaveAttribute("target", "_blank");
          expect(link.getAttribute("rel")).toContain("noopener");
        }
        if (action.type === "download-link") {
          expect(link).toHaveAttribute("download", action.filename);
        }
        if (action.type === "internal-link") {
          expect(link).toHaveAttribute("href", action.targetPath);
        }
      }
      unmount();
    }
  });

  it("shows a not-found message for an unknown announcement id", async () => {
    renderAt("/announcements/does-not-exist");
    expect(await screen.findByText(/could not be found/i)).toBeInTheDocument();
  });
});
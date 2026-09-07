import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Regression coverage for Task 6 of the tester-feedback pass: every route
// registered in App.tsx must render without throwing, and an unknown path
// must fall through to the 404 page rather than a blank screen or crash.
// This does not replace testing the real production build (see
// LINK_AND_MEDIA_AUDIT.md for that browser-based audit), but it catches the
// common regression of a route being wired up to a component that no
// longer exists or throws during render.
const ROUTES = [
  "/",
  "/mission",
  "/initiatives",
  "/activities",
  "/activities?view=final-exams",
  "/vedas",
  "/vedas/maha-periyavas-message",
  "/pariksha",
  "/gallery",
  "/history",
  "/trustees",
  "/donate",
  "/contact",
  "/mahotsav",
  "/pariksha-result",
  "/announcements",
  "/announcements/poorthy-sept",
  "/announcements/vrnt-mahotsav",
  "/announcements/shankara-jayanti-result",
  "/announcements/certificate-2024",
  "/announcements/donate-req",
  "/news",
];

describe("every registered route renders without throwing", () => {
  for (const route of ROUTES) {
    it(`renders ${route}`, async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      );
      // The lazy-loaded page resolves asynchronously; wait for the loading
      // placeholder to be replaced by real content in <main>.
      await waitFor(() => {
        const main = document.getElementById("main-content");
        expect(main).not.toBeNull();
        expect(main?.textContent?.trim().length).toBeGreaterThan(0);
      });
    });
  }

  it("falls back to the 404 page for a route with no matching Route", async () => {
    render(
      <MemoryRouter initialEntries={["/this-route-does-not-exist"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByRole("heading", { level: 1, name: /page not found/i })).toBeInTheDocument();
  });
});

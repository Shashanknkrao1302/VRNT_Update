import { Suspense, lazy, useCallback, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import { Toaster } from "@/components/ui/sonner";

// Route-level code splitting: each page is fetched only when visited.
const Home = lazy(() => import("./pages/home"));
const Mission = lazy(() => import("./components/sections/Mission"));
const InitiativesPage = lazy(() => import("./pages/initiatives"));
const Activities = lazy(() => import("./components/sections/Activities"));
const VedasPage = lazy(() => import("./components/sections/Vedas"));
const MahaPeriyavasMessage = lazy(() => import("./pages/MahaPeriyavasMessage"));
const Pariksha = lazy(() => import("./components/sections/Pariksha"));
const GalleryPage = lazy(() => import("./components/sections/Gallery"));
const History = lazy(() => import("./components/sections/History"));
const Trustees = lazy(() => import("./components/sections/Trustees"));
const DonatePage = lazy(() => import("./components/sections/Donate"));
const ContactPage = lazy(() => import("./components/sections/Contact"));
const Mahotsav = lazy(() => import("./components/sections/Mahotsav"));
const ParikshaResultPage = lazy(() => import("./components/sections/ParikshaResult"));
const AnnouncementsPage = lazy(() => import("./pages/AnnouncementsPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const NotFound = lazy(() => import("./pages/not-found"));

/** Scrolls to the top of the page on every route change (but not on hash navigation). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

/** Legacy pseudo-navigation shim: a couple of section components still call a
 * `setCurrentPage("somePage")` callback instead of using react-router-dom
 * directly (a holdover from before real routes existed for them). This maps
 * that call onto a real navigation. */
function useLegacyNavigate() {
  const navigate = useNavigate();
  return useCallback((page: string) => navigate(page === "home" ? "/" : `/${page}`), [navigate]);
}

export default function App() {
  const goTo = useLegacyNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SkipLink />
      <Header />
      <ScrollToTop />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<div className="py-24 text-center text-muted-foreground">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/initiatives" element={<InitiativesPage />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/vedas" element={<VedasPage />} />
            <Route path="/vedas/maha-periyavas-message" element={<MahaPeriyavasMessage />} />
            <Route path="/pariksha" element={<Pariksha />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/trustees" element={<Trustees />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/mahotsav" element={<Mahotsav setCurrentPage={goTo} />} />
            <Route path="/pariksha-result" element={<ParikshaResultPage setCurrentPage={goTo} />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/announcements/:id" element={<AnnouncementsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

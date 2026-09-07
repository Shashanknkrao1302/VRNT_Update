import { useState, useLayoutEffect } from 'react';
import InitiativesPage from '../../pages/initiatives';
import { Helmet } from '@/lib/seo';

export default function Mission() {
  const [activeSubView, setActiveSubView] = useState<string | null>(null);

  // Manage scroll position internally just like Pariksha.tsx
  const handleSetSubView = (view: string | null) => {
    if (view) {
      // Save current scroll position before opening details
      sessionStorage.setItem('mission_scroll_pos', window.scrollY.toString());
      setActiveSubView(view);
      window.scrollTo(0, 0);
    } else {
      setActiveSubView(null);
    }
  };

  // Restore saved scroll position when returning to Mission overview
  useLayoutEffect(() => {
    if (!activeSubView) {
      const savedPos = sessionStorage.getItem('mission_scroll_pos');
      if (savedPos !== null) {
        window.scrollTo(0, parseInt(savedPos, 10));
        sessionStorage.removeItem('mission_scroll_pos');
      }
    }
  }, [activeSubView]);

  // If a sub-view is active, render Initiatives directly inside Mission
  if (activeSubView) {
    return (
      <div className="w-full">
        <InitiativesPage
          overrideView={activeSubView}
          onBack={() => handleSetSubView(null)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-wide flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <Helmet
        title="Mission & Vision"
        description="VRNT's mission, guiding principles, and major initiatives to preserve, teach, and propagate the Vedas through the traditional Gurukula system."
      />

      {/* SECTION 1: Mission & Vision Core Intro */}
      <section className="border-t border-border pt-6">
        <div className="grid w-full grid-cols-1 items-start gap-8 xl:grid-cols-[5.5fr_4.5fr]">

          {/* Left Block: Narrative and Bullet Points */}
          <div className="flex flex-col gap-6">
            <h1 className="text-left font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Mission & Vision
            </h1>

            <p className="m-0 text-justify font-serif text-base leading-relaxed text-foreground sm:text-lg sm:leading-loose">
              <span className="float-left mr-2 font-serif text-5xl font-bold leading-[0.8] text-primary">V</span>
              EDA RAKSHANA NIDHI TRUST (VRNT) is a Public Charitable Trust sponsored by Kanchi Kamakoti Peetam founded in 1963 under the guidance of His Holiness Sri Sri Chandrashekarendra Saraswati MahaSwamigal. Learning and teaching the Vedas through the traditional Gurukula system is not merely an academic pursuit—it is a way of life, a sacred journey that nurtures both character and intellect. In this ancient and time-honoured system, education transcends classroom boundaries and becomes an immersive spiritual discipline.
            </p>

            {/* Bullet Points */}
            <div className="mt-2 flex flex-col gap-4">
              {[
                "To uphold the Guru-Shishya tradition and extend educational opportunities to deserving students across linguistic and philosophical backgrounds.",
                "To ensure the survival and flourishing of Vedic knowledge through educational and financial support to Vedic scholars and institutions.",
                "To preserve, protect, promote and disseminate Vedas in the traditional manner.",
                "To preserve the uniqueness and distinctiveness of each branch of Vedic recitation.",
                "To support rare Veda Shaakhas on the brink of extinction through systematic training."
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 text-xl text-accent-strong" aria-hidden="true">📜</span>
                  <p className="m-0 text-justify font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Side Cards Stack */}
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:mt-14 xl:grid-cols-1">
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-soft">
              <div className="h-[180px] w-full overflow-hidden rounded-md border border-border bg-muted flex items-center justify-center">
                <img
                  src="/assets/Kanchi_shankaracharyas_1768738006479.webp"
                  alt="An archival photograph of the Kanchi Kamakoti Peetam Acharyas under whose guidance the Trust operates"
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <h2 className="m-0 font-serif text-xl font-bold text-primary">Vedic Heritage</h2>
              <p className="m-0 font-serif text-sm font-semibold leading-relaxed text-foreground">Preserving the ancient texts in their pristine purity for future generations.</p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-soft">
              <div className="h-[180px] w-full overflow-hidden rounded-md border border-border">
                <img
                  src="/images/education.webp"
                  alt="Students engaged in traditional Gurukula-style Vedic education"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="m-0 font-serif text-xl font-bold text-primary">Education</h2>
              <p className="m-0 font-serif text-sm font-semibold leading-relaxed text-foreground">Supporting Gurukula education and traditional teaching methods.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Major Initiatives */}
      <section className="mt-2 border-t-2 border-border pt-8">
        <h2 className="mx-auto mb-4 max-w-max border-b-2 border-double border-primary pb-2 text-center font-serif text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
          Major Initiatives of the Trust
        </h2>

        <p className="m-0 mx-auto mb-8 max-w-5xl px-1 text-justify font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
          Over the decades, the Veda Rakshana Nidhi Trust (VRNT) has undertaken several pioneering initiatives to uphold and propagate the sacred Vedic tradition in its pristine form. Each initiative reflects the Trust’s unwavering commitment to <em>Veda Rakshanam</em> — the preservation, teaching, and practice of the Vedas as a living heritage.
        </p>

        <div className="grid w-full grid-cols-1 gap-6">

          {/* 1. Supporting all Available Veda Shakhas */}
          <div className="flex flex-col gap-4 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-8">
            <div className="flex items-center gap-4 border-b border-accent/40 pb-3">
              <span className="rounded-lg border border-accent bg-background p-2.5 text-3xl" aria-hidden="true">📜</span>
              <h3 className="m-0 font-serif text-xl font-bold text-primary sm:text-2xl">
                Supporting all Available Veda Shakhas
              </h3>
            </div>

            <p className="m-0 text-justify font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
              Our traditional scriptures and historical references indicate that there were once more than a thousand Veda shakhas (branches or recensions) in existence across different regions and lineages. These shakhas represented diverse methods of preserving, reciting, and interpreting the Vedic knowledge...{" "}

              <button
                type="button"
                onClick={() => handleSetSubView('shakhas')}
                className="inline-flex min-h-9 items-center gap-1 border-none bg-transparent p-0 font-serif text-inherit font-bold text-primary underline decoration-accent transition-colors hover:text-primary/80"
              >
                Read More Details ↗
              </button>
            </p>
          </div>

          {/* 2. Hereditary Niyama Adhyayanam (HNY) Scheme */}
          <div className="flex flex-col gap-4 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-8">
            <div className="flex items-center gap-4 border-b border-accent/40 pb-3">
              <span className="rounded-lg border border-accent bg-background p-2.5 text-3xl" aria-hidden="true">👥</span>
              <h3 className="m-0 font-serif text-xl font-bold text-primary sm:text-2xl">
                Hereditary Niyama Adhyayanam (HNY) Scheme
              </h3>
            </div>
            <p className="m-0 text-justify font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
              This unique initiative revives and sustains the hereditary mode of Vedic learning, in which a father imparts the Vedas to his son within the family lineage. Known as the Hereditary Niyama Adhyayanam (HNY) scheme, it upholds the disciplined study of the Vedas as a sacred familial duty...{" "}

              <button
                type="button"
                onClick={() => handleSetSubView('hny')}
                className="inline-flex min-h-9 items-center gap-1 border-none bg-transparent p-0 font-serif text-inherit font-bold text-primary underline decoration-accent transition-colors hover:text-primary/80"
              >
                Read More Details ↗
              </button>
            </p>
          </div>

          {/* 3. Focus on Sampradāyam */}
          <div className="flex flex-col gap-4 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-8">
            <div className="flex items-center gap-4 border-b border-accent/40 pb-3">
              <span className="rounded-lg border border-accent bg-background p-2.5 text-3xl" aria-hidden="true">🪔</span>
              <h3 className="m-0 font-serif text-xl font-bold text-primary sm:text-2xl">
                Focus on Sampradāyam
              </h3>
            </div>
            <p className="m-0 text-justify font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
              As per the sacred guidance of His Holiness, the Trust emphasizes that Vidyārthīs must not only pursue Adhyayanam (Vedic study) but also adhere to Sampradāyam—the traditional code of conduct including Gurukula Vāsam, Śikhāvān, and Sva-Śākhā Adhyayanam...{" "}

              <button
                type="button"
                onClick={() => handleSetSubView('sampradayam')}
                className="inline-flex min-h-9 items-center gap-1 border-none bg-transparent p-0 font-serif text-inherit font-bold text-primary underline decoration-accent transition-colors hover:text-primary/80"
              >
                Read More Details ↗
              </button>
            </p>
          </div>

          {/* 4. Support for Rare Veda Shaakhas */}
          <div className="flex flex-col gap-4 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-8">
            <div className="flex items-center gap-4 border-b border-accent/40 pb-3">
              <span className="rounded-lg border border-accent bg-background p-2.5 text-3xl" aria-hidden="true">🛡️</span>
              <h3 className="m-0 font-serif text-xl font-bold text-primary sm:text-2xl">
                Support for Rare Veda Shaakhas
              </h3>
            </div>
            <p className="m-0 text-justify font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
              Certain branches (<em>śākhās</em>) of the Vedas are now on the brink of extinction due to a dwindling number of practitioners. Recognizing this urgent need, VRNT has established and supported Veda Pāṭhaśālās dedicated to these rare Shaakhas.
            </p>
          </div>

          {/* 5. Pan-India Financial Assistance */}
          <div className="flex flex-col gap-4 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-8">
            <div className="flex items-center gap-4 border-b border-accent/40 pb-3">
              <span className="rounded-lg border border-accent bg-background p-2.5 text-3xl" aria-hidden="true">🌐</span>
              <h3 className="m-0 font-serif text-xl font-bold text-primary sm:text-2xl">
                Pan-India Financial Assistance
              </h3>
            </div>
            <p className="m-0 text-justify font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
              The Trust extends comprehensive financial assistance to deserving Veda Pāṭhaśālās across India. Such assistance enables institutions in even the most remote areas to maintain high standards of Vedic education.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: Maha Periyava's Message Quote Panel */}
      <section className="mx-auto mt-2 w-full max-w-[1100px] rounded-2xl border-2 border-border bg-muted/60 p-8 text-center shadow-soft md:p-12">
        <h2 className="m-0 mb-6 font-serif text-2xl font-bold text-primary sm:text-3xl">
          Maha Periyava's Message
        </h2>

        <blockquote className="m-0 mx-auto mb-6 max-w-[900px] text-center font-serif text-xl font-bold italic leading-relaxed text-foreground sm:text-2xl">
          "The preservation of the Vedas is the foremost duty, as they are the foundation of Sanatana Dharma and the source of all spiritual and cultural discipline."
        </blockquote>

        <p className="m-0 mx-auto max-w-[800px] text-center font-serif text-sm font-semibold leading-relaxed text-muted-foreground sm:text-base">
          Ancient traditions should not be discarded merely for being old but should be judged by their true value and purpose. Neglecting the Vedas leads to the decay of Dharma, while preserving them ensures prosperity and peace for the world.
        </p>
      </section>

    </div>
  );
}

import { useLayoutEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from '@/lib/seo';

export default function Activities() {
  const [searchParams] = useSearchParams();

  // Active view driven directly from URL query param (?view=final-exams)
  const activeView = searchParams.get('view');

  // Restore scroll position when returning back to main Activities overview page
  useLayoutEffect(() => {
    if (!activeView) {
      const savedPos = sessionStorage.getItem('activities_scroll_pos');
      if (savedPos !== null) {
        window.scrollTo(0, parseInt(savedPos, 10));
        sessionStorage.removeItem('activities_scroll_pos');
      }
    }
  }, [activeView]);

  const handleNavigateToView = () => {
    // Save current scroll position before leaving
    sessionStorage.setItem('activities_scroll_pos', window.scrollY.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto flex w-full max-w-wide flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">

      {/* ---------------------------------------------------- */}
      {/* SUB-PAGE VIEW: Final Examinations and Recognition */}
      {/* ---------------------------------------------------- */}
      {activeView === 'final-exams' ? (
        <div className="flex flex-col gap-6">

          {/* Back Navigation Button */}
          <div className="w-full pt-2">
            <Link
              to="/activities"
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-accent/60 bg-surface px-4 py-1.5 font-serif text-sm font-bold text-primary shadow-soft transition-all hover:bg-primary hover:text-primary-foreground sm:text-base"
            >
              <span aria-hidden="true">←</span> Back to Activities Overview
            </Link>
          </div>

          <section className="space-y-8 rounded-2xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-10">
            <h1 className="border-b-2 border-accent/40 pb-3 text-left font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              🎓 Final Examinations and Recognition
            </h1>

            {/* Full-width introductory paragraphs */}
            <div className="space-y-4 text-justify font-serif text-base font-normal leading-relaxed text-foreground sm:text-lg">
              <p className="m-0">
                At the culmination of their course, students appear for the final examinations conducted by VRNT, which serve as a comprehensive assessment of their proficiency in their respective Veda Śākhā. Successful candidates are awarded certificates of proficiency along with monetary recognition, acknowledging their dedication, discipline, and hard work.
              </p>
              <p className="m-0">
                The first-rank Vidyārthī in each Veda Śākhā is honoured with a special award. In addition, the Adhyāpaka (teacher) of the top-ranking Vidyārthī is also felicitated with a special sambhāvana in recognition of their guidance and contribution.
              </p>
            </div>

            {/* Grid pairing the Ilaya Periyava text block with the examination image */}
            <div className="grid grid-cols-1 items-center gap-8 pt-2 xl:grid-cols-[6fr_5fr]">

              {/* Left side text block */}
              <div className="space-y-3 text-justify font-serif text-base font-normal leading-relaxed text-foreground sm:text-lg">
                <p className="m-0">
                  Ilaya Periyava, Sri Sri Sathya Chandrasekharendra Saraswathi Swamigal, takes a keen and active interest in the conduct of the examinations. He is present in the examination hall whenever possible and personally interacts with and examines the students.
                </p>
                <p className="m-0">
                  The Vidyārthīs feel both deeply blessed and inspired by the opportunity to be examined by the Āchārya, making it a truly memorable and sacred experience.
                </p>
              </div>

              {/* Right side examination photo */}
              <div className="flex flex-col items-center rounded-xl border-2 border-border bg-background p-3 shadow-soft">
                <div className="w-full overflow-hidden rounded-lg border border-border">
                  <img
                    src="/assets/Chandrasekharendra Saraswathi Swamigal examination.webp"
                    alt="Acharya examining students in examination hall"
                    loading="lazy"
                    className="h-auto max-h-[380px] w-full rounded object-contain"
                  />
                </div>
                <p className="m-0 mt-3 text-center font-serif text-xs font-bold text-primary sm:text-sm">
                  His Holiness the Āchārya examining Vidyārthīs during Pariksha
                </p>
              </div>

            </div>

            {/* Graduation Ceremonies Sub-Block */}
            <div className="space-y-6 border-t-2 border-accent/30 pt-8">

              {/* Top full-width paragraphs */}
              <div className="space-y-4 text-justify font-serif text-base font-normal leading-relaxed text-foreground sm:text-lg">
                <p className="m-0">
                  These examinations are conducted twice a year, typically around the months of March and September.
                </p>
                <p className="m-0">
                  Certificates are presented to the Vidyārthīs during a graduation समारोह specially organized for this purpose—once on the auspicious occasion of Śaṅkara Jayanti and again on Vijaya Daśamī. The parents and family members of the Vidyārthīs are also invited to participate in this significant milestone.
                </p>
              </div>

              {/* Grid pairing only the Āchārya paragraph with the graduation image */}
              <div className="grid grid-cols-1 items-center gap-8 pt-2 xl:grid-cols-[6fr_5fr]">

                {/* Left side: His Holiness Āchārya specific paragraph */}
                <p className="m-0 text-justify font-serif text-base font-normal leading-relaxed text-foreground sm:text-lg">
                  His Holiness the Āchārya takes a special interest in these events, personally presenting the certificates to each Vidyārthī and spending a few moments with every family, making the occasion deeply meaningful and memorable.
                </p>

                {/* Right side: Graduation Image */}
                <div className="flex flex-col items-center rounded-xl border-2 border-border bg-background p-3 shadow-soft">
                  <div className="w-full overflow-hidden rounded-lg border border-border">
                    <img
                      src="/assets/Acharya certificate.webp"
                      alt="Graduation समारोह certificate presentation"
                      loading="lazy"
                      className="h-auto max-h-[380px] w-full rounded object-contain"
                    />
                  </div>
                  <p className="m-0 mt-3 text-center font-serif text-xs font-bold text-primary sm:text-sm">
                    His Holiness presenting graduation certificates during Graduation समारोह
                  </p>
                </div>

              </div>

              {/* Bottom full-width paragraphs */}
              <div className="space-y-4 pt-2 text-justify font-serif text-base font-normal leading-relaxed text-foreground sm:text-lg">
                <p className="m-0 rounded-lg border border-accent/40 bg-background p-4">
                  This recognition not only celebrates their accomplishment but also inspires them to continue their lifelong pursuit of Vedic learning and teaching.
                </p>
                <p className="m-0">
                  Further, during these graduation ceremonies, a distinguished Veda Vidwān from each Veda Śākhā, as recommended by the Āchārya, is formally felicitated.
                </p>
              </div>

            </div>

          </section>
        </div>
      ) : (

        /* ---------------------------------------------------- */
        /* MAIN OVERVIEW VIEW: Main Activities Page            */
        /* ---------------------------------------------------- */
        <>
          <Helmet
            title="Trust Activities"
            description="VRNT's ongoing activities, including Varshika Examinations across affiliated Pāṭhaśālās, Final Examinations and Recognition, daily Veda Pārāyaṇam, and monthly Veda Sadas held across India."
          />

          {/* Header Banner */}
          <div className="mx-auto max-w-max border-b-2 border-double border-primary px-8 pb-4 text-center">
            <h1 className="font-serif text-3xl font-bold tracking-wide text-primary sm:text-4xl lg:text-5xl">
              Trust Activities
            </h1>
          </div>

          {/* SECTION 1: Academic Monitoring Intro */}
          <section className="space-y-6 rounded-2xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-10">

            <div className="rounded-xl border border-accent/40 bg-background p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-lg border border-accent bg-surface p-2 text-2xl" aria-hidden="true">📜</span>
                <h2 className="m-0 font-serif text-2xl font-bold text-primary sm:text-3xl">
                  Academic Monitoring and Varshika Examinations
                </h2>
              </div>

              <p className="m-0 text-justify font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
                To maintain academic rigor and uniformity, VRNT conducts <strong>regular inspections and annual assessments</strong> (<em>Varshika Pariksha</em>) across its affiliated Pāṭhaśālās in <strong>Tamil Nadu, Kerala, Andhra Pradesh, Telangana, Maharashtra, and Assam</strong>. Senior scholars from the Trust personally visit these institutions to evaluate students' progress through oral examinations and recitation tests, ensuring adherence to traditional standards and authenticity of transmission. Based on the portion covered for the Varshikam exam, the trust gives “Guru Dakshina” to the Adhyapakar.
              </p>
            </div>

            {/* Quick Preview Card to Link to Final Exams */}
            <Link
              to="/activities?view=final-exams"
              onClick={handleNavigateToView}
              className="group flex flex-col items-center justify-between gap-6 rounded-xl border-2 border-border bg-background p-6 shadow-soft transition-all hover:border-primary md:flex-row"
            >
              <div className="space-y-2">
                <h3 className="m-0 flex items-center gap-2 font-serif text-xl font-bold text-secondary transition-colors group-hover:text-primary">
                  <span aria-hidden="true">🎓</span> Final Examinations and Recognition
                </h3>
                <p className="m-0 font-serif text-sm font-medium text-muted-foreground sm:text-base">
                  Comprehensive biannual assessments, certificates of proficiency, special awards under the presence of His Holiness the Āchārya, and Graduation Ceremonies.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-accent bg-surface px-4 py-2 font-serif text-sm font-bold text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground sm:text-base">
                Read Full Details ↗
              </span>
            </Link>

          </section>

          {/* SECTION 2: Other Activities */}
          <section className="space-y-8 rounded-2xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-10">

            <div className="mx-auto max-w-2xl border-b-2 border-accent/40 pb-4 text-center">
              <h2 className="m-0 font-serif text-2xl font-bold text-primary sm:text-3xl">
                Other Activities
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 font-serif text-base text-foreground sm:text-lg">

              {/* Item 1: Daily Veda Pārāyaṇam */}
              <div className="flex items-start gap-4 rounded-xl border border-accent/50 bg-background p-6 shadow-soft sm:items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-surface text-lg text-primary shadow-soft" aria-hidden="true">
                  🪔
                </span>
                <div>
                  <h3 className="m-0 font-serif text-xl font-bold text-secondary sm:text-2xl">
                    Daily Veda Pārāyaṇam
                  </h3>
                  <p className="m-0 mt-1 font-serif text-base font-medium text-muted-foreground">
                    Conducted daily at Sri Kanchi Kamakoti Peetham Mutt.
                  </p>
                </div>
              </div>

              {/* Item 2: Monthly Special Chathur Veda Pārāyaṇams */}
              <div className="space-y-6 rounded-xl border border-accent/50 bg-background p-6 shadow-soft sm:p-8">

                <div className="flex items-start gap-4 border-b border-accent/30 pb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-surface text-lg text-primary shadow-soft" aria-hidden="true">
                    🪔
                  </span>
                  <div>
                    <h3 className="m-0 font-serif text-xl font-bold text-secondary sm:text-2xl">
                      Monthly Special Chathur Veda Pārāyaṇams
                    </h3>
                    <p className="m-0 mt-1 font-serif text-sm font-medium text-muted-foreground sm:text-base">
                      Conducted regularly on the auspicious Janma Nakṣatra (birth star) days:
                    </p>
                  </div>
                </div>

                {/* Stacked vertically in 1 column */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 rounded-lg border border-accent/40 bg-surface p-4 shadow-soft">
                    <span className="text-lg font-bold leading-none text-primary" aria-hidden="true">•</span>
                    <div>
                      <span className="mb-0.5 block font-sans text-xs font-bold uppercase tracking-wider text-primary">MAHA PERIYAVA</span>
                      <p className="m-0 font-serif text-base font-bold text-foreground">Anusham <span className="font-sans text-xs font-normal text-muted-foreground">(Anuradha)</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-accent/40 bg-surface p-4 shadow-soft">
                    <span className="text-lg font-bold leading-none text-primary" aria-hidden="true">•</span>
                    <div>
                      <span className="mb-0.5 block font-sans text-xs font-bold uppercase tracking-wider text-primary">SRI SRI JAYENDRA SARASWATHI SWAMIGAL</span>
                      <p className="m-0 font-serif text-base font-bold text-foreground">Avittam <span className="font-sans text-xs font-normal text-muted-foreground">(Dhanishta)</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border border-accent/40 bg-surface p-4 shadow-soft">
                    <span className="text-lg font-bold leading-none text-primary" aria-hidden="true">•</span>
                    <div>
                      <span className="mb-0.5 block font-sans text-xs font-bold uppercase tracking-wider text-primary">SRI SRI VIJAYENDRA SARASWATHI SWAMIGAL</span>
                      <p className="m-0 font-serif text-base font-bold text-foreground">Uththarashadam <span className="font-sans text-xs font-normal text-muted-foreground">(Uttarashada)</span></p>
                    </div>
                  </div>
                </div>

                {/* Sub-Card: Shatabhishak Nakshetra Sabha */}
                <div className="space-y-4 rounded-xl border-2 border-accent/60 bg-surface p-5 sm:p-6">
                  <div className="flex items-start gap-2.5 border-b border-accent/30 pb-3">
                    <span className="mt-0.5 text-2xl font-bold leading-none text-primary" aria-hidden="true">•</span>
                    <div>
                      <h4 className="m-0 font-serif text-lg font-bold text-primary">
                        Shatabhishak Nakṣatra Sabha (शतभिषङ्नक्षत्रसभा)
                      </h4>
                      <p className="m-0 mt-1 font-serif text-xs font-medium text-muted-foreground sm:text-sm">
                        Organized on Sathayam (Shatabhishak) — the Janma Nakṣatra day of Sri Sri Sathya Chandrasekharendra Saraswathi Swamigal.
                      </p>
                    </div>
                  </div>

                  {/* Covered Portions with Triangle Bullets */}
                  <div className="grid grid-cols-1 gap-3 pl-2 font-sans text-sm font-semibold sm:text-base md:grid-cols-2">
                    <div className="flex items-center gap-2.5 rounded-md border border-accent/30 bg-background p-3">
                      <span className="text-xs text-primary" aria-hidden="true">▲</span>
                      <span><strong>Rig Vedam:</strong> Ithareya Bramhanam</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-md border border-accent/30 bg-background p-3">
                      <span className="text-xs text-primary" aria-hidden="true">▲</span>
                      <span><strong>Krishna Yajur Vedam:</strong> Varna Kramam</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-md border border-accent/30 bg-background p-3">
                      <span className="text-xs text-primary" aria-hidden="true">▲</span>
                      <span><strong>Sama Vedam:</strong> Astabramhanam</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-md border border-accent/30 bg-background p-3">
                      <span className="text-xs text-primary" aria-hidden="true">▲</span>
                      <span><strong>Sukla Yajur Vedam:</strong> Sathapatha Bramhanam</span>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-md border border-accent/30 bg-background p-3 md:col-span-2">
                      <span className="mt-1 shrink-0 text-xs text-primary" aria-hidden="true">▲</span>
                      <span><strong>Shadangam:</strong> Siksha, Vyakaranam, Chandas, Niruktham, Jothisam & Kalpam</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Item 3: Sukla Panchami Sadas */}
              <div className="flex items-start gap-4 rounded-xl border border-accent/50 bg-background p-6 shadow-soft sm:items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent bg-surface text-lg text-primary shadow-soft" aria-hidden="true">
                  🪔
                </span>
                <div>
                  <h3 className="m-0 font-serif text-xl font-bold text-secondary sm:text-2xl">
                    Śukla Pañchami Sadas
                  </h3>
                  <p className="m-0 mt-1 font-serif text-base font-medium text-muted-foreground">
                    Conducted monthly across key regional centers: <strong>Vijayawada</strong>, <strong>Tirupati</strong>, and <strong>Secunderabad</strong>.
                  </p>
                </div>
              </div>

            </div>
          </section>
        </>
      )}

    </div>
  );
}

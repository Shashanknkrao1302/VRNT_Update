import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from '@/lib/seo';

interface InitiativesPageProps {
  overrideView?: string | null;
  onBack?: () => void;
}

export default function InitiativesPage({
  overrideView,
  onBack
}: InitiativesPageProps) {
  const [searchParams] = useSearchParams();

  const activeView = overrideView || searchParams.get('view') || 'shakhas';

  const shakhaData = [
    {
      veda: "Rigveda",
      originalCount: "21",
      availableShakhas: "Shakala (most prominent), Bhashkala"
    },
    {
      veda: "Yajurveda",
      originalCount: "101",
      availableShakhas: (
        <>
          <strong>Shukla:</strong> Madhyandina, Kanva<br />
          <strong>Krishna:</strong> Thaitthiriya, Maitrayani, Kathaka, Kapishthala
        </>
      )
    },
    {
      veda: "Samaveda",
      originalCount: "1,000",
      availableShakhas: "Kauthuma, Ranayaniya, Jaiminiya (or Talavakara)"
    },
    {
      veda: "Atharvaveda",
      originalCount: "9",
      availableShakhas: "Shaunaka, Pippalada"
    }
  ];

  const backButtonClassName = "inline-flex min-h-9 items-center gap-2 rounded-md border border-accent/60 bg-surface px-4 py-1.5 font-serif text-sm font-bold text-primary shadow-soft transition-all hover:bg-primary hover:text-primary-foreground sm:text-base";

  return (
    <div className="mx-auto flex w-full max-w-wide flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">

      {/* Top Navigation: Back Button */}
      <div className="w-full pt-2">
        {onBack ? (
          <button type="button" onClick={onBack} className={backButtonClassName}>
            <span aria-hidden="true">←</span> Back to Mission Page
          </button>
        ) : (
          <Link to="/mission" className={backButtonClassName}>
            <span aria-hidden="true">←</span> Back to Mission Page
          </Link>
        )}
      </div>

      {/* SECTION 1: Supporting all Available Veda Shakhas */}
      {activeView === 'shakhas' && (
        <section className="border-t-2 border-border pt-4">
          <Helmet
            title="Supporting all Available Veda Shakhas"
            description="An overview of the Veda shakhas that survive today across the Rig, Yajur, Sama, and Atharva Vedas, and how VRNT supports their study and examination."
          />
          <h1 className="mb-8 border-b-2 border-accent/40 pb-3 text-left font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
            Supporting all Available Veda Shakhas
          </h1>

          <div className="grid w-full grid-cols-1 items-start gap-8 xl:grid-cols-[6fr_5fr]">
            <div className="flex flex-col gap-5 text-justify">
              <p className="m-0 font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
                Our traditional scriptures and historical references indicate that there were once more than a thousand Veda shakhas (branches or recensions) in existence across different regions and lineages. These shakhas represented diverse methods of preserving, reciting, and interpreting the Vedic knowledge, each with its own unique style, pronunciation, and textual variations. However, over the passage of time, due to various social, cultural, and historical changes, a significant number of these shakhas have been lost or are no longer actively practiced.
              </p>
              <p className="m-0 font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
                In the present day, only a limited number of these Veda shakhas have survived and continue to be preserved through dedicated efforts. These surviving shakhas are still being practiced and taught by committed scholars, teachers, and students who strive to maintain this invaluable heritage. The currently available and actively practiced shakhas are listed and presented in the adjoining table for reference and clarity.
              </p>
              <p className="m-0 font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
                VRNT plays an important role in supporting and promoting the study of these shakhas. It conducts examinations for all the available shakhas wherever Vidyarthis (students) are present and actively learning. Through these examinations and related initiatives, VRNT helps ensure that the knowledge of the Vedas continues to be transmitted accurately and preserved for future generations.
              </p>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border-2 border-border bg-surface p-2 shadow-lifted sm:p-3">
              <table className="w-full border-collapse text-left font-serif text-foreground">
                <thead>
                  <tr className="border-b-2 border-border bg-accent/15">
                    <th className="border border-border p-3 text-base font-bold text-foreground sm:text-lg">Veda</th>
                    <th className="border border-border p-3 text-center text-base font-bold text-foreground sm:text-lg">Original No of shakhas available</th>
                    <th className="border border-border p-3 text-base font-bold text-foreground sm:text-lg">Shakhas available today</th>
                  </tr>
                </thead>
                <tbody>
                  {shakhaData.map((row, idx) => (
                    <tr key={idx} className="border-b border-border transition-colors hover:bg-accent/10">
                      <td className="border border-border p-3 text-base font-bold text-primary sm:text-lg">{row.veda}</td>
                      <td className="border border-border p-3 text-center text-base font-bold sm:text-lg">{row.originalCount}</td>
                      <td className="border border-border p-3 text-sm leading-relaxed sm:text-base">{row.availableShakhas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: Hereditary Niyama Adhyayanam (HNY) Scheme */}
      {activeView === 'hny' && (
        <section className="border-t-2 border-border pt-4">
          <Helmet
            title="Hereditary Niyama Adhyayanam (HNY) Scheme"
            description="How VRNT's Hereditary Niyama Adhyayanam (HNY) scheme sustains the family-lineage tradition of Vedic learning, where a father imparts the Vedas to his son."
          />
          <h1 className="mb-8 border-b-2 border-accent/40 pb-3 text-left font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
            Hereditary Niyama Adhyayanam (HNY) Scheme
          </h1>

          <div className="grid w-full grid-cols-1 items-center gap-8 xl:grid-cols-[6fr_5fr]">
            <div className="flex flex-col gap-5 text-justify">
              <p className="m-0 font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
                This unique initiative revives and sustains the hereditary mode of Vedic learning, in which a father imparts the Vedas to his son within the family lineage. Known as the Hereditary Niyama Adhyayanam (HNY) scheme, it upholds the disciplined study of the Vedas as a sacred familial duty, where the father assumes the role of Guru and the son becomes the Śishya.
              </p>

              <p className="m-0 font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
                This lineage-based method is regarded as the most authentic and time-tested means of preserving Vedic knowledge, ensuring precision in pronunciation (<em>śikṣā</em>) and purity in intonation (<em>svara</em>). By supporting families who continue this tradition, the Trust helps strengthen the unbroken oral chain (<em>paramparā</em>) of Vedic transmission.
              </p>

              <p className="m-0 font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
                Through financial assistance and institutional recognition, the Trust honours these hereditary scholars as true custodians of Sanātana Dharma and vital pillars in sustaining the living Vedic heritage.
              </p>
            </div>

            <div className="flex w-full flex-col items-center rounded-xl border-2 border-border bg-surface p-3 shadow-lifted">
              <div className="w-full overflow-hidden rounded-lg border border-border">
                <img
                  src="/assets/HNY.webp"
                  alt="Father teaching son under HNY scheme"
                  loading="lazy"
                  className="h-auto max-h-[420px] w-full object-contain"
                />
              </div>
              <p className="mt-3 text-center font-serif text-sm font-bold text-primary">
                Guru-Shishya Parampara: Father imparting Vedic recitation to his son
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: Focus on Sampradāyam */}
      {activeView === 'sampradayam' && (
        <section className="space-y-8 border-t-2 border-border pt-4">
          <Helmet
            title="Focus on Sampradāyam"
            description="How VRNT upholds Sampradāyam — the traditional code of conduct including Gurukula Vāsam, Śikhāvān, and Sva-Śākhā Adhyayanam — alongside Vedic study."
          />
          <h1 className="mb-8 border-b-2 border-accent/40 pb-3 text-left font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
            Focus on Sampradāyam
          </h1>

          <div className="flex flex-col gap-5 text-justify font-serif leading-relaxed text-foreground">
            <p className="m-0 font-medium text-base sm:text-lg">
              As per the sacred guidance of His Holiness, the Trust emphasizes that Vidyārthīs (students) must not only pursue Adhyayanam (Vedic study) but also adhere to Sampradāyam—the traditional code of conduct and way of life that forms the foundation of Vedic learning. True Vedic education encompasses both intellectual study and disciplined living in accordance with Dharma.
            </p>
          </div>

          <div className="space-y-4 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted sm:p-8">
            <h2 className="m-0 border-b border-accent/40 pb-3 font-serif text-2xl font-bold text-primary sm:text-3xl">
              The Gurukula System: A Sacred Journey
            </h2>
            <p className="m-0 font-serif text-base font-medium leading-relaxed text-foreground sm:text-lg">
              The Gurukula system is not merely academic; it is a sacred journey designed to build character and spiritual maturity alongside scholarship.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2 font-serif text-sm sm:text-base md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-background p-4 shadow-soft">
                <span className="mt-1 shrink-0 text-xs text-primary" aria-hidden="true">▲</span>
                <span><strong>Early Discipline:</strong> Students (śiṣyas) begin as early as six years of age.</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-background p-4 shadow-soft">
                <span className="mt-1 shrink-0 text-xs text-primary" aria-hidden="true">▲</span>
                <span><strong>Immersive Learning:</strong> Living with the Guru, students engage in 8 to 10 hours of daily recitation.</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-background p-4 shadow-soft">
                <span className="mt-1 shrink-0 text-xs text-primary" aria-hidden="true">▲</span>
                <span><strong>Character Building:</strong> The system instills humility, devotion, and self-control.</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-accent/40 bg-background p-4 shadow-soft">
                <span className="mt-1 shrink-0 text-xs text-primary" aria-hidden="true">▲</span>
                <span><strong>Oral Assessment:</strong> Evaluation is entirely oral, requiring flawless precision in pronunciation (śikṣā) and intonation (svara).</span>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 pt-2 font-serif">
            <div className="w-full space-y-3 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted">
              <h3 className="m-0 border-b border-accent/40 pb-2 text-xl font-bold text-primary sm:text-2xl">
                Gurukula Vāsam
              </h3>
              <p className="m-0 mt-3 text-justify text-base font-medium leading-relaxed text-foreground sm:text-lg">
                In keeping with ancient tradition, Vidyārthīs are expected to reside with their Guru in the Gurukula and engage in full-time Adhyayanam. Living away from one’s family under the guidance of the Guru is considered a form of Tapas (austerity). The young Vidyārthīs who live this life of discipline undertake this Tapas, which profoundly shapes their character and spiritual maturity.
              </p>
            </div>

            <div className="w-full space-y-3 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted">
              <h3 className="m-0 border-b border-accent/40 pb-2 text-xl font-bold text-primary sm:text-2xl">
                Śikhāvān (Wearing the Śikhā)
              </h3>
              <p className="m-0 mt-3 text-justify text-base font-medium leading-relaxed text-foreground sm:text-lg">
                Every Vidyārthī is expected to maintain a Śikhā (tuft of hair), which is an essential mark of identity and discipline prescribed in the Dharmashāstras. The Śikhā is not merely symbolic—it represents purity, dedication to Vedic study, and commitment to the spiritual ideals of the Gurukula.
              </p>
            </div>

            <div className="w-full space-y-3 rounded-xl border-2 border-border bg-surface p-6 shadow-lifted">
              <h3 className="m-0 border-b border-accent/40 pb-2 text-xl font-bold text-primary sm:text-2xl">
                Sva-Śākhā Adhyayanam
              </h3>
              <p className="m-0 mt-3 text-justify text-base font-medium leading-relaxed text-foreground sm:text-lg">
                The term Sva-Śākhā refers to the Vedic branch belonging to one’s ancestral lineage. According to tradition, every Brahmin is expected to study the Vedas, beginning with the Śākhā specific to his family. Only after attaining proficiency in his own Śākhā may a student proceed to learn other branches, preserving lineage purity unbroken.
              </p>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

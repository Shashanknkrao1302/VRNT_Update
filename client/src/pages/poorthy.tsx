import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  ArrowLeft, 
  ImageIcon, 
  Sparkles, 
  Images, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "@/lib/seo";

interface PoorthyProps {
  onBack: () => void;
}

export default function PoorthyPage({ onBack }: PoorthyProps) {
  // State for Gallery 1: March 5, 2026 (VRNT-POORTHY-SJ26)
  const [currentIdxG1, setCurrentIdxG1] = useState<number>(0);

  // State for Gallery 2: August 31, 2025 (VRNT-VJ-EXAMS-SEP-2025)
  const [currentIdxG2, setCurrentIdxG2] = useState<number>(0);

  // State for Gallery 3: September 11–14, 2024 (VRNT VIJAYADASAMI EXAMS)
  const [currentIdxG3, setCurrentIdxG3] = useState<number>(0);

  // State for Gallery 4: March 15–17, 2024 (VRNT POORTHI EXAM)
  const [currentIdxG4, setCurrentIdxG4] = useState<number>(0);

  // State for Gallery 5: September 22–24, 2023 (VRNT POORTHI EXAMS)
  const [currentIdxG5, setCurrentIdxG5] = useState<number>(0);

  // State for Gallery 6: August 13–16, 2022 (VRNT Poorthy Exams)
  const [currentIdxG6, setCurrentIdxG6] = useState<number>(0);

  const poorthyLevels = [
    { veda: "Rig Veda", levels: ["Moolam", "Padam–Kramam", "Ghanam", "Lakshanam"], note: "Separate examination for Athreya Brahmanam as well" },
    { veda: "Yajur Veda (both Krishna and Shukla Shaakhas)", levels: ["Padam–Kramam", "Ghanam", "Lakshanam"] },
    { veda: "Sama Veda", levels: ["Poorva Bhagam", "Uttara Bhagam"] },
    { veda: "Atharva Veda", levels: ["Moolam level"] }
  ];

  // --- 1. MARCH 5, 2026 (first gallery) ---
  const g1ImagePaths = [
    "/poorthy/first gallery/IMG_20260305_111546869_HDR.webp",
    "/poorthy/first gallery/IMG_20260305_111559214_HDR.webp",
    "/poorthy/first gallery/IMG_20260305_111609657_HDR.webp"
  ];
  const g1SlideBgImage = "/poorthy/first gallery/IMG_20260305_111617178_HDR.webp";
  const g1TotalSlides = g1ImagePaths.length + 1;

  // --- 2. AUGUST 31, 2025 (second gallery) ---
  const g2ImagePaths = [
    "/poorthy/second gallery/20250831_093953.webp",
    "/poorthy/second gallery/20250831_094001.webp",
    "/poorthy/second gallery/20250831_101817.webp",
    "/poorthy/second gallery/IMG_20250831_093631544_HDR.webp",
    "/poorthy/second gallery/IMG_20250831_093640412_HDR.webp"
  ];
  const g2SlideBgImage = "/poorthy/second gallery/IMG_20250831_093917757_HDR.webp";
  const g2TotalSlides = g2ImagePaths.length + 1;

  // --- 3. SEPTEMBER 11–14, 2024 (third gallery) ---
  const g3ImagePaths = [
    "/poorthy/third gallery/20240911_085056.webp",
    "/poorthy/third gallery/20240911_092454.webp",
    "/poorthy/third gallery/20240911_092832.webp",
    "/poorthy/third gallery/IMG-20240911-WA0021.webp",
    "/poorthy/third gallery/IMG20240911085759.webp"
  ];
  const g3SlideBgImage = "/poorthy/third gallery/IMG20240911085805.webp";
  const g3TotalSlides = g3ImagePaths.length + 1;

  // --- 4. MARCH 15–17, 2024 (fourth gallery) ---
  const g4ImagePaths = [
    "/poorthy/fourth gallery/IMG-20240316-WA0033.webp",
    "/poorthy/fourth gallery/IMG20240315095416.webp",
    "/poorthy/fourth gallery/IMG20240315101639.webp",
    "/poorthy/fourth gallery/IMG20240315101735.webp",
    "/poorthy/fourth gallery/IMG20240315101739.webp"
  ];
  const g4SlideBgImage = "/poorthy/fourth gallery/IMG20240316100506.webp";
  const g4TotalSlides = g4ImagePaths.length + 1;

  // --- 5. SEPTEMBER 22–24, 2023 (fifth gallery) ---
  const g5ImagePaths = [
    "/poorthy/fifth gallery/IMG-20230924-WA0066.webp",
    "/poorthy/fifth gallery/IMG-20230924-WA0069.webp",
    "/poorthy/fifth gallery/IMG-20230924-WA0073.webp",
    "/poorthy/fifth gallery/IMG-20230924-WA0076.webp",
    "/poorthy/fifth gallery/IMG-20230924-WA0077.webp"
  ];
  const g5SlideBgImage = "/poorthy/fifth gallery/IMG-20230924-WA0079.webp";
  const g5TotalSlides = g5ImagePaths.length + 1;

  // --- 6. AUGUST 13–16, 2022 (sixth gallery) ---
  const g6ImagePaths = [
    "/poorthy/sixth gallery/IMG20220814094026.webp",
    "/poorthy/sixth gallery/IMG20220814070154.webp",
    "/poorthy/sixth gallery/IMG20220814070346.webp",
    "/poorthy/sixth gallery/IMG20220814090120.webp",
    "/poorthy/sixth gallery/IMG20220814095008.webp"
  ];
  const g6SlideBgImage = "/poorthy/sixth gallery/IMG20220814090029.webp";
  const g6TotalSlides = g6ImagePaths.length + 1;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Helmet
        title="Poorthy Examination"
        description="The final graduation examination for Vidyaarthis marking the culmination of Vedic study, plus photo galleries from past Poorthy examination ceremonies."
      />
      <main className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-14">

        {/* Back Button */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="gap-2 text-primary hover:text-primary/80 font-serif italic p-0 hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Pariksha Overview
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-border bg-surface p-6 md:p-10 shadow-soft mb-12"
        >
          <div className="border-b border-border pb-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary m-0">
                Poorthy Examination
              </h2>
            </div>
            <p className="text-muted-foreground font-serif italic text-base mt-2 m-0">
              Final Completion and Graduation Assessment for Vidyaarthis
            </p>
          </div>

          <article className="flex flex-col gap-6 text-foreground font-serif leading-relaxed text-base md:text-lg mb-8">
            <p className="m-0">
              The <strong className="text-secondary font-sans font-semibold">Poorthy Examination</strong> serves as the final or graduation examination for <em className="italic font-semibold text-secondary">Vidyaarthis</em> (students) who have successfully completed their prescribed course of Vedic study. It marks the culmination of years of rigorous <em className="italic font-semibold text-secondary">Adhyayanam</em> and dedicated discipline within the Gurukula system.
            </p>

            <p className="m-0">
              Different Veda Shaakhas have distinct levels of certification, reflecting the traditional hierarchy of Vedic mastery:
            </p>
          </article>

          {/* Certification Levels Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 font-serif">
            {poorthyLevels.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-background p-5 space-y-3">
                <p className="font-bold text-primary text-base border-b border-border pb-2 m-0">
                  {item.veda}
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1.5 text-foreground m-0">
                  {item.levels.map((level, lIdx) => (
                    <li key={lIdx}>{level}</li>
                  ))}
                </ul>
                {item.note && (
                  <p className="text-xs text-accent-strong italic mt-2 border-t border-border/60 pt-2 m-0">
                    * {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          <p className="text-foreground font-serif leading-relaxed text-base md:text-lg m-0 border-t border-border pt-6">
            Each stage of certification represents a significant milestone in the student’s Vedic journey, symbolizing not only scholarly accomplishment but also spiritual growth and dedication to the preservation of the sacred oral tradition.
          </p>
        </motion.div>

        {/* ALL PHOTO GALLERIES CONTAINER (DESCENDING ORDER) */}
        <div className="space-y-10">
          <div className="border-b border-border pb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Images className="w-7 h-7 text-primary" />
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-primary m-0">
                Poorthy Examination Photos
              </h2>
            </div>
          </div>

            {/* ==================== 1. MARCH 5, 2026 ==================== */}
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-soft space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-primary m-0">
                      VRNT-POORTHY-SJ26 (March 5, 2026)
                    </h3>
                  </div>
                  <p className="font-serif text-sm text-foreground m-0 flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-accent-strong" />
                    Official Photography — <span className="font-bold text-accent-strong">March 5, 2026</span>
                  </p>
                </div>
              </div>

              <div className="relative w-full aspect-16/10 md:aspect-16/9 rounded-2xl overflow-hidden bg-black/90 shadow-md group">
                <AnimatePresence mode="wait">
                  {currentIdxG1 < 3 ? (
                    <motion.img
                      key={currentIdxG1}
                      src={g1ImagePaths[currentIdxG1]}
                      alt={`VRNT-POORTHY-SJ26 Photo ${currentIdxG1 + 1}`}
                      initial={{ opacity: 0.3, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = g1ImagePaths[0];
                      }}
                    />
                  ) : (
                    <motion.div
                      key="g1-google-photos-slide"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                    >
                      <img 
                        src={g1SlideBgImage} 
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] blur-[2px] scale-105"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="p-3.5 bg-primary text-primary-foreground rounded-2xl mb-3 shadow-xl border border-white/20">
                          <Images className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h3 className="font-serif font-bold text-xl md:text-3xl text-white drop-shadow-md m-0 mb-2">
                          View Complete Photo Album
                        </h3>
                        <p className="font-serif text-sm md:text-base text-white/85 max-w-md m-0 mb-6 drop-shadow">
                          Access all high-resolution event photographs for VRNT-POORTHY-SJ26 on Google Photos.
                        </p>
                        <a
                          href="https://photos.app.goo.gl/44zvTt67hd1FnXQw5"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex min-h-11 items-center gap-2.5 bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold text-sm md:text-base py-3 px-6 rounded-xl shadow-lifted transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Open Google Photos Album</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 flex items-end justify-between text-white pointer-events-none z-10">
                  <div>
                    <p className="font-serif text-xs md:text-sm text-white m-0 font-medium">
                      {currentIdxG1 < 3 ? `Photo ${currentIdxG1 + 1} of 3` : 'Album Link'}
                    </p>
                  </div>
                  <div className="hidden sm:flex gap-1.5 items-center pointer-events-auto py-1">
                    {Array.from({ length: g1TotalSlides }).map((_, dotIdx) => (
                      <div 
                        key={dotIdx}
                        onClick={() => setCurrentIdxG1(dotIdx)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                          dotIdx === currentIdxG1 ? 'w-6 bg-accent' : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentIdxG1((prev) => (prev - 1 + g1TotalSlides) % g1TotalSlides)}
                  aria-label="Previous photo — VRNT-POORTHY-SJ26"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentIdxG1((prev) => (prev + 1) % g1TotalSlides)}
                  aria-label="Next photo — VRNT-POORTHY-SJ26"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* ==================== 2. AUGUST 31, 2025 ==================== */}
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-soft space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-primary m-0">
                      VRNT-VJ-EXAMS-SEP-2025 (Aug 31, 2025)
                    </h3>
                  </div>
                  <p className="font-serif text-sm text-foreground m-0 flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-accent-strong" />
                    Official Photography — <span className="font-bold text-accent-strong">August 31, 2025</span>
                  </p>
                </div>
              </div>

              <div className="relative w-full aspect-16/10 md:aspect-16/9 rounded-2xl overflow-hidden bg-black/90 shadow-md group">
                <AnimatePresence mode="wait">
                  {currentIdxG2 < 5 ? (
                    <motion.img
                      key={currentIdxG2}
                      src={g2ImagePaths[currentIdxG2]}
                      alt={`VRNT-VJ-EXAMS-SEP-2025 Photo ${currentIdxG2 + 1}`}
                      initial={{ opacity: 0.3, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = g2ImagePaths[0];
                      }}
                    />
                  ) : (
                    <motion.div
                      key="g2-google-photos-slide"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                    >
                      <img 
                        src={g2SlideBgImage} 
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] blur-[2px] scale-105"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="p-3.5 bg-primary text-primary-foreground rounded-2xl mb-3 shadow-xl border border-white/20">
                          <Images className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h3 className="font-serif font-bold text-xl md:text-3xl text-white drop-shadow-md m-0 mb-2">
                          View Complete Photo Album
                        </h3>
                        <p className="font-serif text-sm md:text-base text-white/85 max-w-md m-0 mb-6 drop-shadow">
                          Access all high-resolution event photographs for VRNT-VJ-EXAMS-SEP-2025 on Google Photos.
                        </p>
                        <a
                          href="https://photos.app.goo.gl/11bg4sbZFyTom2zH9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex min-h-11 items-center gap-2.5 bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold text-sm md:text-base py-3 px-6 rounded-xl shadow-lifted transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Open Google Photos Album</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 flex items-end justify-between text-white pointer-events-none z-10">
                  <div>
                    <p className="font-serif text-xs md:text-sm text-white m-0 font-medium">
                      {currentIdxG2 < 5 ? `Photo ${currentIdxG2 + 1} of 5` : 'Album Link'}
                    </p>
                  </div>
                  <div className="hidden sm:flex gap-1.5 items-center pointer-events-auto py-1">
                    {Array.from({ length: g2TotalSlides }).map((_, dotIdx) => (
                      <div 
                        key={dotIdx}
                        onClick={() => setCurrentIdxG2(dotIdx)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                          dotIdx === currentIdxG2 ? 'w-6 bg-accent' : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentIdxG2((prev) => (prev - 1 + g2TotalSlides) % g2TotalSlides)}
                  aria-label="Previous photo — VRNT-VJ-EXAMS-SEP-2025"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentIdxG2((prev) => (prev + 1) % g2TotalSlides)}
                  aria-label="Next photo — VRNT-VJ-EXAMS-SEP-2025"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* ==================== 3. SEPTEMBER 11–14, 2024 ==================== */}
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-soft space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-primary m-0">
                      VRNT VIJAYADASAMI EXAMS SEP 11-14, 2024 (Sept 11–14, 2024)
                    </h3>
                  </div>
                  <p className="font-serif text-sm text-foreground m-0 flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-accent-strong" />
                    Official Photography — <span className="font-bold text-accent-strong">September 11–14, 2024</span>
                  </p>
                </div>
              </div>

              <div className="relative w-full aspect-16/10 md:aspect-16/9 rounded-2xl overflow-hidden bg-black/90 shadow-md group">
                <AnimatePresence mode="wait">
                  {currentIdxG3 < 5 ? (
                    <motion.img
                      key={currentIdxG3}
                      src={g3ImagePaths[currentIdxG3]}
                      alt={`VRNT VIJAYADASAMI EXAMS SEP 11-14, 2024 Photo ${currentIdxG3 + 1}`}
                      initial={{ opacity: 0.3, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = g3ImagePaths[0];
                      }}
                    />
                  ) : (
                    <motion.div
                      key="g3-google-photos-slide"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                    >
                      <img 
                        src={g3SlideBgImage} 
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] blur-[2px] scale-105"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="p-3.5 bg-primary text-primary-foreground rounded-2xl mb-3 shadow-xl border border-white/20">
                          <Images className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h3 className="font-serif font-bold text-xl md:text-3xl text-white drop-shadow-md m-0 mb-2">
                          View Complete Photo Album
                        </h3>
                        <p className="font-serif text-sm md:text-base text-white/85 max-w-md m-0 mb-6 drop-shadow">
                          Access all high-resolution event photographs for VRNT VIJAYADASAMI EXAMS SEP 11-14, 2024 on Google Photos.
                        </p>
                        <a
                          href="https://photos.app.goo.gl/H1WVEG18PUxkorTA7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex min-h-11 items-center gap-2.5 bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold text-sm md:text-base py-3 px-6 rounded-xl shadow-lifted transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Open Google Photos Album</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 flex items-end justify-between text-white pointer-events-none z-10">
                  <div>
                    <p className="font-serif text-xs md:text-sm text-white m-0 font-medium">
                      {currentIdxG3 < 5 ? `Photo ${currentIdxG3 + 1} of 5` : 'Album Link'}
                    </p>
                  </div>
                  <div className="hidden sm:flex gap-1.5 items-center pointer-events-auto py-1">
                    {Array.from({ length: g3TotalSlides }).map((_, dotIdx) => (
                      <div 
                        key={dotIdx}
                        onClick={() => setCurrentIdxG3(dotIdx)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                          dotIdx === currentIdxG3 ? 'w-6 bg-accent' : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentIdxG3((prev) => (prev - 1 + g3TotalSlides) % g3TotalSlides)}
                  aria-label="Previous photo — VRNT Vijayadasami Exams, September 2024"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentIdxG3((prev) => (prev + 1) % g3TotalSlides)}
                  aria-label="Next photo — VRNT Vijayadasami Exams, September 2024"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* ==================== 4. MARCH 15–17, 2024 ==================== */}
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-soft space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-primary m-0">
                      VRNT POORTHI EXAM 15-17TH MARCH 2024 (March 15–17, 2024)
                    </h3>
                  </div>
                  <p className="font-serif text-sm text-foreground m-0 flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-accent-strong" />
                    Official Photography — <span className="font-bold text-accent-strong">March 15–17, 2024</span>
                  </p>
                </div>
              </div>

              <div className="relative w-full aspect-16/10 md:aspect-16/9 rounded-2xl overflow-hidden bg-black/90 shadow-md group">
                <AnimatePresence mode="wait">
                  {currentIdxG4 < 5 ? (
                    <motion.img
                      key={currentIdxG4}
                      src={g4ImagePaths[currentIdxG4]}
                      alt={`VRNT POORTHI EXAM 15-17TH MARCH 2024 Photo ${currentIdxG4 + 1}`}
                      initial={{ opacity: 0.3, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = g4ImagePaths[0];
                      }}
                    />
                  ) : (
                    <motion.div
                      key="g4-google-photos-slide"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                    >
                      <img 
                        src={g4SlideBgImage} 
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] blur-[2px] scale-105"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="p-3.5 bg-primary text-primary-foreground rounded-2xl mb-3 shadow-xl border border-white/20">
                          <Images className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h3 className="font-serif font-bold text-xl md:text-3xl text-white drop-shadow-md m-0 mb-2">
                          View Complete Photo Album
                        </h3>
                        <p className="font-serif text-sm md:text-base text-white/85 max-w-md m-0 mb-6 drop-shadow">
                          Access all high-resolution event photographs for VRNT POORTHI EXAM 15-17TH MARCH 2024 on Google Photos.
                        </p>
                        <a
                          href="https://photos.app.goo.gl/F1mBKjiHR8aBsRRHA"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex min-h-11 items-center gap-2.5 bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold text-sm md:text-base py-3 px-6 rounded-xl shadow-lifted transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Open Google Photos Album</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 flex items-end justify-between text-white pointer-events-none z-10">
                  <div>
                    <p className="font-serif text-xs md:text-sm text-white m-0 font-medium">
                      {currentIdxG4 < 5 ? `Photo ${currentIdxG4 + 1} of 5` : 'Album Link'}
                    </p>
                  </div>
                  <div className="hidden sm:flex gap-1.5 items-center pointer-events-auto py-1">
                    {Array.from({ length: g4TotalSlides }).map((_, dotIdx) => (
                      <div 
                        key={dotIdx}
                        onClick={() => setCurrentIdxG4(dotIdx)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                          dotIdx === currentIdxG4 ? 'w-6 bg-accent' : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentIdxG4((prev) => (prev - 1 + g4TotalSlides) % g4TotalSlides)}
                  aria-label="Previous photo — VRNT Poorthi Exam, March 2024"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentIdxG4((prev) => (prev + 1) % g4TotalSlides)}
                  aria-label="Next photo — VRNT Poorthi Exam, March 2024"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* ==================== 5. SEPTEMBER 22–24, 2023 ==================== */}
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-soft space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-primary m-0">
                      VRNT POORTHI EXAMS 22-24 SEP 2023 (Sept 22–24, 2023)
                    </h3>
                  </div>
                  <p className="font-serif text-sm text-foreground m-0 flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-accent-strong" />
                    Official Photography — <span className="font-bold text-accent-strong">September 22–24, 2023</span>
                  </p>
                </div>
              </div>

              <div className="relative w-full aspect-16/10 md:aspect-16/9 rounded-2xl overflow-hidden bg-black/90 shadow-md group">
                <AnimatePresence mode="wait">
                  {currentIdxG5 < 5 ? (
                    <motion.img
                      key={currentIdxG5}
                      src={g5ImagePaths[currentIdxG5]}
                      alt={`VRNT POORTHI EXAMS 22-24 SEP 2023 Photo ${currentIdxG5 + 1}`}
                      initial={{ opacity: 0.3, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = g5ImagePaths[0];
                      }}
                    />
                  ) : (
                    <motion.div
                      key="g5-google-photos-slide"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                    >
                      <img 
                        src={g5SlideBgImage} 
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] blur-[2px] scale-105"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="p-3.5 bg-primary text-primary-foreground rounded-2xl mb-3 shadow-xl border border-white/20">
                          <Images className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h3 className="font-serif font-bold text-xl md:text-3xl text-white drop-shadow-md m-0 mb-2">
                          View Complete Photo Album
                        </h3>
                        <p className="font-serif text-sm md:text-base text-white/85 max-w-md m-0 mb-6 drop-shadow">
                          Access all high-resolution event photographs for VRNT POORTHI EXAMS 22-24 SEP 2023 on Google Photos.
                        </p>
                        <a
                          href="https://photos.app.goo.gl/frSGh8xZv4XdrjDo9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex min-h-11 items-center gap-2.5 bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold text-sm md:text-base py-3 px-6 rounded-xl shadow-lifted transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Open Google Photos Album</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 flex items-end justify-between text-white pointer-events-none z-10">
                  <div>
                    <p className="font-serif text-xs md:text-sm text-white m-0 font-medium">
                      {currentIdxG5 < 5 ? `Photo ${currentIdxG5 + 1} of 5` : 'Album Link'}
                    </p>
                  </div>
                  <div className="hidden sm:flex gap-1.5 items-center pointer-events-auto py-1">
                    {Array.from({ length: g5TotalSlides }).map((_, dotIdx) => (
                      <div 
                        key={dotIdx}
                        onClick={() => setCurrentIdxG5(dotIdx)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                          dotIdx === currentIdxG5 ? 'w-6 bg-accent' : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentIdxG5((prev) => (prev - 1 + g5TotalSlides) % g5TotalSlides)}
                  aria-label="Previous photo — VRNT Poorthi Exams, September 2023"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentIdxG5((prev) => (prev + 1) % g5TotalSlides)}
                  aria-label="Next photo — VRNT Poorthi Exams, September 2023"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* ==================== 6. AUGUST 13–16, 2022 ==================== */}
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8 shadow-soft space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-serif font-bold text-xl md:text-2xl text-primary m-0">
                      VRNT Poorthy Exams (Aug 13–16, 2022)
                    </h3>
                  </div>
                  <p className="font-serif text-sm text-foreground m-0 flex items-center gap-2 mt-1">
                    <Sparkles className="w-4 h-4 text-accent-strong" />
                    Official Photography — <span className="font-bold text-accent-strong">August 13–16, 2022</span>
                  </p>
                </div>
              </div>

              <div className="relative w-full aspect-16/10 md:aspect-16/9 rounded-2xl overflow-hidden bg-black/90 shadow-md group">
                <AnimatePresence mode="wait">
                  {currentIdxG6 < 5 ? (
                    <motion.img
                      key={currentIdxG6}
                      src={g6ImagePaths[currentIdxG6]}
                      alt={`Poorthy Exam Photo ${currentIdxG6 + 1}`}
                      initial={{ opacity: 0.3, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.3, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = g6ImagePaths[0];
                      }}
                    />
                  ) : (
                    <motion.div
                      key="g6-google-photos-slide"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                    >
                      <img 
                        src={g6SlideBgImage} 
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] blur-[2px] scale-105"
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="p-3.5 bg-primary text-primary-foreground rounded-2xl mb-3 shadow-xl border border-white/20">
                          <Images className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h3 className="font-serif font-bold text-xl md:text-3xl text-white drop-shadow-md m-0 mb-2">
                          View Complete Photo Album
                        </h3>
                        <p className="font-serif text-sm md:text-base text-white/85 max-w-md m-0 mb-6 drop-shadow">
                          Access all high-resolution event photographs and recordings on Google Photos.
                        </p>
                        <a
                          href="https://photos.app.goo.gl/6TZHbiBZ7B8fiPFM7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline inline-flex min-h-11 items-center gap-2.5 bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold text-sm md:text-base py-3 px-6 rounded-xl shadow-lifted transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Open Google Photos Album</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 flex items-end justify-between text-white pointer-events-none z-10">
                  <div>
                    <p className="font-serif text-xs md:text-sm text-white m-0 font-medium">
                      {currentIdxG6 < 5 ? `Photo ${currentIdxG6 + 1} of 5` : 'Album Link'}
                    </p>
                  </div>
                  <div className="hidden sm:flex gap-1.5 items-center pointer-events-auto py-1">
                    {Array.from({ length: g6TotalSlides }).map((_, dotIdx) => (
                      <div 
                        key={dotIdx}
                        onClick={() => setCurrentIdxG6(dotIdx)}
                        className={`h-2 rounded-full cursor-pointer transition-all ${
                          dotIdx === currentIdxG6 ? 'w-6 bg-accent' : 'w-2 bg-white/50 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentIdxG6((prev) => (prev - 1 + g6TotalSlides) % g6TotalSlides)}
                  aria-label="Previous photo — VRNT Poorthy Exams, August 2022"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentIdxG6((prev) => (prev + 1) % g6TotalSlides)}
                  aria-label="Next photo — VRNT Poorthy Exams, August 2022"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer border border-white/20 z-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

          </div>

      </main>
    </div>
  );
}

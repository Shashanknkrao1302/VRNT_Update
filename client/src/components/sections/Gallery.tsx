import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "@/lib/seo";

const GALLERY_IMAGES = [
  // --- SPIRITUAL LINEAGE ACHARYAS ---
  {
    url: "/assets/1768738817683.webp",
    title: "Adi Shankaracharya",
    category: "Peetham Founder",
    description: "Kanchi Kamakoti Peetham established by Adi Shankaracharya (509 BCE to 477 BCE) 2500 years ago.",
    albumUrl: null
  },
  {
    url: "/assets/kanchi-maha-periyava_8fb06457-0992-4c44-8818-62d49dd13efc_800_1768741594540.webp",
    title: "68th JAGADGURU SHANKARACHARYA",
    category: "Kanchi Paramacharya",
    description: "Sri Chandrashekharendra Saraswati Mahaswami Ji",
    albumUrl: null
  },
  {
    url: "/assets/jayendra_saraswathi.jpg",
    title: "69th Jagadguru Shankaracharya",
    category: "Acharya",
    description: "Sri Jayendra Saraswati Mahaswami Ji",
    albumUrl: null
  },
  {
    url: "/assets/70_1768742815509.webp",
    title: "70th Jagadguru Shankaracharya",
    category: "Acharya",
    description: "Sri Shankara Vijayendra Saraswati Mahaswami Ji",
    albumUrl: null
  },
  {
    url: "/assets/71_1768738842433.webp",
    title: "71st Jagadguru Shankaracharya",
    category: "Acharya",
    description: "Sri Satya Chandrasekharendra Saraswathi Mahaswami Ji",
    albumUrl: null
  },
  {
    url: "/assets/Shrimatam_Gopuram_1768739079397.webp",
    title: "Kanchi Kamakoti Peetham",
    category: "Shrimatam",
    description: "The sacred seat established by Adi Shankara 2500 years ago.",
    albumUrl: null
  },

  // --- POORTHY EXAMINATION GALLERIES ---
  {
    url: "/poorthy/first gallery/IMG_20260305_111546869_HDR.webp",
    title: "VRNT-POORTHY-SJ26",
    category: "March 5, 2026",
    description: "Official examination proceedings and sabha sessions for VRNT-POORTHY-SJ26.",
    albumUrl: "https://photos.app.goo.gl/44zvTt67hd1FnXQw5"
  },
  {
    url: "/poorthy/second gallery/20250831_093953.webp",
    title: "VRNT-VJ-EXAMS-SEP-2025",
    category: "August 31, 2025",
    description: "Vijayadasami Poorthy oral examinations and Vidyaarthi assessments.",
    albumUrl: "https://photos.app.goo.gl/11bg4sbZFyTom2zH9"
  },
  {
    url: "/poorthy/third gallery/20240911_085056.webp",
    title: "VRNT VIJAYADASAMI EXAMS SEP 11-14, 2024",
    category: "September 11–14, 2024",
    description: "Annual Vijayadasami examinations across multiple Veda Shaakhas.",
    albumUrl: "https://photos.app.goo.gl/H1WVEG18PUxkorTA7"
  },
  {
    url: "/poorthy/fourth gallery/IMG-20240316-WA0033.webp",
    title: "VRNT POORTHI EXAM 15-17TH MARCH 2024",
    category: "March 15–17, 2024",
    description: "Spring Poorthy examination sessions supervised by senior Veda Panditas.",
    albumUrl: "https://photos.app.goo.gl/F1mBKjiHR8aBsRRHA"
  },
  {
    url: "/poorthy/fifth gallery/IMG-20230924-WA0066.webp",
    title: "VRNT POORTHI EXAMS 22-24 SEP 2023",
    category: "September 22–24, 2023",
    description: "Rigorous oral recitations and completion assessments.",
    albumUrl: "https://photos.app.goo.gl/frSGh8xZv4XdrjDo9"
  },
  {
    url: "/poorthy/sixth gallery/IMG20220814094026.webp",
    title: "VRNT Poorthy Exams (Aug 13–16, 2022)",
    category: "August 13–16, 2022",
    description: "Veda Rakshana Nidhi Trust graduation examinations and Parithoshikam.",
    albumUrl: "https://photos.app.goo.gl/6TZHbiBZ7B8fiPFM7"
  },

  // --- RECENT EVENT ---
  {
    url: "/assets/vrnt_1768670925029.webp",
    title: "Veda Rakshana Nidhi Trust Sabha",
    category: "Vedic Event",
    description: "Sacred gatherings and Vidwat Sabha proceedings organized under VRNT.",
    albumUrl: null
  },
  {
    url: "/assets/sandur-1979-maha-periyava.webp",
    title: "Historical Blessing at Sandur (1979)",
    category: "Archival History (1979)",
    description: "His Holiness Sri Chandrasekharendra Saraswathi Mahaswamigal (Maha Periyava) at Eashwaraswamy Temple, Sandur (1979). Standing alongside Sri Annathurai Iyengar is Late Sri Musiri Krishna Rao, a revered Madhwa scholar who assisted in conducting VRNT Veda examinations. (Photo by Sandur Maharaja)",
    albumUrl: null
  }
];

/** Builds specific, descriptive alt text for the current slide's image. */
function getSlideAlt(image: (typeof GALLERY_IMAGES)[number]) {
  if (image.albumUrl) {
    return `Photograph from the Poorthy examination album: ${image.title} (${image.category})`;
  }
  return `${image.title} — ${image.description}`;
}

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  const paginateRef = useRef(paginate);
  paginateRef.current = paginate;

  // Auto-advance every 6s, unless the viewer prefers reduced motion or is
  // currently hovering/focusing the carousel (paused via isPaused).
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isPaused) {
      return;
    }
    const timer = setInterval(() => {
      paginateRef.current(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const currentImage = GALLERY_IMAGES[currentIndex];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Helmet
        title="Photo Gallery"
        description="A photo gallery of the Kanchi Kamakoti Peetham's acharya lineage and Veda Rakshana Nidhi Trust's Poorthy examination archives."
      />
      <main className="pt-5 pb-24 min-h-[calc(100vh-80px)] overflow-hidden">
        <div className="mx-auto max-w-wide px-4 sm:px-6">

          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-secondary mb-4 underline decoration-primary decoration-4 underline-offset-8 inline-block">
              Our Spiritual Lineage & Photo Gallery
            </h1>
            <p className="text-lg text-muted-foreground font-serif mt-8 max-w-2xl mx-auto italic">
              Honoring the unbroken chain of Acharyas and preserving traditional Vedic wisdom.
            </p>
          </div>

          <div
            className="relative w-full h-[500px] md:h-[600px] group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Spiritual lineage and photo gallery"
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lifted border border-border bg-surface">
                  <img
                    src={currentImage.url}
                    alt={getSlideAlt(currentImage)}
                    loading="lazy"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== GALLERY_IMAGES[0].url) {
                        target.src = GALLERY_IMAGES[0].url;
                      }
                    }}
                  />

                  {/* BOTTOM OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="pointer-events-auto flex flex-col md:flex-row md:items-end justify-between gap-4"
                    >
                      {/* Left Side Heading & Info */}
                      <div className="max-w-xl">
                        <span className="text-accent text-xs md:text-sm font-bold uppercase tracking-widest mb-1 block">
                          {currentImage.category}
                        </span>
                        <h2 className="text-white font-serif text-2xl md:text-3xl font-bold mb-1.5 drop-shadow-md">
                          {currentImage.title}
                        </h2>
                        <p className="text-white/90 text-sm md:text-base font-serif italic drop-shadow-xs m-0 line-clamp-2">
                          {currentImage.description}
                        </p>
                      </div>

                      {/* Right Side Google Photos Link Button */}
                      {currentImage.albumUrl && (
                        <div className="shrink-0">
                          <a
                            href={currentImage.albumUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline min-h-11 inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold text-xs md:text-sm py-2.5 px-4 rounded-xl shadow-lifted transition-all hover:scale-105 active:scale-95"
                          >
                            <span>For More Images</span>
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            <span className="sr-only"> (opens the {currentImage.title} album on Google Photos in a new tab)</span>
                          </a>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-4 flex items-center z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground h-12 w-12 border-none shadow-lifted cursor-pointer"
                onClick={() => paginate(-1)}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-8 w-8" aria-hidden="true" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground h-12 w-12 border-none shadow-lifted cursor-pointer"
                onClick={() => paginate(1)}
                aria-label="Next slide"
              >
                <ChevronRight className="h-8 w-8" aria-hidden="true" />
              </Button>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 max-w-[90%] overflow-x-auto py-1">
              {GALLERY_IMAGES.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}: ${image.title}`}
                  aria-current={index === currentIndex}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-secondary/40 hover:bg-secondary/70 w-2.5"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

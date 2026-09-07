import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HomeSectionProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  cta?: { label: string; to: string };
  image?: { src: string; alt: string };
  imageSide?: "left" | "right";
  tone?: "default" | "muted";
  id?: string;
}

/**
 * A reusable homepage section shell: eyebrow + heading + body copy, an optional
 * side image, and an optional "read more" link into the full page. Used to keep
 * the homepage's individual sections short teasers rather than duplicating the
 * full standalone page content.
 */
export default function HomeSection({
  eyebrow,
  title,
  children,
  cta,
  image,
  imageSide = "right",
  tone = "default",
  id,
}: HomeSectionProps) {
  return (
    <section
      id={id}
      className={cn("py-12 sm:py-16", tone === "muted" && "bg-muted/60")}
    >
      <div className="mx-auto max-w-wide px-4 sm:px-6">
        <div
          className={cn(
            "grid items-center gap-8 md:gap-12",
            image ? "md:grid-cols-2" : "mx-auto max-w-3xl"
          )}
        >
          <div className={cn(image && imageSide === "left" && "md:order-2")}>
            {eyebrow && (
              <p className="mb-2 font-sans text-xs font-bold uppercase tracking-wider text-accent-strong">
                {eyebrow}
              </p>
            )}
            <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/90">
              {children}
            </div>
            {cta && (
              <Link
                to={cta.to}
                className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-bold text-primary hover:underline"
              >
                {cta.label} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {image && (
            <div className={cn(imageSide === "left" && "md:order-1")}>
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                width={640}
                height={480}
                className="aspect-[4/3] w-full rounded-lg border border-border bg-muted object-contain shadow-soft"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { MapPin, Phone, Mail, User } from "lucide-react";
import { Helmet } from "@/lib/seo";

const trustOfficeCoordinates = "13.0420117,80.2185979";
const mapEmbedUrl = `https://www.google.com/maps?q=${trustOfficeCoordinates}&z=18&output=embed`;
const mapPlaceUrl = "https://www.google.com/maps/place/Veda+Rakshana+Nidhi+Trust/@13.042012,80.218598,17z/data=!4m6!3m5!1s0x3a5266e4f3e570e7:0x6a30ff60f367c168!8m2!3d13.0420117!4d80.2185979!16s%2Fg%2F1q5bp0tn_";

export default function ContactPage() {
  return (
    <>
      <Helmet
        title="Contact Us"
        description="Office address, phone numbers, email, and map location for Veda Rakshana Nidhi Trust in West Mambalam, Chennai."
      />
      <div className="mx-auto flex max-w-wide flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">

        {/* Page Title Header Frame */}
        <section className="border-t border-border pt-6">
          <h1 className="inline-block font-serif text-3xl font-bold text-primary underline decoration-accent decoration-4 underline-offset-8 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-6 font-serif text-base italic text-muted-foreground sm:text-lg">
            Please feel free to get in touch, we value your feedback.
          </p>
        </section>

        {/* Main Content Layout Grid */}
        <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-2">

          {/* Left Side: Office Details Card */}
          <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 shadow-soft">
            <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
              <MapPin className="h-5 w-5 text-accent-strong" aria-hidden="true" />
              <h2 className="m-0 font-serif text-2xl font-bold text-primary">Office Address</h2>
            </div>

            <div className="flex flex-col gap-4 font-serif">
              <div>
                <h3 className="m-0 text-lg font-bold tracking-wide text-foreground">
                  Veda Rakshana Nidhi Trust (Regd.)
                </h3>
                <p className="mb-0 mt-2 text-base leading-relaxed text-foreground/90">
                  No.64/31, Subramaniam Street,<br />
                  West Mambalam,<br />
                  Chennai - 600 033.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 text-sm text-foreground/90">
                <a href="tel:04424740549" className="flex min-h-9 items-center gap-3 hover:underline">
                  <Phone className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
                  <span>Landline: 044-24740549</span>
                </a>
                <a href="tel:9360731283" className="flex min-h-9 items-center gap-3 hover:underline">
                  <Phone className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
                  <span>Mobile: 93607 31283</span>
                </a>
                <a href="mailto:office@vrnt.org" className="flex min-h-9 items-center gap-3 text-primary hover:underline">
                  <Mail className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
                  <span>Email: office@vrnt.org</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Trust Office Location Google Maps Embed */}
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="m-0 font-serif text-xl font-bold text-foreground">Trust Office Location</h2>
              <a
                href={mapPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-9 items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-accent-strong no-underline hover:underline"
              >
                Open in Maps ↗
              </a>
            </div>

            <div className="relative flex h-[350px] w-full flex-col items-center justify-between overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-soft">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps location of Veda Rakshana Nidhi Trust, West Mambalam, Chennai"
                className="h-full w-full rounded-lg"
              ></iframe>

              <div className="mt-2 rounded-full border border-border bg-surface px-3 py-0.5 font-serif text-[11px] italic text-muted-foreground shadow-soft">
                Located in the heart of West Mambalam, Chennai.
              </div>
            </div>
          </div>

        </div>

        {/* Underneath Layout: Officer Cards Grid */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">

          {/* Card 1: Trustee & Treasurer */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 shadow-soft">
            <div className="flex items-center gap-2 border-b border-border pb-2">
              <User className="h-4 w-4 text-accent-strong" aria-hidden="true" />
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-accent-strong">
                Trustee & Treasurer
              </span>
            </div>
            <div className="font-serif">
              <h3 className="m-0 text-base font-bold uppercase tracking-wide text-foreground">
                G Veeraraghavan
              </h3>
              <p className="mb-3 mt-2 text-xs leading-relaxed text-muted-foreground">
                Flat A NO 85 Anugraka<br />
                Apartments, P T Rajan Salai, K K<br />
                Nagar, Chennai - 600078.
              </p>
              <a href="tel:9444454732" className="inline-flex min-h-9 items-center font-sans text-xs font-bold text-foreground hover:underline">
                Mobile: 9444454732
              </a>
            </div>
          </div>

          {/* Card 2: Executive Trustee */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5 shadow-soft">
            <div className="flex items-center gap-2 border-b border-border pb-2">
              <User className="h-4 w-4 text-accent-strong" aria-hidden="true" />
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-accent-strong">
                Executive Trustee
              </span>
            </div>
            <div className="font-serif">
              <h3 className="m-0 text-base font-bold uppercase tracking-wide text-foreground">
                S Swaminathan
              </h3>
              <p className="mb-3 mt-2 text-xs leading-relaxed text-muted-foreground">
                1 A, ARJUN ENCLAVE, NEW NO<br />
                29, 6 TH CROSS STREET,<br />
                TRUSTPURAM,<br />
                KODAMBAKKAM, Chennai - 600024.
              </p>
              <a href="tel:9840189849" className="inline-flex min-h-9 items-center font-sans text-xs font-bold text-foreground hover:underline">
                Mobile: 9840189849
              </a>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

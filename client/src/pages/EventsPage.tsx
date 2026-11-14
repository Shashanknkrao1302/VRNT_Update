import { Calendar, MapPin, Youtube, Images, ExternalLink } from "lucide-react";
import { Helmet } from "@/lib/seo";
import { TRUST_EVENTS } from "@/lib/events";

export default function EventsPage() {
  return (
    <div className="mx-auto flex w-full max-w-wide flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <Helmet
        title="Events"
        description="Ceremonies, certificate distributions, convocations, and special functions organized by Veda Rakshana Nidhi Trust."
      />

      {/* Header Banner */}
      <section className="mx-auto max-w-3xl text-center">
        <div className="mb-3 inline-block rounded-full bg-accent/20 px-4 py-1 font-sans text-xs font-bold uppercase tracking-wider text-accent-strong">
          Trust Gatherings &amp; Ceremonies
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-wide text-primary sm:text-4xl lg:text-5xl">
          Events &amp; Functions
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-serif text-base text-muted-foreground sm:text-lg">
          Archival recordings, certificate presentations, and photographic memories from major convocations and ceremonies of Veda Rakshana Nidhi Trust.
        </p>
      </section>

      {/* Events Listing */}
      <div className="flex flex-col gap-12">
        {TRUST_EVENTS.map((evt) => (
          <article
            key={evt.id}
            className="overflow-hidden rounded-2xl border-2 border-border bg-surface shadow-lifted transition-all"
          >
            {/* Top Event Meta Header */}
            <div className="border-b border-border bg-background/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 font-sans text-xs font-bold uppercase tracking-wider text-accent-strong">
                <span className="rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1">
                  {evt.category}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {evt.date}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {evt.location}
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                {evt.title}
              </h2>

              <p className="mt-3 max-w-4xl text-justify font-serif text-base leading-relaxed text-foreground/90 sm:text-lg">
                {evt.description}
              </p>
            </div>

            {/* Media Grid: Video + Photo Albums */}
            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-12 sm:p-8">
              {/* YouTube Video Section */}
              {evt.youtubeEmbedId && (
                <div className="flex flex-col gap-3 lg:col-span-7">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
                      <Youtube className="h-5 w-5 text-red-600" aria-hidden="true" />
                      Live Stream &amp; Video Recording
                    </h3>
                    {evt.youtubeLiveUrl && (
                      <a
                        href={evt.youtubeLiveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-sans text-xs font-bold text-primary hover:underline"
                      >
                        Watch on YouTube <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-border bg-black shadow-soft">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${evt.youtubeEmbedId}`}
                      title={evt.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                </div>
              )}

              {/* Photo Albums / Drive Links */}
              <div className="flex flex-col gap-4 lg:col-span-5">
                <div className="flex items-center gap-2">
                  <Images className="h-5 w-5 text-accent-strong" aria-hidden="true" />
                  <h3 className="font-serif text-lg font-bold text-primary">
                    Event Photo Galleries
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  Browse and download high-resolution photos of the ceremony and Vidyarthi felicitation:
                </p>

                <div className="flex flex-col gap-3.5">
                  {evt.photoAlbums?.map((album, idx) => (
                    <a
                      key={idx}
                      href={album.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between rounded-xl border-2 border-border bg-background p-4 shadow-soft transition-all hover:border-primary hover:shadow-lifted"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-bold text-secondary group-hover:text-primary">
                          {album.label}
                        </span>
                        <span className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-accent-strong">
                          Open Folder <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </div>
                      {album.description && (
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                          {album.description}
                        </p>
                      )}
                    </a>
                  ))}
                </div>

                <div className="rounded-lg border border-accent/40 bg-accent/5 p-3.5 text-xs text-foreground/80">
                  <strong className="text-primary">Note for attendees:</strong> Google Drive folders contain high-definition photographs. You can view them online or select specific photos to download for your keepsake.
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
import type { ReactNode } from 'react'

type ProjectMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'placeholder'; label: string; description: string }
  | { type: 'custom'; node: ReactNode }

interface ProjectSectionProps {
  /** Mono uppercase eyebrow, e.g. "Project 01 · Cyber Attack Map". */
  eyebrow: string
  heading: string
  /** Body content for the text column. Pass a fragment of paragraphs and/or inline elements. */
  body: ReactNode
  media: ProjectMedia
  /** Optional outcome footer with metric + descriptive text. */
  outcome?: {
    metric?: string
    text: ReactNode
  }
}

function MediaPanel({ media }: { media: ProjectMedia }) {
  if (media.type === 'image') {
    return (
      <div className="order-1 md:order-2 relative w-full md:w-[440px] aspect-[440/320] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt={media.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    )
  }
  if (media.type === 'placeholder') {
    return (
      <div className="order-1 md:order-2 relative w-full md:w-[440px] aspect-[440/320] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card border border-dashed border-divider-grey/40 flex items-center justify-center text-center px-[24px]">
        <div>
          <p className="text-[12px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[10px]">
            {media.label}
          </p>
          <p className="text-[14px] font-serif text-[#4F4F4F]">{media.description}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="order-1 md:order-2 relative w-full md:w-[440px] shrink-0">
      {media.node}
    </div>
  )
}

export function ProjectSection({ eyebrow, heading, body, media, outcome }: ProjectSectionProps) {
  return (
    <section className="mb-[80px] pt-[60px] border-t border-divider-grey/30">
      <p className="text-[11px] uppercase tracking-[0.18em] font-serif font-medium text-accent-yellow mb-[8px]">
        {eyebrow}
      </p>
      <h2 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.25] mb-[28px] max-w-[760px]">
        {heading}
      </h2>

      <div className="flex flex-col md:flex-row gap-[38px] items-start mb-[32px]">
        <div className="order-2 md:order-1 flex-1">
          <div className="text-[14px] leading-[1.7] font-serif flex flex-col gap-[14px]">
            {body}
          </div>
        </div>
        <MediaPanel media={media} />
      </div>

      {outcome && (
        <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-[12px] md:gap-[24px] pt-[18px] border-t border-divider-grey/30 items-start">
          <p className="text-[10px] uppercase tracking-[0.12em] font-serif font-medium text-accent-yellow pt-[4px]">
            Outcome
          </p>
          <p className="text-[14px] leading-[1.7] font-serif">
            {outcome.metric && (
              <span className="font-serif font-medium text-[24px] text-accent-yellow mr-[12px] align-middle">
                {outcome.metric}
              </span>
            )}
            {outcome.text}
          </p>
        </div>
      )}
    </section>
  )
}

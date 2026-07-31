import type { ReactNode } from 'react'

type ProjectMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'placeholder'; label: string; description: string }
  | { type: 'custom'; node: ReactNode }

interface ProjectSectionProps {
  /** Handwritten eyebrow, e.g. "Project 01 · Cyber Attack Map". */
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
      <div className="cs-figure cs-tilt-l order-1 md:order-2 w-full md:w-[440px] shrink-0" data-cs-figure>
        <span className="cs-tape" aria-hidden />
        <div className="cs-figure-media aspect-[440/320]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.src} alt={media.alt} className="cs-figure-img" />
        </div>
      </div>
    )
  }
  if (media.type === 'placeholder') {
    return (
      <div className="cs-figure cs-tilt-l order-1 md:order-2 w-full md:w-[440px] shrink-0" data-cs-figure>
        <span className="cs-tape" aria-hidden />
        <div className="cs-figure-empty aspect-[440/320]">
          <div>
            <p className="cs-figure-empty-label">{media.label}</p>
            <p className="cs-figure-empty-desc">{media.description}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="order-1 md:order-2 relative w-full md:w-[440px] shrink-0" data-cs-figure>
      {media.node}
    </div>
  )
}

export function ProjectSection({ eyebrow, heading, body, media, outcome }: ProjectSectionProps) {
  return (
    <section className="cs-project">
      <p className="cs-eyebrow">{eyebrow}</p>
      <h2 className="cs-h2">{heading}</h2>

      <div className="flex flex-col md:flex-row gap-[38px] items-start mb-[32px]">
        <div className="order-2 md:order-1 flex-1">
          <div className="cs-body">{body}</div>
        </div>
        <MediaPanel media={media} />
      </div>

      {outcome && (
        <div className="cs-outcome grid grid-cols-1 md:grid-cols-[110px_1fr] gap-[12px] md:gap-[24px] items-start">
          <p className="cs-outcome-label">Outcome</p>
          <p className="cs-outcome-text">
            {outcome.metric && <span className="cs-outcome-metric">{outcome.metric}</span>}
            {outcome.text}
          </p>
        </div>
      )}
    </section>
  )
}

import type { ReactNode } from 'react'

type DecisionMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'placeholder'; label: string; description: string }
  | { type: 'custom'; node: ReactNode }

interface DecisionRowProps {
  eyebrow: string
  heading: string
  paragraphs: string[]
  media: DecisionMedia
}

function MediaPanel({ media }: { media: DecisionMedia }) {
  if (media.type === 'image') {
    return (
      <div className="cs-figure cs-tilt-r order-1 md:order-2 w-full md:w-[560px] shrink-0" data-cs-figure>
        <span className="cs-tape" aria-hidden />
        <div className="cs-figure-media aspect-[592/357]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.src} alt={media.alt} className="cs-figure-img" />
        </div>
      </div>
    )
  }
  if (media.type === 'placeholder') {
    return (
      <div className="cs-figure cs-tilt-r order-1 md:order-2 w-full md:w-[560px] shrink-0" data-cs-figure>
        <span className="cs-tape" aria-hidden />
        <div className="cs-figure-empty aspect-[592/357]">
          <div>
            <p className="cs-figure-empty-label">{media.label}</p>
            <p className="cs-figure-empty-desc">{media.description}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="order-1 md:order-2 relative w-full md:w-[560px] shrink-0" data-cs-figure>
      {media.node}
    </div>
  )
}

export function DecisionRow({ eyebrow, heading, paragraphs, media }: DecisionRowProps) {
  return (
    <section className="cs-decision">
      {/* Mobile heading: appears above the image */}
      <div className="md:hidden mb-4">
        <p className="cs-eyebrow">{eyebrow}</p>
        <h3 className="cs-h3">{heading}</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-[38px] items-start">
        <div className="order-2 md:order-1 flex-1 md:py-[30px]">
          {/* Desktop heading: appears alongside the image */}
          <div className="hidden md:block mb-4">
            <p className="cs-eyebrow">{eyebrow}</p>
            <h3 className="cs-h3">{heading}</h3>
          </div>
          <div className="cs-body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <MediaPanel media={media} />
      </div>
    </section>
  )
}

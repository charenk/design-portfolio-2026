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
      <div className="order-1 md:order-2 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
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
      <div className="order-1 md:order-2 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card border border-dashed border-divider-grey/40 flex items-center justify-center text-center px-[24px]">
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
    <div className="order-1 md:order-2 relative w-full md:w-[592px] shrink-0">
      {media.node}
    </div>
  )
}

export function DecisionRow({ eyebrow, heading, paragraphs, media }: DecisionRowProps) {
  return (
    <section className="mb-[50px]">
      {/* Mobile heading: appears above the image */}
      <div className="md:hidden mb-4">
        <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
          {eyebrow}
        </p>
        <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">{heading}</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-[38px] items-start">
        <div className="order-2 md:order-1 flex-1 md:py-[37px]">
          {/* Desktop heading: appears alongside the image */}
          <div className="hidden md:block mb-2">
            <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
              {eyebrow}
            </p>
            <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">{heading}</h3>
          </div>
          <div className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[18px]">
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

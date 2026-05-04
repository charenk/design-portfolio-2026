interface StakesSectionProps {
  eyebrow?: string
  heading: string
  paragraphs: string[]
}

export function StakesSection({ eyebrow = 'Why this matters', heading, paragraphs }: StakesSectionProps) {
  return (
    <section className="mb-[80px]">
      <p className="text-[12px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[16px]">
        {eyebrow}
      </p>
      <h2 className="font-serif font-normal text-[28px] md:text-[40px] leading-[1.2] mb-[28px] max-w-[860px]">
        {heading}
      </h2>
      <div className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[18px] max-w-[760px]">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}

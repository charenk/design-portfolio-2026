interface InfluencePillar {
  num: string
  title: string
  description: string
}

interface InfluenceSectionProps {
  /** Mono uppercase eyebrow, e.g. "Influence beyond projects". */
  eyebrow: string
  heading: string
  intro: string
  /** Expects 4 pillars for a 2x2 grid. Other counts will still render but the grid is hardcoded to md:grid-cols-2. */
  pillars: InfluencePillar[]
  /** Optional italic coda below the pillars. */
  coda?: string
}

export function InfluenceSection({ eyebrow, heading, intro, pillars, coda }: InfluenceSectionProps) {
  return (
    <section className="mb-[60px]">
      <div className="bg-[#2A2620] rounded-figure-card p-[36px] md:p-[48px]">
        <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-[#B5C5A0] mb-[14px]">
          {eyebrow}
        </p>
        <h2 className="font-serif font-normal text-[24px] md:text-[28px] leading-[1.25] text-white mb-[14px] max-w-[600px]">
          {heading}
        </h2>
        <p className="text-[14px] leading-[1.65] font-serif text-stone-300 mb-[32px] max-w-[640px]">
          {intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
          {pillars.map((p) => (
            <div key={p.num} className="border-t border-white/10 pt-[16px]">
              <p className="text-[10px] tracking-[0.06em] font-serif font-medium text-[#B5C5A0] mb-[8px]">
                {p.num}
              </p>
              <h4 className="text-[14px] font-serif font-semibold text-white mb-[8px]">
                {p.title}
              </h4>
              <p className="text-[13px] leading-[1.6] font-serif text-stone-400">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {coda && (
          <p className="text-[14px] leading-[1.7] font-serif italic text-stone-300 mt-[32px] pt-[24px] border-t border-white/10 max-w-[640px]">
            {coda}
          </p>
        )}
      </div>
    </section>
  )
}

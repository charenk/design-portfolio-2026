interface StakesSectionProps {
  eyebrow?: string
  heading: string
  paragraphs: string[]
}

export function StakesSection({ eyebrow = 'Why this matters', heading, paragraphs }: StakesSectionProps) {
  return (
    <section className="cs-stakes">
      <p className="cs-eyebrow">{eyebrow}</p>
      <h2 className="cs-h2">{heading}</h2>
      <div className="cs-body">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  )
}

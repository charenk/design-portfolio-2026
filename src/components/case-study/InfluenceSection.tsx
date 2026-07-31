interface InfluencePillar {
  num: string
  title: string
  description: string
}

interface InfluenceSectionProps {
  /** Handwritten eyebrow, e.g. "Influence beyond projects". */
  eyebrow: string
  heading: string
  intro: string
  /** Expects 4 pillars for a 2x2 grid. Other counts will still render but the grid is hardcoded to 2 columns from md up. */
  pillars: InfluencePillar[]
  /** Optional italic coda below the pillars. */
  coda?: string
}

/* The one deliberately dark moment in a case study: an ink board taped onto the paper. */
export function InfluenceSection({ eyebrow, heading, intro, pillars, coda }: InfluenceSectionProps) {
  return (
    <section className="cs-influence">
      <div className="cs-influence-card">
        <span className="cs-tape" aria-hidden />
        <p className="cs-influence-eyebrow">{eyebrow}</p>
        <h2 className="cs-influence-heading">{heading}</h2>
        <p className="cs-influence-intro">{intro}</p>

        <div className="cs-influence-grid">
          {pillars.map((p) => (
            <div key={p.num} className="cs-influence-pillar">
              <p className="cs-influence-num">{p.num}</p>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </div>
          ))}
        </div>

        {coda && <p className="cs-influence-coda">{coda}</p>}
      </div>
    </section>
  )
}

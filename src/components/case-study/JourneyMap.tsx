import type { ReactNode } from 'react'

interface JourneyMapStage {
  num: string
  name: string
  focus?: boolean
}

interface JourneyMapCell {
  content: ReactNode
  focus?: boolean
}

interface JourneyMapRow {
  label: string
  cells: (JourneyMapCell | null)[]
}

interface JourneyMapProps {
  title: string
  stages: JourneyMapStage[]
  rows?: JourneyMapRow[]
}

export function JourneyMap({ title, stages, rows = [] }: JourneyMapProps) {
  const stageCount = stages.length
  const stagesGrid = `repeat(${stageCount}, minmax(0, 1fr))`
  const rowGrid = `100px repeat(${stageCount}, minmax(0, 1fr))`

  return (
    <div className="cs-journey">
      <span className="cs-tape" aria-hidden />
      <p className="cs-eyebrow">{title}</p>

      {/* Wide map scrolls inside the card on small screens */}
      <div className="cs-scroll-x">
        <div>
          {/* Stages strip */}
          <div className="grid gap-[8px] mb-[16px]" style={{ gridTemplateColumns: stagesGrid }}>
            {stages.map((stage) => (
              <div key={stage.num} className={`cs-jm-stage${stage.focus ? ' is-focus' : ''}`}>
                <p className="cs-jm-stage-num">{stage.num}</p>
                <p className="cs-jm-stage-name">{stage.name}</p>
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row) => (
            <div
              key={row.label}
              className="cs-jm-row grid gap-[4px]"
              style={{ gridTemplateColumns: rowGrid }}
            >
              <div className="cs-jm-rowlabel">{row.label}</div>
              {row.cells.map((cell, i) => {
                if (cell === null) {
                  return <div key={i} />
                }
                return (
                  <div key={i} className={`cs-jm-cell${cell.focus ? ' is-focus' : ''}`}>
                    {cell.content}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

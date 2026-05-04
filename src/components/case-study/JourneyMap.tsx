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
    <div className="bg-white rounded-figure-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-[24px] md:p-[32px]">
      <p className="text-[11px] uppercase tracking-[0.1em] font-serif font-medium text-accent-yellow mb-[18px]">
        {title}
      </p>

      {/* Stages strip */}
      <div className="grid gap-[8px] mb-[16px]" style={{ gridTemplateColumns: stagesGrid }}>
        {stages.map((stage) => (
          <div
            key={stage.num}
            className={`rounded-[6px] px-[10px] py-[10px] text-center ${
              stage.focus
                ? 'bg-amber-50 border border-amber-200/60'
                : 'bg-[#F8F5EE]'
            }`}
          >
            <p className="text-[10px] font-serif text-[#9e9e9e] mb-[4px] tracking-[0.05em]">
              {stage.num}
            </p>
            <p className="text-[12px] font-serif font-semibold leading-[1.3]">
              {stage.name}
            </p>
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-[4px] py-[6px] border-t border-divider-grey/20"
          style={{ gridTemplateColumns: rowGrid }}
        >
          <div className="text-[10px] font-serif text-[#9e9e9e] tracking-[0.04em] uppercase p-[6px]">
            {row.label}
          </div>
          {row.cells.map((cell, i) => {
            if (cell === null) {
              return <div key={i} />
            }
            return (
              <div
                key={i}
                className={`text-[11px] font-serif leading-[1.4] p-[8px] rounded-[4px] ${
                  cell.focus ? 'bg-amber-50' : 'bg-[#F8F5EE]'
                }`}
              >
                {cell.content}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

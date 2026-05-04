type CellState = 'yes' | 'no' | 'partial'

interface LandscapeRow {
  name: string
  cells: CellState[]
  /** When true, the row is rendered with stronger label weight (e.g. the case-study product itself). */
  emphasized?: boolean
}

interface LandscapeSection {
  label: string
  rows: LandscapeRow[]
}

interface LandscapeTableProps {
  title: string
  columns: string[]
  sections: LandscapeSection[]
}

const cellStyle: Record<CellState, { bg: string; text: string; symbol: string }> = {
  yes: { bg: 'bg-emerald-50/60', text: 'text-emerald-700', symbol: '✓' },
  no: { bg: 'bg-rose-50/60', text: 'text-rose-700', symbol: '✗' },
  partial: { bg: 'bg-amber-50/60', text: 'text-amber-700', symbol: '~' },
}

export function LandscapeTable({ title, columns, sections }: LandscapeTableProps) {
  const totalCols = columns.length + 1
  const gridTemplate = `160px repeat(${columns.length}, 1fr)`

  return (
    <div className="bg-white rounded-figure-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-[24px] md:p-[32px]">
      <p className="text-[11px] uppercase tracking-[0.1em] font-serif font-medium text-accent-yellow mb-[18px]">
        {title}
      </p>
      <div
        className="grid items-center gap-x-[12px]"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {/* Header row: empty corner + column headers */}
        <div />
        {columns.map((col) => (
          <div
            key={col}
            className="text-[10px] font-serif text-[#9e9e9e] uppercase tracking-[0.08em] text-center"
          >
            {col}
          </div>
        ))}

        {/* Sections */}
        {sections.map((section) => (
          <SectionBlock
            key={section.label}
            section={section}
            totalCols={totalCols}
          />
        ))}
      </div>
    </div>
  )
}

function SectionBlock({ section, totalCols }: { section: LandscapeSection; totalCols: number }) {
  return (
    <>
      <div
        className="pt-[14px] pb-[6px] border-b border-divider-grey/20 text-[10px] font-serif text-[#9e9e9e] uppercase tracking-[0.08em]"
        style={{ gridColumn: `1 / span ${totalCols}` }}
      >
        {section.label}
      </div>
      {section.rows.map((row) => (
        <Row key={row.name} row={row} />
      ))}
    </>
  )
}

function Row({ row }: { row: LandscapeRow }) {
  return (
    <>
      <div
        className={`text-[12px] font-serif py-[8px] ${
          row.emphasized ? 'font-semibold text-[#1a1a1a]' : 'font-medium text-[#1a1a1a]'
        }`}
      >
        {row.name}
      </div>
      {row.cells.map((state, i) => {
        const style = cellStyle[state]
        return (
          <div
            key={i}
            className={`text-center py-[6px] my-[2px] rounded-[4px] text-[13px] font-serif font-semibold ${style.bg} ${style.text}`}
          >
            {style.symbol}
          </div>
        )
      })}
    </>
  )
}

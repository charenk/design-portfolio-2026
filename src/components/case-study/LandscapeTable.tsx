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

const cellStyle: Record<CellState, { className: string; symbol: string }> = {
  yes: { className: 'is-yes', symbol: '✓' },
  no: { className: 'is-no', symbol: '✗' },
  partial: { className: 'is-partial', symbol: '~' },
}

export function LandscapeTable({ title, columns, sections }: LandscapeTableProps) {
  const totalCols = columns.length + 1
  const gridTemplate = `160px repeat(${columns.length}, 1fr)`

  return (
    <div className="cs-landscape">
      <span className="cs-tape" aria-hidden />
      <p className="cs-eyebrow">{title}</p>

      {/* Wide table scrolls inside the card on small screens */}
      <div className="cs-scroll-x">
        <div
          className="grid items-center gap-x-[12px]"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {/* Header row: empty corner + column headers */}
          <div />
          {columns.map((col) => (
            <div key={col} className="cs-lt-col">
              {col}
            </div>
          ))}

          {/* Sections */}
          {sections.map((section) => (
            <SectionBlock key={section.label} section={section} totalCols={totalCols} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionBlock({ section, totalCols }: { section: LandscapeSection; totalCols: number }) {
  return (
    <>
      <div className="cs-lt-section" style={{ gridColumn: `1 / span ${totalCols}` }}>
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
      <div className={`cs-lt-name${row.emphasized ? ' is-emphasized' : ''}`}>{row.name}</div>
      {row.cells.map((state, i) => {
        const style = cellStyle[state]
        return (
          <div key={i} className={`cs-lt-cell ${style.className}`}>
            {style.symbol}
          </div>
        )
      })}
    </>
  )
}

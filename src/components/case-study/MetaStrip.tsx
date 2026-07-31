interface MetaStripColumn {
  label: string
  value: string
}

interface MetaStripProps {
  /** Currently expects 3 columns; the layout uses md:grid-cols-3. */
  columns: MetaStripColumn[]
}

export function MetaStrip({ columns }: MetaStripProps) {
  return (
    <section className="cs-meta grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[40px]">
      {columns.map((col) => (
        <div key={col.label}>
          <p className="cs-meta-label">{col.label}</p>
          <p className="cs-meta-value">{col.value}</p>
        </div>
      ))}
    </section>
  )
}

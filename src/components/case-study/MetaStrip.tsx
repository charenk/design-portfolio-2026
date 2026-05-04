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
    <section className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[40px] mb-[56px]">
      {columns.map((col) => (
        <div key={col.label}>
          <p className="text-[14px] font-serif text-[#9e9e9e] mb-[8px]">{col.label}</p>
          <p className="text-[14px] leading-[1.6] font-serif">{col.value}</p>
        </div>
      ))}
    </section>
  )
}

interface ImpactRowItem {
  /** Optional bold sentence-case label. Omit when the metric + metricLabel carry the framing alone. */
  label?: string
  text: string
  /** Optional headline metric, e.g. "~70%" or "40K+". When present, renders prominently above the label. */
  metric?: string
  /** Optional caps-eyebrow under the metric, e.g. "ADOPTION". */
  metricLabel?: string
}

interface ImpactRowProps {
  rows: ImpactRowItem[]
}

export function ImpactRow({ rows }: ImpactRowProps) {
  return (
    <div className="flex flex-col">
      {rows.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-[8px] md:gap-[32px] py-[20px] border-b border-divider-grey/30"
        >
          <div>
            {row.metric && (
              <>
                <p className="font-serif font-normal text-[28px] md:text-[32px] leading-[1] text-accent-yellow mb-[6px]">
                  {row.metric}
                </p>
                {row.metricLabel && (
                  <p className="text-[11px] font-serif font-medium uppercase tracking-[0.05em] text-[#9e9e9e] mb-[12px]">
                    {row.metricLabel}
                  </p>
                )}
              </>
            )}
            {row.label && (
              <p className="text-[18px] leading-[1.52] font-serif font-semibold md:whitespace-nowrap">
                {row.label}
              </p>
            )}
          </div>
          <p className="text-[14px] leading-[1.6] font-serif">{row.text}</p>
        </div>
      ))}
    </div>
  )
}

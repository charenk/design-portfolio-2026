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
          className="cs-impact-row grid grid-cols-1 md:grid-cols-[320px_1fr] gap-[8px] md:gap-[32px]"
        >
          <div>
            {row.metric && (
              <>
                <p className="cs-metric">{row.metric}</p>
                {row.metricLabel && <p className="cs-metric-label">{row.metricLabel}</p>}
              </>
            )}
            {row.label && <p className="cs-impact-label md:whitespace-nowrap">{row.label}</p>}
          </div>
          <p className="cs-impact-text">{row.text}</p>
        </div>
      ))}
    </div>
  )
}

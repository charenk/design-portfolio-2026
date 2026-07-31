interface CardGridItem {
  title: string
  description: string
}

interface CardGridProps {
  items: CardGridItem[]
}

export function CardGrid({ items }: CardGridProps) {
  // Column count follows item count; the breakpoint chains live in case-study.css.
  const isThreeUp = items.length === 3

  return (
    <div className={`cs-cardgrid ${isThreeUp ? 'cs-cardgrid-3' : 'cs-cardgrid-4'}`}>
      {items.map((item) => (
        <div key={item.title} className="cs-card">
          <h4 className="cs-card-title">{item.title}</h4>
          <p className="cs-card-desc">{item.description}</p>
        </div>
      ))}
    </div>
  )
}

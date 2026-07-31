interface CardStackItem {
  num: string
  title: string
  description: string
}

interface CardStackProps {
  items: CardStackItem[]
}

export function CardStack({ items }: CardStackProps) {
  return (
    <div className="cs-stack">
      {items.map((item) => (
        <div key={item.num} className="cs-stack-row">
          <p className="cs-stack-num">{item.num}</p>
          <div className="flex-1">
            <h4 className="cs-card-title">{item.title}</h4>
            <p className="cs-card-desc">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

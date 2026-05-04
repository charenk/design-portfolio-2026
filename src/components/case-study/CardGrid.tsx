interface CardGridItem {
  title: string
  description: string
}

interface CardGridProps {
  items: CardGridItem[]
}

export function CardGrid({ items }: CardGridProps) {
  // Choose grid template based on item count. Tailwind needs static class names,
  // so we branch the breakpoint chain rather than interpolate.
  const isThreeUp = items.length === 3

  const gridClasses = isThreeUp
    ? 'grid grid-cols-1 md:grid-cols-3 divide-y md:divide-x md:divide-y-0 divide-divider-grey/20'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-x lg:divide-y-0 divide-divider-grey/20'

  return (
    <div className="bg-white rounded-figure-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className={gridClasses}>
        {items.map((item) => (
          <div key={item.title} className="p-[20px] md:p-[24px]">
            <h4 className="text-[14px] leading-[1.4] font-serif font-semibold mb-[10px]">{item.title}</h4>
            <p className="text-[14px] leading-[1.6] font-serif text-[#4F4F4F]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

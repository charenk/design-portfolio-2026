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
    <div className="bg-white rounded-figure-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="flex flex-col divide-y divide-divider-grey/20">
        {items.map((item) => (
          <div key={item.num} className="flex gap-[16px] md:gap-[28px] p-[20px] md:p-[24px]">
            <p className="text-[12px] font-serif font-medium text-[#9e9e9e] min-w-[28px] pt-[4px]">{item.num}</p>
            <div className="flex-1">
              <h4 className="text-[14px] leading-[1.4] font-serif font-semibold mb-[8px]">{item.title}</h4>
              <p className="text-[14px] leading-[1.6] font-serif text-[#4F4F4F]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

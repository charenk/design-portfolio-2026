interface HypothesisBlockProps {
  label?: string
  body: string
}

export function HypothesisBlock({ label = 'Hypothesis', body }: HypothesisBlockProps) {
  return (
    <div className="border-l-[3px] border-accent-yellow pl-[24px] md:pl-[36px] py-[4px]">
      <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[14px]">
        {label}
      </p>
      <p className="font-serif italic text-[20px] md:text-[22px] leading-[1.4] max-w-[760px]">
        {body}
      </p>
    </div>
  )
}

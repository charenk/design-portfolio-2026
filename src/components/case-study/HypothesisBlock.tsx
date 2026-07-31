interface HypothesisBlockProps {
  label?: string
  body: string
}

export function HypothesisBlock({ label = 'Hypothesis', body }: HypothesisBlockProps) {
  return (
    <div className="cs-hypothesis">
      <span className="cs-tape" aria-hidden />
      <p className="cs-hypothesis-label">{label}</p>
      <p className="cs-hypothesis-body">{body}</p>
    </div>
  )
}

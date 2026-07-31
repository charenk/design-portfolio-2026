/* A hand-drawn wobble line in place of a hard rule. */
export function SectionDivider() {
  return (
    <div className="cs-divider" aria-hidden>
      <svg viewBox="0 0 520 12" preserveAspectRatio="none">
        <path d="M2 7 Q 67 2 132 7 T 262 7 T 392 7 T 518 6" />
      </svg>
    </div>
  )
}

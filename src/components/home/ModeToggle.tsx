'use client'

import type { PortfolioMode } from '@/components/mode/ModeProvider'

export type { PortfolioMode }

/**
 * The read / see control. Purely presentational: the merged homepage owns the
 * mode state and the Flip morph. Styled per mode by the surrounding
 * .dir-kinetic / .dir-tactile scope (see mode-read.css / mode-see.css).
 */
export function ModeToggle({
  mode,
  onChange,
}: {
  mode: PortfolioMode
  onChange: (mode: PortfolioMode) => void
}) {
  return (
    <div className="mode-switch" role="group" aria-label="View mode">
      {(['read', 'see'] as const).map((m) => (
        <button
          key={m}
          type="button"
          className={`mode-opt${m === mode ? ' is-active' : ''}`}
          aria-pressed={m === mode}
          onClick={() => {
            if (m !== mode) onChange(m)
          }}
        >
          {m}
        </button>
      ))}
    </div>
  )
}

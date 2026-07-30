'use client'

import { useEffect, useState } from 'react'

/** Fixed mono header: identity, live UTC clock, availability status chip. */
export function TopBar() {
  const [clock, setClock] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => setClock(new Date().toISOString().slice(11, 19))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="cmd-topbar">
      <p className="cmd-label">Charen Koneti / Product Designer</p>
      <div className="cmd-topbar-right">
        <p className="cmd-label cmd-clock" suppressHydrationWarning>
          UTC {clock ?? '00:00:00'}
        </p>
        <p className="cmd-label cmd-status">
          <span className="cmd-status-dot" aria-hidden="true" />
          Open to work
        </p>
      </div>
    </header>
  )
}

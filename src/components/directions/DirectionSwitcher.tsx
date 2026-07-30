'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DIRECTIONS = [
  { href: '/v1', label: 'V1', name: 'Kinetic Editorial' },
  { href: '/v2', label: 'V2', name: 'Command Center' },
  { href: '/v3', label: 'V3', name: 'Tactile Studio' },
]

/**
 * Floating review pill for comparing the three redesign directions.
 * Temporary: removed once a direction is chosen.
 */
export function DirectionSwitcher() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Design direction switcher"
      className="fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/85 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {DIRECTIONS.map((d) => {
          const active = pathname === d.href
          return (
            <Link
              key={d.href}
              href={d.href}
              title={d.name}
              style={active ? { color: '#ffffff' } : { color: '#1a1a1a' }}
              className={`rounded-full px-3.5 py-1.5 font-sans text-[12px] font-semibold tracking-wide transition-colors ${
                active ? 'bg-[#1a1a1a]' : 'hover:bg-black/5'
              }`}
            >
              {d.label}
            </Link>
          )
        })}
        <span aria-hidden="true" className="mx-1 h-4 w-px bg-black/10" />
        <Link
          href="/"
          style={{ color: '#6a6a6a' }}
          className="rounded-full px-3.5 py-1.5 font-sans text-[12px] font-medium transition-colors hover:bg-black/5"
        >
          Current
        </Link>
      </div>
    </nav>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap, prefersReducedMotion } from '@/lib/motion/gsap'

export type PortfolioMode = 'read' | 'see'

const MODE_ROUTES: Record<PortfolioMode, string> = {
  read: '/v1',
  see: '/v3',
}

/** Destination page backgrounds, so the veil wipe lands seamlessly. */
const MODE_COLORS: Record<PortfolioMode, { bg: string; ink: string }> = {
  read: { bg: '#FFF7EF', ink: '#1a1a1a' },
  see: { bg: '#FAF3E9', ink: '#221F1A' },
}

const ARRIVE_KEY = 'portfolio-mode-arrive'
const PREF_KEY = 'portfolio-mode'

function Veil({
  mode,
  veilRef,
  wordRef,
}: {
  mode: PortfolioMode
  veilRef: React.RefObject<HTMLDivElement | null>
  wordRef: React.RefObject<HTMLSpanElement | null>
}) {
  const colors = MODE_COLORS[mode]
  return (
    <div
      ref={veilRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        display: 'grid',
        placeItems: 'center',
        backgroundColor: colors.bg,
        clipPath: 'inset(100% 0% 0% 0%)',
        pointerEvents: 'none',
        visibility: 'hidden',
      }}
    >
      <span
        ref={wordRef}
        style={{
          fontFamily: 'var(--font-montserrat), system-ui, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(40px, 8vw, 96px)',
          letterSpacing: '0.02em',
          color: colors.ink,
        }}
      >
        {mode}
      </span>
    </div>
  )
}

/**
 * The read / see control bridging the editorial (V1) and tactile (V3) modes.
 * Picking the other mode wipes a veil in the destination's paper color up
 * over the page, routes, and the destination page wipes it away. Under
 * reduced motion it is an instant route change.
 */
export function ModeSwitch({ current }: { current: PortfolioMode }) {
  const router = useRouter()
  const target: PortfolioMode = current === 'read' ? 'see' : 'read'
  const veilRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const [leaving, setLeaving] = useState(false)

  const go = () => {
    if (leaving) return
    try {
      window.localStorage.setItem(PREF_KEY, target)
    } catch {}

    if (prefersReducedMotion()) {
      router.push(MODE_ROUTES[target])
      return
    }

    setLeaving(true)
    try {
      window.sessionStorage.setItem(ARRIVE_KEY, target)
    } catch {}

    const veil = veilRef.current
    const word = wordRef.current
    if (!veil || !word) {
      router.push(MODE_ROUTES[target])
      return
    }

    gsap
      .timeline({
        onComplete: () => router.push(MODE_ROUTES[target]),
      })
      .set(veil, { visibility: 'visible' })
      .fromTo(
        veil,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power4.inOut' }
      )
      .fromTo(
        word,
        { autoAlpha: 0, yPercent: 60 },
        { autoAlpha: 1, yPercent: 0, duration: 0.35, ease: 'power3.out' },
        '-=0.18'
      )
  }

  return (
    <>
      <div className="mode-switch" role="group" aria-label="View mode">
        {(['read', 'see'] as const).map((mode) => {
          const active = mode === current
          return (
            <button
              key={mode}
              type="button"
              className={`mode-opt${active ? ' is-active' : ''}`}
              aria-pressed={active}
              disabled={leaving}
              onClick={() => {
                if (!active) go()
              }}
            >
              {mode}
            </button>
          )
        })}
      </div>
      <Veil mode={target} veilRef={veilRef} wordRef={wordRef} />
    </>
  )
}

/* The consumed arrive flag is stashed at module scope so React StrictMode's
   dev-only effect re-run still plays the reveal after the first run has
   already cleared sessionStorage. */
let consumedArrival: PortfolioMode | null = null

/**
 * Mounted in the v1 and v3 layouts: if this page load came from a ModeSwitch,
 * start covered in this page's paper color and wipe the veil away upward.
 */
export function ModeArrival({ mode }: { mode: PortfolioMode }) {
  const veilRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let arriving = false
    try {
      if (window.sessionStorage.getItem(ARRIVE_KEY) === mode) {
        arriving = true
        consumedArrival = mode
        window.sessionStorage.removeItem(ARRIVE_KEY)
      } else if (consumedArrival === mode) {
        arriving = true
      }
    } catch {}

    const veil = veilRef.current
    const word = wordRef.current
    if (!arriving || !veil || !word || prefersReducedMotion()) return

    const tl = gsap
      .timeline({ onComplete: () => { consumedArrival = null } })
      .set(veil, { visibility: 'visible', clipPath: 'inset(0% 0% 0% 0%)' })
      .set(word, { autoAlpha: 1 })
      .to(word, {
        autoAlpha: 0,
        yPercent: -60,
        duration: 0.35,
        ease: 'power3.in',
        delay: 0.25,
      })
      .to(
        veil,
        { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'power4.inOut' },
        '-=0.1'
      )
      .set(veil, { visibility: 'hidden' })

    return () => {
      tl.kill()
    }
  }, [mode])

  return <Veil mode={mode} veilRef={veilRef} wordRef={wordRef} />
}

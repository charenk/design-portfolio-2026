'use client'

import { useRef } from 'react'
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  FULL_MOTION,
  REDUCED_MOTION,
} from '@/lib/motion/gsap'
import { ModeToggle, type PortfolioMode } from '@/components/home/ModeToggle'

/**
 * Read-mode nav: fixed thin bar, wordmark left, anchor links right. Gains a
 * cream backdrop and hairline once scrolled so the read/see toggle stays
 * reachable anywhere on the page. Fades in from above on load.
 */
export function KineticNav({
  onModeChange,
}: {
  onModeChange: (mode: PortfolioMode) => void
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const nav = ref.current
      if (!nav) return

      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION, () => {
        // Static branch: nothing is ever hidden, CSS defaults are final.
      })
      mm.add(FULL_MOTION, () => {
        gsap.from(nav, {
          autoAlpha: 0,
          y: -14,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.1,
        })
      })

      const trigger = ScrollTrigger.create({
        start: 40,
        onToggle: (self) => nav.classList.toggle('k-nav-scrolled', self.isActive),
      })

      return () => {
        trigger.kill()
        mm.revert()
      }
    },
    { scope: ref }
  )

  return (
    <header ref={ref} className="k-nav">
      <div className="k-nav-inner k-container">
        <a href="#top-read" className="k-wordmark">
          Charen
        </a>
        <nav aria-label="Primary" className="k-nav-links">
          <a href="#work-read" className="k-navlink k-label">
            Work
          </a>
          <a href="#experiments-read" className="k-navlink k-label">
            Experiments
          </a>
          <a href="#contact-read" className="k-navlink k-label">
            Contact
          </a>
          <ModeToggle mode="read" onChange={onModeChange} />
        </nav>
      </div>
    </header>
  )
}

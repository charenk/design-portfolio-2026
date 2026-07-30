'use client'

import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION, REDUCED_MOTION } from '@/lib/motion/gsap'
import { ModeSwitch } from '@/components/directions/ModeSwitch'

/**
 * Prototype-local nav: wordmark left, anchor links right.
 * Fades in from above on load; static under reduced motion.
 */
export function KineticNav() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION, () => {
        // Static branch: nothing is ever hidden, CSS defaults are final.
      })
      mm.add(FULL_MOTION, () => {
        gsap.from(ref.current, {
          autoAlpha: 0,
          y: -14,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.1,
        })
      })
      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <header ref={ref} className="k-nav k-container">
      <a href="#top" className="k-wordmark">
        Charen
      </a>
      <nav aria-label="Primary" className="k-nav-links">
        <a href="#work" className="k-navlink k-label">
          Work
        </a>
        <a href="#contact" className="k-navlink k-label">
          Contact
        </a>
        <ModeSwitch current="read" />
      </nav>
    </header>
  )
}

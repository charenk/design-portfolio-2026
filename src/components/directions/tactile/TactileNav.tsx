'use client'

import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, FULL_MOTION } from '@/lib/motion/gsap'
import { ModeToggle, type PortfolioMode } from '@/components/home/ModeToggle'

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experiments', label: 'Experiments' },
  { href: '#contact', label: 'Contact' },
]

/**
 * Fixed top nav for the tactile direction: a paper strip with the wordmark as
 * a small sticker pill. Transparent over the hero, gains paper + shadow once
 * scrolled. Drops in with a springy overshoot on load.
 */
export function TactileNav({
  onModeChange,
}: {
  onModeChange: (mode: PortfolioMode) => void
}) {
  const navRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const nav = navRef.current
      if (!nav) return

      const mm = gsap.matchMedia()

      mm.add(FULL_MOTION, () => {
        gsap.from(nav, {
          y: -70,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          delay: 0.15,
        })
      })

      const trigger = ScrollTrigger.create({
        start: 40,
        onToggle: (self) => nav.classList.toggle('tc-nav-scrolled', self.isActive),
      })

      return () => trigger.kill()
    },
    { scope: navRef }
  )

  return (
    <header ref={navRef} className="tc-nav">
      <div className="tc-nav-inner">
        <a href="#top" className="tc-nav-wordmark" aria-label="Back to top">
          Charen.
        </a>
        <nav className="tc-nav-links" aria-label="Page sections">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="tc-nav-link">
              {link.label}
            </a>
          ))}
          <ModeToggle mode="see" onChange={onModeChange} />
        </nav>
      </div>
    </header>
  )
}

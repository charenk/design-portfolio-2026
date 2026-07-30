'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion/gsap'

/**
 * Site-wide smooth scrolling: a single Lenis instance driven by the GSAP
 * ticker so ScrollTrigger and Lenis share one rAF loop. No-ops entirely under
 * prefers-reduced-motion. Inner scrollers opt out with data-lenis-prevent.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      lerp: 0.115,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      ScrollTrigger.refresh()
    }
  }, [])

  return <>{children}</>
}

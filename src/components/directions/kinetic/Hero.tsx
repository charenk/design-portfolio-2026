'use client'

import { useRef } from 'react'
import { RevealText } from '@/components/motion/RevealText'
import {
  gsap,
  useGSAP,
  FULL_MOTION,
  REDUCED_MOTION,
} from '@/lib/motion/gsap'

const INTRO =
  'I design and lead product experiences for complex B2B systems, with a focus on identity, access, data and enterprise platforms.'

/**
 * Full-viewport hero. Masked char reveal on the three headline lines, meta
 * row rises in, magenta rule draws after the headline, and the faint Swiss
 * grid backdrop parallax-drifts slower than scroll.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(REDUCED_MOTION, () => {
        // Static branch: CSS defaults already show the final state.
      })

      mm.add(FULL_MOTION, () => {
        // Thin magenta rule draws left to right after the headline.
        gsap.from('.k-hero-rule', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.2,
          ease: 'power3.inOut',
          delay: 1.1,
        })

        // Grid backdrop drifts slower than scroll (simple scrubbed parallax).
        gsap.to('.k-hero-grid', {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="k-hero k-container" aria-label="Introduction">
      <div className="k-hero-grid" aria-hidden="true" />

      <div className="k-hero-bottom">
        <h1 className="k-hero-hl">
          <RevealText
            as="span"
            className="k-hl-line"
            split="chars"
            stagger={0.03}
            yPercent={110}
            ease="power4.out"
            delay={0.15}
          >
            Product Designer
          </RevealText>
          <RevealText
            as="span"
            className="k-hl-line k-hl-accent"
            split="chars"
            stagger={0.03}
            yPercent={110}
            ease="power4.out"
            delay={0.35}
          >
            for complex
          </RevealText>
          <RevealText
            as="span"
            className="k-hl-line"
            split="chars"
            stagger={0.03}
            yPercent={110}
            ease="power4.out"
            delay={0.55}
          >
            B2B systems
          </RevealText>
        </h1>

        <RevealText
          as="p"
          className="k-hero-intro"
          split="lines"
          stagger={0.08}
          duration={0.9}
          delay={0.95}
        >
          {INTRO}
        </RevealText>

        <div className="k-hero-rule" aria-hidden="true" />
      </div>
    </section>
  )
}

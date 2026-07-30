'use client'

import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION } from '@/lib/motion/gsap'
import { RevealText } from '@/components/motion/RevealText'
import { MagneticButton } from './MagneticButton'

/**
 * Two taped index cards for the real experiments, scroll-revealed with a
 * rotation settle. Buttons are magnetic on fine pointers.
 */
export function ExperimentsCorner() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add(FULL_MOTION, () => {
        gsap.from(gsap.utils.toArray<HTMLElement>('.tc-index-card', section), {
          y: 60,
          rotation: (i: number) => (i % 2 ? 6 : -6),
          autoAlpha: 0,
          duration: 0.8,
          ease: 'back.out(1.4)',
          stagger: 0.15,
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="experiments" className="tc-section tc-experiments">
      <div className="tc-section-inner">
        <p className="tc-caveat tc-eyebrow">after hours</p>
        <RevealText as="h2" className="tc-h2" split="words" trigger="scroll">
          Experiments
        </RevealText>

        <div className="tc-exp-grid">
          <article className="tc-index-card">
            <span className="tc-tape" aria-hidden="true" />
            <p className="tc-index-copy">
              {"Built Refinery, a team of 8 agents that scans my TFSA holdings twice a day and surfaces what's worth learning about. Open source, not a trading tool."}
            </p>
            <div className="tc-index-actions">
              <MagneticButton href="/refinery" className="tc-btn">
                View Demo
              </MagneticButton>
              <MagneticButton
                href="https://github.com/charenk/refinery"
                className="tc-btn tc-btn-ghost"
              >
                Github
              </MagneticButton>
            </div>
          </article>

          <article className="tc-index-card">
            <span className="tc-tape" aria-hidden="true" />
            <p className="tc-index-copy">
              Explored improving Figma feedback with AI-generated insights in
              comments using OpenAI, reducing screenshot-based workflows.
            </p>
            <div className="tc-index-actions">
              <MagneticButton href="/figma-buddy" className="tc-btn">
                View Demo
              </MagneticButton>
            </div>
          </article>
        </div>

        <p className="tc-caveat tc-exp-nudge">
          more of this at{' '}
          <a
            href="https://www.makenlab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tc-exp-nudge-link"
          >
            Maken Lab
          </a>
        </p>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION } from '@/lib/motion/gsap'
import { RevealText } from '@/components/motion/RevealText'
import { MagneticButton } from './MagneticButton'

/** Torn-paper top edge: paper-colored jag over the ink footer. */
const TORN_PATH =
  'M0,0 H1200 V18 L1140,32 L1080,14 L1020,34 L960,16 L900,30 L840,12 L780,32 L720,18 L660,34 L600,14 L540,28 L480,12 L420,32 L360,16 L300,30 L240,12 L180,34 L120,16 L60,28 L0,14 Z'

/**
 * Big CTA on an ink section behind a torn-paper edge, with a magnetic
 * "Get in touch" pill taped down at one corner.
 */
export function TapeFooter() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const footer = footerRef.current
      if (!footer) return

      const mm = gsap.matchMedia()

      mm.add(FULL_MOTION, () => {
        gsap.from(
          gsap.utils.toArray<HTMLElement>('.tc-footer-reveal', footer),
          {
            y: 26,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: footer, start: 'top 75%', once: true },
          }
        )
      })

      return () => mm.revert()
    },
    { scope: footerRef }
  )

  return (
    <footer ref={footerRef} id="contact" className="tc-footer">
      <svg
        className="tc-torn"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={TORN_PATH} fill="#FAF3E9" />
      </svg>

      <div className="tc-footer-inner">
        <RevealText as="h2" className="tc-footer-h" split="words" trigger="scroll">
          Want to build something together?
        </RevealText>
        <p className="tc-caveat tc-footer-sub tc-footer-reveal">
          {"If you have an idea worth shipping, I'd love to hear from you."}
        </p>

        <span className="tc-footer-reveal" style={{ display: 'inline-block' }}>
          <MagneticButton href="mailto:charen@gmail.com" className="tc-btn tc-btn-big">
            <span className="tc-tape tc-btn-tape" aria-hidden="true" />
            Get in touch
          </MagneticButton>
        </span>

        <p className="tc-footer-end">
          Designed by Charen, built using Claude
          <span className="tc-heart" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path
                d="M12 21s-7.5-4.9-10-9.6C.4 8 2 4.5 5.4 4.1 7.6 3.8 9.5 5 12 7.6 14.5 5 16.4 3.8 18.6 4.1 22 4.5 23.6 8 22 11.4 19.5 16.1 12 21 12 21Z"
                fill="#AB0782"
              />
            </svg>
          </span>
        </p>
      </div>
    </footer>
  )
}

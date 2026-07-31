'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION } from '@/lib/motion/gsap'
import { RevealText } from '@/components/motion/RevealText'

const LOGOS = [
  { src: '/assets/sg-logo.png', alt: 'ShareGate by Workleap' },
  { src: '/assets/bb-logo.png', alt: 'BlackBerry' },
  { src: '/assets/deloitte.logo.png', alt: 'Deloitte' },
]

/**
 * "Previously shipped at" as three sticker badges sitting on a hand-drawn
 * shelf line. Badges pop in on scroll (scale, back.out, stagger) and tilt on
 * hover via a CSS `rotate` transition, which never fights GSAP's transform.
 */
export function ShippedShelf() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add(FULL_MOTION, () => {
        gsap.from(gsap.utils.toArray<HTMLElement>('.tc-badge', section), {
          scale: 0.6,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'back.out(2)',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="tc-section tc-shelf">
      <div className="tc-section-inner">
        <p className="tc-caveat tc-eyebrow">the resume bit</p>
        <RevealText as="h2" className="tc-h2" split="words" trigger="scroll">
          Previously shipped at
        </RevealText>

        <div className="tc-shelf-row">
          {LOGOS.map((logo) => (
            <div key={logo.src} className="tc-badge">
              <div className="tc-badge-logo">
                <Image src={logo.src} alt={logo.alt} fill sizes="148px" />
              </div>
            </div>
          ))}
        </div>

        <svg
          className="tc-shelf-line"
          viewBox="0 0 640 14"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M2 9 C 120 3, 300 13, 638 6" />
        </svg>
      </div>
    </section>
  )
}

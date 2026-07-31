'use client'

import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION } from '@/lib/motion/gsap'

/**
 * Narrative beat between the shelf and the experiments: the current-role
 * sentence on a taped paper note, with a handwritten aside. Settles in with
 * a gentle rotation on scroll.
 */
export function AboutNote() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL_MOTION, () => {
        gsap.from('.tc-about-note', {
          autoAlpha: 0,
          y: 34,
          rotation: -2.5,
          duration: 0.8,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        })
        gsap.from('.tc-about-aside', {
          autoAlpha: 0,
          y: 10,
          duration: 0.5,
          delay: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="tc-section tc-about">
      <div className="tc-section-inner">
        <p className="tc-caveat tc-eyebrow">right now</p>
        <div className="tc-about-note">
          <span className="tc-tape" aria-hidden="true" />
          <p className="tc-about-text">
            Currently shaping <strong>AI-powered privileged access management</strong>{' '}
            products at CyberQP: agentic workflows with human-in-the-loop gates,
            built for the people who hold the keys.
          </p>
        </div>
        <p className="tc-caveat tc-about-aside" aria-hidden="true">
          security can be friendly too
        </p>
      </div>
    </section>
  )
}

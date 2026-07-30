'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION, REDUCED_MOTION } from '@/lib/motion/gsap'

const EXPERIMENTS = [
  {
    key: 'refinery',
    title: 'The Refinery',
    copy: "Built Refinery, a team of 8 agents that scans my TFSA holdings twice a day and surfaces what's worth learning about. Open source, not a trading tool.",
    links: [
      { label: 'View demo', href: '/refinery', external: false },
      {
        label: 'Github',
        href: 'https://github.com/charenk/refinery',
        external: true,
      },
    ],
  },
  {
    key: 'figma-buddy',
    title: 'Figma Buddy',
    copy: 'Explored improving Figma feedback with AI-generated insights in comments using OpenAI, reducing screenshot-based workflows.',
    links: [{ label: 'View demo', href: '/figma-buddy', external: false }],
  },
]

/**
 * Read-mode experiments: the same two side projects as the tactile corner,
 * set as editorial index rows. Rules scaleX in, content rises on scroll.
 */
export function ExperimentsIndex() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION, () => {})
      mm.add(FULL_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('.k-ex-rule', section).forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: rule, start: 'top 92%', once: true },
          })
        })
        gsap.utils.toArray<HTMLElement>('.k-ex-row', section).forEach((row) => {
          gsap.from(row.children, {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 88%', once: true },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="experiments-read"
      className="k-experiments k-container"
    >
      <div className="k-work-head">
        <h2 className="k-label">Experiments</h2>
        <span className="k-label">After hours</span>
      </div>

      {EXPERIMENTS.map((exp) => (
        <div key={exp.key}>
          <div className="k-ex-rule k-rule-ink" aria-hidden="true" />
          <div className="k-ex-row">
            <h3 className="k-ex-title">{exp.title}</h3>
            <p className="k-ex-copy">{exp.copy}</p>
            <span className="k-ex-links">
              {exp.links.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="k-ex-link k-label"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className="k-ex-link k-label">
                    {link.label}
                  </Link>
                )
              )}
            </span>
          </div>
        </div>
      ))}
      <div className="k-ex-rule k-rule-ink" aria-hidden="true" />

      <p className="k-ex-nudge k-label">
        More of this at{' '}
        <a
          href="https://www.makenlab.com"
          target="_blank"
          rel="noopener noreferrer"
          className="k-ex-link"
        >
          Maken Lab
        </a>
      </p>
    </section>
  )
}

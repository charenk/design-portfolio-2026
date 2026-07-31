"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { MagneticButton } from '@/components/directions/tactile/MagneticButton'
import { gsap, useGSAP, FULL_MOTION, REDUCED_MOTION } from '@/lib/motion/gsap'
import { getProject, type Project } from '@/data/projects'

/* Per-card presentation for the scrapbook grid: column size + the resting
   rotation of the polaroid frame. Coming-soon cards sit pinned flat (0deg). */
const CARD_LAYOUT: Array<{ slug: string; size: 'sm' | 'lg'; rot: number }> = [
  { slug: 'browser-extension', size: 'sm', rot: -2 },
  { slug: 'ai-pam', size: 'lg', rot: 1.4 },
  { slug: 'onboarding', size: 'lg', rot: 0 },
  { slug: 'refinery', size: 'sm', rot: 2 },
  { slug: 'blackberry', size: 'sm', rot: 0 },
  { slug: 'copilot', size: 'lg', rot: 0 },
]

/**
 * A taped polaroid frame around the project artwork: white padded card, tape
 * strip, handwritten caption, tag line, and an optional badge sticker.
 * Live projects render as a link with a hover lift; coming-soon projects are
 * a plain, dimmed article that cannot be clicked.
 */
function Polaroid({
  project,
  size,
  rot,
}: {
  project: Project
  size: 'sm' | 'lg'
  rot: number
}) {
  const soon = !!project.comingSoon
  const style = { '--rot': `${rot}deg` } as CSSProperties

  const frame = (
    <div className="pf-polaroid">
      <span className="tc-tape" aria-hidden="true" />
      <div className="pf-photo" style={{ backgroundColor: project.placeholder }}>
        {project.bannerImage ? (
          <Image
            src={project.bannerImage}
            alt=""
            fill
            sizes={
              size === 'lg'
                ? '(max-width: 767px) 100vw, 62vw'
                : '(max-width: 767px) 100vw, 33vw'
            }
            className="pf-photo-img"
            draggable={false}
          />
        ) : null}
        {project.badge ? (
          <span className={`tc-caveat pf-badge${soon ? ' pf-badge-soon' : ''}`}>
            {project.badge}
          </span>
        ) : null}
      </div>
      <div className="pf-caption">
        <p className="tc-caveat pf-caption-title">{project.title}</p>
        <p className="pf-caption-tags">{project.tags}</p>
      </div>
    </div>
  )

  if (soon) {
    return (
      <article className={`pf-card pf-card-${size} pf-card-soon`} style={style}>
        {frame}
      </article>
    )
  }

  return (
    <Link
      href={project.href}
      className={`pf-card pf-card-${size} pf-card-live`}
      style={style}
    >
      {frame}
    </Link>
  )
}

export default function PortfolioPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(FULL_MOTION, () => {
        // Header drifts in on load.
        gsap.from('.pf-header-item', {
          autoAlpha: 0,
          y: 26,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
        })

        // Each polaroid rises and settles its rotation as it scrolls in.
        gsap.utils.toArray<HTMLElement>('.pf-card').forEach((card, i) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 64,
            rotation: i % 2 === 0 ? -4 : 4,
            duration: 0.9,
            ease: 'back.out(1.4)',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
        })

        gsap.from('.pf-cta-card', {
          autoAlpha: 0,
          y: 48,
          rotation: -3,
          duration: 0.9,
          ease: 'back.out(1.3)',
          scrollTrigger: { trigger: '.pf-cta', start: 'top 85%', once: true },
        })

        gsap.from('.pf-credit', {
          autoAlpha: 0,
          y: 18,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.pf-credit', start: 'top 96%', once: true },
        })
      })

      // Reduced motion: no tweens are created, everything renders static.
      mm.add(REDUCED_MOTION, () => {})

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="pf-page dir-tactile">
      <Navbar activePage="works" />

      <main className="pf-main">
        <div className="pf-inner">
          {/* Header */}
          <div className="pf-header">
            <Link href="/" className="tc-btn pf-back pf-header-item" aria-label="Back to home">
              <svg className="pf-back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <h1 className="pf-title pf-header-item">Selected works</h1>
          </div>

          {/* Scrapbook grid of taped polaroids */}
          <div className="pf-grid">
            {CARD_LAYOUT.map(({ slug, size, rot }) => {
              const project = getProject(slug)
              if (!project) return null
              return <Polaroid key={slug} project={project} size={size} rot={rot} />
            })}
          </div>
        </div>

        {/* Want to build something together? CTA */}
        <section className="pf-cta">
          <div className="pf-cta-card">
            <span className="tc-tape pf-cta-tape-left" aria-hidden="true" />
            <span className="tc-tape pf-cta-tape-right" aria-hidden="true" />

            <h2 className="pf-cta-title">Want to build something together?</h2>
            <p className="pf-cta-sub">
              If you have an idea worth shipping, I&apos;d love to hear from you.
            </p>
            <MagneticButton href="mailto:charen@gmail.com" className="tc-btn pf-cta-btn">
              Get in touch
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>
        </section>

        {/* Bottom credit */}
        <div className="pf-credit">
          <p>Designed by Charen, built using Claude</p>
        </div>
      </main>
    </div>
  )
}

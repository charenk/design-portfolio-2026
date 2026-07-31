"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import type { CSSProperties } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { MagneticButton } from '@/components/directions/tactile/MagneticButton'
import { WorkIndex } from '@/components/directions/kinetic/WorkIndex'
import {
  gsap,
  useGSAP,
  Flip,
  ScrollTrigger,
  prefersReducedMotion,
  FULL_MOTION,
  REDUCED_MOTION,
} from '@/lib/motion/gsap'
import { useMode, type PortfolioMode } from '@/components/mode/ModeProvider'
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

/* The same six projects, in the curated grid order, for the read index. */
const PORTFOLIO_PROJECTS: Project[] = CARD_LAYOUT.map(({ slug }) =>
  getProject(slug)
).filter((project): project is Project => !!project)

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
      <div
        className="pf-photo"
        data-flip-id={`proj-${project.slug}`}
        style={{ backgroundColor: project.placeholder }}
      >
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

/**
 * The works page: one route, two presentations of the same six projects.
 * "see" is the tactile scrapbook grid (default), "read" an editorial index.
 * Both trees stay mounted; the navbar toggle hides one and Flip-morphs the
 * project imagery (matched by data-flip-id) between polaroid photos and
 * index thumbnails while the incoming layout rises in. Mode state lives in
 * the sitewide ModeProvider; this page registers the morph as its
 * transition handler, mirroring HomeExperience.
 */
export default function PortfolioPage() {
  const { mode, registerTransition } = useMode()
  const rootRef = useRef<HTMLDivElement>(null)
  const morphing = useRef(false)

  const runMorph = (next: PortfolioMode, apply: () => void) => {
    if (morphing.current) return

    const root = rootRef.current
    if (!root || prefersReducedMotion()) {
      apply()
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return
    }

    morphing.current = true
    const state = Flip.getState(root.querySelectorAll('[data-flip-id]'))

    flushSync(() => apply())
    ScrollTrigger.refresh()

    const incoming = root.querySelector<HTMLElement>(
      next === 'see' ? '.pfx-see' : '.pfx-read'
    )

    if (incoming) {
      // The rest of the incoming layout rises in around the morphing cards.
      gsap.fromTo(
        incoming.querySelectorAll('main > *'),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.05,
          delay: 0.2,
          clearProps: 'opacity,visibility,transform',
        }
      )
    }

    Flip.from(state, {
      targets: incoming
        ? incoming.querySelectorAll('[data-flip-id]')
        : undefined,
      duration: 0.85,
      ease: 'power3.inOut',
      absolute: true,
      fade: true,
      stagger: 0.025,
      onComplete: () => {
        morphing.current = false
        ScrollTrigger.refresh()
      },
    })
  }

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh())
    // runMorph reads only refs and DOM; stable across renders.
    return registerTransition(runMorph)
  }, [registerTransition])

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
    <div ref={rootRef} className="portfolio-experience">
      <div className="pf-page dir-tactile pfx-see" hidden={mode !== 'see'}>
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
              <MagneticButton href="mailto:charen.k@gmail.com" className="tc-btn pf-cta-btn">
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

      <div className="dir-kinetic pfx-read" hidden={mode !== 'read'}>
        <Navbar activePage="works" />

        <main className="pfr-main">
          {/* Header */}
          <header className="pfr-head k-container">
            <Link href="/" className="pfr-back">
              <span aria-hidden="true">←</span> Back
            </Link>
            <h1 className="pfr-title">Selected works</h1>
          </header>

          {/* Editorial index of the same six projects */}
          <WorkIndex
            projects={PORTFOLIO_PROJECTS}
            heading="Index"
            sub={`${PORTFOLIO_PROJECTS.length} Projects, 2019 to 2026`}
            sectionId="pfr-work"
          />

          {/* Want to build something together? CTA */}
          <section className="pfr-cta k-container">
            <h2 className="pfr-cta-title">Want to build something together?</h2>
            <p className="pfr-cta-sub">
              If you have an idea worth shipping, I&apos;d love to hear from you.
            </p>
            <a href="mailto:charen.k@gmail.com" className="pfr-mail">
              Get in touch
              <span className="pfr-mail-arrow" aria-hidden="true">→</span>
            </a>
          </section>

          {/* Bottom credit */}
          <div className="pfr-credit k-container">
            <p>Designed by Charen, built using Claude</p>
          </div>
        </main>
      </div>
    </div>
  )
}

'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP, ScrollTrigger, FULL_MOTION } from '@/lib/motion/gsap'
import { ALL_PROJECTS, type Project } from '@/data/projects'

/**
 * OPERATIONS: all six projects as 1px-bordered dark panels in a 2-col grid.
 * Panels batch-reveal on scroll. On hover (pointer devices, full motion) the
 * banner image wipes in via clip-path, an OPEN FILE label slides in, and a
 * scanline sweeps the image frame once.
 */
export function WorkShowcase() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL_MOTION, () => {
        const panels = gsap.utils.toArray<HTMLElement>('.cmd-panel')
        gsap.set(panels, { autoAlpha: 0, y: 40 })
        ScrollTrigger.batch(panels, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.12,
            }),
        })
      })
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} className="cmd-work" id="operations">
      <header className="cmd-work-header">
        <p className="cmd-label">Operations</p>
        <p className="cmd-label cmd-dim">Selected work / 01-06</p>
      </header>
      <div className="cmd-grid">
        {ALL_PROJECTS.map((project, index) => (
          <WorkPanel key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}

function WorkPanel({ project, index }: { project: Project; index: number }) {
  const panelRef = useRef<HTMLElement>(null)
  const interactive = !project.comingSoon

  useGSAP(
    (_context, contextSafe) => {
      const panel = panelRef.current
      if (!panel || !interactive || !contextSafe) return

      const mm = gsap.matchMedia()

      mm.add(`${FULL_MOTION} and (hover: hover)`, () => {
        const image = panel.querySelector<HTMLElement>('.cmd-panel-img')
        const label = panel.querySelector<HTMLElement>('.cmd-open-label')
        const scanline = panel.querySelector<HTMLElement>('.cmd-scanline')
        if (!image || !label || !scanline) return

        gsap.set(image, {
          opacity: 0.45,
          filter: 'grayscale(60%) brightness(0.8)',
          scale: 1.06,
        })
        gsap.set(label, { autoAlpha: 0, x: -14 })

        const hoverTl = gsap
          .timeline({ paused: true })
          .to(
            image,
            {
              opacity: 1,
              filter: 'grayscale(0%) brightness(1)',
              scale: 1,
              duration: 0.65,
              ease: 'power3.out',
            },
            0
          )
          .to(
            label,
            { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' },
            0.08
          )

        const frame = image.parentElement as HTMLElement

        const onEnter = contextSafe(() => {
          hoverTl.play()
          gsap.fromTo(
            scanline,
            { autoAlpha: 1, y: 0 },
            {
              y: () => frame.clientHeight,
              duration: 0.7,
              ease: 'power1.inOut',
              overwrite: 'auto',
              onComplete: () => {
                gsap.set(scanline, { autoAlpha: 0, y: 0 })
              },
            }
          )
        })
        const onLeave = contextSafe(() => {
          hoverTl.reverse()
        })

        panel.addEventListener('mouseenter', onEnter)
        panel.addEventListener('mouseleave', onLeave)
        panel.addEventListener('focusin', onEnter)
        panel.addEventListener('focusout', onLeave)

        return () => {
          panel.removeEventListener('mouseenter', onEnter)
          panel.removeEventListener('mouseleave', onLeave)
          panel.removeEventListener('focusin', onEnter)
          panel.removeEventListener('focusout', onLeave)
          hoverTl.kill()
        }
      })
    },
    { scope: panelRef, dependencies: [interactive] }
  )

  const body = (
    <>
      <div className="cmd-panel-meta">
        <span className="cmd-panel-index">
          File {String(index + 1).padStart(2, '0')}
        </span>
        <span className="cmd-panel-tags">{project.tags}</span>
      </div>
      <h3 className="cmd-panel-title">{project.title}</h3>
      <p className="cmd-panel-desc">{project.description}</p>
      <div
        className="cmd-panel-frame"
        style={{ backgroundColor: project.placeholder }}
      >
        {project.bannerImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="cmd-panel-img"
            src={project.bannerImage}
            alt=""
            loading="lazy"
          />
        )}
        <span className="cmd-scanline" aria-hidden="true" />
      </div>
      <div className="cmd-panel-foot">
        {interactive ? (
          <span className="cmd-open-label" aria-hidden="true">
            {'Open file ->'}
          </span>
        ) : (
          <span className="cmd-classified-badge">
            Classified / Coming soon
          </span>
        )}
      </div>
    </>
  )

  return (
    <article
      ref={panelRef}
      className={`cmd-panel${interactive ? '' : ' cmd-panel-classified'}`}
    >
      {interactive ? (
        <Link
          href={project.href}
          className="cmd-panel-inner"
          aria-label={`Open case study: ${project.title}`}
        >
          {body}
        </Link>
      ) : (
        <div className="cmd-panel-inner">{body}</div>
      )}
    </article>
  )
}

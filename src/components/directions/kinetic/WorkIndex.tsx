'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ALL_PROJECTS, type Project } from '@/data/projects'
import { RevealText } from '@/components/motion/RevealText'
import {
  gsap,
  useGSAP,
  FULL_MOTION,
  REDUCED_MOTION,
} from '@/lib/motion/gsap'

/** Cursor preview only where it makes sense: motion-safe fine pointers. */
const DESKTOP_HOVER = `${FULL_MOTION} and (hover: hover) and (pointer: fine) and (min-width: 768px)`

interface WorkIndexProps {
  projects?: Project[]
  heading?: string
  sub?: string
  sectionId?: string
}

/**
 * Editorial index of projects. Rules scaleX in on scroll, titles reveal
 * as masked lines, and on desktop a floating banner preview lerps after the
 * cursor (gsap.quickTo) while hovering a row. Mobile shows inline thumbs.
 * Defaults render the full homepage index; the portfolio page passes its
 * curated list, labels and section id via props.
 */
export function WorkIndex({
  projects = ALL_PROJECTS,
  heading = 'Selected Work',
  sub,
  sectionId = 'work-read',
}: WorkIndexProps) {
  const subLabel = sub ?? `${projects.length} Projects, 2019 to 2026`
  const sectionRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add(REDUCED_MOTION, () => {
        // Static branch: rules, numbers and tags render as plain CSS.
      })

      mm.add(FULL_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('.k-wi-rule', section).forEach((rule) => {
          gsap.from(rule, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.1,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: rule, start: 'top 92%', once: true },
          })
        })

        gsap.utils.toArray<HTMLElement>('.k-wi-row', section).forEach((row) => {
          gsap.from(row.querySelectorAll('.k-wi-num, .k-wi-side'), {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 85%', once: true },
          })
        })
      })

      mm.add(DESKTOP_HOVER, () => {
        const preview = previewRef.current
        if (!preview) return

        const rows = gsap.utils.toArray<HTMLElement>('.k-wi-row', section)
        const images = gsap.utils.toArray<HTMLElement>('img', preview)

        gsap.set(preview, {
          xPercent: -50,
          yPercent: -55,
          autoAlpha: 0,
          scale: 0.85,
          rotate: -2,
        })

        const xTo = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3' })
        const yTo = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3' })
        let shown = false

        const onMove = (e: MouseEvent) => {
          xTo(e.clientX)
          yTo(e.clientY)
        }

        const onLeaveList = () => {
          shown = false
          gsap.to(preview, {
            autoAlpha: 0,
            scale: 0.85,
            rotate: -2,
            duration: 0.3,
            ease: 'power2.in',
            overwrite: 'auto',
          })
        }

        const enterHandlers = rows.map((row) => {
          const handler = (e: MouseEvent) => {
            const index = Number(row.dataset.index)
            images.forEach((img, i) => {
              gsap.set(img, { opacity: i === index ? 1 : 0 })
            })
            if (!shown) {
              // Snap to the cursor before the first reveal so the preview
              // never lerps in from a stale corner.
              gsap.set(preview, { x: e.clientX, y: e.clientY })
              shown = true
            }
            gsap.to(preview, {
              autoAlpha: 1,
              scale: 1,
              rotate: 0,
              duration: 0.45,
              ease: 'power3.out',
              overwrite: 'auto',
            })
          }
          row.addEventListener('mouseenter', handler)
          return handler
        })

        section.addEventListener('mousemove', onMove)
        const list = section.querySelector('.k-wi-list')
        list?.addEventListener('mouseleave', onLeaveList)

        return () => {
          section.removeEventListener('mousemove', onMove)
          list?.removeEventListener('mouseleave', onLeaveList)
          rows.forEach((row, i) =>
            row.removeEventListener('mouseenter', enterHandlers[i])
          )
        }
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id={sectionId} className="k-work k-container">
      <div className="k-work-head">
        <h2 className="k-label">{heading}</h2>
        <span className="k-label">{subLabel}</span>
      </div>

      <ol className="k-wi-list">
        {projects.map((project, index) => {
          const number = String(index + 1).padStart(2, '0')

          const rowContent = (
            <>
              <span className="k-wi-num">{number}</span>
              <span className="k-wi-main">
                <RevealText
                  as="span"
                  className="k-wi-title"
                  split="lines"
                  trigger="scroll"
                  stagger={0.07}
                  duration={0.9}
                  yPercent={110}
                >
                  {project.title}
                </RevealText>
                {project.bannerImage && (
                  <span
                    className="k-wi-thumb"
                    data-flip-id={`proj-${project.slug}`}
                    aria-hidden="true"
                  >
                    <Image
                      src={project.bannerImage}
                      alt=""
                      width={168}
                      height={105}
                    />
                  </span>
                )}
              </span>
              <span className="k-wi-side k-label">
                <span className="k-wi-tags">{project.tags}</span>
                {(project.badge || project.comingSoon) && (
                  <span className="k-wi-badge">
                    {project.comingSoon ? 'Coming soon' : project.badge}
                  </span>
                )}
              </span>
            </>
          )

          return (
            <li key={project.slug} className="k-wi-item">
              <div className="k-wi-rule k-rule-ink" aria-hidden="true" />
              {project.comingSoon ? (
                <div className="k-wi-row is-soon" data-index={index}>
                  {rowContent}
                </div>
              ) : (
                <Link
                  href={project.href}
                  className="k-wi-row"
                  data-index={index}
                >
                  {rowContent}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
      <div className="k-wi-rule k-rule-ink" aria-hidden="true" />

      <div ref={previewRef} className="k-wi-preview" aria-hidden="true">
        {projects.map(
          (project) =>
            project.bannerImage && (
              <Image
                key={project.slug}
                src={project.bannerImage}
                alt=""
                width={440}
                height={275}
              />
            )
        )}
      </div>
    </section>
  )
}

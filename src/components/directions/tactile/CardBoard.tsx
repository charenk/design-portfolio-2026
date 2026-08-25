'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import type { CSSProperties } from 'react'
import {
  gsap,
  useGSAP,
  Draggable,
  InertiaPlugin,
  FULL_MOTION,
  prefersReducedMotion,
} from '@/lib/motion/gsap'
import { ALL_PROJECTS } from '@/data/projects'
import { RevealText } from '@/components/motion/RevealText'

/** Short handwritten captions for the polaroid frames. */
const CAPTIONS: Record<string, string> = {
  'ai-pam': 'AI powered PAM',
  'browser-extension': 'Browser extension',
  refinery: 'Refinery agents',
  onboarding: 'Activation rethink',
  blackberry: 'Endpoint protection',
  copilot: 'Copilot readiness',
}

/** Scattered desk layout: fx/fy are 0..1 fractions of the free board space. */
const LAYOUT: Record<string, { fx: number; fy: number; rot: number }> = {
  'ai-pam': { fx: 0.02, fy: 0.02, rot: -3 },
  'browser-extension': { fx: 0.5, fy: 0.1, rot: 2 },
  refinery: { fx: 0.97, fy: 0, rot: -2 },
  onboarding: { fx: 0.06, fy: 0.94, rot: 2.5 },
  blackberry: { fx: 0.51, fy: 1, rot: -1.5 },
  copilot: { fx: 0.96, fy: 0.9, rot: 3 },
}

/**
 * Corkboard of draggable polaroid project cards. Desktop: Draggable with
 * inertia, bring-to-front on grab, throw rotation follow, click-to-navigate,
 * and a reset pin that tidies everything back up. Mobile: a horizontal
 * snap-scroll row with identical styling and no Draggable at all.
 */
export function CardBoard() {
  const sectionRef = useRef<HTMLElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const draggablesRef = useRef<Draggable[]>([])
  const resetRef = useRef<(() => void) | null>(null)
  const router = useRouter()

  useGSAP(
    (_context, contextSafe) => {
      const board = boardRef.current
      if (!board || !contextSafe) return

      const mm = gsap.matchMedia()

      mm.add({ desktop: '(min-width: 768px)', full: FULL_MOTION }, (ctx) => {
        const c = ctx.conditions as Record<string, boolean> | undefined
        const desktop = !!c?.desktop
        const full = !!c?.full

        const cards = gsap.utils.toArray<HTMLElement>('.tc-polaroid', board)

        // Dragging works even under reduced motion; only the flourishes
        // (entrance deal, lift scale, throw tilt) are gated behind full.
        if (desktop) {
          draggablesRef.current = cards.map((card) => {
            const inner = card.querySelector<HTMLElement>('.tc-polaroid-inner')
            const href = card.dataset.href

            const [instance] = Draggable.create(card, {
              type: 'x,y',
              bounds: board,
              edgeResistance: 0.75,
              inertia: true,
              minimumMovement: 3,
              // See StickerHero: Draggable's inline cursor would defeat
              // `cursor: none`, so mirror the follower's own gating here.
              cursor: full ? 'none' : 'grab',
              activeCursor: full ? 'none' : 'grabbing',
              onPress() {
                card.classList.add('is-lifted')
                if (full && inner) {
                  gsap.to(inner, { scale: 1.04, duration: 0.25, ease: 'power3.out' })
                }
              },
              onRelease() {
                card.classList.remove('is-lifted')
                if (full && inner) {
                  gsap.to(inner, { scale: 1, duration: 0.4, ease: 'power3.out' })
                }
              },
              onDragEnd() {
                if (!full || !inner) return
                // Slight rotation follow based on throw velocity.
                const tilt = gsap.utils.clamp(
                  -10,
                  10,
                  InertiaPlugin.getVelocity(card, 'x') / 80
                )
                gsap
                  .timeline()
                  .to(inner, { rotation: `+=${tilt}`, duration: 0.28, ease: 'power2.out' })
                  .to(inner, { rotation: 0, duration: 1.1, ease: 'elastic.out(1.2, 0.3)' })
              },
              // Draggable only fires onClick when movement stayed under
              // minimumMovement, so drags never trigger navigation.
              onClick(event: Event) {
                if (!href) return
                const target = event.target instanceof Element ? event.target : null
                if (target?.closest('a')) return
                router.push(href)
              },
            })
            return instance
          })
        }

        if (full) {
          if (desktop) {
            // Deal the cards onto the board from the bottom right.
            gsap.from(cards, {
              x: 260,
              y: 340,
              rotation: 16,
              autoAlpha: 0,
              duration: 0.85,
              ease: 'back.out(1.2)',
              stagger: 0.12,
              scrollTrigger: { trigger: board, start: 'top 75%', once: true },
            })
            gsap.from('.tc-board-note', {
              autoAlpha: 0,
              y: 12,
              duration: 0.5,
              delay: 0.6,
              scrollTrigger: { trigger: board, start: 'top 75%', once: true },
            })
          } else {
            gsap.from(cards, {
              y: 48,
              autoAlpha: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: { trigger: board, start: 'top 80%', once: true },
            })
          }
        }

        return () => {
          draggablesRef.current.forEach((d) => d.kill())
          draggablesRef.current = []
        }
      })

      // The reset pin is built here (not during render) so its closure over
      // refs stays inside the effect, and it stays context-safe for cleanup.
      resetRef.current = contextSafe(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.tc-polaroid', board)
        const inners = gsap.utils.toArray<HTMLElement>('.tc-polaroid-inner', board)
        const duration = prefersReducedMotion() ? 0 : 0.7
        gsap.to(cards, {
          x: 0,
          y: 0,
          rotation: 0,
          duration,
          ease: 'back.out(1.4)',
          stagger: duration ? 0.05 : 0,
          onComplete: () => draggablesRef.current.forEach((d) => d.update()),
        })
        gsap.to(inners, { rotation: 0, scale: 1, duration, ease: 'power3.out' })
      })

      return () => {
        resetRef.current = null
        mm.revert()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="work" className="tc-section tc-board-section">
      <div className="tc-section-inner">
        <p className="tc-caveat tc-eyebrow">from my desk</p>
        <RevealText as="h2" className="tc-h2" split="words" trigger="scroll">
          Recent work
        </RevealText>

        <div className="tc-board-wrap">
          <p className="tc-caveat tc-board-note" aria-hidden="true">
            go on, toss them around
          </p>
          <button
            type="button"
            className="tc-reset"
            onClick={() => resetRef.current?.()}
          >
            reset
          </button>

          <div ref={boardRef} className="tc-board" data-lenis-prevent>
            {ALL_PROJECTS.map((project) => {
              const layout = LAYOUT[project.slug] ?? { fx: 0.5, fy: 0.5, rot: 0 }
              const caption = CAPTIONS[project.slug] ?? project.title
              const style = {
                '--fx': layout.fx,
                '--fy': layout.fy,
                '--rot': `${layout.rot}deg`,
              } as CSSProperties

              return (
                <article
                  key={project.slug}
                  className={`tc-polaroid${project.comingSoon ? ' is-soon' : ''}`}
                  style={style}
                  data-href={project.comingSoon ? undefined : project.href}
                  data-cursor={project.comingSoon ? undefined : 'drag'}
                >
                  <div className="tc-polaroid-inner">
                    <span className="tc-tape" aria-hidden="true" />
                    <div
                      className="tc-polaroid-photo"
                      data-flip-id={`proj-${project.slug}`}
                      style={{ backgroundColor: project.placeholder }}
                    >
                      {project.bannerImage ? (
                        <Image
                          src={project.bannerImage}
                          alt={project.title}
                          fill
                          sizes="(max-width: 767px) 248px, 284px"
                          className="tc-polaroid-img"
                          draggable={false}
                        />
                      ) : null}
                      {project.comingSoon ? (
                        <span className="tc-soon tc-caveat">soon!</span>
                      ) : null}
                    </div>
                    <p className="tc-caveat tc-polaroid-caption">
                      {project.comingSoon ? (
                        <span>
                          {caption} <span className="tc-muted">(coming soon)</span>
                        </span>
                      ) : (
                        <Link
                          href={project.href}
                          className="tc-polaroid-link"
                          data-cursor="view"
                        >
                          {caption}
                        </Link>
                      )}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

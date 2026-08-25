'use client'

import { useRef } from 'react'
import {
  gsap,
  useGSAP,
  Draggable,
  FULL_MOTION,
} from '@/lib/motion/gsap'
import { RevealText } from '@/components/motion/RevealText'

const STAR_POINTS =
  '120,60 104.4,71.9 112,90 92.5,92.5 90,112 71.9,104.4 60,120 48.1,104.4 30,112 27.5,92.5 8,90 15.6,71.9 0,60 15.6,48.1 8,30 27.5,27.5 30,8 48.1,15.6 60,0 71.9,15.6 90,8 92.5,27.5 112,30 104.4,48.1'

/**
 * Desk-top hero: chunky headline with a sticker name pill, the intro as a
 * taped paper note dropping in, three draggable stickers with inertia and
 * hover wobble, and a Caveat annotation whose arrow draws itself in.
 */
export function StickerHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const annotationRef = useRef<HTMLDivElement>(null)
  const arrowPathRef = useRef<SVGPathElement>(null)
  const arrowHeadRef = useRef<SVGPathElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const mm = gsap.matchMedia()

      mm.add({ fine: '(pointer: fine)', full: FULL_MOTION }, (ctx) => {
        const c = ctx.conditions as Record<string, boolean> | undefined
        const fine = !!c?.fine
        const full = !!c?.full

        const stickers = gsap.utils.toArray<HTMLElement>('.tc-sticker', section)
        let dragging = false
        const cleanups: Array<() => void> = []

        // Stickers stay draggable even under reduced motion; only the
        // entrance and wobble flourishes are gated behind full motion.
        if (fine) {
          const draggables = Draggable.create(stickers, {
            type: 'x,y',
            inertia: true,
            bounds: section,
            edgeResistance: 0.55,
            // Draggable writes an inline cursor, which outranks the
            // `cursor: none` rule in mode-see.css and leaves the OS cursor
            // showing alongside the follower bubble. Only hide it when the
            // follower is actually running, so reduced motion keeps a pointer.
            cursor: full ? 'none' : 'grab',
            activeCursor: full ? 'none' : 'grabbing',
            onPress() {
              dragging = true
            },
            onRelease() {
              dragging = false
            },
          })
          cleanups.push(() => draggables.forEach((d) => d.kill()))
        }

        if (full) {
          gsap.from(nameRef.current, {
            scale: 0.4,
            rotation: 10,
            autoAlpha: 0,
            duration: 0.7,
            delay: 0.35,
            ease: 'back.out(1.8)',
          })

          // Springy paper-note drop.
          gsap.from(noteRef.current, {
            y: -40,
            rotation: -6,
            autoAlpha: 0,
            duration: 0.9,
            delay: 0.2,
            ease: 'back.out(1.6)',
          })

          gsap.from(stickers, {
            scale: 0.3,
            autoAlpha: 0,
            duration: 0.7,
            delay: 0.55,
            stagger: 0.1,
            ease: 'back.out(2)',
          })

          gsap.from(annotationRef.current, {
            autoAlpha: 0,
            duration: 0.5,
            delay: 0.95,
          })

          // Hand-drawn arrow: plain stroke-dashoffset draw, no plugin needed.
          const paths = [arrowPathRef.current, arrowHeadRef.current]
          paths.forEach((path, i) => {
            if (!path) return
            const length = path.getTotalLength()
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: i === 0 ? 0.7 : 0.25,
              delay: 1.05 + i * 0.65,
              ease: 'power2.inOut',
            })
          })

          // Elastic wobble on hover, skipped mid-drag.
          stickers.forEach((sticker) => {
            const inner = sticker.querySelector<HTMLElement>('.tc-sticker-inner')
            if (!inner) return
            const onEnter = () => {
              if (dragging) return
              const swing = gsap.utils.random(6, 9) * (Math.random() < 0.5 ? -1 : 1)
              gsap
                .timeline()
                .to(inner, { rotation: swing, duration: 0.16, ease: 'power2.out' })
                .to(inner, { rotation: 0, duration: 1.1, ease: 'elastic.out(1.5, 0.22)' })
            }
            sticker.addEventListener('pointerenter', onEnter)
            cleanups.push(() => sticker.removeEventListener('pointerenter', onEnter))
          })
        }

        return () => cleanups.forEach((fn) => fn())
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="tc-hero">
      <div className="tc-hero-inner">
        <h1 className="tc-headline">
          <RevealText as="span" split="chars" trigger="mount">
            {"Hi, I'm"}
          </RevealText>{' '}
          <span ref={nameRef} className="tc-headline-sticker">
            Charen.
          </span>
        </h1>

        <div className="tc-note-row">
          <div ref={noteRef} className="tc-note">
            <span className="tc-tape" aria-hidden="true" />
            <p>
              I design and lead product experiences for complex B2B systems,
              with a focus on identity, access, data and enterprise platforms.
            </p>
          </div>

          <div ref={annotationRef} className="tc-annotation">
            <svg
              className="tc-annotation-arrow"
              viewBox="0 0 120 90"
              aria-hidden="true"
              focusable="false"
            >
              {/*
                One confident pen stroke: leaves the text horizontally, bows
                up, then falls away to the tip at (26, 62). The head's barbs
                splay off the tail's exit tangent (-0.49, 0.87) at +/-28deg so
                the tip reads as one continuous stroke, not a bolted-on chevron.
              */}
              <path ref={arrowPathRef} d="M108 14 C 84 12, 46 26, 26 62" />
              <path ref={arrowHeadRef} d="M40 54 L 26 62 L 27 47" />
            </svg>
            <p className="tc-caveat">
              currently at CyberQP, shaping AI powered PAM
            </p>
          </div>
        </div>

        <div className="tc-sticker tc-sticker-cyberqp" data-cursor="drag">
          <div className="tc-sticker-inner">CyberQP</div>
        </div>

        <div className="tc-sticker tc-sticker-star" data-cursor="drag">
          <div className="tc-sticker-inner">
            <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
              <polygon points={STAR_POINTS} fill="#F7E08E" stroke="#221F1A" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
            <span>AI x Security</span>
          </div>
        </div>

        <div className="tc-sticker tc-sticker-smiley" data-cursor="drag">
          <div className="tc-sticker-inner">
            <svg viewBox="0 0 14 14" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
              <rect x="0" y="0" width="14" height="14" fill="#F7E08E" />
              <rect x="3" y="4" width="2" height="2" fill="#221F1A" />
              <rect x="9" y="4" width="2" height="2" fill="#221F1A" />
              <rect x="3" y="8" width="1" height="1" fill="#221F1A" />
              <rect x="10" y="8" width="1" height="1" fill="#221F1A" />
              <rect x="4" y="9" width="6" height="1" fill="#221F1A" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

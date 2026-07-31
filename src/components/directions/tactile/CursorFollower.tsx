'use client'

import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION } from '@/lib/motion/gsap'

/**
 * Ink-dot cursor follower. Desktop only (pointer: fine) and full motion only.
 * The dot lerps to the pointer via gsap.quickTo and morphs into a labelled
 * bubble over elements carrying data-cursor="drag" or data-cursor="view".
 * The OS cursor is hidden only over those elements (see v3.css), so
 * usability never depends on this component.
 */
export function CursorFollower() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      const dot = dotRef.current
      const bubble = bubbleRef.current
      const label = labelRef.current
      if (!root || !dot || !bubble || !label) return

      // Hidden by default via GSAP (never CSS) so touch and reduced-motion
      // visitors simply never see it.
      gsap.set(root, { autoAlpha: 0 })

      const mm = gsap.matchMedia()

      mm.add({ fine: '(pointer: fine)', full: FULL_MOTION }, (ctx) => {
        const c = ctx.conditions as Record<string, boolean> | undefined
        if (!c?.fine || !c?.full) {
          gsap.set(root, { autoAlpha: 0 })
          return
        }

        gsap.set(bubble, { scale: 0 })
        gsap.set(dot, { scale: 1 })

        const xTo = gsap.quickTo(root, 'x', { duration: 0.3, ease: 'power3' })
        const yTo = gsap.quickTo(root, 'y', { duration: 0.3, ease: 'power3' })

        let shown = false
        let mode: string | null = null

        const onMove = (e: PointerEvent) => {
          if (!shown) {
            shown = true
            gsap.set(root, { x: e.clientX, y: e.clientY })
            gsap.to(root, { autoAlpha: 1, duration: 0.25 })
          }
          xTo(e.clientX)
          yTo(e.clientY)
        }

        const setMode = (next: string | null) => {
          if (next === mode) return
          mode = next
          if (next === 'drag' || next === 'view') {
            label.textContent = next === 'drag' ? 'drag' : 'view →'
            gsap.to(bubble, {
              scale: 1,
              duration: 0.35,
              ease: 'back.out(2)',
              overwrite: 'auto',
            })
            gsap.to(dot, { scale: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
          } else {
            gsap.to(bubble, { scale: 0, duration: 0.25, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power3.out', overwrite: 'auto' })
          }
        }

        const onOver = (e: PointerEvent) => {
          const target = e.target instanceof Element ? e.target : null
          const hit = target?.closest('[data-cursor]') ?? null
          setMode(hit ? hit.getAttribute('data-cursor') : null)
        }

        const onLeaveDoc = () => {
          shown = false
          gsap.to(root, { autoAlpha: 0, duration: 0.2 })
        }

        window.addEventListener('pointermove', onMove, { passive: true })
        document.addEventListener('pointerover', onOver, { passive: true })
        document.documentElement.addEventListener('pointerleave', onLeaveDoc)

        return () => {
          window.removeEventListener('pointermove', onMove)
          document.removeEventListener('pointerover', onOver)
          document.documentElement.removeEventListener('pointerleave', onLeaveDoc)
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="tc-cursor" aria-hidden="true">
      <div ref={dotRef} className="tc-cursor-dot" />
      <div ref={bubbleRef} className="tc-cursor-bubble">
        <span ref={labelRef} />
      </div>
    </div>
  )
}

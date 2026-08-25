'use client'

import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION } from '@/lib/motion/gsap'

/**
 * Two-layer cursor for see mode. Desktop only (pointer: fine) and full
 * motion only.
 *
 * The dot root IS the cursor: it is pinned to the pointer synchronously in
 * the pointermove handler (gsap.set, zero lag) because mode-see.css hides the
 * OS cursor across the whole .dir-tactile surface, so aim depends on it. The
 * tactile personality lives in a separate ring root that eases behind via
 * gsap.quickTo.
 *
 * Context reactions: the ring grows over generic interactives (a, button);
 * over data-cursor="drag" / "view" the labelled bubble takes over at the
 * pointer while the dot shrinks and the ring hides; the whole dot root dips
 * on press. Touch and reduced-motion visitors keep OS cursors and never see
 * this component.
 */
export function CursorFollower() {
  const dotRootRef = useRef<HTMLDivElement>(null)
  const ringRootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const dotRoot = dotRootRef.current
      const ringRoot = ringRootRef.current
      const dot = dotRef.current
      const ring = ringRef.current
      const bubble = bubbleRef.current
      const label = labelRef.current
      if (!dotRoot || !ringRoot || !dot || !ring || !bubble || !label) return

      const roots = [dotRoot, ringRoot]

      // Hidden by default via GSAP (never CSS) so touch and reduced-motion
      // visitors simply never see it.
      gsap.set(roots, { autoAlpha: 0 })

      const mm = gsap.matchMedia()

      mm.add({ fine: '(pointer: fine)', full: FULL_MOTION }, (ctx) => {
        const c = ctx.conditions as Record<string, boolean> | undefined
        if (!c?.fine || !c?.full) {
          gsap.set(roots, { autoAlpha: 0 })
          return
        }

        gsap.set(bubble, { scale: 0 })
        gsap.set([dot, ring], { scale: 1 })

        // The dot root is set synchronously in onMove so the visible cursor
        // is always exactly at the pointer. The ring lerps behind on the
        // shared GSAP ticker, with its lag hard-clamped to MAX_LAG px: the
        // ring's interior radius minus the dot's radius, so the dot can
        // never visually leave the ring no matter how fast the pointer
        // moves. No duration tuning can guarantee that; the clamp does.
        const MAX_LAG = 10
        const pointer = { x: 0, y: 0 }
        const ringPos = { x: 0, y: 0 }

        const tick = () => {
          // Frame-rate-independent lerp (~0.25 per 60fps frame).
          const blend = 1 - Math.pow(0.75, gsap.ticker.deltaRatio(60))
          ringPos.x += (pointer.x - ringPos.x) * blend
          ringPos.y += (pointer.y - ringPos.y) * blend
          const dx = ringPos.x - pointer.x
          const dy = ringPos.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist > MAX_LAG) {
            const s = MAX_LAG / dist
            ringPos.x = pointer.x + dx * s
            ringPos.y = pointer.y + dy * s
          }
          gsap.set(ringRoot, { x: ringPos.x, y: ringPos.y })
        }
        gsap.ticker.add(tick)

        let shown = false
        let mode: string | null = null

        const onMove = (e: PointerEvent) => {
          pointer.x = e.clientX
          pointer.y = e.clientY
          if (!shown) {
            shown = true
            // Place both layers at the pointer before fading in, so the
            // ring never flies in from the viewport origin.
            ringPos.x = e.clientX
            ringPos.y = e.clientY
            gsap.set(roots, { x: e.clientX, y: e.clientY })
            gsap.to(roots, { autoAlpha: 1, duration: 0.25 })
          }
          gsap.set(dotRoot, { x: e.clientX, y: e.clientY })
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
            // Shrink, never hide: the dot is the precision point.
            gsap.to(dot, { scale: 0.4, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
            gsap.to(ring, { scale: 0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
          } else if (next === 'ui') {
            gsap.to(bubble, { scale: 0, duration: 0.25, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(ring, { scale: 1.45, duration: 0.3, ease: 'back.out(1.6)', overwrite: 'auto' })
          } else {
            gsap.to(bubble, { scale: 0, duration: 0.25, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power3.out', overwrite: 'auto' })
            gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power3.out', overwrite: 'auto' })
          }
        }

        const onOver = (e: PointerEvent) => {
          const target = e.target instanceof Element ? e.target : null
          const cursorHit = target?.closest('[data-cursor]')
          if (cursorHit) {
            setMode(cursorHit.getAttribute('data-cursor'))
            return
          }
          setMode(target?.closest('a, button') ? 'ui' : null)
        }

        // Press dip on the whole dot root so it reads in every mode (dot,
        // grown ring, or labelled bubble) without compounding the
        // per-element scale tweens.
        const onDown = () => {
          gsap.to(dotRoot, { scale: 0.9, duration: 0.15, ease: 'power2.out', overwrite: 'auto' })
        }
        const onUp = () => {
          gsap.to(dotRoot, { scale: 1, duration: 0.3, ease: 'back.out(2.5)', overwrite: 'auto' })
        }

        const onLeaveDoc = () => {
          shown = false
          gsap.to(roots, { autoAlpha: 0, duration: 0.2 })
        }

        window.addEventListener('pointermove', onMove, { passive: true })
        document.addEventListener('pointerover', onOver, { passive: true })
        window.addEventListener('pointerdown', onDown, { passive: true })
        window.addEventListener('pointerup', onUp, { passive: true })
        document.documentElement.addEventListener('pointerleave', onLeaveDoc)

        return () => {
          gsap.ticker.remove(tick)
          window.removeEventListener('pointermove', onMove)
          document.removeEventListener('pointerover', onOver)
          window.removeEventListener('pointerdown', onDown)
          window.removeEventListener('pointerup', onUp)
          document.documentElement.removeEventListener('pointerleave', onLeaveDoc)
        }
      })

      return () => mm.revert()
    },
    { scope: dotRootRef }
  )

  return (
    <>
      <div ref={ringRootRef} className="tc-cursor-ring-root" aria-hidden="true">
        <div ref={ringRef} className="tc-cursor-ring" />
      </div>
      <div ref={dotRootRef} className="tc-cursor" aria-hidden="true">
        <div ref={dotRef} className="tc-cursor-dot" />
        <div ref={bubbleRef} className="tc-cursor-bubble">
          <span ref={labelRef} />
        </div>
      </div>
    </>
  )
}

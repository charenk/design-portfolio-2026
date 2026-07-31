'use client'

import { createElement, useRef } from 'react'
import {
  gsap,
  useGSAP,
  SplitText,
  FULL_MOTION,
  REDUCED_MOTION,
} from '@/lib/motion/gsap'

interface RevealTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  className?: string
  /** Split granularity. Chars for headlines, lines for body copy. */
  split?: 'chars' | 'words' | 'lines'
  /** 'mount' plays on load, 'scroll' plays when the element enters the viewport. */
  trigger?: 'mount' | 'scroll'
  delay?: number
  stagger?: number
  duration?: number
  /** Vertical travel as a percentage of the split unit's own height. */
  yPercent?: number
  ease?: string
}

/**
 * SplitText reveal primitive. Waits for fonts.ready before splitting so
 * Montserrat's late swap cannot mis-measure line breaks. Content is hidden by
 * GSAP (never CSS), so no-JS visitors and reduced-motion users always see it.
 */
export function RevealText({
  children,
  as = 'div',
  className,
  split = 'chars',
  trigger = 'mount',
  delay = 0,
  stagger = 0.025,
  duration = 1,
  yPercent = 110,
  ease = 'power4.out',
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    (_context, contextSafe) => {
      const el = ref.current
      if (!el || !contextSafe) return

      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION, () => {
        gsap.set(el, { autoAlpha: 1 })
      })

      let splitter: SplitText | null = null

      const run = contextSafe(() => {
        mm.add(FULL_MOTION, () => {
          splitter = new SplitText(el, {
            type: split === 'chars' ? 'chars,words' : split,
            mask: split,
            autoSplit: split === 'lines',
          })
          const targets =
            split === 'chars'
              ? splitter.chars
              : split === 'words'
                ? splitter.words
                : splitter.lines

          gsap.set(el, { autoAlpha: 1 })
          const tween = gsap.from(targets, {
            yPercent,
            duration,
            delay,
            stagger,
            ease,
            ...(trigger === 'scroll'
              ? {
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                  },
                }
              : {}),
          })
          return () => {
            tween.scrollTrigger?.kill()
          }
        })
      })

      // Hide before first paint only when motion is allowed; reveal after split.
      if (!window.matchMedia(REDUCED_MOTION).matches) {
        gsap.set(el, { autoAlpha: 0 })
      }
      if (document.fonts.status === 'loaded') {
        run()
      } else {
        document.fonts.ready.then(run)
      }

      return () => {
        splitter?.revert()
        mm.revert()
      }
    },
    { scope: ref }
  )

  // Passing the ref object as a prop is standard React; the compiler lint
  // misreads it as a render-time ref read.
  // eslint-disable-next-line react-hooks/refs
  return createElement(as, { ref, className }, children)
}

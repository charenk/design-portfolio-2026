'use client'

import { useRef } from 'react'
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  FULL_MOTION,
  REDUCED_MOTION,
} from '@/lib/motion/gsap'

const ITEMS = ['Identity', 'Access', 'Data', 'Enterprise AI', 'B2B Platforms']

/**
 * Infinite horizontal band. The track holds two identical halves; tweening
 * xPercent to -50 loops seamlessly. Scroll direction flips the tween's
 * timeScale (eased, so the reversal feels physical). Static text under
 * reduced motion.
 */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const track = trackRef.current
      if (!track) return

      const mm = gsap.matchMedia()

      mm.add(REDUCED_MOTION, () => {
        // Static branch: the band simply shows its first stretch of text.
      })

      mm.add(FULL_MOTION, () => {
        const tween = gsap.to(track, {
          xPercent: -50,
          duration: 28,
          ease: 'none',
          repeat: -1,
        })

        const st = ScrollTrigger.create({
          onUpdate(self) {
            gsap.to(tween, {
              timeScale: self.direction < 0 ? -1 : 1,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: true,
            })
          },
        })

        return () => {
          st.kill()
          tween.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  const half = `${ITEMS.join(' · ')} · `.repeat(2)

  return (
    <div ref={ref} className="k-marquee" aria-hidden="true">
      <div ref={trackRef} className="k-marquee-track">
        <span className="k-marquee-half">{half}</span>
        <span className="k-marquee-half">{half}</span>
      </div>
    </div>
  )
}

'use client'

import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION, REDUCED_MOTION } from '@/lib/motion/gsap'
import { RevealText } from '@/components/motion/RevealText'

const KICKER = 'PRIVILEGED ACCESS / ENTERPRISE AI'
const SCRAMBLE_CHARS = 'ABCDEFGHKMNPRSTUVXYZ0123456789#$%&'

/**
 * 100vh hero over the particle field. The mono kicker types in with a small
 * custom scramble (random glyphs settling left to right), the headline and
 * intro rise in via RevealText.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const kickerRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      const kicker = kickerRef.current
      if (!kicker) return

      const mm = gsap.matchMedia()

      mm.add(FULL_MOTION, () => {
        const proxy = { progress: 0 }
        const tween = gsap.to(proxy, {
          progress: 1,
          duration: 1.5,
          delay: 0.15,
          ease: 'power2.inOut',
          onUpdate: () => {
            const settled = Math.floor(proxy.progress * KICKER.length)
            let out = ''
            for (let i = 0; i < KICKER.length; i += 1) {
              const char = KICKER[i]
              if (i < settled || char === ' ' || char === '/') {
                out += char
              } else {
                out +=
                  SCRAMBLE_CHARS[
                    Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                  ]
              }
            }
            kicker.textContent = out
          },
          onComplete: () => {
            kicker.textContent = KICKER
          },
        })
        return () => {
          tween.kill()
          kicker.textContent = KICKER
        }
      })

      mm.add(REDUCED_MOTION, () => {
        kicker.textContent = KICKER
      })
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} className="cmd-hero">
      <p ref={kickerRef} className="cmd-kicker">
        {KICKER}
      </p>

      <RevealText
        as="h1"
        className="cmd-headline"
        split="chars"
        trigger="mount"
        delay={0.45}
        stagger={0.016}
        duration={0.9}
      >
        Designing <span className="cmd-accent">trust</span> into complex
        systems
      </RevealText>

      <RevealText
        as="p"
        className="cmd-intro"
        split="lines"
        trigger="mount"
        delay={1}
        stagger={0.09}
        duration={0.8}
        yPercent={100}
      >
        I design and lead product experiences for complex B2B systems, with a
        focus on identity, access, data and enterprise platforms. Currently
        shaping AI-powered privileged access management products at CyberQP.
      </RevealText>

      <div className="cmd-scroll-cue" aria-hidden="true">
        <span className="cmd-label">Scroll</span>
        <span className="cmd-scroll-line" />
      </div>
    </section>
  )
}

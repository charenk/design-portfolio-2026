'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { RevealText } from '@/components/motion/RevealText'
import {
  gsap,
  useGSAP,
  FULL_MOTION,
  REDUCED_MOTION,
} from '@/lib/motion/gsap'

const LOGOS = [
  { src: '/assets/sg-logo.png', alt: 'ShareGate by Workleap' },
  { src: '/assets/bb-logo.png', alt: 'BlackBerry' },
  { src: '/assets/deloitte.logo.png', alt: 'Deloitte' },
]

/**
 * About strip (scroll-revealed statement + grayscale logo row) followed by
 * the oversized contact footer with the underline-sweep mailto link.
 */
export function AboutFooter() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add(REDUCED_MOTION, () => {
        // Static branch: logos and links render at CSS defaults.
      })

      mm.add(FULL_MOTION, () => {
        gsap.from('.k-about-logos > *', {
          autoAlpha: 0,
          y: 14,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.k-about-logos',
            start: 'top 88%',
            once: true,
          },
        })

        gsap.from('.k-footer-mail', {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.k-footer-mail',
            start: 'top 90%',
            once: true,
          },
        })
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  return (
    <div ref={ref}>
      <section className="k-about k-container" aria-label="About">
        <h2 className="k-label">Previously shipped at</h2>

        <RevealText
          as="p"
          className="k-about-statement"
          split="lines"
          trigger="scroll"
          stagger={0.1}
          duration={1}
        >
          Currently shaping AI-powered privileged access management products
          at CyberQP.
        </RevealText>

        <div className="k-about-logos">
          {LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={36}
            />
          ))}
        </div>
      </section>

      <footer id="contact" className="k-footer k-container">
        <h2 className="k-footer-hl">
          <RevealText
            as="span"
            className="k-hl-line"
            split="chars"
            trigger="scroll"
            stagger={0.02}
            yPercent={110}
            ease="power4.out"
          >
            Let&apos;s build
          </RevealText>
          <RevealText
            as="span"
            className="k-hl-line"
            split="chars"
            trigger="scroll"
            stagger={0.02}
            yPercent={110}
            ease="power4.out"
            delay={0.15}
          >
            something together
          </RevealText>
        </h2>

        <a href="mailto:charen@gmail.com" className="k-footer-mail">
          charen@gmail.com
          <span className="k-footer-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>

        <div className="k-footer-base k-label">
          <span>Designed by Charen, built using Claude</span>
          <a href="#top" className="k-navlink">
            Back to top
          </a>
        </div>
      </footer>
    </div>
  )
}

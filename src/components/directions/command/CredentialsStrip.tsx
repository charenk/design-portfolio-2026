'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP, FULL_MOTION } from '@/lib/motion/gsap'

const LOGOS = [
  { src: '/assets/sg-logo.png', alt: 'ShareGate by Workleap' },
  { src: '/assets/bb-logo.png', alt: 'BlackBerry' },
  { src: '/assets/deloitte.logo.png', alt: 'Deloitte' },
]

const STATS = [
  { value: 3, label: 'Companies' },
  { value: 6, label: 'Case studies' },
  { value: 2, label: 'Side projects' },
]

/**
 * Horizontal bordered band: previous employers plus truthful counters that
 * count up once when scrolled into view. The final values are rendered in
 * the markup, so no-JS and reduced-motion visitors always see real numbers.
 */
export function CredentialsStrip() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(FULL_MOTION, () => {
        const values = gsap.utils.toArray<HTMLElement>('.cmd-stat-value')
        values.forEach((el) => {
          const target = Number(el.dataset.value ?? '0')
          const proxy = { current: 0 }
          gsap.to(proxy, {
            current: target,
            duration: 1.3,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(proxy.current))
            },
          })
        })
      })
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} className="cmd-credentials" aria-label="Credentials">
      <p className="cmd-label cmd-dim">Previously shipped at</p>
      <div className="cmd-logo-row">
        {LOGOS.map((logo) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={100}
            height={36}
            className="cmd-logo"
          />
        ))}
      </div>
      <ul className="cmd-stats">
        {STATS.map((stat) => (
          <li key={stat.label} className="cmd-stat">
            <span className="cmd-stat-value" data-value={stat.value}>
              {stat.value}
            </span>
            <span className="cmd-stat-label">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

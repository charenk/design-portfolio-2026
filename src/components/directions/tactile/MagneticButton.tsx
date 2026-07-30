'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { gsap, useGSAP, FULL_MOTION } from '@/lib/motion/gsap'

interface MagneticButtonProps {
  href: string
  className?: string
  children: React.ReactNode
}

/**
 * Anchor that translates a few pixels toward the pointer (gsap.quickTo) and
 * springs back on leave. Internal hrefs render a next/link, everything else
 * (mailto, https) renders a plain anchor. Magnetism only on fine pointers
 * with full motion; otherwise it is a completely ordinary link.
 */
export function MagneticButton({ href, className, children }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const mm = gsap.matchMedia()

      mm.add({ fine: '(pointer: fine)', full: FULL_MOTION }, (ctx) => {
        const c = ctx.conditions as Record<string, boolean> | undefined
        if (!c?.fine || !c?.full) return

        const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })

        let centerX = 0
        let centerY = 0

        const onEnter = () => {
          const rect = el.getBoundingClientRect()
          centerX = rect.left + rect.width / 2
          centerY = rect.top + rect.height / 2
        }

        const onMove = (e: PointerEvent) => {
          xTo(gsap.utils.clamp(-10, 10, (e.clientX - centerX) * 0.3))
          yTo(gsap.utils.clamp(-8, 8, (e.clientY - centerY) * 0.3))
        }

        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' })
        }

        el.addEventListener('pointerenter', onEnter)
        el.addEventListener('pointermove', onMove, { passive: true })
        el.addEventListener('pointerleave', onLeave)

        return () => {
          el.removeEventListener('pointerenter', onEnter)
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        }
      })

      return () => mm.revert()
    },
    { scope: ref }
  )

  if (href.startsWith('/')) {
    return (
      <Link ref={ref} href={href} className={className}>
        {children}
      </Link>
    )
  }

  const isExternal = href.startsWith('http')
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

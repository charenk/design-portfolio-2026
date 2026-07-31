'use client'

import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import {
  gsap,
  Flip,
  ScrollTrigger,
  prefersReducedMotion,
} from '@/lib/motion/gsap'
import { useMode, type PortfolioMode } from '@/components/mode/ModeProvider'

import { CursorFollower } from '@/components/directions/tactile/CursorFollower'
import { TactileNav } from '@/components/directions/tactile/TactileNav'
import { StickerHero } from '@/components/directions/tactile/StickerHero'
import { CardBoard } from '@/components/directions/tactile/CardBoard'
import { ShippedShelf } from '@/components/directions/tactile/ShippedShelf'
import { AboutNote } from '@/components/directions/tactile/AboutNote'
import { ExperimentsCorner } from '@/components/directions/tactile/ExperimentsCorner'
import { TapeFooter } from '@/components/directions/tactile/TapeFooter'

import { KineticNav } from '@/components/directions/kinetic/KineticNav'
import { Hero } from '@/components/directions/kinetic/Hero'
import { Marquee } from '@/components/directions/kinetic/Marquee'
import { WorkIndex } from '@/components/directions/kinetic/WorkIndex'
import { ExperimentsIndex } from '@/components/directions/kinetic/ExperimentsIndex'
import { AboutFooter } from '@/components/directions/kinetic/AboutFooter'

/**
 * The merged homepage: one route, two presentations of the same content.
 * "see" is the tactile desk (default), "read" the editorial index. Both trees
 * stay mounted; the toggle hides one and Flip-morphs the project imagery
 * (matched by data-flip-id) between polaroids and index thumbnails while the
 * rest of the incoming layout rises in. Mode state lives in the sitewide
 * ModeProvider; this page registers the morph as its transition handler.
 */
export function HomeExperience() {
  const { mode, setMode, registerTransition } = useMode()
  const rootRef = useRef<HTMLDivElement>(null)
  const morphing = useRef(false)

  const runMorph = (next: PortfolioMode, apply: () => void) => {
    if (morphing.current) return

    const root = rootRef.current
    if (!root || prefersReducedMotion()) {
      apply()
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return
    }

    morphing.current = true
    const state = Flip.getState(
      root.querySelectorAll('[data-flip-id]')
    )

    flushSync(() => apply())
    ScrollTrigger.refresh()

    const incoming = root.querySelector<HTMLElement>(
      next === 'see' ? '.hx-see' : '.hx-read'
    )

    if (incoming) {
      // The rest of the incoming layout rises in around the morphing cards.
      gsap.fromTo(
        incoming.querySelectorAll('main > *'),
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.05,
          delay: 0.2,
          clearProps: 'opacity,visibility,transform',
        }
      )
    }

    Flip.from(state, {
      targets: incoming
        ? incoming.querySelectorAll('[data-flip-id]')
        : undefined,
      duration: 0.85,
      ease: 'power3.inOut',
      absolute: true,
      fade: true,
      stagger: 0.025,
      onComplete: () => {
        morphing.current = false
        ScrollTrigger.refresh()
      },
    })
  }

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh())
    // runMorph reads only refs and DOM; stable across renders.
    return registerTransition(runMorph)
  }, [registerTransition])

  return (
    <div ref={rootRef} className="home-experience" data-mode={mode}>
      <div className="dir-tactile hx-see" hidden={mode !== 'see'}>
        <main className="tc-main" id="top">
          <CursorFollower />
          <TactileNav onModeChange={setMode} />
          <StickerHero />
          <CardBoard />
          <ShippedShelf />
          <AboutNote />
          <ExperimentsCorner />
          <TapeFooter />
        </main>
      </div>

      <div className="dir-kinetic hx-read" hidden={mode !== 'read'}>
        <main id="top-read">
          <KineticNav onModeChange={setMode} />
          <Hero />
          <Marquee />
          <WorkIndex />
          <ExperimentsIndex />
          <AboutFooter />
        </main>
      </div>
    </div>
  )
}

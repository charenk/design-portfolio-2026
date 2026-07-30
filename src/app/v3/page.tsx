'use client'

import { CursorFollower } from '@/components/directions/tactile/CursorFollower'
import { TactileNav } from '@/components/directions/tactile/TactileNav'
import { StickerHero } from '@/components/directions/tactile/StickerHero'
import { CardBoard } from '@/components/directions/tactile/CardBoard'
import { ShippedShelf } from '@/components/directions/tactile/ShippedShelf'
import { AboutNote } from '@/components/directions/tactile/AboutNote'
import { ExperimentsCorner } from '@/components/directions/tactile/ExperimentsCorner'
import { TapeFooter } from '@/components/directions/tactile/TapeFooter'

/**
 * V3 Tactile Studio: a crafted desk-top take on the portfolio. Paper, tape,
 * stickers and physical motion, choreographed with GSAP only.
 */
export default function V3Page() {
  return (
    <main className="tc-main" id="top">
      <CursorFollower />
      <TactileNav />
      <StickerHero />
      <CardBoard />
      <ShippedShelf />
      <AboutNote />
      <ExperimentsCorner />
      <TapeFooter />
    </main>
  )
}

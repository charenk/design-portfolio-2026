'use client'

import { KineticNav } from '@/components/directions/kinetic/KineticNav'
import { Hero } from '@/components/directions/kinetic/Hero'
import { Marquee } from '@/components/directions/kinetic/Marquee'
import { WorkIndex } from '@/components/directions/kinetic/WorkIndex'
import { AboutFooter } from '@/components/directions/kinetic/AboutFooter'

/**
 * V1 Kinetic Editorial: typographically monumental, print-inspired homepage
 * prototype. Sections own their choreography; layout.tsx owns smooth scroll,
 * the display font and the direction switcher.
 */
export default function V1KineticEditorialPage() {
  return (
    <main id="top">
      <KineticNav />
      <Hero />
      <Marquee />
      <WorkIndex />
      <AboutFooter />
    </main>
  )
}

'use client'

import dynamic from 'next/dynamic'
import { TopBar } from '@/components/directions/command/TopBar'
import { Hero } from '@/components/directions/command/Hero'
import { WorkShowcase } from '@/components/directions/command/WorkShowcase'
import { CredentialsStrip } from '@/components/directions/command/CredentialsStrip'
import { CommandFooter } from '@/components/directions/command/Footer'

// The WebGL field loads client-side only. A static radial-gradient poster
// sits underneath at all times, so first paint (and no-WebGL) is pure DOM.
const SceneBackground = dynamic(
  () => import('@/components/directions/command/SceneBackground'),
  {
    ssr: false,
    loading: () => <div className="cmd-scene-poster" aria-hidden="true" />,
  }
)

export default function V2Page() {
  return (
    <main className="cmd-root">
      <div className="cmd-scene-poster" aria-hidden="true" />
      <SceneBackground />
      <div className="cmd-vignette" aria-hidden="true" />
      <div className="cmd-content">
        <TopBar />
        <Hero />
        <WorkShowcase />
        <CredentialsStrip />
        <CommandFooter />
      </div>
    </main>
  )
}

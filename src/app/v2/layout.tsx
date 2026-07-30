import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import { DirectionSwitcher } from '@/components/directions/DirectionSwitcher'
import './v2.css'

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  title: 'V2 Command Center',
  robots: { index: false, follow: false },
}

export default function V2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`dir-command ${plexMono.variable}`}>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
      <DirectionSwitcher />
    </div>
  )
}

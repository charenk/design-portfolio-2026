import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import { DirectionSwitcher } from '@/components/directions/DirectionSwitcher'
import { ModeArrival } from '@/components/directions/ModeSwitch'
import './v3.css'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'V3 Tactile Studio',
  robots: { index: false, follow: false },
}

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`dir-tactile ${caveat.variable}`}>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
      <ModeArrival mode="see" />
      <DirectionSwitcher />
    </div>
  )
}

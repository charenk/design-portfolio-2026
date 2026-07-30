import type { Metadata } from 'next'
import { Instrument_Serif } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import { DirectionSwitcher } from '@/components/directions/DirectionSwitcher'
import { ModeArrival } from '@/components/directions/ModeSwitch'
import './v1.css'

/**
 * Display voice for the Kinetic Editorial direction. Route-scoped: the
 * variable only exists inside the .dir-kinetic wrapper below.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'V1 Kinetic Editorial',
  robots: { index: false, follow: false },
}

export default function V1Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`dir-kinetic ${instrumentSerif.variable}`}>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
      <ModeArrival mode="read" />
      <DirectionSwitcher />
    </div>
  )
}

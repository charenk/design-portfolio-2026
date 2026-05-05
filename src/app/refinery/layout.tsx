import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Refinery case study | Charen',
  description:
    'A local AI investment observatory. Nine coordinated agents watch a personal TFSA portfolio overnight, scan for setups, and deliver a morning brief before market open. Observation only, no trades.',
  openGraph: {
    title: 'The Refinery case study | Charen',
    description:
      'Solo experiment with multi-agent AI to monitor TFSA holdings. Pixel-art Severance-style dashboard, Sonnet plus Haiku with prompt caching, under fifteen cents a day.',
  },
  robots: { index: false, follow: false },
}

export default function RefineryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cybersecurity tooling at BlackBerry | Charen',
  description:
    'Designing analyst surfaces for CylancePROTECT and CylanceGATEWAY. Cyber Attack Map, widget discovery, and a research practice that outlasted the tenure.',
  openGraph: {
    title: 'Cybersecurity tooling at BlackBerry | Charen',
    description:
      'Designing for SOC analysts on the Cylance suite. Two products, two projects, one research practice.',
  },
  robots: { index: false, follow: false },
}

export default function BlackberryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

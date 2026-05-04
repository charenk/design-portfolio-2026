import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Copilot tenant assessment | Charen',
  description:
    'Designing a Copilot readiness assessment for ShareGate Protect. Gap-led dashboard, source-traceable metrics, and a journey-based positioning that consultants return to.',
  openGraph: {
    title: 'Copilot tenant assessment | Charen',
    description:
      'A readiness check that audits an organization\'s data governance posture before Copilot is enabled.',
  },
  robots: { index: false, follow: false },
}

export default function CopilotLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

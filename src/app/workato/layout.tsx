import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workato case study | Charen',
  description:
    'Designing the integration platform experience at Workato.',
  openGraph: {
    title: 'Workato case study | Charen',
    description:
      'Designing the integration platform experience at Workato.',
  },
  robots: { index: false, follow: false },
}

export default function WorkatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

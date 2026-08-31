import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work samples | Charen',
  description:
    'A theme-led tour of selected work across product, design, and engineering.',
  openGraph: {
    title: 'Work samples | Charen',
    description:
      'A theme-led tour of selected work across product, design, and engineering.',
  },
  robots: { index: false, follow: false },
}

export default function CustomDeckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

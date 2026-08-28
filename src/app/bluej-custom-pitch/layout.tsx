import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work samples for Blue J | Charen',
  description:
    'A theme-led tour of my work, prepared for the Blue J senior product designer role.',
  openGraph: {
    title: 'Work samples for Blue J | Charen',
    description:
      'A theme-led tour of my work, prepared for the Blue J senior product designer role.',
  },
  robots: { index: false, follow: false },
}

export default function BlueJLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Figma Buddy case study | Charen',
  description:
    'An experiment that brings AI design feedback into Figma comments. @buddy a frame, get structured critique without leaving the canvas.',
  openGraph: {
    title: 'Figma Buddy case study | Charen',
    description:
      'AI design feedback directly inside Figma, via @buddy comments.',
  },
  robots: { index: false, follow: false },
}

export default function FigmaBuddyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

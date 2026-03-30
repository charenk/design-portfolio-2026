import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Charen',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browser extension case study | Charen',
  description:
    'A CyberQP browser extension that puts Just-in-time account access where the sign-in actually happens.',
  openGraph: {
    title: 'Browser extension case study | Charen',
    description:
      'Just-in-time PAM access surfaced inside the sign-in page.',
  },
  robots: { index: false, follow: false },
}

export default function BrowserExtensionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

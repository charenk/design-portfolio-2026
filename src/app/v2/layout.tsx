import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import './v2.css'

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  title: 'V2 Command Center',
  robots: { index: false, follow: false },
}

/**
 * Archived direction prototype, kept for reference. Lenis comes from the
 * root layout now.
 */
export default function V2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={`dir-command ${plexMono.variable}`}>{children}</div>
}

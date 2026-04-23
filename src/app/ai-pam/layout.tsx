import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI-Pam case study | Charen',
  description:
    'Designing an AI terminal for privileged access management at CyberQP. Human-in-the-loop gates, intent-aware automation, compliance-safe defaults.',
  openGraph: {
    title: 'AI-Pam case study | Charen',
    description:
      'Designing an AI terminal for privileged access management at CyberQP.',
  },
  robots: { index: false, follow: false },
}

export default function AiPamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Portfolio — Charen',
  robots: {
    index: false,
    follow: false,
  },
}

const caseStudies = [
  {
    title: 'AI-powered privileged access management',
    description: 'Shaping an intent-driven PAM platform for MSP and enterprise environments at CyberQP.',
    href: '/ai-pam',
    tag: 'Enterprise SaaS · Identity',
  },
  {
    title: 'Workato — Integration platform',
    description: 'Product design across PAM, QTech, Mobile, and B2B use cases.',
    href: '/workato',
    tag: 'Enterprise · Integrations',
  },
  {
    title: 'Browser extension',
    description: 'Designing a browser-based workflow tool to reduce context-switching for technical users.',
    href: '/browser-extension',
    tag: 'Productivity · Extension',
  },
  {
    title: 'Figma Buddy — AI design feedback',
    description: 'Explored AI-generated design critique posted directly into Figma comments using OpenAI.',
    href: '/figma-buddy',
    tag: 'Experiment · AI',
  },
]

export default function PortfolioPage() {
  return (
    <div className="pageBackground">
      <Navbar activePage="works" />

      <main className="px-8 md:px-[50px] pt-[200px] pb-[80px]">
        <div className="max-w-main-content mx-auto pl-4">

          {/* Header */}
          <div className="mb-[80px] pr-0 md:pr-[200px]">
            <p className="font-sans text-[13px] font-medium tracking-widest uppercase text-[#9e9e9e] mb-6">
              Selected work
            </p>
            <h1 className="font-serif font-light text-[40px] md:text-[52px] leading-tight">
              Work I can walk you through
            </h1>
          </div>

          {/* Case study list */}
          <div className="flex flex-col divide-y divide-[#e4e4e4]">
            {caseStudies.map((study) => (
              <Link
                key={study.href}
                href={study.href}
                className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-[50px] py-[40px] no-underline hover:opacity-70 transition-opacity"
              >
                <div className="flex-1">
                  <p className="font-sans text-[11px] font-medium tracking-widest uppercase text-[#9e9e9e] mb-3">
                    {study.tag}
                  </p>
                  <h2 className="font-serif font-light text-[28px] md:text-[32px] leading-tight text-[#1a1a1a] mb-3">
                    {study.title}
                  </h2>
                  <p className="font-sans text-[15px] leading-relaxed text-[#6b6b6b]">
                    {study.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1 font-sans text-[13px] font-medium text-[#1a1a1a] group-hover:gap-2 transition-all">
                    View case study
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

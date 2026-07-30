"use client"

import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { ProjectCard, type ProjectCardProps } from '@/components/ui/ProjectCard'
import { useGridFade } from '@/lib/hooks/useGridFade'
import { getProject, type Project } from '@/data/projects'

// Default size tokens for the portfolio scrapbook layout.
// Tweak these to scale every small/large card together.
const SMALL_WIDTH = 'w-[33%]'
const LARGE_WIDTH = 'w-[62%]'

// Per-card presentation for the scrapbook grid: aspect ratio + rotation.
const CARD_STYLES: Record<string, { aspect: string; rotate: string }> = {
  'browser-extension': { aspect: 'aspect-[16/9]', rotate: '-rotate-[1deg]' },
  'ai-pam': { aspect: 'aspect-[16/10]', rotate: 'rotate-[1deg]' },
  onboarding: { aspect: 'aspect-[16/10]', rotate: '-rotate-[1deg]' },
  refinery: { aspect: 'aspect-[5/4]', rotate: 'rotate-[1.5deg]' },
  blackberry: { aspect: 'aspect-[4/3]', rotate: 'rotate-[1deg]' },
  copilot: { aspect: 'aspect-[16/10]', rotate: '-rotate-[1.5deg]' },
}

function toCardProps(project: Project): ProjectCardProps {
  const style = CARD_STYLES[project.slug]
  return {
    title: project.title,
    tags: project.tags,
    href: project.href,
    badge: project.badge,
    aspect: style.aspect,
    placeholder: project.placeholder,
    rotate: style.rotate,
    svgSrc: project.bannerImage,
    imageFit: project.imageFit,
  }
}

export default function PortfolioPage() {
  const pageBackgroundRef = useGridFade({ hideAfter: null })

  const browserExt = toCardProps(getProject('browser-extension')!)
  const aiPam = toCardProps(getProject('ai-pam')!)
  const onboarding = toCardProps(getProject('onboarding')!)
  const refinery = toCardProps(getProject('refinery')!)
  const placeholderSmall = toCardProps(getProject('blackberry')!)
  const placeholderLarge = toCardProps(getProject('copilot')!)

  return (
    <div className="pageBackground" ref={pageBackgroundRef}>
      <Navbar activePage="works" />

      <main className="px-5 md:px-12 pt-[120px] md:pt-[160px] pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="mb-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] text-white font-sans text-[14px] font-medium hover:bg-black transition-colors mb-6"
              aria-label="Back to home"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <h1 className="font-serif font-light text-[40px] md:text-[52px] text-[#1a1a1a] leading-tight">
              Selected works
            </h1>
          </div>

          {/* Desktop: scrapbook with two rows of mismatched sizes */}
          <div className="hidden md:block">
            {/* Row 1 — small left + large right */}
            <div className="flex justify-between items-start">
              <div className={`${SMALL_WIDTH} mt-56`}>
                <ProjectCard {...browserExt} />
              </div>
              <div className={LARGE_WIDTH}>
                <ProjectCard {...aiPam} />
              </div>
            </div>

            {/* Row 2 — large left + small right (sizes reversed) */}
            <div className="flex justify-between items-start mt-[102px]">
              <div className={LARGE_WIDTH}>
                <ProjectCard {...onboarding} />
              </div>
              <div className={`${SMALL_WIDTH} mt-[126px]`}>
                <ProjectCard {...refinery} />
              </div>
            </div>

            {/* Row 3 — small left + large right (matches row 1 pattern) */}
            <div className="flex justify-between items-start mt-[102px]">
              <div className={`${SMALL_WIDTH} mt-56`}>
                <ProjectCard {...placeholderSmall} />
              </div>
              <div className={LARGE_WIDTH}>
                <ProjectCard {...placeholderLarge} />
              </div>
            </div>
          </div>

          {/* Mobile: single column stack, heroes first */}
          <div className="flex flex-col gap-6 md:hidden">
            <ProjectCard {...aiPam} />
            <ProjectCard {...onboarding} />
            <ProjectCard {...placeholderLarge} />
            <ProjectCard {...browserExt} />
            <ProjectCard {...refinery} />
            <ProjectCard {...placeholderSmall} />
          </div>

        </div>

        {/* Want to build something together? CTA */}
        <section className="max-w-[880px] mx-auto mt-32 md:mt-48">
          <div className="relative bg-white rounded-[24px] shadow-sm px-7 py-10 md:px-16 md:py-16">
            {/* Tape: top-left */}
            <span
              aria-hidden="true"
              className="absolute -top-2.5 left-8 md:left-12 w-[90px] md:w-[102px] h-[22px] md:h-[28px] bg-[#f7e08e]/90 rotate-[-6deg] shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
            />
            {/* Tape: bottom-right */}
            <span
              aria-hidden="true"
              className="absolute -bottom-2.5 right-8 md:right-12 w-[90px] md:w-[102px] h-[22px] md:h-[28px] bg-[#f7e08e]/90 rotate-[-6deg] shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
            />

            <h2 className="font-sans font-bold text-[26px] md:text-[36px] text-[#1a1a1a] leading-tight">
              Want to build something together?
            </h2>
            <p className="font-sans text-[13px] md:text-[15px] text-[#7a7a7a] mt-3 max-w-[520px]">
              If you have an idea worth shipping, I&apos;d love to hear from you.
            </p>
            <a
              href="mailto:charen@gmail.com"
              className="inline-flex items-center gap-2 mt-7 md:mt-8 px-5 py-3 rounded-full bg-[#1a1a1a] text-white font-sans text-[13px] font-medium hover:bg-black transition-colors"
            >
              Get in touch
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Bottom credit — pinned near page bottom */}
        <div className="text-center mt-40 md:mt-56 px-5">
          <p className="font-sans text-[15px] font-bold text-[#1a1a1a]">Designed by Charen, built using Claude</p>
        </div>
      </main>
    </div>
  )
}

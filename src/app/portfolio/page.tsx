"use client"

import { useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProjectCard, type ProjectCardProps } from '@/components/ui/ProjectCard'

export default function PortfolioPage() {
  const [gridOpacity, setGridOpacity] = useState(1)
  const pageBackgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateGridOpacity = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const maxScroll = docHeight - viewportHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0

      let opacity = 1
      if (progress <= 0.30) {
        const fadeProgress = progress / 0.30
        const easedProgress = 1 - Math.pow(1 - fadeProgress, 3)
        opacity = 1 - easedProgress
      } else {
        opacity = 0
      }

      opacity = Math.max(0, Math.min(1, opacity))
      setGridOpacity(opacity)
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateGridOpacity()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    updateGridOpacity()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (pageBackgroundRef.current) {
      pageBackgroundRef.current.style.setProperty('--gridOpacity', String(gridOpacity))
    }
  }, [gridOpacity])

  // Zone A: Workato (secondary left) + AI PAM (hero right)
  const workato: ProjectCardProps = {
    title: 'Workato: Integration platform',
    tags: 'Enterprise · Integrations',
    href: '/workato',
    badge: 'Workato',
    aspect: 'aspect-[4/3]',
    placeholder: '#ddeedd',
    rotate: '-rotate-[2deg]',
  }

  const aiPam: ProjectCardProps = {
    title: 'AI-powered privileged access management',
    tags: 'Enterprise SaaS · Identity',
    href: '/ai-pam',
    badge: 'CyberQP',
    aspect: 'aspect-[16/10]',
    placeholder: '#dde4ed',
    rotate: 'rotate-[1deg]',
  }

  const browserExt: ProjectCardProps = {
    title: 'CyberQP Browser Extension',
    tags: 'Vault, Just in Time accounts',
    href: '/browser-extension',
    aspect: 'aspect-[16/9]',
    placeholder: '#e8dded',
    rotate: '-rotate-[1deg]',
  }

  const figmaBuddy: ProjectCardProps = {
    title: 'Figma Buddy: AI design feedback',
    tags: 'Experiment · AI',
    href: '/figma-buddy',
    badge: 'Solo project',
    aspect: 'aspect-[5/4]',
    placeholder: '#edeadd',
    rotate: 'rotate-[1.5deg]',
  }

  return (
    <div className="pageBackground" ref={pageBackgroundRef}>
      <Navbar activePage="works" />

      <main className="px-5 md:px-12 pt-[120px] md:pt-[160px] pb-[140px]">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="mb-14">
            <h1 className="font-serif font-light text-[40px] md:text-[52px] text-[#1a1a1a] leading-tight">
              My latest work
            </h1>
            <p className="font-sans text-[16px] text-[#9e9e9e] mt-2">
              from 2024 'til today
            </p>
          </div>

          {/* Desktop: hero anchors top-right, left col pushed down */}
          <div className="hidden md:flex gap-16 items-start">
            {/* Left column — narrower col makes Workato ~60% smaller */}
            <div className="flex flex-col gap-32 w-[22%] mt-56">
              <ProjectCard {...workato} />
              <ProjectCard {...browserExt} />
            </div>
            {/* Right column — hero flush at top-right */}
            <div className="flex flex-col gap-20 flex-1">
              <ProjectCard {...aiPam} />
              <ProjectCard {...figmaBuddy} />
            </div>
          </div>

          {/* Mobile: single column stack, hero first */}
          <div className="flex flex-col gap-6 md:hidden">
            <ProjectCard {...aiPam} />
            <ProjectCard {...workato} />
            <ProjectCard {...browserExt} />
            <ProjectCard {...figmaBuddy} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

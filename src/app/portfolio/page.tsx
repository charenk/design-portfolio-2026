"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

interface ProjectCard {
  title: string
  tags: string
  href: string
  badge?: string
  aspect: string
  placeholder: string
  rotate?: string
}

function Card({ title, tags, href, badge, aspect, placeholder, rotate }: ProjectCard) {
  return (
    <Link href={href} className={`group block no-underline ${rotate ?? ''}`}>
      {/* Image area */}
      <div
        className={`w-full ${aspect} rounded-[14px] overflow-hidden shadow-sm relative
                    transition-transform duration-[220ms] group-hover:scale-[1.02]`}
        style={{ backgroundColor: placeholder }}
      >
        <div className="absolute inset-0" />
        {badge && (
          <span className="absolute bottom-3 right-3 bg-black/10 text-[#1a1a1a]
                           text-[11px] font-medium px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Title + tags */}
      <div className="mt-3 px-1">
        <p className="font-sans text-[15px] font-semibold text-[#1a1a1a]
                       inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-[220ms]">
          {title}
          <span aria-hidden="true">→</span>
        </p>
        <p className="font-sans text-[12px] text-[#9e9e9e] mt-1">{tags}</p>
      </div>
    </Link>
  )
}

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
  const workato: ProjectCard = {
    title: 'Workato — Integration platform',
    tags: 'Enterprise · Integrations',
    href: '/workato',
    badge: 'Workato',
    aspect: 'aspect-square',
    placeholder: '#ddeedd',
    rotate: '-rotate-[2deg]',
  }

  const aiPam: ProjectCard = {
    title: 'AI-powered privileged access management',
    tags: 'Enterprise SaaS · Identity',
    href: '/ai-pam',
    badge: 'CyberQP',
    aspect: 'aspect-[16/10]',
    placeholder: '#dde4ed',
    rotate: 'rotate-[1deg]',
  }

  const browserExt: ProjectCard = {
    title: 'Browser extension',
    tags: 'Productivity · Extension',
    href: '/browser-extension',
    aspect: 'aspect-[16/9]',
    placeholder: '#e8dded',
    rotate: '-rotate-[1deg]',
  }

  const figmaBuddy: ProjectCard = {
    title: 'Figma Buddy — AI design feedback',
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

      <main className="px-5 md:px-12 pt-[120px] md:pt-[160px] pb-[100px]">
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
              <Card {...workato} />
              <Card {...browserExt} />
            </div>
            {/* Right column — hero flush at top-right */}
            <div className="flex flex-col gap-20 w-[62%]">
              <Card {...aiPam} />
              <Card {...figmaBuddy} />
            </div>
          </div>

          {/* Mobile: single column stack, hero first */}
          <div className="flex flex-col gap-6 md:hidden">
            <Card {...aiPam} />
            <Card {...workato} />
            <Card {...browserExt} />
            <Card {...figmaBuddy} />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

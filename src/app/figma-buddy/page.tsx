"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function FigmaBuddyPage() {
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

      if (progress > 0.85) {
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

  return (
    <div className="pageBackground" ref={pageBackgroundRef}>
      <Navbar activePage="works" />

      <main className="px-8 md:px-[50px] pt-[200px] pb-[80px]">
        <div className="max-w-main-content mx-auto pl-4">

          {/* Back Button */}
          <Link
            href="/#experiments"
            className="inline-flex items-center gap-1 mb-[50px] bg-black text-white px-[10px] py-[5px] font-serif text-caption no-underline hover:opacity-80 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          {/* Hero Title */}
          <h1 className="font-serif font-light text-[40px] md:text-[52px] leading-tight mb-[50px] pr-0 md:pr-[100px]">
            Figma Buddy brings AI-generated design feedback directly into Figma comments using OpenAI.
          </h1>

          {/* Overview: two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[50px] mb-[50px]">

            {/* Left: description */}
            <div>
              <p className="text-body font-serif mb-[30px]">
                Design feedback loops in Figma often rely on screenshots, back-and-forth messages, and manual note-taking — slowing down iteration cycles.
              </p>
              <p className="text-body font-serif">
                Figma Buddy is a plugin that uses OpenAI to analyse the selected frame and post contextual, structured feedback as a Figma comment — reducing the overhead of screenshot-based review workflows.
              </p>
            </div>

            {/* Right: role + results */}
            <div>
              <div className="mb-[30px]">
                <p className="text-caption font-serif text-[#9e9e9e] mb-3 uppercase tracking-widest">My role</p>
                <p className="text-body font-serif">Solo designer &amp; developer</p>
                <p className="text-body font-serif">Concept, prototyping, Figma plugin development</p>
              </div>
              <div>
                <p className="text-caption font-serif text-[#9e9e9e] mb-3 uppercase tracking-widest">Results</p>
                <p className="text-body font-serif">Reduced screenshot-based feedback workflows</p>
                <p className="text-body font-serif">AI-generated insights posted inline in Figma</p>
                <p className="text-body font-serif">Faster design review iteration cycles</p>
              </div>
            </div>
          </div>

          {/* Full-width Banner — image/video placeholder */}
          <div className="w-full bg-[#C4C4C4] aspect-[16/9] rounded-lg mb-[50px]">
            {/* Replace with <video> or <Image> when ready */}
          </div>

          {/* Content Section: left text + right images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[50px] mb-[50px]">

            {/* Left: body copy */}
            <div>
              <h2 className="text-h1 font-serif font-light mb-[30px]">
                For a designer, anything related to async feedback seems fragmented and slow.
              </h2>
              <p className="text-body font-serif mb-[30px]">
                The truth is that most designers spend more time chasing feedback than acting on it. Figma Buddy automates the first pass — giving reviewers a structured starting point without leaving the design file.
              </p>
              <p className="text-body font-serif">
                The plugin sends the selected frame to OpenAI, which returns structured critique covering layout, hierarchy, and accessibility, then posts it as a Figma comment thread — no copy-paste, no screenshots.
              </p>
            </div>

            {/* Right: stacked image placeholders */}
            <div className="flex flex-col gap-[20px]">
              <div className="w-full bg-[#C4C4C4] aspect-[4/3] rounded-lg" />
              <div className="w-full bg-[#C4C4C4] aspect-[4/3] rounded-lg" />
            </div>
          </div>

          {/* Bottom back link */}
          <Link
            href="/#experiments"
            className="inline-flex items-center gap-1 text-black font-serif text-caption no-underline hover:opacity-70 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Experiments
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  )
}

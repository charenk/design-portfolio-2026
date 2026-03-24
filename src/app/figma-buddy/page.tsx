"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function FigmaBuddyPage() {
  const [gridOpacity, setGridOpacity] = useState(1)
  const [videoActive, setVideoActive] = useState(false)
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

          {/* Title */}
          <h1 className="font-serif font-light text-[40px] md:text-[52px] leading-tight mb-[50px] pr-0 md:pr-[100px]">
            Building AI feedback flow via Figma comments
          </h1>

          {/* Video — thumbnail with play button, swaps to inline embed on click */}
          <div
            className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-[50px] relative bg-black cursor-pointer"
            onClick={() => setVideoActive(true)}
          >
            {!videoActive ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://img.youtube.com/vi/J0Z9t416FEY/maxresdefault.jpg"
                  alt="Figma Buddy demo video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/J0Z9t416FEY?autoplay=1"
                title="Figma Buddy demo"
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Content — Overview + Project Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[80px] mb-[80px]">

            {/* Left: Overview text */}
            <div>
              <h2 className="text-h1 font-serif font-light mb-[30px]">Overview</h2>
              <p className="font-serif text-[17px] leading-relaxed mb-[24px]">
                Designers often step out of Figma to get AI feedback, pasting images into ChatGPT or other tools for critique. While this works, it disrupts their creative flow and separates design from reflection.
              </p>
              <p className="font-serif text-[17px] leading-relaxed mb-[24px]">
                Figma Buddy explores how AI can exist <em>inside</em> the design process rather than outside it. By allowing users to comment <strong>@buddy</strong> within Figma, designers can receive contextual feedback on hierarchy, typography, layout, and usability without leaving their workspace.
              </p>
              <p className="font-serif text-[17px] leading-relaxed">
                This project began as a proof of concept to test how AI can understand frame context, interpret visual data, and provide structured, conversational design critique directly in Figma comments.
              </p>
            </div>

            {/* Right: Project Stack */}
            <div>
              <p className="text-caption font-serif text-[#9e9e9e] mb-[20px] uppercase tracking-widest">Project stack</p>
              <ul className="space-y-[14px] list-none p-0 m-0">
                <li className="font-serif text-[17px] leading-relaxed">
                  <strong>OpenAI API</strong> for generating contextual design feedback
                </li>
                <li className="font-serif text-[17px] leading-relaxed">
                  <strong>Supabase</strong> for authentication, data storage, and activity logging
                </li>
                <li className="font-serif text-[17px] leading-relaxed">
                  <strong>Vercel</strong> for app hosting and deployment
                </li>
                <li className="font-serif text-[17px] leading-relaxed">
                  <strong>Cursor IDE</strong> for development and rapid iteration
                </li>
                <li className="font-serif text-[17px] leading-relaxed">
                  <strong>GitHub</strong> for version control and public collaboration
                </li>
              </ul>
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

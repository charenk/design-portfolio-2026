"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'

export default function BrowserExtensionCaseStudy() {
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

      <main className="px-8 md:px-[50px] pt-[200px] md:pt-[200px] pb-[80px]">
        <div className="max-w-main-content mx-auto">
          {/* Back Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 mb-[50px] bg-black text-white px-[10px] py-[5px] font-serif text-caption no-underline hover:opacity-80 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </Link>

          {/* Case Study Title */}
          <h2 className="text-h1 font-serif font-light text-accent-magenta mb-[50px]">
            Browser extension for Just-in-time account access
          </h2>

          {/* Overview Section - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[62px] mb-[50px]">
            {/* Column 1: Problem, Strategy, Solution */}
            <div className="md:col-span-1 flex flex-col gap-[23px]">
              <div>
                <h3 className="text-body font-serif mb-2">Problem:</h3>
                <p className="text-body font-serif">Lorem ipsum problem</p>
              </div>
              <div>
                <h3 className="text-body font-serif mb-2">Strategy:</h3>
                <p className="text-body font-serif">Lorem ipsum strategy</p>
              </div>
              <div>
                <h3 className="text-body font-serif mb-2">Solution elements:</h3>
                <p className="text-body font-serif">Lorem ipsum solution elements</p>
              </div>
            </div>

            {/* Column 2: Role, Scope & Team */}
            <div className="md:col-span-1 flex flex-col gap-[19px]">
              <div>
                <h3 className="text-body font-serif mb-2">Role:</h3>
                <p className="text-body font-serif">Lead designer</p>
              </div>
              <div>
                <h3 className="text-body font-serif mb-2">Scope:</h3>
                <p className="text-body font-serif">Platform-level design across AI-assisted PAM workflows</p>
              </div>
              <div>
                <h3 className="text-body font-serif mb-2">Team:</h3>
                <p className="text-body font-serif">
                  Product Manager, 4 Engineers, 1 Designer
                </p>
              </div>
            </div>
          </div>

          {/* Project Image Placeholder */}
          <div className="w-full bg-[#C4C4C4] aspect-[16/9] rounded mb-[50px]">
            {/* Placeholder for project image */}
          </div>

          {/* Disclaimer Section */}
          <div className="border-t border-divider-grey pt-[30px] pb-[30px] mb-[50px]">
            <div className="pr-0 md:pr-[120px] flex flex-col gap-[12px] mb-[48px]">
              <p className="text-body font-serif">
                Due to the sensitive and competitive nature of this work, detailed flows, data models, and system logic are intentionally omitted from this public case study.
              </p>
              <p className="text-body font-serif">
                I&apos;m happy to walk through deeper rationale, tradeoffs, and system-level decisions behind this work in conversation.
              </p>
            </div>

            {/* Back to Projects Link */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1 text-black font-serif text-caption no-underline hover:opacity-70 transition-opacity"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to projects
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 md:px-[50px] pb-[80px]">
        <div className="max-w-content mx-auto">
          {/* Footer Links */}
          <div className="border-t border-divider-grey pt-[30px] pb-[150px] flex gap-[19px] text-h1 font-serif font-light">
            <a href="mailto:charen@gmail.com" className="link-underline text-accent-magenta">Email</a>
            <a href="https://www.linkedin.com/in/charenk/" target="_blank" rel="noopener noreferrer" className="link-underline text-accent-blue">LinkedIn</a>
          </div>

          {/* Copyright */}
          <p className="text-h1 font-serif font-light">&copy; Charen</p>
        </div>
      </footer>
    </div>
  )
}

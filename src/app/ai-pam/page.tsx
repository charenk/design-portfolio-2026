"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'

export default function AiPamCaseStudy() {
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
            href="/"
            className="inline-flex items-center gap-1 mb-[50px] bg-black text-white px-[10px] py-[5px] font-serif text-caption no-underline hover:opacity-80 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </Link>

          {/* Case Study Title */}
          <h2 className="text-h1 font-serif font-light text-accent-yellow mb-[50px]">
            AI power privileged access management solution
          </h2>

          {/* Overview Section - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[50px] mb-[50px]">
            {/* Column 1: Project Description */}
            <div className="md:col-span-1">
              <p className="text-body font-serif mb-[30px]">
                CyberQP is transforming from a policy-driven PAM model to an intent-driven, AI-powered privileged access platform.
              </p>
              <p className="text-body font-serif mb-[30px]">
                This shift is driven by growing operational complexity across MSP and enterprise environments, where static policies no longer scale with the speed, volume, and risk of modern identity workflows.
              </p>
              <p className="text-body font-serif">
                The work focuses on reducing cognitive load for technicians while improving security posture across human and non-human identities through AI-assisted decisioning and remediation.
              </p>
            </div>

            {/* Column 2: Role, Scope & Team */}
            <div className="md:col-span-1">
              <div className="mb-[30px]">
                <h3 className="text-body font-serif mb-2">Role:</h3>
                <p className="text-body font-serif">Lead designer</p>
              </div>
              <div className="mb-[30px]">
                <h3 className="text-body font-serif mb-2">Scope:</h3>
                <p className="text-body font-serif">Platform-level design across AI-assisted PAM workflows</p>
              </div>
              <div>
                <h3 className="text-body font-serif mb-2">Team:</h3>
                <p className="text-body font-serif">
                  Director of Product, 2 cross-functional product squads, security and engineering partners
                </p>
              </div>
            </div>
          </div>

          {/* Project Image Placeholder */}
          <div className="w-full bg-[#C4C4C4] aspect-[16/9] rounded mb-[50px]">
            {/* Placeholder for project image */}
          </div>

          {/* Disclaimer Text */}
          <div className="pr-0 md:pr-[120px] mb-[50px]">
            <p className="text-body font-serif mb-[30px]">
              Due to the sensitive and competitive nature of this work, detailed flows, data models, and system logic are intentionally omitted from this public case study.
            </p>
            <p className="text-body font-serif">
              I&apos;m happy to walk through deeper rationale, tradeoffs, and system-level decisions behind this work in conversation.
            </p>
          </div>

          {/* Back to Projects Link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1 mb-[50px] text-black font-serif text-caption no-underline hover:opacity-70 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Projects
          </Link>
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

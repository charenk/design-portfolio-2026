"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
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
      <Navbar activePage="home" />

      <main className="px-8 md:px-[50px] pt-[200px] md:pt-[200px]">
        <div className="max-w-main-content mx-auto pl-4">
          {/* Hero Section */}
          <header className="pb-10 md:pb-[40px] pr-0 md:pr-[100px]" id="home">
            <p className="text-body font-serif mb-6 md:mb-[32px]">
              I design and lead product experiences for complex B2B systems, with a focus on identity, access, data and enterprise platforms.
            </p>
            <p className="text-body font-serif mb-6 md:mb-[32px]">
              Currently shaping <span className="gradient-text">AI-powered</span> privileged access management products at CyberQP.
            </p>
            <div className="previously-shipped">
              <p className="previously-shipped-label">Previously shipped at</p>
              <div className="previously-shipped-logos">
                <Image
                  src="/assets/sg-logo.png"
                  alt="ShareGate by Workleap"
                  className="previously-shipped-logo"
                  width={100}
                  height={36}
                />
                <Image
                  src="/assets/bb-logo.png"
                  alt="BlackBerry"
                  className="previously-shipped-logo"
                  width={100}
                  height={36}
                />
                <Image
                  src="/assets/deloitte.logo.png"
                  alt="Deloitte"
                  className="previously-shipped-logo"
                  width={100}
                  height={36}
                />
              </div>
            </div>
          </header>

          {/* Section Header (hidden for now) */}
          <h2 className="hidden text-h1 font-serif font-light text-accent-yellow mb-[30px]" id="projects">
            Recent works
          </h2>

          {/* Experiments Section */}
          <section className="experiments-section" id="experiments">
            <div className="experiments-container">
              {/* Left column: title + icon rail */}
              <div className="experiments-left">
                <h2 className="experiments-title">Experiments</h2>
                <div className="experiment-icon-rail" role="list">
                  <div className="experiment-icon-wrap">
                    <Image
                      src="/assets/icons/Figma.png"
                      alt="Figma"
                      className="experiment-icon"
                      width={36}
                      height={36}
                    />
                    <div className="experiment-tooltip">Design and prototyping tool for creating UI mockups and interactive designs</div>
                  </div>
                  <div className="experiment-icon-wrap">
                    <Image
                      src="/assets/icons/Claude code.png"
                      alt="Claude Code"
                      className="experiment-icon"
                      width={36}
                      height={36}
                    />
                    <div className="experiment-tooltip">AI-powered coding assistant for pair programming and code generation</div>
                  </div>
                  <div className="experiment-icon-wrap">
                    <Image
                      src="/assets/icons/Cursor AI.png"
                      alt="Cursor AI"
                      className="experiment-icon"
                      width={36}
                      height={36}
                    />
                    <div className="experiment-tooltip">AI-native code editor with intelligent autocomplete and refactoring</div>
                  </div>
                  <div className="experiment-icon-wrap">
                    <Image
                      src="/assets/icons/Supabase.png"
                      alt="Supabase"
                      className="experiment-icon"
                      width={36}
                      height={36}
                    />
                    <div className="experiment-tooltip">Open-source Firebase alternative for backend, database, and auth</div>
                  </div>
                  <div className="experiment-icon-wrap">
                    <Image
                      src="/assets/icons/Vercel.png"
                      alt="Vercel"
                      className="experiment-icon"
                      width={36}
                      height={36}
                    />
                    <div className="experiment-tooltip">Deployment platform for frontend frameworks with instant previews</div>
                  </div>
                </div>
              </div>

              {/* Right column: stacked cards */}
              <div className="experiments-body">
                {/* Experiment Card 1 */}
                <div className="experiment-item">
                  <p className="experiment-item-desc">Building a Figma workflow that brings contextual design feedback directly into comments.</p>
                  <div className="experiment-item-ctas">
                    <button type="button" className="experiment-pill-btn experiment-pill-demo">Demo Video</button>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="experiment-pill-btn experiment-pill-github">Github</a>
                  </div>
                </div>

                {/* Experiment Card 2 */}
                <div className="experiment-item">
                  <p className="experiment-item-desc">Building HabitSense, a finance product that helps users see hidden spending patterns and build better money habits.</p>
                  <div className="experiment-item-ctas">
                    <a href="mailto:charen@gmail.com" className="experiment-pill-btn experiment-pill-reach">Reach out</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WorkGallery } from '@/components/ui/WorkGallery'
import { useGridFade } from '@/lib/hooks/useGridFade'

export default function Home() {
  const pageBackgroundRef = useGridFade()

  return (
    <div className="pageBackground" ref={pageBackgroundRef}>
      <Navbar activePage="home" />

      <main className="px-5 md:px-[50px] pt-[120px] md:pt-[200px]">
        <div className="max-w-main-content mx-auto md:pl-4">
          {/* Hero Section */}
          <header className="pb-10 md:pb-[40px] pr-0 md:pr-[100px]" id="home">
            <p className="text-body font-serif mb-6 md:mb-[32px]">
              I design and lead product experiences for complex B2B systems, with a focus on identity, access, data and enterprise platforms.
            </p>
            <p className="text-body font-serif mb-6 md:mb-[32px]">
              Currently shaping <span className="gradient-text">AI-powered</span> privileged access management products at CyberQP.
            </p>
          </header>

          {/* Recent Work Section */}
          <section className="py-[60px]" id="projects">
            <div className="mb-[8px]">
              <h2 className="experiments-title text-accent-yellow">
                Recent work
              </h2>
            </div>

            <WorkGallery />

            {/* Previously shipped at */}
            <div className="flex flex-col items-center gap-5 mt-16">
              <p className="font-sans text-[15px] font-medium uppercase tracking-widest text-[#9e9e9e]">
                Previously shipped at
              </p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
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
          </section>

          {/* Experiments Section */}
          <section className="experiments-section" id="experiments">
            <div className="experiments-container">
              {/* Left column: title + icon rail */}
              <div className="experiments-left">
                <h2 className="experiments-title">Experiments</h2>
                <div className="experiment-icon-rail" role="list">
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
                      src="/assets/icons/Vercel.png"
                      alt="Vercel"
                      className="experiment-icon"
                      width={36}
                      height={36}
                    />
                    <div className="experiment-tooltip">Deployment platform for frontend frameworks with instant previews</div>
                  </div>
                </div>

                {/* Maken Lab nudge */}
                <p className="maken-lab-nudge">
                  <span className="maken-lab-nudge-dot" aria-hidden="true" />
                  Check out{' '}
                  <a
                    href="https://www.makenlab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="maken-lab-nudge-link"
                  >
                    Maken Lab
                  </a>
                  {' '}to learn more
                </p>
              </div>

              {/* Right column: stacked cards */}
              <div className="experiments-body">
                {/* Experiment Card 1 — Refinery */}
                <div className="experiment-item">
                  <p className="experiment-item-desc">Built Refinery, a team of 8 agents that scans my TFSA holdings twice a day and surfaces what&apos;s worth learning about. Open source, not a trading tool.</p>
                  <div className="experiment-item-ctas">
                    <Link href="/refinery" className="experiment-pill-btn experiment-pill-demo">View Demo</Link>
                    <a href="https://github.com/charenk/refinery" target="_blank" rel="noopener noreferrer" className="experiment-pill-btn experiment-pill-github">
                      Github
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Experiment Card 2 — Figma Buddy */}
                <div className="experiment-item">
                  <p className="experiment-item-desc">Explored improving Figma feedback with AI-generated insights in comments using OpenAI, reducing screenshot-based workflows.</p>
                  <div className="experiment-item-ctas">
                    <Link href="/figma-buddy" className="experiment-pill-btn experiment-pill-demo">View Demo</Link>
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

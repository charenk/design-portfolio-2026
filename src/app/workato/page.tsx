"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function WorkatoPage() {
  const [gridOpacity, setGridOpacity] = useState(1)
  const [activeTab, setActiveTab] = useState('pam')
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

  const tabs = [
    { id: 'pam', label: 'AI powered Privileged access management' },
    { id: 'qtech', label: 'QTech browser extension' },
    { id: 'mobile', label: 'Mobile apps' },
    { id: 'b2b', label: 'Other B2B works' },
  ]

  return (
    <div className="pageBackground" ref={pageBackgroundRef}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 nav-outer px-4 md:px-8 pt-6 pb-6 md:pt-8 md:pb-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-bar">
          <a href="#" className="nav-brand" aria-label="Charen">
            <Image
              src="/assets/54c56fab5e082cbde275ba7c32edb4d1f4b2ae6e.png"
              alt="Charen profile picture"
              className="nav-avatar"
              width={44}
              height={44}
              priority
            />
            <span className="nav-name">Charen</span>
          </a>

          <div className="hidden md:flex nav-links">
            <a href="#" className="nav-pill nav-pill-active" aria-current="page">Hello Workato team</a>
            <a
              href="https://www.charen.online"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-pill nav-pill-external"
              aria-label="Open public portfolio"
            >
              Public portfolio
              <svg className="nav-pill-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/charenk/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-pill nav-pill-external"
              aria-label="Open LinkedIn profile"
            >
              LinkedIn
              <svg className="nav-pill-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 md:px-[50px] pt-[200px] md:pt-[200px] min-h-screen">
        <div className="max-w-main-content mx-auto">
          <header className="workato-intro pr-0 md:pr-[100px]">
            <p className="text-body font-serif mb-[20px]">Thanks for taking time and looking into my work.</p>
            <p className="text-body font-serif mb-[40px]">Below you can find selected work samples that I have helped ship and am currently working on.</p>
          </header>

          {/* Tabs Navigation */}
          <div className="work-tabs mb-[60px]">
            <div className="tabs-list border-b border-[#e4e4e7] flex items-center gap-0" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-trigger ${activeTab === tab.id ? 'tab-active' : ''}`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content Panels */}
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-content ${activeTab !== tab.id ? 'hidden' : ''}`}
                id={`tab-${tab.id}`}
                role="tabpanel"
                aria-hidden={activeTab !== tab.id}
              >
                {/* Hero Image Placeholder */}
                <div className="pam-hero-image fade-in-up bg-white w-full h-[437px] rounded-lg mb-6"></div>

                {/* Project Info Grid */}
                <div className="pam-info-grid fade-in-up flex flex-wrap gap-y-10 gap-x-[18px] mb-6">
                  <div className="pam-info-section w-full md:w-[550px]">
                    <h3 className="font-semibold text-lg leading-7 mb-[3px]">Project title / Brief description</h3>
                    <p className="text-base leading-6">Scope description</p>
                  </div>
                  <div className="pam-info-section w-full md:w-[568px]">
                    <h3 className="font-semibold text-lg leading-7 mb-[3px]">Team</h3>
                    <p className="text-base leading-6">Scope description</p>
                  </div>
                  <div className="pam-role-description w-full max-w-[1136px]">
                    <p className="text-base leading-6">
                      In my role, I lorem ipsum.....The product touches several milestones for technicians. Below you will sneakpeak some of the value I help take shape participating in<br />
                      early → customer validation → road prioticiastion → working with engineering and cobuilding
                    </p>
                  </div>
                </div>

                {/* Feature Section 1 */}
                <div className="pam-feature fade-in-up flex flex-col md:flex-row gap-6 md:gap-[54px] mb-6">
                  <div className="pam-feature-content w-full md:w-[466px]">
                    <h3 className="font-semibold text-lg leading-7 mb-5">
                      {tab.id === 'pam' ? 'All new improved Discovery of Privileged identifiers' : 'Feature title 1'}
                    </h3>
                    <p className="text-base leading-6">Lorem ipsum text</p>
                  </div>
                  <div className="pam-feature-image bg-white w-full md:w-[618px] h-[369px] rounded-lg"></div>
                </div>

                {/* Feature Section 2 */}
                <div className="pam-feature fade-in-up flex flex-col md:flex-row gap-6 md:gap-[54px] mb-6">
                  <div className="pam-feature-content w-full md:w-[466px]">
                    <h3 className="font-semibold text-lg leading-7 mb-5">
                      {tab.id === 'pam' ? 'Credential Vault for managing Identities' : 'Feature title 2'}
                    </h3>
                    <p className="text-base leading-6">Lorem ipsum text</p>
                  </div>
                  <div className="pam-feature-image bg-white w-full md:w-[618px] h-[369px] rounded-lg"></div>
                </div>

                {/* Feature Section 3 */}
                <div className="pam-feature fade-in-up flex flex-col gap-5 mb-6">
                  <div className="pam-feature-content w-full md:w-[466px]">
                    <h3 className="font-semibold text-lg leading-7 mb-5">
                      {tab.id === 'pam' ? 'Design of AI Terminal and workflow engine' : 'Feature title 3'}
                    </h3>
                    <p className="text-base leading-6">Lorem ipsum text</p>
                  </div>
                  <div className="pam-feature-image bg-white w-full h-[369px] rounded-lg"></div>
                </div>

                {/* Footer Note */}
                <div className="pam-footer fade-in-up flex flex-col gap-8">
                  <hr className="border-t border-gray-300" />
                  <p className="text-base leading-6">Due to the nature of the project and I am not share more details publicly. Happy to dive deep into specific in person.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

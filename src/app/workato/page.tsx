"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export default function WorkatoPage() {
  const router = useRouter()
  const [gridOpacity, setGridOpacity] = useState(1)

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/portfolio')
    }
  }
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
      <Navbar activePage="workato" />

      {/* Main Content */}
      <main className="px-8 md:px-[50px] pt-[200px] md:pt-[200px] pb-[200px] min-h-screen">
        <div className="max-w-main-content mx-auto">

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1 mb-[50px] bg-black text-white px-[10px] py-[5px] font-serif text-caption hover:opacity-80 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <header className="workato-intro pr-0 md:pr-[100px]">
            <p className="text-[18px] leading-[1.52] font-serif mb-[20px]">Thanks for taking time and looking into my work.</p>
            <p className="text-[18px] leading-[1.52] font-serif mb-[40px]">Below you can find selected work samples that I have helped ship and am currently working on.</p>
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

          {/* Bottom back link */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1 text-black font-serif text-caption hover:opacity-70 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to projects
          </button>

        </div>
      </main>

      <Footer />
    </div>
  )
}

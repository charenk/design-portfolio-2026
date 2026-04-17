"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'

export default function BrowserExtensionCaseStudy() {
  return (
    <ProjectPageLayout
      title="Browser extension for Just-in-time account access"
      titleColorClass="text-accent-magenta"
      hero={{ type: 'image', src: '/browser-extension-banner.svg', alt: 'Browser extension for just-in-time account access banner' }}
      overviewLeft={
        <div className="flex flex-col gap-[23px]">
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif mb-2">Problem:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">Lorem ipsum problem</p>
          </div>
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif mb-2">Strategy:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">Lorem ipsum strategy</p>
          </div>
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif mb-2">Solution elements:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">Lorem ipsum solution elements</p>
          </div>
        </div>
      }
      overviewRight={
        <div className="flex flex-col gap-[19px]">
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif mb-2">Role:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">Lead designer</p>
          </div>
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif mb-2">Scope:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">Platform-level design across AI-assisted PAM workflows</p>
          </div>
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif mb-2">Team:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">
              Product Manager, 4 Engineers, 1 Designer
            </p>
          </div>
        </div>
      }
      disclaimer={
        <>
          <p className="text-[18px] leading-[1.52] font-serif">
            Due to the sensitive and competitive nature of this work, detailed flows, data models, and system logic are intentionally omitted from this public case study.
          </p>
          <p className="text-[18px] leading-[1.52] font-serif">
            I&apos;m happy to walk through deeper rationale, tradeoffs, and system-level decisions behind this work in conversation.
          </p>
        </>
      }
    />
  )
}

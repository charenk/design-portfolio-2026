"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'

export default function BrowserExtensionCaseStudy() {
  return (
    <ProjectPageLayout
      title="Browser extension for Just-in-time account access"
      titleColorClass="text-accent-magenta"
      hero={{ type: 'placeholder' }}
      overviewLeft={
        <div className="flex flex-col gap-[23px]">
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
      }
      overviewRight={
        <div className="flex flex-col gap-[19px]">
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
      }
      disclaimer={
        <>
          <p className="text-body font-serif">
            Due to the sensitive and competitive nature of this work, detailed flows, data models, and system logic are intentionally omitted from this public case study.
          </p>
          <p className="text-body font-serif">
            I&apos;m happy to walk through deeper rationale, tradeoffs, and system-level decisions behind this work in conversation.
          </p>
        </>
      }
    />
  )
}

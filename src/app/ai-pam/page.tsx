"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'

export default function AiPamCaseStudy() {
  return (
    <ProjectPageLayout
      title="AI power privileged access management solution"
      titleColorClass="text-accent-yellow"
      hero={{ type: 'placeholder' }}
      overviewLeft={
        <div>
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
      }
      overviewRight={
        <div>
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

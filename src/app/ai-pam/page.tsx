"use client"

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'

function ImageLightbox({
  thumbnailSrc,
  detailedSrc,
  alt,
  thumbnailClassName,
  wrapperClassName,
}: {
  thumbnailSrc: string
  detailedSrc: string
  alt: string
  thumbnailClassName?: string
  wrapperClassName?: string
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Expand image: ${alt}`}
        className={`group relative block cursor-zoom-in ${wrapperClassName ?? ''}`}
      >
        <img
          src={thumbnailSrc}
          alt={alt}
          className={`transition-transform duration-200 ease-out group-hover:scale-[1.02] ${thumbnailClassName ?? ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close expanded image"
              onClick={() => setOpen(false)}
              className="absolute inset-0 cursor-zoom-out bg-black/70"
            />
            <motion.div
              className="relative z-[1] max-w-[92vw] max-h-[92vh] rounded-[16px] bg-[#FFF7EF] shadow-[0_24px_48px_rgba(0,0,0,0.4)] p-6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-[8px] bg-black/5 text-[20px] leading-none text-black/70 transition-colors hover:bg-black/10"
              >
                ×
              </button>
              <img
                src={detailedSrc}
                alt={alt}
                className="block max-w-full max-h-[calc(92vh-48px)] w-auto h-auto object-contain rounded-figure-banner"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ExpandableText({ preview, children }: { preview: React.ReactNode, children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <div className="relative">
        {preview}
        {!expanded && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[80px] pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(255,247,239,0), rgba(255,247,239,1))' }}
          />
        )}
      </div>
      {expanded && <div className="mt-[18px]">{children}</div>}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-[16px] leading-[1.52] font-serif font-medium text-[#D97706] hover:text-[#b45309] transition-colors mt-[12px]"
      >
        {expanded ? 'Show less' : 'Learn more'}
      </button>
    </div>
  )
}

export default function AiPamCaseStudy() {
  return (
    <ProjectPageLayout
      title="Agentic Privileged Access Management Platform"
      titleColorClass="text-accent-yellow"
      hero={{ type: 'image', src: '/ai-pam-banner.svg', alt: 'Agentic Privileged Access Management Platform banner' }}
      overviewLeft={
        <div>
          <p className="text-[18px] leading-[1.52] font-serif">
            CyberQP is a PAM platform built for MSPs, IT teams managing security for dozens of client organizations at once. I led the design of the AI terminal: a natural language interface that lets technicians run identity and access workflows without switching tools or writing scripts.
          </p>
        </div>
      }
      overviewRight={
        <div className="flex flex-col gap-[30px]">
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">Role:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">Sole designer (sometimes wearing PM hat)</p>
          </div>
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">Team:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">
              Director of Product, 2 product and engineering squads, AI labs team lead by founder, partners
            </p>
          </div>
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">Scope:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">
              Rebuilding legacy SaaS ground up with intelligence layer, AI terminal and system wide guardrails.
            </p>
          </div>
        </div>
      }
      disclaimer={
        <p className="text-[18px] leading-[1.52] font-serif italic">
          Detailed flows, data models, and system logic are not included here. Happy to walk through the full rationale and tradeoffs in conversation.
        </p>
      }
      nextHref="/browser-extension"
      nextLabel="Browser extension"
    >
      {/* Section 1: Image left, text right */}
      <section className="mb-[50px]">
        <h3 className="md:hidden text-[18px] leading-[1.52] font-serif font-semibold mb-4">
          Over 60% of customers were asking for automation before we started
        </h3>
        <div className="flex flex-col md:flex-row gap-[38px] items-start">
          <div className="order-1 md:order-1 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
            <img
              src="/assets/discovery-ost.svg"
              alt="Discovery OST diagram showing customer automation demand"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="order-2 md:order-2 flex-1 md:py-[37px]">
            <h3 className="hidden md:block text-[18px] leading-[1.52] font-serif font-semibold mb-2">
              Over 60% of customers were asking for automation before we started
            </h3>
            <ExpandableText
              preview={
                <div className="text-[18px] leading-[1.52] font-serif">
                  <p>
                    Over 60% of existing customers had asked about automation in the two years before this project started. Technicians were already building internal agents using tools like n8n, but those experiments did not scale in regulated environments and did not meet compliance requirements.
                  </p>
                </div>
              }
            >
              <div className="text-[18px] leading-[1.52] font-serif">
                <p>
                  Three things kept coming up in discovery sessions. Technicians were spending more time on lookups than on actual decisions, switching between PSA, directory, and RMM tools just to gather context for a single request. L1 technicians lacked the experience to triage application access requests confidently, which pushed escalations up to L3 staff whose time was better spent elsewhere. And managers had no vendor-backed solution that could automate recurring identity tasks within a compliance-safe boundary.
                </p>
              </div>
            </ExpandableText>
            <div className="mt-[24px]">
              <h4 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">Design challenge</h4>
              <p className="text-[18px] leading-[1.52] font-serif">
                The design challenge became: build an AI terminal that understands a technician&apos;s intent, acts across multiple identity systems, and keeps them in control of every security-sensitive decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Text left, image right */}
      <section className="mb-[50px]">
        <h3 className="md:hidden text-[18px] leading-[1.52] font-serif font-semibold mb-4">
          Human in the loop pattern grew from one to four through testing
        </h3>
        <div className="flex flex-col md:flex-row gap-[38px] items-start">
          <div className="order-2 md:order-1 flex-1 md:py-[37px]">
            <h3 className="hidden md:block text-[18px] leading-[1.52] font-serif font-semibold mb-2">
              Human in the loop pattern grew from one to four through testing
            </h3>
            <div className="text-[18px] leading-[1.52] font-serif flex flex-col gap-[18px]">
              <p>
                Early sandbox sessions showed that one confirmation gate was not enough. Technicians approved the action plan but then felt surprised by what the system actually queried. They wanted to verify the AI interpretation before it started planning, not just before it executed.
              </p>
              <p>
                The result is four sequential gates: intent confirmation, policy authorization, query plan review, and workflow approval. Each one is a distinct trust moment, not a generic confirmation step.
              </p>
            </div>
          </div>
          <ImageLightbox
            thumbnailSrc="/assets/hitl-gates-thumbnail.svg"
            detailedSrc="/assets/hitl-gates-detailed.svg"
            alt="Four sequential human-in-the-loop gates: intent confirmation, policy authorization, query plan review, workflow approval"
            wrapperClassName="order-1 md:order-2 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card"
            thumbnailClassName="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Section 3: Image left, text right */}
      <section className="mb-[50px]">
        <h3 className="md:hidden text-[18px] leading-[1.52] font-serif font-semibold mb-4">
          Consent does not have to mean friction on every action
        </h3>
        <div className="flex flex-col md:flex-row gap-[38px] items-start">
          <div className="order-1 md:order-1 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
            <img
              src="/assets/consent-at-config-level.svg"
              alt="Diagram showing consent moved to the connector configuration layer"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="order-2 md:order-2 flex-1 md:py-[37px]">
            <h3 className="hidden md:block text-[18px] leading-[1.52] font-serif font-semibold mb-2">
              Consent does not have to mean friction on every action
            </h3>
            <div className="text-[18px] leading-[1.52] font-serif flex flex-col gap-[18px]">
              <p>
                The first version showed nothing when the system was about to act at a source level. The second version interrupted the flow with a confirmation gate every time. Partner feedback was clear: it created anxiety rather than confidence on recurring workflows.
              </p>
              <p>
                The third version moved consent to the connector configuration layer. The technician decides once what the AI is permitted to do. At execution time, an inline note confirms the action is covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Text left, image right */}
      <section className="mb-[50px]">
        <h3 className="md:hidden text-[18px] leading-[1.52] font-serif font-semibold mb-4">
          Stopping is safer than proceeding with partial data
        </h3>
        <div className="flex flex-col md:flex-row gap-[38px] items-start">
          <div className="order-2 md:order-1 flex-1 md:py-[37px]">
            <h3 className="hidden md:block text-[18px] leading-[1.52] font-serif font-semibold mb-2">
              Stopping is safer than proceeding with partial data
            </h3>
            <div className="text-[18px] leading-[1.52] font-serif flex flex-col gap-[18px]">
              <p>
                In PAM, partial execution is more dangerous than no execution. When a connector goes offline mid-workflow, the system stops and names the connector rather than continuing. When a query returns an unusually large result set, the system surfaces the discrepancy and asks the technician to confirm scope.
              </p>
              <p>
                Every error state follows the same structure: what happened, why, what to do next.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
            <img
              src="/assets/stopping-is-safer.svg"
              alt="Diagram showing how the system stops and surfaces errors rather than proceeding with partial data"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 5: Full-width text + image */}
      <div className="py-[37px] mb-[50px]">
        <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">
          One shared language across product, engineering, and customer success
        </h3>
        <div className="text-[18px] leading-[1.52] font-serif flex flex-col gap-[18px] mb-[30px]">
          <p>
            Before the terminal launched, I ran a cross-functional session to define AI-native design principles and document them in Confluence. A full content guidelines system followed, covering voice, tone, terminology, and terminal-specific copy patterns.
          </p>
          <p>
            The two principles that anchored everything: AI should ask before it acts on any irreversible identity change. The system should never fail silently.
          </p>
        </div>
        <img
          src="/assets/content-guidelines.svg"
          alt="Content guidelines diagram showing AI-native principles and terminal-specific copy patterns"
          className="w-full aspect-[2770/850] rounded-figure-banner object-contain"
        />
      </div>

      {/* Section 6: Results */}
      <div className="py-[37px] mb-[50px]">
        <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">
          Results
        </h3>
        <ul className="text-[18px] leading-[1.52] font-serif list-disc ml-[27px] flex flex-col gap-[4px]">
          <li>HITL override rate per scenario became the primary design feedback loop after launch. Where technicians override the AI is where the next unmet need lives.</li>
          <li>A dedicated feedback action was instrumented to capture edge cases, giving the AI labs team high-signal input for model refinement.</li>
          <li>Terminal activation rate tracked from day one as the primary adoption indicator.</li>
          <li>Partner advisory council feedback incorporated across three design iterations.</li>
        </ul>
      </div>
    </ProjectPageLayout>
  )
}

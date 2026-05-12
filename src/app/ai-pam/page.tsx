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

export default function AiPamCaseStudy() {
  return (
    <ProjectPageLayout
      title="Agentic Privileged Access Management Platform"
      titleColorClass="text-accent-yellow"
      hero={{ type: 'image', src: '/ai-pam-banner.svg', alt: 'Agentic Privileged Access Management Platform banner' }}
      disclaimer={
        <p className="text-[14px] leading-[1.6] font-serif italic">
          Not all aspects of the design are shown here given the sensitive nature of this work. Happy to walk through the full picture in conversation.
        </p>
      }
      nextHref="/browser-extension"
      nextLabel="Browser extension"
    >
      {/* Meta strip — Role / Team / Scope */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[40px] mb-[56px]">
        <div>
          <p className="text-[14px] font-serif text-[#9e9e9e] mb-[8px]">Role</p>
          <p className="text-[14px] leading-[1.6] font-serif">
            Lead designer (sometimes wearing PM hat)
          </p>
        </div>
        <div>
          <p className="text-[14px] font-serif text-[#9e9e9e] mb-[8px]">Team</p>
          <p className="text-[14px] leading-[1.6] font-serif">
            Director of Product, two product and engineering squads, AI labs team led by the founder, partner advisory council
          </p>
        </div>
        <div>
          <p className="text-[14px] font-serif text-[#9e9e9e] mb-[8px]">Scope</p>
          <p className="text-[14px] leading-[1.6] font-serif">
            Designed the AI terminal and system wide guardrails for an agentic PAM product, joining before scope was defined and leading discovery alongside the AI labs team while they ran technical exploration. The work shipped across three customer facing iterations.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-divider-grey/30 mb-[56px]" />

      {/* Stakes — Why this matters */}
      <section className="mb-[80px]">
        <p className="text-[12px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[16px]">
          Why this matters
        </p>
        <h2 className="font-serif font-normal text-[28px] md:text-[40px] leading-[1.2] mb-[28px] max-w-[860px]">
          A technician spends more time gathering context than making decisions
        </h2>
        <div className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[18px] max-w-[760px]">
          <p>
            Identity and access management at MSPs runs on tickets, tab switching, and tribal knowledge, which means a technician managing 30 to 50 client organizations spends more time gathering context than making decisions. The cost shows up across ticket SLAs, end user wait times, and the higher value security work that gets pushed to next week.
          </p>
          <p>
            CyberQP is the PAM platform 1000+ MSPs use to manage that complexity. I led the design for the AI terminal, a natural language interface that lets technicians run identity and access workflows without scripts or tool switching.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-divider-grey/30 mb-[56px]" />

      {/* What I shaped (with Hypothesis nested as a closing block) */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          What I shaped
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Below are selected foundational decisions and guidelines that survived from the first design exploration to the third customer facing iteration.
        </p>
        <div className="bg-white rounded-figure-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden mb-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-x lg:divide-y-0 divide-divider-grey/20">
            {[
              { title: 'Read only by default', desc: 'The agent reads what’s there before it writes anything. Source systems only get changed after a technician has seen the findings and confirmed the action.' },
              { title: 'The four trust gates', desc: 'Each of the four gates captures a different trust moment in the workflow. The technician confirms the AI’s interpretation, the policy authorization, the query plan, and the final action separately, not as a single click through.' },
              { title: 'Confidence weighted disambiguation', desc: 'When confidence is low, the system pauses on the match. The technician sees the candidate options and picks the right one, rather than letting the AI guess and continue.' },
              { title: 'One workflow per session', desc: 'The terminal handles one workflow at a time. Restricting scope this way keeps the model’s execution accurate and predictable, and it keeps runtime costs in check.' },
            ].map((item) => (
              <div key={item.title} className="p-[20px] md:p-[24px]">
                <h4 className="text-[14px] leading-[1.4] font-serif font-semibold mb-[10px]">{item.title}</h4>
                <p className="text-[14px] leading-[1.6] font-serif text-[#4F4F4F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Working with stakeholders and cross functional teams, I held several hypotheses through discovery and design. The one below carried the most weight, and the rest of the case study walks through the solutions it produced.
        </p>

        {/* Hypothesis — nested inside What I shaped */}
        <div className="border-l-[3px] border-accent-yellow pl-[24px] md:pl-[36px] py-[4px]">
          <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[14px]">
            Hypothesis
          </p>
          <p className="font-serif italic text-[20px] md:text-[22px] leading-[1.4] max-w-[760px]">
            Specialists will adopt agentic AI in regulated workflows only when the system reads before it writes, and asks before every irreversible change. Read only by default is the trust contract that makes the rest of the design possible.
          </p>
        </div>
      </section>

      {/* Research */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          Research
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          While the AI labs team focused on technical research and model testing, I led user discovery across three cohorts alongside the Director of Product and Product Manager.
        </p>

        {/* Cohorts */}
        <div className="bg-white rounded-figure-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden mb-[40px]">
          <div className="flex flex-col divide-y divide-divider-grey/20">
            {[
              { num: '01', title: 'MSP technicians using competitor PAM products', desc: 'What they were trying to automate, what their internal n8n workarounds looked like, where those workarounds broke.' },
              { num: '02', title: 'L1 to L3 specialists at customers already on CyberQP', desc: 'Where the time actually went during a typical week, and where they escalated and why.' },
              { num: '03', title: 'Partner advisory council representing seven midsize MSP operations', desc: 'Strategic level input on what would and would not survive in regulated environments.' },
            ].map((cohort) => (
              <div key={cohort.num} className="flex gap-[16px] md:gap-[28px] p-[20px] md:p-[24px]">
                <p className="text-[12px] font-serif font-medium text-[#9e9e9e] min-w-[28px] pt-[4px]">{cohort.num}</p>
                <div className="flex-1">
                  <h4 className="text-[14px] leading-[1.4] font-serif font-semibold mb-[8px]">{cohort.title}</h4>
                  <p className="text-[14px] leading-[1.6] font-serif text-[#4F4F4F]">{cohort.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OST + findings 50/50 row */}
        <div className="flex flex-col md:flex-row gap-[38px] items-start">
          <div className="order-2 md:order-1 flex-1 md:py-[24px] flex flex-col gap-[18px]">
            <p className="text-[14px] leading-[1.6] font-serif">
              I owned the opportunity solution tree, mapping unmet needs and assumptions across the three cohorts while working with product and engineering leaders to prioritize the work. The prioritized opportunities also became the source for a prompt and use case document the AI labs team used to train the model. That mapping changed how the team thought about scope: opportunities became use cases the terminal could absorb, not separate items in a roadmap queue.
            </p>
            <p className="text-[14px] leading-[1.6] font-serif">
              Three themes held across all three cohorts:
            </p>
            <ul className="text-[14px] leading-[1.6] font-serif list-disc ml-[20px] flex flex-col gap-[10px]">
              <li>Cleanup spans 3+ tools every quarter.</li>
              <li>L1 access request triage escalates to L3.</li>
              <li>Inline access workflows are the top productivity ask.</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
            <img
              src="/assets/discovery-ost.svg"
              alt="Opportunity Solution Tree workshop output"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Design outcomes */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          Design outcomes
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Discovery surfaced more than opportunities. It also produced operating principles I drafted with product, engineering, and leadership to anchor the design of the new AI driven product.
        </p>
        <div className="bg-white rounded-figure-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden mb-[40px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-x lg:divide-y-0 divide-divider-grey/20">
            {[
              { title: 'Read only by default', desc: 'The agent never writes to source systems without explicit human confirmation. Reading is free. Writing requires a gate.' },
              { title: 'Ask before acting on irreversible change', desc: 'Suggestion is not enough. The system pauses and asks for confirmation before any action that cannot be undone with one click.' },
              { title: 'Never fail silently', desc: 'Every failure has a recoverable path. The system always names what happened, why, and what the technician can do next.' },
              { title: 'One workflow per session', desc: 'The terminal handles one workflow at a time. Scope is enforced by design rather than by user discipline. No half finished states.' },
            ].map((item) => (
              <div key={item.title} className="p-[20px] md:p-[24px]">
                <h4 className="text-[14px] leading-[1.4] font-serif font-semibold mb-[10px]">{item.title}</h4>
                <p className="text-[14px] leading-[1.6] font-serif text-[#4F4F4F]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[14px] leading-[1.6] font-serif max-w-[760px] mb-[30px]">
          These principles were co-owned with engineering, marketing, and customer success, giving the team a shared operating language across functions. They also became the foundation for content writing on the new product platform, covering voice, terminology, and the copy patterns specific to the terminal.
        </p>
        <img
          src="/assets/content-guidelines.svg"
          alt="Confluence principles document and AI terminal content guidelines"
          className="w-full aspect-[2770/850] rounded-figure-banner object-contain"
        />
        <p className="text-[14px] leading-[1.6] font-serif max-w-[760px] mt-[30px]">
          Principles only matter if they hold under pressure. The four decisions below are where these got tested, including the one I expected to ship and ended up reversing entirely.
        </p>
      </section>

      {/* Decision 1: Read only by default — text only for now, image to follow */}
      <section className="mb-[50px]">
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
            Decision 01
          </p>
          <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">
            Why we shipped read only by default
          </h3>
        </div>
        <div className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[18px]">
          <p>The first prototype gave the agent write access to source systems by default, and that choice was not careless. It was the obvious starting point, modeled on how technicians work today: identify a problem, fix it, move on.</p>
          <p>Partner advisory feedback in the second sandbox session was direct. An agent that acts on source systems before the technician sees what it&apos;s doing breaks the trust contract that makes PAM viable in regulated environments.</p>
          <p>We flipped the default. The agent now reads first, names what it found, and waits for explicit human review at four sequential gates before any write executes.</p>
        </div>
      </section>

      {/* Decision 2: HITL gates — text left, image right */}
      <section className="mb-[50px]">
        <div className="md:hidden mb-4">
          <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
            Decision 02
          </p>
          <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">
            Why human in the loop grew from one gate to four
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-[38px] items-start">
          <div className="order-2 md:order-1 flex-1 md:py-[37px]">
            <div className="hidden md:block mb-2">
              <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
                Decision 02
              </p>
              <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">
                Why human in the loop grew from one gate to four
              </h3>
            </div>
            <div className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[18px]">
              <p>
                Early sandbox sessions showed that one confirmation gate was not enough. Technicians approved the action plan but then felt surprised by what the system actually queried, and they wanted to verify the AI interpretation before it started planning rather than just before it executed.
              </p>
              <p>
                The result is four sequential gates: intent confirmation, policy authorization, query plan review, and workflow approval. Each one is a distinct trust moment, not a generic confirmation step.
              </p>
            </div>
          </div>
          <ImageLightbox
            thumbnailSrc="/assets/hitl-gates-thumbnail.svg"
            detailedSrc="/assets/hitl-gates-detailed.svg"
            alt="Four sequential human in the loop gates: intent confirmation, policy authorization, query plan review, workflow approval"
            wrapperClassName="order-1 md:order-2 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card"
            thumbnailClassName="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Decision 3: Consent at config — image left, text right */}
      <section className="mb-[50px]">
        <div className="md:hidden mb-4">
          <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
            Decision 03
          </p>
          <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">
            Consent does not have to mean friction on every action
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-[38px] items-start">
          <div className="order-1 md:order-2 relative w-full md:w-[592px] aspect-[592/357] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
            <img
              src="/assets/consent-at-config-level.svg"
              alt="Diagram showing consent moved to the connector configuration layer"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="order-2 md:order-1 flex-1 md:py-[37px]">
            <div className="hidden md:block mb-2">
              <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
                Decision 03
              </p>
              <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">
                Consent does not have to mean friction on every action
              </h3>
            </div>
            <div className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[18px]">
              <p>
                The first version showed nothing when the system was about to act at a source level. The second version interrupted the flow with a confirmation gate every time. Partner feedback was clear: it created anxiety rather than confidence on recurring workflows.
              </p>
              <p>
                This third version moved consent to the connector configuration layer, where the technician decides once what the AI is permitted to do. At execution time, an inline note confirms the action is covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision 4: Stopping is safer — text left, image right */}
      <section className="mb-[50px]">
        <div className="md:hidden mb-4">
          <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
            Decision 04
          </p>
          <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">
            Stopping is safer than proceeding with partial data
          </h3>
        </div>
        <div className="flex flex-col md:flex-row gap-[38px] items-start">
          <div className="order-2 md:order-1 flex-1 md:py-[37px]">
            <div className="hidden md:block mb-2">
              <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-accent-yellow mb-[8px]">
                Decision 04
              </p>
              <h3 className="text-[18px] leading-[1.52] font-serif font-semibold">
                Stopping is safer than proceeding with partial data
              </h3>
            </div>
            <div className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[18px]">
              <p>
                In PAM, partial execution is more dangerous than no execution. When a connector goes offline mid workflow, the system stops and names the connector rather than continuing. When a query returns an unusually large result set, the system surfaces the discrepancy and asks the technician to confirm scope.
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

      {/* Business impact */}
      <section className="py-[37px] mb-[50px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[20px]">
          Business impact
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          These design decisions held through to release. The terminal shipped as the first agentic capability in CyberQP&apos;s PAM suite, and three measurable outcomes are tracked across the partner cohort.
        </p>
        <div className="flex flex-col">
          {[
            { label: 'Activation', text: 'Terminal activation rate is the primary adoption indicator from day one. Partner advisory council named the work as a top three product investment for the next renewal cycle.' },
            { label: 'Specialist enablement', text: 'L1 technicians completed triage workflows previously gated to L3, removing a long-standing escalation bottleneck. The follow-on work on a trust and confidence score for L1 decisions ships next.' },
            { label: 'Continuous learning loop', text: 'HITL override rate per scenario became the primary design feedback signal the AI labs team uses for model refinement. A dedicated feedback action was instrumented from launch to capture edge cases the override metric alone does not surface.' },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-[8px] md:gap-[32px] py-[20px] border-b border-divider-grey/30">
              <p className="text-[18px] leading-[1.52] font-serif font-semibold md:whitespace-nowrap">{row.label}</p>
              <p className="text-[14px] leading-[1.6] font-serif">{row.text}</p>
            </div>
          ))}
        </div>
        <p className="text-[16px] leading-[1.52] font-serif italic text-[#4F4F4F] mt-[24px] max-w-[640px]">
          Exact figures are not shared due to the competitive nature of this domain. Happy to walk through the specifics in conversation.
        </p>
      </section>

      {/* What's still open */}
      <section className="py-[37px] mb-[50px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[20px]">
          What&apos;s still open
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif max-w-[760px]">
          As the terminal moves into multi agent territory, cross workflow memory becomes the next open problem: one workflow per session is the right constraint today, but it will not hold when technicians are running three coordinated workflows for the same incident.
        </p>
        <p className="text-[16px] leading-[1.52] font-serif italic text-[#4F4F4F] mt-[24px] max-w-[640px]">
          The terminal is one surface in an agentic system that&apos;s continuously evolving. Whatever ships next inherits its gates, its scoping, and its commitment to never failing silently.
        </p>
      </section>
    </ProjectPageLayout>
  )
}

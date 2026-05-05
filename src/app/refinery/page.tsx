"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'
import { SectionDivider } from '@/components/case-study/SectionDivider'
import { StakesSection } from '@/components/case-study/StakesSection'

export default function RefineryCaseStudy() {
  return (
    <ProjectPageLayout
      title="The Refinery"
      hero={{
        type: 'video-file',
        src: '/refinery-demo.mp4',
        poster: '/assets/portfolio%20list%20page/The%20refinery%20project.png',
        alt: 'Demo of the Refinery dashboard: pixel-art office where agents animate as scans run',
      }}
    >
      {/* Meta: scope + stack + repo */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[40px] mb-[56px]">
        <div>
          <p className="text-[14px] font-serif text-[#9e9e9e] mb-[8px]">Scope</p>
          <p className="text-[14px] leading-[1.6] font-serif">
            An orchestrator and eight specialised agents, a Severance-style dashboard, and a morning brief delivered before market open. Observation only. No trades.
          </p>
        </div>
        <div>
          <p className="text-[14px] font-serif text-[#9e9e9e] mb-[8px]">Stack</p>
          <ul className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[6px] list-disc pl-[18px] marker:text-[#9e9e9e]">
            <li>Claude for building and testing</li>
            <li>TradingView for research</li>
            <li>Gmail SMTP for email notifications</li>
          </ul>
        </div>
        <div>
          <p className="text-[14px] font-serif text-[#9e9e9e] mb-[8px]">Github repo</p>
          <a
            href="https://github.com/charenk/refinery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] text-white font-sans text-[13px] font-medium hover:bg-black transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Open in GitHub
          </a>
        </div>
      </section>

      <SectionDivider />

      <StakesSection
        eyebrow="Why I built this"
        heading="A morning routine I kept skipping, and an itch to build agentic"
        paragraphs={[
          'Two threads collided. I had a manual morning routine before the market opened: the same charts, the same news feeds, the same macro data. Twenty minutes that I would skip on the days it mattered most.',
          'The other thread was wanting to build something agentic from scratch, end to end, instead of reading more posts about how others were doing it. The Refinery is the result. Nine coordinated agents watch a personal TFSA portfolio overnight, scan for setups, and email a brief before the market opens. Local-first, laptop-only, under fifteen cents a day.',
        ]}
      />

      <SectionDivider />

      {/* Solution overview — system diagram */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          Solution overview
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          An orchestrator dispatches eight specialised agents on a schedule, collects their output, and assembles the morning brief.
        </p>

        <SystemDiagram />
      </section>

      <SectionDivider />

      {/* Learnings and next steps — two-column */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[40px]">
          Learnings and next steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[60px]">
          <div>
            <h3 className="text-[12px] uppercase tracking-[0.15em] font-serif font-medium text-[#9e9e9e] mb-[20px]">
              Learnings
            </h3>
            <ul className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[14px] list-disc pl-[18px] marker:text-[#9e9e9e]">
              <li>
                <span className="font-semibold">Observation-only is a feature.</span> No brokerage integration means no risk of accidental trades, simpler security, and full focus on signal quality.
              </li>
              <li>
                <span className="font-semibold">Prompt caching is the budget lever.</span> Sonnet for heavy analysis with caching, Haiku for lighter screens. Without caching, the daily bill would be an order of magnitude higher.
              </li>
              <li>
                <span className="font-semibold">Local-first wins for personal projects.</span> No cloud infrastructure to maintain. The whole system runs on a laptop and shuts down when it sleeps.
              </li>
              <li>
                <span className="font-semibold">Strict module boundaries prevent spaghetti.</span> One gateway per resource keeps the surface area small. Easy to test, easy to swap a model out without touching the rest.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[12px] uppercase tracking-[0.15em] font-serif font-medium text-[#9e9e9e] mb-[20px]">
              Next steps
            </h3>
            <ul className="text-[14px] leading-[1.6] font-serif flex flex-col gap-[18px] list-disc pl-[18px] marker:text-[#9e9e9e]">
              <li>
                <span className="font-semibold">Email brief readability.</span> The v1 emails assumed expert-level knowledge and leaned on abbreviations. For someone keeping up with a fast-moving market, the brief needs to be simple and informative. I tweaked the notification system to spell out terms, lead with the most important moves, and skip the jargon.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </ProjectPageLayout>
  )
}

function SystemDiagram() {
  return (
    <div className="bg-white rounded-figure-card shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-[20px] md:p-[36px]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr_auto_1fr] gap-[20px] md:gap-[24px] items-stretch">
        {/* Inputs column */}
        <DiagramColumn label="Inputs">
          <DiagramTile>yfinance market data</DiagramTile>
          <DiagramTile>News &amp; macro feeds</DiagramTile>
        </DiagramColumn>

        <FlowArrow />

        {/* Agents column */}
        <DiagramColumn label="Agents">
          <DiagramTile emphasized>Orchestrator</DiagramTile>
          <div className="grid grid-cols-2 gap-[8px]">
            <DiagramTile compact>Scanner</DiagramTile>
            <DiagramTile compact>TA</DiagramTile>
            <DiagramTile compact>Sentiment</DiagramTile>
            <DiagramTile compact>Portfolio</DiagramTile>
            <DiagramTile compact>Postmortem</DiagramTile>
            <DiagramTile compact>Learning</DiagramTile>
            <DiagramTile compact>Roster</DiagramTile>
            <DiagramTile compact>Memory</DiagramTile>
          </div>
        </DiagramColumn>

        <FlowArrow />

        {/* Outputs column */}
        <DiagramColumn label="Outputs">
          <DiagramTile>SQLite memory</DiagramTile>
          <DiagramTile>Gmail SMTP brief</DiagramTile>
          <DiagramTile>Local dashboard</DiagramTile>
        </DiagramColumn>
      </div>
    </div>
  )
}

function DiagramColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="text-[11px] uppercase tracking-[0.15em] font-serif font-medium text-[#9e9e9e]">
        {label}
      </p>
      {children}
    </div>
  )
}

function DiagramTile({
  children,
  emphasized = false,
  compact = false,
}: {
  children: React.ReactNode
  emphasized?: boolean
  compact?: boolean
}) {
  const padding = compact ? 'px-[10px] py-[8px] text-[12px]' : 'px-[14px] py-[12px] text-[13px]'
  const colors = emphasized
    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] font-semibold'
    : 'bg-white border-divider-grey/40 text-[#1a1a1a]'
  return (
    <div className={`rounded-md border font-serif text-center leading-[1.3] ${padding} ${colors}`}>
      {children}
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="hidden md:flex items-center justify-center text-[#9e9e9e]" aria-hidden="true">
      <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
        <path d="M0 7 H18 M13 2 L18 7 L13 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

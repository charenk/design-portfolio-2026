"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'
import { MetaStrip } from '@/components/case-study/MetaStrip'
import { SectionDivider } from '@/components/case-study/SectionDivider'
import { StakesSection } from '@/components/case-study/StakesSection'
import { CardGrid } from '@/components/case-study/CardGrid'
import { ProjectSection } from '@/components/case-study/ProjectSection'
import { InfluenceSection } from '@/components/case-study/InfluenceSection'

// ─── Inline project mocks ──────────────────────────────────────────────────

function CyberAttackMapMock() {
  return (
    <div className="bg-[#1A1F2A] rounded-[8px] p-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-white/5 h-[320px] relative overflow-hidden">
      <p className="text-[9px] uppercase tracking-[0.06em] text-[#6E7B8E] mb-[14px] font-serif">
        Cyber Attack Map · Incident 2021-09-21-00001
      </p>
      <div className="relative h-[calc(100%-30px)]">
        {/* Connection lines (rendered behind nodes) */}
        <div
          className="absolute h-[1.5px] bg-rose-700/40"
          style={{ top: 48, left: 56, width: 140, transformOrigin: '0 0', transform: 'rotate(15deg)' }}
        />
        <div
          className="absolute h-[1.5px] bg-amber-600/40"
          style={{ top: 88, left: 236, width: 90, transformOrigin: '0 0', transform: 'rotate(45deg)' }}
        />
        <div
          className="absolute h-[1.5px] bg-rose-700/40"
          style={{ top: 48, left: 56, width: 60, transformOrigin: '0 0', transform: 'rotate(80deg)' }}
        />
        <div
          className="absolute h-[1.5px] bg-rose-700/40"
          style={{ top: 88, left: 60, width: 80, transformOrigin: '0 0', transform: 'rotate(50deg)' }}
        />

        {/* Entry node (red filled) */}
        <div
          className="absolute w-[36px] h-[36px] rounded-full bg-rose-700 border-2 border-rose-700 flex items-center justify-center text-white font-serif text-[12px] font-bold shadow-[0_0_0_4px_rgba(225,29,72,0.1)]"
          style={{ top: 30, left: 20 }}
        >
          !
        </div>
        <p className="absolute text-[8px] tracking-[0.05em] font-serif text-[#6E7B8E]" style={{ top: 75, left: 12 }}>
          Entry · phishing
        </p>

        {/* Lateral node (amber outline) */}
        <div
          className="absolute w-[36px] h-[36px] rounded-full bg-[#2A3344] border-2 border-amber-600 flex items-center justify-center text-white font-serif text-[12px] font-bold shadow-[0_0_0_4px_rgba(217,119,6,0.1)]"
          style={{ top: 70, left: 200 }}
        >
          L
        </div>
        <p className="absolute text-[8px] tracking-[0.05em] font-serif text-[#6E7B8E]" style={{ top: 115, left: 188 }}>
          Lateral · 3 hosts
        </p>

        {/* Target node (emerald outline) */}
        <div
          className="absolute w-[36px] h-[36px] rounded-full bg-[#2A3344] border-2 border-emerald-600 flex items-center justify-center text-white font-serif text-[12px] font-bold shadow-[0_0_0_4px_rgba(5,150,105,0.1)]"
          style={{ top: 160, left: 300 }}
        >
          T
        </div>
        <p className="absolute text-[8px] tracking-[0.05em] font-serif text-[#6E7B8E]" style={{ top: 205, left: 280 }}>
          Target · file server
        </p>

        {/* Smaller intermediate nodes */}
        <div
          className="absolute w-[30px] h-[30px] rounded-full bg-[#2A3344] border-2 border-rose-700 flex items-center justify-center text-white font-serif text-[9px] shadow-[0_0_0_4px_rgba(225,29,72,0.1)]"
          style={{ top: 110, left: 60 }}
        >
          2
        </div>
        <div
          className="absolute w-[30px] h-[30px] rounded-full bg-[#2A3344] border-2 border-rose-700 flex items-center justify-center text-white font-serif text-[9px] shadow-[0_0_0_4px_rgba(225,29,72,0.1)]"
          style={{ top: 175, left: 110 }}
        >
          3
        </div>

        {/* Legend */}
        <p className="absolute bottom-[10px] right-[10px] text-[9px] font-serif text-[#6E7B8E] tracking-[0.05em]">
          Entry · Lateral · Target
        </p>
      </div>
    </div>
  )
}

function WidgetDiscoveryMock() {
  return (
    <div className="bg-[var(--cs-surface)] rounded-[8px] p-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-divider-grey/30">
      {/* Tabs */}
      <div className="flex border-b border-divider-grey/30 mb-[14px]">
        <span className="px-[12px] py-[6px] text-[10px] font-serif font-semibold text-accent-magenta border-b-2 border-accent-magenta">
          By audience
        </span>
        <span className="px-[12px] py-[6px] text-[10px] font-serif text-[var(--cs-ink-soft)]">By data source</span>
        <span className="px-[12px] py-[6px] text-[10px] font-serif text-[var(--cs-ink-soft)]">All widgets</span>
      </div>
      {/* Search */}
      <div className="bg-[#F8F5EE] border border-divider-grey/30 rounded-[4px] px-[10px] py-[6px] text-[11px] font-serif text-[var(--cs-ink-faint)] mb-[12px]">
        Search widgets...
      </div>

      {/* Section: For SOC analysts */}
      <p className="text-[9px] uppercase tracking-[0.08em] font-serif text-[var(--cs-ink-faint)] mb-[8px]">
        For SOC analysts
      </p>
      {[
        { name: 'Threat trend over time', meta: 'Used in 8 dashboards', status: 'Connector ready', selected: true, dim: false },
        { name: 'Top affected endpoints', meta: 'Used in 4 dashboards', status: 'Connector ready', selected: false, dim: false },
      ].map((w) => (
        <div
          key={w.name}
          className={`flex gap-[10px] p-[8px] rounded-[6px] mb-[5px] border ${
            w.selected ? 'bg-rose-50/40 border-rose-300/60' : 'bg-[#FAF7EF] border-divider-grey/20'
          }`}
        >
          <div className="w-[22px] h-[22px] rounded-[4px] bg-gradient-to-br from-emerald-300 to-emerald-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[11px] font-serif font-semibold leading-[1.3]">{w.name}</p>
            <div className="text-[9px] font-serif text-[var(--cs-ink-faint)] flex gap-[8px] items-center mt-[2px]">
              <span>{w.meta}</span>
              <span
                className={`px-[5px] py-[1px] rounded-[3px] tracking-[0.04em] ${
                  w.dim ? 'bg-stone-200/60 text-stone-600' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {w.status}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Section: For incident responders */}
      <p className="text-[9px] uppercase tracking-[0.08em] font-serif text-[var(--cs-ink-faint)] mt-[12px] mb-[8px]">
        For incident responders
      </p>
      {[
        { name: 'Lateral movement timeline', meta: 'Used in 2 dashboards', status: 'Configure connector', dim: true },
        { name: 'Investigation queue', meta: 'Used in 1 dashboard', status: 'Connector ready', dim: false },
      ].map((w) => (
        <div
          key={w.name}
          className="flex gap-[10px] p-[8px] rounded-[6px] mb-[5px] border bg-[#FAF7EF] border-divider-grey/20"
        >
          <div className="w-[22px] h-[22px] rounded-[4px] bg-gradient-to-br from-emerald-300 to-emerald-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[11px] font-serif font-semibold leading-[1.3]">{w.name}</p>
            <div className="text-[9px] font-serif text-[var(--cs-ink-faint)] flex gap-[8px] items-center mt-[2px]">
              <span>{w.meta}</span>
              <span
                className={`px-[5px] py-[1px] rounded-[3px] tracking-[0.04em] ${
                  w.dim ? 'bg-stone-200/60 text-stone-600' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {w.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function BlackberryCaseStudy() {
  return (
    <ProjectPageLayout
      title="Cybersecurity tooling at BlackBerry"
      titleColorClass="text-accent-magenta"
      hero={{ type: 'placeholder' }}
      disclaimer={
        <p className="text-[14px] leading-[1.6] font-serif italic">
          Not all aspects of the design are shown here given the sensitive nature of this work. Happy to walk through the full picture in conversation.
        </p>
      }
      nextHref="/portfolio"
      nextLabel="All projects"
    >
      {/* Meta strip */}
      <MetaStrip
        columns={[
          {
            label: 'Tenure',
            value:
              'Designed for CylancePROTECT and CylanceGATEWAY across XDR and MDR products. Fourteen months end to end.',
          },
          { label: 'Role', value: 'Product Designer' },
          {
            label: 'Team',
            value:
              'Collaborated with external designers from Poland and Argentina. Reported into product, engineering, and director-level stakeholders across the Cylance suite.',
          },
        ]}
      />

      <SectionDivider />

      {/* Stakes */}
      <StakesSection
        heading="Hundreds of alerts per shift, minutes per decision"
        paragraphs={[
          'A SOC analyst triages hundreds of alerts per shift. Most of them are noise. The few that matter need to be triaged, escalated, or closed inside minutes, and the cost of missing one is not measured in usability but in customer breaches.',
          'CylancePROTECT and CylanceGATEWAY are BlackBerry\'s endpoint and network detection products, used by SOC teams at MSPs and enterprises managing multi-tenant security posture. I designed for the analyst surfaces across two years on the Cylance suite, with focus on turning dense investigation data into decision surfaces analysts could act on under time pressure.',
        ]}
      />

      <SectionDivider />

      {/* What I shaped during this tenure (3-up) */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          What I shaped during this tenure
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Three things crossed projects.
        </p>
        <CardGrid
          items={[
            { title: 'Cyber Attack Map', description: 'A single decision surface that replaced cluttered, disconnected event timelines.' },
            { title: 'Widget discovery and classification', description: 'A reorganization of the dashboard-building experience that started with audience, not feature.' },
            { title: 'Research practice', description: 'A research framework that survived beyond my projects and was adopted by adjacent teams.' },
          ]}
        />
      </section>

      {/* Project 01 — Cyber Attack Map */}
      <ProjectSection
        eyebrow="Project 01 · Cyber Attack Map"
        heading="Why we turned cluttered investigation into a single decision surface"
        body={
          <>
            <p>
              Security analysts struggled to correlate events and artifacts across the existing investigation surface. Layouts were dense, the timeline was disconnected from threat data, and analysts had to switch between multiple tools to map a threat to its source.
            </p>
            <p>
              The opportunity was specific. BlackBerry was positioning Cylance for the XDR market, where buyers expect threat investigation to feel coherent, not assembled. The Cyber Attack Map was the answer. One canvas where events, telemetry, and lateral movement collapsed into a single surface analysts could read at a glance.
            </p>
            <p>
              The design call that mattered: <strong className="font-semibold">build the map for the decision, not for the data.</strong> Cluttered timelines tried to surface every event. The map surfaces the path between events. Analysts read the trace, not the noise.
            </p>
          </>
        }
        media={{ type: 'custom', node: <CyberAttackMapMock /> }}
        outcome={{
          metric: '+22%',
          text: 'improvement in SUS score across the analyst cohort. Positive feedback from MSP and SMB customers in post-launch interviews.',
        }}
      />

      {/* Project 02 — Widget discovery */}
      <ProjectSection
        eyebrow="Project 02 · Widget discovery and classification"
        heading="Why dashboard building had to start with audience, not feature"
        body={
          <>
            <p>
              After the Cylance dashboard upgrade shipped, support tickets surfaced a recurring pattern. Customers were finding it harder to discover relevant widgets and build custom dashboards than before. The new component library was richer, but the categorization was built around the engineering taxonomy, not the user&apos;s job.
            </p>
            <p>I ran feedback sessions across three named cohorts.</p>

            {/* Inline cohort list */}
            <ul className="my-[8px] divide-y divide-divider-grey/20 border-y border-divider-grey/20">
              {[
                { num: '01', name: 'Internal SOC team', detail: 'for quick usability access during alpha.' },
                { num: '02', name: 'Customers with established relationships', detail: 'engaged with sales engineers and customer success.' },
                { num: '03', name: 'Product Managers and Product Owners', detail: 'to validate design and implementation assumptions before shipping.' },
              ].map((c) => (
                <li key={c.num} className="flex gap-[14px] py-[12px] text-[13px]">
                  <span className="font-serif font-medium text-[var(--cs-ink-faint)] min-w-[22px]">{c.num}</span>
                  <span className="font-serif leading-[1.55]">
                    <strong className="font-semibold">{c.name}</strong> {c.detail}
                  </span>
                </li>
              ))}
            </ul>

            <p>Two findings landed across all three.</p>

            {/* Inline quotes — block-quote style stickies */}
            <div className="flex flex-col gap-[10px] my-[8px]">
              {[
                { quote: 'It would be great to know where this widget is used in current dashboards.', attr: 'SOC analyst, internal cohort' },
                { quote: 'Will I be able to create new widgets? What’s a connector?', attr: 'Customer in established cohort' },
              ].map((q, i) => (
                <div key={i} className="bg-amber-50 border border-amber-200/60 rounded-[8px] p-[14px]">
                  <p className="text-[13px] leading-[1.5] font-serif italic mb-[8px] text-[var(--cs-ink)]">&ldquo;{q.quote}&rdquo;</p>
                  <p className="text-[11px] font-serif text-[var(--cs-ink-soft)] pt-[6px] border-t border-dashed border-amber-300/60">
                    {q.attr}
                  </p>
                </div>
              ))}
            </div>

            <p>
              The decision: redesign widget discovery around three things. <strong className="font-semibold">What audience the widget served. Where it was already in use. How it could be combined with others.</strong> Categorization was rebuilt around analyst tasks. Connector status moved into the discovery surface so analysts did not have to leave to verify what was wired.
            </p>
          </>
        }
        media={{ type: 'custom', node: <WidgetDiscoveryMock /> }}
        outcome={{
          metric: '4 of 6',
          text:
            'users in usability testing chose to search instead of filtering, validating that the search surface was now the primary path. The dashboard experience shipped to all customers and reduced widget-related support tickets in the post-launch quarter.',
        }}
      />

      {/* Influence beyond projects */}
      <InfluenceSection
        eyebrow="Influence beyond projects"
        heading="A research practice the team kept using"
        intro="Research practice on the Cylance team was project by project before this tenure. I set up a framework that survived beyond my own projects and was adopted by adjacent teams."
        pillars={[
          {
            num: '01',
            title: 'Preliminary user interviews framework',
            description:
              'Documented question sets and interview structures for cloud container and security workflow research. Reusable across teams. Removed the overhead of starting research from scratch each project.',
          },
          {
            num: '02',
            title: 'Feedback collection and prioritization',
            description:
              'Standardized how qualitative input gets logged, categorized, and surfaced into the roadmap. Made customer feedback a structured input to product planning rather than a stack of unsorted notes.',
          },
          {
            num: '03',
            title: 'Insights as a shared resource',
            description:
              'Maintained product-wide research insights as a living document available to product, engineering, and design. Advocated for changes at the right moments rather than only at design review.',
          },
          {
            num: '04',
            title: 'Weekly check-ins with the team',
            description:
              'Surfaced blockers and unblocked research dependencies before they grew. Made research a continuous rhythm rather than a one-time activity.',
          },
        ]}
        coda="The framework continued to be used by adjacent teams after I left. The most concrete outcome of the tenure that did not ship as a feature."
      />

      {/* What carried forward */}
      <section className="mb-[50px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          What carried forward
        </h2>
        <div className="text-[14px] leading-[1.7] font-serif flex flex-col gap-[18px] max-w-[760px]">
          <p>
            The Cyber Attack Map approach, <strong className="font-semibold">design for the decision, not the data</strong>, is the same instinct behind the AI terminal work I am doing now at CyberQP. Different surface, different scale, same pattern. Collapse complexity into a single trustworthy place where the specialist can act.
          </p>
          <p>
            The research practice carried forward too. The discovery framework I am running on the agentic PAM project, including the Opportunity Solution Tree workshop with the partner advisory council, is a direct evolution of the practice I set up here.
          </p>
        </div>
      </section>
    </ProjectPageLayout>
  )
}

"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'
import { MetaStrip } from '@/components/case-study/MetaStrip'
import { SectionDivider } from '@/components/case-study/SectionDivider'
import { StakesSection } from '@/components/case-study/StakesSection'
import { HypothesisBlock } from '@/components/case-study/HypothesisBlock'
import { CardGrid } from '@/components/case-study/CardGrid'
import { CardStack } from '@/components/case-study/CardStack'
import { DecisionRow } from '@/components/case-study/DecisionRow'
import { ImpactRow } from '@/components/case-study/ImpactRow'
import { ItalicCoda } from '@/components/case-study/ItalicCoda'
import { JourneyMap } from '@/components/case-study/JourneyMap'

// ─── Inline Decision dashboard mocks ────────────────────────────────────────

function ReadinessDashboardMock() {
  const gaps = [
    { tone: 'alert', title: 'External sharing', detail: '18,724 public groups detected', count: '18.7K' },
    { tone: 'warn', title: 'Document classification', detail: '62% of documents unclassified', count: '62%' },
    { tone: 'warn', title: 'Group permissions', detail: '240 groups with broad access', count: '240' },
  ] as const

  return (
    <div className="bg-white rounded-[8px] border border-divider-grey/30 p-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div className="flex justify-between items-center mb-[14px] pb-[10px] border-b border-divider-grey/20">
        <p className="text-[13px] font-serif font-semibold">Acme Corporation · Readiness</p>
        <span className="text-[10px] font-serif text-[#6B6757] bg-[#F8F5EE] px-[8px] py-[3px] rounded-[4px] tracking-[0.04em]">
          Score: 72
        </span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.08em] font-serif text-[#9e9e9e] mb-[8px]">Issues to address</p>
      {gaps.map((g) => (
        <div
          key={g.title}
          className="bg-[#FAF7EF] border border-divider-grey/20 rounded-[6px] p-[10px] mb-[6px] flex items-center gap-[12px]"
        >
          <div
            className={`w-[28px] h-[28px] rounded-[6px] flex items-center justify-center flex-shrink-0 text-[14px] font-bold ${
              g.tone === 'alert' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            !
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-serif font-semibold leading-[1.3]">{g.title}</p>
            <p className="text-[9px] font-serif text-[#9e9e9e] mt-[2px]">{g.detail}</p>
          </div>
          <span className="text-[11px] font-serif font-semibold tracking-[0.02em]">{g.count}</span>
        </div>
      ))}
    </div>
  )
}

function BeforeAfterMock() {
  return (
    <div className="bg-white rounded-[8px] border border-divider-grey/30 p-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <p className="text-[10px] uppercase tracking-[0.08em] font-serif text-[#9e9e9e] mb-[8px]">Before · Score-led</p>
      <div className="text-center py-[18px] bg-[#FAF7EF] rounded-[6px] mb-[14px]">
        <p className="font-serif text-[48px] font-medium leading-none">72</p>
        <p className="text-[10px] font-serif text-[#9e9e9e] mt-[4px]">Readiness score</p>
      </div>
      <p className="text-[10px] uppercase tracking-[0.08em] font-serif text-[#9e9e9e] mb-[8px]">After · Gap-led</p>
      {[
        { tone: 'alert', title: 'External sharing · 18,724 groups', detail: 'Recommended: review and reduce to need-only' },
        { tone: 'warn', title: 'Document classification · 62% unset', detail: 'Recommended: classify HR, Finance, Legal first' },
      ].map((g) => (
        <div
          key={g.title}
          className="bg-[#FAF7EF] border border-divider-grey/20 rounded-[6px] p-[10px] mb-[4px] flex items-center gap-[12px]"
        >
          <div
            className={`w-[28px] h-[28px] rounded-[6px] flex items-center justify-center flex-shrink-0 text-[14px] font-bold ${
              g.tone === 'alert' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            !
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-serif font-semibold leading-[1.3]">{g.title}</p>
            <p className="text-[9px] font-serif text-[#9e9e9e] mt-[2px]">{g.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SourceAttributionMock() {
  const rows = [
    { label: 'Public groups', value: '18,724', source: 'From SharePoint · Entra ID', link: 'Open in admin center →' },
    { label: 'Sensitive docs unclassified', value: '2,840', source: 'From Purview labels · Last scan 2h ago', link: 'Open in compliance portal →' },
    { label: 'External sharing rules', value: '14', source: 'From SharePoint tenant policy', link: 'Open in SharePoint admin →' },
  ]

  return (
    <div className="bg-white rounded-[8px] border border-divider-grey/30 p-[18px] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`py-[10px] ${i < rows.length - 1 ? 'border-b border-divider-grey/20' : ''}`}
        >
          <div className="flex justify-between items-baseline mb-[6px]">
            <p className="text-[11px] font-serif font-semibold">{r.label}</p>
            <p className="font-serif text-[18px] font-medium">{r.value}</p>
          </div>
          <p className="text-[9px] uppercase tracking-[0.08em] font-serif text-[#9e9e9e] flex items-center gap-[6px]">
            <span className="w-[6px] h-[6px] bg-blue-600 rounded-[1px] inline-block" />
            {r.source}
          </p>
          <p className="text-[9px] font-serif text-emerald-700 underline mt-[4px]">{r.link}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function CopilotCaseStudy() {
  return (
    <ProjectPageLayout
      title="Copilot tenant assessment"
      titleColorClass="text-accent-blue"
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
          { label: 'Role', value: 'Senior Product Designer' },
          { label: 'Team', value: 'Product Manager, Designer, Engineering, Engineering Manager' },
          { label: 'Stakeholders', value: 'VP Product (ShareGate), VP Design, Partner lead' },
        ]}
      />

      <SectionDivider />

      {/* Stakes */}
      <StakesSection
        heading="Copilot reads everything an organization has access to"
        paragraphs={[
          'Microsoft Copilot rolled out in 2023 with a known operational gap. Copilot reads everything an organization has access to. SMBs running Microsoft 365 had spent years stitching together share permissions, group memberships, and document sensitivity rules without auditing them. Turning Copilot on without cleaning that house meant private salaries, performance reviews, and contracts could surface in an answer to a junior employee\'s question.',
          'ShareGate is the Microsoft 365 management suite that thousands of SMB partners and consultants use to manage tenant configuration. The Copilot tenant assessment is the readiness check we built into ShareGate Protect: a single workflow that audits an organization\'s data governance posture and surfaces what needs to change before Copilot is enabled.',
        ]}
      />

      <SectionDivider />

      {/* What I shaped (with Hypothesis nested) */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          What I shaped
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Four architectural calls anchored the design.
        </p>
        <div className="mb-[40px]">
          <CardGrid
            items={[
              { title: 'Readiness, not capability', description: 'The assessment tells an organization what to fix, not what Copilot can do for them.' },
              { title: 'Gaps before scores', description: 'Score-first design hides the actionable detail. Lead with specific gaps, summarize after.' },
              { title: 'Source visibility on every metric', description: 'Every number names its underlying data so consultants can verify before they recommend.' },
              { title: 'The journey, not the report', description: 'A recurring step in a rollout cycle, not a one-time PDF.' },
            ]}
          />
        </div>
        <HypothesisBlock body="Doing a readiness assessment is a prerequisite for enabling Copilot in an organization. Without it, the AI will surface data the organization didn't realize it was exposing." />
      </section>

      {/* Research */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          Research
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          Discovery ran across three cohorts.
        </p>

        <div className="mb-[40px]">
          <CardStack
            items={[
              { num: '01', title: 'SMB IT managers responsible for tenant configuration', description: 'What they were already doing to prepare for Copilot, what they had no visibility into.' },
              { num: '02', title: 'Microsoft consultants and partner organizations', description: 'The intermediary advisors most SMBs hired to handle Copilot rollout. What they needed to recommend with confidence.' },
              { num: '03', title: 'Internal product and partner success teams', description: 'Where ShareGate Protect already had detection capability, where new detection had to be built.' },
            ]}
          />
        </div>

        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          Three findings carried the design direction.
        </p>

        {/* Quote stickies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[40px]">
          {[
            { quote: 'It’s not just about the data, it’s about understanding the people using it.', attr: 'Twan Van Vlerken, IT Manager' },
            { quote: 'We really need more granular control over permission granting, especially for consultants during Copilot deployments.', attr: 'Andrei Burdujan, IT Admin' },
            { quote: 'There’s always going to be that compliance-driven need to keep certain data, even if it’s inactive, so labeling everything red isn’t helpful.', attr: 'Robert Bostrom, Consultant' },
          ].map((q, i) => (
            <div key={i} className="bg-amber-50 border border-amber-200/60 rounded-figure-card p-[20px]">
              <p className="text-[14px] leading-[1.55] font-serif italic mb-[12px] text-[#2C2820]">&ldquo;{q.quote}&rdquo;</p>
              <p className="text-[12px] font-serif text-[#6B6757] pt-[8px] border-t border-dashed border-amber-300/60">{q.attr}</p>
            </div>
          ))}
        </div>

        {/* Customer journey map */}
        <div className="mb-[40px]">
          <JourneyMap
            title="Customer Journey · Copilot Rollout Cycle"
            stages={[
              { num: '01', name: 'Request' },
              { num: '02', name: 'Decision' },
              { num: '03', name: 'Initial readiness assessment', focus: true },
              { num: '04', name: 'Run a pilot' },
              { num: '05', name: 'Evaluate results' },
            ]}
            rows={[
              {
                label: 'Covered by ShareGate',
                cells: [
                  null,
                  null,
                  {
                    focus: true,
                    content: (
                      <>
                        <strong className="font-serif font-semibold">Focus for v1 launch</strong>
                        <br />
                        Permissions audit, group review, sensitivity check
                      </>
                    ),
                  },
                  null,
                  null,
                ],
              },
              {
                label: 'Opportunities',
                cells: [
                  { content: 'Pre-decision support' },
                  { content: 'Decision frameworks' },
                  { content: 'Assessment tool, gap surfacing', focus: true },
                  { content: 'Pilot scope, control rules' },
                  { content: 'Outcome measurement' },
                ],
              },
            ]}
          />
        </div>

        <p className="text-[14px] leading-[1.6] font-serif max-w-[760px]">
          The journey map shifted the team’s framing. The original scope was a static report. The mapped journey showed the assessment as a step inside a longer cycle, one consultants would return to rather than a one-time PDF.
        </p>
      </section>

      {/* Design principles */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          Design principles
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          These four principles anchored every design decision.
        </p>
        <CardGrid
          items={[
            { title: 'Clarity over complexity', description: 'Prioritize presenting data in a way that is easy to understand at a glance. Three to five gap categories per screen, not twenty.' },
            { title: 'Prioritize key insights', description: 'Highlight how data relates to readiness and actionable insights. Each gap leads with the one number that drives the consultant’s next conversation.' },
            { title: 'Contextual relevance', description: 'Every visual element serves a purpose. Reuse Microsoft’s terminology, lead users to best practices through passive recommendations.' },
            { title: 'Data integrity and transparency', description: 'Every chart names the data source and the calculation method. Surface the explanation so users trust the visualizations.' },
          ]}
        />
      </section>

      {/* Decision 01 */}
      <DecisionRow
        eyebrow="Decision 01"
        heading="Why readiness, not capability, was the framing"
        paragraphs={[
          'The first scope draft framed the product around what Copilot could do for organizations once enabled. It was a familiar positioning: marketing leads with AI capability, product follows with the assessment as a step before activation.',
          'The framing did not survive customer interviews. Consultants were not being asked "is Copilot worth it?" They were being asked "how do I make sure Copilot doesn’t embarrass us?" Capability framing answered the wrong question.',
          'We flipped the framing. The product is a readiness check, not a capability preview. The dashboard opens with what is wrong, not what is possible.',
        ]}
        media={{ type: 'custom', node: <ReadinessDashboardMock /> }}
      />

      {/* Decision 02 */}
      <DecisionRow
        eyebrow="Decision 02"
        heading="Why the assessment leads with gaps, not scores"
        paragraphs={[
          'The first prototypes opened with a single readiness score, a number from zero to one hundred summarizing the tenant’s posture. Score-first design is fast to build and compelling in a screenshot. It also hides the work.',
          'In testing, consultants asked the same question every time: "what does the seventy-two mean?" The score earned curiosity but not action. The actionable detail was buried under a summary that obscured it.',
          'The redesign demoted the score. The dashboard opens with three to five gap categories, each with a count, an example, and a recommended next step. The score moves to a secondary panel.',
        ]}
        media={{ type: 'custom', node: <BeforeAfterMock /> }}
      />

      {/* Decision 03 */}
      <DecisionRow
        eyebrow="Decision 03"
        heading="Why every visualization shows its source"
        paragraphs={[
          'Consultants do not recommend changes they cannot verify. The first iteration showed clean charts with calculated values, but the underlying data sources were one click away in a separate panel. Consultants told us in testing that they could not ship a recommendation off a number they could not trace.',
          'We moved source visibility into the chart itself. Every metric shows which Microsoft 365 surface it came from, how it was calculated, and where the consultant could open the underlying configuration. The data integrity principle stopped being a stated value and became a structural pattern.',
        ]}
        media={{ type: 'custom', node: <SourceAttributionMock /> }}
      />

      {/* Business impact */}
      <section className="py-[37px] mb-[50px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[20px]">
          Business impact
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          The Copilot tenant assessment shipped in September 2024 as part of ShareGate Protect. Three measurable outcomes carry the case.
        </p>
        <ImpactRow
          rows={[
            {
              metric: '+24%',
              metricLabel: 'Product acquisition',
              label: 'Acquisition',
              text: '24% increase in ShareGate Protect acquisition since the assessment launch. The assessment became the entry point for partners adding ShareGate Protect to their Copilot rollout services.',
            },
            {
              metric: '+8%',
              metricLabel: 'Sales, launch quarter',
              label: 'Sales lift',
              text: '8% increase in ShareGate sales in the launch quarter, with consultants reporting the assessment as a renewal driver.',
            },
            {
              metric: '↑',
              metricLabel: 'Trials & renewals',
              label: 'Trial expansion',
              text: 'Positive lift in new trial users specifically for the Copilot readiness assessment workflow, plus reported renewal request increases from existing ShareGate partners.',
            },
          ]}
        />
        <ItalicCoda>
          Numbers are directional and have been adjusted to preserve competitive and customer data. Happy to walk through the real figures and methodology in conversation.
        </ItalicCoda>
      </section>

      {/* What's still open */}
      <section className="py-[37px] mb-[50px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[20px]">
          What&apos;s still open
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          Two problems are open as the assessment expands.
        </p>
        <ImpactRow
          rows={[
            {
              label: 'From assessment to remediation',
              text: 'The assessment surfaces gaps. The next product question is whether to surface fixes, automated or guided, for the most common gap categories, and where the line is between consultant-led and product-led remediation.',
            },
            {
              label: 'From SMB to mid-market',
              text: 'The current assessment is scoped to SMB tenants where the consultant is the primary user. Mid-market organizations have internal IT teams with different mental models and different governance baselines. The next iteration tests whether the same flow holds, or whether the audience needs its own design.',
            },
          ]}
        />
        <ItalicCoda>
          The Copilot rollout is one of several AI integrations that demand pre-deployment readiness work. Patterns from this project, gaps before scores, source visibility, readiness as a recurring step, are templates for the next ones.
        </ItalicCoda>
      </section>
    </ProjectPageLayout>
  )
}

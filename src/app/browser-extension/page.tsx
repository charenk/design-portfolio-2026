"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'
import { MetaStrip } from '@/components/case-study/MetaStrip'
import { SectionDivider } from '@/components/case-study/SectionDivider'
import { StakesSection } from '@/components/case-study/StakesSection'
import { CardGrid } from '@/components/case-study/CardGrid'
import { CardStack } from '@/components/case-study/CardStack'
import { DecisionRow } from '@/components/case-study/DecisionRow'
import { ImpactRow } from '@/components/case-study/ImpactRow'
import { ItalicCoda } from '@/components/case-study/ItalicCoda'
import { LandscapeTable } from '@/components/case-study/LandscapeTable'

export default function BrowserExtensionCaseStudy() {
  return (
    <ProjectPageLayout
      title="Browser extension for privileged account access"
      titleColorClass="text-accent-magenta"
      hero={{
        type: 'image',
        src: '/browser-extension-banner.svg',
        alt: 'Browser extension hero showing customer search, account list, credentials panel, and live OTP countdown',
      }}
      disclaimer={
        <p className="text-[14px] leading-[1.6] font-serif italic">
          Not all aspects of the design are shown here given the sensitive nature of this work. Happy to walk through the full picture in conversation.
        </p>
      }
      nextHref="/refinery"
      nextLabel="Refinery"
    >
      {/* Meta strip */}
      <MetaStrip
        columns={[
          { label: 'Scope', value: 'Designed and shipped the CyberQP browser extension so technicians could access privileged identities, organizational secrets, and just in time accounts from one tool, replacing the multiple tools they had been switching between. Three use cases shipped in sequence.' },
          { label: 'Role', value: 'Lead designer' },
          { label: 'Team', value: 'Product Manager, four engineers, one designer' },
        ]}
      />

      <SectionDivider />

      {/* Stakes */}
      <StakesSection
        heading="Credentials in one extension, privileged accounts in another"
        paragraphs={[
          'For an MSP technician, getting into a client system is rarely a single step. Vault credentials sit in a consumer browser extension, privileged accounts sit inside the CyberQP dashboard, and documentation lives in a third tool. Each sign in becomes a small consolidation problem the technician has to solve manually, dozens of times a day.',
          'The browser extension was a strategic priority on CyberQP’s product roadmap. The goal was to consolidate privileged account management and organization secrets into one extension that technicians could use day to day, and to retire features that depended on third party integrations as that consolidation happened.',
        ]}
      />

      <SectionDivider />

      {/* What I shaped (with Hypothesis nested) */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          What I shaped
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          The three calls below set the interaction model for the extension, and each new use case absorbed into them without changing the surface.
        </p>
        <div className="mb-[40px]">
          <CardGrid
            items={[
              { title: 'JIT and vault accounts share the same surfaces', description: 'Vault credentials and just in time accounts live in the same two places. The toolbar lists everything, and a Suggested Accounts dropdown surfaces a focused set inline on the sign in page itself.' },
              { title: 'Customer first, account second', description: 'Every workflow scopes by customer first, then account, then action. The order matches how technicians think, not how the data is stored.' },
              { title: 'One pattern, three workflows', description: 'Just in time access, Vault credentials, and ID verification all run on the same interaction model. The technician learns it once and applies it across all three.' },
            ]}
          />
        </div>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Working with stakeholders through discovery and design, I held and managed several hypotheses across the project. Each one defined what success would look like and shaped which solutions we prioritized to test against those metrics.
        </p>
      </section>

      {/* Research */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          Research
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          User discovery for the browser extension ran in three directions at once. I owned the work with the Product Manager, while engineering scoped the technical surface and integration points in parallel.
        </p>

        <div className="mb-[40px]">
          <CardStack
            items={[
              { num: '01', title: 'MSP technicians running consumer password managers alongside CyberQP', description: 'What tools they were stitching together, where the friction landed in a typical day, and what they had given up trying to fix.' },
              { num: '02', title: 'Help desk staff handling end user verification calls', description: 'A separate workflow with the same underlying problem: privileged credentials and verification controls that lived nowhere near the place the work happened.' },
              { num: '03', title: 'Partner advisory council representing seven midsize MSP operations', description: 'Strategic level input on what would and would not make it into a daily workflow.' },
            ]}
          />
        </div>

        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          The first cohort surfaced the most concrete pattern. MSPs were running two systems in parallel, with a consumer password manager like 1Password, Keeper, or LastPass for credentials, and CyberQP in a separate tab for privileged access. Two tools doing related work, neither of them designed for where the sign in actually happens.
        </p>

        {/* Quote stickies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] mb-[40px]">
          {[
            { quote: 'By the time I have looked up the PSA, the directory, and the credential, I have spent more time on the lookup than on the actual sign in. We do this dozens of times a day.', attr: 'Technician, regional MSP' },
            { quote: 'I open three browser tabs and a desktop app to verify one user. The user is on hold the whole time.', attr: 'Help desk lead, multi tenant MSP' },
            { quote: 'When will we have access requests in the browser extension? This would be a tremendous boost to our productivity.', attr: 'Partner advisory council member' },
          ].map((q, i) => (
            <div key={i} className="bg-amber-50 border border-amber-200/60 rounded-figure-card p-[20px]">
              <p className="text-[14px] leading-[1.55] font-serif italic mb-[12px] text-[#2C2820]">&ldquo;{q.quote}&rdquo;</p>
              <p className="text-[12px] font-serif text-[#6B6757] pt-[8px] border-t border-dashed border-amber-300/60">{q.attr}</p>
            </div>
          ))}
        </div>

        {/* Tool landscape */}
        <div className="mb-[40px]">
          <LandscapeTable
            title="Tool Landscape · What MSPs Were Using"
            columns={['Credential vault', 'JIT activation', 'PAM-grade audit']}
            sections={[
              {
                label: 'Consumer password managers',
                rows: [
                  { name: '1Password', cells: ['yes', 'no', 'no'] },
                  { name: 'Keeper', cells: ['yes', 'no', 'partial'] },
                  { name: 'LastPass', cells: ['yes', 'no', 'no'] },
                ],
              },
              {
                label: 'Documentation tools',
                rows: [{ name: 'ITGlue', cells: ['partial', 'no', 'no'] }],
              },
              {
                label: 'PAM platforms',
                rows: [
                  { name: 'CyberQP browser extension', cells: ['yes', 'yes', 'yes'], emphasized: true },
                ],
              },
            ]}
          />
        </div>

        <p className="text-[14px] leading-[1.6] font-serif max-w-[760px]">
          The partner advisory council had been asking for a browser extension for over a year before the project started. The research did not surface a new need, it quantified one we already had a year of qualitative signal on.
        </p>
      </section>

      {/* Solution elements */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          Solution elements
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Through discovery, three design principles took shape. I drafted them with product and engineering, and they describe how the extension behaves under any new workflow added to its surface, not just the three already shipped.
        </p>
        <CardGrid
          items={[
            { title: 'Access belongs where work happens', description: 'The toolbar holds everything, and the sign in page surfaces a focused list inline. Vault credentials and just in time access both live in the same surfaces, so neither one pulls the technician away from where they are working.' },
            { title: 'Customer first, account second', description: 'Scoping by customer first, account second holds across every workflow. New use cases adopt the same order because it matches how the technician thinks, not how the data is structured.' },
            { title: 'One pattern across many workflows', description: 'One interaction model absorbs many workflows. New use cases adopt the same scoping, placement, and trust signals, so the extension keeps working the same way as it grows.' },
          ]}
        />
        <p className="text-[14px] leading-[1.6] font-serif mt-[30px] max-w-[760px]">
          These elements set the foundation for content writing on the new platform, covering voice, terminology, and the interaction patterns specific to the extension surface.
        </p>
        <p className="text-[14px] leading-[1.6] font-serif mt-[18px] max-w-[760px]">
          The decisions below are where these elements met real product trade offs, including the first design call about where the extension should live.
        </p>
      </section>

      {/* Decision 01 */}
      <DecisionRow
        eyebrow="Decision 01"
        heading="Why technicians got just in time access before vault credentials"
        paragraphs={[
          'We started with the vault. Building a password manager for MSP technicians was the obvious first step, and the team scoped a vault credential workflow that worked from both the toolbar and inline on sign in pages, modeled on consumer password manager patterns. Discovery changed the order.',
          'Across all three cohorts, technicians named just in time account access as the bigger unmet need. Vault credentials were already handled by 1Password, Keeper, and LastPass, well enough that switching from them was not the priority. JIT was the gap. No consumer password manager issues temporary privileged credentials for client systems, and that workflow happens dozens of times a day for an MSP technician.',
          'We pivoted. The first release shipped just in time account access for Microsoft 365, with the vault credential workflow following six months later. The dual surface (toolbar plus inline Suggested Accounts dropdown) carried across both, so the order of release did not change how the extension works for either kind of account.',
        ]}
        media={{
          type: 'image',
          src: '/assets/browser-ext-access-inline.svg',
          alt: 'Microsoft sign in page with the extension panel showing Suggested Accounts inline',
        }}
      />

      {/* Decision 02 */}
      <DecisionRow
        eyebrow="Decision 02"
        heading="Why we scoped by customer first, account second"
        paragraphs={[
          'MSP technicians manage dozens of client organizations at once, and a flat account list meant scrolling past every other org to find the right one. The activation flow scopes by customer first, account second, which cuts the selection down to a handful of entries for whichever client the technician is working in.',
          'The same scoping runs across every workflow the extension supports. Pick the client, then the account, then the action, which matches the technician’s mental model rather than the data model underneath.',
        ]}
        media={{
          type: 'image',
          src: '/assets/browser-ext-customer-first.svg',
          alt: 'Activate just in time account modal showing customer dropdown selected first, then account',
        }}
      />

      {/* Decision 03 */}
      <DecisionRow
        eyebrow="Decision 03"
        heading="Why one pattern absorbed three workflows"
        paragraphs={[
          'The first release covered just in time activation for Microsoft 365. Vault credentials for apps outside M365 shipped as the second use case six months later, and end user ID verification is the third, shipping with PSA connector integration.',
          'Three workflows, three different jobs to be done, but the interaction model did not change between any of them. Same scoping (customer first, account second). Same placement (toolbar plus inline Suggested Accounts dropdown). Same trust signals (live countdown on time bound credentials). The technician learns the pattern once and applies it three times.',
          'The decision that made this hold was treating the extension as one surface with multiple modes, not three feature areas that happened to share a window.',
        ]}
        media={{
          type: 'image',
          src: '/assets/browser-ext-pattern-held.svg',
          alt: 'Vault credential view in the extension showing the same interaction pattern carrying across use cases',
        }}
      />

      {/* Business impact */}
      <section className="py-[37px] mb-[50px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[20px]">
          Business impact
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          The browser extension shipped publicly in early 2024 and has run as the most adopted CyberQP product launch since. Three outcomes carry the case.
        </p>
        <ImpactRow
          rows={[
            {
              metric: '40+%',
              metricLabel: 'Adoption',
              text: 'Active MSP customers adopted the extension within six months of launch, the fastest adoption curve of any product release in the company’s history.',
            },
            {
              metric: '40K+',
              metricLabel: 'Activations / month',
              text: 'Over 40,000 just in time activations per month flowed through the extension within the first year, and each one cut roughly 25 to 30 seconds of context switching versus the equivalent flow without the extension.',
            },
            {
              metric: '2 / 3',
              metricLabel: 'Use cases shipped',
              text: 'Vault credentials shipped as the second use case without changes to the core interaction model, and ID verification is shipping as the third with the same pattern intact. Partner advisory council named the extension the most requested productivity improvement delivered in the past two years.',
            },
          ]}
        />
        <ItalicCoda>
          Numbers are directional and have been adjusted to preserve competitive and customer data. Happy to walk through the real figures and methodology in conversation.
        </ItalicCoda>
      </section>

      {/* What's next */}
      <section className="py-[37px] mb-[50px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[20px]">
          What&apos;s next
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif max-w-[760px]">
          ID verification ships next with PSA connector integration, and the open question is whether the pattern that worked for one help desk team holds when a single MSP runs 50 verification calls a day across 30 client organizations, each with different policies and different end user populations.
        </p>
        <ItalicCoda>
          Two more access management surfaces follow this one. Each starts from the same dual surface model and the customer first scoping that held through three workflows here.
        </ItalicCoda>
      </section>
    </ProjectPageLayout>
  )
}

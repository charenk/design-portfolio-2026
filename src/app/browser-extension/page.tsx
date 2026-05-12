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
      nextHref="/figma-buddy"
      nextLabel="Figma Buddy"
    >
      {/* Meta strip */}
      <MetaStrip
        columns={[
          { label: 'Role', value: 'Lead designer' },
          { label: 'Team', value: 'Product Manager, four engineers, one designer' },
          { label: 'Scope', value: 'Browser extension interaction design, from the first just in time release through Vault credentials and the planned end user ID verification workflow.' },
        ]}
      />

      <SectionDivider />

      {/* Stakes */}
      <StakesSection
        heading="A half hour of context loss per technician, every day"
        paragraphs={[
          'An MSP technician switches between five tools to complete a single sign in. The password manager. The documentation tool. The PAM dashboard. The PSA. The application they are actually signing into. Each switch costs 25 to 30 seconds, and across dozens of sign ins per day, that adds up to a half hour of context loss per technician.',
          'CyberQP is the PAM platform 1000+ MSPs use to manage privileged access. I led the design for putting privileged account access and just in time activation directly inside the sign in pages technicians work in every day, so credentials and activation controls show up where the work actually happens.',
        ]}
      />

      <SectionDivider />

      {/* What I shaped (with Hypothesis nested) */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          What I shaped
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Below are selected foundational decisions and guidelines that survived from the first release through Vault credentials and into the third use case shipping now.
        </p>
        <div className="mb-[40px]">
          <CardGrid
            items={[
              { title: 'In page injection over toolbar popup', description: 'The extension lives inside the sign in page itself, not in a popup adjacent to it. The first prototype tested both, and the in page version cut measurably more friction than the toolbar version did.' },
              { title: 'Customer first, account second', description: 'MSP technicians manage dozens of client organizations, and a flat account list would have meant scrolling past every other org to find the right one. The activation flow scopes by customer first, then account, then action, matching how technicians think rather than how the data is structured.' },
              { title: 'One pattern, three workflows', description: 'Just in time activation, Vault credentials, and ID verification all run on the same interaction model. The technician learns the pattern once and applies it three times, without each new use case demanding a new mental model.' },
              { title: 'Visible time on time bound credentials', description: 'A live countdown sits next to every time bound credential so the technician always knows exactly how long they have. Without that visibility, time bound credentials end up feeling less safe, not more.' },
            ]}
          />
        </div>
        <p className="text-[14px] leading-[1.6] font-serif mb-[30px] max-w-[760px]">
          Working with stakeholders and cross functional teams, I held several hypotheses through discovery and design. The one below carried the most weight, and the rest of the case study walks through the solutions it produced.
        </p>
        <HypothesisBlock body="Privileged access tools that ask technicians to switch tabs lose the time they were meant to save. The extension is viable only if it lives where the sign in happens, not in a popup adjacent to it." />
      </section>

      {/* Research */}
      <section className="mb-[80px]">
        <h2 className="font-serif font-normal text-[26px] md:text-[34px] leading-[1.2] mb-[28px]">
          Research
        </h2>
        <p className="text-[14px] leading-[1.6] font-serif mb-[24px] max-w-[760px]">
          While engineering scoped the technical surface and integration points, I led user discovery across three cohorts alongside the Product Manager.
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
            { quote: 'By the time I have looked up the PSA, the directory, and the credential, I have spent more time on the lookup than on the actual sign-in. We do this dozens of times a day.', attr: 'Technician, regional MSP' },
            { quote: 'I open three browser tabs and a desktop app to verify one user. The user is on hold the whole time.', attr: 'Help desk lead, multi-tenant MSP' },
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
          Discovery surfaced more than the friction of switching tabs. It also produced four design elements I drafted with product and engineering, and they held from the first release through two more iterations.
        </p>
        <CardGrid
          items={[
            { title: 'Access belongs where work happens', description: 'The closer access sits to where the technician is actually working, the less friction it creates. A popup adjacent to the sign in page is still adjacent, and that is still a context switch the extension was meant to remove.' },
            { title: 'Customer first, account second', description: 'Scoping by customer first, account second holds across every workflow the extension supports. Each new use case picks up the same order automatically because the order matches the technician’s mental model rather than the data model underneath.' },
            { title: 'One pattern across many workflows', description: 'One interaction model absorbs many workflows. New use cases adopt the same scoping, placement, and trust signals, so the extension keeps working the same way as it grows.' },
            { title: 'Time bound credentials need visible time', description: 'Visibility is what makes short lived credentials safer in practice, not the short lifespan on its own. The live countdown is the element that turns a security claim into a usable interaction.' },
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
        heading="Why we put the extension inside the page, not in a toolbar popup"
        paragraphs={[
          'The first design call was where the extension lives. A popup anchored to the browser toolbar was the obvious starting point, since every consumer password manager works that way and the pattern would be familiar to technicians.',
          'But a popup still meant a click away from the sign in field, plus a focus shift, plus a context switch from the page they were working on. That is the same tab switching problem the extension was supposed to solve. We tested both, and while the popup was rated as cleaner, the in page injection was rated as faster.',
          'Faster won. The extension surfaces a Suggested Accounts list directly inside the sign in page, with just in time activation inline and a live countdown next to the one time code.',
        ]}
        media={{
          type: 'image',
          src: '/assets/browser-ext-access-inline.svg',
          alt: 'Microsoft sign in page with Suggested Accounts surfaced inline by the extension',
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
          'Three workflows, three different jobs to be done, but the interaction model did not change between any of them. Same scoping (customer first, account second). Same placement (inline, not popup). Same trust signals (live countdown on time bound credentials). The technician learns the pattern once and applies it three times.',
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
          These decisions held through release. The browser extension shipped publicly in early 2024 and has run as the most adopted CyberQP product launch since, with three measurable outcomes carrying the case.
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
          Two more access management surfaces follow this one. Each starts from the in page injection model, the customer first scoping, and the visible countdown that earned trust here.
        </ItalicCoda>
      </section>
    </ProjectPageLayout>
  )
}

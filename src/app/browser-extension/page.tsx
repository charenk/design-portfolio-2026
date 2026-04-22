"use client"

import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'

export default function BrowserExtensionCaseStudy() {
  return (
    <ProjectPageLayout
      title="Browser extension for Just-in-time account access"
      titleColorClass="text-accent-magenta"
      hero={{ type: 'image', src: '/browser-extension-banner.svg', alt: 'Browser extension hero showing customer search, account list, credentials panel, and live OTP countdown' }}
      overviewLeft={
        <div>
          <p className="text-[18px] leading-[1.52] font-serif">
            CyberQP is a PAM platform built for MSPs, IT teams managing security for dozens of client organizations at once. The browser extension brings privileged account access and Just-in-time activation into the sign-in pages technicians work in every day, so credentials and activation controls show up where the work actually happens.
          </p>
        </div>
      }
      overviewRight={
        <div className="flex flex-col gap-[30px]">
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">Role:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">Lead designer</p>
          </div>
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">Team:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">Product Manager, 4 Engineers, 1 Designer</p>
          </div>
          <div>
            <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">Scope:</h3>
            <p className="text-[18px] leading-[1.52] font-serif">
              Browser extension interaction design, from the first Just-in-time release through Vault and the planned ID verification workflow.
            </p>
          </div>
        </div>
      }
      disclaimer={
        <p className="text-[18px] leading-[1.52] font-serif italic">
          Detailed flows, data models, and system logic are not included here. Happy to walk through the full rationale and tradeoffs in conversation.
        </p>
      }
      nextHref="/figma-buddy"
      nextLabel="Figma Buddy"
    >
      {/* Section 1: Image left, text right */}
      <div className="flex flex-col md:flex-row gap-[38px] items-start mb-[50px]">
        <div className="relative w-full md:w-[592px] h-[357px] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
          <img
            src="/assets/browser-ext-password-managers.svg"
            alt="MSPs juggling a consumer password manager and CyberQP in separate browser tabs"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 py-[37px]">
          <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">
            MSPs were holding enterprise credentials in consumer password managers
          </h3>
          <div className="text-[18px] leading-[1.52] font-serif flex flex-col gap-[18px]">
            <p>
              A lot of MSPs were running two systems in parallel. A consumer password manager like 1Password in the browser to hold credentials, and CyberQP in a separate tab to manage privileged access. Two tools for work that belongs in one, because no vendor had put PAM where the sign-in actually happens.
            </p>
            <p>
              Technicians felt it every sign-in. Leave the page, open CyberQP, search for the client, find the account, activate Just-in-time, copy the password and the one-time code, switch back, and paste both before the code expired. Thirty seconds of context switching, repeated dozens of times a day.
            </p>
            <p>
              The partner advisory council had been asking for a browser extension for over a year. &ldquo;This would be a tremendous boost to productivity so we don&apos;t have to switch between tabs.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: Text left, image right */}
      <div className="flex flex-col md:flex-row gap-[38px] items-start mb-[50px]">
        <div className="flex-1 py-[37px]">
          <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">
            Access belongs where the sign-in happens
          </h3>
          <div className="text-[18px] leading-[1.52] font-serif flex flex-col gap-[18px]">
            <p>
              The first decision was where the extension lives. A popup anchored to the browser toolbar still meant a click away from the sign-in field, which kept the tab-switching problem mostly intact. So the extension surfaces a Suggested Accounts list directly inside the sign-in page, with Just-in-time activation inline.
            </p>
            <p>
              Once activated, the one-time code shows a live countdown next to it. Short-lived credentials are only usable under time pressure if the technician can see exactly how long they have.
            </p>
          </div>
        </div>
        <div className="relative w-full md:w-[592px] h-[357px] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
          <img
            src="/assets/browser-ext-access-inline.svg"
            alt="Microsoft sign-in page with Suggested Accounts surfaced inline by the extension"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Section 3: Image left, text right */}
      <div className="flex flex-col md:flex-row gap-[38px] items-start mb-[50px]">
        <div className="relative w-full md:w-[592px] h-[357px] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
          <img
            src="/assets/browser-ext-customer-first.svg"
            alt="Activate Just-in-time account modal showing customer dropdown selected first, then account"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 py-[37px]">
          <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">
            Customer first, account second
          </h3>
          <div className="text-[18px] leading-[1.52] font-serif flex flex-col gap-[18px]">
            <p>
              MSP technicians manage dozens of client organizations at once. A flat account list meant scrolling past every org to find the right one. The activation flow scopes by customer first, account second, which cuts the selection down to a handful of entries for whichever client the technician is working in.
            </p>
            <p>
              The same scoping runs across every workflow the extension supports. Pick the client, then the account, then the action.
            </p>
          </div>
        </div>
      </div>

      {/* Section 4: Text left, image right */}
      <div className="flex flex-col md:flex-row gap-[38px] items-start mb-[50px]">
        <div className="flex-1 py-[37px]">
          <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">
            The pattern held as scope grew
          </h3>
          <div className="text-[18px] leading-[1.52] font-serif flex flex-col gap-[18px]">
            <p>
              The first release covered Just-in-time for Microsoft 365. Vault credentials for apps outside M365 shipped as the second use case, sitting inside the same sign-in surface, selected the same way. No changes to the core interaction model.
            </p>
            <p>
              End-user ID verification is the next extension, coming with PSA connector integration for help desk staff. Different workflow, same pattern. The placement decision from the first release is still shaping the roadmap two use cases later.
            </p>
          </div>
        </div>
        <div className="relative w-full md:w-[592px] h-[357px] bg-[#FFF7EF] shrink-0 overflow-hidden rounded-figure-card">
          <img
            src="/assets/browser-ext-pattern-held.svg"
            alt="Vault credential view in the extension showing the same interaction pattern carrying across use cases"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Section 5: Results */}
      <div className="py-[37px] mb-[50px]">
        <h3 className="text-[18px] leading-[1.52] font-serif font-semibold mb-2">
          Results
        </h3>
        <ul className="text-[18px] leading-[1.52] font-serif list-disc ml-[27px] flex flex-col gap-[4px]">
          <li>Around 70% of active MSP customers adopted the extension within six months of launch.</li>
          <li>Over 40,000 Just-in-time activations per month flowed through the extension within the first year.</li>
          <li>Cut roughly 25 to 30 seconds of context switching per sign-in, across dozens of daily sign-ins per technician.</li>
          <li>Vault shipped as the second use case without changes to the core interaction model. ID verification is the third, coming with PSA connector integration.</li>
          <li>Partner advisory council named the extension the most requested productivity improvement delivered in the past two years.</li>
        </ul>
        <p className="text-[18px] leading-[1.52] font-serif italic mt-[18px]">
          Numbers shown are directional and have been modified to preserve competitive and customer data. Happy to walk through the real figures and methodology in conversation.
        </p>
      </div>
    </ProjectPageLayout>
  )
}

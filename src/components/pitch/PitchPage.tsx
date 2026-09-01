"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'

/* ------------------------------------------------------------------------- */
/* TODO(content): everything in THEMES below is scaffold copy. The five theme
   titles are final; promises, framing paragraphs, and slot labels are drafts
   for Charen to replace in a single pass. Slot descriptions say what visual
   belongs in each taped frame; swap `slot` placeholders for real imagery by
   replacing the cs-figure-empty block with a cs-figure-media + img.          */
/* ------------------------------------------------------------------------- */

interface ThemeSlot {
  /** Handwritten label inside the taped frame. */
  label: string
  /** What artifact/visual goes in this slot. */
  desc: string
  /** Spans the full gallery width on desktop. */
  wide?: boolean
  /** Real imagery (16:9 slide exports in /public/bluej). When present, one
      taped media frame renders per image instead of the placeholder. */
  images?: { src: string; alt: string }[]
}

/** One entry in a theme group. A plain item (no subItems) is itself a
    taped frame: `desc`/`wide` apply directly. An item WITH subItems is a
    heading over its own mini-gallery: each subItem gets its own anchor,
    rail entry, and frame (e.g. "CyberQP AI Terminal" broken into Context,
    Framing, Iterations...). */
interface ThemeItem {
  label: string
  subItems?: ThemeSlot[]
  desc?: string
  wide?: boolean
  /** Imagery for a leaf item, same shape as ThemeSlot.images. A leaf with
      several slides renders as its own deck without needing sub-items. */
  images?: { src: string; alt: string }[]
}

/** A titled group of items ("Latest", "Others"). Groups render as labeled
    sections in the modal's anchored list and content pane; a group with no
    title renders its items ungrouped. */
interface ThemeGroup {
  items: ThemeItem[]
}

interface Theme {
  /** Anchor id. Overview cards jump-link to `#<id>`. */
  id: string
  title: string
  /** One-line promise on the overview card. */
  promise: string
  /** Short description under the modal title. Keep tight: visuals lead. */
  framing: string[]
  groups: ThemeGroup[]
  /** Slide peeks on the overview card (640w jpgs in /public/bluej/thumbs).
      Decorative: the card's text already names the theme, so these render
      with empty alt. Three read well on the featured card, one elsewhere.
      A thumb may borrow from another theme's deck while this theme's own
      slides are pending (03 borrows the terminal's interaction model). */
  cardThumbs?: string[]
  /** Render every slide as one full-width deck with no rail. For a theme
      that reads as a single continuous story rather than a set of separate
      samples, the rail is navigation nobody needs. */
  fullDeck?: boolean
}

const THEMES: Theme[] = [
  {
    id: 'design-systems',
    title: 'Design system stuff',
    promise:
      'Turning drifting UI into a system teams actually use.',
    framing: [
      'Governing a system at CyberQP, and ShareGate\u2019s move onto Hopper.',
    ],
    cardThumbs: [
      '/bluej/thumbs/ds-intro-1.jpg',
      '/bluej/thumbs/ds-tablecard-2.jpg',
      '/bluej/thumbs/ds-hopper-1.jpg',
    ],
    groups: [
      {
        items: [
          {
            label: 'Design system at CyberQP',
            subItems: [
              {
                label: 'Intro',
                desc: 'The story in one pass: selected samples, the agentic framework, and the platform outcome.',
                images: [
                  {
                    src: '/bluej/ds-intro-1.png',
                    alt: 'Selected work samples: scaling the list-item component with annotated org states, the TableCard component on the identities table, and addressing front-end agent drift',
                  },
                  {
                    src: '/bluej/ds-intro-2.png',
                    alt: 'Design System 2.0, the new agentic design system framework: discovery, prioritize and decide, build and test with Claude, measure and monitor',
                  },
                  {
                    src: '/bluej/ds-intro-3.png',
                    alt: 'Outcome, the biggest UX win: from the legacy product to the new platform design direction, leading the platform redesign alongside design system enhancements',
                  },
                ],
              },
              {
                label: 'Work sample 1',
                desc: 'One enclosing surface for tabs, table, and pagination, from the drift through to the docs the agent reads.',
                images: [
                  {
                    src: '/bluej/ds-tablecard-1.png',
                    alt: 'Work sample 1, before TableCard and refined guidelines: the CyberQP identities screen with three problems marked, tabs floating without a visual or semantic bond to the rows below, a table left without surface treatment as the design language moved toward intentional backgrounds and enclosure, and footer pagination controls standing apart, unbound to any container',
                  },
                  {
                    src: '/bluej/ds-tablecard-2.png',
                    alt: 'TableCard, a surface component that bounds a filterable table alongside its tabs, footer, and supporting UI into one enclosed context: after the definition, the same identities table has its three disconnected pieces unified under one intentional surface, with consistent edge treatment and semantic hierarchy',
                  },
                  {
                    src: '/bluej/ds-tablecard-3.png',
                    alt: 'Behind the scenes working artifact: annotations over the identities table calling out the height of the pagination section, a height mismatch between the row-count and page-count components, an active page state wrongly borrowing the primary button treatment, and inconsistent border radius and background on the row selector, beside a TablePagination component screenshot, captioned about iteratively building, testing, and annotating alongside engineering so the feedback loop runs live rather than after implementation',
                  },
                  {
                    src: '/bluej/ds-tablecard-4.png',
                    alt: 'Final output: TableCard documented in Storybook with all variants, header and footer slot options, and a decision log so the team can build against it without opening Figma, showing the docs page for the TableCard component with its D-028 decision reference beside the untabbed, header slot, footer slot, and page pattern stories',
                  },
                  {
                    src: '/bluej/ds-tablecard-5.png',
                    alt: 'Improving the frontend developer agent: component guidelines, the decision log, and product context feed into frontend-developer.md, live files a frontend developer subagent consumes so every component the agent touches inherits the system\u2019s rules automatically',
                  },
                ],
              },
              {
                label: 'Work sample 2',
                desc: 'Catching drift in an audit, fixing it before it shipped, then closing the gap in the guidelines.',
                images: [
                  {
                    src: '/bluej/ds-drift-1.png',
                    alt: 'Work sample 2, UI defects in dark mode found during audit: the Policies screen where the primary button and menu use gray.900 fills on a near-identical dark canvas, so the container barely separates from the page',
                  },
                  {
                    src: '/bluej/ds-drift-2.png',
                    alt: 'Discovery of drift before the solution hit production: punch item P-030 for the button system with its acceptance criteria, picked from the agent-maintained punch list, severity confirmed in a local audit, then fixed',
                  },
                  {
                    src: '/bluej/ds-drift-3.png',
                    alt: 'Before and after the fix, up close: the Policy and Action controls with near-invisible fills, beside the same controls today with a clear primary button',
                  },
                  {
                    src: '/bluej/ds-drift-4.png',
                    alt: 'Updated and reviewed button guidelines, decision log, and theme file so the system will not reproduce the issue: Button variants documented in Storybook across solid, outline, destructive, destructive outline, and ghost',
                  },
                ],
              },
              {
                label: 'Work sample 3',
                desc: 'Enhancing the menu list item component so organization sync reads on both sides.',
                images: [
                  {
                    src: '/bluej/ds-org-list-1.png',
                    alt: 'Work sample 3, enhancing the menu list item component for organizations: source-side and CyberQP-side org states covering flat orgs, typed orgs, parent-child nesting, selection checkboxes, and marked-to-create badges for both the agent\u2019s action and the user\u2019s',
                  },
                  {
                    src: '/bluej/ds-org-list-2.png',
                    alt: 'Outcome: the updated organization matching experience in the new platform, with source titles matched against CyberQP organizations and unmatched rows called out, beside the legacy organization table it replaced',
                  },
                ],
              },
            ],
          },
          {
            label: 'Hopper Design System',
            subItems: [
              {
                label: 'Overview',
                desc: 'The system itself, shared across ShareGate and Workleap.',
                images: [
                  {
                    src: '/bluej/ds-hopper-1.png',
                    alt: 'Hopper, the Workleap and ShareGate design system at hopper.workleap.design: accessible, international, TypeScript based, with dark mode, plus colors, text styles, and a react-aria component suite',
                  },
                ],
              },
              {
                label: 'Context',
                desc: 'Two UI systems maintained in parallel, and the strategy that ended that.',
                images: [
                  {
                    src: '/bluej/ds-hopper-2.png',
                    alt: 'Context: HR tech and IT products evolved independently, so two UI systems had to be maintained, patterns drifted for years, and teams duplicated effort; the shift was a strategy to integrate the products with a clear ROI in saved engineering and design cycles',
                  },
                ],
              },
              {
                label: 'My role',
                desc: 'Leading the transition, and advocating adoption through design review.',
                images: [
                  {
                    src: '/bluej/ds-hopper-3.png',
                    alt: 'My role: led the design system transition on ShareGate platforms, auditing products for the design system\u2019s discovery, designing and managing the platform\u2019s UI states, then ensuring adoption and building new patterns during design review',
                  },
                ],
              },
              {
                label: 'Working artifacts',
                desc: 'The async pattern-voting workshop, and component documentation.',
                images: [
                  {
                    src: '/bluej/ds-hopper-4.png',
                    alt: 'Behind the scenes: an async voting workshop on Hopper design patterns, where teams spent five votes each across pattern cards to prioritize documentation, producing a ranked list',
                  },
                  {
                    src: '/bluej/ds-hopper-5.png',
                    alt: 'Behind the scenes: component documentation for the Button group, with design requirements, guidelines, a completion checklist, light and dark theme variants, and a changelog entry',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    /* A single case study, not a theme: the one deep 0-to-1 story on the
       page. The Copilot tenant assessment and Blackberry attack matrix it
       used to bundle moved out (Blackberry lives in the gallery). */
    id: 'privileged-identities',
    title: 'Discovery of privileged identities',
    promise:
      'Enabling admins to discover and remediate identity risks.',
    framing: [
      'A 0-to-1 case study: from fuzzy problem to shipped product.',
    ],
    cardThumbs: [
      '/bluej/thumbs/pi-ship-discovery.jpg',
    ],
    groups: [
      {
        items: [
          {
            label: 'Discovery of privileged identities',
            subItems: [
              {
                label: 'Problem',
                desc: 'Privileged identities are the primary attack path, and partners had no native way to build that inventory.',
                images: [
                  {
                    src: '/bluej/pi-problem.png',
                    alt: 'Problem: privileged identities are the primary attack path in MSP environments; governing who has access to what starts with knowing every privileged identity across every source, and partners had no native way to build that inventory. Why now: partners were discovering privileged identities through workarounds, exporting from the events telemetry page into external tools, and continuous discovery sessions showed partners begin org and vault setup right after discovery, making discovery the front door to remediation rather than a standalone feature',
                  },
                ],
              },
              {
                label: 'Research and framing',
                desc: 'Discovery sessions, SME privilege-model mapping, and partner advisory feedback shaped the direction.',
                images: [
                  {
                    src: '/bluej/pi-research.png',
                    alt: 'Three inputs shaped the direction: continuous discovery sessions and partner calls surfaced the export workaround and the pattern of setup beginning right after discovery; privilege models were mapped with internal security SMEs across Entra ID, Active Directory, Google, and local sources, since each source names roles and risk differently; and early design vision, drawer, and remediation flows were tested against partner advisory feedback, each iteration narrowing what a technician needs before acting',
                  },
                ],
              },
              {
                label: 'Design explorations',
                desc: 'One drawer contract, pressure-tested across human, workspace, and cloud identities.',
                images: [
                  {
                    src: '/bluej/pi-explorations.png',
                    alt: 'Design exploration canvas for the identity drawer: the discovered-identities screen with an open drawer and its action menu, beside variant boards for Microsoft Cloud Entra ID human identities and Google Cloud workspace identities, annotated that Entra ID and Google model privilege differently, so one drawer contract had to hold its shape while the content flexed, pressure-tested across human, workspace, and cloud identities',
                  },
                ],
              },
              {
                label: 'What shipped',
                desc: 'The discovery module, remediation flows with high-trust communication, and a drawer shared with the vault.',
                images: [
                  {
                    src: '/bluej/pi-ship-discovery.png',
                    alt: 'What shipped, the discovery module: discovered identities tabbed by privileged human, privileged non-human, standard, and standard non-human, filtered per organization beside the zero-knowledge vault folder tree, with the identity drawer open on an account showing overview, roles, groups, and activity plus move to folder, mark as reviewed, and action controls',
                  },
                  {
                    src: '/bluej/pi-ship-remediation.png',
                    alt: 'What shipped, remediation action flows with high-trust communication: archive identity with an explicit opt-in to permanently delete from source, disable account spelling out that sign-in is blocked, sessions are revoked, and the record is preserved, remove from security groups warning that memberships are removed in the source system with all-groups or individual selection, and move to folder with root, global, and local options plus a no-manageable-password state',
                  },
                  {
                    src: '/bluej/pi-ship-drawer.png',
                    alt: 'What shipped, scalable drawer and details presentation between discovery and vault modules: the same identity drawer contract rendered for a discovered identity with move to folder and mark as reviewed, and for a vaulted privileged account with change password, share, and a zero-knowledge vault card exposing copyable account name, password, and email',
                  },
                ],
              },
              {
                label: 'Component standardization',
                desc: 'Behind the scenes: specs to shipped component, from label-value pairs to drawer variants in Storybook.',
                images: [
                  {
                    src: '/bluej/pi-spec-1.png',
                    alt: 'Component standardization, part one: specs defining label and value pairs with regular text, status dot, and badge treatments, ON and OFF badges, two-line labels, and subsection titles; a copying pattern where technical values show a subtle copy icon with hover and clipboard feedback; and display rules for roles, security groups, and activity, with one roles tab per identity, accordion subsections per role type, risk badges with tooltips, eligible and active states, via-security-group attribution, and expiry lines',
                  },
                  {
                    src: '/bluej/pi-spec-2.png',
                    alt: 'Component standardization, part two: the drawer top section split into classifier and actions zones with tabs below, a flexible subtitle slot for text, badges, and icons, four action-row variants from a single dropdown to two buttons plus a more menu with consistent outlined styling rules, and the shipped SideDrawer in Storybook with docs and stories for closed, open, wide tier, and tabs-with-actions states',
                  },
                ],
              },
              {
                label: 'Reporting',
                desc: 'The discovery-to-remediation funnel, measured.',
                images: [
                  {
                    src: '/bluej/pi-ship-reporting.png',
                    alt: 'What shipped, the reporting experience showcasing the discovery-to-remediation funnel: identities discovered, remediated, and vaulted, identity composition across privileged and standard, human and non-human, identities by source and by highest privilege, a remediation-by-source matrix of disabled, deleted, privilege removed, and password rotated, plus an AI agents overview with agents discovered, by privilege, and remediated by action',
                  },
                ],
              },
              {
                label: 'Learnings',
                desc: 'Discovery traction closed deals; remediation sits behind licensing and is gradually picking up.',
                images: [
                  {
                    src: '/bluej/pi-learnings.png',
                    alt: 'Outcome, learnings and next step: discovery value got high traction and helped close deals and acquire new logos, with a strategy of offering discovery as a free trial while remediation actions are feature-gated under licensing, leading to higher discovery adoption while paywalled remediation gradually picks up; next, AI agents are discovered as non-human identities today and remediation patterns for agents are the next design problem',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ai-native',
    title: 'Designing for AI agents',
    promise:
      'AI that experts can trust with real work.',
    framing: [
      'The AI terminal past its proof of concept, and its interaction model.',
    ],
    cardThumbs: [
      '/bluej/thumbs/t2-term-1-overview.jpg',
    ],
    groups: [{ items: [
          {
            label: 'CyberQP AI Terminal',
            subItems: [
              {
                label: 'Overview',
                desc: 'The terminal as it stands: one command bar, scoped to an organization.',
                images: [
                  {
                    src: '/bluej/t2-term-1-overview.png',
                    alt: 'Project one, the all-new CyberQP AI terminal: a dark product shell where the terminal takes a run mode and an organization scope above a prompt line, with sample commands for getting all accounts, showing stale users, and listing active JIT accounts',
                  },
                ],
              },
              {
                label: 'Context',
                desc: 'Where the terminal sat in the platform strategy, what I led, and who I led it with.',
                images: [
                  {
                    src: '/bluej/t2-term-2-context.png',
                    alt: 'Context: the AI terminal was part of CyberQP\u2019s new Panthera platform, a strategic evolution of the legacy product; I led discovery, design, and iteration for the terminal, focused on trust and scalability while translating findings from engineering proofs of concept, and led prompt use-case discovery sessions, working with the AI Lab team alongside the CEO, engineering, head of product, and customer success',
                  },
                ],
              },
              {
                label: 'Evolution of experience',
                desc: 'What the proof of concept did not cover, and what design and product added.',
                images: [
                  {
                    src: '/bluej/t2-term-6-evolution.png',
                    alt: 'Evolution of the experience: the terminal beside a comparison of the proof of concept against the design and product evolution, which added AI onboarding, an intuitive input interaction model that removes the need to remember trigger keys, and dynamic starter prompts',
                  },
                ],
              },
              {
                label: 'Interaction model',
                desc: 'The prompt composition loop: what the input teaches before anything is sent.',
                images: [
                  {
                    src: '/bluej/t2-term-5-interaction.png',
                    alt: 'Interaction model for the command input area: a prompt composition loop where first paint suggests what fits with a rotating placeholder, a bare @ reveals identities, devices, and organizations to teach the whole ontology before the user commits, and three or more characters switch to live records from connected directories',
                  },
                ],
              },
              {
                label: 'Working artifacts',
                desc: 'The components I own for AI and user interaction, and how I prepare prompt use cases.',
                images: [
                  {
                    src: '/bluej/t2-term-3-components.png',
                    alt: 'Behind the scenes: selected components I contributed to and now manage for AI and user interactions, including the command bar and its run-or-automate mode menu, plan-footer buttons through running and executed states, a solution card shell, an approval confirmation form, and a reasoning timeline',
                  },
                  {
                    src: '/bluej/t2-term-4-usecases.png',
                    alt: 'Behind the scenes: how I prepare use-case documents, showing a dashboard and reporting compound-prompts table for the AI terminal that pairs each module and intent with the user prompt and the text or table output it should return',
                  },
                ],
              },
              {
                label: 'Learnings',
                desc: 'What moved onboarding success, and what is still open.',
                images: [
                  {
                    src: '/bluej/t2-term-7-learnings.png',
                    alt: 'Learnings: users arrive with a borrowed mental model and read the terminal behaving unlike their last tool as the product failing; setting capability expectations up front moved onboarding success more than any interface change; and keeping those expectations honest as the model improves is still open',
                  },
                ],
              },
            ],
          },
    ] }],
  },
  {
    id: 'code-first',
    title: 'Code-first design',
    promise:
      'Agentic design setup, skills and process.',
    framing: [
      'From Figma handoffs to shipping front-end code in production.',
    ],
    cardThumbs: [
      '/bluej/thumbs/cf-skills-1.jpg',
    ],
    groups: [{ items: [
      {
        label: 'Overview: Contribution graph',
        desc: 'A year of shipping, split between personal explorations and production work.',
        images: [
          {
            src: '/bluej/cf-overview-1.png',
            alt: 'Transitioning to code-first design: the article \u201cBeing a Designer/Builder in the Agentic Era\u201d on going from handing off Figma files to shipping code in production, beside a year of contribution graphs split into personal projects and AI explorations, then building and maintaining a one-to-one prototype matching prod and contributing directly in prod',
          },
        ],
      },
      {
        label: 'Agentic design process',
        desc: 'Intake, generate, review, hand off: the gates I keep and the ones I let the agent run.',
        images: [
          {
            src: '/bluej/cf-process-1.png',
            alt: 'The agentic design process: an intake gate naming the need and the failure signal from product priorities, unmet needs, Slack, Pendo, and telemetry, then the agent generates volume using org-level and project skills in design mode, then a review gate judging with intent, handing off to engineering and shipping, with customers, subject-matter experts, and signals feeding revisions before ship',
          },
        ],
      },
      {
        label: 'Setup',
        desc: 'The day-to-day cycle: one command to a design branch, a sandbox, and a PR that ships.',
        images: [
          {
            src: '/bluej/cf-process-2.png',
            alt: 'How I contribute to the front-end code of the production app: the Panthera UI design workflow documented in WORKFLOW.md, a day-to-day cycle from one start command to a design branch and sandbox, working in the browser on mocked product pages, committing feature files while sandbox files stay local, then opening a PR that merges to main and deploys to QA',
          },
        ],
      },
      {
        label: 'Skills',
        desc: 'Custom skills that let one designer hold several projects at once.',
        images: [
          {
            src: '/bluej/cf-skills-1.png',
            alt: 'Custom skills that help me lead multiple projects as a sole designer: a data-viz skill built from early design exploration and expanded with knowledge from The Wall Street Journal Guide to Information Graphics, a project-specific cyberqp-design skill holding component and product-module context with design directions and decisions, and Impeccable, shown as a SKILL.md open in the editor and the dashboard it produced',
          },
        ],
      },
    ] }],
  },
  {
    id: 'growth',
    title: 'Growth and activation',
    promise:
      'Getting features discovered and used after launch.',
    framing: [
      'Moving a sales-led product toward product-led growth, and measuring it.',
    ],
    cardThumbs: [
      '/bluej/thumbs/ga-new-context.jpg',
    ],
    groups: [
      {
        items: [
          {
            label: 'CyberQP Panthera platform',
            subItems: [
              {
                label: 'Context',
                desc: 'Carrying the legacy learnings into a baseline self-serve onboarding guide.',
                images: [
                  {
                    src: '/bluej/ga-new-context.png',
                    alt: 'Onboarding for the new CyberQP platform, reusing what the legacy work taught to give the product a baseline self-serve onboarding guide: full state mapping for the six-step setup panel, with the expanded step-one review of organization setup, the collapsed banner, and per-state goals, telemetry, and hypotheses',
                  },
                ],
              },
              {
                label: 'Cross-functional alignment',
                desc: 'Preparing the telemetry framing so product and the wider team could agree what success meant.',
                images: [
                  {
                    src: '/bluej/ga-new-alignment.png',
                    alt: 'Collaborating and preparing for alignment with product and other cross-functional teams: a shared product telemetry and measuring success document mapping each cohort, from pre sign-up through trial, against activation, adoption, habit, and expansion',
                  },
                ],
              },
              {
                label: 'Measuring success',
                desc: 'What the onboarding panel is measured on, and the hypotheses behind it.',
                images: [
                  {
                    src: '/bluej/ga-new-measuring.png',
                    alt: 'Measuring success for the onboarding panel: the goal of getting a tenant from zero data to useful for daily work in one session, rolled-up telemetry from funnel completion to drop-off step and dismiss rate, and hypotheses on showing progress early, the hybrid title pattern, and the sidebar PSA and RMM callout',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        items: [
          {
            label: 'CyberQP legacy',
            subItems: [
              {
                label: 'Context',
                desc: 'A sales-led product losing feature adoption, and the shift to product-led growth.',
                images: [
                  {
                    src: '/bluej/ga-legacy-context.png',
                    alt: 'Context: CyberQP was historically sales led, serving the MSP market with deployment and onboarding that ran for weeks, and feature adoption declined as the offering grew; following the new product-led strategy I led PLG discovery and phased design work on tenant onboarding and setup, and on time to value per organization',
                  },
                ],
              },
              {
                label: 'Onboarding checklist design',
                desc: 'Settling the checklist pattern with a preference test rather than an opinion.',
                images: [
                  {
                    src: '/bluej/ga-legacy-design.png',
                    alt: 'Finalizing the onboarding checklist design through a preference test: option A, a minimal onboarding guide, against option B with more detail and decorative imagery, both shown in the product',
                  },
                ],
              },
              {
                label: 'Outcome',
                desc: 'The guide as it shipped, with per-customer setup pulled into one flow.',
                images: [
                  {
                    src: '/bluej/ga-legacy-outcome.png',
                    alt: 'Outcome in the legacy product: the shipped onboarding guide with progress in the sidebar and a dismissible five-step panel, beside the per-customer setup flow for connecting sources, importing accounts, and configuring security policies',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

/* ------------------------------------------------------------------------- */
/* Gallery: shipped work that is NOT in the five themes, grouped by project
   or product area. A group with several images plays them in sequence in
   the lightbox; its tile carries a count chip and a stacked-paper edge so
   the depth reads before anyone clicks.                                    */
/* ------------------------------------------------------------------------- */

interface GalleryItem {
  /** Anchor id: the lightbox mirrors the open group into the URL hash as
      #g-<id>, so any group (and the series position) is shareable. */
  id: string
  /** 640w grid thumb in /public/bluej/thumbs (the group's first image). */
  thumb: string
  caption: string
  /** One sentence of context, lightbox only. Written lazily; items
      without one just show the caption. */
  note?: string
  /** The group's slides, in the order the lightbox plays them. */
  images: { src: string; alt: string }[]
  /** Groups sharing a series id are chained in the lightbox: past the last
      slide of one, Next lands on a mini overview of the series' next group
      (its cover), then its slides. Grid position doesn't matter; the chain
      follows GALLERY order and skips groups outside the series. */
  series?: string
}

/* Tiles shown before "Show all": one desktop row. */
const GALLERY_PREVIEW_COUNT = 4

const GALLERY: GalleryItem[] = [
  {
    id: 'cyberqp-mobile-app',
    thumb: '/bluej/thumbs/qp-mobile-1.jpg',
    series: 'cyberqp',
    caption: 'CyberQP mobile app',
    note: 'Just-in-time accounts on the go: activate, inspect, and approve privileged access from a phone.',
    images: [
      {
        src: '/bluej/qp-mobile-1.png',
        alt: 'CyberQP mobile app: the just-in-time accounts list filtered to ten active accounts, an account detail with username, current password, a counting-down OTP, expiration, reason, and policy, quick actions to extend time, view authentication history, end session, or delete, and an approval request with reason, request details, a duration picker, and deny or approve',
      },
    ],
  },
  {
    id: 'cyberqp-browser-extension',
    thumb: '/bluej/thumbs/qp-ext-1.jpg',
    series: 'cyberqp',
    caption: 'CyberQP browser extension',
    note: 'Activating a just-in-time account without leaving the browser.',
    images: [
      {
        src: '/bluej/qp-ext-1.png',
        alt: 'CyberQP browser extension: the activate JIT account form with organization, an EverythingInScope policy bundling all directory types, account type options for local, Active Directory, Entra ID, and Google, a device picker, and duration, beside an activated account detail showing standard mode and its activation time',
      },
    ],
  },
  {
    id: 'dtrax-contract-review',
    thumb: '/bluej/thumbs/dtrax-2.jpg',
    caption: 'dTrax AI contract review (Deloitte)',
    note: 'NLP-assisted due diligence for legal contracts: topic models applied at scale, with reviewer actions feeding back into training.',
    images: [
      {
        src: '/bluej/dtrax-2.png',
        alt: 'dTrax admin persona: the all-files view where trained topic models are applied to a thousand contracts with smart categories and completeness check, annotated with the super user access level, train topics available only to admins who annotate and review NLP extraction, and the completeness check that flags contracts with missing pages needing user intervention',
      },
      {
        src: '/bluej/dtrax-1.png',
        alt: 'dTrax reviewer persona: a facilities agreement open beside its extracted text segments, where maturity clause and indemnity extractions carry confidence scores and reject or accept CTAs that validate the extraction and feed back into training the topic models',
      },
    ],
  },
  {
    id: 'blackberry',
    thumb: '/bluej/thumbs/bb-3.jpg',
    caption: 'BlackBerry: Gateway and malware investigation',
    note: 'Secure cloud access clients for desktop, and the Optics console where analysts walk an attack timeline.',
    images: [
      {
        src: '/bluej/bb-3.png',
        alt: 'BlackBerry Gateway secure cloud access on macOS and Windows: work mode enabled with a disable control, time connected, upload and download volume, and a live throughput graph',
      },
      {
        src: '/bluej/bb-1.png',
        alt: 'Carbanak malware investigation, incident details: a hundred alerts listed with severity badges, MITRE technique references, status, device, and user, under counts for active alerts, artifacts impacted, devices at risk, and users vulnerable, with tabs for events, devices, and users and a generate report action',
      },
      {
        src: '/bluej/bb-2.png',
        alt: 'Carbanak malware investigation, alert timeline: wscript.exe decoding content, transmitting data over HTTPS, and downloading a quarantined file, with the investigation report dialog exporting query results and a detailed audit log',
      },
    ],
  },
  {
    id: 'cyberqp-connectors',
    thumb: '/bluej/thumbs/qp-connectors-1.jpg',
    series: 'cyberqp',
    caption: 'CyberQP connectors',
    note: 'One home for PSA, RMM, cloud directory, and endpoint integrations, each with a guided setup.',
    images: [
      {
        src: '/bluej/qp-connectors-1.png',
        alt: 'CyberQP connectors settings: ConnectWise PSA for ticket automation, NinjaOne RMM for org sync, cloud directory connectors for Microsoft Cloud, Microsoft Partner Center GDAP, Microsoft GCC High, and Google, and the Panthera endpoint client download for managing local admin accounts',
      },
      {
        src: '/bluej/qp-connectors-2.png',
        alt: 'Microsoft Cloud connector setup: a three-step flow of connection, zero-knowledge Azure function setup, and review, with organization choice and sign-in enabling Entra ID sync plus optional Azure and Intune discovery',
      },
    ],
  },
  {
    id: 'cyberqp-licensing',
    thumb: '/bluej/thumbs/qp-billing-1.jpg',
    series: 'cyberqp',
    caption: 'License and billing',
    note: 'Freemium licensing for technicians and devices: read is free, licenses gate actions that change things.',
    images: [
      {
        src: '/bluej/qp-billing-1.png',
        alt: 'CyberQP license and billing: a paid technician subscription, the callout that discovery, inventory, audit, and reports stay free and only change-making actions need licenses, license management for technician and device tiers with available, assigned, and requested counts, identity governance usage, and the next billing snapshot',
      },
      {
        src: '/bluej/qp-billing-2.png',
        alt: 'License requests: pending, approved, and denied tabs where technicians who hit a license-gated action ask for one, each request carrying who requested it, the license type, target, organization, triggering action, reason, and submission time',
      },
    ],
  },
  {
    id: 'cyberqp-user-management',
    thumb: '/bluej/thumbs/qp-users-1.jpg',
    series: 'cyberqp',
    caption: 'User and access management',
    note: 'Technicians, security groups, and composable roles with granular permissions.',
    images: [
      {
        src: '/bluej/qp-users-1.png',
        alt: 'CyberQP user and access management: the technicians table with role, status, last activity, security groups, SSO and MFA status, SCIM-provisioned users badged inline, bulk selection with actions, and tabs for security groups and roles',
      },
      {
        src: '/bluej/qp-users-2.png',
        alt: 'Create role: a modal over the roles tab where built-in owner, administrator, technician, and read-only roles sit beside custom ones, composing a role from searchable permission groups for user management and devices with per-group select-all',
      },
    ],
  },
  {
    id: 'cyberqp-event-logs',
    thumb: '/bluej/thumbs/qp-events-1.jpg',
    series: 'cyberqp',
    caption: 'Event logs',
    note: 'Every vault, identity, and policy event, filterable and expandable to full detail.',
    images: [
      {
        src: '/bluej/qp-events-1.png',
        alt: 'CyberQP event logs: system events across vault credentials, policy, identity, and templates over the last seven days, filtered by organization and searchable, with an expanded credential-viewed event exposing category, type, organization, outcome, folder, and client IP',
      },
    ],
  },
]

/** Lightbox position: image -1 is the group's COVER, a mini overview card
    shown when the series chain hands over from one group to the next. */
interface GallerySel {
  group: number
  image: number
}

/* The series neighbor in GALLERY order, skipping groups outside the series. */
function seriesNeighbor(group: number, dir: 1 | -1): number | null {
  const series = GALLERY[group].series
  if (!series) return null
  for (let j = group + dir; j >= 0 && j < GALLERY.length; j += dir) {
    if (GALLERY[j].series === series) return j
  }
  return null
}

/* Where Next/Prev leads from a position, chaining series groups through
   their covers: ... last slide -> next group's cover -> its slide 1 ...
   Standalone groups still dead-end at their edges. */
function gallerystep(sel: GallerySel, dir: 1 | -1): GallerySel | null {
  const { group, image } = sel
  const last = GALLERY[group].images.length - 1
  if (dir === 1) {
    if (image < last) return { group, image: image + 1 }
    const next = seriesNeighbor(group, 1)
    return next !== null ? { group: next, image: -1 } : null
  }
  if (image === -1 || image === 0) {
    /* Off the front of the slides: the cover first, then the previous
       series group's last slide. */
    if (image === 0 && GALLERY[group].series) return { group, image: -1 }
    const prev = seriesNeighbor(group, -1)
    return prev !== null
      ? { group: prev, image: GALLERY[prev].images.length - 1 }
      : null
  }
  return { group, image: image - 1 }
}

/**
 * Full-screen viewer for one gallery GROUP: large contained image, caption,
 * prev/next with arrow keys stepping through the group's own slides, Escape
 * closes. Standalone groups end where the project does; groups in a series
 * chain onward, pausing on the next group's cover so the handover is
 * announced rather than silent.
 */
/* Display names for series ids, used on the cover's collection index. */
const SERIES_LABELS: Record<string, string> = {
  cyberqp: 'CyberQP',
}

function GalleryLightbox({
  group,
  image,
  viewed,
  onNavigate,
  onClose,
}: {
  group: number
  image: number
  /** Group indices whose slides were opened this visit ("Viewed" badges). */
  viewed: number[]
  onNavigate: (next: GallerySel) => void
  onClose: () => void
}) {
  const item = GALLERY[group]
  const onCover = image === -1
  const slide = onCover ? null : item.images[image]
  const closeRef = useRef<HTMLButtonElement>(null)
  const prev = gallerystep({ group, image }, -1)
  const next = gallerystep({ group, image }, 1)
  /* Crossing into another group gets a labelled button; staying inside the
     deck keeps the plain step. */
  const prevLabel = prev && prev.group !== group ? 'Prev project' : 'Prev'
  const nextLabel = next && next.group !== group ? 'Next project' : 'Next'
  const seriesItems = item.series
    ? GALLERY.filter((g) => g.series === item.series)
    : []
  const seriesPos = seriesItems.indexOf(item)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && prev) onNavigate(prev)
      if (e.key === 'ArrowRight' && next) onNavigate(next)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    /* prev/next are fresh objects each render; position is the real dep. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, image, onNavigate, onClose])

  return (
    <motion.div
      className="cs-tmodal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="cs-tmodal-backdrop"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.caption}
        className="cs-glight"
        initial={{ opacity: 0, y: 14, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Title and context lead from the top, with the slide counter
            seated beside the title (matching the theme modal's back-led
            header). The cover card states its own title, so there the
            header carries only Back and the series position. */}
        <header className="cs-glight-bar cs-glight-head">
          <button
            ref={closeRef}
            type="button"
            className="cs-tmodal-back cs-glight-back"
            onClick={onClose}
          >
            <span aria-hidden="true">←</span> Back
          </button>
          <span className="cs-glight-text">
            <span className="cs-glight-titlerow">
              {!onCover && <p className="cs-glight-caption">{item.caption}</p>}
              <span className="cs-glight-count">
                {onCover
                  ? seriesPos >= 0
                    ? `Project ${seriesPos + 1} of ${seriesItems.length}`
                    : ''
                  : `${image + 1} / ${item.images.length}`}
              </span>
            </span>
            {!onCover && item.note && (
              <p className="cs-glight-note">{item.note}</p>
            )}
          </span>
        </header>
        {slide ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img key={slide.src} src={slide.src} alt={slide.alt} className="cs-glight-img" />
        ) : (
          /* Cover: announces the group the chain just reached, then indexes
             the whole collection so a skimmer can jump anywhere while the
             front-to-back reader just keeps hitting Next. Groups already
             opened this visit carry a Viewed badge. */
          <div key={`cover-${group}`} className="cs-glight-cover">
            <span className="cs-tape" aria-hidden />
            <p className="cs-glight-cover-eyebrow">Up next</p>
            <h3 className="cs-glight-cover-title">{item.caption}</h3>
            {item.note && <p className="cs-glight-cover-note">{item.note}</p>}
            {seriesItems.length > 1 && (
              <div className="cs-glight-hub">
                <p className="cs-glight-hub-label">
                  All {SERIES_LABELS[item.series!] ?? item.series} projects
                </p>
                <div className="cs-glight-hub-grid">
                  {seriesItems.map((g) => {
                    const gi = GALLERY.indexOf(g)
                    const isNext = gi === group
                    return (
                      <button
                        key={g.id}
                        type="button"
                        className={`cs-glight-hub-card${isNext ? ' is-next' : ''}`}
                        onClick={() => onNavigate({ group: gi, image: 0 })}
                      >
                        <span className="cs-glight-hub-thumb">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={g.thumb} alt="" loading="lazy" />
                          {isNext ? (
                            <span className="cs-glight-hub-badge is-next">
                              Up next
                            </span>
                          ) : (
                            viewed.includes(gi) && (
                              <span className="cs-glight-hub-badge">Viewed</span>
                            )
                          )}
                        </span>
                        <span className="cs-glight-hub-title">{g.caption}</span>
                        <span className="cs-glight-hub-meta">
                          {g.images.length}
                          {g.images.length === 1 ? ' slide' : ' slides'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        <footer className="cs-glight-bar">
          <button
            type="button"
            className="cs-glight-step"
            disabled={prev === null}
            onClick={() => prev !== null && onNavigate(prev)}
          >
            <span aria-hidden="true">← </span>
            {prevLabel}
          </button>
          <button
            type="button"
            className="cs-glight-step"
            disabled={next === null}
            onClick={() => next !== null && onNavigate(next)}
          >
            {nextLabel}
            <span aria-hidden="true"> →</span>
          </button>
        </footer>
      </motion.div>
    </motion.div>
  )
}
/* Tilt alternates across a theme's samples so frames feel hand-placed. */

function slotTilt(i: number): string {
  return i % 2 === 0 ? 'cs-tilt-l' : 'cs-tilt-r'
}

/* Anchor ids are slugged from labels rather than positional, so they stay
   stable as content is added/reordered. */
function slug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

interface RailLeaf {
  id: string
  label: string
  slot: ThemeSlot
  tilt: number
}

interface RailNode {
  label: string
  /** Present for a leaf item (no subItems): this node IS the frame. */
  leaf?: RailLeaf
  /** Present for a parent item: its subItems, each its own frame. */
  children?: RailLeaf[]
}

/* One sub-item's visuals: real slide frames when imagery exists, else the
   labeled placeholder frame. Tilt continues from the slot's base index so
   stacked frames keep the alternating hand-placed rhythm. */
function SlotFrames({ slot, tilt }: { slot: ThemeSlot; tilt: number }) {
  if (slot.images?.length) {
    return (
      <>
        {slot.images.map((image, i) => (
          <div
            key={image.src}
            className={`cs-figure ${slotTilt(tilt + i)} cs-tmodal-frame`}
            data-cs-figure
          >
            <span className="cs-tape" aria-hidden />
            <div className="cs-figure-media aspect-video">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.src} alt={image.alt} className="cs-figure-img" />
            </div>
          </div>
        ))}
      </>
    )
  }
  return (
    <div className={`cs-figure ${slotTilt(tilt)}`} data-cs-figure>
      <span className="cs-tape" aria-hidden />
      <div
        className={`cs-figure-empty ${slot.wide ? 'aspect-[3/2] md:aspect-[21/9]' : 'aspect-[3/2]'}`}
      >
        <div>
          <p className="cs-figure-empty-label">{slot.label}</p>
          <p className="cs-figure-empty-desc">{slot.desc}</p>
        </div>
      </div>
    </div>
  )
}

interface DeckFrame {
  key: string
  /** Anchor id, present only on a sub-item's FIRST frame so rail clicks
      still land on the start of that sub-item. */
  id?: string
  childId: string
  childLabel: string
  tilt: number
  image?: { src: string; alt: string }
  slot?: ThemeSlot
  /** Renders the visually-hidden heading that keeps the sub-item structure
      readable to assistive tech now that the visible label is gone. */
  heading?: string
}

/* Flattens a node's sub-items into one frame per image, so the scroll box
   can snap image-by-image (one flick = one slide) and the breadcrumb can
   name whichever slide is in view. Sub-items without imagery contribute a
   single placeholder frame. */
function buildDeck(leaves: RailLeaf[]): DeckFrame[] {
  return leaves.flatMap((leaf) => {
    const images = leaf.slot.images
    if (images?.length) {
      return images.map((image, i): DeckFrame => ({
        key: image.src,
        id: i === 0 ? leaf.id : undefined,
        childId: leaf.id,
        childLabel: leaf.label,
        tilt: leaf.tilt + i,
        image,
        heading: i === 0 ? leaf.label : undefined,
      }))
    }
    return [
      {
        key: leaf.id,
        id: leaf.id,
        childId: leaf.id,
        childLabel: leaf.label,
        tilt: leaf.tilt,
        slot: leaf.slot,
        heading: leaf.label,
      },
    ]
  })
}

/* One deck: full-height snap frames, each holding a single slide. */
function Deck({ frames }: { frames: DeckFrame[] }) {
  return (
    <>
      {frames.map((frame) => (
        <div
          key={frame.key}
          id={frame.id}
          data-child-id={frame.childId}
          className="cs-tmodal-slide"
        >
          {frame.heading && <h4 className="cs-sr-only">{frame.heading}</h4>}
          {frame.image ? (
            <div
              className={`cs-figure ${slotTilt(frame.tilt)} cs-tmodal-frame`}
              data-cs-figure
            >
              <span className="cs-tape" aria-hidden />
              <div className="cs-figure-media cs-tmodal-frame-media">
                {/* Normal-flow img (not the absolute cs-figure-img): its
                    intrinsic 16:9 ratio derives the width from the slide's
                    height, so the frame shrink-wraps the painted image. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frame.image.src}
                  alt={frame.image.alt}
                  className="cs-tmodal-slide-img"
                />
              </div>
            </div>
          ) : (
            frame.slot && <SlotFrames slot={frame.slot} tilt={frame.tilt} />
          )}
        </div>
      ))}
    </>
  )
}

function itemSlot(item: ThemeItem): ThemeSlot {
  return {
    label: item.label,
    desc: item.desc ?? '',
    wide: item.wide,
    images: item.images,
  }
}

/* A theme whose items are ALL leaves reads as one continuous set of samples
   rather than separate stories, so it collapses into a single headless
   parent and its items become that parent's children. That puts them in ONE
   deck the reader can scroll end to end, with the rail tracking position.
   Left as separate leaves they'd each be their own deck, and a leaf holding
   a single slide makes a pane that cannot scroll at all. */
function isFlatLeafTheme(theme: Theme): boolean {
  const items = theme.groups.flatMap((group) => group.items)
  return items.length > 1 && items.every((item) => !item.subItems)
}

/* Builds the rail's group/item/subItem tree once per theme, assigning each
   leaf a stable slugged anchor id and a running tilt index (so alternating
   tilt continues across items and groups, not just within one). */
function buildRailGroups(theme: Theme): { nodes: RailNode[] }[] {
  let tiltIndex = 0
  if (isFlatLeafTheme(theme)) {
    return [
      {
        nodes: [
          {
            label: theme.title,
            children: theme.groups
              .flatMap((group) => group.items)
              .map((item) => ({
                id: `${theme.id}-${slug(item.label)}`,
                label: item.label,
                slot: itemSlot(item),
                tilt: tiltIndex++,
              })),
          },
        ],
      },
    ]
  }
  return theme.groups.map((group) => ({
    nodes: group.items.map((item): RailNode => {
      if (item.subItems) {
        return {
          label: item.label,
          children: item.subItems.map((sub) => ({
            id: `${theme.id}-${slug(item.label)}-${slug(sub.label)}`,
            label: sub.label,
            slot: sub,
            tilt: tiltIndex++,
          })),
        }
      }
      return {
        label: item.label,
        leaf: {
          id: `${theme.id}-${slug(item.label)}`,
          label: item.label,
          slot: itemSlot(item),
          tilt: tiltIndex++,
        },
      }
    }),
  }))
}

/**
 * One theme, presented as a modal over the overview grid. Structure:
 * header (eyebrow, title, close), an anchored pill nav, one section per
 * sample inside an inner scroller (data-lenis-prevent so wheel events stay
 * local), and a footer with
 * prev/next theme so a reviewer can flow through all five without closing.
 */
function ThemeModal({
  theme,
  onClose,
}: {
  theme: Theme
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  /* Anchored-list rail: grouped entries ("Latest" / "Others"), each either a
     single frame or a parent item broken into its own sub-frames. Clicking
     any rail entry SELECTS it: the right pane shows only that node's own
     content, in its own scroll area, rather than one shared page scroll. */
  const railGroups = buildRailGroups(theme)
  /* One top-level node means its label just restates the theme, so the
     children stand in as the nav. Two or more and the label is load-bearing. */
  const soleParent =
    railGroups.reduce((n, g) => n + g.nodes.length, 0) === 1 &&
    !!railGroups[0]?.nodes[0]?.children
  const flatNodes = railGroups.flatMap((g) => g.nodes.map((n) => ({ group: g, node: n })))
  const firstEntry = flatNodes[0]
  const firstKey = firstEntry
    ? firstEntry.node.leaf?.id ?? `${theme.id}-${slug(firstEntry.node.label)}`
    : undefined
  const firstChildId = firstEntry?.node.children?.[0]?.id

  const [selectedKey, setSelectedKey] = useState(firstKey)
  const [activeChildId, setActiveChildId] = useState(firstChildId)
  /* True once the deck is scrolled: swaps the crumb's divider-shadow in. */
  const [deckScrolled, setDeckScrolled] = useState(false)
  const parentScrollRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLElement>(null)

  /* Keep the active rail entry visible as the scrollspy moves it: with the
     crumb no longer naming the sub-item, the rail is the one "where am I"
     indicator, so it must not drift out of view (especially the horizontal
     mobile strip). block/inline "nearest" keeps this from moving anything
     but the rail's own scroller. */
  useEffect(() => {
    railRef.current
      ?.querySelector<HTMLElement>('.is-active')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }, [activeChildId, selectedKey])

  /* The id to imperatively scroll to is kept OUT of activeChildId's own
     update cycle: activeChildId also gets written by the scrollspy below as
     the user free-scrolls, and if that same value drove the scrollIntoView
     effect, a click-triggered scroll would be interrupted mid-animation by
     the scrollspy reporting an earlier item still nearest-top, snapping the
     view back before it ever reached the target. A separate counter fires
     the scroll exactly once per click, regardless of what the scrollspy
     does afterward. */
  const [scrollTick, setScrollTick] = useState(0)
  const pendingScrollId = useRef<string | undefined>(undefined)
  /* Smooth only when staying inside the same deck. Switching decks swaps
     the content wholesale, so animating through unrelated new slides just
     looks like a glitch; those jump. */
  const pendingSmooth = useRef(true)
  const requestScroll = (id?: string, smooth = true) => {
    pendingScrollId.current = id
    pendingSmooth.current = smooth
    setScrollTick((t) => t + 1)
  }

  const selectedEntry = flatNodes.find(({ node }) => {
    const key = node.leaf?.id ?? `${theme.id}-${slug(node.label)}`
    return key === selectedKey
  })

  /* Leaf and parent nodes both render as a deck: a leaf is simply a
     one-sub-item deck, so the breadcrumb and snap behaviour are identical
     either way. */
  const fullDeck = theme.fullDeck === true
  /* Every leaf in the theme, in rail order: the whole story as one deck. */
  const allLeaves: RailLeaf[] = railGroups.flatMap((g) =>
    g.nodes.flatMap((n) => n.children ?? (n.leaf ? [n.leaf] : []))
  )
  const railLeaves: RailLeaf[] = selectedEntry
    ? selectedEntry.node.children ??
      (selectedEntry.node.leaf ? [selectedEntry.node.leaf] : [])
    : []
  const selectedLeaves = fullDeck ? allLeaves : railLeaves
  const deckFrames = buildDeck(selectedLeaves)

  const focusDetail = () => {
    requestAnimationFrame(() => {
      scrollRef.current
        ?.querySelector<HTMLElement>('.cs-tmodal-detail-title')
        /* preventScroll is load-bearing: on a real click, focus sits on the
           rail button, so focusing the deck box is a genuine focus change and
           Chrome's scroll-on-focus would cancel the deck's smooth scroll the
           frame after it starts. */
        ?.focus({ preventScroll: true })
    })
  }

  const selectLeaf = (id: string) => {
    setSelectedKey(id)
    setActiveChildId(undefined)
    setDeckScrolled(false)
    /* A leaf has no child anchor to scroll to, so the box would otherwise
       keep the previous deck's scroll position and open mid-deck. */
    requestScroll(undefined, false)
    focusDetail()
  }

  const selectParent = (parentLabel: string, childId?: string) => {
    const key = `${theme.id}-${slug(parentLabel)}`
    const sameDeck = key === selectedKey
    setSelectedKey(key)
    setActiveChildId(childId)
    setDeckScrolled(false)
    requestScroll(childId, sameDeck)
    focusDetail()
  }

  /* Scoped scrollspy: tracks which SLIDE is nearest the top of the selected
     node's own scroll box (not the whole page), and reports the sub-item it
     belongs to. Reading per-slide rather than per-sub-item is what lets the
     breadcrumb's child label rotate as the reader flicks through a
     multi-slide sub-item. Only updates the highlight, never scrolls. */
  const handleParentScroll = () => {
    const box = parentScrollRef.current
    if (!box) return
    setDeckScrolled(box.scrollTop > 4)
    const top = box.getBoundingClientRect().top
    const slides = [...box.querySelectorAll<HTMLElement>('.cs-tmodal-slide')]
    let current: string | undefined
    let indexInChild = 0
    for (const slide of slides) {
      if (slide.getBoundingClientRect().top - top <= 24) {
        indexInChild = slide.dataset.childId === current ? indexInChild + 1 : 0
        current = slide.dataset.childId
      }
    }
    if (!current) return
    setActiveChildId(current)
    const total = slides.filter((s) => s.dataset.childId === current).length
    writeRailProgress(current, total ? (indexInChild + 1) / total : 1)
  }

  /* Rail fill is written straight to the DOM rather than held in React
     state: this runs on every scroll frame, and a state update here would
     re-render the whole modal each frame (activeChildId doesn't, because
     React bails out when the id is unchanged). Only the active item keeps a
     value, so a stale fill can't linger on the one you just left. */
  const writeRailProgress = (childId: string, fraction: number) => {
    const rail = railRef.current
    if (!rail) return
    for (const item of rail.querySelectorAll<HTMLElement>(
      '.cs-tmodal-rail-item-sub'
    )) {
      item.style.setProperty(
        '--rail-progress',
        item.dataset.childId === childId ? String(fraction) : '0'
      )
    }
  }

  /* Runs the pending scroll request once, after the click's state changes
     (possibly a parent switch) have committed to the DOM. scrollIntoView
     finds the nearest scrollable ancestor on its own, so no manual offset
     math is needed. */
  useEffect(() => {
    const id = pendingScrollId.current
    if (!id) {
      /* No anchor (a leaf selection): send the deck back to slide one.
         behavior 'instant' aborts a smooth scroll still running from a
         previous selection, which would otherwise keep animating over the
         swapped-in deck and leave it a few px off the first slide. The
         second pass on the next frame catches an animation that had
         already been scheduled for this one. */
      const reset = () =>
        parentScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' })
      reset()
      requestAnimationFrame(reset)
      return
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: pendingSmooth.current ? 'smooth' : 'auto',
      block: 'start',
    })
    /* Seed the rail fill for this selection: when the target is already at
       the top of the box no scroll fires, so handleParentScroll would never
       run and the bar would keep the previous child's value. */
    const box = parentScrollRef.current
    const total = box
      ? box.querySelectorAll(
          `.cs-tmodal-slide[data-child-id="${CSS.escape(id)}"]`
        ).length
      : 0
    writeRailProgress(id, total ? 1 / total : 1)
    // scrollTick is the trigger; re-reading the ref each fire is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTick])

  /* Escape closes; focus starts on the close button and Tab stays inside
     the panel (a light focus trap). The body scroll lock lives in the page
     component: per-modal cleanup would race when hopping prev/next themes,
     since the exiting modal unmounts after the next one mounts. */
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  /* Reset selection to the theme's first node when hopping between themes,
     and move focus to the newly-selected pane's heading so keyboard users
     land somewhere on every selection change (including this reset). */
  useEffect(() => {
    setSelectedKey(firstKey)
    setActiveChildId(firstChildId)
    setDeckScrolled(false)
    requestScroll(firstChildId)
    // firstKey/firstChildId derive from theme.id; resetting on theme change is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.id])

  /* Focus moves to the detail heading only on an explicit selection (see
     focusDetail, called from the rail handlers), never on open: focus
     belongs on the close button there, and focusing the heading would also
     flash its ring at mouse users. */

  return (
    <motion.div
      className="cs-tmodal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className="cs-tmodal-backdrop"
        aria-label="Close theme"
        onClick={onClose}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${theme.id}-modal-title`}
        className="cs-tmodal"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="cs-tape" aria-hidden />

        <header className="cs-tmodal-header">
          <div>
            {/* Back, not close: this reads as a drill-down from the theme
                grid, so one exit labelled for where it returns to. */}
            <button
              ref={closeRef}
              type="button"
              className="cs-tmodal-back"
              onClick={onClose}
            >
              <span aria-hidden="true">←</span> Back
            </button>
            <h2 id={`${theme.id}-modal-title`} className="cs-tmodal-title">
              {theme.title}
            </h2>
            <div className="cs-tmodal-desc">
              {theme.framing.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </header>

        {/* Two panes: anchored list on the left, detail on the right. Clicking
            a rail entry SELECTS it; the right pane shows only that node's own
            content, each with its own scroll area (see-and-swap, not one
            shared page scroll). */}
        <div className={`cs-tmodal-body${fullDeck ? ' is-full' : ''}`}>
          {!fullDeck && (
          <nav ref={railRef} className="cs-tmodal-rail" aria-label="Sections in this theme">
            {railGroups.map((group, gi) => (
              <div key={gi} className="cs-tmodal-rail-group">
                {group.nodes.map((node) =>
                  node.children ? (
                    <div
                      key={node.label}
                      className={`cs-tmodal-rail-parent${soleParent ? ' is-headless' : ''}`}
                    >
                      {!soleParent && (
                        <button
                          type="button"
                          className={`cs-tmodal-rail-parent-label${selectedKey === `${theme.id}-${slug(node.label)}` ? ' is-active' : ''}`}
                          onClick={() => selectParent(node.label, node.children![0]?.id)}
                        >
                          {node.label}
                        </button>
                      )}
                      {node.children.map((child) => (
                        <button
                          key={child.id}
                          type="button"
                          data-child-id={child.id}
                          className={`cs-tmodal-rail-item cs-tmodal-rail-item-sub${selectedKey === `${theme.id}-${slug(node.label)}` && activeChildId === child.id ? ' is-active' : ''}`}
                          onClick={() => selectParent(node.label, child.id)}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    node.leaf && (
                      <button
                        key={node.leaf.id}
                        type="button"
                        className={`cs-tmodal-rail-item${selectedKey === node.leaf.id ? ' is-active' : ''}`}
                        onClick={() => selectLeaf(node.leaf!.id)}
                      >
                        {node.leaf.label}
                      </button>
                    )
                  )
                )}
              </div>
            ))}
            {/* Expectation-setter: these decks are deliberately high level.
                Lives under the rail so it reads once, not per slide. */}
            <p className="cs-tmodal-rail-note">
              Decks offer a high-level view of the project. Rationales,
              tradeoffs, and process, happy to discuss in detail over a chat.
            </p>
          </nav>
          )}

          <div ref={scrollRef} className="cs-tmodal-scroll" data-lenis-prevent>
            {fullDeck ? (
              /* No rail and no crumb: every slide carries its own title, so
                 the deck is the whole interface. */
              <div
                ref={parentScrollRef}
                className="cs-tmodal-parent-scroll"
                data-lenis-prevent
                onScroll={handleParentScroll}
              >
                <Deck frames={deckFrames} />
              </div>
            ) : (
              selectedEntry && (
              <>
                {/* No title above the deck: the rail already highlights this
                    item, and each slide carries its own baked-in title, so
                    a heading here would state it a third time. The scroller
                    takes over as focus target and carries the scrolled
                    shadow that the heading used to. */}
                <div
                  ref={parentScrollRef}
                  className={`cs-tmodal-parent-scroll cs-tmodal-detail-title${deckScrolled ? ' is-scrolled' : ''}`}
                  tabIndex={-1}
                  aria-label={selectedEntry.node.label}
                  data-lenis-prevent
                  onScroll={handleParentScroll}
                >
                  <Deck frames={deckFrames} />
                </div>
                </>
              )
            )}
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}

/**
 * The whole pitch experience: theme grid, case-study modals, grouped
 * gallery with the CyberQP series. Shared by every application route so
 * improvements land once; each route is a thin wrapper passing its own
 * greeting (/bluej-custom-pitch, /custom-deck).
 */
export function PitchPage({
  title,
  themeOrder,
}: {
  title: string
  /** Theme ids in display order; unlisted themes follow in data order.
      Card numbers are computed from position, so each route can lead with
      what its audience cares about (Blue J: design systems; generic:
      the privileged-identities case study). */
  themeOrder?: string[]
}) {
  const themes = themeOrder
    ? [...THEMES].sort((a, b) => {
        const ai = themeOrder.indexOf(a.id)
        const bi = themeOrder.indexOf(b.id)
        return (ai === -1 ? themeOrder.length : ai) - (bi === -1 ? themeOrder.length : bi)
      })
    : THEMES
  const [openId, setOpenId] = useState<string | null>(null)
  const openTheme = THEMES.find((t) => t.id === openId) ?? null

  /* One body scroll lock for the whole modal experience, held across
     prev/next theme hops. */
  const [gallerySel, setGallerySel] = useState<{ group: number; image: number } | null>(null)
  const [galleryExpanded, setGalleryExpanded] = useState(false)
  /* Groups whose SLIDES were opened this visit (covers don't count), for
     the collection index's Viewed badges. Deliberately in-memory only: the
     site avoids persistence, and a shared link should always start clean. */
  const [viewedGroups, setViewedGroups] = useState<Set<number>>(new Set())
  useEffect(() => {
    if (gallerySel && gallerySel.image >= 0) {
      setViewedGroups((prev) =>
        prev.has(gallerySel.group) ? prev : new Set(prev).add(gallerySel.group)
      )
    }
  }, [gallerySel])

  /* The URL hash mirrors whichever overlay is open, so both stay shareable:
     #design-systems opens that theme, #g-cyberqp-connectors opens that
     gallery group (g- prefixed to keep the namespaces apart). */
  useEffect(() => {
    const fromHash = window.location.hash.slice(1)
    if (THEMES.some((t) => t.id === fromHash)) {
      setOpenId(fromHash)
      return
    }
    if (fromHash.startsWith('g-')) {
      const group = GALLERY.findIndex((g) => g.id === fromHash.slice(2))
      if (group !== -1) {
        if (group >= GALLERY_PREVIEW_COUNT) setGalleryExpanded(true)
        setGallerySel({ group, image: 0 })
      }
    }
  }, [])

  const openGallery = useCallback((sel: { group: number; image: number }) => {
    setGallerySel(sel)
    window.history.replaceState(null, '', `#g-${GALLERY[sel.group].id}`)
  }, [])

  const modalOpen = openId !== null || gallerySel !== null
  useEffect(() => {
    if (!modalOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [modalOpen])

  const openModal = useCallback((id: string) => {
    setOpenId(id)
    window.history.replaceState(null, '', `#${id}`)
  }, [])

  const closeModal = useCallback(() => {
    setOpenId((current) => {
      if (current) {
        /* Return focus to the card that opened the modal. */
        document
          .querySelector<HTMLElement>(`[data-tcard="${current}"]`)
          ?.focus()
      }
      return null
    })
    window.history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search
    )
  }, [])

  return (
    <ProjectPageLayout
      title={title}
      /* No hero: the intro and theme grid are the first screen. Add
         hero={{ type: 'image', src: …, alt: … }} once there's art worth
         leading with. */
      backHref="/"
      backLabel="Back to home"
      backAlways
      /* Self-contained: the five themes are the whole story, so no footer
         routing off to the rest of the portfolio. */
      hideBottomNav
    >
      {/* Intro note: the hello lives in the page title; this stays short.
          "five curated themes" gets a drawn underline so the count registers
          before the grid does. */}
      <section className="mb-[64px]">
        <div className="cs-body max-w-[760px]">
          <p>
            Here are{' '}
            <span className="cs-underline-draw">five curated themes</span>{' '}
            presenting my work across product, design, and engineering.
          </p>
          <p>
            Looking forward to a deep dive into any of these over a chat.
            Thank you for looking.
          </p>
        </div>
      </section>

      {/* Overview grid: five taped cards, each opening its theme as a modal.
          Design systems leads and takes the widest card. */}
      <nav className="cs-tgrid mb-[24px]" aria-label="Themes on this page">
        {themes.map((theme, i) => (
          <button
            key={theme.id}
            type="button"
            data-tcard={theme.id}
            onClick={() => openModal(theme.id)}
            className={`cs-tcard${i === 0 ? ' cs-tcard-featured' : ''}`}
          >
            <span className="cs-tape" aria-hidden />
            <p className="cs-tcard-num">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="cs-tcard-title">{theme.title}</h3>
            <p className="cs-tcard-promise">{theme.promise}</p>
            {theme.cardThumbs && (
              <span className="cs-tcard-thumbs" aria-hidden="true">
                {theme.cardThumbs.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" loading="lazy" />
                ))}
              </span>
            )}
            <span className="cs-tcard-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {openTheme && (
          <ThemeModal
            key={openTheme.id}
            theme={openTheme}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      {/* Archive layer below the themes: shipped work grouped by project. */}
      <section className="cs-glr-section">
        <p className="cs-glr-eyebrow">More work</p>
        <p className="cs-glr-lede">
          A collection of select shipped product experiences.
        </p>
        <div className="cs-glr">
          {(galleryExpanded ? GALLERY : GALLERY.slice(0, GALLERY_PREVIEW_COUNT)).map((item, i) => (
            <button
              key={item.thumb}
              type="button"
              className={`cs-glr-tile${item.images.length > 1 ? ' is-stack' : ''}`}
              data-gtile={i}
              onClick={() => openGallery({ group: i, image: 0 })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.thumb} alt={item.caption} loading="lazy" />
              {item.images.length > 1 && (
                <>
                  <span className="cs-glr-count" aria-hidden="true">
                    {item.images.length}
                  </span>
                  <span className="cs-sr-only">, {item.images.length} slides</span>
                </>
              )}
              <span className="cs-glr-cap">{item.caption}</span>
            </button>
          ))}
        </div>
        {GALLERY.length > GALLERY_PREVIEW_COUNT && (
          <button
            type="button"
            className="cs-glr-toggle"
            onClick={() => setGalleryExpanded((v) => !v)}
          >
            {galleryExpanded
              ? 'Show less'
              : `Show all ${GALLERY.length}`}
            <span aria-hidden="true">{galleryExpanded ? ' ↑' : ' ↓'}</span>
          </button>
        )}
      </section>

      <AnimatePresence>
        {gallerySel !== null && (
          <GalleryLightbox
            group={gallerySel.group}
            image={gallerySel.image}
            viewed={[...viewedGroups]}
            onNavigate={openGallery}
            onClose={() => {
              /* The series chain may have walked past the preview row;
                 expand so the tile focus returns to actually exists. */
              if (gallerySel.group >= GALLERY_PREVIEW_COUNT) {
                setGalleryExpanded(true)
              }
              setGallerySel(null)
              window.history.replaceState(
                null,
                '',
                window.location.pathname + window.location.search
              )
              requestAnimationFrame(() => {
                document
                  .querySelector<HTMLElement>(`[data-gtile="${gallerySel.group}"]`)
                  ?.focus({ preventScroll: true })
              })
            }}
          />
        )}
      </AnimatePresence>

    </ProjectPageLayout>
  )
}

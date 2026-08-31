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
  title?: string
  items: ThemeItem[]
}

interface Theme {
  /** Anchor id. Overview cards jump-link to `#<id>`. */
  id: string
  num: string
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
    num: '01',
    title: 'Design systems',
    promise:
      'Turning drifting UI into a system teams actually use.',
    framing: [
      'Improving product cohesion by addressing design drift, and governing a design system that helps developers ship faster while maintaining quality.',
    ],
    cardThumbs: [
      '/bluej/thumbs/ds-intro-1.jpg',
      '/bluej/thumbs/ds-tablecard-2.jpg',
      '/bluej/thumbs/ds-hopper-1.jpg',
    ],
    groups: [
      {
        title: 'Most recent',
        items: [
          {
            label: 'Design system at CyberQP',
            desc: 'Three projects in one deck: the TableCard component, front-end drift, and the organization list.',
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
              {
                src: '/bluej/ds-tablecard-1.png',
                alt: 'Work sample 1, before TableCard and refined guidelines: the identities screen with tabs, table, and footer pagination marked one, two, and three as three unbounded components',
              },
              {
                src: '/bluej/ds-tablecard-2.png',
                alt: 'After the TableCard definition: the same identities table with tabs, rows, and pagination bound inside one enclosed surface',
              },
              {
                src: '/bluej/ds-tablecard-3.png',
                alt: 'Behind the scenes working artifact: canvas annotations on pagination height, page-selector state, and border-radius inconsistencies, captioned about iterating with engineering in the loop on high-impact components',
              },
              {
                src: '/bluej/ds-tablecard-4.png',
                alt: 'Final output: the new TableCard configuration in Storybook with header slot, untabbed, footer slot, and page pattern variants, added alongside a decision log and product context',
              },
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
        title: 'Others',
        items: [
          {
            label: 'Hopper Design System',
            desc: 'Leading the ShareGate platforms onto Workleap\u2019s shared design system, from context and role to the artifacts that drove adoption.',
            images: [
              {
                src: '/bluej/ds-hopper-1.png',
                alt: 'Hopper, the Workleap and ShareGate design system at hopper.workleap.design: accessible, international, TypeScript based, with dark mode, plus colors, text styles, and a react-aria component suite',
              },
              {
                src: '/bluej/ds-hopper-2.png',
                alt: 'Context: HR tech and IT products evolved independently, so two UI systems had to be maintained, patterns drifted for years, and teams duplicated effort; the shift was a strategy to integrate the products with a clear ROI in saved engineering and design cycles',
              },
              {
                src: '/bluej/ds-hopper-3.png',
                alt: 'My role: led the design system transition on ShareGate platforms, auditing products for the design system\u2019s discovery, designing and managing the platform\u2019s UI states, then ensuring adoption and building new patterns during design review',
              },
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
  {
    id: 'zero-to-one',
    num: '02',
    title: '0-1 and scale-up projects',
    promise:
      'From fuzzy problem to shipped product.',
    framing: [
      'Recent projects where I led the design and helped shape the work alongside product and engineering teams.',
    ],
    groups: [
      {
        title: 'Latest',
        items: [
          // TODO(content): Charen will share the CyberQP AI Terminal story in a follow-up prompt.
          // TODO(content): Charen will share the privileged-identity discovery story in a follow-up prompt.
          {
            label: 'Discovery of privileged identities',
            subItems: [
              {
                label: 'Context',
                desc: 'Placeholder: context for privileged-identity discovery. Content coming.',
              },
              {
                label: 'Why now',
                desc: 'Placeholder: why this problem mattered at this moment. Content coming.',
              },
              {
                label: 'Working with SMEs',
                desc: 'Placeholder: collaborating with subject-matter experts. Content coming.',
              },
              {
                label: 'Design explorations',
                desc: 'Placeholder: design exploration artifacts. Content coming.',
                wide: true,
              },
              {
                label: 'Drawer component definition',
                desc: 'Placeholder: defining the drawer component. Content coming.',
              },
              {
                label: 'Outcome',
                desc: 'Placeholder: how it landed. Content coming.',
              },
            ],
          },
        ],
      },
      {
        title: 'Others',
        items: [
          {
            label: 'Copilot tenant assessment (Sharegate)',
            desc: 'Copilot tenant assessment: gap-led framing that tells M365 tenants whether they are safe to switch on Copilot.',
            wide: true,
          },
          {
            label: 'Visualize security attack matrix (Blackberry)',
            desc: 'Placeholder: the security attack matrix visualization. Content coming.',
            wide: true,
          },
        ],
      },
    ],
  },
  {
    id: 'ai-native',
    num: '03',
    title: 'Designing for AI agents',
    promise:
      'AI that experts can trust with real work.',
    framing: [
      // TODO(content): sharpen the agentic-design positioning for Blue J's tax/legal AI context.
      'Designing AI that experts trust with consequential work: read-only defaults, confirmation gates at the right trust moments, and systems that stop rather than guess.',
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
    num: '04',
    title: 'Code-first design',
    fullDeck: true,
    promise:
      'Ideas tested as working software, not mockups.',
    framing: [
      'Overview of setup, process, and custom skills.',
    ],
    cardThumbs: [
      '/bluej/thumbs/cf-skills-1.jpg',
    ],
    groups: [{ items: [
      {
        label: 'Overview and setup',
        images: [
          {
            src: '/bluej/cf-overview-1.png',
            alt: 'Transitioning to code-first design: the article \u201cBeing a Designer/Builder in the Agentic Era\u201d on going from handing off Figma files to shipping code in production, beside a year of contribution graphs split into personal projects and AI explorations, then building and maintaining a one-to-one prototype matching prod and contributing directly in prod',
          },
        ],
      },
      {
        label: 'Process',
        images: [
          {
            src: '/bluej/cf-process-1.png',
            alt: 'The agentic design process: an intake gate naming the need and the failure signal from product priorities, unmet needs, Slack, Pendo, and telemetry, then the agent generates volume using org-level and project skills in design mode, then a review gate judging with intent, handing off to engineering and shipping, with customers, subject-matter experts, and signals feeding revisions before ship',
          },
          {
            src: '/bluej/cf-process-2.png',
            alt: 'How I contribute to the front-end code of the production app: the Panthera UI design workflow documented in WORKFLOW.md, a day-to-day cycle from one start command to a design branch and sandbox, working in the browser on mocked product pages, committing feature files while sandbox files stay local, then opening a PR that merges to main and deploys to QA',
          },
        ],
      },
      {
        label: 'Custom skills',
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
    num: '05',
    title: 'Growth and activation',
    promise:
      'Getting features discovered and used after launch.',
    framing: [
      'Moving a sales-led product toward product-led growth: onboarding, activation, and the telemetry to tell whether it worked.',
    ],
    cardThumbs: [
      '/bluej/thumbs/ga-new-context.jpg',
    ],
    groups: [
      {
        title: 'Latest',
        items: [
          {
            label: 'CyberQP new platform',
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
        title: 'Previous',
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
/* PROTOTYPE(gallery): stand-in items reusing theme slides so the UX can be
   judged. The real gallery holds work that is NOT in the themes; swap these
   for curated images and captions before this ships anywhere.              */
/* ------------------------------------------------------------------------- */

interface GalleryItem {
  /** 640w grid thumb in /public/bluej/thumbs. */
  thumb: string
  /** Full-size image for the lightbox. */
  src: string
  caption: string
  /** One sentence of context, lightbox only. Written lazily; items
      without one just show the caption. */
  note?: string
}

/* Tiles shown before "Show all": one desktop row. */
const GALLERY_PREVIEW_COUNT = 4

const GALLERY: GalleryItem[] = [
  { thumb: '/bluej/thumbs/ds-tablecard-2.jpg', src: '/bluej/ds-tablecard-2.png', caption: 'TableCard on the identities screen', note: 'One enclosing surface for tabs, table, and pagination, replacing three unbounded components.' },
  { thumb: '/bluej/thumbs/t2-term-1-overview.jpg', src: '/bluej/t2-term-1-overview.png', caption: 'CyberQP AI Terminal', note: 'Led discovery, design, and iteration for the terminal on the new Panthera platform.' },
  { thumb: '/bluej/thumbs/ds-org-list-2.jpg', src: '/bluej/ds-org-list-2.png', caption: 'Organization matching, new platform' },
  { thumb: '/bluej/thumbs/cf-skills-1.jpg', src: '/bluej/cf-skills-1.png', caption: 'Custom skills for solo design leadership' },
  { thumb: '/bluej/thumbs/ga-new-context.jpg', src: '/bluej/ga-new-context.png', caption: 'Onboarding setup guide, state mapping' },
  { thumb: '/bluej/thumbs/ds-hopper-1.jpg', src: '/bluej/ds-hopper-1.png', caption: 'Hopper Design System' },
  { thumb: '/bluej/thumbs/t2-term-5-interaction.jpg', src: '/bluej/t2-term-5-interaction.png', caption: 'Prompt composition interaction loop' },
  { thumb: '/bluej/thumbs/ds-drift-3.jpg', src: '/bluej/ds-drift-3.png', caption: 'Button drift, before and after' },
  { thumb: '/bluej/thumbs/cf-process-1.jpg', src: '/bluej/cf-process-1.png', caption: 'Agentic design process' },
  { thumb: '/bluej/thumbs/ga-legacy-outcome.jpg', src: '/bluej/ga-legacy-outcome.png', caption: 'Onboarding guide in the legacy product' },
  { thumb: '/bluej/thumbs/ds-intro-3.jpg', src: '/bluej/ds-intro-3.png', caption: 'Legacy to new platform direction' },
  { thumb: '/bluej/thumbs/ga-new-measuring.jpg', src: '/bluej/ga-new-measuring.png', caption: 'Measuring the onboarding panel' },
]

/**
 * Full-screen viewer for one gallery item: large contained image, caption,
 * prev/next with arrow keys, Escape closes. Deliberately simpler than the
 * theme decks; a gallery is browsing, not a guided story.
 */
function GalleryLightbox({
  index,
  onNavigate,
  onClose,
}: {
  index: number
  onNavigate: (next: number) => void
  onClose: () => void
}) {
  const item = GALLERY[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const prev = index > 0 ? index - 1 : null
  const next = index < GALLERY.length - 1 ? index + 1 : null

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && index > 0) onNavigate(index - 1)
      if (e.key === 'ArrowRight' && index < GALLERY.length - 1) onNavigate(index + 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, onNavigate, onClose])

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
        <header className="cs-glight-bar">
          <span className="cs-glight-count">
            {index + 1} / {GALLERY.length}
          </span>
          <button
            ref={closeRef}
            type="button"
            className="cs-tmodal-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={item.src} src={item.src} alt={item.caption} className="cs-glight-img" />
        <footer className="cs-glight-bar">
          <button
            type="button"
            className="cs-glight-step"
            disabled={prev === null}
            onClick={() => prev !== null && onNavigate(prev)}
          >
            <span aria-hidden="true">← </span>Prev
          </button>
          <span className="cs-glight-text">
            <p className="cs-glight-caption">{item.caption}</p>
            {item.note && <p className="cs-glight-note">{item.note}</p>}
          </span>
          <button
            type="button"
            className="cs-glight-step"
            disabled={next === null}
            onClick={() => next !== null && onNavigate(next)}
          >
            Next<span aria-hidden="true"> →</span>
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

/* Builds the rail's group/item/subItem tree once per theme, assigning each
   leaf a stable slugged anchor id and a running tilt index (so alternating
   tilt continues across items and groups, not just within one). */
function buildRailGroups(theme: Theme): { title?: string; nodes: RailNode[] }[] {
  let tiltIndex = 0
  return theme.groups.map((group) => ({
    title: group.title,
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
          slot: {
            label: item.label,
            desc: item.desc ?? '',
            wide: item.wide,
            images: item.images,
          },
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
  onNavigate,
}: {
  theme: Theme
  onClose: () => void
  onNavigate: (id: string) => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  /* Anchored-list rail: grouped entries ("Latest" / "Others"), each either a
     single frame or a parent item broken into its own sub-frames. Clicking
     any rail entry SELECTS it: the right pane shows only that node's own
     content, in its own scroll area, rather than one shared page scroll. */
  const railGroups = buildRailGroups(theme)
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
        ?.focus()
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

  const themeIndex = THEMES.findIndex((t) => t.id === theme.id)
  const prevTheme = THEMES[themeIndex - 1] ?? null
  const nextTheme = THEMES[themeIndex + 1] ?? null

  /* Escape closes; focus starts on the close button and Tab stays inside
     the panel (a light focus trap). The body scroll lock lives in the page
     component: per-modal cleanup would race when hopping prev/next themes,
     since the exiting modal unmounts after the next one mounts. */
  useEffect(() => {
    closeRef.current?.focus()

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
            <p className="cs-eyebrow">Theme {theme.num} / 05</p>
            <h2 id={`${theme.id}-modal-title`} className="cs-tmodal-title">
              {theme.title}
            </h2>
            <div className="cs-tmodal-desc">
              {theme.framing.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="cs-tmodal-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        {/* Two panes: anchored list on the left, detail on the right. Clicking
            a rail entry SELECTS it; the right pane shows only that node's own
            content, each with its own scroll area (see-and-swap, not one
            shared page scroll). */}
        <div className={`cs-tmodal-body${fullDeck ? ' is-full' : ''}`}>
          {!fullDeck && (
          <nav ref={railRef} className="cs-tmodal-rail" aria-label="Sections in this theme">
            {railGroups.map((group, gi) => (
              <div key={group.title ?? gi} className="cs-tmodal-rail-group">
                {group.title && (
                  <p className="cs-tmodal-rail-label">{group.title}</p>
                )}
                {group.nodes.map((node) =>
                  node.children ? (
                    <div key={node.label} className="cs-tmodal-rail-parent">
                      <button
                        type="button"
                        className={`cs-tmodal-rail-parent-label${selectedKey === `${theme.id}-${slug(node.label)}` ? ' is-active' : ''}`}
                        onClick={() => selectParent(node.label, node.children![0]?.id)}
                      >
                        {node.label}
                      </button>
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
                {/* One line above the deck: just the parent. The rail's
                    highlight is the single "where am I" indicator (it
                    tracks per-slide via the scrollspy), and each slide
                    carries its own baked-in title, so naming the sub-item
                    here again would state it in three places. */}
                <h3
                  className={`cs-tmodal-crumb cs-tmodal-detail-title${deckScrolled ? ' is-scrolled' : ''}`}
                  tabIndex={-1}
                >
                  <span className="cs-tmodal-crumb-parent">
                    {selectedEntry.node.label}
                  </span>
                </h3>
                <div
                  ref={parentScrollRef}
                  className="cs-tmodal-parent-scroll"
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

        <footer className="cs-tmodal-footer">
          {prevTheme ? (
            <button
              type="button"
              className="cs-tmodal-step cs-tmodal-step-prev"
              onClick={() => onNavigate(prevTheme.id)}
            >
              <span className="cs-tmodal-step-label">
                <span aria-hidden="true">← </span>Previous
              </span>
              <span className="cs-tmodal-step-title">
                {prevTheme.num} {prevTheme.title}
              </span>
            </button>
          ) : (
            <span />
          )}
          {nextTheme ? (
            <button
              type="button"
              className="cs-tmodal-step cs-tmodal-step-next"
              onClick={() => onNavigate(nextTheme.id)}
            >
              <span className="cs-tmodal-step-label">
                Next<span aria-hidden="true"> →</span>
              </span>
              <span className="cs-tmodal-step-title">
                {nextTheme.num} {nextTheme.title}
              </span>
            </button>
          ) : (
            <span />
          )}
        </footer>
      </motion.div>
    </motion.div>
  )
}

export default function BlueJPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openTheme = THEMES.find((t) => t.id === openId) ?? null

  /* The URL hash mirrors the open modal so theme links stay shareable:
     /bluej-custom-pitch#design-systems opens that theme directly. */
  useEffect(() => {
    const fromHash = window.location.hash.slice(1)
    if (THEMES.some((t) => t.id === fromHash)) setOpenId(fromHash)
  }, [])

  /* One body scroll lock for the whole modal experience, held across
     prev/next theme hops. */
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)
  const [galleryExpanded, setGalleryExpanded] = useState(false)

  const modalOpen = openId !== null || galleryIndex !== null
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
      /* TODO(content): final page title. */
      title="👋 Hello, Blue J team"
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
      {/* Intro note: the hello lives in the page title; this stays short. */}
      <section className="mb-[64px]">
        <div className="cs-body max-w-[760px]">
          <p>
            Here are curated themes presenting my work across the product and
            design function. Looking forward to going deeper on any of these
            when we meet virtually. Thanks for looking.
          </p>
        </div>
      </section>

      {/* Overview grid: five taped cards, each opening its theme as a modal.
          Design systems leads and takes the widest card. */}
      <nav className="cs-tgrid mb-[24px]" aria-label="Themes on this page">
        {THEMES.map((theme, i) => (
          <button
            key={theme.id}
            type="button"
            data-tcard={theme.id}
            onClick={() => openModal(theme.id)}
            className={`cs-tcard${i === 0 ? ' cs-tcard-featured' : ''}`}
          >
            <span className="cs-tape" aria-hidden />
            <p className="cs-tcard-num">{theme.num}</p>
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
            onNavigate={openModal}
          />
        )}
      </AnimatePresence>

      {/* PROTOTYPE(gallery): archive layer below the themes. Stand-in images
          until the real not-in-a-theme work is curated. */}
      <section className="cs-glr-section">
        <p className="cs-glr-eyebrow">More work</p>
        <p className="cs-glr-lede">
          Working artifacts and shipped screens beyond the five themes. Tap
          any tile for the story behind it.
        </p>
        <div className="cs-glr">
          {(galleryExpanded ? GALLERY : GALLERY.slice(0, GALLERY_PREVIEW_COUNT)).map((item, i) => (
            <button
              key={item.src}
              type="button"
              className="cs-glr-tile"
              data-gtile={i}
              onClick={() => setGalleryIndex(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.thumb} alt={item.caption} loading="lazy" />
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
        {galleryIndex !== null && (
          <GalleryLightbox
            index={galleryIndex}
            onNavigate={setGalleryIndex}
            onClose={() => {
              document
                .querySelector<HTMLElement>(`[data-gtile="${galleryIndex}"]`)
                ?.focus()
              setGalleryIndex(null)
            }}
          />
        )}
      </AnimatePresence>

    </ProjectPageLayout>
  )
}

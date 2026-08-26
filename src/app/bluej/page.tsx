"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'
import { SectionDivider } from '@/components/case-study/SectionDivider'
import { ItalicCoda } from '@/components/case-study/ItalicCoda'
import { getProject } from '@/data/projects'

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
  /** Project slugs with a live full case study to link out to. */
  related: string[]
}

/* Pages that exist as routes but aren't in the ALL_PROJECTS registry. */
const EXTRA_LINKS: Record<string, { title: string; href: string }> = {
  'figma-buddy': { title: 'Figma Buddy', href: '/figma-buddy' },
}

function relatedLink(slug: string): { title: string; href: string } | null {
  const extra = EXTRA_LINKS[slug]
  if (extra) return extra
  const project = getProject(slug)
  if (!project || project.comingSoon) return null
  return { title: project.title, href: project.href }
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
    groups: [
      {
        title: 'Most recent',
        items: [
          // TODO(content): Charen will share the CyberQP design-system story in a follow-up prompt.
          {
            label: 'Design system at CyberQP',
            desc: 'Placeholder: the CyberQP design-system context. Content coming.',
            wide: true,
          },
          {
            label: 'Item 2',
            desc: 'Placeholder: second most-recent sample. Content coming.',
          },
          {
            label: 'Item 3',
            desc: 'Placeholder: third most-recent sample. Content coming.',
          },
        ],
      },
      {
        title: 'Previous works',
        items: [
          // TODO(content): the Hopper Design System story. Content coming.
          {
            label: 'Hopper Design System',
            desc: 'Placeholder: the Hopper Design System work. Content coming.',
            wide: true,
          },
        ],
      },
    ],
    related: [],
  },
  {
    id: 'zero-to-one',
    num: '02',
    title: '0-1 and scale up initiatives',
    promise:
      'From fuzzy problem to shipped product.',
    framing: [
      // TODO(content): tighten around the AI-PAM 0→1 arc, privileged-identity discovery, and the Copilot/Blackberry work.
      'Joining before scope exists and carrying a product from framing through research, shipped iterations, and scale. The work here started as an open question and ended in customers’ hands.',
    ],
    groups: [
      {
        title: 'Latest',
        items: [
          // TODO(content): Charen will share the CyberQP AI Terminal story in a follow-up prompt.
          {
            label: 'CyberQP AI Terminal',
            subItems: [
              {
                label: 'Context',
                desc: 'Placeholder: context for the CyberQP AI Terminal. Content coming.',
              },
              {
                label: 'Framing',
                desc: 'Placeholder: how the problem was framed. Content coming.',
              },
              {
                label: 'Working with AI Lab',
                desc: 'Placeholder: collaborating with the AI Labs team. Content coming.',
              },
              {
                label: 'AI terminal design explorations',
                desc: 'Placeholder: design exploration artifacts for the terminal. Content coming.',
                wide: true,
              },
              {
                label: 'Iterations',
                desc: 'Placeholder: how the design iterated across releases. Content coming.',
              },
              {
                label: 'Learnings',
                desc: 'Placeholder: what came out of shipping the terminal. Content coming.',
              },
            ],
          },
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
    related: ['ai-pam'],
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
    groups: [{ items: [
      {
        label: 'The AI terminal & four trust gates',
        desc: 'AI-PAM terminal flow: intent confirmation, policy authorization, query plan review, workflow approval.',
        wide: true,
      },
      {
        label: 'Multi-agent orchestration',
        desc: 'The Refinery: eight coordinated agents, an orchestrator, and a morning brief, captured in the system diagram and dashboard.',
      },
      {
        label: 'Failure & disambiguation patterns',
        desc: 'What happens when confidence is low or a connector dies: stop, name it, offer a recoverable path.',
      },
    ] }],
    related: ['ai-pam', 'refinery'],
  },
  {
    id: 'code-first',
    num: '04',
    title: 'Designing in code',
    promise:
      'Ideas tested as working software, not mockups.',
    framing: [
      // TODO(content): the code-as-design-tool practice story.
      'Some ideas can only be judged running. I build working software, this portfolio included, to explore, test, and ship design decisions in the real medium.',
    ],
    groups: [{ items: [
      {
        label: 'This portfolio',
        desc: 'The site you are reading: dual read/see modes, GSAP choreography, built in code with Claude.',
        wide: true,
      },
      {
        label: 'Figma Buddy',
        desc: 'AI design critique inside Figma comments: @buddy, built on the OpenAI API and Supabase.',
      },
      {
        label: 'The Refinery build',
        desc: 'From idea to a nine-agent system running locally for under fifteen cents a day.',
      },
    ] }],
    related: ['refinery', 'figma-buddy'],
  },
  {
    id: 'growth',
    num: '05',
    title: 'Growth and activation',
    promise:
      'Getting features discovered and used after launch.',
    framing: [
      // TODO(content): activation and growth story: what moved, and how it was measured.
      'Design that earns its keep after launch: reworking first-run activation, making features discoverable in the flow of work, and instrumenting the journey so the team knows what moved.',
    ],
    groups: [{ items: [
      {
        label: 'Activation rework',
        desc: 'CyberQP first-run activation and feature discovery: the journey map and the redesigned flow.',
        wide: true,
      },
      {
        label: 'Adoption in the flow of work',
        desc: 'Browser extension: consolidating vault credentials and JIT accounts where technicians already are.',
      },
      {
        label: 'Measurement loop',
        desc: 'The instrumentation behind the story: what was tracked, and how it fed the next iteration.',
      },
    ] }],
    related: ['browser-extension'],
  },
]

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
          slot: { label: item.label, desc: item.desc ?? '', wide: item.wide },
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
 * local), a "Go deeper" section when case studies exist, and a footer with
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

  const links = theme.related
    .map(relatedLink)
    .filter((l): l is { title: string; href: string } => l !== null)

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
  const parentScrollRef = useRef<HTMLDivElement>(null)

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
  const requestScroll = (id?: string) => {
    pendingScrollId.current = id
    setScrollTick((t) => t + 1)
  }

  const selectedEntry = flatNodes.find(({ node }) => {
    const key = node.leaf?.id ?? `${theme.id}-${slug(node.label)}`
    return key === selectedKey
  })
  const deeperSelected = selectedKey === `${theme.id}-deeper`

  const selectLeaf = (id: string) => {
    setSelectedKey(id)
    setActiveChildId(undefined)
  }

  const selectParent = (parentLabel: string, childId?: string) => {
    setSelectedKey(`${theme.id}-${slug(parentLabel)}`)
    setActiveChildId(childId)
    requestScroll(childId)
  }

  /* Scoped scrollspy: tracks which sub-item is nearest the top of the
     SELECTED parent's own scroll box (not the whole page), so free-scrolling
     inside that box keeps the rail in sync the same way the old page-wide
     scrollspy did. Only updates the highlight, never triggers a scroll. */
  const handleParentScroll = () => {
    const box = parentScrollRef.current
    const children = selectedEntry?.node.children
    if (!box || !children?.length) return
    const top = box.getBoundingClientRect().top
    let current = children[0].id
    for (const child of children) {
      const el = document.getElementById(child.id)
      if (el && el.getBoundingClientRect().top - top <= 24) {
        current = child.id
      }
    }
    setActiveChildId(current)
  }

  /* Runs the pending scroll request once, after the click's state changes
     (possibly a parent switch) have committed to the DOM. scrollIntoView
     finds the nearest scrollable ancestor on its own, so no manual offset
     math is needed. */
  useEffect(() => {
    const id = pendingScrollId.current
    if (!id) return
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
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
    requestScroll(firstChildId)
    // firstKey/firstChildId derive from theme.id; resetting on theme change is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.id])

  useEffect(() => {
    scrollRef.current
      ?.querySelector<HTMLElement>('.cs-tmodal-detail-title')
      ?.focus()
  }, [selectedKey])

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
        <div className="cs-tmodal-body">
          <nav className="cs-tmodal-rail" aria-label="Sections in this theme">
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
            {links.length > 0 && (
              <div className="cs-tmodal-rail-group">
                <button
                  type="button"
                  className={`cs-tmodal-rail-item${deeperSelected ? ' is-active' : ''}`}
                  onClick={() => selectLeaf(`${theme.id}-deeper`)}
                >
                  Go deeper
                </button>
              </div>
            )}
          </nav>

          <div ref={scrollRef} className="cs-tmodal-scroll" data-lenis-prevent>
            {deeperSelected ? (
              <div className="cs-tlinks">
                <span className="cs-tlinks-label">Go deeper</span>
                {links.map((link) => (
                  <a key={link.href} href={link.href} className="cs-tlink">
                    {link.title}
                    <span aria-hidden="true"> →</span>
                  </a>
                ))}
              </div>
            ) : selectedEntry?.node.children ? (
              <>
                {selectedEntry.group.title && (
                  <p className="cs-tmodal-group-heading">{selectedEntry.group.title}</p>
                )}
                <h3 className="cs-tmodal-item-title cs-tmodal-detail-title" tabIndex={-1}>
                  {selectedEntry.node.label}
                </h3>
                <div
                  ref={parentScrollRef}
                  className="cs-tmodal-parent-scroll"
                  data-lenis-prevent
                  onScroll={handleParentScroll}
                >
                  {selectedEntry.node.children.map((child) => (
                    <section
                      key={child.id}
                      id={child.id}
                      className="cs-tmodal-section cs-tmodal-subsection"
                    >
                      <h4 className="cs-tmodal-section-title">{child.label}</h4>
                      <div className={`cs-figure ${slotTilt(child.tilt)}`} data-cs-figure>
                        <span className="cs-tape" aria-hidden />
                        <div
                          className={`cs-figure-empty ${child.slot.wide ? 'aspect-[3/2] md:aspect-[21/9]' : 'aspect-[3/2]'}`}
                        >
                          <div>
                            <p className="cs-figure-empty-label">{child.label}</p>
                            <p className="cs-figure-empty-desc">{child.slot.desc}</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </>
            ) : (
              selectedEntry?.node.leaf && (
                <>
                  {selectedEntry.group.title && (
                    <p className="cs-tmodal-group-heading">{selectedEntry.group.title}</p>
                  )}
                  <section className="cs-tmodal-section">
                    <h3 className="cs-tmodal-section-title cs-tmodal-detail-title" tabIndex={-1}>
                      {selectedEntry.node.leaf.label}
                    </h3>
                    <div className={`cs-figure ${slotTilt(selectedEntry.node.leaf.tilt)}`} data-cs-figure>
                      <span className="cs-tape" aria-hidden />
                      <div
                        className={`cs-figure-empty ${selectedEntry.node.leaf.slot.wide ? 'aspect-[3/2] md:aspect-[21/9]' : 'aspect-[3/2]'}`}
                      >
                        <div>
                          <p className="cs-figure-empty-label">{selectedEntry.node.leaf.label}</p>
                          <p className="cs-figure-empty-desc">{selectedEntry.node.leaf.slot.desc}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )
            )}
          </div>
        </div>

        <footer className="cs-tmodal-footer">
          {prevTheme ? (
            <button
              type="button"
              className="cs-tmodal-step"
              onClick={() => onNavigate(prevTheme.id)}
            >
              <span aria-hidden="true">← </span>
              {prevTheme.num} {prevTheme.title}
            </button>
          ) : (
            <span />
          )}
          {nextTheme ? (
            <button
              type="button"
              className="cs-tmodal-step"
              onClick={() => onNavigate(nextTheme.id)}
            >
              {nextTheme.num} {nextTheme.title}
              <span aria-hidden="true"> →</span>
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
     /bluej#design-systems opens that theme directly. */
  useEffect(() => {
    const fromHash = window.location.hash.slice(1)
    if (THEMES.some((t) => t.id === fromHash)) setOpenId(fromHash)
  }, [])

  /* One body scroll lock for the whole modal experience, held across
     prev/next theme hops. */
  const modalOpen = openId !== null
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
      nextHref="/portfolio"
      nextLabel="All projects"
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

      {/* Close */}
      <SectionDivider />
      <section className="mb-[40px]">
        <ItalicCoda>
          {/* TODO(content): closing line for Blue J. */}
          If any of these threads is worth pulling on, I&apos;d love to walk you
          through the full story in conversation.{' '}
          <a href="mailto:charen.k@gmail.com" className="cs-tlink cs-tlink-inline">
            Get in touch<span aria-hidden="true"> →</span>
          </a>
        </ItalicCoda>
      </section>
    </ProjectPageLayout>
  )
}

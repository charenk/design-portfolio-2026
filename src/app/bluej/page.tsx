"use client"

import { Fragment } from 'react'
import { ProjectPageLayout } from '@/components/layout/ProjectPageLayout'
import { SectionDivider } from '@/components/case-study/SectionDivider'
import { ItalicCoda } from '@/components/case-study/ItalicCoda'
import { getProject } from '@/data/projects'

/* ------------------------------------------------------------------------- */
/* TODO(content): everything in THEMES below is scaffold copy. The five theme
   titles are final; promises, framing paragraphs, and slot labels are drafts
   for Charen to replace in a single pass. Slot descriptions say what visual
   belongs in each taped frame — swap `slot` placeholders for real imagery by
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

interface Theme {
  /** Anchor id — overview cards jump-link to `#<id>`. */
  id: string
  num: string
  title: string
  /** One-line promise on the overview card. */
  promise: string
  /** Short framing copy at the top of the section. Keep tight: visuals lead. */
  framing: string[]
  slots: ThemeSlot[]
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
    title: 'From Design Drift to Design Systems',
    promise:
      'Turning scattered, drifting UI into a tokenized system teams actually adopt.',
    framing: [
      // TODO(content): the drift→system story — where the drift came from, what the audit found, how the system earned adoption.
      'How I take a product from inconsistent, drifting UI to a governed design system: auditing the drift, building the token and component architecture, and doing the unglamorous adoption work that makes it stick.',
    ],
    slots: [
      {
        label: 'The drift audit',
        desc: 'Before/after inventory: the same component captured across screens showing divergence, annotated with what caused it.',
        wide: true,
      },
      {
        label: 'Token & component architecture',
        desc: 'Diagram of the token layers (primitive → semantic → component) and how they map to code.',
      },
      {
        label: 'Adoption & governance',
        desc: 'How the system rolled out: contribution model, docs, and the adoption curve across squads.',
      },
    ],
    related: [],
  },
  {
    id: 'zero-to-one',
    num: '02',
    title: 'Zero to One: Frame, Research, Ship, Scale',
    promise:
      'Framing ambiguous problems, researching fast, shipping, then scaling what works.',
    framing: [
      // TODO(content): tighten around the AI-PAM 0→1 arc and the Copilot assessment.
      'Joining before scope exists and carrying a product from framing through research, shipped iterations, and scale — shown through work that started as an open question and ended in customers’ hands.',
    ],
    slots: [
      {
        label: 'Frame → ship timeline',
        desc: 'The AI-PAM arc: discovery, three customer-facing iterations, what changed between each.',
        wide: true,
      },
      {
        label: 'Opportunity solution tree',
        desc: 'The OST that turned three research cohorts into prioritized use cases.',
      },
      {
        label: 'Readiness assessment concept',
        desc: 'Copilot tenant assessment: gap-led framing that tells M365 tenants whether they are safe to switch on Copilot.',
      },
    ],
    related: ['ai-pam'],
  },
  {
    id: 'ai-native',
    num: '03',
    title: 'AI-Native Design: Designing for Agents & Workflows',
    promise:
      'Trust gates, human-in-the-loop patterns, and agent workflows for regulated domains.',
    framing: [
      // TODO(content): sharpen the agentic-design positioning for Blue J's tax/legal AI context.
      'Designing AI that experts trust with consequential work: read-only defaults, confirmation gates at the right trust moments, and systems that stop rather than guess.',
    ],
    slots: [
      {
        label: 'The AI terminal & four trust gates',
        desc: 'AI-PAM terminal flow: intent confirmation, policy authorization, query plan review, workflow approval.',
        wide: true,
      },
      {
        label: 'Multi-agent orchestration',
        desc: 'The Refinery: eight coordinated agents, an orchestrator, and a morning brief — the system diagram and dashboard.',
      },
      {
        label: 'Failure & disambiguation patterns',
        desc: 'What happens when confidence is low or a connector dies: stop, name it, offer a recoverable path.',
      },
    ],
    related: ['ai-pam', 'refinery'],
  },
  {
    id: 'code-first',
    num: '04',
    title: 'Code First Design',
    promise:
      'Designing in the medium — shipping working software to test ideas, not just mockups.',
    framing: [
      // TODO(content): the code-as-design-tool practice story.
      'Some ideas can only be judged running. I build working software — this portfolio included — to explore, test, and ship design decisions in the real medium.',
    ],
    slots: [
      {
        label: 'This portfolio',
        desc: 'The site you are reading: dual read/see modes, GSAP choreography, built in code with Claude.',
        wide: true,
      },
      {
        label: 'Figma Buddy',
        desc: 'AI design critique inside Figma comments — @buddy, built on the OpenAI API + Supabase.',
      },
      {
        label: 'The Refinery build',
        desc: 'From idea to a nine-agent system running locally for under fifteen cents a day.',
      },
    ],
    related: ['refinery', 'figma-buddy'],
  },
  {
    id: 'growth',
    num: '05',
    title: 'Designing for Discovery, Activation & Growth',
    promise:
      'First-run experiences, feature discovery, and the metrics that prove they work.',
    framing: [
      // TODO(content): activation/growth story — what moved, and how it was measured.
      'Design that earns its keep after launch: reworking first-run activation, making features discoverable in the flow of work, and instrumenting the journey so the team knows what moved.',
    ],
    slots: [
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
    ],
    related: ['browser-extension'],
  },
]

/* Tilt alternates across a theme's gallery so frames feel hand-placed. */
function slotTilt(i: number): string {
  return i % 2 === 0 ? 'cs-tilt-l' : 'cs-tilt-r'
}

function ThemeSection({ theme }: { theme: Theme }) {
  const links = theme.related
    .map(relatedLink)
    .filter((l): l is { title: string; href: string } => l !== null)

  return (
    <section id={theme.id} className="cs-theme">
      <p className="cs-eyebrow">Theme {theme.num} / 05</p>
      <h2 className="cs-h2">{theme.title}</h2>

      <div className="cs-body max-w-[760px]">
        {theme.framing.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Visual gallery — taped placeholder frames until curated imagery lands */}
      <div className="cs-tgallery">
        {theme.slots.map((slot, i) => (
          <div
            key={slot.label}
            className={`cs-figure ${slotTilt(i)}${slot.wide ? ' cs-tslot-wide' : ''}`}
            data-cs-figure
          >
            <span className="cs-tape" aria-hidden />
            <div
              className={`cs-figure-empty ${slot.wide ? 'aspect-[3/2] md:aspect-[21/9]' : 'aspect-[440/320]'}`}
            >
              <div>
                <p className="cs-figure-empty-label">{slot.label}</p>
                <p className="cs-figure-empty-desc">{slot.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {links.length > 0 && (
        <div className="cs-tlinks">
          <span className="cs-tlinks-label">Go deeper</span>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="cs-tlink">
              {link.title}
              <span aria-hidden="true"> →</span>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

export default function BlueJPage() {
  return (
    <ProjectPageLayout
      /* TODO(content): final page title. */
      title="Work samples for Blue J"
      /* No hero: the intro and theme grid are the first screen. Add
         hero={{ type: 'image', src: …, alt: … }} once there's art worth
         leading with. */
      nextHref="/portfolio"
      nextLabel="All projects"
    >
      {/* Intro note — TODO(content): 2–3 lines max, addressed to the Blue J team. */}
      <section className="mb-[64px]">
        <div className="cs-body max-w-[760px]">
          <p>
            Thanks for taking the time. Ahead of our next conversation, this page
            shows the breadth of my work through five themes — from design
            systems to zero-to-one, AI-native design, code-first practice, and
            growth. Each theme is a high-level sample; the full case studies are
            linked where you want to go deeper.
          </p>
        </div>
      </section>

      {/* Overview grid: five taped cards jump-linking to the sections below.
          Design systems leads and takes the widest card. */}
      <nav className="cs-tgrid mb-[24px]" aria-label="Themes on this page">
        {THEMES.map((theme, i) => (
          <a
            key={theme.id}
            href={`#${theme.id}`}
            className={`cs-tcard${i === 0 ? ' cs-tcard-featured' : ''}`}
          >
            <span className="cs-tape" aria-hidden />
            <p className="cs-tcard-num">{theme.num}</p>
            <h3 className="cs-tcard-title">{theme.title}</h3>
            <p className="cs-tcard-promise">{theme.promise}</p>
            <span className="cs-tcard-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        ))}
      </nav>

      {THEMES.map((theme) => (
        <Fragment key={theme.id}>
          <SectionDivider />
          <ThemeSection theme={theme} />
        </Fragment>
      ))}

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

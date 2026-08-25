# Starter prompt — resuming the Blue J page locally

I'm continuing work on the Blue J portfolio page in this repo
(charenk/design-portfolio-2026). Everything so far lives on the branch
`claude/bluej-designer-case-studies-zwkft3` — please check it out and read
`src/app/bluej/page.tsx` before doing anything.

## Context

I'm applying for a Senior Product Designer role at Blue J (AI for tax/legal
research). I've cleared the recruiter screen; the next round is waiting on my
portfolio. Two signals from their process shaped this page: they mention
**design systems** repeatedly, and they respond to **visuals more than text**.

So `/bluej` is a theme-led breadth page, not a single case study. Five locked
themes, each showing work samples at a high level:

1. From Design Drift to Design Systems
2. Zero to One: Frame, Research, Ship, Scale
3. AI-Native Design: Designing for Agents & Workflows
4. Code First Design
5. Designing for Discovery, Activation & Growth

## What's already built (3 commits on the branch)

- `src/app/bluej/page.tsx` — the page. An overview grid of five taped cards
  jump-links to five anchored theme sections. Each section has a short framing
  line, a gallery of taped placeholder frames, and "Go deeper" pills linking to
  the full case studies.
- `src/app/bluej/layout.tsx` — metadata + `robots: noindex`.
- `src/styles/case-study.css` — appended `.cs-t*` rules (theme cards, gallery
  grid, go-deeper pills) at the end of the file.
- `src/middleware.ts` — `/bluej` added to the matcher, so it's behind the
  password/magic-link gate.
- `src/components/layout/ProjectPageLayout.tsx` — `hero` is now optional;
  `'bluej'` added to `TRACKED_SLUGS`.
- Also on this branch: **read is now the default landing mode** sitewide
  (`src/app/layout.tsx` + `src/components/mode/ModeProvider.tsx`).

## Conventions to follow

- Build on `ProjectPageLayout` + the `src/components/case-study/*` kit. All
  `cs-*` CSS is scoped under `.cs-page`, which that layout provides. Do NOT
  hand-roll a new shell — `/workato` did that and it's the weak page on the site.
- All page copy lives in one `THEMES` array at the top of `page.tsx`, marked
  `TODO(content)`. Keep it there; don't scatter strings into JSX.
- Project titles/hrefs come from `getProject()` in `src/data/projects.ts` —
  don't duplicate them.

## What I want to do next

**The content pass.** Everything on the page is scaffold copy right now. I want
to replace:

- the page title and the intro note to Blue J
- each theme's framing line (keep them tight — visuals lead)
- the placeholder frames: swap each `cs-figure-empty` block for a real
  `cs-figure-media` + `img`, same pattern as `DecisionRow.tsx`

Priority: **Theme 01 (Design Systems)** needs net-new material — drift audit,
token/component architecture, adoption story. It's the theme Blue J cares most
about and the only one with no existing case study behind it.

Ask me for the actual content rather than inventing claims about my work.

## Running it locally

```bash
npm install && npm run dev
```
`/bluej` is gated — visit `http://localhost:3000/test` once to plant the access
cookie, then go to `http://localhost:3000/bluej`.

## Verified working (don't re-litigate unless I report a bug)

40-check sweep across all 10 routes × read/see × desktop/mobile: all 200, no
horizontal overflow, no console errors. All 5 anchor jumps land clear of the
fixed navbar. All 4 "Go deeper" links resolve 200. Mode toggle round-trips and
persists. `npm run build` clean; `npm run lint` has 2 pre-existing errors in
`admin/link-builder` and `viewedTracker` that are not from this work.

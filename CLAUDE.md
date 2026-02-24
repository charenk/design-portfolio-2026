# CLAUDE.md — AI Assistant Guide for design-portfolio-2026

This file tells Claude (and other AI assistants) everything needed to work on this codebase effectively.

---

## Project Overview

**Charen's Product Design Portfolio** — a static site showcasing product design work.

- **URL (production):** https://design-portfolio-2026.vercel.app
- **Local dev:** http://localhost:8000 (run `npm run serve`)
- **Stack:** Vanilla HTML5 · Tailwind CSS v3 · Vanilla JavaScript · Python HTTP server

---

## Project Structure

```
design-portfolio-2026/
├── index.html                     # Main portfolio page (home)
├── ai-pam-case-study.html         # Case study: AI PAM product
├── browser-extension-case-study.html  # Case study: Browser extension JIT access
├── workato.html                   # Targeted page for Workato application
├── src/
│   ├── input.css                  # All custom CSS (Tailwind + component styles)
│   └── main.js                    # All JS (scroll animations, modal, carousel)
├── dist/
│   └── output.css                 # Compiled & minified CSS — DO NOT edit directly
├── assets/
│   ├── icons/                     # Tool icons (Claude code, Cursor AI, Figma, Supabase, Vercel)
│   ├── sg-logo.png                # ShareGate logo
│   ├── bb-logo.png                # BlackBerry logo
│   └── deloitte.logo.png          # Deloitte logo
├── tailwind.config.js             # Tailwind custom design tokens
├── package.json                   # Build scripts
├── CLAUDE.md                      # This file
├── DESIGN_SPEC.md                 # Design system reference
└── README.md                      # Setup guide
```

---

## Development Commands

```bash
# Install dependencies (first time only)
npm install

# Build CSS (run after every CSS change)
npm run build

# Watch mode (auto-rebuilds CSS on save)
npm run dev

# Start local server
npm run serve
# → http://localhost:8000

# Type: static site, no framework, no bundler
```

> **Important:** Always run `npm run build` after editing `src/input.css`. The browser reads `dist/output.css` — edits to `input.css` won't appear until rebuilt.

---

## Architecture & Key Patterns

### CSS Architecture
- All styles live in `src/input.css` — Tailwind directives + custom component CSS
- Tailwind utility classes used inline in HTML for layout/spacing
- Custom CSS classes used for complex components (experiments section, footer, carousel, nav)
- No CSS frameworks other than Tailwind
- No CSS modules or scoped styles

### JavaScript Architecture
- Single file: `src/main.js`, loaded at bottom of `<body>`
- All code wrapped in `DOMContentLoaded`
- Two IntersectionObservers:
  1. Generic section observer (inline styles, `<section>` tags only)
  2. `scrollAnimationObserver` — watches `.fade-in-up` elements, adds `.is-visible` class
- Demo video modal: `#demo-modal`, opened by `.experiment-pill-demo` buttons
- Carousel: drag-to-scroll on `.carousel-container`
- No npm runtime dependencies — all vanilla JS

### Animation Pattern
To animate an element on scroll, add class `fade-in-up` to it in HTML:
```html
<div class="my-element fade-in-up">...</div>
```
The `scrollAnimationObserver` in `main.js` picks it up automatically. Add `style="transition-delay: 0.15s"` for staggering.

---

## Design System

See `DESIGN_SPEC.md` for full details. Quick reference:

| Token | Value |
|---|---|
| Background | `#FFF7EF` (warm off-white) |
| Dark card | `#2d2d2d` (experiments section) |
| Footer | `#FEDEC3` (warm peach) |
| Accent coral | `#FF6B4A` |
| Accent amber | `#D97706` |
| Text primary | `#000000` |
| Font | Montserrat (all weights) |
| Max content width | `1200px` |
| Page padding | `50px` desktop / `32px` mobile |

---

## Key Sections & Their Classes

### Navigation (`index.html`)
- `.nav-bar` — fixed top nav, glassmorphism on scroll (`.scrolled`)
- `.nav-pill` — active state pill button

### Hero Section
- `<header id="home">` — hero wrapper
- `.previously-shipped` — company logos row
- `.previously-shipped-logo` — individual logo (hover: scale)

### Recent Works Carousel (currently hidden)
- Wrapped in `<div class="hidden">` — remove `hidden` to reveal
- `.carousel-wrapper` / `.carousel-container` / `.carousel-card-item`

### Experiments Section
- `.experiments-section` → `.experiments-container` (CSS Grid: 2 columns)
  - Left col: `.experiments-left` (title + icon rail)
  - Right col: `.experiments-body` (stacked experiment cards)
- `.experiment-icon-wrap` — wraps icon + tooltip
- `.experiment-tooltip` — CSS-only tooltip, appears **below** icon on hover
- `.experiment-item` — individual card (hover: lift + bg lighten)
- `.experiment-pill-btn` — CTA buttons inside cards

### Footer
- `.footer` — warm peach background, overlaps experiments via negative margin
- `.footer-inner` — max-width 1200px centered (aligns with main content)
- `.footer-contact` — heading + contact links
- `.footer-decorative` — scrolling "Clarity Through Complexity" text

---

## Google Analytics

GA4 Measurement ID: `G-BCJZTX3QTN`

Added to all 4 HTML files immediately after `<head>`. Do not remove.

---

## What's Hidden / Pending

| Feature | Status | How to enable |
|---|---|---|
| Recent Works carousel | Hidden | Remove `hidden` class from wrapper div (~line 103 in index.html) |
| Case study pages | Placeholder content | Update `ai-pam-case-study.html`, `browser-extension-case-study.html` |

---

## Do's and Don'ts

**Do:**
- Run `npm run build` after every CSS change
- Keep all custom styles in `src/input.css`
- Use the `.fade-in-up` / `.is-visible` pattern for scroll animations
- Keep amounts/values consistent with design tokens in `tailwind.config.js`

**Don't:**
- Edit `dist/output.css` directly — it gets overwritten on build
- Add external JS libraries without good reason (keep it vanilla)
- Add new external CSS frameworks
- Break the `footer-inner` max-width constraint (it aligns footer text with main content)

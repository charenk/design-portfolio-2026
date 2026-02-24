# DESIGN_SPEC.md — Design System & Specification

Charen's Product Design Portfolio · Updated Feb 2026

---

## Color Palette

| Name | Hex | Usage |
|---|---|---|
| Page background | `#FFF7EF` | Warm off-white, entire page bg |
| Dark surface | `#2d2d2d` | Experiments section container |
| Card surface | `#3a3a3a` | Experiment item cards |
| Card hover | `#404040` | Experiment card on hover |
| Footer bg | `#FEDEC3` | Warm peach footer |
| Accent coral | `#FF6B4A` | Section headings (e.g. "Recent works") |
| Accent amber | `#D97706` | Footer links, hover states |
| Accent amber dark | `#b45309` | Footer link hover |
| Text primary | `#000000` | Body text |
| Text white | `#ffffff` | Text on dark surfaces |
| Text muted | `#9e9e9e` | Experiment card descriptions |
| Text subtle | `#b0b0b0` | Secondary text on dark |
| Gradient start | `#FF6B4A` | AI-powered gradient text start |
| Gradient end | `#D97706` | AI-powered gradient text end |
| Nav border | `rgba(0,0,0,0.06)` | Nav bar border on scroll |

---

## Typography

**Font Family:** Montserrat (Google Fonts)
Weights used: 300 · 400 · 500 · 600 · 700

| Scale | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| H1 | 50px | 300 (Light) | 1.2 | -2.25px | Page headings |
| Body | 24px | 400 | 1.52 | -1.08px | Main paragraphs |
| Caption | 16px | 500 | 1.03 | -0.72px | Labels, small text |
| Section title | 22px | 600 | — | -0.01em | Experiments title |
| Footer heading | 24px | 600 | 1.3 | — | "Interested in collaborating" |
| Card title | 15px | 600 | 1.4 | — | Experiment card titles |
| Card desc | 13px | 400 | 1.55 | — | Experiment card descriptions |
| Pill button | 13px | 500 | — | — | CTA buttons |
| Tooltip | 12px | 400 | 1.45 | — | Icon tooltips |
| Decorative | clamp(80px, 12vw, 140px) | 700 | — | -0.02em | "Clarity Through Complexity" |

**Mobile scaling:**
- H1: 50px → 32px
- Body: 24px → 18px
- Footer heading: 24px → 20px

---

## Spacing & Layout

| Token | Value | Usage |
|---|---|---|
| Max content width | `1200px` | `max-w-main-content` — main content + footer-inner |
| Page padding (desktop) | `50px` horizontal | `px-[50px]` on `<main>` |
| Page padding (mobile) | `32px` horizontal | `px-8` |
| Page top padding | `200px` | Clears fixed nav |
| Section gap | `80px` | `margin-top: 80px` on experiments |
| Card padding | `24px 28px` | Experiment item cards |
| Container padding | `40px` | Experiments container |
| Footer padding | `244px 48px 80px` | Top accounts for experiment overlap |
| Footer overlap | `-180px` | Negative margin pulls footer up behind experiments |
| Footer border radius | `24px 24px 0 0` | Rounded top corners |
| Footer inner gap | `60px` | Below contact block before decorative text |

---

## Grid & Layout System

### Page Layout
```
viewport
└── .pageBackground (full width, min-height: 100vh, bg: #FFF7EF)
    ├── <nav> (fixed, z-index: 50)
    ├── <main> (px-[50px] pt-[200px])
    │   └── .max-w-main-content (max-width: 1200px, mx-auto)
    │       ├── <header> hero
    │       ├── (hidden) recent works carousel
    │       └── .experiments-section
    └── <footer> (max-width: calc(100% - 80px), margin: auto)
        └── .footer-inner (max-width: 1200px, mx-auto) ← aligns with main content
```

### Experiments Grid
```
.experiments-container (display: grid, grid-template-columns: 1fr 1fr, gap: 40px)
├── .experiments-left (grid-column: 1/2)
│   ├── .experiments-title
│   └── .experiment-icon-rail (flex, gap: 10px)
│       └── .experiment-icon-wrap × 5 (position: relative, has tooltip)
└── .experiments-body (grid-column: 2/3)
    ├── .experiment-item (card 1)
    └── .experiment-item (card 2)
```

---

## Component Specs

### Navigation Bar
- Position: `fixed`, top, full width, z-index: 50
- Background: white with `backdrop-filter: blur(20px)` on scroll
- Max-width: `1200px` centered
- Profile image: `40px` circular
- Active state: dark pill with white text, `border-radius: 999px`

### Experiment Cards
- Background: `#3a3a3a` → `#404040` on hover
- Border radius: `12px`
- Hover: `translateY(-2px)` lift + bg lighten
- Transition: `0.2s ease`

### Icon Tooltips (CSS-only)
- Position: `absolute`, `top: calc(100% + 10px)` — appears **below** icon
- Background: `#1a1a1a`, `border-radius: 8px`
- Width: `200px`, font-size: `12px`
- Arrow: `::after` pseudo-element pointing upward (`border-bottom-color: #1a1a1a`)
- Transition: opacity + translateY, `0.18s ease`

### Pill Buttons
- `border-radius: 999px`, padding: `7px 16px`
- Background: `#4a4a4a`, text: white
- Hover: `opacity: 0.85` + `translateY(-1px)`

### Footer Decorative Text
- Scrolling marquee animation: `footer-scroll` keyframe, 60s linear, 2s delay, infinite
- Position: `relative` (flows below contact in document order)
- Color: `rgba(210, 180, 140, 0.15)` — very low opacity

---

## Animation System

### Scroll Fade-in (`.fade-in-up`)
```css
/* Base state */
.fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Triggered state (added by IntersectionObserver in main.js) */
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Elements animated on scroll:**
| Element | Delay |
|---|---|
| Hero paragraph 1 | 0s |
| Hero paragraph 2 | 0.15s |
| "Previously shipped at" block | 0.3s |
| Experiments left column | 0s (enters viewport later) |
| Experiments right column | 0.1s |
| Footer contact block | 0s |

### Hover Microinteractions
| Element | Effect |
|---|---|
| Company logos | `scale(1.08)` + `opacity: 0.75` |
| Tool icons | `scale(1.1)` + `opacity: 0.9` |
| Experiment cards | `translateY(-2px)` + bg `#404040` |
| Pill buttons | `translateY(-1px)` + `opacity: 0.85` |
| Nav links | color transition |
| Footer links | color: `#b45309` |

---

## Assets

### Icons (`assets/icons/`)
| File | Tool | Tooltip text |
|---|---|---|
| `Claude code.png` | Claude Code | "Claude code for system design, architecture setup and automation" |
| `Cursor AI.png` | Cursor AI | "Cursor for deep application level work" |
| `Figma.png` | Figma | "Figma for design exploration" |
| `Supabase.png` | Supabase | "Supabase for database and authentication" |
| `Vercel.png` | Vercel | "Vercel for deployment, log analysis and getting public feedback" |

Icon size: `36×36px`, `border-radius: 8px`

### Company Logos (`assets/`)
- `sg-logo.png` — ShareGate by Workleap
- `bb-logo.png` — BlackBerry
- `deloitte.logo.png` — Deloitte

Logo height: `36px`, width auto, `object-position: bottom`

---

## Pages

| File | Purpose | GA4 | Notes |
|---|---|---|---|
| `index.html` | Main portfolio | ✅ | Primary landing page |
| `ai-pam-case-study.html` | AI PAM case study | ✅ | Content in progress |
| `browser-extension-case-study.html` | JIT access case study | ✅ | Content in progress |
| `workato.html` | Workato application page | ✅ | `noindex` meta tag |

---

## Google Analytics

- **Property:** G-BCJZTX3QTN
- **Installed on:** All 4 HTML pages
- **Placement:** First thing inside `<head>` tag
- **Goal:** Track visitors to inform future portfolio improvements

---

## Figma Reference

Design file: https://www.figma.com/design/TRjAbPnfKGVj0tfYgTMLlt/Design-portolio

Key node IDs referenced:
- Experiments section: `node-id=18-854`

---

## Pending / Backlog

| Feature | Priority | Notes |
|---|---|---|
| Reveal Recent Works carousel | High | 4 case studies need to be updated first; remove `hidden` class |
| Update AI PAM case study content | High | Placeholder content currently |
| Update Browser Extension case study | High | Placeholder content currently |
| Add profile photo | Medium | Currently using avatar placeholder |
| Add favicon | Medium | None set yet |
| Export/print resume link | Low | — |
| Contact form | Low | Currently email/phone links only |
| Dark mode | Low | — |

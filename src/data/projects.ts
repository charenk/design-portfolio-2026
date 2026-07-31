/**
 * Single source of truth for project card data. Consumed by the home
 * WorkGallery, the /portfolio grid, and the /v1 /v2 /v3 direction prototypes.
 */

export interface Project {
  slug: string
  title: string
  /** Short tag line shown under or beside the title, middot-separated. */
  tags: string
  href: string
  badge?: string
  comingSoon?: boolean
  /** One-sentence description used by the redesign prototypes. */
  description: string
  /** Card background tint used while imagery loads or as a plain swatch. */
  placeholder: string
  /** Artwork for the home fanned gallery (square-ish). */
  fanImage?: string
  /** Artwork for the portfolio grid and prototype showcases (wide). */
  bannerImage?: string
  imageFit?: 'cover'
}

export const ALL_PROJECTS: Project[] = [
  {
    slug: 'ai-pam',
    title: 'AI-powered privileged access management',
    tags: 'Enterprise SaaS · Identity',
    href: '/ai-pam',
    badge: 'CyberQP',
    description:
      'An agentic PAM platform with human-in-the-loop gates, intent-aware automation, and compliance-safe defaults.',
    placeholder: '#dde4ed',
    fanImage: '/Agentic-Pam.svg',
    bannerImage: '/assets/portfolio%20list%20page/ai-pam-portfolio-page-banner.svg',
    imageFit: 'cover',
  },
  {
    slug: 'browser-extension',
    title: 'CyberQP Browser Extension',
    tags: 'Vault · Just-in-Time accounts',
    href: '/browser-extension',
    description:
      'Vault credentials and just-in-time accounts consolidated into one extension for MSP technicians.',
    placeholder: '#e8dded',
    fanImage: '/Browser-extension.svg',
    bannerImage: '/assets/portfolio%20list%20page/CyberQP%20browser%20extension.svg',
    imageFit: 'cover',
  },
  {
    slug: 'refinery',
    title: 'Multi agent experiment to monitor TFSA holdings',
    tags: 'Experiment · Agentic',
    href: '/refinery',
    badge: 'Solo project',
    description:
      'Eight coordinated agents scan my TFSA holdings twice a day and surface what is worth learning about.',
    placeholder: '#edeadd',
    fanImage: '/assets/portfolio%20list%20page/The%20refinery%20project.png',
    bannerImage: '/assets/portfolio%20list%20page/The%20refinery%20project.png',
    imageFit: 'cover',
  },
  {
    slug: 'onboarding',
    title: 'Rethinking CyberQP user activation and discovery',
    tags: 'Activation · Discovery',
    href: '#',
    badge: 'Coming soon',
    comingSoon: true,
    description:
      'Reworking first-run activation and feature discovery for CyberQP.',
    placeholder: '#f4dde0',
    bannerImage: '/assets/portfolio%20list%20page/CyberQP%20growth.svg',
    imageFit: 'cover',
  },
  {
    slug: 'blackberry',
    title: 'Endpoint protection platform',
    tags: 'Security · Endpoints',
    href: '#',
    badge: 'Coming soon',
    comingSoon: true,
    description:
      'Analyst surfaces for BlackBerry Cylance endpoint protection and threat visibility.',
    placeholder: '#dee9e0',
    bannerImage: '/assets/portfolio%20list%20page/Blackberry.svg',
    imageFit: 'cover',
  },
  {
    slug: 'copilot',
    title: 'Copilot tenant assessment',
    tags: 'MSP, Enterprises SaaS, M365 Governance',
    href: '#',
    badge: 'Coming soon',
    comingSoon: true,
    description:
      'A gap-led readiness assessment that tells M365 tenants whether they are safe to turn on Copilot.',
    placeholder: '#e7dde9',
    bannerImage: '/assets/portfolio%20list%20page/Tenant%20assessment.svg',
    imageFit: 'cover',
  },
]

/** The three live case studies shown in the home gallery. */
export const FEATURED_PROJECTS: Project[] = ALL_PROJECTS.filter(
  (p) => !p.comingSoon
)

export function getProject(slug: string): Project | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug)
}

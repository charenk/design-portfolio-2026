import { redirect, notFound } from 'next/navigation'

// Friendly short forms for utm_source. Anything not in this map is passed
// through as-is, so company names like "okta" or "stripe" work without
// being aliased.
const SOURCE_ALIASES: Record<string, string> = {
  yc: 'ycombinator',
  ln: 'linkedin',
  wf: 'wellfound',
  ind: 'indeed',
  ref: 'referral',
  sl: 'slack',
  tw: 'twitter',
  rs: 'resume',
  email: 'email',
}

// utm_medium must be one of these short forms. Strict whitelist so random
// 3-segment paths don't accidentally trigger a redirect.
const MEDIUM_ALIASES: Record<string, string> = {
  app: 'application',
  cold: 'cold',
  intro: 'intro',
  bio: 'bio',
  ref: 'referral',
}

// Catch-all for short-slug attribution URLs like /okta-app-2026-05-11.
// Parses <source>-<medium>-<descriptor> and 302s to /portfolio with full
// UTM params. Existing explicit routes (/portfolio, /refinery, /ai-pam,
// /admin/...) win over this dynamic route, so collision-free.
export default async function ShortSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const parts = slug.split('-')
  if (parts.length < 3) notFound()

  const sourceRaw = parts[0]
  const mediumRaw = parts[1]
  if (!(mediumRaw in MEDIUM_ALIASES)) notFound()

  const utmSource = SOURCE_ALIASES[sourceRaw] ?? sourceRaw
  const utmMedium = MEDIUM_ALIASES[mediumRaw]

  const target = new URL('/portfolio', 'https://charen.online')
  target.searchParams.set('utm_source', utmSource)
  target.searchParams.set('utm_medium', utmMedium)
  target.searchParams.set('utm_campaign', slug)
  redirect(target.pathname + target.search)
}

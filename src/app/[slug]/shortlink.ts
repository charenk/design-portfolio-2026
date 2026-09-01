import { type NextRequest, NextResponse } from 'next/server'

// Slug must be alphanumeric (with hyphens), 3–30 chars, no leading/trailing
// hyphen. Tight enough to skip file-extension probes (".env", ".html") and
// short scraper paths, loose enough to accept friendly org names like "okta",
// "stripe", or "okta-2026" when the user wants disambiguation.
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/i

/**
 * Shared engine for short attribution URLs: treats the slug as the
 * org/campaign identifier, plants the portfolio_access cookie on the same
 * response, and 307s to the destination with UTM query params. The visitor
 * bypasses the password gate without ever seeing a token.
 *
 * Destinations: /google lands on home (destination '/'); /google/custom-deck
 * lands straight on the pitch deck. admin_access is intentionally NOT
 * granted here; the admin tool stays behind the magic-link token flow only.
 */
export function shortlinkResponse(
  request: NextRequest,
  slug: string,
  destination: '/' | '/custom-deck'
) {
  if (!SLUG_PATTERN.test(slug)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const normalized = slug.toLowerCase()

  const target = new URL(destination, request.url)
  target.searchParams.set('utm_source', normalized)
  target.searchParams.set('utm_medium', 'shortlink')
  target.searchParams.set('utm_campaign', normalized)

  const response = NextResponse.redirect(target, 307)
  response.cookies.set('portfolio_access', '1', {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/',
  })
  response.cookies.set('portfolio_entry', 'slug', {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/',
  })
  return response
}

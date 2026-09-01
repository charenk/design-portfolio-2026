import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Design mode: on-demand local bypass of every gate, including /admin.
  // Started with `npm run design`. The NODE_ENV guard keeps the flag inert
  // in production even if DESIGN_MODE leaks into a deploy's env.
  if (
    process.env.DESIGN_MODE === '1' &&
    process.env.NODE_ENV === 'development'
  ) {
    return NextResponse.next()
  }

  // Tier 1: magic link token in URL. Two tokens, two audiences:
  // PORTFOLIO_TOKEN is the SHARE token (goes into links sent to companies)
  // and unlocks viewing only; ADMIN_TOKEN is the OWNER token and also
  // unlocks /admin. Recipients of share links must never end up holding
  // admin cookies. Until ADMIN_TOKEN is configured in the environment, the
  // share token keeps its legacy admin grant so the owner's device-unlock
  // flow doesn't silently break.
  const urlToken = searchParams.get('t')
  const shareToken = process.env.PORTFOLIO_TOKEN
  const adminToken = process.env.ADMIN_TOKEN
  const isAdminToken = Boolean(urlToken && adminToken && urlToken === adminToken)
  const isShareToken = Boolean(urlToken && shareToken && urlToken === shareToken)

  if (isAdminToken || isShareToken) {
    // Valid token: set cookie and redirect with only the token stripped (UTM params preserved
    // so GA + LogRocket can attribute the visit to a specific application/campaign).
    const cleanUrl = new URL(request.url)
    cleanUrl.searchParams.delete('t')
    const response = NextResponse.redirect(cleanUrl)
    response.cookies.set('portfolio_access', '1', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      path: '/',
    })
    response.cookies.set('portfolio_entry', 'magic', {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      path: '/',
    })
    // Password unlock never sets admin_access, so the admin tools stay
    // invisible to anyone who only has the password.
    if (isAdminToken || (isShareToken && !adminToken)) {
      response.cookies.set('admin_access', '1', {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/',
      })
    }
    return response
  }

  // /admin/*: token-only gate. Password access does not unlock these routes.
  if (pathname.startsWith('/admin')) {
    const adminCookie = request.cookies.get('admin_access')
    if (adminCookie?.value === '1') {
      return NextResponse.next()
    }
    // No admin cookie: bounce to home silently. The route is non-discoverable on purpose.
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Open paths: no gate, but they sit in the matcher so the magic-link
  // token above still gets consumed there. A link-builder URL to the pitch
  // pages then plants the access cookies (silently unlocking the gated
  // case studies for that visitor) while plain URLs stay zero-friction.
  if (
    pathname === '/' ||
    pathname === '/bluej-custom-pitch' ||
    pathname === '/custom-deck'
  ) {
    return NextResponse.next()
  }

  // Tier 2: check for existing access cookie
  const accessCookie = request.cookies.get('portfolio_access')
  if (accessCookie?.value === '1') {
    return NextResponse.next()
  }

  // No valid token or cookie: send to lock page with return path.
  // Keep the original query string (UTM params, etc.) so attribution survives
  // the password unlock round-trip.
  const lockUrl = new URL('/portfolio/lock', request.url)
  const returnPath = pathname + (request.nextUrl.search || '')
  lockUrl.searchParams.set('return', returnPath)
  return NextResponse.redirect(lockUrl)
}

export const config = {
  // /refinery and /figma-buddy are deliberately absent; both are public
  // experiments. /bluej-custom-pitch and /custom-deck ARE matched but pass
  // through ungated (see the open-paths branch above): unlisted + noindex,
  // the URL is the gate, and being in the matcher lets link-builder token
  // URLs plant their cookies. Everything else that isn't the home page is
  // gated, including /workato.
  matcher: ['/', '/portfolio', '/workato', '/bluej-custom-pitch', '/custom-deck', '/ai-pam', '/browser-extension', '/copilot', '/blackberry', '/admin/:path*'],
}

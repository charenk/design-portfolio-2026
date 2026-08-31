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

  // Tier 1: magic link token in URL
  const urlToken = searchParams.get('t')
  const envToken = process.env.PORTFOLIO_TOKEN

  if (urlToken && envToken && urlToken === envToken) {
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
    // Token-bearing visits also unlock /admin routes. Password unlock does NOT set
    // this cookie, so the admin tools stay invisible to anyone who only has the password.
    response.cookies.set('admin_access', '1', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
      path: '/',
    })
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

  // Home page: open to everyone, no gate.
  // (Matcher includes "/" only so the magic-link token above can be consumed.)
  if (pathname === '/') {
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
  // experiments. /bluej-custom-pitch and /custom-deck are also ungated:
  // both are unlisted and noindex, so the URL itself is the gate, and the
  // companies reviewing them should hit zero friction. Everything else that
  // isn't the home page is gated, including /workato.
  matcher: ['/', '/portfolio', '/workato', '/ai-pam', '/browser-extension', '/copilot', '/blackberry', '/admin/:path*'],
}

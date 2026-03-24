import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Don't guard the lock page itself — would cause a redirect loop
  if (pathname.startsWith('/portfolio/lock')) {
    return NextResponse.next()
  }

  // Tier 1: magic link token in URL
  const urlToken = searchParams.get('t')
  const envToken = process.env.PORTFOLIO_TOKEN

  if (urlToken && envToken && urlToken === envToken) {
    // Valid token — set cookie and redirect to /portfolio (token stripped from URL)
    const response = NextResponse.redirect(new URL('/portfolio', request.url))
    response.cookies.set('portfolio_access', '1', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      path: '/',
    })
    return response
  }

  // Tier 2: check for existing access cookie
  const accessCookie = request.cookies.get('portfolio_access')
  if (accessCookie?.value === '1') {
    return NextResponse.next()
  }

  // No valid token or cookie — send to lock page
  return NextResponse.redirect(new URL('/portfolio/lock', request.url))
}

export const config = {
  matcher: ['/portfolio', '/portfolio/:path*'],
}

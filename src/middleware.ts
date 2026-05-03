import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Tier 1: magic link token in URL
  const urlToken = searchParams.get('t')
  const envToken = process.env.PORTFOLIO_TOKEN

  if (urlToken && envToken && urlToken === envToken) {
    // Valid token — set cookie and redirect to the same path (token stripped from URL)
    const cleanUrl = new URL(pathname, request.url)
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
    return response
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

  // No valid token or cookie — send to lock page with return path
  const lockUrl = new URL('/portfolio/lock', request.url)
  lockUrl.searchParams.set('return', pathname)
  return NextResponse.redirect(lockUrl)
}

export const config = {
  matcher: ['/', '/portfolio', '/workato', '/ai-pam', '/browser-extension', '/figma-buddy'],
}

"use server"

import { cookies } from 'next/headers'

const ALLOWED_RETURN_PATHS = [
  '/portfolio',
  '/workato',
  '/ai-pam',
  '/browser-extension',
  '/figma-buddy',
  '/refinery',
  '/copilot',
  '/blackberry',
]

function sanitizeReturn(url: string | null | undefined): string {
  if (!url) return '/'
  // Match the path portion against the allow-list, but preserve any query
  // string (UTM params, etc.) on the returned URL.
  const pathOnly = url.split('?')[0]
  if (ALLOWED_RETURN_PATHS.some(p => pathOnly === p || pathOnly.startsWith(p + '/'))) return url
  return '/'
}

export async function verifyPassword(
  password: string,
  returnUrl?: string,
): Promise<{ error?: string; redirectTo?: string }> {
  const expected = process.env.PORTFOLIO_PASSWORD
  if (!expected || password !== expected) {
    return { error: 'Incorrect password. Try again.' }
  }
  const cookieStore = await cookies()
  cookieStore.set('portfolio_access', '1', {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('portfolio_entry', 'password', {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    path: '/',
  })
  // Return the destination so the client can use router.replace, which
  // overwrites the /portfolio/lock entry in browser history. Without this,
  // pressing back from the unlocked page would land the user on the lock
  // screen again.
  return { redirectTo: sanitizeReturn(returnUrl) }
}

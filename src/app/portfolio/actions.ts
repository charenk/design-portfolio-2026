"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ALLOWED_RETURN_PATHS = ['/workato', '/ai-pam', '/browser-extension', '/figma-buddy']

function sanitizeReturn(url: string | null | undefined): string {
  if (!url) return '/'
  if (ALLOWED_RETURN_PATHS.some(p => url === p || url.startsWith(p + '/'))) return url
  return '/'
}

export async function verifyPassword(password: string, returnUrl?: string): Promise<{ error?: string }> {
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
  redirect(sanitizeReturn(returnUrl))
}

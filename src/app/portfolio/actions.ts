"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verifyPassword(password: string): Promise<{ error?: string }> {
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
  redirect('/portfolio')
}

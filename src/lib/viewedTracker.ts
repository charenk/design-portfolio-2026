"use client"

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio:lastViewed'
const EXPIRY_MS = 24 * 60 * 60 * 1000

interface LastViewedRecord {
  slug: string
  viewedAt: number
}

function readRecord(): LastViewedRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as LastViewedRecord
    if (!parsed?.slug || typeof parsed.viewedAt !== 'number') return null
    if (Date.now() - parsed.viewedAt > EXPIRY_MS) return null
    return parsed
  } catch {
    return null
  }
}

export function markViewed(slug: string): void {
  if (typeof window === 'undefined') return
  try {
    const record: LastViewedRecord = { slug, viewedAt: Date.now() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // localStorage unavailable (private mode, quota, etc.): fail silently
  }
}

export function useLastViewedSlug(): string | null {
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    setSlug(readRecord()?.slug ?? null)

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      setSlug(readRecord()?.slug ?? null)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return slug
}

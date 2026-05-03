"use client"

import { useEffect, useState } from 'react'
import { useLastViewedSlug } from '@/lib/viewedTracker'

interface LastViewedBadgeProps {
  slug: string
}

export function LastViewedBadge({ slug }: LastViewedBadgeProps) {
  const lastSlug = useLastViewedSlug()
  const isVisible = lastSlug === slug
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    if (isVisible) setHasMounted(true)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <span
      className={`absolute bottom-3 left-3 z-10 inline-flex items-center rounded-full bg-[#e9d5ff] px-2.5 py-1 font-sans text-[11px] font-medium text-[#6b21a8] shadow-sm transition-opacity duration-200 ${hasMounted ? 'opacity-100' : 'opacity-0'}`}
      aria-label="You last viewed this case study"
    >
      Last viewed
    </span>
  )
}

'use client'

import { useEffect, useRef } from 'react'

interface GridFadeOptions {
  /** Scroll progress (0-1) at which the grid finishes fading out. */
  fadeEnd?: number
  /** Scroll progress past which the grid is forced hidden. Pass null to disable. */
  hideAfter?: number | null
}

/**
 * Drives the `--gridOpacity` CSS variable on the returned element from scroll
 * position: eased fade over the first `fadeEnd` of the page, hard-hidden past
 * `hideAfter`. Attach the ref to the `.pageBackground` wrapper.
 */
export function useGridFade<T extends HTMLElement = HTMLDivElement>(
  options: GridFadeOptions = {}
) {
  const { fadeEnd = 0.3, hideAfter = 0.85 } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const maxScroll = docHeight - viewportHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0

      let opacity = 1
      if (progress <= fadeEnd) {
        const fadeProgress = progress / fadeEnd
        const easedProgress = 1 - Math.pow(1 - fadeProgress, 3)
        opacity = 1 - easedProgress
      } else {
        opacity = 0
      }

      if (hideAfter !== null && progress > hideAfter) {
        opacity = 0
      }

      opacity = Math.max(0, Math.min(1, opacity))
      ref.current?.style.setProperty('--gridOpacity', String(opacity))
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    update()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [fadeEnd, hideAfter])

  return ref
}

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/motion/gsap'

export type PortfolioMode = 'read' | 'see'

const PREF_KEY = 'portfolio-mode'

/**
 * A page-level transition takes over the visual switch (e.g. the Flip morph
 * on home and portfolio). It receives the target mode and an `apply` callback
 * that commits state + persistence; the handler decides when to call it
 * (typically inside flushSync) and how to animate around it.
 */
export type ModeTransitionHandler = (
  next: PortfolioMode,
  apply: () => void
) => void

interface ModeContextValue {
  mode: PortfolioMode
  setMode: (next: PortfolioMode) => void
  registerTransition: (handler: ModeTransitionHandler) => () => void
}

const ModeContext = createContext<ModeContextValue | null>(null)

/**
 * Sitewide read/see mode. SSR always renders "see"; a pre-paint inline script
 * in the root layout mirrors a stored "read" preference onto
 * html[data-mode] so CSS variants are correct before hydration, and this
 * provider syncs React state to it pre-paint on mount.
 */
export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>('see')
  const modeRef = useRef<PortfolioMode>('see')
  const handlerRef = useRef<ModeTransitionHandler | null>(null)
  const busyRef = useRef(false)

  useLayoutEffect(() => {
    modeRef.current = mode
  }, [mode])

  useLayoutEffect(() => {
    if (document.documentElement.dataset.mode === 'read') {
      // Pre-paint restore of the stored preference set by the inline script.
      // Cannot live in the useState initializer without a hydration mismatch,
      // since the server always renders "see".
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModeState('read')
    }
  }, [])

  const setMode = useCallback((next: PortfolioMode) => {
    if (next === modeRef.current || busyRef.current) return

    const apply = () => {
      try {
        window.localStorage.setItem(PREF_KEY, next)
      } catch {}
      if (next === 'read') {
        document.documentElement.dataset.mode = 'read'
      } else {
        delete document.documentElement.dataset.mode
      }
      setModeState(next)
    }

    const handler = handlerRef.current
    if (handler) {
      handler(next, apply)
      return
    }

    if (prefersReducedMotion()) {
      apply()
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return
    }

    // Default for single-DOM pages: a soft opacity-only crossfade. Never
    // animate transforms or visibility on body: transforms break
    // position: fixed descendants (nav, lightboxes).
    busyRef.current = true
    gsap.to(document.body, {
      opacity: 0,
      duration: 0.18,
      ease: 'power1.in',
      onComplete: () => {
        apply()
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          gsap.to(document.body, {
            opacity: 1,
            duration: 0.3,
            ease: 'power1.out',
            onComplete: () => {
              busyRef.current = false
            },
          })
        })
      },
    })
  }, [])

  const registerTransition = useCallback(
    (handler: ModeTransitionHandler) => {
      handlerRef.current = handler
      return () => {
        if (handlerRef.current === handler) {
          handlerRef.current = null
        }
      }
    },
    []
  )

  const value = useMemo(
    () => ({ mode, setMode, registerTransition }),
    [mode, setMode, registerTransition]
  )

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext)
  if (!ctx) {
    throw new Error('useMode must be used inside ModeProvider')
  }
  return ctx
}

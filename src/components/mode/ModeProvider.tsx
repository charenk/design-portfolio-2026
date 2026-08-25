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
 * Sitewide read/see mode. Every load lands in "read": SSR renders
 * html[data-mode="read"] and nothing restores a stored preference. The
 * toggle switches modes for the current visit only.
 */
export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>('read')
  const modeRef = useRef<PortfolioMode>('read')
  const handlerRef = useRef<ModeTransitionHandler | null>(null)
  const busyRef = useRef(false)

  useLayoutEffect(() => {
    modeRef.current = mode
  }, [mode])

  const setMode = useCallback((next: PortfolioMode) => {
    if (next === modeRef.current || busyRef.current) return

    const apply = () => {
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

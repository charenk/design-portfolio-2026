"use client"

import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { gsap, useGSAP, FULL_MOTION, REDUCED_MOTION } from '@/lib/motion/gsap'
import { verifyPassword } from '../actions'

export function LockForm({ returnUrl }: { returnUrl: string }) {
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const result = await verifyPassword(password, returnUrl)
      if (result?.error) {
        setError(result.error)
        return
      }
      if (result?.redirectTo) {
        // replace, not push, so the lock page is overwritten in history.
        // Pressing back from the case study now goes to wherever the user
        // came from before the lock (typically the home page).
        router.replace(result.redirectTo)
      }
    })
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Single gentle drop-in: the note falls onto the desk and its
      // rotation settles into the CSS resting tilt.
      mm.add(FULL_MOTION, () => {
        gsap.from('.lk-card', {
          autoAlpha: 0,
          y: -48,
          rotation: -3,
          duration: 0.8,
          ease: 'back.out(1.4)',
        })
        gsap.from('.lk-annotation', {
          autoAlpha: 0,
          y: 10,
          duration: 0.5,
          delay: 0.45,
          ease: 'power3.out',
        })
      })

      // Reduced motion: no tweens, the note renders in place.
      mm.add(REDUCED_MOTION, () => {})

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <div ref={rootRef} className="lk-page dir-tactile">
      <main className="lk-main">
        <div className="lk-card">
          <span className="tc-tape" aria-hidden="true" />

          <p className="lk-eyebrow">Private access</p>
          <h1 className="lk-title">Charen&apos;s portfolio</h1>
          <p className="lk-sub">
            This page is password protected. Enter the password to continue.
          </p>

          <form onSubmit={handleSubmit} className="lk-form">
            <input
              type="password"
              data-private
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="lk-input"
            />
            {error && (
              <p className="lk-error">{error}</p>
            )}
            <button
              type="submit"
              disabled={isPending || !password}
              className="lk-submit"
            >
              {isPending ? 'Checking…' : 'Unlock'}
            </button>
          </form>
        </div>

        <p className="tc-caveat lk-annotation">
          psst, check your invite for the password
        </p>
      </main>
    </div>
  )
}

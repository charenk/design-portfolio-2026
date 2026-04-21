"use client"

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { verifyPassword } from '../actions'

export function LockForm({ returnUrl }: { returnUrl: string }) {
  const router = useRouter()
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

  return (
    <div className="min-h-screen bg-[#FFF7EF] flex items-center justify-center px-8">
      <div className="w-full max-w-[360px]">
        <p className="font-sans text-[13px] font-medium tracking-widest uppercase text-[#9e9e9e] mb-4">
          Private access
        </p>
        <h1 className="font-sans font-light text-[32px] leading-tight text-[#1a1a1a] mb-2">
          Charen&apos;s portfolio
        </h1>
        <p className="font-sans text-[15px] text-[#6b6b6b] mb-10 leading-relaxed">
          This page is password protected. Enter the password to continue.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full border border-[#d4d4d4] bg-white rounded px-4 py-3 font-sans text-[15px] text-[#1a1a1a] placeholder-[#b0b0b0] outline-none focus:border-[#1a1a1a] transition-colors"
          />
          {error && (
            <p className="font-sans text-[13px] text-red-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={isPending || !password}
            className="w-full bg-black text-white font-sans font-medium text-[15px] py-3 rounded hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  )
}

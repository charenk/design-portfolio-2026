"use client"

import { useEffect, useMemo, useState } from 'react'

const SOURCE_SUGGESTIONS = [
  'ycombinator',
  'linkedin',
  'wellfound',
  'indeed',
  'email',
  'referral',
  'slack',
  'twitter',
  'resume',
] as const

// Short forms for utm_source when building the path-based short URL.
// Anything not in this map (e.g. typed company names like "okta") falls
// through as-is.
const SOURCE_SHORT: Record<string, string> = {
  ycombinator: 'yc',
  linkedin: 'ln',
  wellfound: 'wf',
  indeed: 'ind',
  email: 'email',
  referral: 'ref',
  slack: 'sl',
  twitter: 'tw',
  resume: 'rs',
}

const MEDIUMS = ['application', 'cold', 'intro', 'bio'] as const

// Short forms for utm_medium in the path-based short URL. These match
// the whitelist in src/app/[slug]/page.tsx.
const MEDIUM_SHORT: Record<(typeof MEDIUMS)[number], string> = {
  application: 'app',
  cold: 'cold',
  intro: 'intro',
  bio: 'bio',
}

const TARGETS = [
  { label: 'Portfolio (default)', path: '/portfolio' },
  { label: 'Refinery case study', path: '/refinery' },
  { label: 'AI-PAM case study', path: '/ai-pam' },
  { label: 'Browser Extension case study', path: '/browser-extension' },
  { label: 'Figma Buddy case study', path: '/figma-buddy' },
  { label: 'Workato case study', path: '/workato' },
  { label: 'Copilot case study', path: '/copilot' },
  { label: 'BlackBerry case study', path: '/blackberry' },
  { label: 'Home', path: '/' },
] as const

const SITE_ORIGIN = 'https://charen.online'
const TOKEN_STORAGE_KEY = 'admin_link_token'

function todayISO(): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function compactDate(iso: string): string {
  // YYYY-MM-DD → MMDD (e.g. "0511"). Just enough to disambiguate same-day
  // applications without bloating the slug with the full year.
  const parts = iso.split('-')
  if (parts.length !== 3) return ''
  return `${parts[1]}${parts[2]}`
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

type CopyKind = 'url' | 'short' | 'row'

export default function LinkBuilderPage() {
  const [org, setOrg] = useState('')
  const [role, setRole] = useState('')
  const [source, setSource] = useState<string>('linkedin')
  const [medium, setMedium] = useState<(typeof MEDIUMS)[number]>('application')
  const [date, setDate] = useState(todayISO())
  const [target, setTarget] = useState<string>('/portfolio')
  const [withToken, setWithToken] = useState(false)
  const [token, setToken] = useState('')
  const [tokenInput, setTokenInput] = useState('')
  const [descriptorOverride, setDescriptorOverride] = useState('')
  const [copyState, setCopyState] = useState<CopyKind | null>(null)

  // Load saved token on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(TOKEN_STORAGE_KEY)
    if (saved) setToken(saved)
  }, [])

  const saveToken = () => {
    const trimmed = tokenInput.trim()
    if (!trimmed) return
    window.localStorage.setItem(TOKEN_STORAGE_KEY, trimmed)
    setToken(trimmed)
    setTokenInput('')
  }

  const clearToken = () => {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    setToken('')
    setWithToken(false)
  }

  const campaign = useMemo(() => {
    if (!org) return ''
    const parts = [slugify(org), slugify(role), date].filter(Boolean)
    return parts.join('-')
  }, [org, role, date])

  const url = useMemo(() => {
    if (!org) return ''
    const u = new URL(target, SITE_ORIGIN)
    if (withToken && token) u.searchParams.set('t', token)
    u.searchParams.set('utm_source', source)
    u.searchParams.set('utm_medium', medium)
    u.searchParams.set('utm_campaign', campaign)
    return u.toString()
  }, [target, withToken, token, source, medium, campaign, org])

  // Short URL — path-based, no query string, no token. Recipient lands on
  // the lock screen. See src/app/[slug]/page.tsx for the redirect logic.
  const sourceShort = useMemo(() => {
    const trimmed = slugify(source)
    return SOURCE_SHORT[trimmed] ?? trimmed
  }, [source])

  const mediumShort = MEDIUM_SHORT[medium]

  const defaultDescriptor = useMemo(() => {
    if (!org) return ''
    const orgSlug = slugify(org)
    const dateShort = compactDate(date)
    // If the source already encodes the company (e.g. source="okta", org="Okta"),
    // drop the org from the descriptor to avoid duplication.
    if (orgSlug === sourceShort || orgSlug === slugify(source)) {
      return dateShort
    }
    return [orgSlug, dateShort].filter(Boolean).join('-')
  }, [org, date, source, sourceShort])

  const effectiveDescriptor = (descriptorOverride.trim() || defaultDescriptor)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const shortSlug = useMemo(() => {
    if (!effectiveDescriptor || !sourceShort || !mediumShort) return ''
    return `${sourceShort}-${mediumShort}-${effectiveDescriptor}`
  }, [sourceShort, mediumShort, effectiveDescriptor])

  const shortUrl = useMemo(() => {
    if (!shortSlug) return ''
    return `${SITE_ORIGIN}/${shortSlug}`
  }, [shortSlug])

  const ledgerRow = useMemo(() => {
    if (!campaign) return ''
    const headers = ['campaign', 'org', 'role', 'source', 'medium', 'applied_at', 'first_visit', 'duration', 'notes']
    const values = [campaign, org, role, source, medium, date, '', '', '']
    return headers.join('\t') + '\n' + values.join('\t')
  }, [campaign, org, role, source, medium, date])

  const copyText = async (text: string, kind: CopyKind) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopyState(kind)
      setTimeout(() => setCopyState(null), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF7EF] px-6 py-12 md:px-10 md:py-16">
      <div className="max-w-[720px] mx-auto">
        <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#9e9e9e] mb-3">
          Internal · token-gated
        </p>
        <h1 className="font-serif font-light text-[36px] leading-tight text-[#1a1a1a] mb-2">
          Application URL builder
        </h1>
        <p className="font-sans text-[14px] text-[#6b6b6b] mb-10 leading-relaxed">
          Generate a tracked link for an application or recruiter outreach. UTM params land in
          Google Analytics; <code className="text-[12px] bg-white px-1 py-0.5 rounded">utm_campaign</code> shows up as a LogRocket session trait.
        </p>

        <div className="flex flex-col gap-5">
          <Field label="Organization *">
            <input
              type="text"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              placeholder="Acme Inc"
              autoFocus
              className={inputClass}
            />
          </Field>

          <Field label="Role (optional)">
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Senior Product Designer"
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Source">
              <input
                type="text"
                list="source-suggestions"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="linkedin, okta, etc."
                className={inputClass}
              />
              <datalist id="source-suggestions">
                {SOURCE_SUGGESTIONS.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </Field>

            <Field label="Medium">
              <select value={medium} onChange={(e) => setMedium(e.target.value as (typeof MEDIUMS)[number])} className={inputClass}>
                {MEDIUMS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Date">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
            </Field>

            <Field label="Landing page">
              <select value={target} onChange={(e) => setTarget(e.target.value)} className={inputClass}>
                {TARGETS.map((t) => (
                  <option key={t.path} value={t.path}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label={`Short URL descriptor (defaults to "${defaultDescriptor || 'org-MMDD'}")`}>
            <input
              type="text"
              value={descriptorOverride}
              onChange={(e) => setDescriptorOverride(e.target.value)}
              placeholder={defaultDescriptor || 'e.g. 2026 or acme-pm'}
              className={inputClass}
            />
          </Field>

          <div className="flex items-center gap-2 mt-2">
            <input
              id="with-token"
              type="checkbox"
              checked={withToken}
              onChange={(e) => setWithToken(e.target.checked)}
              disabled={!token}
              className="w-4 h-4"
            />
            <label htmlFor="with-token" className="font-sans text-[14px] text-[#1a1a1a]">
              Include token on the long URL (silent access — recipient skips the password gate)
            </label>
          </div>

          {!token && (
            <div className="mt-1 p-4 bg-white border border-[#e0d8c8] rounded">
              <p className="font-sans text-[13px] text-[#6b6b6b] mb-3">
                Paste your <code className="text-[12px] bg-[#FFF7EF] px-1 py-0.5 rounded">PORTFOLIO_TOKEN</code> once to enable silent-access links. Stored only in this browser&apos;s local storage.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  data-private
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="PORTFOLIO_TOKEN value"
                  className={`${inputClass} flex-1`}
                />
                <button onClick={saveToken} disabled={!tokenInput.trim()} className={primaryBtn}>
                  Save
                </button>
              </div>
            </div>
          )}

          {token && (
            <div className="text-[12px] text-[#6b6b6b] flex items-center gap-3">
              <span>Token saved in this browser ✓</span>
              <button onClick={clearToken} className="underline hover:text-[#1a1a1a]">
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="mt-10 flex flex-col gap-5">
          <OutputBlock
            label="Short URL (path-based · password gate)"
            onCopy={() => copyText(shortUrl, 'short')}
            copied={copyState === 'short'}
            disabled={!shortUrl}
          >
            {shortUrl || <span className="text-[#b0b0b0]">Enter an organization name…</span>}
          </OutputBlock>

          <OutputBlock label="Long URL (with UTM query params)" onCopy={() => copyText(url, 'url')} copied={copyState === 'url'} disabled={!url}>
            {url || <span className="text-[#b0b0b0]">Enter an organization name…</span>}
          </OutputBlock>

          {campaign && (
            <p className="font-sans text-[13px] text-[#6b6b6b]">
              Campaign slug:{' '}
              <code className="font-mono bg-white px-1.5 py-0.5 rounded text-[12px]">{campaign}</code>
            </p>
          )}

          <OutputBlock
            label="Ledger row (tab-separated · paste into Notion / Sheets)"
            onCopy={() => copyText(ledgerRow, 'row')}
            copied={copyState === 'row'}
            disabled={!ledgerRow}
          >
            {ledgerRow ? (
              <pre className="font-mono text-[12px] whitespace-pre-wrap break-all">{ledgerRow}</pre>
            ) : (
              <span className="text-[#b0b0b0]">Will appear once a URL is built…</span>
            )}
          </OutputBlock>
        </div>
      </div>
    </div>
  )
}

const inputClass =
  'w-full border border-[#d4d4d4] bg-white rounded px-3 py-2.5 font-sans text-[14px] text-[#1a1a1a] placeholder-[#b0b0b0] outline-none focus:border-[#1a1a1a] transition-colors'

const primaryBtn =
  'bg-[#1a1a1a] text-white font-sans font-medium text-[14px] px-4 py-2.5 rounded hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-sans text-[12px] uppercase tracking-wider text-[#9e9e9e] font-medium">{label}</span>
      {children}
    </label>
  )
}

function OutputBlock({
  label,
  onCopy,
  copied,
  disabled,
  children,
}: {
  label: string
  onCopy: () => void
  copied: boolean
  disabled: boolean
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded border border-[#e0d8c8]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#e0d8c8]">
        <span className="font-sans text-[12px] uppercase tracking-wider text-[#9e9e9e] font-medium">{label}</span>
        <button onClick={onCopy} disabled={disabled} className="font-sans text-[13px] font-medium text-[#3a4cba] hover:underline disabled:text-[#b0b0b0] disabled:no-underline">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <div className="px-4 py-3 font-mono text-[13px] text-[#1a1a1a] break-all leading-relaxed">{children}</div>
    </div>
  )
}

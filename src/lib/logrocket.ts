import LogRocket from "logrocket"

const APP_ID = "r48htm/charen-design-portfolio"
let initialized = false

export function initLogRocket() {
  if (initialized) return
  if (typeof window === "undefined") return
  if (process.env.NODE_ENV !== "production") return

  LogRocket.init(APP_ID)
  initialized = true
}

function readEntryCookie(): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(/(?:^|;\s*)portfolio_entry=([^;]+)/)
  return match?.[1] ?? null
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const
type UtmKey = (typeof UTM_KEYS)[number]
type UtmTraits = Partial<Record<UtmKey, string>>

const UTM_STORAGE_KEY = "portfolio_utm"

// Read UTM params from the current URL and write them to sessionStorage on first hit.
// Subsequent calls return the persisted value so the campaign sticks across SPA navigation
// after the URL has been cleaned.
function getUtmTraits(): UtmTraits {
  if (typeof window === "undefined") return {}

  const fromUrl: UtmTraits = {}
  const params = new URLSearchParams(window.location.search)
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) fromUrl[key] = value
  }
  if (Object.keys(fromUrl).length > 0) {
    try {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl))
    } catch {
      // sessionStorage may be unavailable (privacy mode); fall through to URL value
    }
    return fromUrl
  }

  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY)
    if (raw) return JSON.parse(raw) as UtmTraits
  } catch {
    // ignore parse errors
  }
  return {}
}

export function identifyViewer(pathname: string) {
  if (!initialized) return

  const hasAccess = pathname !== "/portfolio/lock"
  const tier = pathname === "/" ? "public" : hasAccess ? "gated" : "pre-auth"
  const entryMode =
    pathname === "/" ? "public" : (readEntryCookie() ?? "unknown")

  LogRocket.identify({
    portfolio_access: hasAccess,
    viewer_tier: tier,
    entry_mode: entryMode,
    ...getUtmTraits(),
  })
}

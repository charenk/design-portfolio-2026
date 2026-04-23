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
  })
}

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

export function identifyViewer(pathname: string) {
  if (!initialized) return

  const hasAccess = pathname !== "/portfolio/lock"
  const tier = pathname === "/" ? "public" : hasAccess ? "gated" : "pre-auth"

  LogRocket.identify({
    portfolio_access: hasAccess,
    viewer_tier: tier,
  })
}

"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { initLogRocket, identifyViewer } from "@/lib/logrocket"

export function LogRocketInit() {
  const pathname = usePathname()

  const isExcluded = pathname?.startsWith("/evenup-video-walkthrough") ?? false

  useEffect(() => {
    if (isExcluded) return
    initLogRocket()
  }, [isExcluded])

  useEffect(() => {
    if (isExcluded) return
    identifyViewer(pathname)
  }, [pathname, isExcluded])

  return null
}

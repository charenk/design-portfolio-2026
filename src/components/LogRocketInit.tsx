"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { initLogRocket, identifyViewer } from "@/lib/logrocket"

export function LogRocketInit() {
  const pathname = usePathname()

  useEffect(() => {
    initLogRocket()
  }, [])

  useEffect(() => {
    identifyViewer(pathname)
  }, [pathname])

  return null
}

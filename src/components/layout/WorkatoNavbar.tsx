"use client"

import { useState } from 'react'
import Image from 'next/image'

/**
 * Custom navbar for the Workato-specific portfolio presentation.
 * Use this instead of the shared <Navbar> when presenting to the Workato team.
 *
 * Features:
 * - "Hello Workato team" active pill (no link)
 * - "Public portfolio" external link → https://www.charen.online
 * - LinkedIn external link
 */
export function WorkatoNavbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 nav-outer px-4 md:px-8 pt-6 pb-6 md:pt-8 md:pb-8"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-bar">
        <a href="#" className="nav-brand" aria-label="Charen">
          <Image
            src="/assets/54c56fab5e082cbde275ba7c32edb4d1f4b2ae6e.png"
            alt="Charen profile picture"
            className="nav-avatar"
            width={44}
            height={44}
            priority
          />
          <span className="nav-name">Charen</span>
        </a>

        <div className="hidden md:flex nav-links">
          <a href="#" className="nav-pill nav-pill-active" aria-current="page">Hello Workato team</a>
          <a
            href="https://www.charen.online"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-pill nav-pill-external"
            aria-label="Open public portfolio"
          >
            Public portfolio
            <svg className="nav-pill-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/charenk/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-pill nav-pill-external"
            aria-label="Open LinkedIn profile"
          >
            LinkedIn
            <svg className="nav-pill-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  )
}

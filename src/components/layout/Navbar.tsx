"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMode } from '@/components/mode/ModeProvider'
import { ModeToggle } from '@/components/home/ModeToggle'

interface NavbarProps {
  activePage?: 'home' | 'works' | 'workato'
}

/**
 * Sitewide nav for inner pages, tactile studio theme: avatar and name as a
 * white sticker pill, links as paper pills, ink pill for the active page.
 * Transparent at the top, paper backdrop with a soft shadow once scrolled.
 */
export function Navbar({ activePage = 'home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { mode, setMode } = useMode()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`site-nav${scrolled ? ' site-nav-scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="site-nav-inner">
        <Link href="/#home" className="site-nav-brand" aria-label="Go to home page">
          <Image
            src="/assets/54c56fab5e082cbde275ba7c32edb4d1f4b2ae6e.png"
            alt="Charen profile picture"
            className="site-nav-avatar"
            width={44}
            height={44}
            priority
          />
          <span className="site-nav-name">Charen</span>
        </Link>

        <div className="site-nav-links">
          <Link
            href="/#home"
            className={`site-nav-pill${activePage === 'home' ? ' is-active' : ''}`}
            aria-label="Go to home"
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className={`site-nav-pill${activePage === 'works' ? ' is-active' : ''}`}
            aria-label="Go to all works"
          >
            All Works
          </Link>
          <a
            href="https://www.linkedin.com/in/charenk/"
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav-pill"
            aria-label="Open LinkedIn profile"
          >
            LinkedIn
            <svg className="site-nav-ext" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>

        <button
          className="site-nav-menu-btn"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="site-nav-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="site-nav-mobile">
          <Link
            href="/#home"
            className={`site-nav-pill${activePage === 'home' ? ' is-active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/portfolio"
            className={`site-nav-pill${activePage === 'works' ? ' is-active' : ''}`}
            aria-label="Go to all works"
            onClick={() => setMobileMenuOpen(false)}
          >
            All Works
          </Link>
          <a
            href="https://www.linkedin.com/in/charenk/"
            target="_blank"
            rel="noopener noreferrer"
            className="site-nav-pill"
          >
            LinkedIn
            <svg className="site-nav-ext" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>
      )}
    </nav>
  )
}

"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavbarProps {
  activePage?: 'home' | 'works' | 'workato'
}

export function Navbar({ activePage = 'home' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
      className={`fixed top-0 left-0 right-0 z-50 nav-outer px-4 md:px-8 pt-6 pb-6 md:pt-8 md:pb-8 ${scrolled ? 'scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-bar">
        <Link href="/#home" className="nav-brand" aria-label="Go to home page">
          <Image
            src="/assets/54c56fab5e082cbde275ba7c32edb4d1f4b2ae6e.png"
            alt="Charen profile picture"
            className="nav-avatar"
            width={44}
            height={44}
            priority
          />
          <span className="nav-name">Charen</span>
        </Link>

        <div className="hidden md:flex nav-links">
          <Link
            href="/#home"
            className={`nav-pill ${activePage === 'home' ? 'nav-pill-active' : ''}`}
            aria-label="Go to home"
          >
            Home
          </Link>
          <Link
            href="/#projects"
            className={`nav-pill ${activePage === 'works' ? 'nav-pill-active' : ''}`}
            aria-label="Go to works"
          >
            Works
          </Link>
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

        <button
          className="md:hidden nav-menu-btn"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="nav-mobile md:hidden">
          <Link
            href="/#home"
            className={`nav-pill ${activePage === 'home' ? 'nav-pill-active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/#projects"
            className={`nav-pill ${activePage === 'works' ? 'nav-pill-active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Works
          </Link>
          <a
            href="https://www.linkedin.com/in/charenk/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-pill nav-pill-external"
          >
            LinkedIn
            <svg className="nav-pill-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      )}
    </nav>
  )
}

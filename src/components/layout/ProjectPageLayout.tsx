"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { markViewed } from '@/lib/viewedTracker'
import { gsap, useGSAP, ScrollTrigger, FULL_MOTION, REDUCED_MOTION } from '@/lib/motion/gsap'

const TRACKED_SLUGS = new Set(['ai-pam', 'browser-extension', 'figma-buddy', 'workato', 'copilot', 'blackberry', 'refinery'])

type HeroMedia =
  | { type: 'video'; youtubeId: string; thumbnailAlt: string }
  | { type: 'video-file'; src: string; poster?: string; alt: string; autoPlayOnce?: boolean; aspectClass?: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'placeholder' }

interface ProjectPageLayoutProps {
  title: string
  titleColorClass?: string
  backHref?: string
  hero: HeroMedia
  overviewLeft?: React.ReactNode
  overviewRight?: React.ReactNode
  disclaimer?: React.ReactNode
  children?: React.ReactNode
  nextHref?: string
  nextLabel?: string
}

function AutoplayOnceVideo({
  src,
  poster,
  alt,
  aspectClass,
}: {
  src: string
  poster?: string
  alt: string
  aspectClass?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showControls, setShowControls] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setShowControls(true)
      setShowOverlay(true)
    }
    const handlePlay = () => setShowOverlay(false)

    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)

    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => setShowControls(true))
    }

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
    }
  }, [])

  const handleKeepReading = () => {
    setShowOverlay(false)
    const rect = videoRef.current?.getBoundingClientRect()
    if (rect) {
      window.scrollTo({ top: window.scrollY + rect.bottom - 80, behavior: 'smooth' })
    }
  }

  const handleReplay = () => {
    setShowOverlay(false)
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    void video.play()
  }

  return (
    <div className={`cs-hero-media relative w-full ${aspectClass ?? 'aspect-video'} overflow-hidden bg-black`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="metadata"
        controls={showControls}
        aria-label={alt}
        className="w-full h-full object-cover"
      />
      {showOverlay && (
        <div className="absolute inset-0 flex items-end md:items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-transparent md:bg-black/30 backdrop-blur-[2px] px-6 pb-[60px] md:pb-0 text-center">
          <button
            onClick={() => setShowOverlay(false)}
            aria-label="Dismiss"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div className="max-w-[520px] flex flex-col items-center gap-[16px]">
            <h2 className="font-serif text-[24px] md:text-[32px] leading-tight text-white">
              That&apos;s the demo.
            </h2>
            <p className="font-serif text-[14px] md:text-[16px] leading-[1.5] text-white/85">
              Read the full case study below, or reach out if you want to dig in.
            </p>
            <div className="flex flex-col items-center gap-[14px] mt-[4px]">
              <div className="flex items-center gap-[10px]">
                <button
                  onClick={handleKeepReading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#1a1a1a] font-sans text-[14px] font-medium hover:bg-white/90 transition-colors"
                >
                  Keep reading
                </button>
                <button
                  onClick={handleReplay}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans text-[14px] font-medium transition-colors border border-white/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-3M20 14a8 8 0 01-14 3" />
                  </svg>
                  Replay
                </button>
              </div>
              <div className="flex items-center gap-[20px] text-[13px] font-sans">
                <a
                  href="https://www.linkedin.com/in/charenk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 underline underline-offset-4 hover:text-white"
                >
                  LinkedIn
                </a>
                <span aria-hidden className="text-white/50">·</span>
                <a
                  href="mailto:charen.k@gmail.com"
                  className="text-white/90 underline underline-offset-4 hover:text-white"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function VideoHero({ youtubeId, thumbnailAlt }: { youtubeId: string; thumbnailAlt: string }) {
  const [videoActive, setVideoActive] = useState(false)
  return (
    <div
      className="cs-hero-media w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden relative bg-black cursor-pointer"
      onClick={() => setVideoActive(true)}
    >
      {!videoActive ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
            alt={thumbnailAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title="Demo video"
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  )
}

export function ProjectPageLayout({
  title,
  titleColorClass,
  backHref = '/portfolio',
  hero,
  overviewLeft,
  overviewRight,
  disclaimer,
  children,
  nextHref,
  nextLabel,
}: ProjectPageLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slug = pathname?.replace(/^\//, '').split('/')[0] ?? ''
    if (TRACKED_SLUGS.has(slug)) markViewed(slug)
  }, [pathname])

  /* Calm reading motion: intro settle for the header, then a fade-rise batch
     for each top-level section and a subtle scale settle on taped figures.
     Hidden states are set by GSAP only, so no-JS and reduced-motion visitors
     always see a fully static, fully visible page. Transforms are cleared
     after each tween finishes so fixed-position overlays inside sections
     (e.g. lightboxes) keep the viewport as their containing block. */
  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const mm = gsap.matchMedia()

      mm.add(FULL_MOTION, () => {
        const intro = ['.cs-back', '.cs-title', '.cs-hero-frame']
          .map((sel) => root.querySelector<HTMLElement>(sel))
          .filter((el): el is HTMLElement => el !== null)

        if (intro.length) {
          gsap.from(intro, {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.1,
            clearProps: 'transform',
          })
        }

        const sections = gsap.utils.toArray<HTMLElement>('.cs-flow > *', root)
        if (sections.length) {
          gsap.set(sections, { autoAlpha: 0, y: 28 })
          ScrollTrigger.batch(sections, {
            start: 'top 88%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
                stagger: 0.08,
                overwrite: true,
                clearProps: 'transform',
              }),
          })
        }

        const figures = gsap.utils.toArray<HTMLElement>('[data-cs-figure]', root)
        if (figures.length) {
          gsap.set(figures, { scale: 1.03, transformOrigin: '50% 60%' })
          ScrollTrigger.batch(figures, {
            start: 'top 88%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                scale: 1,
                duration: 0.9,
                ease: 'power2.out',
                overwrite: true,
                clearProps: 'transform',
              }),
          })
        }
      })

      /* Static branch: never hide anything for reduced-motion visitors. */
      mm.add(REDUCED_MOTION, () => {})

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(backHref)
    }
  }

  return (
    <div className="cs-page dir-tactile" ref={rootRef}>
      <Navbar activePage="works" />

      <main className="cs-main">
        <div className="cs-container">

          {/* Back Button */}
          <button onClick={handleBack} className="cs-back" aria-label="Back">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Title. titleColorClass is kept for API compatibility; the tactile
              theme paints titles in ink via .cs-title. */}
          <h1 className={`cs-title${titleColorClass ? ` ${titleColorClass}` : ''}`}>
            {title}
          </h1>

          {/* Hero, pinned to the paper with a tape strip */}
          <div className="cs-hero-frame">
            <span className="cs-tape" aria-hidden />
            {hero.type === 'video' && (
              <VideoHero youtubeId={hero.youtubeId} thumbnailAlt={hero.thumbnailAlt} />
            )}
            {hero.type === 'video-file' && hero.autoPlayOnce && (
              <AutoplayOnceVideo
                src={hero.src}
                poster={hero.poster}
                alt={hero.alt}
                aspectClass={hero.aspectClass}
              />
            )}
            {hero.type === 'video-file' && !hero.autoPlayOnce && (
              <video
                src={hero.src}
                poster={hero.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={hero.alt}
                className={`cs-hero-media w-full ${hero.aspectClass ?? 'aspect-video'} object-cover bg-black`}
              />
            )}
            {hero.type === 'image' && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={hero.src} alt={hero.alt} className="cs-hero-media w-full aspect-[3/2] md:aspect-[21/9] object-cover" />
            )}
            {hero.type === 'placeholder' && (
              <div className="cs-hero-media cs-hero-placeholder aspect-[4/3] md:aspect-[16/9]" />
            )}
          </div>

          {/* Everything below the hero fade-rises in as it scrolls into view */}
          <div className="cs-flow">

            {/* Overview columns (legacy 2-column pattern; omit by passing no overview props) */}
            {(overviewLeft || overviewRight) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[80px] mb-[80px]">
                <div>{overviewLeft}</div>
                <div>{overviewRight}</div>
              </div>
            )}

            {/* Additional sections */}
            {children}

            {/* Disclaimer */}
            {disclaimer && (
              <div className="cs-disclaimer">
                <div className="flex flex-col gap-[12px] max-w-[760px]">
                  {disclaimer}
                </div>
              </div>
            )}

            {/* Bottom navigation: back to projects on the left, next project on the right */}
            <div className="cs-bottom-nav">
              <button onClick={handleBack} className="cs-bottom-link" aria-label="Back">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              {nextHref && nextLabel && (
                <Link href={nextHref} className="cs-bottom-link">
                  Next project: {nextLabel}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}

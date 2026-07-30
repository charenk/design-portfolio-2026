"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { markViewed } from '@/lib/viewedTracker'
import { useGridFade } from '@/lib/hooks/useGridFade'

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
    <div className={`relative w-full ${aspectClass ?? 'aspect-video'} rounded-figure-banner overflow-hidden mb-[50px] bg-black`}>
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
      className="w-full aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden mb-[50px] relative bg-black cursor-pointer"
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
  const pageBackgroundRef = useGridFade()

  useEffect(() => {
    const slug = pathname?.replace(/^\//, '').split('/')[0] ?? ''
    if (TRACKED_SLUGS.has(slug)) markViewed(slug)
  }, [pathname])

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(backHref)
    }
  }

  return (
    <div className="pageBackground" ref={pageBackgroundRef}>
      <Navbar activePage="works" />

      <main className="px-5 md:px-[50px] pt-[120px] md:pt-[200px] pb-[120px] md:pb-[200px]">
        <div className="max-w-main-content mx-auto md:pl-4">

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 mb-[30px] md:mb-[50px] px-4 py-2 rounded-lg bg-[#1a1a1a] text-white font-sans text-[14px] font-medium hover:bg-black transition-colors"
            aria-label="Back"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Title */}
          <h1 className={`font-serif font-normal text-[28px] md:text-[40px] leading-tight mb-[30px] md:mb-[50px] pr-0 md:pr-[100px]${titleColorClass ? ` ${titleColorClass}` : ''}`}>
            {title}
          </h1>

          {/* Hero */}
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
              className={`w-full ${hero.aspectClass ?? 'aspect-video'} object-cover rounded-figure-banner mb-[50px] bg-black`}
            />
          )}
          {hero.type === 'image' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.src} alt={hero.alt} className="w-full aspect-[3/2] md:aspect-[21/9] object-cover rounded-figure-banner mb-[50px]" />
          )}
          {hero.type === 'placeholder' && (
            <div className="w-full bg-[#C4C4C4] aspect-[4/3] md:aspect-[16/9] rounded-figure-banner mb-[50px]" />
          )}

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
            <div className="border-t border-divider-grey pt-[30px] pb-[30px] mb-[50px]">
              <div className="pr-0 md:pr-[120px] flex flex-col gap-[12px] mb-[48px]">
                {disclaimer}
              </div>
            </div>
          )}

          {/* Bottom navigation: back to projects on the left, next project on the right */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-black font-serif text-caption hover:opacity-70 transition-opacity"
              aria-label="Back"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            {nextHref && nextLabel && (
              <Link
                href={nextHref}
                className="inline-flex items-center gap-1 text-black font-serif text-caption hover:opacity-70 transition-opacity"
              >
                Next project: {nextLabel}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}

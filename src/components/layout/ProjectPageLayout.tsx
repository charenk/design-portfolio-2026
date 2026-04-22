"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'

type HeroMedia =
  | { type: 'video'; youtubeId: string; thumbnailAlt: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'placeholder' }

interface ProjectPageLayoutProps {
  title: string
  titleColorClass?: string
  backHref?: string
  hero: HeroMedia
  overviewLeft: React.ReactNode
  overviewRight: React.ReactNode
  disclaimer?: React.ReactNode
  children?: React.ReactNode
  nextHref?: string
  nextLabel?: string
}

function VideoHero({ youtubeId, thumbnailAlt }: { youtubeId: string; thumbnailAlt: string }) {
  const [videoActive, setVideoActive] = useState(false)
  return (
    <div
      className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-[50px] relative bg-black cursor-pointer"
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
  const [gridOpacity, setGridOpacity] = useState(1)
  const pageBackgroundRef = useRef<HTMLDivElement>(null)

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(backHref)
    }
  }

  useEffect(() => {
    const updateGridOpacity = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const maxScroll = docHeight - viewportHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0

      let opacity = 1
      if (progress <= 0.30) {
        const fadeProgress = progress / 0.30
        const easedProgress = 1 - Math.pow(1 - fadeProgress, 3)
        opacity = 1 - easedProgress
      } else {
        opacity = 0
      }

      if (progress > 0.85) {
        opacity = 0
      }

      opacity = Math.max(0, Math.min(1, opacity))
      setGridOpacity(opacity)
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateGridOpacity()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    updateGridOpacity()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (pageBackgroundRef.current) {
      pageBackgroundRef.current.style.setProperty('--gridOpacity', String(gridOpacity))
    }
  }, [gridOpacity])

  return (
    <div className="pageBackground" ref={pageBackgroundRef}>
      <Navbar activePage="works" />

      <main className="px-8 md:px-[50px] pt-[200px] pb-[200px]">
        <div className="max-w-main-content mx-auto pl-4">

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1 mb-[50px] bg-black text-white px-[10px] py-[5px] font-serif text-caption hover:opacity-80 transition-opacity"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Title */}
          <h1 className={`font-serif font-normal text-[40px] leading-tight mb-[50px] pr-0 md:pr-[100px]${titleColorClass ? ` ${titleColorClass}` : ''}`}>
            {title}
          </h1>

          {/* Hero */}
          {hero.type === 'video' && (
            <VideoHero youtubeId={hero.youtubeId} thumbnailAlt={hero.thumbnailAlt} />
          )}
          {hero.type === 'image' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.src} alt={hero.alt} className="w-full aspect-[21/9] object-cover rounded-figure-banner mb-[50px]" />
          )}
          {hero.type === 'placeholder' && (
            <div className="w-full bg-[#C4C4C4] aspect-[16/9] rounded-figure-banner mb-[50px]" />
          )}

          {/* Overview columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] md:gap-[80px] mb-[80px]">
            <div>{overviewLeft}</div>
            <div>{overviewRight}</div>
          </div>

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
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
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

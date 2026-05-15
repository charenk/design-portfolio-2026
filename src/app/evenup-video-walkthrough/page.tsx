"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"

export default function EvenupReviewPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  return (
    <div className="pageBackground">
      <Navbar activePage="works" />

      <main className="px-5 md:px-[50px] pt-[120px] md:pt-[160px] pb-[100px]">
        <div className="max-w-main-content mx-auto md:pl-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 mb-[30px] md:mb-[40px] px-4 py-2 rounded-lg bg-[#1a1a1a] text-white font-sans text-[14px] font-medium hover:bg-black transition-colors"
            aria-label="Back to Charen's portfolio"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Charen&apos;s portfolio
          </button>

          <header className="flex flex-col gap-[8px] mb-[28px]">
            <p className="font-sans text-[13px] uppercase tracking-[0.12em] text-[#9e9e9e]">
              Hello James
            </p>
            <h1 className="font-serif text-[28px] md:text-[36px] leading-tight text-[#1a1a1a]">
              A few snapshots and a demo of my B2B SaaS work.
            </h1>
          </header>

          <video
            src="/evenup-walkthrough.mp4"
            controls
            playsInline
            preload="metadata"
            aria-label="Walkthrough video for the Evenup design team"
            className="w-full aspect-video object-cover rounded-figure-banner bg-black"
          />

          <p className="font-serif text-[15px] leading-[1.6] text-[#3a3a3a] pt-[24px] max-w-[680px]">
            If you&apos;d like a broader view, here&apos;s my{" "}
            <a
              href="https://www.figma.com/deck/S2l1JSoyWO1JRyiQQyNweq/Charen-s-portfolio-2026?node-id=4013-12665&t=uSK9l3wU1fNHHzyU-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline gap-[4px] text-[#1a1a1a] underline underline-offset-4 hover:opacity-70"
            >
              work sample deck
              <svg className="w-[12px] h-[12px] translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
            , covering the range of work I lead and contribute to.
          </p>
        </div>
      </main>
    </div>
  )
}

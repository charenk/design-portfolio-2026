"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export interface WorkItem {
  id: number
  title: string
  href: string
  placeholder: string
  direction: 'left' | 'right'
  svgSrc?: string
}

// Spread positions for 4 slots — fanned out from center
const POSITIONS = [
  { x: '-270px', y: '20px', zIndex: 40, order: 0 },
  { x:  '-90px', y: '35px', zIndex: 30, order: 1 },
  { x:   '90px', y: '10px', zIndex: 20, order: 2 },
  { x:  '270px', y: '40px', zIndex: 10, order: 3 },
]

const CARD_SIZE = 220

function getRandomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  placeholder,
  direction,
  svgSrc,
  onDragStart,
  onDragEnd,
  onClick,
}: {
  placeholder: string
  direction: 'left' | 'right'
  svgSrc?: string
  onDragStart: () => void
  onDragEnd: () => void
  onClick: () => void
}) {
  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    setRotation(getRandomInRange(1.5, 4) * (direction === 'left' ? -1 : 1))
  }, [direction])

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{ scale: 1.08, rotateZ: 1.5 * (direction === 'left' ? -1 : 1), zIndex: 9999 }}
      whileDrag={{ scale: 1.08, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        width: CARD_SIZE,
        height: CARD_SIZE,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className="relative shrink-0 cursor-grab active:cursor-grabbing"
      draggable={false}
    >
      <div
        className="h-full w-full rounded-3xl shadow-sm overflow-hidden flex items-end justify-center"
        style={{ backgroundColor: placeholder }}
      >
        {svgSrc && (
          <img
            src={svgSrc}
            alt=""
            draggable={false}
            className="w-full h-full object-contain object-bottom"
          />
        )}
      </div>
    </motion.div>
  )
}

// ─── View All card ────────────────────────────────────────────────────────────

function ViewAllCard({
  onDragStart,
  onDragEnd,
  onClick,
}: {
  onDragStart: () => void
  onDragEnd: () => void
  onClick: () => void
}) {
  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    setRotation(getRandomInRange(1, 2.5))
  }, [])

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.1, zIndex: 9999 }}
      whileHover={{ scale: 1.06, rotateZ: 1, zIndex: 9999 }}
      whileDrag={{ scale: 1.06, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{
        width: CARD_SIZE,
        height: CARD_SIZE,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className="relative shrink-0 cursor-grab active:cursor-grabbing"
      draggable={false}
    >
      <div className="h-full w-full rounded-3xl border border-dashed border-[#c8c4ba] bg-[#f5f2ed] flex flex-col items-center justify-center gap-3">
        <span className="text-[32px] text-[#9e9e9e]">→</span>
        <span className="font-sans text-[12px] font-medium uppercase tracking-widest text-[#9e9e9e]">
          View all
        </span>
      </div>
    </motion.div>
  )
}

// ─── Card + hover label wrapper ───────────────────────────────────────────────

function WorkCard({
  item,
  position,
  photoVariants,
}: {
  item: WorkItem
  position: (typeof POSITIONS)[number]
  photoVariants: object
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()

  return (
    <motion.div
      className="absolute left-0 top-0"
      style={{ zIndex: position.zIndex }}
      variants={photoVariants}
      custom={{ x: position.x, y: position.y, order: position.order }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <ProjectCard
        placeholder={item.placeholder}
        direction={item.direction}
        svgSrc={item.svgSrc}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        onClick={() => { if (!isDragging) router.push(item.href) }}
      />

      <AnimatePresence>
        {isHovered && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute left-0 right-0 text-center font-serif text-[13px] text-[#1a1a1a] whitespace-nowrap"
            style={{ top: CARD_SIZE + 12 }}
          >
            {item.title}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ViewAllWrapper({
  position,
  photoVariants,
}: {
  position: (typeof POSITIONS)[number]
  photoVariants: object
}) {
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()

  return (
    <motion.div
      className="absolute left-0 top-0"
      style={{ zIndex: position.zIndex }}
      variants={photoVariants}
      custom={{ x: position.x, y: position.y, order: position.order }}
    >
      <ViewAllCard
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        onClick={() => { if (!isDragging) router.push('/portfolio') }}
      />
    </motion.div>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

const DEFAULT_ITEMS: WorkItem[] = [
  { id: 1, title: 'Agentic Privileged Access Management suite', href: '/ai-pam',            placeholder: '#dde4ed', direction: 'left',  svgSrc: '/Agentic-Pam.svg'      },
  { id: 2, title: 'CyberQP browser extension',                  href: '/browser-extension', placeholder: '#e8dded', direction: 'left',  svgSrc: '/Browser-extension.svg' },
  { id: 3, title: 'Figma Buddy: AI feedback experiment',         href: '/figma-buddy',       placeholder: '#edeadd', direction: 'right' },
]

export function WorkGallery({
  items = DEFAULT_ITEMS,
  animationDelay = 0.3,
}: {
  items?: WorkItem[]
  animationDelay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setIsVisible(true), animationDelay * 1000)
    const t2 = setTimeout(() => setIsLoaded(true), (animationDelay + 0.4) * 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [animationDelay])

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const photoVariants = {
    hidden: () => ({ x: 0, y: 0, scale: 1 }),
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      scale: 1,
      transition: { type: 'spring', stiffness: 70, damping: 12, mass: 1, delay: custom.order * 0.15 },
    }),
  }

  // 3 project cards fill positions 0–2, View All takes position 3
  const projectCards = items.slice(0, 3)
  const viewAllPosition = POSITIONS[3]

  return (
    <div className="relative h-[320px] w-full flex items-center justify-center overflow-visible">
      <motion.div
        className="relative mx-auto flex w-full max-w-5xl justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          className="relative flex w-full justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
        >
          <div className="relative" style={{ width: CARD_SIZE, height: CARD_SIZE }}>
            {/* Render in reverse z-order so highest zIndex sits on top */}
            {[...projectCards].reverse().map((item, reversedIdx) => {
              const originalIdx = projectCards.length - 1 - reversedIdx
              return (
                <WorkCard
                  key={item.id}
                  item={item}
                  position={POSITIONS[originalIdx]}
                  photoVariants={photoVariants}
                />
              )
            })}
            <ViewAllWrapper
              position={viewAllPosition}
              photoVariants={photoVariants}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

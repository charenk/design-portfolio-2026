import type { ReactNode } from 'react'

interface ItalicCodaProps {
  children: ReactNode
}

export function ItalicCoda({ children }: ItalicCodaProps) {
  return (
    <p className="text-[16px] leading-[1.52] font-serif italic text-[#4F4F4F] mt-[24px] max-w-[640px]">
      {children}
    </p>
  )
}

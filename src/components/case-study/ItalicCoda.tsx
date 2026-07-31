import type { ReactNode } from 'react'

interface ItalicCodaProps {
  children: ReactNode
}

export function ItalicCoda({ children }: ItalicCodaProps) {
  return <p className="cs-coda">{children}</p>
}

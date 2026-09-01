import { pitchOgImage, OG_SIZE } from '@/components/pitch/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt =
  'Work samples by Charen: a theme-led tour across product, design, and engineering'

export default function Image() {
  return pitchOgImage('Work samples')
}

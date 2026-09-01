import { PitchPage } from '@/components/pitch/PitchPage'

export default function CustomDeckPage() {
  return (
    <PitchPage
      title="👋 Hello"
      /* Generic audience: lead with the deepest story, the 0-to-1 case
         study, then the design-system theme. */
      themeOrder={['privileged-identities', 'design-systems']}
      themeTitles={{ 'design-systems': 'Design system stuff' }}
    />
  )
}

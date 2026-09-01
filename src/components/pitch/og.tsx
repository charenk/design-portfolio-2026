import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'

/* Link-preview card for the pitch routes, drawn in the site's taped-paper
   aesthetic so a pasted URL looks like the page it opens. Generated from
   code: new routes get a correct card by passing their title, no manual
   export step. Fonts are committed TTFs (OFL) read from disk; the
   new URL(..., import.meta.url) form keeps them in the serverless bundle. */

export const OG_SIZE = { width: 1200, height: 630 }

export async function pitchOgImage(title: string) {
  const [serif, sans] = await Promise.all([
    readFile(new URL('./fonts/InstrumentSerif-Regular.ttf', import.meta.url)),
    readFile(new URL('./fonts/Montserrat-Medium.ttf', import.meta.url)),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eee3d3',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 1064,
            height: 500,
            padding: '72px 72px 56px',
            backgroundColor: '#faf3e9',
            border: '1px solid rgba(34, 31, 26, 0.2)',
            borderRadius: 18,
            transform: 'rotate(-1deg)',
            boxShadow: '0 24px 48px rgba(34, 31, 26, 0.18)',
          }}
        >
          {/* Tape over the card's top edge. */}
          <div
            style={{
              position: 'absolute',
              top: -22,
              left: 422,
              width: 220,
              height: 52,
              backgroundColor: 'rgba(217, 205, 184, 0.9)',
              transform: 'rotate(2deg)',
              borderRadius: 3,
              boxShadow: '0 2px 6px rgba(34, 31, 26, 0.12)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Montserrat',
                fontSize: 20,
                letterSpacing: 5,
                color: '#8a8477',
              }}
            >
              SELECTED WORK
            </div>
            <div
              style={{
                fontFamily: 'Instrument Serif',
                fontSize: 92,
                lineHeight: 1.05,
                color: '#221f1a',
                marginTop: 18,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily: 'Montserrat',
                fontSize: 27,
                lineHeight: 1.45,
                color: '#5d574c',
                marginTop: 22,
                maxWidth: 760,
              }}
            >
              A theme-led tour across product, design, and engineering.
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'Montserrat',
                fontSize: 26,
                color: '#ab0782',
              }}
            >
              charen.online
            </div>
            <div
              style={{
                fontFamily: 'Montserrat',
                fontSize: 24,
                color: '#5d574c',
              }}
            >
              Charen · Product Designer
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Instrument Serif', data: serif, weight: 400, style: 'normal' },
        { name: 'Montserrat', data: sans, weight: 500, style: 'normal' },
      ],
    }
  )
}

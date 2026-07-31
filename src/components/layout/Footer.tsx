"use client"

const WORDS = ['SYSTEMS', 'AI', 'SECURITY', 'ENTERPRISE', 'GROWTH']

/**
 * Sitewide footer for inner pages, tactile studio theme: paper band with a
 * hairline top, contact links as pills, and the identity words as a cluster
 * of rotated sticker pills that straighten on hover.
 */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-contact">
          <h2 className="site-footer-heading">
            Interested in collaborating? Let&apos;s connect
          </h2>
          <div className="site-footer-links">
            <a href="mailto:charen@gmail.com" className="site-footer-link">
              charen@gmail.com
            </a>
            <a href="tel:+12269215640" className="site-footer-link">
              +1 226 921 5640
            </a>
          </div>
        </div>

        <div className="site-footer-words" aria-label="Focus areas">
          {WORDS.map((word, i) => (
            <span
              key={word}
              className="site-footer-word"
              style={{ rotate: `${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg` }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

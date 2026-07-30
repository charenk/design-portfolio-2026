'use client'

/**
 * Terminal-flavored contact CTA: a prompt line, a huge mono mailto with a
 * blinking block cursor (CSS steps animation, paused under reduced motion),
 * and the colophon.
 */
export function CommandFooter() {
  return (
    <footer className="cmd-footer">
      <p className="cmd-term-line">$ initiate contact</p>
      <a className="cmd-email" href="mailto:charen.k@gmail.com">
        charen.k@gmail.com
        <span className="cmd-cursor" aria-hidden="true" />
      </a>
      <div className="cmd-footer-meta">
        <p className="cmd-label cmd-dim">Designed by Charen, built using Claude</p>
        <p className="cmd-label cmd-dim">V2 / Command Center</p>
      </div>
    </footer>
  )
}

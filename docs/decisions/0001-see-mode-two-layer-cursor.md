# 0001. See-mode cursor: hide the OS cursor, two-layer instant dot + trailing ring

- **Date:** 2026-08-25
- **Status:** Accepted
- **Area:** UX
- **Deciders:** Charen

## Context

See mode ships a custom ink-dot cursor follower for its tactile, desk-toy feel. The original
design hid the OS cursor only over draggable cards and stickers, which meant two pointers were
visible everywhere else: the OS arrow at the true position and the eased dot trailing behind
it. Screenshots from the live site showed them hundreds of pixels apart mid-movement.

Hiding the OS cursor everywhere exposed the deeper problem: a single eased follower cannot be
the primary cursor. Its lag means the visible indicator is never where clicks land during
movement, there was no affordance over links or buttons, and no press feedback.

Constraint: reduced-motion and touch visitors must always keep native cursors, because the
follower does not run for them at all.

## Decision

The OS cursor is hidden across the entire see-mode surface, but only under the exact
conditions the follower runs (fine pointer + full motion), and the custom cursor is split
into two fixed layers:

- **Dot root = the cursor.** Pinned to the pointer synchronously (gsap.set in the pointermove
  handler, zero easing). Aim is exact by construction. The labelled drag/view bubble rides
  this root; the dot shrinks rather than hides inside bubble states.
- **Ring = the personality.** A separate trailing root eased at 0.28s carries the tactile
  charm, grows over links/buttons as hover affordance, and hides inside bubble states. The
  whole dot root dips on press.

## Alternatives considered

- **Instant dot only:** precise and minimal, but loses the trailing charm that motivates a
  custom cursor at all in this direction.
- **Restore OS cursor + keep the dot as decoration:** safest, but two pointers moving at
  different speeds is exactly the confusion being removed, and it dilutes the desk-toy
  identity.
- **Tighten the single follower's lerp further:** any nonzero easing still separates the
  visible cursor from the click point; tried at 0.15s and still confusing in practice.

## Consequences

- Aiming is exact; personality is preserved in a layer that can lag safely.
- The custom cursor is now load-bearing: any future change must keep the dot's synchronous
  positioning, and the `cursor: none` CSS gate must stay in lockstep with the conditions the
  follower runs under (currently `(pointer: fine) and (prefers-reduced-motion:
  no-preference)` in both places).
- With a perfectly still mouse right after page load, no cursor is visible until first
  movement. Accepted as standard custom-cursor behavior; revisit if it tests badly.
- GSAP Draggable writes inline cursors, so its `cursor`/`activeCursor` options are explicitly
  set to 'none' under full motion (see StickerHero and CardBoard); new draggables must do the
  same.

# DataDoodles Design System

## Direction

Precision Geo: a calm near-white technical surface with Deep Onyx structure and a tightly rationed Signal Red accent. The page is built from rules, type scale and column alignment — no cards, no shadows, no decorative illustration. There is no hand-drawn layer; the brand's character comes from precision and published detail, not from marks on top of the page.

## Color

- Paper: `#FDFCFB`
- Surface: `#FFFFFF`
- Surface low: `#F4F3F2`
- Surface container: `#EEEEED`
- Inverse surface: `#2F3130`
- Inverse text: `#F1F0F0`
- Ink: `#111111`
- Body ink: `#1A1C1C`
- Muted: `#444748`
- Data gray: `#666666`
- Rule: `#C4C7C7`
- Rule light: `#E5E5E5`
- Outline: `#747878`
- Signal: `#E21E35`
- Signal hover: `#BB0024`
- WhatsApp: `#25D366`
- Error: `#BA1A1A`

Signal Red has exactly three jobs: the recommendation tag and border on an evidence exhibit, case-study result figures, and input focus. It also underlines one phrase in the H1. Nothing else. WhatsApp green is only a system affordance.

## Typography

Manrope for display and body copy with purposeful weight contrast; JetBrains Mono for measured data, labels, prices and section indices. Headings are tightly tracked but never below `-0.04em`, balanced and fluid. Narrative text stays under 70 characters per line. Monospace signals “we measure things” and is never used for narrative prose.

## Layout

A 12-column grid with a 1280px maximum, 64px desktop margins (32px at 1080px, 16px on mobile) and an 8px vertical rhythm. Section padding is set once, in `--section-space`, and never overridden per section. Sections are separated by 1px rules rather than alternating fills. Corners are 4px.

Alignment rules:

- Every section opens with the same device: mono label — 1px rule — section index, spanning the full grid width.
- Column blocks (pillars, case studies, pricing tiers) share one construction: a 1px Deep Onyx top rule plus CSS subgrid, so headings, prices and figures line up horizontally across columns regardless of copy length.
- The hero, shift and final-CTA splits share `--split-gap`, and the hero exhibit is sized to the hero's own 7-column measure so its edges land on the headline's edges.
- The only deliberate grid break is the hero exhibit overhanging the next section; the overhang and the compensating padding both read from `--overhang`.

## Components

- Lead form: white, 1px border, 4px corners, no shadow; 52px inputs and 56px primary action; focus thickens the border to Signal Red.
- Buttons: square-ended 4px corners, solid fills, strong focus rings, no decorative shadows.
- Evidence exhibits: 1px borders with mono model/date bars and captions. The recommended business is marked with a bordered Signal Red tag inside the answer flow — never an overlay, so nothing can obscure text. Sample layouts are labelled as such; only real, dated screenshots may replace them.
- FAQ: native disclosure rows separated by rules, chevron rotates in 200ms.
- Timeline: a 1px horizontal axis with Deep Onyx nodes, becoming a vertical axis under 720px.
- Sticky mobile actions: appears after the hero and reserves page space so it never covers content.

## Motion

All motion uses `cubic-bezier(0.32, 0.72, 0, 1)` and is armed by the `js` class, so a browser that never runs the script gets the finished state and nothing is hidden.

- **Interactions**: 120–200ms. Nothing a user triggers animates for longer than that.
- **Hero load sequence**: one pass, roughly one second end to end — kicker, then the form, then the headline rising word by word (460ms each, 28ms apart), then the sub and the claims, then the Signal Red rule wiping in under “easier to choose”, then the recommendation tag on the exhibit. It runs once, on load, and never repeats.
- **Scroll reveals**: fade plus 12px rise, 400ms, once, never re-triggering. Items in the same row carry `--i` and follow each other 70ms apart.
- **Banned**: parallax, scroll-jacking, counting numbers, typewriter effects, anything that delays reading.

## Pointer

On fine pointers the native cursor is replaced by a 6px Signal Red dot at the exact pointer position with a 30px ink ring easing in behind it (0.2 lerp, about five frames). The ring grows to 46px and turns Signal Red over links, buttons and controls, and contracts to 22px on press. Over text inputs the custom pointer hides and the native caret returns, because typing needs a real insertion point. Touch devices and reduced-motion users keep the native cursor entirely — the script only hides it once the replacement is on screen.

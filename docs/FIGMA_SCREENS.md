# OpenLinkedIn – Figma Screen Kit (MVP)

This file defines production-ready Figma specs for the OpenLinkedIn MVP screens. Use it to quickly recreate the UI in Figma or align implementation details.

## Figma file setup

- **Page 1:** `00 Foundations`
- **Page 2:** `01 MVP Screens`
- **Page 3:** `02 Components`

### Frame standards
- **Desktop frame:** 1440 × 1024
- **Mobile frame:** 390 × 844
- **8pt spacing grid**
- **12-column desktop grid:** margins 80, gutter 24

### Typography
- `Inter` (fallback: system-ui)
- H1: 32/40, semibold
- H2: 24/32, semibold
- H3: 18/26, semibold
- Body: 14/22, regular
- Caption: 12/18, medium

### Color tokens
- `Brand/500` `#0A66C2`
- `Brand/700` `#004182`
- `Slate/900` `#0F172A`
- `Slate/600` `#475569`
- `Slate/200` `#E2E8F0`
- `Slate/100` `#F1F5F9`
- `BG` `#F8FAFC`
- `White` `#FFFFFF`
- `Danger` `#E11D48`

## Screen inventory (desktop)

1. **Dashboard / Scheduled Posts**
   - Header with logo and nav.
   - Scheduled list cards with date/status badge.
   - Edit/Delete controls.

2. **Write Post**
   - 2-column layout (editor + preview).
   - 3000-char textarea.
   - Hashtag helper chips.
   - Image upload + PDF upload modules.
   - Actions: Post now / Schedule / Save draft.

3. **AI Assistant**
   - Post type select.
   - Tone chips.
   - Prompt textarea.
   - Generate CTA + editable output panel.

4. **Settings**
   - Timezone select.
   - Default time input.
   - Disconnect LinkedIn action.
   - Connection status panel.

5. **Onboarding**
   - Minimal centered card.
   - Permission explanation bullets.
   - Connect LinkedIn CTA.

## Component specs

### Buttons
- Primary: height 40, pill radius 999, bg `Brand/500`, text white.
- Secondary: height 40, border `Slate/200`, text `Slate/900`.
- Danger text button: text `Danger`.

### Cards
- Radius 16
- Border `Slate/200` 1px
- Fill white
- Shadow `0 1 2 0 rgba(15,23,42,.08)`

### Inputs
- Height 44
- Radius 12
- Border `Slate/200`
- Focus border `Brand/500`

## Figma import assets

The folder `docs/figma/` contains SVG wireframes you can drag directly into Figma:

- `dashboard.svg`
- `write-post.svg`
- `ai-assistant.svg`
- `settings.svg`
- `onboarding.svg`

## LinkedIn API caveat callout for design handoff

Include this note in Figma annotations:

> “Auto-publish depends on LinkedIn API permissions (`w_member_social`) and app review approval. If not approved, show manual reminder fallback state.”

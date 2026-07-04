<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: Thumbmaker
description: AI-powered YouTube thumbnail generator — premium, dark-first creative tool.
---

# Design System: Thumbmaker

## 1. Overview

**Creative North Star: "The Darkroom"**

Thumbmaker is a creative tool, not a dashboard. The metaphor is the darkroom: a focused, dimly lit space where images develop. The interface stays quiet so the thumbnail — the thing the user came to make — is always the brightest object on screen. Dark-first, restrained, confident. Every element either helps the image emerge or gets out of the way.

The system draws from the Linear/Vercel/Raycast tier: precise typography, considered spacing, one decisive accent. Purple is the single brand voice — used sparingly, never decoratively. Motion is responsive, not choreographed: hovers feel alive, loading states communicate progress, but nothing performs for the user. The product feels premium because it doesn't try too hard.

This system explicitly rejects the generic AI tool aesthetic: cluttered button-walls, "generated" visual noise, no hierarchy, dashboard-grid monotony. It also rejects stock SaaS tropes — Inter-everywhere indigo gradients, feature-card grids, the 2023 kicker eyebrow above every section. Thumbmaker is a creative tool for creators; it should look like it was made by someone who cares about design, not stamped from a template.

**Key Characteristics:**
- Dark-first; light mode is a fully polished equal, not an afterthought.
- One accent (purple), used on ≤10% of any screen. Its rarity is its power.
- Single geometric sans, varied by weight and size. No font-switching gimmicks.
- Motion communicates state (generating, uploading, ready) — never decorates.
- The thumbnail is always the hero. UI chrome recedes.
- Mobile is first-class, not a squeezed desktop.

## 2. Colors

The palette is restrained: a family of tinted dark neutrals carries 90%+ of every screen, and a single purple accent does all the expressive work. Dark-first; the light theme inverts with the same discipline.

### Primary
- **Electric Iris** (`#aa3bff` light / `#c084fc` dark — committed brand anchor): The single accent. Used for primary CTAs, active states, progress indication, and focus rings. Never used for body text, large fills, or decorative gradients. If it appears on more than 10% of a screen, the design is wrong.

### Neutral (dark-first, canonical)
- **Darkroom Base** (`#16171d` — committed): App background. Near-black with a slight cool-violet tint, not pure gray. The tint comes from the brand's own hue family, not from warm-by-default.
- **Darkroom Surface** (`[to be resolved during implementation]`): Raised surfaces (cards, panels, input backgrounds). One step lighter than base, same hue.
- **Darkroom Border** (`#2e303a` — committed): Hairline borders and dividers. Subtle, never decorative.
- **Ink** (`#f3f4f6` — committed): Primary text and headings. High-contrast against base.
- **Muted Ink** (`#9ca3af` — committed): Secondary text, labels, placeholders. Must maintain ≥4.5:1 contrast against base — verify, do not assume.

### Neutral (light theme, inverted)
- **Paper Base** (`#fff` — committed): App background.
- **Paper Surface** (`[to be resolved during implementation]`): Raised surfaces.
- **Paper Border** (`#e5e4e7` — committed): Hairline borders.
- **Graphite** (`#08060d` — committed): Primary text and headings.
- **Slate** (`#6b6375` — committed): Secondary text. Verify ≥4.5:1 against Paper Base.

### Semantic
- **Success** (`[to be resolved during implementation]`): Upload complete, generation ready. Green-family, distinct from purple.
- **Error** (`[to be resolved during implementation]`): Generation failed, upload error. Red-family. Always accompanied by an icon + text label, never color alone.
- **Warning** (`[to be resolved during implementation]`): Partial failure, degraded mode. Amber-family.

### Named Rules
**The One Voice Rule.** Purple is the only accent. No second saturated color competes with it. Semantic colors (success/error/warning) are permitted because they carry information, but they are muted and never decorative.

**The Tint Rule.** All neutral surfaces carry a slight tint toward the brand's violet hue (chroma 0.005–0.015), not toward warm or cool by default. The darkroom has a violet undertone, not a gray one.

## 3. Typography

**Display Font:** Single geometric sans `[font to be chosen at implementation — Geist Sans or Inter tier]`
**Body Font:** Same family, lighter weight
**Label/Mono Font:** `[to be chosen if Sans+Mono pairing is needed during implementation]`

**Character:** One family, disciplined. Hierarchy comes from size and weight contrast, not from switching typefaces. The geometric sans gives a technical, confident edge — the Vercel/Linear feel. No serif, no decorative pairing. Trust the typeface to do its job.

### Hierarchy
- **Display** (weight 600, `clamp(2.5rem, 6vw, 4rem)`, line-height 1.05, letter-spacing ≥ -0.04em): Hero headlines on landing/hero only. Maximum 4rem (~64px) — the page designs, it doesn't shout.
- **Headline** (weight 600, `clamp(1.5rem, 3vw, 2rem)`, line-height 1.15): Section headings, page titles in the app.
- **Title** (weight 500, 1.25rem, line-height 1.2): Card titles, modal headings, section labels.
- **Body** (weight 400, 1rem / 18px, line-height 1.5, max-width 65–75ch): All reading text. Captions, descriptions, helper text.
- **Label** (weight 500, 0.875rem, letter-spacing 0.01em): Buttons, form labels, status indicators, table headers. Never uppercase-tracked eyebrows above sections.

### Named Rules
**The Single Family Rule.** One typeface, varied by weight and size. Switching fonts is not a hierarchy tool here. If two text elements look too similar, the answer is weight/size contrast, not a new typeface.

**The No-Eyebrow Rule.** Tiny uppercase tracked text above every section heading is prohibited. It is the saturated AI scaffold. Use hierarchy through size and weight, not through kicker labels.

## 4. Elevation

Dark-first design conveys depth through tonal layering, not heavy shadows. Surfaces step lighter as they rise. Shadows, when used, are subtle and ambient — a soft glow, not a drop shadow. The darkroom is flat by default; depth appears only as a response to state (hover, focus, modal elevation).

### Shadow Vocabulary
- **Ambient Glow** (`[to be resolved — subtle, low-spread, violet-tinted]`): Hover state on interactive cards and primary CTAs. A soft upward glow, not a downward shadow.
- **Modal Lift** (`[to be resolved — medium spread, low opacity]`): Modals and dialogs. Enough to separate from the base layer, never enough to look floating.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows and glows appear only as a response to state (hover, focus, elevation, active generation). A resting screen with visible shadows is over-designed.

**The No-Glass Rule.** Glassmorphism (backdrop-filter blurs as a decorative default) is prohibited. Blur is permitted only where it materially improves the effect — a modal backdrop dimming the content behind it — and never as a card styling shortcut.

## 5. Components

No components exist yet. Canonical primitives (buttons, inputs, cards, navigation, chips, thumbnail-result cards, generation-progress indicators) will be documented here once the product UI is built. Run `/impeccable document` after the first implementation pass to extract real component tokens.

**Intended component direction:**
- **Buttons:** Filled primary (purple on dark), ghost secondary (transparent + border), icon buttons for compact actions. Confident padding, geometric corners (6–8px radius), no pill shapes.
- **Thumbnail Result Card:** The signature component. Displays the generated thumbnail with aspect-ratio variants (YouTube 16:9, Shorts 9:16, square 1:1). The image fills the card; chrome is minimal. Hover reveals download/copy actions.
- **Generation Progress:** A real-time state indicator (SSE-driven). Shows per-thumbnail status: pending → generating → uploaded. Progress is communicated through the thumbnail slot itself (placeholder shimmer → image reveal), not through a separate progress bar.
- **Upload Drop Zone:** Full-width drag-and-drop for headshot upload. Dashed border at rest, solid purple border + tinted background on dragover.

## 6. Do's and Don'ts

### Do:
- **Do** use Electric Iris (`#aa3bff` / `#c084fc`) as the single accent, on ≤10% of any screen.
- **Do** design dark-first. The light theme is an equal, polished alternative — not a fallback.
- **Do** tint all neutrals toward the brand's violet hue (chroma 0.005–0.015). The darkroom has a violet undertone.
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on long prose.
- **Do** cap body line length at 65–75ch.
- **Do** communicate state through the thumbnail slot itself (shimmer → reveal), not through separate progress bars.
- **Do** respect `prefers-reduced-motion: reduce` on every animation — crossfade or instant fallback.
- **Do** use ≥44px touch targets on mobile.
- **Do** accompany every status color with an icon + text label. Color never communicates alone.

### Don't:
- **Don't** use purple for body text, large fills, or decorative gradients. It is an accent, not a wash.
- **Don't** use gradient text (`background-clip: text` + gradient). Solid colors only; emphasis through weight or size.
- **Don't** use glassmorphism (backdrop-filter blurs) as a default card styling. Rare and purposeful, or nothing.
- **Don't** put a tiny uppercase tracked eyebrow above every section. The 2023-era kicker is the AI scaffold tell.
- **Don't** number sections with `01 / 02 / 03` markers as default scaffolding. Numbers earn their place only in a real ordered sequence.
- **Don't** use side-stripe borders (`border-left` / `border-right` > 1px as a colored accent). Full borders, background tints, or nothing.
- **Don't** build identical same-sized card grids (icon + heading + text, repeated). Vary the layout.
- **Don't** ship the "hero-metric template" (big number, small label, supporting stats, gradient accent). SaaS cliché.
- **Don't** use heavy drop shadows at rest. The darkroom is flat by default; shadows are a state response.
- **Don't** let heading text overflow its container at any breakpoint. Test the copy at every width.
- **Don't** ship generic AI tool aesthetics: cluttered dashboards, wall-of-buttons, no hierarchy, "generated" look.
- **Don't** use stock SaaS tropes: Inter-everywhere indigo gradients, feature-card grids, numbered eyebrows.

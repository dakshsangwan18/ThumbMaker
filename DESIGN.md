---
name: Thumbmaker
description: AI-powered YouTube thumbnail generator — premium, dark-first creative tool.
---

# Design System: Thumbmaker

## 1. Overview

**Creative North Star: "The Darkroom"**

Thumbmaker is a creative tool, not a dashboard. The metaphor is the darkroom: a focused, dimly lit space where images develop. The interface stays quiet so the thumbnail — the thing the user came to make — is always the brightest object on screen. Dark-first, restrained, confident. Every element either helps the image emerge or gets out of the way.

The system draws from the Linear/Vercel/Raycast tier: precise typography, considered spacing, one decisive accent. Amber is the single brand voice — the safelight of the darkroom, used sparingly, never decoratively. Motion is responsive, not choreographed: hovers feel alive, loading states communicate progress, but nothing performs for the user. The product feels premium because it doesn't try too hard.

This system explicitly rejects the generic AI tool aesthetic: cluttered button-walls, "generated" visual noise, no hierarchy, dashboard-grid monotony, AND the saturated AI-tool purple/violet accent that every AI product shipped in 2026. It also rejects stock SaaS tropes — Inter-everywhere indigo gradients, feature-card grids, the 2023 kicker eyebrow above every section. Thumbmaker is a creative tool for creators; it should look like it was made by someone who cares about design, not stamped from a template.

**Key Characteristics:**
- Dark-first; light mode is warm beige paper — the safelight's daylight counterpart — fully polished, not an afterthought.
- One accent (amber), used on ≤10% of any screen. Its rarity is its power.
- Single geometric sans (Geist), varied by weight and size. No font-switching gimmicks.
- Motion communicates state (generating, uploading, ready) — never decorates.
- The thumbnail is always the hero. UI chrome recedes. The hero section shows sample thumbnails, not just talk.
- Mobile is first-class, not a squeezed desktop.

## 2. Colors

The palette is restrained: a family of warm-tinted dark neutrals carries 90%+ of every screen, and a single amber accent does all the expressive work. Dark-first; the light theme uses warm beige paper with the same discipline.

### Primary
- **Safelight Amber** (light `oklch(0.62 0.155 55)` / dark `oklch(0.74 0.150 65)` — committed brand anchor): The single accent. Used for primary CTAs, active/selected states, focus rings, and large headline accent words. Never used for body text, large decorative fills, or gradients. If it appears on more than 10% of a screen, the design is wrong. The hue comes from the photography darkroom's safelight — a real brand metaphor, not the AI-tool purple default.

### Neutral (dark-first, canonical)
- **Darkroom Base** (`oklch(0.165 0.012 50)` — committed): App background. Warm near-black with an amber undertone — the safelight's tint, not a gray or violet one.
- **Darkroom Surface** (`oklch(0.21 0.014 50)` — committed): Raised surfaces (cards, panels, input backgrounds). One step lighter than base, same warm hue.
- **Darkroom Border** (`oklch(0.28 0.014 50)` — committed): Hairline borders and dividers. Subtle, never decorative.
- **Ink** (`oklch(0.955 0.008 70)` — committed): Primary text and headings. Warm off-white, 16.91:1 against base.
- **Muted Ink** (`oklch(0.70 0.018 65)` — committed): Secondary text, labels, placeholders. 7.20:1 against base — verified WCAG AA.

### Neutral (light theme, beige paper)
- **Paper Base** (`oklch(0.935 0.020 75)` — committed): Warm beige. A committed beige, NOT the timid cream/parchment AI default — a real warm paper tone with enough chroma to read as beige.
- **Paper Surface** (`oklch(0.955 0.016 75)` — committed): Raised surfaces.
- **Paper Border** (`oklch(0.875 0.020 70)` — committed): Hairline borders.
- **Graphite** (`oklch(0.22 0.020 50)` — committed): Primary text and headings. 14.34:1 against base.
- **Olive Slate** (`oklch(0.48 0.030 60)` — committed): Secondary text. 5.43:1 against base — verified WCAG AA.

### Semantic
- **Success** (`oklch(0.48 0.14 150)` dark / `oklch(0.52 0.13 150)` light — committed): Upload complete, generation ready. Green-family, distinct from amber. 5.33:1 with foreground on dark.
- **Error** (`oklch(0.50 0.19 25)` dark / `oklch(0.55 0.20 25)` light — committed): Generation failed, upload error. Red-family. 5.81:1 with foreground on dark. Always accompanied by an icon + text label, never color alone.

### Named Rules
**The One Voice Rule.** Amber is the only brand accent. No second saturated color competes with it. Semantic colors (success/error) are permitted because they carry information, but they are muted and never decorative. The previously-used purple/violet accent is explicitly banned — it was the saturated AI-tool default of 2026.

**The Tint Rule.** All neutral surfaces carry a slight tint toward the brand's amber hue (chroma 0.010–0.020), not toward cool, gray, or violet by default. The darkroom has a warm undertone from the safelight.

**The Bright-For-Fills, Dark-For-Text Rule.** Amber is bright enough for buttons (with dark text on top) and large headline accents (passes 3:1 large-text rule), but for small amber TEXT on beige, use the darker `--accent-foreground` (`oklch(0.45 0.10 50)`, 6.37:1) — never the bright primary as small text on warm backgrounds.

## 3. Typography

**Display Font:** Geist Variable (single geometric sans, self-hosted via Fontsource)
**Body Font:** Geist Variable, lighter weight
**Label/Mono Font:** `[to be chosen if Sans+Mono pairing is needed during implementation]`

**Character:** One family, disciplined. Hierarchy comes from size and weight contrast, not from switching typefaces. The geometric sans gives a technical, confident edge — the Vercel/Linear feel. No serif, no decorative pairing. Trust the typeface to do its job.

### Hierarchy
- **Display** (weight 600, `clamp(2.5rem, 6vw, 4.5rem)`, line-height 1.02, letter-spacing ≥ -0.04em): Hero headlines on landing/hero only.
- **Headline** (weight 600, `clamp(1.5rem, 3vw, 2rem)`, line-height 1.15): Section headings, page titles in the app.
- **Title** (weight 500, 1.25rem, line-height 1.2): Card titles, modal headings, section labels.
- **Body** (weight 400, 1rem / 18px, line-height 1.5, max-width 65–75ch): All reading text. Captions, descriptions, helper text.
- **Label** (weight 500, 0.875rem, letter-spacing 0.01em): Buttons, form labels, status indicators, table headers. Never uppercase-tracked eyebrows above sections.

### Named Rules
**The Single Family Rule.** One typeface, varied by weight and size. Switching fonts is not a hierarchy tool here. If two text elements look too similar, the answer is weight/size contrast, not a new typeface.

**The No-Eyebrow Rule.** Tiny uppercase tracked text above every section heading is prohibited. It is the saturated AI scaffold. Use hierarchy through size and weight, not through kicker labels.

## 4. Elevation

Dark-first design conveys depth through tonal layering, not heavy shadows. Surfaces step lighter as they rise. Shadows, when used, are subtle and ambient — a soft glow, not a drop shadow. The darkroom is flat by default; depth appears only as a response to state (hover, focus, modal elevation). Exception: the hero's sample-thumbnail composition uses shadow to give the layered "contact sheet" depth — that's intentional, brand-consistent, and the shadow earns its place.

### Shadow Vocabulary
- **Ambient Glow** (`[to be resolved — subtle, low-spread, amber-tinted]`): Hover state on interactive cards and primary CTAs. A soft upward glow, not a downward shadow.
- **Modal Lift** (`[to be resolved — medium spread, low opacity]`): Modals and dialogs. Enough to separate from the base layer, never enough to look floating.
- **Hero Stack Cast** (`shadow-2xl` Tailwind utility): The hero's sample thumbnail stack uses a confident cast shadow to make the layered prints read as physical objects on a contact sheet.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows and glows appear only as a response to state (hover, focus, elevation, active generation), except for the intentional hero thumbnail-stack composition.

**The No-Glass Rule.** Glassmorphism (backdrop-filter blurs as a decorative default) is prohibited. Blur is permitted only where it materially improves the effect — a modal backdrop dimming the content behind it — and never as a card styling shortcut.

## 5. Components

Canonical primitives are built (Button, Textarea, Tabs, Skeleton, Tooltip, Sonner toast, ThemeToggle, Navbar). The signature components:

- **Buttons:** Filled primary (amber with dark text), ghost secondary (transparent + border), outline, link. Confident padding, 8px radius, no pill shapes.
- **Thumbnail Result Card:** The signature component. Displays the generated thumbnail with aspect-ratio variant tabs (YouTube 16:9, Shorts 9:16, square 1:1). The image fills the card; chrome is minimal. Hover reveals regenerate. Download + copy URL actions inline.
- **Generation Progress:** SSE-driven. Shows per-thumbnail status: pending → generating → uploaded/failed. Progress is communicated through the thumbnail slot itself (shimmer placeholder → image reveal), not through a separate progress bar.
- **Upload Drop Zone:** Full-width drag-and-drop for headshot upload. Dashed border at rest, solid amber border + tinted background on dragover. Preview thumbnail after upload with remove button.
- **Hero Thumbnail Composition:** The landing hero's right side is a layered composition of three sample YouTube thumbnails — one flagship (bold_dramatic) front-and-center, two smaller variations (clean_minimal, vibrant_energetic) peeking below the corners with slight rotation, like film prints on a contact sheet. Show, don't tell.

## 6. Do's and Don'ts

### Do:
- **Do** use Safelight Amber (`oklch(0.62 0.155 55)` / `oklch(0.74 0.150 65)`) as the single accent, on ≤10% of any screen.
- **Do** use the darker amber (`--accent-foreground`, `oklch(0.45 0.10 50)`) for small amber TEXT on warm backgrounds — not the bright primary.
- **Do** design dark-first. The light theme is warm beige paper — an equal, polished alternative — not a fallback.
- **Do** tint all neutrals toward the brand's amber hue (chroma 0.010–0.020). The darkroom has a warm safelight undertone.
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on long prose.
- **Do** cap body line length at 65–75ch.
- **Do** communicate state through the thumbnail slot itself (shimmer → reveal), not through separate progress bars.
- **Do** show the product's output in the hero (sample thumbnails), not just talk about it.
- **Do** respect `prefers-reduced-motion: reduce` on every animation — crossfade or instant fallback.
- **Do** use ≥44px touch targets on mobile.
- **Do** accompany every status color with an icon + text label. Color never communicates alone.

### Don't:
- **Don't** use purple or violet as an accent. It is the saturated AI-tool default of 2026 — explicitly banned for this brand.
- **Don't** use the bright amber primary as small TEXT on warm/beige backgrounds; use `--accent-foreground` instead.
- **Don't** use gradient text (`background-clip: text` + gradient). Solid colors only; emphasis through weight or size.
- **Don't** use glassmorphism (backdrop-filter blurs) as a default card styling. Rare and purposeful, or nothing.
- **Don't** put a tiny uppercase tracked eyebrow above every section. The 2023-era kicker is the AI scaffold tell.
- **Don't** number sections with `01 / 02 / 03` markers as default scaffolding. Numbers earn their place only in a real ordered sequence.
- **Don't** use side-stripe borders (`border-left` / `border-right` > 1px as a colored accent). Full borders, background tints, or nothing.
- **Don't** build identical same-sized card grids (icon + heading + text, repeated). Vary the layout.
- **Don't** ship the "hero-metric template" (big number, small label, supporting stats, gradient accent). SaaS cliché.
- **Don't** use heavy drop shadows at rest (except the intentional hero thumbnail-stack composition). The darkroom is flat by default; shadows are a state response.
- **Don't** let heading text overflow its container at any breakpoint. Test the copy at every width.
- **Don't** ship generic AI tool aesthetics: cluttered dashboards, wall-of-buttons, no hierarchy, "generated" look, centered-everything hero with a sparkle-badge kicker.
- **Don't** use stock SaaS tropes: Inter-everywhere indigo gradients, feature-card grids, numbered eyebrows.
- **Don't** use cream/parchment/sand as the light body background; committed beige is distinct from the timid cream AI default.

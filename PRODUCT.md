# Product

## Register

product

## Users

YouTube creators, content marketers, and agencies who need professional thumbnails quickly. They work across mobile and desktop, often under time pressure before a video goes live. Their job: turn a headshot and a prompt into a scroll-stopping thumbnail in minutes, not hours. They care about visual quality because the thumbnail directly affects click-through rate, but they don't want to open Photoshop to get there.

## Product Purpose

THUMBMAKER is an AI-powered thumbnail generator. A user uploads a headshot, writes a prompt describing the desired thumbnail, and selects how many variants (1–3) they want. The app generates thumbnails in distinct artistic styles using OpenAI's image-generation API, uploads them to a CDN, and streams progress back in real time. It outputs multiple aspect-ratio variants (YouTube landscape, Shorts vertical, square) ready to publish.

Success looks like: a creator goes from idea to downloaded, publish-ready thumbnail in under two minutes, without opening a design tool, and the result looks better than what they would have made by hand.

## Brand Personality

Premium, modern, delightful. The interface should feel like a high-end creative tool — the Linear/Vercel/Raycast tier — not a generic AI widget. Confident typography, considered spacing, purposeful motion. Every interaction should feel responsive and satisfying. The product earns trust by feeling polished, not by shouting.

## Anti-references

- Generic AI tool sites: cluttered dashboards, wall-of-buttons, no visual hierarchy, "generated" aesthetic.
- Stock SaaS templates: Inter everywhere, indigo gradients, feature-card grids, the 2023 kicker eyebrow above every section.
- Overly playful/childish creative tools: oversized emoji, cartoon mascots, rainbow chaos.
- Enterprise CMS vibes: dense tables, gray-on-gray, no delight.

## Design Principles

1. **Show the result, not the process.** The thumbnail is the hero. Every screen should foreground the visual output, not the machinery behind it.
2. **Confidence through restraint.** Whitespace, strong typography, and one decisive accent beat visual noise. The product feels premium because it doesn't try too hard.
3. **Motion with meaning.** Animations communicate state — generating, uploading, ready — they don't decorate. Every transition has a reason and respects reduced-motion.
4. **Fast feels fast.** The interface should never make the user wait for the UI. Loading states are immediate and informative; the only thing worth waiting for is the image itself.
5. **Mobile is a first-class citizen.** Creators check results on their phones. Every flow works thumb-first, not as a squeezed desktop afterthought.

## Accessibility & Inclusion

- WCAG 2.2 AA contrast minimum (body text ≥4.5:1, large text ≥3:1).
- Full keyboard navigation; visible focus indicators on every interactive element.
- `prefers-reduced-motion: reduce` honored on every animation — crossfade or instant fallback, never motion-gated content.
- Color-blind safe: status and state never communicated by color alone (icons + labels accompany color).
- Touch targets ≥44px on mobile.

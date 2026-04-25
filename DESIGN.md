# Design Brief — Gatuno Admin Dashboard

**Tone:** Professional, authoritative, fast. A focused control center for real-time ride/delivery operations. Information-first aesthetic with no decorative bloat.

**Differentiation:** Dark charcoal substrate with vibrant green accents. Status badges color-coded for instant recognition. Live feed updates every 3–5 seconds. Compact data density in tables, generous breathing in hero sections.

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | `0.62 0.22 142.5` | Green #00C853 equivalent — CTAs, acceptances, active states |
| Secondary | `0.24 0.15 240` | Blue — "A caminho" status badge |
| Destructive | `0.58 0.21 17` | Red — cancellations |
| Muted | `0.24 0 0` | Dark gray — dividers, inactive states |
| Background | `0.11 0 0` | Near-black for main canvas |
| Card | `0.155 0 0` | Slightly elevated from background |
| Foreground | `0.95 0 0` | Off-white text for contrast |

**Status Badges:** Em andamento=yellow `0.75 0.22 45`, A caminho=blue `0.24 0.15 240`, Procurando=orange `0.68 0.18 56`, Concluída=green `0.62 0.22 142.5`, Cancelada=red `0.58 0.21 17`.

## Typography

| Tier | Font | Size | Weight | Use |
|------|------|------|--------|-----|
| Display | General Sans | 28–32px | 600–700 | Page titles, hero metrics |
| Body | General Sans | 14–16px | 400–500 | Content, table data, descriptions |
| Mono | JetBrains Mono | 12–14px | 400 | Timestamps, IDs, prices in R$ |

## Elevation & Depth

- **Background**: `0.11 0 0` — main canvas
- **Card**: `0.155 0 0` with `shadow-card` — content containers
- **Elevated**: `0.195 0 0` with `shadow-elevated` — modals, popovers
- **Border**: `0.235 0 0` — subtle dividers between zones

## Structural Zones

| Zone | Background | Border | Purpose |
|------|-----------|--------|---------|
| Sidebar | `0.135 0 0` | `0.195 0 0` | Fixed left navigation with GATUNO logo, menu items |
| Header | `0.155 0 0` | Bottom border `0.235 0 0` | Page title, filters, actions |
| Content | `0.11 0 0` | None | Main feed, tables, metrics |
| Footer | `0.135 0 0` | Top border `0.235 0 0` | Pagination, metadata |

## Spacing & Rhythm

- **Grid**: 8px base unit
- **Compact sections**: 8–12px gaps (tables, lists)
- **Generous sections**: 24–32px gaps (hero metrics, card stacks)
- **Padding**: Cards 16px, sections 24px, page 32px

## Component Patterns

- **Cards**: Minimal shadows, subtle borders, 8px rounded corners
- **Buttons**: Solid green for primary CTAs, outlined for secondary, disabled state = `0.24 0 0`
- **Tables**: Striped rows with alternating `0.155 0 0` / `0.11 0 0` for visual rhythm
- **Status badges**: Inline, color-coded, 2.5px padding, 12px font-size
- **Live updates**: Fade-in animation on new rows, 0.2s duration

## Motion

- Transition default: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Live feed updates fade-in: 0.2s ease-out
- Hover states: 0.15s opacity shift on interactive elements
- No motion on page load — prioritize perceived speed

## Constraints

- No decorative gradients; solid fills only
- No full-page blur effects; minimal drop shadows
- Green accent applied sparingly — highlights, CTAs, active badges only
- Dark sidebar must be visually distinct from main content
- All text must maintain AA+ contrast against backgrounds

## Signature Detail

Live-updating status badges that shift color as rides progress through states (Procurando → Em andamento → A caminho → Concluída). Real-time feed serves as the emotional center of the interface — motion draws the eye to active operations, reinforcing the "live control" feeling.

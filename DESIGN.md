# MeetMind Design System — Built for Intelligent Performance

## 1. Design Philosophy

**MeetMind** embodies an aesthetic of **industrial precision and editorial restraint**. Rather than generic dashboards or disconnected floating cards, the design is structured around a continuous paper canvas, tactile glass materials, and an iconic **7-row LED-dot typographic matrix**.

The design system merges the physical tactility of high-end acoustic instrumentation (Teenage Engineering, Dieter Rams, Braun) with modern web engineering (rigid container scaling, WebGL/SVG noise, hardware-accelerated video backdrops).

### Anti-Card-Fatigue Principle

Rigid glass cards are strictly confined to the hero metric units (`Speed`, `Context`, `Connections`). All downstream sections intentionally avoid nested cards, card-within-card containers, or generic bento boxes. Instead, content flows directly on the continuous tactile `--paper` canvas with open editorial typography, spec sheets, and crisp hairline rule dividers (`border-[#222222]/10`).

---

## 2. Core Tokens & Palette

### Colors

| Token            | Light Value             | Dark Value              | Purpose                                                |
| :--------------- | :---------------------- | :---------------------- | :----------------------------------------------------- |
| `--paper`        | `#ececeb`               | `#111111`               | Primary stage & section canvas (tactile paper texture) |
| `--paper-subtle` | `#e4e4e3`               | `#181818`               | Secondary containers and section dividers              |
| `--ink`          | `#222222`               | `#f4f4f4`               | High-contrast display headings and titles              |
| `--copy`         | `#4a4a4a`               | `#a1a1aa`               | Muted editorial body text and descriptions             |
| `--led-accent`   | `#ad314d`               | `#f43f5e`               | Crimson LED-dot display typography & active indicators |
| `--glass-line`   | `rgba(255,255,255,.36)` | `rgba(255,255,255,.15)` | 1px luminous edge border on glass cards                |
| `--card-shadow`  | `rgba(50,28,39,.30)`    | `rgba(0,0,0,.60)`       | Deep ambient drop shadow for cards                     |

### Proportions & Grid Units

- **Base Card Dimensions**: `429px × 554px` (aspect ratio: `429 / 554`).
- **Card Radius**: `17px` at 429px width (`calc(var(--card-w) * 17 / 429)`).
- **Proportional Unit (`--u`)**: `calc(100cqw / 429)`. All internal card typography, paddings, and graphic elements scale mathematically with `--u` so internal layouts never break across screen widths.
- **Stage Container Spacing**:
  - `--gap`: `clamp(8px, 1.5vw, 23px)`
  - `--gutter`: `clamp(14px, 3.6vw, 54px)`
  - `--content-max`: `calc(3 * 429px + 2 * var(--gap))` (~1333px max)
  - `--pad-top`: `clamp(20px, 9.6vh, 94px)`
  - `--pad-bottom`: `clamp(16px, 3vh, 52px)`

---

## 3. Typography Architecture

### Font Stack

- **Primary Typeface**: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - `font-optical-sizing: auto;`
  - `-webkit-font-smoothing: antialiased;`
  - `text-rendering: geometricPrecision;`
- **Monospace Typeface**: `"JetBrains Mono", monospace` (`--font-mono`)
  - Subsets: `latin`
  - Applied to all telemetry ledgers, VU decibel readouts, timestamps, cryptosheet specs, code blocks, and micro badges.
- **Headline Weights**: `400` (Regular) to `600` (Semi-bold) with strict line-heights (`1.22` for display masthead, `1.62` for body text).

### LED-Dot Vector Matrix Glyphs

- Custom 7-row bitmap vector SVG renderer ([`led-dots.tsx`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/led-dots.tsx)).
- Used for hero brand terms (e.g. `Intelligent` in `--led-accent`), key telemetry metrics (`118 ms`, `2.4 M`, `16 K`), and step indicators.
- Grid pitch: `pitchX = 4` (words) or `5` (metrics), `pitchY = 4`, `gap = 1`.

---

## 4. Materials & Elevation

### 1. Multi-Layer Glass Gradient Stacks

Cards use composite multi-gradient backgrounds with up to 19 radial and linear stops, giving luminous volume that mimics optical glass:

- **Speed Card**: Rose / Ruby / Wine radial gradients (`#bd4468` to `#8c1320`) with vector radar gauge.
- **Context Card**: Orchid / Amethyst / Berry gradients (`#c9b5e1` to `#793246`) with glass window tile wall.
- **Connections Card**: Coral / Tangerine / Crimson gradients (`#d84736` to `#d34239`) with circuit network map.

### 2. Sheen & Grain

- **Card Sheen (`::before`)**: `mix-blend-mode: screen` with dual linear and radial gloss angles.
- **Tactile Grain (`.card__grain`)**: SVG `feTurbulence` fractal noise filter (`baseFrequency="0.54"`, 3 octaves) blended with `mix-blend-mode: soft-light` at `46%` to `68%` opacity.

---

## 5. Section Structure Across the Platform

1. **Stage 1: The Performance Stage (Hero)**
   - Two-line masthead with crimson LED-dot `Intelligent`.
   - Static, zero-lag high-resolution WebP background backdrop.
   - The Three Glass Metric Cards (`Speed`, `Context`, `Connections`) with proportional scaling.

2. **Stage 2: The Acoustic Precision Deck (Voice Engine)**
   - Industrial hardware-inspired audio console with live vector oscilloscope waveforms.
   - Twin analog-style LED VU level decibel meters.
   - 3-point telemetry ledger with LED-dot metrics (`184ms`, `0` bot invites, `48kHz Opus`).

3. **Stage 3: The Transformation Workbench (Synthesis Engine)**
   - 3-phase visual pipeline (`01 Diarization`, `02 Reasoning Core`, `03 Dispatch Matrix`).
   - Dual-pane live workbench: Raw dialogue input stream → Instant executive action matrix with interactive checkable items.

4. **Stage 4: The Semantic Command Terminal (Conversational Memory)**
   - Interactive search terminal with blinking prompt and preset query keys.
   - Verbatim verified match with integrated miniature audio waveform player.
   - Cryptographically attested provenance ledger.

5. **Stage 5: Cryptographic Defense & Technical Disclosures (Security & FAQ)**
   - Cryptographic defense ledger with protocol specs and active enforcement badges.
   - Two-column technical disclosure deck with category navigation and audited compliance details.

6. **Stage 6: The Actionable Finale (CTA)**
   - Clean, open typographic finale leading into the minimalist footer with embedded theme toggle.

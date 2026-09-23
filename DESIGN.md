# MeetMind Design System — Built for Intelligent Performance

## 1. Design Philosophy

**MeetMind** embodies an aesthetic of **industrial precision and editorial restraint**. Rather than generic dashboards, disconnected floating cards, or cluttered bento grids, the design is structured around a continuous paper canvas, tactile glass materials, high-precision telemetry, and an iconic **7-row LED-dot typographic matrix**.

The design system merges the physical tactility of high-end acoustic instrumentation (Teenage Engineering, Dieter Rams, Braun) with modern web engineering:

- **Rigid container scaling & responsive math** via CSS Container Queries (`cqw`).
- **Tactile surface physics** using SVG `feTurbulence` noise textures and hardware-accelerated video/graphics backdrops.
- **Strict vertical edge alignment** across all sections from header to footer.
- **Semantic tokenization** with full Tailwind CSS v4 and dark/light mode parity.

### Anti-Card-Fatigue Principle

Rigid glass cards are strictly confined to the hero metric units (`Speed`, `Context`, `Connections`). All downstream sections intentionally avoid nested cards, card-within-card containers, or generic bento boxes. Instead, content flows directly on the continuous tactile canvas with open editorial typography, technical spec sheets, and crisp hairline rule dividers (`border-border`).

---

## 2. Global Semantic Tokens & Theme Architecture

Colors are defined in [`src/app/globals.css`](file:///e:/dev/meetmind/src/app/globals.css) as CSS custom properties exposed to Tailwind CSS v4 via `@theme inline`. No arbitrary hex values (`[#...]`) are used in component class names.

### Theme Palette & Semantic Tokens

| CSS Variable           | Light Theme                | Dark Theme                  | Tailwind Utility                            | Semantic Purpose                                       |
| :--------------------- | :------------------------- | :-------------------------- | :------------------------------------------ | :----------------------------------------------------- |
| `--background`         | `#ececeb`                  | `#111111`                   | `bg-background`                             | Primary page & section background canvas               |
| `--foreground`         | `#202020`                  | `#f4f4f4`                   | `text-foreground`                           | Base body text and default contrast                    |
| `--primary`            | `#202020`                  | `#ffffff`                   | `text-primary`, `bg-primary`                | Primary headlines, strong emphasis, solid buttons      |
| `--primary-foreground` | `#ffffff`                  | `#111111`                   | `text-primary-foreground`                   | Inverted text on primary backgrounds                   |
| `--secondary`          | `#4a4a4a`                  | `#a1a1aa`                   | `text-secondary`                            | Subheadings, editorial descriptions, secondary actions |
| `--accent`             | `#ad314d`                  | `#ad314d`                   | `text-accent`, `bg-accent`, `border-accent` | Brand crimson accent, LED matrix, active indicators    |
| `--accent-foreground`  | `#ffffff`                  | `#ffffff`                   | `text-accent-foreground`                    | Text on accent elements                                |
| `--muted`              | `#f4f4f5`                  | `#27272a`                   | `bg-muted`                                  | Skeleton loaders, subtle chip fills                    |
| `--muted-foreground`   | `#4a4a4a`                  | `#a1a1aa`                   | `text-muted-foreground`                     | Microcopy, metadata labels                             |
| `--border`             | `rgba(34, 34, 34, 0.1)`    | `rgba(255, 255, 255, 0.1)`  | `border-border`                             | Hairline dividers and surface borders                  |
| `--card`               | `rgba(255, 255, 255, 0.7)` | `rgba(255, 255, 255, 0.03)` | `bg-card`                                   | Surface plates with backdrop blur (`backdrop-blur-sm`) |

### Dark Mode Atmosphere

- **Light Mode**: Textured warm paper (`#ececeb`) with tactile paper grain linear gradient overlays.
- **Dark Mode**: Deep carbon `#111111` with subtle crimson atmospheric radial glows (`radial-gradient(ellipse 80% 50% at 50% -10%, rgba(173, 49, 77, 0.14), transparent 70%)`) and carbon gradients (`linear-gradient(180deg, #131313 0%, #111111 60%, #0e0e0e 100%)`).

---

## 3. Container & Edge Alignment Architecture

To prevent visual drift and misalignment, **every single section across the entire platform** adheres to an identical container definition:

```tsx
<div className="mx-auto w-full max-w-6xl px-6 sm:px-16">
  {/* Content strictly aligns to the inner padding boundary */}
</div>
```

### Layout Specifications

- **Max Container Width**: `max-w-6xl` (`72rem` = `1152px`).
- **Mobile Horizontal Padding**: `px-6` (`24px`) on screens `< 640px`.
- **Desktop Horizontal Padding**: `sm:px-16` (`64px`) on screens `≥ 640px`.
- **Inner Content Width at Desktop**: `1152px - 128px = 1024px`.
- **Left Edge Alignment**: The MeetMind brand logo in the floating header, the "Built for..." hero headline, Card 1 (`SpeedCard`), all section mastheads, and the footer logo align to the **exact same vertical left guide line**.
- **Right Edge Alignment**: The "Get Started" header CTA button, hero intro paragraph, Card 3 (`ConnectionsCard`), and footer legal links terminate on the **exact same vertical right guide line**.

---

## 4. Typography System

### Font Stack

- **Primary Sans**: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Rendered with `font-optical-sizing: auto;`, `-webkit-font-smoothing: antialiased;`, `text-rendering: geometricPrecision;`.
  - Display headlines use `text-3xl sm:text-5xl` with tight line-height (`leading-tight`) and tracking (`tracking-tight`).
  - Editorial body text uses `text-xs sm:text-sm` with `leading-relaxed` and `font-normal`.
- **Monospace Telemetry**: `"JetBrains Mono", ui-monospace, monospace` (`font-mono`)
  - Used for telemetry metrics, status tags, latency indicators, timestamps, and section badges.
  - Standard scale: `text-xs` (`12px`) with `tracking-wider` and `uppercase`.

### LED-Dot Matrix Display Glyphs

The LED-dot typography engine ([`led-dots.tsx`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/led-dots.tsx)) renders 7-row vector matrix characters:

- **Brand Title Term**: Crimson `Intelligent` in the hero headline (`text-accent`).
- **Performance Numerals**: Card metrics like `184 ms` (latency), `100 %` (overview accuracy), and `50 +` (concurrent agents).
- **Matrix Calculations**: Pitch X = 4 (words) or 5 (metrics), Pitch Y = 4, Gap = 1, rendered into crisp scalable vector paths.

---

## 5. Hero Glass Cards & Micro-Scaling Engine

The three hero performance cards ([`performance-cards.tsx`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/performance-cards.tsx)) represent physical instruments:

### Proportions & Container Queries

- **Reference Aspect Ratio**: `429 / 554` (`aspect-ratio: 429 / 554`).
- **Container Unit (`--u`)**: `calc(100cqw / 429)`. All internal fonts, margins, radar ticks, and button heights scale with `--u`.
- **Card Radius**: `calc(var(--card-w) * 17 / 429)`.
- **Row Scaling**: Cards fill the container with `display: flex; justify-content: space-between; gap: var(--gap)` where `--card-w: calc((100% - (var(--card-count) - 1) * var(--gap)) / var(--card-count))`. At full desktop expansion (`1024px`), each card settles at ~`329px` wide × ~`425px` tall.

### Multi-Layer Optical Materials

- **Speed Card**: Rose / Ruby / Wine radial gradients (`#bd4468` to `#8c1320`), mathematical radar gauge with 23 calibrated angle ticks, and real-time cadence readouts.
- **Context Card**: Orchid / Amethyst / Berry gradients (`#c9b5e1` to `#793246`), glass window lines tile with backdrop blur.
- **Connections Card**: Coral / Tangerine / Crimson gradients (`#d84736` to `#d34239`), masked vector connection circuit map.
- **Surface Texture**: SVG `feTurbulence` fractal noise filter (`#cardNoise`, `baseFrequency="0.54"`, 3 octaves) blended with `mix-blend-mode: soft-light` at `46%` to `68%` opacity.

---

## 6. Section Architecture

The landing page ([`home-view.tsx`](file:///e:/dev/meetmind/src/modules/home/lander/ui/views/home-view.tsx)) is sequenced into 8 cohesive stages:

```
┌─────────────────────────────────────────────────────────────┐
│ 0. HeaderLanding (Absolute navigation, Logo, Auth CTAs)     │
├─────────────────────────────────────────────────────────────┤
│ 1. PerformanceStage (Hero headline, 3 Glass Cards, LedDots) │
├─────────────────────────────────────────────────────────────┤
│ 2. StageVoiceEngine (Acoustic oscilloscope, VU meters)     │
├─────────────────────────────────────────────────────────────┤
│ 3. StageSynthesis (Diarization, 3-column markdown ledger)   │
├─────────────────────────────────────────────────────────────┤
│ 4. StageMemory (Search prompt terminal, Ask AI citations)   │
├─────────────────────────────────────────────────────────────┤
│ 5. StageSecurityFaq (Cryptographic disclosure ledger & FAQ) │
├─────────────────────────────────────────────────────────────┤
│ 6. StageCta (Final activation prompt, enterprise launch)    │
├─────────────────────────────────────────────────────────────┤
│ 7. FooterLanding (Navigation, legal links, ThemeToggle)     │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Component Inventory

1. **[`HeaderLanding`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/header.tsx)**:
   - Floating navigation bar with transparent background and seamless vertical clearance.
   - Left: MeetMind Logo with hover scale and brand typography.
   - Right: "Sign In" link and rounded primary "Get Started" button.

2. **[`PerformanceStage`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/performance-stage.tsx)**:
   - Two-line display masthead with animated LED-dot `Intelligent`.
   - Three instrument cards (`SpeedCard`, `ContextCard`, `ConnectionsCard`).
   - Downward telemetry scroll indicator linking directly to `#voice-engine`.

3. **[`StageVoiceEngine`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/stage-voice-engine.tsx)**:
   - Section masthead: `01 // ARCHITECTURE & ACOUSTIC TELEMETRY`.
   - Real-time animated SVG dual oscilloscope waveform with center latency marker (`184ms gap`).
   - Dual analog VU decibel level meters with live randomized amplitude needles and peak indicators.
   - 3-point telemetry spec ledger (`184ms Latency`, `0 Bot Invites Required`, `48kHz Opus Audio`).

4. **[`StageSynthesis`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/stage-synthesis.tsx)**:
   - Section masthead: `02 // AUTOMATED MEETING SYNTHESIS`.
   - Live session metadata bar with Inngest engine attribution and GPT-4o model badge.
   - 3-column deliverable ledger:
     - _Column 1_: Narrative Executive Overview with database persistence badge.
     - _Column 2_: Thematic Notes & Action Items with interactive checkable task items.
     - _Column 3_: Decisions & Architectural Consensus with confidence scores.

5. **[`StageMemory`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/stage-memory.tsx)**:
   - Section masthead: `03 // MEETING MEMORY & RECALL`.
   - Interactive command terminal with blinking cursor (`>`) and preset query pills (`Budget & Finance`, `Sprint Architecture`, `Enterprise Sales`).
   - Citation card with verbatim quote, audio timecode provenance, speaker attribution, and verification checks.

6. **[`StageSecurityFaq`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/stage-security-faq.tsx)**:
   - Section masthead: `04 // CRYPTOGRAPHIC DEFENSE & TECHNICAL DISCLOSURES`.
   - 3-stat technical security header (`Zero Model Training`, `AES-256 GCM`, `SOC2 Type II Ready`).
   - Two-column interactive disclosure deck: category selection pills on the left, verified technical disclosure with standard certifications on the right.

7. **[`StageCta`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/stage-cta.tsx)**:
   - High-contrast, focused conversion banner with live agent deployment badge.
   - Centered headline and dual CTA actions ("Get Started Free" and "Architecture Overview").

8. **[`FooterLanding`](file:///e:/dev/meetmind/src/modules/home/lander/ui/components/footer.tsx)**:
   - Multi-column footer with brand summary, Architecture anchor links, Workspace links, copyright statement, and integrated theme toggle.

---

## 7. Responsive Breakpoint Strategy

| Breakpoint                    | Viewport          | Layout Adaptations                                                                                                                                                                                   |
| :---------------------------- | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mobile (`< 640px`)**        | `< 640px`         | `px-6` padding (24px). Mastheads stack vertically (`flex-col`). Performance cards stack in 1 column (`max-w-[360px]`). VU decibel meters hide detailed ticks. Deliverable ledger stacks in 1 column. |
| **Tablet (`640px - 1023px`)** | `640px - 1023px`  | `sm:px-16` padding (64px). Mastheads switch to row layout (`sm:flex-row`). Deliverables switch to 3 columns. Portrait mode organizes cards into a 2+1 grid.                                          |
| **Desktop (`≥ 1024px`)**      | `1024px - 1440px` | `max-w-6xl` centered (`1024px` content). All 3 hero cards in 1 row (`flex justify-between`). Security deck displays side-by-side 5-col / 7-col layout.                                               |
| **Ultrawide (`> 1440px`)**    | `> 1440px`        | Content stays rigidly constrained to `max-w-6xl` centered canvas (`margin-inline: auto`). Dark mode radial ambient glow broadens smoothly without clipping.                                          |

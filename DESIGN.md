# MeetMind Design System

## 1. Overview

MeetMind has two visual surfaces built with the same toolchain (Tailwind CSS v4 + shadcn/ui):

| Surface                                                    | Look                                                                                                    | Colors come from                                                          |
| :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------ |
| **Application** (dashboard, auth, call)                    | Neutral, restrained SaaS UI with light/dark parity                                                      | shadcn semantic tokens in [`globals.css`](src/app/globals.css)            |
| **Marketing landing page** (`/`, signed-out visitors only) | Light "sky" theme: blue gradient hero, clouds, white cards on a pale-blue canvas, blueprint frame lines | Tailwind's default palette (`slate`, `blue`, `sky`, `zinc`, `emerald`, …) |

---

## 2. Styling Rules (All Surfaces)

- **Write styles as standard Tailwind classes in `className`.** Compose variants with `cva` and merge with `cn()` from `@/lib/utils`.
- **Use Tailwind's default scales and snap to the closest step.** This covers text size, spacing, radius, shadow, tracking and leading. Pixel-perfect values are not a goal: a 13px design value becomes `text-sm`, an 18px gap becomes `gap-4`, a 13px corner becomes `rounded-xl`.
- **No arbitrary values** (`text-[13px]`, `rounded-[13px]`, `bg-[#0f1b33]`, `w-[clamp(...)]`). Express fluid sizes with responsive steps instead (`text-4xl md:text-5xl xl:text-6xl`).
  - Accepted exceptions are things Tailwind has no utility for, such as `[writing-mode:vertical-rl]` for vertical tab labels, and shadcn-style selector variants (`data-[state=open]:`, `[&_svg]:size-4`). Comment each exception.
- **Colors**: use semantic tokens (application) or the default Tailwind palette (landing). Any genuinely new color goes in `src/app/globals.css` and nowhere else; don't create per-module color tokens.
- **`src/app/globals.css` is the only stylesheet.** Register `next/font` families as Tailwind utilities in its `@theme inline` block; never add per-module CSS files or hard-coded font stacks in components.
- **Motion**: anything that moves, fades or scales uses the `motion` library with the shared tokens and components (see §4.5). Never hand-type durations or easing curves. Plain hover color changes stay as Tailwind `transition-colors duration-300`, since animating them in JS would duplicate palette values.
- **Radii**: this repo derives `rounded-sm` (6px), `rounded-md` (8px), `rounded-lg` (10px) and `rounded-xl` (14px) from `--radius: 0.625rem`. `rounded-xs`, `2xl`, `3xl` and `4xl` keep Tailwind's defaults.

### 2.1 Brand mark

One logo exists for every surface: a white four-point sparkle on a `blue-400 → blue-600` gradient tile, with a 25% corner radius.

| Where                           | What it is                                                                                                                           |
| :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/brand/logo.tsx` | Source of truth. Exports `LogoMark` (icon), `LogoWordmark` (text), `Logo` (mark + wordmark) and `BrandLogo` (the home link).         |
| `public/logo.svg`               | Static copy of the mark for external use (email, social, downloads).                                                                 |
| `src/app/icon.svg`              | Favicon, rendered by the Next.js metadata file convention.                                                                           |
| `src/app/apple-icon.png`        | 180×180 iOS icon, rasterised from `icon.svg` with full-bleed corners (iOS applies its own mask). Re-generate it if the mark changes. |

- Never add a second logo component or import React components from `public/`.
- `--brand` is the mark's `blue-600` stop (`#2563eb`), so links, active nav and status chips match the tile.
- The landing's `brand-logo.tsx` keeps only `SparkleTile` (mark at `xs`/`sm`/`lg` for inline use in copy) and a `BrandLogo` wrapper that applies the landing's `font-tight` wordmark.
- Keep the mark legible at 16px: the sparkle is a single solid path with no fine inner detail.

---

## 3. Application Theme Tokens

Colors are CSS custom properties in [`src/app/globals.css`](src/app/globals.css), exposed to Tailwind via `@theme inline`.

| CSS Variable           | Light                    | Dark                        | Utility                                  | Purpose                                                       |
| :--------------------- | :----------------------- | :-------------------------- | :--------------------------------------- | :------------------------------------------------------------ |
| `--background`         | `#fafafa`                | `#121213`                   | `bg-background`                          | Main dashboard canvas                                         |
| `--foreground`         | `#202020`                | `#f4f4f4`                   | `text-foreground`                        | Base text                                                     |
| `--card`               | `#ffffff`                | `#18181a`                   | `bg-card`                                | Elevated surfaces                                             |
| `--primary`            | `#202020`                | `#ffffff`                   | `bg-primary`, `text-primary`             | Headlines, solid buttons                                      |
| `--primary-foreground` | `#ffffff`                | `#111111`                   | `text-primary-foreground`                | Text on primary                                               |
| `--secondary`          | `#4a4a4a`                | `#a1a1aa`                   | `text-secondary`                         | Subheadings, secondary copy                                   |
| `--muted`              | `#f2f2f1`                | `#1c1c1f`                   | `bg-muted`                               | Skeletons, subtle fills                                       |
| `--muted-foreground`   | `#4a4a4a`                | `#a1a1aa`                   | `text-muted-foreground`                  | Microcopy, metadata                                           |
| `--accent`             | `#ebebeb`                | `#222225`                   | `bg-accent`                              | Neutral hover/focus highlight on menu items                   |
| `--brand`              | `#2563eb`                | `#2563eb`                   | `text-brand`, `bg-brand`, `border-brand` | Brand blue, matching the logo mark (never used as `--accent`) |
| `--border`             | `rgba(34, 34, 34, 0.08)` | `rgba(255, 255, 255, 0.08)` | `border-border`                          | Hairline dividers                                             |
| `--sidebar`            | `#f5f5f4`                | `#0b0b0c`                   | `bg-sidebar`                             | Recessed navigation column                                    |

**Fonts** (root layout, `next/font`): Inter is the body face (`--font-inter`). Plus Jakarta Sans is `font-sans`, JetBrains Mono `font-mono` and Instrument Serif `font-serif`; Bricolage Grotesque, Newsreader and Arbutus Slab are also available.

---

## 4. Landing Page

### 4.1 Structure

```
src/modules/home/lander/
├── constants.ts                  # All copy and mock data. Edit wording here, not in components.
└── ui/
    ├── fonts.ts                  # Landing-only fonts, scoped to the landing root
    ├── views/home-view.tsx       # Composes the sections
    └── components/
        ├── header.tsx, footer.tsx, cta-section.tsx
        ├── landing-button.tsx    # cva: glass | dark | ghost | link × sm | md | lg
        ├── brand-logo.tsx        # SparkleTile (xs | sm | lg) + landing BrandLogo wrapper
        ├── frame-guides.tsx      # FrameWrap, FrameEdges, FrameDivider, Crosshair
        ├── section-header.tsx    # SectionHeader, TitleAccent, SectionAsideCopy
        ├── avatar-stack.tsx
        ├── hero/                 # HeroSection, HeroCopy, DeckCard + 3 product cards
        ├── about/                # AboutSection + image, quote and stats tiles
        ├── features/             # FeaturesSection bento: BentoTile + one file per tile
        ├── how-it-works/         # StepAccordion (client) + PreviewWindow mockups
        └── testimonials/         # TestimonialsSection, TestimonialCard
```

**Server and client components.** Everything is a server component except `StepAccordion`. Its preview mockups are rendered on the server and passed in as props.

**Page order**: header → hero → about → features → how it works → testimonials → CTA → footer.

### 4.2 Typography

The root layout supplies Inter, the body face. [`fonts.ts`](src/modules/home/lander/ui/fonts.ts) loads the other faces only on the landing page, and the `@theme inline` block in [`globals.css`](src/app/globals.css) registers them as utilities:

| Utility         | Face                        | Use                                          |
| :-------------- | :-------------------------- | :------------------------------------------- |
| `font-tight`    | Inter Tight                 | Headings, titles, card labels                |
| `font-playfair` | Playfair Display italic 500 | Accent words in headings, section labels     |
| `font-serif`    | Instrument Serif            | The `< 30s` display metric                   |
| `font-dm-mono`  | DM Mono                     | Uppercase kickers, timestamps, mockup labels |
| `font-hand`     | Caveat                      | The handwritten hero annotation              |

Sizes use the default scale only. The floor is `text-xs`, including in the decorative product mockups. Common patterns:

| Element               | Classes                                                           |
| :-------------------- | :---------------------------------------------------------------- |
| Hero headline         | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`        |
| Section title         | `text-4xl md:text-5xl xl:text-6xl leading-tight tracking-tighter` |
| Step / feature titles | `text-4xl xl:text-5xl` / `text-2xl lg:text-3xl`                   |
| Body / aside copy     | `text-sm` / `text-base leading-relaxed`                           |
| Mono kicker           | `font-dm-mono text-xs tracking-widest uppercase`                  |

**Accent words** in headings use `TitleAccent` (`font-playfair font-medium italic text-blue-600`). Pass `text-white` on the blue backgrounds.

### 4.3 Color

The landing uses the default Tailwind palette, with no custom color tokens:

| Role                  | Classes                                                         |
| :-------------------- | :-------------------------------------------------------------- |
| Headings / dark tiles | `text-slate-900`, `bg-slate-900`                                |
| Body / muted text     | `text-slate-600`, `text-slate-500`, `text-slate-400`            |
| Accent                | `text-blue-600`, `bg-blue-600`                                  |
| Page canvas           | `bg-blue-50`                                                    |
| Cards / borders       | `bg-white`, `bg-slate-50`, `border-slate-200`                   |
| Hero sky              | `bg-linear-to-b from-blue-500 via-blue-300 via-70% to-blue-200` |
| CTA sky               | `bg-linear-to-b from-blue-500 via-blue-400 via-70% to-blue-300` |
| Frame guides          | `border-blue-900/15` (lines), `bg-blue-900/50` (crosshairs)     |
| Hero cards            | `bg-sky-100` behind the card image                              |

### 4.4 Layout

- **Frame**: all content sits in `FrameWrap`, a `max-w-6xl` column with `px-7`, inset from the viewport by `px-3.5 md:px-6`. `FrameEdges` draws the hairline guides as a `border-x` on the same box, so guides and content always line up. `FrameDivider` is a full-bleed rule with crosshairs at the frame edges.
- **Breakpoints**: `md` switches the header and hero details. `lg` collapses grids to one column, stacks section headers and turns the step accordion into a vertical disclosure list.
- **Rhythm**: sections use `py-20 lg:py-32`, section headers `mb-11`, grid gaps `gap-4`, and cards `rounded-2xl` or `rounded-3xl`.
- **Hero deck**: the three cards are bottom-anchored (`-bottom-60 xl:-bottom-48`) and fanned out with `translate-x-3/4` and `rotate-6`. They sit between the rear and front cloud banks via `z-20`/`z-30`/`z-40`.
- **Step accordion**: collapsed steps are `lg:basis-22 lg:grow-0`. The open step animates to `lg:grow`, and steps open on hover on hover-capable desktops. Click stays available for touch and keyboard users.

### 4.5 Motion

All animation uses [`motion`](https://motion.dev) (`motion/react`). Everything lives in `ui/components/motion/`, so the page moves with one rhythm:

| File                                                   | What it provides                                                                                                                                                                                                                      |
| :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `transitions.ts`                                       | `EASE` (`out`, `inOut`, `standard`), `DURATION` (`fast` 0.25s, `base` 0.5s, `slow` 0.8s), `TRANSITION` presets (`fast`, `base`, `slow`, `expand`, `pop`, `hover`), and the `ambientLoop()` / `pulseLoop()` helpers for endless motion |
| `variants.ts`                                          | Entrance variants (`fadeUp`, `pop`, `stagger()`) and hover variants (`lift`, `zoom`, `shine`, `nudgeX`, `nudgeY`)                                                                                                                     |
| `reveal.tsx`                                           | `Reveal`, `RevealGroup`, `RevealItem`: scroll-triggered (or `immediate`) fade-up entrances                                                                                                                                            |
| `hover.tsx`                                            | `MotionLink` (hover/press-aware `next/link`), `HoverGroup`, `NudgeOnHover`, `ZoomOnHover`, `ShineOnHover`                                                                                                                             |
| `count-up.tsx`, `typewriter.tsx`, `drifting-cloud.tsx` | Number count-up, typing text and `Caret`, and ambient drifting clouds                                                                                                                                                                 |
| `landing-motion-provider.tsx`                          | `MotionConfig reducedMotion="user"` around the page                                                                                                                                                                                   |

**Hover pattern.** A parent sets `initial="rest" whileHover="hover"` (`MotionLink`, `HoverGroup` and `BentoTile` all do), and any descendant using a hover variant reacts automatically, with no state. For example, `<MotionLink>Try it <NudgeOnHover><ArrowRight /></NudgeOnHover></MotionLink>`. `LandingButton` adds `ShineOnHover` (a light sweep) to its glass and dark variants automatically, so wrap a `MotionLink` with `asChild` and the shine plays on hover.

**Choosing a transition.** Use `fast` for small state changes, `base` for content appearing, `slow` for section reveals, `expand` for panels changing size, `pop` for chips and tags, and `hover` for lifts and presses. Looping ambient motion (clouds, caret, waveform) uses `ambientLoop`, and pulses (voice rings) use `pulseLoop`.

### 4.6 Accessibility

- Decorative layers are `aria-hidden`: clouds, frame guides, the hero card deck, the preview mockups and the testimonial arrows.
- Accordion tabs are buttons with `aria-expanded` and `aria-controls`, and each panel is a labelled `region`. Prev/next buttons have `aria-label`s.
- Buttons have an explicit `focus-visible` outline; links keep the browser default focus ring (never remove it).

### 4.7 Dark Mode

The landing page is light-only for now. Dark mode is deferred.

---

## 5. Dashboard & Application UI Principles

To ensure an enterprise-grade user experience and maintain visual restraint across dashboard modules, all interface implementations must adhere to the following rules:

### 1. Single Source of Truth for Page Headings (No Duplicate Titles)

- When the persistent top navigation bar / breadcrumb already displays the current section title (e.g. `Meetings`, `Agents`), the page view **MUST NOT** render a duplicate top heading or masthead.
- Redundant headings waste vertical real estate and introduce clutter. The page body should immediately transition into the action toolbar (search, filters, primary actions) and core data tables.

### 2. Form Control & Overlay Selection (Avoid Dialog Overkill)

- **Filters & Selectors**: Dropdown filters (e.g., status, agent, category) **MUST** use native inline shadcn `Select` (`SelectTrigger`, `SelectValue`, `SelectContent`, `SelectGroup`, `SelectItem`) with `position="popper"`.
- **No Modal Dialogs for Selection**: Never open a full modal dialog or drawer for simple single-choice selection. Modal popups for filters interrupt user flow and introduce unnecessary interaction friction.
- **No Nested Modals**: Modals containing form inputs (e.g. `NewMeetingDialog`) must use inline `Select` components for related entity choices, never launching a secondary modal or command drawer inside the dialog.
- **Dialog Scoping**: Native shadcn `Dialog` is reserved strictly for complex creation workflows, dedicated multi-field forms, destructive confirmations (`AlertDialog`), and the global command palette (`Cmd+K`).

### 3. Elimination of Superfluous Dot Elements & Fake Statuses (Anti-Dot & Anti-Sparkle Rule)

- **Strict Prohibition of "Ready" Statuses & Blinking Dots**: Never add a synthetic "Ready", "Online", or "Active" badge with an animated pulse/ping dot (`animate-pulse`, `animate-ping`, `size-1 rounded-full`, `size-1.5 rounded-full`) to static entities such as AI agents, bots, or configurations. Status badges are strictly restricted to entities with genuine, dynamic runtime lifecycles (e.g., meeting states: `upcoming`, `active`, `processing`, `completed`, `cancelled`). Static assets must display their clean entity name and identifiers without fake status indicators.
- **No Superfluous Sparkle / Magic Icons on System Prompts**: Never attach decorative `SparklesIcon` or "AI magic" stars to standard labels, table columns, or prompt containers (such as `Instructions`, `System Prompt`, or markdown previews). Use understated, objective editorial typography (`Instructions`, `System Prompt`) with clean font-mono tracking and neutral text styling without distracting decorative iconography.
- **Icon-Driven Status for Live States**: Real status indicators must rely on clean, recognizable semantic icons (e.g. `ClockArrowUpIcon`, `VideoIcon`, `CircleCheckIcon`, `LoaderIcon`) combined with subtle semantic color classes (`border-emerald-500/25 bg-emerald-500/10 text-emerald-700`). Redundant dot indicators next to icons are strictly forbidden.
- **Pinging Animations Scope**: Pulsing/pinging indicators (`animate-ping`) are reserved exclusively for live hardware recording feeds or active WebRTC streams. For loading states, use standard accessible spinners (`Loader2Icon animate-spin`) or shadcn `Skeleton`.

### 4. Typography Restraint & Capitalization Rules

- **No Universal Uppercase**: Do not indiscriminately apply `uppercase` and wide tracking (`tracking-wider`, `tracking-widest`) to standard UI components, buttons, select options, badges, or headers.
- **Sentence and Title Case**: All interface actions, navigation links, button labels, and dropdown items must use standard Sentence Case or Title Case (e.g., `New meeting`, `All statuses`, `Processing`, `Completed`, `Reset filters`).
- **Monospace Telemetry Scope**: Monospace fonts (`font-mono`) and uppercase treatments are strictly reserved for raw telemetry data, system timestamps, cryptographic protocol hashes, or unit abbreviations (e.g., `184 ms`, `48kHz OPUS`).

### 5. Official shadcn/ui Composition Patterns

- **Structural Groups**: Items must always be rendered within their parent group container (e.g. `SelectItem` inside `SelectGroup`, `DropdownMenuItem` inside `DropdownMenuGroup`).
- **Accessible Overlays**: Overlay components (`Dialog`, `Sheet`, `Drawer`) must always include accessible `DialogHeader`, `DialogTitle`, and `DialogDescription` directly inside `DialogContent`. Use `className="sr-only"` when visually hidden.
- **Semantic Theme Tokens**: All styles must use project semantic color tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`) without hardcoded arbitrary hex values.
- **Decoupling Brand Identity from UI Accent**: The brand blue is encapsulated strictly within `--brand` (`text-brand`, `bg-brand`, `border-brand`). The shadcn `--accent` token is reserved exclusively for soft neutral hover/focus highlight states on dropdown items (`SelectItem`), menus, and ghost buttons (`bg-accent`, `text-accent-foreground`). Never assign bold brand colors to `--accent` to prevent harsh hover overlays on standard controls.

### 6. Action Menus & Popover Overlays (Three-Dot Menu Specification)

To maintain consistent tactile quality and sharp contrast across light and dark modes, all table and card action menus must adhere to the standardized popover pattern:

- **Horizontal Trigger (`MoreHorizontalIcon`)**: Action menu trigger buttons must use the horizontal three-dot icon (`MoreHorizontalIcon`, `size-4`), styled with `Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 data-[state=open]:bg-muted data-[state=open]:text-foreground transition-colors"`. The `data-[state=open]` state ensures the button remains visually anchored while the menu is open.
- **Card Surface Contrast & Elevation**: Popover containers (`DropdownMenuContent`) must render with elevated card surface tokens and blur: `className="border-border/80 bg-card/98 text-card-foreground min-w-[180px] rounded-xl p-1.5 shadow-xl backdrop-blur-md dark:bg-card/90"`. Avoid raw, unstyled `bg-popover` on light themes, as it blends into the paper canvas background.
- **Offsets & Alignment**: Set `sideOffset={6}` and `align="end"` to position the menu neatly below the trigger.
- **Group Hierarchy**: Group standard actions inside `<DropdownMenuGroup>`, followed by a hairline divider `<DropdownMenuSeparator className="bg-border/60 my-1" />`, and isolate destructive actions inside a secondary `<DropdownMenuGroup>`.
- **Item Ergonomics**: Each item uses `className="hover:bg-accent focus:bg-accent text-foreground cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors"`, accompanied by `size-3.5 text-muted-foreground` semantic icons.
- **Sentence Case Actions**: Labels must follow sentence case (e.g. `View details`, `Configure agent`, `Schedule meeting`, `Copy agent ID`, `Delete agent`).
- **Native Destructive Variant**: Destructive actions must use the shadcn native `variant="destructive"` prop on `DropdownMenuItem` rather than ad-hoc color classes.

### 7. Minimization of Borders & Hairline Framing (The Subtle Definition Rule)

To prevent visual clutter, harsh grids, and "box-inside-a-box" fatigue without leaving components blurry or ungrounded, interface layouts must minimize borders through delicate hairline framing (`border-border/40` to `border-border/50`) paired with color hierarchy:

- **No Nested Outer Containers for Card Grids**: Entity card grids (such as AI agents) must live directly on the page layout. Do not encapsulate an entire grid of cards inside another outer bordered container with a bordered sub-header.
- **Hairline Framing Over Thick Borders**: Use subtle, translucent borders (`border border-border/40` or `border border-border/50`) on cards, search controls, and modals. This gives components crisp structural edges without high-contrast black strokes.
- **Elimination of Arbitrary Internal Divider Lines**: Do not draw arbitrary rule dividers (`border-t`, `border-b`) inside cards to separate content from footers or metadata. Rely on structural flexbox whitespace (`pt-1`, `mt-auto`) to define section boundaries naturally.
- **No Avatar Ring Overkill**: Do not wrap avatar elements in redundant rings (`ring-1 ring-border`). Avatars already possess distinct geometry and background contrast.
- **Subtle Metadata Badges**: Render secondary badges (e.g. meeting counts, counts, telemetry chips) as soft tinted pills with hairline borders (`bg-muted/50 border border-border/40 text-secondary`) rather than harsh high-contrast tags.
- **Delicate Segmented Controls**: Segmented toggles (e.g. Grid vs Table switcher) use soft containers (`bg-muted/40 border border-border/40 p-0.5 rounded-lg`) with elevated active pills (`bg-card border border-border/30 shadow-2xs text-foreground font-semibold`).
- **Refined Dialogs & Modals Framing**:
  - Modal windows (e.g. `NewAgentDialog`, `UpdateAgentDialog`, `AlertDialog`) use delicate hairline framing (`border border-border/50`), deep drop shadow (`shadow-2xl sm:rounded-2xl`), and backdrop blur (`backdrop-blur-xl`).
  - Inputs and textareas inside dialogs use a soft background trough with delicate borders (`bg-muted/20 border border-border/50 hover:border-border/80 focus:border-ring focus:bg-background`), ensuring tactile affordance without harsh stroke weight.
  - Interactive starter template chips use subtle pill borders: delicate idle pills (`bg-muted/40 border border-border/40 text-secondary hover:text-foreground hover:bg-muted/70 hover:border-border/60`) that switch to solid primary contrast (`bg-primary text-primary-foreground border border-primary shadow-2xs font-semibold`) when selected.
- **Dashboard Canvas vs Sidebar Hierarchy (The Standard SaaS Contrast Rule)**:
  - The navigation sidebar is the grounded, recessed column (`--sidebar: #f5f5f4` in light mode, `#0b0b0c` in dark mode).
  - The main dashboard canvas is the bright, focused workspace (`--background: #fafafa` in light mode, `#121213` in dark mode).
  - Content cards sit elevated on the canvas (`--card: #ffffff` in light mode, `#18181a` in dark mode) with subtle hairline borders (`border-border/50`).
  - Active navigation buttons inside the sidebar pop cleanly via elevated card styling (`bg-card border-border shadow-2xs`).

### 8. Anti-Fabrication & Text Restraint (Honest Data Architecture)

- **Zero Tolerance for Fake Specs or Pipelines**: Never invent speculative technical specifications, simulated hardware meters, or fake integration badges (e.g. fake "WebRTC Voice Stream Connected", fake "Meeting Synthesis Active", or hardcoded "Gemini 2.5 Flash" model tags) that do not exist in the database schema or active backend procedures. If a property is not part of the entity's real state, it must not be rendered.
- **Eliminate Explanatory Copy Bloat**: Do not pad detail views with redundant, generic marketing descriptions (e.g., explaining what system instructions do or narrating why an agent exists). Entity pages should be utilitarian, focused, and concise.
- **Show Genuine Related Data**: Prioritize authentic relationships from the data model—such as querying and displaying real meetings associated with an entity—over static, fabricated visual widgets.

### 9. Auth Pages (Sign-in & Sign-up)

Auth pages are the one application surface that uses the **landing look** (§4), so the hand-off from "Start free" feels continuous.

- `src/app/(auth)/layout.tsx` renders the hero sky: the blue gradient and the cloud banks (no small drifting clouds, no frame-guide hairlines). It loads the landing fonts and wraps the page in `LandingMotionProvider`.
- **No page chrome and no scrolling.** There is no top nav; a single glass back button (icon only, `ArrowLeft`, labelled with `AUTH_NAV.backHome`) floats at the very top-left and returns to the home page. The root is `h-svh` + `overflow-hidden` and `main` clips too, so neither page can scroll — keep vertical padding and control heights tight enough for a 1366×640 viewport.
- Both routes render one centred card through `AuthShell`: a frosted glass frame around a white panel, with a `SparkleTile` that links home, a `font-tight` heading with a `TitleAccent` word, the form, and a `bg-slate-50` footer linking to the other page. `size="md"` (sign-in) is `max-w-md`; `size="lg"` (sign-up) is `max-w-xl` with name and email paired in one row.
- The submit button is `LandingButton variant="dark"` (`AuthSubmitButton`, `h-11`) with the shine and arrow nudge; social buttons and fields are `h-10`.
- **Light only.** The layout root carries `.theme-light`, which re-declares the light tokens and disables `dark:` variants for its subtree, so shared shadcn fields stay legible when the app is in dark mode. Use it for any future subtree that must stay light.
- Copy, routes, `MIN_PASSWORD_LENGTH` and the post-auth destination (`AUTH_REDIRECT`) live in `src/modules/auth/constants.ts`. Email, password and OAuth flows all redirect there.
- Sign-up asks only for name, email and password; the show/hide toggle replaces a confirm-password field.
- Fields carry `name`, a real `<label>` and `autoComplete` (`email`, `name`, `current-password`, `new-password`). Request errors render through `AuthFormError` (`role="alert"`). No metrics, model names or infrastructure details on these pages.

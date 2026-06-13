---
name: MeetMind
colors:
  surface: "oklch(1 0 0)"
  surface-dim: "oklch(0.97 0 0)"
  surface-bright: "oklch(1 0 0)"
  surface-container-lowest: "oklch(1 0 0)"
  surface-container-low: "oklch(0.985 0 0)"
  surface-container: "oklch(0.97 0 0)"
  surface-container-high: "oklch(0.922 0 0)"
  surface-container-highest: "oklch(0.708 0 0)"
  on-surface: "oklch(0.145 0 0)"
  on-surface-variant: "oklch(0.556 0 0)"
  inverse-surface: "oklch(0.145 0 0)"
  inverse-on-surface: "oklch(0.985 0 0)"
  outline: "oklch(0.922 0 0)"
  outline-variant: "oklch(0.97 0 0)"
  surface-tint: "oklch(0.205 0 0)"
  primary: "oklch(0.205 0 0)"
  on-primary: "oklch(0.985 0 0)"
  primary-container: "oklch(0.922 0 0)"
  on-primary-container: "oklch(0.145 0 0)"
  inverse-primary: "oklch(0.985 0 0)"
  secondary: "oklch(0.97 0 0)"
  on-secondary: "oklch(0.205 0 0)"
  secondary-container: "oklch(0.922 0 0)"
  on-secondary-container: "oklch(0.145 0 0)"
  tertiary: "oklch(0.97 0 0)"
  on-tertiary: "oklch(0.205 0 0)"
  tertiary-container: "oklch(0.922 0 0)"
  on-tertiary-container: "oklch(0.145 0 0)"
  error: "oklch(0.577 0.245 27.325)"
  on-error: "oklch(0.985 0 0)"
  error-container: "oklch(0.704 0.191 22.216)"
  on-error-container: "oklch(0.985 0 0)"
  primary-fixed: "oklch(0.205 0 0)"
  primary-fixed-dim: "oklch(0.145 0 0)"
  on-primary-fixed: "oklch(0.985 0 0)"
  on-primary-fixed-variant: "oklch(0.97 0 0)"
  secondary-fixed: "oklch(0.97 0 0)"
  secondary-fixed-dim: "oklch(0.922 0 0)"
  on-secondary-fixed: "oklch(0.205 0 0)"
  on-secondary-fixed-variant: "oklch(0.145 0 0)"
  tertiary-fixed: "oklch(0.97 0 0)"
  tertiary-fixed-dim: "oklch(0.922 0 0)"
  on-tertiary-fixed: "oklch(0.205 0 0)"
  on-tertiary-fixed-variant: "oklch(0.145 0 0)"
  background: "oklch(1 0 0)"
  on-background: "oklch(0.145 0 0)"
  surface-variant: "oklch(0.97 0 0)"
typography:
  display:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-md:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 20px
  label-sm:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
rounded:
  sm: "calc(0.625rem - 4px)"
  DEFAULT: "0.625rem"
  md: "calc(0.625rem - 2px)"
  lg: "0.625rem"
  xl: "calc(0.625rem + 4px)"
  full: "9999px"
spacing:
  base: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  container-padding: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.md}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.md}"
  card-base:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  input-field:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.sm}"
    borderColor: "{colors.outline}"
---

## Brand & Style

The MeetMind design system represents a sleek, professional, and intelligent approach to virtual meetings and AI orchestration. The style embraces a minimalist, high-contrast aesthetic typical of the "New York" shadcn/ui design language.

The primary goal is to minimize cognitive load while presenting complex AI data, transcriptions, and meeting summaries in a highly legible format. The brand personality is functional, razor-sharp, and unobtrusive, allowing the user to focus on their meetings and AI interactions.

## Colors

The palette is built on stark contrasts using OKLCH color spaces, ensuring accessible luminance out-of-the-box. It intentionally avoids saturated primary colors in favor of a sophisticated monochrome spectrum, using color exclusively for semantic meaning (like destructive actions) or data visualization.

- **Primary:** Near-black `oklch(0.205 0 0)` on white backgrounds to create high-contrast focal points.
- **Backgrounds:** Pure white `oklch(1 0 0)` to provide a clean canvas for video streams and text-heavy summaries.
- **Accents:** Muted light grays `oklch(0.97 0 0)` for secondary actions and structural separation, maintaining a calm, un-opinionated UI.
- **Destructive:** A vibrant, urgent red `oklch(0.577 0.245 27.325)` used sparingly for destructive actions like ending calls or deleting agents.

## Typography

Typography in MeetMind is dense, modern, and pragmatic, optimizing for deep reading of AI-generated summaries and long meeting transcripts.

- **Legibility:** Medium and Semi-bold weights are employed for structural hierarchy, guiding the eye through long forms and agent configurations.
- **Density:** Tight letter-spacing (e.g., `-0.02em` on headlines) is used to create a more compact, refined look, typical of modern technical tools.
- **Data Display:** Monospaced elements or tabular figures should be utilized when displaying timestamps or numerical metrics inside the meeting dashboard.

## Layout & Spacing

The layout follows a structured, application-centric grid. Since MeetMind is a productivity tool, screen real estate is optimized for content density without feeling crowded.

- **Rhythm:** A 4px base scale governs all micro-spacing, while larger macro-sections jump in 8px increments.
- **Containers:** Dashboard views and meeting lists utilize generous padding (24px) but contain the content within constrained max-widths to maintain optimal line lengths for reading.
- **Modularity:** UI components are highly modular, cleanly separated by subtle 1px borders rather than heavy shadows or dramatic background shifts.

## Elevation & Depth

Depth is handled very subtly in MeetMind. We avoid heavy drop-shadows, preferring crisp borders and tonal background shifts to define hierarchy.

- **Surfaces:** Layers are defined by their border (`oklch(0.922 0 0)`) rather than shadow. A card sits on the surface flush but is defined by a crisp 1px outline.
- **Modals & Dialogs:** When an element must float above the UI (like a dialog or command palette), a very subtle, tight shadow and a background overlay (`oklch(1 0 0 / 80%)` with backdrop blur) are used to isolate context.
- **Interactive States:** Hover states use slight background darkening (`surface-dim`) rather than physical "lifting" effects, keeping the UI grounded and flat.

## Shapes

The shape language is slightly softened but retains a professional rigidity.

- **Radius Base:** The fundamental radius is `0.625rem` (10px). This provides a modern, friendly touch without becoming overly bubbly.
- **Components:** Interactive elements like buttons and inputs use the standard radius, while larger container cards use an extended `rounded-xl` to frame content elegantly.
- **Avatars:** User and AI Agent avatars are strictly rounded (`full`), creating visual distinction from the structurally rectangular cards and inputs.

### Data Visualization & Avatars

AI agents and users are represented with generated DiceBear avatars. The contrast between organic, rounded avatars and the sharp, monochrome UI creates a distinct visual hierarchy that makes speakers easily identifiable in the post-meeting chat and transcripts.

### AI Orchestration Elements

When displaying AI generation (e.g., "Summarizing meeting..."), we use subtle motion and localized loading states rather than blocking the entire screen. The interface remains interactive, reinforcing the platform's asynchronous, intelligent capabilities.

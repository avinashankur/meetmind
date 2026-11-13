// Copy and mock data for the marketing landing page. Components stay purely
// presentational; edit wording here.

export const LANDING_ROUTES = {
  signIn: "/sign-in",
  signUp: "/sign-up",
  agents: "/agents",
  meetings: "/meetings",
  howItWorks: "#how",
} as const;

export interface AvatarItem {
  label: string;
  /** Tailwind background class for the avatar circle. */
  className: string;
}

export const ATTENDEE_AVATARS: AvatarItem[] = [
  { label: "A", className: "bg-blue-500" },
  { label: "R", className: "bg-violet-500" },
  { label: "M", className: "bg-emerald-500" },
  { label: "+2", className: "bg-amber-500" },
];

/** Example agents, shown as a stack on the about section stats card. */
export const AGENT_AVATARS: AvatarItem[] = [
  { label: "N", className: "bg-linear-to-br from-blue-400 to-blue-600" },
  { label: "A", className: "bg-linear-to-br from-violet-400 to-violet-600" },
  { label: "I", className: "bg-linear-to-br from-emerald-400 to-emerald-600" },
  { label: "S", className: "bg-linear-to-br from-amber-400 to-amber-600" },
];

/* ------------------------------- Hero deck ------------------------------- */

export interface AgendaItem {
  time: string;
  duration: string;
  title: string;
  status: string;
  isLive?: boolean;
}

export const HERO_AGENDA: AgendaItem[] = [
  {
    time: "9:00",
    duration: "45m",
    title: "Roadmap sync",
    status: "Agent Nova · in 5m",
    isLive: true,
  },
  {
    time: "9:45",
    duration: "30m",
    title: "Sprint retro",
    status: "Transcript ready",
  },
  {
    time: "11:00",
    duration: "60m",
    title: "Client debrief",
    status: "Summary generated",
  },
];

export type ActionItemTag = "blue" | "green" | "red" | "purple";

export interface ActionItem {
  title: string;
  meta: string;
  tag: string;
  tone: ActionItemTag;
  done: boolean;
}

export const HERO_ACTION_ITEMS: ActionItem[] = [
  {
    title: "Deploy Neon PostgreSQL schema",
    meta: "Alex · Done",
    tag: "Backend",
    tone: "blue",
    done: true,
  },
  {
    title: "Verify Stream webhook handlers",
    meta: "Maria · Done",
    tag: "Webhooks",
    tone: "green",
    done: true,
  },
  {
    title: "Benchmark Realtime voice latency",
    meta: "Priority · In progress",
    tag: "High",
    tone: "red",
    done: false,
  },
  {
    title: "Export Markdown meeting recap",
    meta: "Due today",
    tag: "Summary",
    tone: "purple",
    done: false,
  },
];

/** Progress segments shown above the action items (filled / total). */
export const HERO_ACTION_PROGRESS = { filled: 4, total: 7 } as const;

export interface SpeakerShare {
  name: string;
  share: number;
  /** Stroke class for the donut segment. */
  strokeClassName: string;
  /** Background class for the legend dot. */
  dotClassName: string;
}

export const HERO_SPEAKERS: SpeakerShare[] = [
  {
    name: "Alex",
    share: 48,
    strokeClassName: "stroke-blue-600",
    dotClassName: "bg-blue-600",
  },
  {
    name: "Nova",
    share: 32,
    strokeClassName: "stroke-violet-500",
    dotClassName: "bg-violet-500",
  },
  {
    name: "Sarah",
    share: 20,
    strokeClassName: "stroke-emerald-500",
    dotClassName: "bg-emerald-500",
  },
];

/* --------------------------------- About --------------------------------- */

export interface StatValue {
  value: number;
  /** Decimal places to show while counting up. */
  decimals?: number;
  suffix?: string;
}

export const ABOUT_STATS = {
  tailored: { value: 100, suffix: "%" },
  accuracy: { value: 99.4, decimals: 1, suffix: "%" },
  minutes: { value: 3.8, decimals: 1, suffix: "M+" },
  agents: { value: 24000, suffix: "+" },
} satisfies Record<string, StatValue>;

export const ABOUT_QUOTE = {
  lead: "We gave our agent our sprint template and guidelines. It joined the call, followed our exact instructions, and answered questions in",
  accent: "chat days later.",
  name: "Anika Rao",
  role: "Engineering Lead",
  initials: "AR",
};

/* ------------------------------- Features -------------------------------- */

/** What the voice agent says out loud in the call. */
export const VOICE_LINE = "Two decisions so far. Want a quick recap?";

export type TechIcon =
  | "nextjs"
  | "trpc"
  | "stream"
  | "openai"
  | "inngest"
  | "postgres"
  | "drizzle"
  | "betterauth";

/** The infrastructure MeetMind runs on, shown in the tech tile. */
export const TECH_STACK: { label: string; icon: TechIcon }[] = [
  { label: "Next.js", icon: "nextjs" },
  { label: "tRPC", icon: "trpc" },
  { label: "Stream Video & Chat", icon: "stream" },
  { label: "OpenAI Realtime", icon: "openai" },
  { label: "Inngest", icon: "inngest" },
  { label: "Neon PostgreSQL", icon: "postgres" },
  { label: "Drizzle ORM", icon: "drizzle" },
  { label: "Better Auth", icon: "betterauth" },
];

/* ------------------------------ How it works ----------------------------- */

export type StepPreview = "invite" | "talk" | "recap";

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  preview: StepPreview;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: "01",
    title: "Instruct & Invite",
    description:
      "Give your agent a role, name, and custom instructions or templates. Then send it into your video call with one click to join as an active participant.",
    preview: "invite",
  },
  {
    number: "02",
    title: "Talk",
    description:
      "Focus on your conversation while your agent listens live, following your custom guidelines to capture what matters most to your team.",
    preview: "talk",
  },
  {
    number: "03",
    title: "Recap & Chat",
    description:
      "Get notes and action items structured to your exact instructions within seconds. Your agent stays in chat to answer questions whenever you need.",
    preview: "recap",
  },
];

/** Step 01 — the agent being configured, then sent into a meeting. */
export const AGENT_DRAFT = {
  name: "Nova",
  role: "Engineering scribe",
  instructions:
    "Follow our RFC template. Flag blockers before the recap and log every decision with its owner.",
  skills: ["RFC template", "Blockers", "Decisions", "Owners"],
  meeting: { title: "Roadmap sync", time: "Thu · 9:00" },
};

export interface TranscriptLine {
  speaker: string;
  initials: string;
  avatarClassName: string;
  text: string;
  /** What the agent tagged this line as, per its instructions. */
  tag: { label: string; tone: ActionItemTag };
}

/** Step 02 — the live transcript the agent annotates as people talk. */
export const LIVE_TRANSCRIPT: TranscriptLine[] = [
  {
    speaker: "Anika",
    initials: "AR",
    avatarClassName: "bg-blue-500",
    text: "Let’s lock the API contract before Friday.",
    tag: { label: "Decision", tone: "blue" },
  },
  {
    speaker: "Daniel",
    initials: "DM",
    avatarClassName: "bg-violet-500",
    text: "I’ll update the RFC today.",
    tag: { label: "Action · Daniel", tone: "green" },
  },
  {
    speaker: "Sara",
    initials: "SK",
    avatarClassName: "bg-emerald-500",
    text: "Staging is still on the old schema.",
    tag: { label: "Blocker", tone: "red" },
  },
];

/** Step 03 — the recap totals and a follow-up question in chat. */
export const RECAP_HIGHLIGHTS: {
  value: number;
  label: string;
  tone: ActionItemTag;
}[] = [
  { value: 3, label: "decisions", tone: "blue" },
  { value: 4, label: "actions", tone: "green" },
  { value: 1, label: "blocker", tone: "red" },
];

export const AGENT_CHAT = {
  question: "What did we decide about the API?",
  answer: "Lock the contract before Friday. Daniel is updating the RFC today.",
  citation: "12:04 · Anika",
};

/* ------------------------------ Testimonials ----------------------------- */

export type TestimonialIcon = "link" | "box" | "sun";

export interface Testimonial {
  context: string;
  icon: TestimonialIcon;
  quote: string;
  name: string;
  role: string;
  location: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    context: "Engineering sync",
    icon: "link",
    quote:
      "We set up an agent with our RFC template. It joined our sprint retro, followed our exact instructions, and delivered action items before we even opened our backlog.",
    name: "Anika Rao",
    role: "Engineering Lead",
    location: "San Francisco, California",
  },
  {
    context: "Client interview",
    icon: "box",
    quote:
      "I instructed our agent to track client pain points and pricing pushback. It joined the 45-minute call and recalled every detail when I asked questions days later.",
    name: "Daniel Mercer",
    role: "Head of Product",
    location: "Austin, Texas",
  },
  {
    context: "Weekly standup",
    icon: "sun",
    quote:
      "Our agent follows our exact documentation guidelines without us having to edit a single bullet point after the call.",
    name: "Sara Khan",
    role: "VP of Operations",
    location: "London, United Kingdom",
  },
];

/* --------------------------------- Footer -------------------------------- */

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "Product",
    links: [
      { label: "AI Agents", href: LANDING_ROUTES.agents },
      { label: "Meetings", href: LANDING_ROUTES.meetings },
      { label: "How It Works", href: LANDING_ROUTES.howItWorks },
    ],
  },
  {
    title: "Workspace",
    links: [
      { label: "Sign In", href: LANDING_ROUTES.signIn },
      { label: "Start Free", href: LANDING_ROUTES.signUp },
    ],
  },
  {
    title: "Technology",
    links: [
      { label: "Stream Video & Chat", href: "https://getstream.io" },
      {
        label: "OpenAI Realtime",
        href: "https://platform.openai.com/docs/guides/realtime",
      },
      { label: "Inngest Pipelines", href: "https://www.inngest.com" },
      { label: "Neon & Drizzle", href: "https://neon.com" },
      { label: "Better Auth", href: "https://www.better-auth.com" },
    ],
  },
];

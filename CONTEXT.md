# CONTEXT.md

> This file provides essential context for AI coding assistants and new contributors. It is intentionally dense — read fully before making changes.  
> **Last updated:** 2026-09-24

---

## What this is

MeetMind is an AI-powered meeting assistant web platform built with Next.js 16 App Router, React 19, and TypeScript. Users can create customizable AI agents, attach them to live WebRTC video meetings (powered by Stream Video and OpenAI Realtime API), record and transcribe conversations, automatically synthesize structured meeting summaries in the background (via Inngest and GPT-4o), and interactively converse with the agent post-meeting via Stream Chat.

---

## Tech Stack

| Layer                    | Technology                    | Version        | Notes                                                           |
| ------------------------ | ----------------------------- | -------------- | --------------------------------------------------------------- |
| **Language**             | TypeScript                    | 5.x            | Strict mode enabled                                             |
| **Frontend Framework**   | Next.js App Router            | 16.0.10        | React 19.2.0, Server and Client Components                      |
| **Styling & UI**         | Tailwind CSS v4 + Radix UI    | 4.x            | Design tokens in `globals.css`, shadcn/ui, Lucide React, Motion |
| **API Layer**            | tRPC                          | 11.7.2         | End-to-end typesafe API paired with `@tanstack/react-query`     |
| **Database & ORM**       | Neon PostgreSQL + Drizzle ORM | 0.45.0         | Serverless HTTP connection via `@neondatabase/serverless`       |
| **Database Tooling**     | Drizzle Kit                   | 0.31.8         | Schema migrations via `drizzle-kit push` and Studio             |
| **Authentication**       | Better Auth                   | 1.4.5          | Session cookies, Email/Password, GitHub, and Google OAuth       |
| **Video Infrastructure** | Stream Video SDK              | 1.18.0         | WebRTC calling, recording, live closed-captions, transcription  |
| **Realtime In-Call AI**  | Stream OpenAI Realtime API    | 0.1.4          | Low-latency bidirectional voice participant in calls            |
| **Chat Infrastructure**  | Stream Chat SDK               | 9.27.2         | Real-time channel messaging for post-meeting queries            |
| **Background Jobs**      | Inngest + Agent Kit           | 4.2.6 / 0.13.2 | Durable multi-step workflows with step memoization & retries    |
| **LLM Provider**         | OpenAI API                    | 6.15.0         | GPT-4o for meeting summarization and post-call Q&A              |
| **Transcript Parsing**   | jsonl-parse-stringify         | 1.0.3          | Parses raw Stream transcript JSONL files                        |

---

## Codebase Map

```
src/
├── app/                        # Next.js App Router routes & API endpoints
│   ├── (auth)/                 # Auth routes (sign-in, sign-up)
│   ├── (dashboard)/            # Authenticated user dashboard (agents, meetings, settings)
│   ├── call/[id]/              # Active video meeting room & lobby
│   ├── api/auth/[...all]/      # Better Auth route handler
│   ├── api/inngest/            # Inngest event serving route
│   ├── api/trpc/[trpc]/        # tRPC HTTP batch endpoint
│   ├── api/webhook/            # Stream Video and Chat signed webhook handler
│   └── globals.css             # Semantic theme tokens, canvas styles, Tailwind v4 imports
├── components/                 # Shared UI components (shadcn/ui primitives, modals, buttons)
├── constants.ts                # Pagination defaults (DEFAULT_PAGE, DEFAULT_PAGE_SIZE)
├── db/
│   ├── index.ts                # Neon HTTP database client initialization
│   └── schema.ts               # Drizzle schema (user, session, account, agents, meetings)
├── hooks/                      # Shared custom React hooks
├── inngest/
│   ├── client.ts               # Inngest client definition
│   └── functions.ts            # meetings-processing durable pipeline
├── lib/
│   ├── auth.ts                 # Server Better Auth configuration
│   ├── auth-client.ts          # Client auth helper
│   ├── avatar.ts               # DiceBear avatar generator
│   ├── env.ts                  # Environment variable exports
│   ├── stream-video.ts         # Stream Video server SDK client & webhook verifier
│   ├── stream-chat.ts          # Stream Chat server SDK client
│   └── utils.ts                # Class merging utility (cn)
├── modules/                    # Feature-sliced application modules
│   ├── agents/                 # UI components, Zod schemas, and tRPC router for agents
│   ├── meetings/               # UI components, transcripts, Zod schemas, and tRPC router for meetings
│   ├── call/                   # Video call room layout, audio controls, and AI bot integration
│   ├── dashboard/              # Sidebar, navigation bar, command palette, stats
│   ├── home/                   # Marketing and landing pages
│   └── auth/                   # Login/registration view components
├── trpc/
│   ├── client.tsx              # tRPC React client provider
│   ├── init.ts                 # tRPC context creation & protectedProcedure middleware
│   ├── query-client.ts         # TanStack QueryClient configuration
│   ├── server.tsx              # Server-side tRPC caller
│   └── routers/
│       └── _app.ts             # Root tRPC router combining agents & meetings
└── types/                      # Global TypeScript definitions
```

---

## Key Patterns

**Adding or modifying a tRPC Procedure:**

1. Define input/output schemas with Zod in `src/modules/<feature>/schema.ts`.
2. Implement the procedure in `src/modules/<feature>/server/procedures.ts` using `protectedProcedure`.
3. If introducing a new feature router, mount it in `src/trpc/routers/_app.ts`.
4. In client components, call `trpc.<feature>.<procedure>.useQuery()` or `useMutation()`.

**Enforcing Multi-Tenant Data Isolation:**

- Always filter queries and mutations by `ctx.auth.user.id`:
  ```ts
  and(eq(table.id, input.id), eq(table.userId, ctx.auth.user.id));
  ```
- Never trust client-supplied user IDs.

**Stream Webhook Security & Dispatch:**

- All webhook requests hitting `src/app/api/webhook/route.ts` must pass cryptographic verification:
  ```ts
  streamVideo.verifyWebhook(body, signature);
  ```
- Short-running state changes (e.g. status updates) are processed directly in the webhook handler.
- Long-running operations (transcription parsing, AI summarization) MUST dispatch an Inngest event:
  ```ts
  inngest.send({
    name: "meetings/processing",
    data: { meetingId, transcriptUrl },
  });
  ```

**Background Workflow Execution (Inngest):**

- In `src/inngest/functions.ts`, wrap individual asynchronous operations in `step.run()` to guarantee memoization on retries:
  - Step 1: `fetch-transcript`
  - Step 2: `parse-transcript`
  - Step 3: `add-speakers` (resolves IDs from both `user` and `agents` tables)
  - Step 4: Run OpenAI Summarizer agent
  - Step 5: `save-summary` (commits summary to DB and updates status to `completed`)

**UI Styling & Theming:**

- Follow the design system defined in `DESIGN.md` and `src/app/globals.css`.
- Use semantic classes (`bg-background`, `text-foreground`, `text-accent`, `border-border`).
- Do NOT introduce raw arbitrary hex codes (`[#...]`) in component classes.

---

## Glossary

| Term                   | Definition                                                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Agent**              | A custom AI persona defined with a name and behavioral system instructions, persisted in the `agents` table.                                                     |
| **Meeting**            | A video session record linked to a user and an assigned agent, tracked through discrete statuses (`upcoming`, `active`, `processing`, `completed`, `cancelled`). |
| **Stream Video**       | External WebRTC cloud service that provides low-latency audio/video media routing, cloud recording, and automated transcription.                                 |
| **Stream Chat**        | External messaging infrastructure providing channels for real-time post-meeting conversational Q&A.                                                              |
| **Inngest Pipeline**   | An event-driven, durable execution engine that runs multi-step background jobs with automatic retry semantics and step caching.                                  |
| **Speaker Enrichment** | The process of mapping raw transcript speaker identifiers from Stream to real user names or agent personas from the database.                                    |
| **Meeting Summary**    | A structured Markdown document generated by GPT-4o containing an executive `### Overview` and timestamped `### Notes`.                                           |

---

## Key Invariants

- **Strict Tenant Scoping:** Users can only query, modify, or delete their own agents, meetings, and call transcripts.
- **Webhook Authenticity:** Every webhook received must contain valid `x-signature` and `x-api-key` headers validated against `STREAM_SECRET_KEY`.
- **Durable Summaries:** Summarization must never execute synchronously within HTTP handlers; all transcript processing must run through Inngest.
- **JSONL Transcript Structure:** Transcripts from Stream arrive in JSONL; always process line-by-line via `jsonl-parse-stringify`.
- **Secret Isolation:** Environment variables containing API keys (`STREAM_SECRET_KEY`, `OPENAI_API_KEY`, `BETTER_AUTH_SECRET`, `DATABASE_URL`) must never be prefixed with `NEXT_PUBLIC_` or imported into client components.

---

## What NOT to do

- **DO NOT** execute OpenAI LLM calls directly inside the Next.js webhook handler for transcripts — this will cause timeouts. Use Inngest.
- **DO NOT** bypass `protectedProcedure` for any route that accesses user data.
- **DO NOT** use `console.log` for production logging; handle errors with structured responses and `TRPCError`.
- **DO NOT** commit `.env` or write credentials into repository code.
- **DO NOT** hardcode avatar URLs; use the DiceBear generator helper in `src/lib/avatar.ts`.
- **DO NOT** query the database directly from UI client components; all client data access must pass through tRPC.

---

## Development Workflow

```bash
npm install           # Install project dependencies
npm run dev           # Start Next.js development server on http://localhost:3000
npm run dev:webhook   # Start ngrok tunnel for Stream webhooks
npm run db:push       # Push schema changes to Neon PostgreSQL via Drizzle Kit
npm run db:studio     # Launch Drizzle Studio web GUI
npm run lint          # Run ESLint validation
npm run format        # Run Prettier code formatting
```

Before committing:
Ensure `npm run lint` and `npm run format:check` pass cleanly.

---

## Gotchas

- **Stream Webhooks in Local Dev:** Stream cannot send webhook events to `localhost`. You MUST start the ngrok tunnel (`npm run dev:webhook`) and configure the resulting URL in your Stream Dashboard webhook configuration.
- **Inngest Local Testing:** To run Inngest functions locally during development, run `npx inngest-cli dev` in a separate terminal.
- **Dual Speaker Resolution:** Transcripts contain speaker IDs for both human participants (from the `user` table) and AI agents (from the `agents` table). Resolving speakers requires querying both tables.
- **Neon Serverless Driver:** The application uses `@neondatabase/serverless` over HTTP (`drizzle-orm/neon-http`). Long-lived TCP transactions are not supported; use atomic queries or Drizzle transaction utilities.

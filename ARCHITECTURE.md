# Architecture — MeetMind

> **Last updated:** 2026-09-24  
> **Authors:** MeetMind Engineering  
> **Status:** Current

## Overview

MeetMind is an AI-powered meeting assistant platform. It allows users to configure custom AI agents, attach those agents directly to live WebRTC video meetings as conversational participants, record and transcribe calls, automatically synthesize speaker-attributed summaries via multi-step background workflows, and interactively query meeting context post-call through real-time chat.

The system is built as a unified full-stack application using Next.js 16 App Router, React 19, TypeScript, tRPC, Drizzle ORM over Neon Serverless PostgreSQL, Stream Video & Chat SDKs, OpenAI (GPT-4o and Realtime API), and Inngest background orchestration.

---

## Level 1 — System Context

The system context diagram shows the high-level boundaries of MeetMind, its users, and all external systems with which it interacts.

```mermaid
flowchart TD
    User["User (Web Browser)"]
    MeetMind["MeetMind Platform\n(Next.js App Router, tRPC, Inngest)"]
    StreamVideo["Stream Video Cloud\n(WebRTC, Call Recording, Transcription)"]
    StreamChat["Stream Chat Cloud\n(Channels, Real-Time Messaging)"]
    OpenAI["OpenAI APIs\n(GPT-4o, Realtime API, Agent Kit)"]
    NeonDB[("Neon PostgreSQL\n(Serverless DB via Drizzle)")]
    OAuthProviders["OAuth Providers\n(GitHub, Google)"]

    User -->|"HTTPS / WebRTC (UI, Video, Chat)"| MeetMind
    User -.->|"WebRTC Media & Real-time Chat"| StreamVideo
    User -.->|"Channel Messaging"| StreamChat
    MeetMind -->|"Server SDK / Webhook Verifications"| StreamVideo
    MeetMind -->|"Channel & Token Management"| StreamChat
    MeetMind -->|"Background Summarization & Q&A"| OpenAI
    MeetMind -->|"SQL queries via Neon HTTP"| NeonDB
    MeetMind -->|"User Authentication"| OAuthProviders
    StreamVideo -->|"Webhooks (Call Start, Transcript Ready, Recording Ready)"| MeetMind
    StreamChat -->|"Webhooks (New Messages)"| MeetMind
    StreamVideo <-->|"Bidirectional Real-Time Audio"| OpenAI
```

### External Dependencies

| System              | Purpose                                                                     | Owner / Provider | Notes                                                                                            |
| ------------------- | --------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| **Stream Video**    | WebRTC media routing, recording, transcription, call participant management | Stream.io        | Generates signed webhooks when transcripts and recordings are ready.                             |
| **Stream Chat**     | Real-time meeting chat channels and post-call conversational threads        | Stream.io        | Webhooks trigger AI agent replies.                                                               |
| **OpenAI API**      | Realtime in-call conversational intelligence and post-meeting summarization | OpenAI           | GPT-4o Realtime API powers in-call voice; GPT-4o powers Inngest summary generation and chat Q&A. |
| **Neon PostgreSQL** | Serverless relational persistence                                           | Neon Database    | Accessed via `@neondatabase/serverless` and Drizzle ORM over HTTP.                               |
| **OAuth Providers** | Identity federation (GitHub, Google)                                        | GitHub / Google  | Handled through Better Auth plugin system.                                                       |
| **Inngest Cloud**   | Durable background workflow execution and event broker                      | Inngest          | Executes asynchronous jobs with automatic retries and step memoization.                          |

---

## Level 2 — Containers

The container diagram illustrates the deployable units that make up the MeetMind architecture, client applications, data stores, and backend runtime environments.

```mermaid
flowchart TB
    subgraph ClientLayer["Client Layer"]
        Browser["Next.js Web Client\n(React 19, Stream Video/Chat SDK, TanStack Query)"]
    end

    subgraph AppServer["Next.js App Server (Node.js / Edge Runtime)"]
        Pages["App Router UI & SSR\n(src/app)"]
        AuthHandler["Better Auth Engine\n(src/lib/auth.ts, /api/auth/*)"]
        TRPCRouter["tRPC API Router\n(src/trpc/routers/_app.ts)"]
        WebhookHandler["Stream Webhook Ingress\n(src/app/api/webhook/route.ts)"]
        InngestRoute["Inngest Event Endpoint\n(src/app/api/inngest/route.ts)"]
    end

    subgraph BackgroundLayer["Async Execution Layer"]
        InngestWorker["Inngest Runner\n(src/inngest/functions.ts)"]
    end

    subgraph DataStorage["Data & State Storage"]
        Postgres[("Neon Serverless PostgreSQL\n(users, accounts, sessions, agents, meetings)")]
    end

    subgraph ThirdPartyCloud["External Cloud Services"]
        StreamCloud["Stream Video & Chat Infrastructure"]
        OpenAICloud["OpenAI Platform (GPT-4o)"]
    end

    Browser -->|"HTTP / SSR / Hydration"| Pages
    Browser -->|"tRPC Queries & Mutations"| TRPCRouter
    Browser -->|"Auth Flows"| AuthHandler
    Browser <-->|"WebRTC Media & Chat"| StreamCloud

    TRPCRouter -->|"Drizzle ORM Queries"| Postgres
    AuthHandler -->|"Session & User Storage"| Postgres
    TRPCRouter -->|"Create Call / Issue Tokens"| StreamCloud

    StreamCloud -->|"Signed HTTP Webhooks"| WebhookHandler
    WebhookHandler -->|"Dispatch Inngest Events"| InngestRoute
    WebhookHandler -->|"Respond in Chat (OpenAI)"| OpenAICloud
    WebhookHandler -->|"Update Call Status"| Postgres

    InngestRoute --> InngestWorker
    InngestWorker -->|"Fetch Transcripts"| StreamCloud
    InngestWorker -->|"Enrich Speakers / Read DB"| Postgres
    InngestWorker -->|"Generate Summary (Agent Kit)"| OpenAICloud
    InngestWorker -->|"Persist Summary & Mark Completed"| Postgres
```

### Container Inventory

| Container                  | Technology                                                     | Responsibility                                                                              | Scaling Model                                              |
| -------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Next.js Web Client**     | React 19, Tailwind CSS v4, shadcn/ui, Radix UI, TanStack Query | Renders dashboard, agent management, active video calls, and post-meeting chat.             | Distributed via browser / CDN static assets.               |
| **Next.js Server Runtime** | Node.js 20, Next.js 16 App Router                              | Hosts SSR pages, tRPC endpoints, Better Auth routes, and webhook receiver.                  | Horizontally autoscaled (serverless / containerized).      |
| **Inngest Functions**      | Inngest SDK, `@inngest/agent-kit`                              | Handles transcript JSONL parsing, speaker mapping, and GPT-4o summarization.                | Serverless event-driven execution with step-level retries. |
| **Relational Database**    | Neon PostgreSQL 15+, Drizzle ORM                               | Stores user credentials, OAuth accounts, sessions, agent instructions, and meeting records. | Serverless auto-scaling compute and storage branching.     |

---

## Level 3 — Components

MeetMind follows a modular architecture where domain features are encapsulated within `src/modules/*` alongside shared core infrastructure.

```mermaid
flowchart LR
    subgraph Modules["Feature Modules (src/modules)"]
        AgentsMod["Agents Module\n- UI components & forms\n- tRPC procedures\n- Zod validation schemas"]
        MeetingsMod["Meetings Module\n- UI list/detail views\n- tRPC procedures\n- Token generators\n- Transcript viewers"]
        CallMod["Call Module\n- Stream call provider\n- Video lobby & room\n- AI participant listener"]
        ChatMod["Chat Module\n- Stream Chat client\n- Real-time Q&A interface"]
    end

    subgraph CoreServices["Shared Infrastructure (src/lib & src/db)"]
        DB["Drizzle DB Client\n(src/db/index.ts)"]
        Auth["Better Auth Core\n(src/lib/auth.ts)"]
        StreamLib["Stream SDK Wrappers\n(stream-video.ts, stream-chat.ts)"]
        AvatarGen["Avatar Generator\n(src/lib/avatar.ts)"]
    end

    subgraph APIPipeline["API Layer (src/trpc)"]
        TRPCInit["tRPC Init & Protected Context\n(src/trpc/init.ts)"]
        AppRouter["Root App Router\n(src/trpc/routers/_app.ts)"]
    end

    AgentsMod --> TRPCInit
    MeetingsMod --> TRPCInit
    TRPCInit --> AppRouter
    AgentsMod --> DB
    MeetingsMod --> DB
    MeetingsMod --> StreamLib
    MeetingsMod --> AvatarGen
    Auth --> DB
```

### Module Responsibilities

1. **`modules/agents`**:
   - Manages AI personas, names, system instructions, and avatar assignment.
   - Exposes `getMany`, `getOne`, `create`, `update`, and `remove` via tRPC.
2. **`modules/meetings`**:
   - Handles meeting lifecycle transitions (`upcoming` → `active` → `processing` → `completed` / `cancelled`).
   - Generates Stream Video and Stream Chat access tokens for authenticated attendees.
   - Fetches and formats speaker-attributed transcript JSONL logs.
3. **`modules/call`**:
   - Integrates `@stream-io/video-react-sdk` and initializes the camera, microphone, and participant layout.
   - Bridges OpenAI Realtime API into active Stream calls to support spoken AI participation.
4. **`inngest/functions.ts`**:
   - Ingests `meetings/processing` events triggered by Stream webhooks.
   - Executes durable multi-step pipelines: downloads transcript text, parses JSONL, matches speaker IDs against `user` and `agents` database tables, executes `@inngest/agent-kit` summarizer with GPT-4o, and commits summary data.
5. **`app/api/webhook/route.ts`**:
   - Verifies incoming Stream webhook cryptographic signatures (`x-signature`, `x-api-key`).
   - Dispatches call lifecycle events and handles live post-meeting Stream Chat messages, streaming conversational answers back into chat channels.

---

## Key Architectural Decisions

- **Full-Stack Next.js 16 Monorepo**: Consolidates frontend presentation, server components, tRPC API procedures, and webhook handlers into a single code repository and deployment unit.
- **Neon Serverless PostgreSQL + Drizzle ORM**: Combines lightweight HTTP serverless connection pooling with compile-time type-safe relational queries and migrations via `drizzle-kit`.
- **Stream Video + OpenAI Realtime Integration**: Offloads heavy WebRTC signaling, media mixing, STT transcription, and recording storage to Stream Cloud, while hooking directly into OpenAI Realtime API for low-latency in-call conversational voice.
- **Inngest for Asynchronous Processing**: Decouples heavy multi-step transcript parsing and LLM summarization from synchronous webhooks, guaranteeing step-level retries and preventing timeout failures.
- **Better Auth for Modular Authentication**: Provides database-backed sessions with type safety and native GitHub/Google OAuth support.
- **Stream Chat for Post-Meeting Collaboration**: Eliminates custom WebSocket chat infrastructure, allowing the AI agent to post answers directly into meeting channels via webhooks and GPT-4o.

---

## Data Flow — Key Scenarios

### Scenario 1: Live Video Call with AI Agent

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant Server as MeetMind Server
    participant Stream as Stream Cloud
    participant OpenAI as OpenAI Realtime API

    User->>Server: tRPC meetings.create(agentId, name)
    Server-->>User: meeting record
    User->>Server: tRPC call token request
    Server->>Stream: Register call & upsert participant/agent credentials
    Server-->>User: Return Stream Video token
    User->>Stream: Join WebRTC video call room
    Stream->>OpenAI: Establish Realtime Audio WebSocket session
    Stream->>Stream: Record call & generate live closed captions / transcription
    User->>Stream: User leaves / ends meeting
    Stream->>Server: POST /api/webhook (call.session_participant_left / call.ended)
    Server->>Server: Update meeting status to "processing"
```

### Scenario 2: Background Transcription & Summarization Pipeline

```mermaid
sequenceDiagram
    autonumber
    participant Stream as Stream Cloud
    participant Webhook as /api/webhook
    participant Inngest as Inngest Pipeline
    participant DB as Neon PostgreSQL
    participant OpenAI as OpenAI (GPT-4o)

    Stream->>Webhook: POST /api/webhook (call.transcription_ready)
    Webhook->>DB: Save transcriptUrl & set status = "processing"
    Webhook->>Inngest: Send event "meetings/processing"
    Inngest->>Stream: Step 1: Fetch raw JSONL transcript
    Inngest->>Inngest: Step 2: Parse JSONL lines
    Inngest->>DB: Step 3: Query user and agent tables to resolve speaker IDs
    Inngest->>OpenAI: Step 4: Run Summarizer Agent with enriched transcript
    OpenAI-->>Inngest: Formatted Markdown summary (Overview + Notes)
    Inngest->>DB: Step 5: Save summary to meeting & set status = "completed"
```

### Scenario 3: Post-Meeting AI Chat

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant StreamChat as Stream Chat Cloud
    participant Webhook as /api/webhook
    participant DB as Neon PostgreSQL
    participant OpenAI as OpenAI (GPT-4o)

    User->>StreamChat: Send message in meeting channel
    StreamChat->>Webhook: POST /api/webhook (message.new)
    Webhook->>Webhook: Verify signature & check sender is not agent
    Webhook->>DB: Load meeting summary and agent system instructions
    Webhook->>StreamChat: Fetch recent channel history (last 5 messages)
    Webhook->>OpenAI: Request completion with agent prompt + meeting summary + context
    OpenAI-->>Webhook: Generated response
    Webhook->>StreamChat: Post message as Agent in channel
    StreamChat-->>User: Push real-time message update to chat UI
```

---

## Infrastructure

| Environment               | Platform                       | Region                                 | Notes                                                                      |
| ------------------------- | ------------------------------ | -------------------------------------- | -------------------------------------------------------------------------- |
| **Local Development**     | Node.js 20, Next.js Dev Server | Localhost (`:3000`)                    | Uses `ngrok` tunnel (`npm run dev:webhook`) for receiving Stream webhooks. |
| **Database**              | Neon Serverless PostgreSQL     | AWS us-east-1 / eu-central-1           | Serverless HTTP driver (`@neondatabase/serverless`).                       |
| **Background Jobs**       | Inngest Cloud / Dev Server     | Global / Local (`npx inngest-cli dev`) | Orchestrates asynchronous workflow execution.                              |
| **Media & Chat**          | Stream Cloud                   | Global Edge                            | Handles WebRTC media routing, recording storage, and chat infrastructure.  |
| **Production Deployment** | Vercel / Docker Container      | Global Edge                            | Next.js server runtime with HTTPS termination.                             |

---

## Non-Functional Characteristics

| Property                     | Target                             | Current Mechanism                                                           |
| ---------------------------- | ---------------------------------- | --------------------------------------------------------------------------- |
| **Type Safety**              | End-to-end (100%)                  | TypeScript strict mode + tRPC router + Drizzle ORM schema + Zod validation. |
| **Media Latency**            | < 250ms audio/video                | Stream WebRTC peer mesh / SFU edge routing.                                 |
| **AI Voice Latency**         | < 800ms spoken turnaround          | OpenAI Realtime WebSocket connection managed directly by Stream Video.      |
| **Summarization Resilience** | Zero dropped jobs                  | Inngest step memoization and exponential backoff retry policies.            |
| **Security & Auth**          | Cryptographic webhook verification | Stream HMAC-SHA256 signature verification on all incoming webhook payloads. |

---

## Related Documents

- [CONTEXT.md](CONTEXT.md) — Architectural invariants, tech stack versions, and glossary for developers and AI agents.
- [README.md](README.md) — Project quickstart, installation guide, and environment variable configuration.
- [DESIGN.md](DESIGN.md) — Visual design tokens, paper canvas styling, and LED matrix specifications.
- [Architecture Decision Records](docs/adr/) — Historical log of technical decisions and trade-offs.
- [Runbooks](docs/runbooks/) — Operational guides for local development and failure recovery.
- [Concepts](docs/concepts/) — Algorithmic and theoretical deep-dives.

# MeetMind

MeetMind is an AI meeting assistant platform. It lets users create custom AI agents, attach those agents to video meetings, record and transcribe the conversation, generate an AI-written summary, and continue asking questions about the meeting after it ends.

The project is built as a modern full-stack Next.js application with a typed API layer, PostgreSQL persistence, Stream-powered video and chat, OpenAI-powered intelligence, and Inngest background processing.

## Table of Contents

- [Project Explanation](#project-explanation)
- [Problem Statement](#problem-statement)
- [Solution Provided by MeetMind](#solution-provided-by-meetmind)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Why This Tech Stack Was Chosen](#why-this-tech-stack-was-chosen)
- [How the Project Works](#how-the-project-works)
- [Detailed Working of the Project](#detailed-working-of-the-project)
- [Architecture](#architecture)
- [Database Design](#database-design)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technical Difficulties](#technical-difficulties)
- [Known Limitations](#known-limitations)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## Project Explanation

MeetMind solves a common problem with online meetings: once a call ends, the useful knowledge from that conversation is often trapped in memory, scattered notes, recordings no one watches, or chat messages that are hard to search.

The product introduces an AI agent as a meeting participant. The user can create an agent, define its behavior with custom instructions, start a meeting with that agent, and allow the system to record, transcribe, and summarize the meeting automatically.

After the meeting is completed, MeetMind gives the user:

- A structured meeting summary.
- A speaker-attributed transcript.
- A meeting recording URL when Stream finishes processing it.
- A chat interface where the user can ask follow-up questions about the meeting.
- A dashboard for managing agents and meeting history.

The project is not only a video calling app. It is a meeting memory system. The main idea is to turn live conversations into structured, searchable, reusable knowledge.

## Problem Statement

Most meetings create useful information, but teams often lose that information quickly. Common issues include:

- Meeting notes are inconsistent because each person writes different things down.
- Decisions are forgotten or buried in chat threads.
- People who miss the meeting depend on second-hand summaries.
- Recordings are useful but time-consuming to watch.
- Action items can be missed because no one captured them clearly.
- Participants often forget who said what.
- Teams need to ask follow-up questions later, but the meeting context is no longer available.

These problems become worse as teams grow, meetings become more frequent, and work becomes more distributed.

## Solution Provided by MeetMind

MeetMind provides a workflow where the system captures meeting context automatically and makes it useful after the call.

The solution has five main parts:

1. Custom AI agents

   Users can create agents with a name and instructions. The instructions define how the AI should behave during meetings and later follow-up chats.

2. AI-assisted live meetings

   Meetings are created with a selected agent. Stream Video powers the call, while Stream's OpenAI realtime integration allows the AI agent to connect to the live meeting.

3. Automatic transcription and recording

   When a meeting is created, Stream is configured to turn on transcription, closed captions, and recording automatically.

4. Background summary generation

   When Stream reports that the transcript is ready, MeetMind triggers an Inngest background function. That function fetches the transcript, parses it, adds speaker information, sends it to an OpenAI summarizer agent, and saves the summary.

5. Post-meeting AI chat

   After the meeting is completed, users can chat with the agent about the meeting. The AI responds using the generated meeting summary, the original agent instructions, and recent chat messages for continuity.

## Core Features

### Authentication

- Email and password sign-up and sign-in.
- GitHub OAuth support.
- Google OAuth support.
- Better Auth session management.
- Protected dashboard routes and protected tRPC procedures.

### Agent Management

- Create an AI agent.
- Add custom instructions for the agent.
- List agents with pagination and search.
- View an agent with its meeting count.
- Update an agent name or instructions.
- Delete an agent.
- Generate agent avatars using DiceBear.

### Meeting Management

- Create meetings with a selected agent.
- Store meeting ownership per authenticated user.
- List meetings with pagination.
- Search meetings by name.
- Filter meetings by status.
- Filter meetings by agent.
- Update meeting details.
- Delete meetings.
- View meeting detail pages.

### Video Calls

- Stream Video based call rooms.
- User token generation for Stream Video.
- User and agent records upserted into Stream.
- Lobby and call interface.
- Automatic transcription.
- Automatic closed captions.
- Automatic recording.
- Meeting status updates from Stream webhooks.

### AI Processing

- OpenAI GPT-4o based live agent participation.
- OpenAI GPT-4o based summary generation.
- Inngest background workflow for transcript processing.
- Speaker enrichment for transcripts.
- Markdown meeting summaries.

### Post-Meeting Chat

- Stream Chat integration.
- Chat token generation.
- Meeting-specific chat channels.
- AI response generation from meeting summary and recent message history.
- Agent responses posted back into the Stream Chat channel.

## Tech Stack

### Frontend

| Layer         | Technology             |
| ------------- | ---------------------- |
| Framework     | Next.js 16 App Router  |
| UI Runtime    | React 19               |
| Language      | TypeScript 5           |
| Styling       | Tailwind CSS v4        |
| UI Components | shadcn/ui and Radix UI |
| Icons         | Lucide React           |
| Animations    | Motion                 |
| Forms         | React Hook Form        |
| Validation    | Zod                    |
| Toasts        | Sonner                 |
| Tables        | TanStack Table         |
| URL State     | nuqs                   |

### Backend and API

| Layer             | Technology                                  |
| ----------------- | ------------------------------------------- |
| API Layer         | tRPC v11                                    |
| Server Runtime    | Next.js server routes and server components |
| Auth              | Better Auth                                 |
| Database          | PostgreSQL                                  |
| Database Provider | Neon serverless PostgreSQL                  |
| ORM               | Drizzle ORM                                 |
| Schema Tooling    | Drizzle Kit                                 |
| Background Jobs   | Inngest                                     |

### Realtime, Media, and AI

| Layer                     | Technology                                          |
| ------------------------- | --------------------------------------------------- |
| Video Calls               | Stream Video SDK                                    |
| Server-side Stream APIs   | @stream-io/node-sdk                                 |
| Chat                      | Stream Chat                                         |
| Realtime AI in Calls      | @stream-io/openai-realtime-api through Stream Video |
| AI Model Provider         | OpenAI                                              |
| Live Agent Model          | GPT-4o                                              |
| Summary Model             | GPT-4o                                              |
| Transcript Format Parsing | jsonl-parse-stringify                               |

### Developer Tooling

| Tool                        | Purpose                           |
| --------------------------- | --------------------------------- |
| ESLint                      | Static linting                    |
| Prettier                    | Formatting                        |
| prettier-plugin-tailwindcss | Tailwind class sorting            |
| Husky                       | Git hook setup                    |
| lint-staged                 | Pre-commit formatting and linting |
| tsx                         | TypeScript script execution       |

## Why This Tech Stack Was Chosen

### Next.js

Next.js was chosen because MeetMind needs both a rich frontend and backend routes in the same project. The App Router works well for this because pages, layouts, API routes, server components, and client components can live together in one structure.

This is useful for MeetMind because:

- Auth pages and dashboard pages can be organized with route groups.
- API routes can handle Better Auth, tRPC, Inngest, and Stream webhooks.
- Server components can load protected data before rendering UI.
- Client components can handle interactive forms, dialogs, filters, and video calls.

### TypeScript

TypeScript was chosen because the app coordinates several external services and multiple internal data flows. A meeting can move through many states, and many procedures depend on exact input and output types.

TypeScript helps reduce mistakes in:

- tRPC procedure inputs and outputs.
- Meeting status values.
- Transcript item shapes.
- Form validation.
- Database query results.
- Stream webhook handling.

### tRPC

tRPC was chosen because the frontend and backend are both TypeScript. It gives the app end-to-end type safety without manually writing REST DTOs or maintaining separate API client types.

This is especially helpful for:

- Agents CRUD operations.
- Meetings CRUD operations.
- Token generation mutations.
- Transcript queries.
- Paginated list responses.

### Drizzle ORM and PostgreSQL

PostgreSQL was chosen because MeetMind has relational data: users own agents, agents are attached to meetings, and meetings contain status, transcript, recording, and summary data.

Drizzle was chosen because it keeps the database schema close to the TypeScript application code. The schema in `src/db/schema.ts` defines the main application tables and gives typed query support throughout the app.

### Neon

Neon is a good fit for a serverless Next.js app because it provides hosted PostgreSQL with a serverless-friendly connection model. The project uses `drizzle-orm/neon-http`, which is suitable for serverless environments.

### Better Auth

Better Auth was chosen to avoid building authentication primitives from scratch. It handles email/password auth, OAuth providers, sessions, and database-backed auth tables.

The app uses Better Auth with the Drizzle adapter, so authentication data lives in the same PostgreSQL database as the rest of the product data.

### Stream Video

Stream Video was chosen because building reliable video infrastructure, recording, transcription, closed captions, participant state, and call lifecycle events from scratch is difficult.

Stream gives the project:

- Video calls.
- Call creation APIs.
- User token support.
- Webhook events.
- Automatic transcription.
- Automatic recording.
- Integration points for connecting an OpenAI realtime agent.

### Stream Chat

Stream Chat was chosen for post-meeting conversations because it provides real-time channels, message history, users, and webhook events. MeetMind uses a meeting-specific chat channel so users can continue discussing the completed meeting with the AI agent.

### OpenAI

OpenAI was chosen for two AI workloads:

- Live agent participation during the call.
- Post-meeting summary and follow-up chat responses.

The app currently uses GPT-4o for summary generation and chat responses.

### Inngest

Inngest was chosen because transcript processing should not block the webhook response or the user interface. When Stream reports that transcription is ready, the app sends an event to Inngest and lets a background function handle the slower work.

This makes the system more reliable because transcript fetching, parsing, speaker enrichment, and AI summarization can run outside the immediate request-response path.

### Tailwind CSS, shadcn/ui, and Radix UI

Tailwind provides fast styling with consistent utility classes. shadcn/ui and Radix UI provide accessible, reusable building blocks for dialogs, dropdowns, sheets, tables, forms, and other interface elements.

This combination fits the project because MeetMind is a dashboard-style product with many forms, lists, filters, dialogs, and status views.

## How the Project Works

At a high level, MeetMind works like this:

1. A user signs in.
2. The user creates an AI agent with custom instructions.
3. The user creates a meeting and selects that agent.
4. The backend inserts the meeting into PostgreSQL.
5. The backend creates a Stream Video call with automatic transcription, closed captions, and recording enabled.
6. The user joins the call from the `/call/[meetingId]` route.
7. Stream emits webhook events as the call starts, participants leave, transcription becomes available, and recording becomes available.
8. When the call starts, MeetMind marks the meeting active and connects the selected AI agent to the call.
9. When the call ends, MeetMind marks the meeting as processing.
10. When transcription is ready, MeetMind stores the transcript URL and triggers an Inngest background function.
11. Inngest fetches and parses the transcript, enriches it with speaker names, asks OpenAI to summarize it, and stores the final summary.
12. The meeting becomes completed.
13. The user can review the summary, transcript, recording, and chat with the AI about the meeting.

## Detailed Working of the Project

### 1. Authentication Flow

Authentication is configured in `src/lib/auth.ts`.

The app uses Better Auth with a Drizzle adapter:

- User, session, account, and verification data are stored in PostgreSQL.
- Email/password authentication is enabled.
- GitHub and Google OAuth providers are configured through environment variables.
- tRPC protected procedures call `auth.api.getSession()` to verify the current user.

The home page at `src/app/page.tsx` checks the current session. If a user is already signed in, the app redirects them to `/meetings`. Otherwise, it renders the landing page.

### 2. Protected API Flow

tRPC is initialized in `src/trpc/init.ts`.

The key concept is `protectedProcedure`. Before a protected procedure runs, it:

- Reads request headers.
- Asks Better Auth for the current session.
- Throws `UNAUTHORIZED` if no session exists.
- Adds the session to the tRPC context when the user is authenticated.

This means procedures like creating agents, creating meetings, fetching transcripts, and generating Stream tokens are available only to signed-in users.

### 3. Agent Creation Flow

Agents are managed in `src/modules/agents/server/procedures.ts`.

When a user creates an agent:

1. The UI submits the agent name and instructions.
2. Zod validates the input using `agentInsertSchema`.
3. The protected tRPC procedure verifies the user session.
4. The backend inserts the agent into the `agents` table with the current user's ID.
5. The created agent is returned to the client.

Each agent has:

- `id`
- `name`
- `userId`
- `instructions`
- `createdAt`
- `updatedAt`

Agent list and detail procedures always filter by `userId`, so users can only access their own agents.

### 4. Meeting Creation Flow

Meetings are managed in `src/modules/meetings/server/procedures.ts`.

When a user creates a meeting:

1. The UI submits the meeting name and selected `agentId`.
2. Zod validates the input using `meetingsInsertSchema`.
3. The backend inserts the meeting into the `meetings` table with status `upcoming`.
4. The backend creates a Stream Video call using the meeting ID as the call ID.
5. Stream call metadata is saved with:
   - `meetingId`
   - `meetingName`
6. Stream call settings are configured:
   - transcription mode: `auto-on`
   - transcription language: `en`
   - closed captions: `auto-on`
   - recording mode: `auto-on`
   - recording quality: `1080p`
7. The selected agent is fetched from the database.
8. The agent is upserted as a Stream Video user with a generated bot avatar.
9. The created meeting is returned to the client.

### 5. Joining a Meeting

The call route is `src/app/call/[meetingId]/page.tsx`.

The call UI uses Stream Video. Before the user joins a call, the app can generate a Stream Video token through the `meetings.generateToken` tRPC mutation.

That token generation procedure:

- Upserts the authenticated user into Stream Video.
- Gives the user the `admin` role for the call.
- Generates a Stream user token.
- Returns the token to the client.

The Stream Video client then uses that token to connect the user to the meeting call.

### 6. Live AI Agent Flow

The webhook route is `src/app/api/webhook/route.ts`.

When Stream sends `call.session_started`:

1. The webhook verifies the request signature.
2. It extracts the `meetingId` from the Stream call metadata.
3. It checks that the meeting exists and is not already active, processing, completed, or cancelled.
4. The database updates the meeting:
   - `status` becomes `active`
   - `startedAt` is set to the current time
5. The selected agent is fetched from the database.
6. The app connects OpenAI to the Stream Video call through `streamVideo.video.connectOpenAi`.
7. The realtime AI session is updated with the agent's stored instructions.

This is how the AI agent becomes part of the live meeting experience.

### 7. Ending a Meeting

Stream webhook events drive the end-of-call flow.

When Stream sends `call.session_participant_left`:

1. The meeting ID is extracted from the Stream call CID.
2. The backend gets the Stream call.
3. The backend ends the call.

When Stream sends `call.session_ended`:

1. The meeting ID is extracted from call metadata.
2. The meeting is updated only if it is currently active.
3. The database sets:
   - `status` to `processing`
   - `endedAt` to the current time

This gives the UI a clear transition from live meeting to processing state.

### 8. Transcript Processing

When Stream sends `call.transcription_ready`:

1. The meeting ID is extracted from the Stream call CID.
2. The transcript URL from Stream is stored in the meeting row.
3. The app sends an Inngest event named `meetings/processing`.

The background function is defined in `src/inngest/functions.ts`.

The Inngest function runs these steps:

1. `fetch-transcript`

   Downloads the transcript text from the Stream transcript URL.

2. `parse-transcript`

   Parses the JSONL transcript into typed transcript items.

3. `add-speakers`

   Finds all speaker IDs in the transcript, fetches matching users and agents from the database, and adds readable speaker names.

4. `run-summarizer`

   Sends the enriched transcript to an Inngest AI agent backed by OpenAI GPT-4o.

5. `save-summary`

   Saves the generated markdown summary to the meeting and updates the meeting status to `completed`.

### 9. Recording Processing

When Stream sends `call.recording_ready`:

1. The meeting ID is extracted from the Stream call CID.
2. The Stream recording URL is stored in the meeting row.

The app can then show or link to the recording from the completed meeting detail page.

### 10. Transcript Display

The `meetings.getTranscript` tRPC query:

1. Verifies that the current user owns the meeting.
2. Returns an empty array if no transcript URL exists.
3. Fetches the transcript URL.
4. Parses the JSONL transcript.
5. Collects speaker IDs.
6. Fetches matching users and agents.
7. Adds speaker names and avatars.
8. Returns transcript items ready for the UI.

Each transcript item includes:

- `speaker_id`
- `type`
- `text`
- `start_ts`
- `stop_ts`
- `user.name`
- `user.image`

### 11. Post-Meeting Chat

Post-meeting chat is handled through Stream Chat and the same webhook endpoint.

When Stream sends `message.new`:

1. The webhook extracts the user ID, channel ID, and message text.
2. The channel ID is treated as the meeting ID.
3. The backend finds a completed meeting with that ID.
4. The backend loads the meeting's agent.
5. If the message was not sent by the agent, the backend prepares an OpenAI prompt containing:
   - the meeting summary
   - the agent's original instructions
   - recent conversation history
   - the user's latest message
6. OpenAI generates a response.
7. The agent user is upserted in Stream Chat.
8. The response is sent into the meeting chat channel as the agent.

The result is a meeting-specific assistant that can answer questions about the meeting after it has ended.

## Architecture

MeetMind uses a modular architecture. Each major product area has its own module under `src/modules`.

```text
Browser
  |
  | renders pages and client components
  v
Next.js App Router
  |
  | calls typed procedures
  v
tRPC
  |
  | reads and writes data
  v
PostgreSQL through Drizzle

External event flow:

Stream Video / Stream Chat
  |
  | webhook events
  v
Next.js webhook route
  |
  | status updates, AI connection, job trigger
  v
Database + Inngest + OpenAI
```

### Important Routes

| Route                   | Purpose                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| `/`                     | Landing page for signed-out users. Redirects signed-in users to `/meetings`. |
| `/sign-in`              | Sign-in page.                                                                |
| `/sign-up`              | Sign-up page.                                                                |
| `/meetings`             | Meeting dashboard.                                                           |
| `/meetings/[meetingId]` | Meeting detail page.                                                         |
| `/agents`               | Agent dashboard.                                                             |
| `/agents/[agentId]`     | Agent detail page.                                                           |
| `/call/[meetingId]`     | Full-screen video call route.                                                |
| `/api/auth/[...all]`    | Better Auth handler.                                                         |
| `/api/trpc/[trpc]`      | tRPC API handler.                                                            |
| `/api/webhook`          | Stream Video and Stream Chat webhook handler.                                |
| `/api/inngest`          | Inngest handler.                                                             |

### Main Internal Layers

| Layer             | Location         | Responsibility                                                                       |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------ |
| App routes        | `src/app`        | Pages, layouts, and API route entry points.                                          |
| Shared components | `src/components` | Reusable UI components and primitives.                                               |
| Feature modules   | `src/modules`    | Product features such as agents, meetings, auth, calls, dashboard, and landing page. |
| Database          | `src/db`         | Drizzle schema and database client.                                                  |
| tRPC              | `src/trpc`       | API initialization, routers, client provider, and query client.                      |
| Background jobs   | `src/inngest`    | Inngest client and transcript processing function.                                   |
| Libraries         | `src/lib`        | Auth, Stream clients, avatars, environment helpers, and utilities.                   |

## Database Design

The database schema is defined in `src/db/schema.ts`.

### Auth Tables

Better Auth uses these tables:

| Table          | Purpose                                                     |
| -------------- | ----------------------------------------------------------- |
| `user`         | Stores user identity, email, profile image, and timestamps. |
| `session`      | Stores active sessions and session expiration.              |
| `account`      | Stores OAuth and password account data.                     |
| `verification` | Stores verification tokens.                                 |

### Product Tables

#### `agents`

Stores AI agents created by users.

| Column         | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| `id`           | Primary key generated with `nanoid`.                 |
| `name`         | Agent display name.                                  |
| `userId`       | Owner of the agent.                                  |
| `instructions` | System-style behavior instructions for the AI agent. |
| `createdAt`    | Creation timestamp.                                  |
| `updatedAt`    | Update timestamp.                                    |

#### `meetings`

Stores meetings and their processing state.

| Column          | Purpose                              |
| --------------- | ------------------------------------ |
| `id`            | Primary key generated with `nanoid`. |
| `name`          | Meeting name.                        |
| `userId`        | Owner of the meeting.                |
| `agentId`       | Agent attached to the meeting.       |
| `status`        | Meeting lifecycle status.            |
| `startedAt`     | Time the meeting became active.      |
| `endedAt`       | Time the meeting ended.              |
| `transcriptUrl` | Stream transcript URL.               |
| `recordingUrl`  | Stream recording URL.                |
| `summary`       | AI-generated meeting summary.        |
| `createdAt`     | Creation timestamp.                  |
| `updatedAt`     | Update timestamp.                    |

### Meeting Status Flow

```text
upcoming
  |
  | Stream call.session_started
  v
active
  |
  | Stream call.session_ended
  v
processing
  |
  | Inngest summary saved
  v
completed
```

There is also a `cancelled` status for meetings that should no longer proceed.

## Installation

### Prerequisites

Install or create accounts for the following:

- Node.js 20 or newer.
- npm.
- PostgreSQL database. Neon is recommended because the project uses the Neon HTTP Drizzle driver.
- Stream account with Video and Chat enabled.
- OpenAI API key.
- GitHub OAuth app, optional but recommended for GitHub login.
- Google OAuth app, optional but recommended for Google login.
- ngrok, only needed for local webhook testing.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd meetmind
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create the Environment File

Create `.env.local` in the project root.

```env
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Better Auth
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000

# Public application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OAuth providers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stream Video
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=
STREAM_VIDEO_SECRET_KEY=

# Stream Chat
NEXT_PUBLIC_STREAM_CHAT_API_KEY=
STREAM_CHAT_SECRET_KEY=

# OpenAI
OPENAI_API_KEY=
```

### 4. Push the Database Schema

```bash
npm run db:push
```

This uses Drizzle Kit to push the schema from `src/db/schema.ts` to the PostgreSQL database configured by `DATABASE_URL`.

### 5. Start the Development Server

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

### 6. Configure Stream Webhooks for Local Development

Stream must be able to send webhook events to your local app. For local development, expose your dev server with ngrok:

```bash
ngrok http 3000
```

Then configure the Stream webhook URL:

```text
https://<your-ngrok-domain>/api/webhook
```

The project also includes this script:

```bash
npm run dev:webhook
```

It uses the reserved ngrok domain currently stored in `package.json`. Use it only if that domain belongs to your ngrok account. Otherwise, run `ngrok http 3000` manually.

### 7. Configure Stream Events

The webhook route expects events from Stream Video and Stream Chat. At minimum, configure events for:

- `call.session_started`
- `call.session_participant_left`
- `call.session_ended`
- `call.transcription_ready`
- `call.recording_ready`
- `message.new`

## Environment Variables

| Variable                           | Required | Used By                                    | Description                                                                |
| ---------------------------------- | -------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| `DATABASE_URL`                     | Yes      | Drizzle, Better Auth                       | PostgreSQL connection string.                                              |
| `BETTER_AUTH_SECRET`               | Yes      | Better Auth                                | Secret used by Better Auth. Use a long random value.                       |
| `BETTER_AUTH_URL`                  | Yes      | Better Auth                                | Base URL of the app. Use `http://localhost:3000` locally.                  |
| `NEXT_PUBLIC_APP_URL`              | Yes      | tRPC                                       | Public app URL used by the server-side tRPC client URL builder.            |
| `GITHUB_CLIENT_ID`                 | Optional | Better Auth                                | GitHub OAuth client ID.                                                    |
| `GITHUB_CLIENT_SECRET`             | Optional | Better Auth                                | GitHub OAuth client secret.                                                |
| `GOOGLE_CLIENT_ID`                 | Optional | Better Auth                                | Google OAuth client ID.                                                    |
| `GOOGLE_CLIENT_SECRET`             | Optional | Better Auth                                | Google OAuth client secret.                                                |
| `NEXT_PUBLIC_STREAM_VIDEO_API_KEY` | Yes      | Stream Video client/server                 | Public Stream Video API key.                                               |
| `STREAM_VIDEO_SECRET_KEY`          | Yes      | Stream Video server                        | Secret key used by server-side Stream Video APIs and webhook verification. |
| `NEXT_PUBLIC_STREAM_CHAT_API_KEY`  | Yes      | Stream Chat client/server                  | Public Stream Chat API key.                                                |
| `STREAM_CHAT_SECRET_KEY`           | Yes      | Stream Chat server                         | Secret key used by server-side Stream Chat APIs.                           |
| `OPENAI_API_KEY`                   | Yes      | OpenAI, Stream OpenAI integration, Inngest | API key for live AI, summary generation, and chat responses.               |

## Available Scripts

| Command                | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `npm run dev`          | Starts the Next.js development server.                              |
| `npm run build`        | Builds the app for production.                                      |
| `npm run start`        | Starts the production server after a build.                         |
| `npm run lint`         | Runs ESLint.                                                        |
| `npm run lint:fix`     | Runs ESLint and applies automatic fixes.                            |
| `npm run format`       | Formats the repository with Prettier.                               |
| `npm run format:check` | Checks formatting without writing changes.                          |
| `npm run db:push`      | Pushes the Drizzle schema to the database.                          |
| `npm run db:studio`    | Opens Drizzle Studio.                                               |
| `npm run dev:webhook`  | Starts an ngrok tunnel using the reserved domain in `package.json`. |
| `npm run prepare`      | Sets up Husky hooks.                                                |

There is currently no test script defined in `package.json`.

## Project Structure

```text
meetmind/
  auth-schema.ts
  components.json
  drizzle.config.ts
  next.config.ts
  package.json
  postcss.config.mjs
  tsconfig.json
  src/
    app/
      (auth)/
        sign-in/
        sign-up/
      (dashboard)/
        agents/
        meetings/
      api/
        auth/[...all]/
        inngest/
        trpc/[trpc]/
        webhook/
      call/[meetingId]/
      layout.tsx
      page.tsx
      globals.css
    components/
      ui/
      form/
      common/
      typography/
    db/
      index.ts
      schema.ts
    hooks/
    inngest/
      client.ts
      functions.ts
    lib/
      auth.ts
      auth-client.ts
      avatar.tsx
      env.ts
      stream-chat.ts
      stream-video.ts
      utils.ts
    modules/
      agents/
      auth/
      call/
      dashboard/
      home/
      meetings/
      premium/
    trpc/
      client.tsx
      init.ts
      query-client.ts
      server.tsx
      routers/
```

## Technical Difficulties

### 1. Coordinating Real-Time Video and AI

The hardest part of the product is not displaying a video call. The harder part is synchronizing video events, AI connection, meeting state, and user experience.

The app needs to know when a call has truly started, when the AI should join, when the call has ended, and when post-processing should begin. That is why Stream webhook events are central to the architecture.

### 2. Webhook Reliability

Webhooks can arrive late, fail, retry, or arrive in an unexpected order. The code handles some of this by checking meeting status before changing it.

For example, the `call.session_started` branch avoids activating meetings that are already active, processing, completed, or cancelled.

Future improvements could add more idempotency keys, structured logging, retry handling, and webhook event storage.

### 3. Meeting State Management

The meeting status field looks simple, but it controls the entire product experience:

- `upcoming` means the meeting is ready to join.
- `active` means the meeting is live.
- `processing` means the call ended but the summary is not ready.
- `completed` means transcript and summary processing finished.
- `cancelled` means the meeting should not continue.

Every UI state depends on this lifecycle being accurate.

### 4. Transcript Parsing

Stream provides transcript data through a URL. The transcript is parsed from JSONL format, which means each line is a separate JSON object.

The app must:

- Fetch the transcript text.
- Parse JSONL safely.
- Extract speaker IDs.
- Match those IDs to users and agents.
- Handle unknown speakers.
- Preserve timestamps.

This is necessary before the transcript can be shown in a useful way or passed to the summarizer.

### 5. Speaker Attribution

Meeting summaries and transcripts are more useful when they show who said what. The project has two speaker types:

- Human users from the `user` table.
- AI agents from the `agents` table.

The transcript enrichment step has to search both tables and merge speaker data into one result.

### 6. Background Processing

Summary generation can be slow because it depends on external transcript URLs and OpenAI generation. Running that inside a webhook request would be fragile.

Inngest solves this by moving the workflow into a background function with named steps. This makes the process easier to debug and reason about.

### 7. Server and Client Boundaries

The project uses server-only clients for Stream secrets, database access, and OpenAI keys. Those values must never be exposed to the browser.

Files like `src/lib/stream-video.ts`, `src/lib/stream-chat.ts`, and `src/db/index.ts` are server-side concerns. Client components should call protected APIs instead of directly importing server clients.

### 8. External Service Configuration

The app depends on several services working together:

- Better Auth must know the correct app URL.
- OAuth providers must have correct callback URLs.
- Stream must have correct API keys.
- Stream must send webhooks to the deployed app.
- OpenAI must have a valid API key.
- Neon must accept the database connection.

Most local setup issues come from one of these configuration points.

### 9. Browser Media Permissions

Video calls require browser camera and microphone permissions. Users may block permissions, use unsupported devices, or enter calls from insecure origins.

Production deployments should use HTTPS so browsers allow media access reliably.

### 10. AI Cost and Rate Limits

The app uses OpenAI for live AI, summarization, and post-meeting chat. Longer meetings and frequent follow-up chats can increase token usage.

A production version should add usage tracking, rate limits, and cost controls.

## Known Limitations

- There is currently one selected AI agent per meeting.
- Transcription is configured for English.
- Calendar integration is not implemented.
- Automated tests are not configured yet.
- Dashboard home and premium areas exist as product directions but are not fully implemented.
- The post-meeting chat relies primarily on the generated summary, not the full transcript.
- Webhook observability is minimal.
- There is no built-in export flow for summaries, transcripts, or recordings yet.

## Deployment

The project is designed to work well on Vercel.

### Vercel Deployment Steps

1. Push the repository to GitHub.
2. Create a Vercel project from the repository.
3. Add all required environment variables in the Vercel dashboard.
4. Set `BETTER_AUTH_URL` to the production URL.
5. Set `NEXT_PUBLIC_APP_URL` to the production URL.
6. Push the Drizzle schema to the production database:

   ```bash
   npm run db:push
   ```

7. Configure Stream webhooks to point to:

   ```text
   https://<your-production-domain>/api/webhook
   ```

8. Configure OAuth callback URLs for the production domain.
9. Deploy the app.

### Production Checklist

- Database connection works.
- Auth sign-up and sign-in work.
- GitHub OAuth works if enabled.
- Google OAuth works if enabled.
- Stream Video token generation works.
- Stream Chat token generation works.
- Stream webhooks are receiving events.
- OpenAI API key has available quota.
- Inngest endpoint is reachable.
- A test meeting can move from `upcoming` to `active` to `processing` to `completed`.

## Troubleshooting

### Database Connection Fails

Check:

- `DATABASE_URL` is present.
- The connection string uses the correct username, password, host, and database.
- SSL settings match the database provider.
- The Neon database is active.

### Auth Redirects Do Not Work

Check:

- `BETTER_AUTH_URL` matches the current app URL.
- OAuth callback URLs are configured in GitHub or Google.
- The browser is not using stale cookies from a different local URL.

### tRPC Requests Fail on the Server

Check:

- `NEXT_PUBLIC_APP_URL` is set.
- It does not have a trailing slash.
- In local development, it is usually `http://localhost:3000`.

### Video Call Does Not Start

Check:

- `NEXT_PUBLIC_STREAM_VIDEO_API_KEY` is correct.
- `STREAM_VIDEO_SECRET_KEY` is correct.
- The user is authenticated.
- Camera and microphone permissions are allowed.
- The call route is opened over a valid local or HTTPS origin.

### AI Agent Does Not Join the Call

Check:

- Stream is sending `call.session_started` to `/api/webhook`.
- The webhook signature is valid.
- `OPENAI_API_KEY` is set.
- The meeting is still in a state that can become active.
- The selected agent exists in the database.

### Meeting Stays in Processing

Check:

- Stream sent `call.transcription_ready`.
- The transcript URL was saved in the database.
- Inngest received the `meetings/processing` event.
- `OPENAI_API_KEY` is valid.
- The transcript URL is reachable from the server.

### Recording Is Missing

Check:

- Stream recording is enabled for the call.
- Stream sent `call.recording_ready`.
- The webhook endpoint is publicly reachable.
- The recording URL was saved in the meeting row.

### Post-Meeting Chat Does Not Respond

Check:

- The meeting status is `completed`.
- The Stream Chat webhook sends `message.new`.
- The channel ID matches the meeting ID.
- The agent exists.
- `OPENAI_API_KEY` is valid.
- The Stream Chat channel type in code matches your Stream Chat configuration.

## Future Improvements

Possible next steps:

- Add automated tests with Vitest and Playwright.
- Add transcript search.
- Add summary export to PDF, Markdown, or email.
- Add action item extraction.
- Add meeting templates.
- Add calendar integrations.
- Add guest meeting links.
- Add richer dashboard analytics.
- Add usage limits and billing.
- Add multi-agent meetings.
- Add better webhook logging and retry visibility.
- Add full transcript-based post-meeting chat retrieval.
- Add notifications when processing completes.

## License

This is currently a private project.

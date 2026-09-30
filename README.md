# MeetMind

> An AI meeting assistant that joins your video calls as a participant, records and transcribes the conversation, writes a summary, and answers questions about the meeting after it ends.

MeetMind is built as a full-stack Next.js application with a typed tRPC API, PostgreSQL persistence (Neon + Drizzle), Stream-powered video and chat, OpenAI-powered intelligence, and Inngest background processing.

## Features

- **Custom AI agents** — create agents with names and behavioral instructions.
- **AI-assisted live meetings** — the agent joins Stream Video calls in real time via the OpenAI Realtime API.
- **Automatic capture** — transcription, closed captions, and recording are enabled on every call.
- **Background summaries** — an Inngest pipeline parses the transcript, attributes speakers, and generates a Markdown summary with GPT-4o.
- **Post-meeting chat** — keep asking the agent questions about the meeting through Stream Chat.
- **Dashboard** — manage agents and meeting history with search, filters, and pagination.
- **Auth** — email/password plus GitHub and Google OAuth via Better Auth.

## Quick Start

### Prerequisites

- Node.js 20+
- A PostgreSQL database (Neon recommended — the project uses the Neon HTTP Drizzle driver)
- A Stream account with Video and Chat enabled
- An OpenAI API key
- Optional: GitHub/Google OAuth apps, ngrok (for local webhooks)

### Installation

```bash
git clone <repository-url>
cd meetmind
npm install
```

Create `.env.local` in the project root using the [Configuration](#configuration) table below, then push the schema and start the dev server:

```bash
npm run db:push
npm run dev
```

The app runs at `http://localhost:3000`.

### Stream Webhooks (local development)

Stream cannot reach `localhost`, so expose the dev server with a tunnel:

```bash
ngrok http 3000          # or: npm run dev:webhook (uses the reserved domain in package.json)
```

Set the Stream webhook URL to `https://<your-ngrok-domain>/api/webhook` and subscribe to at least: `call.session_started`, `call.session_participant_left`, `call.session_ended`, `call.transcription_ready`, `call.recording_ready`, and `message.new`.

To run Inngest functions locally, start the dev server in a separate terminal:

```bash
npx inngest-cli dev
```

## Configuration

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

## Scripts

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

## Documentation

| Document                                                       | What it covers                                                                                                     |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [ARCHITECTURE.md](ARCHITECTURE.md)                             | C4 diagrams, data-flow sequences, infrastructure, engineering challenges, and known limitations.                   |
| [CONTEXT.md](CONTEXT.md)                                       | Dense primer for contributors and AI assistants: stack versions, codebase map, patterns, invariants, and glossary. |
| [MeetMind-Project-Overview.md](MeetMind-Project-Overview.md)   | Product requirements, feature breakdown, detailed workflows, database design, and tech-stack rationale.            |
| [DESIGN.md](DESIGN.md)                                         | Design philosophy, semantic CSS tokens, and visual system.                                                         |
| [docs/how-tos/how-to-deploy.md](docs/how-tos/how-to-deploy.md) | Production deployment steps and checklist.                                                                         |
| [docs/runbooks/](docs/runbooks/)                               | Troubleshooting: webhooks/tunnels, transcript pipeline stalls, call/AI failures, and local setup & configuration.  |
| [docs/concepts/](docs/concepts/)                               | Deep-dives: durable execution, realtime voice agents, and speaker diarization.                                     |
| [docs/adr/](docs/adr/)                                         | Architecture Decision Records.                                                                                     |

## License

This is currently a private project.

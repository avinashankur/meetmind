# Runbook: Local Setup, Auth & Configuration Failures

**Service:** Application configuration surface (`.env`, Better Auth, tRPC, Neon PostgreSQL, Stream Chat)  
**Severity:** P3 (Blocks local development or a fresh deployment; no data loss)  
**Owner:** Platform Engineering  
**Last reviewed:** 2026-09-29  
**Estimated resolution time:** 15 minutes

> For Stream webhook/tunnel failures see [Runbook 001](001-stream-webhook-and-tunnel-failures.md), for stalled transcript pipelines see [Runbook 002](002-inngest-transcript-pipeline-stalls.md), and for call/AI-agent connection failures see [Runbook 003](003-webrtc-call-and-ai-agent-connection-failures.md). This runbook covers the remaining configuration-driven failure modes: database connectivity, auth redirects, tRPC server calls, missing recordings, and silent post-meeting chat.

---

## Trigger

This runbook applies when:

- The app fails to boot or throws database connection errors on first request.
- Sign-in or sign-up redirects in a loop, or OAuth callbacks land on the wrong URL.
- Server-side tRPC calls fail with `Invalid URL` or silently return nothing during SSR.
- A completed meeting has no `recordingUrl` saved.
- The post-meeting chat never receives an AI reply even though the meeting is `completed`.

---

## Impact Assessment

- [ ] **Scope:** Is this a fresh local setup, a new deployment, or a previously working environment that regressed?
- [ ] **Blast radius:** Does the failure block one feature (e.g. chat) or the whole app (e.g. database)?
- [ ] **Recent changes:** Were environment variables, OAuth apps, or Stream dashboard settings changed recently?

Most configuration failures trace back to one of six integration points: Better Auth app URL, OAuth callback URLs, Stream API keys, Stream webhook targets, OpenAI key validity, and Neon database reachability.

---

## 🛠 Local Development

> **Start here.** Nearly all local failures are environment-variable or dashboard-configuration problems, not code problems.

### Checklist

- [ ] `.env.local` exists in the project root and the dev server was restarted after editing it.
- [ ] All required variables from the [README configuration table](../../README.md#configuration) are present.
- [ ] `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` are both `http://localhost:3000` with **no trailing slash**.
- [ ] The Neon database is active (not suspended for inactivity).
- [ ] OAuth apps (if used) list `http://localhost:3000/api/auth/callback/github` and `.../google` as authorized callback URLs.

### Diagnosis

#### 1. Database connection fails

Symptoms: `getaddrinfo ENOTFOUND`, `Connection terminated`, or auth queries throwing on sign-in.

Check in order:

1. `DATABASE_URL` is present and is the **pooled** Neon connection string ending in `?sslmode=require`.
2. Username, password, host, and database name are copied exactly from the Neon dashboard (special characters must be URL-encoded).
3. The Neon project is active — free-tier projects suspend after inactivity; wake them from the Neon console.
4. Quick reachability test:

   ```bash
   npx drizzle-kit studio
   ```

   If Studio cannot connect, the connection string is the problem, not the app.

#### 2. Auth redirects loop or OAuth fails

Symptoms: continuous redirect between `/sign-in` and `/`, or the provider returns `redirect_uri_mismatch`.

1. `BETTER_AUTH_URL` must exactly match the origin the browser uses (`http://localhost:3000`). A mismatch makes Better Auth reject its own session cookies, producing redirect loops.
2. `BETTER_AUTH_SECRET` must be set and stable — changing it invalidates existing sessions.
3. For `redirect_uri_mismatch`: update the callback URL in the GitHub/Google OAuth app settings to match the current origin.
4. Clear cookies for `localhost` — stale sessions from a different port or secret cause loops that look like code bugs.

#### 3. tRPC requests fail during server-side rendering

Symptoms: `Invalid URL` errors, or server components rendering empty data while client-side queries work.

1. `NEXT_PUBLIC_APP_URL` must be set — the server-side tRPC caller builds its base URL from it.
2. It must have **no trailing slash** (`http://localhost:3000`, not `http://localhost:3000/`).
3. Restart the dev server after changing it; `NEXT_PUBLIC_*` values are inlined at build/dev-server start.

#### 4. Recording is missing from a completed meeting

1. Confirm the meeting row has `transcriptUrl` but empty `recordingUrl` — this isolates the failure to the recording webhook path.
2. In the Stream dashboard, verify recording is enabled for the app and the `call.recording_ready` webhook event is subscribed.
3. Verify the webhook endpoint is publicly reachable (ngrok tunnel up — see Runbook 001).
4. Check dev-server logs for the `call.recording_ready` branch of `/api/webhook`; a signature failure there means `STREAM_VIDEO_SECRET_KEY` does not match the dashboard.

#### 5. Post-meeting chat does not respond

1. The meeting status must be `completed` — the webhook only answers for completed meetings.
2. Stream Chat must send `message.new` to `/api/webhook`; verify the chat webhook subscription in the Stream dashboard (it is configured separately from video webhooks).
3. The channel ID must equal the meeting ID — messages in any other channel are ignored by design.
4. The agent referenced by the meeting must still exist in the `agents` table.
5. `OPENAI_API_KEY` must be valid and have credits; the reply is generated synchronously in the webhook handler.
6. The Stream Chat channel type used in code must match your Stream Chat app configuration.

### Resolution Steps

1. Fix the offending environment variable or dashboard setting identified above.
2. Fully restart the dev server (`npm run dev`) — Next.js does not hot-reload `.env.local` changes reliably.
3. Re-test the specific flow (sign-in, SSR page load, meeting completion, chat message).

### Verification (Local)

- [ ] App boots with no database errors and `/meetings` renders for a signed-in user.
- [ ] Sign-up → sign-in → sign-out completes without redirect loops.
- [ ] A server-rendered page that uses tRPC returns data (check a meeting detail page).
- [ ] A test meeting reaches `completed` with both `transcriptUrl` and `recordingUrl` populated.
- [ ] Sending a chat message in the meeting channel receives an agent reply within ~10 seconds.

---

## 🚀 Production

### Trigger Confirmation

The same symptoms appear after a deployment or environment change: login loops, SSR data failures, missing recordings, or dead chat.

### Diagnosis

1. Compare the Vercel environment variables against the [README configuration table](../../README.md#configuration) — every required variable must exist in the **Production** environment, not just Preview.
2. `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` must be the production HTTPS URL (no trailing slash). Redeploy after changing `NEXT_PUBLIC_APP_URL` — it is inlined at build time.
3. OAuth providers must list the production callback URLs in addition to localhost ones.
4. Stream webhooks must point at `https://<your-production-domain>/api/webhook`; a leftover ngrok URL silently swallows all events.
5. Verify `OPENAI_API_KEY` quota — chat replies and summaries fail silently to the user when the key is exhausted.

### Resolution Steps

1. Correct the environment variables in the hosting dashboard.
2. Redeploy (required for any `NEXT_PUBLIC_*` change).
3. Re-run the production checklist in [how-to-deploy.md](../how-tos/how-to-deploy.md#production-checklist).

### Verification (Production)

- [ ] Fresh incognito sign-up and sign-in both work on the production domain.
- [ ] A test meeting completes end-to-end (`upcoming` → `active` → `processing` → `completed`) with recording URL saved.
- [ ] Post-meeting chat receives an AI reply.

---

## Post-Incident

- If the failure was caused by a missing or wrong environment variable, add it to the deployment checklist in [how-to-deploy.md](../how-tos/how-to-deploy.md).
- If a Stream dashboard webhook or OAuth callback URL was the cause, document the correct value in the team's secrets manager (not in the repo).

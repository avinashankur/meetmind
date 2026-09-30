# How to Deploy MeetMind to Production

**Audience:** Developers deploying MeetMind for the first time or re-deploying after configuration changes.  
**Platform:** Vercel (recommended) + Neon PostgreSQL + Stream + OpenAI + Inngest.  
**Last updated:** 2026-09-29

---

## Prerequisites

- [ ] A working local setup (see [README — Quick Start](../../README.md#quick-start)).
- [ ] Repository pushed to GitHub.
- [ ] A Vercel account connected to the GitHub repository.
- [ ] A production Neon PostgreSQL database (separate from the development one).
- [ ] Production Stream app credentials (Video + Chat) and an OpenAI API key with quota.
- [ ] A production domain (Vercel subdomain or custom domain).

---

## Deployment Steps

1. **Create the Vercel project** from the GitHub repository. The Next.js framework preset is detected automatically; no custom build settings are required.

2. **Add environment variables** in the Vercel dashboard (Production _and_ Preview as needed). Use the full list from the [README configuration table](../../README.md#configuration), with production values:
   - `BETTER_AUTH_URL` → `https://<your-production-domain>`
   - `NEXT_PUBLIC_APP_URL` → `https://<your-production-domain>` (no trailing slash)
   - `DATABASE_URL` → the production Neon connection string
   - Stream, OpenAI, and OAuth secrets → production credentials

3. **Push the database schema** to the production database. Point `DATABASE_URL` at the production Neon instance locally, then:

   ```bash
   npm run db:push
   ```

4. **Configure OAuth callback URLs** for the production domain in the GitHub and Google OAuth app settings:

   ```text
   https://<your-production-domain>/api/auth/callback/github
   https://<your-production-domain>/api/auth/callback/google
   ```

5. **Repoint Stream webhooks** from your ngrok URL to production:

   ```text
   https://<your-production-domain>/api/webhook
   ```

   Subscribe at minimum: `call.session_started`, `call.session_participant_left`, `call.session_ended`, `call.transcription_ready`, `call.recording_ready`, and `message.new`.

6. **Configure Inngest** for production: create the app in the Inngest dashboard and set the environment so Inngest targets `https://<your-production-domain>/api/inngest`.

7. **Deploy.** Push to the production branch or trigger the deployment from Vercel.

> Remember: any change to `NEXT_PUBLIC_*` variables requires a **redeploy**, not just a restart — they are inlined at build time.

---

## Production Checklist

Run through this after every deployment or environment change:

- [ ] Database connection works (app boots, dashboard lists data).
- [ ] Email/password sign-up and sign-in work in an incognito window.
- [ ] GitHub OAuth works (if enabled).
- [ ] Google OAuth works (if enabled).
- [ ] Stream Video token generation works (join a test call).
- [ ] Stream Chat token generation works (open a meeting chat).
- [ ] Stream webhooks are being received (check server logs / Stream dashboard webhook delivery log).
- [ ] OpenAI API key has available quota.
- [ ] Inngest endpoint is reachable and functions are registered.
- [ ] A test meeting moves `upcoming` → `active` → `processing` → `completed` with transcript, summary, and recording URL saved.
- [ ] Post-meeting chat returns an AI reply.
- [ ] The site is served over HTTPS (required for camera/microphone access).

---

## Common Post-Deployment Failures

| Symptom                         | First place to look                                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Login redirect loop             | `BETTER_AUTH_URL` mismatch — see [Runbook 004](../runbooks/004-local-setup-auth-and-configuration-failures.md)                            |
| Meetings never leave `upcoming` | Stream webhooks still pointing at an ngrok URL — see [Runbook 001](../runbooks/001-stream-webhook-and-tunnel-failures.md)                 |
| Meetings stuck in `processing`  | Inngest pipeline failure — see [Runbook 002](../runbooks/002-inngest-transcript-pipeline-stalls.md)                                       |
| AI agent never joins the call   | OpenAI key or webhook signature — see [Runbook 003](../runbooks/003-webrtc-call-and-ai-agent-connection-failures.md)                      |
| SSR pages render empty          | `NEXT_PUBLIC_APP_URL` missing or has a trailing slash — see [Runbook 004](../runbooks/004-local-setup-auth-and-configuration-failures.md) |

# Runbook: WebRTC Call & Realtime Voice Agent Connection Failures

**Service:** Stream Video WebRTC Client & OpenAI Realtime Voice Integration (`src/modules/call/`, `src/lib/stream-video.ts`)  
**Severity:** P1 (Call lobby will not connect; WebRTC ICE failure; users blocked from meeting) / P2 (AI agent fails to join call)  
**Owner:** Audio/Video & Client Platform Engineering  
**Last reviewed:** 2026-09-27  
**Estimated resolution time:** 10 minutes

---

## Trigger

This runbook applies when:

- A user enters a call (`/call/[id]`) and remains stuck indefinitely on the loading screen ("Joining call..." or continuous spinner).
- OR: The browser console shows `CallConnectionError`, `ICE connection failed`, or `StreamVideoClient: Token expired`.
- OR: Call participants join the room, but the AI agent persona never appears in the call grid or fails to speak.
- OR: Server logs from `/api/webhook` throw an error during the `call.session_started` handler when executing `streamVideo.video.connectOpenAi`.

---

## Impact Assessment

Before taking recovery actions, assess the incident blast radius:

- [ ] **Hardware vs. Network:** Is this an end-user microphone/camera permission issue or an infrastructure connection failure?
- [ ] **Single Call vs. Global:** Can other users join calls, or are all WebRTC media streams failing?
- [ ] **AI Presence:** Are human-to-human video streams operating while only the AI bot fails to connect?
- [ ] **Authentication:** Has the user's session expired, preventing token issuance from `trpc.meetings.generateToken`?

---

## 🛠 Local Development

> **Start here.** Most local issues stem from missing browser media permissions, expired Stream developer tokens, or missing OpenAI Realtime credentials when connecting the bot.

### Checklist

- [ ] Browser permissions for Camera and Microphone are allowed on `http://localhost:3000`.
- [ ] `NEXT_PUBLIC_STREAM_VIDEO_API_KEY` is present in `.env` and accessible to client components.
- [ ] `STREAM_SECRET_KEY` and `OPENAI_API_KEY` are present in `.env`.
- [ ] The meeting record in PostgreSQL has a valid `agentId` foreign key linking to a record in the `agents` table.

### Diagnosis

Run these checks in order:

#### 1. Inspect the Browser Developer Console

Open Chrome / Firefox DevTools (`F12`) on the call page (`http://localhost:3000/call/<meeting-id>`) and inspect the **Console** tab:

- **Error: `NotAllowedError: Permission denied`** → The browser blocked camera/microphone access. Proceed to **Option A**.
- **Error: `ICE connection failed` / `STUN/TURN timeout`** → Local firewall or VPN is blocking UDP ports. Proceed to **Option B**.
- **Error: `TokenProvider failed` / `TRPCClientError: UNAUTHORIZED`** → The user's Better Auth session expired. Proceed to **Option C**.

#### 2. Verify Stream Token Issuance via tRPC

In DevTools **Network** tab, inspect the request to `/api/trpc/meetings.generateToken`:

```bash
# Check if the mutation succeeds with a valid JWT
POST /api/trpc/meetings.generateToken
Status: 200 OK
Response: {"result":{"data":{"json":"eyJhbGciOi..."}}}
```

- If status is `401 Unauthorized`: Session cookie is missing.
- If status is `500 Internal Server Error`: `STREAM_SECRET_KEY` or `STREAM_API_KEY` on the server is invalid.

#### 3. Check Server Logs for OpenAI Realtime Bot Connection

When the first human participant enters the call, Stream emits `call.session_started` to your webhook. Check the Next.js server console for:

```text
Error connecting OpenAI agent to call: ...
```

- If `Agent not found`: The meeting's `agentId` does not exist in the database.
- If `OpenAI Realtime connection failed: 401 Unauthorized`: `OPENAI_API_KEY` is invalid or lacks access to the Realtime model.
- If no event is logged: The webhook tunnel is broken. Consult [001-stream-webhook-and-tunnel-failures.md](001-stream-webhook-and-tunnel-failures.md).

### Resolution Steps

Work through these options in order:

#### Option A: Reset browser media permissions

1. Click the **padlock or tune icon** in the browser URL bar (next to `localhost:3000`).
2. Set **Camera** and **Microphone** to **Allow**.
3. Reload the page.
4. If testing without physical hardware, launch Chrome with dummy media flags:
   ```bash
   chrome.exe --use-fake-ui-for-media-stream --use-fake-device-for-media-stream
   ```

#### Option B: Bypass local firewall / VPN UDP restrictions

Stream Video uses WebRTC UDP media routing:

1. Temporarily disable corporate VPNs (Cisco AnyConnect, Tailscale, Cloudflare WARP) or custom proxies that block UDP traffic.
2. In `src/modules/call/ui/components/call-connect.tsx`, verify that client initialization does not pass malformed configurations:
   ```typescript
   const _client = new StreamVideoClient({
     apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
     user: { id: userId, name: userName, image: userImage },
     tokenProvider: generateToken,
   });
   ```

#### Option C: Re-authenticate to refresh session cookies

If tRPC returns `UNAUTHORIZED` when generating tokens:

1. Navigate to `http://localhost:3000/api/auth/sign-out` or sign out from the UI.
2. Log in again via email/password or OAuth.
3. Re-enter the call lobby.

#### Option D: Fix AI Realtime Agent connection failure

If the user connects successfully but the AI bot fails to appear in the meeting grid:

1. Confirm the assigned agent exists in Drizzle Studio (`npm run db:studio`):
   ```sql
   SELECT id, name, instructions FROM agents WHERE id = '<meeting.agentId>';
   ```
2. Verify that `OPENAI_API_KEY` supports OpenAI Realtime API access.
3. Check `src/app/api/webhook/route.ts` line 99:
   ```typescript
   const realTimeClient = await streamVideo.video.connectOpenAi({
     call,
     openAiApiKey: process.env.OPENAI_API_KEY!,
     agentUserId: existingAgent.id,
   });
   ```
4. If `existingAgent.instructions` is empty or undefined, assign default instructions to the agent in the database:
   ```sql
   UPDATE agents SET instructions = 'You are a helpful meeting assistant.' WHERE id = '<agent-id>';
   ```

### Verification (Local)

1. Navigate to `http://localhost:3000/call/<meeting-id>`.
2. The lobby displays your local camera and audio meter responding to your voice.
3. Click **Join Call**.
4. Within 5 seconds:
   - Your video tile is rendered in `SpeakerLayout`.
   - The AI agent persona joins the participant list.
   - Speaking into the microphone yields an audio response from the agent.

---

## 🚀 Production

> **Secondary section.** In production, WebRTC connections utilize global Stream SFU edge clusters and production OpenAI Realtime websockets.

### Trigger Confirmation

- Customer reports stating "Meeting screen is black" or "Cannot hear or see other participants".
- PagerDuty or monitoring alert for elevated WebRTC ICE failure rates (> 2%).
- Stream Dashboard indicates failed calls or unacknowledged media sessions.

### Diagnosis

1. **Check Stream Status Page:**
   - Check [Stream Status](https://status.getstream.io/) for regional SFU or edge outages.

2. **Inspect Stream Video Analytics Dashboard:**
   - Open **Stream Dashboard** > **Video & Audio** > **Calls**.
   - Search for the affected Call ID (`default:<meetingId>`).
   - Inspect participant session details:
     - Check **ICE Connection State** (`completed`, `failed`, or `disconnected`).
     - Check **Bitrate & Packet Loss** graphs.

3. **Verify OpenAI Realtime Outages:**
   - Check [OpenAI Status](https://status.openai.com/) for Realtime API degradation.

### Resolution Steps

#### Option A: Terminate and restart a stuck call session

If a media room became corrupted or orphaned after network degradation:

1. End the call administratively using the Stream Server SDK:
   ```bash
   # From an administrative task or console
   const call = streamVideo.video.call("default", meetingId);
   await call.end();
   ```
2. Have participants refresh their browser window. A new call session will initialize cleanly.

#### Option B: Refresh Stream and OpenAI API credentials

If token generation is failing production-wide:

1. Check production environment variables in your deployment portal (Vercel, AWS, etc.).
2. Ensure `NEXT_PUBLIC_STREAM_VIDEO_API_KEY` and `STREAM_SECRET_KEY` match your production Stream app (not development app).
3. If secrets were rotated, redeploy the frontend and backend instances immediately.

#### Option C: Escalate

| Escalate to                  | When                                                                 | Contact Channel                                                   |
| :--------------------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------- |
| **Stream Video Support**     | Global SFU packet loss or widespread ICE negotiation failures        | [Stream Support](https://getstream.io/support/) (Priority ticket) |
| **OpenAI Support**           | Realtime voice WebSocket handshakes consistently return 5xx          | [OpenAI Support](https://help.openai.com/)                        |
| **On-Call Engineering Lead** | Client application deployment causing widespread call bundle crashes | PagerDuty / Slack `#incidents`                                    |

### Verification (Production)

- [ ] New call sessions show ICE connection state `connected` or `completed` in Stream Video Analytics.
- [ ] Packet loss across sessions is below 1%.
- [ ] AI agent participants join calls within 3 seconds of session start.

---

## Post-Incident

- [ ] Review participant network telemetry in Stream Dashboard to determine if specific client geographies experienced regional routing issues.
- [ ] If call tokens expired during long sessions, evaluate increasing token validity in `src/modules/meetings/server/procedures.ts` (`expirationTime`).
- [ ] Confirm automated health checks periodically test the `/call/[id]` route and token generation endpoints.

# Runbook: Stream Webhook Ingress & Tunnel Failures

**Service:** Stream Webhook Ingress (`src/app/api/webhook/route.ts`)  
**Severity:** P2 (Calls stall in `upcoming` status; live AI bot fails to connect) / P3 (Local development tunnel issue)  
**Owner:** Platform & Core Engineering  
**Last reviewed:** 2026-09-27  
**Estimated resolution time:** 10 minutes

---

## Trigger

This runbook applies when:

- A video call starts in the UI, but the meeting record in the database remains stuck with status `upcoming`.
- OR: Next.js server logs show `401 Invalid signature` or `Missing signature or API key` on requests to `/api/webhook`.
- OR: The ngrok terminal outputs `ERR_NGROK_3200` or connection refused errors.
- OR: The Stream Dashboard webhook logs indicate delivery failure rates above 5% with `502 Bad Gateway` or `ETIMEDOUT`.

---

## Impact Assessment

Before taking recovery actions, assess the scope of the failure:

- [ ] **Environment:** Is this failing in local development (`localhost`) or in deployed production?
- [ ] **Meeting Lifecycle:** Are meetings failing to transition to `active` when callers join?
- [ ] **Bot Attendance:** Is the OpenAI Realtime AI agent failing to enter the live call?
- [ ] **Downstream Pipeline:** Are completed calls missing transcripts because `call.transcription_ready` never reached Inngest?

---

## 🛠 Local Development

> **Start here.** Most webhook failures occur locally because Stream Video cannot send webhooks directly to `localhost`. A public tunnel (ngrok) and matching secret key are mandatory.

### Checklist

- [ ] Next.js app server is running on `http://localhost:3000` (`npm run dev`).
- [ ] The ngrok tunnel process is active (`npm run dev:webhook`).
- [ ] Stream Dashboard has the active ngrok URL configured under Webhooks.
- [ ] Both `STREAM_API_KEY` and `STREAM_SECRET_KEY` in `.env` match your Stream Dashboard project credentials.

### Diagnosis

Run these checks in order:

#### 1. Check if the ngrok tunnel is alive

Check the terminal window running ngrok or inspect the ngrok local web dashboard:

```bash
# Open or curl the ngrok client inspect API
curl -s http://127.0.0.1:4040/api/tunnels
```

**Expected output:** A JSON payload containing a `public_url` with `https://*.ngrok-free.app` forwarding to `http://localhost:3000`.

- If connection is refused: ngrok is not running. Proceed to **Option A**.
- If the tunnel exists: copy the `public_url` and proceed to step 2.

#### 2. Verify webhook URL configured in Stream Dashboard

1. Navigate to the **Stream Dashboard** > Select your App > **Video & Audio** > **Webhooks**.
2. Compare the configured **Webhook URL** with your active ngrok URL.
3. The URL must match the format:
   ```
   https://<your-ngrok-subdomain>.ngrok-free.app/api/webhook
   ```
4. If the subdomain differs (e.g., from an ngrok restart), proceed to **Option B**.

#### 3. Inspect recent webhook deliveries in Next.js logs

Observe your Next.js console output while triggering an action (e.g. entering a call lobby). Look for errors:

- `Invalid signature` → Proceed to **Option C**.
- `Missing signature or API key` → Webhook was sent without Stream auth headers or from a manual test tool.
- No log entries appearing → Tunnel is dead or Stream Webhook is pointing to the wrong URL.

### Resolution Steps

Work through these options in order:

#### Option A: Start or restart the local ngrok tunnel

If ngrok stopped or crashed:

```bash
# Start the pre-configured ngrok tunnel script
npm run dev:webhook
```

**Expected output:**

```text
Forwarding   https://a1b2-c3d4.ngrok-free.app -> http://localhost:3000
```

Once running, proceed immediately to **Option B** to update Stream.

#### Option B: Sync the Stream Dashboard webhook URL

Every time a free ngrok session restarts, the public URL changes:

1. Open your **Stream Dashboard** (`https://dashboard.getstream.io/`).
2. Go to **Video & Audio** > **Webhooks**.
3. Set the **Webhook URL** to:
   ```
   https://<new-ngrok-subdomain>.ngrok-free.app/api/webhook
   ```
4. Ensure the following webhook events are toggled **ON**:
   - `call.session_started`
   - `call.session_ended`
   - `call.session_participant_left`
   - `call.transcription_ready`
   - `call.recording_ready`
   - `message.new`
5. Click **Save Changes**.

#### Option C: Correct HMAC secret mismatches

If Next.js logs show `401 Invalid signature`:

1. Inspect your local `.env` file:
   ```bash
   cat .env | grep -E "STREAM_API_KEY|STREAM_SECRET_KEY"
   ```
2. Verify in **Stream Dashboard** > **App Keys** that `STREAM_SECRET_KEY` exactly matches the value in `.env`.
3. If whitespace or incorrect characters exist, update `.env`:
   ```env
   STREAM_API_KEY=your_actual_api_key
   STREAM_SECRET_KEY=your_actual_secret_key
   ```
4. Restart your local Next.js dev server (`Ctrl+C` then `npm run dev`) to reload the environment variables into the server runtime.

### Verification (Local)

1. Open a meeting in your browser (`http://localhost:3000/call/<meeting-id>`).
2. Join the call from the lobby.
3. In the ngrok web inspector (`http://127.0.0.1:4040`), verify that a `POST /api/webhook` arrives and returns **`200 OK`**.
4. In your terminal running Next.js, verify the call state changes without throwing signature errors.
5. In your database (or Drizzle Studio `npm run db:studio`), verify the meeting `status` transitions from `upcoming` to `active`.

---

## 🚀 Production

> **Secondary section.** In production environments, webhooks are routed directly over public HTTPS to your domain (e.g. `https://meetmind.app/api/webhook`).

### Trigger Confirmation

- Next.js serverless logs (e.g. Vercel / Cloudwatch) display elevated 401s or 500s on `/api/webhook`.
- Stream Dashboard Webhook Logs show repeated delivery failures or exponential retry backoffs.
- Users report meetings not showing summaries after concluding.

### Diagnosis

1. **Check Stream Webhook Delivery Status:**
   - Go to **Stream Dashboard** > **Logs** > **Webhook Logs**.
   - Filter by status `4xx` and `5xx`.
   - Read the response body returned by your server.

2. **Verify Production Secret Configuration:**
   - In your deployment hosting platform (Vercel, AWS, Fly.io), verify that `STREAM_SECRET_KEY` is defined in production environment variables.
   - Confirm that the secret was not truncated during copy-paste.

3. **Verify API Ingress Endpoint Accessibility:**
   - Send an unauthenticated test request to the endpoint:
     ```bash
     curl -i -X POST https://<your-production-domain>/api/webhook
     ```
   - **Expected output:** HTTP `401 Unauthorized` with `{"error":"Missing signature or API key"}`.
   - _If HTTP 404:_ The deployment route does not match or a middleware rewrite is intercepting requests.
   - _If HTTP 502/504:_ The edge runtime or serverless function is timing out or failing during initialization.

### Resolution Steps

#### Option A: Resync production environment variables

If `STREAM_SECRET_KEY` or `STREAM_API_KEY` was updated in the Stream portal:

1. Update the environment variables in your deployment dashboard.
2. Trigger an immediate redeploy with fresh build caches:
   ```bash
   # Example if using Vercel CLI
   vercel redeploy --prod
   ```
3. Once redeployed, test with a test webhook from the Stream portal.

#### Option B: Replay failed webhook events from Stream Dashboard

Stream buffers failed webhooks and attempts retries:

1. In the **Stream Dashboard** > **Webhook Logs**, locate failed `call.transcription_ready` or `call.session_ended` events.
2. Click **Re-send** on the critical missed events to retroactively trigger background processing in Inngest.

#### Option C: Escalate

If webhooks are failing despite correct credentials and reachable endpoints:

| Escalate to        | When                                                           | Contact Channel                                        |
| :----------------- | :------------------------------------------------------------- | :----------------------------------------------------- |
| **Stream Support** | Webhook delivery stalled globally or status page shows outages | [Stream Support Portal](https://getstream.io/support/) |
| **Platform Lead**  | Route handler throwing uncaught runtime exceptions             | Slack `#incidents` / PagerDuty                         |

### Verification (Production)

- [ ] Stream Webhook Logs report HTTP 200 responses with zero dropouts over the last 15 minutes.
- [ ] Active call records in Neon PostgreSQL show `status = 'active'` during ongoing calls and `status = 'processing'` upon conclusion.
- [ ] No `Invalid signature` exceptions appearing in deployment runtime logs.

---

## Post-Incident

- [ ] If the webhook signing secret was rotated, verify all environments (dev, staging, prod) were synchronized.
- [ ] If meetings were left in `upcoming` despite ending, run an administrative backfill script to reconcile meeting states with Stream Call session histories.
- [ ] Document any ngrok configuration updates in `README.md` if script arguments changed.

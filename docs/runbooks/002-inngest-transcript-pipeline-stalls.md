# Runbook: Inngest Pipeline Stalls & Summarization Failures

**Service:** Inngest Workflow Orchestrator & Meeting Pipeline (`src/inngest/functions.ts`)  
**Severity:** P2 (Meetings remain in `processing` indefinitely; summaries & notes are missing)  
**Owner:** AI & Data Platform Engineering  
**Last reviewed:** 2026-09-27  
**Estimated resolution time:** 10 minutes

---

## Trigger

This runbook applies when:

- A completed video call has a status of `processing` for longer than 5 minutes without transitioning to `completed`.
- OR: The Inngest Dev Server (`http://localhost:8288`) or Inngest Cloud dashboard reports `FAILED` on the `meetings-processing` function.
- OR: Server logs display OpenAI API rate limit errors (`429 Too Many Requests`) or context window truncation exceptions.
- OR: The meeting summary tab in the UI displays a continuous spinner or "Summary generation in progress" after the recording is already available.

---

## Impact Assessment

Before taking recovery actions, assess the pipeline state:

- [ ] **Data Integrity:** Is the raw transcript URL (`transcriptUrl`) saved in the database?
- [ ] **Meeting Scope:** Is this affecting a single meeting or all newly concluded meetings?
- [ ] **User Experience:** Are users unable to view the `### Overview` and `### Notes` or converse with the AI in post-call chat?
- [ ] **Billing / Quotas:** Is the OpenAI account out of credits or hitting Tier-specific tokens-per-minute (TPM) limits?

---

## 🛠 Local Development

> **Start here.** Locally, Inngest relies on the Inngest Dev Server running concurrently with Next.js to forward events to `http://localhost:3000/api/inngest`.

### Checklist

- [ ] Next.js app server is running on `http://localhost:3000`.
- [ ] Inngest Dev Server is running (`npx inngest-cli dev`).
- [ ] `OPENAI_API_KEY` is present in `.env` and has active credits.
- [ ] Neon PostgreSQL is accessible and Drizzle schema migrations are current (`npm run db:push`).

### Diagnosis

Run these checks in order:

#### 1. Check if the Inngest Dev Server is running

Open your browser to the local Inngest dashboard:

```
http://localhost:8288
```

- **If page does not load:** The Inngest CLI is not running. Proceed to **Option A**.
- **If page loads:** Check the **Apps** tab. You should see `MeetMind` connected to `http://localhost:3000/api/inngest` with 1 registered function (`meetings-processing`).
  - If the app is disconnected or reports sync errors: Proceed to **Option B**.

#### 2. Inspect the failed step in the Inngest Execution Tree

Click the **Runs** tab in the Inngest Dev Server dashboard (`http://localhost:8288/runs`) and locate the failed `meetings/processing` run. Inspect which step failed:

```
meetings-processing
├── step.run("fetch-transcript")    --> [Status: Completed | Failed]
├── step.run("parse-transcript")    --> [Status: Completed | Failed]
├── step.run("add-speakers")        --> [Status: Completed | Failed]
├── summarizer.run                  --> [Status: Completed | Failed]
└── step.run("save-summary")        --> [Status: Completed | Failed]
```

- **Failure at `fetch-transcript`:** The signed Stream transcript URL expired or was blocked by network egress.
- **Failure at `parse-transcript`:** The transcript file is empty or corrupted (not valid JSONL).
- **Failure at `add-speakers`:** Database query failure; participant IDs in the transcript do not resolve cleanly. Proceed to **Option C**.
- **Failure at `summarizer.run`:** OpenAI API error (e.g. invalid key, quota exhausted, or prompt token overflow). Proceed to **Option D**.

### Resolution Steps

Work through these options in order:

#### Option A: Start the Inngest local development server

In a separate terminal window at the project root:

```bash
npx inngest-cli dev -u http://localhost:3000/api/inngest
```

**Expected output:**

```text
Inngest Dev Server running at: http://127.0.0.1:8288
[APPS] Connected to Next.js app at http://localhost:3000/api/inngest
[FUNCS] Synchronized 1 function: meetings-processing
```

Once connected, open the Inngest UI, navigate to the failed run, and click **Rerun** to re-execute without regenerating the call.

#### Option B: Re-sync Next.js with Inngest

If Next.js was restarted while Inngest CLI was running, the webhook handshake can become stale:

1. Send a GET request to the local API endpoint:
   ```bash
   curl -i http://localhost:3000/api/inngest
   ```
2. **Expected output:** HTTP `200 OK` with JSON headers containing `x-inngest-sdk`.
3. In the Inngest Dev Server dashboard (`http://localhost:8288`), click **Apps** > **Refresh App**.

#### Option C: Handle speaker enrichment failures

If `add-speakers` throws an error due to missing participant records:

1. Check the meeting record in Drizzle Studio (`npm run db:studio`):
   ```sql
   SELECT id, name, "userId", "agentId", "transcriptUrl" FROM meetings WHERE id = '<meeting-id>';
   ```
2. Verify that the referenced `agentId` exists in the `agents` table. If the assigned agent was deleted while the call was live, update the meeting to use an existing agent ID or restore the agent record.
3. Once corrected, click **Rerun from failed step** in the Inngest dashboard.

#### Option D: Address OpenAI API errors & rate limits

If `summarizer.run` fails with an OpenAI error:

1. Test your API key validity:
   ```bash
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer $(cat .env | grep OPENAI_API_KEY | cut -d '=' -f2)"
   ```
2. If `401 Unauthorized`: Replace `OPENAI_API_KEY` in `.env` with a valid key.
3. If `429 Too Many Requests`: Your organization has exceeded TPM (tokens per minute) or account credit balance is zero. Add billing credits in the OpenAI platform.
4. Once resolved, re-run the failed Inngest execution.

### Verification (Local)

1. Check the Inngest run: All 5 steps must display green checkmarks (`Completed`).
2. Verify the meeting status in PostgreSQL:
   ```sql
   SELECT status, summary FROM meetings WHERE id = '<meeting-id>';
   ```
   **Expected output:** `status = 'completed'` and `summary` contains markdown beginning with `### Overview`.
3. Refresh the meeting view in your browser (`http://localhost:3000/meetings/<meeting-id>`). The **Summary** tab should display the formatted notes and action items.

---

## 🚀 Production

> **Secondary section.** In production, Inngest Cloud receives events from the Stream webhook handler (`inngest.send`) and securely dispatches jobs to your public `/api/inngest` endpoint.

### Trigger Confirmation

- Inngest Cloud alerts fire for function error rates > 1%.
- Production database monitoring shows meetings with `status = 'processing'` and `endedAt < NOW() - INTERVAL '10 minutes'`.

### Diagnosis

1. **Check Inngest Cloud Status:**
   - Log into [Inngest Cloud](https://app.inngest.com/).
   - Navigate to **Functions** > `meetings-processing` > **Runs**.
   - Filter by status `Failed`.

2. **Inspect Error Stack Trace:**
   - Click on the failed execution run to view step logs.
   - Note whether failure occurred during external API execution (OpenAI) or database persistence (`save-summary`).

3. **Verify Production Inngest Signing Key:**
   - Check if the deployment logs report `Inngest signing key is invalid` or unauthorized requests to `/api/inngest`.

### Resolution Steps

#### Option A: Replay failed jobs from Inngest Cloud

Because the pipeline uses `step.run` memoization, replaying a failed run will not re-fetch the transcript or incur duplicate OpenAI tokens for already-completed steps:

1. In the **Inngest Cloud Dashboard**, select all failed runs from the incident window.
2. Click **Bulk Actions** > **Rerun**.
3. Monitor the executions to confirm they fast-forward past completed steps and finish the remaining stages.

#### Option B: Handle long transcript context overflow

If a multi-hour meeting transcript exceeds GPT-4o's context limit or causes timeout:

1. Inspect the transcript size in the failed `fetch-transcript` step payload.
2. If the payload exceeds token limits, temporarily override the summarizer agent configuration to truncate or chunk transcripts before passing to the model.
3. Re-deploy the application.

#### Option C: Escalate

| Escalate to         | When                                                                        | Contact Channel                                         |
| :------------------ | :-------------------------------------------------------------------------- | :------------------------------------------------------ |
| **Inngest Support** | Inngest Cloud webhook delivery drops or status shows degraded orchestration | [Inngest Status](https://status.inngest.com/) / Support |
| **OpenAI Support**  | OpenAI GPT-4o API outages or global rate limit issues                       | [OpenAI Status](https://status.openai.com/)             |
| **Lead Engineer**   | Persistent database deadlock during `save-summary`                          | Slack `#incidents`                                      |

### Verification (Production)

- [ ] Inngest Cloud displays zero active failed runs for `meetings-processing`.
- [ ] Database query confirms no meetings remain in `processing` older than 10 minutes:
  ```sql
  SELECT count(*) FROM meetings WHERE status = 'processing' AND "endedAt" < NOW() - INTERVAL '10 minutes';
  ```
  _(Expected: `0`)_
- [ ] End-users can open completed meetings and read generated summaries.

---

## Post-Incident

- [ ] Review Inngest retry configuration (`retries` parameter) in `src/inngest/functions.ts` to ensure adequate exponential backoff for transient rate limits.
- [ ] If transcripts frequently hit OpenAI token limits, create a ticket to implement sliding-window transcript chunking.
- [ ] Confirm OpenAI usage caps and billing alerts are set up to avoid sudden quota blockages.

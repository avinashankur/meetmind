# Agent Guide

This repository is MeetMind, a Next.js app with a marketing landing page and an authenticated meeting/agent workspace. Read `CONTEXT.md`, `DESIGN.md` and `ARCHITECTURE.md` when a task touches architecture or UI.

## GitHub issues first

Before planning or editing code, check the existing GitHub issues:

```bash
gh issue list --state open --limit 50
```

If the request sounds like it may already have been filed, search closed issues too:

```bash
gh issue list --state all --search "<key terms>" --limit 20
```

Then decide:

- **The user's request matches an open issue** — implement against that issue, reference `#N` in your plan and commits, and do not create a duplicate.
- **The request matches a closed issue** — tell the user and confirm whether to reopen it or treat the work as new.
- **No match** — proceed with the task.

When work for an existing issue is complete, close it with a short comment linking the implementation:

```bash
gh issue close <number> --comment "Implemented in <commit/PR>. <one-line summary>"
```

## Creating issues

Do **not** create GitHub issues unless the user explicitly asks for it.

When asked, use the `issue-tracker-gh` skill and:

- check open and closed issues for duplicates first;
- split work by type (bug, enhancement, documentation) rather than filing one giant issue;
- include the problem, proposed solution, related files, acceptance criteria and out-of-scope items;
- never invent product claims, testimonials or technical specs.

## Working in this codebase

- Follow `DESIGN.md` for tokens, typography, motion and component composition.
- Landing copy and mock data live in `src/modules/home/lander/constants.ts`; keep components presentational.
- Prefer server components; client components only where interaction requires them.
- Run `npm run lint` and `npm test` when relevant. Use `npm run format` before committing.
- Do not overwrite unrelated user work in the working tree.

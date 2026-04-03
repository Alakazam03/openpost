# OpenLinkedIn MVP

OpenLinkedIn is a lightweight LinkedIn post scheduler and AI writer inspired by OpenTweet. It focuses on one platform, one workflow, and zero clutter.

## Architecture overview

- **Frontend:** Next.js + React + Tailwind (mobile-first UI)
- **Backend:** NestJS REST API
- **Database:** PostgreSQL via `pg`
- **Queue:** BullMQ + Redis for scheduled publishing jobs
- **Auth:** LinkedIn OAuth 2.0 (server-side exchange)
- **AI:** OpenAI text-only completions

See `docs/ARCHITECTURE.md` for details.

## Monorepo structure

```
apps/
  api/        NestJS API
  web/        Next.js web app
packages/
  shared/     Shared types and utils
```

## Setup

1. Copy environment files:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

2. Install dependencies:

```bash
npm install
```

3. Run services (requires PostgreSQL + Redis):

```bash
npm run dev:api
npm run dev:web
```

## Deployment

- **API:** Deploy `apps/api` as a Node service with PostgreSQL + Redis.
- **Web:** Deploy `apps/web` on Vercel or any Node host.
- **Env:** Ensure all values in `.env.example` are set in the target environment.

See `docs/DEPLOYMENT.md` for production guidance.

## Design handoff

Figma-ready MVP screen specs and importable SVG wireframes are available in `docs/FIGMA_SCREENS.md` and `docs/figma/`.

## Product planning

- SuperShrimp-style build plan: `docs/SUPERSHRIMP_IMPLEMENTATION_PLAN.md`

## Build progress (SuperShrimp-style MVP)

- ✅ Step 1.1: Added posture scoring `v1` + `v2` endpoints with harness tests.
- ✅ Step 1: Core web dashboard shell adapted for posture analytics.
- ✅ Step 1: API starter endpoints added for `sessions`, `stats`, and `licenses`.
- 🔜 Step 2: Wire desktop capture/inference client and persist minute-level aggregates.

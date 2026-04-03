# SuperShrimp-style Product Plan v2 (using this monorepo as the base)

## Context and constraints

- Target reference product: https://www.supershrimp.io/ (desktop-first posture coaching app).
- Requested target repo: https://github.com/Alakazam33/solidify.
- Current status of `Alakazam33/solidify` as of **April 3, 2026**: repository is public and empty, so implementation should start by scaffolding from this `openpost` monorepo architecture and then pushing into `solidify`.

## Outcome we are planning

Build a desktop + web companion product that delivers:

1. Real-time posture scoring from webcam (0–100).
2. Slouch alerts while running in background.
3. Progress analytics over time.
4. XP, levels, and lightweight leaderboard.
5. Privacy-first local inference with explicit user controls.
6. One-time purchase + license validation flow.

## Why this repo is a good starter

This repository already has:

- **Web app shell** (`apps/web`) for marketing/dashboard/product UI.
- **NestJS API** (`apps/api`) with modular boundaries and DTO patterns.
- **PostgreSQL + Redis queue pattern** for background work and event processing.
- Existing module composition in `AppModule` (`Posts`, `AI`, `Auth`, `Settings`, `Queue`) that can be adapted into posture-specific modules.

## Recommended technical architecture

### 1) Product surfaces

- **Desktop app (primary):** Tauri + Rust + web frontend.
  - Enables reliable background monitoring + native notifications + camera integration.
- **Web app (secondary):** Next.js marketing site + account/license dashboard.
- **API service:** NestJS for auth, licensing, telemetry aggregation, leaderboard.

### 2) Inference approach

- **On-device model execution** (no frame upload):
  - MediaPipe Pose / MoveNet in local runtime (WASM or native bindings).
  - Compute posture features per frame: head tilt, shoulder asymmetry, torso/neck proxy from keypoints.
- **Scoring engine:**
  - Normalize features into a 0–100 posture score.
  - Add adaptive baseline calibration during onboarding.
  - Smooth score with EMA / rolling window to reduce jitter.

### 3) Data/storage split

- **Local (desktop DB / encrypted file):**
  - Pose keypoint summaries, per-minute score, notification history.
  - Optional short-retention raw keypoint traces for debugging only.
- **Server (Postgres):**
  - User profile, license state, aggregate daily stats, XP totals, leaderboard snapshots.

### 4) Job/queue usage

Repurpose Redis/BullMQ patterns for:

- Daily stat rollups.
- Leaderboard recalculation.
- Email/license events.
- Optional anomaly detection on aggregated metrics.

## CI/CD plan (GitHub Actions)

Use GitHub Actions from day 1.

- `.github/workflows/ci.yml` (on PR + push to main)
  - `npm ci`, lint, typecheck, tests, and workspace builds.
- `.github/workflows/desktop-release.yml` (on `v*` tags)
  - Matrix build/signing for macOS/Windows/Linux desktop binaries.
- `.github/workflows/site-deploy.yml`
  - Deploy website after CI success.
- `.github/workflows/api-deploy.yml`
  - Build and publish API artifact/container, then deploy.

**Quality gates**
- Required checks: lint + typecheck + tests + build.
- Branch protection on `main` (PR review + required checks).
- Release notes/versioning via conventional commits + changesets.

## Posture detector implementation plan

### Stage 1 — Baseline detector (week 1)

- Run MediaPipe Pose at 10–15 FPS.
- Extract key landmarks (ears, shoulders, hips).
- Compute features:
  - head-forward angle,
  - shoulder level delta,
  - torso lean angle.
- Initial score formula (clamped 0–100):
  - `score = 100 - (w1*head + w2*shoulder + w3*lean)`.
- Trigger warning only after sustained low score window (e.g., 8–12s).

### Stage 2 — Per-user calibration (week 2)

- 20–30 second onboarding calibration.
- Capture feature baseline mean/std for each user.
- Convert live values to z-scores against baseline.
- Apply hysteresis + cooldown to minimize false positives.

### Stage 3 — Robustness and optimization (week 3+)

- Confidence gating (ignore low-confidence frames).
- Occlusion handling and “camera positioning help” prompts.
- Adaptive sampling for CPU/battery targets.
- Suspend inference when machine is idle/locked.

### Suggested package shape (`packages/posture-core`)

- `model.ts` (inference provider abstraction)
- `features.ts` (geometry feature extraction)
- `score.ts` (calibration, smoothing, scoring)
- `alerts.ts` (threshold + cooldown state machine)
- `fixtures/` (recorded traces for deterministic tests)

## Suggested module map (from current repo to new domain)

- `AuthModule` → Email magic link + OAuth (optional) + desktop device linking.
- `SettingsModule` → Notification threshold, reminder cadence, camera choice, privacy toggles.
- `PostsModule` → Replace with `SessionsModule` (monitoring sessions + summaries).
- `AiModule` → Replace with `CoachingModule` (LLM-generated ergonomics tips from aggregate trends only).
- `QueueModule` stays, with new workers for analytics and gamification.

## Feature roadmap (phased)

### Phase 0 — Bootstrap into `solidify` (1 week)

- Initialize monorepo structure mirroring this project:
  - `apps/web`, `apps/api`, `packages/shared`.
- Add GitHub Actions CI, linting, and env templates.
- Add database schema migrations for users/devices/licenses/sessions.

### Phase 1 — Core posture MVP (2–3 weeks)

- Desktop webcam capture + local pose inference loop.
- Real-time score display + simple “sit straighter” feedback.
- Local notification when score below threshold for sustained N seconds.
- Session timeline with minute-level buckets.

### Phase 2 — Account + licensing (1–2 weeks)

- One-time purchase flow with Stripe checkout + webhook verification.
- Device-bound license issuance (single-device first).
- In-app activation and offline grace window.

### Phase 3 — Analytics + gamification (2 weeks)

- Daily/weekly posture trends.
- Good-vs-bad posture minutes split.
- XP accumulation, 10-level progression, and profile cosmetics.
- Global leaderboard (opt-in only).

### Phase 4 — Hardening + privacy/compliance (1–2 weeks)

- Privacy controls:
  - “No image retention” hard guarantee.
  - Local-only mode with server sync disabled.
- Security:
  - Token encryption at rest.
  - Signed update channel.
- Performance:
  - CPU/battery budgets + adaptive frame sampling.

## Database outline (initial)

- `users`
- `devices`
- `licenses`
- `sessions`
- `session_minute_scores`
- `daily_stats`
- `xp_events`
- `leaderboard_snapshots`
- `user_settings`

## APIs to define first

- `POST /auth/device-link/start`
- `POST /auth/device-link/complete`
- `POST /licenses/activate`
- `GET /licenses/me`
- `POST /sessions/start`
- `POST /sessions/:id/heartbeat`
- `POST /sessions/:id/end`
- `GET /stats/daily`
- `GET /stats/weekly`
- `GET /leaderboard`

## UX parity checklist vs SuperShrimp reference

- Hero + clear value proposition.
- “Score 0–100” visual in product demo.
- Non-intrusive slouch alert preview.
- Progress analytics section.
- Gamified levels and leaderboard teaser.
- Privacy-first messaging block.
- One-time payment CTA + FAQ.

## Risks and mitigations

- **Model accuracy variance across camera positions**
  - Mitigation: guided calibration, confidence thresholding, per-user baseline.
- **Battery/CPU overhead**
  - Mitigation: dynamic sampling and suspend inference on idle/locked screen.
- **False-positive notifications**
  - Mitigation: debounce windows + trend-based triggering (not single-frame).
- **License abuse**
  - Mitigation: signed device tokens + periodic revalidation + bounded offline window.

## Delivery plan for next 14 days

1. Scaffold `solidify` with this monorepo shape.
2. Implement desktop inference prototype and scoring service.
3. Implement `sessions` ingest endpoints and DB writes.
4. Add basic dashboard charts and streak widget.
5. Add Stripe payment + license activation endpoint.
6. Run private alpha (20 users), collect false-positive and battery metrics.

## Success metrics

- Daily active usage time per user.
- Median posture score improvement after 2 weeks.
- Notification correction rate (user posture improves within 60 seconds).
- 7-day retention.
- Refund rate and support ticket volume.

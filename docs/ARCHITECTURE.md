# OpenLinkedIn Architecture

## Goals
- Single-platform LinkedIn scheduling with minimal UI.
- Reliable scheduling with queue retries and logs.
- Simple REST APIs with strict input validation.

## System diagram (text)
- **Web (Next.js)** → **API (NestJS)** → **PostgreSQL**
- **API** → **BullMQ (Redis)** → **LinkedIn Publish API**
- **API** → **OpenAI API** for post drafting

## Core modules

### API
- `AuthModule`: LinkedIn OAuth 2.0 connect/disconnect.
- `PostsModule`: Drafts, scheduling, publishing.
- `AI Module`: Post generation with tone + type.
- `SettingsModule`: Timezone, default publish time.
- `QueueModule`: BullMQ queues + workers.

### Web
- **Onboarding**: Explain permissions + connect LinkedIn.
- **Write Post**: Editor, counter, hashtags, image/PDF upload.
- **AI Assistant**: Type + tone + editable output.
- **Dashboard**: Upcoming posts list + edit/delete.
- **Settings**: Timezone, default post time, disconnect.

## Data model (simplified)
- `users`: LinkedIn profile + tokens.
- `posts`: content, status, media, schedule time.
- `scheduled_jobs`: job metadata and retries.
- `settings`: timezone, default time.

## LinkedIn API limitations
LinkedIn’s API access requires review and may restrict publishing endpoints. If the official publishing API is not available, consider fallbacks:
- Manual publish reminders (email/notification).
- Partner with a LinkedIn marketing developer program.

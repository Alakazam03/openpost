# Deployment Guide

## Requirements
- Node.js 20+
- PostgreSQL 14+
- Redis 6+

## API deployment
1. Set environment variables from `apps/api/.env.example`.
2. Build the API:

```bash
npm --workspace apps/api run build
```

3. Run the API service:

```bash
node apps/api/dist/main.js
```

## Web deployment
1. Set environment variables from `apps/web/.env.example`.
2. Build the web app:

```bash
npm --workspace apps/web run build
```

3. Start the web server:

```bash
npm --workspace apps/web run start
```

## Notes
- Ensure Redis is reachable by the API worker.
- Configure HTTPS callbacks for LinkedIn OAuth in production.

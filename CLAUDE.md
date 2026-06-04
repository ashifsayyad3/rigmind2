# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RigMind AI™ is an enterprise offshore rig intelligence platform for monitoring, predicting, and managing equipment failures on offshore drilling rigs. It is a Turbo monorepo with two TypeScript applications and four Python ML microservices.

## Commands

All commands run from the repo root via Turbo unless noted.

```bash
# Development
npm run dev            # Start all apps in parallel (watch mode)
npm run build          # Build all workspaces
npm run lint           # ESLint across all workspaces
npm run type-check     # TypeScript type checking across all workspaces
npm run test           # Run all Jest tests (80% branch/function/line threshold enforced)
npm run clean          # Remove all build artifacts

# Database (Prisma)
npm run db:generate    # Regenerate Prisma client from schema  ← run after schema changes
npm run db:migrate     # Deploy pending migrations to Azure SQL
npm run db:push        # Push schema changes directly (dev only)
npm run db:seed        # Seed initial data

# Docker (local dev stack)
npm run docker:up      # Start all services via docker-compose
npm run docker:down    # Stop all services
```

To run a single test file: `npx jest path/to/test.spec.ts` from the relevant workspace directory.

**Important:** Run `npm run db:generate` whenever `packages/database/schema.prisma` changes. The Prisma engine DLL is locked while the API is running — stop it first (`Ctrl+C`), generate, then restart.

## Architecture

### Monorepo Layout

```
apps/
  web/             # Next.js 15 frontend (port 3000)
  api-gateway/     # NestJS REST API (port 4000)
packages/
  database/        # Prisma schema (155+ tables, Azure SQL) + migrations
  config/          # Shared tsconfig.base.json
ai-services/
  failure-prediction/   # FastAPI, XGBoost + LightGBM ensemble (port 8001)
  anomaly-detection/    # FastAPI, Isolation Forest + LSTM (port 8002)
  nlp-copilot/          # FastAPI, RAG + Anthropic Claude API (port 8003)
  rul-engine/           # FastAPI, Weibull survival analysis (port 8004)
automation/
  n8n/             # Workflow orchestration (port 5678)
infrastructure/
  docker/          # Multi-stage Dockerfiles
  k8s/             # Kubernetes manifests (base + overlays, kustomize)
  helm/            # Helm charts
  terraform/       # Azure IaC (modules for AKS, SQL, Redis, etc.)
```

### Frontend (`apps/web`)

Next.js 15 (Turbopack) with React 19, NextAuth.js 5 beta (Azure AD SSO), Tailwind CSS + Radix UI, Zustand + React Query, Socket.IO client, Three.js/R3F for 3D rig visualization, and AmCharts 4 for time-series dashboards.

- **AmCharts imports**: use `@amcharts/amcharts4/themes/amchartsdark` and `@amcharts/amcharts4/themes/animated` — NOT `@amcharts/amcharts4-themes/*` (that package doesn't exist).
- **CSS**: PostCSS config is `apps/web/postcss.config.mjs`. The `@import url(...)` for Google Fonts **must** come before all `@tailwind` directives in `globals.css`.
- **API client**: all routes in `apps/web/src/lib/api/client.ts` use explicit `/api/v1/` prefixes (NestJS URI versioning requires this; no interceptor rewrites paths). Default Bearer token is set as a constant `DEV_TOKEN` directly on the axios instance. `DEV_TOKEN` is a real Azure AD JWT that expires — if API calls return 401 in the browser, replace it with a fresh token. The `localStorage` key `rigmind-v1` → `state.token` overrides it at runtime.
- **SSR / hydration**: components using `Date`, `Math.random`, or browser APIs must use `useEffect` + `useState` with empty initial state to avoid hydration mismatches.
- **Env**: `apps/web/.env.local` holds `NEXT_PUBLIC_API_URL=http://localhost:4000` and NextAuth config.

### API Gateway (`apps/api-gateway`)

NestJS 10 with 15 feature modules (auth, rigs, wells, failures, maintenance, certificates, npt, observations, recommendations, fleet, copilot, notifications, rtm, bop, kpi). Uses Prisma for Azure SQL, Redis for caching (5-min TTL), Socket.IO for real-time events, JWT + Azure AD RBAC, and rate limiting (100 req/min per user). Swagger docs are auto-generated at `/api/docs`.

**Local dev auth bypass**: both `JwtAuthGuard` and `RolesGuard` short-circuit when `NODE_ENV=development`, injecting a mock Admin user (`id:1, role: Admin`) so no token validation occurs. Azure AD strategy is excluded from `auth.module.ts` entirely for local dev.

**Optional services**: the API boots without Redis (falls back to in-memory cache) and without `ANTHROPIC_API_KEY` (copilot endpoints return 503). The `compression` middleware must be imported as `import * as compression from 'compression'` (CommonJS interop).

**URI versioning**: `app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })` — all controllers use `version: '1'`, so every route is reachable at `/api/v1/<resource>`.

### AI Services (`ai-services/`)

Four independent FastAPI Python microservices. Each connects directly to Azure SQL and exposes HTTP endpoints consumed by the API gateway's `copilot` and `rtm` modules. The `nlp-copilot` service implements RAG using sentence embeddings + cosine similarity before forwarding context to the Anthropic Claude API.

### Database

Single Prisma schema in `packages/database/schema.prisma` targeting Azure SQL Server (155+ tables). All apps share this package. Production DB: `aquilabop.database.windows.net`, database `dev`. Schema uses `@@map(...)` to map camelCase model names to the actual SQL table names (e.g. `@@map("rigs")`, `@@map("KPI")`).

Schema domains: Rig/Well/Component, Failures/CorrectiveActions, Maintenance (deferred tasks), RTM sensor data, Compliance/Certificates, Analytics (KPI/NPT), BOP operations, and Communications.

### Key Integrations

- **Anthropic Claude API** — used in `ai-services/nlp-copilot` and `apps/api-gateway/src/modules/copilot` (gracefully disabled when `ANTHROPIC_API_KEY` is empty)
- **Azure OpenAI** — embeddings for RAG retrieval
- **Azure AD** — SSO for web frontend and API gateway (skipped in local dev)
- **MLflow** — experiment tracking for failure-prediction model training
- **n8n** — ETL workflow automation
- **Redis** — API response caching (falls back to in-memory when unavailable)

### Code Style

Prettier is configured at the root (`package.json`): no semicolons, single quotes, 2-space indent, trailing commas (ES5), 100-char print width. ESLint extends `@typescript-eslint/recommended`. Run `npm run lint` to verify.

### Deployment

Root `.env` holds all environment variables (Azure SQL, Azure AD, Redis, OpenAI, AI service URLs). Production targets Azure AKS via GitHub Actions CI/CD: lint → type-check → test → build → push to Azure Container Registry → rolling update on AKS. Kubernetes manifests use kustomize overlays per environment; Helm charts and Terraform manage Azure infrastructure.

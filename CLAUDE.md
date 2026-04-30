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
npm run db:generate    # Regenerate Prisma client from schema
npm run db:migrate     # Deploy pending migrations to Azure SQL
npm run db:push        # Push schema changes directly (dev only)
npm run db:seed        # Seed initial data

# Docker (local dev stack)
npm run docker:up      # Start all services via docker-compose
npm run docker:down    # Stop all services
```

To run a single test file: `npx jest path/to/test.spec.ts` from the relevant workspace directory.

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

Next.js 15 (Turbopack) with React 19, NextAuth.js 5 beta (Azure AD SSO), Tailwind CSS + Radix UI, Zustand + React Query, Socket.IO client, Three.js/R3F for 3D rig visualization, and AmCharts for time-series dashboards.

### API Gateway (`apps/api-gateway`)

NestJS 10 with 15 feature modules (auth, rigs, wells, failures, maintenance, certificates, npt, observations, recommendations, fleet, copilot, notifications, rtm, bop, kpi). Uses Prisma for Azure SQL, Redis for caching (5-min TTL), Socket.IO for real-time events, JWT + Azure AD RBAC, and rate limiting (100 req/min per user). Swagger docs are auto-generated.

### AI Services (`ai-services/`)

Four independent FastAPI Python microservices. Each connects directly to Azure SQL and exposes HTTP endpoints consumed by the API gateway's `copilot` and `rtm` modules. The `nlp-copilot` service implements RAG using sentence embeddings + cosine similarity before forwarding context to the Anthropic Claude API.

### Database

Single Prisma schema in `packages/database/schema.prisma` targeting Azure SQL Server. All apps share this package. Schema includes domains: Rig/Well/Component, Failures, Maintenance, RTM sensor data, Compliance, Analytics, and Communications.

### Key Integrations

- **Anthropic Claude API** — used in `ai-services/nlp-copilot` and `apps/api-gateway/src/modules/copilot`
- **Azure OpenAI** — embeddings for RAG retrieval
- **Azure AD** — SSO for both web frontend and API gateway
- **MLflow** — experiment tracking for failure-prediction model training
- **n8n** — ETL workflow automation
- **Redis** — API response caching

### Deployment

Docker Compose for local development (requires a `.env` file — see `.env` in the repo root for all required variables covering Azure SQL, Azure AD, Redis, OpenAI embeddings, and AI service URLs). Production targets Azure AKS via GitHub Actions CI/CD: lint → type-check → test → build → push to Azure Container Registry → rolling update on AKS. Kubernetes manifests use kustomize overlays per environment; Helm charts and Terraform manage Azure infrastructure.

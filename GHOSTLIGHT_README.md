# GHOSTLIGHT UI

**GHOSTLIGHT — Illuminating what SOCs don't show**

Frontend prototype for the **Supervisory Analytics Tool for SOC Assessment (SAT-SA)**, SIH Problem Statement **26157**.

GHOSTLIGHT is designed as a supervisory analytics interface for examiners. It is not intended to replace a SOC or operate as a SIEM. The wider solution is intended to help examiners review periodic CSE submissions, identify execution gaps, missing expected activity and anomalies, prioritize manual review, and inspect the evidence behind findings.

## What this repository contains

This archive contains the GHOSTLIGHT **frontend/UI prototype** built with React and Vite. It includes:

- Public/landing and foundation pages
- Analytics and console views
- Entity risk and finding views
- Evidence, claims, review queue, validation and audit views
- Mock API support for running the UI without a backend
- HTTP API adapter for connecting the UI to a compatible backend

> **Important:** This archive is the UI project. It does not contain the complete backend/analytics implementation. The frontend therefore defaults to its local mock data unless `VITE_USE_MOCK=false` is configured.

## Technology stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- Zustand
- Apache ECharts / echarts-for-react
- Framer Motion
- Tailwind CSS
- Lucide React

The project also contains API adapters for either local mock data or an HTTP backend.

## Requirements

Install the following before starting the project:

- Node.js
- pnpm

The repository does not pin a specific Node.js runtime version, so use a Node.js version compatible with the dependencies listed in `package.json`.

## Installation

### 1. Extract or clone the project

Open a terminal in the `ghostlight-ui` directory.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Start the development server

```bash
pnpm dev
```

Vite will print the local development URL in the terminal. Open that URL in a browser.

## Running with mock data

Mock mode is the default.

The application selects the mock adapter unless:

```text
VITE_USE_MOCK=false
```

is explicitly configured.

The mock adapter provides sample data for:

- Entities
- Findings
- Finding evidence
- Declared claims
- Review queue
- Audit ledger
- Validation
- Configuration versions
- Users
- Analysis runs

The mock dataset is generated deterministically with seed `42`, making the prototype suitable for demonstrations without requiring a backend.

### Default mock mode

No environment variable is required. Simply run:

```bash
pnpm install
pnpm dev
```

## Connecting to an HTTP backend

To use the HTTP API adapter instead of the local mock adapter, configure:

```text
VITE_USE_MOCK=false
```

The API base URL is controlled by:

```text
VITE_API_URL
```

If `VITE_API_URL` is not supplied, the frontend uses `/api` as the default API root.

Example `.env` configuration:

```env
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:8000/api
```

The HTTP adapter currently expects these API routes:

| Frontend operation | HTTP route |
|---|---|
| List entities | `GET /entities` |
| Get entity | `GET /entities/:id` |
| List findings | `GET /findings` |
| Get finding | `GET /findings/:id` |
| Finding evidence | `GET /findings/:findingId/evidence` |
| Declared claims | `GET /declared` |
| Review queue | `GET /queue` |
| Audit ledger | `GET /audit` |
| Validation | `GET /validation` |
| Config versions | `GET /admin/config-versions` |
| Users | `GET /admin/users` |
| Run analysis | `POST /ingest/run` |

The backend must return JSON matching the frontend API types defined in `src/api/types.ts`.

## Production build

To create a production build:

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm preview
```

## Type checking / validation

Run TypeScript checking with:

```bash
pnpm lint
```

or:

```bash
pnpm tsc
```

The `lint` and `tsc` scripts both run TypeScript's no-emit check in the current project configuration.

## Formatting

The project includes `oxfmt`:

```bash
pnpm format
```

## Project structure

```text
ghostlight-ui/
├── src/
│   ├── api/             # Mock and HTTP API adapters
│   ├── components/      # Shared UI components
│   ├── data/            # Navigation and technology data
│   ├── layouts/         # Application layouts
│   ├── lib/             # Shared utilities
│   ├── mock/            # Deterministic mock dataset
│   ├── pages/           # Application pages
│   ├── store/           # Application state
│   ├── types/           # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .figma/make/         # Figma Make configuration
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── vite.config.ts
```

## Demo workflow

For a frontend-only demonstration, use the default mock mode:

1. Install dependencies with `pnpm install`.
2. Start the application with `pnpm dev`.
3. Open the URL printed by Vite.
4. Navigate through the GHOSTLIGHT console.
5. Review entity risk information and findings.
6. Open a finding to inspect its rationale/evidence.
7. Review queue, validation and audit-related views.
8. Use the analysis action where available to demonstrate the analysis workflow returned by the mock adapter.

The mock analysis response represents these stages:

```text
ingest
→ features
→ peer baselines
→ detectors
→ stability
→ scoring
→ ledger
```

## GHOSTLIGHT system context

The broader GHOSTLIGHT proposal describes a 5-zone flow:

1. **Data Sources** — periodic CSE alerts/cases, escalations, asset inventory and declared claims.
2. **Ingestion** — schema mapping, validation, pseudonymisation and a Parquet/DuckDB feature store.
3. **Analytics Engine** — execution-gap, negative-space and anomaly detection.
4. **Trust & Scoring** — stability/confidence, entity risk scoring, sampling and examiner questions.
5. **Presentation** — dashboard, drill-down to evidence, timeline, review queue and audit trail.

This repository represents the **presentation/UI layer and its frontend data adapters**; the complete analytics/backend pipeline is outside this archive.

## Troubleshooting

### `pnpm` is not recognized

Install pnpm and reopen the terminal, then run:

```bash
pnpm install
```

### The UI starts but data is unavailable in HTTP mode

Check that:

```env
VITE_USE_MOCK=false
```

is intentional and that `VITE_API_URL` points to a running compatible backend.

If you only want to demonstrate the UI without a backend, remove the HTTP-mode setting or leave `VITE_USE_MOCK` unset so the local mock adapter is used.

### API request errors

The HTTP adapter reports non-successful HTTP responses as API request failures. Verify the backend is running and that its routes and JSON responses match the routes/types expected by this frontend.

## Notes

- The application is designed to run with local mock data for the prototype/demo.
- The mock data is generated locally and does not require real SOC data.
- No real SOC logs or packet captures are included in this frontend archive.
- For the SIH submission, this README should accompany the source code so evaluators can install and run the UI without guessing the basic startup procedure.

## Team

**HEXAMINDS@66**

**SIH Problem Statement:** 26157 — Supervisory Analytics Tool for SOC Assessment (SAT-SA)

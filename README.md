# GHOSTLIGHT

**Illuminating what SOCs don't show**

Supervisory Analytics Tool for SOC Assessment (SAT-SA)

| | |
|---|---|
| Event | Smart India Hackathon 2026 |
| Problem Statement | SIH26157 (NTRO) |
| Theme / Category | Blockchain & Cybersecurity / Software |
| Team | HEXAMINDS@66 (Team ID 191443) |

---

## 1. What is GHOSTLIGHT?

GHOSTLIGHT is an **offline, air-gapped analytics tool for NCIIPC examiners**. It is built for *supervision*, not as a SIEM or SOC.

Examiners receive periodic alert, case, escalation and asset exports from many Critical Sector Entities (CSEs). Checking them by hand is slow, and the reported KPIs may not match reality. GHOSTLIGHT:

- compares what an entity **claims** with what its data **actually shows**
- finds **expected evidence that is missing**
- builds a **risk-ranked review queue** (plus a 10% random control sample) and explains *why* each item was flagged
- records every examiner decision in a **hash-chained audit ledger**

The final judgement always stays with the examiner.

## 2. Key features

| Area | Capability |
|---|---|
| Execution gap | Declared-vs-Observed, KPI-gaming, effort NLP, timing fingerprint, effort-severity inversion |
| Negative space | Expected-activity checks, detection erosion, MITRE ATT&CK ghost chain, shadow telemetry, submission integrity |
| Anomaly layer | Robust z-score against peer groups, Isolation Forest |
| Trust | Stability score (±20% thresholds + bootstrap), counterfactual ("what would un-flag it") |
| Prioritisation | 8-area entity risk score, sampling planner, auto-generated examiner questions |
| Governance | RBAC (Admin / Examiner / Viewer), versioned config, hash-chained audit ledger, finding workflow (Open → Contested → Confirmed/Dismissed) |

## 3. Architecture (summary)

```
Zone 1 Data sources → Zone 2 Ingestion → Zone 3 Analytics engine → Zone 4 Trust & scoring → Zone 5 Presentation
                         FastAPI + PostgreSQL  (orchestration · RBAC · persistence)
                         100% offline · CPU-only · Docker Compose bundle
```

See `docs/GHOSTLIGHT_Architecture_Document.pdf` for the full 2-page architecture document.

## 4. Tech stack

- **Backend / analytics:** Python, FastAPI, DuckDB + Parquet, PostgreSQL, scikit-learn, SciPy, NetworkX, Pandera, MITRE ATT&CK mapping
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS 4, React Router, Zustand, TanStack Query, ECharts
- **Deployment:** Docker Compose offline bundle, Nginx (TLS)

## 5. Repository layout

```
ghostlight-ui/            React console (this folder)
  src/pages/              Landing, module pages, console pages (entities, findings, queue, audit, ...)
  src/components/         Shared UI components
  src/layouts/            Public and console layouts
  src/api/                API client with two adapters: mock (default) and http
  src/mock/               Seeded mock data generator (seed 42)
  src/store/              Zustand app state (role, theme, sector filter)
backend/                  FastAPI service and analytics engine   (add path if different)
docker-compose.yml        Offline deployment bundle              (add path if different)
docs/                     Architecture document, presentation
```

## 6. Setup instructions

### 6.1 Prerequisites

- Node.js 20 or newer
- pnpm (`npm install -g pnpm`)
- *(Full stack only)* Python 3.11+, Docker and Docker Compose

### 6.2 Run the UI (demo mode, no backend needed)

The UI ships with seeded mock data, so it runs fully on its own.

```bash
git clone https://github.com/Varsha200702/GHOSTLIGHTPrototypeDevelopment.git
cd GHOSTLIGHTPrototypeDevelopment      # or the ghostlight-ui folder
pnpm install
pnpm dev
```

Open **http://localhost:8443** (the dev server uses port 8443; change it with `PORT=3000 pnpm dev`).

**Sign in:** go to `/login` and use the pre-filled demo credentials:

| Field | Value |
|---|---|
| Email | `examiner@ghostlight.local` |
| Password | `demo-access` |
| Role | Examiner (Admin and Viewer are also selectable) |

Sign-in is local only. Nothing is sent to a server.

Other useful commands:

```bash
pnpm build      # production build to dist/
pnpm preview    # serve the production build
pnpm lint       # TypeScript type check
```

### 6.3 Connect the UI to the real backend

The API mode is chosen by environment variables (create a `.env` file in the UI folder):

```env
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:8000/api
```

The HTTP adapter calls these endpoints:

| Endpoint | Purpose |
|---|---|
| `GET /entities`, `GET /entities/{id}` | Entity list and detail |
| `GET /findings`, `GET /findings/{id}` | Findings |
| `GET /findings/{id}/evidence` | Raw evidence for a finding |
| `GET /declared` | Declared claims |
| `GET /queue` | Review queue |
| `GET /audit` | Audit ledger |
| `GET /validation` | Validation results |
| `GET /admin/config-versions`, `GET /admin/users` | Governance data |
| `POST /ingest/run` | Start an analysis run |

### 6.4 Run the full stack offline with Docker Compose

> Fill in the exact commands for your backend repo. A typical flow:

```bash
# 1. Load the pre-built images (no internet needed on the target machine)
docker load -i ghostlight-offline-bundle.tar

# 2. Start everything
docker compose up -d

# 3. Open the console
#    https://localhost   (Nginx, TLS)
```

## 7. Using the console

1. **Upload** (`/app/upload`): import CSE exports (CSV, JSON or database export) and the declared-claims file, then start a run.
2. **Overview / Entities**: see the risk ranking across entities, filtered by sector.
3. **Findings**: open a finding to see the reason, confidence tier and counterfactual, then drill into the raw evidence.
4. **Review queue**: risk-weighted items plus the 10% random sample, with auto-generated examiner questions and PDF export.
5. **Decide**: confirm or dismiss a finding. The action is written to the audit ledger.
6. **Audit / Admin**: verify the hash chain, view config versions and manage roles.

## 8. Data and privacy

- Works on **metadata only** (alerts, cases, escalations, assets). No raw logs or packet captures.
- Users, IPs and hosts are **pseudonymised at ingestion**.
- The UI demo uses **synthetic data** only (seed 42). No real SOC or CSE data is included in this repository.

## 9. ML disclosures

| Item | Detail |
|---|---|
| Models | Isolation Forest, robust statistics (median/MAD), TF-IDF or small bundled embedding model |
| Hardware | CPU-only, 8 cores / 32 GB RAM / SSD |
| Training | Local, offline, on synthetic plus NCIIPC-supplied historical data |
| Model updates | Signed model files, imported manually |
| Explainability | Feature contributions and template rationale |
| Auditability | Model version and data hash logged per run |

## 10. Validation

A **synthetic adversary** plants known anomalies in realistic noise. We report:

- precision and recall per detector
- true issues found per 100 reviewed samples: prioritised vs random
- processing time for N alerts across M entities

Measured results will be added here after benchmarking the prototype.

## 11. Limitations

- The prototype UI runs on mock data unless connected to the backend.
- Accuracy figures depend on the synthetic adversary until real historical data is available.
- GHOSTLIGHT supports examiner judgement. It does not replace it.

## 12. Team

**HEXAMINDS@66**, Team ID 191443, Smart India Hackathon 2026.

## 13. References

NCIIPC, CERT-In, MITRE ATT&CK, NIST SP 800-61, Isolation Forest (Liu, Ting, Zhou, 2008), Sentence-BERT (Reimers and Gurevych, 2019), change-point detection (Truong et al.), Jensen-Shannon divergence, Benford-type tests (Nigrini), Goodhart's Law.

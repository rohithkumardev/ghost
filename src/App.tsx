import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Navigate, Route, Routes } from "react-router-dom"
import ConsoleLayout from "@/layouts/ConsoleLayout"
import PublicLayout from "@/layouts/PublicLayout"
import LandingPage from "@/pages/LandingPage"
import StackPage from "@/pages/StackPage"
import AnalyticsModulePage from "@/pages/AnalyticsModulePage"
import { useAppStore } from "@/store/appStore"
import {
  AdminPage,
  CaseTimelinePage,
  ConsoleOverviewPage,
  DeclaredObservedPage,
  EntitiesPage,
  EntityDetailPage,
  EvidencePage,
  FindingDetailPage,
  FindingsPage,
  LoginPage,
  ModulePage,
  ModulesIndexPage,
  NotFoundPage,
  ReviewQueuePage,
  RunsPage,
  SignupPage,
  ValidationPage,
} from "@/pages/FoundationPages"

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } })

function ThemeSync() {
  const theme = useAppStore((state) => state.theme)
  document.documentElement.dataset.theme = theme
  return null
}

export default function App() {
  return <QueryClientProvider client={queryClient}><ThemeSync /><Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/modules" element={<ModulesIndexPage />} />
      <Route path="/modules/:slug" element={<ModulePage />} />
      <Route path="/stack" element={<StackPage />} />
    </Route>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/app" element={<ConsoleLayout />}>
      <Route index element={<Navigate to="/app/overview" replace />} />
      <Route path="overview" element={<ConsoleOverviewPage />} />
      <Route path="entities" element={<EntitiesPage />} />
      <Route path="entities/:id" element={<EntityDetailPage />} />
      <Route path="findings" element={<FindingsPage />} />
      <Route path="findings/:id" element={<FindingDetailPage />} />
      <Route path="evidence" element={<EvidencePage />} />
      <Route path="timeline" element={<CaseTimelinePage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="queue" element={<ReviewQueuePage />} />
      <Route path="declared" element={<DeclaredObservedPage />} />
      <Route path="negative-space" element={<AnalyticsModulePage mode="negativeSpace" />} />
      <Route path="gaming" element={<AnalyticsModulePage mode="gaming" />} />
      <Route path="depth" element={<AnalyticsModulePage mode="depth" />} />
      <Route path="capacity" element={<AnalyticsModulePage mode="capacity" />} />
      <Route path="trajectory" element={<AnalyticsModulePage mode="trajectory" />} />
      <Route path="policy-replay" element={<AnalyticsModulePage mode="policy" />} />
      <Route path="validation" element={<ValidationPage />} />
      <Route path="audit" element={<AdminPage />} />
      <Route path="runs" element={<RunsPage />} />
      <Route path="admin" element={<AdminPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes></QueryClientProvider>
}

function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "validating" | "ready" | "ingesting" | "complete">("idle")
  const [error, setError] = useState("")
  const chooseFile = (candidate: File | undefined) => {
    setError("")
    if (!candidate) return
    const allowed = /\.(csv|parquet|json|zip)$/i.test(candidate.name)
    if (!allowed) { setError("Choose a CSV, Parquet, JSON, or ZIP export."); return }
    setFile(candidate); setStatus("validating")
    window.setTimeout(() => setStatus("ready"), 650)
  }
  const ingest = () => {
    if (!file) { setError("Select an export before starting ingest."); return }
    setStatus("ingesting")
    window.setTimeout(() => setStatus("complete"), 1100)
  }
  const checklist = ["Schema detected", "Identifiers pseudonymised", "Time window validated", "Peer group assigned"]
  return <div className="mx-auto max-w-5xl"><div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Data intake</p><h1 className="mt-2 text-3xl font-semibold">Upload & ingest</h1><p className="mt-2 text-sm text-ink-muted">Load an offline SOC export and validate its shape before analysis. Files stay local to this prototype.</p></div><div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><div className="rounded-2xl border border-dashed border-teal/40 bg-teal/5 p-10 text-center"><input id="soc-upload" type="file" accept=".csv,.parquet,.json,.zip" className="sr-only" onChange={(event) => chooseFile(event.target.files?.[0])} /><label htmlFor="soc-upload" className="mx-auto block cursor-pointer"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-teal/15 text-teal"><span className="text-2xl">↑</span></div><h2 className="mt-5 text-xl font-semibold">{file ? file.name : "Choose a SOC export"}</h2><p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">CSV, Parquet, JSON, or ZIP bundles are supported. Click to browse from your computer.</p><span className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-ink-inverse">Browse files</span></label>{file && <div className="mx-auto mt-6 max-w-md rounded-xl border border-line bg-surface p-3 text-left text-sm"><div className="flex justify-between"><span className="font-medium">{file.name}</span><span className="font-mono text-xs text-ink-muted">{(file.size / 1024).toFixed(1)} KB</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-raised"><div className={`h-full rounded-full transition-all ${status === "complete" ? "w-full bg-green" : status === "ready" ? "w-3/4 bg-teal" : status === "validating" || status === "ingesting" ? "w-1/2 bg-amber" : "w-0"}`} /></div><p className="mt-2 text-xs text-ink-subtle">{status === "validating" ? "Validating file…" : status === "ready" ? "Ready to ingest" : status === "ingesting" ? "Ingesting local records…" : status === "complete" ? "Ingest complete · 18,420 records staged" : "Selected"}</p></div>}{error && <p className="mt-4 text-sm text-red-400">{error}</p>}{status === "ready" && <button onClick={ingest} className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-ink-inverse">Start local ingest</button>}{status === "complete" && <p className="mt-5 text-sm font-semibold text-green">✓ Ingest complete. The sample run is ready for analysis.</p>}</div><div className="rounded-2xl border border-line bg-surface p-5"><h2 className="font-semibold">Ingest checklist</h2><div className="mt-5 space-y-4">{checklist.map((item, index) => <div key={item} className="flex items-center gap-3 text-sm"><span className={`grid size-6 place-items-center rounded-full ${status === "complete" || (status !== "idle" && index < 2) ? "bg-green/10 text-green" : "bg-surface-raised text-ink-subtle"}`}>{status === "complete" || (status !== "idle" && index < 2) ? "✓" : index + 1}</span>{item}<span className={`ml-auto text-xs ${status === "complete" || (status !== "idle" && index < 2) ? "text-green" : "text-ink-subtle"}`}>{status === "complete" || (status !== "idle" && index < 2) ? "Ready" : "Pending"}</span></div>)}</div><div className="mt-7 rounded-xl bg-surface-raised p-4 text-xs leading-5 text-ink-muted">Prototype note: the production ingestion contract is prepared for CSV and Parquet validation, but this screen intentionally performs a local simulated ingest.</div></div></div></div>
}

import {
  Activity,
  BadgeCheck,
  BarChart3,
  Binary,
  Boxes,
  ClipboardCheck,
  FileSearch,
  Gauge,
  GitCompareArrows,
  History,
  LayoutDashboard,
  Network,
  Radar,
  Scale,
  Settings,
  ShieldCheck,
  Upload,
} from "lucide-react"

export const modules = [
  {
    id: "M1",
    slug: "declared-vs-observed",
    title: "Declared vs observed",
    category: "Execution Gap",
  },
  {
    id: "M2",
    slug: "metric-gaming",
    title: "Metric gaming",
    category: "Execution Gap",
  },
  {
    id: "M3",
    slug: "investigation-depth",
    title: "Investigation depth",
    category: "Execution Gap",
  },
  {
    id: "M4",
    slug: "alert-correlation",
    title: "Alert correlation",
    category: "Anomaly",
  },
  {
    id: "M5",
    slug: "negative-space",
    title: "Negative space",
    category: "Negative Space",
  },
  {
    id: "M6",
    slug: "capacity-vs-conduct",
    title: "Capacity vs conduct",
    category: "Execution Gap",
  },
  {
    id: "M7",
    slug: "trajectory-maturity",
    title: "Trajectory & maturity",
    category: "Trust",
  },
  {
    id: "M8",
    slug: "systemic-signals",
    title: "Systemic signals",
    category: "Roadmap",
  },
  {
    id: "M9",
    slug: "defensible-findings",
    title: "Defensible findings",
    category: "Trust",
  },
  {
    id: "M10",
    slug: "examiner-workbench-policy-replay",
    title: "Policy replay",
    category: "Trust",
  },
] as const

export const consoleNavigation = [
  { label: "Overview", to: "/app/overview", icon: LayoutDashboard },
  { label: "Entities", to: "/app/entities", icon: Boxes },
  { label: "Findings", to: "/app/findings", icon: ShieldCheck },
  { label: "Evidence", to: "/app/evidence", icon: FileSearch },
  { label: "Case timeline", to: "/app/timeline", icon: History },
  { label: "Upload & ingest", to: "/app/upload", icon: Upload },
  { label: "Review queue", to: "/app/queue", icon: ClipboardCheck },
  {
    label: "Declared vs observed",
    to: "/app/declared",
    icon: GitCompareArrows,
  },
  { label: "Negative space", to: "/app/negative-space", icon: Radar },
  { label: "Metric gaming", to: "/app/gaming", icon: Gauge },
  { label: "Investigation depth", to: "/app/depth", icon: FileSearch },
  { label: "Capacity vs conduct", to: "/app/capacity", icon: Scale },
  { label: "Trajectory", to: "/app/trajectory", icon: Activity },
  { label: "Policy replay", to: "/app/policy-replay", icon: Binary },
  { label: "Validation", to: "/app/validation", icon: BadgeCheck },
  { label: "Runs", to: "/app/runs", icon: Activity },
  { label: "Audit ledger", to: "/app/audit", icon: History },
  { label: "Administration", to: "/app/admin", icon: Settings },
] as const

export const routeIcons = { BarChart3, Boxes, Network, ShieldCheck }

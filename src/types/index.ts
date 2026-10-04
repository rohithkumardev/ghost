export type Sector = "Power" | "Banking" | "Telecom"
export type SizeTier = "Large" | "Medium" | "Small"
export type FindingKind = "execution_gap" | "negative_space" | "anomaly" | "trust"
export type FindingStatus = "open" | "contested" | "confirmed" | "dismissed"
export type ConfidenceLevel = "High" | "Medium" | "Low"
export type UserRole = "Admin" | "Examiner" | "Viewer"

export interface TimePoint {
  period: string
  value: number
}

export interface Entity {
  id: string
  code: string
  name: string
  sector: Sector
  sizeTier: SizeTier
  riskScore: number
  maturityLevel: "Reactive" | "Defined" | "Managed" | "Optimized"
  openFindings: number
  capabilityScores: Record<string, number>
  riskTrend: TimePoint[]
}

export interface Evidence {
  id: string
  findingId: string
  entityId: string
  occurredAt: string
  source: "alerts" | "cases" | "claims" | "assets" | "telemetry"
  recordType: string
  summary: string
  fields: Record<string, string | number | boolean | null>
  pseudonymised: boolean
}

export interface Finding {
  id: string
  entityId: string
  module: string
  kind: FindingKind
  title: string
  rationale: string
  auditorRationale: string
  observed: number
  threshold: number
  peerBaseline: number
  unit: string
  confidence: number
  confidenceLevel: ConfidenceLevel
  stabilityScore: number
  severity: "Critical" | "High" | "Medium" | "Low"
  status: FindingStatus
  detectedAt: string
  evidenceIds: string[]
  examinerQuestion: string
  tags: string[]
}

export interface Claim {
  id: string
  entityId: string
  control: string
  statement: string
  verdict: "Supported" | "Contradicted" | "Insufficient"
  evidenceIds: string[]
  declaredAt: string
}

export interface LedgerEntry {
  id: string
  timestamp: string
  actor: string
  action: string
  subjectId: string
  details: Record<string, string | number | boolean>
  previousHash: string
  hash: string
}

export interface ReviewItem {
  id: string
  findingId: string
  entityId: string
  priority: number
  exploration: boolean
  reviewDebt: number
  question: string
}

export interface DetectorValidation {
  detector: string
  precision: number
  recall: number
  f1: number
  plantedAnomalies: number
}

export interface ValidationResult {
  id: string
  generatedAt: string
  sampleData: true
  detectors: DetectorValidation[]
  prioritisedCurve: TimePoint[]
  randomCurve: TimePoint[]
  noiseRobustness: Record<string, number>
}

export interface ConfigVersion {
  id: string
  version: string
  createdAt: string
  createdBy: string
  status: "active" | "proposed" | "rejected" | "superseded"
  yaml: string
}

export interface User {
  id: string
  name: string
  role: UserRole
  lastActiveAt: string
}

export interface MockDatabase {
  entities: Entity[]
  findings: Finding[]
  evidence: Evidence[]
  claims: Claim[]
  ledger: LedgerEntry[]
  queue: ReviewItem[]
  validation: ValidationResult
  configVersions: ConfigVersion[]
  users: User[]
}

export interface AnalysisRun {
  runId: string
  status: "queued" | "running" | "complete" | "failed"
  stages: string[]
}

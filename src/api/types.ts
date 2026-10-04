import type {
  AnalysisRun,
  Claim,
  ConfigVersion,
  Entity,
  Evidence,
  Finding,
  LedgerEntry,
  ReviewItem,
  User,
  ValidationResult,
} from "@/types"

export interface GhostlightApi {
  getEntities(): Promise<Entity[]>
  getEntity(id: string): Promise<Entity>
  getFindings(): Promise<Finding[]>
  getFinding(id: string): Promise<Finding>
  getEvidence(findingId: string): Promise<Evidence[]>
  getClaims(): Promise<Claim[]>
  getQueue(): Promise<ReviewItem[]>
  getLedger(): Promise<LedgerEntry[]>
  getValidation(): Promise<ValidationResult>
  getConfigVersions(): Promise<ConfigVersion[]>
  getUsers(): Promise<User[]>
  runAnalysis(): Promise<AnalysisRun>
}

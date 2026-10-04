import { mockDatabase } from "@/mock"
import type { GhostlightApi } from "./types"

const wait = (milliseconds = 180) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds))

async function read<T>(value: T): Promise<T> {
  await wait()
  return structuredClone(value)
}

function required<T>(value: T | undefined, resource: string): T {
  if (!value) throw new Error(`${resource} was not found`)
  return value
}

export const mockAdapter: GhostlightApi = {
  getEntities: () => read(mockDatabase.entities),
  getEntity: (id) =>
    read(
      required(
        mockDatabase.entities.find((entity) => entity.id === id),
        "Entity",
      ),
    ),
  getFindings: () => read(mockDatabase.findings),
  getFinding: (id) =>
    read(
      required(
        mockDatabase.findings.find((finding) => finding.id === id),
        "Finding",
      ),
    ),
  getEvidence: (findingId) =>
    read(mockDatabase.evidence.filter((item) => item.findingId === findingId)),
  getClaims: () => read(mockDatabase.claims),
  getQueue: () => read(mockDatabase.queue),
  getLedger: () => read(mockDatabase.ledger),
  getValidation: () => read(mockDatabase.validation),
  getConfigVersions: () => read(mockDatabase.configVersions),
  getUsers: () => read(mockDatabase.users),
  runAnalysis: () =>
    read({
      runId: "analysis-sample-001",
      status: "complete",
      stages: [
        "ingest",
        "features",
        "peer baselines",
        "detectors",
        "stability",
        "scoring",
        "ledger",
      ],
    }),
}

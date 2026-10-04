import type {
  Claim,
  ConfigVersion,
  Entity,
  Evidence,
  Finding,
  FindingKind,
  LedgerEntry,
  MockDatabase,
  ReviewItem,
  Sector,
  SizeTier,
  User,
  ValidationResult,
} from "@/types"

export const MOCK_SEED = 42

export function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const capabilityAreas = [
  "Control execution",
  "Alert fidelity",
  "Investigation depth",
  "Response timing",
  "Coverage",
  "Capacity",
  "Trajectory",
  "Evidence trust",
] as const

const names = [
  ["North Grid Transmission", "Power", "Large"],
  ["Eastern Load Dispatch", "Power", "Large"],
  ["Riverbend Generation", "Power", "Medium"],
  ["Sunline Distribution", "Power", "Small"],
  ["National Cooperative Bank", "Banking", "Large"],
  ["Civic Trust Bank", "Banking", "Medium"],
  ["Meridian Payments", "Banking", "Medium"],
  ["Harbor Rural Bank", "Banking", "Small"],
  ["BharatWave Telecom", "Telecom", "Large"],
  ["MetroFiber Networks", "Telecom", "Large"],
  ["SignalOne Mobile", "Telecom", "Medium"],
  ["Frontier Telecom", "Telecom", "Small"],
] as const

const findingTemplates: Array<{
  module: string
  kind: FindingKind
  title: string
  unit: string
}> = [
  {
    module: "M1",
    kind: "execution_gap",
    title: "Declared review cadence is not observed",
    unit: "%",
  },
  {
    module: "M2",
    kind: "execution_gap",
    title: "SLA closures bunch immediately before deadline",
    unit: "%",
  },
  {
    module: "M3",
    kind: "execution_gap",
    title: "Critical cases show unusually shallow investigation",
    unit: "steps",
  },
  {
    module: "M4",
    kind: "anomaly",
    title: "Case timestamps share an improbable digit pattern",
    unit: "%",
  },
  {
    module: "M5",
    kind: "negative_space",
    title: "Expected critical-asset activity is absent",
    unit: "alerts/mo",
  },
  {
    module: "M5",
    kind: "negative_space",
    title: "Detection volume eroded after configuration change",
    unit: "%",
  },
  {
    module: "M6",
    kind: "execution_gap",
    title: "Quality falls beyond what workload explains",
    unit: "score",
  },
  {
    module: "M9",
    kind: "trust",
    title: "Escalation chain contains an unsupported hand-off",
    unit: "links",
  },
]

const monthLabels = [
  "Apr 25",
  "May 25",
  "Jun 25",
  "Jul 25",
  "Aug 25",
  "Sep 25",
  "Oct 25",
  "Nov 25",
  "Dec 25",
  "Jan 26",
  "Feb 26",
  "Mar 26",
]

const round = (value: number) => Math.round(value * 10) / 10

export function generateMockData(seed = MOCK_SEED): MockDatabase {
  const random = mulberry32(seed)

  const entities: Entity[] = names.map(([name, sector, sizeTier], index) => {
    const weakBoost = index === 1 || index === 4 || index === 9 ? 28 : 0
    const healthyReduction = index === 3 || index === 7 || index === 11 ? 20 : 0
    const riskScore = Math.max(
      12,
      Math.min(
        94,
        Math.round(36 + random() * 30 + weakBoost - healthyReduction),
      ),
    )
    const capabilityScores = Object.fromEntries(
      capabilityAreas.map((area) => [
        area,
        Math.max(
          8,
          Math.min(96, Math.round(riskScore + (random() - 0.5) * 28)),
        ),
      ]),
    )
    return {
      id: `entity-${String(index + 1).padStart(2, "0")}`,
      code: `CSE-${String(index + 1).padStart(3, "0")}`,
      name,
      sector: sector as Sector,
      sizeTier: sizeTier as SizeTier,
      riskScore,
      maturityLevel:
        riskScore > 74
          ? "Reactive"
          : riskScore > 54
            ? "Defined"
            : riskScore > 34
              ? "Managed"
              : "Optimized",
      openFindings: 0,
      capabilityScores,
      riskTrend: monthLabels.map((period, month) => ({
        period,
        value: Math.max(
          8,
          Math.min(
            96,
            round(riskScore + Math.sin(month / 2) * 6 + (random() - 0.5) * 8),
          ),
        ),
      })),
    }
  })

  const findings: Finding[] = []
  const evidence: Evidence[] = []
  for (let index = 0; index < 40; index += 1) {
    const entityIndex =
      index < 9 ? [1, 4, 9][index % 3] : (index * 5 + 2) % entities.length
    const entity = entities[entityIndex]
    const template = findingTemplates[index % findingTemplates.length]
    const severityIndex =
      entity.riskScore > 75
        ? 0
        : entity.riskScore > 58
          ? 1
          : entity.riskScore > 38
            ? 2
            : 3
    const findingId = `finding-${String(index + 1).padStart(3, "0")}`
    const evidenceIds = [0, 1].map(
      (evidenceIndex) => `${findingId}-e${evidenceIndex + 1}`,
    )
    const observed = round(8 + random() * 77)
    const threshold = round(35 + random() * 25)
    const confidence = round(0.63 + random() * 0.34)
    findings.push({
      id: findingId,
      entityId: entity.id,
      module: template.module,
      kind: template.kind,
      title: template.title,
      rationale: `${entity.code} differs materially from its size-and-sector peer baseline across three review periods.`,
      auditorRationale: `The finding is based on ${evidenceIds.length} pseudonymised records and survived threshold perturbation.`,
      observed,
      threshold,
      peerBaseline: round(threshold * (0.82 + random() * 0.22)),
      unit: template.unit,
      confidence,
      confidenceLevel:
        confidence > 0.84 ? "High" : confidence > 0.72 ? "Medium" : "Low",
      stabilityScore: round(0.61 + random() * 0.38),
      severity: (["Critical", "High", "Medium", "Low"] as const)[severityIndex],
      status:
        index % 11 === 0 ? "contested" : index % 7 === 0 ? "confirmed" : "open",
      detectedAt: `2026-03-${String((index % 18) + 1).padStart(2, "0")}T09:30:00Z`,
      evidenceIds,
      examinerQuestion: `Please explain the observed ${template.title.toLowerCase()} and provide corroborating records.`,
      tags: [template.module, template.kind.replace("_", " ")],
    })
    evidenceIds.forEach((id, evidenceIndex) => {
      evidence.push({
        id,
        findingId,
        entityId: entity.id,
        occurredAt: `2026-02-${String(((index + evidenceIndex) % 27) + 1).padStart(2, "0")}T${String(8 + evidenceIndex * 3).padStart(2, "0")}:14:00Z`,
        source: (["alerts", "cases", "claims", "assets", "telemetry"] as const)[
          index % 5
        ],
        recordType: evidenceIndex === 0 ? "case_lifecycle" : "peer_baseline",
        summary:
          evidenceIndex === 0
            ? "Observed record contributing to the finding."
            : "Comparable peer-group aggregate.",
        fields: {
          analyst_id: `ANL-${String(entityIndex + 11).padStart(3, "0")}`,
          host: `HOST-${String(index + 101).padStart(4, "0")}`,
          observed,
          threshold,
        },
        pseudonymised: true,
      })
    })
  }

  entities.forEach((entity) => {
    entity.openFindings = findings.filter(
      (finding) => finding.entityId === entity.id && finding.status === "open",
    ).length
  })

  const claims: Claim[] = entities.flatMap((entity, index) => [
    {
      id: `claim-${String(index + 1).padStart(3, "0")}`,
      entityId: entity.id,
      control: "Critical alert review",
      statement:
        "All critical alerts receive documented analyst review within 30 minutes.",
      verdict:
        index % 4 === 0
          ? "Contradicted"
          : index % 3 === 0
            ? "Insufficient"
            : "Supported",
      evidenceIds:
        findings.find((finding) => finding.entityId === entity.id)
          ?.evidenceIds ?? [],
      declaredAt: "2026-01-15T00:00:00Z",
    },
  ])

  const ledger: LedgerEntry[] = findings.slice(0, 12).map((finding, index) => ({
    id: `ledger-${String(index + 1).padStart(3, "0")}`,
    timestamp: `2026-03-${String(index + 1).padStart(2, "0")}T10:00:00Z`,
    actor: index % 3 === 0 ? "examiner-01" : "system",
    action: index % 3 === 0 ? "finding.reviewed" : "finding.created",
    subjectId: finding.id,
    details: { status: finding.status, confidence: finding.confidence },
    previousHash: index === 0 ? "GENESIS" : `sample-hash-${index}`,
    hash: `sample-hash-${index + 1}`,
  }))

  const queue: ReviewItem[] = [...findings]
    .sort(
      (a, b) =>
        b.confidence *
          entities.find((entity) => entity.id === b.entityId)!.riskScore -
        a.confidence *
          entities.find((entity) => entity.id === a.entityId)!.riskScore,
    )
    .slice(0, 24)
    .map((finding, index) => ({
      id: `review-${String(index + 1).padStart(3, "0")}`,
      findingId: finding.id,
      entityId: finding.entityId,
      priority: index + 1,
      exploration: index === 8 || index === 17,
      reviewDebt: Math.round(random() * 100),
      question: finding.examinerQuestion,
    }))

  const validation: ValidationResult = {
    id: "validation-sample-001",
    generatedAt: "2026-03-18T12:00:00Z",
    sampleData: true,
    detectors: findingTemplates.slice(0, 7).map((template, index) => ({
      detector: `${template.module}: ${template.title}`,
      precision: round(0.69 + random() * 0.24),
      recall: round(0.66 + random() * 0.27),
      f1: round(0.68 + random() * 0.23),
      plantedAnomalies: 2 + (index % 3),
    })),
    prioritisedCurve: Array.from({ length: 10 }, (_, index) => ({
      period: `${(index + 1) * 10}%`,
      value: round(18 + index * 8 + random() * 5),
    })),
    randomCurve: Array.from({ length: 10 }, (_, index) => ({
      period: `${(index + 1) * 10}%`,
      value: round(8 + index * 5 + random() * 4),
    })),
    noiseRobustness: { "1% noise": 0.94, "5% noise": 0.87, "10% noise": 0.76 },
  }

  const configVersions: ConfigVersion[] = [
    {
      id: "config-003",
      version: "v1.2.0",
      createdAt: "2026-03-01T08:00:00Z",
      createdBy: "admin-01",
      status: "active",
      yaml: "stability:\n  perturbation: 0.20\nscoring:\n  exploration_slice: 0.10\n",
    },
    {
      id: "config-002",
      version: "v1.1.0",
      createdAt: "2026-02-01T08:00:00Z",
      createdBy: "admin-01",
      status: "superseded",
      yaml: "stability:\n  perturbation: 0.15\nscoring:\n  exploration_slice: 0.10\n",
    },
  ]

  const users: User[] = [
    {
      id: "admin-01",
      name: "A. Sharma",
      role: "Admin",
      lastActiveAt: "2026-03-18T10:20:00Z",
    },
    {
      id: "examiner-01",
      name: "R. Iyer",
      role: "Examiner",
      lastActiveAt: "2026-03-18T11:05:00Z",
    },
    {
      id: "viewer-01",
      name: "S. Khan",
      role: "Viewer",
      lastActiveAt: "2026-03-17T16:40:00Z",
    },
  ]

  return {
    entities,
    findings,
    evidence,
    claims,
    ledger,
    queue,
    validation,
    configVersions,
    users,
  }
}

import { useState } from "react"
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Binary,
  Boxes,
  Check,
  ChevronDown,
  CircleGauge,
  ClipboardCheck,
  Database,
  Eye,
  FileSearch,
  Fingerprint,
  GitCompareArrows,
  History,
  Layers3,
  Network,
  Radar,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import { Link } from "react-router-dom"
import Marquee from "@/components/Marquee"
import { Badge, Button, ButtonLink, Card, Eyebrow } from "@/components/ui"
import { modules } from "@/data/navigation"
import { techStack } from "@/data/techStack"
import { cn } from "@/lib/cn"

const capabilities: Array<{
  icon: LucideIcon
  title: string
  text: string
  slug: string
  tone: string
}> = [
  {
    icon: GitCompareArrows,
    title: "Declared vs observed",
    text: "Test policy claims against actual alert and case behaviour.",
    slug: "declared-vs-observed",
    tone: "text-amber",
  },
  {
    icon: CircleGauge,
    title: "Metric gaming",
    text: "Surface SLA bunching, bulk closure, and rubber-stamp patterns.",
    slug: "metric-gaming",
    tone: "text-violet",
  },
  {
    icon: FileSearch,
    title: "Investigation depth",
    text: "Measure effort, throughput, and severity-aware case quality.",
    slug: "investigation-depth",
    tone: "text-amber",
  },
  {
    icon: Radar,
    title: "Negative space",
    text: "Find expected evidence that is missing, silent, or eroding.",
    slug: "negative-space",
    tone: "text-teal",
  },
  {
    icon: Activity,
    title: "Capacity vs conduct",
    text: "Separate workload pressure from avoidable execution choices.",
    slug: "capacity-vs-conduct",
    tone: "text-violet",
  },
  {
    icon: Fingerprint,
    title: "Defensible findings",
    text: "Show rationale, stability, evidence, and a tamper-evident trail.",
    slug: "defensible-findings",
    tone: "text-green",
  },
]

const steps = [
  [
    "Collect",
    "Periodic alert, case, asset, claim, and telemetry exports.",
    "Ingestion",
  ],
  [
    "Ingest & pseudonymise",
    "Validate schemas and replace direct identifiers before analysis.",
    "Privacy layer",
  ],
  [
    "Baseline & peers",
    "Compare like with like by sector, size, and operating context.",
    "M5 · M6",
  ],
  [
    "Detect",
    "Run transparent statistical detectors across execution and absence.",
    "M1–M6",
  ],
  [
    "Trust-test",
    "Perturb thresholds and bootstrap samples to test finding stability.",
    "M9",
  ],
  [
    "Prioritise",
    "Rank review value while reserving an exploration sample.",
    "Sampling planner",
  ],
  [
    "Review & record",
    "Keep the examiner in control and hash-chain every decision.",
    "Workbench",
  ],
] as const

const faqs = [
  [
    "Why is GHOSTLIGHT offline?",
    "Supervisory datasets can be highly sensitive. The prototype is designed for air-gapped deployment with bundled dependencies and no runtime network calls.",
  ],
  [
    "Is it a SIEM?",
    "No. GHOSTLIGHT does not collect live logs or replace entity SOC tooling. It analyses periodic exports for supervisory assessment.",
  ],
  [
    "How is confidence computed?",
    "A finding combines evidence strength with stability under threshold perturbation and resampling. The examiner can see both.",
  ],
  [
    "How are entities compared fairly?",
    "Peer groups use sector, size tier, asset mix, and workload context so unlike entities are not treated as interchangeable.",
  ],
  [
    "What data is needed?",
    "Periodic alert, case-management, asset, policy-claim, and optional telemetry exports in CSV or JSON.",
  ],
  [
    "How is privacy handled?",
    "Identifiers are pseudonymised during ingestion, raw evidence remains local, and access actions are recorded.",
  ],
  [
    "What if an entity disputes a finding?",
    "The workflow records the response, preserves supporting evidence, and lets an examiner confirm or dismiss with rationale.",
  ],
  [
    "Does it replace examiners?",
    "Never. It prioritises review and explains signals; accountable supervisory judgement remains human.",
  ],
] as const

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body?: string
}) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {body && <p className="mt-5 text-lg leading-8 text-ink-muted">{body}</p>}
    </div>
  )
}

function MiniDashboard() {
  return (
    <div className="relative mx-auto max-w-xl">
      <div className="signal-orbit absolute -inset-8 rounded-[2.5rem] border border-teal/10" />
      <Card className="relative overflow-hidden p-0 shadow-glow">
        <div className="flex items-center justify-between border-b border-line bg-surface-raised/60 px-5 py-4">
          <div>
            <p className="font-mono text-xs text-teal">
              SUPERVISORY SIGNAL ROOM
            </p>
            <p className="mt-1 text-sm font-semibold">
              Cross-entity review priority
            </p>
          </div>
          <Badge tone="teal">Sample data</Badge>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-surface p-5">
            <div className="mb-5 flex items-center justify-between text-xs text-ink-subtle">
              <span>ENTITY RISK</span>
              <span>12 CSEs</span>
            </div>
            <div className="space-y-4">
              {[
                ["CSE-002", 86, "bg-amber"],
                ["CSE-005", 79, "bg-amber"],
                ["CSE-010", 72, "bg-violet"],
                ["CSE-003", 48, "bg-teal"],
              ].map(([label, score, color]) => (
                <div key={label as string}>
                  <div className="mb-1.5 flex justify-between font-mono text-xs">
                    <span>{label}</span>
                    <span>{score}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-raised">
                    <div
                      className={cn("risk-fill h-full rounded-full", color)}
                      style={{ "--risk": `${score}%` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden bg-surface p-5">
            <div className="scan-line absolute inset-x-0 top-0 h-px bg-teal shadow-glow" />
            <p className="text-xs text-ink-subtle">SIGNALS FOUND</p>
            <p className="mt-2 text-5xl font-semibold tracking-tight">40</p>
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-ink-muted">Execution gaps</span>
                <span className="text-amber">20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Negative space</span>
                <span className="text-teal">10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Other signals</span>
                <span className="text-violet">10</span>
              </div>
            </div>
          </div>
        </div>
        <div className="m-4 rounded-xl border border-amber/30 bg-amber/8 p-4">
          <div className="flex gap-3">
            <ScanSearch className="mt-0.5 text-amber" size={18} />
            <div>
              <p className="text-sm font-semibold">
                Expected critical-asset activity is absent
              </p>
              <p className="mt-1 text-xs leading-5 text-ink-muted">
                Peers average 18 alerts/month; observed 0. Finding survives ±20%
                threshold change.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

function SignalVisual({ kind }: { kind: number }) {
  if (kind === 0)
    return (
      <div className="space-y-3">
        {[
          ["Claimed", 92],
          ["Observed", 51],
          ["Peer median", 78],
        ].map(([label, width], i) => (
          <div key={label as string}>
            <div className="mb-1 flex justify-between text-xs text-ink-muted">
              <span>{label}</span>
              <span>{width}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-raised">
              <div
                className={cn(
                  "h-full rounded-full",
                  i === 1 ? "bg-amber" : "bg-teal",
                )}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  if (kind === 1)
    return (
      <div className="grid grid-cols-7 gap-2">
        {[3, 7, 2, 0, 0, 9, 1, 5, 0, 0, 8, 4, 0, 1, 7, 0, 0, 3, 6, 0, 2].map(
          (value, index) => (
            <span
              key={index}
              className={cn(
                "aspect-square rounded-md border",
                value === 0
                  ? "border-teal/40 bg-teal/10"
                  : "border-line bg-surface-raised",
              )}
              title={`${value} events`}
            />
          ),
        )}
      </div>
    )
  if (kind === 2)
    return (
      <div className="relative h-44">
        <div className="absolute inset-x-2 bottom-5 h-px bg-line" />
        <div className="absolute inset-y-2 left-5 w-px bg-line" />
        {[
          [18, 72],
          [34, 61],
          [50, 55],
          [68, 38],
          [77, 25],
          [87, 19],
        ].map(([x, y], index) => (
          <span
            key={index}
            className={cn(
              "absolute size-3 rounded-full border-2 border-surface",
              index > 3 ? "bg-amber" : "bg-teal",
            )}
            style={{ left: `${x}%`, bottom: `${y}%` }}
          />
        ))}
        <span className="absolute bottom-2 right-3 text-xs text-ink-subtle">
          Workload →
        </span>
      </div>
    )
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Badge tone="green">Stable · 0.91</Badge>
        <span className="font-mono text-xs text-ink-subtle">SHA-256</span>
      </div>
      {[
        "Evidence linked",
        "Threshold perturbed ±20%",
        "Counterfactual generated",
        "Ledger entry sealed",
      ].map((item) => (
        <div
          key={item}
          className="flex items-center gap-2 rounded-lg border border-line bg-surface-raised/60 p-2 text-xs"
        >
          <Check size={14} className="text-green" />
          {item}
        </div>
      ))}
    </div>
  )
}

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const pillars = [
    {
      eyebrow: "Paper vs reality",
      title: "Claims are only the beginning.",
      lead: "See where declared controls diverge from operational behaviour.",
      bullets: [
        "Match claims to observable evidence",
        "Detect closure bunching and shallow work",
        "Correlate timing fingerprints across cases",
      ],
      slug: "declared-vs-observed",
      icon: GitCompareArrows,
    },
    {
      eyebrow: "What’s missing",
      title: "Silence can be evidence.",
      lead: "Model expected activity, then investigate meaningful absence.",
      bullets: [
        "Find silent critical assets",
        "Mark detection erosion change-points",
        "Trace shadow telemetry and ghost chains",
      ],
      slug: "negative-space",
      icon: Radar,
    },
    {
      eyebrow: "Why it happens",
      title: "Separate pressure from practice.",
      lead: "Distinguish capacity constraints from avoidable conduct.",
      bullets: [
        "Compare quality against shift workload",
        "Track maturity over review cycles",
        "Make peer context visible",
      ],
      slug: "capacity-vs-conduct",
      icon: Activity,
    },
    {
      eyebrow: "Why you can trust it",
      title: "Every signal has to survive scrutiny.",
      lead: "Show why a finding exists and when it would disappear.",
      bullets: [
        "Perturb thresholds and bootstrap samples",
        "Generate explicit counterfactuals",
        "Hash-chain examiner decisions",
      ],
      slug: "defensible-findings",
      icon: ShieldCheck,
    },
  ]
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-line px-5 py-20 lg:py-28">
        <div className="ghost-grid absolute inset-0 opacity-60" />
        <div className="beam absolute -right-40 top-0 h-full w-3/4" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/8 px-3 py-1.5 font-mono text-xs text-teal">
              <span className="pulse-dot size-1.5 rounded-full bg-teal" />
              SUPERVISORY ANALYTICS FOR CRITICAL INFRASTRUCTURE
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Illuminating what SOCs{" "}
              <span className="ghost-text">don’t show.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-ink-muted">
              Test what entities claim against what their data shows. Find
              what’s missing. Say how sure we are.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/app">
                Launch console <ArrowRight size={17} />
              </ButtonLink>
              <a
                href="#how-it-works"
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold hover:bg-surface-raised"
              >
                See how it works
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 text-xs text-ink-muted">
              {[
                "Air-gapped",
                "CPU-only",
                "Explainable",
                "Hash-chained audit",
                "Supports examiners, never replaces them",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <ShieldCheck size={15} className="text-green" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <MiniDashboard />
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="More than a dashboard"
            title="A supervisory lens for the gaps between policy and practice."
            body="Built around questions an examiner can act on, not another wall of operational alerts."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(
              ({ icon: Icon, title, text, slug, tone }, index) => (
                <Link
                  key={slug}
                  to={`/modules/${slug}`}
                  className="capability-card group relative min-h-64 overflow-hidden rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-teal/35"
                >
                  <span className="font-mono text-xs text-ink-subtle">
                    0{index + 1}
                  </span>
                  <Icon
                    className={cn(
                      "mt-10 transition group-hover:scale-110",
                      tone,
                    )}
                    size={25}
                  />
                  <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    {text}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface/40 px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The problem"
            title="What happened—and what should have happened."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Card className="border-amber/20">
              <Badge tone="amber">Execution gap</Badge>
              <h3 className="mt-5 text-2xl font-semibold">
                The control exists on paper. Behaviour says otherwise.
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-ink-muted">
                {[
                  "A 30-minute escalation policy, but critical cases sit untouched.",
                  "SLA compliance driven by closures in the final five minutes.",
                  "Complex incidents resolved with one-line analyst notes.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl border border-line bg-canvas/50 p-4">
                <SignalVisual kind={0} />
              </div>
            </Card>
            <Card className="border-teal/20">
              <Badge tone="teal">Negative space</Badge>
              <h3 className="mt-5 text-2xl font-semibold">
                The evidence we expect never appears.
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-ink-muted">
                {[
                  "Critical server classes produce no detection activity.",
                  "A high-value category vanishes after a rules update.",
                  "An escalation chain jumps over required review levels.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl border border-line bg-canvas/50 p-4">
                <SignalVisual kind={1} />
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl space-y-28">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.eyebrow}
                className="grid items-center gap-12 lg:grid-cols-2"
              >
                <div className={cn(index % 2 === 1 && "lg:order-2")}>
                  <Eyebrow>{pillar.eyebrow}</Eyebrow>
                  <h2 className="mt-3 text-4xl font-semibold tracking-tight">
                    {pillar.title}
                  </h2>
                  <p className="mt-5 text-xl font-semibold leading-8">
                    {pillar.lead}
                  </p>
                  <ul className="mt-6 space-y-4">
                    {pillar.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-3 text-ink-muted"
                      >
                        <span className="grid size-8 place-items-center rounded-lg bg-teal/10 text-teal">
                          <Check size={16} />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/modules/${pillar.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal"
                  >
                    Learn more <ArrowRight size={15} />
                  </Link>
                </div>
                <Card
                  className={cn(
                    "relative min-h-80 overflow-hidden p-8",
                    index % 2 === 1 && "lg:order-1",
                  )}
                >
                  <div className="ghost-grid absolute inset-0 opacity-30" />
                  <div className="relative">
                    <div className="mb-12 flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl border border-line bg-surface-raised">
                        <Icon
                          className={
                            index === 0
                              ? "text-amber"
                              : index === 3
                                ? "text-green"
                                : "text-teal"
                          }
                        />
                      </span>
                      <Badge tone="neutral">Sample data</Badge>
                    </div>
                    <SignalVisual kind={index} />
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-y border-line bg-surface/40 px-5 py-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How GHOSTLIGHT works"
            title="A visible chain from export to examiner decision."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Card className="p-3">
              <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-7">
                {steps.map((step, index) => (
                  <Button
                    key={step[0]}
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "relative min-h-28 flex-col bg-transparent px-2 text-ink hover:bg-surface-raised",
                      activeStep === index && "bg-teal/10 text-teal",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full border border-line font-mono text-xs",
                        activeStep === index &&
                          "border-teal bg-teal text-ink-inverse",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="text-center text-xs">{step[0]}</span>
                    {index < steps.length - 1 && (
                      <span className="absolute right-[-7px] top-8 hidden h-px w-3 bg-line lg:block" />
                    )}
                  </Button>
                ))}
              </div>
            </Card>
            <Card className="border-teal/20">
              <p className="font-mono text-xs text-teal">
                STEP {activeStep + 1} · {steps[activeStep][2]}
              </p>
              <h3 className="mt-4 text-2xl font-semibold">
                {steps[activeStep][0]}
              </h3>
              <p className="mt-3 leading-7 text-ink-muted">
                {steps[activeStep][1]}
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-ink-subtle">
                <Workflow size={15} /> Every transition is reviewable and
                recorded.
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["12", "sample entities"],
            ["8", "capability areas"],
            ["13", "planted anomaly types"],
            ["0", "cloud dependencies"],
          ].map(([value, label]) => (
            <div key={label} className="bg-surface p-8">
              <Badge tone="neutral">Design fact</Badge>
              <p className="mt-8 text-5xl font-semibold tracking-tight">
                {value}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Maturity journey"
            title="Progress is a trajectory, not a label."
          />
          <Link
            to="/modules/trajectory-maturity"
            className="mt-10 grid overflow-hidden rounded-2xl border border-line md:grid-cols-4"
          >
            {[
              ["Reactive", "Incidents drive the operating rhythm."],
              ["Defined", "Practices are documented and repeatable."],
              ["Managed", "Evidence informs active control tuning."],
              ["Optimized", "Learning loops improve outcomes over time."],
            ].map(([title, text], index) => (
              <div
                key={title}
                className="relative border-b border-line bg-surface p-6 last:border-0 md:border-b-0 md:border-r"
              >
                <span className="font-mono text-xs text-teal">
                  0{index + 1}
                </span>
                <h3 className="mt-7 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{text}</p>
              </div>
            ))}
          </Link>
        </div>
      </section>

      <section className="border-y border-line bg-surface/40 px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Designed for every role"
            title="One evidence base. Three purposeful views."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [
                ClipboardCheck,
                "Examiner",
                "Prioritised findings, evidence drill-downs, and generated questions.",
              ],
              [
                Users,
                "Supervisor / Leadership",
                "Cross-entity risk, systemic patterns, coverage, and review debt.",
              ],
              [
                History,
                "Auditor",
                "Stable rationale, config history, decisions, and a verifiable ledger.",
              ],
            ].map(([Icon, title, text]) => {
              const RoleIcon = Icon as LucideIcon
              return (
                <Card key={title as string}>
                  <RoleIcon className="text-teal" />
                  <h3 className="mt-6 text-xl font-semibold">
                    {title as string}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    {text as string}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="stack" className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Tech stack"
            title="Built on open, offline-ready technology."
            body="No CDN assets, no cloud analytics, and no external runtime calls."
          />
          <div className="mt-10 space-y-2">
            <Marquee technologies={techStack.slice(0, 13)} />
            <Marquee technologies={techStack.slice(13)} reverse />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
              <Check size={16} className="text-green" />
              All components are open-source and run fully offline.
            </p>
            <ButtonLink
              to="/stack"
              className="border border-line bg-surface text-ink hover:bg-surface-raised"
            >
              View full stack <ArrowRight size={15} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface/40 px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Architecture preview"
            title="Five zones. One governed evidence path."
          />
          <div className="mt-10 rounded-2xl border border-line bg-canvas p-4 lg:p-6">
            <div className="grid gap-3 lg:grid-cols-5">
              {[
                ["Data sources", Database],
                ["Ingestion", Layers3],
                ["Analytics", Binary],
                ["Trust layer", ShieldCheck],
                ["Presentation", BarChart3],
              ].map(([title, Icon], index) => {
                const ZoneIcon = Icon as LucideIcon
                return (
                  <Link
                    key={title as string}
                    to="/architecture"
                    className="group relative rounded-xl border border-line bg-surface p-5 hover:border-teal/40"
                  >
                    <ZoneIcon className="text-teal" size={20} />
                    <p className="mt-8 text-sm font-semibold">
                      {title as string}
                    </p>
                    <p className="mt-2 text-xs text-ink-muted">
                      Zone {index + 1}
                    </p>
                    {index < 4 && (
                      <ArrowRight
                        className="absolute -right-3 top-1/2 z-10 hidden text-ink-subtle lg:block"
                        size={17}
                      />
                    )}
                  </Link>
                )
              })}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="rounded-xl border border-green/20 bg-green/8 p-4 text-sm text-green">
                <ShieldCheck className="mr-2 inline" size={16} />
                Governance · RBAC · config versions · audit ledger
              </div>
              <div className="rounded-xl border border-violet/20 bg-violet/8 p-4 text-sm text-violet">
                <Sparkles className="mr-2 inline" size={16} />
                Synthetic adversary validation
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <Card className="grid gap-10 overflow-hidden border-violet/20 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <Badge tone="violet">Sample data</Badge>
              <Eyebrow className="mt-8">
                Validated against planted ground truth
              </Eyebrow>
              <h2 className="mt-3 text-4xl font-semibold">
                Does prioritisation actually find more?
              </h2>
              <p className="mt-5 leading-7 text-ink-muted">
                The validation harness compares the review queue against random
                sampling using known planted anomalies.
              </p>
              <ButtonLink to="/app/validation" className="mt-7">
                Open validation <ArrowRight size={15} />
              </ButtonLink>
            </div>
            <div className="relative min-h-64 rounded-xl border border-line bg-canvas/60 p-5">
              <div className="absolute inset-x-6 bottom-8 h-px bg-line" />
              <svg
                viewBox="0 0 400 190"
                className="h-full w-full"
                role="img"
                aria-label="Prioritised sampling outperforms random sampling in sample data"
              >
                <polyline
                  points="10,170 55,143 100,112 145,88 190,63 235,44 280,30 325,19 390,12"
                  fill="none"
                  stroke="currentColor"
                  className="text-teal"
                  strokeWidth="4"
                />
                <polyline
                  points="10,170 55,160 100,149 145,137 190,124 235,110 280,94 325,77 390,54"
                  fill="none"
                  stroke="currentColor"
                  className="text-ink-subtle"
                  strokeWidth="3"
                  strokeDasharray="7 6"
                />
              </svg>
              <div className="absolute left-6 top-5 space-y-2 text-xs">
                <span className="flex items-center gap-2">
                  <i className="h-0.5 w-5 bg-teal" />
                  Prioritised
                </span>
                <span className="flex items-center gap-2 text-ink-muted">
                  <i className="h-0.5 w-5 bg-ink-subtle" />
                  Random
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="faq" className="border-t border-line px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading eyebrow="FAQ" title="Questions worth asking." />
          <div className="divide-y divide-line border-y border-line">
            {faqs.map(([question, answer], index) => (
              <div key={question}>
                <Button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="flex w-full justify-between rounded-none bg-transparent px-0 py-5 text-left text-ink hover:bg-transparent"
                >
                  <span>{question}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 transition",
                      openFaq === index && "rotate-180",
                    )}
                  />
                </Button>
                {openFaq === index && (
                  <p className="pb-5 pr-10 text-sm leading-7 text-ink-muted">
                    {answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line px-5 py-20">
        <div className="ghost-grid absolute inset-0 opacity-50" />
        <div className="beam absolute inset-y-0 right-0 w-2/3" />
        <div className="relative mx-auto max-w-7xl">
          <Eyebrow>Ready to review differently?</Eyebrow>
          <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              See what your dashboards aren’t showing.
            </h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/app">
                Launch console <ArrowRight size={16} />
              </ButtonLink>
              <a
                href="/docs/onepager.pdf"
                className="inline-flex min-h-10 items-center rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold"
              >
                Download one-pager
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

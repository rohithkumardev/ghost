import { Check, ExternalLink } from "lucide-react"
import TechLogo from "@/components/TechLogo"
import { Badge, Eyebrow } from "@/components/ui"
import { techCategories, techStack } from "@/data/techStack"

export default function StackPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <Eyebrow>Offline technology stack</Eyebrow>
      <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight">
        Built to run where the network ends.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-muted">
        Every component is open-source, bundled locally, and selected for
        explainable, CPU-friendly supervisory analytics.
      </p>
      <div className="mt-12 space-y-12">
        {techCategories.map((category) => (
          <section key={category}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-xl font-semibold">{category}</h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="hidden grid-cols-[1.1fr_1.25fr_1.8fr_auto_auto] gap-4 border-b border-line px-5 py-3 text-xs font-semibold uppercase tracking-wider text-ink-subtle md:grid">
                <span>Technology</span>
                <span>Role</span>
                <span>Why we chose it</span>
                <span>Offline</span>
                <span>Reference</span>
              </div>
              {techStack
                .filter((item) => item.category === category)
                .map((technology) => (
                  <div
                    key={technology.name}
                    className="grid gap-4 border-b border-line px-5 py-5 last:border-0 md:grid-cols-[1.1fr_1.25fr_1.8fr_auto_auto] md:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <TechLogo name={technology.name} />
                      <span className="font-semibold">{technology.name}</span>
                    </div>
                    <span className="text-sm text-ink-muted">
                      {technology.role}
                    </span>
                    <span className="text-sm text-ink-muted">
                      Mature ecosystem, auditable operation, and support for
                      local deployment.
                    </span>
                    <Badge tone="green">
                      <Check size={13} /> Offline-ready
                    </Badge>
                    <a
                      href={technology.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline"
                    >
                      Click here <ExternalLink size={13} />
                    </a>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

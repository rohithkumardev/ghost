import { ExternalLink } from "lucide-react"
import TechLogo from "@/components/TechLogo"
import type { Technology } from "@/data/techStack"
import { cn } from "@/lib/cn"

export default function Marquee({
  technologies,
  reverse = false,
}: {
  technologies: Technology[]
  reverse?: boolean
}) {
  const repeated = [...technologies, ...technologies]
  return (
    <div className="marquee-mask group overflow-hidden">
      <div
        className={cn(
          "marquee-track flex w-max gap-3 py-2",
          reverse && "marquee-reverse",
        )}
      >
        {repeated.map((technology, index) => (
          <article
            key={`${technology.name}-${index}`}
            aria-hidden={index >= technologies.length}
            className="flex w-64 shrink-0 items-center gap-3 rounded-2xl border border-line bg-surface/90 p-3"
          >
            <TechLogo name={technology.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {technology.name}
              </p>
              <p className="truncate text-xs text-ink-subtle">
                {technology.role}
              </p>
            </div>
            <a
              href={technology.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-ink-subtle transition hover:text-teal"
              aria-label={`Click here to visit ${technology.name}`}
            >
              <ExternalLink size={15} />
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

import { Aperture } from "lucide-react"
import { Link } from "react-router-dom"

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-ink focus-visible:outline-2 focus-visible:outline-teal"
    >
      <span className="grid size-9 place-items-center rounded-xl border border-teal/30 bg-teal/10 text-teal shadow-glow">
        <Aperture size={19} aria-hidden="true" />
      </span>
      {!compact && (
        <span className="font-mono text-sm font-bold tracking-[0.2em]">
          GHOST<span className="text-teal">LIGHT</span>
        </span>
      )}
    </Link>
  )
}

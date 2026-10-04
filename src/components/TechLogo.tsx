import {
  siApacheecharts,
  siApacheparquet,
  siDocker,
  siDuckdb,
  siFastapi,
  siJinja,
  siNginx,
  siNumpy,
  siPandas,
  siPolars,
  siPostgresql,
  siPydantic,
  siPytest,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siScipy,
  siTailwindcss,
  siTypescript,
  siVite,
  type SimpleIcon,
} from "simple-icons"

const iconMap: Record<string, SimpleIcon> = {
  React: siReact,
  Vite: siVite,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Apache ECharts": siApacheecharts,
  Python: siPython,
  FastAPI: siFastapi,
  Pydantic: siPydantic,
  DuckDB: siDuckdb,
  "Apache Parquet": siApacheparquet,
  PostgreSQL: siPostgresql,
  pandas: siPandas,
  Polars: siPolars,
  NumPy: siNumpy,
  SciPy: siScipy,
  "scikit-learn": siScikitlearn,
  "PyTorch (CPU)": siPytorch,
  Jinja2: siJinja,
  Nginx: siNginx,
  Docker: siDocker,
  pytest: siPytest,
}

export default function TechLogo({ name }: { name: string }) {
  const icon = iconMap[name]
  if (!icon) {
    return (
      <span className="grid size-10 place-items-center rounded-xl border border-teal/20 bg-teal/10 font-mono text-xs font-bold text-teal">
        {name
          .split(/[\s-]/)
          .map((part) => part[0])
          .join("")
          .slice(0, 3)
          .toUpperCase()}
      </span>
    )
  }
  return (
    <span className="grid size-10 place-items-center rounded-xl border border-line bg-surface-raised text-ink">
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        role="img"
        aria-label={`${name} logo`}
      >
        <path d={icon.path} fill="currentColor" />
      </svg>
    </span>
  )
}

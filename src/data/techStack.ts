export interface Technology {
  name: string
  role: string
  category: string
  url: string
}

export const techStack: Technology[] = [
  {
    name: "React",
    role: "Dashboard UI",
    category: "Frontend",
    url: "https://react.dev",
  },
  {
    name: "Vite",
    role: "Frontend build",
    category: "Frontend",
    url: "https://vite.dev",
  },
  {
    name: "TypeScript",
    role: "Typed UI code",
    category: "Frontend",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "Tailwind CSS",
    role: "Styling",
    category: "Frontend",
    url: "https://tailwindcss.com",
  },
  {
    name: "Apache ECharts",
    role: "Charts and timelines",
    category: "Frontend",
    url: "https://echarts.apache.org",
  },
  {
    name: "Python",
    role: "Core language",
    category: "Backend",
    url: "https://www.python.org",
  },
  {
    name: "FastAPI",
    role: "REST API",
    category: "Backend",
    url: "https://fastapi.tiangolo.com",
  },
  {
    name: "Pydantic",
    role: "Schema validation",
    category: "Backend",
    url: "https://docs.pydantic.dev",
  },
  {
    name: "DuckDB",
    role: "Columnar analytics",
    category: "Data",
    url: "https://duckdb.org",
  },
  {
    name: "Apache Parquet",
    role: "Columnar storage",
    category: "Data",
    url: "https://parquet.apache.org",
  },
  {
    name: "PostgreSQL",
    role: "Users, config, audit ledger",
    category: "Data",
    url: "https://www.postgresql.org",
  },
  {
    name: "pandas",
    role: "Feature engineering",
    category: "Analytics",
    url: "https://pandas.pydata.org",
  },
  {
    name: "Polars",
    role: "Fast dataframes",
    category: "Analytics",
    url: "https://pola.rs",
  },
  {
    name: "NumPy",
    role: "Numerics",
    category: "Analytics",
    url: "https://numpy.org",
  },
  {
    name: "SciPy",
    role: "Statistical tests",
    category: "Analytics",
    url: "https://scipy.org",
  },
  {
    name: "statsmodels",
    role: "Count models",
    category: "Analytics",
    url: "https://www.statsmodels.org",
  },
  {
    name: "scikit-learn",
    role: "Isolation Forest, TF-IDF",
    category: "Analytics",
    url: "https://scikit-learn.org",
  },
  {
    name: "ruptures",
    role: "Change-point detection",
    category: "Analytics",
    url: "https://centre-borelli.github.io/ruptures-docs/",
  },
  {
    name: "NetworkX",
    role: "Escalation and ghost-chain graphs",
    category: "Analytics",
    url: "https://networkx.org",
  },
  {
    name: "PyTorch (CPU)",
    role: "Optional autoencoder",
    category: "Analytics",
    url: "https://pytorch.org",
  },
  {
    name: "MITRE ATT&CK",
    role: "Tactic knowledge base",
    category: "Knowledge",
    url: "https://attack.mitre.org",
  },
  {
    name: "Jinja2",
    role: "Template rationale",
    category: "Reporting",
    url: "https://jinja.palletsprojects.com",
  },
  {
    name: "WeasyPrint",
    role: "PDF reports",
    category: "Reporting",
    url: "https://weasyprint.org",
  },
  {
    name: "Nginx",
    role: "TLS reverse proxy",
    category: "Security/Deploy",
    url: "https://nginx.org",
  },
  {
    name: "Docker",
    role: "Offline deployment",
    category: "Deploy",
    url: "https://www.docker.com",
  },
  {
    name: "pytest",
    role: "Testing",
    category: "Quality",
    url: "https://pytest.org",
  },
]

export const techCategories = [
  ...new Set(techStack.map((technology) => technology.category)),
]

import { ArrowRight, ChevronDown, Menu, Moon, Sun } from "lucide-react"
import { Link, Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import { Button, ButtonLink } from "@/components/ui"
import { modules } from "@/data/navigation"
import { useAppStore } from "@/store/appStore"

export default function PublicLayout() {
  const { theme, setTheme } = useAppStore()
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
          <Logo />
          <nav
            className="hidden items-center gap-6 text-sm text-ink-muted lg:flex"
            aria-label="Primary navigation"
          >
            <div className="group relative">
              <Link
                to="/modules"
                className="inline-flex items-center gap-1 py-7 hover:text-ink"
              >
                Platform <ChevronDown size={14} />
              </Link>
              <div className="invisible absolute left-1/2 top-[calc(100%-0.25rem)] w-[46rem] -translate-x-1/2 translate-y-2 rounded-2xl border border-line bg-surface p-3 opacity-0 shadow-card transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="grid grid-cols-2 gap-1">
                  {modules.map((module) => (
                    <Link
                      key={module.id}
                      to={`/modules/${module.slug}`}
                      className="rounded-xl p-3 hover:bg-surface-raised"
                    >
                      <span className="font-mono text-xs text-teal">
                        {module.id}
                      </span>
                      <span className="ml-3 font-semibold text-ink">
                        {module.title}
                      </span>
                      <p className="ml-9 mt-1 text-xs text-ink-subtle">
                        {module.category} supervisory capability
                      </p>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/modules"
                  className="mt-2 flex items-center justify-between rounded-xl border border-line bg-canvas/50 px-4 py-3 font-semibold text-ink"
                >
                  Explore all modules <ArrowRight size={15} />
                </Link>
              </div>
            </div>
            <Link to="/architecture" className="hover:text-ink">
              Architecture
            </Link>
            <Link to="/stack" className="hover:text-ink">
              Tech stack
            </Link>
            <Link to="/app/validation" className="hover:text-ink">
              Validation
            </Link>
            <a href="/#faq" className="hover:text-ink">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              className="size-10 bg-surface-raised px-0 text-ink hover:bg-surface"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } theme`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </Button>
            <Button
              className="size-10 bg-surface-raised px-0 text-ink hover:bg-surface lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={17} />
            </Button>
            <Link
              to="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-ink-muted hover:bg-surface-raised hover:text-ink sm:inline-flex"
            >
              Sign in
            </Link>
            <ButtonLink
              to="/signup"
              className="hidden bg-surface-raised text-ink hover:bg-surface sm:inline-flex"
            >
              Sign up
            </ButtonLink>
            <ButtonLink to="/app" className="hidden sm:inline-flex">
              Launch console <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-line px-5 py-12 text-sm text-ink-muted">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs leading-6">
              Illuminating what SOCs don’t show. Offline supervisory analytics
              for critical infrastructure.
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink">Platform</p>
            <div className="mt-4 space-y-2">
              {modules.slice(0, 5).map((module) => (
                <Link
                  key={module.id}
                  to={`/modules/${module.slug}`}
                  className="block hover:text-teal"
                >
                  {module.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-ink">Console</p>
            <div className="mt-4 space-y-2">
              <Link to="/app/overview" className="block hover:text-teal">
                Overview
              </Link>
              <Link to="/app/queue" className="block hover:text-teal">
                Review queue
              </Link>
              <Link to="/app/validation" className="block hover:text-teal">
                Validation
              </Link>
              <Link to="/app/audit" className="block hover:text-teal">
                Audit ledger
              </Link>
              <Link to="/login" className="block hover:text-teal">
                Sign in
              </Link>
              <Link to="/signup" className="block hover:text-teal">
                Sign up
              </Link>
            </div>
          </div>
          <div>
            <p className="font-semibold text-ink">Resources</p>
            <div className="mt-4 space-y-2">
              <Link to="/architecture" className="block hover:text-teal">
                Architecture
              </Link>
              <Link to="/stack" className="block hover:text-teal">
                Stack
              </Link>
              <a href="/#faq" className="block hover:text-teal">
                FAQ
              </a>
              <span className="block">PS 26157 · Team placeholder</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-line pt-6 text-xs sm:flex-row">
          <span>GHOSTLIGHT · SIH 2026 · PS 26157</span>
          <span>{modules.length} modules · Fully offline by design</span>
        </div>
      </footer>
    </div>
  )
}

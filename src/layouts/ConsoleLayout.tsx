import { ChevronDown, Menu, Moon, Search, Sun } from "lucide-react"
import { NavLink, Outlet } from "react-router-dom"
import Logo from "@/components/Logo"
import { Badge, Button } from "@/components/ui"
import { consoleNavigation } from "@/data/navigation"
import { cn } from "@/lib/cn"
import { useAppStore } from "@/store/appStore"

export default function ConsoleLayout() {
  const { role, theme, setTheme, sidebarOpen, setSidebarOpen } = useAppStore()
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden border-r border-line bg-surface lg:block",
          sidebarOpen ? "w-64" : "w-20",
        )}
      >
        <div className="flex h-18 items-center border-b border-line px-5">
          <Logo compact={!sidebarOpen} />
        </div>
        <nav
          className="h-[calc(100vh-4.5rem)] space-y-1 overflow-y-auto p-3"
          aria-label="Console navigation"
        >
          {consoleNavigation.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-ink-muted transition hover:bg-surface-raised hover:text-ink",
                  isActive && "bg-teal/10 text-teal",
                )
              }
            >
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div
        className={cn(
          "transition-[padding]",
          sidebarOpen ? "lg:pl-64" : "lg:pl-20",
        )}
      >
        <header className="sticky top-0 z-30 flex h-18 items-center gap-3 border-b border-line bg-canvas/90 px-4 backdrop-blur-xl lg:px-6">
          <Button
            className="size-10 bg-surface px-0 text-ink hover:bg-surface-raised"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </Button>
          <button className="hidden min-h-10 flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-left text-sm text-ink-subtle md:flex">
            <Search size={16} /> Search entities and findings
            <kbd className="ml-auto rounded border border-line px-2 py-0.5 font-mono text-xs">
              Ctrl K
            </kbd>
          </button>
          <button className="hidden min-h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-ink-muted sm:flex">
            All sectors <ChevronDown size={15} />
          </button>
          <Badge tone="amber" className="hidden xl:inline-flex">
            PROTOTYPE · SAMPLE DATA
          </Badge>
          <Badge tone="teal">{role ?? "Demo"}</Badge>
          <Button
            className="size-10 bg-surface px-0 text-ink hover:bg-surface-raised"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </Button>
        </header>
        <main className="p-4 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

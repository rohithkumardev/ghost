import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Sector, UserRole } from "@/types"

type Theme = "dark" | "light"

interface AppState {
  role: UserRole | null
  theme: Theme
  sector: Sector | "All"
  sidebarOpen: boolean
  setRole: (role: UserRole | null) => void
  setTheme: (theme: Theme) => void
  setSector: (sector: Sector | "All") => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      role: null,
      theme: "dark",
      sector: "All",
      sidebarOpen: true,
      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      setSector: (sector) => set({ sector }),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    { name: "ghostlight-preferences" },
  ),
)

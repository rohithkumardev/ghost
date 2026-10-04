import type { GhostlightApi } from "./types"

const API_ROOT = import.meta.env.VITE_API_URL ?? "/api"

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  })
  if (!response.ok)
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    )
  return response.json() as Promise<T>
}

export const httpAdapter: GhostlightApi = {
  getEntities: () => request("/entities"),
  getEntity: (id) => request(`/entities/${id}`),
  getFindings: () => request("/findings"),
  getFinding: (id) => request(`/findings/${id}`),
  getEvidence: (findingId) => request(`/findings/${findingId}/evidence`),
  getClaims: () => request("/declared"),
  getQueue: () => request("/queue"),
  getLedger: () => request("/audit"),
  getValidation: () => request("/validation"),
  getConfigVersions: () => request("/admin/config-versions"),
  getUsers: () => request("/admin/users"),
  runAnalysis: () => request("/ingest/run", { method: "POST" }),
}

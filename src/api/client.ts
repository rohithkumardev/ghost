import { httpAdapter } from "./httpAdapter"
import { mockAdapter } from "./mockAdapter"

const useMock = import.meta.env.VITE_USE_MOCK !== "false"
const adapter = useMock ? mockAdapter : httpAdapter

export const getEntities = adapter.getEntities
export const getEntity = adapter.getEntity
export const getFindings = adapter.getFindings
export const getFinding = adapter.getFinding
export const getEvidence = adapter.getEvidence
export const getClaims = adapter.getClaims
export const getQueue = adapter.getQueue
export const getLedger = adapter.getLedger
export const getValidation = adapter.getValidation
export const getConfigVersions = adapter.getConfigVersions
export const getUsers = adapter.getUsers
export const runAnalysis = adapter.runAnalysis
export const apiMode = useMock ? "mock" : "http"

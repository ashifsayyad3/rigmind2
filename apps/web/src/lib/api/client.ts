import axios, { AxiosResponse } from 'axios'
import type {
  ApiResponse, PaginatedResponse, FilterParams,
  RigSummary, RigDetail, FleetHealthMetrics,
  FailureSummary, FailureDetail, CorrectiveAction,
  DeferredMaintenanceTask,
  CertificateSummary,
  NonProductionTime, NptSummary,
  ObservationSummary,
  RcmRecommendation,
  RtmEvent, SensorDataPoint, AlarmConfig,
  CopilotMessage,
  Alert,
  BopEvent, BopChange, BopSummary,
  WellSummary,
  FailurePrediction,
  WorkflowStatus,
} from '@/lib/types'

const DEV_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlUxc1g0WUZIUzdaNlZsN1ZITEl6VGVqYnZqMCJ9.eyJhdWQiOiI4YjgwNjk4OC00NTg2LTQwNTktYjhjOS0xMzFjZjk5ZWU5NWUiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vNTY1YjBjOTYtNGRmMi00YWE3LWFlM2YtODI2YmIxYTlmZDVlL3YyLjAiLCJpYXQiOjE3Nzc1NTQyMzgsIm5iZiI6MTc3NzU1NDIzOCwiZXhwIjoxNzc3NTU5NzcxLCJhaW8iOiJBZVFBRy84YkFBQUE3c01pWDRGZ2diVWtIelNzQTFVRzJSbVdmenVsajBLcG00OGc1Q2xQSmJRL2NlRTB1cXNqU05mbzErUHlDa3JFNHl6V241S0J1ZXNDbDNPZjE0am9wUjZCd0NoNUk0Sm1aWkFvNHFrTTZ6dXhCV3RaU0ZKK245Uk44R2FoSGVsM1FVa280cXpqSEE5VXVmYjBkeU9UU0JsN0xsV0tkMG9rR2c1OWpqaHBmWjhHQllneW9HSDM0MzRRZisvZDBvZ0RFd0JXbEc3Wk52bnkwZ3orakJOTEZXUmtQM0VIc2JoVDhoWFNnOU81MUdmb3AzTTQyN1E5dUlrUHZqN0J3MWZkTHI3UUpoVitVNENLaEtmQlVvWERZbm5Uek5TN2tESElpOFhzQmxTZktscz0iLCJhenAiOiIwNjI2YjlmYi1kZDk5LTQxYTEtOTc4My02YTYxZGU4ZmE4MWMiLCJhenBhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDU4NTkyYWMtNGRjZi00ODU1LTg1ZGMtNGM0ODNiYmM4NzEwLyIsIm5hbWUiOiJBc2hpZiBTYXl5YWQiLCJvaWQiOiI4YjliYTE1Zi04OTExLTRiOGEtOGJjNi1kYzZhYTU1MWQ5MDgiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhc2hpZi5zYXl5YWRAYXF1aWxhLWVuZ2luZWVyLmNvbSIsInJoIjoiMS5BYjBBbGd4YlZ2Sk5wMHF1UDRKcnNhbjlYb2hwZ0l1R1JWbEF1TWtUSFBtZTZWNEFBTmU5QUEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lkIjoiMDAyMjVjZmEtZDA4NS1kZTQ2LTY3ODEtMTg0OWQzNzQzODQ0Iiwic3ViIjoiVXRJM19jYWNsWHRqc3BXaE9CcE1wTnA1Yks1SXAwRVRJaEcwWXVjUjE4QSIsInRpZCI6IjU2NWIwYzk2LTRkZjItNGFhNy1hZTNmLTgyNmJiMWE5ZmQ1ZSIsInV0aSI6ImZ6TWFEQ3JQQVVhSmM2eTFVSXdEQUEiLCJ2ZXIiOiIyLjAiLCJ4bXNfZnRkIjoieU5SaFZDQVBERUstMnhyMk9pTjNSRzQxZTBEU2xlQUtTcHB3YjFvRkZxRUJkWE5sWVhOMExXUnpiWE0ifQ.TRB6F88aqHugNXZGc10unTxANjb6iC1VhvXXA5goVZ_zVL51uH8Mum31_0z9n4R1uj7g5-FbKKEnLR4OZ5VUOmbtXEvl84Nf-RBvVf_sKSbs54IxmjJsO-ARrCY3PzD1fdV53yutnQdN9GjDfaB9BIDunJZ0Fstekx5gp89NDoZJyJdKauMhdxjopEJ-tyX_TvWWTpwIS0O2RX55iNROsKZnU6Z6Wkwkgya2y6pywevfg-NAMQzi_UjVgBf7SilBXEVtZpAk6beB5nJA-WvYQIPveleDYCv_A_P_BPZuIzE0F-uDrp-GvO80U1M7OnlHAsnQswtSwLqvIF6qwJ-Vlw'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${DEV_TOKEN}`,
  },
})

// Attach JWT (stored token overrides DEV_TOKEN if present)
http.interceptors.request.use((cfg) => {
  if (typeof window !== 'undefined') {
    try {
      const { state } = JSON.parse(localStorage.getItem('rigmind-v1') ?? '{}')
      if (state?.token) cfg.headers!.Authorization = `Bearer ${state.token}`
    } catch { /* noop */ }
  }
  return cfg
})

// Global 401 → redirect
http.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/auth/login'
    }
    return Promise.reject(err)
  }
)

async function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const r: AxiosResponse<ApiResponse<T>> = await http.get(url, { params })
  return r.data.data
}
async function post<T>(url: string, body: unknown = {}): Promise<T> {
  const r: AxiosResponse<ApiResponse<T>> = await http.post(url, body)
  return r.data.data
}
async function put<T>(url: string, body: unknown = {}): Promise<T> {
  const r: AxiosResponse<ApiResponse<T>> = await http.put(url, body)
  return r.data.data
}
async function del<T = void>(url: string): Promise<T> {
  const r: AxiosResponse<ApiResponse<T>> = await http.delete(url)
  return r.data.data
}

// ─── Auth ─────────────────────────────────────────────────────────────────
export const authApi = {
  login:    (email: string, password: string) => post<{ token: string; user: import('@/lib/types').UserProfile }>('/api/v1/auth/login', { email, password }),
  refresh:  ()  => post<{ token: string }>('/api/v1/auth/refresh'),
  logout:   ()  => post<void>('/api/v1/auth/logout'),
  me:       ()  => get<import('@/lib/types').UserProfile>('/api/v1/auth/me'),
}

// ─── Fleet ────────────────────────────────────────────────────────────────
export const fleetApi = {
  getMetrics:       () => get<FleetHealthMetrics>('/api/v1/fleet/health'),
  getGlobalMap:     () => get<Array<{ id: number; name: string; lat: number; lng: number; status: string; healthScore: number }>>('/api/v1/fleet/map'),
  getHealthHistory: (days = 30) => get<Array<{ date: string; score: number }>>('/api/v1/fleet/health-history', { days }),
  getPredictions:   () => get<FailurePrediction[]>('/api/v1/fleet/predictions'),
  getHealthScores:  () => get<PaginatedResponse<RigSummary>>('/api/v1/rigs', { pageSize: 100 }),
}

// ─── Rigs ─────────────────────────────────────────────────────────────────
export const rigsApi = {
  list:            (p?: FilterParams) => get<PaginatedResponse<RigSummary>>('/api/v1/rigs', p as Record<string, unknown>),
  get:             (id: number) => get<RigDetail>(`/api/v1/rigs/${id}`),
  create:          (b: Partial<RigDetail>) => post<RigDetail>('/api/v1/rigs', b),
  update:          (id: number, b: Partial<RigDetail>) => put<RigDetail>(`/api/v1/rigs/${id}`, b),
  getHealthScore:  (id: number) => get<{ score: number; breakdown: Record<string, number> }>(`/api/v1/rigs/${id}/health`),
  getTimeline:     (id: number, days?: number) => get<unknown[]>(`/api/v1/rigs/${id}/timeline`, { days }),
  getComponents:   (id: number) => get<import('@/lib/types').ComponentSummary[]>(`/api/v1/rigs/${id}/components`),
}

// ─── Wells ────────────────────────────────────────────────────────────────
export const wellsApi = {
  list:   (p?: FilterParams) => get<PaginatedResponse<WellSummary>>('/api/v1/wells', p as Record<string, unknown>),
  get:    (id: number) => get<WellSummary>(`/api/v1/wells/${id}`),
  create: (b: Partial<WellSummary>) => post<WellSummary>('/api/v1/wells', b),
  update: (id: number, b: Partial<WellSummary>) => put<WellSummary>(`/api/v1/wells/${id}`, b),
}

// ─── Failures ─────────────────────────────────────────────────────────────
export const failuresApi = {
  list:          (p?: FilterParams) => get<PaginatedResponse<FailureSummary>>('/api/v1/failures', p as Record<string, unknown>),
  get:           (id: number) => get<FailureDetail>(`/api/v1/failures/${id}`),
  create:        (b: Partial<FailureDetail>) => post<FailureDetail>('/api/v1/failures', b),
  update:        (id: number, b: Partial<FailureDetail>) => put<FailureDetail>(`/api/v1/failures/${id}`, b),
  delete:        (id: number) => del(`/api/v1/failures/${id}`),
  getByRig:      (rigId: number, p?: FilterParams) => get<PaginatedResponse<FailureSummary>>(`/api/v1/rigs/${rigId}/failures`, p as Record<string, unknown>),
  getSimilar:    (id: number) => get<FailureSummary[]>(`/api/v1/failures/${id}/similar`),
  getRootCause:  (id: number) => post<{ rootCause: string; factors: string[]; recommendations: string[] }>(`/api/v1/failures/${id}/root-cause`),
  getTimeline:   (id: number) => get<Array<{ timestamp: string; type: string; description: string }>>(`/api/v1/failures/${id}/timeline`),
  getStats:      (rigId?: number, days?: number) => get<{ total: number; bySeverity: Record<string, number>; byType: Array<{type:string;count:number}>; totalNptHours: number }>('/api/v1/failures/stats', { rigId, days }),
  addCorrectiveAction: (failureId: number, b: Partial<CorrectiveAction>) => post<CorrectiveAction>(`/api/v1/failures/${failureId}/corrective-actions`, b),
}

// ─── Maintenance ──────────────────────────────────────────────────────────
export const maintenanceApi = {
  listDeferred:  (p?: FilterParams) => get<PaginatedResponse<DeferredMaintenanceTask>>('/api/v1/maintenance/deferred', p as Record<string, unknown>),
  getDeferred:   (id: number) => get<DeferredMaintenanceTask>(`/api/v1/maintenance/deferred/${id}`),
  createDeferred:(b: Partial<DeferredMaintenanceTask>) => post<DeferredMaintenanceTask>('/api/v1/maintenance/deferred', b),
  updateDeferred:(id: number, b: Partial<DeferredMaintenanceTask>) => put<DeferredMaintenanceTask>(`/api/v1/maintenance/deferred/${id}`, b),
  deleteDeferred:(id: number) => del(`/api/v1/maintenance/deferred/${id}`),
  getOverdue:    (rigId?: number) => get<DeferredMaintenanceTask[]>('/api/v1/maintenance/overdue', rigId ? { rigId } : undefined),
  getSchedule:   (rigId: number) => get<unknown[]>(`/api/v1/rigs/${rigId}/maintenance/schedule`),
}

// ─── Certificates ─────────────────────────────────────────────────────────
export const certificatesApi = {
  list:           (p?: FilterParams) => get<PaginatedResponse<CertificateSummary>>('/api/v1/certificates', p as Record<string, unknown>),
  get:            (id: number) => get<CertificateSummary>(`/api/v1/certificates/${id}`),
  create:         (b: Partial<CertificateSummary>) => post<CertificateSummary>('/api/v1/certificates', b),
  update:         (id: number, b: Partial<CertificateSummary>) => put<CertificateSummary>(`/api/v1/certificates/${id}`, b),
  delete:         (id: number) => del(`/api/v1/certificates/${id}`),
  getExpiringSoon:(days?: number) => get<CertificateSummary[]>('/api/v1/certificates/expiring', { days: days ?? 60 }),
}

// ─── NPT ──────────────────────────────────────────────────────────────────
export const nptApi = {
  list:        (p?: FilterParams) => get<PaginatedResponse<NonProductionTime>>('/api/v1/npt', p as Record<string, unknown>),
  getSummary:  (p?: { rigId?: number; startDate?: string; endDate?: string }) => get<NptSummary>('/api/v1/npt/summary', p as Record<string, unknown>),
  getTrend:    (rigId?: number, months?: number) => get<Array<{ month: string; hours: number; cost: number }>>('/api/v1/npt/trend', { rigId, months }),
  getByCategory: () => get<Array<{ category: string; hours: number; pct: number }>>('/api/v1/npt/by-category'),
}

// ─── Observations ─────────────────────────────────────────────────────────
export const observationsApi = {
  list:   (p?: FilterParams) => get<PaginatedResponse<ObservationSummary>>('/api/v1/observations', p as Record<string, unknown>),
  get:    (id: number) => get<ObservationSummary>(`/api/v1/observations/${id}`),
  create: (b: Partial<ObservationSummary>) => post<ObservationSummary>('/api/v1/observations', b),
  update: (id: number, b: Partial<ObservationSummary>) => put<ObservationSummary>(`/api/v1/observations/${id}`, b),
  delete: (id: number) => del(`/api/v1/observations/${id}`),
}

// ─── Recommendations ──────────────────────────────────────────────────────
export const recommendationsApi = {
  list:            (p?: FilterParams) => get<PaginatedResponse<RcmRecommendation>>('/api/v1/recommendations', p as Record<string, unknown>),
  getAll:          (p?: FilterParams) => get<PaginatedResponse<RcmRecommendation>>('/api/v1/recommendations', p as Record<string, unknown>),
  get:             (id: number) => get<RcmRecommendation>(`/api/v1/recommendations/${id}`),
  markCommunicated:(id: number) => put<RcmRecommendation>(`/api/v1/recommendations/${id}/communicate`),
  updateStatus:    (id: number, status: string) => put<RcmRecommendation>(`/api/v1/recommendations/${id}/status`, { status }),
  getStats:        () => get<{ total: number; overdue: number; byStatus: Record<string, number> }>('/api/v1/recommendations/stats'),
}

// ─── BOP ──────────────────────────────────────────────────────────────────
export const bopApi = {
  getEvents:      (rigId: number, p?: FilterParams) => get<PaginatedResponse<BopEvent>>(`/api/v1/rigs/${rigId}/bop-events`, p as Record<string, unknown>),
  getChanges:     (bopId: number) => get<BopChange[]>(`/api/v1/bops/${bopId}/changes`),
  getAssignments: (rigId: number) => get<BopSummary[]>(`/api/v1/rigs/${rigId}/bop-assignments`),
}

// ─── RTM ──────────────────────────────────────────────────────────────────
export const rtmApi = {
  getEvents:       (rigId: number, p?: FilterParams) => get<PaginatedResponse<RtmEvent>>(`/api/v1/rigs/${rigId}/rtm-events`, p as Record<string, unknown>),
  getAlarmConfigs: (rigId: number) => get<AlarmConfig[]>(`/api/v1/rigs/${rigId}/alarm-configs`),
  getSensorData:   (rigId: number, param: string, hours?: number) => get<SensorDataPoint[]>(`/api/v1/rigs/${rigId}/sensors/${param}`, { hours }),
  acknowledgeEvent:(id: number) => put<RtmEvent>(`/api/v1/rtm-events/${id}/acknowledge`),
}

// ─── AI Copilot ───────────────────────────────────────────────────────────
export const copilotApi = {
  ask:           (question: string, history: CopilotMessage[]) => post<{ answer: string; sql?: string; data?: unknown[]; chartType?: string; rowCount?: number }>('/api/v1/copilot/ask', { question, history }),
  generateReport:(rigId: number, type: string) => post<{ report: string; rigName: string; generatedAt: string }>('/api/v1/copilot/report', { rigId, type }),
  getRca:        (failureId: number) => post<{ analysis: string; factors: string[]; recommendations: string[] }>(`/api/v1/copilot/rca/${failureId}`),
  getPrediction: (rigId: number) => post<import('@/lib/types').FailurePrediction>('/api/v1/copilot/predict', { rigId }),
}

// ─── Notifications ────────────────────────────────────────────────────────
export const notificationsApi = {
  list:       () => get<Alert[]>('/api/v1/notifications'),
  markRead:   (id: number) => put<void>(`/api/v1/notifications/${id}/read`),
  markAllRead:() => put<void>('/api/v1/notifications/read-all'),
}

// ─── Reports ──────────────────────────────────────────────────────────────
export const reportsApi = {
  generate: (rigId: number, type: string, dateRange: { start: string; end: string }) => post<{ url: string; reportId: string }>('/api/v1/reports/generate', { rigId, type, dateRange }),
  list:     () => get<Array<{ id: string; name: string; type: string; createdAt: string; url: string }>>('/api/v1/reports'),
  download: (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/api/v1/reports/${id}/download`,
}

// ─── Automation ───────────────────────────────────────────────────────────
export const automationApi = {
  getWorkflows:    () => get<WorkflowStatus[]>('/api/v1/automation/workflows'),
  toggleWorkflow:  (id: string, active: boolean) => put<WorkflowStatus>(`/api/v1/automation/workflows/${id}`, { active }),
  triggerWorkflow: (id: string) => post<{ executionId: string }>(`/api/v1/automation/workflows/${id}/trigger`),
}

export { http }

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
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

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT
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
  login:    (email: string, password: string) => post<{ token: string; user: import('@/lib/types').UserProfile }>('/api/auth/login', { email, password }),
  refresh:  ()  => post<{ token: string }>('/api/auth/refresh'),
  logout:   ()  => post<void>('/api/auth/logout'),
  me:       ()  => get<import('@/lib/types').UserProfile>('/api/auth/me'),
}

// ─── Fleet ────────────────────────────────────────────────────────────────
export const fleetApi = {
  getMetrics:       () => get<FleetHealthMetrics>('/api/fleet/health'),
  getGlobalMap:     () => get<Array<{ id: number; name: string; lat: number; lng: number; status: string; healthScore: number }>>('/api/fleet/map'),
  getHealthHistory: (days = 30) => get<Array<{ date: string; score: number }>>('/api/fleet/health-history', { days }),
  getPredictions:   () => get<FailurePrediction[]>('/api/fleet/predictions'),
  getHealthScores:  () => get<PaginatedResponse<RigSummary>>('/api/rigs', { pageSize: 100 }),
}

// ─── Rigs ─────────────────────────────────────────────────────────────────
export const rigsApi = {
  list:            (p?: FilterParams) => get<PaginatedResponse<RigSummary>>('/api/rigs', p as Record<string, unknown>),
  get:             (id: number) => get<RigDetail>(`/api/rigs/${id}`),
  create:          (b: Partial<RigDetail>) => post<RigDetail>('/api/rigs', b),
  update:          (id: number, b: Partial<RigDetail>) => put<RigDetail>(`/api/rigs/${id}`, b),
  getHealthScore:  (id: number) => get<{ score: number; breakdown: Record<string, number> }>(`/api/rigs/${id}/health`),
  getTimeline:     (id: number, days?: number) => get<unknown[]>(`/api/rigs/${id}/timeline`, { days }),
  getComponents:   (id: number) => get<import('@/lib/types').ComponentSummary[]>(`/api/rigs/${id}/components`),
}

// ─── Wells ────────────────────────────────────────────────────────────────
export const wellsApi = {
  list:   (p?: FilterParams) => get<PaginatedResponse<WellSummary>>('/api/wells', p as Record<string, unknown>),
  get:    (id: number) => get<WellSummary>(`/api/wells/${id}`),
  create: (b: Partial<WellSummary>) => post<WellSummary>('/api/wells', b),
  update: (id: number, b: Partial<WellSummary>) => put<WellSummary>(`/api/wells/${id}`, b),
}

// ─── Failures ─────────────────────────────────────────────────────────────
export const failuresApi = {
  list:          (p?: FilterParams) => get<PaginatedResponse<FailureSummary>>('/api/failures', p as Record<string, unknown>),
  get:           (id: number) => get<FailureDetail>(`/api/failures/${id}`),
  create:        (b: Partial<FailureDetail>) => post<FailureDetail>('/api/failures', b),
  update:        (id: number, b: Partial<FailureDetail>) => put<FailureDetail>(`/api/failures/${id}`, b),
  delete:        (id: number) => del(`/api/failures/${id}`),
  getByRig:      (rigId: number, p?: FilterParams) => get<PaginatedResponse<FailureSummary>>(`/api/rigs/${rigId}/failures`, p as Record<string, unknown>),
  getSimilar:    (id: number) => get<FailureSummary[]>(`/api/failures/${id}/similar`),
  getRootCause:  (id: number) => post<{ rootCause: string; factors: string[]; recommendations: string[] }>(`/api/failures/${id}/root-cause`),
  getTimeline:   (id: number) => get<Array<{ timestamp: string; type: string; description: string }>>(`/api/failures/${id}/timeline`),
  getStats:      (rigId?: number, days?: number) => get<{ total: number; bySeverity: Record<string, number>; byType: Array<{type:string;count:number}>; totalNptHours: number }>('/api/failures/stats', { rigId, days }),
  addCorrectiveAction:   (failureId: number, b: Partial<CorrectiveAction>) => post<CorrectiveAction>(`/api/failures/${failureId}/corrective-actions`, b),
}

// ─── Maintenance ──────────────────────────────────────────────────────────
export const maintenanceApi = {
  listDeferred:  (p?: FilterParams) => get<PaginatedResponse<DeferredMaintenanceTask>>('/api/maintenance/deferred', p as Record<string, unknown>),
  getDeferred:   (id: number) => get<DeferredMaintenanceTask>(`/api/maintenance/deferred/${id}`),
  createDeferred:(b: Partial<DeferredMaintenanceTask>) => post<DeferredMaintenanceTask>('/api/maintenance/deferred', b),
  updateDeferred:(id: number, b: Partial<DeferredMaintenanceTask>) => put<DeferredMaintenanceTask>(`/api/maintenance/deferred/${id}`, b),
  deleteDeferred:(id: number) => del(`/api/maintenance/deferred/${id}`),
  getOverdue:    (rigId?: number) => get<DeferredMaintenanceTask[]>('/api/maintenance/overdue', rigId ? { rigId } : undefined),
  getSchedule:   (rigId: number) => get<unknown[]>(`/api/rigs/${rigId}/maintenance/schedule`),
}

// ─── Certificates ─────────────────────────────────────────────────────────
export const certificatesApi = {
  list:           (p?: FilterParams) => get<PaginatedResponse<CertificateSummary>>('/api/certificates', p as Record<string, unknown>),
  get:            (id: number) => get<CertificateSummary>(`/api/certificates/${id}`),
  create:         (b: Partial<CertificateSummary>) => post<CertificateSummary>('/api/certificates', b),
  update:         (id: number, b: Partial<CertificateSummary>) => put<CertificateSummary>(`/api/certificates/${id}`, b),
  delete:         (id: number) => del(`/api/certificates/${id}`),
  getExpiringSoon:(days?: number) => get<CertificateSummary[]>('/api/certificates/expiring', { days: days ?? 60 }),
}

// ─── NPT ──────────────────────────────────────────────────────────────────
export const nptApi = {
  list:      (p?: FilterParams) => get<PaginatedResponse<NonProductionTime>>('/api/npt', p as Record<string, unknown>),
  getSummary:(p?: { rigId?: number; startDate?: string; endDate?: string }) => get<NptSummary>('/api/npt/summary', p as Record<string, unknown>),
  getTrend:  (rigId?: number, months?: number) => get<Array<{ month: string; hours: number; cost: number }>>('/api/npt/trend', { rigId, months }),
  getByCategory: () => get<Array<{ category: string; hours: number; pct: number }>>('/api/npt/by-category'),
}

// ─── Observations ─────────────────────────────────────────────────────────
export const observationsApi = {
  list:   (p?: FilterParams) => get<PaginatedResponse<ObservationSummary>>('/api/observations', p as Record<string, unknown>),
  get:    (id: number) => get<ObservationSummary>(`/api/observations/${id}`),
  create: (b: Partial<ObservationSummary>) => post<ObservationSummary>('/api/observations', b),
  update: (id: number, b: Partial<ObservationSummary>) => put<ObservationSummary>(`/api/observations/${id}`, b),
  delete: (id: number) => del(`/api/observations/${id}`),
}

// ─── Recommendations ──────────────────────────────────────────────────────
export const recommendationsApi = {
  list:            (p?: FilterParams) => get<PaginatedResponse<RcmRecommendation>>('/api/recommendations', p as Record<string, unknown>),
  getAll:          (p?: FilterParams) => get<PaginatedResponse<RcmRecommendation>>('/api/recommendations', p as Record<string, unknown>),
  get:             (id: number) => get<RcmRecommendation>(`/api/recommendations/${id}`),
  markCommunicated:(id: number) => put<RcmRecommendation>(`/api/recommendations/${id}/communicate`),
  updateStatus:    (id: number, status: string) => put<RcmRecommendation>(`/api/recommendations/${id}/status`, { status }),
  getStats:        () => get<{ total: number; overdue: number; byStatus: Record<string, number> }>('/api/recommendations/stats'),
}

// ─── BOP ──────────────────────────────────────────────────────────────────
export const bopApi = {
  getEvents:  (rigId: number, p?: FilterParams) => get<PaginatedResponse<BopEvent>>(`/api/rigs/${rigId}/bop-events`, p as Record<string, unknown>),
  getChanges: (bopId: number) => get<BopChange[]>(`/api/bops/${bopId}/changes`),
  getAssignments: (rigId: number) => get<BopSummary[]>(`/api/rigs/${rigId}/bop-assignments`),
}

// ─── RTM ──────────────────────────────────────────────────────────────────
export const rtmApi = {
  getEvents:     (rigId: number, p?: FilterParams) => get<PaginatedResponse<RtmEvent>>(`/api/rigs/${rigId}/rtm-events`, p as Record<string, unknown>),
  getAlarmConfigs:(rigId: number) => get<AlarmConfig[]>(`/api/rigs/${rigId}/alarm-configs`),
  getSensorData: (rigId: number, param: string, hours?: number) => get<SensorDataPoint[]>(`/api/rigs/${rigId}/sensors/${param}`, { hours }),
  acknowledgeEvent:(id: number) => put<RtmEvent>(`/api/rtm-events/${id}/acknowledge`),
}

// ─── AI Copilot ───────────────────────────────────────────────────────────
export const copilotApi = {
  ask:          (question: string, history: CopilotMessage[]) => post<{ answer: string; sql?: string; data?: unknown[]; chartType?: string; rowCount?: number }>('/api/copilot/ask', { question, history }),
  generateReport:(rigId: number, type: string) => post<{ report: string; rigName: string; generatedAt: string }>('/api/copilot/report', { rigId, type }),
  getRca:       (failureId: number) => post<{ analysis: string; factors: string[]; recommendations: string[] }>(`/api/copilot/rca/${failureId}`),
  getPrediction:(rigId: number) => post<import('@/lib/types').FailurePrediction>('/api/copilot/predict', { rigId }),
}

// ─── Notifications ────────────────────────────────────────────────────────
export const notificationsApi = {
  list:       () => get<Alert[]>('/api/notifications'),
  markRead:   (id: number) => put<void>(`/api/notifications/${id}/read`),
  markAllRead:() => put<void>('/api/notifications/read-all'),
}

// ─── Reports ──────────────────────────────────────────────────────────────
export const reportsApi = {
  generate:  (rigId: number, type: string, dateRange: { start: string; end: string }) => post<{ url: string; reportId: string }>('/api/reports/generate', { rigId, type, dateRange }),
  list:      () => get<Array<{ id: string; name: string; type: string; createdAt: string; url: string }>>('/api/reports'),
  download:  (id: string) => `${process.env.NEXT_PUBLIC_API_URL}/api/reports/${id}/download`,
}

// ─── Automation ───────────────────────────────────────────────────────────
export const automationApi = {
  getWorkflows:   () => get<WorkflowStatus[]>('/api/automation/workflows'),
  toggleWorkflow: (id: string, active: boolean) => put<WorkflowStatus>(`/api/automation/workflows/${id}`, { active }),
  triggerWorkflow:(id: string) => post<{ executionId: string }>(`/api/automation/workflows/${id}/trigger`),
}

export { http }

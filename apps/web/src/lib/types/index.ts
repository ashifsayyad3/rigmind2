// ─── Rigs ──────────────────────────────────────────────────────────────────
export type RigStatus = 'active' | 'maintenance' | 'idle' | 'critical' | 'offContract'

export interface RigSummary {
  id: number
  name: string
  status: RigStatus
  onContract: boolean
  healthScore: number
  activeFailures: number
  nptHoursLast30d: number
  certExpiringSoon: number
  overdueMaintenace: number
  lastUpdated: string
  location?: { lat: number; lng: number }
  operatorName?: string
  bopState?: string
}

export interface RigDetail extends RigSummary {
  offContractDate?: string
  operationStart?: string
  projectedUnLatchDate?: string
  rtmRigId?: string
  wells: WellSummary[]
  activeBOPs: BopSummary[]
  rigStack?: string
  rigComponents: ComponentSummary[]
}

export interface WellSummary {
  id: number
  name: string
  depth?: number
  region?: string
  field?: string
  availability?: string
  status?: string
  isRemoved: boolean
}

export interface BopSummary {
  id: number
  location?: string
  state?: string
  onDeckDate?: string
  installationDate?: string
  vendorOEM?: string
  serialNumber?: string
}

// ─── Failures ─────────────────────────────────────────────────────────────
export type FailureSeverity = 'critical' | 'high' | 'medium' | 'low'
export type FailureStatus   = 'open' | 'in_progress' | 'resolved' | 'closed'

export interface FailureSummary {
  id: number
  rigId?: number
  rigName?: string
  dateOfFailure?: string
  description?: string
  failureType?: string
  severity?: FailureSeverity
  status?: FailureStatus
  nptHours?: number
  failureModeName?: string
  mechanism?: string
  moc?: boolean
  createdAt: string
}

export interface FailureDetail extends FailureSummary {
  cause?: string
  cycleCounts?: number
  impactedFunctions?: string
  indicationsSymptoms?: string
  correctiveActions: CorrectiveAction[]
  lessonsLearned: LessonsLearned[]
  observations: ObservationSummary[]
  communications: CommunicationSummary[]
  attachments: AttachmentSummary[]
  linkedFailures: FailureSummary[]
  comments: Comment[]
  nptFailures: NptFailureLink[]
  moaDelays: MoaDelay[]
}

export interface CorrectiveAction {
  id: number
  failureId: number
  serialNumber?: string
  partNumber?: string
  vendorOEM?: string
  dateOfRepair?: string
  description?: string
  actionTaken?: string
  createdAt: string
}

export interface LessonsLearned {
  id: number
  failureId: number
  investigationResults?: string
  learningsImplemented?: string
  createdAt: string
}

// ─── Observations ─────────────────────────────────────────────────────────
export interface ObservationSummary {
  id: number
  title?: string
  description?: string
  status?: string
  severity?: string
  dateOfObservation?: string
  rigId?: number
  rigName?: string
  bopId?: number
}

// ─── Maintenance ──────────────────────────────────────────────────────────
export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed' | 'deferred' | 'overdue'

export interface DeferredMaintenanceTask {
  id: number
  rigId?: number
  rigName?: string
  title?: string
  description?: string
  componentName?: string
  equipmentType?: string
  defermentDate?: string
  plannedCompletionDate?: string
  priority?: string
  status?: MaintenanceStatus
  daysOverdue?: number
  createdAt: string
}

// ─── Certificates ─────────────────────────────────────────────────────────
export type CertStatus = 'valid' | 'expired' | 'expiring_soon' | 'pending'

export interface CertificateSummary {
  id: number
  rigId?: number
  rigName?: string
  equipment?: string
  serialNumber?: string
  tag?: string
  manufacturer?: string
  partNumber?: string
  expiryDate?: string
  issuedDate?: string
  status?: CertStatus
  typeCodeName?: string
  daysUntilExpiry?: number
}

// ─── NPT ──────────────────────────────────────────────────────────────────
export interface NonProductionTime {
  id: number
  rigId?: number
  rigName?: string
  bopType?: string
  delayCategory?: string
  operation?: string
  nptHours?: string
  nptType?: string
  startTime?: string
  endTime?: string
  comment?: string
}

export interface NptSummary {
  totalHours: number
  byCategory: Record<string, number>
  byRig: Array<{ rigId: number; rigName: string; hours: number }>
  trend: Array<{ month: string; hours: number }>
  costImpact: number
}

export interface NptFailureLink {
  id: number
  failureId?: number
  nonProdTimeCalculationId?: number
}

// ─── RCM ──────────────────────────────────────────────────────────────────
export interface RcmRecommendation {
  id: number
  rcmReportId?: number
  eventName?: string
  issueType?: string
  description?: string
  recommendation?: string
  availability?: string
  isCommunicated: boolean
  reasonOfNoCommunication?: string
  closeReason?: string
  createdAt: string
  rigName?: string
}

// ─── BOP ──────────────────────────────────────────────────────────────────
export interface BopEvent {
  id: number
  bopId?: number
  equipment?: string
  bopStatus?: string
  projectedOnDeckDate?: string
  actualOnDeckDate?: string
  projectedMaintenanceStartDate?: string
  actualMaintenanceStartDate?: string
  projectedMaintenanceCompleteDate?: string
  actualMaintenanceCompleteDate?: string
}

export interface BopChange {
  id: number
  bopId?: number
  location?: string
  state?: string
  splashDate?: string
  latchTestStartDate?: string
  latchUpCompleteDate?: string
  onDeckDate?: string
  maintenanceStartDate?: string
  plannedReadyDate?: string
}

// ─── RTM ──────────────────────────────────────────────────────────────────
export interface RtmEvent {
  id: number
  rigId?: number
  parameterName?: string
  alarmType?: string
  eventName?: string
  priority?: string
  status?: string
  isAcknowledge: boolean
  startTime?: string
  endTime?: string
}

export interface SensorDataPoint {
  timestamp: string
  value: number
  parameter: string
  unit?: string
  alarmType?: string
}

export interface AlarmConfig {
  id: number
  rigId?: number
  parameterName?: string
  alarmType?: string
  alarmName?: string
  lowerBound_W?: number
  upperBound_W?: number
  lowerBound_C?: number
  upperBound_C?: number
  enabled: boolean
}

// ─── Fleet ────────────────────────────────────────────────────────────────
export interface FleetHealthMetrics {
  totalRigs: number
  activeRigs: number
  avgHealthScore: number
  criticalRigs: number
  warningRigs: number
  healthyRigs: number
  totalNptHours30d: number
  totalOpenFailures: number
  certificatesExpiringSoon: number
  overdueMaintenanceTasks: number
  reliabilityIndex: number
  estimatedNptCost: number
}

export interface ComponentSummary {
  id: number
  component?: string
  subUnit?: string
  item?: string
  componentTag?: string
  uniqueComponentName?: string
  isBOP: boolean
  isMPD: boolean
  healthScore?: number
}

// ─── Moa ──────────────────────────────────────────────────────────────────
export interface MoaDelay {
  id: number
  moaId?: number
  category?: string
  delayHours?: string
  failureId?: number
}

// ─── AI Copilot ───────────────────────────────────────────────────────────
export interface CopilotMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sql?: string
  data?: unknown[]
  chartType?: 'bar' | 'line' | 'pie' | 'gauge' | null
  rowCount?: number
  timestamp: string
  isStreaming?: boolean
}

// ─── Auth ─────────────────────────────────────────────────────────────────
export interface UserProfile {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  roleId?: number
  roleName?: string
  canAccessAllRigs: boolean
  canAccessAdminPanel: boolean
  assignedRigs: number[]
  permissions: string[]
  features: string[]
}

// ─── Alerts ───────────────────────────────────────────────────────────────
export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'
export type AlertType = 'failure' | 'maintenance' | 'certificate' | 'npt' | 'rtm' | 'bop' | 'system'

export interface Alert {
  id: string
  type: AlertType
  severity: AlertSeverity
  title: string
  message: string
  rigId?: number
  rigName?: string
  entityId?: number
  entityType?: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

// ─── Prediction ───────────────────────────────────────────────────────────
export interface FailurePrediction {
  rigId: number
  componentId?: number
  failureProbability30d: number
  failureProbability60d: number
  failureProbability90d: number
  remainingUsefulLifeDays?: number
  riskLevel: 'critical' | 'high' | 'medium' | 'low'
  confidence: number
  topRiskFactors: string[]
  recommendedAction: string
  predictedAt: string
}

// ─── API ──────────────────────────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
}

export interface FilterParams {
  rigId?: number
  startDate?: string
  endDate?: string
  status?: string
  severity?: string
  search?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// ─── Communications ───────────────────────────────────────────────────────
export interface CommunicationSummary {
  id: number
  type?: string
  priority?: string
  description?: string
  status?: string
  communicationTime?: string
  mode?: string
  outageLevel?: string
}

// ─── Attachments ──────────────────────────────────────────────────────────
export interface AttachmentSummary {
  id: number
  name?: string
  blobName?: string
  url?: string
  createdAt: string
}

// ─── Comment ──────────────────────────────────────────────────────────────
export interface Comment {
  id: number
  text?: string
  userId?: number
  userFullName?: string
  issueType?: string
  createdAt: string
}

// ─── KPI ──────────────────────────────────────────────────────────────────
export interface RigKpi {
  id: number
  testsequenceid?: number
  rigtypeid?: number
  number_tests_CP?: number
  starttime?: string
  endtime?: string
  total_time?: string
  time_between_tests?: string
}

// ─── n8n Workflow ─────────────────────────────────────────────────────────
export interface WorkflowStatus {
  id: string
  name: string
  active: boolean
  lastExecution?: string
  executionCount: number
  successRate: number
}

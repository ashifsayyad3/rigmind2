import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import type { RigSummary, Alert, UserProfile, FleetHealthMetrics } from '@/lib/types'

interface AppState {
  // Auth
  user:    UserProfile | null
  token:   string | null
  setUser: (user: UserProfile | null) => void
  setToken:(token: string | null) => void
  logout:  () => void

  // Active rig context
  activeRigId: number | null
  setActiveRigId: (id: number | null) => void

  // Fleet data
  rigs:           RigSummary[]
  fleetMetrics:   FleetHealthMetrics | null
  setRigs:        (rigs: RigSummary[]) => void
  setFleetMetrics:(m: FleetHealthMetrics) => void

  // Real-time alerts
  alerts:        Alert[]
  unreadCount:   number
  addAlert:      (a: Alert) => void
  markAllRead:   () => void
  clearAlerts:   () => void

  // UI state
  sidebarCollapsed: boolean
  toggleSidebar:    () => void
  globalLoading:    boolean
  setGlobalLoading: (v: boolean) => void

  // WebSocket
  wsConnected: boolean
  setWsConnected: (v: boolean) => void

  // Date filter
  dateRange: { days: number }
  setDateRange: (r: { days: number }) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      subscribeWithSelector((set) => ({
        user:       null,
        token:      null,
        setUser:    (user) => set({ user }),
        setToken:   (token) => set({ token }),
        logout:     () => set({ user: null, token: null, activeRigId: null, alerts: [], unreadCount: 0 }),

        activeRigId:    null,
        setActiveRigId: (id) => set({ activeRigId: id }),

        rigs:           [],
        fleetMetrics:   null,
        setRigs:        (rigs)    => set({ rigs }),
        setFleetMetrics:(metrics) => set({ fleetMetrics: metrics }),

        alerts:        [],
        unreadCount:   0,
        addAlert:      (alert) => set((s) => ({ alerts: [alert, ...s.alerts].slice(0, 100), unreadCount: s.unreadCount + 1 })),
        markAllRead:   () => set({ unreadCount: 0 }),
        clearAlerts:   () => set({ alerts: [], unreadCount: 0 }),

        sidebarCollapsed: false,
        toggleSidebar:    () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
        globalLoading:    false,
        setGlobalLoading: (v) => set({ globalLoading: v }),

        wsConnected:    false,
        setWsConnected: (v) => set({ wsConnected: v }),

        dateRange:    { days: 30 },
        setDateRange: (r) => set({ dateRange: r }),
      })),
      {
        name: 'rigmind-v1',
        partialize: (s) => ({
          sidebarCollapsed: s.sidebarCollapsed,
          activeRigId:      s.activeRigId,
          dateRange:        s.dateRange,
          token:            s.token,
        }),
      }
    )
  )
)

'use client'

import { useQuery } from '@tanstack/react-query'
import { fleetApi } from '@/lib/api/client'
import { cn, formatCurrency, nptCostEstimate } from '@/lib/utils'
import { AlertTriangle, Award, Clock, TrendingDown, TrendingUp, Wrench, Zap, Activity } from 'lucide-react'

export function FleetMetricsGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ['fleet', 'health'],
    queryFn:  () => fleetApi.getMetrics(),
    refetchInterval: 60_000,
  })

  const metrics = [
    { label: 'Active Rigs',          value: data?.activeRigs ?? '—',                               sub: `of ${data?.totalRigs ?? 0} total`,           icon: Activity,      color: 'text-green-400',  glow: '00e676' },
    { label: 'Critical Rigs',        value: data?.criticalRigs ?? '—',                             sub: 'require immediate action',                   icon: AlertTriangle, color: 'text-red-400',    glow: 'ff1744' },
    { label: 'Open Failures',        value: data?.totalOpenFailures ?? '—',                        sub: 'fleet-wide',                                 icon: Zap,           color: 'text-orange-400', glow: 'ff6d00' },
    { label: 'NPT Hours (30d)',      value: `${(data?.totalNptHours30d ?? 0).toFixed(0)}h`,        sub: formatCurrency(nptCostEstimate(data?.totalNptHours30d ?? 0)), icon: Clock, color: 'text-amber-400', glow: 'ffab40' },
    { label: 'Certs Expiring (60d)', value: data?.certificatesExpiringSoon ?? '—',                  sub: 'need renewal soon',                          icon: Award,         color: 'text-purple-400', glow: 'd500f9' },
    { label: 'Overdue Maintenance',  value: data?.overdueMaintenanceTasks ?? '—',                  sub: 'deferred tasks',                             icon: Wrench,        color: 'text-cyan-400',   glow: '00d4ff' },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-xl h-24 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
      {metrics.map((m) => {
        const Icon = m.icon
        return (
          <div key={m.label} className="glass rounded-xl p-3.5 hover:border-surface-600/60 transition-colors"
            style={{ borderColor: `rgba(${hexToRgb(m.glow)},0.15)` }}>
            <div className="flex items-start justify-between mb-2">
              <div className="text-[9px] text-surface-500 uppercase tracking-wider leading-tight max-w-[80px]">{m.label}</div>
              <Icon className={cn('w-3.5 h-3.5 flex-shrink-0', m.color)} />
            </div>
            <div className={cn('text-2xl font-bold tabular-nums', m.color)}>{m.value}</div>
            <div className="text-[9px] text-surface-600 mt-1 truncate">{m.sub}</div>
          </div>
        )
      })}
    </div>
  )
}

function hexToRgb(hex: string): string {
  const n = parseInt(hex, 16)
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`
}

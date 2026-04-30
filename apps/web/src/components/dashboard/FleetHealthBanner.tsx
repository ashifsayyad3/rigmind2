'use client'

import { useQuery } from '@tanstack/react-query'
import { fleetApi } from '@/lib/api/client'
import { cn, formatCurrency, nptCostEstimate } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'

export function FleetHealthBanner() {
  const { data, isLoading } = useQuery({
    queryKey: ['fleet', 'health'],
    queryFn:  () => fleetApi.getMetrics(),
    refetchInterval: 60_000,
  })

  const score = data?.avgHealthScore ?? 0
  const pct   = (score / 100) * 251.2  // circumference of r=40 circle

  const ringColor  = score >= 80 ? '#00e676' : score >= 60 ? '#ffab40' : '#ff1744'
  const label      = score >= 80 ? 'Fleet Healthy' : score >= 60 ? 'Attention Required' : 'Critical State'

  if (isLoading) return <div className="glass h-[88px] rounded-xl animate-pulse" />

  return (
    <div className="glass rounded-xl px-5 py-4 flex items-center justify-between gap-6 flex-wrap"
      style={{ borderColor: `${ringColor}30`, boxShadow: `0 0 25px ${ringColor}12` }}>
      {/* Score ring */}
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle cx="50" cy="50" r="40" fill="none" stroke={ringColor} strokeWidth="8"
              strokeDasharray={`${pct} 251.2`} strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${ringColor})`, transition: 'stroke-dasharray 1s ease-out' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[15px] font-bold tabular-nums" style={{ color: ringColor }}>{Math.round(score)}</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-surface-500 uppercase tracking-widest mb-0.5">Fleet Health Score</div>
          <div className="text-lg font-bold text-white">{label}</div>
          <div className="text-[11px] text-surface-500 mt-0.5 mono">
            Reliability Index: <span className="text-brand-400">{((data?.reliabilityIndex ?? 0) * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-5 flex-wrap">
        <Stat label="Total Rigs"       value={data?.totalRigs ?? 0}                  />
        <Stat label="Active"           value={data?.activeRigs ?? 0}                 color="text-green-400"  />
        <Stat label="Critical"         value={data?.criticalRigs ?? 0}               color="text-red-400"    />
        <Stat label="Open Failures"    value={data?.totalOpenFailures ?? 0}          color="text-orange-400" />
        <Stat label="NPT (30d)"        value={`${(data?.totalNptHours30d ?? 0).toFixed(0)}h`} color="text-amber-400" />
        <Stat label="Est. NPT Cost"    value={formatCurrency(nptCostEstimate(data?.totalNptHours30d ?? 0))} color="text-red-400" />
        <Stat label="Certs Expiring"   value={data?.certificatesExpiringSoon ?? 0}   color="text-purple-400" />
        <Stat label="Overdue Maint."   value={data?.overdueMaintenanceTasks ?? 0}    color="text-cyan-400"   />
      </div>
    </div>
  )
}

function Stat({ label, value, color = 'text-white' }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="text-center min-w-[56px]">
      <div className={cn('text-xl font-bold tabular-nums', color)}>{value}</div>
      <div className="text-[9px] text-surface-500 uppercase tracking-wider mt-0.5 max-w-[64px]">{label}</div>
    </div>
  )
}

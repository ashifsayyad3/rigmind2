'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { notificationsApi } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { AlertTriangle, Bell, ArrowRight, CheckCircle, Info, XCircle } from 'lucide-react'
import type { Alert } from '@/lib/types'

const SEVERITY_CFG: Record<string, { icon: React.ElementType; color: string; dot: string }> = {
  critical: { icon: XCircle,       color: 'text-red-400',    dot: 'bg-red-400'    },
  high:     { icon: AlertTriangle, color: 'text-orange-400', dot: 'bg-orange-400' },
  medium:   { icon: AlertTriangle, color: 'text-amber-400',  dot: 'bg-amber-400'  },
  low:      { icon: Info,          color: 'text-blue-400',   dot: 'bg-blue-400'   },
  info:     { icon: Info,          color: 'text-surface-400',dot: 'bg-surface-400'},
}

export function ActiveAlertsPanel() {
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn:  () => notificationsApi.list(),
    refetchInterval: 30_000,
  })

  const unread = alerts.filter((a: Alert) => !a.read)

  return (
    <div className="glass rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-orange-400" />
          <span className="section-label mb-0">Active Alerts</span>
          {unread.length > 0 && (
            <span className="text-[10px] font-bold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
              {unread.length}
            </span>
          )}
        </div>
        <Link href="/dashboard/notifications" className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 transition-colors">
          All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-2 flex-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-surface-800/40 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : unread.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-surface-500">
          <CheckCircle className="w-8 h-8 text-green-500/40" />
          <span className="text-[12px]">No active alerts</span>
        </div>
      ) : (
        <div className="space-y-1.5 flex-1 overflow-y-auto">
          {unread.slice(0, 8).map((alert: Alert) => {
            const cfg = SEVERITY_CFG[alert.severity ?? 'info'] ?? SEVERITY_CFG.info
            const Icon = cfg.icon
            return (
              <div key={alert.id} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-900/50 hover:bg-surface-800/50 transition-colors">
                <Icon className={cn('w-3.5 h-3.5 mt-0.5 flex-shrink-0', cfg.color)} />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-surface-200 leading-snug truncate">{alert.message ?? alert.title}</div>
                  <div className="text-[9px] text-surface-500 mt-0.5">{alert.rigName ?? ''}</div>
                </div>
                <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5', cfg.dot)} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

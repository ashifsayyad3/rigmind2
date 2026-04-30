'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { failuresApi } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { Zap, ArrowRight, AlertTriangle } from 'lucide-react'
import type { FailureSummary } from '@/lib/types'

const SEVERITY_COLOR: Record<string, string> = {
  critical: 'text-red-400 bg-red-400/10',
  high:     'text-orange-400 bg-orange-400/10',
  medium:   'text-amber-400 bg-amber-400/10',
  low:      'text-green-400 bg-green-400/10',
}

export function RecentFailuresPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ['failures', 'recent'],
    queryFn:  () => failuresApi.list({ pageSize: 8, sort: 'createdAt', order: 'desc' }),
    refetchInterval: 60_000,
  })

  const failures = data?.data ?? []

  return (
    <div className="glass rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-orange-400" />
          <span className="section-label mb-0">Recent Failures</span>
        </div>
        <Link href="/dashboard/failures" className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 transition-colors">
          All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-2 flex-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-surface-800/40 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : failures.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-surface-500">
          <AlertTriangle className="w-8 h-8 text-surface-700" />
          <span className="text-[12px]">No recent failures</span>
        </div>
      ) : (
        <div className="space-y-1.5 flex-1 overflow-y-auto">
          {failures.map((f: FailureSummary) => {
            const severityClass = SEVERITY_COLOR[f.severity] ?? SEVERITY_COLOR.low
            return (
              <Link key={f.id} href={`/dashboard/failures/${f.id}`}>
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-900/50 hover:bg-surface-800/50 transition-colors group">
                  <span className={cn('text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5', severityClass)}>
                    {f.severity}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-surface-200 leading-snug truncate group-hover:text-white transition-colors">
                      {f.description ?? f.failureType}
                    </div>
                    <div className="text-[9px] text-surface-500 mt-0.5 truncate">
                      {f.rigName} {f.componentName ? `· ${f.componentName}` : ''}
                    </div>
                  </div>
                  <div className="text-[9px] text-surface-600 flex-shrink-0">
                    {f.nptHours ? `${f.nptHours}h` : ''}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { recommendationsApi } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { Brain, ArrowRight, Lightbulb } from 'lucide-react'
import type { RcmRecommendation } from '@/lib/types'

const PRIORITY_COLOR: Record<string, string> = {
  critical: 'text-red-400',
  high:     'text-orange-400',
  medium:   'text-amber-400',
  low:      'text-blue-400',
}

export function AiInsightsPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ['recommendations', 'dashboard'],
    queryFn:  () => recommendationsApi.list({ pageSize: 6, sort: 'priority' }),
    refetchInterval: 120_000,
  })

  const items = data?.data ?? []

  return (
    <div className="glass rounded-xl p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-3.5 h-3.5 text-brand-400" />
          <span className="section-label mb-0">AI Insights</span>
        </div>
        <Link href="/dashboard/recommendations" className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 transition-colors">
          All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 bg-surface-800/40 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-6 text-surface-500">
          <Lightbulb className="w-8 h-8 text-surface-700" />
          <span className="text-[12px]">No recommendations yet</span>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((rec: RcmRecommendation) => (
            <div key={rec.id} className="p-2.5 rounded-lg bg-surface-900/50 border border-surface-800/50 hover:border-brand-500/20 transition-colors">
              <div className="flex items-start gap-2">
                <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5', {
                  'bg-red-400':    rec.priority === 'critical',
                  'bg-orange-400': rec.priority === 'high',
                  'bg-amber-400':  rec.priority === 'medium',
                  'bg-blue-400':   rec.priority === 'low',
                })} />
                <div className="min-w-0">
                  <div className="text-[11px] text-surface-200 leading-snug line-clamp-2">{rec.recommendation}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn('text-[9px] font-bold uppercase', PRIORITY_COLOR[rec.priority] ?? 'text-surface-400')}>
                      {rec.priority}
                    </span>
                    {rec.rigName && <span className="text-[9px] text-surface-600">· {rec.rigName}</span>}
                    {rec.estimatedSavings && (
                      <span className="text-[9px] text-green-500/70 ml-auto">${(rec.estimatedSavings / 1000).toFixed(0)}k saved</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

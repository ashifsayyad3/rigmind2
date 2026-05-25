'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { recommendationsApi } from '@/lib/api/client'
import { cn, formatDate } from '@/lib/utils'
import { Lightbulb, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

function PriorityBadge({ priority }: { priority?: string }) {
  return (
    <span className={cn('px-2 py-0.5 rounded text-xs uppercase font-semibold',
      priority === 'critical' ? 'bg-red-500/15 text-red-400' :
      priority === 'high' ? 'bg-orange-500/15 text-orange-400' :
      priority === 'medium' ? 'bg-amber-500/15 text-amber-400' :
      'bg-green-500/15 text-green-400',
    )}>{priority ?? '—'}</span>
  )
}

export default function RecommendationsPage() {
  const [page, setPage] = useState(1)
  const [priority, setPriority] = useState('')
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['recommendations', { page }],
    queryFn: () => recommendationsApi.list({ page, limit: 25 } as any),
  })

  const { data: statsData } = useQuery({ queryKey: ['rec-stats'], queryFn: recommendationsApi.getStats })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      recommendationsApi.updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recommendations'] }),
  })

  const items: any[] = (data as any)?.items ?? []
  const total: number = (data as any)?.total ?? 0
  const pages: number = (data as any)?.pages ?? 1
  const stats = statsData as any

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">RCM Recommendations</h1>
        <p className="text-surface-400 text-sm mt-1">{total} recommendations tracked</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total', value: stats.total, color: 'text-white' },
            { label: 'Overdue', value: stats.overdue, color: 'text-red-400', icon: AlertTriangle },
            { label: 'Open', value: stats.byStatus?.find((s: any) => s.status === 'open')?._count?.id ?? 0, color: 'text-blue-400' },
            { label: 'Closed', value: stats.byStatus?.find((s: any) => s.status === 'closed')?._count?.id ?? 0, color: 'text-green-400' },
          ].map((s) => (
            <div key={s.label} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-3">
              <div className="text-xs text-surface-400 mb-1">{s.label}</div>
              <div className={cn('text-xl font-bold', s.color)}>{s.value ?? '—'}</div>
            </div>
          ))}
        </div>
      )}

      {/* Priority filter */}
      <div className="flex gap-2">
        {['', 'critical', 'high', 'medium', 'low'].map((p) => (
          <button key={p} onClick={() => { setPriority(p); setPage(1) }}
            className={cn('px-3 py-1.5 text-xs rounded-lg border transition-all capitalize',
              priority === p ? 'bg-brand-500/20 border-brand-500/40 text-brand-300' : 'border-surface-700 text-surface-400',
            )}>{p || 'All'}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-surface-400 uppercase tracking-wide border-b border-surface-700/60">
              <th className="text-left px-4 py-3">Priority</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Rig</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Due</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/40">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <tr key={i}>{Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700/50 rounded animate-pulse" /></td>)}</tr>)
              : items.map((rec) => (
                  <tr key={rec.id} className="hover:bg-surface-700/20 transition-colors">
                    <td className="px-4 py-3"><PriorityBadge priority={rec.priority} /></td>
                    <td className="px-4 py-3 max-w-xs"><p className="text-sm text-surface-200 truncate">{rec.description}</p></td>
                    <td className="px-4 py-3 text-sm text-surface-300">{rec.rcmReports?.rigs?.name ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={cn('text-xs capitalize', rec.status === 'closed' ? 'text-green-400' : rec.status === 'open' ? 'text-blue-400' : 'text-amber-400')}>{rec.status}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-surface-400">{formatDate(rec.dueDate)}</td>
                    <td className="px-4 py-3">
                      {rec.status !== 'closed' && (
                        <button
                          onClick={() => statusMutation.mutate({ id: rec.id, status: 'closed' })}
                          className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Close
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-700/40">
          <span className="text-xs text-surface-400">Page {page}/{pages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white">Prev</button>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages} className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

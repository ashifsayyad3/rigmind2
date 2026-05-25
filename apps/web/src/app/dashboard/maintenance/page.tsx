'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { maintenanceApi } from '@/lib/api/client'
import { cn, formatDate, timeAgo } from '@/lib/utils'
import { Wrench, CheckCircle, Clock, BarChart3, AlertTriangle } from 'lucide-react'

export default function MaintenancePage() {
  const [page, setPage] = useState(1)
  const qc = useQueryClient()

  const { data: statsData } = useQuery({ queryKey: ['maintenance-stats'], queryFn: () => maintenanceApi.listDeferred({ page: 1, limit: 1 } as any) })
  const { data: listData, isLoading } = useQuery({
    queryKey: ['maintenance-deferred', page],
    queryFn: () => maintenanceApi.listDeferred({ page, limit: 25 } as any),
  })

  const closeMutation = useMutation({
    mutationFn: (id: number) => maintenanceApi.deleteDeferred(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['maintenance-deferred'] }),
  })

  const tasks: any[] = (listData as any)?.items ?? []
  const total: number = (listData as any)?.total ?? 0
  const pages: number = (listData as any)?.pages ?? 1
  const stats = { totalDeferred: total, byRig: [] }

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Maintenance</h1>
        <p className="text-surface-400 text-sm mt-1">Deferred tasks & component maintenance history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4 text-amber-400" /><span className="text-xs text-surface-400">Total Deferred</span></div>
          <div className="text-2xl font-bold text-amber-400">{stats?.totalDeferred ?? '—'}</div>
        </div>
        {(stats?.byRig ?? []).slice(0, 2).map((r: any) => (
          <div key={r.rigId} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4">
            <div className="text-xs text-surface-400 mb-1 truncate">Rig #{r.rigId}</div>
            <div className="text-2xl font-bold text-white">{r._count?.id}</div>
            <div className="text-xs text-surface-500">deferred tasks</div>
          </div>
        ))}
      </div>

      {/* Tasks table */}
      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-surface-700/60">
          <h3 className="text-sm font-semibold text-white">Deferred Maintenance Tasks ({total})</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-surface-400 uppercase tracking-wide">
              <th className="text-left px-4 py-3">ID</th>
              <th className="text-left px-4 py-3">Rig</th>
              <th className="text-left px-4 py-3">Issue Type</th>
              <th className="text-left px-4 py-3">Issue ID</th>
              <th className="text-left px-4 py-3">Deferred</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/40">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <tr key={i}>{Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700/50 rounded animate-pulse" /></td>)}</tr>)
              : tasks.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-700/20 transition-colors">
                    <td className="px-4 py-3 text-xs text-surface-500 font-mono">#{t.id}</td>
                    <td className="px-4 py-3 text-sm text-surface-200">{t.rigs?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-surface-400">{t.issueType}</td>
                    <td className="px-4 py-3 text-xs text-surface-400 font-mono">#{t.issueId}</td>
                    <td className="px-4 py-3 text-xs text-surface-400">{timeAgo(t.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => closeMutation.mutate(t.id)}
                        disabled={closeMutation.isPending}
                        className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors disabled:opacity-40"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Close
                      </button>
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

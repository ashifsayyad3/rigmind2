'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { observationsApi } from '@/lib/api/client'
import { cn, formatDate, timeAgo } from '@/lib/utils'
import { Eye, Search } from 'lucide-react'

function StatusBadge({ status }: { status?: string }) {
  return (
    <span className={cn('px-2 py-0.5 rounded text-xs capitalize',
      status === 'open' ? 'bg-blue-500/15 text-blue-300' :
      status === 'closed' ? 'bg-surface-700 text-surface-400' :
      'bg-amber-500/15 text-amber-300',
    )}>{status ?? '—'}</span>
  )
}

export default function ObservationsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['observations', { search, status, page }],
    queryFn: () => observationsApi.list({ search, status, page, limit: 25 } as any),
  })

  const items: any[] = (data as any)?.items ?? []
  const total: number = (data as any)?.total ?? 0
  const pages: number = (data as any)?.pages ?? 1
  const stats: any = null

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Observations</h1>
        <p className="text-surface-400 text-sm mt-1">{total.toLocaleString()} total observations</p>
      </div>

      {/* Status filters */}
      {stats && (
        <div className="flex gap-2 flex-wrap">
          {(stats.byStatus ?? []).map((s: any) => (
            <button key={s.status} onClick={() => setStatus(status === s.status ? '' : s.status)}
              className={cn('px-3 py-1.5 rounded-lg text-xs border transition-all',
                status === s.status ? 'bg-brand-500/20 border-brand-500/40 text-brand-300' : 'border-surface-700 text-surface-400 hover:border-surface-500',
              )}
            >
              {s.status} <span className="ml-1 text-surface-500">{s._count?.id}</span>
            </button>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
        <input className="w-full bg-surface-800 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500"
          placeholder="Search observations..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} />
      </div>

      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-surface-400 uppercase tracking-wide border-b border-surface-700/60">
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Component</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/40">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <tr key={i}>{Array.from({ length: 5 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700/50 rounded animate-pulse" /></td>)}</tr>)
              : items.map((obs) => (
                  <tr key={obs.id} className="hover:bg-surface-700/20 transition-colors">
                    <td className="px-4 py-3 max-w-xs"><p className="text-sm text-surface-200 truncate">{obs.title ?? obs.description?.slice(0, 60) ?? '—'}</p></td>
                    <td className="px-4 py-3 text-xs text-surface-400">{obs.type ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-surface-300">{obs.components?.name ?? '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={obs.status} /></td>
                    <td className="px-4 py-3 text-xs text-surface-400">{formatDate(obs.dateOfObservation)}</td>
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

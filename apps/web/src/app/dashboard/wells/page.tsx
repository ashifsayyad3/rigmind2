'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { wellsApi } from '@/lib/api/client'
import { cn, formatDate } from '@/lib/utils'
import { Layers, Search } from 'lucide-react'

export default function WellsPage() {
  const [search, setSearch] = useState('')
  const [availability, setAvailability] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['wells', { availability, page }],
    queryFn: () => wellsApi.list({ availability, page, limit: 30 } as any),
  })

  const wells: any[] = (data as any)?.items ?? []
  const total: number = (data as any)?.total ?? 0
  const pages: number = (data as any)?.pages ?? 1

  const filtered = search
    ? wells.filter((w) =>
        w.name?.toLowerCase().includes(search.toLowerCase()) ||
        w.field?.toLowerCase().includes(search.toLowerCase())
      )
    : wells

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Wells</h1>
        <p className="text-surface-400 text-sm mt-1">{total} wells in database</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input
            className="w-full bg-surface-800 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500"
            placeholder="Search well name or field..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['', 'Available', 'Unavailable'].map((a) => (
            <button key={a} onClick={() => { setAvailability(a); setPage(1) }}
              className={cn('px-3 py-1.5 rounded-lg text-xs border transition-all',
                availability === a ? 'bg-brand-500/20 border-brand-500/40 text-brand-300' : 'border-surface-700 text-surface-400 hover:border-surface-500',
              )}>{a || 'All'}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-surface-400 uppercase tracking-wide border-b border-surface-700/60">
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Field</th>
              <th className="text-left px-4 py-3">Region</th>
              <th className="text-right px-4 py-3">Depth (m)</th>
              <th className="text-left px-4 py-3">Current Rig</th>
              <th className="text-left px-4 py-3">Availability</th>
              <th className="text-right px-4 py-3">Failures</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/40">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>{Array.from({ length: 7 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700/50 rounded animate-pulse" /></td>)}</tr>
                ))
              : filtered.map((well) => {
                  const currentRig = well.rigWellChanges?.[0]?.rigs
                  return (
                    <tr key={well.id} className="hover:bg-surface-700/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                          <span className="text-sm font-medium text-white">{well.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-surface-300">{well.field ?? '—'}</td>
                      <td className="px-4 py-3 text-sm text-surface-400">{well.region ?? '—'}</td>
                      <td className="px-4 py-3 text-sm text-surface-300 text-right">
                        {well.depth ? well.depth.toLocaleString() : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-surface-300">{currentRig?.name ?? '—'}</td>
                      <td className="px-4 py-3">
                        <span className={cn('text-xs font-medium',
                          well.availability === 'Available' ? 'text-green-400' : 'text-red-400',
                        )}>{well.availability}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-red-400 text-right font-semibold">
                        {well._count?.failures ?? 0}
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-700/40">
          <span className="text-xs text-surface-400">{total.toLocaleString()} wells · Page {page}/{pages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white">Prev</button>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages} className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

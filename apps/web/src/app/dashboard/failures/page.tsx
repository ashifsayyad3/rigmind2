'use client'

import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { failuresApi } from '@/lib/api/client'
import { cn, formatDate, timeAgo, severityColor } from '@/lib/utils'
import { AlertTriangle, Search, Filter, ChevronRight, X, Clock, Wrench, Link2, BarChart3 } from 'lucide-react'

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low']

function SeverityBadge({ severity }: { severity?: string }) {
  const s = severity?.toLowerCase() ?? ''
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide',
      s === 'critical' && 'bg-red-500/20 text-red-400 border border-red-500/30',
      s === 'high' && 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
      s === 'medium' && 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      s === 'low' && 'bg-green-500/20 text-green-400 border border-green-500/30',
      !s && 'bg-surface-700 text-surface-400',
    )}>{severity ?? 'Unknown'}</span>
  )
}

function StatusBadge({ status }: { status?: string }) {
  return (
    <span className={cn(
      'inline-flex px-2 py-0.5 rounded text-xs capitalize',
      status === 'open' && 'bg-blue-500/15 text-blue-300',
      status === 'in_progress' && 'bg-amber-500/15 text-amber-300',
      status === 'closed' && 'bg-surface-700 text-surface-400',
      status === 'deferred' && 'bg-purple-500/15 text-purple-300',
    )}>{status ?? '—'}</span>
  )
}

function FailureDrawer({ failure, onClose }: { failure: any; onClose: () => void }) {
  const { data } = useQuery({
    queryKey: ['failure-timeline', failure.id],
    queryFn: () => failuresApi.getTimeline(failure.id),
    enabled: !!failure.id,
  })
  const timeline: any[] = (data as any) ?? []

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
      className="fixed inset-y-0 right-0 w-full max-w-lg bg-surface-900 border-l border-surface-700 z-50 overflow-y-auto shadow-2xl"
    >
      <div className="sticky top-0 bg-surface-900/95 backdrop-blur border-b border-surface-700 px-6 py-4 flex items-start justify-between">
        <div>
          <SeverityBadge severity={failure.severity} />
          <h2 className="text-white font-semibold mt-2 pr-8">{failure.title ?? failure.description?.slice(0, 80)}</h2>
          <p className="text-surface-400 text-xs mt-1">{failure.rigs?.name} · {formatDate(failure.dateOfFailure)}</p>
        </div>
        <button onClick={onClose} className="text-surface-400 hover:text-white mt-1"><X className="w-5 h-5" /></button>
      </div>

      <div className="p-6 space-y-5">
        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Status', value: <StatusBadge status={failure.status} /> },
            { label: 'BOP', value: failure.bops?.name ?? '—' },
            { label: 'Component', value: failure.components?.name ?? '—' },
            { label: 'Failure Mode', value: failure.failureModes?.name ?? '—' },
            { label: 'Equipment Type', value: failure.equipmentType ?? '—' },
            { label: 'Is NPT', value: failure.isNPT ? 'Yes' : 'No' },
            { label: 'Vendor/OEM', value: failure.vendorOEM ?? '—' },
            { label: 'Resolved', value: formatDate(failure.resolvedDate) },
          ].map((f) => (
            <div key={f.label} className="bg-surface-800/50 rounded-lg p-3">
              <div className="text-xs text-surface-500 mb-1">{f.label}</div>
              <div className="text-sm text-surface-200">{f.value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        {failure.description && (
          <div>
            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wide mb-2">Description</h3>
            <p className="text-sm text-surface-300 leading-relaxed">{failure.description}</p>
          </div>
        )}

        {/* Cause */}
        {failure.cause && (
          <div>
            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wide mb-2">Cause</h3>
            <p className="text-sm text-surface-300">{failure.cause}</p>
          </div>
        )}

        {/* Timeline */}
        {timeline.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wide mb-3">Event Timeline</h3>
            <div className="space-y-2">
              {timeline.map((event: any, i: number) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="text-surface-400 text-xs">{timeAgo(event.date)}</span>
                    <p className="text-surface-300 capitalize">{event.type.replace('_', ' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function FailuresPage() {
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<any>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['failures', { search, severity, status, page }],
    queryFn: () => failuresApi.list({ search, severity, status, page, limit: 25 } as any),
  })

  const { data: statsData } = useQuery({
    queryKey: ['failures-stats'],
    queryFn: () => failuresApi.getStats(),
  })

  const failures: any[] = (data as any)?.items ?? []
  const total: number = (data as any)?.total ?? 0
  const pages: number = (data as any)?.pages ?? 1
  const stats = statsData as any

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Failure Intelligence</h1>
          <p className="text-surface-400 text-sm mt-1">{total.toLocaleString()} total records</p>
        </div>
      </div>

      {/* Stats strip */}
      {stats && (
        <div className="flex gap-3 flex-wrap">
          {SEVERITY_ORDER.map((s) => {
            const count = stats.bySeverity?.find((b: any) => b.severity === s)?._count?.id ?? 0
            return (
              <button
                key={s}
                onClick={() => setSeverity(severity === s ? '' : s)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all border',
                  s === 'critical' && 'border-red-500/40 text-red-400 hover:bg-red-500/10',
                  s === 'high' && 'border-orange-500/40 text-orange-400 hover:bg-orange-500/10',
                  s === 'medium' && 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10',
                  s === 'low' && 'border-green-500/40 text-green-400 hover:bg-green-500/10',
                  severity === s && 'bg-surface-700',
                )}
              >
                {count} {s}
              </button>
            )
          })}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
          <input
            className="w-full bg-surface-800 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500"
            placeholder="Search failures, components, cause..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <select
          className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1) }}
        >
          <option value="">All Statuses</option>
          {['open', 'in_progress', 'deferred', 'closed'].map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-700/60 text-xs text-surface-400 uppercase tracking-wide">
                <th className="text-left px-4 py-3 font-medium">Severity</th>
                <th className="text-left px-4 py-3 font-medium">Title / Description</th>
                <th className="text-left px-4 py-3 font-medium">Rig</th>
                <th className="text-left px-4 py-3 font-medium">Component</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700/40">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-surface-700/50 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                : failures.map((f) => (
                    <tr
                      key={f.id}
                      onClick={() => setSelected(f)}
                      className="hover:bg-surface-700/30 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3"><SeverityBadge severity={f.severity} /></td>
                      <td className="px-4 py-3 max-w-[280px]">
                        <p className="text-sm text-surface-200 truncate">{f.title ?? f.description?.slice(0, 60) ?? '—'}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-surface-300">{f.rigs?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-sm text-surface-300">{f.components?.name ?? '—'}</td>
                      <td className="px-4 py-3"><StatusBadge status={f.status} /></td>
                      <td className="px-4 py-3 text-xs text-surface-400">{formatDate(f.dateOfFailure)}</td>
                      <td className="px-4 py-3"><ChevronRight className="w-4 h-4 text-surface-600" /></td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-700/40">
          <span className="text-xs text-surface-400">Page {page} of {pages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 hover:bg-surface-600 transition-colors text-white">Prev</button>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}
              className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 hover:bg-surface-600 transition-colors text-white">Next</button>
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelected(null)}
            />
            <FailureDrawer failure={selected} onClose={() => setSelected(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

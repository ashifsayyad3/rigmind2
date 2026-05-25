'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { nptApi } from '@/lib/api/client'
import { cn, formatDate, formatNptHours, nptCostEstimate, formatCurrency } from '@/lib/utils'
import { Clock, DollarSign, AlertTriangle, BarChart3 } from 'lucide-react'

function MiniBarChart({ data }: { data: Array<{ label: string; hours: number }> }) {
  if (!data.length) return null
  const max = Math.max(...data.map((d) => d.hours))
  return (
    <div className="space-y-1.5">
      {data.slice(0, 8).map((d) => (
        <div key={d.label} className="flex items-center gap-2 text-xs">
          <span className="text-surface-400 w-32 truncate shrink-0">{d.label}</span>
          <div className="flex-1 bg-surface-700 rounded-full h-1.5">
            <div
              className="bg-brand-500 h-1.5 rounded-full transition-all duration-700"
              style={{ width: `${max > 0 ? (d.hours / max) * 100 : 0}%` }}
            />
          </div>
          <span className="text-surface-300 w-14 text-right shrink-0">{d.hours.toFixed(1)}h</span>
        </div>
      ))}
    </div>
  )
}

export default function NptPage() {
  const [page, setPage] = useState(1)

  const { data: summaryData } = useQuery({ queryKey: ['npt-summary'], queryFn: () => nptApi.getSummary() })
  const { data: categoryRaw } = useQuery({ queryKey: ['npt-by-category'], queryFn: nptApi.getByCategory })

  const { data: listData, isLoading } = useQuery({
    queryKey: ['npt-list', page],
    queryFn: () => nptApi.list({ page, limit: 25 } as any),
  })

  const nptList: any[] = (listData as any)?.items ?? []
  const total: number = (listData as any)?.total ?? 0
  const pages: number = (listData as any)?.pages ?? 1

  const totalHours = (summaryData as any)?.totalHours ?? 0
  const totalCost = nptCostEstimate(totalHours)

  const categoryData = ((categoryRaw as any[]) ?? []).map((c: any) => ({
    label: c.category,
    hours: parseFloat(c.hours ?? 0),
  }))

  const rigData: Array<{ label: string; hours: number }> = []

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">NPT Intelligence</h1>
        <p className="text-surface-400 text-sm mt-1">Non-Productive Time analysis & root cause</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total NPT Hours', value: formatNptHours(totalHours), icon: Clock, color: 'text-red-400' },
          { label: 'Estimated Cost', value: formatCurrency(totalCost), icon: DollarSign, color: 'text-orange-400' },
          { label: 'Total Events', value: total, icon: AlertTriangle, color: 'text-amber-400' },
          { label: 'Avg per Event', value: total > 0 ? formatNptHours(totalHours / total) : '—', icon: BarChart3, color: 'text-brand-400' },
        ].map((c) => (
          <div key={c.label} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <c.icon className={cn('w-4 h-4', c.color)} />
              <span className="text-xs text-surface-400">{c.label}</span>
            </div>
            <div className="text-xl font-bold text-white">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Analytics charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">NPT Hours by Delay Category</h3>
          <MiniBarChart data={categoryData} />
        </div>
        <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">NPT Hours by Rig</h3>
          <MiniBarChart data={rigData} />
        </div>
      </div>

      {/* Monthly trend — hidden until data available */}
      {false && (
        <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Monthly NPT Trend (12 months)</h3>
          <div className="flex items-end gap-1 h-20">
            {[].map((m: any) => {
              const pct = 0
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-brand-500/70 rounded-sm transition-all" style={{ height: `${pct}%` }} />
                  <span className="text-xs text-surface-500 rotate-45 origin-left" style={{ fontSize: 9 }}>{m.month?.slice(5)}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Events table */}
      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-surface-700/60">
          <h3 className="text-sm font-semibold text-white">Recent NPT Events</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-xs text-surface-400 uppercase tracking-wide">
              <th className="text-left px-4 py-3">Rig</th>
              <th className="text-left px-4 py-3">BOP Type</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">NPT Type</th>
              <th className="text-right px-4 py-3">Hours</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/40">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>{Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700/50 rounded animate-pulse" /></td>)}</tr>
                ))
              : nptList.map((n) => (
                  <tr key={n.id} className="hover:bg-surface-700/20 transition-colors">
                    <td className="px-4 py-3 text-sm text-surface-200">{n.rigs?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-surface-400">{n.bopType}</td>
                    <td className="px-4 py-3 text-xs text-surface-300">{n.delayCategory ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-surface-400">{n.nptType ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-red-400 font-semibold text-right">{formatNptHours(n.nptHours)}</td>
                    <td className="px-4 py-3 text-xs text-surface-400">{formatDate(n.dateOfNPT)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-700/40">
          <span className="text-xs text-surface-400">{total.toLocaleString()} events · Page {page}/{pages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white">Prev</button>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages} className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

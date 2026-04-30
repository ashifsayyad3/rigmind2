'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { certificatesApi } from '@/lib/api/client'
import { cn, formatDate, daysUntil } from '@/lib/utils'
import { Award, AlertTriangle, Clock, CheckCircle, Search } from 'lucide-react'

function ExpiryBadge({ expiryDate }: { expiryDate?: string }) {
  const days = daysUntil(expiryDate)
  if (days === null) return <span className="text-xs text-surface-500">—</span>
  if (days < 0) return <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">EXPIRED {Math.abs(days)}d ago</span>
  if (days <= 30) return <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">{days}d left</span>
  if (days <= 60) return <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">{days}d left</span>
  if (days <= 90) return <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{days}d left</span>
  return <span className="text-xs text-green-400">{formatDate(expiryDate)}</span>
}

export default function CertificatesPage() {
  const [search, setSearch] = useState('')
  const [expiringFilter, setExpiringFilter] = useState<number | undefined>()
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['certificates', { search, expiringInDays: expiringFilter, page }],
    queryFn: () => certificatesApi.getAll({ expiringInDays: expiringFilter, page, limit: 30 }),
    keepPreviousData: true,
  })

  const { data: expiryData } = useQuery({
    queryKey: ['cert-expiry-dashboard'],
    queryFn: certificatesApi.getExpiryDashboard,
  })

  const certs: any[] = data?.data?.items ?? []
  const total: number = data?.data?.total ?? 0
  const pages: number = data?.data?.pages ?? 1
  const expiry = expiryData?.data

  const expiryCards = [
    { label: 'Expired', value: expiry?.expired ?? 0, color: 'text-red-400', bg: 'bg-red-500/10', filter: undefined, icon: AlertTriangle },
    { label: 'Expiring 30d', value: expiry?.expiring30 ?? 0, color: 'text-orange-400', bg: 'bg-orange-500/10', filter: 30, icon: Clock },
    { label: 'Expiring 60d', value: expiry?.expiring60 ?? 0, color: 'text-amber-400', bg: 'bg-amber-500/10', filter: 60, icon: Clock },
    { label: 'Expiring 90d', value: expiry?.expiring90 ?? 0, color: 'text-yellow-400', bg: 'bg-yellow-500/10', filter: 90, icon: Clock },
  ]

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Certificate & Compliance</h1>
        <p className="text-surface-400 text-sm mt-1">{total.toLocaleString()} certificates tracked</p>
      </div>

      {/* Expiry heatmap cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {expiryCards.map((c) => (
          <button
            key={c.label}
            onClick={() => setExpiringFilter(expiringFilter === c.filter ? undefined : c.filter)}
            className={cn(
              'text-left rounded-xl p-4 border transition-all',
              c.bg, 'border-surface-700/60',
              expiringFilter === c.filter && 'ring-1 ring-brand-500',
              'hover:border-surface-500',
            )}
          >
            <c.icon className={cn('w-5 h-5 mb-2', c.color)} />
            <div className={cn('text-2xl font-bold', c.color)}>{c.value}</div>
            <div className="text-xs text-surface-400 mt-0.5">{c.label}</div>
          </button>
        ))}
      </div>

      {/* By rig breakdown */}
      {expiry?.byRig?.length > 0 && (
        <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wide mb-3">Expiring Certs by Rig (90d)</h3>
          <div className="flex flex-wrap gap-2">
            {expiry.byRig.map((r: any) => (
              <div key={r.rigName} className="bg-surface-700/50 rounded-lg px-3 py-1.5 text-xs">
                <span className="text-white font-medium">{r.rigName}</span>
                <span className="text-amber-400 ml-2">{r.expiringCount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
        <input
          className="w-full bg-surface-800 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500"
          placeholder="Search equipment, tag, serial..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        />
      </div>

      {/* Table */}
      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-700/60 text-xs text-surface-400 uppercase tracking-wide">
              <th className="text-left px-4 py-3">Equipment</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Rig</th>
              <th className="text-left px-4 py-3">Tag</th>
              <th className="text-left px-4 py-3">Serial</th>
              <th className="text-left px-4 py-3">Latest Expiry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/40">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700/50 rounded animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              : certs.map((cert) => {
                  const latestAttachment = cert.certificateAttachments?.[0]
                  return (
                    <tr key={cert.id} className="hover:bg-surface-700/20 transition-colors">
                      <td className="px-4 py-3 text-sm text-surface-200">{cert.equipment ?? '—'}</td>
                      <td className="px-4 py-3 text-xs text-surface-400">{cert.typeCodes?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-sm text-surface-300">{cert.rigs?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-xs text-surface-400 font-mono">{cert.tag ?? '—'}</td>
                      <td className="px-4 py-3 text-xs text-surface-400 font-mono">{cert.serialNumber ?? '—'}</td>
                      <td className="px-4 py-3">
                        <ExpiryBadge expiryDate={latestAttachment?.expiryDate} />
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-surface-700/40">
          <span className="text-xs text-surface-400">Page {page} of {pages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 hover:bg-surface-600 text-white">Prev</button>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}
              className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 hover:bg-surface-600 text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

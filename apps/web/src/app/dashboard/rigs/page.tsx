'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { rigsApi } from '@/lib/api/client'
import { cn, formatDate } from '@/lib/utils'
import { Anchor, Search, Radio, CheckCircle, XCircle, ChevronRight, Activity } from 'lucide-react'

function StatusDot({ status }: { status?: string }) {
  const s = (status ?? '').toLowerCase()
  const isActive = s.includes('active') || s.includes('drill') || s.includes('operational')
  const isOffline = s.includes('stacked') || s.includes('shipyard') || s.includes('off')
  return (
    <div className={cn('flex items-center gap-1.5',
      isActive ? 'text-green-400' : isOffline ? 'text-surface-500' : 'text-amber-400',
    )}>
      <div className={cn('w-2 h-2 rounded-full',
        isActive ? 'bg-green-400 animate-pulse' : isOffline ? 'bg-surface-500' : 'bg-amber-400',
      )} />
      <span className="text-xs capitalize">{status ?? 'Unknown'}</span>
    </div>
  )
}

export default function RigsPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['rigs', { search, page }],
    queryFn: () => rigsApi.getAll({ page, limit: 30 }),
    keepPreviousData: true,
  })

  const rigs: any[] = data?.data?.items ?? []
  const total: number = data?.data?.total ?? 0
  const pages: number = data?.data?.pages ?? 1

  const filtered = search
    ? rigs.filter((r) => r.name?.toLowerCase().includes(search.toLowerCase()))
    : rigs

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Rigs</h1>
          <p className="text-surface-400 text-sm mt-1">{total} rigs in fleet</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
        <input
          className="w-full bg-surface-800 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500"
          placeholder="Search rigs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-5 animate-pulse h-40" />
            ))
          : filtered.map((rig, i) => (
              <motion.div
                key={rig.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link href={`/dashboard/rigs/${rig.id}`}>
                  <div className="bg-surface-800/70 border border-surface-700/60 rounded-xl p-5 hover:border-brand-500/40 transition-all group cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Anchor className="w-4 h-4 text-brand-400 shrink-0" />
                        <span className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">
                          {rig.name}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-surface-600 group-hover:text-surface-400 transition-colors" />
                    </div>

                    <StatusDot status={rig.status} />

                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                      <div>
                        <span className="text-surface-500">Category</span>
                        <p className="text-surface-300 mt-0.5">{rig.category ?? '—'}</p>
                      </div>
                      <div>
                        <span className="text-surface-500">BOP Type</span>
                        <p className="text-surface-300 mt-0.5">{rig.bopType ?? '—'}</p>
                      </div>
                      <div>
                        <span className="text-surface-500">Operator</span>
                        <p className="text-surface-300 mt-0.5">{rig.operators?.name ?? '—'}</p>
                      </div>
                      <div>
                        <span className="text-surface-500">RTM</span>
                        <p className={cn('mt-0.5', rig.isRTM ? 'text-green-400' : 'text-surface-500')}>
                          {rig.isRTM ? 'Connected' : 'Offline'}
                        </p>
                      </div>
                    </div>

                    {/* Quick counts */}
                    <div className="flex gap-3 mt-4 pt-3 border-t border-surface-700/40">
                      <div className="text-center flex-1">
                        <div className="text-xs font-semibold text-red-400">{rig._count?.failures ?? 0}</div>
                        <div className="text-xs text-surface-500">failures</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className="text-xs font-semibold text-amber-400">{rig._count?.deferredMaintenanceTasks ?? 0}</div>
                        <div className="text-xs text-surface-500">deferred</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className="text-xs font-semibold text-blue-400">{rig._count?.certificates ?? 0}</div>
                        <div className="text-xs text-surface-500">certs</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-surface-400">Page {page} of {pages}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white">Prev</button>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}
              className="px-3 py-1 text-xs bg-surface-700 rounded disabled:opacity-40 text-white">Next</button>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { rigsApi, failuresApi, nptApi, copilotApi, bopApi } from '@/lib/api/client'
import { cn, formatDate, timeAgo, healthScoreColor, formatNptHours } from '@/lib/utils'
import {
  Anchor, ChevronLeft, Activity, AlertTriangle, Wrench,
  Award, Clock, FileText, Loader2, Radio, Layers
} from 'lucide-react'

type Tab = 'overview' | 'failures' | 'npt' | 'bop' | 'kpi' | 'report'

export default function RigDetailPage() {
  const { id } = useParams<{ id: string }>()
  const rigId = Number(id)
  const [tab, setTab] = useState<Tab>('overview')
  const [reportLoading, setReportLoading] = useState(false)
  const [report, setReport] = useState<any>(null)

  const { data: rigData, isLoading } = useQuery({
    queryKey: ['rig', rigId],
    queryFn: () => rigsApi.get(rigId),
    enabled: !!rigId,
  })

  const { data: healthData } = useQuery({
    queryKey: ['rig-health', rigId],
    queryFn: () => rigsApi.getHealthScore(rigId),
    enabled: !!rigId,
    refetchInterval: 60_000,
  })

  const { data: failuresData } = useQuery({
    queryKey: ['rig-failures', rigId],
    queryFn: () => failuresApi.list({ rigId, limit: 10 } as any),
    enabled: tab === 'failures' && !!rigId,
  })

  const { data: nptData } = useQuery({
    queryKey: ['rig-npt', rigId],
    queryFn: () => nptApi.getSummary({ rigId }),
    enabled: tab === 'npt' && !!rigId,
  })

  const { data: bopData } = useQuery({
    queryKey: ['rig-bop-events', rigId],
    queryFn: () => bopApi.getEvents(rigId),
    enabled: tab === 'bop' && !!rigId,
  })

  const rig = rigData as any
  const health = healthData as any
  const kpiData: any[] = []

  const generateReport = async () => {
    setReportLoading(true)
    setTab('report')
    try {
      const res = await copilotApi.generateReport(rigId, 'full')
      setReport(res as any)
    } finally {
      setReportLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
      </div>
    )
  }

  if (!rig) {
    return (
      <div className="p-6 text-surface-400">Rig not found.</div>
    )
  }

  const TABS: { id: Tab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Anchor },
    { id: 'failures', label: 'Failures', icon: AlertTriangle },
    { id: 'npt', label: 'NPT', icon: Clock },
    { id: 'bop', label: 'BOP Events', icon: Layers },
    { id: 'kpi', label: 'KPIs', icon: Activity },
    { id: 'report', label: 'AI Report', icon: FileText },
  ]

  return (
    <div className="p-6 space-y-5">
      {/* Breadcrumb */}
      <Link href="/dashboard/rigs" className="flex items-center gap-1 text-xs text-surface-400 hover:text-white transition-colors w-fit">
        <ChevronLeft className="w-3.5 h-3.5" /> All Rigs
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
            <Anchor className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{rig.name}</h1>
            <div className="flex items-center gap-3 mt-1 text-xs text-surface-400">
              <span className="capitalize">{rig.status}</span>
              <span>·</span>
              <span>{rig.category ?? 'N/A'}</span>
              <span>·</span>
              <span>{rig.operators?.name ?? '—'}</span>
              {rig.isRTM && (
                <><span>·</span><span className="flex items-center gap-1 text-green-400"><Radio className="w-3 h-3" /> RTM Live</span></>
              )}
            </div>
          </div>
        </div>

        <button onClick={generateReport}
          className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors">
          <FileText className="w-4 h-4" /> Generate AI Report
        </button>
      </div>

      {/* Health strip */}
      {health && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Open Failures', value: health.openFailures, color: 'text-red-400', icon: AlertTriangle },
            { label: 'Deferred Tasks', value: health.openMaintenanceTasks, color: 'text-amber-400', icon: Wrench },
            { label: 'Expiring Certs', value: health.expiringCertificates, color: 'text-orange-400', icon: Award },
            { label: 'NPT Hours (30d)', value: formatNptHours(health.nptHoursLast30d), color: 'text-brand-400', icon: Clock },
          ].map((s) => (
            <div key={s.label} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <s.icon className={cn('w-3.5 h-3.5', s.color)} />
                <span className="text-xs text-surface-400">{s.label}</span>
              </div>
              <div className={cn('text-xl font-bold', s.color)}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-800/60 rounded-xl p-1 w-fit overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors',
              tab === t.id ? 'bg-surface-700 text-white' : 'text-surface-400 hover:text-white',
            )}>
            <t.icon className="w-3.5 h-3.5" />{t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-white">Rig Details</h3>
              {[
                ['Manufacturer', rig.manufacturer],
                ['Model', rig.model],
                ['BOP Type', rig.bopType],
                ['Category', rig.category],
                ['Color', rig.color],
                ['On Contract', rig.onContract ? 'Yes' : 'No'],
                ['Operation Start', formatDate(rig.operationStart)],
                ['RTM Rig ID', rig.rtmRigId ?? '—'],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between text-sm border-b border-surface-700/30 pb-2 last:border-0">
                  <span className="text-surface-400">{label}</span>
                  <span className="text-surface-200">{value ?? '—'}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {/* Current well */}
              <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wide mb-3">Current Well</h3>
                <p className="text-surface-500 text-sm">No current well assigned</p>
              </div>

              {/* BOP assignments */}
              <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-surface-400 uppercase tracking-wide mb-3">Active BOP</h3>
                {rig.activeBOPAssignments?.length > 0 ? (
                  rig.activeBOPAssignments.map((a: any) => (
                    <div key={a.id} className="text-sm">
                      <p className="text-white">{a.bops?.name}</p>
                      <p className="text-surface-400 text-xs">{a.bops?.type} · Assigned {formatDate(a.assignedAt)}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-sm">
                    {rig.bops_rigs_bop1IdTobops && <p className="text-surface-300">BOP 1: {rig.bops_rigs_bop1IdTobops.name}</p>}
                    {rig.bops_rigs_bop2IdTobops && <p className="text-surface-300">BOP 2: {rig.bops_rigs_bop2IdTobops.name}</p>}
                    {!rig.bops_rigs_bop1IdTobops && !rig.bops_rigs_bop2IdTobops && <p className="text-surface-500">No BOP assigned</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Failures tab */}
        {tab === 'failures' && (
          <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-surface-400 uppercase border-b border-surface-700/60">
                  <th className="text-left px-4 py-3">Severity</th>
                  <th className="text-left px-4 py-3">Title</th>
                  <th className="text-left px-4 py-3">Component</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-700/40">
                {((failuresData as any)?.items ?? []).map((f: any) => (
                  <tr key={f.id} className="hover:bg-surface-700/20 transition-colors">
                    <td className="px-4 py-3">
                      <span className={cn('text-xs font-semibold uppercase',
                        f.severity === 'critical' ? 'text-red-400' :
                        f.severity === 'high' ? 'text-orange-400' :
                        f.severity === 'medium' ? 'text-amber-400' : 'text-green-400'
                      )}>{f.severity}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-surface-200 max-w-xs truncate">{f.title ?? f.description?.slice(0, 60)}</td>
                    <td className="px-4 py-3 text-sm text-surface-300">{f.components?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-surface-400 capitalize">{f.status}</td>
                    <td className="px-4 py-3 text-xs text-surface-400">{formatDate(f.dateOfFailure)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2 border-t border-surface-700/40">
              <Link href={`/dashboard/failures?rigId=${rigId}`} className="text-xs text-brand-400 hover:underline">
                View all failures for this rig →
              </Link>
            </div>
          </div>
        )}

        {/* NPT tab */}
        {tab === 'npt' && nptData && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total NPT Hours', value: formatNptHours((nptData as any).totalNptHours) },
              { label: 'Total Events', value: (nptData as any).totalEvents },
              { label: 'Avg per Event', value: formatNptHours((nptData as any).avgNptHours) },
            ].map((s) => (
              <div key={s.label} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4">
                <div className="text-xs text-surface-400 mb-1">{s.label}</div>
                <div className="text-xl font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* BOP Events tab */}
        {tab === 'bop' && (
          <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-surface-400 uppercase border-b border-surface-700/60">
                  <th className="text-left px-4 py-3">Event Type</th>
                  <th className="text-left px-4 py-3">BOP</th>
                  <th className="text-left px-4 py-3">Description</th>
                  <th className="text-left px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-700/40">
                {(bopData?.data ?? []).map((e: any) => (
                  <tr key={e.id} className="hover:bg-surface-700/20">
                    <td className="px-4 py-3 text-xs font-medium text-brand-300">{e.eventType}</td>
                    <td className="px-4 py-3 text-sm text-surface-300">{e.bops?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-sm text-surface-400 max-w-xs truncate">{e.description ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-surface-400">{timeAgo(e.createdAt)}</td>
                  </tr>
                ))}
                {(bopData?.data ?? []).length === 0 && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-surface-500 text-sm">No BOP events recorded</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* KPI tab */}
        {tab === 'kpi' && (
          <div className="grid grid-cols-1 gap-3">
            {((kpiData as any) ?? []).map((k: any, i: number) => (
              <div key={i} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                <div><div className="text-xs text-surface-500 mb-0.5">Period</div><div className="text-surface-200">{k.period ?? formatDate(k.createdAt)}</div></div>
                <div><div className="text-xs text-surface-500 mb-0.5">Availability</div><div className="text-green-400 font-semibold">{k.availability?.toFixed(1)}%</div></div>
                <div><div className="text-xs text-surface-500 mb-0.5">Utilization</div><div className="text-brand-400 font-semibold">{k.utilizationRate?.toFixed(1)}%</div></div>
                <div><div className="text-xs text-surface-500 mb-0.5">NPT Hours</div><div className="text-red-400 font-semibold">{k.nptHours?.toFixed(1)}h</div></div>
                <div><div className="text-xs text-surface-500 mb-0.5">Failures</div><div className="text-amber-400 font-semibold">{k.failureCount}</div></div>
              </div>
            ))}
            {((kpiData as any) ?? []).length === 0 && (
              <p className="text-surface-500 text-sm">No KPI data recorded yet</p>
            )}
          </div>
        )}

        {/* AI Report tab */}
        {tab === 'report' && (
          <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-6">
            {reportLoading ? (
              <div className="flex items-center gap-3 text-surface-400">
                <Loader2 className="w-5 h-5 animate-spin text-brand-400" />
                <span className="text-sm">Generating AI executive report...</span>
              </div>
            ) : report ? (
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-xs text-surface-500 mb-4">Generated {new Date(report.generatedAt).toLocaleString()}</p>
                {report.report.split('\n').map((line: string, i: number) => {
                  if (line.startsWith('##')) return <h3 key={i} className="text-brand-300 font-semibold mt-5 mb-2">{line.replace(/^#+\s/, '')}</h3>
                  if (line.startsWith('#')) return <h2 key={i} className="text-white font-bold mt-6 mb-3">{line.replace(/^#+\s/, '')}</h2>
                  if (line.trim() === '') return <br key={i} />
                  return <p key={i} className="text-surface-300 leading-relaxed">{line}</p>
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <FileText className="w-10 h-10 mx-auto mb-3 text-surface-600" />
                <p className="text-surface-400 text-sm mb-4">No report generated yet</p>
                <button onClick={generateReport} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

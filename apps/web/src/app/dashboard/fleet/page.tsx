'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { fleetApi } from '@/lib/api/client'
import { cn, healthScoreColor, healthScoreBg, formatNptHours } from '@/lib/utils'
import { AlertTriangle, Wrench, Award, Clock, TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react'
import Link from 'next/link'

function ScoreRing({ score, size = 56 }: { score: number; size?: number }) {
  const r = (size / 2) - 6
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={5} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        strokeWidth={5} strokeLinecap="round"
        stroke={score >= 80 ? '#4ade80' : score >= 60 ? '#fbbf24' : '#f87171'}
        strokeDasharray={`${dash} ${circ - dash}`}
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text
        x={size/2} y={size/2}
        textAnchor="middle" dominantBaseline="central"
        className="rotate-90"
        style={{ transform: `rotate(90deg) translate(0, 0)`, fill: '#fff', fontSize: size * 0.22, fontWeight: 700, transformOrigin: `${size/2}px ${size/2}px` }}
      >
        {score}
      </text>
    </svg>
  )
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-green-400" />
  if (trend === 'degrading') return <TrendingDown className="w-4 h-4 text-red-400" />
  return <Minus className="w-4 h-4 text-surface-400" />
}

export default function FleetPage() {
  const { data: metrics } = useQuery({ queryKey: ['fleet-metrics'], queryFn: fleetApi.getMetrics, refetchInterval: 60_000 })
  const { data: scores } = useQuery({ queryKey: ['fleet-health-scores'], queryFn: fleetApi.getHealthScores, refetchInterval: 60_000 })

  const rigScores: any[] = Array.isArray(scores) ? scores : []
  const m = metrics as any

  const statCards = [
    { label: 'Fleet Score', value: `${m?.overallFleetScore ?? '—'}`, sub: 'composite', icon: Activity, color: 'text-brand-400' },
    { label: 'Critical Failures', value: m?.criticalFailures ?? '—', sub: 'open', icon: AlertTriangle, color: 'text-red-400' },
    { label: 'NPT Hours (30d)', value: m?.nptHoursMonth?.toFixed(1) ?? '—', sub: 'hours', icon: Clock, color: 'text-amber-400' },
    { label: 'Certs Expiring', value: m?.expiringCerts ?? '—', sub: 'in 60 days', icon: Award, color: 'text-orange-400' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Fleet Overview</h1>
        <p className="text-surface-400 text-sm mt-1">{rigScores.length} rigs · Real-time health scoring</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((c) => (
          <div key={c.label} className="glow-border-subtle bg-surface-800/60 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <c.icon className={cn('w-4 h-4', c.color)} />
              <span className="text-xs text-surface-400">{c.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{c.value}</div>
            <div className="text-xs text-surface-500 mt-0.5">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Rig health grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {rigScores.map((rig, i) => (
          <motion.div
            key={rig.rigId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link href={`/dashboard/rigs/${rig.rigId}`}>
              <div className="bg-surface-800/70 border border-surface-700/60 rounded-xl p-5 hover:border-brand-500/40 transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">{rig.rigName}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendIcon trend={rig.trend} />
                      <span className="text-xs text-surface-400 capitalize">{rig.trend}</span>
                    </div>
                  </div>
                  <ScoreRing score={rig.overallScore} />
                </div>

                {/* 5-dimension bars */}
                <div className="space-y-2">
                  {[
                    { label: 'Component Health', value: rig.componentHealth },
                    { label: 'Maintenance', value: rig.maintenanceCompliance },
                    { label: 'Certification', value: rig.certificationStatus },
                    { label: 'NPT Score', value: rig.nptScore },
                  ].map((dim) => (
                    <div key={dim.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-surface-400">{dim.label}</span>
                        <span className={healthScoreColor(dim.value)}>{dim.value}</span>
                      </div>
                      <div className="h-1.5 bg-surface-700 rounded-full overflow-hidden">
                        <motion.div
                          className={cn('h-full rounded-full', healthScoreBg(dim.value))}
                          initial={{ width: 0 }}
                          animate={{ width: `${dim.value}%` }}
                          transition={{ duration: 0.8, delay: i * 0.04 + 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div className="flex gap-3 mt-4 pt-3 border-t border-surface-700/50">
                  <div className="text-center flex-1">
                    <div className="text-xs text-red-400 font-semibold">{rig.openFailures}</div>
                    <div className="text-xs text-surface-500">failures</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-xs text-amber-400 font-semibold">{rig.openMaintenance}</div>
                    <div className="text-xs text-surface-500">maint</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-xs text-orange-400 font-semibold">{rig.expiringCerts}</div>
                    <div className="text-xs text-surface-500">certs</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-xs text-blue-400 font-semibold">{formatNptHours(rig.nptHoursLast30d)}</div>
                    <div className="text-xs text-surface-500">NPT 30d</div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {rigScores.length === 0 && (
        <div className="text-center py-20 text-surface-400">Loading fleet health data...</div>
      )}
    </div>
  )
}

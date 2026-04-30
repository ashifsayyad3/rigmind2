'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { rigsApi } from '@/lib/api/client'
import { cn, healthScoreColor, healthScoreBg, formatNptHours } from '@/lib/utils'
import { AlertTriangle, CheckCircle, Clock, Wrench, XCircle, ArrowRight, Anchor } from 'lucide-react'
import type { RigSummary } from '@/lib/types'

const STATUS_CFG = {
  active:      { icon: CheckCircle, label: 'Active',       dotClass: 'dot-active'   },
  maintenance: { icon: Wrench,      label: 'Maintenance',  dotClass: 'dot-warning'  },
  critical:    { icon: XCircle,     label: 'Critical',     dotClass: 'dot-critical' },
  idle:        { icon: Clock,       label: 'Idle',         dotClass: 'dot-idle'     },
  offContract: { icon: Clock,       label: 'Off Contract', dotClass: 'dot-offline'  },
} as const

export function RigStatusGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ['rigs', 'list'],
    queryFn:  () => rigsApi.list({ pageSize: 16 }),
    refetchInterval: 30_000,
  })

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="section-label mb-0">Fleet Status</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="glass rounded-xl h-36 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const rigs = data?.data ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="section-label mb-0">Fleet Status · {rigs.length} rigs</div>
        <Link href="/dashboard/fleet" className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {rigs.map((rig, i) => (
          <motion.div key={rig.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <RigCard rig={rig} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function RigCard({ rig }: { rig: RigSummary }) {
  const cfg     = STATUS_CFG[rig.status] ?? STATUS_CFG.idle
  const scoreClr = healthScoreColor(rig.healthScore)
  const scoreBg  = healthScoreBg(rig.healthScore)
  const isCrit   = rig.status === 'critical'

  return (
    <Link href={`/dashboard/rigs/${rig.id}`}>
      <div className={cn(
        'glass rounded-xl p-3.5 hover:border-brand-500/30 transition-all duration-200 cursor-pointer group h-full',
        isCrit && 'glow-red',
      )}>
        {/* Header */}
        <div className="flex items-start justify-between mb-2.5">
          <div className="min-w-0">
            <div className="text-[12px] font-bold text-white group-hover:text-brand-300 transition-colors truncate">{rig.name}</div>
            {rig.operatorName && <div className="text-[9px] text-surface-500 truncate mt-0.5">{rig.operatorName}</div>}
          </div>
          <div className={cn('dot mt-1 ml-1', cfg.dotClass)} />
        </div>

        {/* Health bar */}
        <div className="mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-surface-500 uppercase tracking-wider">Health</span>
            <span className={cn('text-[11px] font-bold tabular-nums', scoreClr)}>{rig.healthScore}</span>
          </div>
          <div className="h-1 bg-surface-800 rounded-full overflow-hidden">
            <motion.div
              className={cn('h-full rounded-full', scoreBg)}
              initial={{ width: 0 }}
              animate={{ width: `${rig.healthScore}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
          </div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-1">
          <MiniStat label="Fail" value={rig.activeFailures}                crit={rig.activeFailures > 2} />
          <MiniStat label="NPT"  value={formatNptHours(rig.nptHoursLast30d)} crit={rig.nptHoursLast30d > 48} />
          <MiniStat label="Cert" value={rig.certExpiringSoon}              crit={rig.certExpiringSoon > 0} />
        </div>
      </div>
    </Link>
  )
}

function MiniStat({ label, value, crit = false }: { label: string; value: string | number; crit?: boolean }) {
  return (
    <div className="text-center bg-surface-900/40 rounded p-1">
      <div className={cn('text-[11px] font-bold tabular-nums', crit ? 'text-red-400' : 'text-surface-300')}>{value}</div>
      <div className="text-[8px] text-surface-600 uppercase tracking-wider">{label}</div>
    </div>
  )
}

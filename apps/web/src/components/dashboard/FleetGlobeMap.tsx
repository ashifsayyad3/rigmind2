'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { fleetApi } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { Globe, ArrowRight } from 'lucide-react'

const STATUS_DOT: Record<string, string> = {
  active:      'bg-green-400 shadow-[0_0_6px_#00e676]',
  critical:    'bg-red-400 shadow-[0_0_6px_#ff1744] animate-pulse',
  maintenance: 'bg-amber-400 shadow-[0_0_6px_#ffab40]',
  idle:        'bg-surface-500',
  offContract: 'bg-surface-600',
}

// Map lat/lng to percentage position inside a simple equirectangular container
function project(lat: number, lng: number): { x: number; y: number } {
  return {
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  }
}

export function FleetGlobeMap() {
  const { data: rigs = [], isLoading } = useQuery({
    queryKey: ['fleet', 'map'],
    queryFn:  () => fleetApi.getGlobalMap(),
    refetchInterval: 60_000,
  })

  return (
    <div className="glass rounded-xl p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-brand-400" />
          <span className="section-label mb-0">Fleet Map</span>
          {rigs.length > 0 && <span className="text-[10px] text-surface-500">{rigs.length} rigs</span>}
        </div>
        <Link href="/dashboard/fleet" className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 transition-colors">
          Detail <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {isLoading ? (
        <div className="h-44 bg-surface-800/30 rounded-lg animate-pulse" />
      ) : (
        <div
          className="relative rounded-lg overflow-hidden bg-[#060d1a] border border-surface-800/50"
          style={{ height: 176 }}
        >
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={`${(i / 6) * 100}%`} x2="100%" y2={`${(i / 6) * 100}%`} stroke="#334155" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={`v${i}`} x1={`${(i / 12) * 100}%`} y1="0" x2={`${(i / 12) * 100}%`} y2="100%" stroke="#334155" strokeWidth="0.5" />
            ))}
          </svg>

          {/* Rig dots */}
          {rigs.map((rig) => {
            const { x, y } = project(rig.lat, rig.lng)
            return (
              <Link key={rig.id} href={`/dashboard/rigs/${rig.id}`}>
                <div
                  className="absolute group"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={cn('w-2 h-2 rounded-full cursor-pointer transition-transform group-hover:scale-150', STATUS_DOT[rig.status] ?? STATUS_DOT.idle)} />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-10 pointer-events-none">
                    <div className="bg-surface-900 border border-surface-700 rounded px-2 py-1 text-[10px] text-white whitespace-nowrap shadow-xl">
                      <div className="font-bold">{rig.name}</div>
                      <div className={cn('text-[9px]', {
                        'text-red-400':    rig.status === 'critical',
                        'text-green-400':  rig.status === 'active',
                        'text-amber-400':  rig.status === 'maintenance',
                        'text-surface-400':rig.status === 'idle',
                      })}>
                        {rig.status} · HS {rig.healthScore}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 mt-2.5">
        {[
          { label: 'Active',      dot: 'bg-green-400'  },
          { label: 'Critical',    dot: 'bg-red-400'    },
          { label: 'Maintenance', dot: 'bg-amber-400'  },
          { label: 'Idle',        dot: 'bg-surface-500'},
        ].map(({ label, dot }) => (
          <div key={label} className="flex items-center gap-1">
            <div className={cn('w-1.5 h-1.5 rounded-full', dot)} />
            <span className="text-[9px] text-surface-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

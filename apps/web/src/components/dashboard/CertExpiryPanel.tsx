'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { certificatesApi } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { Award, ArrowRight, CheckCircle } from 'lucide-react'

function daysUntil(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86_400_000)
}

function urgencyClass(days: number): string {
  if (days <= 14) return 'text-red-400 bg-red-400/10'
  if (days <= 30) return 'text-orange-400 bg-orange-400/10'
  return 'text-amber-400 bg-amber-400/10'
}

export function CertExpiryPanel() {
  const { data, isLoading } = useQuery({
    queryKey: ['certificates', 'expiring'],
    queryFn:  () => certificatesApi.getExpiringSoon(60),
    refetchInterval: 300_000,
  })

  const certs: any[] = (data as any) ?? []

  const sorted = [...certs].sort((a: any, b: any) =>
    new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime()
  )

  return (
    <div className="glass rounded-xl p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-purple-400" />
          <span className="section-label mb-0">Cert Expiry (60d)</span>
          {certs.length > 0 && (
            <span className="text-[10px] font-bold bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-full">
              {certs.length}
            </span>
          )}
        </div>
        <Link href="/dashboard/certificates" className="flex items-center gap-1 text-[11px] text-brand-400 hover:text-brand-300 transition-colors">
          All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-2 flex-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-surface-800/40 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-surface-500">
          <CheckCircle className="w-8 h-8 text-green-500/40" />
          <span className="text-[12px]">No certs expiring soon</span>
        </div>
      ) : (
        <div className="space-y-1.5 flex-1 overflow-y-auto">
          {sorted.slice(0, 8).map((cert: any) => {
            const days = daysUntil(cert.expirationDate)
            return (
              <Link key={cert.id} href={`/dashboard/certificates`}>
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-900/50 hover:bg-surface-800/50 transition-colors group">
                  <span className={cn('text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5 w-10 text-center', urgencyClass(days))}>
                    {days}d
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-surface-200 leading-snug truncate group-hover:text-white transition-colors">
                      {cert.certificate?.equipment ?? cert.attachmentType ?? '—'}
                    </div>
                    <div className="text-[9px] text-surface-500 mt-0.5 truncate">
                      {cert.certificate?.rig?.name ?? ''}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

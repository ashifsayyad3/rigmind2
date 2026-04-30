import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format, parseISO, differenceInDays } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date?: string | Date | null, fmt = 'MMM d, yyyy'): string {
  if (!date) return '—'
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, fmt)
  } catch { return '—' }
}

export function formatDateTime(date?: string | Date | null): string {
  return formatDate(date, 'MMM d, yyyy HH:mm')
}

export function timeAgo(date?: string | Date | null): string {
  if (!date) return '—'
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(d, { addSuffix: true })
  } catch { return '—' }
}

export function daysUntil(date?: string | Date | null): number | null {
  if (!date) return null
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return differenceInDays(d, new Date())
  } catch { return null }
}

export function formatNptHours(val?: string | number | null): string {
  if (val === null || val === undefined) return '—'
  const n = typeof val === 'string' ? parseFloat(val) : val
  if (isNaN(n)) return '—'
  return `${n.toFixed(1)}h`
}

export function formatCurrency(usd: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(usd)
}

export function healthScoreColor(score: number): string {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-amber-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

export function healthScoreBg(score: number): string {
  if (score >= 80) return 'bg-green-400'
  if (score >= 60) return 'bg-amber-400'
  if (score >= 40) return 'bg-orange-400'
  return 'bg-red-400'
}

export function severityColor(s?: string): string {
  switch (s?.toLowerCase()) {
    case 'critical': return 'text-red-400'
    case 'high':     return 'text-orange-400'
    case 'medium':   return 'text-amber-400'
    case 'low':      return 'text-green-400'
    default:         return 'text-surface-400'
  }
}

export function nptCostEstimate(hours: number): number {
  return hours * 50_000 // standard $50k/hr offshore NPT
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max)
}

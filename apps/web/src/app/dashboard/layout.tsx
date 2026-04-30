'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Waves, MapPin, Layers, AlertTriangle,
  Wrench, Award, Eye, Lightbulb, Clock, FileText,
  Bot, Zap, Settings, Users, ChevronLeft, Bell,
  Activity, Cpu, Radio, Shield, ChevronRight, LogOut,
  GitBranch, Anchor,
} from 'lucide-react'
import { useAppStore } from '@/lib/stores/appStore'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import type { Alert } from '@/lib/types'

const NAV = [
  {
    label: 'Operations',
    items: [
      { label: 'Command Center', href: '/dashboard/dashboard',    icon: LayoutDashboard },
      { label: 'Digital Twin',   href: '/dashboard/digital-twin', icon: Cpu },
      { label: 'Fleet',          href: '/dashboard/fleet',        icon: Waves },
      { label: 'Rigs',           href: '/dashboard/rigs',         icon: Anchor },
      { label: 'Wells',          href: '/dashboard/wells',        icon: Layers },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Failures',        href: '/dashboard/failures',        icon: AlertTriangle },
      { label: 'Maintenance',     href: '/dashboard/maintenance',     icon: Wrench },
      { label: 'Certificates',    href: '/dashboard/certificates',    icon: Award },
      { label: 'Observations',    href: '/dashboard/observations',    icon: Eye },
      { label: 'Recommendations', href: '/dashboard/recommendations', icon: Lightbulb },
      { label: 'NPT',             href: '/dashboard/npt',             icon: Clock },
    ],
  },
  {
    label: 'AI & Automation',
    items: [
      { label: 'AI Copilot',   href: '/dashboard/ai-copilot',  icon: Bot },
      { label: 'Reports',      href: '/dashboard/reports',     icon: FileText },
      { label: 'Automation',   href: '/dashboard/automation',  icon: Zap },
    ],
  },
  {
    label: 'Administration',
    items: [
      { label: 'Admin',    href: '/dashboard/admin',    icon: Shield },
      { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname     = usePathname()
  const router       = useRouter()
  const { sidebarCollapsed, toggleSidebar, unreadCount, markAllRead, user, wsConnected, setWsConnected, addAlert, logout } = useAppStore()
  const wsRef        = useRef<ReturnType<typeof io> | null>(null)

  // WebSocket connection
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:3001'
    wsRef.current = io(wsUrl, { transports: ['websocket'], reconnectionAttempts: 5 })
    wsRef.current.on('connect',    () => setWsConnected(true))
    wsRef.current.on('disconnect', () => setWsConnected(false))
    wsRef.current.on('alert', (alert: Alert) => addAlert(alert))
    return () => { wsRef.current?.disconnect() }
  }, [])

  const handleLogout = () => { logout(); router.push('/auth/login') }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#070b12' }} suppressHydrationWarning>
      {/* ── Sidebar ───────────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 56 : 220 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex-shrink-0 flex flex-col overflow-hidden relative z-20"
        style={{
          background: 'linear-gradient(180deg, rgba(14,21,32,0.98) 0%, rgba(10,15,26,0.99) 100%)',
          borderRight: '1px solid rgba(26,36,56,0.8)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center h-14 px-3 border-b border-surface-800/60 flex-shrink-0 gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0082ff 0%, #00d4ff 100%)', boxShadow: '0 0 15px rgba(0,130,255,0.5)' }}>
            <Waves className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} className="overflow-hidden">
                <div className="text-[13px] font-bold text-white whitespace-nowrap tracking-wider font-display">RIGMIND AI™</div>
                <div className="text-[9px] text-brand-400 whitespace-nowrap tracking-[0.15em] uppercase">Offshore Intelligence</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {NAV.map((section) => (
            <div key={section.label}>
              {!sidebarCollapsed && (
                <div className="px-2 mb-1 text-[9px] font-bold text-surface-600 uppercase tracking-[0.2em]">
                  {section.label}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname.startsWith(item.href)
                  const Icon   = item.icon
                  return (
                    <Link key={item.href} href={item.href}
                      className={cn('nav-link', active && 'nav-link-active', sidebarCollapsed && 'justify-center px-2')}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-brand-400' : 'text-surface-500')} />
                      {!sidebarCollapsed && <span className="truncate text-[12px]">{item.label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom user + collapse */}
        <div className="flex-shrink-0 border-t border-surface-800/60 p-2 space-y-1">
          {!sidebarCollapsed && user && (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-brand-300 flex-shrink-0"
                style={{ background: 'rgba(0,130,255,0.15)', border: '1px solid rgba(0,130,255,0.3)' }}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white truncate">{user.firstName} {user.lastName}</div>
                <div className="text-[9px] text-surface-500 truncate">{user.roleName}</div>
              </div>
              <button onClick={handleLogout} className="text-surface-600 hover:text-surface-300 transition-colors">
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          )}
          <button onClick={toggleSidebar}
            className={cn('nav-link w-full', sidebarCollapsed && 'justify-center px-2')}>
            <ChevronLeft className={cn('w-4 h-4 text-surface-500 transition-transform duration-200', sidebarCollapsed && 'rotate-180')} />
            {!sidebarCollapsed && <span className="text-[12px]">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* ── Main ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 h-14 flex items-center justify-between px-5 z-10"
          style={{ background: 'rgba(10,15,26,0.9)', borderBottom: '1px solid rgba(26,36,56,0.7)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <LiveClock />
          </div>

          <div className="flex items-center gap-2">
            {/* WS status */}
            <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
              wsConnected ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-surface-500 bg-surface-800/50 border border-surface-700/30')}>
              <Radio className="w-2.5 h-2.5" />
              {wsConnected ? 'Live' : 'Offline'}
            </div>

            {/* Notifications */}
            <button onClick={markAllRead} className="relative btn-icon text-surface-400 hover:text-white hover:bg-surface-800 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-5 animate-in">{children}</div>
        </main>
      </div>
    </div>
  )
}

function LiveClock() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    function tick() {
      setTime(new Date().toUTCString().slice(0, 25) + ' UTC')
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="text-[11px] text-surface-500 font-mono" suppressHydrationWarning>
      {time}
    </div>
  )
}

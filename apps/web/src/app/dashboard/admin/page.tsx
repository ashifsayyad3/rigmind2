'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { cn, formatDate, timeAgo } from '@/lib/utils'
import { Shield, Users, Anchor, Key, Search, CheckCircle, XCircle } from 'lucide-react'
import { http } from '@/lib/api/client'

type AdminTab = 'users' | 'roles' | 'permissions' | 'audit'

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('users')
  const [search, setSearch] = useState('')

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => http.get('/api/auth/users').then((r) => r.data),
    enabled: tab === 'users',
    retry: false,
  })

  const users: any[] = usersData?.data?.items ?? usersData?.data ?? []

  const filtered = search
    ? users.filter((u) =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())
      )
    : users

  const TABS = [
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'roles' as const, label: 'Roles', icon: Key },
    { id: 'permissions' as const, label: 'Permissions', icon: Shield },
    { id: 'audit' as const, label: 'Audit Log', icon: Shield },
  ]

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <Shield className="w-4 h-4 text-red-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Administration</h1>
          <p className="text-surface-400 text-sm">User management, roles, RBAC, and audit</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-800/60 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn('flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors',
              tab === t.id ? 'bg-surface-700 text-white' : 'text-surface-400 hover:text-white',
            )}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      {/* Users tab */}
      {tab === 'users' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
            <input
              className="w-full bg-surface-800 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-surface-400 uppercase tracking-wide border-b border-surface-700/60">
                  <th className="text-left px-4 py-3">User</th>
                  <th className="text-left px-4 py-3">Role</th>
                  <th className="text-left px-4 py-3">Company</th>
                  <th className="text-left px-4 py-3">Last Active</th>
                  <th className="text-center px-4 py-3">Enabled</th>
                  <th className="text-center px-4 py-3">All Rigs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-700/40">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <tr key={i}>{Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700/50 rounded animate-pulse" /></td>)}</tr>
                    ))
                  : filtered.length === 0
                    ? (
                      <tr><td colSpan={6} className="px-4 py-10 text-center text-surface-500 text-sm">
                        {users.length === 0 ? 'No users found — admin endpoint may require elevated privileges' : 'No results match your search'}
                      </td></tr>
                    )
                    : filtered.map((u) => (
                        <tr key={u.id} className="hover:bg-surface-700/20 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-brand-600/30 flex items-center justify-center text-xs font-semibold text-brand-300">
                                {(u.firstName?.[0] ?? u.email?.[0] ?? '?').toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm text-white">{u.firstName} {u.lastName}</p>
                                <p className="text-xs text-surface-400">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-surface-700 px-2 py-0.5 rounded text-surface-300">
                              {u.roles?.name ?? 'No role'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-surface-400">{u.company ?? '—'}</td>
                          <td className="px-4 py-3 text-xs text-surface-400">{u.lastActive ? timeAgo(u.lastActive) : 'Never'}</td>
                          <td className="px-4 py-3 text-center">
                            {u.enabled
                              ? <CheckCircle className="w-4 h-4 text-green-400 mx-auto" />
                              : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {u.canAccessAllRigs
                              ? <CheckCircle className="w-4 h-4 text-brand-400 mx-auto" />
                              : <XCircle className="w-4 h-4 text-surface-600 mx-auto" />}
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Roles tab */}
      {tab === 'roles' && (
        <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Role-Based Access Control</h3>
          <div className="space-y-3">
            {[
              { name: 'Admin', desc: 'Full platform access including user management', color: 'text-red-400', bg: 'bg-red-500/10' },
              { name: 'Manager', desc: 'Access to all operational modules, can delete records', color: 'text-orange-400', bg: 'bg-orange-500/10' },
              { name: 'Engineer', desc: 'Read/write on failures, maintenance, observations', color: 'text-brand-400', bg: 'bg-brand-500/10' },
              { name: 'Surveyor', desc: 'Read access to rig data and certificates', color: 'text-green-400', bg: 'bg-green-500/10' },
              { name: 'RTOC', desc: 'Remote Technical Operations Centre — RTM and alerts only', color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { name: 'Read Only', desc: 'View-only across all modules', color: 'text-surface-400', bg: 'bg-surface-700' },
            ].map((r) => (
              <div key={r.name} className={cn('flex items-start gap-3 p-3 rounded-lg', r.bg)}>
                <div className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', r.color.replace('text-', 'bg-'))} />
                <div>
                  <p className={cn('text-sm font-semibold', r.color)}>{r.name}</p>
                  <p className="text-xs text-surface-400 mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-surface-500 mt-4">Role assignments are managed in the database. Contact your DBA to modify role permissions.</p>
        </div>
      )}

      {/* Permissions tab */}
      {tab === 'permissions' && (
        <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Security Configuration</h3>
          <div className="space-y-3">
            {[
              { label: 'JWT Authentication', status: 'Active', color: 'text-green-400' },
              { label: 'Azure AD SSO', status: 'Configured', color: 'text-green-400' },
              { label: 'Row-Level Security', status: 'Active (via userRigs)', color: 'text-green-400' },
              { label: 'Soft-Delete Middleware', status: 'Enabled', color: 'text-green-400' },
              { label: 'Rate Limiting', status: '100 req/min per IP', color: 'text-brand-400' },
              { label: 'CORS', status: process.env.NEXT_PUBLIC_API_URL ?? 'localhost only', color: 'text-amber-400' },
              { label: 'Audit Logging', status: 'All writes logged', color: 'text-green-400' },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between py-2 border-b border-surface-700/30 last:border-0">
                <span className="text-sm text-surface-300">{p.label}</span>
                <span className={cn('text-xs font-medium', p.color)}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit tab */}
      {tab === 'audit' && (
        <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-6 text-center py-16">
          <Shield className="w-10 h-10 mx-auto mb-3 text-surface-600" />
          <p className="text-surface-400 text-sm">Audit log is stored in the <code className="text-brand-400">events</code> table.</p>
          <p className="text-surface-500 text-xs mt-1">Use the AI Copilot to query: "Show all events from the last 24 hours"</p>
        </div>
      )}
    </div>
  )
}

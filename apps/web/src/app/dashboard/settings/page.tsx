'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Settings, Bell, Shield, Palette, Database, Key } from 'lucide-react'

const TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
]

export default function SettingsPage() {
  const [tab, setTab] = useState('general')
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="p-6 max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <div className="flex gap-1 bg-surface-800/60 rounded-xl p-1 w-fit">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn('flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all',
              tab === t.id ? 'bg-surface-700 text-white' : 'text-surface-400 hover:text-white',
            )}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-6 space-y-5">
        {tab === 'general' && (
          <>
            <h2 className="text-sm font-semibold text-surface-300">Application Settings</h2>
            {[
              { label: 'Organization Name', value: 'Aquila Engineering', type: 'text' },
              { label: 'Default Timezone', value: 'UTC', type: 'select', options: ['UTC', 'US/Eastern', 'US/Central', 'Europe/London', 'Asia/Singapore'] },
              { label: 'Date Format', value: 'MMM d, yyyy', type: 'select', options: ['MMM d, yyyy', 'dd/MM/yyyy', 'MM/dd/yyyy'] },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs text-surface-400 mb-1.5">{f.label}</label>
                {f.type === 'select'
                  ? <select className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500">
                      {f.options?.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  : <input defaultValue={f.value} className="w-full bg-surface-700 border border-surface-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" />
                }
              </div>
            ))}
          </>
        )}

        {tab === 'notifications' && (
          <>
            <h2 className="text-sm font-semibold text-surface-300">Notification Preferences</h2>
            {[
              { label: 'Critical failure alerts', defaultChecked: true },
              { label: 'Certificate expiry warnings (60 days)', defaultChecked: true },
              { label: 'Daily executive digest', defaultChecked: false },
              { label: 'Predictive maintenance alerts', defaultChecked: true },
              { label: 'NPT threshold exceeded', defaultChecked: true },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-2 border-b border-surface-700/40 last:border-0">
                <span className="text-sm text-surface-300">{n.label}</span>
                <input type="checkbox" defaultChecked={n.defaultChecked} className="w-4 h-4 accent-brand-500" />
              </div>
            ))}
          </>
        )}

        {tab === 'security' && (
          <>
            <h2 className="text-sm font-semibold text-surface-300">Security Settings</h2>
            <div className="space-y-3">
              {[
                { label: 'Azure AD SSO', status: 'Enabled', color: 'text-green-400' },
                { label: 'Multi-Factor Authentication', status: 'Required', color: 'text-green-400' },
                { label: 'Session Timeout', status: '24 hours', color: 'text-surface-300' },
                { label: 'Row-Level Security', status: 'Active', color: 'text-green-400' },
                { label: 'API Key Rotation', status: 'Last: 30 days ago', color: 'text-amber-400' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-surface-700/40 last:border-0">
                  <span className="text-sm text-surface-300">{s.label}</span>
                  <span className={cn('text-xs font-medium', s.color)}>{s.status}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <button onClick={handleSave}
          className={cn('px-5 py-2 text-sm font-medium rounded-lg transition-all',
            saved ? 'bg-green-600 text-white' : 'bg-brand-600 hover:bg-brand-500 text-white',
          )}>
          {saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

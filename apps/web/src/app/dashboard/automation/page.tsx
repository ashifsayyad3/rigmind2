'use client'

import { cn } from '@/lib/utils'
import { Zap, CheckCircle, Clock, AlertTriangle, Play, Pause, Settings } from 'lucide-react'

const WORKFLOWS = [
  { name: 'Failure Incident Workflow', description: 'Polls every 5 min for new failures, sends critical alerts to Teams & email', status: 'active', lastRun: '2 min ago', runCount: 1842, successRate: 99.1 },
  { name: 'Certificate Expiry Workflow', description: 'Daily scan for certs expiring in 30/60/90 days, tiered email alerts', status: 'active', lastRun: '6 hrs ago', runCount: 428, successRate: 100 },
  { name: 'Predictive Maintenance Workflow', description: 'AI fleet prediction every 6 hours, filters critical & high risk components', status: 'active', lastRun: '4 hrs ago', runCount: 712, successRate: 97.8 },
  { name: 'Daily Executive Report', description: 'Weekday 6AM — fleet metrics + AI narrative emailed to leadership', status: 'active', lastRun: 'Today 06:00', runCount: 238, successRate: 100 },
  { name: 'Escalation Workflow', description: 'Escalates unacknowledged critical failures after 2 hours', status: 'paused', lastRun: '3 days ago', runCount: 44, successRate: 95.5 },
]

export default function AutomationPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Automation Center</h1>
          <p className="text-surface-400 text-sm mt-1">n8n workflow orchestration — 5 workflows active</p>
        </div>
        <a href="http://localhost:5678" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-surface-700 hover:bg-surface-600 rounded-lg text-sm text-white transition-colors">
          <Settings className="w-4 h-4" /> Open n8n Editor
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Workflows', value: 4, icon: Zap, color: 'text-brand-400' },
          { label: 'Runs Today', value: '12', icon: Play, color: 'text-green-400' },
          { label: 'Avg Success Rate', value: '98.5%', icon: CheckCircle, color: 'text-green-400' },
        ].map((s) => (
          <div key={s.label} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1"><s.icon className={cn('w-4 h-4', s.color)} /><span className="text-xs text-surface-400">{s.label}</span></div>
            <div className={cn('text-2xl font-bold', s.color)}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Workflow cards */}
      <div className="space-y-3">
        {WORKFLOWS.map((wf) => (
          <div key={wf.name} className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={cn('w-2.5 h-2.5 rounded-full mt-0.5',
                  wf.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-surface-500',
                )} />
                <div>
                  <h3 className="text-sm font-semibold text-white">{wf.name}</h3>
                  <p className="text-xs text-surface-400 mt-0.5">{wf.description}</p>
                </div>
              </div>
              <button className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors',
                wf.status === 'active' ? 'bg-surface-700 text-surface-300 hover:bg-surface-600' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30',
              )}>
                {wf.status === 'active' ? <><Pause className="w-3 h-3" /> Pause</> : <><Play className="w-3 h-3" /> Resume</>}
              </button>
            </div>
            <div className="flex gap-6 mt-3 text-xs">
              <div><span className="text-surface-500">Last run:</span> <span className="text-surface-300">{wf.lastRun}</span></div>
              <div><span className="text-surface-500">Total runs:</span> <span className="text-surface-300">{wf.runCount.toLocaleString()}</span></div>
              <div><span className="text-surface-500">Success rate:</span> <span className={cn(wf.successRate >= 99 ? 'text-green-400' : 'text-amber-400')}>{wf.successRate}%</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { fleetApi, copilotApi } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { FileText, Loader2, Download, ChevronDown, Bot } from 'lucide-react'

export default function ReportsPage() {
  const [selectedRigId, setSelectedRigId] = useState<number | null>(null)
  const [report, setReport] = useState<any>(null)

  const { data: fleetData } = useQuery({ queryKey: ['fleet-health-scores'], queryFn: fleetApi.getHealthScores })
  const rigs: any[] = (fleetData as any) ?? []

  const generateMutation = useMutation({
    mutationFn: (rigId: number) => copilotApi.generateReport(rigId, 'full'),
    onSuccess: (data) => setReport(data as any),
  })

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Reports</h1>
        <p className="text-surface-400 text-sm mt-1">Generate AI-powered executive health reports for any rig</p>
      </div>

      {/* Report generator */}
      <div className="bg-surface-800/60 border border-surface-700/60 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Bot className="w-4 h-4 text-brand-400" />
          Generate Rig Health Report
        </h2>
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <select
              className="w-full appearance-none bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 pr-10"
              value={selectedRigId ?? ''}
              onChange={(e) => setSelectedRigId(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Select a rig...</option>
              {rigs.map((r) => <option key={r.rigId} value={r.rigId}>{r.rigName}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
          </div>
          <button
            onClick={() => selectedRigId && generateMutation.mutate(selectedRigId)}
            disabled={!selectedRigId || generateMutation.isPending}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
          >
            {generateMutation.isPending
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
              : <><FileText className="w-4 h-4" /> Generate Report</>}
          </button>
        </div>
      </div>

      {/* Generated report */}
      <AnimatePresence>
        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-800/60 border border-surface-700/60 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-surface-700/60">
              <div>
                <h2 className="text-white font-semibold">{report.rigName} — Executive Health Report</h2>
                <p className="text-xs text-surface-400 mt-0.5">Generated {new Date(report.generatedAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => {
                  const blob = new Blob([report.report], { type: 'text/plain' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `${report.rigName}-health-report.txt`
                  a.click()
                }}
                className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4" /> Export
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <div className="bg-surface-700/50 rounded-lg px-4 py-2 text-center">
                  <div className="text-xl font-bold text-red-400">{report.dataSnapshot?.openFailures}</div>
                  <div className="text-xs text-surface-400">Open Failures</div>
                </div>
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                {report.report.split('\n').map((line: string, i: number) => {
                  if (line.startsWith('##')) return <h3 key={i} className="text-brand-300 font-semibold mt-5 mb-2">{line.replace(/^#+\s/, '')}</h3>
                  if (line.startsWith('#')) return <h2 key={i} className="text-white font-bold mt-6 mb-3">{line.replace(/^#+\s/, '')}</h2>
                  if (line.trim() === '') return <br key={i} />
                  return <p key={i} className="text-surface-300 leading-relaxed">{line}</p>
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!report && !generateMutation.isPending && (
        <div className="text-center py-16 text-surface-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>Select a rig and generate your first AI report</p>
        </div>
      )}
    </div>
  )
}

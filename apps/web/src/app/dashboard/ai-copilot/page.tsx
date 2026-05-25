'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { copilotApi } from '@/lib/api/client'
import { cn } from '@/lib/utils'
import { Bot, Send, User, Copy, Check, Loader2, Trash2, ChevronDown } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sql?: string
  rows?: any[]
  rowCount?: number
  error?: string
}

const SUGGESTIONS = [
  'Which rigs have the most open failures?',
  'Show NPT hours by rig for the last 30 days',
  'List certificates expiring in the next 60 days',
  'What are the top 5 failure modes across all rigs?',
  'How many BOP events happened this year?',
  'Which operators have the highest NPT?',
  'Show me critical failures resolved in the last week',
  'Which components fail most often?',
]

function SqlBlock({ sql }: { sql: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(sql)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-surface-600/60">
      <div className="flex items-center justify-between bg-surface-700/60 px-3 py-1.5">
        <span className="text-xs text-surface-400 font-mono">SQL</span>
        <button onClick={copy} className="text-xs text-surface-400 hover:text-white flex items-center gap-1 transition-colors">
          {copied ? <><Check className="w-3 h-3 text-green-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <pre className="bg-surface-900/80 px-3 py-2.5 text-xs text-brand-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">{sql}</pre>
    </div>
  )
}

function ResultsTable({ rows }: { rows: any[] }) {
  const [expanded, setExpanded] = useState(false)
  if (!rows?.length) return null
  const keys = Object.keys(rows[0])
  const displayRows = expanded ? rows : rows.slice(0, 5)
  return (
    <div className="mt-3">
      <div className="overflow-x-auto rounded-lg border border-surface-600/60">
        <table className="text-xs w-full">
          <thead>
            <tr className="bg-surface-700/60">
              {keys.map((k) => <th key={k} className="text-left px-2.5 py-1.5 text-surface-400 font-medium whitespace-nowrap">{k}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/30">
            {displayRows.map((row, i) => (
              <tr key={i} className="hover:bg-surface-700/20">
                {keys.map((k) => (
                  <td key={k} className="px-2.5 py-1.5 text-surface-300 whitespace-nowrap max-w-[200px] truncate">
                    {row[k] === null ? <span className="text-surface-600">null</span> : String(row[k])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > 5 && (
        <button onClick={() => setExpanded(!expanded)}
          className="mt-1.5 text-xs text-surface-400 hover:text-white flex items-center gap-1 transition-colors">
          <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', expanded && 'rotate-180')} />
          {expanded ? 'Show less' : `Show all ${rows.length} rows`}
        </button>
      )}
    </div>
  )
}

export default function AiCopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hello — I'm your RigMind AI Copilot. Ask me anything about your rig fleet: failures, NPT, maintenance, certificates, BOP events, KPIs, or wells. I'll translate your question into SQL and give you the answer in plain English.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const conversationHistory = messages
    .filter((m) => m.id !== '0')
    .map((m) => ({ id: m.id, role: m.role, content: m.content, timestamp: new Date().toISOString() }))

  const send = async (question: string) => {
    if (!question.trim() || loading) return
    setInput('')
    setLoading(true)

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
    }
    setMessages((prev) => [...prev, userMsg])

    try {
      const res = await copilotApi.ask(question, conversationHistory)
      const data = (res as any) ?? {}

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data?.answer ?? 'Sorry, I could not generate an answer.',
        sql: data?.sql,
        rows: data?.rows,
        rowCount: data?.rowCount,
        error: data?.queryError,
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch (err: any) {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error connecting to the server. Please check your API connection.',
        error: err.message,
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const clearChat = () => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: "Chat cleared. Ask me anything about your rig fleet.",
    }])
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-surface-700/60 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-brand-400" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white">AI Copilot</h1>
            <p className="text-xs text-surface-400">Natural language rig data queries</p>
          </div>
        </div>
        <button onClick={clearChat} className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-white transition-colors">
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('flex gap-3 max-w-4xl', msg.role === 'user' && 'ml-auto flex-row-reverse')}
          >
            {/* Avatar */}
            <div className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5',
              msg.role === 'user' ? 'bg-surface-600' : 'bg-brand-600/30 border border-brand-500/30',
            )}>
              {msg.role === 'user'
                ? <User className="w-3.5 h-3.5 text-surface-300" />
                : <Bot className="w-3.5 h-3.5 text-brand-400" />}
            </div>

            {/* Bubble */}
            <div className={cn(
              'rounded-2xl px-4 py-3 text-sm max-w-2xl',
              msg.role === 'user'
                ? 'bg-brand-600/20 border border-brand-500/20 text-white rounded-tr-sm'
                : 'bg-surface-800/70 border border-surface-700/60 text-surface-200 rounded-tl-sm',
            )}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

              {msg.sql && <SqlBlock sql={msg.sql} />}
              {msg.rows && msg.rows.length > 0 && <ResultsTable rows={msg.rows} />}
              {msg.rowCount !== undefined && (
                <p className="text-xs text-surface-500 mt-2">{msg.rowCount} row{msg.rowCount !== 1 ? 's' : ''} returned</p>
              )}
              {msg.error && (
                <p className="text-xs text-red-400 mt-2 font-mono">{msg.error}</p>
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-brand-600/30 border border-brand-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-brand-400" />
            </div>
            <div className="bg-surface-800/70 border border-surface-700/60 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              {[0, 0.15, 0.3].map((delay, i) => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-surface-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions (shown when only welcome message) */}
      <AnimatePresence>
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-6 pb-2"
          >
            <p className="text-xs text-surface-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.slice(0, 6).map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 bg-surface-800 border border-surface-700/60 hover:border-brand-500/40 hover:text-brand-300 text-surface-400 rounded-full transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="px-6 pb-6 pt-3 border-t border-surface-700/60 shrink-0">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder="Ask about failures, NPT, maintenance, certificates..."
              disabled={loading}
              className="w-full bg-surface-800 border border-surface-700 focus:border-brand-500 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder:text-surface-500 focus:outline-none transition-colors disabled:opacity-60"
            />
          </div>
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
          </button>
        </div>
        <p className="text-xs text-surface-600 mt-2">Only read-only SELECT queries are executed · Conversation history: last 10 messages</p>
      </div>
    </div>
  )
}

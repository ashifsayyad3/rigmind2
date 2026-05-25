'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Anchor, Eye, EyeOff, Loader2, Shield } from 'lucide-react'
import { useAppStore } from '@/lib/stores/appStore'
import { authApi } from '@/lib/api/client'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const setUser = useAppStore((s) => s.setUser)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    setError('')
    try {
      const res = await authApi.login(email, password)
      const { token: accessToken, user } = res as any
      localStorage.setItem('rigmind_token', accessToken)
      setUser(user)
      router.push('/dashboard/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message?.[0] ?? 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleAzureSSO = () => {
    window.location.href = '/api/auth/azure'
  }

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[100px]" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4488ff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-500/30 mb-4">
            <Anchor className="w-7 h-7 text-brand-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">RigMind AI™</h1>
          <p className="text-surface-400 text-sm mt-1">Enterprise Offshore Rig Intelligence</p>
        </div>

        {/* Card */}
        <div className="bg-surface-900/80 backdrop-blur border border-surface-700/60 rounded-2xl p-8 shadow-2xl">
          {/* Azure SSO */}
          <button
            onClick={handleAzureSSO}
            className="w-full flex items-center justify-center gap-3 bg-[#0078d4] hover:bg-[#006cbe] text-white font-medium py-3 rounded-xl transition-colors mb-6"
          >
            <Shield className="w-4 h-4" />
            Continue with Azure AD
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-surface-700" />
            <span className="text-xs text-surface-500">or sign in with email</span>
            <div className="flex-1 h-px bg-surface-700" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-surface-400 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@aquila-engineer.com"
                required
                className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-surface-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-xs text-red-400"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors mt-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-surface-600 mt-6">
          © {new Date().getFullYear()} Aquila Engineering · Powered by RigMind AI™
        </p>
      </motion.div>
    </div>
  )
}

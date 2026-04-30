import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand:   { 50:'#e5f3ff', 100:'#cce7ff', 200:'#99ceff', 300:'#66b5ff', 400:'#339bff', 500:'#0082ff', 600:'#0068cc', 700:'#004e99', 800:'#003466', 900:'#001a33', 950:'#000d1a' },
        surface: { 50:'#eef2f7', 100:'#d5dde8', 200:'#aebbd0', 300:'#8799b8', 400:'#6177a0', 500:'#475e8a', 600:'#384a6e', 700:'#283752', 800:'#1a2438', 900:'#0e1520', 950:'#070b12' },
        accent:  { cyan:'#00d4ff', teal:'#00b4a0', green:'#00e676', amber:'#ffab40', orange:'#ff6d00', red:'#ff1744', purple:'#d500f9', pink:'#f50057' },
        status:  { active:'#00e676', warning:'#ffab40', critical:'#ff1744', idle:'#546e7a', offline:'#37474f' },
      },
      fontFamily: {
        sans:    ['Syne', 'system-ui', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'Fira Code', 'monospace'],
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
      },
      backgroundImage: {
        'hex-pattern':  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2l25.98 15v30L30 62 4.02 47V17L30 2z' fill='none' stroke='%231a2438' stroke-width='0.5'/%3E%3C/svg%3E\")",
        'grid-fine':    "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%231a2438' stroke-width='0.3'/%3E%3C/svg%3E\")",
        'scanlines':    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      },
      animation: {
        'pulse-slow':     'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':      'spin 10s linear infinite',
        'scan':           'scan 3s linear infinite',
        'flicker':        'flicker 0.3s ease-in-out infinite alternate',
        'slide-up':       'slideUp 0.4s ease-out',
        'slide-right':    'slideRight 0.3s ease-out',
        'glow-pulse':     'glowPulse 2s ease-in-out infinite alternate',
        'number-tick':    'numberTick 0.8s steps(10) forwards',
      },
      keyframes: {
        scan:        { '0%': { backgroundPosition: '0 -100vh' }, '100%': { backgroundPosition: '0 100vh' } },
        flicker:     { '0%': { opacity: '1' }, '100%': { opacity: '0.92' } },
        slideUp:     { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideRight:  { from: { opacity: '0', transform: 'translateX(-12px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        glowPulse:   { '0%': { boxShadow: '0 0 5px rgba(0,130,255,0.3)' }, '100%': { boxShadow: '0 0 25px rgba(0,130,255,0.8), 0 0 50px rgba(0,130,255,0.3)' } },
        numberTick:  { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      boxShadow: {
        'glow-xs':    '0 0 8px rgba(0,130,255,0.4)',
        'glow-sm':    '0 0 15px rgba(0,130,255,0.4)',
        'glow-md':    '0 0 30px rgba(0,130,255,0.5)',
        'glow-lg':    '0 0 60px rgba(0,130,255,0.6)',
        'glow-red':   '0 0 20px rgba(255,23,68,0.5)',
        'glow-green': '0 0 20px rgba(0,230,118,0.5)',
        'glow-amber': '0 0 20px rgba(255,171,64,0.5)',
        'glow-cyan':  '0 0 20px rgba(0,212,255,0.5)',
        'inner-dark': 'inset 0 2px 20px rgba(0,0,0,0.6)',
        'card':       '0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)',
        'panel':      '0 8px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}

export default config

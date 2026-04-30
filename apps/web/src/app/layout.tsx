import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/common/Providers'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: { default: 'RigMind AI™', template: '%s | RigMind AI™' },
  description: 'Enterprise AI-powered offshore drilling intelligence platform — predictive maintenance, digital twin, fleet health, autonomous workflows.',
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
}

export const viewport: Viewport = {
  themeColor: '#070b12',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

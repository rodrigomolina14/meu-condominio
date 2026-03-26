import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@/lib/user-context'
import { Toaster } from '@/components/ui/sonner'

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Meu Condomínio',
  description: 'Seu condomínio na palma da mão',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Meu Condomínio',
  },
}

export const viewport: Viewport = {
  themeColor: '#1D4ED8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${geist.variable} antialiased`}>
        <UserProvider>
          {children}
          <Toaster position="top-center" richColors />
        </UserProvider>
      </body>
    </html>
  )
}

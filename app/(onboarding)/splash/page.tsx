'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2 } from 'lucide-react'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome')
    }, 2200)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-primary-foreground px-6">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
          <Building2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Condomínio</h1>
        <p className="text-white/70 text-center text-sm">
          Seu condomínio na palma da mão
        </p>
      </div>

      <div className="absolute bottom-12 flex gap-1">
        <span className="w-2 h-2 bg-white/40 rounded-full" />
        <span className="w-6 h-2 bg-white rounded-full" />
        <span className="w-2 h-2 bg-white/40 rounded-full" />
      </div>
    </div>
  )
}

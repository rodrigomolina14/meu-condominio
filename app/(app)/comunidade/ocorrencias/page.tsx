'use client'

import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { ocorrencias } from '@/lib/mock-data/ocorrencias'
import { OcorrenciaCard } from '@/components/cards/ocorrencia-card'
import { buttonVariants } from '@/components/ui/button'

export default function OcorrenciasPage() {
  const abertas = ocorrencias.filter(o => o.status !== 'resolvida')
  const resolvidas = ocorrencias.filter(o => o.status === 'resolvida')

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/comunidade" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm flex-1">Ocorrências</h1>
        <Link href="/comunidade/ocorrencias/nova" className={buttonVariants({ size: 'sm', variant: 'outline' })}>
          <Plus className="w-4 h-4 mr-1" />
          Nova
        </Link>
      </header>

      <div className="px-4 py-4 space-y-6">
        {abertas.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Em aberto
            </h2>
            <div className="space-y-4">
              {abertas.map(o => (
                <Link key={o.id} href={`/comunidade/ocorrencias/${o.id}`}>
                  <OcorrenciaCard ocorrencia={o} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {resolvidas.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Resolvidas
            </h2>
            <div className="space-y-4 opacity-75">
              {resolvidas.map(o => (
                <Link key={o.id} href={`/comunidade/ocorrencias/${o.id}`}>
                  <OcorrenciaCard ocorrencia={o} />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-20 right-4">
        <Link href="/comunidade/ocorrencias/nova" className={buttonVariants({ size: 'icon' }) + ' w-12 h-12 rounded-full shadow-lg'}>
          <Plus className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { enquetes } from '@/lib/mock-data/enquetes'

export default function EnquetesPage() {
  const abertas = enquetes.filter(e => e.status === 'aberta')
  const encerradas = enquetes.filter(e => e.status === 'encerrada')

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/comunidade" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm">Enquetes</h1>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* Abertas */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Abertas
          </h2>
          <div className="space-y-3">
            {abertas.map(e => (
              <Link key={e.id} href={`/comunidade/enquetes/${e.id}`}>
                <div className="rounded-xl border bg-card p-4 space-y-2 border-primary/20 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                      Aberta
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Até {new Date(e.endsAt + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug">{e.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{e.totalVotes} votos</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Encerradas */}
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Encerradas
          </h2>
          <div className="space-y-3">
            {encerradas.map(e => (
              <Link key={e.id} href={`/comunidade/enquetes/${e.id}`}>
                <div className="rounded-xl border bg-card p-4 space-y-2 opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                      Encerrada
                    </span>
                    <span className="text-xs text-muted-foreground">{e.totalVotes} votos</span>
                  </div>
                  <h3 className="font-semibold text-sm leading-snug">{e.title}</h3>
                  <p className="text-xs text-muted-foreground">Ver resultado</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

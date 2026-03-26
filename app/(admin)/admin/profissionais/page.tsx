'use client'

import { profissionais, categoryLabels } from '@/lib/mock-data/profissionais'
import { ProfissionalCard } from '@/components/cards/profissional-card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminProfissionaisPage() {
  const pendentes = profissionais.filter(p => p.status === 'pendente')
  const aprovados = profissionais.filter(p => p.status === 'aprovado')

  return (
    <div className="px-4 py-4 md:px-6 space-y-6">
      <h1 className="text-xl font-bold">Profissionais</h1>

      {pendentes.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Aguardando aprovação ({pendentes.length})
          </h2>
          <div className="space-y-3">
            {pendentes.map(p => (
              <div key={p.id} className="space-y-2">
                <ProfissionalCard profissional={p} />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-success hover:bg-success/90"
                    onClick={() => toast.success(`${p.name} aprovado!`)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Aprovar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-danger border-danger/30"
                    onClick={() => toast.error('Indicação recusada.')}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Recusar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Aprovados ({aprovados.length})
        </h2>
        <div className="space-y-3">
          {aprovados.map(p => (
            <div key={p.id} className="rounded-xl border bg-card p-4 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full shrink-0">
                    {categoryLabels[p.category]}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{p.phone}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-danger hover:bg-danger/5 shrink-0"
                onClick={() => toast.error(`${p.name} removido do diretório.`)}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

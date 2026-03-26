import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ocorrencias } from '@/lib/mock-data/ocorrencias'
import { formatDateTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

const categoryLabels: Record<string, string> = {
  barulho: 'Barulho', vazamento: 'Vazamento', seguranca: 'Segurança',
  limpeza: 'Limpeza', equipamento: 'Equipamento', outro: 'Outro',
}
const statusConfig = {
  aberta: { label: 'Aberta', className: 'bg-danger/10 text-danger' },
  em_andamento: { label: 'Em andamento', className: 'bg-warning/10 text-warning' },
  resolvida: { label: 'Resolvida', className: 'bg-success/10 text-success' },
}

export default async function OcorrenciaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const oc = ocorrencias.find(o => o.id === id)
  if (!oc) notFound()

  const status = statusConfig[oc.status]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/comunidade/ocorrencias" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm truncate">Ocorrência</h1>
      </header>

      <div className="px-4 py-4 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {categoryLabels[oc.category]}
            </span>
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', status.className)}>
              {status.label}
            </span>
          </div>
          <h1 className="text-lg font-bold leading-snug">{oc.title}</h1>
          <p className="text-xs text-muted-foreground">
            {oc.unit} — Aberta em {formatDateTime(oc.createdAt)}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{oc.description}</p>
        </div>

        {/* Messages */}
        {oc.messages.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Histórico</h2>
            {oc.messages.map((msg, i) => (
              <div key={i} className={cn(
                'rounded-xl p-4 space-y-1',
                msg.role === 'sindico' ? 'bg-primary/5 border border-primary/10' : 'bg-muted'
              )}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">
                    {msg.role === 'sindico' ? '⭐ ' : ''}{msg.author}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDateTime(msg.createdAt)}</span>
                </div>
                <p className="text-sm">{msg.body}</p>
              </div>
            ))}
          </div>
        )}

        {oc.resolvedAt && (
          <p className="text-xs text-success text-center">
            Resolvida em {formatDateTime(oc.resolvedAt)}
          </p>
        )}
      </div>
    </div>
  )
}

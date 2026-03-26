import { Ocorrencia } from '@/lib/mock-data/ocorrencias'
import { timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

const categoryLabels: Record<Ocorrencia['category'], string> = {
  barulho: 'Barulho',
  vazamento: 'Vazamento',
  seguranca: 'Segurança',
  limpeza: 'Limpeza',
  equipamento: 'Equipamento',
  outro: 'Outro',
}

const statusConfig = {
  aberta: { label: 'Aberta', className: 'bg-danger/10 text-danger' },
  em_andamento: { label: 'Em andamento', className: 'bg-warning/10 text-warning' },
  resolvida: { label: 'Resolvida', className: 'bg-success/10 text-success' },
}

type Props = {
  ocorrencia: Ocorrencia
}

export function OcorrenciaCard({ ocorrencia }: Props) {
  const status = statusConfig[ocorrencia.status]

  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {categoryLabels[ocorrencia.category]}
        </span>
        <span className={cn(
          'text-xs font-medium px-2 py-0.5 rounded-full',
          status.className
        )}>
          {status.label}
        </span>
      </div>

      <h3 className="font-semibold text-sm leading-snug">{ocorrencia.title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2">{ocorrencia.description}</p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{ocorrencia.unit}</span>
        <span>{timeAgo(ocorrencia.createdAt)}</span>
      </div>
    </div>
  )
}

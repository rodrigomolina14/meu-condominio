import { AgendaItem } from '@/lib/mock-data/agenda'
import { formatDateShort } from '@/lib/utils'
import { Users, Wrench, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const typeConfig = {
  reuniao: { label: 'Reunião', icon: Users, color: 'text-primary bg-primary/10' },
  reparo: { label: 'Reparo', icon: Wrench, color: 'text-warning bg-warning/10' },
  manutencao: { label: 'Manutenção', icon: Settings, color: 'text-accent bg-accent/10' },
}

const statusConfig = {
  agendado: { label: 'Agendado', className: 'bg-primary/10 text-primary' },
  em_andamento: { label: 'Em andamento', className: 'bg-warning/10 text-warning' },
  concluido: { label: 'Concluído', className: 'bg-success/10 text-success' },
}

type Props = {
  item: AgendaItem
  compact?: boolean
}

export function AgendaCard({ item, compact }: Props) {
  const type = typeConfig[item.type]
  const status = statusConfig[item.status]
  const Icon = type.icon

  return (
    <div className="rounded-xl border bg-card p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <span className={cn(
          'inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full',
          type.color
        )}>
          <Icon className="w-3 h-3" />
          {type.label}
        </span>
        <span className={cn(
          'text-xs font-medium px-2 py-0.5 rounded-full',
          status.className
        )}>
          {status.label}
        </span>
      </div>

      <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>

      {!compact && (
        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
      )}

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          {formatDateShort(item.date)} — {item.time}
        </span>
        <span>•</span>
        <span className="truncate">{item.location}</span>
      </div>
    </div>
  )
}

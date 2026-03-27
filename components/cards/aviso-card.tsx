import { Aviso } from '@/lib/mock-data/avisos'
import { timeAgo } from '@/lib/utils'
import { AlertTriangle, Newspaper, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

const categoryConfig = {
  urgente: {
    label: 'Urgente',
    icon: AlertTriangle,
    className: 'bg-danger/10 text-danger border-danger/20',
    iconClass: 'text-danger',
  },
  aviso: {
    label: 'Aviso',
    icon: Bell,
    className: 'bg-warning/10 text-warning border-warning/20',
    iconClass: 'text-warning',
  },
  noticia: {
    label: 'Notícia',
    icon: Newspaper,
    className: 'bg-primary/10 text-primary border-primary/20',
    iconClass: 'text-primary',
  },
}

type Props = {
  aviso: Aviso
  compact?: boolean
}

export function AvisoCard({ aviso, compact }: Props) {
  const config = categoryConfig[aviso.category]
  const Icon = config.icon

  return (
    <div className={cn(
      'rounded-xl bg-card border border-l-4 p-4',
      aviso.category === 'urgente' && 'border-l-danger',
      aviso.category === 'aviso' && 'border-l-warning',
      aviso.category === 'noticia' && 'border-l-primary',
    )}>
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className={cn(
          'inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border',
          config.className
        )}>
          <Icon className="w-3 h-3" />
          {config.label}
        </span>
        <span className="text-xs text-muted-foreground shrink-0">
          {timeAgo(aviso.createdAt)}
        </span>
      </div>

      <h3 className="font-semibold text-sm leading-snug">{aviso.title}</h3>

      {!compact && (
        <>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{aviso.body}</p>
          <p className="text-xs text-muted-foreground mt-2">{aviso.author}</p>
        </>
      )}
    </div>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Calendar } from 'lucide-react'
import { agendaItems } from '@/lib/mock-data/agenda'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const typeLabels = { reuniao: 'Reunião', reparo: 'Reparo', manutencao: 'Manutenção' }
const statusConfig = {
  agendado: { label: 'Agendado', className: 'bg-primary/10 text-primary' },
  em_andamento: { label: 'Em andamento', className: 'bg-warning/10 text-warning' },
  concluido: { label: 'Concluído', className: 'bg-success/10 text-success' },
}

export default async function AgendaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = agendaItems.find(i => i.id === id)
  if (!item) notFound()

  const status = statusConfig[item.status]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/agenda" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm truncate">{typeLabels[item.type]}</h1>
      </header>

      <div className="px-4 py-5 space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {typeLabels[item.type]}
            </span>
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', status.className)}>
              {status.label}
            </span>
          </div>
          <h1 className="text-xl font-bold leading-snug">{item.title}</h1>
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>{formatDate(item.date)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>{item.time}{item.estimatedDuration && ` — duração estimada: ${item.estimatedDuration}`}</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{item.location}</span>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Descrição</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

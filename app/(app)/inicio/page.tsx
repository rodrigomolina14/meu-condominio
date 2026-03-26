import Link from 'next/link'
import { ChevronRight, CalendarDays } from 'lucide-react'
import { avisos } from '@/lib/mock-data/avisos'
import { agendaItems } from '@/lib/mock-data/agenda'
import { AvisoCard } from '@/components/cards/aviso-card'
import { AgendaCard } from '@/components/cards/agenda-card'
import { formatDate } from '@/lib/utils'

export default function InicioPage() {
  const nextEvent = agendaItems
    .filter(i => i.status === 'agendado')
    .sort((a, b) => a.date.localeCompare(b.date))[0]

  const recentAvisos = [...avisos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const nextAgenda = agendaItems
    .filter(i => i.status === 'agendado')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Hero Banner */}
      {nextEvent && (
        <Link href={`/agenda/${nextEvent.id}`}>
          <div className="rounded-2xl bg-primary text-primary-foreground p-5 space-y-2 shadow-sm">
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider flex items-center gap-1">
              <CalendarDays className="w-3.5 h-3.5" />
              Próximo na agenda
            </p>
            <h2 className="text-lg font-bold leading-tight">{nextEvent.title}</h2>
            <p className="text-sm text-white/80">
              {formatDate(nextEvent.date)} — {nextEvent.time}
            </p>
            <p className="text-xs text-white/60">{nextEvent.location}</p>
          </div>
        </Link>
      )}

      {/* Avisos e Notícias */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-base">Avisos e Notícias</h2>
          <Link href="/comunidade" className="text-xs text-primary flex items-center gap-0.5">
            Ver tudo <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {recentAvisos.slice(0, 5).map(aviso => (
            <AvisoCard key={aviso.id} aviso={aviso} />
          ))}
        </div>
      </section>

      {/* Próximos na Agenda */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-base">Próximos na Agenda</h2>
          <Link href="/agenda" className="text-xs text-primary flex items-center gap-0.5">
            Ver tudo <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {nextAgenda.map(item => (
            <Link key={item.id} href={`/agenda/${item.id}`}>
              <AgendaCard item={item} compact />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import { Users, Clock, ChevronRight } from 'lucide-react'
import { condominio } from '@/lib/mock-data/condominio'

export default function ReservasPage() {
  return (
    <div className="px-4 py-4 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Reservas</h1>
        <Link href="/reservas/minhas" className="text-sm text-primary font-medium">
          Minhas reservas
        </Link>
      </div>

      <p className="text-sm text-muted-foreground">
        Selecione uma área para ver disponibilidade e fazer sua reserva.
      </p>

      <div className="space-y-3">
        {condominio.areasComuns.map(area => (
          <Link key={area.id} href={`/reservas/${area.id}`}>
            <div className="rounded-xl border bg-card p-4 flex items-center gap-4 hover:border-primary/50 transition-colors">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-2xl">
                  {area.id === 'a1' ? '🎉' :
                   area.id === 'a2' ? '🍖' :
                   area.id === 'a3' ? '⚽' :
                   area.id === 'a4' ? '🍽️' : '💪'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{area.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    Até {area.capacity} pessoas
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {area.openTime}–{area.closeTime}
                  </span>
                </div>
                {area.priceNote && (
                  <p className="text-xs text-success mt-1">{area.priceNote}</p>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

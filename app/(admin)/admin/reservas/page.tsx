'use client'

import { useState } from 'react'
import { reservas } from '@/lib/mock-data/reservas'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Filter = 'todas' | 'pendente' | 'confirmada' | 'cancelada'

const statusConfig = {
  pendente: { label: 'Pendente', className: 'bg-warning/10 text-warning' },
  confirmada: { label: 'Confirmada', className: 'bg-success/10 text-success' },
  cancelada: { label: 'Cancelada', className: 'bg-muted text-muted-foreground' },
}

export default function AdminReservasPage() {
  const [filter, setFilter] = useState<Filter>('todas')

  const filtered = reservas.filter(r => filter === 'todas' || r.status === filter)

  return (
    <div className="px-4 py-4 md:px-6 space-y-5">
      <h1 className="text-xl font-bold">Reservas</h1>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {(['todas', 'pendente', 'confirmada', 'cancelada'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition-colors',
              filter === f
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border'
            )}
          >
            {f === 'todas' ? 'Todas' : statusConfig[f].label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(reserva => {
          const status = statusConfig[reserva.status]
          return (
            <div key={reserva.id} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm">{reserva.areaName}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {reserva.userName} — {reserva.unit}
                  </p>
                </div>
                <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full shrink-0', status.className)}>
                  {status.label}
                </span>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>{formatDate(reserva.date)} — {reserva.startTime} às {reserva.endTime}</p>
                <p>{reserva.guests} convidados</p>
                {reserva.notes && <p className="italic">&ldquo;{reserva.notes}&rdquo;</p>}
              </div>
              {reserva.status === 'pendente' && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-success hover:bg-success/90"
                    onClick={() => toast.success('Reserva confirmada!')}
                  >
                    Confirmar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-danger border-danger/30 hover:bg-danger/5"
                    onClick={() => toast.error('Reserva recusada.')}
                  >
                    Recusar
                  </Button>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">
            Nenhuma reserva encontrada.
          </p>
        )}
      </div>
    </div>
  )
}

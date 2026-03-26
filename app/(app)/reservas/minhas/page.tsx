'use client'

import Link from 'next/link'
import { ArrowLeft, CalendarCheck } from 'lucide-react'
import { reservas } from '@/lib/mock-data/reservas'
import { formatDate, cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const statusConfig = {
  pendente: { label: 'Pendente', className: 'bg-warning/10 text-warning' },
  confirmada: { label: 'Confirmada', className: 'bg-success/10 text-success' },
  cancelada: { label: 'Cancelada', className: 'bg-muted text-muted-foreground' },
}

export default function MinhasReservasPage() {
  // In mock: show all reservas as if they belong to the logged user
  const myReservas = reservas

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/reservas" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm">Minhas Reservas</h1>
      </header>

      <div className="px-4 py-4 space-y-3">
        {myReservas.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <CalendarCheck className="w-12 h-12 text-muted-foreground/30 mx-auto" />
            <p className="text-muted-foreground text-sm">Você ainda não tem reservas.</p>
            <Link href="/reservas" className={cn(buttonVariants({ variant: 'outline' }))}>
              Fazer reserva
            </Link>
          </div>
        ) : (
          myReservas.map(reserva => {
            const status = statusConfig[reserva.status]
            return (
              <div key={reserva.id} className="rounded-xl border bg-card p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm">{reserva.areaName}</h3>
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full shrink-0', status.className)}>
                    {status.label}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>{formatDate(reserva.date)} — {reserva.startTime} às {reserva.endTime}</p>
                  <p>{reserva.guests} convidados</p>
                  {reserva.notes && <p className="italic">&ldquo;{reserva.notes}&rdquo;</p>}
                </div>
                {reserva.status !== 'cancelada' && (
                  <button className="text-xs text-danger font-medium">
                    Cancelar reserva
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

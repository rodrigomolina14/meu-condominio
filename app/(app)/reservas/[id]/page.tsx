'use client'

import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Users, Clock, CheckCircle } from 'lucide-react'
import { condominio } from '@/lib/mock-data/condominio'
import { diasBloqueados } from '@/lib/mock-data/reservas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/user-context'
import { toast } from 'sonner'

function CalendarMini({ areaId, selected, onSelect }: {
  areaId: string
  selected: string
  onSelect: (d: string) => void
}) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const blocked = diasBloqueados[areaId] ?? []

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null as null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const monthLabel = today.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-sm font-semibold capitalize mb-3">{monthLabel}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
          <span key={i} className="text-muted-foreground font-medium py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isBlocked = blocked.includes(dateStr)
          const isPast = day < today.getDate()
          const isSelected = selected === dateStr
          const disabled = isBlocked || isPast

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={cn(
                'h-8 w-full rounded-lg text-xs font-medium transition-colors',
                isSelected && 'bg-primary text-primary-foreground',
                isBlocked && !isSelected && 'bg-danger/20 text-danger',
                isPast && !isSelected && 'text-muted-foreground/40 cursor-not-allowed',
                !disabled && !isSelected && 'hover:bg-primary/10'
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-danger/20 inline-block" />
          Ocupado
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-primary inline-block" />
          Selecionado
        </span>
      </div>
    </div>
  )
}

export default function ReservaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const area = condominio.areasComuns.find(a => a.id === id)
  if (!area) notFound()

  const { addReserva } = useUser()
  const [selectedDate, setSelectedDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [guests, setGuests] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !startTime || !endTime) {
      toast.error('Preencha todos os campos obrigatórios.')
      return
    }
    addReserva(`new-${Date.now()}`)
    setConfirmed(true)
    toast.success('Reserva solicitada com sucesso! Aguarde confirmação.')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/reservas" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm truncate">{area.name}</h1>
      </header>

      <div className="px-4 py-4 space-y-5">
        {/* Info */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold">{area.name}</h1>
          <p className="text-sm text-muted-foreground">{area.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" /> Até {area.capacity} pessoas
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" /> {area.openTime}–{area.closeTime}
            </span>
          </div>
        </div>

        {/* Rules */}
        <div className="rounded-xl border bg-card p-4 space-y-2">
          <h2 className="text-sm font-semibold">Regras de uso</h2>
          <ul className="space-y-1">
            {area.rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-primary mt-0.5">•</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar */}
        <div>
          <h2 className="text-sm font-semibold mb-3">Selecionar data</h2>
          <CalendarMini areaId={area.id} selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Form */}
        {confirmed ? (
          <div className="rounded-xl border bg-success/10 p-5 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-success mx-auto" />
            <p className="font-semibold">Reserva solicitada!</p>
            <p className="text-sm text-muted-foreground">Você receberá a confirmação em breve.</p>
            <Link href="/reservas/minhas">
              <Button variant="outline" className="mt-2 w-full">Ver minhas reservas</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-sm font-semibold">Detalhes da reserva</h2>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Início *</Label>
                <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Fim *</Label>
                <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Número de convidados</Label>
              <Input
                type="number"
                placeholder={`Máx. ${area.capacity}`}
                value={guests}
                onChange={e => setGuests(e.target.value)}
                min="1"
                max={area.capacity}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={!selectedDate}>
              Solicitar reserva
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

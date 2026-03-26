'use client'

import { useState } from 'react'
import Link from 'next/link'
import { agendaItems, AgendaType } from '@/lib/mock-data/agenda'
import { AgendaCard } from '@/components/cards/agenda-card'
import { cn } from '@/lib/utils'

type Filter = 'todos' | AgendaType

const filters: { value: Filter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'reuniao', label: 'Reuniões' },
  { value: 'reparo', label: 'Reparos' },
  { value: 'manutencao', label: 'Manutenção' },
]

export default function AgendaPage() {
  const [filter, setFilter] = useState<Filter>('todos')

  const filtered = agendaItems
    .filter(i => filter === 'todos' || i.type === filter)
    .sort((a, b) => a.date.localeCompare(b.date))

  // Group by month
  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, item) => {
    const monthKey = item.date.slice(0, 7)
    if (!acc[monthKey]) acc[monthKey] = []
    acc[monthKey].push(item)
    return acc
  }, {})

  const monthLabel = (key: string) => {
    const [year, month] = key.split('-')
    return new Date(+year, +month - 1, 1).toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="px-4 py-4 space-y-5">
      <h1 className="text-xl font-bold">Agenda</h1>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              'shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
              filter === f.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border hover:border-primary/50'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grouped list */}
      {Object.entries(grouped).map(([monthKey, items]) => (
        <section key={monthKey}>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 capitalize">
            {monthLabel(monthKey)}
          </h2>
          <div className="space-y-3">
            {items.map(item => (
              <Link key={item.id} href={`/agenda/${item.id}`}>
                <AgendaCard item={item} />
              </Link>
            ))}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-12">
          Nenhum item encontrado para este filtro.
        </p>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus } from 'lucide-react'
import { profissionais, categoryLabels, ProfissionalCategory } from '@/lib/mock-data/profissionais'
import { ProfissionalCard } from '@/components/cards/profissional-card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Filter = 'todos' | ProfissionalCategory

const allCategories = Object.keys(categoryLabels) as ProfissionalCategory[]

export default function ProfissionaisPage() {
  const [filter, setFilter] = useState<Filter>('todos')

  const filtered = profissionais.filter(
    p => p.status === 'aprovado' && (filter === 'todos' || p.category === filter)
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/comunidade" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm flex-1">Profissionais</h1>
        <Link href="/comunidade/profissionais/indicar" className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}>
          <Plus className="w-4 h-4 mr-1" />
          Indicar
        </Link>
      </header>

      <div className="px-4 py-4 space-y-4">
        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          <button
            onClick={() => setFilter('todos')}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
              filter === 'todos'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-muted-foreground border-border'
            )}
          >
            Todos
          </button>
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                filter === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background text-muted-foreground border-border'
              )}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="space-y-4">
          {filtered.map(p => (
            <Link key={p.id} href={`/comunidade/profissionais/${p.id}`}>
              <ProfissionalCard profissional={p} compact />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">
            Nenhum profissional nesta categoria.
          </p>
        )}
      </div>
    </div>
  )
}

import Link from 'next/link'
import { AlertTriangle, CalendarCheck, BarChart2, Megaphone, ChevronRight } from 'lucide-react'
import { ocorrencias } from '@/lib/mock-data/ocorrencias'
import { reservas } from '@/lib/mock-data/reservas'
import { enquetes } from '@/lib/mock-data/enquetes'
import { avisos } from '@/lib/mock-data/avisos'
import { OcorrenciaCard } from '@/components/cards/ocorrencia-card'

export default function AdminDashboardPage() {
  const abertas = ocorrencias.filter(o => o.status !== 'resolvida').length
  const pendentes = reservas.filter(r => r.status === 'pendente').length
  const enquetesAbertas = enquetes.filter(e => e.status === 'aberta').length

  const stats = [
    { label: 'Ocorrências abertas', value: abertas, href: '/admin/ocorrencias', icon: AlertTriangle, color: 'text-danger bg-danger/10' },
    { label: 'Reservas pendentes', value: pendentes, href: '/admin/reservas', icon: CalendarCheck, color: 'text-warning bg-warning/10' },
    { label: 'Enquetes ativas', value: enquetesAbertas, href: '/admin/enquetes', icon: BarChart2, color: 'text-primary bg-primary/10' },
    { label: 'Avisos publicados', value: avisos.length, href: '/admin/avisos', icon: Megaphone, color: 'text-accent bg-accent/10' },
  ]

  return (
    <div className="px-4 py-4 md:px-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Residencial Vila Nova</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <Link key={stat.href} href={stat.href}>
              <div className="rounded-xl border bg-card p-4 space-y-2 hover:border-primary/50 transition-colors">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Ações rápidas</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/admin/avisos">
            <div className="rounded-xl border bg-card p-4 text-center hover:border-primary/50 transition-colors">
              <Megaphone className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs font-medium">Novo aviso</p>
            </div>
          </Link>
          <Link href="/admin/enquetes">
            <div className="rounded-xl border bg-card p-4 text-center hover:border-primary/50 transition-colors">
              <BarChart2 className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs font-medium">Nova enquete</p>
            </div>
          </Link>
          <Link href="/admin/agenda">
            <div className="rounded-xl border bg-card p-4 text-center hover:border-primary/50 transition-colors">
              <CalendarCheck className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-xs font-medium">Novo evento</p>
            </div>
          </Link>
          <Link href="/admin/ocorrencias">
            <div className="rounded-xl border bg-card p-4 text-center hover:border-primary/50 transition-colors">
              <AlertTriangle className="w-5 h-5 text-warning mx-auto mb-1" />
              <p className="text-xs font-medium">Ver ocorrências</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent ocorrencias */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Ocorrências recentes</h2>
          <Link href="/admin/ocorrencias" className="text-xs text-primary flex items-center gap-0.5">
            Ver todas <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {ocorrencias.filter(o => o.status !== 'resolvida').slice(0, 3).map(o => (
            <Link key={o.id} href="/admin/ocorrencias">
              <OcorrenciaCard ocorrencia={o} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

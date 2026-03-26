import Link from 'next/link'
import { BarChart2, AlertTriangle, HardHat, ChevronRight } from 'lucide-react'
import { enquetes } from '@/lib/mock-data/enquetes'

export default function ComunidadePage() {
  const openEnquetes = enquetes.filter(e => e.status === 'aberta').length

  const sections = [
    {
      href: '/comunidade/enquetes',
      icon: BarChart2,
      title: 'Enquetes',
      description: 'Vote e acompanhe as decisões do condomínio',
      badge: openEnquetes > 0 ? `${openEnquetes} aberta${openEnquetes > 1 ? 's' : ''}` : null,
      color: 'bg-primary/10 text-primary',
    },
    {
      href: '/comunidade/ocorrencias',
      icon: AlertTriangle,
      title: 'Ocorrências',
      description: 'Abra e acompanhe ocorrências no condomínio',
      badge: null,
      color: 'bg-warning/10 text-warning',
    },
    {
      href: '/comunidade/profissionais',
      icon: HardHat,
      title: 'Profissionais',
      description: 'Diretório de profissionais indicados pelos moradores',
      badge: null,
      color: 'bg-success/10 text-success',
    },
  ]

  return (
    <div className="px-4 py-5 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Comunidade</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Participe ativamente do seu condomínio.
        </p>
      </div>

      <div className="space-y-4">
        {sections.map(section => {
          const Icon = section.icon
          return (
            <Link key={section.href} href={section.href}>
              <div className="rounded-xl border bg-card p-5 flex items-center gap-4 hover:border-primary/50 transition-colors">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${section.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{section.title}</h3>
                    {section.badge && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  CalendarCheck,
  BarChart2,
  AlertTriangle,
  HardHat,
  Settings,
  ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/avisos', label: 'Avisos', icon: Megaphone },
  { href: '/admin/agenda', label: 'Agenda', icon: CalendarDays },
  { href: '/admin/reservas', label: 'Reservas', icon: CalendarCheck },
  { href: '/admin/enquetes', label: 'Enquetes', icon: BarChart2 },
  { href: '/admin/ocorrencias', label: 'Ocorrências', icon: AlertTriangle },
  { href: '/admin/profissionais', label: 'Profissionais', icon: HardHat },
  { href: '/admin/condominio', label: 'Condomínio', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Painel do Síndico</p>
        <p className="text-sm font-semibold mt-0.5">Residencial Vila Nova</p>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {sidebarItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link
          href="/inicio"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao app
        </Link>
      </div>
    </aside>
  )
}

// Mobile top bar for admin
export function AdminTopBar() {
  const pathname = usePathname()
  const current = sidebarItems.find(i => i.href === pathname)

  return (
    <header className="md:hidden sticky top-0 z-40 bg-sidebar border-b border-sidebar-border px-4 h-14 flex items-center justify-between">
      <Link href="/inicio" className="p-1 -ml-1">
        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
      </Link>
      <p className="text-sm font-semibold">{current?.label ?? 'Admin'}</p>
      <div className="w-7" />
    </header>
  )
}

// Mobile bottom nav for admin
export function AdminBottomNav() {
  const pathname = usePathname()
  const mainItems = sidebarItems.slice(0, 5)

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
      <div className="flex">
        {mainItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

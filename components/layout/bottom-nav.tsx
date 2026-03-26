'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CalendarDays, CalendarCheck, Users, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { enquetes } from '@/lib/mock-data/enquetes'
import { useUser } from '@/lib/user-context'

const navItems = [
  { href: '/inicio', label: 'Início', icon: Home },
  { href: '/agenda', label: 'Agenda', icon: CalendarDays },
  { href: '/reservas', label: 'Reservas', icon: CalendarCheck },
  { href: '/comunidade', label: 'Comunidade', icon: Users },
  { href: '/perfil', label: 'Perfil', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  const { votes } = useUser()

  const openEnquetes = enquetes.filter(
    e => e.status === 'aberta' && !(e.id in votes)
  ).length

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
      <div className="flex">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          const isComunidade = href === '/comunidade'

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors',
                active
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {isComunidade && openEnquetes > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[9px] flex items-center justify-center font-bold">
                    {openEnquetes}
                  </span>
                )}
              </div>
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
      {/* Safe area for iOS home indicator */}
      <div className="h-safe-area-inset-bottom bg-background" />
    </nav>
  )
}

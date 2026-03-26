'use client'

import { Bell } from 'lucide-react'
import { condominio } from '@/lib/mock-data/condominio'
import { useUser } from '@/lib/user-context'
import { getInitials } from '@/lib/utils'

export function TopBar() {
  const { user } = useUser()

  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-md">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            RC
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold truncate max-w-[180px]">{condominio.name}</p>
            <p className="text-xs text-white/70">{condominio.city}, {condominio.state}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="relative p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full" />
          </button>

          {user && (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
              {getInitials(user.name)}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

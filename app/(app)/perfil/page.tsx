'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Bell, Info, ChevronRight, Building2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useUser } from '@/lib/user-context'
import { getInitials } from '@/lib/utils'
import { condominio } from '@/lib/mock-data/condominio'
import { useState } from 'react'

export default function PerfilPage() {
  const { user, logout } = useUser()
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)

  const handleLogout = () => {
    logout()
    router.replace('/splash')
  }

  const displayUser = user ?? { name: 'Morador', unit: 'Apto --', email: 'morador@exemplo.com' }

  return (
    <div className="px-4 py-4 space-y-6">
      <h1 className="text-xl font-bold">Perfil</h1>

      {/* User card */}
      <div className="rounded-xl border bg-card p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0">
          {getInitials(displayUser.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold truncate">{displayUser.name}</h2>
          <p className="text-sm text-muted-foreground">{displayUser.unit}</p>
          <p className="text-xs text-muted-foreground truncate">{displayUser.email}</p>
        </div>
      </div>

      {/* Condominio */}
      <div className="rounded-xl border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Meu Condomínio</span>
        </div>
        <div>
          <p className="text-sm font-medium">{condominio.name}</p>
          <p className="text-xs text-muted-foreground">{condominio.address}, {condominio.city} — {condominio.state}</p>
          <p className="text-xs text-muted-foreground">{condominio.phone}</p>
        </div>
      </div>

      {/* Settings */}
      <div className="rounded-xl border bg-card divide-y divide-border overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Notificações</span>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>

        <Link href="/comunidade/ocorrencias">
          <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Minhas ocorrências</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </Link>

        <Link href="/reservas/minhas">
          <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Minhas reservas</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 text-danger hover:bg-danger/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>

      {/* Hidden admin link */}
      <div className="text-center pt-4">
        <Link
          href="/admin/dashboard"
          className="text-xs text-muted-foreground/40 hover:text-muted-foreground transition-colors"
        >
          v1.0.0 — Meu Condomínio
        </Link>
      </div>
    </div>
  )
}

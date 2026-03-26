'use client'

import { useState } from 'react'
import { condominio } from '@/lib/mock-data/condominio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { toast } from 'sonner'

export default function AdminCondominioPage() {
  const [form, setForm] = useState({
    name: condominio.name,
    address: condominio.address,
    city: condominio.city,
    state: condominio.state,
    phone: condominio.phone,
    email: condominio.email,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Dados atualizados!')
  }

  return (
    <div className="px-4 py-4 md:px-6 space-y-6">
      <h1 className="text-xl font-bold">Dados do Condomínio</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Nome</Label>
          <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Endereço</Label>
          <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-1.5">
            <Label className="text-sm font-medium">Cidade</Label>
            <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">UF</Label>
            <Input value={form.state} maxLength={2} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Telefone</Label>
          <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">E-mail</Label>
          <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <Button type="submit" className="w-full">Salvar alterações</Button>
      </form>

      {/* Areas comuns summary */}
      <div className="space-y-3">
        <h2 className="font-semibold text-sm">Áreas Comuns ({condominio.areasComuns.length})</h2>
        {condominio.areasComuns.map(area => (
          <div key={area.id} className="rounded-xl border bg-card p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{area.name}</p>
              <p className="text-xs text-muted-foreground">Capacidade: {area.capacity} pessoas</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => toast.info('Edição de área em breve.')}>
              Editar
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

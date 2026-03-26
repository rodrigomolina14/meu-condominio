'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { agendaItems, AgendaType } from '@/lib/mock-data/agenda'
import { AgendaCard } from '@/components/cards/agenda-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

export default function AdminAgendaPage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '', type: 'reuniao' as AgendaType,
    date: '', time: '', location: '', description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Item adicionado à agenda!')
    setOpen(false)
  }

  const sorted = [...agendaItems].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div className="px-4 py-4 md:px-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Agenda</h1>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />Novo item
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader><DialogTitle>Novo Item na Agenda</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Tipo</Label>
                <Select value={form.type} onValueChange={v => v && setForm(f => ({ ...f, type: v as AgendaType }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reuniao">Reunião</SelectItem>
                    <SelectItem value="reparo">Reparo</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Título *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Data *</Label>
                  <Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Hora *</Label>
                  <Input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Local</Label>
                <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Descrição</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="resize-none min-h-[80px]" />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" className="flex-1">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {sorted.map(item => <AgendaCard key={item.id} item={item} />)}
      </div>
    </div>
  )
}

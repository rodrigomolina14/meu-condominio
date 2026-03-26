'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { enquetes } from '@/lib/mock-data/enquetes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function AdminEnquetesPage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', endsAt: '', options: ['', ''] })

  const addOption = () => setForm(f => ({ ...f, options: [...f.options, ''] }))
  const updateOption = (i: number, v: string) => setForm(f => ({
    ...f,
    options: f.options.map((o, idx) => idx === i ? v : o),
  }))
  const removeOption = (i: number) => setForm(f => ({
    ...f,
    options: f.options.filter((_, idx) => idx !== i),
  }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filledOptions = form.options.filter(Boolean)
    if (filledOptions.length < 2) {
      toast.error('Adicione pelo menos 2 opções.')
      return
    }
    toast.success('Enquete publicada!')
    setOpen(false)
  }

  return (
    <div className="px-4 py-4 md:px-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Enquetes</h1>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />Nova enquete
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Nova Enquete</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Pergunta *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Descrição</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="resize-none min-h-[60px]" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Prazo</Label>
                <Input type="date" value={form.endsAt} onChange={e => setForm(f => ({ ...f, endsAt: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Opções *</Label>
                {form.options.map((opt, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder={`Opção ${i + 1}`}
                      value={opt}
                      onChange={e => updateOption(i, e.target.value)}
                    />
                    {form.options.length > 2 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(i)}>
                        <Trash2 className="w-4 h-4 text-danger" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addOption}>
                  <Plus className="w-3.5 h-3.5 mr-1" />Adicionar opção
                </Button>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button type="submit" className="flex-1">Publicar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {enquetes.map(e => {
          const total = e.options.reduce((s, o) => s + o.votes, 0)
          return (
            <div key={e.id} className="rounded-xl border bg-card p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-full',
                  e.status === 'aberta' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                )}>
                  {e.status === 'aberta' ? 'Aberta' : 'Encerrada'}
                </span>
                <span className="text-xs text-muted-foreground">{total} votos</span>
              </div>
              <h3 className="font-semibold text-sm leading-snug">{e.title}</h3>
              <div className="space-y-2">
                {e.options.map((opt, i) => {
                  const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{opt.label}</span>
                        <span className="font-medium">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

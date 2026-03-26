'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { avisos, AvisoCategory } from '@/lib/mock-data/avisos'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const categoryLabels: Record<AvisoCategory, string> = {
  aviso: 'Aviso', noticia: 'Notícia', urgente: 'Urgente',
}
const categoryColors: Record<AvisoCategory, string> = {
  aviso: 'bg-warning/10 text-warning',
  noticia: 'bg-primary/10 text-primary',
  urgente: 'bg-danger/10 text-danger',
}

export default function AdminAvisosPage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', category: 'aviso' as AvisoCategory, body: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Aviso publicado!')
    setOpen(false)
    setForm({ title: '', category: 'aviso', body: '' })
  }

  return (
    <div className="px-4 py-4 md:px-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Avisos</h1>
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-1" />
          Novo aviso
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Novo Aviso</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Categoria</Label>
                <Select value={form.category} onValueChange={v => v && setForm(f => ({ ...f, category: v as AvisoCategory }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryLabels).map(([v, l]) => (
                      <SelectItem key={v} value={v}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Título *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Conteúdo *</Label>
                <Textarea
                  value={form.body}
                  onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                  className="min-h-[100px] resize-none"
                  required
                />
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
        {[...avisos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(aviso => (
          <div key={aviso.id} className="rounded-xl border bg-card p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', categoryColors[aviso.category])}>
                {categoryLabels[aviso.category]}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{timeAgo(aviso.createdAt)}</span>
                <button className="p-1 hover:text-primary transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 hover:text-danger transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-sm leading-snug">{aviso.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{aviso.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

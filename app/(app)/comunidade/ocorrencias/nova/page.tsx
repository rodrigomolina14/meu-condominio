'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

const categories = [
  { value: 'barulho', label: 'Barulho' },
  { value: 'vazamento', label: 'Vazamento' },
  { value: 'seguranca', label: 'Segurança' },
  { value: 'limpeza', label: 'Limpeza' },
  { value: 'equipamento', label: 'Equipamento com defeito' },
  { value: 'outro', label: 'Outro' },
]

export default function NovaOcorrenciaPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.category || !form.description) {
      toast.error('Preencha todos os campos.')
      return
    }
    toast.success('Ocorrência aberta com sucesso!')
    router.replace('/comunidade/ocorrencias')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/comunidade/ocorrencias" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm">Nova Ocorrência</h1>
      </header>

      <div className="px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Título *</Label>
            <Input
              placeholder="Descreva brevemente o problema"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Categoria *</Label>
            <Select
              value={form.category}
              onValueChange={v => v && setForm(f => ({ ...f, category: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Descrição *</Label>
            <Textarea
              placeholder="Descreva o problema com detalhes: local, horário, frequência..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="min-h-[120px] resize-none"
              required
            />
          </div>

          {/* Foto mock */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Foto (opcional)</Label>
            <button
              type="button"
              className="w-full h-28 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/50 transition-colors"
            >
              <Camera className="w-6 h-6" />
              <span className="text-xs">Toque para anexar foto</span>
            </button>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Abrir Ocorrência
          </Button>
        </form>
      </div>
    </div>
  )
}

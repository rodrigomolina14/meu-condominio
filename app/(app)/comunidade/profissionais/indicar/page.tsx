'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
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
import { categoryLabels } from '@/lib/mock-data/profissionais'
import { toast } from 'sonner'

export default function IndicarProfissionalPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', category: '', phone: '', description: '', reason: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.category || !form.phone) {
      toast.error('Preencha os campos obrigatórios.')
      return
    }
    toast.success('Indicação enviada! Será analisada pela administração.')
    router.replace('/comunidade/profissionais')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/comunidade/profissionais" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm">Indicar Profissional</h1>
      </header>

      <div className="px-4 py-5">
        <p className="text-sm text-muted-foreground mb-6">
          Indique um profissional de confiança para a comunidade. Após análise, será publicado no diretório.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Nome *</Label>
            <Input
              placeholder="Nome completo ou empresa"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Profissão *</Label>
            <Select value={form.category} onValueChange={v => v && setForm(f => ({ ...f, category: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a profissão" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Telefone *</Label>
            <Input
              type="tel"
              placeholder="(11) 99999-9999"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Descrição</Label>
            <Textarea
              placeholder="Descreva os serviços que ele oferece"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="resize-none min-h-[80px]"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Por que você indica?</Label>
            <Textarea
              placeholder="Conte sua experiência com este profissional"
              value={form.reason}
              onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
              className="resize-none min-h-[80px]"
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Enviar Indicação
          </Button>
        </form>
      </div>
    </div>
  )
}

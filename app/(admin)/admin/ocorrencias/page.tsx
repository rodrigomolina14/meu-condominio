'use client'

import { useState } from 'react'
import { ocorrencias } from '@/lib/mock-data/ocorrencias'
import { OcorrenciaCard } from '@/components/cards/ocorrencia-card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet'
import { formatDateTime } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type Filter = 'todas' | 'aberta' | 'em_andamento' | 'resolvida'
const statusConfig = {
  aberta: { label: 'Aberta', className: 'bg-danger/10 text-danger' },
  em_andamento: { label: 'Em andamento', className: 'bg-warning/10 text-warning' },
  resolvida: { label: 'Resolvida', className: 'bg-success/10 text-success' },
}

export default function AdminOcorrenciasPage() {
  const [filter, setFilter] = useState<Filter>('todas')
  const [selected, setSelected] = useState<typeof ocorrencias[0] | null>(null)
  const [reply, setReply] = useState('')

  const filtered = ocorrencias.filter(o => filter === 'todas' || o.status === filter)

  const handleReply = () => {
    if (!reply.trim()) return
    toast.success('Resposta enviada!')
    setReply('')
  }

  return (
    <div className="px-4 py-4 md:px-6 space-y-5">
      <h1 className="text-xl font-bold">Ocorrências</h1>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {(['todas', 'aberta', 'em_andamento', 'resolvida'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border capitalize transition-colors',
              filter === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-muted-foreground border-border'
            )}
          >
            {f === 'todas' ? 'Todas' : f === 'em_andamento' ? 'Em andamento' : statusConfig[f].label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(o => (
          <button key={o.id} onClick={() => setSelected(o)} className="w-full text-left">
            <OcorrenciaCard ocorrencia={o} />
          </button>
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={v => !v && setSelected(null)}>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="text-left text-sm leading-snug">{selected.title}</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', statusConfig[selected.status].className)}>
                    {statusConfig[selected.status].label}
                  </span>
                  <span className="text-xs text-muted-foreground">{selected.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">{selected.description}</p>

                {selected.messages.map((msg, i) => (
                  <div key={i} className={cn(
                    'rounded-xl p-3 space-y-1',
                    msg.role === 'sindico' ? 'bg-primary/5 border border-primary/10' : 'bg-muted'
                  )}>
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold">{msg.author}</span>
                      <span className="text-xs text-muted-foreground">{formatDateTime(msg.createdAt)}</span>
                    </div>
                    <p className="text-xs">{msg.body}</p>
                  </div>
                ))}

                <div className="space-y-4 pt-3 border-t">
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Atualizar status</p>
                    <Select defaultValue={selected.status}>
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aberta">Aberta</SelectItem>
                        <SelectItem value="em_andamento">Em andamento</SelectItem>
                        <SelectItem value="resolvida">Resolvida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Escreva uma resposta para o morador..."
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    className="resize-none min-h-[80px]"
                  />
                  <Button onClick={handleReply} className="w-full">
                    Enviar resposta
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

'use client'

import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { enquetes } from '@/lib/mock-data/enquetes'
import { useUser } from '@/lib/user-context'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function EnqueteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const enquete = enquetes.find(e => e.id === id)
  if (!enquete) notFound()

  const { votes, setVote } = useUser()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const voted = id in votes ? votes[id] : null
  const showResult = voted !== null || enquete.status === 'encerrada'

  const totalVotes = enquete.options.reduce((sum, o) => sum + o.votes, 0)

  const handleVote = () => {
    if (selectedOption === null) return
    setVote(id, selectedOption)
    toast.success('Voto registrado!')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/comunidade/enquetes" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm truncate">Enquete</h1>
      </header>

      <div className="px-4 py-4 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full',
              enquete.status === 'aberta'
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground'
            )}>
              {enquete.status === 'aberta' ? 'Aberta' : 'Encerrada'}
            </span>
            {enquete.status === 'aberta' && (
              <span className="text-xs text-muted-foreground">
                Até {new Date(enquete.endsAt + 'T00:00:00').toLocaleDateString('pt-BR')}
              </span>
            )}
          </div>
          <h1 className="text-lg font-bold leading-snug">{enquete.title}</h1>
          <p className="text-sm text-muted-foreground">{enquete.description}</p>
        </div>

        <div className="space-y-3">
          {enquete.options.map((option, i) => {
            const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0
            const isVoted = voted === i

            return showResult ? (
              <div key={i} className={cn(
                'rounded-xl border p-4 space-y-2',
                isVoted && 'border-primary bg-primary/5'
              )}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    {isVoted && <CheckCircle className="w-4 h-4 text-primary shrink-0" />}
                    {option.label}
                  </span>
                  <span className="text-sm font-bold text-primary shrink-0">{pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{option.votes} votos</p>
              </div>
            ) : (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                className={cn(
                  'w-full rounded-xl border p-4 text-left transition-colors',
                  selectedOption === i
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center',
                    selectedOption === i ? 'border-primary' : 'border-muted-foreground/30'
                  )}>
                    {selectedOption === i && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </div>
              </button>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {totalVotes} votos totais — {enquete.createdBy}
        </p>

        {!showResult && (
          <Button
            onClick={handleVote}
            disabled={selectedOption === null}
            className="w-full"
            size="lg"
          >
            Votar
          </Button>
        )}

        {voted !== null && enquete.status === 'aberta' && (
          <p className="text-center text-xs text-success">Seu voto foi registrado.</p>
        )}
      </div>
    </div>
  )
}

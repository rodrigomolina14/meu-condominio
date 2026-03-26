import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Phone, Star, User } from 'lucide-react'
import { profissionais, categoryLabels } from '@/lib/mock-data/profissionais'
import { getInitials } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default async function ProfissionalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const profissional = profissionais.find(p => p.id === id)
  if (!profissional) notFound()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b px-4 h-14 flex items-center gap-3">
        <Link href="/comunidade/profissionais" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <h1 className="font-semibold text-sm truncate">{categoryLabels[profissional.category]}</h1>
      </header>

      <div className="px-4 py-5 space-y-5">
        {/* Profile header */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
            {getInitials(profissional.name)}
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold leading-snug">{profissional.name}</h1>
            <p className="text-sm text-muted-foreground">{categoryLabels[profissional.category]}</p>
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4,5].map(star => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= Math.round(profissional.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`}
                />
              ))}
              <span className="text-sm font-medium ml-1">{profissional.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({profissional.totalReviews})</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{profissional.description}</p>

        {/* Contact */}
        <a
          href={`tel:${profissional.phone}`}
          className={buttonVariants({ size: 'lg' }) + ' w-full justify-center'}
        >
          <Phone className="w-4 h-4 mr-2" />
          {profissional.phone}
        </a>

        <p className="text-xs text-muted-foreground text-center">
          Indicado por {profissional.indicatedBy} ({profissional.indicatedUnit})
        </p>

        {/* Reviews */}
        {profissional.avaliacoes.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-semibold text-sm">Avaliações</h2>
            {profissional.avaliacoes.map((av, i) => (
              <div key={i} className="rounded-xl border bg-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{av.userName}</p>
                      <p className="text-xs text-muted-foreground">{av.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= av.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground/30'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">&ldquo;{av.comment}&rdquo;</p>
                <p className="text-xs text-muted-foreground/60">
                  {new Date(av.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

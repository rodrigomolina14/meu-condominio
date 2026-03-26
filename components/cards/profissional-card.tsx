import { Profissional, categoryLabels } from '@/lib/mock-data/profissionais'
import { Star, Phone } from 'lucide-react'
import { getInitials } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Props = {
  profissional: Profissional
  compact?: boolean
}

export function ProfissionalCard({ profissional, compact }: Props) {
  return (
    <div className="rounded-xl border bg-card p-4 space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
          {getInitials(profissional.name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-snug truncate">{profissional.name}</h3>
          <p className="text-xs text-muted-foreground">{categoryLabels[profissional.category]}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-medium">{profissional.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({profissional.totalReviews} avaliações)</span>
          </div>
        </div>
      </div>

      {!compact && (
        <p className="text-xs text-muted-foreground line-clamp-2">{profissional.description}</p>
      )}

      <a
        href={`tel:${profissional.phone}`}
        className={cn(
          'flex items-center gap-2 text-xs text-primary font-medium',
          compact && 'hidden'
        )}
      >
        <Phone className="w-3.5 h-3.5" />
        {profissional.phone}
      </a>
    </div>
  )
}

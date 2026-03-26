'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Bell, CalendarCheck, Users } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const slides = [
  {
    icon: Bell,
    title: 'Fique sempre informado',
    description: 'Receba avisos, notícias e alertas urgentes do seu condomínio em tempo real. Nunca perca um comunicado importante.',
  },
  {
    icon: CalendarCheck,
    title: 'Reserve com facilidade',
    description: 'Consulte a disponibilidade e reserve o salão de festas, churrasqueira, quadra e mais — sem sair de casa.',
  },
  {
    icon: Users,
    title: 'Participe da comunidade',
    description: 'Vote em enquetes, abra ocorrências e consulte profissionais de confiança indicados pelos seus vizinhos.',
  },
]

export default function WelcomePage() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    if (current < slides.length - 1) setCurrent(c => c + 1)
  }

  const slide = slides[current]
  const Icon = slide.icon
  const isLast = current === slides.length - 1

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip */}
      <div className="flex justify-end p-4">
        <Link href="/auth/login" className="text-sm text-muted-foreground">
          Entrar
        </Link>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{slide.title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{slide.description}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              i === current ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
            )}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="px-6 pb-10 space-y-3">
        {isLast ? (
          <>
            <Link href="/auth/register" className={cn(buttonVariants({ size: 'lg' }), 'w-full justify-center')}>
              Criar conta
            </Link>
            <Link href="/auth/login" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full justify-center')}>
              Já tenho conta
            </Link>
          </>
        ) : (
          <Button onClick={next} className="w-full" size="lg">
            Próximo
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  )
}

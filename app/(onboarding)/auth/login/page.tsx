'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useUser } from '@/lib/user-context'

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useUser()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock: any credentials accepted
    setUser({
      name: 'Morador',
      unit: 'Apto 00',
      email: form.email || 'morador@exemplo.com',
    })
    router.replace('/inicio')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex items-center px-4 h-14">
        <Link href="/welcome" className="p-1 -ml-1">
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
      </header>

      <div className="flex-1 px-6 pt-4">
        <h1 className="text-2xl font-bold mb-1">Entrar</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Acesse sua conta do condomínio
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Não tem conta?{' '}
          <Link href="/auth/register" className="text-primary font-medium">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useUser } from '@/lib/user-context'

export default function RegisterPage() {
  const router = useRouter()
  const { setUser } = useUser()
  const [form, setForm] = useState({ name: '', unit: '', email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.unit || !form.email) return
    setUser({ name: form.name, unit: form.unit, email: form.email })
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
        <h1 className="text-2xl font-bold mb-1">Criar conta</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Preencha seus dados para acessar o condomínio
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">Nome completo</Label>
            <Input
              id="name"
              placeholder="Seu nome"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="unit" className="text-sm font-medium">Unidade</Label>
            <Input
              id="unit"
              placeholder="Ex: Apto 32B"
              value={form.unit}
              onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Criar conta
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Já tem conta?{' '}
          <Link href="/auth/login" className="text-primary font-medium">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

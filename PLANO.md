# Meu Centro Espírita — Plano de Implementação

## Visão Geral

PWA multi-tenant para centros espíritas brasileiros. Modelo B2B2C:
- **Tenants:** os centros espíritas (cada um gerencia o próprio conteúdo)
- **Usuários finais:** frequentadores e visitantes

**Dois propósitos principais:**
1. Canal de comunicação do centro para com o frequentador
2. Plataforma de estudo, interação e consumo da doutrina espírita

**URL de produção sugerida:** `app.meucentroespirita.com.br`

---

## Stack Definitiva

| Camada         | Tecnologia                              | Motivo da escolha                                  |
|----------------|-----------------------------------------|----------------------------------------------------|
| Framework      | **Next.js 15** (App Router, TypeScript) | Estável, amplamente documentado, sem surpresas     |
| Estilo         | **Tailwind CSS v3** + **shadcn/ui**     | Compatibilidade total, ecossistema maduro          |
| Banco/Auth     | **Supabase**                            | BaaS completo: PostgreSQL, Auth, Storage, Realtime |
| Mapa           | **Mapbox GL JS**                        | Free tier generoso, melhor UX que Google Maps      |
| Leitor livros  | Viewer React customizado                | Controle total de fonte, tema, progresso           |
| Pagamento      | **Mercado Pago** (Fase 3)               | PIX nativo, split multi-tenant, popular no Brasil  |
| PWA            | **next-pwa**                            | Service worker, manifest, instalável               |
| Deploy         | **Vercel**                              | Integração nativa com Next.js                      |

> ⚠️ **Usar Next.js 15, não 16.** O v16 inclui arquivos automáticos de instrução para IAs
> (`AGENTS.md`, `CLAUDE.md`) que referenciam documentação incompleta do pacote.
> O v15 é mais estável, tem documentação farta e não tem esses arquivos.

---

## Comando de Setup Inicial

```bash
npx create-next-app@15 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint
```

Depois de criar o projeto:

```bash
# Instalar dependências base
npm install lucide-react class-variance-authority clsx tailwind-merge next-pwa

# Instalar Radix UI (base do shadcn)
npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-slot \
  @radix-ui/react-label @radix-ui/react-separator @radix-ui/react-badge

# Inicializar shadcn/ui (interativo — escolher: Default style, Slate color, CSS variables: yes)
npx shadcn-ui@latest init

# Adicionar componentes shadcn necessários
npx shadcn-ui@latest add button input card badge dialog sheet tabs
```

---

## Estrutura de Pastas do Projeto

```
/
├── app/
│   ├── (onboarding)/              ← sem nav bar
│   │   ├── layout.tsx
│   │   ├── splash/page.tsx        → Splash animada (logo + slogan)
│   │   ├── welcome/page.tsx       → 3 slides de apresentação
│   │   ├── auth/
│   │   │   ├── register/page.tsx  → Cadastro (nome, e-mail, senha)
│   │   │   └── login/page.tsx     → Login
│   │   └── selecionar-centro/
│   │       └── page.tsx           → Busca por nome/CEP + seleção do centro
│   │
│   ├── (app)/                     ← com bottom nav
│   │   ├── layout.tsx             → Shell: TopBar + BottomNav
│   │   ├── inicio/page.tsx        → Feed do centro + destaques
│   │   ├── agenda/
│   │   │   ├── page.tsx           → Lista de eventos por mês
│   │   │   └── [id]/page.tsx      → Detalhe do evento + inscrição
│   │   ├── atividades/
│   │   │   ├── page.tsx           → Hub: cards de Voluntariado, Bazar, Doação
│   │   │   ├── voluntariado/page.tsx → Lista de vagas + modal de inscrição
│   │   │   ├── bazar/
│   │   │   │   ├── page.tsx       → Grid de produtos
│   │   │   │   └── [id]/page.tsx  → Detalhe + botão reservar
│   │   │   └── doacao/page.tsx    → Tela de doação com PIX (mock na Fase 1)
│   │   ├── biblioteca/
│   │   │   ├── page.tsx           → Grid de capas de livros
│   │   │   └── [slug]/page.tsx    → Reader: fonte, fundo, tamanho
│   │   ├── radar/
│   │   │   ├── page.tsx           → Mapa Mapbox + lista de centros próximos
│   │   │   └── [id]/page.tsx      → Perfil público do centro
│   │   └── perfil/page.tsx        → Dados do usuário + centros favoritos + configs
│   │
│   ├── (admin)/                   ← painel admin, mesma app, área restrita
│   │   ├── layout.tsx             → Sidebar + header admin
│   │   └── admin/
│   │       ├── dashboard/page.tsx → Resumo do centro
│   │       ├── eventos/page.tsx   → CRUD de eventos
│   │       ├── avisos/page.tsx    → CRUD de comunicados
│   │       ├── voluntariado/page.tsx → CRUD de vagas
│   │       ├── bazar/page.tsx     → CRUD de produtos
│   │       └── centro/page.tsx    → Editar perfil do centro
│   │
│   ├── layout.tsx                 ← root layout (fontes, metadata, PWA meta tags)
│   ├── page.tsx                   ← redirect para /splash ou /inicio
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── bottom-nav.tsx
│   │   ├── top-bar.tsx
│   │   └── admin-sidebar.tsx
│   ├── cards/
│   │   ├── event-card.tsx
│   │   ├── book-card.tsx
│   │   ├── bazar-item-card.tsx
│   │   └── center-card.tsx
│   ├── reader/
│   │   └── book-reader.tsx        → Reader com controles de acessibilidade
│   └── ui/                        ← componentes shadcn (gerados automaticamente)
│
├── lib/
│   ├── mock-data/
│   │   ├── centers.ts
│   │   ├── events.ts
│   │   ├── books.ts
│   │   ├── bazar-items.ts
│   │   ├── volunteer-roles.ts
│   │   └── announcements.ts
│   └── utils.ts                   ← cn() helper do shadcn
│
├── public/
│   ├── manifest.json              ← PWA config
│   ├── icons/                     ← ícones 192x192, 512x512, apple-touch
│   └── images/
│
└── tailwind.config.ts
```

---

## Paleta de Cores e Identidade Visual

Adicionar ao `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#6B21A8',   // violeta principal
    light:   '#9333EA',
    dark:    '#4C1D95',
    foreground: '#FFFFFF',
  },
  accent: {
    DEFAULT: '#D97706',   // dourado
    light:   '#F59E0B',
    dark:    '#B45309',
  },
  sepia: '#F5ECD7',       // fundo modo sépia do reader
}
```

---

## Modelo de Dados (visão geral — implementado na Fase 2)

```sql
centers          id, slug, name, cep, city, state, lat, lng,
                 description, logo_url, phone, email, active

users            id, name, email, avatar_url  -- via Supabase Auth

user_centers     user_id, center_id, is_primary

events           id, center_id, title, description, date,
                 type (palestra|evento|reuniao|passe|especial), image_url

announcements    id, center_id, title, body, created_at

volunteer_roles  id, center_id, title, description, slots_available

volunteer_apps   id, user_id, role_id, status

donations        id, user_id, center_id, amount, method, mp_payment_id, status

bazar_items      id, center_id, title, description, price,
                 image_url, status (available|reserved|sold)

bazar_orders     id, user_id, item_id, status

books            id, slug, title, author, cover_url,
                 file_url, description, is_public_domain

prayer_requests  id, user_id, center_id, message, created_at
```

---

## Fase 1 — Esqueleto Visual (objetivo imediato)

**Meta:** App 100% navegável, todas as telas com dados mock/hardcoded, PWA instalável. Sem backend, sem auth real, sem chamadas externas (exceto o mapa).

### Dados Mock a criar em `/lib/mock-data/`

**`centers.ts`** — 5 centros fictícios com coordenadas reais de cidades brasileiras:
- Centro Espírita Luz do Caminho — São Paulo, SP
- Centro Espírita União e Caridade — Rio de Janeiro, RJ
- Centro Espírita Fraternidade — Belo Horizonte, MG
- Centro Espírita Seara do Bem — Curitiba, PR
- Centro Espírita Caminho da Paz — Porto Alegre, RS

**`events.ts`** — 8 eventos: palestras temáticas, sessões de passe, reuniões de estudo, eventos especiais

**`books.ts`** — 10 clássicos do espiritismo em domínio público:
- O Livro dos Espíritos (Allan Kardec)
- O Livro dos Médiuns (Allan Kardec)
- O Evangelho Segundo o Espiritismo (Allan Kardec)
- O Céu e o Inferno (Allan Kardec)
- A Gênese (Allan Kardec)
- Nosso Lar (André Luiz / Chico Xavier)
- Os Mensageiros (André Luiz / Chico Xavier)
- Missionários da Luz (André Luiz / Chico Xavier)
- Paulo e Estevão (Humberto Campos / Chico Xavier)
- A Caminho da Luz (Emmanuel / Chico Xavier)

**`bazar-items.ts`** — 12 itens: livros, artesanatos, roupas, objetos decorativos

**`volunteer-roles.ts`** — 4 vagas: apoio na recepção, apoio na cantina, desobsessão (aprendiz), biblioteca

**`announcements.ts`** — 5 avisos: mudança de horário, evento especial, aviso de manutenção, etc.

### Fluxo de Onboarding (sem auth real)

```
/splash
  └→ animação 2s com logo e slogan
       └→ /welcome

/welcome
  └→ 3 slides swipeable (proposta do app)
       └→ botão "Criar conta" → /auth/register
       └→ botão "Já tenho conta" → /auth/login

/auth/register
  └→ campos: nome, e-mail, senha
       └→ salva em localStorage (mock)
            └→ /selecionar-centro

/auth/login
  └→ campos: e-mail, senha
       └→ qualquer valor aceito (mock)
            └→ /selecionar-centro (se sem centro) ou /inicio

/selecionar-centro
  └→ campo de busca (filtra mock local por nome ou CEP)
       └→ lista de resultados (CenterCards)
            └→ click → salva centro_id no localStorage
                 └→ /inicio
```

### Telas Principais

**`/inicio`**
- TopBar com logo do centro e cidade
- Banner hero com próximo grande evento
- Seção "Próximas atividades" — 3 EventCards
- Seção "Avisos do centro" — lista de announcements
- Botão flutuante "💜 Pedir vibração" — abre modal com textarea

**`/agenda`**
- Filtro por tipo: Todos / Palestra / Passe / Reunião / Especial
- Lista agrupada por mês
- Click → `/agenda/[id]`: imagem, descrição, data, local, botão "Confirmar presença" (toast mock)

**`/atividades`**
- 3 cards grandes com ícone: Voluntariado / Bazar / Doação
- **Voluntariado** `/atividades/voluntariado`: lista de vagas com slots disponíveis → modal "Quero me inscrever"
- **Bazar** `/atividades/bazar`: grid 2 colunas → `/atividades/bazar/[id]`: foto, preço, status, botão "Reservar"
- **Doação** `/atividades/doacao`: valores sugeridos R$10/R$25/R$50/outro + botão "Gerar PIX" (mock, exibe QR fake)

**`/biblioteca`**
- Grid de capas (3 colunas no mobile)
- Click → `/biblioteca/[slug]`: reader
- **Reader:**
  - Conteúdo em parágrafos mock (3-4 parágrafos por "página")
  - Barra superior: título + botão fechar
  - Barra inferior flutuante: tamanho de fonte (A- / A / A+), tema (☀️ claro / 📜 sépia / 🌙 escuro)
  - Progresso salvo no localStorage

**`/radar`**
- Mapa Mapbox com pins dos 5 centros mock (token público do Mapbox)
- Lista scrollável abaixo do mapa com CenterCards
- Click no card/pin → `/radar/[id]`: nome, endereço, horários, próximos eventos, botão "Traçar rota" (link para Google Maps)

**`/perfil`**
- Avatar gerado automaticamente (initials) + nome + e-mail (do localStorage)
- "Meu centro principal" com nome e botão "Trocar centro"
- "Centros favoritos" (lista vazia com CTA)
- Configurações: notificações (toggle mock), tema da interface, sobre o app
- Link oculto no rodapé → acesso ao painel admin (para demo)

**`/admin/dashboard`**
- Header com "Painel Admin — [Nome do Centro]"
- Cards de resumo: X eventos, X itens no bazar, X inscritos no voluntariado
- Menu lateral (sidebar) com links para cada seção
- Todas as seções com tabelas/listas mock e botões de ação (sem submit real)

### PWA Config (`/public/manifest.json`)

```json
{
  "name": "Meu Centro Espírita",
  "short_name": "MCE",
  "description": "Seu centro espírita no celular",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6B21A8",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
```

Meta tags necessárias no `app/layout.tsx`:
```html
<meta name="theme-color" content="#6B21A8" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

---

## Fase 2 — Backend Real (após validação da UX)

1. Criar projeto no Supabase + configurar `.env.local`
2. Criar schema SQL completo com as tabelas do modelo de dados
3. Row Level Security (RLS):
   - Usuário vê apenas dados do seu centro ativo
   - Admin edita apenas o próprio centro
4. Supabase Auth: e-mail/senha + magic link + OAuth Google
5. Substituir todos os mocks por chamadas reais (React Query + Supabase client)
6. Geolocalização real: busca por CEP via API ViaCEP + cálculo de distância (Haversine)
7. Upload de livros no Supabase Storage (PDF ou texto)
8. Supabase Realtime: avisos do centro em tempo real no feed

---

## Fase 3 — Features Avançadas

1. **Mercado Pago:** integração PIX para doações e compras no bazar (Checkout Transparente)
2. **Push Notifications:** Web Push via service worker para novos eventos e avisos
3. **Admin panel completo:** CRUD real com validações + upload de imagens para eventos e bazar
4. **Lives:** embed de link YouTube/Zoom em eventos especiais
5. **Leitura offline:** service worker cacheando capítulos dos livros
6. **Onboarding de novos centros:** formulário de cadastro com aprovação por moderador
7. **Analytics:** painel de engajamento por centro (presenças confirmadas, pedidos de vibração, acessos)

---

## Arquivos Críticos da Fase 1

| Arquivo | O que faz |
|---|---|
| `app/(onboarding)/splash/page.tsx` | Splash animada |
| `app/(onboarding)/welcome/page.tsx` | 3 slides de onboarding |
| `app/(onboarding)/selecionar-centro/page.tsx` | Busca e seleção do centro |
| `app/(app)/layout.tsx` | Shell com TopBar + BottomNav |
| `app/(app)/inicio/page.tsx` | Feed principal |
| `app/(app)/agenda/page.tsx` | Lista de eventos |
| `app/(app)/atividades/page.tsx` | Hub de atividades |
| `app/(app)/biblioteca/page.tsx` | Grid de livros |
| `app/(app)/biblioteca/[slug]/page.tsx` | Reader de livros |
| `app/(app)/radar/page.tsx` | Mapa + centros próximos |
| `app/(app)/perfil/page.tsx` | Perfil do usuário |
| `app/(admin)/admin/dashboard/page.tsx` | Painel admin |
| `lib/mock-data/*.ts` | Todos os dados mock |
| `components/layout/bottom-nav.tsx` | Navegação inferior (5 abas) |
| `components/layout/top-bar.tsx` | Barra superior |
| `public/manifest.json` | Configuração PWA |
| `tailwind.config.ts` | Paleta de cores customizada |

---

## Checklist de Validação da Fase 1

Antes de considerar a Fase 1 concluída, validar:

- [ ] Fluxo completo: splash → welcome → cadastro mock → selecionar centro → home
- [ ] Todas as 5 abas do bottom nav navegam corretamente
- [ ] Agenda filtra por tipo de evento
- [ ] Bazar abre detalhe do item
- [ ] Reader de livro funciona com troca de tema (claro/sépia/escuro) e tamanho de fonte
- [ ] Radar exibe o mapa com pins dos centros mock
- [ ] `/admin/dashboard` acessível e todas as seções admin navegáveis
- [ ] PWA instalável: Chrome → "Adicionar à tela inicial"
- [ ] Responsivo em mobile (testar em 375px — iPhone SE)
- [ ] Sem erros no console em nenhuma tela

---

## Notas para a Sessão de Implementação

- Trabalhar **mobile-first** em tudo (375px base)
- Usar `'use client'` apenas onde há interatividade real (hooks, eventos)
- Dados mock ficam em `/lib/mock-data/` como arrays TypeScript tipados
- Estado de "centro ativo" e "usuário" via `localStorage` + React Context simples
- **Não instalar** nem configurar Supabase na Fase 1
- O token do Mapbox pode ser público no `.env.local` para o mapa do radar
- Manter componentes pequenos e focados — refatorar depois se necessário

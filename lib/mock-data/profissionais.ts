export type ProfissionalCategory =
  | 'encanador'
  | 'eletricista'
  | 'pintor'
  | 'marceneiro'
  | 'serralheiro'
  | 'mudanca'
  | 'ar-condicionado'
  | 'diarista'

export type Avaliacao = {
  userName: string
  unit: string
  rating: number
  comment: string
  date: string
}

export type Profissional = {
  id: string
  name: string
  category: ProfissionalCategory
  description: string
  phone: string
  imageUrl?: string
  rating: number
  totalReviews: number
  status: 'aprovado' | 'pendente'
  indicatedBy: string
  indicatedUnit: string
  avaliacoes: Avaliacao[]
}

export const profissionais: Profissional[] = [
  {
    id: 'p1',
    name: 'José Carlos Ferreira',
    category: 'encanador',
    description: 'Encanador com 15 anos de experiência. Especialista em vazamentos, instalação de registros, torneiras e chuveiros. Atende emergências.',
    phone: '(11) 99876-5432',
    rating: 4.8,
    totalReviews: 12,
    status: 'aprovado',
    indicatedBy: 'Marcos Oliveira',
    indicatedUnit: 'Apto 11C',
    avaliacoes: [
      { userName: 'Marcos Oliveira', unit: 'Apto 11C', rating: 5, comment: 'Resolveu o vazamento rápido e cobrou justo. Super recomendo!', date: '2026-02-10' },
      { userName: 'Ana Clara Souza', unit: 'Apto 31B', rating: 5, comment: 'Atendimento excelente, muito cuidadoso com a obra.', date: '2026-01-20' },
      { userName: 'Patricia Lima', unit: 'Apto 22B', rating: 4, comment: 'Bom serviço, pontual. Só demorou um pouco para chegar.', date: '2025-12-05' },
    ],
  },
  {
    id: 'p2',
    name: 'Roberto Lima Eletricidade',
    category: 'eletricista',
    description: 'Eletricista credenciado (NR-10). Instalações, quadros de distribuição, tomadas, iluminação e laudos técnicos. Emite ART.',
    phone: '(11) 98765-1234',
    rating: 4.9,
    totalReviews: 8,
    status: 'aprovado',
    indicatedBy: 'Eduardo Ramos',
    indicatedUnit: 'Apto 01A',
    avaliacoes: [
      { userName: 'Eduardo Ramos', unit: 'Apto 01A', rating: 5, comment: 'Profissional top! Instalou meu painel novo sem nenhum problema.', date: '2026-03-01' },
      { userName: 'Camila Duarte', unit: 'Apto 14B', rating: 5, comment: 'Muito competente, explica tudo que está fazendo.', date: '2026-01-15' },
    ],
  },
  {
    id: 'p3',
    name: 'Pinturas & Reforma Irmãos Santos',
    category: 'pintor',
    description: 'Serviços de pintura interna e externa, textura, grafiato e massa corrida. Orçamento gratuito. Mais de 200 apartamentos reformados.',
    phone: '(11) 97654-3210',
    rating: 4.6,
    totalReviews: 15,
    status: 'aprovado',
    indicatedBy: 'Ricardo Fernandes',
    indicatedUnit: 'Apto 82A',
    avaliacoes: [
      { userName: 'Ricardo Fernandes', unit: 'Apto 82A', rating: 5, comment: 'Pintaram meu apartamento em 3 dias, limpeza impecável!', date: '2026-02-20' },
      { userName: 'Juliana Martins', unit: 'Apto 31A', rating: 4, comment: 'Boa qualidade, mas precisa de uma semana de agendamento.', date: '2026-01-10' },
    ],
  },
  {
    id: 'p4',
    name: 'Marcenaria do Nei',
    category: 'marceneiro',
    description: 'Móveis planejados, reparos em marcenaria, portas, rodapés e acabamentos em madeira. Trabalho artesanal com qualidade de marcenaria de fábrica.',
    phone: '(11) 96543-2109',
    rating: 4.7,
    totalReviews: 6,
    status: 'aprovado',
    indicatedBy: 'Fernanda Costa',
    indicatedUnit: 'Apto 32B',
    avaliacoes: [
      { userName: 'Fernanda Costa', unit: 'Apto 32B', rating: 5, comment: 'Fez minha cozinha planejada por um terço do preço de loja.', date: '2026-01-30' },
      { userName: 'Bruno Alves', unit: 'Apto 51C', rating: 4, comment: 'Bom trabalho no meu guarda-roupa. Demorou um pouco mais que o previsto.', date: '2025-11-20' },
    ],
  },
  {
    id: 'p5',
    name: 'Carlos Serralheria',
    category: 'serralheiro',
    description: 'Grades, portões, fechaduras, box de banheiro e reparos em alumínio. Atendimento no condomínio com hora marcada.',
    phone: '(11) 95432-1098',
    rating: 4.5,
    totalReviews: 4,
    status: 'aprovado',
    indicatedBy: 'Roberto Nascimento',
    indicatedUnit: 'Apto 52A',
    avaliacoes: [
      { userName: 'Roberto Nascimento', unit: 'Apto 52A', rating: 4, comment: 'Consertou meu portão de garagem sem precisar comprar peças novas.', date: '2026-02-05' },
    ],
  },
  {
    id: 'p6',
    name: 'MudaBem Transportes',
    category: 'mudanca',
    description: 'Mudanças residenciais com equipe treinada, embalagem inclusa e seguro de carga. Preço justo e pontualidade garantida.',
    phone: '(11) 94321-0987',
    rating: 4.8,
    totalReviews: 10,
    status: 'aprovado',
    indicatedBy: 'Ana Clara Souza',
    indicatedUnit: 'Apto 31B',
    avaliacoes: [
      { userName: 'Ana Clara Souza', unit: 'Apto 31B', rating: 5, comment: 'Cuidaram de tudo, não quebrou nada! Equipe educada.', date: '2025-10-15' },
      { userName: 'Patricia Lima', unit: 'Apto 22B', rating: 5, comment: 'Muito rápido e organizado. Valeu cada centavo.', date: '2026-01-08' },
    ],
  },
  {
    id: 'p7',
    name: 'Frigelar Ar-Condicionado',
    category: 'ar-condicionado',
    description: 'Instalação, limpeza e manutenção de ar-condicionado. Todas as marcas. Serviço garantido com nota fiscal.',
    phone: '(11) 93210-9876',
    rating: 4.7,
    totalReviews: 9,
    status: 'aprovado',
    indicatedBy: 'Eduardo Ramos',
    indicatedUnit: 'Apto 01A',
    avaliacoes: [
      { userName: 'Eduardo Ramos', unit: 'Apto 01A', rating: 5, comment: 'Instalou meu split em 1h30, perfeito!', date: '2026-03-10' },
      { userName: 'Marcos Oliveira', unit: 'Apto 11C', rating: 4, comment: 'Higienização boa, mas o preço subiu em relação ao ano passado.', date: '2026-02-28' },
    ],
  },
  {
    id: 'p8',
    name: 'Limpeza Total — Diaristas',
    category: 'diarista',
    description: 'Serviço de diarista com produtos inclusos. Faxina completa ou manutenção. Disponibilidade em dias úteis. Exige agendamento com 48h.',
    phone: '(11) 92109-8765',
    rating: 4.4,
    totalReviews: 7,
    status: 'aprovado',
    indicatedBy: 'Juliana Martins',
    indicatedUnit: 'Apto 31A',
    avaliacoes: [
      { userName: 'Juliana Martins', unit: 'Apto 31A', rating: 4, comment: 'Bom serviço, mas precisa supervisionar a primeira vez.', date: '2026-03-05' },
      { userName: 'Camila Duarte', unit: 'Apto 14B', rating: 5, comment: 'Deixam o apartamento impecável! Super recomendo.', date: '2026-02-18' },
    ],
  },
]

export const categoryLabels: Record<ProfissionalCategory, string> = {
  encanador: 'Encanador',
  eletricista: 'Eletricista',
  pintor: 'Pintor',
  marceneiro: 'Marceneiro',
  serralheiro: 'Serralheiro',
  mudanca: 'Mudança',
  'ar-condicionado': 'Ar-Condicionado',
  diarista: 'Diarista',
}

export type AgendaType = 'reuniao' | 'reparo' | 'manutencao'
export type AgendaStatus = 'agendado' | 'em_andamento' | 'concluido'

export type AgendaItem = {
  id: string
  title: string
  description: string
  type: AgendaType
  date: string
  time: string
  location: string
  status: AgendaStatus
  estimatedDuration?: string
}

export const agendaItems: AgendaItem[] = [
  {
    id: 'ag1',
    title: 'Assembleia Geral Ordinária — 2º Trimestre',
    description: 'Pauta: prestação de contas do 1º trimestre, aprovação de obras emergenciais no estacionamento e eleição de membro para o conselho fiscal. Presença de todos os condôminos é importante.',
    type: 'reuniao',
    date: '2026-04-15',
    time: '19:30',
    location: 'Salão de Festas — Térreo',
    status: 'agendado',
    estimatedDuration: '2 horas',
  },
  {
    id: 'ag2',
    title: 'Reunião de Prestação de Contas — Março',
    description: 'Apresentação detalhada dos gastos de março, receitas de condomínio e projeção financeira para abril. Balancete estará disponível na portaria 3 dias antes.',
    type: 'reuniao',
    date: '2026-04-05',
    time: '10:00',
    location: 'Salão de Festas — Térreo',
    status: 'agendado',
    estimatedDuration: '1 hora',
  },
  {
    id: 'ag3',
    title: 'Reunião Extraordinária — Obra do Estacionamento',
    description: 'Votação do orçamento para reparo das juntas de dilatação e pintura do piso do estacionamento. Serão apresentadas 3 propostas de empresas.',
    type: 'reuniao',
    date: '2026-03-28',
    time: '19:00',
    location: 'Online — Link enviado por e-mail',
    status: 'agendado',
    estimatedDuration: '1h30',
  },
  {
    id: 'ag4',
    title: 'Manutenção Preventiva dos Elevadores',
    description: 'Revisão completa dos sistemas hidráulico e elétrico dos dois elevadores. Empresa: Thyssenkrupp Elevadores. Elevador social bloqueado; usar serviço.',
    type: 'manutencao',
    date: '2026-03-28',
    time: '08:00',
    location: 'Casa de máquinas — Cobertura',
    status: 'agendado',
    estimatedDuration: '2 dias',
  },
  {
    id: 'ag5',
    title: 'Pintura do Hall de Entrada — Bloco A',
    description: 'Reforma estética do hall de entrada do bloco A com nova pintura nas paredes e teto. Acesso normal mantido; proteção no piso.',
    type: 'reparo',
    date: '2026-04-07',
    time: '08:00',
    location: 'Hall de entrada — Bloco A',
    status: 'agendado',
    estimatedDuration: '3 dias',
  },
  {
    id: 'ag6',
    title: 'Revisão da Bomba D\'Água',
    description: 'Manutenção preventiva semestral da bomba de recalque. Pode haver variação na pressão da água por até 2 horas.',
    type: 'manutencao',
    date: '2026-04-10',
    time: '09:00',
    location: 'Casa de bombas — Subsolo',
    status: 'agendado',
    estimatedDuration: '3 horas',
  },
  {
    id: 'ag7',
    title: 'Limpeza das Caixas D\'Água',
    description: 'Higienização e desinfecção semestral obrigatória. Fornecimento de água interrompido das 8h às 14h. Guardar água com antecedência.',
    type: 'manutencao',
    date: '2026-04-10',
    time: '08:00',
    location: 'Barrilete — Cobertura',
    status: 'agendado',
    estimatedDuration: '6 horas',
  },
  {
    id: 'ag8',
    title: 'Troca de Luminárias — Corredor 3º Andar',
    description: 'Substituição de 12 lâmpadas fluorescentes por LED no corredor do 3º andar. Economia estimada de 40% no consumo dessa área.',
    type: 'reparo',
    date: '2026-03-15',
    time: '14:00',
    location: 'Corredor 3º Andar — Bloco A e B',
    status: 'concluido',
    estimatedDuration: '2 horas',
  },
]

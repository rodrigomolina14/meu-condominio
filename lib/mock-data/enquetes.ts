export type EnqueteStatus = 'aberta' | 'encerrada'

export type EnqueteOption = {
  label: string
  votes: number
}

export type Enquete = {
  id: string
  title: string
  description: string
  options: EnqueteOption[]
  endsAt: string
  status: EnqueteStatus
  createdBy: string
  totalVotes: number
}

export const enquetes: Enquete[] = [
  {
    id: 'e1',
    title: 'Aprovação da obra de impermeabilização da garagem',
    description: 'A administração recebeu três orçamentos para a obra de impermeabilização e recuperação das juntas de dilatação da garagem. O valor médio aprovado é de R$ 48.000,00, dividido em 6 parcelas no boleto. Você aprova a realização da obra?',
    options: [
      { label: 'Sim, aprovo a realização da obra', votes: 28 },
      { label: 'Não aprovo no momento', votes: 6 },
      { label: 'Aprovo, mas quero ver os orçamentos antes', votes: 12 },
    ],
    endsAt: '2026-04-10',
    status: 'aberta',
    createdBy: 'Síndica Maria Aparecida',
    totalVotes: 46,
  },
  {
    id: 'e2',
    title: 'Qual horário preferido para a assembleia de dezembro?',
    description: 'Para facilitar a participação do maior número possível de moradores, gostaríamos de saber o horário preferido para a Assembleia Geral de dezembro.',
    options: [
      { label: 'Sábado de manhã (10h)', votes: 15 },
      { label: 'Sábado à tarde (15h)', votes: 22 },
      { label: 'Segunda-feira à noite (19h30)', votes: 8 },
      { label: 'Quarta-feira à noite (19h30)', votes: 11 },
    ],
    endsAt: '2026-04-20',
    status: 'aberta',
    createdBy: 'Síndica Maria Aparecida',
    totalVotes: 56,
  },
  {
    id: 'e3',
    title: 'Contratação de empresa de jardinagem',
    description: 'Após visitas e apresentações de três empresas de jardinagem, pedimos a opinião dos moradores sobre a nova contratação.',
    options: [
      { label: 'Verde Vivo Jardinagem (R$ 1.200/mês)', votes: 41 },
      { label: 'Naturaleza Paisagismo (R$ 1.450/mês)', votes: 18 },
      { label: 'Não tenho preferência', votes: 9 },
    ],
    endsAt: '2026-02-28',
    status: 'encerrada',
    createdBy: 'Síndica Maria Aparecida',
    totalVotes: 68,
  },
  {
    id: 'e4',
    title: 'Aprovação de novo fornecedor de limpeza',
    description: 'O contrato atual de limpeza vence em março. Avaliamos duas propostas. A nova empresa oferece serviço 6 dias por semana pelo mesmo valor atual.',
    options: [
      { label: 'Renovar com a empresa atual', votes: 24 },
      { label: 'Contratar nova empresa', votes: 39 },
      { label: 'Avaliar mais propostas antes de decidir', votes: 7 },
    ],
    endsAt: '2026-03-01',
    status: 'encerrada',
    createdBy: 'Síndica Maria Aparecida',
    totalVotes: 70,
  },
]

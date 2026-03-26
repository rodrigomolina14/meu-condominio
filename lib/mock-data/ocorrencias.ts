export type OcorrenciaCategory =
  | 'barulho'
  | 'vazamento'
  | 'seguranca'
  | 'limpeza'
  | 'equipamento'
  | 'outro'

export type OcorrenciaStatus = 'aberta' | 'em_andamento' | 'resolvida'

export type OcorrenciaMsg = {
  author: string
  role: 'morador' | 'sindico'
  body: string
  createdAt: string
}

export type Ocorrencia = {
  id: string
  title: string
  category: OcorrenciaCategory
  description: string
  status: OcorrenciaStatus
  unit: string
  userName: string
  createdAt: string
  resolvedAt?: string
  messages: OcorrenciaMsg[]
}

export const ocorrencias: Ocorrencia[] = [
  {
    id: 'oc1',
    title: 'Barulho excessivo — Apto 42B após meia-noite',
    category: 'barulho',
    description: 'Nos últimos três finais de semana o apartamento 42B está fazendo muito barulho após meia-noite, com música alta e aglomeração. Já tentei falar pessoalmente mas não houve melhora.',
    status: 'aberta',
    unit: 'Apto 31A',
    userName: 'Juliana Martins',
    createdAt: '2026-03-24T22:30:00',
    messages: [
      {
        author: 'Juliana Martins',
        role: 'morador',
        body: 'Aconteceu novamente nessa sexta-feira (22/03). Tenho gravação de áudio se necessário.',
        createdAt: '2026-03-23T01:15:00',
      },
    ],
  },
  {
    id: 'oc2',
    title: 'Vazamento na área da garagem — próximo ao Box 15',
    category: 'vazamento',
    description: 'Há uma poça d\'água constante formando-se próximo ao box 15 da garagem. O piso está escorregadio e já houve quase uma queda. Parece vir do teto.',
    status: 'em_andamento',
    unit: 'Apto 11C',
    userName: 'Marcos Oliveira',
    createdAt: '2026-03-20T10:00:00',
    messages: [
      {
        author: 'Síndica Maria Aparecida',
        role: 'sindico',
        body: 'Já verificamos o local. O encanador estará na terça-feira (25/03) para diagnóstico. Colocamos placa de aviso de piso escorregadio.',
        createdAt: '2026-03-21T09:00:00',
      },
      {
        author: 'Marcos Oliveira',
        role: 'morador',
        body: 'Obrigado pelo retorno. Aguardo a resolução.',
        createdAt: '2026-03-21T10:30:00',
      },
    ],
  },
  {
    id: 'oc3',
    title: 'Lâmpada queimada — corredor do 3º andar',
    category: 'equipamento',
    description: 'A segunda lâmpada do corredor do 3º andar (lado direito) está queimada há uma semana. À noite o corredor fica muito escuro.',
    status: 'resolvida',
    unit: 'Apto 31B',
    userName: 'Ana Clara Souza',
    createdAt: '2026-03-10T18:00:00',
    resolvedAt: '2026-03-15T14:00:00',
    messages: [
      {
        author: 'Síndica Maria Aparecida',
        role: 'sindico',
        body: 'Obrigada pelo aviso! Incluímos na lista de manutenção desta semana.',
        createdAt: '2026-03-11T08:00:00',
      },
      {
        author: 'Síndica Maria Aparecida',
        role: 'sindico',
        body: 'Lâmpada substituída por LED hoje às 14h. Ocorrência encerrada.',
        createdAt: '2026-03-15T14:00:00',
      },
    ],
  },
  {
    id: 'oc4',
    title: 'Interfone com defeito — Bloco B, Apto 22',
    category: 'equipamento',
    description: 'Meu interfone não funciona há 5 dias. A portaria não consegue me chamar e não consigo abrir o portão pelo interfone. Problema sério de segurança.',
    status: 'em_andamento',
    unit: 'Apto 22B',
    userName: 'Patricia Lima',
    createdAt: '2026-03-18T08:00:00',
    messages: [
      {
        author: 'Síndica Maria Aparecida',
        role: 'sindico',
        body: 'Já acionamos a empresa de interfones. Técnico previsto para esta semana. Solicitamos que a portaria anote seu apartamento para avisar por celular até a resolução.',
        createdAt: '2026-03-18T09:30:00',
      },
    ],
  },
  {
    id: 'oc5',
    title: 'Lixo acumulado na escada de serviço',
    category: 'limpeza',
    description: 'Há sacos de lixo acumulados na escada de serviço do 5º andar há dois dias. Está gerando mau cheiro.',
    status: 'resolvida',
    unit: 'Apto 52A',
    userName: 'Roberto Nascimento',
    createdAt: '2026-03-22T07:30:00',
    resolvedAt: '2026-03-22T11:00:00',
    messages: [
      {
        author: 'Síndica Maria Aparecida',
        role: 'sindico',
        body: 'Resolvido! A limpeza removeu os sacos e o morador responsável foi notificado. Obrigada por reportar.',
        createdAt: '2026-03-22T11:00:00',
      },
    ],
  },
  {
    id: 'oc6',
    title: 'Câmera de segurança sem imagem — entrada lateral',
    category: 'seguranca',
    description: 'A câmera de monitoramento da entrada lateral (próxima ao jardim) está sem imagem. Verifiquei com o porteiro e ele confirmou que a tela do monitor está preta nesse ângulo.',
    status: 'aberta',
    unit: 'Apto 01A',
    userName: 'Eduardo Ramos',
    createdAt: '2026-03-25T16:00:00',
    messages: [],
  },
]

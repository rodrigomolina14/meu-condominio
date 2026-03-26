export type AvisoCategory = 'aviso' | 'noticia' | 'urgente'

export type Aviso = {
  id: string
  title: string
  body: string
  category: AvisoCategory
  createdAt: string
  author: string
}

export const avisos: Aviso[] = [
  {
    id: 'av1',
    title: 'URGENTE: Manutenção do Elevador — Bloqueio Programado',
    body: 'Informamos que o elevador social passará por manutenção preventiva obrigatória nos dias 28 e 29 de março (quinta e sexta-feira), das 8h às 17h. Durante esse período, utilize o elevador de serviço. Pedimos desculpas pelo inconveniente.',
    category: 'urgente',
    createdAt: '2026-03-25T09:00:00',
    author: 'Síndica Maria Aparecida',
  },
  {
    id: 'av2',
    title: 'Novo Regulamento Interno — Leia com Atenção',
    body: 'O regulamento interno foi atualizado pela assembleia de fevereiro. As principais mudanças envolvem horários de uso das áreas comuns, política de animais de estimação e novas regras para mudanças. O documento completo foi afixado nos quadros de aviso e enviado por e-mail.',
    category: 'aviso',
    createdAt: '2026-03-20T14:30:00',
    author: 'Síndica Maria Aparecida',
  },
  {
    id: 'av3',
    title: 'Mudança de Empresa de Segurança',
    body: 'A partir de 1º de abril, a segurança do condomínio passará a ser realizada pela empresa Vigilia Segurança Patrimonial. Os novos porteiros serão apresentados individualmente. Em caso de dúvidas, entre em contato com a administração.',
    category: 'aviso',
    createdAt: '2026-03-18T10:00:00',
    author: 'Síndica Maria Aparecida',
  },
  {
    id: 'av4',
    title: 'Assembleia de Fevereiro Aprovada com Sucesso',
    body: 'A Assembleia Geral Ordinária realizada em 15/02 contou com a participação de 67% dos condôminos — recorde de presença! Foram aprovados: o orçamento de 2026, a obra de impermeabilização da garagem e a contratação de nova empresa de jardinagem. Ata disponível na administração.',
    category: 'noticia',
    createdAt: '2026-02-16T08:00:00',
    author: 'Síndica Maria Aparecida',
  },
  {
    id: 'av5',
    title: 'Obra do Telhado Concluída com Sucesso',
    body: 'Temos a satisfação de informar que as obras de reforma e impermeabilização do telhado foram finalizadas dentro do prazo e do orçamento aprovado. O condomínio está garantido por mais 10 anos contra infiltrações. Agradecemos a paciência de todos durante o período de obras.',
    category: 'noticia',
    createdAt: '2026-03-10T16:00:00',
    author: 'Síndica Maria Aparecida',
  },
  {
    id: 'av6',
    title: 'Boas-vindas ao Novo Porteiro Noturno',
    body: 'Apresentamos o Sr. Carlos Henrique, nosso novo porteiro do turno noturno (22h às 6h). Carlos tem 8 anos de experiência em condomínios residenciais. Pedimos que todos se apresentem e contribuam para sua adaptação.',
    category: 'noticia',
    createdAt: '2026-03-15T12:00:00',
    author: 'Administração',
  },
  {
    id: 'av7',
    title: 'Limpeza da Caixa D\'Água — Agendada para Abril',
    body: 'A limpeza e desinfecção semestral das caixas d\'água está agendada para o dia 10 de abril (sexta-feira), das 8h às 14h. Durante esse período haverá interrupção do fornecimento de água. Recomendamos guardar água com antecedência.',
    category: 'aviso',
    createdAt: '2026-03-22T11:00:00',
    author: 'Síndica Maria Aparecida',
  },
  {
    id: 'av8',
    title: 'Vagas de Garagem — Atenção à Numeração',
    body: 'Devido a reclamações recorrentes, lembramos que cada unidade possui vagas numeradas e identificadas. Estacionar em vaga de terceiros é infração ao regulamento e sujeita a multa. Em caso de problemas com sua vaga, comunique imediatamente à portaria.',
    category: 'aviso',
    createdAt: '2026-03-12T09:30:00',
    author: 'Administração',
  },
]

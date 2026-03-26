export type AreaComum = {
  id: string
  name: string
  description: string
  capacity: number
  imageUrl: string
  rules: string[]
  availableDays: string[]
  openTime: string
  closeTime: string
  priceNote?: string
}

export type Condominio = {
  id: string
  slug: string
  name: string
  address: string
  city: string
  state: string
  phone: string
  email: string
  logoUrl?: string
  areasComuns: AreaComum[]
}

export const condominio: Condominio = {
  id: '1',
  slug: 'residencial-vila-nova',
  name: 'Residencial Vila Nova',
  address: 'Rua das Palmeiras, 400',
  city: 'São Paulo',
  state: 'SP',
  phone: '(11) 3344-5566',
  email: 'sindico@vilanoba.com.br',
  areasComuns: [
    {
      id: 'a1',
      name: 'Salão de Festas',
      description: 'Espaço completo para celebrações com capacidade para até 80 pessoas. Conta com cozinha equipada, mesas, cadeiras e sistema de som.',
      capacity: 80,
      imageUrl: '/images/salao-festas.jpg',
      rules: [
        'Reserva com mínimo de 48h de antecedência',
        'Devolução até meia-noite',
        'Limpeza de responsabilidade do morador',
        'Proibido som acima de 80dB após 22h',
        'Caução de R$ 200 cobrado no boleto seguinte',
      ],
      availableDays: ['sábado', 'domingo', 'feriado'],
      openTime: '10:00',
      closeTime: '00:00',
      priceNote: 'Gratuito para moradores em dia',
    },
    {
      id: 'a2',
      name: 'Churrasqueira',
      description: 'Área gourmet com churrasqueira a carvão, pia, geladeira e mesas. Acomoda até 30 pessoas.',
      capacity: 30,
      imageUrl: '/images/churrasqueira.jpg',
      rules: [
        'Reserva com mínimo de 24h de antecedência',
        'Proibido levar animais',
        'Limpeza obrigatória ao final',
        'Encerramento até 22h em dias de semana',
      ],
      availableDays: ['sexta', 'sábado', 'domingo', 'feriado'],
      openTime: '10:00',
      closeTime: '22:00',
    },
    {
      id: 'a3',
      name: 'Quadra Poliesportiva',
      description: 'Quadra coberta para futebol, vôlei e basquete. Vestiários disponíveis.',
      capacity: 20,
      imageUrl: '/images/quadra.jpg',
      rules: [
        'Uso de calçado esportivo obrigatório',
        'Reserva para uso exclusivo por até 1h',
        'Sem reserva: livre por ordem de chegada',
      ],
      availableDays: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'],
      openTime: '07:00',
      closeTime: '22:00',
    },
    {
      id: 'a4',
      name: 'Espaço Gourmet',
      description: 'Ambiente climatizado com ilha de cozinha, bancadas em granito e espaço para 20 pessoas.',
      capacity: 20,
      imageUrl: '/images/espaco-gourmet.jpg',
      rules: [
        'Disponível apenas nos finais de semana',
        'Mínimo 72h de antecedência',
        'Proibido uso de fritadeira',
      ],
      availableDays: ['sábado', 'domingo'],
      openTime: '12:00',
      closeTime: '22:00',
    },
    {
      id: 'a5',
      name: 'Academia',
      description: 'Espaço equipado com esteiras, bikes, musculação e área de alongamento.',
      capacity: 10,
      imageUrl: '/images/academia.jpg',
      rules: [
        'Uso de toalha obrigatório',
        'Calçado esportivo obrigatório',
        'Máximo de 1h em horários de pico',
        'Sem necessidade de reserva',
      ],
      availableDays: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'],
      openTime: '06:00',
      closeTime: '23:00',
    },
  ],
}

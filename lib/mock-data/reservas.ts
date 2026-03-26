export type ReservaStatus = 'pendente' | 'confirmada' | 'cancelada'

export type Reserva = {
  id: string
  areaId: string
  areaName: string
  userId: string
  userName: string
  unit: string
  date: string
  startTime: string
  endTime: string
  guests: number
  status: ReservaStatus
  createdAt: string
  notes?: string
}

// Reservas existentes — para bloquear dias no calendário mock
export const reservas: Reserva[] = [
  {
    id: 'r1',
    areaId: 'a1',
    areaName: 'Salão de Festas',
    userId: 'u2',
    userName: 'Ricardo Fernandes',
    unit: 'Apto 82A',
    date: '2026-04-05',
    startTime: '14:00',
    endTime: '22:00',
    guests: 50,
    status: 'confirmada',
    createdAt: '2026-03-20T10:00:00',
    notes: 'Festa de aniversário de 15 anos',
  },
  {
    id: 'r2',
    areaId: 'a1',
    areaName: 'Salão de Festas',
    userId: 'u3',
    userName: 'Camila Duarte',
    unit: 'Apto 14B',
    date: '2026-04-12',
    startTime: '16:00',
    endTime: '23:00',
    guests: 30,
    status: 'confirmada',
    createdAt: '2026-03-22T14:00:00',
  },
  {
    id: 'r3',
    areaId: 'a2',
    areaName: 'Churrasqueira',
    userId: 'u4',
    userName: 'Bruno Alves',
    unit: 'Apto 51C',
    date: '2026-03-29',
    startTime: '12:00',
    endTime: '19:00',
    guests: 15,
    status: 'confirmada',
    createdAt: '2026-03-24T09:00:00',
  },
  {
    id: 'r4',
    areaId: 'a4',
    areaName: 'Espaço Gourmet',
    userId: 'u5',
    userName: 'Fernanda Costa',
    unit: 'Apto 32B',
    date: '2026-04-19',
    startTime: '13:00',
    endTime: '20:00',
    guests: 12,
    status: 'pendente',
    createdAt: '2026-03-25T16:00:00',
  },
]

// Dias bloqueados por área (para o calendário)
export const diasBloqueados: Record<string, string[]> = {
  a1: ['2026-04-05', '2026-04-12', '2026-04-19', '2026-04-26'],
  a2: ['2026-03-29', '2026-04-05'],
  a3: [],
  a4: ['2026-04-19'],
  a5: [],
}

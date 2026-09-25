import type { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'srv-banho',
    nome: 'Banho',
    descricao: 'Banho completo com produtos adequados para o seu pet.',
    duracao: 60,
  },
  {
    id: 'srv-tosa',
    nome: 'Tosa',
    descricao: 'Tosa completa de acordo com o porte e necessidade do pet.',
    duracao: 90,
  },
  {
    id: 'srv-banho-tosa',
    nome: 'Banho + Tosa',
    descricao: 'Pacote completo de banho e tosa.',
    duracao: 120,
  },
  {
    id: 'srv-unhas',
    nome: 'Corte de Unhas',
    descricao: 'Corte cuidadoso das unhas do seu pet.',
    duracao: 30,
  },
];

export const AVAILABLE_TIMES = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

// Pre-existing occupied appointment for availability testing (BUG-003)
export const OCCUPIED_SLOTS: { data: string; horario: string }[] = [
  // Today's date is dynamic; we'll compute at runtime instead
];

export function getOccupiedSlots(appointments: { data: string; horario: string }[]): Set<string> {
  const set = new Set<string>();
  appointments.forEach((a) => set.add(`${a.data}|${a.horario}`));
  return set;
}

export function getTodayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function formatDateBR(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

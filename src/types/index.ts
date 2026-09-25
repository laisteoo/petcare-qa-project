export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

export type Especie = 'Cachorro' | 'Gato' | 'Outro';
export type Porte = 'Pequeno' | 'Médio' | 'Grande';

export interface Pet {
  id: string;
  userId: string;
  nome: string;
  especie: string;
  raca: string;
  porte: string;
  idade: string;
  observacoes: string;
}

export interface Service {
  id: string;
  nome: string;
  descricao: string;
  duracao: number;
}

export type StatusAgendamento = 'Confirmado' | 'Cancelado' | 'Concluído';

export interface Appointment {
  id: string;
  numero: string;
  userId: string;
  petId: string;
  petNome: string;
  serviceId: string;
  serviceNome: string;
  data: string;
  horario: string;
  status: StatusAgendamento;
}

export interface BookingDraft {
  petId: string | null;
  serviceId: string | null;
  data: string;
  horario: string;
  step: number;
}

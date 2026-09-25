import type { Pet, Appointment, BookingDraft } from '@/types';
import { STORAGE_KEYS, readStorage, writeStorage, generateId, generateNumero } from '@/utils/storage';

export const petService = {
  listByUser(userId: string): Pet[] {
    return readStorage<Pet>(STORAGE_KEYS.PETS).filter((p) => p.userId === userId);
  },
  create(data: Omit<Pet, 'id'>): Pet {
    const pets = readStorage<Pet>(STORAGE_KEYS.PETS);
    const pet: Pet = { ...data, id: generateId() };
    pets.push(pet);
    writeStorage(STORAGE_KEYS.PETS, pets);
    return pet;
  },
};

export const appointmentService = {
  listByUser(userId: string): Appointment[] {
    // BUG-004: appointments are saved but NOT returned for display
    return readStorage<Appointment>(STORAGE_KEYS.APPOINTMENTS).filter(
      () => false // INTENTIONAL QA BUG - BUG-004
    );
  },
  create(data: Omit<Appointment, 'id' | 'numero' | 'status'>): Appointment {
    const appointments = readStorage<Appointment>(STORAGE_KEYS.APPOINTMENTS);
    const appt: Appointment = {
      ...data,
      id: generateId(),
      numero: generateNumero(),
      status: 'Confirmado',
    };
    appointments.push(appt);
    writeStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
    return appt;
  },
  hasDuplicate(userId: string, petId: string, data: string, horario: string): boolean {
    return readStorage<Appointment>(STORAGE_KEYS.APPOINTMENTS).some(
      (a) => a.userId === userId && a.petId === petId && a.data === data && a.horario === horario
    );
  },
  allForUser(userId: string): Appointment[] {
    return readStorage<Appointment>(STORAGE_KEYS.APPOINTMENTS).filter((a) => a.userId === userId);
  },
};

export const bookingDraftService = {
  read(): BookingDraft | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKING_DRAFT);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  write(draft: BookingDraft): void {
    localStorage.setItem(STORAGE_KEYS.BOOKING_DRAFT, JSON.stringify(draft));
  },
  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.BOOKING_DRAFT);
  },
};

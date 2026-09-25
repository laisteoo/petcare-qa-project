export const STORAGE_KEYS = {
  USERS: 'petcare_users',
  PETS: 'petcare_pets',
  APPOINTMENTS: 'petcare_appointments',
  CURRENT_USER: 'petcare_current_user',
  BOOKING_DRAFT: 'petcare_booking_draft',
} as const;

export function readStorage<T>(key: string): T[] {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T[]) : [];
  } catch {
    return [];
  }
}

export function writeStorage<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function readSingle<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch {
    return null;
  }
}

export function writeSingle<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeStorage(key: string): void {
  localStorage.removeItem(key);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export function generateNumero(): string {
  return 'AG-' + Date.now().toString().slice(-6);
}

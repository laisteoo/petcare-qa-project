import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@/types';
import { STORAGE_KEYS, readStorage, writeStorage, readSingle, writeSingle, removeStorage, generateId } from '@/utils/storage';

interface AuthContextValue {
  user: User | null;
  login: (email: string, senha: string) => { success: boolean; message?: string };
  register: (nome: string, email: string, telefone: string, senha: string) => { success: boolean; message?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = readSingle<User>(STORAGE_KEYS.CURRENT_USER);
    if (stored) setUser(stored);
  }, []);

  const register = (nome: string, email: string, telefone: string, senha: string) => {
    const users = readStorage<User>(STORAGE_KEYS.USERS);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }
    const newUser: User = { id: generateId(), nome, email, telefone, senha };
    users.push(newUser);
    writeStorage(STORAGE_KEYS.USERS, users);
    return { success: true };
  };

  const login = (email: string, senha: string) => {
    const users = readStorage<User>(STORAGE_KEYS.USERS);
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );
    if (!found) {
      return { success: false, message: 'E-mail ou senha inválidos.' };
    }
    writeSingle(STORAGE_KEYS.CURRENT_USER, found);
    setUser(found);
    return { success: true };
  };

  const logout = () => {
    removeStorage(STORAGE_KEYS.CURRENT_USER);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

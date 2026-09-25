import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/services/auth';
import { PawPrint, LogOut, Home, Dog, Scissors, CalendarPlus, CalendarDays } from 'lucide-react';
import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-teal-600 font-bold text-lg">
            <PawPrint className="w-6 h-6" />
            PetCare
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          )}
        </div>
      </header>

      {user && (
        <nav className="bg-white border-b border-stone-200">
          <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto">
            <NavLink to="/dashboard" icon={<Home className="w-4 h-4" />} label="Início" />
            <NavLink to="/pets" icon={<Dog className="w-4 h-4" />} label="Meus Pets" />
            <NavLink to="/services" icon={<Scissors className="w-4 h-4" />} label="Serviços" />
            <NavLink to="/agendar" icon={<CalendarPlus className="w-4 h-4" />} label="Agendar" />
            <NavLink to="/agendamentos" icon={<CalendarDays className="w-4 h-4" />} label="Meus Agendamentos" />
          </div>
        </nav>
      )}

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">{children}</main>

      <footer className="bg-white border-t border-stone-200 py-4">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-stone-400">
          PetCare — Agendamento de Banho e Tosa
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-stone-600 hover:text-teal-600 hover:bg-stone-50 rounded-md whitespace-nowrap transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}

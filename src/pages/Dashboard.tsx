import { Link } from 'react-router-dom';
import { useAuth } from '@/services/auth';
import { petService, appointmentService } from '@/services/data';
import { Dog, Scissors, CalendarPlus, CalendarDays, Plus, PawPrint } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const pets = petService.listByUser(user.id);
  const appointments = appointmentService.listByUser(user.id);

  const cards = [
    { to: '/pets', icon: <Dog className="w-7 h-7" />, label: 'Meus Pets', count: pets.length },
    { to: '/services', icon: <Scissors className="w-7 h-7" />, label: 'Serviços', count: null },
    { to: '/agendar', icon: <CalendarPlus className="w-7 h-7" />, label: 'Agendar Serviço', count: null },
    { to: '/agendamentos', icon: <CalendarDays className="w-7 h-7" />, label: 'Meus Agendamentos', count: appointments.length },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6">
        <h1 className="text-2xl font-bold text-stone-800">
          Olá, {user.nome.split(' ')[0]}!
        </h1>
        <p className="text-stone-500 mt-1">Bem-vindo ao PetCare. O que deseja fazer hoje?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md hover:border-teal-200 transition-all group"
          >
            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-4 group-hover:bg-teal-100 transition-colors">
              {card.icon}
            </div>
            <p className="font-semibold text-stone-700">{card.label}</p>
            {card.count !== null && (
              <p className="text-sm text-stone-400 mt-1">{card.count} cadastrado(s)</p>
            )}
          </Link>
        ))}
      </div>

      {pets.length === 0 && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center gap-3">
          <PawPrint className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-700">
            Você ainda não cadastrou nenhum pet.{' '}
            <Link to="/pets/new" className="font-semibold underline">Cadastrar agora</Link>
          </p>
        </div>
      )}
    </div>
  );
}

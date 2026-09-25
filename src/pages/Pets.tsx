import { Link } from 'react-router-dom';
import { useAuth } from '@/services/auth';
import { petService } from '@/services/data';
import { Plus, Dog, PawPrint } from 'lucide-react';

export default function Pets() {
  const { user } = useAuth();
  if (!user) return null;

  const pets = petService.listByUser(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Meus Pets</h1>
          <p className="text-stone-500 text-sm mt-1">Gerencie os seus pets cadastrados</p>
        </div>
        <Link
          to="/pets/new"
          className="flex items-center gap-1.5 bg-teal-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Pet
        </Link>
      </div>

      {pets.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-100 shadow-sm">
          <Dog className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 mb-1">Você ainda não possui pets cadastrados.</p>
          <Link to="/pets/new" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
            Cadastrar meu primeiro pet
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                  <PawPrint className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-stone-800 truncate">{pet.nome || '(sem nome)'}</h3>
              </div>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stone-400">Espécie</dt>
                  <dd className="text-stone-700">{pet.especie || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-400">Raça</dt>
                  <dd className="text-stone-700">{pet.raca || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-400">Porte</dt>
                  <dd className="text-stone-700">{pet.porte || '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-400">Idade</dt>
                  <dd className="text-stone-700">{pet.idade || '—'}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

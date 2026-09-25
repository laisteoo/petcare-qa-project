import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/services/auth';
import { petService } from '@/services/data';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const ESPECIES = ['Cachorro', 'Gato', 'Outro'];
const PORTES = ['Pequeno', 'Médio', 'Grande'];

export default function RegisterPet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [porte, setPorte] = useState('');
  const [idade, setIdade] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // INTENTIONAL QA BUG - BUG-001
    // Expected: validate that nome, especie, and porte are mandatory.
    // Version 1.0: allows saving without these mandatory fields.
    //
    // INTENTIONAL QA BUG - BUG-007
    // Expected: enforce a max length on the pet name field.
    // Version 1.0: no maxLength attribute or validation on the nome field.

    petService.create({
      userId: user.id,
      nome,
      especie,
      raca,
      porte,
      idade,
      observacoes,
    });

    setSuccess(true);
    setTimeout(() => navigate('/pets'), 1500);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <p className="text-xl font-semibold text-stone-800">Pet cadastrado com sucesso!</p>
        <p className="text-stone-500 text-sm mt-1">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={() => navigate('/pets')}
        className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Meus Pets
      </button>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <h1 className="text-2xl font-bold text-stone-800 mb-1">Cadastrar Pet</h1>
        <p className="text-stone-500 text-sm mb-6">Preencha os dados do seu pet</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Nome do pet <span className="text-red-500">*</span>
            </label>
            {/* BUG-007: no maxLength on this input */}
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Nome do seu pet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Espécie <span className="text-red-500">*</span>
            </label>
            <select
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="">Selecione...</option>
              {ESPECIES.map((esp) => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Raça</label>
            <input
              type="text"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Raça do pet (opcional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Porte <span className="text-red-500">*</span>
            </label>
            <select
              value={porte}
              onChange={(e) => setPorte(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="">Selecione...</option>
              {PORTES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Idade</label>
            <input
              type="text"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Ex: 2 anos"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Observações</label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              placeholder="Informações adicionais (opcional)"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-semibold py-2.5 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Cadastrar Pet
          </button>
        </form>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { PawPrint, Scissors, Heart, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-stone-50 to-amber-50 flex flex-col">
      <header className="px-6 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-teal-600 font-bold text-xl">
          <PawPrint className="w-7 h-7" />
          PetCare
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-3">PetCare</h1>
          <p className="text-xl text-teal-600 font-medium mb-4">
            Cuidados para o seu pet, sem complicações.
          </p>
          <p className="text-stone-600 mb-8">
            Agende serviços de banho e tosa de forma simples e rápida.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-teal-600 font-semibold rounded-lg border-2 border-teal-600 hover:bg-teal-50 transition-colors"
            >
              Criar conta
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <FeatureCard icon={<Scissors className="w-8 h-8 text-teal-500" />} title="Banho & Tosa" desc="Serviços profissionais" />
            <FeatureCard icon={<Calendar className="w-8 h-8 text-teal-500" />} title="Agendamento" desc="Marque em minutos" />
            <FeatureCard icon={<Heart className="w-8 h-8 text-teal-500" />} title="Cuidado" desc="Com carinho e atenção" />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-stone-400">
        PetCare — Agendamento de Banho e Tosa
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-100">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="font-semibold text-stone-700">{title}</p>
      <p className="text-sm text-stone-500">{desc}</p>
    </div>
  );
}

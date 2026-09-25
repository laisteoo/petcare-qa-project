import { useNavigate } from 'react-router-dom';
import { SERVICES } from '@/services/catalog';
import { Clock, Scissors, CalendarPlus } from 'lucide-react';
import { bookingDraftService } from '@/services/data';

export default function Services() {
  const navigate = useNavigate();

  const handleAgendar = (serviceId: string) => {
    bookingDraftService.write({
      petId: null,
      serviceId,
      data: '',
      horario: '',
      step: 0,
    });
    navigate('/agendar');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-800 mb-1">Serviços</h1>
      <p className="text-stone-500 text-sm mb-6">Escolha um serviço para agendar</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 flex-shrink-0">
                <Scissors className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-stone-800 text-lg">{service.nome}</h3>
                <p className="text-sm text-stone-500 mt-1 mb-2">{service.descricao}</p>
                <div className="flex items-center gap-1.5 text-sm text-stone-400 mb-4">
                  <Clock className="w-4 h-4" />
                  {service.duracao} minutos
                </div>
                <button
                  onClick={() => handleAgendar(service.id)}
                  className="flex items-center gap-1.5 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Agendar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/services/auth';
import { petService, appointmentService, bookingDraftService } from '@/services/data';
import { SERVICES, AVAILABLE_TIMES, getTodayString, formatDateBR, getOccupiedSlots } from '@/services/catalog';
import { CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Calendar, Clock, Dog, Scissors, Check } from 'lucide-react';
import type { BookingDraft } from '@/types';

const STEPS = ['Pet', 'Serviço', 'Data', 'Horário', 'Revisão', 'Confirmação'];

export default function BookAppointment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const pets = user ? petService.listByUser(user.id) : [];
  const allUserAppointments = user ? appointmentService.allForUser(user.id) : [];
  const occupiedSet = getOccupiedSlots(allUserAppointments);

  const [draft, setDraft] = useState<BookingDraft>(() => {
    const saved = bookingDraftService.read();
    return saved ?? { petId: null, serviceId: null, data: '', horario: '', step: 0 };
  });
  const [error, setError] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<{
    numero: string; petNome: string; serviceNome: string; data: string; horario: string;
  } | null>(null);
  const confirmRef = useRef(false);

  useEffect(() => {
    bookingDraftService.write(draft);
  }, [draft]);

  const currentStep = draft.step;

  const goToStep = (step: number) => setDraft((d) => ({ ...d, step }));

  const handleSelectPet = (petId: string) => {
    setDraft((d) => ({ ...d, petId }));
  };

  const handleSelectService = (serviceId: string) => {
    setDraft((d) => ({ ...d, serviceId }));
  };

  const handleSelectData = (data: string) => {
    setDraft((d) => ({ ...d, data, horario: '' }));
  };

  const handleSelectHorario = (horario: string) => {
    setDraft((d) => ({ ...d, horario }));
  };

  const handleNext = () => {
    setError('');

    if (currentStep === 0) {
      // INTENTIONAL QA BUG - BUG-002
      // Expected: require at least one registered pet and a selected pet.
      // Version 1.0: allows proceeding without selecting a pet.
      goToStep(1);
      return;
    }

    if (currentStep === 1) {
      if (!draft.serviceId) {
        setError('Selecione um serviço para continuar.');
        return;
      }
      goToStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!draft.data) {
        setError('Selecione uma data para continuar.');
        return;
      }
      if (draft.data < getTodayString()) {
        setError('Não é possível realizar agendamentos para datas anteriores à data atual.');
        return;
      }
      goToStep(3);
      return;
    }

    if (currentStep === 3) {
      if (!draft.horario) {
        setError('Selecione um horário para continuar.');
        return;
      }
      goToStep(4);
      return;
    }
  };

  const handleBack = () => {
    setError('');
    if (currentStep > 0) goToStep(currentStep - 1);
  };

  const handleConfirm = () => {
    if (!user) return;
    if (confirmRef.current) return; // prevent double-creation
    confirmRef.current = true;
    setError('');

    // Duplicate check for same pet/date/time (this validation WORKS)
    if (draft.petId && appointmentService.hasDuplicate(user.id, draft.petId, draft.data, draft.horario)) {
      setError('Este pet já possui um agendamento neste horário.');
      confirmRef.current = false;
      return;
    }

    // INTENTIONAL QA BUG - BUG-003
    // Expected: block confirmation when the selected time slot is already occupied.
    // Version 1.0: allows confirming an appointment in an occupied time slot.
    // (The duplicate check above only prevents the SAME pet at same date/time.)

    const pet = pets.find((p) => p.id === draft.petId);
    const service = SERVICES.find((s) => s.id === draft.serviceId);

    const appt = appointmentService.create({
      userId: user.id,
      petId: draft.petId ?? '',
      petNome: pet?.nome ?? 'Sem pet',
      serviceId: draft.serviceId ?? '',
      serviceNome: service?.nome ?? 'Sem serviço',
      data: draft.data,
      horario: draft.horario,
    });

    setConfirmedAppointment({
      numero: appt.numero,
      petNome: appt.petNome,
      serviceNome: appt.serviceNome,
      data: appt.data,
      horario: appt.horario,
    });
    bookingDraftService.clear();
    goToStep(5);
  };

  const handleNewAppointment = () => {
    setDraft({ petId: null, serviceId: null, data: '', horario: '', step: 0 });
    setConfirmedAppointment(null);
    confirmRef.current = false;
  };

  if (currentStep === 5 && confirmedAppointment) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Agendamento realizado com sucesso!</h1>

          <div className="bg-stone-50 rounded-xl p-5 mt-6 text-left space-y-2">
            <Row label="Número do agendamento" value={confirmedAppointment.numero} />
            <Row label="Pet" value={confirmedAppointment.petNome} />
            <Row label="Serviço" value={confirmedAppointment.serviceNome} />
            <Row label="Data" value={formatDateBR(confirmedAppointment.data)} />
            <Row label="Horário" value={confirmedAppointment.horario} />
            <Row label="Status" value="Confirmado" highlight />
          </div>

          <div className="flex gap-3 mt-6 justify-center">
            <button
              onClick={handleNewAppointment}
              className="px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Novo Agendamento
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 bg-white text-stone-600 font-semibold rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors"
            >
              Ir para o Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedPet = pets.find((p) => p.id === draft.petId);
  const selectedService = SERVICES.find((s) => s.id === draft.serviceId);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-6 overflow-x-auto">
        {STEPS.slice(0, 5).map((label, idx) => (
          <div key={label} className="flex items-center flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              idx <= currentStep ? 'bg-teal-600 text-white' : 'bg-stone-200 text-stone-400'
            }`}>
              {idx < currentStep ? <Check className="w-4 h-4" /> : idx + 1}
            </div>
            <span className={`ml-1.5 text-xs ${idx <= currentStep ? 'text-stone-700 font-medium' : 'text-stone-400'}`}>
              {label}
            </span>
            {idx < 4 && <div className={`w-6 h-0.5 mx-2 ${idx < currentStep ? 'bg-teal-600' : 'bg-stone-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        {/* Step 0: Select Pet */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-lg font-bold text-stone-800 mb-1">Selecione o Pet</h2>
            <p className="text-stone-500 text-sm mb-4">Escolha o pet para o agendamento</p>
            {pets.length === 0 ? (
              <div className="text-center py-8">
                <Dog className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-stone-500 text-sm mb-4">
                  Nenhum pet cadastrado.
                </p>
                <button
                  onClick={() => goToStep(1)}
                  className="px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors text-sm"
                >
                  Continuar sem pet
                </button>
                {/* INTENTIONAL QA BUG - BUG-002
                    User can proceed without any registered pet. */}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pets.map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => handleSelectPet(pet.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      draft.petId === pet.id
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-stone-200 hover:border-teal-300'
                    }`}
                  >
                    <p className="font-semibold text-stone-800">{pet.nome || '(sem nome)'}</p>
                    <p className="text-sm text-stone-500">{pet.especie} • {pet.porte}</p>
                  </button>
                ))}
              </div>
            )}
            {/* BUG-002: No pet selected and no pets registered — still allowed to proceed */}
          </div>
        )}

        {/* Step 1: Select Service */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-bold text-stone-800 mb-1">Selecione o Serviço</h2>
            <p className="text-stone-500 text-sm mb-4">Escolha o serviço desejado</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    draft.serviceId === service.id
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-stone-200 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Scissors className="w-4 h-4 text-teal-600" />
                    <p className="font-semibold text-stone-800">{service.nome}</p>
                  </div>
                  <p className="text-sm text-stone-500">{service.descricao}</p>
                  <p className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.duracao} min
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-bold text-stone-800 mb-1">Selecione a Data</h2>
            <p className="text-stone-500 text-sm mb-4">Escolha a data do agendamento</p>
            <div className="relative">
              <Calendar className="w-5 h-5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
              <input
                type="date"
                value={draft.data}
                min="1900-01-01"
                onChange={(e) => handleSelectData(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <p className="text-xs text-stone-400 mt-2">
              Data atual: {formatDateBR(getTodayString())}
            </p>
          </div>
        )}

        {/* Step 3: Select Time */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-bold text-stone-800 mb-1">Selecione o Horário</h2>
            <p className="text-stone-500 text-sm mb-4">
              Horários disponíveis para {formatDateBR(draft.data)}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {AVAILABLE_TIMES.map((time) => {
                const isOccupied = occupiedSet.has(`${draft.data}|${time}`);
                return (
                  <button
                    key={time}
                    onClick={() => handleSelectHorario(time)}
                    className={`p-3 rounded-xl border-2 font-medium text-sm transition-all relative ${
                      draft.horario === time
                        ? 'border-teal-600 bg-teal-50 text-teal-700'
                        : isOccupied
                        ? 'border-stone-200 bg-stone-100 text-stone-400 line-through'
                        : 'border-stone-200 hover:border-teal-300 text-stone-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    {time}
                    {isOccupied && (
                      <span className="block text-[10px] mt-0.5">Ocupado</span>
                    )}
                    {/* INTENTIONAL QA BUG - BUG-003:
                         The occupied slot is visually marked but still clickable. */}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-bold text-stone-800 mb-1">Revise seu agendamento</h2>
            <p className="text-stone-500 text-sm mb-4">Confira os detalhes antes de confirmar</p>
            <div className="bg-stone-50 rounded-xl p-5 space-y-3">
              <Row label="Pet" value={selectedPet?.nome || 'Nenhum pet selecionado'} />
              <Row label="Serviço" value={selectedService?.nome || 'Nenhum serviço selecionado'} />
              <Row label="Data" value={formatDateBR(draft.data)} />
              <Row label="Horário" value={draft.horario} />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 text-stone-600 font-semibold rounded-lg border border-stone-300 hover:bg-stone-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Avançar
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
            >
              Confirmar agendamento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-stone-400 text-sm">{label}</span>
      <span className={`font-medium text-sm ${highlight ? 'text-green-600 font-semibold' : 'text-stone-800'}`}>
        {value}
      </span>
    </div>
  );
}

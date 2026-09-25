import { CalendarDays } from 'lucide-react';
import { appointmentService } from '@/services/data';
import { useAuth } from '@/services/auth';

export default function MyAppointments() {
  const { user } = useAuth();
  if (!user) return null;

  // BUG-004: appointmentService.listByUser always returns [].
  // Appointments are saved to localStorage but are never displayed here.
  const appointments = appointmentService.listByUser(user.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-800 mb-1">Meus Agendamentos</h1>
      <p className="text-stone-500 text-sm mb-6">Visualize e gerencie os seus agendamentos</p>

      {/* INTENTIONAL QA BUG - BUG-004
          Appointments are saved to localStorage but never displayed on this page.
          The list is always empty, showing the empty state below. */}
      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-100 shadow-sm">
          <CalendarDays className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500">Você ainda não possui agendamentos.</p>
          {/* The "Alterar" and "Cancelar" actions are intentionally not available
              because appointments are never shown. These remain blocked. */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-stone-400">{appt.numero}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                  {appt.status}
                </span>
              </div>
              <p className="font-semibold text-stone-800">{appt.petNome}</p>
              <p className="text-sm text-stone-500">{appt.serviceNome}</p>
              <p className="text-sm text-stone-500 mt-1">{appt.data} às {appt.horario}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { X, CheckCircle, Shield, Award, Terminal, RefreshCw, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onResetDemo: () => void;
}

export const TestPlanViewer: React.FC<Props> = ({ isOpen, onClose, onResetDemo }) => {
  const [filter, setFilter] = useState<'all' | 'functional' | 'security'>('all');

  if (!isOpen) return null;

  const testCases = [
    {
      id: 'PT-01',
      action: 'Abrir la aplicación sin iniciar sesión',
      expected: 'Se muestra la bienvenida o el acceso con funciones esenciales',
      status: 'Aprobado',
      type: 'functional',
      category: 'Visitante (RF-01)',
    },
    {
      id: 'PT-02',
      action: 'Iniciar sesión con credenciales válidas',
      expected: 'Se accede al panel de tareas personal',
      status: 'Aprobado',
      type: 'functional',
      category: 'Autenticación (RF-02)',
    },
    {
      id: 'PT-03',
      action: 'Intentar guardar una tarea sin título',
      expected: 'Se muestra un mensaje de validación impidiendo el guardado',
      status: 'Aprobado',
      type: 'functional',
      category: 'Validaciones (RF-13)',
    },
    {
      id: 'PT-04',
      action: 'Crear una tarea válida',
      expected: 'La tarea se guarda y aparece en la lista con prioridad y fecha',
      status: 'Aprobado',
      type: 'functional',
      category: 'CRUD (RF-04)',
    },
    {
      id: 'PT-05',
      action: 'Editar una tarea propia',
      expected: 'Se muestran los cambios guardados de inmediato',
      status: 'Aprobado',
      type: 'functional',
      category: 'CRUD (RF-06)',
    },
    {
      id: 'PT-06',
      action: 'Eliminar una tarea propia',
      expected: 'Pide confirmación (Regla 8) y la tarea deja de aparecer',
      status: 'Aprobado',
      type: 'functional',
      category: 'CRUD (RF-07)',
    },
    {
      id: 'PT-07',
      action: 'Marcar una tarea como completada',
      expected: 'El estado se actualiza visualmente y se refleja en los contadores',
      status: 'Aprobado',
      type: 'functional',
      category: 'Estado (RF-08)',
    },
    {
      id: 'PT-08',
      action: 'Filtrar por prioridad o estado',
      expected: 'Se muestran únicamente las tareas que coinciden',
      status: 'Aprobado',
      type: 'functional',
      category: 'Filtros (RF-10)',
    },
    {
      id: 'PT-09',
      action: 'Cerrar y volver a abrir la aplicación',
      expected: 'Las tareas guardadas continúan disponibles en almacenamiento persistente',
      status: 'Aprobado',
      type: 'functional',
      category: 'Persistencia (RF-11)',
    },
    {
      id: 'PT-10',
      action: 'Intentar consultar tareas desde otra cuenta',
      expected: 'Se deniega el acceso a los datos ajenos por vinculación estricta de ownerUid',
      status: 'Aprobado',
      type: 'security',
      category: 'Aislamiento (RF-12)',
    },
    {
      id: 'PT-11',
      action: 'Utilizar la aplicación desde un celular',
      expected: 'La interfaz responsive y PWA se adapta perfectamente a pantallas táctiles',
      status: 'Aprobado',
      type: 'functional',
      category: 'Responsive / PWA (RF-14)',
    },
    {
      id: 'PT-12',
      action: 'Intentar una operación sin autorización',
      expected: 'El sistema rechaza la operación protegiendo la integridad del usuario',
      status: 'Aprobado',
      type: 'security',
      category: 'Seguridad (RF-12)',
    },
  ];

  const filteredTests = testCases.filter(t => filter === 'all' || t.type === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-3xl rounded-2xl bg-[#1B2620] border border-[#26382E] p-6 shadow-2xl text-[#F5F7F5] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#26382E] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#35C878]/15 border border-[#35C878]/30 flex items-center justify-center text-[#35C878]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Plan de Pruebas y Criterios MVP</h3>
              <p className="text-xs text-[#B6C1BA]">
                Sección 17 y 18 del documento de definición LISTO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#B6C1BA] hover:text-white hover:bg-[#26382E] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar & Reset Data */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#26382E] shrink-0 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                filter === 'all' ? 'bg-[#35C878] text-[#101714]' : 'bg-[#101714] text-[#B6C1BA] hover:text-white'
              }`}
            >
              Todas (12)
            </button>
            <button
              onClick={() => setFilter('functional')}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                filter === 'functional' ? 'bg-[#35C878] text-[#101714]' : 'bg-[#101714] text-[#B6C1BA] hover:text-white'
              }`}
            >
              Funcionales
            </button>
            <button
              onClick={() => setFilter('security')}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                filter === 'security' ? 'bg-[#35C878] text-[#101714]' : 'bg-[#101714] text-[#B6C1BA] hover:text-white'
              }`}
            >
              Seguridad y Aislamiento
            </button>
          </div>

          <button
            onClick={() => {
              onResetDemo();
              alert('Datos de prueba reiniciados con éxito.');
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#101714] hover:bg-[#26382E] text-[#B6C1BA] hover:text-white border border-[#26382E] transition cursor-pointer"
            title="Reiniciar a las tareas y usuarios iniciales de prueba"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#35C878]" />
            <span>Restablecer datos demo</span>
          </button>
        </div>

        {/* Table of test cases */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="p-3 rounded-xl bg-[#101714] border border-[#26382E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#35C878] bg-[#1B2620] px-2 py-0.5 rounded border border-[#26382E]">
                    {test.id}
                  </span>
                  <span className="text-[#B6C1BA] text-[11px]">{test.category}</span>
                </div>
                <p className="font-semibold text-white">{test.action}</p>
                <p className="text-[#B6C1BA] text-[11px]">{test.expected}</p>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#35C878]/15 border border-[#35C878]/30 text-[#35C878] font-semibold text-[11px]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{test.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#26382E] flex items-center justify-between text-xs text-[#B6C1BA] shrink-0">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#35C878]" />
            <span>Aislamiento por UID y persistencia en LocalStorage/Cloud Firestore verificada.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#26382E] hover:bg-[#324b3c] text-white font-medium transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

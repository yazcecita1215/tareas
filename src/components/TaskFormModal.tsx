import React, { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';
import { X, CheckSquare, Calendar, AlignLeft, AlertCircle, AlertTriangle, Clock } from 'lucide-react';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    titulo: string;
    descripcion: string;
    prioridad: TaskPriority;
    estado?: TaskStatus;
    fechaLimite: string | null;
  }) => void;
  taskToEdit?: Task | null;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
}) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState<TaskPriority>('media');
  const [estado, setEstado] = useState<TaskStatus>('pendiente');
  const [fechaLimite, setFechaLimite] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setDescripcion(taskToEdit.descripcion || '');
      setPrioridad(taskToEdit.prioridad);
      setEstado(taskToEdit.estado);
      setFechaLimite(taskToEdit.fechaLimite || '');
    } else {
      setTitulo('');
      setDescripcion('');
      setPrioridad('media');
      setEstado('pendiente');
      // Default due date: tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFechaLimite(tomorrow.toISOString().split('T')[0]);
    }
    setError(null);
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Regla de Negocio 1 & 2 / PT-03: Validación obligatoria de título
    if (!titulo.trim()) {
      setError('El título de la tarea es obligatorio. No puede estar vacío (Regla de negocio 1).');
      return;
    }

    if (titulo.trim().length > 120) {
      setError('El título supera el límite máximo permitido de 120 caracteres.');
      return;
    }

    onSave({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      prioridad,
      estado,
      fechaLimite: fechaLimite || null,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-[#1B2620] border border-[#26382E] p-6 shadow-2xl text-[#F5F7F5] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#26382E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#35C878]/15 border border-[#35C878]/30 flex items-center justify-center text-[#35C878]">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">
                {taskToEdit ? 'Editar Tarea' : 'Crear Nueva Tarea'}
              </h3>
              <p className="text-xs text-[#B6C1BA]">
                {taskToEdit ? 'Modifica los detalles de tu actividad' : 'Registra tu actividad con prioridad y fecha límite'}
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

        {/* Validation error message (PT-03, RF-13) */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-[#E85D5D]/15 border border-[#E85D5D]/30 text-[#E85D5D] text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Título (Requerido) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#B6C1BA]">
                Título de la tarea <span className="text-[#35C878]">*</span>
              </label>
              <span className="text-[11px] text-[#B6C1BA]/60">
                {titulo.length}/120
              </span>
            </div>
            <input
              type="text"
              autoFocus
              maxLength={120}
              placeholder="Ej. Entregar reporte final de matemáticas"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#101714] border border-[#26382E] text-sm text-white placeholder-[#B6C1BA]/40 focus:outline-none focus:border-[#35C878] focus:ring-1 focus:ring-[#35C878]"
            />
          </div>

          {/* Descripción (Opcional) */}
          <div>
            <label className="block text-xs font-semibold text-[#B6C1BA] mb-1">
              Descripción detallada <span className="text-xs font-normal text-[#B6C1BA]/60">(Opcional)</span>
            </label>
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Añade notas, enlaces o pasos necesarios para completar la tarea..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#101714] border border-[#26382E] text-sm text-white placeholder-[#B6C1BA]/40 focus:outline-none focus:border-[#35C878] focus:ring-1 focus:ring-[#35C878] resize-none"
              />
            </div>
          </div>

          {/* Prioridad (Baja, Media, Alta) */}
          <div>
            <label className="block text-xs font-semibold text-[#B6C1BA] mb-1.5">
              Nivel de Prioridad <span className="text-[#35C878]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPrioridad('baja')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  prioridad === 'baja'
                    ? 'bg-[#35C878]/20 border-[#35C878] text-[#35C878] shadow-sm'
                    : 'bg-[#101714] border-[#26382E] text-[#B6C1BA] hover:text-white hover:bg-[#26382E]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Baja</span>
              </button>

              <button
                type="button"
                onClick={() => setPrioridad('media')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  prioridad === 'media'
                    ? 'bg-[#F2B84B]/20 border-[#F2B84B] text-[#F2B84B] shadow-sm'
                    : 'bg-[#101714] border-[#26382E] text-[#B6C1BA] hover:text-white hover:bg-[#26382E]'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Media</span>
              </button>

              <button
                type="button"
                onClick={() => setPrioridad('alta')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  prioridad === 'alta'
                    ? 'bg-[#E85D5D]/20 border-[#E85D5D] text-[#E85D5D] shadow-sm'
                    : 'bg-[#101714] border-[#26382E] text-[#B6C1BA] hover:text-white hover:bg-[#26382E]'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Alta</span>
              </button>
            </div>
          </div>

          {/* Fecha Límite & Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#B6C1BA] mb-1">
                Fecha límite de entrega
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={fechaLimite}
                  onChange={(e) => setFechaLimite(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#101714] border border-[#26382E] text-sm text-white focus:outline-none focus:border-[#35C878] focus:ring-1 focus:ring-[#35C878] [color-scheme:dark]"
                />
              </div>
            </div>

            {taskToEdit && (
              <div>
                <label className="block text-xs font-semibold text-[#B6C1BA] mb-1">
                  Estado actual
                </label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as TaskStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-[#101714] border border-[#26382E] text-sm text-white focus:outline-none focus:border-[#35C878] focus:ring-1 focus:ring-[#35C878]"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="completada">Completada</option>
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#26382E]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-xs font-semibold text-[#B6C1BA] hover:text-white transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#35C878] hover:bg-[#3ce187] text-[#101714] text-xs font-bold transition shadow-md cursor-pointer"
            >
              {taskToEdit ? 'Guardar Cambios' : 'Crear Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

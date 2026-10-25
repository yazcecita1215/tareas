import React from 'react';
import { Task } from '../types';
import { Check, Clock, AlertTriangle, AlertCircle, Calendar, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const isCompleted = task.estado === 'completada';

  // Priority metadata with accessible icons and colors (Section 11.1 & 20)
  const priorityConfig = {
    alta: {
      label: 'Alta',
      bg: 'bg-[#E85D5D]/15',
      text: 'text-[#E85D5D]',
      border: 'border-[#E85D5D]/30',
      icon: AlertCircle,
    },
    media: {
      label: 'Media',
      bg: 'bg-[#F2B84B]/15',
      text: 'text-[#F2B84B]',
      border: 'border-[#F2B84B]/30',
      icon: AlertTriangle,
    },
    baja: {
      label: 'Baja',
      bg: 'bg-[#35C878]/15',
      text: 'text-[#35C878]',
      border: 'border-[#35C878]/30',
      icon: Clock,
    },
  }[task.prioridad];

  const PriorityIcon = priorityConfig.icon;

  // Due date formatting and overdue calculation
  const getDueDateStatus = () => {
    if (!task.fechaLimite) return null;
    const today = new Date().toISOString().split('T')[0];
    const isPast = task.fechaLimite < today && !isCompleted;
    const isToday = task.fechaLimite === today && !isCompleted;

    const [year, month, day] = task.fechaLimite.split('-');
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const formatted = dateObj.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return {
      text: formatted,
      isPast,
      isToday,
    };
  };

  const dueDate = getDueDateStatus();

  return (
    <div
      className={`group relative rounded-2xl border p-4 sm:p-5 transition-all duration-200 ${
        isCompleted
          ? 'bg-[#151E19]/80 border-[#1E2B24] opacity-80'
          : 'bg-[#1B2620] border-[#26382E] hover:border-[#35C878]/40 hover:shadow-lg hover:shadow-black/20'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Accessible Checkbox */}
        <button
          type="button"
          role="checkbox"
          aria-checked={isCompleted}
          onClick={() => onToggleStatus(task.taskId)}
          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            isCompleted
              ? 'bg-[#35C878] text-[#101714] ring-2 ring-[#35C878]/30 shadow-sm'
              : 'border-2 border-[#2D4036] bg-[#101714] hover:border-[#35C878] text-transparent hover:text-[#35C878]/40'
          }`}
          title={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
        >
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Content body */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}
            >
              <PriorityIcon className="w-3 h-3" />
              <span>Prioridad {priorityConfig.label}</span>
            </span>

            {/* Status Badge */}
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#35C878]/10 text-[#35C878] border border-[#35C878]/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>Completada</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#101714] text-[#B6C1BA] border border-[#26382E]">
                <span>Pendiente</span>
              </span>
            )}

            {/* Due Date Badge */}
            {dueDate && (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  dueDate.isPast
                    ? 'bg-[#E85D5D]/15 text-[#E85D5D] border-[#E85D5D]/30 font-semibold animate-pulse'
                    : dueDate.isToday
                    ? 'bg-[#F2B84B]/15 text-[#F2B84B] border-[#F2B84B]/30 font-semibold'
                    : 'bg-[#101714] text-[#B6C1BA] border-[#26382E]'
                }`}
                title={dueDate.isPast ? 'Fecha límite vencida' : dueDate.isToday ? 'Vence hoy' : 'Fecha de entrega'}
              >
                <Calendar className="w-3 h-3" />
                <span>{dueDate.isPast ? `Vencida (${dueDate.text})` : dueDate.isToday ? `Vence hoy (${dueDate.text})` : dueDate.text}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h4
            className={`text-base sm:text-lg font-semibold tracking-tight transition-all break-words ${
              isCompleted
                ? 'line-through text-[#B6C1BA]/70'
                : 'text-white group-hover:text-[#F5F7F5]'
            }`}
          >
            {task.titulo}
          </h4>

          {/* Description */}
          {task.descripcion && (
            <p className="mt-1 text-xs sm:text-sm text-[#B6C1BA] leading-relaxed break-words whitespace-pre-wrap">
              {task.descripcion}
            </p>
          )}

          {/* Creation date info */}
          <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-[#B6C1BA]/60 border-t border-[#26382E]/40">
            <span>
              Creada el{' '}
              {new Date(task.fechaCreacion).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
              })}
            </span>

            {/* Action buttons (Edit & Delete) */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg text-[#B6C1BA] hover:text-white hover:bg-[#26382E] transition cursor-pointer"
                title="Editar tarea (RF-06)"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task)}
                className="p-1.5 rounded-lg text-[#B6C1BA] hover:text-[#E85D5D] hover:bg-[#E85D5D]/10 transition cursor-pointer"
                title="Eliminar tarea (RF-07)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

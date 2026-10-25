import React from 'react';
import { Task } from '../types';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  task,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-[#1B2620] border border-[#E85D5D]/30 p-6 shadow-2xl text-[#F5F7F5]">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#E85D5D]/20 border border-[#E85D5D]/40 flex items-center justify-center text-[#E85D5D] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base text-white">¿Eliminar esta tarea?</h3>
            <p className="mt-1 text-xs text-[#B6C1BA] leading-relaxed">
              Esta acción no se puede deshacer (Regla de negocio 8). La tarea dejará de aparecer en tu lista.
            </p>

            <div className="mt-3 p-3 rounded-xl bg-[#101714] border border-[#26382E] text-xs">
              <span className="font-semibold text-white">«{task.titulo}»</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#B6C1BA] hover:text-white hover:bg-[#26382E] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-xs font-semibold text-[#B6C1BA] hover:text-white transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-[#E85D5D] hover:bg-[#d64e4e] text-white text-xs font-bold transition shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Eliminar tarea</span>
          </button>
        </div>
      </div>
    </div>
  );
};

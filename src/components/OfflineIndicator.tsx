import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-[#F2B84B] px-4 py-2 text-xs sm:text-sm font-semibold text-[#101714] shadow-xl border border-black/10 animate-bounce">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>Modo sin conexión activo — Tus tareas guardadas se mantienen en el dispositivo</span>
    </div>
  );
};

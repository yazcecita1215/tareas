import React, { useState } from 'react';
import { User } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { LogOut, CheckSquare, Users, ShieldCheck, Wifi, WifiOff, FileText, ChevronDown } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  allUsers: User[];
  onLogout: () => void;
  onSwitchUser: (uid: string) => void;
  onOpenTestPlan: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  allUsers,
  onLogout,
  onSwitchUser,
  onOpenTestPlan,
  onOpenAuth,
}) => {
  const isOnline = useOnlineStatus();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#101714]/95 backdrop-blur-md border-b border-[#26382E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E2B24] to-[#15201A] border border-[#35C878]/30 flex items-center justify-center shadow-md shadow-[#35C878]/10 group">
            <CheckSquare className="w-5 h-5 text-[#35C878] transition-transform group-hover:scale-110" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">LISTO</span>
              <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-[#1B2620] text-[#35C878] border border-[#26382E]">
                MVP v0.1 • PWA
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-[#B6C1BA] font-normal leading-none mt-0.5">
              Organiza tus tareas, cumple tus metas
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Online/Offline status indicator */}
          <div
            title={isOnline ? 'Conexión activa' : 'Sin conexión'}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              isOnline
                ? 'bg-[#1B2620] text-[#B6C1BA] border-[#26382E]'
                : 'bg-[#F2B84B]/20 text-[#F2B84B] border-[#F2B84B]/40'
            }`}
          >
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#35C878] animate-pulse"></span>
                <span>En línea</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline</span>
              </>
            )}
          </div>

          {/* Academic Verification / Test Plan trigger */}
          <button
            onClick={onOpenTestPlan}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#B6C1BA] hover:text-white bg-[#1B2620] hover:bg-[#26382E] border border-[#26382E] transition cursor-pointer"
            title="Ver Criterios y Plan de Pruebas del Documento MVP (PT-01 a PT-12)"
          >
            <FileText className="w-3.5 h-3.5 text-[#35C878]" />
            <span className="hidden md:inline">Plan de Pruebas</span>
          </button>

          {/* Install PWA Button */}
          <PWAInstallButton variant="header" />

          {/* User state */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-[#1B2620] hover:bg-[#26382E] border border-[#26382E] transition text-left cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#35C878]/20 border border-[#35C878]/40 flex items-center justify-center text-xs font-bold text-[#35C878] overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.nombre} className="w-full h-full object-cover" />
                  ) : (
                    user.nombre.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div className="hidden lg:block text-xs">
                  <div className="font-semibold text-white leading-tight max-w-[120px] truncate">{user.nombre}</div>
                  <div className="text-[10px] text-[#B6C1BA] leading-none capitalize">{user.rol}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#B6C1BA]" />
              </button>

              {/* User switcher dropdown for testing user isolation (RF-12, PT-10) */}
              {showUserDropdown && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#1B2620] border border-[#26382E] shadow-2xl py-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  <div className="px-3.5 py-2 border-b border-[#26382E]">
                    <p className="text-xs font-medium text-white">{user.nombre}</p>
                    <p className="text-[11px] text-[#B6C1BA] truncate">{user.correo}</p>
                    <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-[#101714] text-[#35C878] border border-[#26382E]">
                      Rol: {user.rol}
                    </span>
                  </div>

                  <div className="px-3 py-2 text-[11px] font-semibold text-[#B6C1BA] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#35C878]" />
                    <span>Cambiar cuenta (Prueba PT-10)</span>
                  </div>

                  <div className="space-y-1 px-1.5">
                    {allUsers.map(u => (
                      <button
                        key={u.uid}
                        onClick={() => {
                          onSwitchUser(u.uid);
                          setShowUserDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition text-left cursor-pointer ${
                          u.uid === user.uid
                            ? 'bg-[#35C878]/15 text-[#35C878] font-medium border border-[#35C878]/30'
                            : 'text-[#B6C1BA] hover:text-white hover:bg-[#26382E]'
                        }`}
                      >
                        <div className="truncate">
                          <p className="font-medium">{u.nombre}</p>
                          <p className="text-[10px] opacity-75">{u.correo}</p>
                        </div>
                        {u.uid === user.uid && <ShieldCheck className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#26382E] px-1.5">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#E85D5D] hover:bg-[#E85D5D]/10 transition cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-1.5 rounded-lg bg-[#35C878] hover:bg-[#3ce187] text-[#101714] text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

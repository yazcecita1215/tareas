import React, { useState } from 'react';
import { storage } from '../services/storage';
import { User } from '../types';
import { X, Mail, Lock, User as UserIcon, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!password || password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    if (mode === 'register' && !nombre.trim()) {
      setError('Por favor ingresa tu nombre completo.');
      return;
    }

    try {
      const user = storage.loginWithEmail(email, mode === 'register' ? nombre : undefined);
      onSuccess(user);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al procesar la solicitud.');
    }
  };

  const handleGoogleLogin = () => {
    const user = storage.loginWithGoogle();
    onSuccess(user);
    onClose();
  };

  const handleQuickDemo = (demoEmail: string, demoName: string) => {
    const user = storage.loginWithEmail(demoEmail, demoName);
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-[#1B2620] border border-[#26382E] p-6 shadow-2xl text-[#F5F7F5]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#26382E]">
          <div>
            <h3 className="font-bold text-lg text-white">
              {mode === 'login' ? 'Iniciar Sesión en LISTO' : 'Crear Cuenta en LISTO'}
            </h3>
            <p className="text-xs text-[#B6C1BA] mt-0.5">
              Accede a tus tareas sincronizadas en la nube
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#B6C1BA] hover:text-white hover:bg-[#26382E] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-[#101714] p-1 mt-4 border border-[#26382E]">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              mode === 'login'
                ? 'bg-[#35C878] text-[#101714] shadow'
                : 'text-[#B6C1BA] hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              mode === 'register'
                ? 'bg-[#35C878] text-[#101714] shadow'
                : 'text-[#B6C1BA] hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-[#E85D5D]/15 border border-[#E85D5D]/30 text-[#E85D5D] text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-[#B6C1BA] mb-1">
                Nombre completo *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#B6C1BA] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ej. Ana Morales"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#101714] border border-[#26382E] text-sm text-white placeholder-[#B6C1BA]/50 focus:outline-none focus:border-[#35C878] focus:ring-1 focus:ring-[#35C878]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#B6C1BA] mb-1">
              Correo electrónico *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#B6C1BA] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#101714] border border-[#26382E] text-sm text-white placeholder-[#B6C1BA]/50 focus:outline-none focus:border-[#35C878] focus:ring-1 focus:ring-[#35C878]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B6C1BA] mb-1">
              Contraseña *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#B6C1BA] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#101714] border border-[#26382E] text-sm text-white placeholder-[#B6C1BA]/50 focus:outline-none focus:border-[#35C878] focus:ring-1 focus:ring-[#35C878]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#35C878] hover:bg-[#3ce187] text-[#101714] font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Ingresar</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Crear Cuenta</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#26382E]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#1B2620] px-2 text-[#B6C1BA]">o accede con</span>
          </div>
        </div>

        {/* Google / Quick access */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-2 px-3 rounded-xl bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continuar con Google</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemo('carlos.mendez@estudiante.edu', 'Carlos Méndez')}
              className="py-1.5 px-2 rounded-lg bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-[11px] text-[#B6C1BA] hover:text-white transition cursor-pointer text-center"
            >
              Demo: Carlos (Estudiante)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('laura.gomez@trabajo.com', 'Laura Gómez')}
              className="py-1.5 px-2 rounded-lg bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-[11px] text-[#B6C1BA] hover:text-white transition cursor-pointer text-center"
            >
              Demo: Laura (Profesional)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

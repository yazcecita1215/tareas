import React from 'react';
import { PWAInstallButton } from './PWAInstallButton';
import { CheckCircle2, Shield, Smartphone, Zap, Clock, Calendar, ArrowRight, UserCheck } from 'lucide-react';

interface WelcomeHeroProps {
  onLoginClick: () => void;
  onQuickDemoLogin: (email: string) => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  onLoginClick,
  onQuickDemoLogin,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-14 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2620] border border-[#26382E] text-xs font-medium text-[#35C878]">
          <span className="w-2 h-2 rounded-full bg-[#35C878] animate-ping" />
          <span>LISTO MVP 0.1 — Práctica Académica de Desarrollo Web</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Organiza tus tareas, <span className="text-[#35C878]">cumple tus metas.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#B6C1BA] max-w-2xl mx-auto leading-relaxed">
          Una aplicación web progresiva (PWA) diseñada para estudiantes y profesionales que necesitan
          registrar sus pendientes, asignar prioridades, fijar fechas límite y llevar el control diario
          con total seguridad y simplicidad.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onLoginClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#35C878] hover:bg-[#3ce187] text-[#101714] font-bold text-base shadow-lg shadow-[#35C878]/25 transition hover:scale-[1.02] active:scale-98 cursor-pointer"
          >
            <span>Comenzar ahora</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <PWAInstallButton variant="hero" />
        </div>

        {/* Quick Demo Accounts for Immediate Academic Evaluation */}
        <div className="pt-4 max-w-lg mx-auto bg-[#1B2620]/80 p-4 rounded-2xl border border-[#26382E] text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#35C878] mb-2 uppercase tracking-wide">
            <UserCheck className="w-4 h-4" />
            <span>Acceso rápido de demostración (Evaluación de pruebas)</span>
          </div>
          <p className="text-xs text-[#B6C1BA] mb-3">
            Inicia sesión con un solo clic con las cuentas de prueba para verificar el aislamiento estricto de tareas (RF-12 y PT-10):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => onQuickDemoLogin('carlos.mendez@estudiante.edu')}
              className="px-3 py-2 rounded-xl bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-left text-xs transition cursor-pointer group"
            >
              <div className="font-semibold text-white group-hover:text-[#35C878]">Carlos Méndez</div>
              <div className="text-[11px] text-[#B6C1BA]">Estudiante (Tareas académicas)</div>
            </button>
            <button
              onClick={() => onQuickDemoLogin('laura.gomez@trabajo.com')}
              className="px-3 py-2 rounded-xl bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-left text-xs transition cursor-pointer group"
            >
              <div className="font-semibold text-white group-hover:text-[#35C878]">Laura Gómez</div>
              <div className="text-[11px] text-[#B6C1BA]">Profesional (Tareas de oficina)</div>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Grid matching Section 7.1 of MVP definition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-[#1B2620] border border-[#26382E] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#35C878]/15 border border-[#35C878]/30 flex items-center justify-center text-[#35C878]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Control Total de Tareas</h3>
          <p className="text-xs sm:text-sm text-[#B6C1BA] leading-relaxed">
            Crea, edita, clasifica y marca tus actividades con validaciones de campos obligatorios y confirmación de borrado.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#1B2620] border border-[#26382E] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#35C878]/15 border border-[#35C878]/30 flex items-center justify-center text-[#35C878]">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Prioridades y Fechas Límite</h3>
          <p className="text-xs sm:text-sm text-[#B6C1BA] leading-relaxed">
            Asigna prioridad baja, media o alta con indicadores visuales accesibles y alerta de fechas de entrega próximas.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#1B2620] border border-[#26382E] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#35C878]/15 border border-[#35C878]/30 flex items-center justify-center text-[#35C878]">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">PWA e Instalación Directa</h3>
          <p className="text-xs sm:text-sm text-[#B6C1BA] leading-relaxed">
            Instálala en tu celular o computadora como app nativa, con soporte para continuar trabajando sin conexión.
          </p>
        </div>
      </div>

      {/* Security & Isolation Callout (Section 8 & 19) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#1B2620] via-[#1E2B24] to-[#1B2620] border border-[#26382E]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#35C878]/15 border border-[#35C878]/30 flex items-center justify-center text-[#35C878] shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">Privacidad y Aislamiento de Cuentas (RF-12)</h4>
            <p className="text-xs text-[#B6C1BA]">
              Cada usuario accede de forma exclusiva a sus propias tareas mediante vinculación estricta de <code className="text-[#35C878]">ownerUid</code>.
            </p>
          </div>
        </div>
        <button
          onClick={onLoginClick}
          className="shrink-0 px-4 py-2 rounded-xl bg-[#101714] hover:bg-[#26382E] border border-[#26382E] text-xs font-semibold text-white transition cursor-pointer"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

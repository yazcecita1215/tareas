import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, CheckCircle, Info, X } from 'lucide-react';

interface Props {
  variant?: 'header' | 'hero' | 'floating';
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already installed in standalone mode, show clean badge
  if (isInstalled) {
    if (variant === 'header') {
      return (
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#1B2620] text-[#35C878] border border-[#26382E]">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>PWA Instalada</span>
        </span>
      );
    }
    return null;
  }

  // Action trigger
  const handleAction = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  const buttonContent = (
    <>
      <Download className="w-4 h-4 animate-bounce" />
      <span>Instalar App</span>
    </>
  );

  return (
    <>
      {variant === 'header' && (
        <button
          onClick={handleAction}
          title="Instalar LISTO en tu dispositivo como aplicación PWA"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#35C878] hover:bg-[#3ce187] text-[#101714] text-xs sm:text-sm font-semibold shadow-sm transition active:scale-95 cursor-pointer"
        >
          {buttonContent}
        </button>
      )}

      {variant === 'hero' && (
        <button
          onClick={handleAction}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#35C878] hover:bg-[#3ce187] text-[#101714] text-base font-bold shadow-lg shadow-[#35C878]/20 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
        >
          <Download className="w-5 h-5" />
          <span>Instalar como Aplicación (PWA)</span>
        </button>
      )}

      {/* Guide Modal for browsers where beforeinstallprompt isn't fired yet or iOS */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#1B2620] border border-[#26382E] p-6 shadow-2xl text-[#F5F7F5]">
            <div className="flex items-center justify-between pb-4 border-b border-[#26382E]">
              <div className="flex items-center gap-2 text-[#35C878]">
                <Smartphone className="w-5 h-5" />
                <h3 className="font-bold text-lg text-white">Instalación de LISTO</h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded-lg text-[#B6C1BA] hover:text-white hover:bg-[#26382E] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm text-[#B6C1BA]">
              {isIOS ? (
                <div className="space-y-3 bg-[#101714] p-4 rounded-xl border border-[#26382E]">
                  <p className="font-semibold text-white">En iPhone o iPad (Safari):</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Toca el botón <strong>Compartir</strong> <span className="text-white">⎋</span> en la barra inferior de Safari.</li>
                    <li>Desplázate hacia abajo y selecciona <strong>«Agregar al inicio»</strong>.</li>
                    <li>Toca <strong>«Agregar»</strong> en la esquina superior derecha.</li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-3 bg-[#101714] p-4 rounded-xl border border-[#26382E]">
                  <p className="font-semibold text-white">En Chrome / Edge / Android:</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Presiona el icono de <strong>Instalar</strong> en la barra de direcciones o en el menú de tres puntos (⋮).</li>
                    <li>Selecciona <strong>«Instalar LISTO»</strong>.</li>
                    <li>¡Listo! Podrás abrirla directamente desde tu pantalla de inicio o escritorio sin barras de navegador.</li>
                  </ol>
                </div>
              )}

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#26382E]/50 text-xs text-[#B6C1BA]">
                <Info className="w-4 h-4 text-[#35C878] shrink-0 mt-0.5" />
                <span>
                  Al instalar LISTO como PWA obtienes acceso rápido, soporte sin conexión a internet y apariencia de app nativa.
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#35C878] hover:bg-[#3ce187] text-[#101714] font-semibold text-sm transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

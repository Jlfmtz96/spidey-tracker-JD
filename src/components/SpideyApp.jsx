import { useState, useEffect, useRef } from "react";
import TrackerMap from './TrackerMap.jsx';

function HangingSpidey() {
  return (
    <div className="spidey-drop-in">
      <div className="spidey-dangle">
        <span className="web" />
        <div className="spidey-sprite" aria-hidden="true" />
      </div>
    </div>
  );
}

const TERMINAL_LINES = [
  "INICIALIZANDO SPIDEY TRACKER v4.2.0...",
  "INICIANDO SERVICIOS PRINCIPALES [OK]",
  "INICIALIZANDO MOTOR DE RENDERIZADO DEL MAPA...",
  "CARGANDO RECURSO BASE: INTERFAZ [OK]",
  "CARGANDO RECURSO BASE: MÓDULO DE TICKER [OK]",
  "INICIANDO BUS DE EVENTOS [OK]",
  "CALIBRANDO MOTOR DE SPRITES [OK]",
  "PREPARANDO CACHÉ DE IMÁGENES...",
  "VERIFICANDO REGISTRO DE FUENTES [OK]",
  "CREANDO GRUPO DE CONEXIONES API..."
];

export default function SpideyApp() {
  const [step, setStep] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(null);
  const [visibleLines, setVisibleLines] = useState(0);

  const voiceRef = useRef(null);

  useEffect(() => {
    if (step === 0) {
      const interval = setInterval(() => {
        setVisibleLines((prev) => (prev < TERMINAL_LINES.length ? prev + 1 : prev));
      }, 250);
      
      const timer = setTimeout(() => setStep(1), 4500); 
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
    
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    const statusSpan = document.querySelector('.sound-status span');
    if (statusSpan) {
      if (step === 0) statusSpan.textContent = "CARGANDO";
      if (step === 1) statusSpan.textContent = "SELECCIONA UNA OPCIÓN DE SONIDO";
      if (step === 2) statusSpan.textContent = "CARGANDO";
      if (step === 3) statusSpan.textContent = "OBJETIVO LOCALIZADO: TOCA EL MARCADOR";
    }
  }, [step]);

  const handleSoundChoice = (isSoundOn) => {
    setSoundEnabled(isSoundOn);
    
    // Si el usuario elige activar el sonido, disparamos la voz de IA
    if (isSoundOn && voiceRef.current) {
      voiceRef.current.volume = 1.0; // Volumen al máximo
      voiceRef.current.play().catch(err => console.log("Audio bloqueado:", err));
    }
    
    setTimeout(() => setStep(2), 400);
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      
      {/* --- FASES 0 Y 1 --- */}
      <audio ref={voiceRef} src="/audio/spidey_intro.mp3" preload="auto" />

      {step < 2 && (
        <div className="boot-screen" style={{ position: 'relative', width: '100%', height: '100%' }}>
          
          {/* SPIDER-MAN: Anclado estrictamente arriba (top: 0). Jamás brincará. */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
            <HangingSpidey />
          </div>
          
          {/* EL MENÚ: Separado con padding para acomodarse elegantemente bajo Spidey */}
          {step === 1 && (
            <div className="menu-fade-in" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              paddingTop: '130px' /* Empuja los elementos debajo de la telaraña */
            }}>
              <p className="welcome">
                BIENVENIDO A SPIDEY TRACKER.<br />
                INTERACTÚA CON EL MAPA PARA DESCUBRIR<br />
                UN EVENTO QUE SE ACERCA.
              </p>
              <div className="loader" aria-hidden="true" style={{ marginBottom: '16px' }}>
                {Array.from({ length: 9 }, (_, index) => <span key={index} />)}
              </div>
              <p className="hint">ELIGE TU CONFIGURACIÓN Y EMPIEZA A RASTREAR</p>
              <div className="sound-row">
                <button
                  id="btn-react-sound-on"
                  className={`sound-btn ${soundEnabled === true ? 'active' : ''}`} 
                  onClick={() => handleSoundChoice(true)}
                >
                  SONIDO ACTIVADO
                </button>
                <button
                  id="btn-react-sound-off"
                  className={`sound-btn ${soundEnabled === false ? 'active' : ''}`} 
                  onClick={() => handleSoundChoice(false)}
                >
                  SONIDO DESACTIVADO
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- FASE 0: TERMINAL --- */}
      {step === 0 && (
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', textAlign: 'left', color: 'var(--spidey-text)', fontSize: '11px', lineHeight: '1.4', pointerEvents: 'none' }}>
          {TERMINAL_LINES.slice(0, visibleLines).map((line, index) => (
            <p key={index} style={{ margin: 0 }}>{line}</p>
          ))}
        </div>
      )}

      {/* --- FASES 2 y 3: CARGA Y MAPA --- */}
      {step === 2 && (
        <div className="boot-screen" style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
          <h2 style={{ color: 'var(--spidey-text)', fontSize: '18px' }}>INICIALIZANDO MAPA...</h2>
        </div>
      )}

      {step === 3 && (
        // Quitamos la clase "boot-screen" y usamos position: absolute para forzar el 100% real
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <TrackerMap soundEnabled={soundEnabled} />
        </div>
      )}

    </div>
  );
}
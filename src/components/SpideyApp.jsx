import { useState, useEffect } from 'react';
// import TrackerGoogleMap from './TrackerGoogleMap.jsx'; // Descomenta esto cuando el mapa esté listo

export default function SpideyApp() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    let currentProgress = "";
    const interval = setInterval(() => {
      if (currentProgress.length < 10) {
        currentProgress += "■";
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  if (isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        {/* <TrackerGoogleMap /> */}
        <p>EL MAPA CARGARÁ AQUÍ...</p>
      </div>
    );
  }

  return (
    // Contenedor principal
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#34404d] text-[#8ba3bd] text-[10px] md:text-xs text-center p-4">
      
      {/* Hilo de telaraña y máscara */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-0.5 h-24 bg-white/50"></div>
        <img 
          src="/spidey-hanging.png" 
          alt="Spidey" 
          className="w-12 h-12 object-contain animate-bounce"
          onError={(e) => {
            e.target.style.display = 'none'; // Oculta la imagen si no existe
            e.target.insertAdjacentHTML('afterend', '<span class="text-red-500 text-2xl">🕷️</span>'); // Muestra un emoji temporal
          }}
        />
      </div>
      
      <p className="mb-4 leading-loose max-w-lg">
        BIENVENIDO A SPIDEY TRACKER.<br/>
        INTERACTÚA CON EL MAPA PARA VER<br/>
        AVISTAMIENTOS DE [NOMBRE] EN TODO EL MUNDO.
      </p>

      {/* Barra de carga */}
      <div className="text-cyan-400 mb-6 tracking-widest text-lg h-6">
        {progress.padEnd(10, '□')}
      </div>

      <p className="mb-4 text-[#8ba3bd]">ELIGE TU CONFIGURACIÓN Y EMPIEZA A RASTREAR</p>

      {/* Botones Retro */}
      <div className="flex flex-wrap justify-center gap-4">
        <button 
          onClick={() => setIsLoaded(true)}
          className="border-2 border-[#5a86b5] bg-[#4a6382] text-white px-8 py-2 rounded-md hover:bg-white hover:text-black transition-colors"
        >
          SONIDO ACTIVADO
        </button>
        <button 
          onClick={() => setIsLoaded(true)}
          className="border-2 border-[#40546b] bg-[#2a3441] text-[#6b829c] px-8 py-2 rounded-md hover:bg-[#5a86b5] hover:text-white transition-colors"
        >
          SONIDO DESACTIVADO
        </button>
      </div>
    </div>
  );
}
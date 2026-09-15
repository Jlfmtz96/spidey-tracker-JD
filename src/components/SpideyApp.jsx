import { useState, useEffect } from "react";
// import TrackerGoogleMap from './TrackerMap.jsx';

// function HangingSpidey() {
//   return (
//     <div className="spidey-dangle">
//       <span className="web" />
//       {/* <svg
//         className="spidey"
//         viewBox="0 0 32 40"
//         width="42"
//         height="52"
//         aria-hidden="true"
//       >
//         <rect x="14" y="0" width="4" height="6" fill="#d9e4ee" />
//         <rect x="8" y="6" width="16" height="14" fill="#c81e1e" />
//         <rect x="10" y="8" width="5" height="6" fill="#f2f6fb" />
//         <rect x="17" y="8" width="5" height="6" fill="#f2f6fb" />
//         <rect x="11" y="10" width="3" height="3" fill="#1a1a1a" />
//         <rect x="18" y="10" width="3" height="3" fill="#1a1a1a" />
//         <rect x="12" y="20" width="8" height="10" fill="#1c3f8c" />
//         <rect x="6" y="20" width="6" height="4" fill="#c81e1e" />
//         <rect x="20" y="20" width="6" height="4" fill="#c81e1e" />
//         <rect x="10" y="30" width="4" height="8" fill="#c81e1e" />
//         <rect x="18" y="30" width="4" height="8" fill="#c81e1e" />
//       </svg> */}
//       <div className="spidey-sprite" aria-hidden="true" />
//     </div>
//   );
// }

function HangingSpidey() {
  return (
    <div className="spidey-drop-in">
      <div className="spidey-dangle">
        <span className="web" />
        {/* Este div reemplaza al SVG y cargará el sprite */}
        <div className="spidey-sprite" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function SpideyApp() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => {
        if (value >= 10) {
          clearInterval(interval);
          return 10;
        }
        return value + 1;
      });
    }, 180);
    return () => clearInterval(interval);
  }, []);

  if (isLoaded) {
    return (
      <div className="boot-screen">
        {/* <TrackerGoogleMap /> */}
        <p>EL MAPA CARGARÁ AQUÍ...</p>
      </div>
    );
  }

  return (
    <div className="boot-screen">
      <HangingSpidey />

      <p className="welcome">
        BIENVENIDO A SPIDEY TRACKER.
        <br />
        INTERACTÚA CON EL MAPA PARA VER
        <br />
        AVISTAMIENTOS DE SPIDER-MAN EN TODO EL MUNDO.
      </p>

      <div className="loader" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className={index < progress ? "on" : ""} />
        ))}
      </div>

      <p className="hint">ELIGE TU CONFIGURACIÓN Y EMPIEZA A RASTREAR</p>

      <div className="sound-row">
        <button type="button" className="sound-btn active" onClick={() => setIsLoaded(true)}>
          SONIDO ACTIVADO
        </button>
        <button type="button" className="sound-btn" onClick={() => setIsLoaded(true)}>
          SONIDO DESACTIVADO
        </button>
      </div>
    </div>
  );
}

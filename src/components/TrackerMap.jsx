import { useState, useEffect, useRef } from "react";
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

// ¡CONSTANTES FUERA DEL COMPONENTE!
const PARTY_LOCATION = { lat: 22.125446064513323, lng: -100.82950824036224 };

const FAKE_SIGHTINGS = [
  { id: 1, lat: 40.7128, lng: -74.0060 }, { id: 101, lat: 40.7580, lng: -73.9855 }, 
  { id: 102, lat: 40.7282, lng: -73.7949 }, { id: 103, lat: 40.6782, lng: -73.9442 }, 
  { id: 104, lat: 40.8448, lng: -73.8648 }, { id: 105, lat: 40.5795, lng: -74.1502 }, 
  { id: 2, lat: 41.8781, lng: -87.6298 }, { id: 106, lat: 42.3601, lng: -71.0589 }, 
  { id: 107, lat: 39.9526, lng: -75.1652 }, { id: 108, lat: 38.9072, lng: -77.0369 }, 
  { id: 3, lat: 34.0522, lng: -118.2437 }, { id: 109, lat: 37.7749, lng: -122.4194 }, 
  { id: 4, lat: 25.7617, lng: -80.1918 }, { id: 5, lat: 47.6062, lng: -122.3321 }, 
  { id: 6, lat: 32.7767, lng: -96.7970 }, { id: 7, lat: 19.4326, lng: -99.1332 }, 
  { id: 8, lat: 25.6866, lng: -100.3161 }, { id: 9, lat: 20.6597, lng: -103.3496 }, 
  { id: 10, lat: 32.5149, lng: -117.0382 }, { id: 11, lat: 21.1619, lng: -86.8515 }, 
  { id: 13, lat: 51.5074, lng: -0.1278 }, { id: 14, lat: 48.8566, lng: 2.3522 },
  { id: 15, lat: 40.4168, lng: -3.7038 }, { id: 21, lat: 22.1350, lng: -100.9900 },
  { id: 22, lat: 22.1600, lng: -100.9600 }, { id: 23, lat: 22.1480, lng: -100.9750 }
];

// 1. MOTOR DE LA CÁMARA INICIAL
function MapCameraTracker({ destination }) {
  const map = useMap(); 
  const [hasAnimated, setHasAnimated] = useState(false); 

  useEffect(() => {
    if (!map || hasAnimated) return;
    
    const timer = setTimeout(() => {
      map.panTo(destination);
      setTimeout(() => map.setZoom(5), 600);
      setTimeout(() => map.setZoom(8), 1200);
      setTimeout(() => map.setZoom(13), 1800);
      setHasAnimated(true); 
    }, 3500);

    return () => clearTimeout(timer);
  }, [map, destination, hasAnimated]);

  return null;
}

// 2. WIDGET DEL RADAR
function RadarWidget() {
  const map = useMap(); 

  const goToGlobal = () => {
    if (!map) return;
    
    // Detectamos si es pantalla móvil (ancho menor a 768px)
    const isMobile = window.innerWidth < 768;
    
    // Coordenadas: Centroamérica para móviles, Atlántico Norte para PC
    const globalCenter = isMobile ? { lat: 15.0, lng: -95.0 } : { lat: 35.0, lng: -50.0 };
    // En celular reducimos un nivel el zoom para que se vea toda América
    const targetZoom = isMobile ? 2 : 3;

    map.panTo(globalCenter);
    setTimeout(() => map.setZoom(10), 300);
    setTimeout(() => map.setZoom(6), 600);
    setTimeout(() => map.setZoom(targetZoom), 900);
  };

  const goToEvent = () => {
    if (!map) return;
    map.panTo(PARTY_LOCATION);
    setTimeout(() => map.setZoom(6), 300);
    setTimeout(() => map.setZoom(10), 600);
    setTimeout(() => map.setZoom(13), 900);
  };

  return (
    <div className="radar-wrapper">
      <div className="radar-base">
        <div className="radar-dot red" style={{ top: '30%', left: '40%' }}></div>
        <div className="radar-dot red" style={{ top: '65%', left: '25%' }}></div>
        <div className="radar-dot red" style={{ top: '45%', left: '75%' }}></div>
        <div className="radar-dot red" style={{ top: '80%', left: '60%' }}></div>
        <div className="radar-dot red" style={{ top: '20%', left: '65%' }}></div>
        <div className="radar-dot white" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
        <div className="radar-sweep"></div>
        <div className="radar-center-node"></div>
      </div>
      
      <button className="radar-btn radar-btn-globe" onClick={goToGlobal}>
        <img src="/images/trackerMap/globe_btn.png" alt="Global" /> 
      </button>
      <button className="radar-btn radar-btn-target" onClick={goToEvent}>
        <img src="/images/trackerMap/map_center.png" alt="Objetivo" />
      </button>
    </div>
  );
}

// 3. COMPONENTE PRINCIPAL
export default function TrackerMap({ soundEnabled }) {
  const API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const MAP_ID = import.meta.env.PUBLIC_GOOGLE_MAP_ID || "DEMO_MAP_ID"; 
  
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  
  // --- CONTROLADOR DE AUDIO ---
  const audioRef = useRef(null);

  useEffect(() => {
    // AHORA: Solo reproducimos si el mapa cargó Y el usuario activó el sonido
    if (soundEnabled && audioRef.current) {
      audioRef.current.volume = 0.1; 
      
      audioRef.current.play().catch((error) => {
        console.log("Autoplay bloqueado por el navegador:", error);
      });
    }
  }, [soundEnabled]); // Se ejecuta al leer si el sonido está habilitado

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      
      {/* ETIQUETA DE AUDIO OCULTA */}
      {/* CAMBIA LA RUTA AL NOMBRE EXACTO DE TU ARCHIVO MP3 */}
      <audio ref={audioRef} src="/audio/spiderman_tono.mp3" />
      
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={{ lat: 15.0, lng: -95.0 }}
          defaultZoom={3} 
          disableDefaultUI={true} 
          mapId={MAP_ID}
          onClick={() => setIsInviteOpen(false)}
        >
          <MapCameraTracker destination={PARTY_LOCATION} />

          {FAKE_SIGHTINGS.map((sighting) => (
            <AdvancedMarker key={sighting.id} position={{ lat: sighting.lat, lng: sighting.lng }}>
              <img src="/images/trackerMap/red_pin.png" alt="Avistamiento" className="spidey-pin" />
            </AdvancedMarker>
          ))}

          <AdvancedMarker 
            position={PARTY_LOCATION} 
            zIndex={100}
            onClick={() => setIsInviteOpen(true)}
          >
            <img src="/images/trackerMap/event_pin.png" alt="Salón de Fiestas" className="blinking-star" />
          </AdvancedMarker>
        </Map>

        <RadarWidget />
      </APIProvider>

      {/* --- OVERLAYS GRÁFICOS --- */}
      <div className="overlay-ui grid-lines"></div>
      
      <div className="measure-h-container">
        {[...Array(6)].map((_, i) => (
          <img key={i} src="/images/trackerMap/horizontal_measure.png" alt="" className="measure-h" />
        ))}
      </div>
      
      <img src="/images/trackerMap/vertical_measure.png" alt="" className="measure-v top" />
      <img src="/images/trackerMap/vertical_measure.png" alt="" className="measure-v bottom" />
      
      {/* --- PANEL LATERAL --- */}
      <div className={`invite-sidebar ${isInviteOpen ? 'open' : ''}`}>
        <div className="invite-sidebar-header">
          <h2><span style={{color: 'var(--spidey-cyan)'}}>✪</span> ARCHIVO CLASIFICADO</h2>
          <button className="close-btn" onClick={() => setIsInviteOpen(false)}>
            ✕ CERRAR
          </button>
        </div>

        <div className="invite-content">
          <h3 className="highlight-title">MISIÓN: CUMPLEAÑOS</h3>
          <div className="birthday-photo-container">
            <img src="/images/foto-cumpleanero.jpeg" alt="Cumpleañero" className="birthday-photo" />
          </div>
          <p>Has sido reclutado para una misión importante. Se requiere tu presencia inmediata.</p>
          <div className="date-box">
            <strong>FECHA:</strong> Sábado 03 de Octubre<br/>
            <strong>HORA:</strong> 15:30 HRS
          </div>
          <p style={{ color: '#ff3b3b' }}><strong>CÓDIGO DE VESTIMENTA:</strong></p>
          <p>Traje de superhéroe o ropa cómoda para el combate.</p>
          <p style={{ marginTop: '24px' }}>
            <strong>UBICACIÓN EXACTA:</strong><br/>
            Junio 110, 78420 San Nicolás de los Jassos, S.L.P.
          </p>
          {/* BOTÓN PARA ABRIR GOOGLE MAPS CON LA RUTA */}
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=22.125446064513323,-100.82950824036224"
            target="_blank"
            rel="noopener noreferrer"
            className="route-btn"
          >
            <span style={{ fontSize: '18px', marginRight: '6px' }}>⌖</span> INICIAR NAVEGACIÓN
          </a>
        </div>
      </div>

    </div>
  );
}
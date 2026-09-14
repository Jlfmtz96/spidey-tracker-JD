import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function TrackerGoogleMap() {
  // Coordenadas del lugar de la fiesta
  const position = { lat: 22.1565, lng: -100.9778 };

  // Estilo JSON para darle un look oscuro/tecnológico al mapa

  const trackerStyle = [
    { elementType: "geometry", stylers: [{ color: "#1a2c4e" }] }, // Azul marino de fondo
    { elementType: "labels.text.stroke", stylers: [{ color: "#1a2c4e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1b33" }] }, // Océanos más oscuros
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2e4b7a" }] }, // Calles en azul claro
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1d3056" }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] } // Sin negocios
  ];

  return (
    // Contenedor con borde rojo neón estilo alerta
    <div className="border-2 border-red-500 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.5)] h-[300px] w-full">
      <APIProvider apiKey="AQUI_PON_TU_API_KEY">
        <Map
          defaultCenter={position}
          defaultZoom={15}
          disableDefaultUI={true} // Esto oculta los botones de zoom y Street View para que parezca un radar
          styles={trackerStyle}
        >
          {/* El marcador en las coordenadas */}
          <Marker position={position} title="Avistamiento Confirmado" />
        </Map>
      </APIProvider>
    </div>
  );
}
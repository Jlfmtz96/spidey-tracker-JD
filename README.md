# 🕷️ Spidey Tracker - Invitación Confidencial

Este proyecto es una interfaz web interactiva estilo "radar" o terminal retro, diseñada para rastrear avistamientos en un mapa global. 

## 🛠️ Tecnologías Utilizadas
*   **Framework Principal:** Astro
*   **Componentes UI:** React
*   **Estilos:** Tailwind CSS
*   **Mapas:** API de Google Maps (`@vis.gl/react-google-maps`)[cite: 3]
*   **Tipografía:** VT323 (Google Fonts)[cite: 4]

## 🚀 Progreso Actual (Hasta la fecha)

1.  **Pantalla de Inicio (`SpideyApp.jsx`):** 
    *   Se creó la pantalla de bienvenida con texto estilo terminal[cite: 1].
    *   Animación de la araña colgando y simulación de carga con caracteres (`■■■□□`)[cite: 1].
    *   Botones de selección de sonido implementados (estado controlado con React)[cite: 1].

2.  **Marco Pixel Art (`SpideyFrame.astro`):**
    *   Se implementó una cuadrícula (CSS Grid) para el marco de 15 piezas (slices)[cite: 2].
    *   Incluye la barra superior con el logo y la barra inferior de configuración[cite: 2].

3.  **Mapa Integrado (`TrackerMap.jsx`):**
    *   Componente preparado para renderizar el mapa de Google Maps[cite: 3].
    *   Se inyectó un JSON de estilos para darle un aspecto de radar oscuro (tonos azul marino y neón) sin puntos de interés comerciales[cite: 3].

## 🚧 Problemas Conocidos / Siguientes Pasos
*   **Layout del Marco:** El CSS Grid del `SpideyFrame` actualmente está estirando las imágenes de los bordes horizontales y verticales. Falta anclar firmemente las proporciones (16:9) e integrar los paneles laterales (`aside`) para contener el ancho.
*   **Assets:** Validar la ruta de `spidey-hanging.png` para evitar el fallback del emoji.
*   **Mapa:** Descomentar el componente `<TrackerGoogleMap />` cuando la Key de la API esté lista.
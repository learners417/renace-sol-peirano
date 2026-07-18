"use client";
// Sistema de íconos propio (línea fina, coherente, hereda color del texto).
// Reemplaza los emojis: mismo grid 24x24, mismo trazo → seriedad instantánea.
// Uso: <Icon name="luna" size={20} /> · color por CSS (color / currentColor).

const P = {
  // Navegación
  sol: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
  luna: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  hoja: <><path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 9-9 3 0 5 1 5 1s0 8-5 12a7 7 0 0 1-2 3z" /><path d="M8.5 15.5C10 13 12.5 11 16 9.5" /></>,
  corazon: <path d="M12 20s-7-4.4-9.2-8.3C1.2 8.9 2.6 5.5 6 5.5c2 0 3 1.2 3.6 2 .6-.8 1.6-2 3.6-2 3.4 0 4.8 3.4 3.2 6.2C19 15.6 12 20 12 20z" />,

  // Estados
  candado: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  puntoActivo: <><circle cx="12" cy="12" r="8" opacity="0.25" /><circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" /></>,

  // Herramientas
  viento: <path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h9a2.5 2.5 0 1 1-2.5 2.5" />,
  auriculares: <><path d="M4 13v-1a8 8 0 0 1 16 0v1" /><rect x="3" y="13" width="4" height="7" rx="1.5" /><rect x="17" y="13" width="4" height="7" rx="1.5" /></>,
  brote: <><path d="M12 20v-7" /><path d="M12 13c0-3 2.5-5 6-5 0 3-2.5 5-6 5z" /><path d="M12 15c0-2.5-2-4.5-5-4.5 0 2.5 2 4.5 5 4.5z" /></>,
  brujula: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" fill="currentColor" stroke="none" opacity="0.5" /></>,
  camara: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8 7l1.5-2.5h5L16 7" /><circle cx="12" cy="13.5" r="3.5" /></>,
  calendario: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" /></>,
  play: <path d="M8 5.5l11 6.5-11 6.5z" fill="currentColor" stroke="none" />,
  brillo: <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />,
  gota: <path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3z" />,

  charla: <><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z" /><path d="M8 9h8M8 12h5" /></>,
  jugar: <><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5c3 2.4 3 14.6 0 17M3.5 12h17" /></>,

  // Acciones
  flecha: <path d="M5 12h13M13 6l6 6-6 6" />,
  chevron: <path d="M9 5l7 7-7 7" />,
  chevronIzq: <path d="M15 5l-7 7 7 7" />,
  mas: <path d="M12 5v14M5 12h14" />,
  compartir: <><circle cx="6" cy="12" r="2.5" /><circle cx="17" cy="6" r="2.5" /><circle cx="17" cy="18" r="2.5" /><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6" /></>,
  descargar: <path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19h14" />,
  cerrar: <path d="M6 6l12 12M18 6L6 18" />,
  salir: <><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M10 12H3M6 8l-3 4 3 4" /></>,
};

export function Icon({ name, size = 22, stroke = 1.7, style, className }) {
  const path = P[name];
  if (!path) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={style} className={className} aria-hidden="true">
      {path}
    </svg>
  );
}

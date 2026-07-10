// Capa "vida" (v9, según la sesión con Sol): la app deja de ser teoría.
// La Rueda de la Vida mide el cambio REAL por área. Cada área se corresponde con
// un módulo del método; crece con el módulo Y con los hitos reales que ella registra.

export const AREAS = [
  { n: 1, label: "Mi mente", emoji: "🧠", color: "#A990CC", pregunta: "¿Un momento en que tu cabeza jugó a tu favor?" },
  { n: 2, label: "Mis emociones", emoji: "🌊", color: "#9D86BE", pregunta: "¿Sentiste algo fuerte y esta vez no te dominó?" },
  { n: 3, label: "Conocerme", emoji: "✦", color: "#B48EAD", pregunta: "¿Algo tuyo que antes te molestaba y hoy aceptás?" },
  { n: 4, label: "Mi pareja", emoji: "♡", color: "#B7A0CE", pregunta: "¿Un gesto o una charla distinta con tu pareja?" },
  { n: 5, label: "Mi pasado", emoji: "🕊", color: "#7E6399", pregunta: "¿Algo del pasado que empezaste a soltar?" },
  { n: 6, label: "Con mi hijo/a", emoji: "🌷", color: "#D6A6C4", pregunta: "¿Antes hubieras gritado y hoy respondiste distinto?" },
  { n: 7, label: "Mi cuerpo", emoji: "🌿", color: "#8AA890", pregunta: "¿Un gesto de cuidado con tu cuerpo esta semana?" },
  { n: 8, label: "Confiar", emoji: "🍃", color: "#5A9170", pregunta: "¿Un momento en que soltaste el control y confiaste?" },
  { n: 9, label: "Mi paz", emoji: "✨", color: "#65507E", pregunta: "¿Un instante de paz o gratitud que quieras guardar?" },
];

export const areaDe = (n) => AREAS.find((a) => a.n === n) || AREAS[0];

// Meditaciones: ~7, intercaladas en algunos módulos (Sol las carga por Drive).
// El campo `modulo` es TENTATIVO — confirmar con Sol en qué módulos van.
export const MEDITACIONES = [
  { id: "m1", nombre: "Aquietar la mente", modulo: 1, audioUrl: null },
  { id: "m2", nombre: "Abrazar la emoción", modulo: 2, audioUrl: null },
  { id: "m3", nombre: "Encontrarte", modulo: 3, audioUrl: null },
  { id: "m4", nombre: "Sanar el pasado", modulo: 5, audioUrl: null },
  { id: "m5", nombre: "Calma para criar", modulo: 6, audioUrl: null },
  { id: "m6", nombre: "Confiar en la vida", modulo: 8, audioUrl: null },
  { id: "m7", nombre: "Gratitud y paz", modulo: 9, audioUrl: null },
];

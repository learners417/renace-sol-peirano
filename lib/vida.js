// Capa "vida": la Rueda de la Vida (9 áreas = 9 lunas) + las meditaciones reales de Sol.

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

// Meditaciones REALES de Sol (videos de YouTube, embebidos sin cookies).
// Cada una pertenece a una luna: aparece en la pausa de esa luna y se desbloquea al llegar.
export const MEDITACIONES = [
  { id: "med1", luna: 1, nombre: "Meditación de la Luna 1 · Tu mente", youtubeId: "vy2ehFlGP_o" },
  { id: "med2", luna: 2, nombre: "Meditación de la Luna 2 · Tus emociones", youtubeId: "6ZCQCvDNcPw" },
  { id: "med3", luna: 3, nombre: "Meditación de la Luna 3 · Conocerte", youtubeId: "vy6pFdTMyw0" },
  { id: "med6a", luna: 6, nombre: "Meditación de la Luna 6 · Parte 1", youtubeId: "LPnV4wIQ-FU" },
  { id: "med6b", luna: 6, nombre: "Meditación de la Luna 6 · Parte 2", youtubeId: "4R7ZJHbssTU" },
  { id: "med7", luna: 7, nombre: "Meditación de la Luna 7 · Tu cuerpo", youtubeId: "j_tDDVlb83w" },
];

export const embedMeditacion = (m) => `https://www.youtube-nocookie.com/embed/${m.youtubeId}`;
export const meditacionesDeLuna = (n) => MEDITACIONES.filter((m) => m.luna === n);

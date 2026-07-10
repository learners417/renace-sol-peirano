// Adaptación por país. El onboarding define el país; la app te habla en tu dialecto.
// Los videos y los textos firmados por Sol quedan en su voz (argentina); esto es solo
// el "chrome" de la app (botones, guías, microcopy) para que viaje por toda LATAM.

export const PAISES = [
  { code: "AR", nombre: "Argentina", flag: "🇦🇷", voz: "vos" },
  { code: "MX", nombre: "México", flag: "🇲🇽", voz: "tu" },
  { code: "EC", nombre: "Ecuador", flag: "🇪🇨", voz: "tu" },
  { code: "PE", nombre: "Perú", flag: "🇵🇪", voz: "tu" },
  { code: "CO", nombre: "Colombia", flag: "🇨🇴", voz: "tu" },
  { code: "CL", nombre: "Chile", flag: "🇨🇱", voz: "tu" },
  { code: "UY", nombre: "Uruguay", flag: "🇺🇾", voz: "vos" },
  { code: "OT", nombre: "Otro país", flag: "🌎", voz: "tu" },
];

export const vozDePais = (code) => (PAISES.find((p) => p.code === code)?.voz) || "tu";

// Diccionario de copy con las dos variantes. Clave -> { vos, tu }.
const C = {
  saludoManana: { vos: "Buenos días", tu: "Buenos días" },
  saludoTarde:  { vos: "Buenas tardes", tu: "Buenas tardes" },
  saludoNoche:  { vos: "Buenas noches", tu: "Buenas noches" },

  empezarDia:   { vos: "Empezar mi día", tu: "Empezar mi día" },
  yaHiciste:    { vos: "Ya hiciste tu ritual de hoy", tu: "Ya hiciste tu ritual de hoy" },
  volveManana:  { vos: "Volvé mañana para tu siguiente paso 🌙", tu: "Vuelve mañana para tu siguiente paso 🌙" },

  comoLlegas:   { vos: "¿Cómo llegás hoy?", tu: "¿Cómo llegas hoy?" },
  tuClase:      { vos: "Tu clase de hoy", tu: "Tu clase de hoy" },
  tuPractica:   { vos: "Tu práctica", tu: "Tu práctica" },
  unaPausa:     { vos: "Una pausa para vos", tu: "Una pausa para ti" },
  tuSemilla:    { vos: "Tu semilla de hoy", tu: "Tu semilla de hoy" },
  tuDiario:     { vos: "Tu diario", tu: "Tu diario" },
  diarioHint:   { vos: "¿Qué te llevás de hoy? (opcional)", tu: "¿Qué te llevas de hoy? (opcional)" },

  siguiente:    { vos: "Siguiente", tu: "Siguiente" },
  terminar:     { vos: "Terminar mi día", tu: "Terminar mi día" },
  guardar:      { vos: "Guardar 🤍", tu: "Guardar 🤍" },
  compartir:    { vos: "Compartir", tu: "Compartir" },
  listoHoy:     { vos: "¡Listo por hoy!", tu: "¡Listo por hoy!" },
  aVivir:       { vos: "Andá a vivir tu día. Nos vemos mañana.", tu: "Ve a vivir tu día. Nos vemos mañana." },

  miCamino:     { vos: "Tu camino", tu: "Tu camino" },
  lunasSub:     { vos: "Nueve lunas para volver a vos", tu: "Nueve lunas para volver a ti" },
  dondeEstas:   { vos: "Dónde estás", tu: "Dónde estás" },
  cuantoHiciste:{ vos: "Cuánto hiciste", tu: "Cuánto hiciste" },

  hablarSerena: { vos: "Hablar con Serena", tu: "Hablar con Serena" },
  escribiAqui:  { vos: "Escribí lo que quieras…", tu: "Escribe lo que quieras…" },
  pensando:     { vos: "Serena está pensando…", tu: "Serena está pensando…" },

  tuMomento:    { vos: "¿Cómo te sentís en este momento?", tu: "¿Cómo te sientes en este momento?" },
};

export const t = (key, pais) => {
  const v = vozDePais(pais);
  const e = C[key];
  if (!e) return key;
  return e[v] ?? e.tu ?? key;
};

// Verbo suelto según voz (para armar frases dinámicas)
export const conjuga = (pais, vosForm, tuForm) => (vozDePais(pais) === "vos" ? vosForm : tuForm);

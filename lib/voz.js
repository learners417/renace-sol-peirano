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

// ============================================================
// NEUTRALIZACIÓN AUTOMÁTICA voseo → tú (i18n total)
// La fuente está escrita en rioplatense; para países no voseantes
// se convierte en runtime con este diccionario de formas.
// ============================================================
// pares [voseo, neutro] — los límites de palabra se generan con Unicode (las tildes rompen \b)
const PARES = [
  ["con vos misma","contigo misma"],["vos misma","ti misma"],["con vos","contigo"],["para vos","para ti"],["a vos","a ti"],["de vos","de ti"],["en vos","en ti"],["Vos","Tú"],["vos","tú"],
  ["sos","eres"],["Sos","Eres"],["tenés","tienes"],["Tenés","Tienes"],["podés","puedes"],["Podés","Puedes"],["querés","quieres"],["Querés","Quieres"],
  ["sabés","sabes"],["venís","vienes"],["hacés","haces"],["Hacés","Haces"],["decís","dices"],["ves","ves"],
  ["llamás","llamas"],["llegás","llegas"],["empezás","empiezas"],["registrás","registras"],["cerrás","cierras"],["contás","cuentas"],
  ["mirás","miras"],["necesitás","necesitas"],["avanzás","avanzas"],["caminás","caminas"],["pensás","piensas"],["sentís","sientes"],
  ["seguís","sigues"],["elegís","eliges"],["escribís","escribes"],["recibís","recibes"],["abrís","abres"],["vivís","vives"],
  ["completás","completas"],["terminás","terminas"],["guardás","guardas"],["usás","usas"],["explotás","explotas"],["gritás","gritas"],
  ["respirás","respiras"],["volvés","vuelves"],["creés","crees"],["acompañás","acompañas"],["trabajás","trabajas"],["sumás","sumas"],
  ["tocás","tocas"],["marcás","marcas"],["anotás","anotas"],["sacás","tomas"],["subís","subes"],["preparás","preparas"],["llevás","llevas"],
  ["odiás","odias"],["acostás","acuestas"],["prometés","prometes"],["cocinás","cocinas"],
  ["Tocá","Toca"],["tocá","toca"],["Marcá","Marca"],["marcá","marca"],["Marcalo","Márcalo"],["marcalo","márcalo"],
  ["Contá","Cuenta"],["contá","cuenta"],["Contame","Cuéntame"],["contame","cuéntame"],["Contale","Cuéntale"],["contale","cuéntale"],
  ["Escribí","Escribe"],["escribí","escribe"],["Escribile","Escríbele"],["escribile","escríbele"],
  ["Elegí","Elige"],["elegí","elige"],["Mirá","Mira"],["mirá","mira"],["Mirala","Mírala"],["mirala","mírala"],
  ["Anotá","Anota"],["anotá","anota"],["Anotalo","Anótalo"],["anotalo","anótalo"],["Registrá","Registra"],["registrá","registra"],
  ["Registralo","Regístralo"],["registralo","regístralo"],["Guardá","Guarda"],["guardá","guarda"],
  ["Empezá","Empieza"],["empezá","empieza"],["Seguí","Sigue"],["seguí","sigue"],["Volvé","Vuelve"],["volvé","vuelve"],
  ["Abrí","Abre"],["abrí","abre"],["Cerrá","Cierra"],["cerrá","cierra"],["Respirá","Respira"],["respirá","respira"],
  ["Inhalá","Inhala"],["inhalá","inhala"],["Exhalá","Exhala"],["exhalá","exhala"],["Retené","Retén"],["retené","retén"],
  ["Soltá","Suelta"],["soltá","suelta"],["Tomá","Toma"],["tomá","toma"],["Tomate","Tómate"],["tomate","tómate"],
  ["Buscá","Busca"],["buscá","busca"],["Pedí","Pide"],["pedí","pide"],["Probá","Prueba"],["probá","prueba"],
  ["Revisá","Revisa"],["revisá","revisa"],["Revisalo","Revísalo"],["revisalo","revísalo"],["Dejá","Deja"],["dejá","deja"],
  ["Ingresá","Ingresa"],["ingresá","ingresa"],["Activá","Activa"],["activá","activa"],["Pará","Para"],["pará","para"],
  ["Hacé","Haz"],["hacé","haz"],["Hacete","Hazte"],["hacete","hazte"],["Decí","Di"],["decí","di"],["Decile","Dile"],["decile","dile"],
  ["Vení","Ven"],["vení","ven"],["Andá","Ve"],["andá","ve"],["Ponete","Ponte"],["ponete","ponte"],["Ponele","Ponle"],["ponele","ponle"],
  ["Acostate","Acuéstate"],["acostate","acuéstate"],["Acordate","Recuerda"],["acordate","recuerda"],
  ["Quedate","Quédate"],["quedate","quédate"],["Sentate","Siéntate"],["sentate","siéntate"],
  ["Regalale","Regálale"],["regalale","regálale"],["Sacale","Tómale"],["sacale","tómale"],["Sacate","Quítate"],["sacate","quítate"],
  ["Agarrá","Toma"],["agarrá","toma"],["Preparate","Prepárate"],["preparate","prepárate"],
  ["Sembrá","Siembra"],["sembrá","siembra"],["Leé","Lee"],["leé","lee"],["Leela","Léela"],["leela","léela"],
  ["Llevá","Lleva"],["llevá","lleva"],["Fijate","Fíjate"],["fijate","fíjate"],["Olvidate","Olvídate"],["olvidate","olvídate"],
  ["Perdoná","Perdona"],["perdoná","perdona"],["Confiá","Confía"],["confiá","confía"],["Aterrizá","Aterriza"],["aterrizá","aterriza"],
  ["acá","aquí"],["Acá","Aquí"],["lapicera","pluma"],
];
const MAPA_NEUTRO = [...PARES].sort((a, b) => b[0].length - a[0].length).map(([a, b]) => [new RegExp("(?<![\\p{L}])" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\p{L}])", "gu"), b]);
export function neutraliza(texto) {
  if (!texto) return texto;
  let t = texto;
  for (const [re, rep] of MAPA_NEUTRO) t = t.replace(re, rep);
  return t;
}
// habla(): el texto fuente (voseo) tal cual para AR/UY; neutralizado para el resto
export const habla = (pais, texto) => (vozDePais(pais) === "vos" ? texto : neutraliza(texto));

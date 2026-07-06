// Respuestas locales de respaldo (si la API de IA no está configurada o falla).
export const CRISIS = ["no quiero vivir","hacerme daño","lastimarme","me quiero morir","violencia","me pega","suicid"];

export function respuestaLocal(texto, semanaTitulo) {
  const t = (texto || "").toLowerCase();
  if (CRISIS.some((c) => t.includes(c))) {
    return "Gracias por confiarme algo tan importante. Esto merece más acompañamiento del que yo puedo darte: soy una asistente del método, no una profesional. Por favor, hablá hoy con alguien de confianza y con un profesional de la salud. Vos importás — pedir ayuda también es cuidarte. 🤍";
  }
  if (t.includes("culpa")) return "La culpa pesa, ¿no? Acá la miramos así: la culpa no educa, solo pesa. Si ya viste lo que querés hacer distinto, el aprendizaje ya ocurrió — el resto es peso que podés soltar. ¿Qué te dirías si se lo escucharas a una amiga?";
  if (t.includes("grit") || t.includes("explot")) return "Respirá. Que hayas explotado no te hace mala madre: algo tuyo pidió ayuda en ese momento. Ahora se puede reparar: un abrazo y un 'perdón, mamá se enojó'. Reparar enseña más que no fallar. Y si vuelve el momento, tenés el botón SOS Calma. 🤍";
  if (t.includes("cansada") || t.includes("agotada") || t.includes("no llego")) return "Te leo y te creo: es mucho. No vamos a pelear contra tu cansancio — vamos a escucharlo. Hoy tu pasito puede ser mínimo: una respiración, una semilla. Con eso alcanza. El descanso no se merece, se necesita.";
  if (t.includes("pareja") || t.includes("marido") || t.includes("esposo")) return "Los vínculos se destraban cuando dejamos de intentar cambiar al otro y empezamos por casa: aceptarlo como es y elegir cómo respondemos nosotras. Probá transformar una queja en un pedido: 'necesito…' en vez de 'vos nunca…'.";
  if (t.includes("hijo") || t.includes("berrinche") || t.includes("nene") || t.includes("nena")) return "Tu hijo no lo hace contra vos: está aprendiendo, con las herramientas que tiene. Tu calma es su primera herramienta. Antes de intervenir: una respiración tuya. Si aprieta el momento, el botón SOS Calma te guía en un minuto.";
  const extra = semanaTitulo ? ` Esta semana estás en "${semanaTitulo}" — contame qué te está costando de ahí, si querés.` : "";
  return "Acá estoy. Contame un poco más — sin filtro, como te salga. No hay respuestas incorrectas en este espacio." + extra;
}

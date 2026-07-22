// El motor de las 9 Semanas.
// "Tardaste 9 meses en nacer. Vas a tardar 9 semanas en renacer."
// 1 semana = 1 luna = 1 "mes" de gestación de sí misma.
// 5 días de camino por semana (los fines de semana se descansa). 45 sesiones en total.
// Tipos de sesión: "clase" (video + práctica) · "integracion" (la práctica EN VIVO, sin video)
// · "cierre" (día 5: encuesta de la semana + logro + la luna se completa).

import { secuenciaVideos } from "@/lib/programa";

// Reflexiones de los días de integración, por luna (fieles al método de Sol).
const REFLEXION = {
  1: [
    "Hoy, atrapá a tu mente una vez en el día repitiendo un pensamiento que no te ayuda. Solo mirala y anotalo: ¿qué te estaba diciendo?",
    "Practicá lo de esta semana en un momento real: cuando la cabeza se acelere, pará, respirá una vez, y elegí tu siguiente pensamiento a propósito.",
  ],
  2: [
    "Hoy ponele nombre a una emoción en el momento en que aparezca ('esto es enojo', 'esto es cansancio'). Nombrarla ya la achica.",
    "Buscá una creencia que repetís ('no puedo con todo', 'soy mala madre') y preguntate: ¿es verdad, o es un pensamiento heredado?",
  ],
  3: [
    "Hoy observate en una reacción típica tuya, sin juzgarte. ¿Qué parte de tu personalidad estaba actuando?",
  ],
  4: [
    "Hoy transformá UNA queja en un pedido: en vez de 'vos nunca…', decí 'necesito…'. Mirá qué pasa.",
    "Hacé un gesto chiquito hacia tu pareja sin esperar nada a cambio. El cambio empieza por vos.",
    "Prepará con Serena (modo 'Con mi pareja') esa conversación que venís postergando. Aunque sea el primer párrafo.",
  ],
  5: [
    "Hoy elegí un recuerdo que todavía pesa y escribile dos líneas desde tu yo de hoy: ¿qué necesitaba esa versión tuya escuchar?",
    "Practicá soltar en chiquito: una molestia de hoy, la mirás, la aceptás como es, y la dejás pasar.",
  ],
  6: [
    "Hoy regalale a tu hijo/a un rato de juego con atención exclusiva (sin celular). Corto pero entero. Después anotá cómo se sintieron los dos.",
    "En el próximo berrinche o momento difícil, probá estabilizar con calma: 'estoy con vos, ya va a pasar'. Sin ceder, sin gritar. Después registrá cómo salió.",
  ],
  7: [
    "Hoy hacé un gesto concreto de cuidado con tu cuerpo: caminar, tomar más agua, acostarte más temprano. Uno solo, pero de verdad.",
  ],
  8: [
    "Salí unos minutos al aire libre y mirá algo vivo (un árbol, el cielo, tu hijo jugando). No hagas nada. Solo confiá en que la vida sabe.",
    "Anotá 10 cosas de tu vida de hoy por las que sentís gratitud. Chiquitas valen.",
    "Hoy soltá el control de UNA cosa que no depende de vos. Mirá qué pasa cuando confiás.",
    "Repetí la práctica de gratitud: otras 10, distintas a las de ayer. La gratitud se entrena.",
  ],
  9: [
    "Elegí una de las leyes que viste esta semana y buscala actuando en tu día de hoy. Anotá dónde la viste.",
  ],
};

// Repaso del camino (S9, día 4)
const REPASO = "Volvé a mirar tu Rueda de la Vida y tus logros en Mi renacer. Leé tu diario desde el día 1. Mirá cuánto caminaste: esa mujer que empezó ya no es la misma.";

// --- Construcción del plan: 9 semanas × 5 días = 45 sesiones ---
// Distribución: primero las clases de la luna, después la integración, el día 5 siempre cierra.
// Si la luna tiene 5 clases (Luna 3), el día 5 lleva la última clase + el cierre.
function construir() {
  const porLuna = {};
  secuenciaVideos.forEach((v, i) => {
    if (v.modulo <= 9) { (porLuna[v.modulo] = porLuna[v.modulo] || []).push(i); }
  });
  const idxCierreFinal = secuenciaVideos.findIndex((v) => v.modulo === 10); // El Nacimiento (v28)

  const plan = [];
  for (let semana = 1; semana <= 9; semana++) {
    const clases = porLuna[semana] || [];
    const refl = REFLEXION[semana] || [];
    let r = 0;
    for (let dia = 1; dia <= 5; dia++) {
      const esUltimo = dia === 5;
      if (semana === 9 && esUltimo) {
        // EL NACIMIENTO: el cierre escrito del método + graduación
        plan.push({ semana, dia, tipo: "cierre", videoIdx: idxCierreFinal, nacimiento: true });
        continue;
      }
      if (!esUltimo && dia <= clases.length && !(semana === 9 && dia === 4)) {
        plan.push({ semana, dia, tipo: "clase", videoIdx: clases[dia - 1] });
      } else if (esUltimo) {
        // día 5: cierre (si quedó una clase sin dar — luna de 5 clases — va junta)
        const videoPendiente = clases.length >= 5 ? clases[4] : null;
        plan.push({ semana, dia, tipo: "cierre", videoIdx: videoPendiente });
      } else if (semana === 9 && dia === 4) {
        plan.push({ semana, dia, tipo: "integracion", reflexion: REPASO, repaso: true });
      } else {
        plan.push({ semana, dia, tipo: "integracion", reflexion: refl[r] || refl[refl.length - 1] || "Hoy practicá lo de esta semana en tu vida real. Un gesto chiquito alcanza." });
        r++;
      }
    }
  }
  return plan;
}

export const PLAN = construir();               // 45 sesiones
export const TOTAL_SESIONES = PLAN.length;
export const sesionesDeSemana = (s) => PLAN.filter((x) => x.semana === s);
export const NOMBRE_DIA = { clase: "Tu clase", integracion: "Tu práctica viva", cierre: "El cierre de tu mes" };

// nº de micro-sesión (1-45) en que se abre cada semana
export const primeraSesionDeSemana = (s) => {
  const i = PLAN.findIndex((p) => p.semana === s);
  return i >= 0 ? i + 1 : null;
};

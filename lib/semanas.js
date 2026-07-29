// El motor de las 9 Semanas — alineado 1:1 con la promesa de la landing.
// "Tardaste 9 meses en nacer. Vas a tardar 9 semanas en renacer."
// 6 sesiones por semana + domingo de descanso. 54 micro-sesiones en total.
// El esquema vendido: CLASES → PRÁCTICA (tu meditación) → INTEGRAR (sin pantalla)
// → REGISTRO (tu primer cambio) → CIERRE (tu tarjeta del mes).

import { secuenciaVideos } from "@/lib/programa";
import { MEDITACIONES } from "@/lib/vida";

// Consignas de los días de INTEGRAR, por luna (fieles al método de Sol; sin pantalla).
const REFLEXION = {
  1: ["Hoy, atrapá a tu mente una vez repitiendo un pensamiento que no te ayuda. Solo mirala y anotalo en tu cuaderno: ¿qué te estaba diciendo?"],
  2: ["Hoy ponele nombre a una emoción en el momento en que aparezca ('esto es enojo', 'esto es cansancio'). Nombrarla ya la achica."],
  3: ["Hoy observate en una reacción típica tuya, sin juzgarte. ¿Qué parte de tu personalidad estaba actuando?"],
  4: ["Hoy transformá UNA queja en un pedido: en vez de 'vos nunca…', decí 'necesito…'. Mirá qué pasa."],
  5: ["Hoy elegí un recuerdo que todavía pesa y escribile dos líneas en tu cuaderno, desde tu yo de hoy: ¿qué necesitaba escuchar esa versión tuya?"],
  6: ["Hoy regalale a tu hijo/a un rato de juego con atención exclusiva (sin celular). Corto pero entero."],
  7: ["Hoy hacé un gesto concreto de cuidado con tu cuerpo: caminar, tomar más agua, acostarte más temprano. Uno solo, pero de verdad."],
  8: [
    "Salí unos minutos al aire libre y mirá algo vivo (un árbol, el cielo, tu hijo jugando). No hagas nada. Solo confiá en que la vida sabe.",
    "Anotá en tu cuaderno 10 cosas de tu vida por las que sentís gratitud. Chiquitas valen.",
    "Hoy soltá el control de UNA cosa que no depende de vos. Mirá qué pasa cuando confiás.",
  ],
  9: ["Elegí una de las leyes que viste y buscala actuando en tu día de hoy. Anotá dónde la viste."],
};

// --- Construcción: 9 semanas × 6 sesiones = 54 (día 7 = descanso) ---
// Regla por luna: clases primero (máx 4 en D1-D4; si hay 5ª, va con el cierre),
// después práctica-meditación (si la luna tiene), integrar hasta llenar,
// D5 = registro del cambio, D6 = cierre. Semana 9 termina en El Nacimiento.
function construir() {
  const porLuna = {};
  secuenciaVideos.forEach((v, i) => {
    if (v.modulo <= 9) { (porLuna[v.modulo] = porLuna[v.modulo] || []).push(i); }
  });
  const idxNacimiento = secuenciaVideos.findIndex((v) => v.modulo === 10);
  const tieneMed = (s) => MEDITACIONES.some((m) => m.luna === s);

  const plan = [];
  for (let semana = 1; semana <= 9; semana++) {
    const clases = porLuna[semana] || [];
    const nClases = Math.min(clases.length, 4);
    const claseExtra = clases.length > 4 ? clases[4] : null; // Luna 3: la 5ª va con el cierre
    const refl = REFLEXION[semana] || [];
    let r = 0;
    for (let dia = 1; dia <= 6; dia++) {
      if (dia === 6) {
        plan.push(semana === 9
          ? { semana, dia, tipo: "cierre", videoIdx: idxNacimiento, nacimiento: true }
          : { semana, dia, tipo: "cierre", videoIdx: claseExtra });
        continue;
      }
      if (dia === 5) { plan.push({ semana, dia, tipo: "registro", conMed: tieneMed(semana) && nClases >= 4 }); continue; }
      if (dia <= nClases) { plan.push({ semana, dia, tipo: "clase", videoIdx: clases[dia - 1] }); continue; }
      if (dia === nClases + 1 && tieneMed(semana)) { plan.push({ semana, dia, tipo: "practica" }); continue; }
      plan.push({ semana, dia, tipo: "integracion", reflexion: refl[r] || refl[refl.length - 1] || "Hoy practicá lo de esta semana en tu vida real. Un gesto chiquito alcanza." });
      r++;
    }
  }
  return plan;
}

export const PLAN = construir();               // 54 micro-sesiones
export const TOTAL_SESIONES = PLAN.length;
export const sesionesDeSemana = (s) => PLAN.filter((x) => x.semana === s);
export const NOMBRE_DIA = {
  clase: "Tu clase",
  practica: "Tu práctica y meditación",
  integracion: "Lo llevás a tu casa",
  registro: "Tu primer cambio",
  cierre: "El cierre de tu mes",
};

// nº de micro-sesión (1-54) en que se abre cada semana
export const primeraSesionDeSemana = (s) => {
  const i = PLAN.findIndex((p) => p.semana === s);
  return i >= 0 ? i + 1 : null;
};

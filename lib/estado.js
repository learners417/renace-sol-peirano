"use client";
// Estado local del MVP. Estructura: progreso por paso (índice de video en la secuencia).
import { TOTAL_PASOS, secuenciaVideos, modulos } from "@/lib/programa";

const get = (k, fb) => {
  if (typeof window === "undefined") return fb;
  try { const v = localStorage.getItem(k); return v == null ? fb : (JSON.parse(v) ?? fb); }
  catch { return fb; }
};
let _avisoGuardado = false;
const set = (k, v) => {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(k, JSON.stringify(v)); }
  catch {
    if (!_avisoGuardado) {
      _avisoGuardado = true;
      try { alert("No pude guardar tu avance en este dispositivo (se llenó el espacio del navegador). Liberá espacio o avisanos para ayudarte, así no perdés tu camino."); } catch {}
    }
  }
};

const TODAS_LAS_CLAVES = ["rn_user", "rn_onboarding", "rn_pasos", "rn_checkins", "rn_posts", "rn_pausa", "rn_diag", "rn_semillas", "rn_prefs", "rn_pais", "rn_diario", "rn_termfinal", "rn_hitos", "rn_sesiones", "rn_inicio", "rn_cierres"];

// --- usuaria ---
export const getUser = () => get("rn_user", null);
export const login = (nombre, email, plan) => { const u = { nombre: nombre || "mamá", email: email || "", plan: plan || "camino", ts: Date.now() }; set("rn_user", u); return u; };
export const logout = () => { if (typeof window === "undefined") return; try { TODAS_LAS_CLAVES.forEach((k) => localStorage.removeItem(k)); } catch {} };

// --- onboarding ---
export const getOnboarding = () => get("rn_onboarding", null);
export const guardarOnboarding = (data) => set("rn_onboarding", { ...data, fecha: Date.now() });

// --- diagnóstico ---
export const getDiagnostico = () => get("rn_diag", null);
export const guardarDiagnostico = (d) => set("rn_diag", d);

// --- progreso por pasos (video completado por índice) ---
export const getPasos = () => get("rn_pasos", {});
export const marcarPaso = (i, nota) => { const p = getPasos(); p[i] = { fecha: Date.now(), nota: nota || "" }; set("rn_pasos", p); return p; };
export const pasoHecho = (i) => !!getPasos()[i];

// índice del primer paso no completado
export const indiceActual = () => {
  const p = getPasos();
  for (let i = 0; i < TOTAL_PASOS; i++) if (!p[i]) return i;
  return TOTAL_PASOS; // completo
};
export const totalPasosHechos = () => Object.keys(getPasos()).length;
export const caminoCompleto = () => totalPasosHechos() >= TOTAL_PASOS;

// progreso por módulo
export const pasosDeModulo = (nMod) => {
  const idxs = [];
  secuenciaVideos.forEach((v, i) => { if (v.modulo === nMod) idxs.push(i); });
  return idxs;
};
export const pasosHechosModulo = (nMod) => { const p = getPasos(); return pasosDeModulo(nMod).filter((i) => p[i]).length; };
export const moduloCompleto = (nMod) => { const idxs = pasosDeModulo(nMod); return idxs.length > 0 && idxs.every((i) => getPasos()[i]); };
export const modulosCompletos = () => modulos.filter((m) => moduloCompleto(m.n)).length;

// ¿completó un paso HOY? (ritual = uno por día)
export const pasoCompletadoHoy = () => {
  const hoy = new Date().toDateString();
  return Object.values(getPasos()).some((x) => new Date(x.fecha).toDateString() === hoy);
};

// racha amable (informativa, nunca castiga)
export const rachaAmable = () => {
  const fechas = new Set(Object.values(getPasos()).map((x) => new Date(x.fecha).toDateString()));
  let r = 0; const hoy = new Date();
  for (let i = 0; i < 365; i++) {
    const dd = new Date(hoy); dd.setDate(hoy.getDate() - i);
    if (fechas.has(dd.toDateString())) r++;
    else if (i === 0) continue;
    else break;
  }
  return r;
};

// --- check-ins emocionales (1-5) ---
export const getCheckins = () => get("rn_checkins", []);
export const hoyYaCheckeo = () => { const hoy = new Date().toDateString(); return getCheckins().some((x) => new Date(x.fecha).toDateString() === hoy); };
export const registrarCheckin = (valor) => { const c = getCheckins(); c.push({ valor, fecha: Date.now() }); set("rn_checkins", c); return c; };
export const promedioInicial = () => { const ob = getOnboarding(); return ob?.termometro ?? null; };
export const promedioReciente = () => { const c = getCheckins().slice(-7); if (!c.length) return null; return Math.round((c.reduce((a, x) => a + x.valor, 0) / c.length) * 10) / 10; };

// --- círculo ---
export const getPosts = () => get("rn_posts", []);
export const publicarPost = (modulo, texto, nombre) => { const p = getPosts(); p.unshift({ modulo, texto, nombre, fecha: Date.now() }); set("rn_posts", p); return p; };

// --- semillas guardadas ---
export const getSemillasGuardadas = () => get("rn_semillas", []);
export const guardarSemilla = (texto) => { const arr = getSemillasGuardadas(); if (!arr.includes(texto)) { arr.unshift(texto); set("rn_semillas", arr); } return arr; };

// --- modo semana difícil ---
export const getPausa = () => get("rn_pausa", false);
export const setPausa = (v) => set("rn_pausa", v);

// --- inteligencia contextual ---
export const saludoHora = () => { const h = new Date().getHours(); if (h < 6) return "Es tarde"; if (h < 12) return "Buenos días"; if (h < 19) return "Buenas tardes"; return "Buenas noches"; };
export const esHoraDificil = () => { const h = new Date().getHours(); return h >= 17 && h <= 21; };
export const tendenciaAnimo = () => { const c = getCheckins().slice(-5); if (c.length < 3) return "neutra"; const prom = c.reduce((a, x) => a + x.valor, 0) / c.length; if (prom <= 2.2) return "baja"; if (prom >= 4) return "alta"; return "neutra"; };

// --- prefs ---
export const getPrefs = () => get("rn_prefs", {});
export const setPref = (k, v) => { const p = getPrefs(); p[k] = v; set("rn_prefs", p); return p; };

// ============================================================
// AÑADIDOS v8 — país (voz), diario/collage, y las 9 Lunas
// ============================================================

// --- país (define la voz de la app) ---
export const getPais = () => get("rn_pais", "OT");
export const setPais = (code) => set("rn_pais", code);

// --- diario de renacimiento (alimenta el collage) ---
export const getDiario = () => get("rn_diario", []);
export const hoyYaEscribio = () => { const h = new Date().toDateString(); return getDiario().some((e) => new Date(e.fecha).toDateString() === h); };
export const agregarDiario = (texto, animo, luna, foto) => {
  const d = getDiario();
  const n = luna ?? lunaActual();
  d.unshift({ texto: (texto || "").trim(), animo: animo ?? null, luna: n, foto: foto || null, fecha: Date.now() });
  set("rn_diario", d);
  return d;
};
export const diarioPorLuna = (n) => getDiario().filter((e) => e.luna === n);

// --- Las 9 Lunas (módulos 1–9). El módulo 10 = El Nacimiento (graduación). ---
export const TOTAL_LUNAS = 9;

// luna en curso = primer módulo (1–9) no completo; si están los 9, es el nacimiento (10)
export const lunaActual = () => {
  for (let n = 1; n <= TOTAL_LUNAS; n++) if (!moduloCompleto(n)) return n;
  return 10; // nacimiento
};
export const lunasCompletas = () => { let c = 0; for (let n = 1; n <= TOTAL_LUNAS; n++) if (moduloCompleto(n)) c++; return c; };
export const nacio = () => caminoCompleto(); // completó los 27 videos + cierre

// progreso 0–1 de la luna en curso (para dibujar la fase)
export const progresoLunaActual = () => {
  const n = lunaActual();
  if (n >= 10) return 1;
  const idxs = pasosDeModulo(n);
  if (!idxs.length) return 0;
  const p = getPasos();
  return idxs.filter((i) => p[i]).length / idxs.length;
};

// fase de fullness 0–1 de la app entera (para la luna grande de "Mi camino")
export const fullnessLuna = () => (lunasCompletas() + progresoLunaActual() * (lunaActual() <= 9 ? 1 : 0)) / TOTAL_LUNAS;

// termómetro final (misma escala 1-10 del inicio) — se toma en la graduación
export const getTermometroFinal = () => get("rn_termfinal", null);
export const setTermometroFinal = (v) => set("rn_termfinal", v);

// ============================================================
// AÑADIDOS v9 (sesión con Sol) — Registro de renacimiento (hitos),
// Rueda de la Vida (score por área), y desbloqueo secuencial flexible.
// ============================================================

// --- Registro de hitos (el corazón: cambios reales, con evidencia) ---
export const getHitos = () => get("rn_hitos", []);
export const hitosDeArea = (area) => getHitos().filter((h) => h.area === area);
export const agregarHito = ({ texto, area, peso, foto }) => {
  const h = getHitos();
  h.unshift({ texto: (texto || "").trim(), area: area || 1, peso: peso || 1, foto: foto || null, fecha: Date.now() });
  set("rn_hitos", h);
  return h;
};
// suma de "cuánto creció" registrado en un área
export const pesoDeArea = (area) => hitosDeArea(area).reduce((a, h) => a + (h.peso || 1), 0);

// --- progreso de un módulo 0..1 ---
export const moduloProgreso = (n) => {
  const idxs = pasosDeModulo(n);
  if (!idxs.length) return 0;
  const p = getPasos();
  return idxs.filter((i) => p[i]).length / idxs.length;
};

// --- Rueda de la Vida: score 0..100 por área (módulo).
// El video/completar el módulo aporta hasta 40. Los hitos reales, hasta 60.
// Mensaje de diseño: ver el video no alcanza; el cambio real hace crecer la rueda. ---
export const areaScore = (n) => Math.min(100, Math.round(moduloProgreso(n) * 30 + Math.min(70, pesoDeArea(n) * 12)));

// --- desbloqueo secuencial (no se puede saltar), pero el ritmo es flexible ---
export const moduloDesbloqueado = (n) => n <= lunaActual();

// --- info de ritmo (no bloquea, solo muestra) ---
export const diasDesdeUltimoPaso = () => {
  const fechas = Object.values(getPasos()).map((x) => x.fecha).sort((a, b) => b - a);
  if (!fechas.length) return null;
  return Math.floor((Date.now() - fechas[0]) / 86400000);
};

// ============================================================
// AÑADIDOS "9 SEMANAS" — plan diario, calendario, gates de acceso
// ============================================================
import { PLAN, TOTAL_SESIONES } from "@/lib/semanas";

// --- sesiones del plan (45) ---
export const getSesiones = () => get("rn_sesiones", {});
export const marcarSesion = (i) => { const s = getSesiones(); s[i] = { fecha: Date.now() }; set("rn_sesiones", s); return s; };

// Migración suave: si hay progreso viejo por videos y ninguna sesión, derivarlo.
export const migrarSesiones = () => {
  const ses = getSesiones();
  if (Object.keys(ses).length) return;
  const pasos = getPasos();
  if (!Object.keys(pasos).length) return;
  let ultima = -1;
  PLAN.forEach((p, i) => { if (p.videoIdx != null && pasos[p.videoIdx]) ultima = Math.max(ultima, i); });
  if (ultima < 0) return;
  const nuevo = {};
  for (let i = 0; i <= ultima; i++) nuevo[i] = { fecha: Date.now(), migrada: true };
  set("rn_sesiones", nuevo);
};

export const sesionActualIdx = () => {
  const s = getSesiones();
  for (let i = 0; i < TOTAL_SESIONES; i++) if (!s[i]) return i;
  return TOTAL_SESIONES;
};
export const sesionActual = () => PLAN[sesionActualIdx()] || null;
export const sesionCompletadaHoy = () => { const h = new Date().toDateString(); return Object.values(getSesiones()).some((x) => new Date(x.fecha).toDateString() === h); };
export const cierreDeSemanaHecho = (sem) => { const s = getSesiones(); const idx = PLAN.findIndex((p) => p.semana === sem && p.tipo === "cierre"); return idx >= 0 && !!s[idx]; };
export const semanaDesbloqueada = (sem) => sem <= 1 || cierreDeSemanaHecho(sem - 1);
export const semanasCompletas = () => { let c = 0; for (let s = 1; s <= 9; s++) if (cierreDeSemanaHecho(s)) c++; return c; };

// --- calendario del programa ---
export const getInicio = () => {
  let ini = get("rn_inicio", null);
  if (!ini) {
    const ob = getOnboarding();
    ini = ob?.fecha || Date.now();
    set("rn_inicio", ini);
  }
  return ini;
};
export const reiniciarVentana = () => set("rn_inicio", Date.now()); // extensión: nueva ventana de 12 semanas
export const semanaCalendario = () => Math.floor((Date.now() - getInicio()) / (7 * 86400000)) + 1;
export const enGracia = () => { const s = semanaCalendario(); return s >= 10 && s <= 12 && !caminoCompleto(); };
export const accesoVencido = () => semanaCalendario() > 12 && !caminoCompleto();
export const esFinDeSemana = () => { const d = new Date().getDay(); return d === 0 || d === 6; };

// --- plan de acceso (gates por código) ---
export const planUsuaria = () => (getUser()?.plan) || "camino";
export const soloSemana1 = () => planUsuaria() === "semana1";
export const sesionPermitida = (p) => !(soloSemana1() && p && p.semana > 1);
export const actualizarPlan = (plan) => { const u = getUser(); if (!u) return null; u.plan = plan; set("rn_user", u); return u; };

// --- cierres de semana (encuesta "¿cómo salís de este mes?") ---
export const getCierres = () => get("rn_cierres", {});
export const guardarCierreSemana = (semana, valor) => { const c = getCierres(); c[semana] = { valor, fecha: Date.now() }; set("rn_cierres", c); return c; };

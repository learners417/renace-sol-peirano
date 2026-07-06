"use client";
// Estado local del MVP (usuaria, onboarding, progreso, check-ins). Luego migra a base de datos.
import { claveDia, DIAS_POR_SEMANA, TOTAL_SEMANAS } from "@/lib/programa";

const K = {
  user: "rn_user",
  onboarding: "rn_onboarding",
  dias: "rn_dias",
  checkins: "rn_checkins",
  posts: "rn_posts",
  pausa: "rn_pausa",
};

const get = (k, fb) => {
  if (typeof window === "undefined") return fb;
  try { const v = localStorage.getItem(k); return v == null ? fb : (JSON.parse(v) ?? fb); }
  catch { return fb; }
};
const set = (k, v) => {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
};

// --- usuaria ---
export const getUser = () => get(K.user, null);
export const login = (nombre, email, plan) => { const u = { nombre, email, plan, ts: Date.now() }; set(K.user, u); return u; };
const TODAS_LAS_CLAVES = ["rn_user", "rn_onboarding", "rn_dias", "rn_checkins", "rn_posts", "rn_pausa", "rn_diag", "rn_semillas", "rn_prefs"];
export const logout = () => { if (typeof window === "undefined") return; try { TODAS_LAS_CLAVES.forEach((k) => localStorage.removeItem(k)); } catch {} };

// --- onboarding (termómetro inicial + carta) ---
export const getOnboarding = () => get(K.onboarding, null);
export const guardarOnboarding = (data) => set(K.onboarding, { ...data, fecha: Date.now() });

// --- progreso de días ---
export const getDias = () => get(K.dias, {});
export const marcarDia = (s, d, nota) => {
  const dias = getDias();
  dias[claveDia(s, d)] = { fecha: Date.now(), nota: nota || "" };
  set(K.dias, dias);
  return dias;
};

// posición actual: primer día no completado
export const posicionActual = () => {
  const dias = getDias();
  for (let s = 1; s <= TOTAL_SEMANAS; s++)
    for (let d = 1; d <= DIAS_POR_SEMANA; d++)
      if (!dias[claveDia(s, d)]) return { s, d };
  return { s: TOTAL_SEMANAS, d: DIAS_POR_SEMANA, completo: true };
};

export const diasHechosSemana = (s) => {
  const dias = getDias();
  let n = 0;
  for (let d = 1; d <= DIAS_POR_SEMANA; d++) if (dias[claveDia(s, d)]) n++;
  return n;
};
export const semanaFlorecida = (s) => diasHechosSemana(s) === DIAS_POR_SEMANA;
export const semanasFlorecidas = () => { let n = 0; for (let s = 1; s <= TOTAL_SEMANAS; s++) if (semanaFlorecida(s)) n++; return n; };
export const totalDiasHechos = () => Object.keys(getDias()).length;
export const caminoCompleto = () => semanasFlorecidas() === TOTAL_SEMANAS;

// racha amable: días seguidos con actividad (calendario), sin castigo — solo informativa
export const rachaAmable = () => {
  const fechas = Object.values(getDias()).map((x) => new Date(x.fecha).toDateString());
  const setF = new Set(fechas);
  let r = 0; const hoy = new Date();
  for (let i = 0; i < 365; i++) {
    const dd = new Date(hoy); dd.setDate(hoy.getDate() - i);
    if (setF.has(dd.toDateString())) r++;
    else if (i === 0) continue; // hoy todavía no regó: no rompe la racha
    else break;
  }
  return r;
};


// ¿ya completó un día del camino HOY? (ritual = uno por día, con opción de adelantar)
export const diaCompletadoHoy = () => {
  const hoy = new Date().toDateString();
  return Object.values(getDias()).some((x) => new Date(x.fecha).toDateString() === hoy);
};

// --- check-ins emocionales (1-5) ---
export const getCheckins = () => get(K.checkins, []);
export const hoyYaCheckeo = () => {
  const c = getCheckins();
  const hoy = new Date().toDateString();
  return c.some((x) => new Date(x.fecha).toDateString() === hoy);
};
export const registrarCheckin = (valor) => {
  const c = getCheckins();
  c.push({ valor, fecha: Date.now() });
  set(K.checkins, c);
  return c;
};
export const promedioInicial = () => {
  const ob = getOnboarding();
  return ob?.termometro ?? null;
};
export const promedioReciente = () => {
  const c = getCheckins().slice(-7);
  if (!c.length) return null;
  return Math.round((c.reduce((a, x) => a + x.valor, 0) / c.length) * 10) / 10;
};

// --- círculo (posts locales del MVP) ---
export const getPosts = () => get(K.posts, []);
export const publicarPost = (semana, texto, nombre) => {
  const p = getPosts();
  p.unshift({ semana, texto, nombre, fecha: Date.now() });
  set(K.posts, p);
  return p;
};


// --- diagnóstico de entrada ---
export const getDiagnostico = () => get("rn_diag", null);
export const guardarDiagnostico = (d) => set("rn_diag", d);

// --- semillas guardadas ---
export const getSemillasGuardadas = () => get("rn_semillas", []);
export const guardarSemilla = (texto) => {
  const arr = getSemillasGuardadas();
  if (!arr.includes(texto)) { arr.unshift(texto); set("rn_semillas", arr); }
  return arr;
};

// --- modo semana difícil ---
export const getPausa = () => get(K.pausa, false);
export const setPausa = (v) => set(K.pausa, v);

// --- inteligencia contextual ---
export const saludoHora = () => {
  const h = new Date().getHours();
  if (h < 6) return "Es tarde";
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
};

export const esHoraDificil = () => {
  // atardecer/noche: la hora de berrinches, cena, cansancio acumulado
  const h = new Date().getHours();
  return h >= 17 && h <= 21;
};

// tendencia del ánimo: 'baja' si los últimos check-ins vienen en descenso o bajos
export const tendenciaAnimo = () => {
  const c = getCheckins().slice(-5);
  if (c.length < 3) return "neutra";
  const prom = c.reduce((a, x) => a + x.valor, 0) / c.length;
  if (prom <= 2.2) return "baja";
  if (prom >= 4) return "alta";
  return "neutra";
};

// racha en riesgo: no regó hoy y ayer sí (para un empujón amable, nunca culpa)
export const diasDesdeUltimoRiego = () => {
  const dias = Object.values(getDias());
  if (!dias.length) return null;
  const ultima = Math.max(...dias.map((x) => x.fecha));
  return Math.floor((Date.now() - ultima) / (1000 * 60 * 60 * 24));
};

// --- favoritos / preferencias ---
export const getPrefs = () => get("rn_prefs", { recordatorio: null });
export const setPref = (k, v) => { const p = getPrefs(); p[k] = v; set("rn_prefs", p); return p; };

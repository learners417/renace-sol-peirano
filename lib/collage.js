"use client";
// Piezas compartibles del renacimiento (canvas 1080×1350, formato historia/feed).
// Rediseño: la RUEDA es la protagonista y el "empecé en X → hoy Y" es el titular.
import { AREAS } from "@/lib/vida";

const CREMA = "#FBF7F2", LILA = "#7E6399", LILA_S = "#B9A4D4", ORO = "#C9A24B", TINTA = "#2E2A32", TINTA2 = "#574F60";

function fondo(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, CREMA); g.addColorStop(1, "#F1ECF6");
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
}

function lunaFila(ctx, w, y, completas) {
  const n = 9, gap = 74, x0 = w / 2 - (gap * (n - 1)) / 2;
  for (let i = 0; i < n; i++) {
    const x = x0 + i * gap, hecha = i < completas;
    ctx.beginPath(); ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fillStyle = hecha ? ORO : "#E9E2D6"; ctx.fill();
    if (hecha) { ctx.beginPath(); ctx.arc(x - 9, y - 6, 20, 0, Math.PI * 2); ctx.fillStyle = "#F6ECCF"; ctx.fill(); }
  }
}

// La rueda de gajos, dibujada en canvas (misma geometría que la app)
function rueda(ctx, cx, cy, R, scores, bases) {
  const N = AREAS.length, step = (Math.PI * 2) / N, gap = 0.03;
  const slice = (i, r) => {
    const a1 = -Math.PI / 2 + i * step + gap, a2 = -Math.PI / 2 + (i + 1) * step - gap;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * Math.cos(a1), cy + r * Math.sin(a1));
    ctx.arc(cx, cy, r, a1, a2);
    ctx.closePath();
  };
  [0.5, 1].forEach((k) => { ctx.beginPath(); ctx.arc(cx, cy, R * k, 0, Math.PI * 2); ctx.strokeStyle = "#E7E0D8"; ctx.lineWidth = 2; ctx.stroke(); });
  AREAS.forEach((a, i) => {
    const sc = Math.max(0, Math.min(1, (scores?.[a.n] ?? 0) / 100));
    slice(i, R); ctx.fillStyle = a.color + "1E"; ctx.fill();
    if (sc > 0) { slice(i, Math.max(R * 0.08, R * sc)); ctx.fillStyle = a.color; ctx.globalAlpha = 0.85; ctx.fill(); ctx.globalAlpha = 1; }
    if (bases?.[a.n] != null) {
      const rb = R * Math.max(0.08, (bases[a.n] * 10) / 100);
      const a1 = -Math.PI / 2 + i * step + 0.07, a2 = -Math.PI / 2 + (i + 1) * step - 0.07;
      ctx.beginPath(); ctx.arc(cx, cy, rb, a1, a2);
      ctx.strokeStyle = CREMA; ctx.lineWidth = 4; ctx.setLineDash([7, 7]); ctx.stroke(); ctx.setLineDash([]);
    }
    // etiqueta
    const am = -Math.PI / 2 + (i + 0.5) * step;
    const lx = cx + (R + 46) * Math.cos(am), ly = cy + (R + 46) * Math.sin(am);
    ctx.fillStyle = TINTA2; ctx.font = "700 26px 'Nunito Sans', Arial, sans-serif";
    ctx.textAlign = Math.cos(am) > 0.25 ? "left" : Math.cos(am) < -0.25 ? "right" : "center";
    ctx.fillText(a.label, lx, ly + 8);
  });
  ctx.textAlign = "center";
}

export function collageFinal({ scores = {}, bases = {}, nivelIni = null, nivelHoy = null, frases = [], lunas = 0 }) {
  const w = 1080, h = 1350;
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  fondo(ctx, w, h);
  ctx.textAlign = "center";

  ctx.fillStyle = LILA; ctx.font = "800 34px 'Nunito Sans', Arial, sans-serif";
  ctx.fillText("M I   R E N A C I M I E N T O", w / 2, 108);

  if (nivelIni != null && nivelHoy != null) {
    ctx.fillStyle = TINTA; ctx.font = "600 92px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText(`Empecé en ${nivelIni} — hoy estoy en ${nivelHoy}`, w / 2, 210);
  } else {
    ctx.fillStyle = TINTA; ctx.font = "italic 600 84px 'Cormorant Garamond', Georgia, serif";
    ctx.fillText("Renací, a una nueva versión de mí", w / 2, 210);
  }

  rueda(ctx, w / 2, 620, 300, scores, bases);

  lunaFila(ctx, w, 1035, lunas);
  ctx.fillStyle = TINTA2; ctx.font = "700 26px 'Nunito Sans', Arial, sans-serif";
  ctx.fillText(`${lunas} de 9 lunas completas`, w / 2, 1090);

  const fs = (frases || []).filter(Boolean).slice(0, 2);
  ctx.fillStyle = LILA; ctx.font = "italic 600 40px 'Cormorant Garamond', Georgia, serif";
  fs.forEach((f, i) => {
    let t = f.length > 52 ? f.slice(0, 50) + "…" : f;
    ctx.fillText(`“${t}”`, w / 2, 1160 + i * 58);
  });

  ctx.fillStyle = TINTA2; ctx.font = "600 27px 'Nunito Sans', Arial, sans-serif";
  ctx.fillText("Método R.E.N.A.C.E. · Sol Peirano", w / 2, 1300);
  return c.toDataURL("image/png");
}

export function tarjetaLuna({ numero, nombreLuna, areaLabel = "", areaColor = LILA_S, nivelArea = null, base = null }) {
  const w = 1080, h = 1350;
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  const ctx = c.getContext("2d");
  fondo(ctx, w, h);
  ctx.textAlign = "center";

  ctx.fillStyle = LILA; ctx.font = "800 32px 'Nunito Sans', Arial, sans-serif";
  ctx.fillText("D E   M I   R E N A C I M I E N T O", w / 2, 120);

  // MES N — el titular
  ctx.fillStyle = TINTA; ctx.font = "600 200px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(`Mes ${numero}`, w / 2, 360);
  ctx.fillStyle = ORO; ctx.font = "800 40px 'Nunito Sans', Arial, sans-serif";
  ctx.fillText("C O M P L E T O", w / 2, 430);

  // el área de la luna, con su color
  ctx.beginPath(); ctx.arc(w / 2, 560, 16, 0, Math.PI * 2); ctx.fillStyle = areaColor; ctx.fill();
  ctx.fillStyle = TINTA; ctx.font = "italic 600 64px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(nombreLuna, w / 2, 660);

  // progreso del área
  if (nivelArea != null) {
    ctx.fillStyle = TINTA2; ctx.font = "700 30px 'Nunito Sans', Arial, sans-serif";
    ctx.fillText(base != null ? `${areaLabel}: de ${base} a ${nivelArea}` : `${areaLabel}: ${nivelArea}/10`, w / 2, 740);
    // barra
    const bw = 560, bx = w / 2 - bw / 2, by = 780;
    ctx.fillStyle = "#EAE3D8"; ctx.beginPath(); ctx.roundRect(bx, by, bw, 22, 11); ctx.fill();
    ctx.fillStyle = areaColor; ctx.beginPath(); ctx.roundRect(bx, by, bw * Math.min(1, nivelArea / 10), 22, 11); ctx.fill();
    if (base != null) { ctx.fillStyle = CREMA; ctx.fillRect(bx + bw * Math.min(1, base / 10) - 3, by - 4, 6, 30); }
  }

  lunaFila(ctx, w, 950, numero);
  ctx.fillStyle = TINTA2; ctx.font = "700 26px 'Nunito Sans', Arial, sans-serif";
  ctx.fillText(`${numero} de 9 lunas completas`, w / 2, 1005);

  ctx.fillStyle = LILA; ctx.font = "italic 600 44px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText("Tardé 9 meses en nacer.", w / 2, 1120);
  ctx.fillText("Estoy tardando 9 semanas en renacer.", w / 2, 1178);

  ctx.fillStyle = TINTA2; ctx.font = "600 27px 'Nunito Sans', Arial, sans-serif";
  ctx.fillText("Método R.E.N.A.C.E. · Sol Peirano", w / 2, 1300);
  return c.toDataURL("image/png");
}

export function descargar(dataUrl, nombre) {
  const a = document.createElement("a");
  a.href = dataUrl; a.download = nombre; a.click();
}

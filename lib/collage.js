"use client";
// Generador de piezas compartibles (canvas). Cada pieza sale con la marca de Sol:
// cuando una mamá la postea, es un anuncio de Sol. El motor viral de la app.

const CREMA = "#FBF7F2", LILA = "#7E6399", LILA2 = "#B9A4D4", ORO = "#C9A24B", TINTA = "#2E2A32";

function fondo(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#F6EEF9"); g.addColorStop(1, CREMA);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // halo lunar
  const r = ctx.createRadialGradient(w * 0.5, h * 0.28, 10, w * 0.5, h * 0.28, w * 0.6);
  r.addColorStop(0, "rgba(185,164,212,.35)"); r.addColorStop(1, "rgba(185,164,212,0)");
  ctx.fillStyle = r; ctx.fillRect(0, 0, w, h);
}

function luna(ctx, cx, cy, rad, fase) {
  // fase 0..1 (0 nueva, 1 llena)
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2);
  ctx.fillStyle = "#EDE6D6"; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.clip();
  const lit = fase * rad * 2;
  const gl = ctx.createLinearGradient(cx - rad, 0, cx - rad + lit, 0);
  gl.addColorStop(0, "#F4EAD0"); gl.addColorStop(1, ORO);
  ctx.fillStyle = gl; ctx.fillRect(cx - rad, cy - rad, lit, rad * 2);
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(201,162,75,.5)"; ctx.lineWidth = 2; ctx.stroke();
}

function wrap(ctx, text, x, y, maxW, lh) {
  const words = (text || "").split(" "); let line = "", yy = y;
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line.trim(), x, yy); line = w + " "; yy += lh; }
    else line = test;
  }
  ctx.fillText(line.trim(), x, yy); return yy;
}

// Tarjeta de una luna completada
export function tarjetaLuna({ nombreLuna, numero, subtitulo }) {
  const w = 1080, h = 1350, c = document.createElement("canvas");
  c.width = w; c.height = h; const ctx = c.getContext("2d");
  fondo(ctx, w, h);
  ctx.textAlign = "center";
  ctx.fillStyle = LILA; ctx.font = "700 30px 'Nunito Sans', sans-serif";
  ctx.fillText("DE MI RENACIMIENTO", w / 2, 150);
  luna(ctx, w / 2, 430, 170, numero / 9);
  ctx.fillStyle = TINTA; ctx.font = "italic 600 74px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(`Mes ${numero}`, w / 2, 720);
  ctx.fillStyle = LILA; ctx.font = "600 54px 'Cormorant Garamond', Georgia, serif";
  wrap(ctx, nombreLuna, w / 2, 800, 900, 64);
  ctx.fillStyle = "#6B6472"; ctx.font = "400 34px 'Nunito Sans', sans-serif";
  wrap(ctx, subtitulo || "", w / 2, 940, 820, 46);
  ctx.fillStyle = LILA2; ctx.font = "700 28px 'Nunito Sans', sans-serif";
  ctx.fillText("Método R.E.N.A.C.E. · Sol Peirano", w / 2, h - 90);
  return c.toDataURL("image/png");
}

// Tarjeta de semilla (afirmación)
export function tarjetaSemilla(texto) {
  const w = 1080, h = 1080, c = document.createElement("canvas");
  c.width = w; c.height = h; const ctx = c.getContext("2d");
  fondo(ctx, w, h);
  luna(ctx, w / 2, 250, 90, 1);
  ctx.textAlign = "center"; ctx.fillStyle = TINTA;
  ctx.font = "italic 500 60px 'Cormorant Garamond', Georgia, serif";
  wrap(ctx, `"${texto}"`, w / 2, 500, 840, 78);
  ctx.fillStyle = LILA2; ctx.font = "700 26px 'Nunito Sans', sans-serif";
  ctx.fillText("Método R.E.N.A.C.E. · Sol Peirano", w / 2, h - 80);
  return c.toDataURL("image/png");
}

// El collage final: mosaico de las lunas + una línea del diario
export function collageFinal({ frases = [], lunas = 9 }) {
  const w = 1080, h = 1350, c = document.createElement("canvas");
  c.width = w; c.height = h; const ctx = c.getContext("2d");
  fondo(ctx, w, h);
  ctx.textAlign = "center"; ctx.fillStyle = LILA;
  ctx.font = "700 30px 'Nunito Sans', sans-serif";
  ctx.fillText("RENACÍ", w / 2, 120);
  // fila de 9 lunas crecientes
  const y = 250, r = 42, gap = (w - 160) / (lunas - 1);
  for (let i = 0; i < lunas; i++) luna(ctx, 80 + i * gap, y, r, (i + 1) / lunas);
  ctx.fillStyle = TINTA; ctx.font = "italic 600 46px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText("a una nueva versión de mí", w / 2, 430);
  // frases del diario
  ctx.font = "400 34px 'Nunito Sans', sans-serif"; ctx.fillStyle = "#6B6472";
  let yy = 560;
  frases.slice(0, 6).forEach((f) => { yy = wrap(ctx, `“${f}”`, w / 2, yy, 860, 44) + 60; });
  ctx.fillStyle = LILA2; ctx.font = "700 26px 'Nunito Sans', sans-serif";
  ctx.fillText("Método R.E.N.A.C.E. · Sol Peirano", w / 2, h - 70);
  return c.toDataURL("image/png");
}

export function descargar(dataUrl, nombre) {
  const a = document.createElement("a");
  a.href = dataUrl; a.download = nombre || "renace.png"; a.click();
}

// Valida el código de acceso. Prefijo -> plan. Configurable por env RENACE_CODES.
const PREFIJOS = { "CAMINO-": "camino", "ACOMP-": "acompanada", "INTEGRAL-": "integral", "SEMANA1-": "semana1", "EXTENSION-": "extension", "RENACIDA-": "renacida" };

export async function POST(req) {
  let body = {};
  try { body = await req.json(); } catch {}
  const codigo = (body.codigo || "").trim().toUpperCase();

  const extra = (process.env.RENACE_CODES || "")
    .split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
  const prefijos = { ...PREFIJOS };
  extra.forEach((p) => { if (!p.endsWith("-")) p += "-"; if (!prefijos[p]) prefijos[p] = p.replace("-", "").toLowerCase(); });

  const hit = Object.keys(prefijos).find((p) => codigo.startsWith(p));
  if (!hit) return Response.json({ ok: false, error: "Ese código no es válido. Revisalo o escribile a Sol." }, { status: 200 });
  return Response.json({ ok: true, plan: prefijos[hit] });
}

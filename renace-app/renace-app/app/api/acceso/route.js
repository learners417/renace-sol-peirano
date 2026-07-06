// POST /api/acceso — valida el código de compra y devuelve el plan.
// Configurar en Vercel: RENACE_CODES = "CAMINO-A1B2,ACOMP-C3D4,INTEGRAL-E5F6,..."
// El prefijo del código define el plan (CAMINO / ACOMP / INTEGRAL).
// Si RENACE_CODES no está configurado → modo demo: cualquier código entra.

const planDe = (codigo) => {
  const c = (codigo || "").toUpperCase();
  if (c.startsWith("INTEGRAL")) return "integral";
  if (c.startsWith("ACOMP")) return "acompanada";
  return "camino";
};

export async function POST(req) {
  try {
    const { codigo } = await req.json();
    const lista = (process.env.RENACE_CODES || "").split(",").map((x) => x.trim().toUpperCase()).filter(Boolean);
    const c = (codigo || "").trim().toUpperCase();

    if (lista.length === 0) {
      // modo demo (sin códigos configurados)
      return Response.json({ ok: true, plan: planDe(c), demo: true });
    }
    if (lista.includes(c)) {
      return Response.json({ ok: true, plan: planDe(c) });
    }
    return Response.json({ ok: false });
  } catch {
    return Response.json({ ok: false });
  }
}

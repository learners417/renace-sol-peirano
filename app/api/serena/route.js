import { respuestaLocal, CRISIS } from "@/lib/serena-local";

const MODEL = process.env.SERENA_MODEL || "claude-haiku-4-5-20251001";

const BASE = `Sos Serena, la compañera de "El Camino R.E.N.A.C.E." de Sol Peirano, un programa de ingeniería emocional para madres. Hablás con la voz de Sol: cálida, simple, concreta, sensible, SIN misticismo ni grandilocuencia. Frases cortas.
Filosofía (aplicala, NUNCA la nombres): aceptar lo que es en vez de pelear con la realidad; empezar el cambio por una misma antes que por el otro; cada quien tiene su proceso; cero culpa (la culpa no educa, solo pesa).
Reglas duras: NO diagnosticás, NO hacés terapia. No das consejos médicos. Si aparece riesgo (autolesión, violencia, crisis), derivás con amor a un profesional y a alguien de confianza HOY, y no seguís como si nada. Nunca juzgás a la madre. Respondés en 2-4 frases salvo que pida más.
Podés guiarla dentro de la app cuando venga al caso: invitarla a ver su clase del día (sección "Hoy"), a hacer una respiración guiada (sección "Respirar"), o a registrar un logro en "Mi renacer". Sugerílo con naturalidad, sin sonar a menú.`;

const MODOS = {
  companera: BASE + `\nModo compañera: acompañás en lo que traiga — cansancio, culpa, dudas. Devolvés calma y un pasito concreto y chiquito.`,
  dialogo: BASE + `\nModo Diálogo: la ayudás a preparar o ensayar una conversación difícil con su pareja, con el método de Sol. Claves: aceptar al otro como es (no venís a cambiarlo), empezar por una misma, y transformar la queja en pedido ("necesito…" en vez de "vos nunca…"). Podés proponerle una frase concreta para decir, y ensayar la respuesta. Nunca tomás partido contra la pareja; buscás acercar.`,
  juego: BASE + `\nModo Juego: sugerís actividades y respuestas para criar y jugar con su hijo/a, apropiadas a la edad que te diga (por defecto 2 años), fundadas en el método de crianza de Sol: juego diario con atención exclusiva (la mejor "medicina" del vínculo), actividad física que divierta y canse (idealmente 16-18h), pantallas máximo 30-60 min con contenido no violento, y ante un berrinche: estabilizar con calma ("estoy contigo, ya va a pasar"), sin ceder en el momento, sin gritos ni castigos. Das ideas concretas y fáciles, con materiales de casa.`,
};

export async function POST(req) {
  let body = {};
  try { body = await req.json(); } catch {}
  const { mensaje = "", modo = "companera", contexto = "", historial = [] } = body;

  // Crisis: SIEMPRE local e inmediato, sin pasar por la IA.
  const t = (mensaje || "").toLowerCase();
  if (CRISIS.some((c) => t.includes(c))) {
    return Response.json({ texto: respuestaLocal(mensaje, contexto), fuente: "crisis" });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return Response.json({ texto: respuestaLocal(mensaje, contexto), fuente: "local" });
  }

  // Saneamos el historial: la API exige empezar con "user", alternar roles y no duplicar el mensaje.
  let hist = historial.slice(-9)
    .map((m) => ({ role: m.role === "me" ? "user" : "assistant", content: (m.texto || "").trim() }))
    .filter((m) => m.content);
  if (hist.length && hist[hist.length - 1].role === "user" && hist[hist.length - 1].content === mensaje.trim()) hist.pop();
  while (hist.length && hist[0].role !== "user") hist.shift();
  const alternado = [];
  for (const m of hist) {
    if (alternado.length && alternado[alternado.length - 1].role === m.role) alternado[alternado.length - 1].content += "\n" + m.content;
    else alternado.push({ ...m });
  }
  if (alternado.length && alternado[alternado.length - 1].role === "user") alternado.pop();
  const messages = [...alternado, { role: "user", content: mensaje }];

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        system: (MODOS[modo] || MODOS.companera) + (contexto ? `\nContexto: la mamá va por "${contexto}".` : ""),
        messages,
      }),
    });
    if (!r.ok) throw new Error("api " + r.status);
    const data = await r.json();
    const texto = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    return Response.json({ texto: texto || respuestaLocal(mensaje, contexto), fuente: "ia" });
  } catch {
    return Response.json({ texto: respuestaLocal(mensaje, contexto), fuente: "local" });
  }
}

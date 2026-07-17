"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/ui";
import { getUser, getPais, lunaActual } from "@/lib/estado";
import { getModulo, etapaDeModulo } from "@/lib/programa";
import { t } from "@/lib/voz";

const MODOS = [
  { id: "companera", label: "Compañera", ic: "🤍", intro: "Estoy acá para lo que traigas hoy. Contame, sin filtro." },
  { id: "dialogo", label: "Con mi pareja", ic: "💬", intro: "Preparemos juntas esa conversación difícil. ¿Qué está pasando con tu pareja?" },
  { id: "juego", label: "Con mi hijo/a", ic: "🧸", intro: "¿Qué edad tiene tu peque? Pensamos una actividad o cómo manejar un momento." },
];

export default function Serena() {
  const router = useRouter();
  const [modo, setModo] = useState("companera");
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const [pais, setPais] = useState("OT");
  const [ctx, setCtx] = useState("");
  const scroller = useRef(null);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    setPais(getPais());
    const et = etapaDeModulo(Math.min(lunaActual(), 9));
    setCtx(et?.nombre || "");
  }, [router]);

  useEffect(() => {
    setMsgs([{ role: "app", texto: MODOS.find((m) => m.id === modo).intro }]);
  }, [modo]);

  useEffect(() => { scroller.current?.scrollTo(0, scroller.current.scrollHeight); }, [msgs, cargando]);

  async function enviar() {
    const texto = input.trim();
    if (!texto || cargando) return;
    const nuevo = [...msgs, { role: "me", texto }];
    setMsgs(nuevo); setInput(""); setCargando(true);
    try {
      const r = await fetch("/api/serena", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ mensaje: texto, modo, contexto: ctx, historial: nuevo.slice(-8) }),
      });
      const d = await r.json();
      setMsgs((m) => [...m, { role: "app", texto: d.texto }]);
    } catch {
      setMsgs((m) => [...m, { role: "app", texto: "Se me cortó la conexión un momento. Probá de nuevo 🤍" }]);
    } finally { setCargando(false); }
  }

  return (
    <div className="app app-pad" style={{ paddingTop: 22, display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
      <div className="center" style={{ marginBottom: 10 }}>
        <div className="eyebrow">Serena</div>
        <p className="tiny">Tu compañera con IA, que te responde con la voz y el método de Sol. Elegí cómo querés hablarle. No reemplaza a un profesional.</p>
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 10 }}>
        {MODOS.map((m) => (
          <button key={m.id} className={"agent-tab" + (modo === m.id ? " on" : "")} onClick={() => setModo(m.id)}>
            <span style={{ fontSize: "1.1rem", display: "block" }}>{m.ic}</span>{m.label}
          </button>
        ))}
      </div>

      <div ref={scroller} className="chat-scroll" style={{ flex: 1, overflowY: "auto" }}>
        {msgs.map((m, i) => (
          <div key={i} className={"bubble " + (m.role === "me" ? "bubble-me" : "bubble-app")}>{m.texto}</div>
        ))}
        {cargando && <div className="bubble bubble-app" style={{ color: "var(--ink-2)" }}>{t("pensando", pais)}</div>}
      </div>

      <div className="row" style={{ gap: 8, paddingBottom: 8 }}>
        <input className="field" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && enviar()} placeholder={t("escribiAqui", pais)} />
        <button className="btn btn-primary" style={{ width: "auto", padding: "14px 20px" }} onClick={enviar} disabled={cargando}>→</button>
      </div>

      <Nav />
    </div>
  );
}

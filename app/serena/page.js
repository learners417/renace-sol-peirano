"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { getUser, getOnboarding, indiceActual, saludoHora } from "@/lib/estado";
import { videoPorIndice, getModulo } from "@/lib/programa";
import { respuestaLocal, CRISIS } from "@/lib/serena-local";

export default function Serena() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [texto, setTexto] = useState("");
  const [pensando, setPensando] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    setUser(u);
    setMsgs([{ de: "serena", t: `${saludoHora()}, ${u.nombre} 🤍 Soy Serena, tu compañera de camino. Soy una asistente del método (no una terapeuta, y no reemplazo ayuda profesional). Estoy para acompañarte: ¿cómo venís hoy?` }]);
  }, [router]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, pensando]);

  if (!user) return null;

  const enviar = async (e) => {
    e.preventDefault();
    const t = texto.trim();
    if (!t || pensando) return;
    const v = videoPorIndice(Math.min(indiceActual(), 27));
    const sem = v ? getModulo(v.modulo) : null;
    const nuevos = [...msgs, { de: "ella", t }];
    setMsgs(nuevos);
    setTexto("");

    // Crisis: respuesta inmediata local, siempre (no depende de la API)
    if (CRISIS.some((c) => t.toLowerCase().includes(c))) {
      setMsgs((m) => [...m, { de: "serena", t: respuestaLocal(t, sem?.nombre) }]);
      return;
    }

    setPensando(true);
    try {
      const r = await fetch("/api/serena", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mensajes: nuevos, nombre: user.nombre, semana: { n: v ? v.modulo : 1, titulo: sem?.nombre, eje: sem?.nombre } }),
      });
      const data = await r.json();
      const respuesta = data.ok && data.texto ? data.texto : respuestaLocal(t, sem?.nombre);
      setMsgs((m) => [...m, { de: "serena", t: respuesta }]);
    } catch {
      setMsgs((m) => [...m, { de: "serena", t: respuestaLocal(t, sem?.nombre) }]);
    } finally {
      setPensando(false);
    }
  };

  return (
    <>
      <div className="app">
        <div className="topbar">
          <div className="brand">Serena<span> 💬</span></div>
          <div className="pill">tu compañera</div>
        </div>
        <div className="chat">
          {msgs.map((m, i) => (
            <div key={i} className={"msg " + (m.de === "ella" ? "ella" : "serena")}>{m.t}</div>
          ))}
          {pensando && <div className="msg serena" style={{ opacity: .6 }}>escribiendo…</div>}
          <div ref={endRef} />
        </div>
        <form className="chatrow" onSubmit={enviar}>
          <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Contame cómo estás…" />
          <button type="submit" disabled={pensando}>➤</button>
        </form>
        <p className="sub center" style={{ fontSize: 11.5, marginTop: 10 }}>
          Serena acompaña, no diagnostica ni reemplaza terapia. En crisis, buscá ayuda profesional.
        </p>
      </div>
      <Nav />
    </>
  );
}

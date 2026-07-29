"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { getUser, getPais } from "@/lib/estado";
import { conjuga, habla } from "@/lib/voz";

// Cada respiración: fases [texto, segundos, escala del orbe]
const RESPIRACIONES = [
  {
    id: "sos", nombre: "SOS Calma", icono: "viento", color: "#8AA890",
    cuando: "Para el momento difícil con tu hijo/a — la que enseña Sol.",
    fases: [["inhalá", 4, 1.15], ["retené", 4, 1.15], ["exhalá", 4, 0.85], ["vacío", 4, 0.85]],
    frases: ["Mamá necesita un respiro. Ya vuelvo, te quiero.", "Estoy contigo. Ya va a pasar.", "Puedo elegir la calma antes de responder.", "No estoy fallando. Estoy respirando."],
  },
  {
    id: "dormir", nombre: "Para dormir", icono: "luna", color: "#7E6399",
    cuando: "En la cama, para soltar el día y que el cuerpo baje.",
    fases: [["inhalá", 4, 1.12], ["retené", 7, 1.12], ["exhalá suave", 8, 0.82]],
    frases: ["Hoy hice suficiente.", "Mi cuerpo puede descansar: yo lo cuido mañana."],
  },
  {
    id: "ansiedad", nombre: "Ansiedad o agitación", icono: "brujula", color: "#9D86BE",
    cuando: "Cuando la cabeza va a mil y el pecho está apretado.",
    fases: [[habla(pais, "inhalá"), 5, 1.12], [habla(pais, "exhalá"), 5, 0.86]],
    frases: [habla(pais, "Estoy acá, ahora. Lo demás puede esperar un minuto."), "Mi respiración es mi ancla."],
  },
  {
    id: "angustia", nombre: "Angustia", icono: "corazon", color: "#D6A6C4",
    cuando: "Cuando hay un nudo y ganas de llorar. Dos inhalaciones cortas y soltás largo.",
    fases: [[habla(pais, "inhalá"), 2, 1.06], [habla(pais, "inhalá un poco más"), 2, 1.16], [habla(pais, "exhalá laaargo"), 7, 0.8]],
    frases: ["Lo que siento es válido. Lo dejo pasar como una ola.", "Llorar también descarga. Estoy bien."],
  },
  {
    id: "energia", nombre: "Energía para arrancar", icono: "sol", color: "#C9A24B",
    cuando: "Para empezar el día o levantarte de la siesta del alma.",
    fases: [["inhalá profundo", 3, 1.18], ["exhalá con fuerza", 3, 0.84]],
    frases: ["Hoy me alcanza con un paso.", "Mi energía se construye respirando."],
  },
  {
    id: "presencia", nombre: "Volver al cuerpo", icono: "hoja", color: "#5A9170",
    cuando: "Cuando estás en piloto automático y querés aterrizar.",
    fases: [["inhalá", 4, 1.12], ["pausa", 2, 1.12], ["exhalá", 6, 0.85]],
    frases: ["Vuelvo a mí. Estoy en mi cuerpo, en este momento.", "Este minuto es mío."],
  },
];

const MINIMO = 60; // segundos

function Practica({ r, pais, onVolver }) {
  const [activa, setActiva] = useState(false);
  const [faseIdx, setFaseIdx] = useState(0);
  const [seg, setSeg] = useState(0);
  const timer = useRef(null);
  const faseSeg = useRef(0);

  useEffect(() => {
    if (!activa) { clearInterval(timer.current); return; }
    timer.current = setInterval(() => {
      setSeg((s) => s + 1);
      faseSeg.current += 1;
      setFaseIdx((i) => {
        if (faseSeg.current >= r.fases[i][1]) { faseSeg.current = 0; return (i + 1) % r.fases.length; }
        return i;
      });
    }, 1000);
    return () => clearInterval(timer.current);
  }, [activa, r.fases]);

  const [texto, dur, escala] = r.fases[faseIdx];
  const cumplido = seg >= MINIMO;
  const mm = String(Math.floor(seg / 60));
  const ss = String(seg % 60).padStart(2, "0");

  return (
    <div className="app app-pad" style={{ paddingTop: 22, minHeight: "100dvh" }}>
      <button className="link" onClick={onVolver}>‹ Elegir otra</button>
      <div className="center stack" style={{ marginTop: 6 }}>
        <div className="eyebrow">{r.nombre}</div>
        <div
          className="orb"
          style={{
            margin: "26px auto 10px", background: r.color, animation: "none",
            transform: `scale(${activa ? escala : 1})`,
            transition: `transform ${dur}s ease-in-out`,
          }}
        >
          {activa ? habla(pais, texto) : "¿lista?"}
        </div>

        <div className="card" style={{ padding: "10px 18px", width: "auto" }}>
          <div className="row" style={{ gap: 10 }}>
            <b className="num" style={{ fontSize: "1.4rem", color: cumplido ? "var(--salvia)" : "var(--luna)" }}>{mm}:{ss}</b>
            <span className="tiny">{cumplido ? conjuga(pais, "mínimo cumplido — seguí lo que necesites", "mínimo cumplido — sigue lo que necesites") : `mínimo ${MINIMO} segundos`}</span>
          </div>
          {!cumplido && (
            <div style={{ height: 5, background: "var(--surface-2)", borderRadius: 3, marginTop: 8, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(100, (seg / MINIMO) * 100)}%`, background: r.color, transition: "width 1s linear" }} />
            </div>
          )}
        </div>

        {!activa ? (
          <button className="btn btn-primary btn-lg" onClick={() => { setActiva(true); setSeg(0); setFaseIdx(0); faseSeg.current = 0; }}>
            {seg > 0 ? "Repetir" : "Empezar a respirar"}
          </button>
        ) : (
          <button className="btn btn-ghost btn-lg" onClick={() => setActiva(false)}>Terminar</button>
        )}

        <div className="card stack" style={{ textAlign: "left", marginTop: 6 }}>
          <b className="tiny" style={{ color: "var(--luna)" }}>{conjuga(pais, "SI EL MOMENTO APRIETA, PODÉS DECIR:", "SI EL MOMENTO APRIETA, PUEDES DECIR:")}</b>
          {r.frases.map((f, i) => <p key={i} className="serif-quote" style={{ fontSize: "1rem" }}>“{habla(pais, f)}”</p>)}
        </div>
        <p className="tiny">{conjuga(pais, "¿Necesitás hablar?", "¿Necesitas hablar?")} <Link href="/serena" style={{ color: "var(--luna)", fontWeight: 700 }}>{habla(pais, "Serena está acá")}</Link></p>
      </div>
    </div>
  );
}

export default function Respirar() {
  const router = useRouter();
  const [pais, setPaisS] = useState("OT");
  const [sel, setSel] = useState(null);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    setPaisS(getPais());
  }, [router]);

  if (sel) return <Practica r={sel} pais={pais} onVolver={() => setSel(null)} />;

  return (
    <div className="app app-pad" style={{ paddingTop: 22 }}>
      <button className="link" onClick={() => router.back()}>‹ Volver</button>
      <div className="center stack" style={{ marginTop: 8 }}>
        <div className="ico" style={{ color: "var(--luna)" }}><Icon name="viento" size={30} /></div>
        <h1 className="h1">{conjuga(pais, "¿Qué necesitás ahora?", "¿Qué necesitas ahora?")}</h1>
        <p className="tiny">{habla(pais, "Un minuto de respiración guiada, mínimo. Elegí según tu momento.")}</p>
      </div>
      <div className="stack" style={{ marginTop: 16 }}>
        {RESPIRACIONES.map((r) => (
          <button key={r.id} className="card" style={{ textAlign: "left", cursor: "pointer" }} onClick={() => setSel(r)}>
            <div className="row">
              <span className="state" style={{ background: r.color + "22", color: r.color }}><Icon name={r.icono} size={17} /></span>
              <div>
                <b>{r.nombre}</b>
                <p className="tiny">{habla(pais, r.cuando)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div style={{ height: 30 }} />
    </div>
  );
}

"use client";
import { Icon } from "@/components/Icon";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPais } from "@/lib/estado";
import { conjuga } from "@/lib/voz";

const FASES = [
  { l: "Inhalá", lt: "Inhala", s: 4, scale: 1.05 },
  { l: "Retené", lt: "Retén", s: 4, scale: 1.05 },
  { l: "Exhalá", lt: "Exhala", s: 4, scale: 0.72 },
  { l: "Vacío", lt: "Vacío", s: 4, scale: 0.72 },
];

const FRASES = [
  "Mamá necesita un respiro. Ya vuelvo, te quiero.",
  "Estoy contigo. Ya va a pasar.",
  "Puedo elegir la calma antes de responder.",
  "No estoy fallando. Estoy respirando.",
];

export default function Respirar() {
  const router = useRouter();
  const [activo, setActivo] = useState(false);
  const [fase, setFase] = useState(0);
  const [cuenta, setCuenta] = useState(4);
  const [ciclos, setCiclos] = useState(0);
  const [pais, setPais] = useState("OT");
  const ref = useRef();

  useEffect(() => setPais(getPais()), []);

  useEffect(() => {
    if (!activo) return;
    ref.current = setInterval(() => {
      setCuenta((c) => {
        if (c > 1) return c - 1;
        setFase((f) => {
          const nf = (f + 1) % 4;
          if (nf === 0) setCiclos((x) => x + 1);
          return nf;
        });
        return 4;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [activo]);

  const f = FASES[fase];
  const voseo = conjuga(pais, 1, 0);

  return (
    <div className="app app-pad" style={{ paddingTop: 22, minHeight: "100dvh" }}>
      <button className="link" onClick={() => router.back()}>‹ Volver</button>
      <div className="center stack" style={{ marginTop: 8 }}>
        <div className="eyebrow">SOS Calma</div>
        <h1 className="h1">Respiración 4·4·4·4</h1>
        <p className="tiny">La que enseña Sol. Seguí el ritmo del círculo.</p>
      </div>

      <div className="breath-wrap">
        <div className="orb" style={{ animation: "none", transform: `scale(${activo ? f.scale : 0.85})`, transition: "transform 1s ease" }}>
          {activo ? <div className="center"><div style={{ fontFamily: "var(--serif)", fontSize: "1.3rem" }}>{voseo ? f.l : f.lt}</div><div className="num" style={{ fontSize: "1.8rem" }}>{cuenta}</div></div> : <Icon name="viento" size={40} />}
        </div>
      </div>

      {!activo ? (
        <button className="btn btn-primary btn-lg" onClick={() => { setActivo(true); setFase(0); setCuenta(4); }}>Empezar a respirar</button>
      ) : (
        <div className="stack">
          <p className="center tiny">{ciclos} respiraciones completas</p>
          <button className="btn btn-ghost" onClick={() => setActivo(false)}>Terminar</button>
        </div>
      )}

      <div className="card" style={{ marginTop: 22 }}>
        <b className="tiny" style={{ color: "var(--luna)" }}>SI EL MOMENTO CON TU HIJO/A APRIETA, PODÉS DECIR:</b>
        <div className="stack" style={{ marginTop: 8 }}>
          {FRASES.map((fr, i) => <p key={i} className="serif-quote" style={{ fontSize: "1.05rem" }}>“{fr}”</p>)}
        </div>
      </div>

      <p className="tiny center" style={{ marginTop: 16 }}>
        ¿Necesitás hablar? <Link href="/serena" className="link">Serena está acá</Link>
      </p>
    </div>
  );
}

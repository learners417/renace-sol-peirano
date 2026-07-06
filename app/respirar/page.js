"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/estado";

const CICLO = [
  { fase: "Inhalá", dur: 4, escala: 1.35 },
  { fase: "Sostené", dur: 4, escala: 1.35 },
  { fase: "Exhalá", dur: 6, escala: 1 },
];

export default function Respirar() {
  const router = useRouter();
  const [activo, setActivo] = useState(false);
  const [idx, setIdx] = useState(0);
  const [seg, setSeg] = useState(CICLO[0].dur);
  const [ciclos, setCiclos] = useState(0);
  const timer = useRef(null);

  useEffect(() => { if (!getUser()) router.replace("/login"); }, [router]);

  useEffect(() => {
    if (!activo) return;
    timer.current = setInterval(() => {
      setSeg((s) => {
        if (s <= 1) {
          const next = (idx + 1) % CICLO.length;
          if (next === 0) setCiclos((c) => c + 1);
          setIdx(next);
          return CICLO[next].dur;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer.current);
  }, [activo, idx]);

  const actual = CICLO[idx];

  return (
    <div className="sos-screen" style={{ background: "linear-gradient(170deg,#7E6399,#9D86BE)" }}>
      <button onClick={() => router.back()} style={{ position: "absolute", top: 24, left: 20, background: "none", border: "none", color: "rgba(255,255,255,.85)", fontSize: 15, fontWeight: 700 }}>‹ Volver</button>
      <div style={{ fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", opacity: .8, fontWeight: 800 }}>Respirá conmigo</div>
      <div className="breath" style={{
        width: 170, height: 170, transform: `scale(${activo ? actual.escala : 1})`,
        transition: `transform ${activo ? actual.dur : 1}s ease-in-out`, animation: "none",
      }}>
        <div className="inner" style={{ width: 110, height: 110 }} />
      </div>
      {activo ? (
        <>
          <div className="sos-txt">{actual.fase}</div>
          <div style={{ fontSize: 40, fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, marginTop: 6 }}>{seg}</div>
          <div className="sos-sub">{ciclos > 0 ? `${ciclos} ${ciclos === 1 ? "respiración completa" : "respiraciones completas"} 🤍` : "Dejate llevar. No hay nada que lograr."}</div>
          <button className="sos-btn" onClick={() => router.back()} style={{ marginTop: 26 }}>Listo, gracias 🤍</button>
        </>
      ) : (
        <>
          <div className="sos-txt">Una pausa para vos</div>
          <div className="sos-sub">Tres respiraciones profundas alcanzan para volver a tu centro. Cuando quieras.</div>
          <button className="sos-btn" onClick={() => { setActivo(true); setIdx(0); setSeg(CICLO[0].dur); setCiclos(0); }} style={{ marginTop: 26 }}>Empezar a respirar</button>
        </>
      )}
    </div>
  );
}

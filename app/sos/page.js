"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// SOS Calma: primero respiración guiada, luego frases para el momento crítico.
const pasos = [
  { t: "Pará. Ya hiciste lo más difícil: pedir una pausa.", s: "Respirá conmigo. Inflá la panza al inhalar… soltá despacio.", dur: 22 },
  { t: "Esto que sentís es una ola.", s: "No la empujes. Dejala subir… y bajar. Las olas siempre bajan.", dur: 18 },
  { t: "Tu hijo no lo hace contra vos.", s: "Está aprendiendo, con las herramientas que tiene. Igual que vos.", dur: 16 },
  { t: "Aceptá este momento tal como es.", s: "No tiene que gustarte. Solo dejá de pelearle. Ahí aparece tu espacio para elegir.", dur: 16 },
];

// Frases listas para usar en el momento (lo que la avatar necesita YA)
const frases = [
  "“Veo que estás muy enojado. Estoy acá con vos.”",
  "“No te voy a dejar solo con esto que sentís.”",
  "“Respiremos juntos un segundo, vos y yo.”",
  "“Está bien estar triste. Yo te acompaño.”",
  "“Mamá necesita un respiro. Ya vuelvo, te quiero.”",
  "“Esto que se puede: te ayudo. Esto que no: te entiendo.”",
];

export default function SOS() {
  const router = useRouter();
  const [modo, setModo] = useState("respirar"); // respirar | frases
  const [i, setI] = useState(0);
  const [seg, setSeg] = useState(pasos[0].dur);

  useEffect(() => {
    if (modo !== "respirar") return;
    setSeg(pasos[i].dur);
    const int = setInterval(() => {
      setSeg((s) => {
        if (s <= 1) { clearInterval(int); setI((x) => Math.min(x + 1, pasos.length - 1)); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(int);
  }, [i, modo]);

  const p = pasos[i];
  const ultimo = i === pasos.length - 1;

  if (modo === "frases") {
    return (
      <div className="sos-screen" style={{ justifyContent: "flex-start", paddingTop: 60 }}>
        <button onClick={() => router.push("/")} style={{ position: "absolute", top: 24, left: 20, background: "none", border: "none", color: "rgba(255,255,255,.85)", fontSize: 15, fontWeight: 700 }}>‹ Salir</button>
        <div style={{ fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", opacity: .8, fontWeight: 800, marginBottom: 6 }}>Qué podés decirle</div>
        <p className="sos-sub" style={{ marginBottom: 20 }}>Elegí la que te salga. Con calma, mirándolo a los ojos.</p>
        <div style={{ width: "100%", maxWidth: 380 }}>
          {frases.map((f, idx) => (
            <div key={idx} style={{ background: "rgba(255,255,255,.14)", borderRadius: 16, padding: "16px 18px", marginBottom: 11, fontFamily: "'Cormorant Garamond',serif", fontSize: 19, lineHeight: 1.35 }}>{f}</div>
          ))}
        </div>
        <button className="sos-btn" onClick={() => router.push("/")} style={{ marginTop: 22 }}>Volví a mí. Gracias 🤍</button>
      </div>
    );
  }

  return (
    <div className="sos-screen">
      <button onClick={() => router.push("/")} style={{ position: "absolute", top: 24, left: 20, background: "none", border: "none", color: "rgba(255,255,255,.7)", fontSize: 14, fontWeight: 700 }}>‹ Salir</button>
      <div style={{ fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", opacity: .8, fontWeight: 800 }}>SOS Calma · {i + 1}/{pasos.length}</div>
      <div className="breath"><div className="inner" /></div>
      <div className="sos-txt">{p.t}</div>
      <div className="sos-sub">{p.s}</div>
      {!ultimo && <div style={{ marginTop: 18, fontSize: 13, opacity: .7 }}>{seg > 0 ? `${seg}s…` : ""}</div>}
      {!ultimo && <button className="sos-btn" onClick={() => setI(i + 1)}>Siguiente →</button>}
      {ultimo && (
        <>
          <button className="sos-btn" onClick={() => setModo("frases")} style={{ marginTop: 26 }}>¿Qué le digo? →</button>
          <button style={{ marginTop: 14, background: "none", border: "none", color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 700 }}
            onClick={() => router.push("/")}>Ya estoy mejor, salir</button>
        </>
      )}
    </div>
  );
}

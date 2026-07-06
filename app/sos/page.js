"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// SOS Calma: secuencia guiada de ~90 segundos para el momento crítico.
const pasos = [
  { t: "Pará. Ya hiciste lo más difícil: pedir una pausa.", s: "Respirá conmigo. Inflá la panza al inhalar… soltá despacio.", dur: 24 },
  { t: "Esto que sentís es una ola.", s: "No la empujes. Dejala subir… y bajar. Las olas siempre bajan.", dur: 20 },
  { t: "Tu hijo no lo hace contra vos.", s: "Está aprendiendo, con las herramientas que tiene. Igual que vos.", dur: 16 },
  { t: "Aceptá este momento tal como es.", s: "No tiene que gustarte. Solo dejá de pelearle. Ahí aparece tu espacio para elegir.", dur: 16 },
  { t: "Ahora elegí tu próximo paso, en calma.", s: "Podés abrazar, poner un límite suave, o pedir un minuto más. Cualquiera está bien si sale de tu calma.", dur: 0 },
];

export default function SOS() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [seg, setSeg] = useState(pasos[0].dur);

  useEffect(() => {
    if (pasos[i].dur === 0) return;
    setSeg(pasos[i].dur);
    const int = setInterval(() => {
      setSeg((s) => {
        if (s <= 1) { clearInterval(int); setI((x) => Math.min(x + 1, pasos.length - 1)); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(int);
  }, [i]);

  const p = pasos[i];
  const ultimo = i === pasos.length - 1;

  return (
    <div className="sos-screen">
      <div style={{ fontSize: 13, letterSpacing: ".2em", textTransform: "uppercase", opacity: .8, fontWeight: 800 }}>
        SOS Calma · {i + 1}/{pasos.length}
      </div>
      <div className="breath"><div className="inner" /></div>
      <div className="sos-txt">{p.t}</div>
      <div className="sos-sub">{p.s}</div>
      {!ultimo && <div style={{ marginTop: 18, fontSize: 13, opacity: .7 }}>{seg > 0 ? `${seg}s…` : ""}</div>}
      {!ultimo && <button className="sos-btn" onClick={() => setI(i + 1)}>Siguiente →</button>}
      {ultimo && <button className="sos-btn" onClick={() => router.push("/")}>Volví a mí. Gracias 🤍</button>}
      <button style={{ marginTop: 14, background: "none", border: "none", color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 700 }}
        onClick={() => router.push("/")}>Salir</button>
    </div>
  );
}

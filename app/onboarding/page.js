"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getOnboarding, guardarOnboarding, guardarDiagnostico } from "@/lib/estado";
import { diagnostico, mensajeDolor } from "@/lib/programa";

const moods = [
  { v: 1, e: "🌧", l: "Muy cansada" }, { v: 2, e: "🌫", l: "Apagada" },
  { v: 3, e: "⛅", l: "Más o menos" }, { v: 4, e: "🌤", l: "Bien" }, { v: 5, e: "☀️", l: "Radiante" },
];

// Onboarding CORTO y claro: 4 pasos. Bienvenida → 1 pregunta clave → termómetro → carta.
export default function Onboarding() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [dolor, setDolor] = useState(null);
  const [termo, setTermo] = useState(null);
  const [carta, setCarta] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    if (getOnboarding()) { router.replace("/"); return; }
    setUser(u);
  }, [router]);

  if (!user) return null;

  const preguntaDolor = diagnostico[0]; // "¿Qué es lo que más te pesa hoy?"

  const elegirDolor = (v) => {
    setDolor(v);
    guardarDiagnostico({ dolor: v });
    setTimeout(() => setPaso(2), 300);
  };

  const finalizar = () => {
    guardarOnboarding({ termometro: termo, carta });
    router.replace("/");
  };

  return (
    <div className="full">
      <div className="step-dot-row">{[0,1,2,3].map(i => <div key={i} className={"sdot"+(i===paso?" on":"")} />)}</div>

      {paso === 0 && (
        <div className="center">
          <div style={{ fontSize: 48, marginBottom: 14 }}>🤍</div>
          <h1 className="h1">Hola, {user.nombre}.</h1>
          <p style={{ fontSize: 17, color: "#5A5266", margin: "16px 0 10px", lineHeight: 1.6 }}>
            Este es tu camino de vuelta a vos.
          </p>
          <p style={{ fontSize: 15.5, color: "#6A6276", lineHeight: 1.65 }}>
            Cada día, unos 10 minutos para vos: un video de Sol, una actividad simple, y una frase para llevarte.
            A tu ritmo, sin culpa. Empecemos conociéndote un poquito. 🤍
          </p>
          <button className="btn-gigante mt2" onClick={() => setPaso(1)}>Empezar →</button>
        </div>
      )}

      {paso === 1 && (
        <div>
          <div className="kick center">Una sola pregunta</div>
          <h1 className="h2 center" style={{ margin: "8px 0 4px" }}>{preguntaDolor.pregunta}</h1>
          <p className="sub center" style={{ marginBottom: 22 }}>Así sé por dónde acompañarte primero.</p>
          {preguntaDolor.opciones.map((o) => (
            <div key={o.v} className={"planopt" + (dolor === o.v ? " on" : "")} onClick={() => elegirDolor(o.v)}>
              <div style={{ fontSize: 24 }}>{o.e}</div>
              <div className="pt1" style={{ fontWeight: 700 }}>{o.t}</div>
            </div>
          ))}
        </div>
      )}

      {paso === 2 && (
        <div className="center">
          <div style={{ fontSize: 40, marginBottom: 10 }}>🤍</div>
          <div className="semilla" style={{ textAlign: "left", marginBottom: 20 }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, lineHeight: 1.5, fontWeight: 600 }}>
              {mensajeDolor[dolor] || "Estoy acá para acompañarte a volver a vos."}
            </div>
            <div className="sm">— Sol</div>
          </div>
          <div className="kick" style={{ marginBottom: 8 }}>Antes de empezar</div>
          <h2 className="h2">¿Cómo estás llegando hoy?</h2>
          <p className="sub">Respondé lo que sientas. Esto lo vas a volver a ver al final del camino.</p>
          <div className="moods moods-grande">
            {moods.map((m) => (
              <div key={m.v} className={"mood" + (termo === m.v ? " on" : "")} onClick={() => setTermo(m.v)}>{m.e}<span>{m.l}</span></div>
            ))}
          </div>
          <button className="btn-gigante" disabled={!termo} onClick={() => setPaso(3)}>Seguir →</button>
        </div>
      )}

      {paso === 3 && (
        <div>
          <div className="kick center">Un regalo para tu yo del futuro</div>
          <h1 className="h2 center" style={{ margin: "8px 0" }}>Escribite unas líneas</h1>
          <p className="sub center">Cómo te sentís hoy, qué deseás. Te la devolvemos al graduarte, en 12 semanas. 🤍</p>
          <textarea className="nota" style={{ minHeight: 140, marginTop: 14 }} value={carta}
            onChange={(e) => setCarta(e.target.value)} placeholder="Querida yo: hoy me siento..." />
          <button className="btn-gigante mt" disabled={carta.trim().length < 10} onClick={finalizar}>Empezar mi camino ✿</button>
          <button className="hoy-link" style={{ display: "block", margin: "10px auto 0" }} onClick={finalizar}>Prefiero escribirla después</button>
        </div>
      )}
    </div>
  );
}

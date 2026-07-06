"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getOnboarding, guardarOnboarding, guardarDiagnostico } from "@/lib/estado";
import { diagnostico, mensajeDolor } from "@/lib/programa";

const moods = [
  { v: 1, e: "🌧", l: "Muy cansada" },
  { v: 2, e: "🌫", l: "Apagada" },
  { v: 3, e: "⛅", l: "Más o menos" },
  { v: 4, e: "🌤", l: "Bien" },
  { v: 5, e: "☀️", l: "Radiante" },
];

export default function Onboarding() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [diagIdx, setDiagIdx] = useState(0);
  const [respuestas, setRespuestas] = useState({});
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

  const totalDiag = diagnostico.length;
  const dolor = respuestas["dolor"];

  const responder = (id, v) => {
    const nuevas = { ...respuestas, [id]: v };
    setRespuestas(nuevas);
    setTimeout(() => {
      if (diagIdx < totalDiag - 1) setDiagIdx(diagIdx + 1);
      else { guardarDiagnostico(nuevas); setPaso(2); } // pasa al mensaje personalizado
    }, 300);
  };

  const finalizar = () => {
    guardarOnboarding({ termometro: termo, carta });
    router.replace("/");
  };

  // pasos: 0 bienvenida | 1 diagnóstico | 2 mensaje dolor | 3 termómetro | 4 carta | 5 jardín
  return (
    <div className="full">
      <div className="step-dot-row">
        {[0,1,2,3,4,5].map(i => <div key={i} className={"sdot"+(i===paso?" on":"")} />)}
      </div>

      {paso === 0 && (
        <div className="center">
          <div style={{ fontSize: 46, marginBottom: 14 }}>🤍</div>
          <h1 className="h1">Hola, {user.nombre}.</h1>
          <p style={{ fontSize: 16.5, color: "#5A5266", margin: "16px 0 8px", lineHeight: 1.65 }}>
            Llegaste. Y con eso ya empezaste.
          </p>
          <p style={{ fontSize: 15.5, color: "#6A6276", lineHeight: 1.65 }}>
            Antes de arrancar, quiero conocerte un poco. Son tres preguntas cortas
            para acompañarte de la forma que vos necesitás. No hay respuestas correctas. 🤍
          </p>
          <div className="vidph mt2"><div className="play"><svg width="15" height="17" viewBox="0 0 15 17"><path d="M0 0 L15 8.5 L0 17 Z" fill="#7E6399"/></svg></div>Video de bienvenida de Sol · próximamente</div>
          <button className="btn mt" onClick={() => setPaso(1)}>Empezar →</button>
        </div>
      )}

      {paso === 1 && (() => {
        const q = diagnostico[diagIdx];
        return (
          <div>
            <div className="kick">Pregunta {diagIdx + 1} de {totalDiag}</div>
            <h1 className="h2" style={{ margin: "8px 0 4px" }}>{q.pregunta}</h1>
            <p className="sub" style={{ marginBottom: 20 }}>{q.sub}</p>
            {q.opciones.map((o) => (
              <div key={o.v}
                className={"planopt" + (respuestas[q.id] === o.v ? " on" : "")}
                onClick={() => responder(q.id, o.v)}>
                <div style={{ fontSize: 24 }}>{o.e}</div>
                <div className="pt1" style={{ fontWeight: 700 }}>{o.t}</div>
              </div>
            ))}
          </div>
        );
      })()}

      {paso === 2 && (
        <div className="center">
          <div style={{ fontSize: 44, marginBottom: 12 }}>🤍</div>
          <h1 className="h2">Te escucho, {user.nombre}.</h1>
          <div className="semilla" style={{ marginTop: 20, textAlign: "left" }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 21, lineHeight: 1.5, fontWeight: 600 }}>
              {mensajeDolor[dolor] || "Estoy acá para acompañarte a volver a vos, de a un pasito por día."}
            </div>
            <div className="sm">— Sol</div>
          </div>
          <button className="btn mt2" onClick={() => setPaso(3)}>Seguir →</button>
        </div>
      )}

      {paso === 3 && (
        <div>
          <div className="kick">Tu foto de entrada</div>
          <h1 className="h2" style={{ margin: "8px 0" }}>¿Cómo estás llegando, de verdad?</h1>
          <p className="sub">No hay respuesta correcta. Solo la tuya. Esta foto la vas a volver a ver al final del camino.</p>
          <div className="moods">
            {moods.map((m) => (
              <div key={m.v} className={"mood" + (termo === m.v ? " on" : "")} onClick={() => setTermo(m.v)}>
                {m.e}<span>{m.l}</span>
              </div>
            ))}
          </div>
          <button className="btn" disabled={!termo} onClick={() => setPaso(4)}>Así llego →</button>
        </div>
      )}

      {paso === 4 && (
        <div>
          <div className="kick">Tu carta</div>
          <h1 className="h2" style={{ margin: "8px 0" }}>Escribile unas líneas a la {user.nombre} de dentro de 12 semanas</h1>
          <p className="sub">Cómo te sentís hoy, qué deseás para vos. La guardamos con llave: te la devolvemos el día de tu graduación. 🤍</p>
          <textarea className="nota" style={{ minHeight: 150, marginTop: 14 }} value={carta}
            onChange={(e) => setCarta(e.target.value)}
            placeholder="Querida yo: hoy me siento..." />
          <button className="btn mt" disabled={carta.trim().length < 10} onClick={() => setPaso(5)}>Guardar mi carta →</button>
        </div>
      )}

      {paso === 5 && (
        <div className="center">
          <div style={{ fontSize: 52, marginBottom: 10 }}>🌱</div>
          <h1 className="h2">Tu jardín está plantado</h1>
          <p style={{ fontSize: 15.5, color: "#6A6276", margin: "14px 0", lineHeight: 1.65 }}>
            Cada día que hagas tu ritual, lo regás. Cada semana completa, florece una flor.
            Y si un día no podés, <b style={{ color: "#7E6399" }}>tu jardín te espera</b> — acá no se marchita nada.
          </p>
          <button className="btn" onClick={finalizar}>Regar mi primer día →</button>
        </div>
      )}
    </div>
  );
}

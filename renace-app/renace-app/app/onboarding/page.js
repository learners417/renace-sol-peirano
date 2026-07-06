"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getOnboarding, guardarOnboarding } from "@/lib/estado";

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

  const finalizar = () => {
    guardarOnboarding({ termometro: termo, carta });
    router.replace("/");
  };

  return (
    <div className="full">
      <div className="step-dot-row">{[0,1,2,3].map(i => <div key={i} className={"sdot"+(i===paso?" on":"")} />)}</div>

      {paso === 0 && (
        <div className="center">
          <div style={{ fontSize: 46, marginBottom: 14 }}>🤍</div>
          <h1 className="h1">Hola, {user.nombre}.</h1>
          <p style={{ fontSize: 16.5, color: "#5A5266", margin: "16px 0 8px", lineHeight: 1.65 }}>
            Llegaste. Y con eso ya empezaste.
          </p>
          <p style={{ fontSize: 15.5, color: "#6A6276", lineHeight: 1.65 }}>
            Este camino no viene a exigirte nada. Viene a acompañarte a volver a vos —
            un pasito de 10 minutos por día, a tu ritmo, sin culpa. Acá nada está mal:
            todo lo que sos y lo que sentís tiene lugar.
          </p>
          <div className="vidph mt2"><div className="play"><svg width="15" height="17" viewBox="0 0 15 17"><path d="M0 0 L15 8.5 L0 17 Z" fill="#7E6399"/></svg></div>Video de bienvenida de Sol · próximamente</div>
          <button className="btn mt" onClick={() => setPaso(1)}>Empezar →</button>
        </div>
      )}

      {paso === 1 && (
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
          <button className="btn" disabled={!termo} onClick={() => setPaso(2)}>Así llego →</button>
        </div>
      )}

      {paso === 2 && (
        <div>
          <div className="kick">Tu carta</div>
          <h1 className="h2" style={{ margin: "8px 0" }}>Escribile unas líneas a la {user.nombre} de dentro de 12 semanas</h1>
          <p className="sub">Cómo te sentís hoy, qué deseás para vos. La guardamos con llave: te la devolvemos el día de tu graduación. 🤍</p>
          <textarea className="nota" style={{ minHeight: 150, marginTop: 14 }} value={carta}
            onChange={(e) => setCarta(e.target.value)}
            placeholder="Querida yo: hoy me siento..." />
          <button className="btn mt" disabled={carta.trim().length < 10} onClick={() => setPaso(3)}>Guardar mi carta →</button>
        </div>
      )}

      {paso === 3 && (
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

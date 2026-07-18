"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { guardarOnboarding, guardarDiagnostico, setPais, getUser } from "@/lib/estado";
import { mensajeSolInicio, diagnostico, mensajeDolor } from "@/lib/programa";
import { PAISES } from "@/lib/voz";
import { Luna } from "@/components/Luna";

export default function Onboarding() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [pais, setPaisSel] = useState("");
  const [dolor, setDolor] = useState("");
  const [termometro, setTermometro] = useState(0);
  const [carta, setCarta] = useState("");
  const nombre = (getUser()?.nombre) || "mamá";
  const dolorQ = diagnostico[0];

  function next() { setPaso((p) => p + 1); }
  function finish() {
    setPais(pais || "OT");
    guardarDiagnostico({ dolor });
    guardarOnboarding({ termometro, carta, pais: pais || "OT" });
    router.replace("/hoy");
  }

  return (
    <div className="app app-pad" style={{ paddingTop: 34 }}>
      <div className="step-dots" style={{ marginBottom: 22 }}>
        {[0, 1, 2, 3].map((i) => <i key={i} className={i <= paso ? "on" : ""} />)}
      </div>

      {paso === 0 && (
        <div className="stack center">
          <div className="luna-hero"><Luna fase={0.06} size={120} /></div>
          <h1 className="h1">Hola, {nombre}</h1>
          <p className="serif-quote" style={{ margin: "8px 0" }}>{mensajeSolInicio}</p>
          <button className="btn btn-primary btn-lg" onClick={next}>Empezar</button>
        </div>
      )}

      {paso === 1 && (
        <div className="stack">
          <div className="eyebrow">Para hablarte como sos</div>
          <h2 className="h2">¿Desde qué país nos acompañás?</h2>
          <div className="stack">
            {PAISES.map((p) => (
              <button key={p.code} className={"chip" + (pais === p.code ? " sel" : "")} onClick={() => setPaisSel(p.code)}>
                <span className="emo">{p.flag}</span> {p.nombre}
              </button>
            ))}
          </div>
          <button className="btn btn-primary" onClick={next} disabled={!pais}>Siguiente</button>
        </div>
      )}

      {paso === 2 && (
        <div className="stack">
          <div className="eyebrow">Para saber por dónde empezar</div>
          <h2 className="h2">{dolorQ.pregunta}</h2>
          <p className="tiny">{dolorQ.sub}</p>
          <div className="stack">
            {dolorQ.opciones.map((o) => (
              <button key={o.v} className={"chip" + (dolor === o.v ? " sel" : "")} onClick={() => setDolor(o.v)}>
                <span className="emo">{o.e}</span> {o.t}
              </button>
            ))}
          </div>
          {dolor && mensajeDolor[dolor] && (
            <div className="card card-luna"><p className="serif-quote" style={{ fontSize: "1.15rem" }}>{mensajeDolor[dolor]}</p></div>
          )}
          <button className="btn btn-primary" onClick={next} disabled={!dolor}>Siguiente</button>
        </div>
      )}

      {paso === 3 && (
        <div className="stack">
          <div className="eyebrow">Tu punto de partida</div>
          <h2 className="h2">Hoy, ¿qué tan conectada te sentís con vos misma?</h2>
          <p className="tiny">Del 1 al 10. Sin respuestas incorrectas: es solo tu foto de hoy.</p>
          <div className="grid-2" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
            {Array.from({ length: 10 }).map((_, i) => {
              const v = i + 1;
              return <button key={v} className={"chip" + (termometro === v ? " sel" : "")} style={{ justifyContent: "center", padding: "16px 0" }} onClick={() => setTermometro(v)}><b className="num">{v}</b></button>;
            })}
          </div>
          <div style={{ marginTop: 8 }}>
            <label className="tiny" style={{ fontWeight: 700 }}>Una carta corta para vos, para leer al final del camino:</label>
            <textarea className="field" style={{ marginTop: 6 }} value={carta} onChange={(e) => setCarta(e.target.value)} placeholder="Querida yo, hoy empiezo este camino porque…" />
          </div>
          <button className="btn btn-primary btn-lg" onClick={finish} disabled={!termometro}>Empezar mi primera luna</button>
        </div>
      )}
    </div>
  );
}

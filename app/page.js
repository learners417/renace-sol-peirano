"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Sos from "@/components/Sos";
import { videoPorIndice, semillaPorIndice, getModulo, etapaDeModulo, vozSolModulo, TOTAL_PASOS } from "@/lib/programa";
import { compartirTexto } from "@/lib/compartir";
import {
  getUser, getOnboarding, indiceActual, marcarPaso, pasosDeModulo, pasosHechosModulo,
  hoyYaCheckeo, registrarCheckin, getPausa, setPausa, caminoCompleto, pasoCompletadoHoy,
  guardarSemilla, saludoHora, esHoraDificil,
} from "@/lib/estado";

const moods = [
  { v: 1, e: "🌧", l: "Difícil" }, { v: 2, e: "🌫", l: "Apagada" },
  { v: 3, e: "⛅", l: "Ahí va" }, { v: 4, e: "🌤", l: "Bien" }, { v: 5, e: "☀️", l: "Radiante" },
];
const animoMsg = {
  1: "Gracias por ser honesta. En los días difíciles, tu pasito puede ser mínimo — con estar acá ya alcanza. 🤍",
  2: "Te entiendo. Vamos suave hoy. No tenés que poder con todo: solo con este ratito para vos.",
  3: "Ahí vamos, un pasito a la vez. Está perfecto estar así.",
  4: "Qué bueno leerte así. Aprovechemos este envión para tu momento de hoy.",
  5: "¡Qué lindo! Guardá un poquito de esa luz para vos en este ratito. ☀️",
};

export default function Hoy() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [idx, setIdx] = useState(0);
  const [fase, setFase] = useState("checkin"); // checkin | video | practica | semilla | cerrado | descanso
  const [mood, setMood] = useState(null);
  const [nota, setNota] = useState("");
  const [pausa, setPausaLocal] = useState(false);
  const [saludo, setSaludo] = useState("Hola");
  const [horaDificil, setHoraDificil] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    if (caminoCompleto()) { router.replace("/graduacion"); return; }
    setUser(u);
    setIdx(indiceActual());
    setPausaLocal(getPausa());
    setSaludo(saludoHora());
    setHoraDificil(esHoraDificil());
    if (pasoCompletadoHoy()) setFase("descanso");
    else setFase(hoyYaCheckeo() ? "video" : "checkin");
    setReady(true);
  }, [router]);

  if (!ready || !user) return null;

  const video = videoPorIndice(idx);
  if (!video) { router.replace("/graduacion"); return null; }
  const modulo = getModulo(video.modulo);
  const etapa = etapaDeModulo(video.modulo);
  const semilla = semillaPorIndice(idx);
  const hechosMod = pasosHechosModulo(video.modulo);
  const totalMod = pasosDeModulo(video.modulo).length;
  const vozSol = vozSolModulo[video.modulo];
  const esPrimerVideoDelModulo = pasosDeModulo(video.modulo)[0] === idx;

  const elegirMood = (v) => { setMood(v); registrarCheckin(v); setTimeout(() => setFase("video"), 400); };
  const completar = () => { marcarPaso(idx, nota); setNota(""); setFase("cerrado"); };
  const adelantar = () => { setIdx(indiceActual()); setFase(hoyYaCheckeo() ? "video" : "checkin"); };
  const compartir = async () => { guardarSemilla(semilla); await compartirTexto(`"${semilla}" 🤍 — mi semilla de hoy en mi camino R.E.N.A.C.E. ✿`); };

  return (
    <>
      <div className="app">
        <div className="topbar">
          <div className="brand">R.E.N.A.C.E.<span> ✿</span></div>
          <div className="pill" onClick={() => router.push("/programa")} style={{ cursor: "pointer" }}>
            Módulo {video.modulo} · Etapa {etapa.n}
          </div>
        </div>

        {pausa && (
          <div className="banner-pausa">
            Estás en <b>modo pausa</b>. Tu camino te espera, sin apuro. 🤍
            <div><button className="btn ghost" style={{ padding: 8 }} onClick={() => { setPausa(false); setPausaLocal(false); }}>Retomar mi ritmo</button></div>
          </div>
        )}

        <div className="kick">Módulo {modulo.n} · {modulo.nombre}</div>
        <h1 className="h1" style={{ margin: "6px 0 4px" }}>{saludo}, {user.nombre} ✿</h1>
        <p className="sub">{modulo.intro}</p>

        <div className="prog-mini" onClick={() => router.push("/programa")}>
          <span>🎯 Programa · <b>{etapa.nombre}</b></span>
          <span className="prog-mini-ver">ver ›</span>
        </div>

        {horaDificil && fase !== "cerrado" && (
          <div className="ayuda-ctx" onClick={() => router.push("/sos")}>
            <span>🕊 ¿Hora complicada? Si lo necesitás, tenés SOS Calma a un toque.</span>
          </div>
        )}

        <div className="riegos" style={{ justifyContent: "flex-start", margin: "16px 0 20px" }}>
          {Array.from({ length: totalMod }).map((_, i) => (
            <div key={i} className={"gota" + (i < hechosMod ? " on" : "")} style={{ width: 12, height: 12 }} />
          ))}
          <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800, marginLeft: 6 }}>
            {hechosMod}/{totalMod} en este módulo
          </span>
        </div>

        {esPrimerVideoDelModulo && vozSol && fase !== "cerrado" && fase !== "descanso" && (
          <div className="voz-sol">
            <div className="voz-sol-h"><span className="voz-av">S</span> Un mensaje de Sol</div>
            <p>{vozSol}</p>
          </div>
        )}

        {fase === "descanso" && (
          <div className="cierre">
            <div className="big">🌿</div>
            <h2 className="h2">Hoy ya diste tu paso, {user.nombre}.</h2>
            <p style={{ fontSize: 15.5, color: "#6A6276", margin: "12px 0 4px", lineHeight: 1.6 }}>
              Tu pasito de hoy ya está dado. Lo mejor ahora es vivirlo. El camino rinde más de a un paso por día. 🤍
            </p>
            <button className="btn ghost mt" onClick={() => router.push("/jardin")}>Ver mi jardín</button>
            <button className="btn ghost" onClick={adelantar} style={{ fontSize: 13 }}>Hoy tengo ganas de un pasito más →</button>
          </div>
        )}

        {fase === "checkin" && (
          <div className="card">
            <div className="kick">Paso 1 · Tu momento</div>
            <h2 className="h2" style={{ margin: "6px 0" }}>¿Cómo estás hoy?</h2>
            <p className="sub">Respondé lo que sientas, no hay respuestas incorrectas.</p>
            <div className="moods">
              {moods.map((m) => (
                <div key={m.v} className={"mood" + (mood === m.v ? " on" : "")} onClick={() => elegirMood(m.v)}>
                  {m.e}<span>{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {fase === "video" && (
          <div className="card">
            {mood && <div className="animo-msg">{animoMsg[mood]}</div>}
            <div className="kick">Paso 2 · Tu video de hoy · {video.subtitulo}</div>
            <h2 className="h2" style={{ margin: "6px 0 4px" }}>{video.titulo}</h2>
            <p className="sub" style={{ marginBottom: 12 }}>{video.desc}</p>
            <div className="vidph">
              <div className="play"><svg width="15" height="17" viewBox="0 0 15 17"><path d="M0 0 L15 8.5 L0 17 Z" fill="#7E6399"/></svg></div>
              Video de Sol · próximamente
            </div>
            {video.idea && <p className="idea-txt">{video.idea}</p>}
            <button className="btn mt" onClick={() => setFase("practica")}>Ya lo vi · seguir con mi actividad →</button>
          </div>
        )}

        {fase === "practica" && (
          <div className="card">
            <div className="kick">Paso 3 · Tu actividad de hoy</div>
            <div className="practica-box"><b>Tu actividad:</b> {video.actividad}</div>
            <textarea className="nota" placeholder="Si querés, dejá acá una línea para vos (opcional)…"
              value={nota} onChange={(e) => setNota(e.target.value)} />
            <button className="btn mt" onClick={() => setFase("semilla")}>Hecho (o lo haré hoy) →</button>
            <p className="sub center" style={{ marginTop: 10, fontSize: 12.5 }}>Con la intención alcanza. Acá no se falla: se camina.</p>
          </div>
        )}

        {fase === "semilla" && (
          <div>
            <div className="kick center">Paso 4 · Tu semilla de hoy</div>
            <div className="semilla">
              <div className="sq">“{semilla}”</div>
              <div className="sm">R.E.N.A.C.E. ✿ Módulo {video.modulo}</div>
            </div>
            <button className="btn sec" onClick={compartir}>Compartir y guardar mi semilla 🤍</button>
            <button className="btn mt" onClick={completar}>Dar mi paso de hoy ✓</button>
          </div>
        )}

        {fase === "cerrado" && (
          <div className="cierre">
            <div className="big">🌷</div>
            <h2 className="h2">Listo por hoy, {user.nombre}.</h2>
            <p style={{ fontSize: 15.5, color: "#6A6276", margin: "12px 0 4px", lineHeight: 1.6 }}>
              Diste tu paso de hoy. Ahora cerrá la app y andá a vivirlo. Lo que aprendiste se practica afuera. 🤍
            </p>
            <button className="btn ghost mt" onClick={() => router.push("/jardin")}>Ver cómo va mi jardín</button>
          </div>
        )}

        {(fase === "checkin" || fase === "video" || fase === "practica") && !pausa && (
          <button className="btn ghost" style={{ marginTop: 8 }} onClick={() => { setPausa(true); setPausaLocal(true); }}>
            Necesito pausar (sin culpa)
          </button>
        )}
      </div>
      <Sos />
      <Nav />
    </>
  );
}

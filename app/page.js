"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Sos from "@/components/Sos";
import { getSemana, semillaDe, DIAS_POR_SEMANA, etapaDeSemana } from "@/lib/programa";
import { compartirTexto } from "@/lib/compartir";
import {
  getUser, getOnboarding, posicionActual, marcarDia, diasHechosSemana,
  hoyYaCheckeo, registrarCheckin, getPausa, setPausa, caminoCompleto, diaCompletadoHoy,
  guardarSemilla, saludoHora, esHoraDificil, tendenciaAnimo,
} from "@/lib/estado";

const moods = [
  { v: 1, e: "🌧", l: "Difícil" }, { v: 2, e: "🌫", l: "Apagada" },
  { v: 3, e: "⛅", l: "Ahí va" }, { v: 4, e: "🌤", l: "Bien" }, { v: 5, e: "☀️", l: "Radiante" },
];

export default function Hoy() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [pos, setPos] = useState(null);
  const [fase, setFase] = useState("checkin");
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
    setPos(posicionActual());
    setPausaLocal(getPausa());
    setSaludo(saludoHora());
    setHoraDificil(esHoraDificil());
    if (diaCompletadoHoy()) setFase("descanso");
    else setFase(hoyYaCheckeo() ? "pasito" : "checkin");
    setReady(true);
  }, [router]);

  if (!ready || !user || !pos) return null;

  const semana = getSemana(pos.s);
  const etapa = etapaDeSemana(pos.s);
  const dia = semana.dias[pos.d - 1];
  const semilla = semillaDe(pos.s, pos.d);
  const regadosSemana = diasHechosSemana(pos.s);

  const elegirMood = (v) => {
    setMood(v); registrarCheckin(v);
    setTimeout(() => setFase("pasito"), 400);
  };

  const completar = () => { marcarDia(pos.s, pos.d, nota); setNota(""); setFase("cerrado"); };
  const adelantar = () => { setPos(posicionActual()); setFase(hoyYaCheckeo() ? "pasito" : "checkin"); };

  const compartirSemilla = async () => {
    guardarSemilla(semilla);
    await compartirTexto(`"${semilla}" 🤍 — mi semilla de hoy en mi camino R.E.N.A.C.E. ✿`);
  };

  // mensaje de ánimo según el mood elegido hoy
  const animoMsg = {
    1: "Gracias por ser honesta. En los días difíciles, tu pasito puede ser mínimo — con estar acá ya alcanza. 🤍",
    2: "Te entiendo. Vamos suave hoy. No tenés que poder con todo: solo con este ratito para vos.",
    3: "Ahí vamos, un pasito a la vez. Está perfecto estar así.",
    4: "Qué bueno leerte así. Aprovechemos este envión para tu momento de hoy.",
    5: "¡Qué lindo! Guardá un poquito de esa luz para vos en este ratito. ☀️",
  };

  return (
    <>
      <div className="app">
        <div className="topbar">
          <div className="brand">R.E.N.A.C.E.<span> ✿</span></div>
          <div className="pill" onClick={() => router.push("/programa")} style={{ cursor: "pointer" }}>
            Etapa {etapa.n} · Sem {pos.s}
          </div>
        </div>

        {pausa && (
          <div className="banner-pausa">
            Estás en <b>modo semana difícil</b>. Tu camino te espera, sin apuro. 🤍
            <div><button className="btn ghost" style={{ padding: 8 }} onClick={() => { setPausa(false); setPausaLocal(false); }}>Retomar mi ritmo</button></div>
          </div>
        )}

        <div className="kick">{semana.eje} · {semana.titulo}</div>
        <h1 className="h1" style={{ margin: "6px 0 4px" }}>{saludo}, {user.nombre} ✿</h1>
        <p className="sub">{semana.intro}</p>

        <div className="prog-mini" onClick={() => router.push("/programa")}>
          <span>🎯 Programa de 90 días · <b>{etapa.nombre}</b></span>
          <span className="prog-mini-ver">ver ›</span>
        </div>

        {/* Ayuda contextual en hora difícil (atardecer/noche) */}
        {horaDificil && fase !== "cerrado" && (
          <div className="ayuda-ctx" onClick={() => router.push("/sos")}>
            <span>🕊 ¿Hora complicada? Si lo necesitás, tenés SOS Calma a un toque.</span>
          </div>
        )}

        <div className="riegos" style={{ justifyContent: "flex-start", margin: "16px 0 20px" }}>
          {Array.from({ length: DIAS_POR_SEMANA }).map((_, i) => (
            <div key={i} className={"gota" + (i < regadosSemana ? " on" : "")} style={{ width: 12, height: 12 }} />
          ))}
          <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800, marginLeft: 6 }}>
            {regadosSemana}/{DIAS_POR_SEMANA} riegos esta semana
          </span>
        </div>

        {pos.d === 1 && semana.vozSol && fase !== "cerrado" && fase !== "descanso" && (
          <div className="voz-sol">
            <div className="voz-sol-h"><span className="voz-av">S</span> Un mensaje de Sol</div>
            <p>{semana.vozSol}</p>
          </div>
        )}

        {fase === "descanso" && (
          <div className="cierre">
            <div className="big">🌿</div>
            <h2 className="h2">Hoy ya regaste, {user.nombre}.</h2>
            <p style={{ fontSize: 15.5, color: "#6A6276", margin: "12px 0 4px", lineHeight: 1.6 }}>
              Tu pasito de hoy ya está dado. Lo mejor que podés hacer ahora es vivirlo.
              El camino rinde más de a un paso por día. 🤍
            </p>
            <button className="btn ghost mt" onClick={() => router.push("/jardin")}>Ver mi jardín</button>
            <button className="btn ghost" onClick={adelantar} style={{ fontSize: 13 }}>Hoy tengo ganas de un pasito más →</button>
          </div>
        )}

        {fase === "checkin" && (
          <div className="card">
            <div className="kick">Paso 1 · Tu momento</div>
            <h2 className="h2" style={{ margin: "6px 0" }}>¿Cómo estás hoy?</h2>
            <p className="sub">Lo que sea que sientas, está bien. Solo miralo.</p>
            <div className="moods">
              {moods.map((m) => (
                <div key={m.v} className={"mood" + (mood === m.v ? " on" : "")} onClick={() => elegirMood(m.v)}>
                  {m.e}<span>{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {fase === "pasito" && (
          <div className="card">
            {mood && <div className="animo-msg">{animoMsg[mood]}</div>}
            <div className="kick">Paso 2 · Tu pasito de hoy</div>
            <h2 className="h2" style={{ margin: "6px 0 12px" }}>{dia.titulo}</h2>
            <div className="vidph">
              <div className="play"><svg width="15" height="17" viewBox="0 0 15 17"><path d="M0 0 L15 8.5 L0 17 Z" fill="#7E6399"/></svg></div>
              Audio/video de Sol · próximamente
            </div>
            {dia.idea && <p className="idea-txt">{dia.idea}</p>}
            <button className="btn mt" onClick={() => setFase("practica")}>Seguir con mi práctica →</button>
          </div>
        )}

        {fase === "practica" && (
          <div className="card">
            <div className="kick">Paso 3 · Tu práctica de hoy</div>
            <div className="practica-box"><b>Tu práctica:</b> {dia.practica}</div>
            <textarea className="nota" placeholder="Si querés, dejá acá una línea para vos (opcional)…"
              value={nota} onChange={(e) => setNota(e.target.value)} />
            <button className="btn mt" onClick={() => setFase("semilla")}>Hecho (o lo haré hoy) →</button>
            <p className="sub center" style={{ marginTop: 10, fontSize: 12.5 }}>
              Con la intención alcanza. Acá no se falla: se camina.
            </p>
          </div>
        )}

        {fase === "semilla" && (
          <div>
            <div className="kick center">Paso 4 · Tu semilla de hoy</div>
            <div className="semilla">
              <div className="sq">“{semilla}”</div>
              <div className="sm">R.E.N.A.C.E. ✿ Semana {pos.s}</div>
            </div>
            <button className="btn sec" onClick={compartirSemilla}>Compartir y guardar mi semilla 🤍</button>
            <button className="btn mt" onClick={completar}>Regar mi día ✓</button>
          </div>
        )}

        {fase === "cerrado" && (
          <div className="cierre">
            <div className="big">🌷</div>
            <h2 className="h2">Listo por hoy, {user.nombre}.</h2>
            <p style={{ fontSize: 15.5, color: "#6A6276", margin: "12px 0 4px", lineHeight: 1.6 }}>
              Regaste tu día {pos.d} de la semana {pos.s}. Ahora cerrá la app y andá a vivirlo.
              Lo que aprendiste hoy se practica afuera. 🤍
            </p>
            <button className="btn ghost mt" onClick={() => router.push("/jardin")}>Ver cómo va mi jardín</button>
          </div>
        )}

        {(fase === "checkin" || fase === "pasito" || fase === "practica") && !pausa && (
          <button className="btn ghost" style={{ marginTop: 8 }}
            onClick={() => { setPausa(true); setPausaLocal(true); }}>
            Necesito pausar esta semana (sin culpa)
          </button>
        )}
      </div>
      <Sos />
      <Nav />
    </>
  );
}

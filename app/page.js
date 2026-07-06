"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Sos from "@/components/Sos";
import { getSemana, semillaDe, DIAS_POR_SEMANA } from "@/lib/programa";
import {
  getUser, getOnboarding, posicionActual, marcarDia, diasHechosSemana,
  hoyYaCheckeo, registrarCheckin, getPausa, setPausa, caminoCompleto, diaCompletadoHoy,
} from "@/lib/estado";

const moods = [
  { v: 1, e: "🌧" }, { v: 2, e: "🌫" }, { v: 3, e: "⛅" }, { v: 4, e: "🌤" }, { v: 5, e: "☀️" },
];

export default function Hoy() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [pos, setPos] = useState(null);
  // fases: checkin | pasito | practica | semilla | cerrado | descanso (ya regó hoy)
  const [fase, setFase] = useState("checkin");
  const [mood, setMood] = useState(null);
  const [nota, setNota] = useState("");
  const [pausa, setPausaLocal] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    if (caminoCompleto()) { router.replace("/graduacion"); return; }
    setUser(u);
    setPos(posicionActual());
    setPausaLocal(getPausa());
    if (diaCompletadoHoy()) setFase("descanso");
    else setFase(hoyYaCheckeo() ? "pasito" : "checkin");
    setReady(true);
  }, [router]);

  if (!ready || !user || !pos) return null;

  const semana = getSemana(pos.s);
  const dia = semana.dias[pos.d - 1];
  const semilla = semillaDe(pos.s, pos.d);
  const regadosSemana = diasHechosSemana(pos.s);

  const elegirMood = (v) => { setMood(v); registrarCheckin(v); setTimeout(() => setFase("pasito"), 350); };

  const completar = () => {
    marcarDia(pos.s, pos.d, nota);
    setNota("");
    setFase("cerrado");
  };

  const adelantar = () => {
    setPos(posicionActual());
    setFase(hoyYaCheckeo() ? "pasito" : "checkin");
  };

  const compartirSemilla = async () => {
    const texto = `"${semilla}" 🤍 — mi semilla de hoy en mi camino R.E.N.A.C.E. ✿`;
    try {
      if (navigator.share) await navigator.share({ text: texto });
      else { await navigator.clipboard.writeText(texto); alert("Semilla copiada 🤍 Pegala donde quieras compartirla."); }
    } catch {}
  };

  return (
    <>
      <div className="app">
        <div className="topbar">
          <div className="brand">R.E.N.A.C.E.<span> ✿</span></div>
          <div className="pill">Semana {pos.s} · Día {pos.d}</div>
        </div>

        {pausa && (
          <div className="banner-pausa">
            Estás en <b>modo semana difícil</b>. Tu camino te espera, sin apuro. 🤍
            <div><button className="btn ghost" style={{ padding: 8 }} onClick={() => { setPausa(false); setPausaLocal(false); }}>Retomar mi ritmo</button></div>
          </div>
        )}

        <div className="kick">{semana.eje} · {semana.titulo}</div>
        <h1 className="h1" style={{ margin: "6px 0 4px" }}>Hola, {user.nombre} ✿</h1>
        <p className="sub">{semana.intro}</p>

        <div className="riegos" style={{ justifyContent: "flex-start", margin: "14px 0 20px" }}>
          {Array.from({ length: DIAS_POR_SEMANA }).map((_, i) => (
            <div key={i} className={"gota" + (i < regadosSemana ? " on" : "")} style={{ width: 12, height: 12 }} />
          ))}
          <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 800, marginLeft: 6 }}>
            {regadosSemana}/{DIAS_POR_SEMANA} riegos esta semana
          </span>
        </div>

        {fase === "descanso" && (
          <div className="cierre">
            <div className="big">🌿</div>
            <h2 className="h2">Hoy ya regaste, {user.nombre}.</h2>
            <p style={{ fontSize: 15.5, color: "#6A6276", margin: "12px 0 4px", lineHeight: 1.6 }}>
              Tu pasito de hoy ya está dado. Lo mejor que podés hacer ahora es vivirlo.
              El camino rinde más de a un paso por día. 🤍
            </p>
            <button className="btn ghost mt" onClick={() => router.push("/jardin")}>Ver mi jardín</button>
            <button className="btn ghost" onClick={adelantar} style={{ fontSize: 13 }}>
              Hoy tengo ganas de un pasito más →
            </button>
          </div>
        )}

        {fase === "checkin" && (
          <div className="card">
            <div className="kick">Paso 1 · Tu momento</div>
            <h2 className="h2" style={{ margin: "6px 0" }}>¿Cómo estás hoy?</h2>
            <p className="sub">Lo que sea que sientas, está bien. Solo miralo.</p>
            <div className="moods">
              {moods.map((m) => (
                <div key={m.v} className={"mood" + (mood === m.v ? " on" : "")} onClick={() => elegirMood(m.v)}>{m.e}</div>
              ))}
            </div>
          </div>
        )}

        {fase === "pasito" && (
          <div className="card">
            <div className="kick">Paso 2 · Tu pasito de hoy</div>
            <h2 className="h2" style={{ margin: "6px 0 4px" }}>{dia.titulo}</h2>
            <div className="vidph">
              <div className="play"><svg width="15" height="17" viewBox="0 0 15 17"><path d="M0 0 L15 8.5 L0 17 Z" fill="#7E6399"/></svg></div>
              Audio/video de Sol · se carga al final
            </div>
            <button className="btn" onClick={() => setFase("practica")}>Ya lo escuché / leí →</button>
          </div>
        )}

        {fase === "practica" && (
          <div className="card">
            <div className="kick">Paso 3 · Tu práctica</div>
            <div className="practica-box"><b>Hoy:</b> {dia.practica}</div>
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
            <button className="btn sec" onClick={compartirSemilla}>Compartir mi semilla 🤍</button>
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
            <button className="btn ghost mt" onClick={() => router.push("/jardin")}>Ver mi jardín</button>
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

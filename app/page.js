"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { videoPorIndice, semillaPorIndice, getModulo, vozSolModulo, TOTAL_PASOS } from "@/lib/programa";
import { compartirTexto } from "@/lib/compartir";
import {
  getUser, getOnboarding, indiceActual, marcarPaso, pasosDeModulo, pasosHechosModulo,
  registrarCheckin, caminoCompleto, pasoCompletadoHoy, guardarSemilla, saludoHora,
  esHoraDificil, totalPasosHechos,
} from "@/lib/estado";

const moods = [
  { v: 1, e: "🌧", l: "Difícil" }, { v: 2, e: "🌫", l: "Apagada" },
  { v: 3, e: "⛅", l: "Ahí va" }, { v: 4, e: "🌤", l: "Bien" }, { v: 5, e: "☀️", l: "Radiante" },
];

export default function Hoy() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [idx, setIdx] = useState(0);
  // vista: inicio (botón gigante) | checkin | video | practica | semilla | listo | descanso
  const [vista, setVista] = useState("inicio");
  const [mood, setMood] = useState(null);
  const [nota, setNota] = useState("");
  const [saludo, setSaludo] = useState("Hola");

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    if (caminoCompleto()) { router.replace("/graduacion"); return; }
    setUser(u);
    setIdx(indiceActual());
    setSaludo(saludoHora());
    setVista(pasoCompletadoHoy() ? "descanso" : "inicio");
    setReady(true);
  }, [router]);

  if (!ready || !user) return null;

  const video = videoPorIndice(idx);
  if (!video) { router.replace("/graduacion"); return null; }
  const modulo = getModulo(video.modulo);
  const semilla = semillaPorIndice(idx);
  const totalMod = pasosDeModulo(video.modulo).length;
  const hechosMod = pasosHechosModulo(video.modulo);
  const vozSol = vozSolModulo[video.modulo];
  const esPrimerVideoModulo = pasosDeModulo(video.modulo)[0] === idx;
  const diaNum = totalPasosHechos() + 1;

  const elegirMood = (v) => { setMood(v); registrarCheckin(v); setTimeout(() => setVista("video"), 400); };
  const completar = () => { marcarPaso(idx, nota); setNota(""); setVista("listo"); };
  const compartir = async () => { guardarSemilla(semilla); await compartirTexto(`"${semilla}" 🤍 — mi semilla de hoy en mi camino R.E.N.A.C.E. ✿`); };

  // ---------- VISTA INICIO: botón gigante, cero confusión ----------
  if (vista === "inicio") {
    return (
      <>
        <div className="app">
          <div className="topbar">
            <div className="brand">R.E.N.A.C.E.<span> ✿</span></div>
          </div>

          <div className="hoy-hero">
            <div className="hoy-saludo">{saludo}, {user.nombre} 🤍</div>
            <div className="hoy-dianum">Día {diaNum} de tu camino</div>

            <div className="hoy-card">
              <div className="hoy-modtag">Módulo {modulo.n} · {modulo.nombre}</div>
              <h1 className="hoy-titulo">Tu momento de hoy</h1>
              <p className="hoy-sub">Solo 10 minutos para vos. Sin apuro, sin exigencia.</p>
              <button className="btn-gigante" onClick={() => setVista("checkin")}>
                Empezar mi día ✿
              </button>
              <div className="hoy-tiempo">☀️ Toma unos 10 minutos</div>
            </div>

            {esHoraDificil() && (
              <div className="ayuda-ctx" onClick={() => router.push("/sos")}>
                <span>🕊 ¿Momento difícil? Tocá acá para calmarte en 1 minuto.</span>
              </div>
            )}

            <button className="hoy-link" onClick={() => router.push("/mi-camino")}>
              Ver cómo va mi camino ›
            </button>
          </div>
        </div>
        <Nav />
      </>
    );
  }

  // ---------- VISTA DESCANSO: ya hizo su día ----------
  if (vista === "descanso") {
    return (
      <>
        <div className="app">
          <div className="topbar"><div className="brand">R.E.N.A.C.E.<span> ✿</span></div></div>
          <div className="hoy-hero">
            <div style={{ fontSize: 60, marginBottom: 8 }}>🌿</div>
            <h1 className="hoy-titulo">Ya diste tu paso de hoy</h1>
            <p className="hoy-sub" style={{ maxWidth: 320, margin: "10px auto 0" }}>
              Muy bien, {user.nombre}. Lo mejor ahora es cerrar la app y vivir tu día.
              Mañana te espera el siguiente pasito. 🤍
            </p>
            <button className="btn sec" style={{ marginTop: 24, maxWidth: 280 }} onClick={() => router.push("/mi-camino")}>
              Ver cómo va mi camino
            </button>
          </div>
        </div>
        <Nav />
      </>
    );
  }

  // ---------- RITUAL GUIADO: pantalla completa, una cosa por vez ----------
  return (
    <div className="ritual">
      <div className="ritual-top">
        <button className="ritual-x" onClick={() => setVista(pasoCompletadoHoy() ? "descanso" : "inicio")}>✕</button>
        <div className="ritual-prog">
          {["checkin","video","practica","semilla"].map((p, i) => {
            const orden = ["checkin","video","practica","semilla","listo"];
            const actualIdx = orden.indexOf(vista);
            return <div key={p} className={"rdot" + (i <= actualIdx ? " on" : "")} />;
          })}
        </div>
      </div>

      <div className="ritual-body">
        {vista === "checkin" && (
          <div className="ritual-paso">
            <div className="ritual-num">Paso 1 de 4</div>
            <h2 className="ritual-h">¿Cómo estás hoy?</h2>
            <p className="ritual-p">Respondé lo que sientas. No hay respuestas incorrectas.</p>
            <div className="moods moods-grande">
              {moods.map((m) => (
                <div key={m.v} className={"mood" + (mood === m.v ? " on" : "")} onClick={() => elegirMood(m.v)}>
                  {m.e}<span>{m.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {vista === "video" && (
          <div className="ritual-paso">
            <div className="ritual-num">Paso 2 de 4</div>
            <h2 className="ritual-h">Mirá el video de hoy</h2>
            {esPrimerVideoModulo && vozSol && (
              <div className="voz-sol" style={{ marginBottom: 16 }}>
                <div className="voz-sol-h"><span className="voz-av">S</span> Sol te dice</div>
                <p style={{ fontSize: 16 }}>{vozSol}</p>
              </div>
            )}
            <div className="vidph" style={{ height: 190 }}>
              <div className="play"><svg width="16" height="18" viewBox="0 0 15 17"><path d="M0 0 L15 8.5 L0 17 Z" fill="#7E6399"/></svg></div>
              Video de Sol · próximamente
            </div>
            <p className="ritual-videotit">{video.titulo}</p>
            <p className="ritual-videodesc">{video.desc}</p>
            <button className="btn-gigante" onClick={() => setVista("practica")}>Ya lo vi →</button>
          </div>
        )}

        {vista === "practica" && (
          <div className="ritual-paso">
            <div className="ritual-num">Paso 3 de 4</div>
            <h2 className="ritual-h">Tu actividad de hoy</h2>
            <div className="practica-box" style={{ fontSize: 16, padding: "18px 20px" }}>{video.actividad}</div>
            <textarea className="nota" style={{ marginTop: 14 }} placeholder="Si querés, escribí una línea para vos (opcional)…"
              value={nota} onChange={(e) => setNota(e.target.value)} />
            <button className="btn-gigante" onClick={() => setVista("semilla")}>Listo →</button>
            <p className="ritual-mini">Con la intención alcanza. Acá no se falla: se camina.</p>
          </div>
        )}

        {vista === "semilla" && (
          <div className="ritual-paso">
            <div className="ritual-num">Paso 4 de 4</div>
            <h2 className="ritual-h">Tu frase para hoy</h2>
            <div className="semilla" style={{ margin: "18px 0" }}>
              <div className="sq">“{semilla}”</div>
              <div className="sm">R.E.N.A.C.E. ✿</div>
            </div>
            <button className="btn sec" onClick={compartir}>Compartir esta frase 🤍</button>
            <button className="btn-gigante" style={{ marginTop: 12 }} onClick={completar}>Terminar mi día ✓</button>
          </div>
        )}

        {vista === "listo" && (
          <div className="ritual-paso center">
            <div style={{ fontSize: 66, marginBottom: 10 }}>🌷</div>
            <h2 className="ritual-h">¡Listo, {user.nombre}!</h2>
            <p className="ritual-p" style={{ maxWidth: 300, margin: "10px auto 0" }}>
              Diste tu paso de hoy. Regaste tu jardín. Ahora andá a vivir tu día. 🤍
            </p>
            <div className="listo-prog">
              <div className="listo-flores">
                {Array.from({ length: totalMod }).map((_, i) => (
                  <span key={i} style={{ opacity: i < hechosMod ? 1 : .3 }}>🌸</span>
                ))}
              </div>
              <div className="listo-txt">{hechosMod} de {totalMod} en este módulo</div>
            </div>
            <button className="btn-gigante" style={{ marginTop: 20 }} onClick={() => router.push("/mi-camino")}>Ver mi camino</button>
            <button className="hoy-link" onClick={() => setVista("descanso")}>Cerrar por hoy</button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Video } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Luna } from "@/components/Luna";
import {
  getUser, getPais, indiceActual, marcarPaso, registrarCheckin,
  agregarDiario, guardarSemilla, caminoCompleto,
} from "@/lib/estado";
import { videoPorIndice, semillaPorIndice } from "@/lib/programa";
import { t, conjuga } from "@/lib/voz";
import { achicarFoto } from "@/lib/foto";

const CHECK = [
  { v: 1, e: "😮‍💨", l: "Agotada" },
  { v: 2, e: "😔", l: "Bajita" },
  { v: 3, e: "😐", l: "Ahí voy" },
  { v: 4, e: "🙂", l: "Tranquila" },
  { v: 5, e: "🌷", l: "Bien" },
];

export default function Ritual() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [datos, setDatos] = useState(null);
  const [animo, setAnimo] = useState(0);
  const [comprension, setComprension] = useState("");
  const [foto, setFoto] = useState(null);
  const [semillaTexto, setSemillaTexto] = useState("");
  const [notaDiario, setNotaDiario] = useState("");
  const fileRef = useRef();

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    const idx = indiceActual();
    const video = videoPorIndice(idx);
    if (!video) { router.replace("/graduacion"); return; }
    setDatos({ idx, video, pais: getPais(), semilla: semillaPorIndice(idx) });
  }, [router]);

  if (!datos) return <div className="ritual" />;
  const { idx, video, pais, semilla } = datos;
  const PASOS = ["prepara", "check", "video", "respira", "ejercicio", "pausa", "semilla", "diario", "fin"];
  const total = PASOS.length;

  function siguiente() { setPaso((p) => Math.min(p + 1, total - 1)); }

  function commit() {
    const diarioTxt = [comprension.trim(), notaDiario.trim()].filter(Boolean).join(" · ");
    if (diarioTxt || foto) agregarDiario(diarioTxt, animo || null, video.modulo, foto);
    marcarPaso(idx, notaDiario);
    if (animo) registrarCheckin(animo);
    if (semillaTexto.trim()) guardarSemilla(semillaTexto.trim());
  }
  function reset() { setPaso(0); setAnimo(0); setComprension(""); setFoto(null); setSemillaTexto(""); setNotaDiario(""); }

  function terminar() {
    commit();
    if (caminoCompleto()) router.replace("/graduacion");
    else router.replace("/hoy");
  }
  function continuar() {
    commit();
    const next = videoPorIndice(indiceActual());
    if (!next) { router.replace("/graduacion"); return; }
    setDatos({ idx: indiceActual(), video: next, pais, semilla: semillaPorIndice(indiceActual()) });
    reset(); window.scrollTo(0, 0);
  }

  const cur = PASOS[paso];

  return (
    <div className="ritual">
      <div className="ritual-top">
        <div className="between">
          <button className="link" onClick={() => router.replace("/hoy")}>Salir</button>
          <span className="tiny">Luna {Math.min(video.modulo, 9)}</span>
        </div>
        <div className="step-dots">{PASOS.map((_, i) => <i key={i} className={i <= paso ? "on" : ""} />)}</div>
      </div>

      <div className="ritual-body">
        {cur === "prepara" && (
          <div className="stack center">
            <div className="eyebrow">Tu sesión de hoy</div>
            <div className="luna-hero"><Luna fase={0.3} size={116} /></div>
            <h2 className="h2">{conjuga(pais, "Preparate para vos", "Prepárate para ti")}</h2>
            <p className="lead">{conjuga(pais, "Buscá un momento tranquilo. Hacete un té o un café, agarrá tu cuaderno y una lapicera para tomar notas. Este rato es tuyo, sin culpa.", "Busca un momento tranquilo. Hazte un té o un café, toma tu cuaderno y una pluma para tomar notas. Este rato es tuyo, sin culpa.")}</p>
            <div className="card card-luna" style={{ textAlign: "left" }}>
              <p className="serif-lead">Media hora al día. En 90 días, tu maternidad cambia para siempre.</p>
            </div>
            <p className="tiny">{conjuga(pais, "Hoy vas a ver tu clase, respirar, hacer tu práctica y sembrar tu aprendizaje.", "Hoy verás tu clase, respirarás, harás tu práctica y sembrarás tu aprendizaje.")}</p>
          </div>
        )}

        {cur === "check" && (
          <div className="stack">
            <div className="eyebrow">Cómo llegás</div>
            <h2 className="h2">{t("comoLlegas", pais)}</h2>
            <p className="tiny">Solo mirá cómo estás. No hay respuestas incorrectas.</p>
            <div className="grid-2" style={{ gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
              {CHECK.map((c) => (
                <button key={c.v} className={"chip" + (animo === c.v ? " sel" : "")} style={{ flexDirection: "column", gap: 4, padding: "14px 4px", textAlign: "center" }} onClick={() => setAnimo(c.v)}>
                  <span style={{ fontSize: "1.5rem" }}>{c.e}</span>
                  <span className="tiny">{c.l}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {cur === "video" && (
          <div className="stack">
            <div className="eyebrow">Tu clase</div>
            <h2 className="h2" style={{ fontStyle: "italic", color: "var(--luna)" }}>{video.titulo}</h2>
            {video.videoUrl ? (
              <>
                <p className="tiny">{conjuga(pais, "La parte teórica. Tené tu cuaderno a mano y anotá lo que te resuene.", "La parte teórica. Ten tu cuaderno a mano y anota lo que te resuene.")}</p>
                <Video url={video.videoUrl} titulo={video.titulo} />
                <p className="muted">{video.desc}</p>
                <div>
                  <label className="tiny" style={{ fontWeight: 700 }}>{conjuga(pais, "¿Qué te quedó resonando del video? (opcional)", "¿Qué te quedó resonando del video? (opcional)")}</label>
                  <textarea className="field" style={{ marginTop: 6, minHeight: 64 }} value={comprension} onChange={(e) => setComprension(e.target.value)} placeholder="Una idea, una frase, algo que te movió…" />
                </div>
              </>
            ) : (
              <div className="card card-luna">
                <div className="eyebrow">Tu cierre</div>
                <p className="muted" style={{ marginTop: 6 }}>{video.desc}</p>
                <p className="serif-lead" style={{ marginTop: 12 }}>{video.idea}</p>
              </div>
            )}
          </div>
        )}

        {cur === "respira" && (
          <div className="stack center">
            <div className="eyebrow">Antes de la práctica</div>
            <div className="orb" style={{ margin: "18px auto" }}>{conjuga(pais, "respirá", "respira")}</div>
            <p className="muted">{conjuga(pais, "Tomá tres respiraciones lentas antes de empezar. Inhalá 4, exhalá 4. Aterrizá acá.", "Toma tres respiraciones lentas antes de empezar. Inhala 4, exhala 4. Aterriza aquí.")}</p>
          </div>
        )}

        {cur === "ejercicio" && (
          <div className="stack">
            <div className="eyebrow">Tu práctica</div>
            <div className="card card-luna"><p className="serif-lead">{video.idea}</p></div>
            <div className="card">
              <b>El ejercicio de hoy:</b>
              <p style={{ marginTop: 6 }}>{video.actividad}</p>
            </div>
            <div className="card" style={{ background: "var(--surface-2)", border: 0 }}>
              <b className="tiny" style={{ color: "var(--luna)" }}>DEJÁ TU EVIDENCIA (opcional)</b>
              <p className="tiny" style={{ marginTop: 2 }}>{conjuga(pais, "Sacale una foto a tu hoja, a lo que escribiste o a lo que hiciste. Queda en tu diario.", "Tómale una foto a tu hoja, a lo que escribiste o a lo que hiciste. Queda en tu diario.")}</p>
              <button className="btn btn-ghost ico-row" style={{ justifyContent: "center", marginTop: 8 }} onClick={() => fileRef.current?.click()}>
                <Icon name="camara" size={18} /> {foto ? "Foto lista" : "Subir mi hoja"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files[0] && achicarFoto(e.target.files[0], setFoto)} />
              {foto && <img src={foto} alt="evidencia" style={{ marginTop: 10, width: 90, height: 90, objectFit: "cover", borderRadius: 10 }} />}
            </div>
          </div>
        )}

        {cur === "pausa" && (
          <div className="stack center">
            <div className="eyebrow">Después de la práctica</div>
            <div className="orb" style={{ margin: "18px auto" }}>{conjuga(pais, "respirá", "respira")}</div>
            <p className="muted">{conjuga(pais, "Cerrá un momento. Seguí el círculo: inhalá 4, retené 4, exhalá 4, vacío 4. Dejá que lo que trabajaste se asiente.", "Cierra un momento. Sigue el círculo: inhala 4, retén 4, exhala 4, vacío 4. Deja que lo que trabajaste se asiente.")}</p>
          </div>
        )}

        {cur === "semilla" && (
          <div className="stack">
            <div className="eyebrow">Tu semilla de hoy</div>
            <h2 className="h2">{conjuga(pais, "Sembrá tu aprendizaje", "Siembra tu aprendizaje")}</h2>
            <p className="tiny">{conjuga(pais, "Una frase corta que te quieras llevar de hoy. La guardás y queda en tus semillas.", "Una frase corta que te quieras llevar de hoy. La guardas y queda en tus semillas.")}</p>
            <div className="card card-luna">
              <p className="tiny" style={{ color: "var(--luna)", fontWeight: 700 }}>PARA INSPIRARTE</p>
              <p className="serif-quote" style={{ fontSize: "1.1rem", marginTop: 4 }}>{semilla}</p>
            </div>
            <textarea className="field" value={semillaTexto} onChange={(e) => setSemillaTexto(e.target.value)} placeholder={conjuga(pais, "Escribí tu semilla…", "Escribe tu semilla…")} />
          </div>
        )}

        {cur === "diario" && (
          <div className="stack">
            <div className="eyebrow">Tu diario</div>
            <h2 className="h2">{conjuga(pais, "¿Qué te llevás de hoy?", "¿Qué te llevas de hoy?")}</h2>
            <p className="tiny">Dos líneas alcanzan. Esto arma tu collage del camino.</p>
            <textarea className="field" value={notaDiario} onChange={(e) => setNotaDiario(e.target.value)} placeholder={t("diarioHint", pais)} />
          </div>
        )}

        {cur === "fin" && (
          <div className="stack center">
            <div className="luna-hero"><Luna fase={0.6} size={140} /></div>
            <h2 className="h1" style={{ color: "var(--luna)" }}>{t("listoHoy", pais)}</h2>
            <p className="lead">{t("aVivir", pais)}</p>
            <p className="tiny">{conjuga(pais, "Cuando en tu vida pase algo que valga la pena, registralo como logro en ", "Cuando en tu vida pase algo que valga la pena, regístralo como logro en ")}<b style={{ color: "var(--luna)" }}>Mi renacer</b>. No tiene que ser hoy.</p>
          </div>
        )}
      </div>

      <div className="ritual-foot">
        {cur === "fin"
          ? (
            <div className="grid-2">
              <button className="btn btn-ghost" onClick={terminar}>Terminar por hoy</button>
              <button className="btn btn-primary" onClick={continuar}>Seguir</button>
            </div>
          )
          : <button className="btn btn-primary btn-lg" onClick={siguiente} disabled={cur === "check" && !animo}>{t("siguiente", pais)}</button>}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Video } from "@/components/ui";
import { Luna } from "@/components/Luna";
import {
  getUser, getPais, indiceActual, marcarPaso, registrarCheckin,
  agregarDiario, guardarSemilla, caminoCompleto, lunaActual,
} from "@/lib/estado";
import { videoPorIndice, semillaPorIndice } from "@/lib/programa";
import { t, conjuga } from "@/lib/voz";
import { compartirTexto } from "@/lib/compartir";

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
  const [nota, setNota] = useState("");
  const [semillaGuardada, setSemillaGuardada] = useState(false);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    const idx = indiceActual();
    const video = videoPorIndice(idx);
    if (!video) { router.replace("/graduacion"); return; }
    setDatos({ idx, video, pais: getPais(), semilla: semillaPorIndice(idx) });
  }, [router]);

  if (!datos) return <div className="ritual" />;
  const { idx, video, pais, semilla } = datos;
  const PASOS = ["check", "video", "practica", "pausa", "semilla", "diario", "fin"];
  const total = PASOS.length;

  function siguiente() { setPaso((p) => Math.min(p + 1, total - 1)); }

  function commit() {
    if (nota.trim()) agregarDiario(nota, animo || null, video.modulo); // etiqueta con la etapa de HOY, antes de avanzar
    marcarPaso(idx, nota);
    if (animo) registrarCheckin(animo);
    if (semillaGuardada) guardarSemilla(semilla);
  }

  function terminar() {
    commit();
    if (caminoCompleto()) router.replace("/graduacion");
    else router.replace("/hoy");
  }

  function continuar() {
    commit();
    const next = videoPorIndice(indiceActual());
    if (!next) { router.replace("/graduacion"); return; }
    // recargar el ritual en el lugar, sin salir (fluidez que pidió Sol)
    setDatos({ idx: indiceActual(), video: next, pais, semilla: semillaPorIndice(indiceActual()) });
    setPaso(0); setAnimo(0); setNota(""); setSemillaGuardada(false);
    window.scrollTo(0, 0);
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
        {cur === "check" && (
          <div className="stack">
            <div className="eyebrow">Paso 1</div>
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
            <div className="eyebrow">Paso 2 · {t("tuClase", pais)}</div>
            <h2 className="h2" style={{ fontStyle: "italic", color: "var(--luna)" }}>{video.titulo}</h2>
            {video.videoUrl ? (
              <>
                <Video url={video.videoUrl} titulo={video.titulo} />
                <p className="muted">{video.desc}</p>
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

        {cur === "practica" && (
          <div className="stack">
            <div className="eyebrow">Paso 3 · {t("tuPractica", pais)}</div>
            <div className="card card-luna"><p className="serif-quote" style={{ fontSize: "1.2rem", fontStyle: "normal" }}>{video.idea}</p></div>
            <div className="card">
              <b>Hoy:</b>
              <p style={{ marginTop: 6 }}>{video.actividad}</p>
            </div>
          </div>
        )}

        {cur === "pausa" && (
          <div className="stack center">
            <div className="eyebrow">Paso 4 · {t("unaPausa", pais)}</div>
            <div className="orb" style={{ margin: "18px auto" }}>{conjuga(pais, "respirá", "respira")}</div>
            <p className="muted">{conjuga(pais, "Seguí el círculo: inhalá 4, retené 4, exhalá 4, quedate en vacío 4. Un par de veces, sin apuro.", "Sigue el círculo: inhala 4, retén 4, exhala 4, quédate en vacío 4. Un par de veces, sin apuro.")}</p>
          </div>
        )}

        {cur === "semilla" && (
          <div className="stack center">
            <div className="eyebrow">Paso 5 · {t("tuSemilla", pais)}</div>
            <div className="card card-luna" style={{ padding: 28 }}>
              <Luna fase={0.5} size={70} />
              <p className="serif-quote" style={{ fontSize: "1.4rem", marginTop: 12 }}>{semilla}</p>
            </div>
            <div className="grid-2">
              <button className={"btn " + (semillaGuardada ? "btn-soft" : "btn-ghost")} onClick={() => setSemillaGuardada((s) => !s)}>{semillaGuardada ? "Guardada" : t("guardar", pais)}</button>
              <button className="btn btn-ghost" onClick={() => compartirTexto(`"${semilla}"\n\n— Mi camino R.E.N.A.C.E. con Sol Peirano`)}>{t("compartir", pais)}</button>
            </div>
          </div>
        )}

        {cur === "diario" && (
          <div className="stack">
            <div className="eyebrow">Paso 6 · {t("tuDiario", pais)}</div>
            <h2 className="h2">{conjuga(pais, "¿Qué te llevás de hoy?", "¿Qué te llevas de hoy?")}</h2>
            <p className="tiny">Dos líneas alcanzan. Esto arma tu collage al final del camino.</p>
            <textarea className="field" value={nota} onChange={(e) => setNota(e.target.value)} placeholder={t("diarioHint", pais)} />
          </div>
        )}

        {cur === "fin" && (
          <div className="stack center">
            <div className="luna-hero"><Luna fase={0.6} size={140} /></div>
            <h2 className="h1" style={{ color: "var(--luna)" }}>{t("listoHoy", pais)}</h2>
            <p className="lead">{t("aVivir", pais)}</p>
            <div className="card card-luna" style={{ marginTop: 8, textAlign: "left" }}>
              <b style={{ color: "var(--luna)" }}>¿Hoy viviste algo distinto?</b>
              <p className="tiny" style={{ marginTop: 4 }}>Un momento donde antes reaccionabas de una forma y hoy fue otra. Registralo — así crece tu rueda.</p>
              <button className="btn btn-soft" style={{ marginTop: 10 }} onClick={() => { commit(); router.replace("/mi-renacer"); }}>Registrar un logro</button>
            </div>
          </div>
        )}
      </div>

      <div className="ritual-foot">
        {cur === "fin"
          ? (
            <div className="grid-2">
              <button className="btn btn-ghost" onClick={terminar}>Terminar por hoy</button>
              <button className="btn btn-primary" onClick={continuar}>Seguir con el siguiente</button>
            </div>
          )
          : <button className="btn btn-primary btn-lg" onClick={siguiente} disabled={cur === "check" && !animo}>{t("siguiente", pais)}</button>}
      </div>
    </div>
  );
}

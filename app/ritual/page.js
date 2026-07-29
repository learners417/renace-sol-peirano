"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Video } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Luna } from "@/components/Luna";
import {
  getUser, getPais, marcarPaso, registrarCheckin, agregarDiario, guardarSemilla,
  caminoCompleto, sesionActual, sesionActualIdx, marcarSesion, sesionPermitida,
  guardarCierreSemana, soloSemana1, agregarHito, migrarSesiones,
  nivelArea, baseDeArea, semanasCompletas,
} from "@/lib/estado";
import { secuenciaVideos, getModulo, semillaPorIndice } from "@/lib/programa";
import { meditacionesDeLuna, embedMeditacion, areaDe } from "@/lib/vida";
import { quizDe } from "@/lib/quiz";
import { t, conjuga, habla } from "@/lib/voz";
import Link from "next/link";
import { achicarFoto } from "@/lib/foto";
import { tarjetaLuna, descargar } from "@/lib/collage";

const CHECK = [
  { v: 1, e: "😮‍💨", l: "Agotada" },
  { v: 2, e: "😔", l: "Bajita" },
  { v: 3, e: "😐", l: "Ahí voy" },
  { v: 4, e: "🙂", l: "Tranquila" },
  { v: 5, e: "🌷", l: "Bien" },
];
const PESOS = [{ p: 1, l: "Un pasito" }, { p: 2, l: "Bastante" }, { p: 3, l: "Un montón" }];

export default function Ritual() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [datos, setDatos] = useState(null);
  const [animo, setAnimo] = useState(0);
  const [checkinHecho, setCheckinHecho] = useState(false);
  const [comprension, setComprension] = useState("");
  const [foto, setFoto] = useState(null);
  const [semillaTexto, setSemillaTexto] = useState("");
  const [notaDiario, setNotaDiario] = useState("");
  const [cierreValor, setCierreValor] = useState(0);
  const [logroPeso, setLogroPeso] = useState(0);
  const [tarjeta, setTarjeta] = useState(null);
  const [quizSel, setQuizSel] = useState(null);
  const [notaAbierta, setNotaAbierta] = useState(false);
  const [inicioSesion, setInicioSesion] = useState(null);
  const [seg, setSeg] = useState(0);
  const fileRef = useRef();

  useEffect(() => {
    if (!inicioSesion) return;
    const t = setInterval(() => setSeg(Math.round((Date.now() - inicioSesion) / 1000)), 1000);
    return () => clearInterval(t);
  }, [inicioSesion]);

  function cargar() {
    const idx = sesionActualIdx();
    const ses = sesionActual();
    if (!ses) { router.replace("/graduacion"); return null; }
    if (!sesionPermitida(ses)) { router.replace("/crecer"); return null; }
    const video = ses.videoIdx != null ? secuenciaVideos[ses.videoIdx] : null;
    const luna = Math.min(ses.semana, 9);
    return {
      idx, ses, video, luna, pais: getPais(),
      mod: getModulo(luna),
      semilla: semillaPorIndice(ses.videoIdx != null ? ses.videoIdx : 10 + idx),
      meds: meditacionesDeLuna(luna),
      practicaSemana: (secuenciaVideos.find((v) => v.modulo === luna) || {}).actividad || "",
    };
  }

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    migrarSesiones();
    const d = cargar();
    if (d) { setDatos(d); setInicioSesion(Date.now()); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (!datos) return <div className="ritual" />;
  const { idx, ses, video, luna, pais, semilla, meds, mod, practicaSemana } = datos;

  const PASOS = ses.tipo === "clase"
    ? ["prepara", "check", "video", "respira", "ejercicio", "pausa", "semilla", "diario", "fin"]
    : ses.tipo === "practica"
    ? ["check", "meditacion", "semilla", "diario", "fin"]
    : ses.tipo === "registro"
    ? (ses.conMed ? ["check", "registrar", "meditacion", "semilla", "fin"] : ["check", "registrar", "semilla", "diario", "fin"])
    : ses.tipo === "integracion"
    ? ["prepara", "check", "practica", "pausa", "semilla", "diario", "fin"]
    : video
    ? ["check", "video", "encuesta", "logro", "fin"]
    : ["check", "encuesta", "logro", "fin"];
  const total = PASOS.length;
  const cur = PASOS[paso];

  function siguiente() { setPaso((p) => Math.min(p + 1, total - 1)); }

  function commit() {
    const diarioTxt = [comprension.trim(), notaDiario.trim()].filter(Boolean).join(" · ");
    if (diarioTxt || foto) agregarDiario(diarioTxt, animo || null, luna, foto);
    if (video) marcarPaso(ses.videoIdx, notaDiario);
    marcarSesion(idx);
    if (animo && !checkinHecho) { registrarCheckin(animo); setCheckinHecho(true); }
    if (semillaTexto.trim()) guardarSemilla(semillaTexto.trim());
    if (ses.tipo === "cierre") {
      if (cierreValor) guardarCierreSemana(ses.semana, cierreValor);
      if (logroPeso) agregarHito({ texto: notaDiario || `Cerré mi mes ${ses.semana}`, area: luna, peso: logroPeso, foto });
    }
    if (ses.tipo === "registro" && logroPeso) {
      agregarHito({ texto: notaDiario || `Mi primer cambio de la semana ${ses.semana}`, area: luna, peso: logroPeso, foto });
    }
  }

  function terminar() {
    commit();
    if (caminoCompleto()) { router.replace("/graduacion"); return; }
    if (ses.tipo === "cierre" && ses.semana === 1 && soloSemana1()) { router.replace("/crecer"); return; }
    router.replace("/hoy");
  }
  function continuar() {
    commit();
    const d = cargar();
    if (!d) return;
    setDatos(d);
    setComprension(""); setFoto(null); setSemillaTexto(""); setNotaDiario(""); setCierreValor(0); setLogroPeso(0); setTarjeta(null);
    setQuizSel(null); setNotaAbierta(false); setInicioSesion(Date.now()); setSeg(0);
    setPaso(d.ses.tipo === "clase" ? 2 : d.ses.tipo === "integracion" ? 2 : 0);
    window.scrollTo(0, 0);
  }

  const areaSemana = areaDe(luna);

  return (
    <div className="ritual">
      <div className="ritual-top">
        <div className="between">
          <button className="link" onClick={() => {
            const hayTrabajo = animo || comprension.trim() || foto || semillaTexto.trim() || notaDiario.trim() || cierreValor || logroPeso;
            if (!hayTrabajo || confirm("Si salís ahora, lo de hoy no se guarda. ¿Salir igual?")) router.replace("/hoy");
          }}>Salir</button>
          <span className="tiny num">{ses.nacimiento ? "El Nacimiento" : `Micro-sesión ${idx + 1}`} · {Math.floor(seg / 60)}:{String(seg % 60).padStart(2, "0")}</span>
        </div>
        <div className="step-dots">{PASOS.map((_, i) => <i key={i} className={i <= paso ? "on" : ""} />)}</div>
      </div>

      <div className="ritual-body">
        {cur === "prepara" && (
          <div className="stack center">
            <div className="eyebrow">{`Bienvenida a tu micro-sesión ${idx + 1}`}</div>
            <div className="luna-hero"><Luna fase={0.3} size={116} /></div>
            <h2 className="h2">{conjuga(pais, "Preparate para vos", "Prepárate para ti")}</h2>
            <p className="lead">{conjuga(pais, "Buscá un momento tranquilo. Hacete un té o un café, agarrá tu cuaderno y una lapicera para tomar notas. Este rato es tuyo, sin culpa.", "Busca un momento tranquilo. Hazte un té o un café, toma tu cuaderno y una pluma para tomar notas. Este rato es tuyo, sin culpa.")}</p>
            <div className="card card-luna" style={{ textAlign: "left" }}>
              <p className="serif-lead">Tardaste 9 meses en nacer. Vas a tardar 9 semanas en renacer.</p>
            </div>
          </div>
        )}

        {cur === "check" && (
          <div className="stack">
            <div className="eyebrow">{habla(pais, "Cómo llegás")}</div>
            <h2 className="h2">{t("comoLlegas", pais)}</h2>
            <p className="tiny">{habla(pais, "Solo mirá cómo estás. No hay respuestas incorrectas.")}</p>
            <div className="grid-2" style={{ gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
              {CHECK.map((c) => (
                <button key={c.v} className={"chip" + (animo === c.v ? " sel" : "")} style={{ flexDirection: "column", gap: 4, padding: "14px 4px", textAlign: "center" }} onClick={() => setAnimo(c.v)}>
                  <span style={{ fontSize: "1.5rem" }}>{c.e}</span>
                  <span className="tiny">{c.l}</span>
                </button>
              ))}
            </div>
            {animo > 0 && animo <= 2 && (
              <div className="card" style={{ background: "var(--luna-wash)", borderColor: "#E7DEF0" }}>
                <p className="tiny" style={{ color: "var(--luna)" }}>{conjuga(pais, "Llegaste pesada hoy, y está bien. Si querés, antes de tu sesión podés contarle a Serena o respirar un minuto — o seguir directo, como te haga bien.", "Llegas pesada hoy, y está bien. Si quieres, antes de tu sesión puedes contarle a Serena o respirar un minuto — o seguir directo, como te haga bien.")}</p>
                <div className="grid-2" style={{ marginTop: 8 }}>
                  <Link href="/serena" className="btn btn-ghost" style={{ textAlign: "center", textDecoration: "none" }}>Hablar con Serena</Link>
                  <Link href="/respirar" className="btn btn-ghost" style={{ textAlign: "center", textDecoration: "none" }}>Respirar 1 min</Link>
                </div>
              </div>
            )}
          </div>
        )}

        {cur === "video" && video && (
          <div className="stack">
            <div className="eyebrow">{ses.nacimiento ? "Tu cierre" : "Tu clase"}</div>
            <h2 className="h2" style={{ fontStyle: "italic", color: "var(--luna)" }}>{video.titulo}</h2>
            {video.videoUrl ? (
              <>
                <p className="tiny">{conjuga(pais, "La parte teórica. Tené tu cuaderno a mano y anotá lo que te resuene.", "La parte teórica. Ten tu cuaderno a mano y anota lo que te resuene.")}</p>
                <Video url={video.videoUrl} titulo={video.titulo} />
                <p className="muted">{video.desc}</p>
                {(() => {
                  const qz = quizDe(video.id);
                  if (!qz) return null;
                  return (
                    <div className="card stack" style={{ background: "var(--luna-wash)", borderColor: "#E7DEF0" }}>
                      <b className="tiny" style={{ color: "var(--luna)" }}>PARA QUEDARTE CON LA IDEA</b>
                      <p style={{ fontWeight: 700 }}>{qz.q}</p>
                      <div className="stack" style={{ gap: 8 }}>
                        {qz.ops.map((op, i) => {
                          const elegida = quizSel === i;
                          const esOk = i === qz.ok;
                          return (
                            <button key={i} className="chip" style={{ width: "100%", textAlign: "left", justifyContent: "flex-start", border: elegida ? (esOk ? "1.5px solid var(--salvia)" : "1.5px solid var(--luna-soft)") : "1px solid var(--hairline)", background: elegida ? (esOk ? "var(--salvia-wash)" : "var(--surface)") : "var(--surface)" }} onClick={() => setQuizSel(i)}>
                              {op}
                            </button>
                          );
                        })}
                      </div>
                      {quizSel != null && (
                        <p className="tiny" style={{ color: quizSel === qz.ok ? "#3F6349" : "var(--luna)" }}>
                          {quizSel === qz.ok ? qz.tip : `Casi — la clave es: ${qz.ops[qz.ok].toLowerCase()}. ${qz.tip}`}
                        </p>
                      )}
                      {!notaAbierta
                        ? <button className="link" style={{ textAlign: "left" }} onClick={() => setNotaAbierta(true)}>{habla(pais, "¿Querés anotar algo del video? (opcional)")}</button>
                        : <textarea className="field" style={{ minHeight: 56 }} value={comprension} onChange={(e) => setComprension(e.target.value)} placeholder="Una idea, una frase, algo que te movió…" />}
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="card card-luna">
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

        {cur === "ejercicio" && video && (
          <div className="stack">
            <div className="eyebrow">Tu práctica</div>
            <div className="card card-luna"><p className="serif-lead">{video.idea}</p></div>
            <div className="card">
              <b>El ejercicio de hoy:</b>
              <p style={{ marginTop: 6 }}>{habla(pais, video.actividad)}</p>
            </div>
            <EvidenciaCard pais={pais} foto={foto} setFoto={setFoto} fileRef={fileRef} />
          </div>
        )}

        {cur === "practica" && (
          <div className="stack">
            <div className="eyebrow">Tu práctica viva · {areaSemana.label}</div>
            <h2 className="h2">{ses.repaso ? habla(pais, "Mirá cuánto caminaste") : "Hoy no se mira: hoy se vive"}</h2>
            <div className="card card-luna"><p className="serif-lead">{habla(pais, ses.reflexion)}</p></div>
            {!ses.repaso && practicaSemana && (
              <div className="card" style={{ background: "var(--surface-2)", border: 0 }}>
                <b className="tiny" style={{ color: "var(--luna)" }}>TU PRÁCTICA DE LA SEMANA, DE FONDO</b>
                <p style={{ marginTop: 4 }}>{habla(pais, practicaSemana)}</p>
              </div>
            )}
            <EvidenciaCard pais={pais} foto={foto} setFoto={setFoto} fileRef={fileRef} />
          </div>
        )}

        {cur === "meditacion" && (
          meds.length > 0 ? (
            <div className="stack">
              <div className="eyebrow">{habla(pais, "Una pausa para vos")}</div>
              <h2 className="h2">Tu meditación de esta luna</h2>
              <p className="tiny">{conjuga(pais, "Grabada por Sol, con su voz. Ponete cómoda, cerrá los ojos cuando ella te lo pida, y dejá que lo que trabajaste se asiente.", "Grabada por Sol, con su voz. Ponte cómoda, cierra los ojos cuando ella te lo pida, y deja que lo que trabajaste se asiente.")}</p>
              {meds.map((m) => (
                <div key={m.id} className="stack">
                  {meds.length > 1 && <b className="tiny" style={{ color: "var(--luna)" }}>{m.nombre.split("·")[1]?.trim() || m.nombre}</b>}
                  <Video url={embedMeditacion(m)} titulo={m.nombre} />
                </div>
              ))}
              <p className="tiny center">{conjuga(pais, "Si hoy no tenés el momento, seguí tranquila: te queda guardada en Meditar.", "Si hoy no tienes el momento, sigue tranquila: te queda guardada en Meditar.")}</p>
              <Link href="/respirar" className="card" style={{ display: "block", textDecoration: "none", color: "inherit", background: "var(--salvia-wash)", borderColor: "#D8E4DA" }}>
                <b style={{ color: "#3F6349" }}>Tu respiración de la semana</b>
                <p className="tiny">{conjuga(pais, "Practicala 1 minuto ahora — es la que vas a usar el resto de la semana.", "Practícala 1 minuto ahora — es la que usarás el resto de la semana.")}</p>
              </Link>
            </div>
          ) : null
        )}

        {cur === "pausa" && (
          <div className="stack center">
            <div className="eyebrow">{habla(pais, "Una pausa para vos")}</div>
            <div className="orb" style={{ margin: "18px auto" }}>{conjuga(pais, "respirá", "respira")}</div>
            <p className="muted">{conjuga(pais, "Cerrá un momento. Seguí el círculo: inhalá 4, retené 4, exhalá 4, vacío 4. Dejá que lo que trabajaste se asiente.", "Cierra un momento. Sigue el círculo: inhala 4, retén 4, exhala 4, vacío 4. Deja que lo que trabajaste se asiente.")}</p>
          </div>
        )}

        {cur === "registrar" && (
          <div className="stack">
            <div className="eyebrow">Tu primer cambio · {areaSemana.label}</div>
            <h2 className="h2">{conjuga(pais, "Registrá lo que cambió esta semana", "Registra lo que cambió esta semana")}</h2>
            <div className="card card-luna"><p className="serif-lead">{areaSemana.pregunta}</p></div>
            <p className="tiny">Lo que antes terminaba mal y esta semana no. Ese registro es tuyo y queda — hace crecer tu rueda.</p>
            <div className="grid-2" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {PESOS.map((x) => (
                <button key={x.p} className={"chip" + (logroPeso === x.p ? " sel" : "")} style={{ justifyContent: "center", padding: "12px 4px" }} onClick={() => setLogroPeso(x.p)}>
                  <span className="tiny" style={{ fontWeight: 800 }}>{x.l}</span>
                </button>
              ))}
            </div>
            <textarea className="field" style={{ minHeight: 60 }} value={notaDiario} onChange={(e) => setNotaDiario(e.target.value)} placeholder="¿Qué pasó? (ej: hoy no le grité) — opcional" />
            <EvidenciaCard pais={pais} foto={foto} setFoto={setFoto} fileRef={fileRef} />
          </div>
        )}

        {cur === "encuesta" && (
          <div className="stack">
            <div className="eyebrow">{ses.nacimiento ? "Tu última mirada" : `Cierre de tu mes ${ses.semana}`}</div>
            <h2 className="h2">{areaSemana.label}: ¿cómo salís de este mes?</h2>
            <p className="tiny">Del 1 al 10, con honestidad y sin juicio. Es tu foto de hoy.</p>
            <div className="grid-2" style={{ gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
              {Array.from({ length: 10 }).map((_, i) => {
                const v = i + 1;
                return <button key={v} className={"chip" + (cierreValor === v ? " sel" : "")} style={{ justifyContent: "center", padding: "14px 0" }} onClick={() => setCierreValor(v)}><b className="num">{v}</b></button>;
              })}
            </div>
          </div>
        )}

        {cur === "logro" && (
          <div className="stack">
            <div className="eyebrow">Tu logro del mes</div>
            <h2 className="h2">¿Cuánto creciste en {areaSemana.label.toLowerCase()}?</h2>
            <div className="grid-2" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {PESOS.map((x) => (
                <button key={x.p} className={"chip" + (logroPeso === x.p ? " sel" : "")} style={{ justifyContent: "center", padding: "12px 4px", flexDirection: "column", gap: 4 }} onClick={() => setLogroPeso(x.p)}>
                  <span className="tiny" style={{ fontWeight: 800 }}>{x.l}</span>
                </button>
              ))}
            </div>
            <textarea className="field" style={{ minHeight: 60 }} value={notaDiario} onChange={(e) => setNotaDiario(e.target.value)} placeholder="¿Qué cambió de verdad este mes? (opcional)" />
            <EvidenciaCard pais={pais} foto={foto} setFoto={setFoto} fileRef={fileRef} />
            <button className="btn btn-ghost ico-row" style={{ justifyContent: "center" }} onClick={() => setTarjeta(tarjetaLuna({ numero: ses.semana, nombreLuna: mod?.nombre || "", areaLabel: areaSemana.label, areaColor: areaSemana.color, nivelArea: nivelArea(luna), base: baseDeArea(luna) }))}>
              <Icon name="compartir" size={18} /> Mi tarjeta del mes
            </button>
            {tarjeta && (
              <div className="card stack">
                <img src={tarjeta} alt="Tu mes" style={{ width: "100%", borderRadius: "var(--r-1)" }} />
                <button className="btn btn-primary ico-row" style={{ justifyContent: "center" }} onClick={() => descargar(tarjeta, `mes-${ses.semana}-renacimiento.png`)}><Icon name="descargar" size={18} /> Descargar</button>
              </div>
            )}
          </div>
        )}

        {cur === "semilla" && (
          <div className="stack">
            <div className="eyebrow">Tu semilla de hoy</div>
            <h2 className="h2">{conjuga(pais, "Sembrá tu aprendizaje", "Siembra tu aprendizaje")}</h2>
            <p className="tiny">{conjuga(pais, "Una frase corta que te quieras llevar de hoy. La guardás y queda en tus semillas.", "Una frase corta que te quieras llevar de hoy. La guardas y queda en tus semillas.")}</p>
            <div className="card card-luna">
              <p className="tiny" style={{ color: "var(--luna)", fontWeight: 700 }}>PARA INSPIRARTE</p>
              <p className="serif-quote" style={{ fontSize: "1.1rem", marginTop: 4 }}>{habla(pais, semilla)}</p>
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
            <div className="luna-hero"><Luna fase={ses.tipo === "cierre" ? ses.semana / 9 : 0.6} size={140} /></div>
            <h2 className="h1" style={{ color: "var(--luna)" }}>
              {ses.nacimiento ? "Renaciste" : ses.tipo === "cierre" ? `Tu mes ${ses.semana} está completo` : t("listoHoy", pais)}
            </h2>
            <p className="lead">{ses.nacimiento ? "Nueve meses para nacer. Nueve semanas para renacer. Llegaste." : ses.tipo === "cierre" ? "Tu luna creció. Descansá el fin de semana: te lo ganaste." : t("aVivir", pais)}</p>
            {seg >= 60 && <p className="tiny">Tu sesión de hoy: <b className="num" style={{ color: "var(--luna)" }}>{Math.round(seg / 60)} min</b>{habla(pais, " para vos.")}</p>}
            {ses.tipo !== "cierre" && (
              <p className="tiny">{conjuga(pais, "Cuando en tu vida pase algo que valga la pena, registralo como logro en ", "Cuando en tu vida pase algo que valga la pena, regístralo como logro en ")}<b style={{ color: "var(--luna)" }}>Mi renacer</b>. No tiene que ser hoy.</p>
            )}
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
          : <button className="btn btn-primary btn-lg" onClick={siguiente} disabled={(cur === "check" && !animo) || (cur === "encuesta" && !cierreValor) || (cur === "registrar" && !logroPeso)}>{t("siguiente", pais)}</button>}
      </div>
    </div>
  );
}

function EvidenciaCard({ pais, foto, setFoto, fileRef }) {
  return (
    <div className="card" style={{ background: "var(--surface-2)", border: 0 }}>
      <b className="tiny" style={{ color: "var(--luna)" }}>{conjuga(pais, "DEJÁ TU EVIDENCIA (opcional)", "DEJA TU EVIDENCIA (opcional)")}</b>
      <p className="tiny" style={{ marginTop: 2 }}>{conjuga(pais, "Sacale una foto a tu hoja, a lo que escribiste o a lo que hiciste. Queda en tu diario.", "Tómale una foto a tu hoja, a lo que escribiste o a lo que hiciste. Queda en tu diario.")}</p>
      <button className="btn btn-ghost ico-row" style={{ justifyContent: "center", marginTop: 8 }} onClick={() => fileRef.current?.click()}>
        <Icon name="camara" size={18} /> {foto ? "Foto lista" : "Subir mi hoja"}
      </button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files[0] && achicarFoto(e.target.files[0], setFoto)} />
      {foto && <img src={foto} alt="evidencia" style={{ marginTop: 10, width: 90, height: 90, objectFit: "cover", borderRadius: 10 }} />}
    </div>
  );
}

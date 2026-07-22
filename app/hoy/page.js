"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Luna } from "@/components/Luna";
import {
  getUser, getOnboarding, getPais, esHoraDificil, rachaAmable,
  lunaActual, nacio, progresoLunaActual, migrarSesiones,
  sesionActual, sesionActualIdx, sesionCompletadaHoy, semanaCalendario,
  enGracia, accesoVencido, esFinDeSemana, soloSemana1, cierreDeSemanaHecho,
} from "@/lib/estado";
import { getModulo } from "@/lib/programa";
import { NOMBRE_DIA } from "@/lib/semanas";
import { t } from "@/lib/voz";

export default function Hoy() {
  const router = useRouter();
  const [listo, setListo] = useState(null);
  const [avanzarFinde, setAvanzarFinde] = useState(false);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    migrarSesiones();
    const ses = sesionActual();
    setListo({
      nombre: getUser().nombre, pais: getPais(),
      hechoHoy: sesionCompletadaHoy(), ses, idx: sesionActualIdx(),
      luna: lunaActual(), nacio: nacio(), prog: progresoLunaActual(),
      dificil: esHoraDificil(), hora: new Date().getHours(), racha: rachaAmable(),
      finde: esFinDeSemana(), gracia: enGracia(), vencido: accesoVencido(),
      gateS1: soloSemana1() && cierreDeSemanaHecho(1),
    });
  }, [router]);

  if (!listo) return <div className="app" style={{ minHeight: "100dvh" }} />;

  const { nombre, pais, hechoHoy, ses, dificil } = listo;
  const saludoKey = listo.hora < 12 ? "saludoManana" : listo.hora < 19 ? "saludoTarde" : "saludoNoche";
  const mod = ses ? getModulo(Math.min(ses.videoIdx != null ? lunaActual() : ses.semana, 10)) : null;
  const modSemana = ses ? getModulo(ses.semana <= 9 ? ses.semana : 9) : null;
  const descansa = listo.finde && !hechoHoy && !avanzarFinde && !listo.nacio && !listo.vencido;

  return (
    <div className="app app-pad" style={{ paddingTop: 30 }}>
      <div className="between" style={{ marginBottom: 6 }}>
        <div>
          <p className="tiny" style={{ marginBottom: 2 }}>{t(saludoKey, pais)},</p>
          <h1 className="h1">{nombre}</h1>
          {listo.racha >= 2 && <p className="tiny ico-row" style={{ gap: 5, color: "var(--oro)", fontWeight: 700, marginTop: 2 }}><Icon name="brillo" size={14} /> {listo.racha} días seguidos</p>}
        </div>
        <Luna fase={listo.nacio ? 1 : Math.max(0.08, (listo.luna - 1 + listo.prog) / 9)} size={62} halo={false} />
      </div>

      {listo.vencido ? (
        <div className="card card-luna stack center" style={{ marginTop: 20 }}>
          <span className="ico" style={{ color: "var(--luna)" }}><Icon name="luna" size={30} /></span>
          <h2 className="h2">Tu ventana de 12 semanas terminó</h2>
          <p className="muted">Tu camino y todo tu progreso están guardados, esperándote. Podés retomarlo con la extensión del programa completo, al 50%.</p>
          <Link href="/crecer" className="btn btn-primary btn-lg">Ver mi extensión (50% off)</Link>
        </div>
      ) : listo.nacio ? (
        <div className="card card-oro stack center" style={{ marginTop: 20 }}>
          <span className="ico" style={{ color: "var(--oro)" }}><Icon name="brillo" size={30} /></span>
          <h2 className="h2">Completaste tu camino</h2>
          <p className="muted">Renaciste. Andá a ver tu graduación — y lo que sigue.</p>
          <Link href="/graduacion" className="btn btn-oro btn-lg">Ver mi graduación</Link>
        </div>
      ) : listo.gateS1 ? (
        <div className="card card-luna stack center" style={{ marginTop: 20 }}>
          <span className="ico" style={{ color: "var(--luna)" }}><Icon name="brillo" size={30} /></span>
          <h2 className="h2">Tu primer mes está completo</h2>
          <p className="muted">Ya empezaste a renacer. Te quedan 8 lunas — y tus US$ 17 se descuentan si seguís esta semana.</p>
          <Link href="/crecer" className="btn btn-primary btn-lg">Quiero seguir mi camino</Link>
        </div>
      ) : descansa ? (
        <div className="card stack center" style={{ marginTop: 20, background: "var(--salvia-wash)", borderColor: "#D8E4DA" }}>
          <span className="ico" style={{ color: "#3F6349" }}><Icon name="hoja" size={30} /></span>
          <h2 className="h2" style={{ color: "#3F6349" }}>Hoy es tu día de descanso</h2>
          <p className="muted">El camino también se hace descansando. Tu próxima sesión te espera el lunes. Si querés, hoy podés registrar un logro o meditar — sin obligación.</p>
          <button className="link" onClick={() => setAvanzarFinde(true)}>Igual quiero avanzar hoy</button>
        </div>
      ) : (
        <div className="stack" style={{ marginTop: 18 }}>
          {listo.gracia && (
            <div className="card" style={{ background: "var(--luna-wash)", borderColor: "#E7DEF0", padding: 14 }}>
              <p className="tiny" style={{ color: "var(--luna)" }}>Estás en tus semanas de gracia. Sin apuro y sin culpa: tu camino sigue acá, y tus logros muestran que vas en serio.</p>
            </div>
          )}
          {hechoHoy && (
            <div className="card" style={{ background: "var(--salvia-wash)", borderColor: "#D8E4DA", padding: 14 }}>
              <p className="tiny" style={{ color: "#3F6349" }}>Ya hiciste tu sesión de hoy. Si tenés ganas y tiempo, podés seguir — a tu ritmo, sin apuro.</p>
            </div>
          )}
          {ses && (
            <div className="card card-luna">
              <div className="pill pill-luna" style={{ marginBottom: 10 }}>
                {ses.nacimiento ? "El Nacimiento" : `Semana ${ses.semana} · Día ${ses.dia} · ${NOMBRE_DIA[ses.tipo]}`}
              </div>
              <h2 className="h2" style={{ color: "var(--luna)" }}>{modSemana?.nombre}</h2>
              <p className="muted" style={{ marginTop: 6 }}>
                {ses.tipo === "integracion"
                  ? "Hoy no hay video: hoy se vive. Tu práctica de la semana, en tu vida real."
                  : ses.tipo === "cierre"
                  ? (ses.nacimiento ? "Llegaste. Hoy nace la nueva vos." : "Hoy cerrás tu mes: mirás cómo salís, y tu luna se completa.")
                  : modSemana?.intro}
              </p>
            </div>
          )}
          <button className="btn-empezar" onClick={() => router.push("/ritual")}>
            {hechoHoy ? "Seguir con el siguiente" : t("empezarDia", pais)}
            <Icon name="flecha" size={24} />
          </button>
        </div>
      )}

      {dificil && !listo.nacio && !listo.vencido && (
        <Link href="/respirar" className="card" style={{ marginTop: 16, display: "block", textDecoration: "none", color: "inherit", background: "var(--salvia-wash)", borderColor: "#D8E4DA" }}>
          <div className="row">
            <span className="ico" style={{ color: "#3F6349" }}><Icon name="viento" size={24} /></span>
            <div>
              <b style={{ color: "#3F6349" }}>¿Hora difícil? Respirá un minuto</b>
              <p className="tiny">SOS Calma para el momento con tus hijos</p>
            </div>
          </div>
        </Link>
      )}

      <Nav />
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/ui";
import { Luna } from "@/components/Luna";
import {
  getUser, getOnboarding, getPais, esHoraDificil,
  pasoCompletadoHoy, indiceActual, lunaActual, nacio, progresoLunaActual,
} from "@/lib/estado";
import { getModulo, TOTAL_PASOS } from "@/lib/programa";
import { t, conjuga } from "@/lib/voz";

export default function Hoy() {
  const router = useRouter();
  const [listo, setListo] = useState(null); // null = cargando

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    setListo({
      nombre: getUser().nombre,
      pais: getPais(),
      hechoHoy: pasoCompletadoHoy(),
      luna: lunaActual(),
      idx: indiceActual(),
      nacio: nacio(),
      prog: progresoLunaActual(),
      dificil: esHoraDificil(),
      hora: new Date().getHours(),
    });
  }, [router]);

  if (!listo) return <div className="app" style={{ minHeight: "100dvh" }} />;

  const { nombre, pais, hechoHoy, luna, idx, dificil } = listo;
  const saludoKey = listo.hora < 12 ? "saludoManana" : listo.hora < 19 ? "saludoTarde" : "saludoNoche";
  const modActual = getModulo(Math.min(luna, 10));
  const diaN = Math.min(idx + 1, TOTAL_PASOS);

  return (
    <div className="app app-pad" style={{ paddingTop: 30 }}>
      <div className="between" style={{ marginBottom: 6 }}>
        <div>
          <p className="tiny" style={{ marginBottom: 2 }}>{t(saludoKey, pais)},</p>
          <h1 className="h1">{nombre} 🤍</h1>
        </div>
        <Luna fase={listo.nacio ? 1 : Math.max(0.08, (luna - 1 + listo.prog) / 9)} size={64} halo={false} />
      </div>

      {listo.nacio ? (
        <div className="card card-oro stack center" style={{ marginTop: 20 }}>
          <div className="pill pill-oro">🌕 Luna llena</div>
          <h2 className="h2">Completaste tu camino</h2>
          <p className="muted">Te pariste a vos misma. Andá a ver tu renacimiento.</p>
          <Link href="/graduacion" className="btn btn-oro btn-lg">Ver mi graduación</Link>
        </div>
      ) : (
        <div className="stack" style={{ marginTop: 18 }}>
          {hechoHoy && (
            <div className="card" style={{ background: "var(--salvia-wash)", borderColor: "#D8E4DA", padding: 14 }}>
              <p className="tiny" style={{ color: "#4E7256" }}>🌷 Ya hiciste tu paso de hoy. Si tenés ganas y tiempo, podés seguir — a tu ritmo, sin apuro.</p>
            </div>
          )}
          <div className="card card-luna">
            <div className="pill pill-luna" style={{ marginBottom: 8 }}>
              {luna >= 10 ? "🌕 Tu último paso · El Nacimiento" : `🌙 Etapa ${luna} · Día ${diaN}`}
            </div>
            <h2 className="h2" style={{ fontStyle: "italic", color: "var(--luna)" }}>{modActual?.nombre}</h2>
            <p className="muted" style={{ marginTop: 4 }}>{modActual?.intro}</p>
          </div>
          <button className="btn-empezar" onClick={() => router.push("/ritual")}>
            {hechoHoy ? conjuga(pais, "Seguir con el siguiente", "Seguir con el siguiente") : t("empezarDia", pais)} <span aria-hidden>→</span>
          </button>
        </div>
      )}

      {dificil && !listo.nacio && (
        <Link href="/respirar" className="card" style={{ marginTop: 16, display: "block", textDecoration: "none", color: "inherit", background: "var(--salvia-wash)", borderColor: "#D8E4DA" }}>
          <div className="row">
            <span style={{ fontSize: "1.6rem" }}>🕊</span>
            <div>
              <b style={{ color: "#4E7256" }}>{conjuga(pais, "¿Hora difícil? Respirá un minuto", "¿Hora difícil? Respira un minuto")}</b>
              <p className="tiny">SOS Calma para el momento con tus hijos</p>
            </div>
          </div>
        </Link>
      )}

      <Nav />
    </div>
  );
}

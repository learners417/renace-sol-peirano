"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Luna } from "@/components/Luna";
import {
  getUser, getOnboarding, getPais, esHoraDificil,
  pasoCompletadoHoy, indiceActual, lunaActual, nacio, progresoLunaActual,
} from "@/lib/estado";
import { getModulo, TOTAL_PASOS } from "@/lib/programa";
import { t } from "@/lib/voz";

export default function Hoy() {
  const router = useRouter();
  const [listo, setListo] = useState(null);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    setListo({
      nombre: getUser().nombre, pais: getPais(),
      hechoHoy: pasoCompletadoHoy(), luna: lunaActual(), idx: indiceActual(),
      nacio: nacio(), prog: progresoLunaActual(), dificil: esHoraDificil(), hora: new Date().getHours(),
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
          <h1 className="h1">{nombre}</h1>
        </div>
        <Luna fase={listo.nacio ? 1 : Math.max(0.08, (luna - 1 + listo.prog) / 9)} size={62} halo={false} />
      </div>

      {listo.nacio ? (
        <div className="card card-oro stack center" style={{ marginTop: 20 }}>
          <span className="ico" style={{ color: "var(--oro)" }}><Icon name="brillo" size={30} /></span>
          <h2 className="h2">Completaste tu camino</h2>
          <p className="muted">Recorriste el camino entero. Andá a ver tu renacimiento.</p>
          <Link href="/graduacion" className="btn btn-oro btn-lg">Ver mi graduación</Link>
        </div>
      ) : (
        <div className="stack" style={{ marginTop: 18 }}>
          {hechoHoy && (
            <div className="card" style={{ background: "var(--salvia-wash)", borderColor: "#D8E4DA", padding: 14 }}>
              <p className="tiny" style={{ color: "#3F6349" }}>Ya hiciste tu paso de hoy. Si tenés ganas y tiempo, podés seguir — a tu ritmo, sin apuro.</p>
            </div>
          )}
          <div className="card card-luna">
            <div className="pill pill-luna" style={{ marginBottom: 10 }}>{luna >= 10 ? "Tu último paso · El Nacimiento" : `Etapa ${luna} · Día ${diaN}`}</div>
            <h2 className="h2" style={{ color: "var(--luna)" }}>{modActual?.nombre}</h2>
            <p className="muted" style={{ marginTop: 6 }}>{modActual?.intro}</p>
          </div>
          <button className="btn-empezar" onClick={() => router.push("/ritual")}>
            {hechoHoy ? "Seguir con el siguiente" : t("empezarDia", pais)}
            <Icon name="flecha" size={24} />
          </button>
        </div>
      )}

      {dificil && !listo.nacio && (
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

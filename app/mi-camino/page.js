"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/ui";
import { Luna } from "@/components/Luna";
import {
  getUser, getPais, lunasCompletas, lunaActual, fullnessLuna, nacio,
  promedioInicial, getTermometroFinal, moduloCompleto, moduloDesbloqueado,
  pasosHechosModulo, diasDesdeUltimoPaso,
} from "@/lib/estado";
import { etapas, getModulo } from "@/lib/programa";

export default function MiCamino() {
  const router = useRouter();
  const [s, setS] = useState(null);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    setS({
      pais: getPais(), completas: lunasCompletas(), actual: lunaActual(),
      fullness: fullnessLuna(), nacio: nacio(),
      antes: promedioInicial(), despues: getTermometroFinal(),
      diasSin: diasDesdeUltimoPaso(),
    });
  }, [router]);

  if (!s) return <div className="app" style={{ minHeight: "100dvh" }} />;

  return (
    <div className="app app-pad" style={{ paddingTop: 26 }}>
      <div className="center stack">
        <div className="eyebrow">Mi camino</div>
        <div className="luna-hero"><Luna fase={s.nacio ? 1 : Math.max(0.06, s.fullness)} size={190} /></div>
        <h1 className="h1" style={{ fontStyle: "italic", color: "var(--luna)" }}>Volver a vos, paso a paso</h1>
        <p className="tiny">{s.nacio ? "Completaste tu camino 🌕" : `${s.completas} de 9 etapas · vas por la ${Math.min(s.actual, 9)}`}</p>
      </div>

      {s.diasSin != null && s.diasSin >= 3 && !s.nacio && (
        <div className="card" style={{ marginTop: 14, background: "var(--luna-wash)", borderColor: "#E7DEF0" }}>
          <p className="tiny" style={{ color: "var(--luna)" }}>Hace {s.diasSin} días que no venís. Sin culpa: tu camino te espera. Cuando quieras, seguimos 🤍</p>
        </div>
      )}

      {s.antes != null && (
        <div className="card stack" style={{ marginTop: 16 }}>
          <div className="eyebrow">Tu conexión con vos</div>
          <div className="between">
            <div className="center" style={{ flex: 1 }}>
              <div className="tiny">Al empezar</div>
              <div className="num" style={{ fontSize: "1.8rem", color: "var(--ink-2)" }}>{s.antes}<span style={{ fontSize: ".85rem", color: "var(--ink-3)" }}>/10</span></div>
            </div>
            <span style={{ color: "var(--luna-soft)", fontSize: "1.4rem" }}>→</span>
            <div className="center" style={{ flex: 1 }}>
              <div className="tiny">{s.despues != null ? "Al graduarte" : "Al final"}</div>
              <div className="num" style={{ fontSize: "1.8rem", color: s.despues != null ? "var(--salvia)" : "var(--ink-3)" }}>
                {s.despues != null ? <>{s.despues}<span style={{ fontSize: ".85rem", color: "var(--ink-3)" }}>/10</span></> : "🌱"}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid-2" style={{ marginTop: 14 }}>
        <Link href="/como-funciona" className="card" style={{ textDecoration: "none", color: "inherit", textAlign: "center", padding: 14 }}><div style={{ fontSize: "1.4rem" }}>🧭</div><b>Cómo funciona</b></Link>
        <Link href="/meditar" className="card" style={{ textDecoration: "none", color: "inherit", textAlign: "center", padding: 14 }}><div style={{ fontSize: "1.4rem" }}>🎧</div><b>Meditar</b></Link>
        <Link href="/respirar" className="card" style={{ textDecoration: "none", color: "inherit", textAlign: "center", padding: 14 }}><div style={{ fontSize: "1.4rem" }}>🕊</div><b>Respirar</b></Link>
        <Link href="/semillas" className="card" style={{ textDecoration: "none", color: "inherit", textAlign: "center", padding: 14 }}><div style={{ fontSize: "1.4rem" }}>🌱</div><b>Mis semillas</b></Link>
      </div>

      <div style={{ marginTop: 24 }}>
        {etapas.map((et) => (
          <div key={et.n} style={{ marginBottom: 18 }}>
            <div className="row" style={{ marginBottom: 8 }}>
              <span style={{ fontSize: "1.2rem" }}>{et.icono}</span>
              <div>
                <b style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--luna)" }}>{et.nombre}</b>
                <p className="tiny">{et.semanas}</p>
              </div>
            </div>
            <div className="stack">
              {et.modulos.filter((n) => n <= 9).map((n) => {
                const m = getModulo(n);
                const done = moduloCompleto(n);
                const abierto = moduloDesbloqueado(n);
                const activa = n === s.actual;
                const hechos = pasosHechosModulo(n);
                const tot = m.videos.length;
                const inner = (
                  <div className="between">
                    <div className="row">
                      <Luna fase={abierto ? Math.max(0.1, n / 9) : 0} size={36} halo={false} />
                      <div>
                        <b style={{ color: abierto ? "inherit" : "var(--ink-3)" }}>Etapa {n} · {m.nombre}</b>
                        <p className="tiny">{done ? "Completa 🌸" : abierto ? `${hechos}/${tot} clases` : "Se abre al terminar la anterior"}</p>
                      </div>
                    </div>
                    <span style={{ color: "var(--luna-soft)" }}>{abierto ? "›" : "🔒"}</span>
                  </div>
                );
                const style = { textDecoration: "none", color: "inherit", padding: 14, borderColor: activa ? "var(--luna-soft)" : "var(--hairline)", background: activa ? "var(--luna-wash)" : "var(--surface)", opacity: abierto ? 1 : 0.6 };
                return abierto
                  ? <Link key={n} href={`/luna/${n}`} className="card" style={style}>{inner}</Link>
                  : <div key={n} className="card" style={style}>{inner}</div>;
              })}
            </div>
          </div>
        ))}
      </div>

      {s.nacio && <Link href="/graduacion" className="btn btn-oro btn-lg" style={{ marginTop: 8 }}>Ver mi graduación 🌕</Link>}
      <Nav />
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Luna } from "@/components/Luna";
import {
  getUser, getPais, lunasCompletas, lunaActual, fullnessLuna, nacio,
  promedioInicial, getTermometroFinal, moduloCompleto, semanaDesbloqueada,
  pasosHechosModulo, diasDesdeUltimoPaso, sesionActual, migrarSesiones,
} from "@/lib/estado";
import { etapas, getModulo } from "@/lib/programa";
import { primeraSesionDeSemana } from "@/lib/semanas";
import { MEDITACIONES } from "@/lib/vida";

const HAY_MEDITACIONES = MEDITACIONES.some((m) => m.youtubeId);

function Estado({ done, abierto, activa, n }) {
  if (done) return <span className="state state-done"><Icon name="check" size={18} /></span>;
  if (!abierto) return <span className="state state-lock"><Icon name="candado" size={16} /></span>;
  if (activa) return <span className="state state-now"><Icon name="puntoActivo" size={20} /></span>;
  return <span className="state state-num">{n}</span>;
}

export default function MiCamino() {
  const router = useRouter();
  const [s, setS] = useState(null);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    migrarSesiones();
    setS({
      semanaPlan: (sesionActual()?.semana) || 10,
      completas: lunasCompletas(), actual: lunaActual(),
      fullness: fullnessLuna(), nacio: nacio(),
      antes: promedioInicial(), despues: getTermometroFinal(),
      diasSin: diasDesdeUltimoPaso(),
    });
  }, [router]);

  if (!s) return <div className="app" style={{ minHeight: "100dvh" }} />;

  const tools = [
    { href: "/como-funciona", icon: "brujula", label: "Cómo funciona" },
    ...(HAY_MEDITACIONES ? [{ href: "/meditar", icon: "auriculares", label: "Meditar" }] : []),
    { href: "/respirar", icon: "viento", label: "Respirar" },
    { href: "/semillas", icon: "brote", label: "Mis semillas" },
  ];

  return (
    <div className="app app-pad" style={{ paddingTop: 26 }}>
      <div className="center stack">
        <div className="eyebrow">Mi camino</div>
        <div className="luna-hero"><Luna fase={s.nacio ? 1 : Math.max(0.06, s.fullness)} size={186} /></div>
        <h1 className="h1" style={{ color: "var(--luna)" }}>Volver a vos, paso a paso</h1>
        <p className="tiny">{s.nacio ? "Completaste tu camino" : `${s.completas} de 9 lunas · vas por la ${Math.min(s.semanaPlan, 9)}`}</p>
      </div>

      {s.diasSin != null && s.diasSin >= 3 && !s.nacio && (
        <div className="card" style={{ marginTop: 14, background: "var(--luna-wash)", borderColor: "#E7DEF0" }}>
          <p className="tiny" style={{ color: "var(--luna)" }}>Hace {s.diasSin} días que no venís. Sin culpa: tu camino te espera. Cuando quieras, seguimos.</p>
        </div>
      )}

      {s.antes != null && (
        <div className="card stack" style={{ marginTop: 16 }}>
          <div className="eyebrow">Tu conexión con vos</div>
          <div className="between">
            <div className="center" style={{ flex: 1 }}>
              <div className="tiny">Al empezar</div>
              <div className="num" style={{ fontSize: "1.9rem", color: "var(--ink-2)" }}>{s.antes}<span style={{ fontSize: ".85rem", color: "var(--ink-3)" }}>/10</span></div>
            </div>
            <span style={{ color: "var(--luna-soft)" }}><Icon name="flecha" size={22} /></span>
            <div className="center" style={{ flex: 1 }}>
              <div className="tiny">{s.despues != null ? "Al graduarte" : "Al final"}</div>
              <div className="num" style={{ fontSize: "1.9rem", color: s.despues != null ? "var(--salvia)" : "var(--ink-3)" }}>
                {s.despues != null ? <>{s.despues}<span style={{ fontSize: ".85rem", color: "var(--ink-3)" }}>/10</span></> : "—"}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid-2" style={{ marginTop: 14 }}>
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="card" style={{ textDecoration: "none", color: "inherit", padding: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span className="ico" style={{ color: "var(--luna)" }}><Icon name={t.icon} size={22} /></span>
            <b style={{ fontSize: ".95rem" }}>{t.label}</b>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        {etapas.map((et) => (
          <div key={et.n} style={{ marginBottom: 20 }}>
            <b style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "var(--luna)", display: "block", marginBottom: 2 }}>{et.nombre}</b>
            <p className="tiny" style={{ marginBottom: 10 }}>{et.semanas}</p>
            <div className="stack">
              {et.modulos.filter((n) => n <= 9).map((n) => {
                const m = getModulo(n);
                const done = moduloCompleto(n);
                const abierto = semanaDesbloqueada(n);
                const activa = n === Math.min(s.semanaPlan, 9);
                const hechos = pasosHechosModulo(n);
                const tot = m.videos.length;
                const inner = (
                  <div className="between">
                    <div className="row">
                      <Estado done={done} abierto={abierto} activa={activa} n={n} />
                      <div>
                        <b style={{ color: abierto ? "inherit" : "var(--ink-3)" }}>Luna {n} · {m.nombre}</b>
                        <p className="tiny">{done ? "Completa" : abierto ? `${hechos}/${tot} clases` : `Se abre en tu micro-sesión ${primeraSesionDeSemana(n)}`}</p>
                      </div>
                    </div>
                    {abierto && <span style={{ color: "var(--luna-soft)" }}><Icon name="chevron" size={18} /></span>}
                  </div>
                );
                const style = { textDecoration: "none", color: "inherit", padding: 14, overflow: "hidden", position: "relative", borderColor: activa ? "var(--luna-soft)" : "var(--hairline)", background: activa ? "var(--luna-wash)" : "var(--surface)", opacity: abierto ? 1 : 0.7 };
                return abierto
                  ? <Link key={n} href={`/luna/${n}`} className="card" style={style}>{inner}</Link>
                  : <div key={n} className="card" style={style}>{inner}</div>;
              })}
            </div>
          </div>
        ))}
      </div>

      {s.nacio && <Link href="/graduacion" className="btn btn-oro btn-lg" style={{ marginTop: 8 }}>Ver mi graduación</Link>}
      <Nav />
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Sos from "@/components/Sos";
import { etapas, modulos, etapaDeModulo, videoPorIndice, TOTAL_MODULOS } from "@/lib/programa";
import { getUser, getOnboarding, getDiagnostico, indiceActual, modulosCompletos, moduloCompleto, pasosHechosModulo, pasosDeModulo } from "@/lib/estado";
import { puntoA, puntoB } from "@/lib/textos";

export default function Programa() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [diag, setDiag] = useState(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    setUser(u); setDiag(getDiagnostico());
  }, [router]);

  if (!user) return null;

  const idx = indiceActual();
  const videoActual = videoPorIndice(Math.min(idx, 27));
  const moduloActual = videoActual ? videoActual.modulo : 10;
  const completos = modulosCompletos();
  const pct = TOTAL_MODULOS ? Math.round((completos / TOTAL_MODULOS) * 100) : 0;
  const etapaActual = etapaDeModulo(moduloActual);
  const dolor = diag?.dolor || "default";

  return (
    <>
      <div className="app">
        <div className="topbar">
          <div className="brand">Tu programa<span> · 90 días</span></div>
          <div className="pill">{pct}%</div>
        </div>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <div className="ab-row">
            <div className="ab-col">
              <div className="ab-lbl">De acá partiste</div>
              <p className="ab-txt">{puntoA[dolor] || puntoA.default}</p>
            </div>
            <div className="ab-arrow">→</div>
            <div className="ab-col ab-dest">
              <div className="ab-lbl">Hacia acá vas</div>
              <p className="ab-txt">{puntoB}</p>
            </div>
          </div>
        </div>

        <div className="progress" style={{ marginTop: 14 }}>
          <div className="row"><span className="lbl">Tu avance</span><span className="pct">{completos}/{TOTAL_MODULOS} módulos</span></div>
          <div className="bar"><i style={{ width: pct + "%" }} /></div>
          <div style={{ marginTop: 10, fontSize: 13, color: "var(--muted)" }}>
            Estás en el módulo {moduloActual} · etapa "{etapaActual.nombre}" 🌷
          </div>
        </div>

        <div className="slabel" style={{ margin: "24px 0 14px" }}>Las 3 etapas de tu camino</div>

        {etapas.map((et) => {
          const mods = et.modulos;
          const hechos = mods.filter((m) => moduloCompleto(m)).length;
          const total = mods.length;
          const completa = hechos === total;
          const activa = mods.includes(moduloActual);
          const p = total ? Math.round((hechos / total) * 100) : 0;
          return (
            <div key={et.n} className={"etapa" + (activa ? " activa" : "") + (completa ? " completa" : "")}>
              <div className="etapa-head">
                <div className="etapa-ic" style={{ background: et.color }}>{completa ? "✓" : et.icono}</div>
                <div style={{ flex: 1 }}>
                  <div className="etapa-n">Etapa {et.n} · {et.nombre}</div>
                  <div className="etapa-sem">{et.semanas} · Módulos {et.modulos[0]}–{et.modulos[et.modulos.length-1]}</div>
                </div>
                {activa && <span className="badge-aqui">Estás acá</span>}
              </div>
              <p className="etapa-sub">{et.subtitulo}</p>
              <p className="etapa-meta"><b>Tu meta:</b> {et.meta}</p>
              <p className="etapa-logro">🌸 {et.logro}</p>
              <div className="bar" style={{ marginTop: 10 }}><i style={{ width: p + "%", background: et.color }} /></div>
            </div>
          );
        })}

        <div className="slabel" style={{ margin: "24px 0 14px" }}>Los 10 módulos</div>
        {modulos.map((m) => {
          const hechos = pasosHechosModulo(m.n);
          const total = pasosDeModulo(m.n).length;
          const comp = moduloCompleto(m.n);
          const activo = m.n === moduloActual;
          return (
            <div key={m.n} className={"mod-row" + (activo ? " activo" : "")}>
              <div className="mod-ic" style={{ background: m.color }}>{comp ? "✓" : m.icono}</div>
              <div style={{ flex: 1 }}>
                <div className="mod-nombre">Módulo {m.n} · {m.nombre}</div>
                <div className="mod-videos">{hechos}/{total} {total === 1 ? "parte" : "partes"}</div>
              </div>
              {activo && <span className="badge-aqui">Acá</span>}
            </div>
          );
        })}

        <button className="btn mt2" onClick={() => router.push("/")}>Seguir mi camino de hoy →</button>
      </div>
      <Sos />
      <Nav />
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Sos from "@/components/Sos";
import { etapas, puntoA, puntoB, etapaDeSemana, TOTAL_SEMANAS } from "@/lib/programa";
import { getUser, getOnboarding, getDiagnostico, posicionActual, semanasFlorecidas, semanaFlorecida } from "@/lib/estado";

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

  const pos = posicionActual();
  const florecidas = semanasFlorecidas();
  const pct = TOTAL_SEMANAS ? Math.round((florecidas / TOTAL_SEMANAS) * 100) : 0;
  const etapaActual = etapaDeSemana(pos.s);
  const dolor = diag?.dolor || "default";

  return (
    <>
      <div className="app">
        <div className="topbar">
          <div className="brand">Tu programa<span> · 90 días</span></div>
          <div className="pill">{pct}%</div>
        </div>

        {/* Punto A → B */}
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
          <div className="row"><span className="lbl">Tu avance en el programa</span><span className="pct">{florecidas}/12 semanas</span></div>
          <div className="bar"><i style={{ width: pct + "%" }} /></div>
          <div style={{ marginTop: 10, fontSize: 13, color: "var(--muted)" }}>
            Estás en la semana {pos.s} · etapa "{etapaActual.nombre}" 🌷
          </div>
        </div>

        <div className="slabel" style={{ margin: "24px 0 14px" }}>Las 3 etapas de tu camino</div>

        {etapas.map((et) => {
          const hechas = et.semanas.filter((s) => semanaFlorecida(s)).length;
          const total = et.semanas.length;
          const completa = hechas === total;
          const activa = et.semanas.includes(pos.s);
          const p = total ? Math.round((hechas / total) * 100) : 0;
          return (
            <div key={et.n} className={"etapa" + (activa ? " activa" : "") + (completa ? " completa" : "")}>
              <div className="etapa-head">
                <div className="etapa-ic" style={{ background: et.color }}>{completa ? "✓" : et.icono}</div>
                <div style={{ flex: 1 }}>
                  <div className="etapa-n">Etapa {et.n} · {et.nombre}</div>
                  <div className="etapa-sem">Semanas {et.semanas[0]}–{et.semanas[et.semanas.length-1]}</div>
                </div>
                {activa && <span className="badge-aqui">Estás acá</span>}
              </div>
              <p className="etapa-meta"><b>Tu meta:</b> {et.meta}</p>
              <p className="etapa-logro">🌸 {et.logro}</p>
              <div className="bar" style={{ marginTop: 10 }}><i style={{ width: p + "%", background: et.color }} /></div>
            </div>
          );
        })}

        <div className="card card-soft center" style={{ marginTop: 18 }}>
          <div style={{ fontSize: 26 }}>🎯</div>
          <p className="sub" style={{ marginTop: 6 }}>
            Al completar tus 90 días, recibís tu graduación: tu carta, tu antes y después, y tu jardín florecido.
          </p>
        </div>

        <button className="btn mt" onClick={() => router.push("/")}>Seguir mi camino de hoy →</button>
      </div>
      <Sos />
      <Nav />
    </>
  );
}

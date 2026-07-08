"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { modulos, TOTAL_MODULOS, videoPorIndice, etapaDeModulo } from "@/lib/programa";
import {
  getUser, getOnboarding, moduloCompleto, modulosCompletos, pasosHechosModulo, pasosDeModulo,
  totalPasosHechos, promedioInicial, promedioReciente, indiceActual, caminoCompleto, logout,
} from "@/lib/estado";

const florDe = (i) => ["🌷","🌸","🌼","🌻","🪻","🌺","🌹","🏵️","🪷","💮"][i] || "✿";

export default function MiCamino() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    setUser(u);
  }, [router]);

  if (!user) return null;

  const idx = indiceActual();
  const v = videoPorIndice(Math.min(idx, 27));
  const modActual = v ? v.modulo : 10;
  const etapaActual = etapaDeModulo(modActual);
  const completos = modulosCompletos();
  const pct = TOTAL_MODULOS ? Math.round((completos / TOTAL_MODULOS) * 100) : 0;
  const ini = promedioInicial();
  const rec = promedioReciente();
  const completo = caminoCompleto();

  return (
    <>
      <div className="app">
        <div className="topbar"><div className="brand">Mi camino<span> 🌷</span></div></div>

        {/* Resumen simple arriba */}
        <div className="mc-resumen">
          <div className="mc-pct">{pct}%</div>
          <div className="mc-info">
            <div className="mc-etapa">Estás en: <b>{etapaActual.nombre}</b></div>
            <div className="mc-mod">Módulo {modActual} · {completos} de {TOTAL_MODULOS} módulos completos</div>
          </div>
        </div>
        <div className="bar" style={{ marginBottom: 22 }}><i style={{ width: pct + "%" }} /></div>

        {/* Jardín simple */}
        <div className="slabel">Tu jardín</div>
        <p className="sub" style={{ fontSize: 13, marginBottom: 12 }}>Cada módulo que terminás, florece una flor. Las que faltan te esperan. 🤍</p>
        <div className="garden garden-5">
          {modulos.map((m, i) => {
            const bloom = moduloCompleto(m.n);
            const now = modActual === m.n && !completo;
            return (
              <div key={m.n} className={"flor" + (bloom ? " bloom" : "") + (now ? " now" : "")}>
                <div className="f">{florDe(i)}</div>
                <div className="fn">{m.n}</div>
              </div>
            );
          })}
        </div>

        {/* Termómetro simple */}
        {(ini || rec) && (
          <>
            <div className="slabel" style={{ marginTop: 24 }}>Cómo te sentís</div>
            <div className="card">
              <div className="termometro">
                {ini && <div className="tcol"><div className="tbar antes" style={{ height: 30 + ini * 22 }} /><div className="tnum">{ini}</div><div className="tlab">Al empezar</div></div>}
                {rec && <div className="tcol"><div className="tbar" style={{ height: 30 + rec * 22 }} /><div className="tnum">{rec}</div><div className="tlab">Ahora</div></div>}
              </div>
              <p className="sub center" style={{ fontSize: 12.5 }}>Tu espejo, no una nota. Los días bajos también son parte del camino.</p>
            </div>
          </>
        )}

        {/* Herramientas simples */}
        <div className="slabel" style={{ marginTop: 24 }}>Cuando lo necesites</div>
        <div className="mc-tools">
          <button className="mc-tool" onClick={() => router.push("/sos")}><span>🕊</span>SOS Calma</button>
          <button className="mc-tool" onClick={() => router.push("/respirar")}><span>🌬</span>Respirar</button>
          <button className="mc-tool" onClick={() => router.push("/semillas")}><span>🌱</span>Mis frases</button>
          <button className="mc-tool" onClick={() => router.push("/como-funciona")}><span>📖</span>Cómo funciona</button>
        </div>

        {completo && <button className="btn mt2" onClick={() => router.push("/graduacion")}>🌸 Ver mi graduación</button>}
        <button className="btn ghost mt2" onClick={() => { logout(); router.replace("/login"); }}>Cerrar sesión</button>
      </div>
      <Nav />
    </>
  );
}

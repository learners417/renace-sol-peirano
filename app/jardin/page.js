"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Sos from "@/components/Sos";
import { modulos, TOTAL_MODULOS } from "@/lib/programa";
import {
  getUser, getOnboarding, moduloCompleto, modulosCompletos, pasosHechosModulo, pasosDeModulo,
  totalPasosHechos, rachaAmable, promedioInicial, promedioReciente, indiceActual, caminoCompleto, logout,
} from "@/lib/estado";
import { videoPorIndice } from "@/lib/programa";

const florDe = (i) => ["🌷","🌸","🌼","🌻","🪻","🌺","🌹","🏵️","🪷","💮"][i] || "✿";

export default function Jardin() {
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
  const completos = modulosCompletos();
  const hechos = totalPasosHechos();
  const racha = rachaAmable();
  const ini = promedioInicial();
  const rec = promedioReciente();
  const completo = caminoCompleto();

  return (
    <>
      <div className="app">
        <div className="topbar">
          <div className="brand">Tu jardín<span> 🌷</span></div>
          <div className="pill">{completos}/{TOTAL_MODULOS} flores</div>
        </div>

        <p className="sub" style={{ marginBottom: 6 }}>
          Cada módulo completo, florece una flor. Las que faltan no están marchitas: <b style={{color:"var(--deep)"}}>te esperan.</b>
        </p>

        <div className="garden garden-5">
          {modulos.map((m, i) => {
            const bloom = moduloCompleto(m.n);
            const now = modActual === m.n && !completo;
            const total = pasosDeModulo(m.n).length;
            const hechosM = pasosHechosModulo(m.n);
            return (
              <div key={m.n} className={"flor" + (bloom ? " bloom" : "") + (now ? " now" : "")}>
                <div className="f">{florDe(i)}</div>
                <div className="fn">Mód {m.n}</div>
                <div className="riegos">
                  {Array.from({ length: total }).map((_, d) => (
                    <div key={d} className={"gota" + (d < hechosM ? " on" : "")} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="card card-soft center">
          <div style={{ fontSize: 26 }}>💧</div>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{hechos} pasos dados en total</div>
          <div className="sub">{racha > 1 ? `Venís regando hace ${racha} días seguidos 🌱` : "Cada gota cuenta, al ritmo que puedas."}</div>
        </div>

        {(ini || rec) && (
          <div className="card">
            <div className="kick">Tu termómetro</div>
            <h2 className="h2" style={{ margin: "4px 0 8px" }}>Cómo llegaste · cómo estás</h2>
            <div className="termometro">
              {ini && <div className="tcol"><div className="tbar antes" style={{ height: 30 + ini * 22 }} /><div className="tnum">{ini}</div><div className="tlab">Al llegar</div></div>}
              {rec && <div className="tcol"><div className="tbar" style={{ height: 30 + rec * 22 }} /><div className="tnum">{rec}</div><div className="tlab">Últimos días</div></div>}
            </div>
            <p className="sub center" style={{ fontSize: 12.5 }}>No es una nota: es tu espejo. Los días bajos también son parte del camino.</p>
          </div>
        )}

        {completo && <button className="btn" onClick={() => router.push("/graduacion")}>🌸 Ver mi graduación</button>}
        <button className="btn ghost mt2" onClick={() => { logout(); router.replace("/login"); }}>Cerrar sesión</button>
      </div>
      <Sos />
      <Nav />
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getOnboarding, promedioInicial, promedioReciente, totalPasosHechos, caminoCompleto } from "@/lib/estado";
import { compartirTexto } from "@/lib/compartir";
import { encuestaFinal } from "@/lib/programa";

export default function Graduacion() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ob, setOb] = useState(null);
  const [verCarta, setVerCarta] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    const o = getOnboarding();
    if (!o) { router.replace("/onboarding"); return; }
    if (!caminoCompleto()) { router.replace("/"); return; }
    setUser(u); setOb(o);
  }, [router]);

  if (!user || !ob) return null;

  const ini = promedioInicial();
  const rec = promedioReciente();

  const compartir = async () => {
    await compartirTexto(`Completé mi programa R.E.N.A.C.E. 🌸 90 días de volver a mí. Mi jardín floreció entero. 🤍`);
  };

  return (
    <div className="full center">
      <div style={{ fontSize: 56 }}>🌸</div>
      <div className="kick" style={{ margin: "10px 0" }}>Programa completado · 90 días</div>
      <h1 className="h1">Lo lograste, {user.nombre}.</h1>
      <p style={{ fontSize: 16, color: "#5A5266", margin: "14px 0", lineHeight: 1.65 }}>
        Completaste tu programa de 90 días. {totalPasosHechos()} días regados, un jardín entero.
        No cambiaste quién sos — <b style={{ color: "#7E6399" }}>volviste a vos.</b>
      </p>

      {(ini || rec) && (
        <div className="card">
          <div className="kick">Tu antes y ahora</div>
          <div className="termometro">
            {ini && <div className="tcol"><div className="tbar antes" style={{ height: 30 + ini * 22 }} /><div className="tnum">{ini}</div><div className="tlab">Al llegar</div></div>}
            {rec && <div className="tcol"><div className="tbar" style={{ height: 30 + rec * 22 }} /><div className="tnum">{rec}</div><div className="tlab">Hoy</div></div>}
          </div>
        </div>
      )}

      {!verCarta && (
        <div className="card card-soft">
          <div style={{ fontSize: 30 }}>💌</div>
          <h2 className="h2" style={{ margin: "6px 0" }}>Hay una carta esperándote</h2>
          <p className="sub">La escribiste vos, el día que llegaste. Es hora de leerla.</p>
          <button className="btn mt" onClick={() => setVerCarta(true)}>Abrir mi carta</button>
        </div>
      )}
      {verCarta && (
        <div className="semilla" style={{ textAlign: "left" }}>
          <div className="sm" style={{ marginTop: 0, marginBottom: 12 }}>De: vos · Para: vos, 12 semanas después</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, lineHeight: 1.5, fontStyle: "italic", whiteSpace: "pre-wrap" }}>
            {ob.carta}
          </div>
        </div>
      )}

      <button className="btn sec mt" onClick={compartir}>Compartir mi flor 🌸</button>

      <div className="card mt2" style={{ textAlign: "left" }}>
        <div className="kick">Seguí perteneciendo, si querés</div>
        <h2 className="h2" style={{ margin: "6px 0" }}>El Jardín · la comunidad de graduadas</h2>
        <p className="sub" style={{ marginBottom: 10 }}>
          Tu programa terminó, pero tu jardín puede seguir creciendo entre mujeres que ya caminaron esto.
          Un encuentro en vivo con Sol cada mes, contenido nuevo, la comunidad, y tus herramientas siempre a mano.
        </p>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 700, color: "var(--deep)" }}>
          US$ 19<span style={{ fontSize: 16 }}>/mes</span>
        </div>
        <p className="sub" style={{ fontSize: 12.5 }}>Graduada fundadora: tu primer mes a US$ 9. Cancelás cuando quieras, sin vueltas.</p>
        <button className="btn mt" onClick={() => {
          const link = process.env.NEXT_PUBLIC_LINK_JARDIN;
          if (link) window.open(link, "_blank");
          else alert("El link de pago de la membresía se configura con NEXT_PUBLIC_LINK_JARDIN 🤍");
        }}>Quiero quedarme en El Jardín</button>
      </div>

      <button className="btn ghost mt" onClick={() => router.push("/jardin")}>Volver a mi jardín</button>
    </div>
  );
}

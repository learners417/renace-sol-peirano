"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Sos from "@/components/Sos";
import { getUser, getSemillasGuardadas } from "@/lib/estado";

export default function Semillas() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [semillas, setSemillas] = useState([]);
  const [idx, setIdx] = useState(null);

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    setUser(u);
    setSemillas(getSemillasGuardadas());
  }, [router]);

  if (!user) return null;

  const regarAlAzar = () => {
    if (!semillas.length) return;
    setIdx(Math.floor(Math.random() * semillas.length));
  };

  return (
    <>
      <div className="app">
        <button className="back" onClick={() => router.push("/para-vos")}>‹ Para vos</button>
        <div className="section-title">Tus semillas</div>
        <div className="section-sub">Las afirmaciones que fuiste guardando. Son tuyas para siempre.</div>

        {semillas.length === 0 && (
          <div className="card center">
            <div style={{ fontSize: 34 }}>🌱</div>
            <p className="sub" style={{ marginTop: 8 }}>Todavía no guardaste semillas. Cada día, al compartir tu semilla en el ritual, se guarda acá.</p>
          </div>
        )}

        {semillas.length > 0 && (
          <>
            <button className="btn" onClick={regarAlAzar}>🌷 Regar mi día con una semilla</button>
            {idx !== null && (
              <div className="semilla" style={{ marginTop: 16 }}>
                <div className="sq">“{semillas[idx]}”</div>
                <div className="sm">Tu semilla de hoy 🤍</div>
              </div>
            )}
            <div className="slabel" style={{ margin: "22px 0 12px" }}>Tu colección ({semillas.length})</div>
            {semillas.map((sm, i) => (
              <div key={i} className="card" style={{ padding: "16px 18px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: "var(--ink)", fontStyle: "italic" }}>“{sm}”</p>
              </div>
            ))}
          </>
        )}
      </div>
      <Sos />
      <Nav />
    </>
  );
}

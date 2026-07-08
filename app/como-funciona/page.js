"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/estado";
import { comoFunciona } from "@/lib/programa";

export default function ComoFunciona() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => { const u = getUser(); if (!u) router.replace("/login"); else setUser(u); }, [router]);
  if (!user) return null;
  return (
    <div className="app">
      <button className="back" onClick={() => router.push("/para-vos")}>‹ Para vos</button>
      <div className="section-title">Cómo funciona tu camino</div>
      <div className="section-sub">Una guía rápida para aprovechar tu app. 🤍</div>
      {comoFunciona.map((c, i) => (
        <div key={i} className="card" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ fontSize: 30, flexShrink: 0 }}>{c.icono}</div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: "var(--ink)" }}>{c.titulo}</div>
            <p className="sub" style={{ marginTop: 4, fontSize: 14.5, lineHeight: 1.6 }}>{c.texto}</p>
          </div>
        </div>
      ))}
      <div className="vidph" style={{ marginTop: 8 }}>
        <div className="play"><svg width="15" height="17" viewBox="0 0 15 17"><path d="M0 0 L15 8.5 L0 17 Z" fill="#7E6399"/></svg></div>
        Video "cómo usar la app" de Sol · próximamente
      </div>
      <button className="btn mt" onClick={() => router.push("/")}>Ir a mi camino de hoy →</button>
    </div>
  );
}

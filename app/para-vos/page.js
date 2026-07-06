"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { getUser } from "@/lib/estado";
import { herramientas } from "@/lib/programa";
const extra = { id: "circulo", titulo: "El Círculo", desc: "La comunidad de mamás.", icono: "💬", ruta: "/circulo", color: "#B48EAD" };

const meds = [
  { t: "Volver a vos", m: "10 min · presencia", c: "linear-gradient(120deg,#A990CC,#C9B8E0)" },
  { t: "Sanar la herida", m: "12 min · sanación", c: "linear-gradient(120deg,#9D86BE,#B9A4D4)" },
  { t: "Tu esencia", m: "8 min · autoconocimiento", c: "linear-gradient(120deg,#B7A0CE,#D4C2E8)" },
  { t: "Gratitud de noche", m: "7 min · descanso", c: "linear-gradient(120deg,#C2A98E,#E0CDB4)" },
];

export default function ParaVos() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => { const u = getUser(); if (!u) router.replace("/login"); else setUser(u); }, [router]);
  if (!user) return null;

  return (
    <>
      <div className="app">
        <div className="topbar"><div className="brand">Para vos<span> 🤍</span></div></div>
        <div className="section-title">Tus herramientas</div>
        <div className="section-sub">Todo lo que te sostiene, en un solo lugar. Volvé cuando lo necesites.</div>
        <div className="herramientas">
          {[...herramientas, extra].map((h) => (
            <div key={h.id} className="herram" onClick={() => router.push(h.ruta)}>
              <div className="hic" style={{ background: h.color }}>{h.icono}</div>
              <div className="ht">{h.titulo}</div>
              <div className="hd">{h.desc}</div>
            </div>
          ))}
        </div>
        <div className="slabel" style={{ margin: "26px 0 12px" }}>Meditaciones</div>
        {meds.map((x, i) => (
          <div key={i} className="med" style={{ background: x.c }}>
            <div><div className="mt">{x.t}</div><div className="mm">{x.m}</div></div>
            <div className="play"><svg width="13" height="15" viewBox="0 0 13 15"><path d="M0 0 L13 7.5 L0 15 Z" fill="#7E6399"/></svg></div>
          </div>
        ))}
        <p className="sub center" style={{ fontSize: 12, marginTop: 14 }}>Los audios de Sol se cargan en la próxima etapa.</p>
      </div>
      <Nav />
    </>
  );
}

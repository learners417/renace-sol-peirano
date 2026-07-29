"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, getOnboarding, getPais } from "@/lib/estado";
import { Luna } from "@/components/Luna";
import { habla } from "@/lib/voz";

export default function Acceso() {
  const pais = getPais();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [err, setErr] = useState("");
  const [cargando, setCargando] = useState(false);

  async function entrar() {
    if (!nombre.trim()) { setErr("Escribe tu nombre"); return; }
    if (!codigo.trim()) { setErr("Escribe tu código de acceso"); return; }
    setCargando(true); setErr("");
    try {
      const r = await fetch("/api/acceso", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ codigo }) });
      const d = await r.json();
      if (!d.ok) { setErr(d.error || "Código inválido"); setCargando(false); return; }
      login(nombre.trim(), "", d.plan);
      router.replace(getOnboarding() ? "/hoy" : "/onboarding");
    } catch { setErr(habla(pais, "No pudimos validar ahora. Probá de nuevo.")); setCargando(false); }
  }

  return (
    <div className="app app-pad" style={{ paddingTop: 48 }}>
      <div className="center stack">
        <div className="luna-hero"><Luna fase={1} size={130} /></div>
        <div className="eyebrow">El Camino</div>
        <h1 className="display" style={{ color: "var(--luna)" }}>R.E.N.A.C.E.</h1>
        <p className="lead">{habla(pais, "Nueve lunas para volver a vos.")}</p>
      </div>

      <div className="card stack" style={{ marginTop: 28 }}>
        <div>
          <label className="tiny" style={{ fontWeight: 700 }}>{habla(pais, "¿Cómo te llamás?")}</label>
          <input className="field" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" style={{ marginTop: 6 }} />
        </div>
        <div>
          <label className="tiny" style={{ fontWeight: 700 }}>Tu código de acceso</label>
          <input className="field" value={codigo} onChange={(e) => setCodigo(e.target.value.toUpperCase())} placeholder="CAMINO-…" style={{ marginTop: 6, letterSpacing: ".05em" }} />
        </div>
        {err && <p className="tiny" style={{ color: "#B4574E" }}>{err}</p>}
        <button className="btn btn-primary btn-lg" onClick={entrar} disabled={cargando}>
          {cargando ? "Entrando…" : "Comenzar mi camino"}
        </button>
      </div>
      <p className="tiny center" style={{ marginTop: 16 }}>Un programa de Sol Peirano · Ingeniería emocional para madres</p>
    </div>
  );
}

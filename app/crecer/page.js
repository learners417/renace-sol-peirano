"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Luna } from "@/components/Luna";
import { getUser, planUsuaria, soloSemana1, accesoVencido, nacio, actualizarPlan, reiniciarVentana } from "@/lib/estado";

const L = {
  camino: process.env.NEXT_PUBLIC_LINK_CAMINO || "",
  acomp: process.env.NEXT_PUBLIC_LINK_ACOMP || "",
  integral: process.env.NEXT_PUBLIC_LINK_INTEGRAL || "",
  extension: process.env.NEXT_PUBLIC_LINK_EXTENSION || "",
  renacida: process.env.NEXT_PUBLIC_LINK_RENACIDA || "",
};

function Plan({ nombre, precio, detalle, link, destacado }) {
  const inner = (
    <>
      <div className="between">
        <b style={{ fontSize: "1.05rem" }}>{nombre}</b>
        <b className="num" style={{ color: "var(--luna)" }}>{precio}</b>
      </div>
      <p className="tiny" style={{ marginTop: 4 }}>{detalle}</p>
    </>
  );
  const style = { textDecoration: "none", color: "inherit", display: "block", borderColor: destacado ? "var(--luna-soft)" : "var(--hairline)", background: destacado ? "var(--luna-wash)" : "var(--surface)" };
  return link
    ? <a href={link} target="_blank" rel="noreferrer" className="card" style={style}>{inner}</a>
    : <div className="card" style={style}>{inner}<p className="tiny" style={{ color: "var(--luna)", marginTop: 6 }}>Escribile a Sol por WhatsApp para pagar este plan.</p></div>;
}

export default function Crecer() {
  const router = useRouter();
  const [modo, setModo] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    setModo(accesoVencido() ? "extension" : nacio() ? "renacida" : soloSemana1() ? "upgrade" : "planes");
  }, [router]);

  async function canjear() {
    if (!codigo.trim()) return;
    setMsg("");
    try {
      const r = await fetch("/api/acceso", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ codigo }) });
      const d = await r.json();
      if (!d.ok) { setMsg(d.error || "Código inválido"); return; }
      actualizarPlan(d.plan);
      if (d.plan === "extension") reiniciarVentana();
      setMsg("");
      router.replace("/hoy");
    } catch { setMsg("No pudimos validar ahora. Probá de nuevo."); }
  }

  if (!modo) return <div className="app" style={{ minHeight: "100dvh" }} />;

  return (
    <div className="app app-pad" style={{ paddingTop: 26 }}>
      <button className="link" onClick={() => router.back()}>‹ Volver</button>
      <div className="center stack" style={{ marginTop: 8 }}>
        <div className="luna-hero"><Luna fase={0.6} size={110} /></div>

        {modo === "upgrade" && (<>
          <h1 className="h1" style={{ color: "var(--luna)" }}>Ya empezaste a renacer</h1>
          <p className="lead">Completaste tu primer mes. Te quedan 8 lunas — y tus US$ 17 se descuentan del programa completo si seguís esta semana.</p>
        </>)}
        {modo === "extension" && (<>
          <h1 className="h1" style={{ color: "var(--luna)" }}>Tu camino te espera</h1>
          <p className="lead">Pasaron tus 12 semanas, y todo tu progreso está guardado. Retomá con la extensión del programa completo, al 50%.</p>
        </>)}
        {modo === "renacida" && (<>
          <h1 className="h1" style={{ color: "var(--luna)" }}>Renaciste. ¿Y ahora?</h1>
          <p className="lead">Renacer no es el final: es el comienzo. RENACIDA es tu espacio para sostener lo que construiste, todos los meses.</p>
        </>)}
        {modo === "planes" && (<>
          <h1 className="h1" style={{ color: "var(--luna)" }}>Crecer en tu camino</h1>
          <p className="lead">Elegí cómo querés seguir.</p>
        </>)}
      </div>

      <div className="stack" style={{ marginTop: 18 }}>
        {modo === "extension" ? (
          <Plan nombre="Extensión del programa" precio="50% off" detalle="Otras 12 semanas de ventana, con todo tu progreso intacto. Al pagar, recibís tu código EXTENSION- y lo ingresás abajo." link={L.extension} destacado />
        ) : modo === "renacida" ? (
          <Plan nombre="RENACIDA · membresía mensual" precio="US$ 19/mes" detalle="Tu sesión diaria de mantenimiento, todo el contenido para re-recorrer, Serena, y un encuentro mensual en vivo con Sol. Graduadas: primer mes US$ 9." link={L.renacida} destacado />
        ) : (<>
          <Plan nombre="El Camino · 9 semanas" precio="US$ 97" detalle="La app completa, autoguiada: tus 9 lunas, Serena, meditaciones, tu rueda y tu graduación." link={L.camino} />
          <Plan nombre="Acompañada ★" precio="US$ 197" detalle="Todo El Camino + encuentro grupal mensual en vivo con Sol. La más elegida." link={L.acomp} destacado />
          <Plan nombre="Integral" precio="US$ 497" detalle="Todo + acompañamiento personalizado de Sol." link={L.integral} />
        </>)}
      </div>

      <div className="card stack" style={{ marginTop: 20 }}>
        <div className="eyebrow">¿Ya pagaste?</div>
        <p className="tiny">Ingresá el código nuevo que te llegó. Tu progreso no se pierde: seguís exactamente donde estabas.</p>
        <input className="field" value={codigo} onChange={(e) => setCodigo(e.target.value.toUpperCase())} placeholder="ACOMP-… / EXTENSION-… / RENACIDA-…" style={{ letterSpacing: ".05em" }} />
        {msg && <p className="tiny" style={{ color: "#B4574E" }}>{msg}</p>}
        <button className="btn btn-primary" onClick={canjear}>Activar mi código</button>
      </div>

      <Nav />
    </div>
  );
}

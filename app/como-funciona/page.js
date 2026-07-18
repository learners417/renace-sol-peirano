"use client";
import { Icon } from "@/components/Icon";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/ui";
import { getUser } from "@/lib/estado";
import { comoFunciona } from "@/lib/programa";

const ICONO = { "☀️": "sol", "🌱": "brote", "🤍": "corazon", "🎯": "brujula", "🌷": "hoja", "🌿": "hoja", "🕊": "viento", "📱": "brillo", "🌙": "luna" };

export default function ComoFunciona() {
  const router = useRouter();
  useEffect(() => { if (!getUser()) router.replace("/acceso"); }, [router]);

  return (
    <div className="app app-pad" style={{ paddingTop: 24 }}>
      <button className="link" onClick={() => router.back()}>‹ Volver</button>
      <div className="center stack" style={{ marginTop: 8 }}>
        <div className="ico" style={{ color: "var(--luna)" }}><Icon name="brujula" size={30} /></div>
        <h1 className="h1">Cómo funciona tu camino</h1>
        <p className="tiny">Simple, un paso por día. Acá lo importante:</p>
      </div>

      <div className="stack" style={{ marginTop: 18 }}>
        {comoFunciona.map((c, i) => (
          <div key={i} className="card">
            <div className="row" style={{ alignItems: "flex-start" }}>
              <span className="ico" style={{ color: "var(--luna)" }}><Icon name={ICONO[c.icono] || "brillo"} size={24} /></span>
              <div>
                <b>{c.titulo}</b>
                <p className="muted" style={{ marginTop: 4 }}>{c.texto}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="card card-luna">
          <b style={{ color: "var(--luna)" }}>Tu renacer</b>
          <p className="muted" style={{ marginTop: 4 }}>En "Mi renacer" registrás los cambios reales de tu vida. Ver un video no alcanza: cuando algo cambia de verdad, tu Rueda de la Vida crece. Ese es tu logro.</p>
        </div>
        <div className="card">
          <div className="row" style={{ alignItems: "flex-start" }}>
            <span className="ico" style={{ color: "var(--luna)" }}><Icon name="corazon" size={24} /></span>
            <div>
              <b>Serena, tu compañera</b>
              <p className="muted" style={{ marginTop: 4 }}>Serena es una acompañante con inteligencia artificial que te responde con la voz y el método de Sol, cuando la necesites. Podés hablarle de tres formas: <b>Compañera</b> (para lo que traigas ese día), <b>Con mi pareja</b> (para preparar una conversación difícil) y <b>Con mi hijo/a</b> (para pensar cómo actuar o qué jugar). No reemplaza a Sol ni a un profesional: te acompaña entre encuentro y encuentro.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <b>Encuentros con Sol</b>
          <p className="muted" style={{ marginTop: 4 }}>Además de la app, tenés encuentros en vivo con Sol durante el camino. Los avisamos por acá y por tu grupo.</p>
        </div>
      </div>

      <Link href="/hoy" className="btn btn-primary btn-lg" style={{ marginTop: 20 }}>Empezar</Link>
      <Nav />
    </div>
  );
}

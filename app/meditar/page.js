"use client";
import { Icon } from "@/components/Icon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/ui";
import { getUser } from "@/lib/estado";
import { getModulo } from "@/lib/programa";
import { MEDITACIONES } from "@/lib/vida";

export default function Meditar() {
  const router = useRouter();
  const [play, setPlay] = useState(null);
  useEffect(() => { if (!getUser()) router.replace("/acceso"); }, [router]);

  return (
    <div className="app app-pad" style={{ paddingTop: 22 }}>
      <button className="link" onClick={() => router.back()}>‹ Volver</button>
      <div className="center stack" style={{ marginTop: 8 }}>
        <div className="ico" style={{ color: "var(--luna)" }}><Icon name="auriculares" size={30} /></div>
        <h1 className="h1">Meditaciones</h1>
        <p className="tiny">Pausas guiadas por Sol, intercaladas en el camino. Con audífonos se siente mejor.</p>
      </div>

      <div className="stack" style={{ marginTop: 18 }}>
        {MEDITACIONES.map((m) => {
          const mod = getModulo(m.modulo);
          return (
            <div key={m.id} className="card" style={{ padding: 14 }}>
              <div className="between">
                <div className="row">
                  <span className="ico" style={{ color: "var(--luna)" }}><Icon name="auriculares" size={22} /></span>
                  <div>
                    <b style={{ fontSize: ".95rem" }}>{m.nombre}</b>
                    <p className="tiny">Luna {m.modulo} · {mod?.nombre}</p>
                  </div>
                </div>
                {m.audioUrl
                  ? <button className="btn btn-soft" style={{ width: "auto", padding: "8px 16px" }} onClick={() => setPlay(m.id)}><Icon name="play" size={16} /></button>
                  : <span className="pill pill-luna">pronto</span>}
              </div>
              {play === m.id && m.audioUrl && <audio controls src={m.audioUrl} style={{ width: "100%", marginTop: 10 }} />}
            </div>
          );
        })}
      </div>
      <Nav />
    </div>
  );
}

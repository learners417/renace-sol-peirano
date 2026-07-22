"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav, Video } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { getUser, semanaDesbloqueada } from "@/lib/estado";
import { MEDITACIONES, embedMeditacion } from "@/lib/vida";
import { primeraSesionDeSemana } from "@/lib/semanas";

export default function Meditar() {
  const router = useRouter();
  const [play, setPlay] = useState(null);
  const [luna, setLuna] = useState(1);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    setLuna(0);
  }, [router]);

  return (
    <div className="app app-pad" style={{ paddingTop: 22 }}>
      <button className="link" onClick={() => router.back()}>‹ Volver</button>
      <div className="center stack" style={{ marginTop: 8 }}>
        <div className="ico" style={{ color: "var(--luna)" }}><Icon name="auriculares" size={30} /></div>
        <h1 className="h1">Tus meditaciones</h1>
        <p className="tiny">Guiadas por Sol. Se van abriendo a medida que avanzás por tus lunas — y las que ya son tuyas, quedan para siempre.</p>
      </div>

      <div className="stack" style={{ marginTop: 18 }}>
        {MEDITACIONES.map((m) => {
          const abierta = semanaDesbloqueada(m.luna);
          return (
            <div key={m.id} className="card" style={{ padding: 14, opacity: abierta ? 1 : 0.65 }}>
              <div className="between">
                <div className="row">
                  <span className={"state " + (abierta ? "state-now" : "state-lock")}>
                    <Icon name={abierta ? "auriculares" : "candado"} size={16} />
                  </span>
                  <div>
                    <b style={{ fontSize: ".95rem", color: abierta ? "inherit" : "var(--ink-3)" }}>{m.nombre}</b>
                    <p className="tiny">{abierta ? "Tuya, cuando la necesites" : `Se abre en tu micro-sesión ${primeraSesionDeSemana(m.luna)}`}</p>
                  </div>
                </div>
                {abierta && (
                  <button className="btn btn-soft" style={{ width: "auto", padding: "8px 14px" }} onClick={() => setPlay(play === m.id ? null : m.id)}>
                    <Icon name="play" size={15} />
                  </button>
                )}
              </div>
              {play === m.id && abierta && (
                <div style={{ marginTop: 12 }}>
                  <Video url={embedMeditacion(m)} titulo={m.nombre} />
                  <p className="tiny center" style={{ marginTop: 8 }}>Ponete cómoda. Este momento es tuyo.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Nav />
    </div>
  );
}

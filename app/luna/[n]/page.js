"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Nav, Video } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Luna } from "@/components/Luna";
import { getUser, pasosDeModulo, getPasos, moduloDesbloqueado } from "@/lib/estado";
import { getModulo, vozSolModulo, secuenciaVideos } from "@/lib/programa";

export default function LunaDetalle() {
  const router = useRouter();
  const params = useParams();
  const n = Number(params?.n);
  const [abierto, setAbierto] = useState(null);
  const [pasos, setPasos] = useState({});
  const [bloqueada, setBloqueada] = useState(false);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    setBloqueada(!moduloDesbloqueado(n));
    setPasos(getPasos());
  }, [router, n]);

  const m = getModulo(n);
  if (!m) return <div className="app app-pad" style={{ paddingTop: 40 }}><p>Etapa no encontrada.</p><Link href="/mi-camino" className="link">Volver</Link><Nav /></div>;

  if (bloqueada) return (
    <div className="app app-pad" style={{ paddingTop: 40 }}>
      <button className="link" onClick={() => router.push("/mi-camino")}>‹ Tu camino</button>
      <div className="center stack" style={{ marginTop: 30 }}>
        <div className="ico" style={{ color: "var(--ink-3)" }}><Icon name="candado" size={34} /></div>
        <h1 className="h1">Esta etapa te espera</h1>
        <p className="muted">Cada paso prepara al siguiente. Terminá la etapa anterior y esta se abre sola. Sin apuro.</p>
        <Link href="/mi-camino" className="btn btn-primary">Volver a mi camino</Link>
      </div>
      <Nav />
    </div>
  );

  const idxDe = (vid) => secuenciaVideos.findIndex((v) => v.id === vid);

  return (
    <div className="app app-pad" style={{ paddingTop: 26 }}>
      <button className="link" onClick={() => router.push("/mi-camino")}>‹ Tu camino</button>
      <div className="center stack" style={{ marginTop: 8 }}>
        <div className="luna-hero"><Luna fase={n / 9} size={110} /></div>
        <div className="pill pill-luna">Luna {n}</div>
        <h1 className="h1" style={{ fontStyle: "italic", color: "var(--luna)" }}>{m.nombre}</h1>
        <p className="muted">{m.intro}</p>
      </div>

      {vozSolModulo[n] && (
        <div className="card card-luna" style={{ marginTop: 16 }}>
          <p className="serif-quote" style={{ fontSize: "1.15rem" }}>{vozSolModulo[n]}</p>
        </div>
      )}

      <div className="stack" style={{ marginTop: 18 }}>
        {m.videos.map((v, i) => {
          const idx = idxDe(v.id);
          const hecho = !!pasos[idx];
          const open = abierto === v.id;
          return (
            <div key={v.id} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <button className="between" style={{ width: "100%", background: "none", border: 0, padding: 16, cursor: "pointer", textAlign: "left", color: "inherit" }} onClick={() => setAbierto(open ? null : v.id)}>
                <div className="row">
                  <span style={{ width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", background: hecho ? "var(--salvia-wash)" : "var(--surface-2)", color: hecho ? "#4E7256" : "var(--ink-2)", fontWeight: 800, fontSize: ".85rem" }}>{hecho ? <Icon name="check" size={16} /> : i + 1}</span>
                  <b style={{ fontSize: ".98rem" }}>{v.subtitulo}</b>
                </div>
                <span style={{ color: "var(--luna-soft)" }}>{open ? "▾" : "›"}</span>
              </button>
              {open && (
                <div style={{ padding: "0 16px 16px" }} className="stack">
                  {v.videoUrl
                    ? <Video url={v.videoUrl} titulo={v.titulo} />
                    : <div className="card card-luna"><p className="muted">{v.desc}</p></div>}
                  <p className="serif-quote" style={{ fontSize: "1.1rem" }}>{v.idea}</p>
                  {!hecho && (
                    <div className="card" style={{ background: "var(--surface-2)", border: 0 }}>
                      <b className="tiny" style={{ color: "var(--luna)" }}>PRÁCTICA</b>
                      <p style={{ marginTop: 4 }}>{v.actividad}</p>
                    </div>
                  )}
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

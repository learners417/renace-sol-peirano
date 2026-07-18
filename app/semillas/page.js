"use client";
import { Icon } from "@/components/Icon";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/ui";
import { getUser, getSemillasGuardadas } from "@/lib/estado";
import { tarjetaSemilla, descargar } from "@/lib/collage";
import { compartirTexto } from "@/lib/compartir";

export default function Semillas() {
  const router = useRouter();
  const [semillas, setSemillas] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    setSemillas(getSemillasGuardadas());
  }, [router]);

  return (
    <div className="app app-pad" style={{ paddingTop: 22 }}>
      <button className="link" onClick={() => router.back()}>‹ Volver</button>
      <div className="center stack" style={{ marginTop: 8 }}>
        <div className="ico" style={{ color: "var(--luna)" }}><Icon name="brote" size={30} /></div>
        <h1 className="h1">Mis semillas</h1>
        <p className="tiny">Las afirmaciones que fuiste guardando en tu camino.</p>
      </div>

      {preview && (
        <div className="card stack" style={{ marginTop: 16 }}>
          <img src={preview} alt="Semilla para compartir" style={{ width: "100%", borderRadius: "var(--r-1)" }} />
          <div className="grid-2">
            <button className="btn btn-primary" onClick={() => descargar(preview, "semilla.png")}>Descargar</button>
            <button className="btn btn-ghost" onClick={() => setPreview(null)}>Cerrar</button>
          </div>
        </div>
      )}

      <div className="stack" style={{ marginTop: 18 }}>
        {semillas.length === 0 && <div className="card center muted">Todavía no sembraste ninguna. Al final de tu sesión de hoy vas a escribir tu primera semilla.</div>}
        {semillas.map((s, i) => (
          <div key={i} className="card card-luna">
            <p className="serif-quote" style={{ fontSize: "1.15rem" }}>{s}</p>
            <div className="grid-2" style={{ marginTop: 10 }}>
              <button className="btn btn-ghost" onClick={() => setPreview(tarjetaSemilla(s))}>Hacer tarjeta</button>
              <button className="btn btn-ghost" onClick={() => compartirTexto(`"${s}"\n\n— Mi camino R.E.N.A.C.E. con Sol Peirano`)}>Compartir</button>
            </div>
          </div>
        ))}
      </div>
      <Nav />
    </div>
  );
}

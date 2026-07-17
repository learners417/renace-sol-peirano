"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { RuedaVida } from "@/components/RuedaVida";
import { getUser, getHitos, agregarHito, areaScore, lunaActual, getDiario } from "@/lib/estado";
import { AREAS, areaDe } from "@/lib/vida";
import { collageFinal, descargar } from "@/lib/collage";
import { compartirTexto } from "@/lib/compartir";

const ANIMO = ["😮‍💨", "😔", "😐", "🙂", "🌷"];

function achicar(file, cb) {
  const r = new FileReader();
  r.onload = () => {
    const img = new Image();
    img.onload = () => {
      const max = 360, k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = img.width * k; c.height = img.height * k;
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      cb(c.toDataURL("image/jpeg", 0.7));
    };
    img.src = r.result;
  };
  r.readAsDataURL(file);
}

function Dot({ color }) {
  return <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block", flex: "0 0 auto" }} />;
}

export default function MiRenacer() {
  const router = useRouter();
  const [hitos, setHitos] = useState([]);
  const [diario, setDiario] = useState([]);
  const [scores, setScores] = useState({});
  const [area, setArea] = useState(null);
  const [texto, setTexto] = useState("");
  const [animo, setAnimo] = useState(0);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  function refrescar() {
    setHitos(getHitos());
    setDiario(getDiario());
    const sc = {}; AREAS.forEach((a) => (sc[a.n] = areaScore(a.n))); setScores(sc);
  }

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    refrescar();
    setArea(Math.min(lunaActual(), 9));
  }, [router]);

  function guardar() {
    if (!texto.trim()) return;
    agregarHito({ texto, area, animo: animo || null, foto });
    setTexto(""); setAnimo(0); setFoto(null);
    refrescar();
  }

  const a = areaDe(area || 1);

  return (
    <div className="app app-pad" style={{ paddingTop: 24 }}>
      <div className="center stack">
        <div className="eyebrow">Mi renacer</div>
        <h1 className="h1" style={{ color: "var(--luna)" }}>Tu registro de renacimiento</h1>
        <p className="tiny">Ver un video no cambia tu vida. Registrar lo que sí cambió, sí. Tu rueda crece con cada logro real.</p>
        <RuedaVida scores={scores} size={300} onArea={(n) => setArea(n)} />
      </div>

      <div className="card stack" style={{ marginTop: 8 }}>
        <div className="eyebrow">Registrar un logro</div>
        <div className="row" style={{ flexWrap: "wrap", gap: 6 }}>
          {AREAS.map((ar) => (
            <button key={ar.n} className="chip" style={{ width: "auto", padding: "8px 12px", gap: 8, border: area === ar.n ? "1px solid var(--luna)" : "1px solid var(--hairline)", background: area === ar.n ? "var(--luna-wash)" : "var(--surface)" }} onClick={() => setArea(ar.n)}>
              <Dot color={ar.color} /> {ar.label}
            </button>
          ))}
        </div>
        <p className="serif-lead">{a.pregunta}</p>
        <textarea className="field" value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Contá lo que pasó, con tus palabras…" />
        <div className="between">
          <div className="row" style={{ gap: 6 }}>
            {ANIMO.map((e, i) => (
              <button key={i} className={"chip" + (animo === i + 1 ? " sel" : "")} style={{ width: "auto", padding: "8px 10px", fontSize: "1.1rem" }} onClick={() => setAnimo(i + 1)}>{e}</button>
            ))}
          </div>
          <button className="link ico-row" onClick={() => fileRef.current?.click()} style={{ gap: 6 }}><Icon name="camara" size={18} />{foto ? "Foto lista" : "Evidencia"}</button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files[0] && achicar(e.target.files[0], setFoto)} />
        </div>
        {foto && <img src={foto} alt="evidencia" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10 }} />}
        <button className="btn btn-primary" onClick={guardar} disabled={!texto.trim()}>Guardar mi logro</button>
      </div>

      <button className="btn btn-soft ico-row" style={{ marginTop: 14, justifyContent: "center" }} disabled={!hitos.length} onClick={() => setPreview(collageFinal({ frases: hitos.filter((h) => h.texto).slice(0, 6).map((h) => h.texto), lunas: 9 }))}>
        <Icon name="luna" size={18} /> Armar mi collage
      </button>
      {preview && (
        <div className="card stack" style={{ marginTop: 12 }}>
          <img src={preview} alt="Tu collage" style={{ width: "100%", borderRadius: "var(--r-1)" }} />
          <div className="grid-2">
            <button className="btn btn-primary ico-row" style={{ justifyContent: "center" }} onClick={() => descargar(preview, "mi-renacimiento.png")}><Icon name="descargar" size={18} /> Descargar</button>
            <button className="btn btn-ghost ico-row" style={{ justifyContent: "center" }} onClick={() => compartirTexto("Mi renacimiento con el Método R.E.N.A.C.E. de Sol Peirano")}><Icon name="compartir" size={18} /> Compartir</button>
          </div>
          <button className="link" onClick={() => setPreview(null)}>Cerrar</button>
        </div>
      )}

      <div className="stack" style={{ marginTop: 22 }}>
        <div className="eyebrow">Tus logros</div>
        {hitos.length === 0 && <div className="card center muted">Todavía no registraste ninguno. Tu primer logro puede ser hoy — algo chiquito que hiciste distinto.</div>}
        {hitos.map((h, i) => {
          const ar = areaDe(h.area);
          return (
            <div key={i} className="card" style={{ padding: 14 }}>
              <div className="between" style={{ marginBottom: 6 }}>
                <span className="pill pill-luna ico-row"><Dot color={ar.color} /> {ar.label}</span>
                <span className="tiny">{ANIMO[h.animo - 1] || ""} {new Date(h.fecha).toLocaleDateString()}</span>
              </div>
              <p>{h.texto}</p>
              {h.foto && <img src={h.foto} alt="evidencia" style={{ marginTop: 8, width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 10 }} />}
            </div>
          );
        })}
      </div>

      {diario.length > 0 && (
        <div className="stack" style={{ marginTop: 22 }}>
          <div className="eyebrow">Tu diario</div>
          {diario.slice(0, 20).map((e, i) => (
            <div key={i} className="card" style={{ padding: 14 }}>
              <div className="between" style={{ marginBottom: 4 }}>
                <span className="tiny">{ANIMO[e.animo - 1] || ""}</span>
                <span className="tiny">{new Date(e.fecha).toLocaleDateString()}</span>
              </div>
              <p>{e.texto}</p>
            </div>
          ))}
        </div>
      )}

      <Nav />
    </div>
  );
}

"use client";
import { habla } from "@/lib/voz";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { RuedaVida } from "@/components/RuedaVida";
import { getUser, getHitos, agregarHito, areaScore, lunaActual, getDiario, getBases, guardarBases, promedioInicial, nivelRenacimiento, semanasCompletas, getPais } from "@/lib/estado";
import { AREAS as AREAS_ALL } from "@/lib/vida";
import { AREAS, areaDe } from "@/lib/vida";
import { achicarFoto } from "@/lib/foto";
import { Celebracion } from "@/components/Celebracion";
import { compartirTexto } from "@/lib/compartir";

const ANIMO = ["😮‍💨", "😔", "😐", "🙂", "🌷"];
const PESOS = [{ p: 1, l: "Un pasito" }, { p: 2, l: "Bastante" }, { p: 3, l: "Un montón" }];
const PESO_L = { 1: "un pasito", 2: "bastante", 3: "un montón" };

function Dot({ color, size = 10 }) {
  return <span style={{ width: size, height: size, borderRadius: "50%", background: color, display: "inline-block", flex: "0 0 auto" }} />;
}

export default function MiRenacer() {
  const pais = getPais();
  const router = useRouter();
  const [hitos, setHitos] = useState([]);
  const [diario, setDiario] = useState([]);
  const [scores, setScores] = useState({});
  const [area, setArea] = useState(null);
  const [peso, setPeso] = useState(0);
  const [texto, setTexto] = useState("");
  const [foto, setFoto] = useState(null);
  const [cele, setCele] = useState(0);
  const [mostrarDiario, setMostrarDiario] = useState(6);
  const [bases, setBases] = useState(null);
  const [nivel, setNivel] = useState({ ini: null, hoy: null });
  const [baseIdx, setBaseIdx] = useState(0);
  const [baseTmp, setBaseTmp] = useState({});
  const fileRef = useRef();

  function refrescar() {
    setHitos(getHitos());
    setDiario(getDiario());
    const sc = {}; AREAS.forEach((a) => (sc[a.n] = areaScore(a.n))); setScores(sc);
    setBases(getBases());
    setNivel({ ini: promedioInicial(), hoy: nivelRenacimiento() });
  }

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    refrescar();
    setArea(Math.min(lunaActual(), 9));
  }, [router]);

  function guardar() {
    if (!area || !peso) return;
    agregarHito({ texto, area, peso, foto });
    setCele(peso);
    setPeso(0); setTexto(""); setFoto(null);
    refrescar();
  }

  const a = areaDe(area || 1);

  return (
    <div className="app app-pad" style={{ paddingTop: 24 }}>
      <div className="center stack">
        <div className="eyebrow">Mi renacer</div>
        <h1 className="h1" style={{ color: "var(--luna)" }}>Tu registro de renacimiento</h1>
        <p className="tiny">Ver un video no cambia tu vida. Registrar lo que sí cambió, sí. Tu rueda crece con cada logro real.</p>
        {nivel.ini != null && nivel.hoy != null && (
          <div className="card" style={{ padding: 14, width: "100%" }}>
            <div className="eyebrow center">Tu nivel de renacimiento</div>
            <div className="between" style={{ marginTop: 6 }}>
              <div className="center" style={{ flex: 1 }}>
                <div className="tiny">Empezaste en</div>
                <div className="num" style={{ fontSize: "1.9rem", color: "var(--ink-2)" }}>{nivel.ini}<span style={{ fontSize: ".8rem", color: "var(--ink-3)" }}>/10</span></div>
              </div>
              <span style={{ color: "var(--luna-soft)" }}>→</span>
              <div className="center" style={{ flex: 1 }}>
                <div className="tiny">Hoy estás en</div>
                <div className="num" style={{ fontSize: "1.9rem", color: "var(--salvia)" }}>{nivel.hoy}<span style={{ fontSize: ".8rem", color: "var(--ink-3)" }}>/10</span></div>
              </div>
            </div>
            <p className="tiny center" style={{ marginTop: 6 }}>La línea punteada en tu rueda es tu punto de partida.</p>
          </div>
        )}
        <RuedaVida scores={scores} bases={bases || {}} size={300} onArea={(n) => setArea(n)} />
        {!bases && (
          <div className="card stack" style={{ width: "100%" }}>
            <div className="eyebrow">{habla(pais, "Marcá tu punto de partida")}</div>
            <p className="tiny">Para medir tu renacimiento necesitamos tu foto inicial: cada área, del 1 al 10, como estaba al empezar.</p>
            {(() => {
              const ar = AREAS_ALL[baseIdx];
              const elegir = (v) => {
                const b = { ...baseTmp, [ar.n]: v };
                setBaseTmp(b);
                if (baseIdx < AREAS_ALL.length - 1) setBaseIdx(baseIdx + 1);
                else { guardarBases(b); refrescar(); }
              };
              return (
                <>
                  <div className="between">
                    <b className="ico-row" style={{ gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: ar.color, display: "inline-block" }} />{ar.label}</b>
                    <span className="tiny">{baseIdx + 1}/9</span>
                  </div>
                  <div className="grid-2" style={{ gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const v = i + 1;
                      return <button key={v} className={"chip" + (baseTmp[ar.n] === v ? " sel" : "")} style={{ justifyContent: "center", padding: "10px 0" }} onClick={() => elegir(v)}><b className="num">{v}</b></button>;
                    })}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* Registrar un logro — simple y numérico */}
      <div className="card stack" style={{ marginTop: 8 }}>
        <div className="eyebrow">Registrar un logro</div>
        <p className="tiny">{habla(pais, "¿En qué área notaste un cambio? Tocá, marcá cuánto, y listo. Escribir es opcional.")}</p>
        <div className="row" style={{ flexWrap: "wrap", gap: 6 }}>
          {AREAS.map((ar) => (
            <button key={ar.n} className="chip" style={{ width: "auto", padding: "8px 12px", gap: 8, border: area === ar.n ? "1px solid var(--luna)" : "1px solid var(--hairline)", background: area === ar.n ? "var(--luna-wash)" : "var(--surface)" }} onClick={() => setArea(ar.n)}>
              {ar.emoji} {ar.label}
            </button>
          ))}
        </div>
        <div>
          <p className="tiny" style={{ fontWeight: 700, marginBottom: 6 }}>¿Cuánto creció?</p>
          <div className="grid-2" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {PESOS.map((x) => (
              <button key={x.p} className={"chip" + (peso === x.p ? " sel" : "")} style={{ justifyContent: "center", padding: "12px 4px", flexDirection: "column", gap: 4 }} onClick={() => setPeso(x.p)}>
                <span className="row" style={{ gap: 2 }}>{Array.from({ length: x.p }).map((_, i) => <Dot key={i} color={a.color} size={7} />)}</span>
                <span className="tiny">{x.l}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="between">
          <button className="link ico-row" style={{ gap: 6 }} onClick={() => fileRef.current?.click()}><Icon name="camara" size={18} />{foto ? "Foto lista" : "Evidencia"}</button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files[0] && achicarFoto(e.target.files[0], setFoto)} />
          {foto && <img src={foto} alt="evidencia" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }} />}
        </div>
        <textarea className="field" style={{ minHeight: 60 }} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder={habla(pais, "¿Qué pasó? Contalo en una línea (ej: hoy no le grité) — esto queda en tu historia")} />
        <button className="btn btn-primary" onClick={guardar} disabled={!area || !peso || !texto.trim()}>{habla(pais, "Guardar mi logro")}</button>
        {(!texto.trim() && peso) ? <p className="tiny" style={{ color: "var(--luna)" }}>{habla(pais, "Contá qué pasó en una línea: los logros escritos son los que se recuerdan.")}</p> : null}
      </div>

      <div className="stack" style={{ marginTop: 22 }}>
        <div className="eyebrow">Tu diario del camino</div>
        {diario.length === 0 && <div className="card center muted">{habla(pais, "Acá se van guardando tus notas de cada sesión: lo que te resonó, lo que escribiste, tus fotos. Tu historia, contada por vos.")}</div>}
        {diario.slice(0, mostrarDiario).map((e, i) => (
          <div key={i} className="card" style={{ padding: 14 }}>
            <div className="between" style={{ marginBottom: 4 }}>
              <span className="tiny" style={{ fontWeight: 700, color: "var(--luna)" }}>{e.luna ? "Luna " + e.luna : "Nota"}</span>
              <span className="tiny">{new Date(e.fecha).toLocaleDateString()}</span>
            </div>
            {e.texto && <p style={{ margin: 0 }}>{e.texto}</p>}
            {e.foto && <img src={e.foto} alt="tu evidencia" style={{ marginTop: 8, width: 84, height: 84, objectFit: "cover", borderRadius: 10 }} />}
          </div>
        ))}
        {diario.length > mostrarDiario && <button className="link" onClick={() => setMostrarDiario((m) => m + 10)}>{habla(pais, "Ver más de mi diario")}</button>}
      </div>

      <div className="stack" style={{ marginTop: 22 }}>
        <div className="eyebrow">Tus logros</div>
        {hitos.length === 0 && <div className="card center muted">{habla(pais, "Todavía no registraste ninguno. Cuando algo cambie en tu vida —por chiquito que sea— marcalo acá.")}</div>}
        {hitos.map((h, i) => {
          const ar = areaDe(h.area);
          return (
            <div key={i} className="card" style={{ padding: 14 }}>
              <div className="between" style={{ marginBottom: 6 }}>
                <span className="pill pill-luna ico-row">{ar.emoji} {ar.label}</span>
                <span className="tiny">Creciste {PESO_L[h.peso] || "un pasito"} · {new Date(h.fecha).toLocaleDateString()}</span>
              </div>
              {h.texto && <p>{h.texto}</p>}
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
              {e.texto && <p>{e.texto}</p>}
              {e.foto && <img src={e.foto} alt="evidencia" style={{ marginTop: 8, width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 10 }} />}
            </div>
          ))}
        </div>
      )}

      {cele > 0 && <Celebracion peso={cele} onCerrar={() => setCele(0)} />}

      <Nav />
    </div>
  );
}

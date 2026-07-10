"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Luna } from "@/components/Luna";
import { RuedaVida } from "@/components/RuedaVida";
import { getUser, getOnboarding, promedioInicial, getTermometroFinal, setTermometroFinal, getHitos, areaScore, nacio } from "@/lib/estado";
import { AREAS } from "@/lib/vida";
import { vozSolModulo } from "@/lib/programa";
import { collageFinal, descargar } from "@/lib/collage";
import { compartirTexto } from "@/lib/compartir";

export default function Graduacion() {
  const router = useRouter();
  const [s, setS] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!getUser()) { router.replace("/acceso"); return; }
    const ob = getOnboarding();
    const scores = {}; AREAS.forEach((a) => (scores[a.n] = areaScore(a.n)));
    setS({
      nombre: getUser().nombre, carta: ob?.carta || "",
      antes: promedioInicial(), despues: getTermometroFinal(),
      nacio: nacio(), scores,
      frases: getHitos().filter((e) => e.texto).map((e) => e.texto),
    });
  }, [router]);

  if (!s) return <div className="app" style={{ minHeight: "100dvh" }} />;

  return (
    <div className="app app-pad" style={{ paddingTop: 30 }}>
      <div className="center stack">
        <div className="luna-hero"><Luna fase={1} size={200} /></div>
        <div className="pill pill-oro">🌕 Luna llena</div>
        <h1 className="display" style={{ color: "var(--luna)" }}>Naciste, {s.nombre}</h1>
        <p className="serif-quote">Te pariste a vos misma. Recorriste el camino entero, y volviste.</p>
        <RuedaVida scores={s.scores} size={280} />
        <p className="tiny">Tu Rueda de la Vida, hoy. Mirá todo lo que creció.</p>
      </div>

      {s.despues == null ? (
        <div className="card stack" style={{ marginTop: 22 }}>
          <div className="eyebrow">Tu foto de hoy</div>
          <h2 className="h2">Hoy, ¿qué tan conectada te sentís con vos misma?</h2>
          <p className="tiny">Del 1 al 10. La misma pregunta del primer día.</p>
          <div className="grid-2" style={{ gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {Array.from({ length: 10 }).map((_, i) => {
              const v = i + 1;
              return <button key={v} className="chip" style={{ justifyContent: "center", padding: "14px 0" }} onClick={() => { setTermometroFinal(v); setS((x) => ({ ...x, despues: v })); }}><b className="num">{v}</b></button>;
            })}
          </div>
        </div>
      ) : (
        <div className="card card-oro stack" style={{ marginTop: 22 }}>
          <div className="eyebrow">De dónde saliste, a dónde llegaste</div>
          <div className="between">
            <div className="center" style={{ flex: 1 }}><div className="tiny">Al empezar</div><div className="num" style={{ fontSize: "2.2rem", color: "var(--ink-2)" }}>{s.antes ?? "—"}<span style={{ fontSize: ".9rem", color: "var(--ink-3)" }}>/10</span></div></div>
            <span style={{ fontSize: "1.6rem", color: "var(--oro)" }}>→</span>
            <div className="center" style={{ flex: 1 }}><div className="tiny">Hoy</div><div className="num" style={{ fontSize: "2.2rem", color: "var(--salvia)" }}>{s.despues}<span style={{ fontSize: ".9rem", color: "var(--ink-3)" }}>/10</span></div></div>
          </div>
        </div>
      )}

      {s.carta && (
        <div className="card card-luna stack" style={{ marginTop: 16 }}>
          <div className="eyebrow">La carta que te escribiste</div>
          <p className="serif-quote" style={{ fontSize: "1.15rem" }}>“{s.carta}”</p>
        </div>
      )}

      <div className="card stack" style={{ marginTop: 16 }}>
        <p className="serif-quote" style={{ fontSize: "1.1rem" }}>{vozSolModulo[10]}</p>
      </div>

      <div className="stack" style={{ marginTop: 20 }}>
        <button className="btn btn-oro btn-lg" onClick={() => setPreview(collageFinal({ frases: s.frases, lunas: 9 }))}>Crear el collage de mi renacimiento</button>
        {preview && (
          <div className="card stack">
            <img src={preview} alt="Collage de tu renacimiento" style={{ width: "100%", borderRadius: "var(--r-1)" }} />
            <div className="grid-2">
              <button className="btn btn-primary" onClick={() => descargar(preview, "mi-renacimiento.png")}>Descargar</button>
              <button className="btn btn-ghost" onClick={() => compartirTexto("Me parí a mí misma. 9 lunas con el Método R.E.N.A.C.E. de Sol Peirano 🌕")}>Compartir</button>
            </div>
          </div>
        )}
        <Link href="/mi-camino" className="link center" style={{ display: "block" }}>Volver a mi camino</Link>
      </div>
    </div>
  );
}

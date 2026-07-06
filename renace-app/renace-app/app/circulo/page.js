"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Sos from "@/components/Sos";
import { preguntasCirculo } from "@/lib/programa";
import { getUser, getOnboarding, posicionActual, getPosts, publicarPost } from "@/lib/estado";

export default function Circulo() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [texto, setTexto] = useState("");
  const [pos, setPos] = useState({ s: 1 });

  useEffect(() => {
    const u = getUser();
    if (!u) { router.replace("/login"); return; }
    if (!getOnboarding()) { router.replace("/onboarding"); return; }
    setUser(u); setPosts(getPosts()); setPos(posicionActual());
  }, [router]);

  if (!user) return null;

  const pregunta = preguntasCirculo[(pos.s - 1) % preguntasCirculo.length];
  const acomp = user.plan === "acompanada" || user.plan === "integral";

  const publicar = (e) => {
    e.preventDefault();
    const t = texto.trim();
    if (!t) return;
    setPosts(publicarPost(pos.s, t, user.nombre));
    setTexto("");
  };

  return (
    <>
      <div className="app">
        <div className="topbar">
          <div className="brand">El Círculo<span> 🤍</span></div>
          <div className="pill">Semana {pos.s}</div>
        </div>

        <div className="card card-soft">
          <div className="kick">La pregunta de esta semana</div>
          <h2 className="h2" style={{ margin: "6px 0 2px" }}>{pregunta}</h2>
          <p className="sub" style={{ fontSize: 13 }}>Compartir corto vale. Acá nadie juzga: todas estamos en camino.</p>
          <form onSubmit={publicar}>
            <textarea className="nota" value={texto} onChange={(e) => setTexto(e.target.value)}
              placeholder="Tu respuesta, en una o dos líneas…" />
            <button className="btn mt" type="submit" disabled={!texto.trim()}>Compartir en el Círculo</button>
          </form>
        </div>

        {acomp && (
          <div className="card">
            <div className="kick">Tus encuentros en vivo</div>
            <h2 className="h2" style={{ margin: "4px 0 8px" }}>Círculos con Sol</h2>
            <p className="sub">Semanales, en grupo. El calendario con los links se publica acá cuando arranque tu cohorte. 🌷</p>
          </div>
        )}
        {!acomp && (
          <div className="card">
            <p className="sub" style={{ fontSize: 13.5 }}>
              💜 En los planes <b>Acompañada</b> e <b>Integral</b> este espacio suma los encuentros en vivo con Sol cada semana.
            </p>
          </div>
        )}

        <div className="kick" style={{ margin: "10px 0" }}>Lo que compartieron otras mamás</div>
        {posts.length === 0 && (
          <p className="sub center" style={{ padding: "16px 0" }}>Sé la primera en compartir esta semana 🌱</p>
        )}
        {posts.map((p, i) => (
          <div key={i} className="post">
            <div className="pn">{p.nombre} · Semana {p.semana}</div>
            <div className="pt">{p.texto}</div>
          </div>
        ))}
        <p className="sub center" style={{ fontSize: 11.5, marginTop: 8 }}>
          MVP: tus respuestas se guardan en tu dispositivo. La comunidad compartida llega en la próxima etapa.
        </p>
      </div>
      <Sos />
      <Nav />
    </>
  );
}

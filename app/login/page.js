"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login, getUser } from "@/lib/estado";

export default function Login() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => { if (getUser()) router.replace("/"); }, [router]);

  const entrar = async (e) => {
    e.preventDefault();
    setError(""); setCargando(true);
    try {
      const r = await fetch("/api/acceso", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ codigo }),
      });
      const data = await r.json();
      if (!data.ok) { setError("Ese código no es válido. Revisá el mail de tu compra 🤍"); setCargando(false); return; }
      login(nombre.trim(), email.trim(), data.plan);
      router.replace("/onboarding");
    } catch {
      setError("No pudimos validar tu código. Probá de nuevo en un ratito.");
      setCargando(false);
    }
  };

  return (
    <div className="full">
      <div className="kick center" style={{ marginBottom: 12 }}>Método R.E.N.A.C.E.</div>
      <h1 className="h1 center" style={{ fontSize: 36 }}>Bienvenida a tu camino</h1>
      <p className="sub center" style={{ margin: "10px 0 28px" }}>12 semanas para volver a vos. 10 minutos por día.</p>
      <form onSubmit={entrar}>
        <div className="field"><label>Tu nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" required /></div>
        <div className="field"><label>Tu email (el de tu compra)</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vos@email.com" required /></div>
        <div className="field"><label>Tu código de acceso</label>
          <input value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="Lo recibiste al comprar" required />
        </div>
        {error && <p style={{ color: "#A15C7A", fontSize: 13.5, fontWeight: 700, marginBottom: 10 }}>{error}</p>}
        <button className="btn" type="submit" disabled={cargando}>{cargando ? "Un momento…" : "Entrar a mi camino →"}</button>
      </form>
      <p className="sub center mt2" style={{ fontSize: 12.5 }}>
        Tu código llega por email al confirmarse tu compra. El plan (El Camino · Acompañada · Integral) viene con tu código.
      </p>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Luna } from "@/components/Luna";
import { getUser, getPais } from "@/lib/estado";
import { habla } from "@/lib/voz";
import { TOTAL_SESIONES } from "@/lib/semanas";

const DIAS = [
  { d: "1", t: "Clase", desc: "Un video de Sol + tu ejercicio", ic: "sol", c: "#A990CC" },
  { d: "2", t: "Clase", desc: "La segunda clase de la semana", ic: "sol", c: "#A990CC" },
  { d: "3", t: "Práctica", desc: "Tu meditación, con la voz de Sol", ic: "auriculares", c: "#7E6399" },
  { d: "4", t: "Integrar", desc: "Sin pantalla: una consigna en tu vida real", ic: "hoja", c: "#5A9170" },
  { d: "5", t: "Tu cambio", desc: "Registrás lo que ya es distinto", ic: "brillo", c: "#C9A24B" },
  { d: "6", t: "Cierre", desc: "Tu luna se completa + tu tarjeta del mes", ic: "luna", c: "#B48EAD" },
  { d: "7", t: "Descanso", desc: "Domingo libre. Te lo ganaste.", ic: "corazon", c: "#8AA890" },
];

export default function ComoFunciona() {
  const pais = getPais();
  const router = useRouter();
  const [ok, setOk] = useState(false);
  useEffect(() => { if (!getUser()) { router.replace("/acceso"); return; } setOk(true); }, [router]);
  if (!ok) return <div className="app" style={{ minHeight: "100dvh" }} />;

  return (
    <div className="app app-pad" style={{ paddingTop: 24 }}>
      <button className="link" onClick={() => router.back()}>‹ Volver</button>
      <div className="center stack" style={{ marginTop: 6 }}>
        <div className="luna-hero"><Luna fase={0.55} size={104} /></div>
        <h1 className="h1">{habla(pais, "Cómo funciona tu camino")}</h1>
        <p className="lead">{habla(pais, "Tardaste 9 meses en gestar a tu hijo. Ahora, en 9 semanas, vamos a recuperar y potenciar tu bienestar en cada área de tu vida.")}</p>
      </div>

      <div className="card stack" style={{ marginTop: 16 }}>
        <div className="eyebrow">{habla(pais, "La idea, en tres líneas")}</div>
        <div className="row" style={{ alignItems: "flex-start" }}><b className="num" style={{ color: "var(--luna)", minWidth: 22 }}>9</b><p style={{ margin: 0 }}>{habla(pais, "semanas = 9 lunas. Cada semana trabaja UNA cosa concreta, en este orden y no en otro.")}</p></div>
        <div className="row" style={{ alignItems: "flex-start" }}><b className="num" style={{ color: "var(--luna)", minWidth: 22 }}>{TOTAL_SESIONES}</b><p style={{ margin: 0 }}>{habla(pais, "micro-sesiones de 15 a 30 minutos. Abrís la app y hay UN botón: tu sesión de hoy.")}</p></div>
        <div className="row" style={{ alignItems: "flex-start" }}><b className="num" style={{ color: "var(--luna)", minWidth: 22 }}>1</b><p style={{ margin: 0 }}>{habla(pais, "rueda que crece con lo que HACÉS, no con lo que mirás. Tu renacimiento, medido.")}</p></div>
      </div>

      <div className="stack" style={{ marginTop: 18 }}>
        <div className="eyebrow">{habla(pais, "Tu semana, día por día")}</div>
        {DIAS.map((x) => (
          <div key={x.d} className="card row" style={{ padding: 12, alignItems: "center" }}>
            <span className="state" style={{ background: x.c + "22", color: x.c, fontWeight: 800 }}>{x.d}</span>
            <div style={{ flex: 1 }}>
              <b>{habla(pais, x.t)}</b>
              <p className="tiny" style={{ margin: 0 }}>{habla(pais, x.desc)}</p>
            </div>
            <span style={{ color: x.c }}><Icon name={x.ic} size={18} /></span>
          </div>
        ))}
      </div>

      <div className="stack" style={{ marginTop: 18 }}>
        <div className="eyebrow">{habla(pais, "Siempre abiertas, a cualquier hora")}</div>
        <div className="grid-2">
          {[["viento", "SOS Calma", "90 segundos para el momento crítico"], ["corazon", "Serena", "Le escribís a las 3 AM y responde con el método"], ["brillo", "Tu registro", "Cada cambio real, con foto si querés"], ["luna", "Tu rueda", "Nueve áreas que crecen con tus logros"]].map(([ic, t, d]) => (
            <div key={t} className="card" style={{ padding: 14 }}>
              <span className="ico" style={{ color: "var(--luna)" }}><Icon name={ic} size={20} /></span>
              <b style={{ display: "block", marginTop: 6 }}>{t}</b>
              <p className="tiny" style={{ margin: 0 }}>{habla(pais, d)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card card-luna stack center" style={{ marginTop: 18 }}>
        <p className="serif-lead">{habla(pais, "En Mi renacer registrás los cambios reales de tu vida. Ver un video no alcanza: cuando algo cambia de verdad, tu rueda crece. Ese es tu logro.")}</p>
      </div>
      <div style={{ height: 20 }} />
      <Nav />
    </div>
  );
}

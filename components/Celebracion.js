"use client";
import { getPais } from "@/lib/estado";
import { habla } from "@/lib/voz";
// Festejo con dopamina: brillos que caen + mensaje según el tamaño del logro.
const MSG = {
  1: ["¡Un pasito real! 🌱", "Los renacimientos se construyen así: pasito a pasito. Este ya es tuyo."],
  2: ["¡Eso es crecer! ✨", "Bastante es MUCHO para una mamá con la agenda llena. Tu rueda acaba de moverse."],
  3: ["¡UN MONTÓN! 🌕", "Esto es de lo que se cuentan las historias. Mirá tu rueda: acabás de cambiar tu foto."],
};
export function Celebracion({ peso = 2, onCerrar }) {
  const pais = getPais();
  const [titulo, texto] = (MSG[peso] || MSG[2]).map((t) => habla(pais, t));
  return (
    <div className="cele-overlay" onClick={onCerrar}>
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className="cele-p" style={{ left: `${(i * 137) % 100}%`, animationDelay: `${(i % 9) * 0.18}s`, fontSize: `${14 + (i % 3) * 6}px` }}>
          {["✨", "🌸", "💜", "🌙", "🌷"][i % 5]}
        </span>
      ))}
      <div className="cele-card">
        <div style={{ fontSize: "2.4rem" }}>👏</div>
        <h2 className="h1" style={{ color: "var(--luna)" }}>{titulo}</h2>
        <p className="muted">{texto}</p>
        <button className="btn btn-primary btn-lg" onClick={onCerrar}>{habla(pais, "Seguir creciendo")}</button>
      </div>
    </div>
  );
}

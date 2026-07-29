"use client";
// La Luna — la idea central de la app. Esfera realista en SVG:
// perla cálida con cráteres sutiles, terminador suave según la fase, halo sereno.
// fase: 0 (nueva) → 1 (llena). En llena, brilla dorada (la luna completa).
let uid = 0;
export function Luna({ fase = 0.5, size = 120, halo = true }) {
  const id = "ln" + (++uid);
  const f = Math.max(0, Math.min(1, fase));
  // terminador: la sombra entra desde la izquierda y se retira al crecer la fase
  const sombraX = 100 - f * 200; // 100 (todo sombra) → -100 (nada)
  const llena = f >= 0.98;
  return (
    <svg width={size} height={size} viewBox="-60 -60 120 120" style={{ display: "block" }}>
      <defs>
        <radialGradient id={id + "g"} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor={llena ? "#FFF6DE" : "#FDFAF4"} />
          <stop offset="45%" stopColor={llena ? "#F3E3B8" : "#EFE9E0"} />
          <stop offset="80%" stopColor={llena ? "#DDC488" : "#D8CFC6"} />
          <stop offset="100%" stopColor={llena ? "#C9A24B" : "#BFB4AC"} />
        </radialGradient>
        <radialGradient id={id + "h"} cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor={llena ? "rgba(201,162,75,0.35)" : "rgba(185,164,212,0.30)"} />
          <stop offset="100%" stopColor="rgba(185,164,212,0)" />
        </radialGradient>
        <radialGradient id={id + "s"} cx="30%" cy="50%" r="90%">
          <stop offset="0%" stopColor="rgba(46,42,50,0.92)" />
          <stop offset="70%" stopColor="rgba(62,54,74,0.88)" />
          <stop offset="100%" stopColor="rgba(78,68,92,0.82)" />
        </radialGradient>
        <clipPath id={id + "c"}><circle r="50" /></clipPath>
      </defs>
      {halo && <circle r="59" fill={`url(#${id}h)`} />}
      {/* cuerpo */}
      <circle r="50" fill={`url(#${id}g)`} />
      {/* cráteres sutiles */}
      <g clipPath={`url(#${id}c)`} fill="#8D8478" opacity="0.16">
        <circle cx="-16" cy="-12" r="9" />
        <circle cx="14" cy="6" r="6" />
        <circle cx="-4" cy="22" r="7.5" />
        <circle cx="24" cy="-20" r="4.5" />
        <circle cx="30" cy="24" r="3.5" />
        <circle cx="-30" cy="10" r="4" />
      </g>
      <g clipPath={`url(#${id}c)`} fill="#FFFFFF" opacity="0.10">
        <circle cx="-18" cy="-14" r="9" />
        <circle cx="12" cy="4" r="6" />
        <circle cx="-6" cy="20" r="7.5" />
      </g>
      {/* la sombra de la fase (terminador suave) */}
      {!llena && (
        <g clipPath={`url(#${id}c)`}>
          <ellipse cx={sombraX} cy="0" rx="100" ry="100" fill={`url(#${id}s)`} style={{ filter: "blur(1.5px)" }} />
        </g>
      )}
      {/* brillo del borde iluminado */}
      <circle r="50" fill="none" stroke={llena ? "rgba(255,244,214,0.9)" : "rgba(255,255,255,0.55)"} strokeWidth="1.2" />
    </svg>
  );
}

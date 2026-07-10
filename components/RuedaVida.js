"use client";
import { AREAS } from "@/lib/vida";

// Rueda de la Vida: radar de 9 ejes. Cada área crece con el cambio real.
export function RuedaVida({ scores = {}, size = 300, onArea }) {
  const cx = size / 2, cy = size / 2, R = size / 2 - 44;
  const N = AREAS.length;
  const ang = (i) => (Math.PI * 2 * i) / N - Math.PI / 2; // arranca arriba
  const pt = (i, r) => [cx + Math.cos(ang(i)) * r, cy + Math.sin(ang(i)) * r];

  const poly = AREAS.map((a, i) => {
    const s = Math.max(0.04, (scores[a.n] ?? 0) / 100);
    const [x, y] = pt(i, R * s);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Tu rueda de la vida">
      <defs>
        <radialGradient id="ruedaFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(126,99,153,.32)" />
          <stop offset="100%" stopColor="rgba(185,164,212,.22)" />
        </radialGradient>
      </defs>
      {/* anillos guía */}
      {[0.33, 0.66, 1].map((k) => (
        <polygon key={k} points={AREAS.map((_, i) => pt(i, R * k).map((v) => v.toFixed(1)).join(",")).join(" ")}
          fill="none" stroke="#ECE6DF" strokeWidth="1" />
      ))}
      {/* ejes */}
      {AREAS.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#F0EBE4" strokeWidth="1" />;
      })}
      {/* área lograda */}
      <polygon points={poly} fill="url(#ruedaFill)" stroke="#7E6399" strokeWidth="2" strokeLinejoin="round" />
      {/* vértices + etiquetas tocables */}
      {AREAS.map((a, i) => {
        const s = Math.max(0.04, (scores[a.n] ?? 0) / 100);
        const [vx, vy] = pt(i, R * s);
        const [lx, ly] = pt(i, R + 22);
        return (
          <g key={a.n} style={onArea ? { cursor: "pointer" } : undefined} onClick={onArea ? () => onArea(a.n) : undefined}>
            <circle cx={vx} cy={vy} r="4" fill={a.color} />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="15">{a.emoji}</text>
          </g>
        );
      })}
    </svg>
  );
}

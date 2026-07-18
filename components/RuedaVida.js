"use client";
import { AREAS } from "@/lib/vida";

// Rueda de la Vida (v2): 9 gajos que se llenan desde el centro según el logro real.
// Se ve como una rueda desde el día 1 (con todo en cero muestra el contorno tenue),
// y cada gajo crece con lo que ella registra. Legible en móvil.
export function RuedaVida({ scores = {}, size = 300, onArea }) {
  const cx = size / 2, cy = size / 2, R = size / 2 - 52;
  const N = AREAS.length, step = (Math.PI * 2) / N, gap = 0.03;

  const slice = (i, r) => {
    const a1 = -Math.PI / 2 + i * step + gap;
    const a2 = -Math.PI / 2 + (i + 1) * step - gap;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    return `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
  };
  const labelPos = (i) => {
    const a = -Math.PI / 2 + (i + 0.5) * step;
    return [cx + (R + 16) * Math.cos(a), cy + (R + 16) * Math.sin(a), Math.cos(a)];
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Tu rueda de la vida">
      {/* anillos guía */}
      {[0.5, 1].map((k) => (
        <circle key={k} cx={cx} cy={cy} r={R * k} fill="none" stroke="#ECE6DF" strokeWidth="1" />
      ))}
      {AREAS.map((a, i) => {
        const sc = Math.max(0, Math.min(1, (scores[a.n] ?? 0) / 100));
        const [lx, ly, cosv] = labelPos(i);
        return (
          <g key={a.n} style={onArea ? { cursor: "pointer" } : undefined} onClick={onArea ? () => onArea(a.n) : undefined}>
            {/* pista (contorno tenue: hace que se vea la rueda aun en cero) */}
            <path d={slice(i, R)} fill={a.color} opacity="0.1" />
            {/* logro real */}
            {sc > 0 && <path d={slice(i, Math.max(R * 0.08, R * sc))} fill={a.color} opacity="0.82" />}
            {/* etiqueta */}
            <text x={lx} y={ly} fontSize="9.5" fontWeight="700"
              fill="#574F60" textAnchor={cosv > 0.25 ? "start" : cosv < -0.25 ? "end" : "middle"}
              dominantBaseline="middle" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>
              {a.label}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="3" fill="#7E6399" />
    </svg>
  );
}

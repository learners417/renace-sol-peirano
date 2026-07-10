"use client";
// La firma visual: una luna que crece (nueva -> llena) según el progreso,
// y un jardín de 9 flores (una por luna). Femenino, cíclico, propio de Sol.

export function Luna({ fase = 0, size = 190, halo = true }) {
  // fase 0..1 (0 = nueva/oscura, 0.5 = media, 1 = llena).
  const r = size / 2 - 6;
  const cx = size / 2, cy = size / 2;
  const f = Math.max(0, Math.min(1, fase));
  // Terminador: elipse cuyo radio horizontal va de r (nueva) -> 0 (media) -> r (llena).
  const rx = Math.abs(Math.cos(Math.PI * f)) * r;
  const sweepInner = f < 0.5 ? 1 : 0; // f<.5 come del lado derecho; f>.5 bulge a la izquierda
  const uid = `${Math.round(f * 1000)}-${size}`;
  const idFill = `lf-${uid}`, idHalo = `lh-${uid}`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Luna al ${Math.round(f * 100)} por ciento`}>
      <defs>
        <radialGradient id={idFill} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#F6ECCF" />
          <stop offset="100%" stopColor="#C9A24B" />
        </radialGradient>
        <radialGradient id={idHalo} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,162,75,.35)" />
          <stop offset="100%" stopColor="rgba(201,162,75,0)" />
        </radialGradient>
      </defs>
      {halo && <circle cx={cx} cy={cy} r={r + 6} fill={`url(#${idHalo})`} />}
      {/* disco oscuro (sombra) */}
      <circle cx={cx} cy={cy} r={r} fill="#EAE3D3" />
      {/* parte iluminada (media luna derecha + elipse del terminador) */}
      {f > 0.001 && (
        <path
          d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${rx} ${r} 0 0 ${sweepInner} ${cx} ${cy - r} Z`}
          fill={`url(#${idFill})`}
        />
      )}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(201,162,75,.45)" strokeWidth="1.5" />
    </svg>
  );
}


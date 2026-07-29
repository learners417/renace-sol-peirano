"use client";
export default function Error({ reset }) {
  return (
    <div className="app app-pad center" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
      <div style={{ fontSize: "2rem" }}>🌙</div>
      <h1 className="h2">Algo se movió de lugar</h1>
      <p className="muted">Tranquila: tu camino y tu progreso están guardados. Toca el botón y seguimos donde estabas.</p>
      <button className="btn btn-primary btn-lg" onClick={() => reset()}>Volver a mi camino</button>
    </div>
  );
}

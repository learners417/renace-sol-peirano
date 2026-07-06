"use client";
// Compartir robusto: intenta share nativo, luego clipboard, luego fallback visible.
export async function compartirTexto(texto) {
  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ text: texto });
      return true;
    }
  } catch (e) {
    // el usuario canceló el share nativo: no es un error, salimos en silencio
    if (e && e.name === "AbortError") return false;
  }
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(texto);
      alert("Copiado 🤍 Pegalo donde quieras compartirlo.");
      return true;
    }
  } catch {}
  // último recurso: mostrar el texto para copiar a mano
  try { window.prompt("Copiá tu texto:", texto); } catch {}
  return false;
}

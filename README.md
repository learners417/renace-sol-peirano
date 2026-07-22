# El Camino R.E.N.A.C.E. — App (v18 · Las 9 Semanas)

**"Tardaste 9 meses en nacer. Vas a tardar 9 semanas en renacer."** 1 semana = 1 luna = 1 mes de gestación de sí misma. 5 días de camino por semana (fin de semana descansa), 45 sesiones, ventana de acceso de 12 semanas (9 + gracia), extensión 50% off, y membresía RENACIDA post-graduación.

## Códigos de acceso
SEMANA1- (solo semana 1, upgrade al cerrar) · CAMINO- · ACOMP- · INTEGRAL- · EXTENSION- (reabre 12 semanas) · RENACIDA- (membresía).

## Links de pago (env en Vercel)
NEXT_PUBLIC_LINK_CAMINO · _ACOMP · _INTEGRAL · _EXTENSION · _RENACIDA (checkouts de GHL; sin link, la app deriva a WhatsApp).

Programa de transformación para madres. Volver a nacer, volver a vos. Práctica diaria (~un paso por día, tipo Duolingo), flexible, que MIDE el cambio real — no teoría.

## v9 — cambios que salieron de la sesión con Sol (08/07)
- **Fuera el jardín.** Entra la **Rueda de la Vida** (`components/RuedaVida.js`): 9 áreas de vida que crecen con el cambio real, no con "ver el video".
- **Registro de renacimiento** (el corazón): en **"Mi renacer"** (`app/mi-renacer`) ella registra **hitos** reales ("ayer hubiera gritado, hoy no"), con **evidencia** (foto), etiquetados por área → hacen crecer la rueda. Ver un video aporta poco; el cambio real, mucho.
- **Fluidez**: se sacó el bloqueo duro "volvé mañana". Puede **seguir con el siguiente** sin salir del ritual, y adelantarse a su ritmo. Si va atrasada, se lo mostramos con cariño (no la trabamos).
- **Orden secuencial**: no se puede saltar etapas (se desbloquean en orden), confirmado con Sol.
- **Meditaciones**: 7, intercaladas en algunos módulos (`lib/vida.js` · `app/meditar`). Audios pendientes de Sol (Drive) — el reproductor queda listo.
- **"Cómo funciona"** accesible desde Mi camino. **Encuentros con Sol** mencionados.
- Nombre unificado en **renacer/renacimiento** (se quitó todo rastro de "jardín").
- Se mantiene: la **luna** como progreso del camino, el ritual de pasos, Serena + 2 agentes (Diálogo/Juego), respiración 4-4-4-4, termómetro 1-10 antes/después (el final se toma en la graduación), y los **27 videos** conectados.

## Estructura de navegación (4 secciones, móvil)
Hoy · Mi camino · Mi renacer · Serena.

## Pendiente de Sol
- Audios de las 7 meditaciones (Drive) → `lib/vida.js` campo `audioUrl`, y confirmar en qué módulos van.
- Afirmaciones reales por módulo y transcripciones de módulos 3,4,5,7,8,9 (para afinar ejercicios).
- Videos de YouTube en "No listado".
- Frame comercial de duración (la sesión trabaja 12 semanas; el "9 meses" queda a tu decisión — la arquitectura sirve para ambos).

## Después: Supabase (progreso en nube + memoria de Serena + comunidad de mamás dentro de la app — NO WhatsApp).

## Deploy
Subir el contenido a la raíz del repo → Vercel. Variables: `ANTHROPIC_API_KEY`, `SERENA_MODEL`, `RENACE_CODES`, `NEXT_PUBLIC_LINK_JARDIN`.

## Archivos clave
- `app/globals.css` — sistema de diseño (una fuente de verdad).
- `lib/programa.js` — contenido (módulos, 27 videos, ideas, actividades, etapas, voz de Sol).
- `lib/vida.js` — áreas de la Rueda de la Vida + meditaciones.
- `lib/estado.js` — progreso, hitos (registro), score por área, desbloqueo secuencial, país.
- `components/RuedaVida.js` — la firma de "Mi renacer". `components/Luna.js` — la luna del camino.

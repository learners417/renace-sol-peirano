# El Camino R.E.N.A.C.E. — App (v23 · Lista para mercado)

**"Tardaste 9 meses en nacer. Vas a tardar 9 semanas en renacer."**
1 semana = 1 luna = 1 mes de gestación de sí misma. 54 micro-sesiones (6 por semana + domingo libre), alineadas 1:1 con la landing de venta. Ventana de acceso de 12 semanas (9 + gracia), extensión 50% off, membresía RENACIDA post-graduación.

## Códigos de acceso (prefijos en RENACE_CODES)
SEMANA1- (solo semana 1; upgrade con crédito al cerrarla) · CAMINO- · ACOMP- · INTEGRAL- · EXTENSION- (reabre 12 semanas) · RENACIDA- (membresía).

## Variables de entorno (Vercel)
ANTHROPIC_API_KEY · SERENA_MODEL · RENACE_CODES · NEXT_PUBLIC_LINK_CAMINO · NEXT_PUBLIC_LINK_ACOMP · NEXT_PUBLIC_LINK_INTEGRAL · NEXT_PUBLIC_LINK_EXTENSION · NEXT_PUBLIC_LINK_RENACIDA (checkouts de GHL; sin link, la app deriva a WhatsApp).

## Idioma
La app se adapta al país elegido en el onboarding: voseo (AR/UY) o neutro (resto de LATAM) — motor `habla()`/`neutraliza()` en lib/voz.js. Serena también responde en el dialecto de ella. Los textos firmados por Sol quedan en su voz.

## Producción
- Guard anti-traductor del navegador (lib/domGuard.js) + `translate="no"`: evita el crash removeChild de Google Translate.
- Pantalla de error amorosa (app/error.js): nunca más "Application error" blanco.
- Serena: crisis con criterio (no escala cansancio; nunca sugiere daño; nunca da teléfonos).
- Progreso local (localStorage) con migración automática entre versiones.

## Lo único pendiente técnico: Supabase
Progreso en la nube + memoria de Serena + validación de códigos de un solo uso. Todo lo demás es funcional hoy.

## Contenido pendiente de Sol
Texto exacto del módulo 10 (cierre) · preguntas exactas de sus encuestas GHL (hoy: la rueda inicial de 9 áreas cumple ese rol) · su historia para los reels.

## Editar contenido
lib/programa.js (módulos, videos, textos) · lib/semanas.js (el plan de 54) · lib/vida.js (áreas y meditaciones) · lib/quiz.js (preguntas por clase).

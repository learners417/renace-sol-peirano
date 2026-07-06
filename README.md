# El Camino R.E.N.A.C.E. — App (v4, robustecida)

Programa de transformación de 90 días para mamás. De agotada, reactiva y culposa → a en calma y reconectada. 10 minutos por día. Modelo: programa con resultado + comunidad de graduadas (El Jardín) opcional.

## Deploy
Subir el contenido a la raíz del repo de GitHub → Vercel publica solo. Recargar con Ctrl+Shift+R.

## Variables en Vercel (Settings → Environment Variables → luego Redeploy)
| Variable | Para qué |
|---|---|
| `ANTHROPIC_API_KEY` | Enciende Serena con IA (sin esto usa respaldo local, no rompe). |
| `SERENA_MODEL` | `claude-haiku-4-5-20251001` (económico) o `claude-sonnet-4-6` (calidad). |
| `RENACE_CODES` | Códigos de acceso `CAMINO-x,ACOMP-y,INTEGRAL-z` (prefijo = plan). Sin esto: modo demo. |
| `NEXT_PUBLIC_LINK_JARDIN` | Link de pago de la membresía (opcional). |

## Robustez v4 (para pasársela a Sol con confianza)
- localStorage blindado con try/catch → funciona en Safari privado (iPhone) y modo incógnito sin romper.
- Compartir robusto: share nativo → clipboard → fallback visible. Maneja cancelación del usuario.
- Divisiones protegidas contra NaN. Guards de login/onboarding en todas las pantallas.
- Serena: la crisis se atiende SIEMPRE en local e inmediato (no depende de la API). Sin key → respaldo local.
- API de acceso maneja código vacío/nulo sin romper.
- Probado con simulación de recorrido completo (60 días → graduación → logout): sin bugs de lógica.

## Funciones
- **Programa de 90 días** (/programa): punto A→B personalizado, 3 etapas con metas, avance visible.
- **Home inteligente**: saludo por hora, mensaje según el ánimo del check-in, ayuda contextual (SOS) en horas difíciles (17–21h).
- **60 días con contenido real** (texto sustancial por pasito, además de la práctica).
- **Onboarding con diagnóstico** (3 preguntas) + mensaje personalizado de Sol.
- **Voz de Sol** en cada etapa.
- **SOS Calma**: respiración guiada + kit de frases para el momento crítico con los hijos.
- **Para vos**: hub (SOS, Respirar guiado, Serena, Mis semillas, Círculo).
- **Mis semillas** coleccionables + "regar el día" al azar.
- **Respiración guiada** (orbe 4-4-6). **Graduación** con carta devuelta y antes/después.
- PWA instalable en el celular.

## Contenido editable: `lib/programa.js`. Estado: `lib/estado.js` (migra a Supabase: próximo paso).

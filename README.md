# El Camino R.E.N.A.C.E. — App (v1 definitiva)
 
Programa de transformación de 12 semanas para mamás. 10 minutos por día. De agotada y en piloto automático → a en calma y reconectada consigo.

## Correr local
```bash
npm install && npm run dev   # http://localhost:3000
```

## Deploy
GitHub → vercel.com → New Project → importar repo → Deploy.

## ✅ Checklist para dejarla FUNCIONAL (en Vercel → Settings → Environment Variables)

| Variable | Qué hace | Ejemplo |
|---|---|---|
| `ANTHROPIC_API_KEY` | Enciende a **Serena con IA real** (sin esto usa respuestas locales de respaldo) | `sk-ant-...` |
| `SERENA_MODEL` | (Opcional) modelo de Serena | `claude-sonnet-4-6` (calidad) o `claude-haiku-4-5-20251001` (económico) |
| `RENACE_CODES` | **Códigos de acceso** de compradoras, separados por coma. El prefijo define el plan: `CAMINO-`, `ACOMP-`, `INTEGRAL-`. Sin esta variable → modo demo (entra cualquiera). | `CAMINO-7GK2,ACOMP-9QW4,INTEGRAL-2ZX8` |
| `NEXT_PUBLIC_LINK_JARDIN` | Link de pago de la membresía El Jardín (MP suscripción / Hotmart) | `https://...` |

### Flujo de venta → acceso (sin base de datos)
1. La mamá compra en la landing (Mercado Pago AR / Hotmart internacional).
2. Le enviás por email su **código** (ej. `ACOMP-9QW4`) — automatizable con el email post-compra de MP/Hotmart, o manual al inicio (1 minuto por venta).
3. Agregás el código a `RENACE_CODES` en Vercel (Redeploy no hace falta: las env vars de runtime aplican al instante en funciones).
4. Ella entra con nombre + email + código → su plan queda determinado por el prefijo.

## Qué incluye
- **Login por código de compra** (3 planes por prefijo).
- **Onboarding Semana 0**: termómetro de entrada + carta a sí misma + jardín plantado.
- **Hoy**: ritual diario de 4 pasos (check-in → pasito → práctica → semilla compartible). **Un ritual por día** con opción amable de adelantar. Cierre anti-adicción. Modo "semana difícil".
- **El Jardín**: 12 flores, riegos, racha amable, termómetro antes/ahora.
- **Serena (IA real)**: `/api/serena` con el método, tono y guardrails en el system prompt; crisis se maneja SIEMPRE local e inmediato (no depende de la API); fallback local si no hay key.
- **SOS Calma**: secuencia guiada de 90s.
- **El Círculo**: pregunta semanal + muro (local en esta versión) + espacio de encuentros para planes acompañados.
- **Graduación**: carta devuelta, antes/ahora, compartir, membresía El Jardín (US$19/mes, primer mes $9) con link de pago configurable.
- **Instalable como app (PWA)**: manifest + íconos → "Agregar a pantalla de inicio" en el celu.

## Contenido
Todo vive en `lib/programa.js` (12 semanas × 5 días, prácticas, 30 semillas, preguntas del Círculo). Los audios/videos de Sol se cargan ahí al final (reemplazando el placeholder en `app/page.js`).

## Limitaciones conocidas de esta versión (a propósito, para no sobrecomplicar)
- El progreso vive en el dispositivo (localStorage): si cambia de teléfono, empieza de cero. Migración a DB (Supabase) en la etapa siguiente.
- El muro del Círculo es local (cada una ve lo suyo). Comunidad compartida en la etapa siguiente.
- Los códigos no expiran ni se limitan a un dispositivo (aceptable para el volumen inicial).

## Lo que sigue (en orden)
1. **Serena on**: pegar la API key en Vercel → probarla con Sol.
2. **Ventas → códigos**: configurar el email post-compra en MP/Hotmart con el código.
3. **DB (Supabase)**: cuentas reales + progreso en la nube + Círculo compartido.
4. **Membresía El Jardín**: suscripción en MP/Hotmart + link en `NEXT_PUBLIC_LINK_JARDIN`.
5. **Contenido de Sol**: audios/videos en `lib/programa.js` (lo dejamos para el final, como definimos).

// El Camino R.E.N.A.C.E. — 10 módulos, 27 videos (estructura real de Sol).
// Cada video tiene su actividad (mencionada en el video). Videos/audios: se cargan luego (videoUrl).
// Tono: cálido, concreto, sin culpa. Aceptar lo que es, empezar por una misma.

export const modulos = [
  {
    n: 1, nombre: "Tu mente", color: "#A990CC", icono: "🧠",
    intro: "Empezamos por casa: entender cómo funciona tu mente. Cuando la comprendés, deja de manejarte y empieza a trabajar a tu favor.",
    videos: [
      { id: "v1", videoUrl: "https://www.youtube-nocookie.com/embed/Ri13CgFHvOw", titulo: "Bienvenida · Tu mente", subtitulo: "Módulo 1 · Parte 1",
        desc: "Conoce de manera simplificada cómo funciona tu cerebro y mente, y haz que estos trabajen a tu favor.",
        idea: "Tu mente no es tu enemiga: es un órgano que aprendió a protegerte como pudo. Cuando entendés cómo funciona, dejás de pelearle y empezás a acompañarla. Eso solo ya cambia todo.",
        actividad: "Observá hoy un pensamiento que se repite en tu cabeza. Solo miralo, sin juzgarlo. Escribilo si querés." },
      { id: "v2", videoUrl: "https://www.youtube-nocookie.com/embed/BgeIHacVsWY", titulo: "Tu mente", subtitulo: "Módulo 1 · Parte 2",
        desc: "Conoce de manera simplificada cómo funciona tu cerebro y mente, y haz que estos trabajen a tu favor.",
        idea: "La mente que pelea con la realidad, sufre. Aceptar no es resignarse: es dejar de gastar fuerza en lo que no podés cambiar, para poder elegir mejor.",
        actividad: "Elegí una situación de hoy que no podés cambiar. Decite: 'esto es lo que es'. Notá qué pasa en tu cuerpo." },
    ],
  },
  {
    n: 2, nombre: "Emociones y creencias", color: "#9D86BE", icono: "🌊",
    intro: "Las creencias que cargás, muchas heredadas, construyen tu mundo sin que lo notes. Esta etapa es para verlas y empezar a elegir de nuevo.",
    videos: [
      { id: "v3", videoUrl: "https://www.youtube-nocookie.com/embed/ZZII-Z-LVh0", titulo: "Las emociones y creencias que destruyen mi destino", subtitulo: "Módulo 2 · Parte 1",
        desc: "Conoce cómo las creencias derivadas de tu programación mental terminan construyendo tu mundo, y cómo cambiarlas para tener un futuro mejor.",
        idea: "Tu forma de reaccionar no es tu destino: es un camino que tu cerebro repitió tantas veces que se hizo automático. La buena noticia es que se puede abrir un camino nuevo. Cada vez que elegís una respuesta distinta, por chiquita que sea, lo estás reentrenando.",
        actividad: "Identificá una creencia sobre vos que arrastrás hace años ('soy desordenada', 'no puedo con todo'). Escribila y preguntate: ¿es verdad, o es un camino repetido?" },
      { id: "v4", videoUrl: "https://www.youtube-nocookie.com/embed/rypNj4bwTKU", titulo: "Las emociones y creencias que destruyen mi destino", subtitulo: "Módulo 2 · Parte 2",
        desc: "Conoce cómo las creencias derivadas de tu programación mental terminan construyendo tu mundo, y cómo cambiarlas para tener un futuro mejor.",
        idea: "Toda emoción es válida, aunque no toda reacción. Sentir enojo o hartazgo no te hace peor madre. Las emociones no se eligen; lo que hacés con ellas, sí.",
        actividad: "Cuando venga una emoción fuerte hoy, nombrala en voz baja: 'esto es enojo', 'esto es cansancio'. Nombrar calma." },
      { id: "v5", videoUrl: "https://www.youtube-nocookie.com/embed/H9qDygcySZM", titulo: "Las emociones y creencias que destruyen mi destino", subtitulo: "Módulo 2 · Parte 3",
        desc: "Conoce cómo las creencias derivadas de tu programación mental terminan construyendo tu mundo, y cómo cambiarlas para tener un futuro mejor.",
        idea: "La culpa no educa, solo pesa. Distinta es la responsabilidad amorosa: 'esto quiero hacerlo distinto'. Esa te mueve. La culpa solo te hunde. Podés soltarla.",
        actividad: "Si hoy aparece la culpa, decile: 'gracias por avisar, pero ya aprendí'. Y soltala." },
    ],
  },
  {
    n: 3, nombre: "Nuestra personalidad", color: "#B48EAD", icono: "✦",
    intro: "Conocerte a vos misma es la clave para comprenderte, aceptarte, sanar y amarte sin juicios. Acá te presentamos... a vos.",
    videos: [
      { id: "v6", videoUrl: "https://www.youtube-nocookie.com/embed/2JeTJWjSQsU", titulo: "Nuestra personalidad", subtitulo: "Módulo 3 · Parte 1",
        desc: "Conocernos a nosotros mismos es una de las claves fundamentales para comenzar a comprendernos, aceptarnos, sanar, amarnos sanamente y alcanzar nuestra mejor versión.",
        idea: "No hay personalidades buenas ni malas. Hay formas de ser que, cuando las conocés, dejan de manejarte. Conocerte es el principio de aceptarte.",
        actividad: "¿Qué dicen de vos las personas que te quieren? Anotá dos cosas que se repiten." },
      { id: "v7", videoUrl: "https://www.youtube-nocookie.com/embed/LClbpehpMLc", titulo: "Nuestra personalidad", subtitulo: "Módulo 3 · Parte 2",
        desc: "Conocernos a nosotros mismos es una de las claves fundamentales para comenzar a comprendernos, aceptarnos, sanar, amarnos sanamente y alcanzar nuestra mejor versión.",
        idea: "Ante el estrés, cada personalidad hace algo distinto: controlar, complacer, exigirse, esconderse. Reconocer el tuyo no es etiquetarte: es dejar de actuar en automático.",
        actividad: "Ante el estrés, ¿vos qué hacés: controlás, complacés, te exigís, te escondés? Nombralo sin juicio." },
      { id: "v8", videoUrl: "https://www.youtube-nocookie.com/embed/Dohtp_Sc1Mo", titulo: "Nuestra personalidad", subtitulo: "Módulo 3 · Parte 3",
        desc: "Conocernos a nosotros mismos es una de las claves fundamentales para comenzar a comprendernos, aceptarnos, sanar, amarnos sanamente y alcanzar nuestra mejor versión.",
        idea: "Tus fortalezas son más de las que creés. Las damos por obvias justo porque nos salen fáciles. Reconocerlas es empezar a apoyarte en ellas.",
        actividad: "Anotá tres cosas que hacés bien. Si te cuesta, preguntale a alguien que te quiera." },
      { id: "v9", videoUrl: "https://www.youtube-nocookie.com/embed/ahT8UWsZXgs", titulo: "Nuestra personalidad", subtitulo: "Módulo 3 · Parte 4",
        desc: "Conocernos a nosotros mismos es una de las claves fundamentales para comenzar a comprendernos, aceptarnos, sanar, amarnos sanamente y alcanzar nuestra mejor versión.",
        idea: "Lo que no aceptás de vos, te maneja. Lo que aceptás, se transforma. Aceptar un defecto no es rendirse: es dejar de pelear con vos misma.",
        actividad: "Elegí un defecto tuyo y decí: 'esto también soy yo, y está bien ser humana'. Notá el alivio." },
      { id: "v10", videoUrl: "https://www.youtube-nocookie.com/embed/koesalO_Dp4", titulo: "Nuestra personalidad", subtitulo: "Módulo 3 · Parte 5",
        desc: "Conocernos a nosotros mismos es una de las claves fundamentales para comenzar a comprendernos, aceptarnos, sanar, amarnos sanamente y alcanzar nuestra mejor versión.",
        idea: "Cuando entendés que el otro tiene su propia forma de ser —no para molestarte, sino porque así es— dejás de pelear con quien es y empezás a encontrarte con quien es.",
        actividad: "Pensá en alguien con quien chocás. ¿Qué forma de ser tiene, distinta a la tuya? Miralo sin juzgar." },
    ],
  },
  {
    n: 4, nombre: "Pareja y comunicación familiar", color: "#B7A0CE", icono: "♡",
    intro: "Exploramos la comunicación familiar saludable y las bases de una relación de pareja armoniosa: el cimiento de toda familia.",
    videos: [
      { id: "v11", videoUrl: "https://www.youtube-nocookie.com/embed/xZaC3_JBkxE", titulo: "Relaciones de pareja y comunicación familiar saludable", subtitulo: "Módulo 4 · Parte 1",
        desc: "Exploraremos las formas de una comunicación familiar saludable y sentaremos las bases para una relación de pareja armoniosa y duradera, el cimiento de toda familia.",
        idea: "Tu pareja no vino a completarte ni a adivinarte: vino a acompañarte, siendo distinto. Aceptar al otro como es, y elegir cómo respondés vos, es donde empieza el amor real.",
        actividad: "Anotá una diferencia con tu pareja que siempre te molestó. Hoy solo observala, sin querer cambiarla." },
      { id: "v12", videoUrl: "https://www.youtube-nocookie.com/embed/pB4WXjllB-c", titulo: "Relaciones de pareja y comunicación familiar saludable", subtitulo: "Módulo 4 · Parte 2",
        desc: "Exploraremos las formas de una comunicación familiar saludable y sentaremos las bases para una relación de pareja armoniosa y duradera, el cimiento de toda familia.",
        idea: "Pedir sin reprochar cambia todo. 'Necesito...' abre; 'vos nunca...' cierra. La misma necesidad, dicha distinto, encuentra otra respuesta.",
        actividad: "Transformá una queja en un pedido: 'necesito...' en vez de 'vos nunca...'. Probalo hoy si surge." },
      { id: "v13", videoUrl: "https://www.youtube-nocookie.com/embed/Uj6qKm_feLs", titulo: "Relaciones de pareja y comunicación familiar saludable", subtitulo: "Módulo 4 · Parte 3",
        desc: "Exploraremos las formas de una comunicación familiar saludable y sentaremos las bases para una relación de pareja armoniosa y duradera, el cimiento de toda familia.",
        idea: "Reconectarse no es un gran gesto: son muchos pequeños. Un gesto amable sin esperar nada a cambio empieza a deshacer la distancia.",
        actividad: "Hacé hoy un gesto amable hacia tu pareja, sin esperar nada a cambio. Solo dar." },
    ],
  },
  {
    n: 5, nombre: "Sanar el pasado", color: "#7E6399", icono: "🕊",
    intro: "Sanar tu pasado, reinterpretarlo y limpiarte de heridas no sanadas es la clave para un presente que puedas vivir con magia.",
    videos: [
      { id: "v14", videoUrl: "https://www.youtube-nocookie.com/embed/mVnZyY0ngwk", titulo: "Sanar el pasado y vivir mágicamente el presente", subtitulo: "Módulo 5 · Parte 1",
        desc: "Sanar nuestro pasado, lograr reinterpretarlo y limpiarnos de emociones negativas y heridas no sanadas son las claves fundamentales para lograr un futuro exitoso y armonioso.",
        idea: "El pasado no se cambia, pero sí la forma en que lo cargás. Reinterpretar una herida es sacarle el peso que venís arrastrando sin darte cuenta.",
        actividad: "Pensá en algo del pasado que todavía te pesa. Solo reconocelo hoy: 'esto me dolió'. Nombrarlo es empezar a soltarlo." },
      { id: "v15", videoUrl: "https://www.youtube-nocookie.com/embed/Vib9tfptkFw", titulo: "Sanar el pasado y vivir mágicamente el presente", subtitulo: "Módulo 5 · Parte 2",
        desc: "Sanar nuestro pasado, lograr reinterpretarlo y limpiarnos de emociones negativas y heridas no sanadas son las claves fundamentales para lograr un futuro exitoso y armonioso.",
        idea: "Las heridas no sanadas se filtran en cómo reaccionás hoy. Mirarlas con compasión —no con culpa— es lo que empieza a cerrarlas.",
        actividad: "Lo que más te removió esta semana, ¿qué herida vieja está tocando? Miralo con ternura, como mirarías a una amiga." },
      { id: "v16", videoUrl: "https://www.youtube-nocookie.com/embed/vsse28uVhpk", titulo: "Sanar el pasado y vivir mágicamente el presente", subtitulo: "Módulo 5 · Parte 3",
        desc: "Sanar nuestro pasado, lograr reinterpretarlo y limpiarnos de emociones negativas y heridas no sanadas son las claves fundamentales para lograr un futuro exitoso y armonioso.",
        idea: "Aceptar tu historia no es aprobar lo que pasó: es dejar de pelear con que pasó, para poder vivir tu presente sin esa mochila.",
        actividad: "Escribí una línea: '¿qué dejé de pelear de mi pasado esta semana?'. Leela despacio." },
    ],
  },
  {
    n: 6, nombre: "Crianza efectiva y respetuosa", color: "#B7A0CE", icono: "🌷",
    intro: "Herramientas para educar a tus hijos de manera amorosa, pero también sana y equilibrada. La base de un mundo mejor.",
    videos: [
      { id: "v17", videoUrl: "https://www.youtube-nocookie.com/embed/GhPghDNBc_A", titulo: "Crianza efectiva y respetuosa", subtitulo: "Módulo 6 · Parte 1",
        desc: "Aprender herramientas para educar a nuestros hijos de manera amorosa, pero a la vez sana y equilibrada, es la base para un mundo mejor.",
        idea: "Tus hijos no vinieron a portarse bien: vinieron a aprender. Y vos no viniste a ser perfecta: viniste a acompañar. Tu hijo no lo hace contra vos.",
        actividad: "En el próximo berrinche, repetí adentro: 'está aprendiendo, no me está atacando'. Y respirá antes de responder." },
      { id: "v18", videoUrl: "https://www.youtube-nocookie.com/embed/1grjPZYLndI", titulo: "Crianza efectiva y respetuosa", subtitulo: "Módulo 6 · Parte 2",
        desc: "Aprender herramientas para educar a nuestros hijos de manera amorosa, pero a la vez sana y equilibrada, es la base para un mundo mejor.",
        idea: "Regular a un niño empieza por regularte a vos. Tu calma es la primera herramienta de tus hijos. No se puede dar lo que no se tiene en ese momento.",
        actividad: "Antes de intervenir hoy en un conflicto, una respiración profunda. Vos primero. Siempre vos primero." },
      { id: "v19", videoUrl: "https://www.youtube-nocookie.com/embed/E6QOfw1tzxc", titulo: "Crianza efectiva y respetuosa", subtitulo: "Módulo 6 · Parte 3",
        desc: "Aprender herramientas para educar a nuestros hijos de manera amorosa, pero a la vez sana y equilibrada, es la base para un mundo mejor.",
        idea: "Reparar vale más que no fallar. Si te desbordaste, un 'perdón, mamá se enojó, no es tu culpa' enseña más que la perfección. Reparar también educa.",
        actividad: "Si hoy te desbordaste, reparás: un abrazo y 'perdón, mamá se enojó'. Y date a vos el mismo perdón." },
    ],
  },
  {
    n: 7, nombre: "Tu salud física", color: "#C2A98E", icono: "🌿",
    intro: "Las bases para un óptimo funcionamiento de tu cuerpo. Cuidarte no es un lujo: es lo que te sostiene para todo lo demás.",
    videos: [
      { id: "v20", videoUrl: "https://www.youtube-nocookie.com/embed/HKiGhrkBelo", titulo: "Nuestra salud física", subtitulo: "Módulo 7 · Parte 1",
        desc: "Descubre las bases fundamentales para lograr un óptimo funcionamiento de tu cuerpo físico.",
        idea: "Tu cuerpo te sostuvo todos estos años sin pedir permiso. Empezar a devolverle, de a poquito, no es exigencia: es gratitud en acción.",
        actividad: "Apoyá una mano en tu pecho 30 segundos. Agradecele a tu cuerpo por sostenerte hasta acá." },
      { id: "v21", videoUrl: "https://www.youtube-nocookie.com/embed/0ZIV8q0CGgU", titulo: "Nuestra salud física", subtitulo: "Módulo 7 · Parte 2",
        desc: "Descubre las bases fundamentales para lograr un óptimo funcionamiento de tu cuerpo físico.",
        idea: "Los hábitos posibles ganan a los perfectos. Uno chiquito, tan chico que sea imposible fallar, construye más que un plan enorme que abandonás.",
        actividad: "Elegí UN hábito pequeño para esta semana. Tan chico que sea imposible fallar (un vaso de agua al despertar)." },
      { id: "v22", videoUrl: "https://www.youtube-nocookie.com/embed/MhcX7jgvDRc", titulo: "Nuestra salud física", subtitulo: "Módulo 7 · Parte 3",
        desc: "Descubre las bases fundamentales para lograr un óptimo funcionamiento de tu cuerpo físico.",
        idea: "Moverte como puedas, donde puedas, cuenta. Bailar en la cocina cuenta. No hace falta un gimnasio: hace falta empezar.",
        actividad: "Cinco minutos de movimiento hoy, como puedas. Bailar, caminar, estirar. Todo cuenta." },
      { id: "v23", videoUrl: "https://www.youtube-nocookie.com/embed/7x-o9nKwb7g", titulo: "Nuestra salud física", subtitulo: "Módulo 7 · Parte 4",
        desc: "Descubre las bases fundamentales para lograr un óptimo funcionamiento de tu cuerpo físico.",
        idea: "El descanso no se merece: se necesita. No es un premio por hacer todo; es el combustible para poder hacerlo.",
        actividad: "Hoy, cuando puedas, cerrá los ojos dos minutos. Sin pantalla, sin culpa. Es mantenimiento, no premio." },
    ],
  },
  {
    n: 8, nombre: "Confiar en la vida", color: "#5A9170", icono: "🍃",
    intro: "La magia de confiar en la vida y sus procesos, y deleitarte con las enseñanzas de la naturaleza. Ahí se esconde otra forma de estar.",
    videos: [
      { id: "v24", videoUrl: "https://www.youtube-nocookie.com/embed/9ljHueBqxaw", titulo: "La magia de confiar en la vida y la naturaleza", subtitulo: "Módulo 8",
        desc: "Reflexionar acerca de nuestra manera de ver la vida, explorar y conectarnos con ciertas maravillas del mundo natural nos ayudarán a encontrar la magia que se esconde detrás de todo.",
        idea: "Confiar en la vida no es que todo salga como querés: es saber que, pase lo que pase, vas a poder. La naturaleza no se apura y todo llega. Vos también estás en proceso.",
        actividad: "Salí un momento a mirar algo de la naturaleza —un árbol, el cielo—. Respirá y recordá: todo tiene su tiempo, vos también." },
    ],
  },
  {
    n: 9, nombre: "Las leyes universales", color: "#65507E", icono: "✨",
    intro: "Comprender cómo funciona el universo y las leyes que lo rigen te da una luz que va a estar siempre ahí para guiar tu camino.",
    videos: [
      { id: "v25", videoUrl: "https://www.youtube-nocookie.com/embed/ZWHLMaEoOQQ", titulo: "Las leyes universales que rigen el universo y nuestras vidas", subtitulo: "Módulo 9 · Parte 1",
        desc: "Comprende cómo funciona el universo y las leyes que lo rigen, para contar con una luz que siempre estará allí para guiar tu camino.",
        idea: "Cuando entendés que hay un orden más grande que vos, soltás el peso de controlar todo. No tenés que sostener el mundo sola: podés confiar y fluir con él.",
        actividad: "Hoy, cuando algo no salga como querías, probá decir: 'esto también sirve, aunque todavía no lo entienda'. Y seguí." },
      { id: "v26", videoUrl: "https://www.youtube-nocookie.com/embed/tAklh6q0PWo", titulo: "Las leyes universales que rigen el universo y nuestras vidas", subtitulo: "Módulo 9 · Parte 2",
        desc: "Comprende cómo funciona el universo y las leyes que lo rigen, para contar con una luz que siempre estará allí para guiar tu camino.",
        idea: "Lo que das, vuelve; donde ponés tu atención, crece. Elegir dónde poner tu foco es un acto de poder, incluso en los días difíciles.",
        actividad: "Anotá tres cosas de hoy por las que estás agradecida. Chiquitas valen: el café caliente cuenta." },
      { id: "v27", videoUrl: "https://www.youtube-nocookie.com/embed/Ej6RRSvZ4Es", titulo: "Las leyes universales que rigen el universo y nuestras vidas", subtitulo: "Módulo 9 · Parte 3",
        desc: "Comprende cómo funciona el universo y las leyes que lo rigen, para contar con una luz que siempre estará allí para guiar tu camino.",
        idea: "Tu fortaleza no es no tener miedo: es caminar con él. Ya atravesaste cosas difíciles antes. Esa fuerza sigue ahí, disponible cuando la necesites.",
        actividad: "Recordá una situación difícil que ya superaste en tu vida. Ya fuiste fuerte antes. Escribilo." },
    ],
  },
  {
    n: 10, nombre: "Integración y cierre", color: "#65507E", icono: "🌸",
    intro: "El último módulo. No termina nada: se integra todo. Armamos tu forma de sostener lo que floreció, para siempre.",
    videos: [
      { id: "v28", titulo: "Integrá tu camino", subtitulo: "Módulo 10",
        desc: "Reunimos todo lo aprendido para que se vuelva parte de tu vida, para siempre.",
        idea: "Lo que aprendiste en este camino ya es tuyo. Los días difíciles van a volver —y está bien— pero ahora tenés herramientas. No sos la misma que empezó: volviste a vos.",
        actividad: "Anotá las tres herramientas del camino que más usaste. Esas son TUYAS para siempre. Y agradecete haber llegado hasta acá." },
    ],
  },
];

// Semillas (afirmaciones) — placeholder hasta cargar las reales de GoHighLevel por módulo.
export const semillas = [
  "Acepto este día tal como llega. Yo elijo cómo lo camino.",
  "No puedo controlar todo. Puedo elegir mi paz.",
  "Mi hijo está aprendiendo. Yo también. Vamos bien.",
  "Lo que siento es válido. Lo dejo pasar como una ola.",
  "Hoy elijo responder, no reaccionar.",
  "No vine a ser perfecta. Vine a estar presente.",
  "Suelto lo que no depende de mí.",
  "Mi calma vale más que tener razón.",
  "Cada uno en mi casa tiene su proceso. Yo respeto el mío.",
  "La culpa no me educa. El amor sí.",
  "Hoy me trato como trataría a alguien que amo.",
  "Esto que me cuesta también me está enseñando.",
  "No lucho contra lo que es. Trabajo con lo que hay.",
  "Mi descanso no se merece: se necesita.",
  "Puedo empezar de nuevo cuantas veces haga falta.",
  "Acepto mi historia. Elijo mi presente.",
  "Ser suave conmigo me hace fuerte.",
  "Lo pequeño y constante puede más que lo grande y perfecto.",
  "Hoy me cuido, aunque sea con un gesto pequeño.",
  "Mi paz también es un regalo para mis hijos.",
  "No necesito que todo cambie para estar bien.",
  "Confío en mi proceso, aunque no lo vea entero.",
  "Acepto a los que amo tal como son. Y me elijo a mí también.",
  "Un pasito por día alcanza.",
  "Lo que no salió hoy, no me define.",
  "Estoy aprendiendo a volver a mí. Y ya estoy en camino.",
  "El caos de mi casa es vida circulando.",
  "Puedo pausar. Pausar también es avanzar.",
  "Nada de lo que siento me hace mala madre.",
  "Hoy me abrazo primero, para poder abrazar mejor.",
];

// --- Derivados: aplanamos los 27 videos en una secuencia de "días" ---
export const secuenciaVideos = modulos.flatMap((m) =>
  m.videos.map((v) => ({ ...v, modulo: m.n, moduloNombre: m.nombre, color: m.color, icono: m.icono }))
);
export const TOTAL_PASOS = secuenciaVideos.length;       // 28 pasos (27 videos + cierre)
export const TOTAL_VIDEOS = 27;
export const TOTAL_MODULOS = modulos.length;             // 10

export const getModulo = (n) => modulos.find((m) => m.n === n) || null;
export const videoPorIndice = (i) => secuenciaVideos[i] || null;
export const semillaPorIndice = (i) => semillas[i % semillas.length];

// Las 3 grandes etapas (agrupan los 10 módulos) — textos corregidos por Sol.
export const etapas = [
  {
    n: 1, nombre: "Volver a vos", modulos: [1, 2, 3], semanas: "Semanas 1–4", color: "#A990CC", icono: "🌱",
    subtitulo: "Volver a vos, conocerte en profundidad y comenzar a amarte sin juicios.",
    meta: "Entender cómo funciona tu mente, habitar y gestionar tus emociones, y comprender tu tipo de personalidad y el de tu círculo íntimo a través del Eneagrama.",
    logro: "Ya no peleás con lo que sentís, ni con nada ni nadie. Aprendés a mirar lo que ocurre y te ocurre con calma y entendimiento. Ahora tenés herramientas para comprender lo que te sucede, por qué, y cómo atravesarlo de la mejor manera.",
  },
  {
    n: 2, nombre: "Vincularte y criar", modulos: [4, 5, 6], semanas: "Semanas 5–7", color: "#9D86BE", icono: "✦",
    subtitulo: "Vincularte sanamente y criar con consciencia y efectividad.",
    meta: "Sanar tu pasado, reencontrarte con tu pareja y comprender el ABC de la crianza efectiva y respetuosa para crear un hogar con más armonía y amor.",
    logro: "Dejás de exigirte y empezás a elegir cómo respondés. Te reconectás con tu pareja y tus hijos, y tus relaciones comienzan a florecer de una manera que no creías posible.",
  },
  {
    n: 3, nombre: "Sanar de manera integral", modulos: [7, 8, 9, 10], semanas: "Semanas 8–12", color: "#7E6399", icono: "🌷",
    subtitulo: "Sanar de manera integral.",
    meta: "Alcanzar de manera simple una salud verdadera e integral: alimentando y ejercitando tu cuerpo, sanando tu pasado, y encontrando paz a través de una espiritualidad sin dogmas, integrando todo el camino.",
    logro: "Sanás cuerpo, mente, espíritu y relaciones. Tenés herramientas propias y un hogar más armonioso, para siempre.",
  },
];

export const etapaDeModulo = (n) => etapas.find((e) => e.modulos.includes(n)) || etapas[0];

// Diagnóstico de entrada
export const diagnostico = [
  { id: "dolor", pregunta: "¿Qué es lo que más te pesa hoy?", sub: "Para saber por dónde acompañarte primero.",
    opciones: [
      { v: "culpa", t: "La culpa de no llegar a todo", e: "🌧" },
      { v: "gritos", t: "Explotar y gritar a mis hijos", e: "🌋" },
      { v: "perdida", t: "Sentir que me perdí a mí misma", e: "🌫" },
      { v: "pareja", t: "La distancia con mi pareja", e: "💔" },
    ] },
  { id: "tiempo", pregunta: "¿Cuánto tiempo para vos tenés por día?", sub: "Sé honesta. Vamos a tu ritmo real.",
    opciones: [
      { v: "poco", t: "Casi nada, corro todo el día", e: "⏳" },
      { v: "algo", t: "Unos 10 minutos si me organizo", e: "🕘" },
      { v: "mas", t: "Puedo hacerme un rato tranquilo", e: "🌿" },
    ] },
  { id: "freno", pregunta: "¿Qué solés sentir cuando intentás algo para vos?", sub: "Lo que te frena, lo miramos juntas.",
    opciones: [
      { v: "culpa2", t: "Culpa, como si estuviera fallando", e: "😔" },
      { v: "duda", t: "Dudo si lo estoy haciendo bien", e: "🤍" },
      { v: "cansancio", t: "Cansancio, no me dan las fuerzas", e: "😮‍💨" },
      { v: "lista", t: "Estoy lista para empezar", e: "🌱" },
    ] },
];

export const mensajeDolor = {
  culpa: "Escuchame: la culpa no te hace mejor madre, solo te agota. En este camino vas a aprender a soltarla. No viniste a hacerlo perfecto. Viniste a volver a vos.",
  gritos: "Gritar no te hace mala madre. Muchas veces es tu cuerpo pidiendo ayuda. Vas a tener herramientas para la calma — y un botón para los peores momentos. No estás sola en esto.",
  perdida: "Perderte no fue un error: fue de tanto dar. Y encontrarte otra vez es posible, de a un pasito por día. Estoy acá para acompañarte a volver.",
  pareja: "El vínculo se destraba, y no cambiando al otro: empezando por vos. Vas a ver cómo, con calma, todo puede volver a acercarse.",
};

// Mensaje de bienvenida de Sol (corregido por ella)
export const mensajeSolInicio = "Cuando fui mamá, mi cabeza no paraba. Me la pasaba peleando con lo que sentía, y eso me agotaba. Pero aprendí algo que me cambió: la mente que pelea con la realidad, sufre. No vinimos a controlar todo. Vinimos a entendernos un poco más. — Sol";

// Voz de Sol por módulo (primera persona, en los umbrales)
export const vozSolModulo = {
  1: mensajeSolInicio,
  2: "Yo cargué creencias que no eran mías durante años: 'tenés que poder con todo', 'no te quejes'. Cuando las vi de frente, pude empezar a soltarlas. Vos también podés. — Sol",
  3: "Conocerme de verdad fue lo que más me liberó. Entender por qué reacciono como reacciono me sacó un peso enorme. No sos tus defectos: sos una mujer aprendiendo. — Sol",
  4: "Mi vínculo de pareja también quedó en pausa entre el cansancio y los chicos. Lo que lo destrabó no fue cambiarlo a él: fue cambiar yo la forma de mirar. — Sol",
  5: "Sanar mi pasado fue el trabajo más profundo y el más liberador. No para olvidar, sino para que deje de doler. Vamos de a poco, con toda la ternura. — Sol",
  6: "Cuántas veces grité y después lloré de culpa. Si te pasa, no estás sola, y no sos mala madre. Tu calma es la primera herramienta de tus hijos. — Sol",
  7: "Yo también me olvidé de mi cuerpo durante años. Recién cuando empecé a tratarlo con cariño, todo cambió. No te pido perfección: te pido un gesto amable por día. — Sol",
  8: "Aprender a confiar en la vida me cambió la forma de vivir. Dejar de pelear con lo que pasa, y encontrar magia hasta en lo simple. Eso también se aprende. — Sol",
  9: "Entender que hay un orden más grande que yo me sacó el peso de controlar todo. No estás sola sosteniendo el mundo. Podés confiar. — Sol",
  10: "Llegaste al final, y estoy orgullosa de vos. Ahora todo esto es tuyo, para siempre. Yo tardé años en armar este camino. Vos lo caminaste entero. — Sol",
};

// Herramientas rápidas (pantalla "Para vos")
export const herramientas = [
  { id: "sos", titulo: "SOS Calma", desc: "Para el momento crítico. 90 segundos.", icono: "🕊", ruta: "/sos", color: "#65507E" },
  { id: "respirar", titulo: "Respirar", desc: "Una pausa guiada, cuando la necesites.", icono: "🌬", ruta: "/respirar", color: "#7E6399" },
  { id: "serena", titulo: "Hablar con Serena", desc: "Tu compañera, siempre disponible.", icono: "💬", ruta: "/serena", color: "#9D86BE" },
  { id: "semillas", titulo: "Mis semillas", desc: "Tus afirmaciones guardadas.", icono: "🌱", ruta: "/semillas", color: "#B48EAD" },
];

// Preguntas del Círculo por módulo
export const preguntasCirculo = [
  "¿Qué entendiste de tu mente este módulo que te alivió?",
  "¿Qué creencia vieja empezaste a soltar?",
  "¿Qué descubriste de tu forma de ser?",
  "¿Qué cambió en tu vínculo cuando cambiaste vos primero?",
  "¿Qué del pasado empezaste a soltar esta semana?",
  "¿Qué pasito de crianza respetuosa te salió?",
  "¿Qué gesto amable tuviste con tu cuerpo?",
  "¿Dónde encontraste un poco de magia esta semana?",
  "¿Por qué tres cosas chiquitas estás agradecida hoy?",
  "¿Qué herramienta del camino te llevás para siempre?",
];

// Encuesta inicial/final — placeholder. Las reales están en GoHighLevel (Sol las carga luego).
export const encuestaInicial = [
  { id: "e1", pregunta: "Hoy, ¿qué tan conectada te sentís con vos misma?", tipo: "escala" },
  { id: "e2", pregunta: "¿Con qué frecuencia reaccionás desde el agotamiento o la culpa?", tipo: "escala" },
  { id: "e3", pregunta: "¿Cómo describirías tu vínculo con tus hijos en este momento?", tipo: "texto" },
  { id: "e4", pregunta: "¿Qué esperás lograr en estas 12 semanas?", tipo: "texto" },
];
export const encuestaFinal = [
  { id: "f1", pregunta: "Hoy, ¿qué tan conectada te sentís con vos misma?", tipo: "escala" },
  { id: "f2", pregunta: "¿Con qué frecuencia reaccionás desde el agotamiento o la culpa?", tipo: "escala" },
  { id: "f3", pregunta: "¿Cómo describirías tu vínculo con tus hijos ahora?", tipo: "texto" },
  { id: "f4", pregunta: "¿Qué te llevás de este camino?", tipo: "texto" },
];

// Pasos de "cómo funciona la app" (onboarding explicativo)
export const comoFunciona = [
  { icono: "☀️", titulo: "Un pasito por día", texto: "Cada día abrís la app y hacés tu ritual de 10 a 15 minutos: cómo estás, tu video, tu actividad y tu semilla. Uno por día, a tu ritmo." },
  { icono: "🌿", titulo: "Tu rueda crece con lo real", texto: "No sumás por ver un video, sumás por lo que cambia de verdad en tu vida. Cada logro que registrás hace crecer tu Rueda de la Vida. A tu ritmo: si un día no podés, tu camino te espera." },
  { icono: "💬", titulo: "Nunca estás sola", texto: "Serena te acompaña siempre que la necesites, y el botón SOS Calma está ahí para los momentos difíciles con tus hijos." },
  { icono: "🎯", titulo: "Un camino con destino", texto: "Paso a paso pasás de sobrevivir el día a reconectar con vos. Al final, tu graduación: tu carta, tu antes y después, y tu Rueda de la Vida entera." },
];

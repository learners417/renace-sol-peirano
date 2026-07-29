// Preguntas interactivas por clase (chequeo amoroso de comprensión).
// Una pregunta por video, 3 opciones tocables. Cualquier respuesta avanza:
// el feedback refuerza la idea central, nunca castiga.
// ok = índice de la opción que mejor refleja el método.

export const QUIZ = {
  v1: { q: "Según Sol, ¿qué es tu mente?", ops: ["Mi enemiga, hay que callarla", "Una herramienta que puedo aprender a observar", "Algo que no se puede cambiar"], ok: 1, tip: "Eso: tu mente no es tu enemiga — es una herramienta. Observarla es el primer paso para que juegue a tu favor." },
  v2: { q: "¿Quién elige el pensamiento que sigue a un evento?", ops: ["El evento lo decide", "Los demás", "Yo, cuando aprendo a parar y elegir"], ok: 2, tip: "Exacto: entre lo que pasa y lo que pensás hay un espacio. Ahí vivís vos." },
  v3: { q: "¿Qué construyen las emociones y creencias?", ops: ["Mi destino", "Nada, son pasajeras", "Solo problemas"], ok: 0, tip: "Sí: lo que sentís y creés todos los días va construyendo tu destino. Por eso las miramos con amor." },
  v4: { q: "Cuando una emoción fuerte aparece, ¿qué propone el método?", ops: ["Taparla y seguir", "Nombrarla y dejarla pasar como una ola", "Descargarla con quien tenga cerca"], ok: 1, tip: "Eso es: nombrarla ya la achica. Las emociones son olas — vienen, se sienten, se van." },
  v5: { q: "¿Las creencias heredadas se pueden cambiar?", ops: ["No, son parte de mí", "Sí: primero las descubro, después elijo nuevas", "Solo con mucha suerte"], ok: 1, tip: "Así es. Lo que heredaste no es una condena: es un punto de partida que hoy podés reescribir." },
  v6: { q: "Conocer tu personalidad sirve para…", ops: ["Etiquetarme y quedarme quieta", "Comprenderme, aceptarme y amarme sin juicios", "Compararme con otras madres"], ok: 1, tip: "Eso: no es una etiqueta, es un mapa. Comprenderte es el principio de tratarte mejor." },
  v7: { q: "Cuando reaccionás 'como siempre', ¿qué está actuando?", ops: ["Mi maldad", "Un patrón aprendido que puedo mirar", "Nada, así soy y punto"], ok: 1, tip: "Exacto: es un patrón, no tu esencia. Y lo que se mira, se puede transformar." },
  v8: { q: "¿Pelear contra tu forma de ser funciona?", ops: ["Sí, con más exigencia", "No: se empieza por aceptar lo que es", "Solo los lunes"], ok: 1, tip: "Sí: la aceptación no es resignación — es el único piso desde donde se cambia de verdad." },
  v9: { q: "¿Qué te hace única según esta clase?", ops: ["Ser perfecta", "Mi combinación irrepetible de historia y forma de ser", "Hacer todo como las demás"], ok: 1, tip: "Eso: no hay otra como vos. Tu forma de ser no es un error a corregir." },
  v10: { q: "¿Todas las personas procesan igual?", ops: ["Sí, hay una forma correcta", "No: cada quien tiene su proceso y su tiempo", "Solo los adultos"], ok: 1, tip: "Exacto. Respetar tu proceso (y el del otro) baja la mitad de las peleas." },
  v11: { q: "El cambio en la pareja empieza por…", ops: ["Cambiar al otro", "Mí: cómo miro y cómo respondo", "Esperar a que se dé"], ok: 1, tip: "Sí: no podés cambiar al otro — podés cambiar la danza. Y cuando una cambia el paso, la danza cambia." },
  v12: { q: "¿Cómo se pide mejor?", ops: ["'Vos nunca…'", "'Necesito…'", "Con indirectas"], ok: 1, tip: "Eso: la queja acusa, el pedido abre. 'Necesito' es una puerta; 'vos nunca' es un muro." },
  v13: { q: "¿Qué comunica más fuerte en tu casa?", ops: ["Lo que digo", "Lo que hago y cómo estoy", "Los sermones largos"], ok: 1, tip: "Así es: tu estado enseña más que tus palabras. Por eso tu calma es el primer mensaje." },
  v14: { q: "El pasado que no se sana…", ops: ["Desaparece solo", "Se repite en cómo crío y cómo reacciono", "No influye en nada"], ok: 1, tip: "Exacto: lo que no se mira, se repite. Mirarlo con amor es cortar la cadena." },
  v15: { q: "Sanar tu historia es…", ops: ["Culpar a mis padres", "Entender, agradecer lo que hubo y soltar lo que pesa", "Olvidar todo"], ok: 1, tip: "Eso: no se trata de culpar ni de olvidar — se trata de soltar el peso para criar liviana." },
  v16: { q: "¿Qué le das a tu hijo cuando te sanás vos?", ops: ["Nada, son cosas mías", "Una madre presente y una cadena que se corta", "Más juguetes"], ok: 1, tip: "Sí: tu sanación es su herencia. Lo que sanás en vos, ya no lo carga él." },
  v17: { q: "Un berrinche es…", ops: ["Un ataque personal contra mí", "Una emoción grande en un cuerpo chiquito", "Pura manipulación"], ok: 1, tip: "Eso: no lo hace contra vos. Está aprendiendo a sentir — y tu calma es su primera herramienta." },
  v18: { q: "¿Qué necesita tu hijo en el momento difícil?", ops: ["Gritos que lo frenen", "Tu presencia estable: 'estoy con vos, ya va a pasar'", "Que lo ignoren"], ok: 1, tip: "Exacto: presencia estable. Sin ceder y sin gritar — con vos de faro, la tormenta pasa antes." },
  v19: { q: "Si explotaste, ¿qué enseña más?", ops: ["Hacer como si nada", "Reparar: 'perdón, mamá se enojó'", "Castigarme una semana"], ok: 1, tip: "Sí: reparar enseña más que no fallar. Le mostrás que el amor sabe pedir perdón." },
  v20: { q: "Tu cuerpo es…", ops: ["Un enemigo que me falla", "Mi casa: la habito y la cuido", "Solo estética"], ok: 1, tip: "Eso: tu cuerpo te sostuvo hasta acá. No se castiga — se agradece y se cuida." },
  v21: { q: "¿Cómo se recupera la energía según el método?", ops: ["Exigiéndome más", "Con gestos chicos y constantes de cuidado", "Con un cambio total de vida en un día"], ok: 1, tip: "Exacto: chiquito y constante le gana a heroico y abandonado. Un gesto por día alcanza." },
  v22: { q: "El descanso es…", ops: ["Un premio que hay que merecer", "Una necesidad que se respeta", "Una pérdida de tiempo"], ok: 1, tip: "Sí: el descanso no se merece — se necesita. Descansar también es cuidar a tu familia." },
  v23: { q: "Moverte y alimentarte bien es un acto de…", ops: ["Vanidad", "Amor propio y ejemplo para tu hijo", "Obligación con culpa"], ok: 1, tip: "Eso: cuidarte es quererte — y es la clase de amor propio que tu hijo va a imitar." },
  v24: { q: "Confiar en la vida significa…", ops: ["No hacer nada", "Hacer mi parte y soltar el control de lo que no depende de mí", "Controlar todo mejor"], ok: 1, tip: "Exacto: hacés tu parte, y soltás el resto. La naturaleza no se apura — y llega." },
  v25: { q: "La gratitud se practica…", ops: ["Solo cuando todo está bien", "Todos los días, con cosas chiquitas", "Nunca, es cursilería"], ok: 1, tip: "Sí: la gratitud se entrena. Diez cositas por día te cambian el lente con el que mirás tu vida." },
  v26: { q: "Las leyes que viste ordenan…", ops: ["Solo a los demás", "Mi vida cuando las reconozco actuando", "Nada, son teoría"], ok: 1, tip: "Eso: cuando las reconocés en tu día, dejás de remar contra la corriente." },
  v27: { q: "Tu paz depende sobre todo de…", ops: ["Que afuera esté todo perfecto", "Cómo elijo estar yo con lo que hay", "La suerte"], ok: 1, tip: "Exacto: la paz no es que no pase nada — es cómo estás vos con lo que pasa." },
  v28: { q: "¿Qué te llevás de este camino?", ops: ["Un curso terminado", "Herramientas mías para siempre — y una nueva versión de mí", "Nada que no supiera"], ok: 1, tip: "Sí. No sos la misma que empezó: volviste a vos. Y lo que aprendiste ya es tuyo, para siempre." },
};

export const quizDe = (videoId) => QUIZ[videoId] || null;

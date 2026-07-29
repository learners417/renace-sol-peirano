// Chequeo amoroso de comprensión: 3 preguntas por clase.
// 1) la idea central · 2) cómo se aplica en su vida · 3) el reencuadre que se lleva.
// Cualquier respuesta avanza: el feedback refuerza, nunca castiga.

export const QUIZ = {
  v1: [
    { q: "Según Sol, ¿qué es tu mente?", ops: ["Mi enemiga, hay que callarla", "Una herramienta que puedo aprender a observar", "Algo que no se puede cambiar"], ok: 1, tip: "Eso: tu mente no es tu enemiga — es una herramienta. Observarla es el primer paso." },
    { q: "Cuando un pensamiento negativo se repite, ¿qué hago primero?", ops: ["Pelearle con fuerza", "Mirarlo sin juzgar, como quien mira pasar un auto", "Distraerme con el celular"], ok: 1, tip: "Exacto: primero se mira. Lo que se observa pierde poder; lo que se pelea, crece." },
    { q: "¿Qué cambia hoy en tu casa con esta clase?", ops: ["Nada, es solo teoría", "Puedo atrapar un pensamiento antes de que me maneje", "Mis hijos se van a portar mejor"], ok: 1, tip: "Sí: el cambio empieza en tu cabeza, tres segundos antes de la escena. Ahí está tu poder." },
  ],
  v2: [
    { q: "¿Quién elige el pensamiento que sigue a un evento?", ops: ["El evento lo decide", "Los demás", "Yo, cuando aprendo a parar y elegir"], ok: 2, tip: "Exacto: entre lo que pasa y lo que pensás hay un espacio. Ahí vivís vos." },
    { q: "La mente que pelea con la realidad…", ops: ["Gana con esfuerzo", "Sufre", "Descansa"], ok: 1, tip: "Eso: aceptar no es rendirse — es dejar de gastar fuerza en lo que no depende de ti." },
    { q: "¿Qué practicás hoy?", ops: ["Decir 'esto es lo que es' ante algo que no puedo cambiar", "Exigirme más", "Evitar todo lo difícil"], ok: 0, tip: "Sí: 'esto es lo que es' baja la pelea interna. Y con la pelea, baja el grito." },
  ],
  v3: [
    { q: "¿Qué construyen las emociones y creencias?", ops: ["Mi destino", "Nada, son pasajeras", "Solo problemas"], ok: 0, tip: "Sí: lo que sentís y creés todos los días va construyendo tu destino. Por eso las miramos con amor." },
    { q: "Tu forma de reaccionar es…", ops: ["Tu esencia inmodificable", "Un camino que el cerebro repitió hasta hacerse automático", "Culpa de los demás"], ok: 1, tip: "Eso: es un camino repetido, no una condena. Cada respuesta nueva abre un camino nuevo." },
    { q: "¿Cómo se reentrena el cerebro?", ops: ["De golpe, con un gran cambio", "Eligiendo una respuesta distinta, por chiquita que sea", "No se puede"], ok: 1, tip: "Exacto: chiquito y repetido le gana a grande y abandonado." },
  ],
  v4: [
    { q: "Cuando una emoción fuerte aparece, ¿qué propone el método?", ops: ["Taparla y seguir", "Nombrarla y dejarla pasar como una ola", "Descargarla con quien tenga cerca"], ok: 1, tip: "Eso es: nombrarla ya la achica. Las emociones son olas — vienen, se sienten, se van." },
    { q: "Nombrar 'esto es enojo' sirve porque…", ops: ["Lo hace desaparecer mágicamente", "Pone distancia: yo no SOY el enojo, lo estoy sintiendo", "Asusta a los demás"], ok: 1, tip: "Sí: vos no sos tu emoción. Sentís enojo — y eso pasa." },
    { q: "¿Qué hacés hoy cuando aparezca una emoción grande?", ops: ["La escondo", "Le pongo nombre en el momento", "Se la echo en cara a alguien"], ok: 1, tip: "Eso: nombrarla en el momento. Es un músculo — hoy lo empezás a entrenar." },
  ],
  v5: [
    { q: "¿Las creencias heredadas se pueden cambiar?", ops: ["No, son parte de mí", "Sí: primero las descubro, después elijo nuevas", "Solo con mucha suerte"], ok: 1, tip: "Así es. Lo que heredaste no es una condena: es un punto de partida que hoy podés reescribir." },
    { q: "'Tengo que poder con todo' es…", ops: ["Una verdad universal", "Una creencia aprendida que se puede soltar", "Un buen consejo"], ok: 1, tip: "Exacto: es aprendida — y lo aprendido se desaprende. Nadie puede con todo, y está bien." },
    { q: "El primer paso para cambiar una creencia es…", ops: ["Verla de frente y preguntarme si es mía", "Taparla con frases positivas", "Esperar que se vaya sola"], ok: 0, tip: "Sí: verla. Una creencia vista de frente ya no gobierna a escondidas." },
  ],
  v6: [
    { q: "Conocer tu personalidad sirve para…", ops: ["Etiquetarme y quedarme quieta", "Comprenderme, aceptarme y amarme sin juicios", "Compararme con otras madres"], ok: 1, tip: "Eso: no es una etiqueta, es un mapa. Comprenderte es el principio de tratarte mejor." },
    { q: "Cuando entendés POR QUÉ reaccionás así…", ops: ["Te da lo mismo", "Se te saca un peso: deja de ser 'soy mala' y pasa a ser 'así aprendí'", "Tenés excusa para todo"], ok: 1, tip: "Sí: comprender no es excusar — es dejar de castigarte para poder cambiar en serio." },
    { q: "¿Con qué mirada te observás hoy?", ops: ["Con lupa de jueza", "Con curiosidad y ternura, como mirarías a una amiga", "Mejor no mirarme"], ok: 1, tip: "Eso: curiosidad y ternura. Así se mira lo que se quiere sanar." },
  ],
  v7: [
    { q: "Cuando reaccionás 'como siempre', ¿qué está actuando?", ops: ["Mi maldad", "Un patrón aprendido que puedo mirar", "Nada, así soy y punto"], ok: 1, tip: "Exacto: es un patrón, no tu esencia. Y lo que se mira, se puede transformar." },
    { q: "¿Los demás procesan igual que vos?", ops: ["Sí, hay una sola forma correcta", "No: cada uno tiene su proceso y su tiempo", "Solo los adultos"], ok: 1, tip: "Eso: respetar tu proceso (y el del otro) baja la mitad de las peleas de una casa." },
    { q: "Hoy, ante tu reacción típica, ¿qué probás?", ops: ["Frenar un segundo y mirarla sin juzgarme", "Reaccionar más fuerte", "Culparme toda la tarde"], ok: 0, tip: "Sí: un segundo de mirada corta el automático. Es poco — y lo cambia todo." },
  ],
  v8: [
    { q: "¿Pelear contra tu forma de ser funciona?", ops: ["Sí, con más exigencia", "No: se empieza por aceptar lo que es", "Solo los lunes"], ok: 1, tip: "Sí: la aceptación no es resignación — es el único piso desde donde se cambia de verdad." },
    { q: "Aceptarte significa…", ops: ["Que nada va a cambiar", "Darte el mismo trato amoroso que le das a tus hijos", "Bajar los brazos"], ok: 1, tip: "Eso: el amor que repartís todo el día también es para vos. De ahí nace tu mejor versión." },
    { q: "¿Qué soltás hoy?", ops: ["La exigencia de ser perfecta", "Mis ganas de mejorar", "Mi descanso"], ok: 0, tip: "Sí: perfecta no — presente. Tu familia no necesita una madre perfecta: te necesita a vos, en paz." },
  ],
  v9: [
    { q: "¿Qué te hace única según esta clase?", ops: ["Ser perfecta", "Mi combinación irrepetible de historia y forma de ser", "Hacer todo como las demás"], ok: 1, tip: "Eso: no hay otra como vos. Tu forma de ser no es un error a corregir." },
    { q: "Compararte con otras madres…", ops: ["Te motiva siempre", "Te roba la paz: cada una carga una historia distinta", "Es obligatorio"], ok: 1, tip: "Sí: comparás tu detrás de escena con la vidriera de otra. Soltá esa vara: es injusta con vos." },
    { q: "Hoy elegís mirarte…", ops: ["Con los ojos de las redes", "Con tus propios ojos: lo que ya lograste y nadie ve", "Con los ojos de tu suegra"], ok: 1, tip: "Eso: tus logros invisibles cuentan. Hoy empezamos a hacerlos visibles." },
  ],
  v10: [
    { q: "¿Todas las personas procesan igual?", ops: ["Sí, hay una forma correcta", "No: cada quien tiene su proceso y su tiempo", "Solo los adultos"], ok: 1, tip: "Exacto. Respetar tu proceso (y el del otro) baja la mitad de las peleas." },
    { q: "Cuando tu pareja o tu hijo reaccionan distinto a vos…", ops: ["Lo hacen para molestarte", "Están procesando a su manera, con su historia", "Están mal y hay que corregirlos"], ok: 1, tip: "Sí: distinto no es en contra. Entender eso desarma la mitad de los choques." },
    { q: "¿Qué mirás hoy en tu casa?", ops: ["Quién tiene razón", "Cómo procesa cada uno, con curiosidad", "Quién empezó"], ok: 1, tip: "Eso: cambiar 'quién tiene razón' por 'cómo lo vive cada uno' cambia la conversación entera." },
  ],
  v11: [
    { q: "El cambio en la pareja empieza por…", ops: ["Cambiar al otro", "Mí: cómo miro y cómo respondo", "Esperar a que se dé"], ok: 1, tip: "Sí: no podés cambiar al otro — podés cambiar la danza. Y cuando una cambia el paso, la danza cambia." },
    { q: "Si él 'no ayuda en nada', ¿por dónde arranca el método?", ops: ["Por un reproche más fuerte", "Por cómo pido y cómo miro yo, sin esperar cambio inmediato", "Por rendirme"], ok: 1, tip: "Eso: tu movimiento nuevo abre espacio para un movimiento nuevo del otro. Siempre empieza en una." },
    { q: "¿Qué gesto hacés hoy?", ops: ["Uno chiquito hacia él, sin esperar nada a cambio", "Ninguno hasta que él cambie", "Una lista de reclamos"], ok: 0, tip: "Sí: un gesto sin factura. Es semilla, no pago — y las semillas crecen." },
  ],
  v12: [
    { q: "¿Cómo se pide mejor?", ops: ["'Vos nunca…'", "'Necesito…'", "Con indirectas"], ok: 1, tip: "Eso: la queja acusa, el pedido abre. 'Necesito' es una puerta; 'vos nunca' es un muro." },
    { q: "¿Por qué las indirectas no funcionan?", ops: ["Porque el otro no adivina: lo que no se pide claro, no llega", "Porque son de mala educación", "Sí funcionan"], ok: 0, tip: "Sí: nadie adivina cansado a las 9 de la noche. Claro y amable gana siempre." },
    { q: "Hoy transformás UNA queja en…", ops: ["Un pedido concreto que empieza con 'necesito'", "Un silencio de tres días", "Un mensaje pasivo-agresivo"], ok: 0, tip: "Eso: una sola queja transformada hoy. Vas a ver la diferencia en la respuesta." },
  ],
  v13: [
    { q: "¿Qué comunica más fuerte en tu casa?", ops: ["Lo que digo", "Lo que hago y cómo estoy", "Los sermones largos"], ok: 1, tip: "Así es: tu estado enseña más que tus palabras. Por eso tu calma es el primer mensaje." },
    { q: "Si les hablás de calma a los gritos…", ops: ["Aprenden calma", "Aprenden gritos: el ejemplo le gana al discurso", "No aprenden nada"], ok: 1, tip: "Eso: se aprende lo que se respira en casa. Tu trabajo interior ES la educación." },
    { q: "¿Cuál es tu comunicación de hoy?", ops: ["Un sermón bien armado", "Mi propio estado: llegar más entera a la escena difícil", "Subir el volumen"], ok: 1, tip: "Sí: trabajás en vos y toda la casa lo recibe. Ese es el atajo real." },
  ],
  v14: [
    { q: "El pasado que no se sana…", ops: ["Desaparece solo", "Se repite en cómo crío y cómo reacciono", "No influye en nada"], ok: 1, tip: "Exacto: lo que no se mira, se repite. Mirarlo con amor es cortar la cadena." },
    { q: "Reaccionás desproporcionado a algo chico. Muchas veces eso es…", ops: ["Mal carácter", "Una herida vieja tocada, no la escena de hoy", "Hambre"], ok: 1, tip: "Sí: cuando la reacción es más grande que el hecho, habla el pasado. Verlo ya te da margen." },
    { q: "Mirar tu historia hoy es un acto de…", ops: ["Masoquismo", "Valentía y amor: por vos y por tus hijos", "Pérdida de tiempo"], ok: 1, tip: "Eso: lo hacés por las dos — por la que fuiste y por los que criás." },
  ],
  v15: [
    { q: "Sanar tu historia es…", ops: ["Culpar a mis padres", "Entender, agradecer lo que hubo y soltar lo que pesa", "Olvidar todo"], ok: 1, tip: "Eso: no se trata de culpar ni de olvidar — se trata de soltar el peso para criar liviana." },
    { q: "Tus padres hicieron…", ops: ["Todo mal", "Lo que pudieron con lo que tenían — y aun así, lo que dolió, dolió", "Todo perfecto"], ok: 1, tip: "Sí: las dos cosas son ciertas a la vez. Comprender no borra tu dolor — lo abraza." },
    { q: "¿Qué le escribís hoy a tu versión de antes?", ops: ["Un reproche", "Dos líneas de lo que necesitaba escuchar", "Nada, mejor no tocar eso"], ok: 1, tip: "Eso: dos líneas de ternura. La que fuiste todavía las está esperando." },
  ],
  v16: [
    { q: "¿Qué le das a tu hijo cuando te sanás vos?", ops: ["Nada, son cosas mías", "Una madre presente y una cadena que se corta", "Más juguetes"], ok: 1, tip: "Sí: tu sanación es su herencia. Lo que sanás en vos, ya no lo carga él." },
    { q: "'No tengo tiempo para sanarme' — el método responde:", ops: ["Es verdad, dejalo para otra vida", "Sanarte ES criar: cada minuto tuyo le llega a ellos multiplicado", "Sanarse es de egoístas"], ok: 1, tip: "Eso: no es tiempo que les sacás — es calma que les devolvés." },
    { q: "La cadena familiar se corta cuando…", ops: ["Alguien se anima a mirar lo que duele", "Pasa el tiempo", "Nadie habla del tema"], ok: 0, tip: "Sí: alguien tiene que animarse primero. En tu familia, esa valiente sos vos." },
  ],
  v17: [
    { q: "Un berrinche es…", ops: ["Un ataque personal contra mí", "Una emoción grande en un cuerpo chiquito", "Pura manipulación"], ok: 1, tip: "Eso: no lo hace contra vos. Está aprendiendo a sentir — y tu calma es su primera herramienta." },
    { q: "En medio del berrinche, tu hijo necesita…", ops: ["Un discurso largo", "Tu presencia estable mientras la ola baja", "Que grites más fuerte que él"], ok: 1, tip: "Sí: primero se acompaña la emoción, después se conversa. En medio de la ola no se enseña — se sostiene." },
    { q: "¿Qué te decís hoy cuando explote el berrinche?", ops: ["'Lo hace a propósito'", "'Está desbordado, no es contra mí — yo soy el faro'", "'Soy un desastre'"], ok: 1, tip: "Eso: vos sos el faro. Y el faro no se apaga con la tormenta." },
  ],
  v18: [
    { q: "¿Qué necesita tu hijo en el momento difícil?", ops: ["Gritos que lo frenen", "Tu presencia estable: 'estoy con vos, ya va a pasar'", "Que lo ignoren"], ok: 1, tip: "Exacto: presencia estable. Sin ceder y sin gritar — con vos de faro, la tormenta pasa antes." },
    { q: "Poner un límite con amor es…", ops: ["Contradictorio", "Sostener el 'no' con calma, sin castigo ni grito", "Ceder para que no llore"], ok: 1, tip: "Sí: firme en el límite, suave en el trato. Esa mezcla es la que educa de verdad." },
    { q: "Hoy, en el momento tenso, probás decir…", ops: ["'Estoy con vos, ya va a pasar'", "'Andate a tu cuarto ya'", "Nada, me voy yo"], ok: 0, tip: "Eso: siete palabras que cambian la escena. Practicalas hoy — funcionan." },
  ],
  v19: [
    { q: "Si explotaste, ¿qué enseña más?", ops: ["Hacer como si nada", "Reparar: 'perdón, mamá se enojó'", "Castigarme una semana"], ok: 1, tip: "Sí: reparar enseña más que no fallar. Le mostrás que el amor sabe pedir perdón." },
    { q: "Pedirle perdón a tu hijo…", ops: ["Te quita autoridad", "Te la da: le enseña que los vínculos se reparan", "Lo confunde"], ok: 1, tip: "Eso: la autoridad real nace del respeto, no del miedo. Reparar es liderazgo amoroso." },
    { q: "Después de un mal momento, hoy…", ops: ["Lo tapo con tele", "Reparo con palabras simples y un abrazo", "Me castigo toda la noche"], ok: 1, tip: "Sí: reparás con él — y también con vos. La culpa suelta; la reparación construye." },
  ],
  v20: [
    { q: "Tu cuerpo es…", ops: ["Un enemigo que me falla", "Mi casa: la habito y la cuido", "Solo estética"], ok: 1, tip: "Eso: tu cuerpo te sostuvo hasta acá. No se castiga — se agradece y se cuida." },
    { q: "Ese cansancio que arrastrás es…", ops: ["Debilidad tuya", "Tu cuerpo hablándote: pide cuidado, no exigencia", "Normal, ignoralo"], ok: 1, tip: "Sí: el cuerpo no traiciona — avisa. Escucharlo es el primer cuidado." },
    { q: "Hoy tratás a tu cuerpo como…", ops: ["Una máquina que tiene que rendir", "La casa donde vive todo lo demás", "Un tema para septiembre"], ok: 1, tip: "Eso: si la casa se cae, nada adentro funciona. Cuidarla es cuidarlos a todos." },
  ],
  v21: [
    { q: "¿Cómo se recupera la energía según el método?", ops: ["Exigiéndome más", "Con gestos chicos y constantes de cuidado", "Con un cambio total de vida en un día"], ok: 1, tip: "Exacto: chiquito y constante le gana a heroico y abandonado. Un gesto por día alcanza." },
    { q: "¿Cuál de estos ES un gesto que cuenta?", ops: ["Un vaso más de agua hoy", "Correr una maratón mañana", "Dormir 12 horas el sábado y nada más"], ok: 0, tip: "Sí: el vaso de agua cuenta. La energía se construye de a monedas, no de a golpes." },
    { q: "Cuando falles un día, ¿qué hacés?", ops: ["Abandono todo, ya está", "Retomo al día siguiente sin culpa: la constancia perdona pausas", "Me castigo doble"], ok: 1, tip: "Eso: la constancia real incluye recaídas. Se retoma, no se recomienza desde cero." },
  ],
  v22: [
    { q: "El descanso es…", ops: ["Un premio que hay que merecer", "Una necesidad que se respeta", "Una pérdida de tiempo"], ok: 1, tip: "Sí: el descanso no se merece — se necesita. Descansar también es cuidar a tu familia." },
    { q: "Cuando descansás, tu familia recibe…", ops: ["Menos de vos", "Una madre más entera: tu descanso les llega a ellos", "Nada"], ok: 1, tip: "Eso: no les quitás tiempo — les devolvés presencia. Es matemática del amor." },
    { q: "Hoy te das permiso de…", ops: ["Un rato de descanso SIN culpa", "Descansar solo si termino todo (o sea nunca)", "Nada, aguanto"], ok: 0, tip: "Sí: sin culpa. La culpa arruina el descanso y te deja doble de cansada." },
  ],
  v23: [
    { q: "Moverte y alimentarte bien es un acto de…", ops: ["Vanidad", "Amor propio y ejemplo para tu hijo", "Obligación con culpa"], ok: 1, tip: "Eso: cuidarte es quererte — y es la clase de amor propio que tu hijo va a imitar." },
    { q: "Tu hijo aprende a cuidarse…", ops: ["De los sermones sobre verduras", "De verte a vos cuidándote", "De internet"], ok: 1, tip: "Sí: te mira más de lo que te escucha. Tu gesto de hoy es su hábito de mañana." },
    { q: "¿Cuál es la vara del método?", ops: ["Perfección o nada", "Mejor que ayer, aunque sea un poquito", "Lo que hagan las demás"], ok: 1, tip: "Eso: un poquito mejor que ayer. Esa vara sí se puede sostener toda la vida." },
  ],
  v24: [
    { q: "Confiar en la vida significa…", ops: ["No hacer nada", "Hacer mi parte y soltar el control de lo que no depende de mí", "Controlar todo mejor"], ok: 1, tip: "Exacto: hacés tu parte, y soltás el resto. La naturaleza no se apura — y llega." },
    { q: "¿Qué pasa cuando querés controlarlo TODO?", ops: ["Todo sale perfecto", "Te agotás: cargás cosas que nunca fueron tuyas", "Los demás te lo agradecen"], ok: 1, tip: "Sí: la mitad de tu cansancio es control de lo incontrolable. Soltarlo es descanso instantáneo." },
    { q: "Hoy soltás el control de…", ops: ["UNA cosa que no depende de vos", "Todo de golpe", "Nada, sin control se cae todo"], ok: 0, tip: "Eso: una sola. Mirá qué pasa cuando confiás — casi siempre, la vida responde." },
  ],
  v25: [
    { q: "La gratitud se practica…", ops: ["Solo cuando todo está bien", "Todos los días, con cosas chiquitas", "Nunca, es cursilería"], ok: 1, tip: "Sí: la gratitud se entrena. Diez cositas por día te cambian el lente con el que mirás tu vida." },
    { q: "¿Qué hace la gratitud en el cerebro de una mamá agotada?", ops: ["Nada medible", "Le entrena la mirada: empieza a encontrar lo bueno en automático", "La duerme"], ok: 1, tip: "Eso: el cerebro busca lo que entrenás. Si buscás bueno, encontrás bueno — y el día pesa menos." },
    { q: "'No tengo nada que agradecer hoy' — el método dice:", ops: ["Entonces no agradezcas", "Empezá por lo mínimo: el mate caliente, que respiran, que llegaste", "Inventá algo grande"], ok: 1, tip: "Sí: chiquito vale. La gratitud no necesita un día perfecto — necesita un ojo entrenado." },
  ],
  v26: [
    { q: "Las leyes que viste ordenan…", ops: ["Solo a los demás", "Mi vida cuando las reconozco actuando", "Nada, son teoría"], ok: 1, tip: "Eso: cuando las reconocés en tu día, dejás de remar contra la corriente." },
    { q: "Lo que sembrás todos los días (pensamientos, gestos, palabras)…", ops: ["Se pierde", "Vuelve: la vida devuelve lo que se siembra", "Depende de la suerte"], ok: 1, tip: "Sí: tu casa cosecha lo que sembrás. Por eso sembramos calma, aunque cueste." },
    { q: "Hoy buscás una ley actuando en…", ops: ["Tu propio día, en algo concreto", "Un documental", "La vida de otra"], ok: 0, tip: "Eso: verla en TU día la vuelve tuya. La teoría se hace vida cuando la reconocés en tu cocina." },
  ],
  v27: [
    { q: "Tu paz depende sobre todo de…", ops: ["Que afuera esté todo perfecto", "Cómo elijo estar yo con lo que hay", "La suerte"], ok: 1, tip: "Exacto: la paz no es que no pase nada — es cómo estás vos con lo que pasa." },
    { q: "Esperar el 'momento perfecto' para estar en paz…", ops: ["Es sabio", "Es posponerla para siempre: la paz se elige en medio del lío", "Funciona a veces"], ok: 1, tip: "Sí: con hijos, el momento perfecto no existe. La paz se practica con ruido de fondo." },
    { q: "Hoy tu paz vive en…", ops: ["Las circunstancias", "Tu respiración, tu mirada, tus elecciones chiquitas", "El futuro"], ok: 1, tip: "Eso: está más cerca de lo que pensás. A un minuto de respiración de distancia." },
  ],
  v28: [
    { q: "¿Qué te llevás de este camino?", ops: ["Un curso terminado", "Herramientas mías para siempre — y una nueva versión de mí", "Nada que no supiera"], ok: 1, tip: "Sí. No sos la misma que empezó: volviste a vos. Y lo que aprendiste ya es tuyo, para siempre." },
    { q: "Renacer fue posible porque…", ops: ["Tuviste suerte", "Hiciste el trabajo, día por día, aunque estuvieras cansada", "Alguien lo hizo por vos"], ok: 1, tip: "Eso: fuiste vos. Cada micro-sesión, cada práctica, cada registro. Este renacer es TUYO." },
    { q: "¿Y ahora?", ops: ["Se terminó todo", "Lo que construiste se sostiene practicándolo — renacer es el comienzo", "A esperar que dure solo"], ok: 1, tip: "Sí: el camino te dio las herramientas; la vida es donde se usan. Y no estás sola para sostenerlo." },
  ],
};

export const quizDe = (videoId) => QUIZ[videoId] || null;

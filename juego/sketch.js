// HUNTRIX: Idols by Day, Hunters by Night
// Por: Azul Ibáñez Presa (Legajo 122734/1)
// Basado en la película "Kpop Demon Hunters"

let estadoActual = 0;
let imagenes = [];
let sonidos = {};
let musicaActual = null;
let pantallas = [];

function preload() {
  // Cargar imágenes
  let nombres = ['portada', 'ensayo', 'ruidos', 'ataque.ensayo', 'backstage.encuentro',
                 'rumivsjinu', 'traicion.rumores', 'ruptura', 'rumisola', 'jinu.llorando',
                 'despierta.gwima', 'reencuentro', 'rumisola', 'creditos'];
  
  for (let i = 0; i < nombres.length; i++) {
    imagenes[i] = loadImage('data/' + nombres[i] + (i === 13 ? '.png' : '.jpeg'));
  }
  
  imagenes[14] = loadImage('data/f1.honmoon.jpeg');
  imagenes[15] = loadImage('data/f2.poseida.jpeg');
  imagenes[16] = loadImage('data/f3.beso.jpeg');
  
  // Cargar sonidos
  let nombresSonidos = ['portada', 'ensayo', 'rugido', 'demonio', 'audiencia', 
                        'demonio2', 'golden', 'free', 'youridol'];
  for (let nombre of nombresSonidos) {
    sonidos[nombre] = loadSound('data/' + nombre + '.mp3');
  }
}

function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  textFont('Arial');
  
  // DEFINIR TODAS LAS PANTALLAS
  pantallas = [
    // 0 - PORTADA
    {
      img: 0,
      texto: "",
      botones: [
        {texto: "COMENZAR", x: 150, y: 380, w: 170, h: 60, siguiente: 1, musica: 'ensayo'},
        {texto: "CRÉDITOS", x: 330, y: 380, w: 170, h: 60, siguiente: 13, musica: null}
      ]
    },
    // 1 - ENSAYO
    {
      img: 1,
      texto: "Huntrix está ensayando para su\npróximo concierto.\n¡Todo parece ir perfecto!",
      botones: [
        {texto: "Continuar →", x: 220, y: 410, w: 200, h: 50, siguiente: 2, efecto: 'rugido', musica: null}
      ]
    },
    // 2 - RUIDOS
    {
      img: 2,
      texto: "Un ruido extraño provenía de la puerta...\nAlgo no estaba bien.\n¿Qué debería hacer Rumi?",
      botones: [
        {texto: "Ignorar la vibración", x: 60, y: 410, w: 220, h: 60, siguiente: 3, musica: 'demonio'},
        {texto: "Investigar la vibración", x: 360, y: 410, w: 220, h: 60, siguiente: 4, musica: null}
      ]
    },
    // 3 - ATAQUE
    {
      img: 3,
      texto: "En los espejos se ve algo...\n¡Es un ataque demoníaco!\n¿Qué hará el grupo?",
      botones: [
        {texto: "Usar armas mágicas", x: 60, y: 410, w: 220, h: 60, siguiente: 5, musica: null},
        {texto: "Escapar al backstage", x: 360, y: 410, w: 220, h: 60, siguiente: 4, musica: null}
      ]
    },
    // 4 - BACKSTAGE
    {
      img: 4,
      texto: "En el backstage oscuro aparece...\n¡Jinu, el esclavo de Gwi-ma!\nSu mirada se ve sospechosa...\n¿Qué hará Rumi?",
      botones: [
        {texto: "Hablar con Jinu", x: 60, y: 410, w: 220, h: 60, siguiente: 9, musica: null},
        {texto: "Atacarlo", x: 360, y: 410, w: 220, h: 60, siguiente: 5, musica: 'demonio'}
      ]
    },
    // 5 - RUMI VS JINU
    {
      img: 5,
      texto: "La transformación de Jinu sorprendio a Rumi.\n¡Era un desafío!.\nRumi sintió que necesitab hacer algo pero ya...",
      botones: [
        {texto: "Cantar 'Takedown'", x: 60, y: 410, w: 220, h: 60, siguiente: 6, efecto: 'audiencia'},
        {texto: "Intentar escapar", x: 360, y: 410, w: 220, h: 60, siguiente: 6, efecto: 'audiencia'}
      ]
    },
    // 6 - TRAICIÓN
    {
      img: 6,
      texto: "Jinu esparce rumores sobre Rumi siendo esclavada de Gwi-ma.\nMira y Zoey se sienten traicionadas.\n¿Qué hará Rumi?",
      botones: [
        {texto: "Pedir perdón", x: 60, y: 410, w: 220, h: 60, siguiente: 7, musica: null},
        {texto: "Culpar a Jinu", x: 360, y: 410, w: 220, h: 60, siguiente: 7, musica: null}
      ]
    },
    // 7 - RUPTURA
    {
      img: 7,
      texto: "Huntrix se separa...\nRumi debe decidir su camino:\n¿luchar sola o buscar ayuda?",
      botones: [
        {texto: "Buscar a Jinu", x: 60, y: 410, w: 220, h: 60, siguiente: 9, musica: null},
        {texto: "Luchar sola", x: 360, y: 410, w: 220, h: 60, siguiente: 8, musica: 'rugido'}
      ]
    },
    // 8 - RUMI SOLA
    {
      img: 8,
      texto: "Rumi decide enfrentarse sola\na los demonios.\nPero la batalla es demasiado difícil...",
      botones: [
        {texto: "Ver Final →", x: 220, y: 410, w: 200, h: 60, siguiente: 15, musica: 'youridol'}
      ]
    },
    // 9 - JINU LLORANDO
    {
      img: 9,
      texto: "Jinu revela su pasado oscuro:\nÉl también tiene sangre demoníaca.\nPor eso comprende a Rumi.",
      botones: [
        {texto: "Aceptar su ayuda", x: 60, y: 410, w: 220, h: 60, siguiente: 10, musica: null},
        {texto: "Rechazarlo", x: 360, y: 410, w: 220, h: 60, siguiente: 10, musica: 'demonio'}
      ]
    },
    // 10 - DESPIERTA GWI-MA
    {
      img: 10,
      texto: "¡Gwi-Ma, el demonio ancestral,\ndespierta! Solo un canto perfecto\npuede sellarlo. Rumi debe actuar.",
      botones: [
        {texto: "Formar grupo unido", x: 60, y: 410, w: 220, h: 60, siguiente: 11, musica: null},
        {texto: "Intentar sellar sola", x: 360, y: 410, w: 220, h: 60, siguiente: 12, musica: 'demonio'}
      ]
    },
    // 11 - REENCUENTRO
    {
      img: 11,
      texto: "¡Mira y Zoey regresan!\nHuntrix se reúne para el canto final.\n¿Qué estrategia usarán?",
      botones: [
        {texto: "Cantar 'Golden'", x: 60, y: 410, w: 220, h: 60, siguiente: 14, musica: 'golden'},
        {texto: "Usar alma de Jinu", x: 360, y: 410, w: 220, h: 60, siguiente: 16, musica: 'free'}
      ]
    },
    // 12 - RUMI SOLA VS GWI-MA
    {
      img: 12,
      texto: "Rumi enfrenta a Gwi-Ma sola.\nSu poder demoníaco despierta.\n¿Podrá controlarlo?",
      botones: [
        {texto: "Ver Final →", x: 220, y: 410, w: 200, h: 60, siguiente: 15, musica: 'youridol'}
      ]
    },
    // 13 - CRÉDITOS
    {
      img: 13,
      texto: "",
      botones: [
        {texto: "VOLVER AL INICIO", x: 220, y: 420, w: 200, h: 50, siguiente: 0, musica: 'portada'}
      ]
    },
    // 14 - FINAL 1 (BUENO)
    {
      img: 14,
      texto: "🌟 FINAL 1 🌟\nLa Luz del Honmoon\n\nHuntrix derrota a Gwi-Ma.\n¡El grupo conquista los escenarios!",
      botones: [
        {texto: "VOLVER AL INICIO", x: 220, y: 400, w: 200, h: 60, siguiente: 0, musica: 'portada'}
      ]
    },
    // 15 - FINAL 2 (MALO)
    {
      img: 15,
      texto: "💀 FINAL 2 💀\nCaída del Mundo\n\nRumi se convierte en demonio.\nEl mundo cae en oscuridad.",
      botones: [
        {texto: "VOLVER AL INICIO", x: 220, y: 400, w: 200, h: 60, siguiente: 0, musica: 'portada'}
      ]
    },
    // 16 - FINAL 3 (ALTERNATIVO)
    {
      img: 16,
      texto: "💫 FINAL 3 💫\nRedención de las Sombras\n\nJinu sacrifica su alma...\nRumi honra su memoria...",
      botones: [
        {texto: "VOLVER AL INICIO", x: 220, y: 400, w: 200, h: 60, siguiente: 0, musica: 'portada'}
      ]
    }
  ];
  
  reproducirMusica(sonidos.portada);
}

function draw() {
  background(0);
  
  let p = pantallas[estadoActual];
  
  // Dibujar imagen de fondo
  image(imagenes[p.img], 0, 0, 640, 480);
  
  // Dibujar texto (si hay y obvi q hay)
  if (p.texto !== "") {
    cuadroTexto(p.texto, 50, 280, 540, 120);
  }
  
  // Dibujar todos los botones
  for (let i = 0; i < p.botones.length; i++) {
    let b = p.botones[i];
    boton(b.texto, b.x, b.y, b.w, b.h);
  }
}

// FUNCIONES AUXILIARES

function cuadroTexto(texto, x, y, ancho, alto) {
  fill(0, 0, 0, 180);
  rect(x, y, ancho, alto, 10);
  fill(255);
  textSize(15);
  text(texto, x + ancho/2, y + alto/2);
}

function boton(texto, x, y, ancho, alto) {
  if (sobreArea(x, y, ancho, alto)) {
    fill(150, 50, 200, 220);
  } else {
    fill(80, 30, 120, 200);
  }
  rect(x, y, ancho, alto, 10);
  fill(255);
  textSize(16);
  text(texto, x + ancho/2, y + alto/2);
}

function sobreArea(x, y, ancho, alto) {
  return mouseX > x && mouseX < x + ancho && 
         mouseY > y && mouseY < y + alto;
}

function reproducirMusica(sonido) {
  if (musicaActual && musicaActual.isPlaying()) {
    musicaActual.stop();
  }
  if (sonido && !sonido.isPlaying()) {
    sonido.loop();
    musicaActual = sonido;
  }
}

function reproducirEfecto(sonido) {
  if (sonido) {
    sonido.play();
  }
}

// INTERACCIÓN 

function mousePressed() {
  let p = pantallas[estadoActual];
  
  for (let i = 0; i < p.botones.length; i++) {
    let b = p.botones[i];
    
    if (sobreArea(b.x, b.y, b.w, b.h)) {
      // detener musica actual
      if (musicaActual && musicaActual.isPlaying()) {
        musicaActual.stop();
      }
      
      // cambiar de pantalla
      estadoActual = b.siguiente;
      
      // reproducir nueva musica si hay
      if (b.musica) {
        reproducirMusica(sonidos[b.musica]);
      }
      
      // reproducir efecto si hay
      if (b.efecto) {
        reproducirEfecto(sonidos[b.efecto]);
      }
      
      break;
    }
  }
}

// ATAJOS DE TECLADO 

function keyPressed() {
  if (key === 'r' || key === 'R') {
    estadoActual = 0;
    reproducirMusica(sonidos.portada);
  }
  if (key === '1') {
    estadoActual = 14;
    reproducirMusica(sonidos.golden);
  }
  if (key === '2') {
    estadoActual = 15;
    reproducirMusica(sonidos.youridol);
  }
  if (key === '3') {
    estadoActual = 16;
    reproducirMusica(sonidos.free);
  }
  if (key === 'm' || key === 'M') {
    if (musicaActual && musicaActual.isPlaying()) {
      musicaActual.pause();
    } else if (musicaActual) {
      musicaActual.play();
    }
  }
}
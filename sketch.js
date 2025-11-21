// HUNTRIX: Idols by Day, Hunters by Night
// Por: Azul Ibáñez Presa (Legajo 122734/1)
// Basado en la película "Kpop Demon Hunters"
// Profesor: Matías 

let estadoActual = 'p0';
let imagenes = [];
let sonidos = {};
let musicaActual = null;

// PRELOAD - Carga todas las imágenes y sonidos
function preload() {
  // Cargar imágenes
  imagenes[0] = loadImage('data/portada.jpeg');
  imagenes[1] = loadImage('data/ensayo.jpeg');
  imagenes[2] = loadImage('data/ruidos.jpeg');
  imagenes[3] = loadImage('data/ataque.ensayo.jpeg');
  imagenes[4] = loadImage('data/backstage.encuentro.jpeg');
  imagenes[5] = loadImage('data/rumivsjinu.jpeg');
  imagenes[6] = loadImage('data/traicion.rumores.jpeg');
  imagenes[7] = loadImage('data/ruptura.jpeg');
  imagenes[8] = loadImage('data/rumisola.jpeg');
  imagenes[9] = loadImage('data/jinu.llorando.jpeg');
  imagenes[10] = loadImage('data/despierta.gwima.jpeg');
  imagenes[11] = loadImage('data/reencuentro.jpeg');
  imagenes[12] = loadImage('data/rumisola.jpeg');
  imagenes[13] = loadImage('data/creditos.png');
  
  imagenes['final1'] = loadImage('data/f1.honmoon.jpeg');
  imagenes['final2'] = loadImage('data/f2.poseida.jpeg');
  imagenes['final3'] = loadImage('data/f3.beso.jpeg');
  
  // Cargar sonidos (SIN .mp3.mp3, solo .mp3)
  sonidos.portada = loadSound('data/portada.mp3');
  sonidos.ensayo = loadSound('data/ensayo.mp3');
  sonidos.rugido = loadSound('data/rugido.mp3');
  sonidos.demonio = loadSound('data/demonio.mp3');
  sonidos.audiencia = loadSound('data/audiencia.mp3');
  sonidos.demonio2 = loadSound('data/demonio2.mp3');
  sonidos.golden = loadSound('data/golden.mp3');
  sonidos.free = loadSound('data/free.mp3');
  sonidos.youridol = loadSound('data/youridol.mp3');
}
// SETUP - Configuración inicial
function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont('Arial');
  
  // Reproducir música de portada
  reproducirMusica(sonidos.portada);
}

// DRAW - Dibuja la pantalla actual
function draw() {
  background(0);
  
  // Mostrar la pantalla correspondiente
  if (estadoActual === 'p0') pantalla0();
  else if (estadoActual === 'p1') pantalla1();
  else if (estadoActual === 'p2') pantalla2();
  else if (estadoActual === 'p3') pantalla3();
  else if (estadoActual === 'p4') pantalla4();
  else if (estadoActual === 'p5') pantalla5();
  else if (estadoActual === 'p6') pantalla6();
  else if (estadoActual === 'p7') pantalla7();
  else if (estadoActual === 'p8') pantalla8();
  else if (estadoActual === 'p9') pantalla9();
  else if (estadoActual === 'p10') pantalla10();
  else if (estadoActual === 'p11') pantalla11();
  else if (estadoActual === 'p12') pantalla12();
  else if (estadoActual === 'p13') pantalla13();
  else if (estadoActual === 'final1') pantallaFinal1();
  else if (estadoActual === 'final2') pantallaFinal2();
  else if (estadoActual === 'final3') pantallaFinal3();
}

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

// Dibuja un cuadro de texto con fondo
function cuadroTexto(texto, x, y, ancho, alto) {
  fill(0, 0, 0, 180);
  rect(x, y, ancho, alto, 10);
  fill(255);
  textSize(18);
  text(texto, x + ancho/2, y + alto/2);
  textSize(20);
}

// Dibuja un botón interactivo
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
  textSize(20);
}

// Verifica si el mouse está sobre un área
function sobreArea(x, y, ancho, alto) {
  return mouseX > x && mouseX < x + ancho && 
         mouseY > y && mouseY < y + alto;
}

// ========================================
// SISTEMA DE SONIDOS
// ========================================

// Reproduce una música (detiene la anterior)
function reproducirMusica(sonido) {
  // Si hay música sonando y es diferente, detenerla
  if (musicaActual && musicaActual.isPlaying()) {
    musicaActual.stop();
  }
  
  // Reproducir nueva música en loop
  if (sonido && !sonido.isPlaying()) {
    sonido.loop();
    musicaActual = sonido;
  }
}

// Reproduce un efecto de sonido SIN detener la música
function reproducirEfecto(sonido) {
  if (sonido) {
    sonido.play();
  }
}

// ========================================
// PANTALLAS DEL JUEGO
// ========================================

// PANTALLA 0 - Portada
function pantalla0() {
  image(imagenes[0], 0, 0, 640, 480);
  boton("COMENZAR", 150, 380, 170, 60);
  boton("CRÉDITOS", 330, 380, 170, 60);
}

// PANTALLA 1 - Ensayo
function pantalla1() {
  image(imagenes[1], 0, 0, 640, 480);
  cuadroTexto("Huntrix está ensayando para su\npróximo concierto.\n¡Todo parece ir perfecto!", 50, 320, 540, 120);
  boton("Continuar →", 220, 410, 200, 50);
}

// PANTALLA 2 - Ruidos misteriosos
function pantalla2() {
  image(imagenes[2], 0, 0, 640, 480);
  cuadroTexto("De repente, una extraña vibración\nrecorre el lugar...\n¿Qué debería hacer Rumi?", 50, 280, 540, 120);
  boton("Ignorar la vibración", 60, 410, 220, 60);
  boton("Investigar la vibración", 360, 410, 220, 60);
}

// PANTALLA 3 - Ataque en el ensayo
function pantalla3() {
  image(imagenes[3], 0, 0, 640, 480);
  cuadroTexto("¡Las luces se vuelven rojas!\n¡Es un ataque demoníaco!\n¿Qué hará el grupo?", 50, 280, 540, 120);
  boton("Usar armas mágicas", 60, 410, 220, 60);
  boton("Escapar al backstage", 360, 410, 220, 60);
}

// PANTALLA 4 - Encuentro en el backstage
function pantalla4() {
  image(imagenes[4], 0, 0, 640, 480);
  cuadroTexto("En el backstage oscuro aparece...\n¡Jinu, el idol desaparecido!\nSus ojos brillan extrañamente.", 50, 280, 540, 120);
  boton("Hablar con Jinu", 60, 410, 220, 60);
  boton("Atacarlo", 360, 410, 220, 60);
}

// PANTALLA 5 - Rumi vs Jinu
function pantalla5() {
  image(imagenes[5], 0, 0, 640, 480);
  cuadroTexto("¡Jinu propone un duelo musical!\nRumi debe elegir su canción.\n¿Cuál será?", 50, 280, 540, 120);
  boton("Cantar 'Takedown'", 60, 410, 220, 60);
  boton("Intentar escapar", 360, 410, 220, 60);
}

// PANTALLA 6 - Traición y rumores
function pantalla6() {
  image(imagenes[6], 0, 0, 640, 480);
  cuadroTexto("Jinu esparce rumores sobre Rumi.\nMira y Zoey se sienten traicionadas.\n¿Qué hará Rumi?", 50, 280, 540, 120);
  boton("Pedir perdón", 60, 410, 220, 60);
  boton("Culpar a Jinu", 360, 410, 220, 60);
}

// PANTALLA 7 - Ruptura del grupo
function pantalla7() {
  image(imagenes[7], 0, 0, 640, 480);
  cuadroTexto("Huntrix se separa.\nRumi debe decidir su camino:\n¿luchar sola o buscar ayuda?", 50, 280, 540, 120);
  boton("Buscar a Jinu", 60, 410, 220, 60);
  boton("Luchar sola", 360, 410, 220, 60);
}

// PANTALLA 8 - Rumi sola → FINAL 2
function pantalla8() {
  image(imagenes[8], 0, 0, 640, 480);
  cuadroTexto("Rumi decide enfrentarse sola\na los demonios.\nPero la batalla es demasiado difícil...", 50, 280, 540, 120);
  boton("Ver Final →", 220, 410, 200, 60);
}

// PANTALLA 9 - Jinu llorando
function pantalla9() {
  image(imagenes[9], 0, 0, 640, 480);
  cuadroTexto("Jinu revela su pasado oscuro:\nÉl también tiene sangre demoníaca.\nPor eso comprende a Rumi.", 50, 280, 540, 120);
  boton("Aceptar su ayuda", 60, 410, 220, 60);
  boton("Rechazarlo", 360, 410, 220, 60);
}

// PANTALLA 10 - Despierta Gwi-Ma
function pantalla10() {
  image(imagenes[10], 0, 0, 640, 480);
  cuadroTexto("¡Gwi-Ma, el demonio ancestral,\ndespierta! Solo un canto perfecto\npuede sellarlo. Rumi debe actuar.", 50, 280, 540, 120);
  boton("Formar grupo unido", 60, 410, 220, 60);
  boton("Intentar sellar sola", 360, 410, 220, 60);
}

// PANTALLA 11 - Reencuentro
function pantalla11() {
  image(imagenes[11], 0, 0, 640, 480);
  cuadroTexto("¡Mira y Zoey regresan!\nHuntrix se reúne para el canto final.\n¿Qué estrategia usarán?", 50, 280, 540, 120);
  boton("Cantar 'Golden'", 60, 410, 220, 60);
  boton("Usar alma de Jinu", 360, 410, 220, 60);
}

// PANTALLA 12 - Rumi sola contra Gwi-Ma → FINAL 2
function pantalla12() {
  image(imagenes[12], 0, 0, 640, 480);
  cuadroTexto("Rumi enfrenta a Gwi-Ma sola.\nSu poder demoníaco despierta.\n¿Podrá controlarlo?", 50, 280, 540, 120);
  boton("Ver Final →", 220, 410, 200, 60);
}

// PANTALLA 13 - Créditos
function pantalla13() {
  image(imagenes[13], 0, 0, 640, 480);
  boton("VOLVER AL INICIO", 220, 420, 200, 50);
}

// ========================================
// FINALES
// ========================================

// FINAL 1 - La Luz del Honmoon (Bueno)
function pantallaFinal1() {
  image(imagenes['final1'], 0, 0, 640, 480);
  
  cuadroTexto("🌟 FINAL 1 🌟\n" +
              "La Luz del Honmoon\n\n" +
              "Huntrix derrota a Gwi-Ma\n" +
              "con su canto unido.\n" +
              "Rumi y Jinu controlan\n" +
              "su poder demoníaco.\n" +
              "¡El grupo conquista\n" +
              "los escenarios!", 
              50, 80, 540, 280);
  
  boton("VOLVER AL INICIO", 220, 400, 200, 60);
}

// FINAL 2 - Caída del Mundo (Malo)
function pantallaFinal2() {
  image(imagenes['final2'], 0, 0, 640, 480);
  
  cuadroTexto("💀 FINAL 2 💀\n" +
              "Caída del Mundo\n\n" +
              "Rumi no puede controlar\n" +
              "su poder demoníaco.\n" +
              "Se convierte en demonio.\n" +
              "El mundo cae en oscuridad.\n" +
              "Huntrix se pierde\n" +
              "para siempre.", 
              50, 80, 540, 280);
  
  boton("VOLVER AL INICIO", 220, 400, 200, 60);
}

// FINAL 3 - Redención de las Sombras (Alternativo)
function pantallaFinal3() {
  image(imagenes['final3'], 0, 0, 640, 480);
  
  cuadroTexto("💫 FINAL 3 💫\n" +
              "Redención de las Sombras\n\n" +
              "El sello se mantiene pero\n" +
              "Jinu sacrifica su alma.\n" +
              "Rumi continúa con Huntrix,\n" +
              "honrando su memoria.\n" +
              "Una leyenda triste\n" +
              "pero hermosa.", 
              50, 80, 540, 280);
  
  boton("VOLVER AL INICIO", 220, 400, 200, 60);
}

// ========================================
// CONTROL DE CLICKS + SONIDOS
// ========================================
function mousePressed() {
  // PANTALLA 0 - Portada
  if (estadoActual === 'p0') {
    if (sobreArea(150, 380, 170, 60)) {
      estadoActual = 'p1';
      reproducirMusica(sonidos.ensayo);
    }
    if (sobreArea(330, 380, 170, 60)) {
      estadoActual = 'p13';
    }
  }
  
  // PANTALLA 1
  else if (estadoActual === 'p1') {
    if (sobreArea(220, 410, 200, 50)) {
      estadoActual = 'p2';
      reproducirEfecto(sonidos.rugido);
    }
  }
  
  // PANTALLA 2
  else if (estadoActual === 'p2') {
    if (sobreArea(60, 410, 220, 60)) {
      estadoActual = 'p3';
      reproducirMusica(sonidos.demonio);
    }
    if (sobreArea(360, 410, 220, 60)) {
      estadoActual = 'p4';
      reproducirMusica(sonidos.demonio);
    }
  }
  
  // PANTALLA 3
  else if (estadoActual === 'p3') {
    if (sobreArea(60, 410, 220, 60)) estadoActual = 'p5';
    if (sobreArea(360, 410, 220, 60)) estadoActual = 'p4';
  }
  
  // PANTALLA 4
  else if (estadoActual === 'p4') {
    if (sobreArea(60, 410, 220, 60)) estadoActual = 'p9';
    if (sobreArea(360, 410, 220, 60)) estadoActual = 'p5';
  }
  
  // PANTALLA 5
  else if (estadoActual === 'p5') {
    if (sobreArea(60, 410, 220, 60)) {
      estadoActual = 'p6';
      reproducirMusica(sonidos.demonio2);
    }
    if (sobreArea(360, 410, 220, 60)) estadoActual = 'p6';
  }
  
  // PANTALLA 6
  else if (estadoActual === 'p6') {
    if (sobreArea(60, 410, 220, 60)) estadoActual = 'p7';
    if (sobreArea(360, 410, 220, 60)) estadoActual = 'p7';
  }
  
  // PANTALLA 7
  else if (estadoActual === 'p7') {
    if (sobreArea(60, 410, 220, 60)) estadoActual = 'p9';
    if (sobreArea(360, 410, 220, 60)) estadoActual = 'p8';
  }
  
  // PANTALLA 8 → FINAL 2
  else if (estadoActual === 'p8') {
    if (sobreArea(220, 410, 200, 60)) {
      estadoActual = 'final2';
      reproducirMusica(sonidos.free);
    }
  }
  
  // PANTALLA 9
  else if (estadoActual === 'p9') {
    if (sobreArea(60, 410, 220, 60)) estadoActual = 'p10';
    if (sobreArea(360, 410, 220, 60)) estadoActual = 'p10';
  }
  
  // PANTALLA 10
  else if (estadoActual === 'p10') {
    if (sobreArea(60, 410, 220, 60)) {
      estadoActual = 'p11';
      reproducirMusica(sonidos.audiencia);
    }
    if (sobreArea(360, 410, 220, 60)) estadoActual = 'p12';
  }
  
  // PANTALLA 11
  else if (estadoActual === 'p11') {
    if (sobreArea(60, 410, 220, 60)) {
      estadoActual = 'final1';
      reproducirMusica(sonidos.golden);
    }
    if (sobreArea(360, 410, 220, 60)) {
      estadoActual = 'final3';
      reproducirMusica(sonidos.youridol);
    }
  }
  
  // PANTALLA 12 → FINAL 2
  else if (estadoActual === 'p12') {
    if (sobreArea(220, 410, 200, 60)) {
      estadoActual = 'final2';
      reproducirMusica(sonidos.free);
    }
  }
  
  // PANTALLA 13 - Créditos
  else if (estadoActual === 'p13') {
    if (sobreArea(220, 420, 200, 50)) {
      estadoActual = 'p0';
      reproducirMusica(sonidos.portada);
    }
  }
  
  // FINALES - Volver al inicio
  else if (estadoActual === 'final1' || estadoActual === 'final2' || estadoActual === 'final3') {
    if (sobreArea(220, 400, 200, 60)) {
      estadoActual = 'p0';
      reproducirMusica(sonidos.portada);
    }
  }
}

// ========================================
// ATAJOS DE TECLADO (para testear)
// ========================================
function keyPressed() {
  // Presiona 'R' para reiniciar
  if (key === 'r' || key === 'R') {
    estadoActual = 'p0';
    reproducirMusica(sonidos.portada);
  }
  
  // Presiona '1' para ir a Final 1
  if (key === '1') {
    estadoActual = 'final1';
    reproducirMusica(sonidos.golden);
  }
  
  // Presiona '2' para ir a Final 2
  if (key === '2') {
    estadoActual = 'final2';
    reproducirMusica(sonidos.free);
  }
  
  // Presiona '3' para ir a Final 3
  if (key === '3') {
    estadoActual = 'final3';
    reproducirMusica(sonidos.youridol);
  }
  
  // Presiona 'M' para mutear/desmutear
  if (key === 'm' || key === 'M') {
    if (musicaActual && musicaActual.isPlaying()) {
      musicaActual.pause();
    } else if (musicaActual) {
      musicaActual.play();
    }
  }
}
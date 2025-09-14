// VARIABLES GLOBALES
let referencia;
let rotacion = 0;
let rotacionOriginal = 0;
let colorBlanco;
let colorBlancoOriginal;

// FUNCIÓN DE PRECARGA (se ejecuta ANTES que setup)
function preload() {
  referencia = loadImage("F_24.png");
}

// FUNCIÓN DE CONFIGURACIÓN (se ejecuta UNA vez al inicio)
function setup() {
  createCanvas(800, 400);
  referencia.resize(400, 400);

  // Inicializar variables (SI O SI AQUI RIGHT NOW, no antes)
  colorBlanco = color(255);
  colorBlancoOriginal = colorBlanco;
  rotacionOriginal = rotacion;
}

// FUNCIÓN PRINCIPAL (se ejecuta 60 veces por seg)
function draw() {
  background(255);

  // IMAGEN DE REFERENCIA
  image(referencia, 0, 0);

  // LÍNEA EN EL MEDIO PARA DIVIDIR
  stroke(255);
  strokeWeight(5);
  line(400, 0, 400, 400);

  // LADO DERECHO
  push();
  translate(400, 0);

  // FONDO NEGRO
  noStroke();
  fill(0);
  rect(0, 0, 400, 400);

  // CUADRADOS GRANDES BLANCOS DE FONDO (SIN ROTAR)
  fill(colorBlanco);
  for (let i = 25; i < 380; i += 190) {          // Columnas: i = 25, 215
    for (let y = 25; y < 380; y += 190) {        // Filas: y = 25, 215
      rect(i, y, 165, 165);                      // 4 cuadrados blancos de 165x165
    }
  }

  // CUADRADOS NEGROS MEDIANOS (ROTABLES)
  for (let i = 50; i < 380; i += 190) {          // Columnas: i = 50, 240
    for (let y = 50; y < 380; y += 190) {        // Filas: y = 50, 240
      // i+57.5 y y+57.5 centra el cuadrado: 50 + 115/2 = 107.5
      dibujarCuadrado(i + 57.5, y + 57.5, 115, color(0), rotacion);
    }
  }

  // CUADRADOS BLANCOS CHICOS (ROTABLES)
  for (let i = 75; i < 380; i += 190) {          // Columnas: i = 75, 265
    for (let y = 75; y < 380; y += 190) {        // Filas: y = 75, 265
      // i+32.5 y y+32.5 centra el cuadrado: 75 + 65/2 = 107.5
      dibujarCuadrado(i + 32.5, y + 32.5, 65, colorBlanco, rotacion);
    }
  }

  // CUADRADOS CONCÉNTRICOS DEL CENTRO (SIN ARRAYS!!!!!)
  let centroX = 205;
  let centroY = 205;

  // Tamaños individuales (sin arrays)
  let tamanoGrande = 200;
  let tamanoMedio1 = 155;
  let tamanoMedio2 = 115;
  let tamanoChico = 70;        // VALOR FIJO (sin función)
  let tamanoMuyChico = 35;     // VALOR FIJO (tamanoChico / 2)

  // Colores individuales (sin arrays)
  let color1 = color(0);
  let color2 = colorBlanco;
  let color3 = color(0);
  let color4 = colorBlanco;
  let color5 = color(0);

  // Dibujar cuadrados concéntricos uno por uno (sin arrays)
  dibujarCuadrado(centroX, centroY, tamanoGrande, color1, rotacion);
  dibujarCuadrado(centroX, centroY, tamanoMedio1, color2, rotacion);
  dibujarCuadrado(centroX, centroY, tamanoMedio2, color3, rotacion);
  dibujarCuadrado(centroX, centroY, tamanoChico, color4, rotacion);
  dibujarCuadrado(centroX, centroY, tamanoMuyChico, color5, rotacion);

  pop();
}

// FUNCIÓN: Dibuja UN cuadrado rotado en posición específica
function dibujarCuadrado(x, y, tamano, colorRelleno, angulo) {
  push();
  translate(x, y);
  rotate(radians(angulo));
  fill(colorRelleno);
  rect(-tamano/2, -tamano/2, tamano, tamano);
  pop();
}


// Teclas:
// "C" para cambiar de color
// "A" / "D" para rotar 5 grados
// "R" reinicia las variables desde el principio

function keyPressed() {
  if (key == 'c' || key == 'C') {
    colorBlanco = color(random(255), random(255), random(255));
  }
  if (key == 'a' || key == 'A') {
    rotacion -= 5;
  }
  if (key == 'd' || key == 'D') {
    rotacion += 5;
  }
  if (key == 'r' || key == 'R') {
    reiniciarVariables();
  }
}

// REINICIAR VARIABLES
function reiniciarVariables() {
  colorBlanco = colorBlancoOriginal;
  rotacion = rotacionOriginal;
}

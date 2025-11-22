// HUNTRIX MINIJUEGO - parte 2
// Por: Azul Ibáñez Presa (Legajo 122734/1)
// Profe: Matías 

let miJuego;
let imagenes = {};
let sonidos = {};


// PRELOAD
function preload() {
  // Imágenes principales
  imagenes.portada = loadImage('data/portada.jpeg');
  imagenes.fondo = loadImage('data/fondo.jpeg');
  imagenes.partidaganada = loadImage('data/partidaganada.jpg');
  imagenes.partidaperdida = loadImage('data/partidaperdida.jpg');
  imagenes.creditos = loadImage('data/creditos.png');
  
  // Personaje y escudo (PNG)
  imagenes.rumi = loadImage('data/rumi.png');
  imagenes.escudo = loadImage('data/escudo.png');
  
  // Obstáculos (PNG)
  imagenes.alarota = loadImage('data/alarota.png');
  imagenes.parterota = loadImage('data/parterota.png');
  imagenes.puertarota = loadImage('data/puertarota.png');
  imagenes.ruedarota = loadImage('data/ruedarota.png');
  imagenes.sillarota = loadImage('data/sillarota.png');
  
  // Sonidos (MP3)
  sonidos.portada = loadSound('data/portada.mp3');
  sonidos.juego = loadSound('data/juego.mp3');
  sonidos.ganas = loadSound('data/ganas.mp3');
  sonidos.perdes = loadSound('data/perdes.mp3');
}


// SETUP
function setup() {
  createCanvas(640, 480);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  miJuego = new Juego();
}

// DRAW
function draw() {
  miJuego.dibujar();
}


// CONTROLES
function keyPressed() {
  miJuego.teclear(keyCode);
}

function mousePressed() {
  miJuego.manejarClicks(mouseX, mouseY);
}

// CLASE JUEGO
class Juego {
  constructor() {
    // ESTADOS: 0=MENU, 1=JUGANDO, 2=GANAR, 3=PERDER, 4=INSTRUCCIONES, 5=CREDITOS
    this.estado = 0;
    this.obstaculosEsquivados = 0;
    this.meta = 15; // Esquivar 15 obstáculos para ganar
    this.jugador = null;
    this.obstaculos = [];
    this.fondoX1 = 0;
    this.fondoX2 = 640;
    this.velocidadJuego = 6;
    this.musicaActual = null;
    
    // Reproducir música del menú
    this.cambiarMusica('portada');
  }
  
  cambiarMusica(nombreSonido) {
    if (!sonidos[nombreSonido]) return;
    
    if (this.musicaActual && this.musicaActual.isPlaying()) {
      this.musicaActual.stop();
    }
    
    this.musicaActual = sonidos[nombreSonido];
    this.musicaActual.loop();
  }
  
  detenerMusica() {
    if (this.musicaActual && this.musicaActual.isPlaying()) {
      this.musicaActual.stop();
    }
  }
  
  dibujar() {
    if (this.estado === 0) this.mostrarMenu();
    else if (this.estado === 1) this.jugar();
    else if (this.estado === 2) this.pantallaGanaste();
    else if (this.estado === 3) this.pantallaPerdiste();
    else if (this.estado === 4) this.mostrarInstrucciones();
    else if (this.estado === 5) this.mostrarCreditos();
  }
  
  jugar() {
    // Fondo 
    this.dibujarFondoMovil();
    
    // Rumi
    this.jugador.mover();
    this.jugador.dibujar();
    
    // Crear obstáculos
    if (frameCount % 60 === 0) {
      this.obstaculos.push(new Obstaculo());
    }
    
    // Actualizar obstáculos
    for (let i = this.obstaculos.length - 1; i >= 0; i--) {
      let obs = this.obstaculos[i];
      obs.mover(this.velocidadJuego);
      obs.dibujar();
      
      // Colisión
      if (this.jugador.colisionaCon(obs)) {
        if (this.jugador.escudo.estaActivo) {
          // Con escudo: destruye el obstáculo
          this.obstaculos.splice(i, 1);
        } else {
          // Sin escudo: pierde una vida
          this.jugador.vidas--;
          this.obstaculos.splice(i, 1);
          
          // Si se acabaron las vidas: GAME OVER
          if (this.jugador.vidas <= 0) {
            this.estado = 3;
            this.cambiarMusica('perdes');
          }
        }
      }
      // Salió de pantalla
      else if (obs.x < -50) {
        this.obstaculosEsquivados++;
        this.obstaculos.splice(i, 1);
      }
    }
    
    // Verificar victoria
    if (this.obstaculosEsquivados >= this.meta) {
      this.estado = 2;
      this.cambiarMusica('ganas');
    }
    
    // HUD
    this.dibujarHUD();
  }
  
  dibujarFondoMovil() {
    this.fondoX1 -= this.velocidadJuego * 0.3;
    this.fondoX2 -= this.velocidadJuego * 0.3;
    
    if (this.fondoX1 < -640) this.fondoX1 = this.fondoX2 + 640;
    if (this.fondoX2 < -640) this.fondoX2 = this.fondoX1 + 640;
    
    imageMode(CORNER);
    image(imagenes.fondo, this.fondoX1, 0, 640, 480);
    image(imagenes.fondo, this.fondoX2, 0, 640, 480);
    imageMode(CENTER);
  }
  
  dibujarHUD() {
    fill(0, 0, 0, 150);
    rectMode(CORNER);
    rect(0, 0, 640, 60);
    rectMode(CENTER);
    
    fill(255);
    textSize(20);
    textAlign(LEFT, CENTER);
    text("❤️ Vidas: " + this.jugador.vidas, 20, 30);
    
    textAlign(CENTER, CENTER);
    text("✨ Esquivados: " + this.obstaculosEsquivados + " / " + this.meta, 320, 30);
    
    textAlign(RIGHT, CENTER);
    this.jugador.escudo.mostrarInfoUI();
  }
  
  mostrarMenu() {
    imageMode(CORNER);
    image(imagenes.portada, 0, 0, 640, 480);
    imageMode(CENTER);
    
    // Botones MÁS PEQUEÑOS y más abajo
    this.dibujarBoton("JUGAR", 320, 370, 160, 40);
    this.dibujarBoton("INSTRUCCIONES", 320, 420, 160, 40);
    this.dibujarBoton("CRÉDITOS", 320, 465, 160, 40);
  }
  
  mostrarInstrucciones() {
    background(20, 10, 40);
    fill(255, 100, 200);
    textSize(36);
    text("📖 INSTRUCCIONES", width/2, 50);
    
    fill(255);
    textSize(18);
    textAlign(LEFT, CENTER);
    text("🎯 OBJETIVO: Esquiva 15 obstáculos para salvar la ciudad", 60, 120);
    
    text("🎮 CONTROLES:", 60, 180);
    text("   ↑ Flecha ARRIBA: Mover arriba", 60, 210);
    text("   ↓ Flecha ABAJO: Mover abajo", 60, 240);
    text("   ESPACIO: Activar escudo (2 usos)", 60, 270);
    
    text("❤️  VIDAS: Tienes 3 vidas. Pierdes si chocas 3 veces.", 60, 320);
    text("🛡️  ESCUDO: El escudo te protege por 3 segundos.", 60, 350);
    
    textAlign(CENTER, CENTER);
    this.dibujarBoton("VOLVER AL MENÚ", 320, 420, 180, 45);
  }
  
  mostrarCreditos() {
    imageMode(CORNER);
    image(imagenes.creditos, 0, 0, 640, 480);
    imageMode(CENTER);
    
    this.dibujarBoton("VOLVER AL MENÚ", 320, 420, 180, 45);
  }
  
  pantallaGanaste() {
    imageMode(CORNER);
    image(imagenes.partidaganada, 0, 0, 640, 480);
    imageMode(CENTER);
    
    fill(0, 0, 0, 150);
    rectMode(CORNER);
    rect(0, 0, 640, 480);
    rectMode(CENTER);
    
    fill(100, 255, 100);
    textSize(56);
    textAlign(CENTER, CENTER);
    text("🎉 ¡VICTORIA! 🎉", width/2, 80);
    
    fill(255);
    textSize(22);
    text("¡Rumi sobrevivió la caída!", width/2, 150);
    text("Los demonios no pudieron alcanzarla.", width/2, 185);
    text("La ciudad está a salvo... por ahora.", width/2, 220);
    
    fill(200, 255, 200);
    textSize(20);
    text("✨ Obstáculos esquivados: " + this.obstaculosEsquivados, width/2, 270);
    
    this.dibujarBoton("JUGAR DE NUEVO", 320, 350, 180, 45);
    this.dibujarBoton("MENÚ", 320, 410, 180, 45);
  }
  
  pantallaPerdiste() {
    imageMode(CORNER);
    image(imagenes.partidaperdida, 0, 0, 640, 480);
    imageMode(CENTER);
    
    fill(0, 0, 0, 150);
    rectMode(CORNER);
    rect(0, 0, 640, 480);
    rectMode(CENTER);
    
    fill(255, 100, 100);
    textSize(56);
    textAlign(CENTER, CENTER);
    text("💀 GAME OVER 💀", width/2, 80);
    
    fill(255);
    textSize(22);
    text("Los demonios te alcanzaron...", width/2, 150);
    text("La ciudad se tiñe de rojo.", width/2, 185);
    text("El caos comienza a extenderse.", width/2, 220);
    
    fill(255, 200, 200);
    textSize(20);
    text("✨ Obstáculos esquivados: " + this.obstaculosEsquivados, width/2, 270);
    
    this.dibujarBoton("INTENTAR DE NUEVO", 320, 350, 200, 45);
    this.dibujarBoton("MENÚ", 320, 410, 180, 45);
  }
  
  dibujarBoton(texto, x, y, ancho, alto) {
    let mitadAncho = ancho / 2;
    let mitadAlto = alto / 2;
    
    if (this.botonPresionado(mouseX, mouseY, x, y, ancho, alto)) {
      fill(150, 50, 200, 220);
    } else {
      fill(80, 30, 120, 200);
    }
    rect(x, y, ancho, alto, 10);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(texto, x, y);
  }
  
  botonPresionado(mx, my, x, y, ancho, alto) {
    let mitadAncho = ancho / 2;
    let mitadAlto = alto / 2;
    return (mx > x - mitadAncho && mx < x + mitadAncho && 
            my > y - mitadAlto && my < y + mitadAlto);
  }
  
  manejarClicks(mx, my) {
    if (this.estado === 0) {
      if (this.botonPresionado(mx, my, 320, 370, 160, 40)) this.reiniciarPartida();
      if (this.botonPresionado(mx, my, 320, 420, 160, 40)) {
        this.estado = 4;
        this.detenerMusica();
      }
      if (this.botonPresionado(mx, my, 320, 465, 160, 40)) {
        this.estado = 5;
        this.detenerMusica();
      }
    } else if (this.estado === 4) {
      if (this.botonPresionado(mx, my, 320, 420, 180, 45)) {
        this.estado = 0;
        this.cambiarMusica('portada');
      }
    } else if (this.estado === 5) {
      if (this.botonPresionado(mx, my, 320, 420, 180, 45)) {
        this.estado = 0;
        this.cambiarMusica('portada');
      }
    } else if (this.estado === 2) {
      if (this.botonPresionado(mx, my, 320, 350, 180, 45)) this.reiniciarPartida();
      if (this.botonPresionado(mx, my, 320, 410, 180, 45)) {
        this.estado = 0;
        this.cambiarMusica('portada');
      }
    } else if (this.estado === 3) {
      if (this.botonPresionado(mx, my, 320, 350, 200, 45)) this.reiniciarPartida();
      if (this.botonPresionado(mx, my, 320, 410, 180, 45)) {
        this.estado = 0;
        this.cambiarMusica('portada');
      }
    }
  }
  
  teclear(k) {
    if (this.estado === 1) {
      if (k === 32) { // ESPACIO
        this.jugador.activarEscudo();
      } else if (k === UP_ARROW) {
        this.jugador.moverACarril(this.jugador.carrilActual - 1);
      } else if (k === DOWN_ARROW) {
        this.jugador.moverACarril(this.jugador.carrilActual + 1);
      }
    }
  }
  
  reiniciarPartida() {
    this.obstaculos = [];
    this.jugador = new Jugador();
    this.obstaculosEsquivados = 0;
    this.velocidadJuego = 6;
    this.fondoX1 = 0;
    this.fondoX2 = 640;
    this.estado = 1;
    this.cambiarMusica('juego');
  }
}

// CLASE JUGADOR
class Jugador {
  constructor() {
    this.x = 100;
    this.carriles = [120, 240, 360];
    this.carrilActual = 1;
    this.y = this.carriles[this.carrilActual];
    this.ancho = 160; // MÁS GRANDE
    this.alto = 180; // MÁS GRANDE
    this.velocidadCambio = 15;
    this.vidas = 3;
    this.escudo = new Escudo();
  }
  
  activarEscudo() {
    this.escudo.activar();
  }
  
  moverACarril(nuevoCarril) {
    if (nuevoCarril >= 0 && nuevoCarril < this.carriles.length) {
      this.carrilActual = nuevoCarril;
    }
  }
  
  mover() {
    let yObjetivo = this.carriles[this.carrilActual];
    if (this.y < yObjetivo) {
      this.y += this.velocidadCambio;
      if (this.y > yObjetivo) this.y = yObjetivo;
    } else if (this.y > yObjetivo) {
      this.y -= this.velocidadCambio;
      if (this.y < yObjetivo) this.y = yObjetivo;
    }
    this.escudo.actualizarTiempo();
  }
  
  dibujar() {
    this.escudo.dibujarEfecto(this.x, this.y);
    image(imagenes.rumi, this.x, this.y, this.ancho, this.alto);
  }
  
  colisionaCon(obs) {
    let distancia = dist(this.x, this.y, obs.x, obs.y);
    return distancia < (this.ancho/2 + obs.ancho/2);
  }
}


// CLASE ESCUDO
class Escudo {
  constructor() {
    this.usosRestantes = 2;
    this.estaActivo = false;
    this.duracion = 180; // 3 segundos (60 fps * 3)
    this.contadorTiempo = 0;
  }
  
  activar() {
    if (!this.estaActivo && this.usosRestantes > 0) {
      this.estaActivo = true;
      this.usosRestantes--;
      this.contadorTiempo = this.duracion;
    }
  }
  
  actualizarTiempo() {
    if (this.estaActivo) {
      this.contadorTiempo--;
      if (this.contadorTiempo <= 0) this.estaActivo = false;
    }
  }
  
  dibujarEfecto(jx, jy) {
    if (this.estaActivo) {
      let pulso = sin(frameCount * 0.1) * 10 + 110;
      tint(255, 255, 255, pulso);
      image(imagenes.escudo, jx, jy, 140, 140);
      noTint();
      
      noFill();
      stroke(255, 200, 50, pulso);
      strokeWeight(3);
      ellipse(jx, jy, 150, 150);
      noStroke();
    }
  }
  
  mostrarInfoUI() {
    fill(255);
    textSize(18);
    textAlign(RIGHT, CENTER);
    text("🛡️ x" + this.usosRestantes, 590, 30);
    if (this.estaActivo) {
      fill(255, 255, 0);
      textSize(16);
      text("¡PROTEGIDO!", 590, 50);
    }
  }
}

// CLASE OBSTÁCULO
class Obstaculo {
  constructor() {
    this.x = 640 + 50;
    this.carriles = [120, 240, 360];
    this.carril = floor(random(0, 3));
    this.y = this.carriles[this.carril];
    this.ancho = 80;
    this.alto = 80;
    this.angulo = 0;
    this.velocidadRotacion = random(-0.03, 0.03);
    
    let tipos = ['alarota', 'parterota', 'puertarota', 'ruedarota', 'sillarota'];
    this.tipo = random(tipos);
    this.imagen = imagenes[this.tipo];
  }
  
  mover(velocidad) {
    this.x -= velocidad;
    this.angulo += this.velocidadRotacion;
  }
  
  dibujar() {
    push();
    translate(this.x, this.y);
    rotate(this.angulo);
    image(this.imagen, 0, 0, this.ancho, this.alto);
    pop();
  }
}
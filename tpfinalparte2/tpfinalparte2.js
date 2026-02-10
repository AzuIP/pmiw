// HUNTRIX MINIJUEGO - parte 2
// Por: Azul Ibáñez Presa (Legajo 122734/1)
// Profe: Matías 

let juego;
let imagenes = {};
let sonidos = {};

// preload
function preload() {
  // imagenes principales
  imagenes.portada = loadImage('data/portada.jpeg');
  imagenes.fondo = loadImage('data/fondo.jpeg');
  imagenes.ganaste = loadImage('data/partidaganada.jpg');
  imagenes.perdiste = loadImage('data/partidaperdida.jpg');
  imagenes.creditos = loadImage('data/creditos.png');
  
  // personaje y escudo
  imagenes.rumi = loadImage('data/rumi.png');
  imagenes.escudo = loadImage('data/escudo.png');
  
  // obstaculos
  imagenes.alarota = loadImage('data/alarota.png');
  imagenes.parterota = loadImage('data/parterota.png');
  imagenes.puertarota = loadImage('data/puertarota.png');
  imagenes.ruedarota = loadImage('data/ruedarota.png');
  imagenes.sillarota = loadImage('data/sillarota.png');
  
  // sonidos
  sonidos.portada = loadSound('data/portada.mp3');
  sonidos.juego = loadSound('data/juego.mp3');
  sonidos.ganas = loadSound('data/ganas.mp3');
  sonidos.perdes = loadSound('data/perdes.mp3');
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego();
}

function draw() {
  juego.dibujar();
}

function keyPressed() {
  juego.teclear(keyCode, key);
}

function mousePressed() {
  juego.manejarClicks(mouseX, mouseY);
}

// CLASE JUEGO
class Juego {
  constructor() {
    // estados: 0=menu, 1=jugando, 2=ganaste, 3=perdiste, 4=instrucciones, 5=creditos
    this.estado = 0;
    this.puntaje = 0;
    this.meta = 15;
    this.jugador = null;
    this.obstaculos = [];
    this.fondoX1 = 0;
    this.fondoX2 = 640;
    this.velocidad = 6;
    this.musicaActual = null;
    this.muteado = false;
    
    this.reproducirMusica('portada');
  }
  
  reproducirMusica(nombre) {
    if (!sonidos[nombre]) return;
    
    if (this.musicaActual && this.musicaActual.isPlaying()) {
      this.musicaActual.stop();
    }
    
    this.musicaActual = sonidos[nombre];
    if (!this.muteado) {
      this.musicaActual.loop();
    }
  }
  
  toggleMute() {
    this.muteado = !this.muteado;
    if (this.muteado) {
      if (this.musicaActual && this.musicaActual.isPlaying()) {
        this.musicaActual.pause();
      }
    } else {
      if (this.musicaActual && !this.musicaActual.isPlaying()) {
        this.musicaActual.loop();
      }
    }
  }
  
  pararMusica() {
    if (this.musicaActual && this.musicaActual.isPlaying()) {
      this.musicaActual.stop();
    }
  }
  
  dibujar() {
    // resetea todo al principio de cada frame
    rectMode(CENTER);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    
    if (this.estado === 0) this.pantalla_menu();
    else if (this.estado === 1) this.pantalla_juego();
    else if (this.estado === 2) this.pantalla_ganaste();
    else if (this.estado === 3) this.pantalla_perdiste();
    else if (this.estado === 4) this.pantalla_instrucciones();
    else if (this.estado === 5) this.pantalla_creditos();
  }
  
  pantalla_juego() {
    // fondo que se mueve
    this.moverFondo();
    
    // rumi
    this.jugador.mover();
    this.jugador.dibujar();
    
    // crear obstaculos cada 1 segundo
    if (frameCount % 60 === 0) {
      this.obstaculos.push(new Obstaculo());
    }
    
    // actualizar obstaculos
    for (let i = this.obstaculos.length - 1; i >= 0; i--) {
      let obs = this.obstaculos[i];
      obs.mover(this.velocidad);
      obs.dibujar();
      
      // colision
      if (this.jugador.chocaCon(obs)) {
        if (this.jugador.escudo.activo) {
          this.obstaculos.splice(i, 1);
        } else {
          this.jugador.vidas--;
          this.obstaculos.splice(i, 1);
          
          if (this.jugador.vidas <= 0) {
            this.estado = 3;
            this.reproducirMusica('perdes');
          }
        }
      }
      else if (obs.x < -50) {
        this.puntaje++;
        this.obstaculos.splice(i, 1);
      }
    }
    
    if (this.puntaje >= this.meta) {
      this.estado = 2;
      this.reproducirMusica('ganas');
    }
    
    this.dibujarInfo();
  }
  
  moverFondo() {
    this.fondoX1 -= this.velocidad * 0.3;
    this.fondoX2 -= this.velocidad * 0.3;
    
    if (this.fondoX1 < -640) this.fondoX1 = this.fondoX2 + 640;
    if (this.fondoX2 < -640) this.fondoX2 = this.fondoX1 + 640;
    
    imageMode(CORNER);
    image(imagenes.fondo, this.fondoX1, 0, 640, 480);
    image(imagenes.fondo, this.fondoX2, 0, 640, 480);
    imageMode(CENTER);
  }
  
  dibujarInfo() {
    fill(0, 0, 0, 150);
    rectMode(CORNER);
    rect(0, 0, 640, 60);
    rectMode(CENTER);
    
    fill(255);
    textSize(20);
    textAlign(LEFT, CENTER);
    text("❤️ Vidas: " + this.jugador.vidas, 20, 30);
    
    textAlign(CENTER, CENTER);
    text("✨ " + this.puntaje + " / " + this.meta, 320, 30);
    
    textAlign(RIGHT, CENTER);
    this.jugador.escudo.mostrarInfo();
    
    // resetear alineacion
    textAlign(CENTER, CENTER);
  }
  
  pantalla_menu() {
    imageMode(CORNER);
    image(imagenes.portada, 0, 0, 640, 480);
    imageMode(CENTER);
    
    textAlign(CENTER, CENTER);
    this.boton("JUGAR", 320, 370, 160, 40);
    this.boton("INSTRUCCIONES", 320, 420, 160, 40);
    this.boton("CRÉDITOS", 320, 465, 160, 40);
  }
  
  pantalla_instrucciones() {
    background(20, 10, 40);
    
    textAlign(CENTER, CENTER);
    fill(255, 100, 200);
    textSize(36);
    text("📖 INSTRUCCIONES", width/2, 50);
    
    fill(255);
    textSize(18);
    textAlign(LEFT, CENTER);
    text("🎯 Esquiva 15 obstáculos para ganar", 60, 120);
    
    text("🎮 CONTROLES:", 60, 180);
    text("   ↑ / W: Arriba", 60, 210);
    text("   ↓ / S: Abajo", 60, 240);
    text("   ESPACIO: Escudo (2 usos)", 60, 270);
    text("   M: Mutear música", 60, 300);
    
    text("❤️  3 vidas. Pierdes si chocas 3 veces.", 60, 340);
    text("🛡️  El escudo dura 3 segundos.", 60, 370);
    
    textAlign(CENTER, CENTER);
    this.boton("VOLVER", 320, 420, 180, 45);
  }
  
  pantalla_creditos() {
    imageMode(CORNER);
    image(imagenes.creditos, 0, 0, 640, 480);
    imageMode(CENTER);
    
    textAlign(CENTER, CENTER);
    this.boton("VOLVER", 320, 420, 180, 45);
  }
  
  pantalla_ganaste() {
    imageMode(CORNER);
    image(imagenes.ganaste, 0, 0, 640, 480);
    imageMode(CENTER);
    
    fill(0, 0, 0, 150);
    rectMode(CORNER);
    rect(0, 0, 640, 480);
    rectMode(CENTER);
    
    textAlign(CENTER, CENTER);
    
    fill(100, 255, 100);
    textSize(56);
    text("🎉 ¡GANASTE! 🎉", width/2, 80);
    
    fill(255);
    textSize(22);
    text("¡Rumi sobrevivió!", width/2, 150);
    text("Los demonios no pudieron alcanzarla.", width/2, 185);
    
    fill(200, 255, 200);
    textSize(20);
    text("✨ Esquivados: " + this.puntaje, width/2, 270);
    
    this.boton("JUGAR DE NUEVO", 320, 350, 180, 45);
    this.boton("MENÚ", 320, 410, 180, 45);
  }
  
  pantalla_perdiste() {
    imageMode(CORNER);
    image(imagenes.perdiste, 0, 0, 640, 480);
    imageMode(CENTER);
    
    fill(0, 0, 0, 150);
    rectMode(CORNER);
    rect(0, 0, 640, 480);
    rectMode(CENTER);
    
    textAlign(CENTER, CENTER);
    
    fill(255, 100, 100);
    textSize(56);
    text("💀 GAME OVER 💀", width/2, 80);
    
    fill(255);
    textSize(22);
    text("Los demonios te alcanzaron...", width/2, 150);
    
    fill(255, 200, 200);
    textSize(20);
    text("✨ Esquivados: " + this.puntaje, width/2, 270);
    
    this.boton("REINTENTAR", 320, 350, 200, 45);
    this.boton("MENÚ", 320, 410, 180, 45);
  }
  
  boton(texto, x, y, ancho, alto) {
    if (this.sobreBoton(mouseX, mouseY, x, y, ancho, alto)) {
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
  
  sobreBoton(mx, my, x, y, ancho, alto) {
    return (mx > x - ancho/2 && mx < x + ancho/2 && 
            my > y - alto/2 && my < y + alto/2);
  }
  
  manejarClicks(mx, my) {
    if (this.estado === 0) {
      if (this.sobreBoton(mx, my, 320, 370, 160, 40)) this.empezarJuego();
      if (this.sobreBoton(mx, my, 320, 420, 160, 40)) {
        this.estado = 4;
        this.pararMusica();
      }
      if (this.sobreBoton(mx, my, 320, 465, 160, 40)) {
        this.estado = 5;
        this.pararMusica();
      }
    } 
    else if (this.estado === 4 || this.estado === 5) {
      if (this.sobreBoton(mx, my, 320, 420, 180, 45)) {
        this.estado = 0;
        this.reproducirMusica('portada');
      }
    } 
    else if (this.estado === 2) {
      if (this.sobreBoton(mx, my, 320, 350, 180, 45)) this.empezarJuego();
      if (this.sobreBoton(mx, my, 320, 410, 180, 45)) {
        this.estado = 0;
        this.reproducirMusica('portada');
      }
    } 
    else if (this.estado === 3) {
      if (this.sobreBoton(mx, my, 320, 350, 200, 45)) this.empezarJuego();
      if (this.sobreBoton(mx, my, 320, 410, 180, 45)) {
        this.estado = 0;
        this.reproducirMusica('portada');
      }
    }
  }
  
  teclear(k, tecla) {
    // mutea con M en cualquier pantalla
    if (tecla === 'm' || tecla === 'M') {
      this.toggleMute();
      return;
    }
    
    if (this.estado === 1) {
      if (k === 32) { // espacio
        this.jugador.usarEscudo();
      } 
      else if (k === UP_ARROW || tecla === 'w' || tecla === 'W') {
        this.jugador.moverACarril(this.jugador.carrilActual - 1);
      } 
      else if (k === DOWN_ARROW || tecla === 's' || tecla === 'S') {
        this.jugador.moverACarril(this.jugador.carrilActual + 1);
      }
    }
  }
  
  empezarJuego() {
    this.obstaculos = [];
    this.jugador = new Jugador();
    this.puntaje = 0;
    this.velocidad = 6;
    this.fondoX1 = 0;
    this.fondoX2 = 640;
    this.estado = 1;
    this.reproducirMusica('juego');
  }
}

// CLASE JUGADOR
class Jugador {
  constructor() {
    this.x = 100;
    this.carriles = [120, 240, 360];
    this.carrilActual = 1;
    this.y = this.carriles[this.carrilActual];
    this.ancho = 160;
    this.alto = 180;
    this.velocidad = 15;
    this.vidas = 3;
    this.escudo = new Escudo();
  }
  
  usarEscudo() {
    this.escudo.activar();
  }
  
  moverACarril(nuevoCarril) {
    if (nuevoCarril >= 0 && nuevoCarril < this.carriles.length) {
      this.carrilActual = nuevoCarril;
    }
  }
  
  mover() {
    let destino = this.carriles[this.carrilActual];
    if (this.y < destino) {
      this.y += this.velocidad;
      if (this.y > destino) this.y = destino;
    } else if (this.y > destino) {
      this.y -= this.velocidad;
      if (this.y < destino) this.y = destino;
    }
    this.escudo.actualizar();
  }
  
  dibujar() {
    this.escudo.dibujarEfecto(this.x, this.y);
    image(imagenes.rumi, this.x, this.y, this.ancho, this.alto);
  }
  
  chocaCon(obs) {
    let distancia = dist(this.x, this.y, obs.x, obs.y);
    return distancia < (this.ancho/2 + obs.ancho/2);
  }
}

// CLASE ESCUDO
class Escudo {
  constructor() {
    this.usos = 2;
    this.activo = false;
    this.tiempo = 180;
    this.contador = 0;
  }
  
  activar() {
    if (!this.activo && this.usos > 0) {
      this.activo = true;
      this.usos--;
      this.contador = this.tiempo;
    }
  }
  
  actualizar() {
    if (this.activo) {
      this.contador--;
      if (this.contador <= 0) this.activo = false;
    }
  }
  
  dibujarEfecto(jx, jy) {
    if (this.activo) {
      let brillo = sin(frameCount * 0.1) * 10 + 110;
      tint(255, 255, 255, brillo);
      image(imagenes.escudo, jx, jy, 140, 140);
      noTint();
      
      noFill();
      stroke(255, 200, 50, brillo);
      strokeWeight(3);
      ellipse(jx, jy, 150, 150);
      noStroke();
    }
  }
  
  mostrarInfo() {
    fill(255);
    textSize(18);
    textAlign(RIGHT, CENTER);
    text("🛡️ x" + this.usos, 590, 30);
    if (this.activo) {
      fill(255, 255, 0);
      textSize(16);
      text("¡PROTEGIDO!", 590, 50);
    }
  }
}

// CLASE OBSTACULO
class Obstaculo {
  constructor() {
    this.x = 640 + 50;
    this.carriles = [120, 240, 360];
    this.carril = floor(random(0, 3));
    this.y = this.carriles[this.carril];
    this.ancho = 80;
    this.alto = 80;
    this.angulo = 0;
    this.giro = random(-0.03, 0.03);
    
    let tipos = ['alarota', 'parterota', 'puertarota', 'ruedarota', 'sillarota'];
    this.tipo = random(tipos);
    this.img = imagenes[this.tipo];
  }
  
  mover(vel) {
    this.x -= vel;
    this.angulo += this.giro;
  }
  
  dibujar() {
    push();
    translate(this.x, this.y);
    rotate(this.angulo);
    image(this.img, 0, 0, this.ancho, this.alto);
    pop();
  }
}
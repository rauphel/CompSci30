// fireworks demo

class Partlicle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 3;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
    this.fadeRate = 2;
  }
  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius);
  }
  update() {
    //move 
    this.x += this.dx;
    this.y += this.dy;

    this.opacity -= this.fadeRate;
  }
  isDead() {
    return this.opacity <= 0;
  }
}

let container = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let p of container) {
    if (p.isDead()) {
      let toKill = container.indexOf(p);
      container.splice(toKill, 1);
    }
    else {
      p.update();    
      p.display();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < 100; i++) {
    let someFirework = new Partlicle(mouseX, mouseY);
    container.push(someFirework);
  }
}


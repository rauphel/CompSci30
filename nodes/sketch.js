// connected nodes OOP demo

class MovingPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.05;
    this.radius = 15;
    this.speed = 5;
    this.color = color(random(255), random(255), random(255));
    this.reach = 200;
    this.maxRad = 50;
    this.minRad = 5;
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }
  update() {
    this.move();
    this.wrapAround();
    this.adjustSize();
  }

  adjustSize() {
    let mouseDist = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDist < this.reach) {
      let theSize = map(mouseDist, 0, this.reach, this.maxRad, this.minRad);
      this.radius = theSize;
    }
    else {
      this.radius = this.minRad;
    }
  }

  connectTo(nodesArray) {
    for (let otherNode of nodesArray) {
      if (this !== otherNode) {
        let distance = dist(this.x, this.y, otherNode.x, otherNode.y);
        if (distance < this.reach ) {
          stroke(this.color);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }
    }
  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // scale from 0-1 to movement soeed

    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += dx;
    this.y += dy;

    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
  wrapAround() {
    if (this.x < 0 ) {
      this.x += width;
    }
    if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0 ) {
      this.x += height;
    }
    if (this.y > height) {
      this.x -= height;
    }
  }


}

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  // lines first
  for (let node of nodes) {
    node.update();
    node.connectTo(nodes);
  }
  for (let node of nodes) {
    node.display();
  }
}

function mousePressed() {
  nodes.push(new MovingPoint(mouseX, mouseY));
}
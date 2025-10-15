// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBubble();

  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);

  for (let bubble of theBubbles) {
    bubble.x = noise(bubble.time) * width;
    bubble.y = noise(bubble.time + bubble.buffer) * height;
    bubble.time += bubble.deltaTime;

    fill(bubble.r, bubble.g, bubble.y);
    circle(bubble.x, bubble.y, bubble.diameter);
  }
}

function spawnBubble() {
  let _time = random(1000);
  let _buffer = random(100, 1000);
  let theBubble = {
    time: _time,
    buffer: _buffer,
    x: noise(_time) * width,
    y: noise(_time + _buffer) * height,
    diameter: random(20, 50),
    deltaTime: 0.001,
    r: random(255),
    g: random(255),
    b: random(255),
  };
  theBubbles.push(theBubble);
}


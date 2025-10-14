// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y;
let time = 0;
const timeBuffer = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  x = noise(time) * width;
  y = noise(time + timeBuffer) * height;

  time += 0.01;

  fill('black');
  circle(x, y, 50);
}


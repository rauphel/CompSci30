// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rows, cols;
const SCALE = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = height / SCALE;
  cols = width / SCALE;

}

function draw() {
  background(220);
  terrainGeneration();
}


function terrainGeneration() {
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * SCALE, y * SCALE);
      vertex(x * SCALE, (y + 1) * SCALE);
    }
    endShape();
  }
}
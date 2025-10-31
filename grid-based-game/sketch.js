// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// initializes grid for triangles and its scale
let rows, cols;
const SCALE = 20;
const TERRAIN_X = 1000;
const TERRAIN_Y = 2000;

// 2d array keeping the z values of each grid
let terrainHeight;
let seed;

// player camera and coordinates
let playerCam;
let camX;
let camY;
let CamZ;

function setup() {
  // sets up 3d renderer
  createCanvas(windowWidth, windowHeight, WEBGL);

  // sets terrain / grid size
  rows = TERRAIN_Y / SCALE;
  cols = TERRAIN_X / SCALE;
  seed = random();
  terrainHeight = generateHeight(cols, rows, seed);

  // creates and sets player Camera
  playerCam = createCamera();
}

function draw() {
  background(220);
  showTerrain();
}

function generateHeight(cols, rows, seed) {
  let newGrid = [];
  let yOffset = 0;

  noiseSeed(seed);
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    let xOffset = 0;
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(map(noise(xOffset, yOffset), 0, 1, -100, 100));
      xOffset += 0.2;
    }
    yOffset += 0.2;
  }
  return newGrid;
}

function showTerrain() {
  translate(-TERRAIN_X/2, 0, -TERRAIN_Y/3);
  rotateX(PI/2);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * SCALE, y * SCALE, terrainHeight[y][x]);
      vertex(x * SCALE, (y + 1) * SCALE, terrainHeight[y + 1][x]);
    }
    endShape();
  }
}

function keyPressed() {
  if (key === "r") {
    seed = random();
    terrainHeight = generateHeight(cols, rows, seed);
  }
}
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
const TERRAIN_Y = 1000;

// 2d array keeping the z values of each grid
let terrainHeight;
let seed;

// player camera and coordinates
let playerCam;
let camX;
let camY;
let CamZ;


const SPEED = 20;
const MAX_PITCH = 180;
const MIN_PITCH = 0;

function setup() {
  // sets up 3d renderer
  createCanvas(windowWidth, windowHeight, WEBGL);

  // sets terrain / grid size
  rows = TERRAIN_Y / SCALE;
  cols = TERRAIN_X / SCALE;
  seed = random();
  terrainHeight = generateHeight(cols, rows, seed);

  // creates and sets player Camera
  playerCam = new Mover(0, 0, 0, 0.1);
}

function draw() {
  background(220);

  // orbitControl();

  // showPlane();
  showTerrain();
  
  playerCam.update();
  
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
  push();
  translate(-TERRAIN_X/2, 0, -TERRAIN_Y/2);
  rotateX(PI/2);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * SCALE, y * SCALE, terrainHeight[y][x]);
      vertex(x * SCALE, (y + 1) * SCALE, terrainHeight[y + 1][x]);
    }
    endShape();
  }
  pop();
}

function keyPressed() {
  if (key === "r") {
    seed = random();
    terrainHeight = generateHeight(cols, rows, seed);
  }
}

function showPlane() {
  push();
  rotateX(PI/2);
  plane(TERRAIN_X, TERRAIN_Y);
  pop();
}

class Mover {
  constructor(x, y, z, sense) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.cam = createCamera();
    this.cam.setPosition(this.x, this.y, this.z);

    this.rX = 0;
    this.rY = 0;
    this.camVector;

    this.sensitivity = sense;
  }

  update() {
    // this.cam.setPosition(this.x, this.y, this.z);
    // this.cam.lookAt();

    this.look();
    this.pointCam();
    this.move();

  }

  look() { //change to constants
    this.rX -= movedX * this.sensitivity;
    this.rY += movedY * this.sensitivity;

    this.rY = constrain(this.rY, MIN_PITCH, MAX_PITCH); // figure out
    this.rX = this.rX % 360;
  }

  pointCam() {
    this.camVector = p5.Vector.fromAngles(radians(this.rY), radians(this.rX)); // figure out
    // this.cam.setPosition(this.x, this.y, this.z);
    this.cam.lookAt(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);

    point(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);
    // console.log(this.camVector.toString());
  }
  move() {
    if (keyIsDown(87)) {
      // this.heading = p5.Vector.normalize(this.camVector);
      // translate(0, 0, -1);
      this.cam.move(0, 0, -1);
      // console.log(this.cam.eyeX);
      
      
      // this.x = this.cam.eyeX;
      // this.y = this.cam.eyeY;
      // this.z = this.cam.eyeZ;
    }
  }
}

function doubleClicked() {
  requestPointerLock();
}
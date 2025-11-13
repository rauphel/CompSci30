// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// initializes grid for triangles width and length and its SUBDIVISIONS
let rows, cols;
const SUBDIVISIONS = 20;
const TERRAIN_X = 1000;
const TERRAIN_Y = 1000;

// 2d array keeping the z values of each grid
let terrainHeight;
let seed;           // noise seed saved as a global variable to be able to save it

// player camera and coordinates
let playerCam;

// saved camera angle restrictions as constant outside of class; not too sure how to make constants in classes 
const MAX_PITCH = 180;
const MIN_PITCH = 0;

function setup() {
  // sets up 3d renderer
  createCanvas(windowWidth, windowHeight, WEBGL);

  // sets terrain / grid size / generates a random seed and makes 2d arrays with the heights
  rows = TERRAIN_Y / SUBDIVISIONS;
  cols = TERRAIN_X / SUBDIVISIONS;
  seed = random(1, 100);
  terrainHeight = generateHeight(cols, rows, seed);

  // creates and sets player Camera 
  playerCam = new Mover(0, -50, 0);
}

function draw() {
  background(220);

  // showPlane();
  showTerrain();
   
  // updates camera which holds movement and direction
  playerCam.update();
}

function generateHeight(cols, rows, seed) { // generates a 2d grid using perlin noise 
  // offset is the distance between each point 
  let newGrid = [];
  let yOffset = 0;

  noiseSeed(seed);  // sets the seed
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
  push(); // isolates translations
  translate(-TERRAIN_X/2, 0, -TERRAIN_Y/2);
  rotateX(PI/2);

  for (let y = 0; y < rows - 1; y++) { // generates a triangles strip to display terrain using generated heights in 2d array
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * SUBDIVISIONS, y * SUBDIVISIONS, terrainHeight[y][x]);
      vertex(x * SUBDIVISIONS, (y + 1) * SUBDIVISIONS, terrainHeight[y + 1][x]);
    }
    endShape();
  }
  pop();
}

function keyPressed() { // seed randomizer and gets new heights
  if (key === "r") {
    seed = random(1, 100);
    terrainHeight = generateHeight(cols, rows, seed);
  }
}

function showPlane() { // plane for tests 
  push();
  rotateX(PI/2);
  plane(TERRAIN_X, TERRAIN_Y);
  pop();
}

class Mover {
  constructor(x, y, z) { 
    this.x = x; // world coordinates
    this.y = y;
    this.z = z;
    this.cam = createCamera(); // creates cam and sets its positions
    this.cam.setPosition(this.x, this.y, this.z);

    this.rY = 0;  // rotation based on the y-axis
    this.rX = 90; // rotation based on the x-axis
    this.camVector; //vector for where it's looking

    this.sensitivity = 0.1; //cam sensitivity and speed
    this.speed = 5;
  }

  update() {
    // this.cam.setPosition(this.x, this.y, this.z);
    // this.cam.lookAt();

    this.look();
    this.pointCam();
    this.move();

  }

  look() { //change to constants
    this.rY -= movedX * this.sensitivity;
    this.rX += movedY * this.sensitivity;

    this.rX = constrain(this.rX, MIN_PITCH, MAX_PITCH); // figure out
    this.rY = this.rY % 360;
  }

  pointCam() {
    this.camVector = p5.Vector.fromAngles(radians(this.rX), radians(this.rY)); // figure out
    // this.cam.setPosition(this.x, this.y, this.z);
    this.cam.lookAt(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);

    point(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);
    // console.log(this.camVector.toString());
  }
  move() {
    if (keyIsDown(87)) { // w
      this.cam.move(0, 0, -1 * this.speed);
    }
    if (keyIsDown(83)) { // s
      this.cam.move(0, 0, 1 * this.speed);
    }
    if (keyIsDown(65)) { // a
      this.cam.move(-1 * this.speed, 0, 0);
    }
    if (keyIsDown(68)) { // d
      this.cam.move(1 * this.speed, 0, 0);
    }
    if (keyIsDown(16)) { // shift
      this.cam.move(0, 1 * this.speed, 0);
    }
    if (keyIsDown(32)) { // space
      this.cam.move(0, -1 * this.speed, 0);
    }
    this.x = this.cam.eyeX;
    this.y = this.cam.eyeY;
    this.z = this.cam.eyeZ;
  }
}

function doubleClicked() {
  requestPointerLock();
}
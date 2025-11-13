// Project Title
// Your Name
// Date
//
// Extra for Experts:
// used 2d arrays in 3d space by using the 2d array to hold height values
// explored 3d: creating generative terrain through perlin noise and 2d arrays, creating a first person camera controllable thtough 'wasd' and mouse 
// more oop integration

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

let textAppear = true;

function preload() {
  // loads font
  font = loadFont('Inconsolata.ttf');
}

function setup() {
  // sets up 3d renderer
  createCanvas(windowWidth, windowHeight, WEBGL);

  // sets terrain / grid size / generates a random seed and makes 2d arrays with the heights
  rows = TERRAIN_Y / SUBDIVISIONS;
  cols = TERRAIN_X / SUBDIVISIONS;
  seed = random(1, 100);
  terrainHeight = generateHeight(cols, rows, seed);

  // creates and sets player Camera 
  playerCam = new Mover(0, -150, 0);

  //sets up text
  textFont(font);
  textSize(20);
}

function draw() {
  background(220);

  // showPlane();
  showTerrain();
   
  // updates camera which holds movement and direction
  playerCam.update();

  //shows text
  showText();
}

function showText() {
  if (textAppear) {
    push(); // colors in and then translates and rotates text;
    fill('black');
    translate(50, -300, 200);
    rotateY(PI);
    text('Double-click: lock mouse w: forward, s: back, a: left, d: right, shift: down, space: up, r; randomize seed, c: toggle texts', 0, 0, 150, 500);
    pop();
  }
}

function generateHeight(cols, rows, seed) { // generates a 2d grid using perlin noise 
  // offset is the distance between each point 
  let newGrid = [];
  let yOffset = 0;

  noiseSeed(seed);  // sets the seed
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    let xOffset = 0;
    for (let x = 0; x < cols; x++) { //pushes noise value mappes to a max of 100 and min of -100 and offset is distance between each noise valie
      newGrid[y].push(map(noise(xOffset, yOffset), 0, 1, -100, 100));
      xOffset += 0.2;
    }
    yOffset += 0.2;
  }
  return newGrid;
}

function showTerrain() {
  push(); // isolates translations
  fill('gray');
  translate(-TERRAIN_X/2, 0, -TERRAIN_Y/2); //transforms to be a plane on the x and z axis
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
  if (key === 'c') {
    textAppear = !textAppear;
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
    // centralizes class' functions
    this.look();
    this.pointCam();
    this.move();

  }

  look() { 
    // gets mouse movement on x and y axis and converts into degrees 
    this.rY -= movedX * this.sensitivity;
    this.rX += movedY * this.sensitivity;

    this.rX = constrain(this.rX, MIN_PITCH, MAX_PITCH); // constraints cam rotation based on x axis
    this.rY = this.rY % 360;  // keeps cam rotation on y-axis from 1-360 degrees
  }

  pointCam() {
    // creates a vector from the origin to the angles stated the first being theta(x axis rotation) and the second being phi(y-axis rotation) and angles taken from mouse movement
    this.camVector = p5.Vector.fromAngles(radians(this.rX), radians(this.rY)); 
    //translates the vector to the cameras coordinates and makes the camera look at that point
    this.cam.lookAt(this.camVector.x + this.cam.eyeX, this.camVector.y + this.cam.eyeY, this.camVector.z + this.cam.eyeZ);

  }
  move() {
    //movement is done through the camera's local axis'
    if (keyIsDown(87)) { // w; forward
      this.cam.move(0, 0, -1 * this.speed);
    }
    if (keyIsDown(83)) { // s; back
      this.cam.move(0, 0, 1 * this.speed);
    }
    if (keyIsDown(65)) { // a; left
      this.cam.move(-1 * this.speed, 0, 0);
    }
    if (keyIsDown(68)) { // d; right
      this.cam.move(1 * this.speed, 0, 0);
    }
    if (keyIsDown(16)) { // shift; down
      this.cam.move(0, 1 * this.speed, 0);
    }
    if (keyIsDown(32)) { // space; up
      this.cam.move(0, -1 * this.speed, 0);
    }
    // updates object's coords with camera coords
    this.x = this.cam.eyeX;
    this.y = this.cam.eyeY;
    this.z = this.cam.eyeZ;
  }
}

function doubleClicked() { // locks cursor with double click
  requestPointerLock();
}

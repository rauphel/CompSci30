// Interactive Scene
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let vec;
let triWidth = 10;
let triLength = 30;
let triVel;
let maxVel = 1;
let accelR = 0.05;
let heading = 0;
let mX = 0;
let mY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  vec = createVector(0, 0);
  triVel = createVector(0, 0);
}

function draw() {
  background(220);
  tri();
  console.log(mouseX);
}

function tri() {
  push();
  translate(vec);
  triMove();
  triTurn();

  // triangle(vec.x + triLength, vec.y, vec.x, 
  //   vec.y + triWidth, vec.x, vec.y - triWidth);
  triangle(0, 5, 0, -5, 5, 0)
  point(0, 0);
  point(vec);
  pop();
}

function triTurn() {
  if (keyIsDown(65)) { // press 'A' and turn left
    heading -= radians(1);
  }
  if (keyIsDown(68)) {
    heading += radians(1);
  }
  // mX = mX + vec.x;
  // mY = mY + vec.y;
  // heading = atan2(mouseY - mY, mouseX - mX);
  rotate(heading);
  
}

function triMove() {
  triVel.x = cos(heading);
  triVel.y = sin(heading);

  vec.add(triVel);
  translate(vec);
}




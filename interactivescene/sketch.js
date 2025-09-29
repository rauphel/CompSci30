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
let heading;

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

  triangle(vec.x + triLength, vec.y, vec.x, 
    vec.y + triWidth, vec.x, vec.y - triWidth);

  pop();
}

function triTurn() {
//   if (keyIsDown(65)) { // press 'A' and turn left
//   rotate(QUARTER_PI)
//   }
//   if (keyIsDown(68)) {
  translate(vec);
  heading = atan2(mouseY - vec.y, mouseX - vec.x);
  rotate(heading);
  
}

function triMove() {
  translate(vec);
  triVel.x = cos(heading);
  triVel.y = sin(heading);
  
  vec.add(triVel);
}








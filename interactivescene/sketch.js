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
let dx = 0;
let dy = 0;
let maxVel = 5;
let accelR = 0;
let mass = 20;
let heading = 0;
let turnR = 5;



function setup() {
  createCanvas(windowWidth, windowHeight);
  vec = createVector(0, 0);
  triVel = createVector(0, 0);
}

function draw() {
  background(220);
  tri();
  console.log(dx);
}

function tri() {
  push();
  translate(vec);
  speedControl();
  triMove();
  triTurn();
 


  triangle(-triLength/3, triWidth/2, -triLength/3, -triWidth/2, triLength/2, 0);
  pop();
}

function triTurn() {
  if (keyIsDown(65)) { // press 'A' to turn counter clockwise
    heading -= radians(turnR);
  }
  if (keyIsDown(68)) { // press 'D' to turn clockwise
    heading += radians(turnR); 
  }
  rotate(heading);
}

function triMove() {
  dx = cos(heading) * accelR/mass;
  dy = sin(heading) * accelR/mass;
  triVel.x += dx;
  triVel.y += dy;
  
  vec.add(triVel);
  translate(vec);
}

function speedControl() {
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      accelR = 1.2;
    }
  }
  else {
    accelR = 0;
  }
}

// Interactive Scene
// Rauphel, Kenept
// 2025/10/03
//
// Extra for Experts:
// For the extra for experts I made the scroll wheel change the background color; the overall execution is simple, the part that should be considered for the Wow me Factor would 
// be the use of vectors to translate the character along with the use of push and pop to isolate the translations of the origin

let vec;            //supposed to be current position of triangle as a vector based on the origin being the top left corner but is not, dont know why 
let triWidth = 10;  //triangle sizes
let triLength = 30;  
let triVel;         // vector based on dx and dy; is what the triangle moves to
let dx = 0;         // movement on x axis
let dy = 0;         // movement on y axis
// let maxVel = 5;  //supposed to be max velocity not implemented currently
let accelR = 0;     // acceleration rate 
let mass = 20;      // mass of the triangle; changes rate of acceleration
let heading = 0;    // direction in radians
let turnR = 5;      // turn rate in degrees

let gameStart = false; //game-state for either showing the startscreen or not
let rectStart; //initializing variables for rectangles start and size as vectors
let rectSize; 
let startText = 'A and D to turn and Left mouse button to accelerate; Scroll to change color; Press rectangle to start';

let colorArray = ['white', 'black', 'gray', 'cyan', 'red']; //Set Background color to be a variable for easy change
let backCol = 0;  // variable to index through background color array

let x = 0;  // starting positions
let y = 0;  // when set to width/2 it sets the position to be on the bottom right corner; might be related to problem of position vector not aligning with actual positions

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);

  rectStart = createVector(width/2 - 50, height/2 - 25); //vectors for rectangle start button position and size
  rectSize = createVector(100, 50);

  vec = createVector(x, y);    // vectors for triangle movement and position; decides the start point
  triVel = createVector(0, 0);
}

function draw() {
  background(colorArray[backCol]);
  startScreen();
  tri();
}

function tri() {
  if (gameStart) {    // shows triangle only when start button is pressed
    push();           // Isolates translations
    fill('white');    // triangle color
    translate(vec);   // sets origin point to be vector; did account for when inputting values to translate it is additive; might have problems with solution
    speedControl(); 
    triMove();
    triTurn();
  
    triangle(-triLength/3, triWidth/2, -triLength/3, -triWidth/2, triLength/2, 0); // sets triangle to be at the moved origin 

    pop();  // end of isolated translations
  }
}

function triTurn() { // rotates triangle
  if (keyIsDown(65)) { // press 'A' to turn counter clockwise
    heading -= radians(turnR); 
  }
  if (keyIsDown(68)) { // press 'D' to turn clockwise
    heading += radians(turnR); 
  }
  rotate(heading);  // rotates to current heading
}

function triMove() { //moves triangle based on heading
  dx = cos(heading) * accelR/mass; //accelerates x-axis and y-axis velocity based on heading
  dy = sin(heading) * accelR/mass;
  triVel.x += dx; //adds current velocity to one vector
  triVel.y += dy;
  
  vec.add(triVel); // adds translations to triangle vector
  translate(vec);  // adds triangle vector to origin point
}

function speedControl() {  // controls acceleration with use of left mouse click 
  if (mouseIsPressed) {
    if (mouseButton === LEFT) { 
      accelR = 1.2;
    }
  }
  else {
    accelR = 0; // sets acceleration rate to 0 when not doing anything
  }
}

function startScreen() {
  if (gameStart) {
    background(colorArray[backCol]); // rids of button when pressed and changes color based on scrollwheel
  }
  else {
    button();
    fill('black');
    text(startText, rectStart.x + 50, rectStart.y -25);
  }
}

function button() { //start button
  if (mouseX >= rectStart.x && mouseX <= rectStart.x + rectSize.x 
      && mouseY >= rectStart.y && mouseY <= rectStart.y +rectSize.y) {
    fill('black');
  }
  else {
    fill('white');
  }
  rect(rectStart.x, rectStart.y, rectSize.x, rectSize.y);
}

function mousePressed() { //detection of start button pressed and then changes game state
  if (!gameStart && mouseButton === LEFT) {
    if (mouseX >= rectStart.x && mouseX <= rectStart.x + rectSize.x 
      && mouseY >= rectStart.y && mouseY <= rectStart.y +rectSize.y) {
        gameStart = true;
    }
  }
}

function mouseWheel(event) { // changes background color based on upward or downward scroll
  if (event.delta > 0) {
    if (backCol < colorArray.length-1) { // limits it so the index cannot go above the array length
      backCol++;
    }
  }
  else {
    if (backCol > 0) { // limits index to be positive 
      backCol--;
    }
  }
  return false;
}
// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let lightCol = "red";
let someTime = 2000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  updateLight();
  drawOutlineOfLights();
  correctLight();
}

function updateLight() {
  if (lightCol === "red" && millis() > someTime) {
    lightCol = "green";
    someTime += someTime;
  }
  else if (lightCol === "green" && millis() > someTime) {
    lightCol = "yellow";
    someTime += someTime*3;

  }
  else if (lightCol === "yellow"&& millis() > someTime) {
    lightCol = "red";
    someTime += someTime*3;

  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function correctLight() {
  if (lightCol === "red") {
    fill('green');
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
  else if (lightCol === "green") {
    fill('yellow');
    ellipse(width/2, height/2, 50, 50); //middle

  }
  else if (lightCol === "yellow") {
    fill('red');
    ellipse(width/2, height/2 + 65, 50, 50); //bottom

  }
}
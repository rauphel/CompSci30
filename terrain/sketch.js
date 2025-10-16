//terrain generation with perlin noise

let terrain = [];
const NUMBER_OF_RECTS = 2000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain();

}

function draw() {
  background(220);

  for (let theRect of terrain) {
    stroke('green');
    fill('green');
    rect(theRect.x, theRect.y, theRect.w, theRect.h);
  }
}

function spawnRect(leftSide, rectWidth, rectHeight) {
  let theRect = {
    x: leftSide,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
  };
  return theRect;
}

function generateTerrain() {
  let theWidth = width/NUMBER_OF_RECTS;
  let time = 0;
  let deltaTime = 0.0009;
  for (let i = 0; i < NUMBER_OF_RECTS; i++) {
    let theHeight = noise(time) * height;
    terrain.push(spawnRect(theWidth * i, theWidth, theHeight));
    time += deltaTime;
  }
}
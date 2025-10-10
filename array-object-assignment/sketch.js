// Array and Object notation Assignment
// Rauphel
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let blockSize = 50;
let spawnHeight;
let screenHeight;
let screenWidth = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnHeight = height/2;
  screenHeight = height;
  aBlock = spawnBlocks(width/2);

}

function draw() {
  background(220);
  screen();
  rect(aBlock.x1, aBlock.y1, aBlock.blockWidth, aBlock.blockHeight);
  gravity();
}

function spawnBlocks(x) {
  let _width = random([1, 2, 3, 4]);
  
  let blocks = {
    x1: x,
    y1: spawnHeight,
    blockWidth: blockSize * _width,
    blockHeight: blockSize,
    grav: 5,
  };
  return blocks;
}

function gravity() {
  if (aBlock.y1 < height - blockSize) {
    aBlock.y1 += aBlock.grav;

  }
}

function dragBlock() {
  if (mouseX >= aBlock.x1 && mouseX <= aBlock.x1 + aBlock.blockWidth 
      && mouseY >= aBlock.y1 && mouseY <= aBlock.y1 + aBlock.blockHeight) {
    console.log(true);
    aBlock.x1 = mouseX - aBlock.blockWidth/2;
  }
}

function mouseDragged() {
  if (mouseButton === LEFT) {
    dragBlock();
  }
}

function screen() {
  fill('gray');
  rect(width/2 - screenWidth/2, 0, screenWidth, screenHeight);
}

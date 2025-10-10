// Array and Object notation Assignment
// Rauphel
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let blockSize = 50;
let spawnHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnHeight = height/2;
  aBlock = spawnBlocks(width/2);
  rect(aBlock.x1, aBlock.y1, aBlock.blockWidth, aBlock.blockHeight);
}

function draw() {
  // background(220);
}

function spawnBlocks(x) {
  let _width = random([1, 2, 3, 4])
  let blocks = {
    x1: x,
    y1: spawnHeight,
    blockWidth: blockSize * _width,
    blockHeight: blockSize,
  };
  return blocks;
}

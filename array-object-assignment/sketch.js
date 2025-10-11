// Array and Object notation Assignment
// Rauphel
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let blockSize = 50;
let spawnHeight;
let screen;
let screenWidth = 500;
let theBlocks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnHeight = height/2;
  // screenHeight = height;
  aBlock = spawnBlocks(width/2);
  screen = createScreen();
}

function draw() {
  background(220);
  // screen();
  rect(screen.x, screen.y, screen.w, screen.h)
  fill('white');
  rect(aBlock.x1, aBlock.y1, aBlock.w, aBlock.h);
  gravity();
}

function spawnBlocks(x) {
  let _width = random([1, 2, 3, 4]);
  
  let blocks = {
    x1: x,
    y1: spawnHeight,
    w: blockSize * _width,
    h: blockSize,
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
  if (mouseX >= aBlock.x1 && mouseX <= aBlock.x1 + aBlock.w 
      && mouseY >= aBlock.y1 && mouseY <= aBlock.y1 + aBlock.h) {
    aBlock.x1 = mouseX - aBlock.w/2;
    if (aBlock.x1 <= screen.x) {
      aBlock.x1 = screen.x;
    }
    else if (aBlock.x1 + aBlock.w >= screen.x + screen.w) {
      aBlock.x1 = screen.x + screen.w - aBlock.w;
    }
  }
}

function mouseDragged() {
  if (mouseButton === LEFT) {
    dragBlock();
  }
}

function mouseReleased() {
  blockPosistion();
}

function createScreen() {
  // fill('gray');
  // rect(width/2 - screenWidth/2, 0, screenWidth, screenHeight);
  let screen = {
    x: width/2 - screenWidth/2,
    y: 0,
    w: screenWidth,
    h: height,
  };
  return screen;
}

function blockPosistion() {
  let xPos = aBlock.x1 - screen.x;
  if (xPos % blockSize !== 0) {
    xPos /= blockSize;
    xPos = round(xPos);
    xPos *= blockSize;
    xPos += screen.x;
    
    aBlock.x1 = xPos;
  }

}

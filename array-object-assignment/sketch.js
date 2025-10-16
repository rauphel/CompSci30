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
  // aBlock = spawnBlocks(width/2);
  screen = createScreen();

}

function draw() {
  background(220);
  // screen();
  rect(screen.x, screen.y, screen.w, screen.h);

  // gravity();
  // showBlocks();
  // classBlock();

  for (let aBlock of theBlocks) {
    aBlock.gravity();
    aBlock.show();
  }
}

// function spawnBlocks(x) {
//   let _width = random([1, 2, 3, 4]);  
//   let blocks = {
//     x: x,
//     y: spawnHeight,
//     w: blockSize * _width,
//     h: blockSize,
//     grav: 5,
//   };
//   theBlocks.push(blocks);
//   console.log(theBlocks);
// }

class Block {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.w = blockSize * ceil(random(4));
    this.h = blockSize;
  }

  show() {
    fill('white');
    rect(this.x, this.y, this.w, this.h);
  }
  
  gravity() {
    if (this.y < height - blockSize) {
      for (let i = 0; i < theBlocks.length && theBlocks.length > 1; i++) {
        if (Block !== theBlocks[i]){
          fallCollision(this.y, this.h, theBlocks[i].y, theBlocks[i].h);
        }
      }
      this.y += 5;
    }
  }

  collision() {
    
  }
}

// function showBlocks() {
//   for (let aBlock of theBlocks) {
//     fill('white');
//     rect(aBlock.x, aBlock.y, aBlock.w, aBlock.h);
//   }
// }

// function gravity() {
//   for (let aBlock of theBlocks) {
//     if (aBlock.y < height - blockSize) {
//       aBlock.y += aBlock.grav;
  
//     }
//   }
// }

function dragBlock() {
  for (let aBlock of theBlocks) {
    if (mouseX >= aBlock.x && mouseX <= aBlock.x + aBlock.w 
        && mouseY >= aBlock.y && mouseY <= aBlock.y + aBlock.h) {
      aBlock.x = mouseX - aBlock.w/2;
      if (aBlock.x <= screen.x) {
        aBlock.x = screen.x;
      }
      else if (aBlock.x + aBlock.w >= screen.x + screen.w) {
        aBlock.x = screen.x + screen.w - aBlock.w;
      }
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
  for (let aBlock of theBlocks) {
    let xPos = aBlock.x - screen.x;
    if (xPos % blockSize !== 0) {
      xPos /= blockSize;
      xPos = round(xPos);
      xPos *= blockSize;
      xPos += screen.x;
      
      aBlock.x = xPos;
    }
  }
}

function mousePressed() {
  if (mouseButton === CENTER) {
    // spawnBlocks(width/2);
    theBlocks.push(new Block(width/2, height/2));

  }
}

// function classBlock() {
//   if (keyIsDown(32)) {
//     console.log(theBlocks);
//   }
// }


// Code and logic of collisions taken from the Jeffrey thompson collision; rectangle/rectangle
function fallCollision(r1y, r1h, r2y, r2h) {
  if (r1y + r1h >= r2y &&       // r1 top edge past r2 bottom
    r1y <= r2y + r2h) {
    console.log(true);    
  }
}

function sideCollision() {

}

// Array and Object notation Assignment
// Rauphel
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let blockSize = 50;
let spawnHeight;
let screen;
let screenWidth = 450;
let theBlocks = [];
let falling = true;
let dragging = false;

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
  fill('white');
  rect(screen.x, screen.y, screen.w, screen.h);

  // gravity();
  // showBlocks();
  // classBlock();

  clearRow();
  for (let aBlock of theBlocks) {
    aBlock.collision();
    aBlock.gravity();
    checkFalling(aBlock);
    moveBlock(aBlock);
    aBlock.show();
    
  }
  console.log(falling);
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
    this.fall = false;
    this.moving = false;
  }

  show() {
    fill('gray');
    rect(this.x, this.y, this.w, this.h);
  }
  
  gravity() {
    if (this.y < height - blockSize) {
      if (!this.fall && !dragging) {
        this.y += 5;
      }
      else {
        let yPos = screen.h - this.y;
        yPos /= blockSize;
        yPos = round(yPos);
        this.y = screen.h - blockSize * yPos;
      }
    }
    else {
      this.y = screen.h - this.h;
      this.fall = true;
    }
  }
  
  collision() {    
    for (let i = 0; i < theBlocks.length; i++) {
      if (this.y !== theBlocks[i].y){ // fix so it falls after it splices a row
        this.fall = fallCollision(this.x, this.y, this.w, this.h, 
          theBlocks[i].x, theBlocks[i].y, theBlocks[i].w, theBlocks[i].h);
      }
      if (this.fall) {
        break;
      }
    } 
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

function pressBlock() {
  for (let aBlock of theBlocks) {
    if (mouseX >= aBlock.x && mouseX <= aBlock.x + aBlock.w 
        && mouseY >= aBlock.y && mouseY <= aBlock.y + aBlock.h) {
      dragging = true;
      aBlock.moving = true;

    }
  }
}

function moveBlock(aBlock) {
  if (aBlock.moving) {
    aBlock.x = mouseX - aBlock.w/2;
    if (aBlock.x <= screen.x) {
      aBlock.x = screen.x;
    }
    else if (aBlock.x + aBlock.w >= screen.x + screen.w) {
      aBlock.x = screen.x + screen.w - aBlock.w;
    }
  }
  sideCollision(aBlock);
}


function mouseReleased() {
  dragging = false;
  for (let aBlock of theBlocks) {
    aBlock.moving = false;
  }
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
  if (mouseButton === LEFT && !falling) {
    pressBlock();
  }
  if (mouseButton === CENTER) {
    // spawnBlocks(width/2);
    theBlocks.push(new Block(width/2, 0));
    console.log(screen.h - blockSize);
  }
}

// function classBlock() {
//   if (keyIsDown(32)) {
//     console.log(theBlocks);
//   }
// }


// Code and logic of collisions taken from the Jeffrey thompson collision; rectangle/rectangle
function fallCollision(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
  const COLLISION_BUFFER = 0.1;
  r1x += COLLISION_BUFFER;
  r1w -= COLLISION_BUFFER;
  r2x += COLLISION_BUFFER;
  r2w -= COLLISION_BUFFER;

  if (r1y < r2y && 
      r1x + r1w >= r2x &&    // r1 right edge past r2 left
      r1x <= r2x + r2w &&
      r1y + r1h >= r2y &&       // r1 top edge past r2 bottom
      r1y <= r2y + r2h) {
    return true;
  }
  // console.log(false);
  return false;
}

function sideCollision(movingBlock) {
  for (let i = 0; i < theBlocks.length && theBlocks.length > 1 ; i++) {
    if (movingBlock.y === theBlocks[i].y && movingBlock !== theBlocks[i]) {
      if (movingBlock.x + movingBlock.w >= theBlocks[i].x && movingBlock.x <= theBlocks[i].x) {
        movingBlock.x = theBlocks[i].x - movingBlock.w;
      }
      else if (movingBlock.x <= theBlocks[i].x + theBlocks[i].w && movingBlock.x >= theBlocks[i].x) {
        movingBlock.x = theBlocks[i].x + theBlocks[i].w;
      }
    }  
  }
}

function keyPressed() {
  if (keyCode === 32) {
    theBlocks.pop();
  }
  if (keyCode === 68) {
    console.log(theBlocks);
  }
}

function clearRow() {
  if (!falling) {
    for (let row = screen.h - blockSize; row > 0; row -= blockSize) {
      let rowWidth = 0;
      let indices = [];
      for (let i = 0; i < theBlocks.length; i++) {
        // console.log(theBlocks[i].y);
        // console.log(row);
        if (theBlocks[i].y === row) {
          rowWidth += theBlocks[i].w;
          indices.push(i);
          // console.log(true);
        }
  
      }
      if (rowWidth === screen.w) {
        console.log(rowWidth === screen.w);
        for (let i = 0; i < indices.length; i++) {
          theBlocks.splice(indices[i], 1);
          if (i !== indices.length - 1) {
            indices[i+1] -= 1 + i;
          }
        }
        for (let aBlock of theBlocks) {
          aBlock.fall = false;
        }
      }
    }
  }
}

function checkFalling(aBlock) {
  if (aBlock.fall === true && falling) {
    falling = false;
  }
  if (aBlock.fall === false && !falling) {
    falling = true;
  } 
}

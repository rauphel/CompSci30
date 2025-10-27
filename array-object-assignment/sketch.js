// Array and Object notation Assignment
// Rauphel
// Date: 2025-10-26
//
// Extra for Experts:
// I used Classes and learnt how they work and learnt and tried to apply object oriented programming, explored a bit of the nature of code; through this I made my own collision system based on
// Jeffrey thompson collision detection

const BLOCK_SIZE = 50; // standard block size    
let screen;            // initializes screen
const SCREEN_WIDTH = 450; // screen width
let theBlocks = [];       // array holding all playable blocks
let dragging = false;     // state of dragging
let moveCounter = 0;      // counters for moves and spawns
let spawnCounter = 0;
let lastPosition;         // state variables for the last moved block and its position
let lastMoved;
let score = 0;            // score
let mouseBuffer;          // buffer between block x and mouse x

function setup() {
  createCanvas(windowWidth, windowHeight);
  screen = createScreen(); // creates a screen

  spawnBlocks();  // spawns initial blocks
}

function draw() {
  background(220);

  fill('white');
  rect(screen.x, screen.y, screen.w, screen.h); //shows the screen and the scoreboard
  scoreBoard();

  spawnInterval(); // block functions for the whole
  clearRow();
  for (let aBlock of theBlocks) { // runs the functions that need to be ran for individual blocks
    aBlock.collision();
    aBlock.gravity();
    moveBlock(aBlock);
    aBlock.show();
  }
}

class Block {
  constructor(_x, _y) {         // initializes all the objects attributes
    this.x = _x;                // xposition
    this.y = _y;                // yposition 
    this.w = BLOCK_SIZE * ceil(random(4)); //random width
    this.h = BLOCK_SIZE;                    //height
    this.hit = false;                      // wether its hitting anything bellow
    this.moving = false;                   // if it's being moved
    this.inPlay = false;                   // wether it is in play
    this.color = "gray";                   // and its color
  }

  show() {   // shows the block with color
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }
  
  gravity() {           // applies gravity when there are no collision and when it is above the screen
    if (this.inPlay) {  
      if (this.y < screen.h - BLOCK_SIZE) {
        if (!this.hit && !dragging) {
          this.y += 5;
        }
        else {
          let yPos = screen.h - this.y;
          yPos /= BLOCK_SIZE;
          yPos = round(yPos);
          this.y = screen.h - BLOCK_SIZE * yPos;
        }
      }
      else {
        this.y = screen.h - this.h;
        this.hit = true;
      }
    }
  }
  
  collision() {    
    if (this.inPlay) { // checks block for any collisions below
      for (let i = 0; i < theBlocks.length; i++) {
        if (this.y !== theBlocks[i].y){ 
          this.hit = fallCollision(this.x, this.y, this.w, this.h, 
            theBlocks[i].x, theBlocks[i].y, theBlocks[i].w, theBlocks[i].h);
          if (this.hit) {
            break;
          }
        }
      } 
    }
  }
}

function pressBlock() {
  for (let aBlock of theBlocks) { // checks if block is being pressed and updates it to be able to moves and saves its place in memory 
    if (aBlock.inPlay) {          // and current position and its position relative to the mouse
      if (mouseX >= aBlock.x && mouseX <= aBlock.x + aBlock.w 
          && mouseY >= aBlock.y && mouseY <= aBlock.y + aBlock.h) {
        dragging = true;
        aBlock.moving = true;
        aBlock.color = "black";
        lastPosition = aBlock.x;
        lastMoved = aBlock;
        mouseBuffer = mouseX - aBlock.x;
      }
    }
  }
}

function moveBlock(aBlock) { // moves and limits block
  if (aBlock.moving) {
    let side = sideCollision(aBlock); // checks side collision

    aBlock.x = mouseX - mouseBuffer; // make block follow the mouse

    if (aBlock.x >= side[0]) { // limits x coordinate to be between the two nums outputted by sideCollision()
      aBlock.x = side[0];
    }
    else if (aBlock.x <= side[1]) {
      aBlock.x = side[1];
    }

    if (aBlock.x <= screen.x) { // limits block to be in the playable area
      aBlock.x = screen.x;
    }
    else if (aBlock.x + aBlock.w >= screen.x + screen.w) {
      aBlock.x = screen.x + screen.w - aBlock.w;
    }
  }
}

function mouseReleased() { // when mouse is released stops dragging the block and adjusts position
  dragging = false;
  blockPosistion();
  for (let aBlock of theBlocks) { // returns to normal color and adds a to move counter when the block is moved from its initial position when it was pressed
    aBlock.moving = false;
    aBlock.color = "gray";
    if (aBlock === lastMoved && aBlock.x !== lastPosition) {
      moveCounter++;
    }
  }
}

function createScreen() { // creates an screen object and defines the play area
  let screen = {
    x: width/2 - SCREEN_WIDTH/2,
    y: 0,
    w: SCREEN_WIDTH,
    h: height,
  };
  return screen;
}

function blockPosistion() { // adjusts the position of all the blocks
  for (let aBlock of theBlocks) {
    let xPos = aBlock.x - screen.x;
    if (xPos % BLOCK_SIZE !== 0) {
      xPos = adjustPosition(xPos);     
      aBlock.x = xPos;
    }
  }
}

function adjustPosition(xPosition) { // adjusts the position to be sorted into columns
  xPosition /= BLOCK_SIZE;
  xPosition = round(xPosition);
  xPosition *= BLOCK_SIZE;
  xPosition += screen.x;
  return xPosition;
}

function mousePressed() {
  if (mouseButton === LEFT && !checkFalling()) { // runs the funtion of press block when left mouse button is pressed and nothing is falling
    pressBlock();
  }
}

// Code and logic of collisions taken from the Jeffrey thompson collision; rectangle/rectangle
function fallCollision(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) { // returns boolean when colliding with blocks under
  const COLLISION_BUFFER = 0.1;  // collision buffer so it returns false when edges are aligned
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
  return false;
}

function sideCollision(movingBlock) { // checks the side collision of the moving block with the other blocks in its row except for itself
  let edge = [ , ];
  for (let i = 0; i < theBlocks.length && theBlocks.length > 1 ; i++) {
    if (movingBlock.y === theBlocks[i].y && movingBlock !== theBlocks[i]) {
      if (movingBlock.x + movingBlock.w >= theBlocks[i].x && movingBlock.x <= theBlocks[i].x) { //the left most value it can go
        edge[0] = theBlocks[i].x - movingBlock.w;
      }
      else if (movingBlock.x <= theBlocks[i].x + theBlocks[i].w && movingBlock.x >= theBlocks[i].x) { // the right most value it can go
        edge[1] = theBlocks[i].x + theBlocks[i].w;
      }
    }
  }
  return edge; // returns the 2 values
}

function clearRow() { // clear row when filled
  if (!checkFalling()) {  // only clears when landed
    for (let row = screen.h - BLOCK_SIZE; row > 0; row -= BLOCK_SIZE) { // checks row by row
      let rowWidth = 0;
      let indices = [];
      for (let i = 0; i < theBlocks.length; i++) {
        if (theBlocks[i].y === row) {
          rowWidth += theBlocks[i].w;
          indices.push(i);
        }
      }
      if (rowWidth === screen.w) { // checks if the total width of the blocks in the row are equal to the play area width and clears when its is
        for (let i = 0; i < indices.length; i++) {
          theBlocks.splice(indices[i], 1);
          if (i !== indices.length - 1) {
            indices[i+1] -= 1 + i;
          }
        }
        for (let aBlock of theBlocks) {
          aBlock.hit = false;
        }
        score += 100;
      }
    }
  }
}

function checkFalling() { //checks every block if it is colliding/falling and returns a boolean
  for (let aBlock of theBlocks) {
    if (aBlock.hit === false) {
      return true;
    }
  }
  return false;
}

function spawnBlocks() { // random block spawner
  for (let row = screen.h; row < screen.h + 2 * BLOCK_SIZE; row += BLOCK_SIZE) {  //spawns 2 rows beneath actual screen 
    let randomBlocks = [];                                                            // puts into an array for new random blocks
    for (let column = screen.x; column < screen.x + screen.w; column += BLOCK_SIZE) { // spawns per column based on rng
      let newBlock = new Block(column, row);
      let spawnChance = random(100);
      if (randomBlocks.length >= 1) {
        let _xPos = newBlock.x;
        while (_xPos < randomBlocks[randomBlocks.length - 1].x + randomBlocks[randomBlocks.length - 1].w) { // makes sure of no overlap by moving to the next column and checking
          _xPos += BLOCK_SIZE;
        }
        newBlock.x = _xPos;
        if (newBlock.x + newBlock.w < screen.x + screen.w) { // makes sure the block is not out of bounds
          column = _xPos;
          if (spawnChance > 25) {
            randomBlocks.push(newBlock);
          }
        }
      }
      else if (spawnChance > 50) { // when there are no other blocks; no other cases to check
        randomBlocks.push(newBlock);
      }
    }
    theBlocks = theBlocks.concat(randomBlocks); // puts new blocks into main block array
  }
  for (let aBlock of theBlocks) { // pushes the block up and allows it to be in play
    aBlock.y -= 2 * BLOCK_SIZE;
    aBlock.inPlay = true;
  }
}

function spawnInterval() { // spawns blocks after 2 blocks are moved and stops falling
  if (moveCounter > 1 && moveCounter - spawnCounter === 2 && !checkFalling()) {
    spawnBlocks();
    spawnCounter = moveCounter;
  }
}

function scoreBoard() { // simple score tracker
  fill('black');
  text("score: " + score, screen.x / 2, 3 * BLOCK_SIZE);
  text("moves: " + moveCounter, screen.x / 2, 4 * BLOCK_SIZE);
}
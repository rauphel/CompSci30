// Neighbours

const CELL_SIZE = 50;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;
let grid;
let rows;
let cols;
let thePlayer = {
  x: 0,
  y: 0,
};


function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  // add player to grid;
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background('aqua');
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);

  // // neighbours
  // toggleCell(x + 1, y);
  // toggleCell(x, y + 1);
  // toggleCell(x - 1, y);
  // toggleCell(x, y - 1);
}

function toggleCell(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE;
    }
    else if (grid[y][x] === IMPASSIBLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function keyPressed() {
  if (key === 'r') {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === 'e') {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === 'w') { 
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  else if (key === 's') { 
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  else if (key === 'd') { 
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
  else if (key === 'a') { 
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE) {
    // previous position
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;
  
    // moving the player
    thePlayer.x = x;
    thePlayer.y = y;
  
    //put the player on the grid
    grid[y][x] = PLAYER;
  
    // resets old spot to be open tile
    grid[oldY][oldX] = OPEN_TILE;

  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill("white");
      }
      else if (grid[y][x] === IMPASSIBLE) {
        fill("black");
      }
      else if (grid[y][x] === PLAYER) {
        fill('green ');
      }
      noStroke();
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) > 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(IMPASSIBLE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

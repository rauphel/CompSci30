// generative art demo
// Your Name
// OCt 9, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tileSize = 50;

let theTiles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (x = tileSize; x < width; x+= tileSize) {
    
    let someTile = spawnTile(x, y);
    theTiles.push(someTile);
  }
}

function draw() {
  background(220);

  for (let someTile of theTiles){
    line(someTile.x1, someTile.y1, someTile.x2, someTile.y2);
  }
}

function spawnTile(x, y) {
  let choice = random(100);
  let tile;
  console.log(choice);
  if (choice > 50) {
    tile = {
      x1: x - tileSize/2,
      y1: y + tileSize/2,
      x2: x + tileSize/2,
      y2: y - tileSize/2,
    };
  }
  else {
    tile = {
      x1: x + tileSize/2,
      y1: y - tileSize/2,
      x2: x - tileSize/2,
      y2: y + tileSize/2,
    };
  }

  return tile;
}

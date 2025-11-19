//Inheritance

class Vehicle {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  getName() {
    return this.name;
  }
  getType() {
    return this.type;
  }
}

class Car extends Vehicle {
  constructor(name) {
    super(name, "car");
  }
  getName() {
    return 'This is a car called ' + super.getName();
  }
}

let sped;

function setup() {
  createCanvas(windowWidth, windowHeight);
  sped = new Car("Kona");
  console.log(sped.getName());
  console.log(sped.getType());
}

function draw() {
  background(220);
}

